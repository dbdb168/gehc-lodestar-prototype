#!/usr/bin/env node
// Lodestar: GDELT news pulse per critical input (docs/BUILD_BRIEF.md §3c).
//
// For every input in data/network.json with a `live.gdelt` query, read GDELT's
// 30-day volume timeline and flag a spike when the last two days sit well above
// the prior four weeks (z-score). Keeps the top recent articles as evidence.
// GDELT asks for one request every ~5 s, so this runs from CI, not per page view.
//
// Output key: lodestar:news-pulse:v1 → { inputs: { [inputId]: {...} }, fetchedAt }

import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnvFile, runSeed } from './_seed-utils.mjs';

loadEnvFile(import.meta.url);

const CANONICAL_KEY = 'lodestar:news-pulse:v1';
const TTL = 6 * 3600;
const GDELT = 'https://api.gdeltproject.org/api/v2/doc/doc';
const SPACING_MS = 6000;

const here = dirname(fileURLToPath(import.meta.url));
const NETWORK_PATHS = [resolve(here, '../../data/network.json'), resolve(here, '../public/data/network.json')];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function gdelt(params) {
  const url = `${GDELT}?${new URLSearchParams({ ...params, format: 'json' })}`;
  const r = await fetch(url, { headers: { 'User-Agent': 'lodestar-seeder/1.0' }, signal: AbortSignal.timeout(20_000) });
  if (!r.ok) throw new Error(`GDELT HTTP ${r.status}`);
  const text = await r.text();
  if (!text.trim().startsWith('{')) throw new Error(`GDELT non-JSON: ${text.slice(0, 80)}`);
  return JSON.parse(text);
}

function pulse(timeline) {
  const pts = (timeline?.timeline?.[0]?.data ?? []).map((d) => Number(d.value)).filter(Number.isFinite);
  if (pts.length < 14) return null;
  const recent = pts.slice(-2);
  const base = pts.slice(-30, -2);
  const mean = base.reduce((s, v) => s + v, 0) / base.length;
  const sd = Math.sqrt(base.reduce((s, v) => s + (v - mean) ** 2, 0) / base.length) || 1e-9;
  const recentAvg = recent.reduce((s, v) => s + v, 0) / recent.length;
  return { recentAvg, baselineAvg: mean, z: (recentAvg - mean) / sd, days: pts.length };
}

async function build() {
  const path = NETWORK_PATHS.find((p) => existsSync(p));
  if (!path) throw new Error('network.json not found');
  const net = JSON.parse(readFileSync(path, 'utf8'));
  const inputs = {};
  let ok = 0;
  for (const input of net.inputs) {
    const query = input.live?.gdelt;
    if (!query) continue;
    try {
      const timeline = await gdelt({ query, mode: 'timelinevol', timespan: '30d' });
      await sleep(SPACING_MS);
      const arts = await gdelt({ query, mode: 'artlist', maxrecords: '3', sort: 'hybridrel', timespan: '3d' });
      await sleep(SPACING_MS);
      const p = pulse(timeline);
      inputs[input.id] = {
        query,
        ...(p ?? { recentAvg: null, baselineAvg: null, z: null, days: 0 }),
        articles: (arts.articles ?? []).slice(0, 3).map((a) => ({
          title: String(a.title ?? '').slice(0, 200), url: a.url, domain: a.domain, seendate: a.seendate,
        })),
      };
      ok++;
      console.log(`  ${input.id}: z=${p ? p.z.toFixed(2) : 'n/a'} articles=${inputs[input.id].articles.length}`);
    } catch (err) {
      console.warn(`  ${input.id}: ${err.message}`);
      await sleep(SPACING_MS);
    }
  }
  return { inputs, fetchedAt: Date.now(), covered: ok };
}

const isMain = process.argv[1]?.endsWith('seed-lodestar-news-pulse.mjs');
if (isMain) {
  runSeed('lodestar', 'news-pulse', CANONICAL_KEY, build, {
    validateFn: (d) => d && d.covered > 0,
    ttlSeconds: TTL,
    sourceVersion: 'lodestar-gdelt-pulse',
    recordCount: (d) => d.covered,
    declareRecords: (d) => d?.covered ?? 0,
    schemaVersion: 1,
    maxStaleMin: 720,
  }).catch((err) => {
    const cause = err.cause ? ` (cause: ${err.cause.message || err.cause.code || err.cause})` : '';
    console.error('FATAL:', (err.message || err) + cause);
    process.exit(1);
  });
}
