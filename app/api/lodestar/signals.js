// Lodestar: regulatory and news signals for the exposure engine.
//
//   GET /api/lodestar/signals
//   → { federalRegister: [...], fda: {...}, newsPulse: {...}, fetchedAt }
//
// - Federal Register (no key): documents from the last 14 days matching the
//   network's regulatory-watch terms and each input's term.
// - openFDA (no key): recent device recalls and 510(k) decisions for the OEM.
//   The applicant name (OEM_FDA_APPLICANT) is used server-side only and is
//   never returned; applicant/firm fields are dropped.
// - GDELT news pulse: read from Redis (scripts/seed-lodestar-news-pulse.mjs).
// Every string is scrubbed of BANNED_TERMS before it leaves the server, and the
// route refuses to answer if that list isn't configured. Cached 30 min.

import { getCorsHeaders, isDisallowedOrigin } from '../_cors.js';
import { jsonResponse } from '../_json-response.js';
import { readJsonFromUpstash, setCachedData } from '../_upstash-json.js';
import { scrubDeep, scrubReady } from './_scrub.js';

export const config = { runtime: 'edge' };

const CACHE_KEY = 'lodestar:signals:v3';
const CACHE_TTL_S = 1800;
const DAY = 86_400_000;
let memo = null;
let memoAt = 0;

const iso = (ms) => new Date(ms).toISOString().slice(0, 10);

async function getJson(url, timeoutMs = 8000) {
  const r = await fetch(url, { headers: { Accept: 'application/json', 'User-Agent': 'lodestar/1.0' }, signal: AbortSignal.timeout(timeoutMs) });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}

async function loadNetwork(origin) {
  return getJson(`${origin}/data/network.json`, 5000);
}

/** Federal Register documents for one term, last 14 days, relevant types only. */
async function federalRegister(term) {
  const since = iso(Date.now() - 14 * DAY);
  const params = new URLSearchParams({
    'conditions[term]': term,
    'conditions[publication_date][gte]': since,
    order: 'newest',
    per_page: '10',
  });
  for (const f of ['title', 'html_url', 'publication_date', 'type', 'abstract']) params.append('fields[]', f);
  for (const a of ['agencies']) params.append('fields[]', a);
  const d = await getJson(`https://www.federalregister.gov/api/v1/documents.json?${params}`);
  // The term search matches anywhere in a document's full text, so keep only
  // documents whose title or abstract carries every key word of the term
  // (e.g. "232" and "medical" for "section 232 medical").
  const key = term.toLowerCase().split(/\s+/).filter((w) => w.length > 2 && w !== 'section');
  return (d.results ?? [])
    .filter((r) => {
      const text = `${r.title} ${r.abstract ?? ''}`.toLowerCase();
      return key.every((w) => text.includes(w));
    })
    .slice(0, 5)
    .map((r) => ({
      title: r.title,
      url: r.html_url,
      date: r.publication_date,
      type: r.type,
      agencies: (r.agencies ?? []).map((a) => a.name).filter(Boolean).slice(0, 3),
      abstract: r.abstract ? String(r.abstract).slice(0, 280) : null,
    }));
}

const genericDevice = (name, code) =>
  String(name || (code ? `FDA product code ${code}` : 'Device')).slice(0, 120);

