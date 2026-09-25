// Lodestar: "Draft with agent" (docs/BUILD_BRIEF.md §3e.4).
//
//   POST /api/lodestar/draft  { type: 'sop' | 'customer' | 'rfq', item: {...hotspot with evidence} }
//   → { draft: { title, to, body }, model, usage, cost }
//
// Drafts only. Nothing is ever sent: the page shows the draft for a person to
// approve, copy or discard. Same guards as the brief route; LLM_MODEL_FAST.

import { getCorsHeaders, isDisallowedOrigin } from '../_cors.js';
import { jsonResponse } from '../_json-response.js';
import { validateApiKey } from '../_api-key.js';
import { scrubDeep, scrubReady } from './_scrub.js';
import { chat, underDailyCap, streamJson } from './_openrouter.js';

export const config = { runtime: 'edge' };

const DAILY_CAP = Number(process.env.LODESTAR_DRAFT_DAILY_CAP || 150);

const KINDS = {
  sop: {
    label: 'S&OP escalation',
    to: 'S&OP council',
    ask: 'an S&OP escalation note: summary, what changed (with dates and sources), exposure (installs and revenue at risk, marked synth), decisions requested with a decide-by date, owner function and next review',
  },
  customer: {
    label: 'Customer install notice',
    to: '[Customer project lead]',
    ask: 'a short, straight customer notice about a possible change to an install window: what is happening in plain words, what it means for their project, what the OEM is doing, and a promise of a call. Use [placeholders] for names, systems and dates the evidence does not give',
  },
  rfq: {
    label: 'Supplier RFQ',
    to: '[Supplier / alternate source]',
    ask: 'a request for quotation to secure cover for the affected input: part/material, quantity as a [placeholder], delivery staging, and questions on export licence status, country of origin, price basis and alternate-source material',
  },
};

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['title', 'body'],
  properties: {
    title: { type: 'string' },
    body: { type: 'string', description: 'Plain text with line breaks; no markdown.' },
  },
};

const clip = (s, n) => String(s ?? '').slice(0, n);

export default async function handler(req) {
  const cors = getCorsHeaders(req, 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
  if (req.method !== 'POST') return jsonResponse({ error: 'POST only' }, 405, cors);
  if (isDisallowedOrigin(req)) return jsonResponse({ error: 'Origin not allowed' }, 403, cors);
  if (!scrubReady()) return jsonResponse({ error: 'BANNED_TERMS not configured' }, 503, cors);
  const auth = await validateApiKey(req);
  if (!auth.valid) return jsonResponse({ error: auth.error || 'session required' }, 401, cors);

  let body;
  try { body = await req.json(); } catch { return jsonResponse({ error: 'invalid JSON' }, 400, cors); }
  const kind = KINDS[body?.type];
  const it = body?.item;
  if (!kind || !it) return jsonResponse({ error: 'type and item required' }, 400, cors);
  const item = {
    title: clip(it.title, 120), subtitle: clip(it.subtitle, 160), score: Number(it.score) || 0,
    products: Array.isArray(it.products) ? it.products.slice(0, 8).map((p) => clip(p, 60)) : [],
    oem: it.oem && typeof it.oem === 'object' ? {
      tts_days: Number(it.oem.tts_days) || undefined, ttr_days: Number(it.oem.ttr_days) || undefined,
      installs_at_risk: Number(it.oem.installs_at_risk) || undefined, revenue_at_risk_usd: Number(it.oem.revenue_at_risk_usd) || undefined,
    } : undefined,
    evidence: Array.isArray(it.evidence) ? it.evidence.slice(0, 5).map((e) => ({ text: clip(e.text, 300), source: clip(e.source, 80), at: clip(e.at, 20) })) : [],
    options: Array.isArray(it.options) ? it.options.slice(0, 3).map((o) => clip(o, 200)) : [],
  };

  const system = `You draft operational messages for the supply-chain team of a medical imaging OEM. Write ${kind.ask}.
Rules: use only the facts given; numbers in "oem" are synthetic demo values, so write "(synth)" after any you use; never name a company or a person (use functions and [placeholders]); plain text, no markdown; under 220 words. This is a draft for a person to review, not a sent message.`;

  const work = (async () => {
    if (!(await underDailyCap('draft', DAILY_CAP))) return { error: 'daily draft limit reached' };
    const model = process.env.LLM_MODEL_FAST || 'deepseek/deepseek-v4-flash';
    const r = await chat(model, [{ role: 'system', content: system }, { role: 'user', content: JSON.stringify(item) }], {
      schema: SCHEMA, schemaName: 'draft', maxTokens: 900, temperature: 0.3,
    });
    const draft = scrubDeep({ title: clip(r.content?.title, 140) || kind.label, to: kind.to, body: clip(r.content?.body, 3000) });
    return { draft, kind: kind.label, model: r.model, usage: r.usage, cost: r.cost, sent: false };
  })().catch((e) => ({ error: e.message || 'draft failed' }));

  return streamJson(work, cors);
}
