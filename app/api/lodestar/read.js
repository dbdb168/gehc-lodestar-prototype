// Lodestar: the evidence drawer's "read" on one hotspot (docs/BUILD_BRIEF.md §3e.4).
//
//   POST /api/lodestar/read  { item: {...hotspot with evidence}, date }
//   → { read: { headline, lede, story, category, decide_by, decide_why, options[] }, model, usage, cost, cached }
//
// Written only from the live evidence passed in. Options are recommendations for
// a person to decide on; the first is the recommended one. Same guards as the
// brief route (origin, session, size caps, daily cap, 30-min cache); LLM_MODEL_BRIEF.

import { getCorsHeaders, isDisallowedOrigin } from '../_cors.js';
import { jsonResponse } from '../_json-response.js';
import { validateApiKey } from '../_api-key.js';
import { readJsonFromUpstash, setCachedData } from '../_upstash-json.js';
import { chat, underDailyCap, streamJson } from './_openrouter.js';
import { scrubDeep, scrubReady } from './_scrub.js';

export const config = { runtime: 'edge' };

const CACHE_TTL_S = 1800;
const DAILY_CAP = Number(process.env.LODESTAR_READ_DAILY_CAP || 400);

const OPTION = {
  type: 'object',
  additionalProperties: false,
  required: ['action', 'detail', 'cost', 'protects', 'regulatory_time', 'confidence', 'owner_function'],
  properties: {
    action: { type: 'string', description: 'Imperative, under 50 characters, e.g. "Hold, and pre-authorise a buy".' },
    detail: { type: 'string', description: 'One or two sentences: what exactly to do and when it triggers.' },
    cost: { type: 'string', description: 'Rough, qualitative unless the evidence gives a number, e.g. "None until triggered", "Low: expedite premium".' },
    protects: { type: 'string', description: 'What it protects, e.g. "Time to survive 41 → 120 days if triggered (synth)".' },
    regulatory_time: { type: 'string', description: 'Regulatory impact, e.g. "None", "510(k) change assessment, weeks".' },
    confidence: { type: 'string', enum: ['High', 'Medium', 'Low'] },
    owner_function: { type: 'string', description: 'A function, never a person or job title: Procurement, S&OP council, Install PMO, Quality/RA, Logistics, Trade compliance, Commercial, Service.' },
  },
};

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['headline', 'lede', 'story', 'category', 'decide_by', 'decide_why', 'options'],
  properties: {
    headline: { type: 'string', description: 'A short question or statement a supply-chain lead would ask, under 60 characters, e.g. "Rare-earth truce: decided today?".' },
    lede: { type: 'string', description: 'One or two sentences: what is happening and why it matters now.' },
    story: { type: 'string', description: 'Three sentences of context from the evidence: what changed, since when, what to expect.' },
    category: { type: 'string', description: 'Two or three words, e.g. "Export control", "Chokepoint traffic", "Device regulatory".' },
    decide_by: { type: 'string', description: 'YYYY-MM-DD when a decision is needed, or "" if this is watch-only.' },
    decide_why: { type: 'string', description: 'One sentence on why that date, or "".' },
    options: { type: 'array', minItems: 0, maxItems: 3, items: OPTION, description: 'Costed options, recommended first. Empty if watch-only.' },
  },
};

const SYSTEM = `You write the evidence read for one supply-chain hotspot of a medical imaging OEM, for its supply-chain leadership. Write like a sharp briefing editor, not a report generator.
Budgets (hard): headline under 50 characters, a question or a short claim; lede one sentence, under 30 words, the "so what"; story three short sentences, under 70 words, context only; option action under 45 characters; every other option field under 12 words.
Style example (tone and length only; do not reuse its facts):
  headline: "Rare-earth truce: decided today?"
  lede: "The April licensing still bites. The wider controls are suspended, and the suspension is on the table today."
  option: action "Hold, and pre-authorise a buy"; detail "Don't over-buy on today's headlines. Pre-approve a 90-day buy that triggers if the suspension lapses."; cost "None until triggered"; protects "Time to survive 60 → 150 days if triggered (synth)".
Rules:
- Use only the facts in the evidence. Never invent figures, percentages, dates or events. Numbers in "oem" are synthetic demo values: write "(synth)" after any you use, and don't recite them in the lede.
- Medtech operations language (S&OP, time to survive / time to recover, 510(k) change control, site readiness). Plain text, no markdown.
- Never name a company, a person or a job title; owners are functions.
- Options are recommendations for people to decide on. Recommended first. Prefer proportionate moves (hold, pre-authorise, trigger-based buys) over over-reaction to headlines. If the evidence is weak or calm, return watch-only: empty options and decide_by "".`;

