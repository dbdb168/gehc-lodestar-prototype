// Lodestar: model-written command brief (docs/BUILD_BRIEF.md §3d).
//
//   POST /api/lodestar/brief
//   body: { items: [...top scored hotspots with evidence], filter, date, compare?, regenerate? }
//   → { brief, model, usage, cost, cached, generatedAt } (+ compare: same for LLM_MODEL_COMPARE)
//
// Calls OpenRouter with a JSON-schema response format. Guards: allowed origins
// and a valid browser session only; payload validated and size-capped; results
// cached 30 min per (payload, model); a daily call cap bounds spend. Output text
// is scrubbed of BANNED_TERMS as a last line of defence.

import { getCorsHeaders, isDisallowedOrigin } from '../_cors.js';
import { jsonResponse } from '../_json-response.js';
import { validateApiKey } from '../_api-key.js';
import { readJsonFromUpstash, setCachedData } from '../_upstash-json.js';
import { chatWithFallback, underDailyCap, streamJson } from './_openrouter.js';
import { scrubDeep, scrubReady } from './_scrub.js';

export const config = { runtime: 'edge' };

const CACHE_TTL_S = 1800;
const DAILY_CAP = Number(process.env.LODESTAR_BRIEF_DAILY_CAP || 200);
const MAX_ITEMS = 10;

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['headline', 'brief', 'decisions', 'watch'],
  properties: {
    headline: { type: 'string', description: 'One line, under 110 characters.' },
    brief: { type: 'string', description: 'Plain text, exactly three sentences, no markdown, under 450 characters. Actions belong in decisions, not here.' },
    decisions: {
      type: 'array',
      maxItems: 3,
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['title', 'why', 'owner_function', 'decide_by', 'evidence_ids', 'options'],
        properties: {
          title: { type: 'string' },
          why: { type: 'string' },
          owner_function: { type: 'string', description: 'A function, never a person: Procurement, Install PMO, S&OP council, Quality/RA, Logistics, Trade compliance, Commercial.' },
          decide_by: { type: 'string', description: 'ISO date (YYYY-MM-DD).' },
          evidence_ids: { type: 'array', items: { type: 'string' }, description: 'ids of the items this decision rests on' },
          options: {
            type: 'array',
            minItems: 2,
            maxItems: 3,
            items: {
              type: 'object',
              additionalProperties: false,
              required: ['action', 'cost', 'protects', 'regulatory_time', 'confidence'],
              properties: {
                action: { type: 'string' },
                cost: { type: 'string' },
                protects: { type: 'string' },
                regulatory_time: { type: 'string', description: 'e.g. "None", "Letter to file", "510(k) change: 6-9 months"' },
                confidence: { type: 'string', enum: ['High', 'Medium', 'Low'] },
              },
            },
          },
        },
      },
    },
    watch: { type: 'array', maxItems: 5, items: { type: 'string' } },
  },
};

const SYSTEM = `You write the morning command brief for the supply-chain team of a medical imaging OEM (MR, CT, PET/CT, SPECT/CT, ultrasound, mammography/X-ray).
Rules:
- Use only the evidence items provided. Do not add facts, numbers, dates or events that are not in them.
- Only the numbers inside an item's "oem" block are synthetic demo values (time to survive/recover, installs). When you use one, write "(synth)" after it and never present it as company data. Numbers in evidence are real public data: do not mark them synth.
- Recommend; don't decide. Decisions are options for people to choose between.
- Use medtech operations language where it fits: S&OP, SQDCI, QMSR / 510(k) change control, site readiness, time to survive vs time to recover.
- Never name a company or a person. Say "the OEM" for the manufacturer. Owners are functions (Procurement, Install PMO, S&OP council, Quality/RA, Logistics, Trade compliance, Commercial).
- If the evidence is calm for the selected product line, say so plainly: telling the team what not to worry about is part of the job.
- decide_by must be a date within the next 21 days of the given date.
- Format: every field is plain text (no markdown, no headings, no bullet characters, no tables). "brief" is exactly three sentences.`;

function clip(s, n) { return String(s ?? '').slice(0, n); }

