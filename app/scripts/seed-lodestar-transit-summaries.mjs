#!/usr/bin/env node
// Lodestar: build chokepoint transit summaries from PortWatch.
//
// Upstream writes supply_chain:transit-summaries:v1 (and the per-chokepoint
// history keys the card charts read) only from scripts/ais-relay.cjs, an
// always-on process Lodestar can't host. This one-shot does the PortWatch half
// of that job (see seedTransitSummaries in ais-relay.cjs) so the chokepoint
// cards get week-on-week change, the traffic-drop anomaly and the history chart.
//
// "Today" counts are left null on purpose: they are live AIS crossings in the
// relay, and PortWatch daily counts lag by several days. The cards withhold
// today's count rather than show a stale number as today's.
//
// Run after seed-portwatch.mjs.

import { loadEnvFile, runSeed, getRedisCredentials, writeExtraKey } from './_seed-utils.mjs';
import { unwrapEnvelope } from './_seed-envelope-source.mjs';
import { CHOKEPOINT_THREAT_LEVELS } from '../shared/chokepoint-threat-levels.js';
import { detectTrafficAnomaly } from '../shared/chokepoint-traffic-anomaly.js';

loadEnvFile(import.meta.url);

const PORTWATCH_KEY = 'supply_chain:portwatch:v1';
const CANONICAL_KEY = 'supply_chain:transit-summaries:v1';
const HISTORY_KEY_PREFIX = 'supply_chain:transit-summaries:history:v1:';
const TTL = 3600; // upstream's value; the CI runner raises it with SEED_MIN_TTL_SECONDS

async function readPortwatch() {
  const { url, token } = getRedisCredentials();
  const resp = await fetch(`${url}/get/${encodeURIComponent(PORTWATCH_KEY)}`, {
    headers: { Authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(10_000),
  });
  if (!resp.ok) throw new Error(`read ${PORTWATCH_KEY}: HTTP ${resp.status}`);
  const body = await resp.json();
  if (!body.result) throw new Error(`${PORTWATCH_KEY} is empty; run seed-portwatch first`);
  return unwrapEnvelope(JSON.parse(body.result)).data;
}

async function buildSummaries() {
  const pw = await readPortwatch();
  if (!pw || typeof pw !== 'object' || Object.keys(pw).length === 0) {
    throw new Error(`${PORTWATCH_KEY} has no chokepoints`);
  }

  const now = Date.now();
  const summaries = {};
  const missing = [];
  for (const cpId of Object.keys(CHOKEPOINT_THREAT_LEVELS)) {
    const cpData = pw[cpId];
    if (!cpData) missing.push(cpId);
    const history = cpData?.history ?? [];
    summaries[cpId] = {
      todayTotal: null,
      todayTanker: null,
      todayCargo: null,
      todayOther: null,
      wowChangePct: cpData?.wowChangePct ?? 0,
      riskLevel: '',
      incidentCount7d: 0,
      disruptionPct: 0,
      riskSummary: '',
      riskReportAction: '',
      anomaly: detectTrafficAnomaly(history, CHOKEPOINT_THREAT_LEVELS[cpId] || 'normal'),
      dataAvailable: Boolean(cpData),
    };
    await writeExtraKey(
      `${HISTORY_KEY_PREFIX}${cpId}`,
      { chokepointId: cpId, history, fetchedAt: now },
      TTL,
      { fetchedAt: now, recordCount: history.length, sourceVersion: 'lodestar-transit-summaries-history', schemaVersion: 1, state: 'OK' },
    );
  }
  if (missing.length) console.warn(`  PortWatch missing: ${missing.join(', ')}`);
  const covered = Object.keys(summaries).length - missing.length;
  console.log(`  ${covered}/${Object.keys(summaries).length} chokepoints from PortWatch`);
  return { summaries, fetchedAt: now };
}

const isMain = process.argv[1]?.endsWith('seed-lodestar-transit-summaries.mjs');
if (isMain) {
  runSeed('supply_chain', 'transit-summaries', CANONICAL_KEY, buildSummaries, {
    validateFn: (data) => Object.values(data?.summaries ?? {}).some((s) => s.dataAvailable),
    ttlSeconds: TTL,
    sourceVersion: 'lodestar-transit-summaries',
    recordCount: (data) => Object.values(data.summaries).filter((s) => s.dataAvailable).length,
    declareRecords: (data) => Object.values(data?.summaries ?? {}).filter((s) => s.dataAvailable).length,
    schemaVersion: 1,
    maxStaleMin: 720,
  }).catch((err) => {
    const cause = err.cause ? ` (cause: ${err.cause.message || err.cause.code || err.cause})` : '';
    console.error('FATAL:', (err.message || err) + cause);
    process.exit(1);
  });
}