const clip = (s, n) => String(s ?? '').slice(0, n);
/** Shorten at a word boundary with an ellipsis, never mid-word. */
const fit = (s, n) => {
  const t = String(s ?? '').trim();
  if (t.length <= n) return t;
  const cut = t.slice(0, n - 1);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(' '), n * 0.6)).replace(/[\s,;:.–-]+$/, '')}…`;
};
const strip = (s) => String(s ?? '').replace(/\*\*|__|`|^#+\s*/gm, '').trim();

function sanitize(it) {
  if (!it || typeof it !== 'object') return null;
  return {
    id: clip(it.id, 80), title: clip(it.title, 120), subtitle: clip(it.subtitle, 160), kind: clip(it.kind, 20), score: Number(it.score) || 0,
    products: Array.isArray(it.products) ? it.products.slice(0, 8).map((p) => clip(p, 60)) : [],
    oem: it.oem && typeof it.oem === 'object' ? {
      input: clip(it.oem.input, 80) || undefined,
      tts_days: Number(it.oem.tts_days) || undefined, ttr_days: Number(it.oem.ttr_days) || undefined,
      installs_next_90d: Number(it.oem.installs_next_90d) || undefined,
      controls: clip(it.oem.controls, 240) || undefined,
    } : undefined,
    evidence: Array.isArray(it.evidence) ? it.evidence.slice(0, 8).map((e) => ({
      text: clip(e.text, 300), source: clip(e.source, 80), at: clip(e.at, 20), prov: clip(e.prov, 8),
    })) : [],
  };
}

async function sha(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].slice(0, 12).map((b) => b.toString(16).padStart(2, '0')).join('');
}

function tidy(r) {
  return {
    headline: fit(strip(r.headline), 80),
    lede: fit(strip(r.lede), 260),
    story: fit(strip(r.story), 600),
    category: fit(strip(r.category), 40),
    decide_by: /^\d{4}-\d{2}-\d{2}$/.test(r.decide_by ?? '') ? r.decide_by : '',
    decide_why: fit(strip(r.decide_why), 200),
    options: (Array.isArray(r.options) ? r.options : []).slice(0, 3).map((o) => ({
      action: fit(strip(o.action), 70), detail: fit(strip(o.detail), 320), cost: fit(strip(o.cost), 90),
      protects: fit(strip(o.protects), 110), regulatory_time: fit(strip(o.regulatory_time), 90),
      confidence: ['High', 'Medium', 'Low'].includes(o.confidence) ? o.confidence : 'Medium',
      owner_function: fit(strip(o.owner_function), 40),
    })),
  };
}

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
  const item = sanitize(body?.item);
  if (!item || !item.evidence.length) return jsonResponse({ error: 'item with evidence required' }, 400, cors);
  const date = /^\d{4}-\d{2}-\d{2}$/.test(body?.date ?? '') ? body.date : new Date().toISOString().slice(0, 10);

  const work = (async () => {
    // The read is the drawer's editorial centrepiece: brief-quality model, cached.
    const model = process.env.LLM_MODEL_READ || process.env.LLM_MODEL_BRIEF || 'z-ai/glm-5.3';
    const userContent = JSON.stringify({ date, item });
    const cacheKey = `lodestar:read:v2:${await sha(`${model}|${userContent}`)}`;
    try {
      const hit = await readJsonFromUpstash(cacheKey, 2000);
      if (hit?.read) return { ...hit, cached: true };
    } catch { /* cache miss */ }
    if (!(await underDailyCap('read', DAILY_CAP))) return { error: 'daily read limit reached' };
    const r = await chat(model, [{ role: 'system', content: SYSTEM }, { role: 'user', content: userContent }], {
      schema: SCHEMA, schemaName: 'hotspot_read', maxTokens: 3000, temperature: 0.2,
    });
    if (!r.content?.headline) throw new Error('model returned an incomplete read');
    const out = { read: scrubDeep(tidy(r.content)), model: r.model, usage: r.usage, cost: r.cost, generatedAt: new Date().toISOString() };
    await setCachedData(cacheKey, out, CACHE_TTL_S).catch(() => {});
    return { ...out, cached: false };
  })().catch((e) => ({ error: e.message || 'read failed' }));

  return streamJson(work, cors);
}