/** Plain text only: models sometimes return markdown despite the instruction. */
function plain(s) {
  return String(s ?? '')
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/\*\*|__|`/g, '')
    .replace(/^\s*[-*•]\s+/gm, '')
    .replace(/^\|.*\|\s*$/gm, '')
    .replace(/\s*\n+\s*/g, ' ')
    .trim();
}

function firstSentences(s, n) {
  const body = String(s ?? '').replace(/^\s*(#{1,6}\s.*|\|.*\|)\s*$/gm, '');
  // Split only where a stop is followed by whitespace and a new sentence, so
  // decimals ("9.5/day") and dates stay intact.
  const parts = plain(body).split(/(?<=[.!?])\s+(?=[A-Z0-9"“(])/);
  return parts.slice(0, n).join(' ').trim().slice(0, 600);
}

function tidy(brief) {
  const deep = (v) => (typeof v === 'string' ? plain(v) : Array.isArray(v) ? v.map(deep) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deep(x)])) : v);
  const out = deep(brief);
  out.brief = firstSentences(brief.brief, 3);
  return out;
}

function sanitizeItems(items) {
  if (!Array.isArray(items)) return null;
  return items.slice(0, MAX_ITEMS).map((it) => ({
    id: clip(it.id, 60),
    title: clip(it.title, 120),
    kind: clip(it.kind, 20),
    subtitle: clip(it.subtitle, 160),
    score: Math.max(0, Math.min(100, Number(it.score) || 0)),
    products: Array.isArray(it.products) ? it.products.slice(0, 8).map((p) => clip(p, 60)) : [],
    oem: it.oem && typeof it.oem === 'object' ? {
      tts_days: Number(it.oem.tts_days) || undefined,
      ttr_days: Number(it.oem.ttr_days) || undefined,
      installs_next_90d: Number(it.oem.installs_next_90d) || undefined,
      prov: 'synth',
    } : undefined,
    evidence: Array.isArray(it.evidence) ? it.evidence.slice(0, 5).map((e) => ({
      text: clip(e.text, 300), source: clip(e.source, 80), at: clip(e.at, 20), prov: clip(e.prov, 8),
    })) : [],
  }));
}

async function sha(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].slice(0, 12).map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function callModel(model, userContent) {
  // No fallback for the Compare model: a comparison must be the model it names.
  const fallback = model === process.env.LLM_MODEL_COMPARE ? null : (process.env.LLM_MODEL_FAST || 'deepseek/deepseek-v4-flash');
  const r = await chatWithFallback(model, fallback, [{ role: 'system', content: SYSTEM }, { role: 'user', content: userContent }], {
    schema: SCHEMA, schemaName: 'command_brief', maxTokens: 4000,
    validate: (b) => !!(b?.headline && b?.brief),
  });
  return { brief: scrubDeep(tidy(r.content)), model: r.model, usage: r.usage, cost: r.cost, ...(r.fallbackFrom ? { fallbackFrom: r.fallbackFrom } : {}) };
}

async function briefFor(model, items, filter, date, regenerate) {
  const userContent = JSON.stringify({ date, product_filter: filter, items });
  const cacheKey = `lodestar:brief:v3:${await sha(`${model}|${userContent}`)}`;
  if (!regenerate) {
    try {
      const hit = await readJsonFromUpstash(cacheKey, 2000);
      if (hit?.brief) return { ...hit, cached: true };
    } catch { /* cache miss */ }
  }
  if (!(await underDailyCap('brief', DAILY_CAP))) throw Object.assign(new Error('daily brief limit reached'), { status: 429 });
  const out = { ...(await callModel(model, userContent)), generatedAt: new Date().toISOString() };
  await setCachedData(cacheKey, out, CACHE_TTL_S).catch(() => {});
  return { ...out, cached: false };
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
  const items = sanitizeItems(body?.items);
  if (!items) return jsonResponse({ error: 'items required' }, 400, cors);
  const filter = ['ALL', 'MR', 'CT', 'MI', 'US', 'XR'].includes(body?.filter) ? body.filter : 'ALL';
  const date = /^\d{4}-\d{2}-\d{2}$/.test(body?.date ?? '') ? body.date : new Date().toISOString().slice(0, 10);
  const regenerate = body?.regenerate === true;

  const primary = process.env.LLM_MODEL_BRIEF || 'z-ai/glm-5.3';
  const compareModel = process.env.LLM_MODEL_COMPARE;
  const work = Promise.all([
    briefFor(primary, items, filter, date, regenerate),
    body?.compare === true && compareModel
      ? briefFor(compareModel, items, filter, date, regenerate).catch((e) => ({ error: e.message || 'compare failed' }))
      : Promise.resolve(null),
  ]).then(([main, compare]) => ({ ...main, compare }), (e) => ({ error: e.message || 'brief failed', status: e.status || 502 }));

  return streamJson(work, cors);
}
