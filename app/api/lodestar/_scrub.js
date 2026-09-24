// Lodestar: remove banned names (client, segments, product brands, people)
// from any text we pass through from external sources before it reaches the
// browser. The list lives only in the BANNED_TERMS env var (hard rule 1).

let compiled = null;

function patterns() {
  if (compiled) return compiled;
  const terms = String(process.env.BANNED_TERMS || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  compiled = terms.map((t) => new RegExp(`(^|[^\\p{L}\\p{N}])${esc(t)}(?=$|[^\\p{L}\\p{N}])`, 'giu'));
  return compiled;
}

/** Replace banned terms (whole words, case-insensitive) with "the OEM". */
export function scrub(text) {
  if (typeof text !== 'string' || !text) return text;
  let out = text;
  for (const re of patterns()) out = out.replace(re, (_m, pre) => `${pre}the OEM`);
  return out;
}

/** Deep-scrub every string in a JSON-able value. */
export function scrubDeep(value) {
  if (typeof value === 'string') return scrub(value);
  if (Array.isArray(value)) return value.map(scrubDeep);
  if (value && typeof value === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = scrubDeep(v);
    return out;
  }
  return value;
}

/** True when BANNED_TERMS is configured (routes fail closed without it). */
export function scrubReady() {
  return patterns().length > 0;
}