async function openFda() {
  // OEM_FDA_APPLICANT may list several registered names separated by '|'.
  const names = String(process.env.OEM_FDA_APPLICANT || '').split('|').map((n) => n.trim()).filter(Boolean);
  if (!names.length) return { configured: false, recalls: [], clearances: [] };
  const q = (s) => encodeURIComponent(s).replace(/%20/g, '+');
  const anyOf = (field) => `(${names.map((n) => `${field}:%22${q(n)}%22`).join('+')})`;
  const from = iso(Date.now() - 120 * DAY).replaceAll('-', '');
  const to = iso(Date.now()).replaceAll('-', '');
  const [recalls, k510] = await Promise.all([
    getJson(`https://api.fda.gov/device/recall.json?search=${anyOf('recalling_firm')}+AND+event_date_initiated:[${from}+TO+${to}]&limit=10`).catch((e) => ({ error: e.message })),
    getJson(`https://api.fda.gov/device/510k.json?search=${anyOf('applicant')}+AND+decision_date:[${from}+TO+${to}]&limit=10`).catch((e) => ({ error: e.message })),
  ]);
  const notFound = (x) => x?.error === 'HTTP 404'; // openFDA answers 404 for "no matches"
  return {
    configured: true,
    recallsError: recalls.error && !notFound(recalls) ? recalls.error : undefined,
    clearancesError: k510.error && !notFound(k510) ? k510.error : undefined,
    // Generic FDA classification names only. The firm's own free text
    // (product_description, reason_for_recall, 510(k) device_name) carries
    // product brand names, which must never render (CLAUDE.md rule 1).
    recalls: (recalls.results ?? []).map((r) => ({
      product: genericDevice(r.openfda?.device_name, r.product_code),
      reason: String(r.root_cause_description ?? '').slice(0, 120),
      status: r.recall_status,
      initiated: r.event_date_initiated,
      productCode: r.product_code,
      url: r.res_event_number ? `https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfRES/res.cfm?id=${encodeURIComponent(r.cfres_id ?? '')}` : undefined,
    })),
    clearances: (k510.results ?? []).map((r) => ({
      device: genericDevice(r.openfda?.device_name, r.product_code),
      kNumber: r.k_number,
      decision: r.decision_description,
      date: r.decision_date,
      url: r.k_number ? `https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=${encodeURIComponent(r.k_number)}` : undefined,
    })),
  };
}

async function build(origin) {
  const net = await loadNetwork(origin);
  const terms = new Map(); // term -> inputs that watch it
  for (const t of net.regulatory_watch?.federal_register_terms ?? []) terms.set(t, terms.get(t) ?? []);
  for (const i of net.inputs ?? []) {
    const t = i.live?.federal_register;
    if (t) terms.set(t, [...(terms.get(t) ?? []), i.id]);
  }
  const errors = [];
  const federal = await Promise.all([...terms].map(async ([term, inputs]) => {
    try { return { term, inputs, items: await federalRegister(term) }; }
    catch (e) { errors.push(`Federal Register "${term}": ${e.message}`); return { term, inputs, items: [], error: true }; }
  }));
  let fda;
  try { fda = await openFda(); } catch (e) { errors.push(`openFDA: ${e.message}`); fda = { configured: true, recalls: [], clearances: [], error: true }; }
  let newsPulse = null;
  // Seeder-owned key: read raw (no preview prefix).
  try { newsPulse = await readJsonFromUpstash('lodestar:news-pulse:v1', 3000, true); } catch { newsPulse = null; }
  if (!newsPulse) errors.push('GDELT news pulse: not seeded yet');
  return scrubDeep({ federalRegister: federal, fda, newsPulse, errors, fetchedAt: new Date().toISOString() });
}

export default async function handler(req) {
  const cors = getCorsHeaders(req, 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
  if (isDisallowedOrigin(req)) return jsonResponse({ error: 'Origin not allowed' }, 403, cors);
  if (!scrubReady()) return jsonResponse({ error: 'BANNED_TERMS not configured' }, 503, cors);

  const now = Date.now();
  if (memo && now - memoAt < CACHE_TTL_S * 1000) {
    return jsonResponse(memo, 200, { 'Cache-Control': 'private, max-age=300', ...cors });
  }
  try {
    const cached = await readJsonFromUpstash(CACHE_KEY, 2000);
    if (cached?.fetchedAt && now - Date.parse(cached.fetchedAt) < CACHE_TTL_S * 1000) {
      memo = cached; memoAt = now;
      return jsonResponse(cached, 200, { 'Cache-Control': 'private, max-age=300', ...cors });
    }
  } catch { /* fall through to a fresh build */ }

  try {
    const data = await build(new URL(req.url).origin);
    memo = data; memoAt = now;
    await setCachedData(CACHE_KEY, data, CACHE_TTL_S * 4).catch(() => {});
    return jsonResponse(data, 200, { 'Cache-Control': 'private, max-age=300', ...cors });
  } catch (e) {
    return jsonResponse({ error: 'signals unavailable', detail: e.message }, 503, { 'Cache-Control': 'no-store', ...cors });
  }
}
