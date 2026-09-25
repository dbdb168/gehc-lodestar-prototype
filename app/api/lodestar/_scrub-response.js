// Lodestar: scrub banned names from headline text in upstream JSON API
// responses (news digest, GDELT and other intelligence text) before they reach
// the browser (CLAUDE.md hard rule 1). Only human-text fields are touched:
// banned terms can collide with codes (e.g. an ISO country code), so ids, codes
// and keys pass through unchanged. Deterministic, so the gateway's ETag (hashed
// from the unscrubbed body) stays consistent; 304s and non-JSON pass through.

import { scrub, scrubReady } from './_scrub.js';

const TEXT_KEYS = new Set([
  'title', 'headline', 'description', 'summary', 'snippet', 'excerpt', 'text', 'content', 'body', 'reason', 'narrative',
]);

function walk(value, key) {
  if (typeof value === 'string') return key && TEXT_KEYS.has(key) ? scrub(value) : value;
  if (Array.isArray(value)) return value.map((v) => walk(v, key));
  if (value && typeof value === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = walk(v, k);
    return out;
  }
  return value;
}

export function scrubTextFields(value) {
  return walk(value, null);
}

export function withNameScrub(handler) {
  return async (req, ctx) => {
    const res = await handler(req, ctx);
    if (res.status !== 200 || !scrubReady()) return res;
    if (!(res.headers.get('content-type') || '').includes('application/json')) return res;
    let data;
    try { data = await res.clone().json(); } catch { return res; }
    const headers = new Headers(res.headers);
    headers.delete('content-length');
    return new Response(JSON.stringify(scrubTextFields(data)), { status: res.status, statusText: res.statusText, headers });
  };
}
