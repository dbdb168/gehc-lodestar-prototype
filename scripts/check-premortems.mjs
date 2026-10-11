#!/usr/bin/env node
// Checks data/network.json `premortems`: every reference resolves, every
// weakness is tagged inferred or confirmed, every scenario rates every weakness,
// and every abbreviation in the text is defined in the page's glossary.
// Exits 1 with a list of problems; prints a one-line summary when clean.
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const net = JSON.parse(readFileSync(resolve(root, 'data/network.json'), 'utf8'));
const problems = [];
const fail = (pm, msg) => problems.push(`${pm?.id ?? '?'}: ${msg}`);

const products = new Map(net.products.map((p) => [p.id, p]));
const inputs = new Map(net.inputs.map((i) => [i.id, i]));
const sites = new Map(net.sites.map((s) => [s.id, s]));
const lanes = new Map(net.lanes.map((l) => [l.id, l]));
// Chokepoint names the network knows: lane waypoints and input hooks.
const chokepoints = new Set([
  ...net.chokepoints_portwatch,
  ...net.lanes.flatMap((l) => l.via),
  ...net.inputs.map((i) => i.live?.portwatch_chokepoint).filter(Boolean),
]);
const LEVELS = new Set(['high', 'medium', 'low']);

/** Strings anywhere in a value, glossary excluded. */
function strings(v, out = []) {
  if (typeof v === 'string') out.push(v);
  else if (Array.isArray(v)) v.forEach((x) => strings(x, out));
  else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) if (k !== 'glossary' && k !== 'url') strings(x, out);
  return out;
}

function refOk(ref) {
  const [kind, ...rest] = ref.split(':');
  const key = rest.join(':');
  if (kind === 'input') return inputs.has(key);
  if (kind === 'site') return sites.has(key);
  if (kind === 'cp') return chokepoints.has(key);
  return kind === 'reg';
}

for (const pm of net.premortems ?? []) {
  const product = products.get(pm.product);
  if (!product) { fail(pm, `unknown product ${pm.product}`); continue; }
  if (product.family !== pm.family) fail(pm, `family ${pm.family} does not match product family ${product.family}`);
  if (!pm.story?.length) fail(pm, 'no story');

  const vIds = new Set();
  for (const v of pm.vulnerabilities ?? []) {
    if (vIds.has(v.id)) fail(pm, `duplicate weakness id ${v.id}`);
    vIds.add(v.id);
    if (!['inferred', 'confirmed'].includes(v.status)) fail(pm, `${v.id}: status must be inferred or confirmed`);
    if (v.status === 'confirmed' && !v.confirmed_by) fail(pm, `${v.id}: confirmed needs confirmed_by`);
    if (!LEVELS.has(v.confidence)) fail(pm, `${v.id}: bad confidence ${v.confidence}`);
    for (const i of v.inputs ?? []) {
      if (!inputs.has(i)) fail(pm, `${v.id}: unknown input ${i}`);
      else if (!product.inputs.includes(i)) fail(pm, `${v.id}: input ${i} is not an input of ${pm.product}`);
    }
    for (const s of v.sites ?? []) if (!sites.has(s)) fail(pm, `${v.id}: unknown site ${s}`);
    for (const l of v.lanes ?? []) {
      if (!lanes.has(l)) fail(pm, `${v.id}: unknown lane ${l}`);
      else if (!lanes.get(l).products.includes(pm.product)) fail(pm, `${v.id}: lane ${l} does not carry ${pm.product}`);
    }
    for (const c of v.chokepoints ?? []) if (!chokepoints.has(c)) fail(pm, `${v.id}: unknown chokepoint ${c}`);
    for (const r of v.regulatory ?? []) if (!r.startsWith('reg:')) fail(pm, `${v.id}: regulatory id must start with reg:`);
    const joins = ['inputs', 'sites', 'lanes', 'chokepoints', 'regulatory'].some((k) => v[k]?.length);
    if (!joins) fail(pm, `${v.id}: nothing to join live signals to`);
  }

  const tax = pm.taxonomy;
  if (!tax) fail(pm, 'no taxonomy');
  for (const v of pm.vulnerabilities ?? []) if (!tax?.categories.includes(v.category)) fail(pm, `${v.id}: category "${v.category}" not in taxonomy`);
  for (const s of pm.scenarios ?? []) {
    if (!s.threats?.length) fail(pm, `${s.id}: no external threat types`);
    for (const t of s.threats ?? []) if (!tax?.threats.includes(t)) fail(pm, `${s.id}: threat "${t}" not in taxonomy`);
  }
  for (const l of pm.levers ?? []) if (!tax?.principles.includes(l.principle)) fail(pm, `lever "${l.title}": principle "${l.principle}" not in taxonomy`);

  const quads = new Set();
  if ((pm.scenarios ?? []).length !== 4) fail(pm, `expected 4 scenarios, found ${(pm.scenarios ?? []).length}`);
  for (const s of pm.scenarios ?? []) {
    const q = `${s.quadrant?.x}/${s.quadrant?.y}`;
    if (quads.has(q)) fail(pm, `${s.id}: quadrant ${q} used twice`);
    quads.add(q);
    for (const id of vIds) if (!LEVELS.has(s.stresses?.[id])) fail(pm, `${s.id}: no stress level for ${id}`);
    for (const id of Object.keys(s.stresses ?? {})) if (!vIds.has(id)) fail(pm, `${s.id}: stress for unknown weakness ${id}`);
    for (const r of s.watch ?? []) if (!refOk(r)) fail(pm, `${s.id}: watch ref ${r} does not resolve`);
  }

  for (const l of pm.levers ?? []) {
    for (const id of [...l.addresses, ...(l.shifts_to ?? [])]) if (!vIds.has(id)) fail(pm, `lever "${l.title}": unknown weakness ${id}`);
    if (!l.owner_function) fail(pm, `lever "${l.title}": no owner function`);
  }
  for (const v of pm.vulnerabilities) if (!pm.levers.some((l) => l.addresses.includes(v.id))) fail(pm, `${v.id}: no lever addresses it`);

  for (const i of pm.tolerance?.inputs ?? []) {
    const inp = inputs.get(i);
    if (!inp?.tts_days || !inp?.ttr_days) fail(pm, `tolerance input ${i} has no TTS/TTR`);
  }

  // Abbreviations: any token with two or more capitals (FPGAs, NbTi, S&OP, 510(k)) must be defined.
  const defined = new Set(pm.glossary.flatMap(([k]) => k.split(/,\s*/)));
  const text = strings(pm).join(' ');
  const tokens = text.match(/\b510\(k\)|[A-Za-z&]*[A-Z][A-Za-z&]*[A-Z][A-Za-z&]*/g) ?? [];
  const missing = new Set();
  for (const t of tokens) {
    const base = t.replace(/s$/, '');
    if (!defined.has(t) && !defined.has(base)) missing.add(t);
  }
  for (const t of missing) fail(pm, `abbreviation not in glossary: ${t}`);
}

if (problems.length) {
  console.error(problems.join('\n'));
  console.error(`check:premortems: ${problems.length} problem(s).`);
  process.exit(1);
}
console.log(`check:premortems: clean (${(net.premortems ?? []).length} pre-mortem(s)).`);
