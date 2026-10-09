// Lodestar live exposure engine (docs/BUILD_BRIEF.md §3c).
//
// Scores every OEM site, input origin and lane-crossing chokepoint 0-100 from
// live public signals, each score carrying the evidence behind it. Product
// exposure is the max over its inputs, sites and lanes plus a time-to-survive /
// time-to-recover gap penalty (TTS/TTR are synthetic, and labelled so).
//
// Every external number here comes from a live feed with its source, date and
// link. When a feed fails, its last good real payload is used with its real
// timestamp (see "last-good fallback"), or its signals are absent; the failure
// is reported in `feeds`, never replaced with a made-up value.

import { fetchCachedRiskScores } from '@/services/cached-risk-scores';
import {
  type Indexed, type Family, laneWaypoints, countryOf, chokepointByPortwatchName,
} from './network';

export interface Evidence {
  signal: 'chokepoint' | 'quake' | 'natural' | 'advisory' | 'country-risk' | 'export-control' | 'regulatory' | 'device-regulatory' | 'news' | 'commodity';
  text: string;
  source: string;
  url?: string;
  at?: string;
  points: number;
  /** Provenance: live feed, or S/est/synth for OEM-side facts. */
  prov: 'live' | 'S' | 'est' | 'synth';
  /** Live evidence restored from a last-good copy because its feed failed. */
  stale?: boolean;
}

export type HotspotKind = 'site' | 'input' | 'chokepoint' | 'regulatory';

export interface Hotspot {
  id: string;
  kind: HotspotKind;
  title: string;
  subtitle: string;
  lat: number;
  lon: number;
  score: number;
  evidence: Evidence[];
  products: string[];
  families: Family[];
}

export interface ProductExposure {
  productId: string;
  name: string;
  family: Family;
  score: number;
  topDriver: Hotspot | null;
  gapPenalty: number;
  drivers: Hotspot[];
}

export interface FeedStatus { name: string; ok: boolean; at: string; detail?: string; stale?: boolean; /** Parts of a live feed that are missing (e.g. the GDELT pulse). */ partial?: string[] }

export interface ExposureResult {
  computedAt: string;
  hotspots: Hotspot[];
  products: ProductExposure[];
  /** Lane id -> max chokepoint score along it. */
  laneScores: Map<string, number>;
  feeds: FeedStatus[];
  /** Raw regulatory/news signals, for the regulatory & trade watch panel. */
  signals: Signals | null;
}

// ---------- live feeds ----------

async function getJson<T>(path: string): Promise<T> {
  const r = await fetch(path, { headers: { Accept: 'application/json' } });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json() as Promise<T>;
}

interface ChokepointStatus { id: string; name: string; status: string; disruptionScore: number; activeWarnings: number; warRiskTier?: string; fetchedAt?: string }
interface HistoryPoint { date: string; total: number }
interface Quake { id: string; place: string; magnitude: number; location: { latitude: number; longitude: number }; occurredAt: number; sourceUrl?: string }
interface NaturalEvent { id: string; title: string; category: string; categoryTitle?: string; lat: number; lon: number; date: number; sourceUrl?: string; sourceName?: string; closed?: boolean; windKt?: number }
interface Advisory { title: string; link: string; pubDate: string; source: string; level: string; country: string }
export interface FrItem { title: string; url: string; date: string; type: string; agencies: string[] }
export interface Signals {
  federalRegister: Array<{ term: string; inputs: string[]; items: FrItem[]; error?: boolean }>;
  fda: { configured: boolean; recalls: Array<{ product: string; reason: string; status?: string; initiated?: string; url?: string }>; clearances: Array<{ device: string; kNumber?: string; date?: string; url?: string }> };
  newsPulse: { inputs: Record<string, { query: string; z: number | null; recentAvg: number | null; baselineAvg: number | null; articles: Array<{ title: string; url: string; domain?: string; seendate?: string }> }>; fetchedAt: number } | null;
  telegram: TelegramWatch | null;
  errors: string[];
}
export interface TelegramPost {
  id: string; channel: string; label: string; kind: 'news' | 'government' | 'osint';
  at: string; url: string; text: string;
  tags: Array<{ id: string; label: string; kind: string; input?: string }>;
}
export interface TelegramWatch {
  posts: TelegramPost[];
  channels: Array<{ handle: string; label: string; kind: string; ok: boolean; relevant?: number }>;
  scanned: number;
  fetchedAt: number;
}
interface Quote { symbol: string; price: number; change: number }

const R_EARTH_KM = 6371;
function distanceKm(aLat: number, aLon: number, bLat: number, bLon: number): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(bLat - aLat);
  const dLon = toRad(bLon - aLon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R_EARTH_KM * Math.asin(Math.sqrt(h));
}

const clamp = (v: number, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, v));
const stripEmoji = (t: string) => t.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F000}-\u{1F2FF}]\uFE0F?/gu, '').trim();
const regionNames = (() => { try { return new Intl.DisplayNames(['en'], { type: 'region' }); } catch { return null; } })();
const countryName = (iso: string) => regionNames?.of(iso) ?? iso;
const fmtDate = (ms: number | string) => new Date(ms).toISOString().slice(0, 10);

// ---------- scoring rules ----------

const NEAR_KM = 300;
// Advisories are a people-safety signal, so they weigh less than direct supply signals.
const ADVISORY_POINTS: Record<string, number> = { 'do-not-travel': 30, reconsider: 15 };
const ADVISORY_LABEL: Record<string, string> = { 'do-not-travel': 'Do not travel', reconsider: 'Reconsider travel' };

/** PortWatch: (1 - latest day / 90-day baseline) x 60, per the brief; 7-day average as context. */
// Traffic is the last 7 days' average against the chokepoint's long-run normal
// (2025 average, network.json chokepoint_norms), so a closure that drags on
// keeps reading as a closure. A rolling baseline drifts down with it: by 9 Oct
// Hormuz at ~3/day read as only -38% against its own crisis-era 90 days.
// Without a normal, it falls back to the 90 days before last week.
function chokepointTrafficEvidence(name: string, history: HistoryPoint[], norm?: { perDay: number; period: string; src: string }): Evidence | null {
  const days = [...history].filter((h) => Number.isFinite(h.total)).sort((a, b) => b.date.localeCompare(a.date));
  if (days.length < 7) return null;
  const recent = days.slice(0, 7);
  const avg = (xs: HistoryPoint[]) => xs.reduce((s, x) => s + x.total, 0) / xs.length;
  const recentAvg = avg(recent);
  const latest = days[0]!;
  let baseAvg: number;
  let baseLabel: string;
  if (norm && norm.perDay >= 2) {
    baseAvg = norm.perDay;
    baseLabel = `${baseAvg.toFixed(1)}/day in ${norm.period}`;
  } else {
    if (days.length < 30) return null;
    baseAvg = avg(days.slice(7, 97));
    if (baseAvg < 2) return null;
    baseLabel = `a 90-day average of ${baseAvg.toFixed(1)}/day before last week`;
  }
  const drop = 1 - recentAvg / baseAvg;
  const points = Math.round(clamp(drop * 60, 0, 60));
  const pct = Math.round(drop * 100);
  return {
    signal: 'chokepoint',
    text: `${name}: ${recentAvg.toFixed(1)} transits/day over the 7 days to ${latest.date} vs ${baseLabel} (${pct === 0 ? 'no change' : `${pct > 0 ? '−' : '+'}${Math.abs(pct)}%`}). Latest day: ${latest.total}.`,
    source: 'IMF PortWatch',
    url: 'https://portwatch.imf.org/pages/port-monitor',
    at: latest.date,
    points,
    prov: 'live',
  };
}

// Upstream's chokepoint "disruption score" is mostly a fixed editorial threat
// level (Lloyd's Joint War Committee listed areas + OSINT; THREAT_CONFIG_LAST_REVIEWED
// in server/worldmonitor/supply-chain/v1/get-chokepoint-status.ts). Only the
// navigational warnings are live, so the two are separate evidence items.
const WAR_RISK: Record<string, [string, number]> = {
  WAR_RISK_TIER_WAR_ZONE: ['war zone', 70], WAR_RISK_TIER_CRITICAL: ['critical', 40],
  WAR_RISK_TIER_HIGH: ['high', 30], WAR_RISK_TIER_ELEVATED: ['elevated', 15],
};
const THREAT_CONFIG_REVIEWED = '4 Mar 2026';

function chokepointStatusEvidence(cp: ChokepointStatus): Evidence[] {
  const out: Evidence[] = [];
  const n = cp.activeWarnings ?? 0;
  if (n > 0) out.push({
    signal: 'chokepoint',
    text: `${cp.name}: ${n} active navigational warning${n === 1 ? '' : 's'} in the area.`,
    source: 'NGA maritime safety information',
    url: 'https://msi.nga.mil/NavWarnings',
    at: cp.fetchedAt ? fmtDate(cp.fetchedAt) : undefined,
    points: Math.min(15, n * 5),
    prov: 'live',
  });
  const tier = cp.warRiskTier ? WAR_RISK[cp.warRiskTier] : undefined;
  if (tier) out.push({
    signal: 'chokepoint',
    text: `${cp.name}: war-risk tier "${tier[0]}" (Lloyd's Joint War Committee listed areas and OSINT; threat configuration last reviewed ${THREAT_CONFIG_REVIEWED}).`,
    source: 'Editorial threat configuration (not a live feed)',
    points: Math.round(tier[1] * 0.4),
    prov: 'est',
  });
  return out;
}

function quakeEvidence(lat: number, lon: number, quakes: Quake[]): Evidence[] {
  const out: Evidence[] = [];
  const weekAgo = Date.now() - 7 * 86_400_000;
  for (const q of quakes) {
    if (q.magnitude < 4.5 || q.occurredAt < weekAgo) continue;
    const d = distanceKm(lat, lon, q.location.latitude, q.location.longitude);
    if (d > NEAR_KM) continue;
    const points = Math.round(clamp((q.magnitude - 4) * 25 * (1 - d / NEAR_KM), 0, 80));
    if (points < 5) continue;
    out.push({
      signal: 'quake',
      text: `M${q.magnitude.toFixed(1)} earthquake ${Math.round(d)} km away: ${q.place}.`,
      source: 'USGS',
      url: q.sourceUrl,
      at: fmtDate(q.occurredAt),
      points,
      prov: 'live',
    });
  }
  return out;
}

function naturalEvidence(lat: number, lon: number, events: NaturalEvent[]): Evidence[] {
  const out: Evidence[] = [];
  for (const e of events) {
    if (e.closed) continue;
    const d = distanceKm(lat, lon, e.lat, e.lon);
    if (d > NEAR_KM) continue;
    // Droughts span whole regions around a centroid: a weak signal for a site.
    const drought = /drought/i.test(`${e.category} ${e.title}`);
    const severe = (e.windKt ?? 0) >= 64 || /volcano/i.test(e.category);
    const base = drought ? 10 : severe ? 55 : 35;
    const points = Math.round(clamp(base * (1 - d / NEAR_KM), 0, 60));
    if (points < 5) continue;
    out.push({
      signal: 'natural',
      text: `${stripEmoji(e.title)} (${e.categoryTitle ?? e.category}) ${Math.round(d)} km away.`,
      source: e.sourceName ?? 'NASA EONET / GDACS',
      url: e.sourceUrl,
      at: e.date ? fmtDate(e.date) : undefined,
      points,
      prov: 'live',
    });
  }
  return out;
}

function advisoryEvidence(iso: string | null, byCountry: Record<string, string>, advisories: Advisory[]): Evidence | null {
  if (!iso) return null;
  const level = byCountry[iso];
  const points = level ? ADVISORY_POINTS[level] : undefined;
  if (!points) return null;
  const a = advisories.find((x) => x.country === iso);
  return {
    signal: 'advisory',
    text: `${countryName(iso)}: government travel advisory at "${ADVISORY_LABEL[level!] ?? level}".`,
    source: a?.source ?? 'Government travel advisories',
    url: a?.link,
    at: a?.pubDate ? fmtDate(a.pubDate) : undefined,
    points,
    prov: 'live',
  };
}

type CiiEntry = { name: string; score: number; level: string; trend: string; lastUpdated?: string | null };

function countryRiskEvidence(iso: string | null, cii: Map<string, CiiEntry>): Evidence | null {
  if (!iso) return null;
  const c = cii.get(iso);
  // A country the index itself rates normal or low adds nothing.
  if (!c || c.score < 45 || c.level === 'normal' || c.level === 'low') return null;
  return {
    signal: 'country-risk',
    text: `Country instability for ${c.name}: ${Math.round(c.score)}/100 (${c.level}, ${c.trend}).`,
    source: 'Country Instability Index (World Monitor composite: conflict, unrest, advisories, sanctions, hazards)',
    at: c.lastUpdated ? fmtDate(c.lastUpdated) : undefined,
    points: Math.round(clamp((c.score - 40) * 1.1, 0, 55)),
    prov: 'live',
  };
}

function exportControlEvidence(controls: string | undefined, src?: string): Evidence | null {
  if (!controls || !/export control|licens|ban|restrict|authoris/i.test(controls)) return null;
  return {
    signal: 'export-control',
    text: `Export controls on this input: ${controls}`,
    source: 'OEM network research (public reporting)',
    url: src,
    points: 30,
    // The control text carries its own tags: sourced if any part is (S), else an estimate.
    prov: /\(S\)/.test(controls) ? 'S' : 'est',
  };
}

function frEvidence(it: FrItem, term: string, points: number): Evidence {
  return {
    signal: 'regulatory',
    text: `Federal Register (${it.type}${it.agencies[0] ? `, ${it.agencies[0]}` : ''}): ${it.title}`,
    source: `Federal Register · watch term "${term}"`,
    url: it.url, at: it.date, points, prov: 'live',
  };
}

/** Federal Register items, GDELT volume spikes and commodity moves for one input. */
function inputSignalEvidence(inputId: string, yahoo: string | undefined, signals: Signals | null, quotes: Quote[]): Evidence[] {
  const out: Evidence[] = [];
  for (const g of signals?.federalRegister ?? []) {
    if (!g.inputs.includes(inputId)) continue;
    g.items.slice(0, 2).forEach((it, k) => out.push(frEvidence(it, g.term, k === 0 ? 22 : 10)));
  }
  const p = signals?.newsPulse?.inputs?.[inputId];
  if (p && p.z != null && p.z >= 2) {
    const top = p.articles[0];
    out.push({
      signal: 'news',
      text: `News volume on "${p.query}" is ${p.z.toFixed(1)} standard deviations above its 4-week norm.${top ? ` Top story: ${top.title}` : ''}`,
      source: `GDELT${top?.domain ? ` · ${top.domain}` : ''}`,
      url: top?.url, at: signals?.newsPulse?.fetchedAt ? fmtDate(signals.newsPulse.fetchedAt) : undefined,
      points: Math.round(clamp(10 + p.z * 5, 0, 35)), prov: 'live',
    });
  }
  const q = yahoo ? quotes.find((x) => x.symbol === yahoo) : undefined;
  if (q && Number.isFinite(q.change) && Math.abs(q.change) >= 1) {
    out.push({
      signal: 'commodity',
      text: `${yahoo} ${q.change > 0 ? 'up' : 'down'} ${Math.abs(q.change).toFixed(2)}% on the latest daily move, at ${q.price}. A cost signal, not a supply one.`,
      source: 'Yahoo Finance (via commodity quotes, refreshed every 2 hours)',
      url: `https://finance.yahoo.com/quote/${encodeURIComponent(yahoo!)}`,
      points: Math.round(clamp(Math.abs(q.change) * 3, 0, 15)), prov: 'live',
    });
  }
  return out;
}

/** The feed an evidence item came from (names as in `feeds`). */
function feedOf(e: Evidence): string {
  switch (e.signal) {
    case 'chokepoint': return e.source.startsWith('IMF PortWatch') ? 'Chokepoint transits (IMF PortWatch)' : 'Chokepoint status (NGA)';
    case 'quake': return 'Earthquakes (USGS)';
    case 'natural': return 'Natural events (EONET/GDACS/NHC)';
    case 'advisory': return 'Travel advisories';
    case 'country-risk': return 'Country instability (CII)';
    case 'commodity': return 'Commodity quotes (Yahoo)';
    case 'regulatory': case 'device-regulatory': case 'news': return 'Federal Register, openFDA, GDELT pulse';
    default: return '';
  }
}

/** Score items "worth diving into" start here (map markers, heat, installs at risk). */
export const HOT = 35;

/** Installs at risk shown on the board and brief: exposure-weighted, and none below HOT. Synthetic. */
export function installsAtRisk(installsDue: number, score: number): number {
  return score >= HOT ? Math.round(installsDue * (score / 100)) : 0;
}

/** What each item actually adds to the score under combine(): the strongest in full, the rest at 25%. */
export function contributions(evidence: Evidence[]): Map<Evidence, number> {
  const sorted = evidence.slice().sort((a, b) => b.points - a.points);
  return new Map(sorted.map((e, i) => [e, i === 0 ? e.points : Math.round(e.points * 0.25)]));
}

function combine(evidence: Evidence[]): number {
  // Max signal, plus a smaller share of the rest: two independent live signals
  // agreeing should rank above either one alone, without runaway sums.
  const pts = evidence.map((e) => e.points).sort((a, b) => b - a);
  if (!pts.length) return 0;
  const rest = pts.slice(1).reduce((s, p) => s + p, 0);
  return Math.round(clamp(pts[0]! + rest * 0.25));
}

// ---------- engine ----------

/** Product families an FDA generic device class belongs to ([] if it spans modalities). */
export function familiesForDeviceClass(name: string): Family[] {
  const n = name.toLowerCase();
  // Emission tomography (PET/SPECT) first: its class name also says "tomography, computed".
  if (/emission|nuclear|positron|gamma camera|scintillation/.test(n)) return ['MI'];
  if (/tomography, computed|computed tomography/.test(n)) return ['CT'];
  if (/magnetic resonance/.test(n)) return ['MR'];
  if (/ultrason|sonograph|echocardiograph/.test(n)) return ['US'];
  if (/x-ray|radiograph|mammograph|fluorosc/.test(n)) return ['XR'];
  return [];
}

type Recall = Signals['fda']['recalls'][number];
/** One row per recall event: openFDA lists each affected product separately. */
export function groupRecalls(recalls: Recall[]): Array<Recall & { count: number }> {
  const out = new Map<string, Recall & { count: number }>();
  for (const r of recalls) {
    const k = `${r.product}|${r.initiated}|${r.status}|${r.reason}`;
    const g = out.get(k);
    if (g) g.count += 1; else out.set(k, { ...r, count: 1 });
  }
  return [...out.values()];
}

// ---------- last-good fallback ----------
//
// Tier 1: live. Tier 2: this browser's last good payload per feed. Tier 3: the
// deployed snapshot (public/snapshot/last-good.json), exported from a browser
// that had live data. Tiers 2 and 3 are real data shown with their real, older
// timestamp and labelled as such; nothing is ever invented.

const LAST_GOOD_PREFIX = 'lodestar-last-good:';
interface SavedFeed { at: string; value?: unknown; map?: Array<[unknown, unknown]> }
interface Snapshot { exportedAt: string; feeds: Record<string, SavedFeed> }

let snapshotPromise: Promise<Snapshot | null> | null = null;
function deployedSnapshot(): Promise<Snapshot | null> {
  snapshotPromise ??= getJson<Snapshot>('/snapshot/last-good.json')
    .then((s) => (s?.feeds ? s : null))
    .catch(() => null);
  return snapshotPromise;
}

const restore = <T>(saved: SavedFeed): T => (saved.map ? new Map(saved.map) : saved.value) as T;
const utc = (iso: string) => `${iso.slice(0, 16).replace('T', ' ')} UTC`;

/** Every feed's last good payload in this browser, in the snapshot file format. */
export function exportSnapshot(): Snapshot {
  const feeds: Record<string, SavedFeed> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (!k?.startsWith(LAST_GOOD_PREFIX)) continue;
    try { feeds[k.slice(LAST_GOOD_PREFIX.length)] = JSON.parse(localStorage.getItem(k) ?? 'null'); } catch { /* skip */ }
  }
  return { exportedAt: new Date().toISOString(), feeds };
}

// ---------- engine ----------

export async function computeExposure(ix: Indexed): Promise<ExposureResult> {
  const feeds: FeedStatus[] = [];
  const now = new Date().toISOString();
  // Map values are stored as entry arrays.
  const track = async <T>(name: string, fn: () => Promise<T>, fallback: T): Promise<T> => {
    const storeKey = `${LAST_GOOD_PREFIX}${name}`;
    try {
      const v = await fn();
      feeds.push({ name, ok: true, at: now });
      try {
        const payload = v instanceof Map ? { map: [...v.entries()] } : { value: v };
        localStorage.setItem(storeKey, JSON.stringify({ at: now, ...payload }));
      } catch { /* storage full or unavailable: live data still used */ }
      return v;
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err);
      try {
        const saved = JSON.parse(localStorage.getItem(storeKey) ?? 'null') as SavedFeed | null;
        if (saved?.at) {
          feeds.push({ name, ok: false, at: saved.at, detail: `${detail}; showing this browser's last good data from ${utc(saved.at)}`, stale: true });
          return restore<T>(saved);
        }
      } catch { /* no usable last-good copy */ }
      const snap = (await deployedSnapshot())?.feeds[name];
      if (snap?.at) {
        feeds.push({ name, ok: false, at: snap.at, detail: `${detail}; showing the deployed snapshot from ${utc(snap.at)}`, stale: true });
        return restore<T>(snap);
      }
      feeds.push({ name, ok: false, at: now, detail });
      return fallback;
    }
  };

  // Chokepoints the lanes actually cross.
  const laneChokepoints = new Map<string, string>(); // registry id -> portwatch name
  for (const lane of ix.net.lanes) for (const v of lane.via) {
    const cp = chokepointByPortwatchName(v);
    if (cp) laneChokepoints.set(cp.id, v);
  }
  const historyIds = new Set(laneChokepoints.keys());
  for (const input of ix.net.inputs) {
    const cp = input.live?.portwatch_chokepoint ? chokepointByPortwatchName(input.live.portwatch_chokepoint) : null;
    if (cp) historyIds.add(cp.id);
  }

  const [status, quakes, natural, advisories, cii, signals, quotes] = await Promise.all([
    track('Chokepoint status (NGA)', () => getJson<{ chokepoints: ChokepointStatus[]; fetchedAt?: string }>('/api/supply-chain/v1/get-chokepoint-status')
      .then((d) => (d.chokepoints ?? []).map((c) => ({ ...c, fetchedAt: d.fetchedAt }))), [] as ChokepointStatus[]),
    track('Earthquakes (USGS)', () => getJson<{ earthquakes: Quake[] }>('/api/seismology/v1/list-earthquakes').then((d) => d.earthquakes ?? []), [] as Quake[]),
    track('Natural events (EONET/GDACS/NHC)', () => getJson<{ events: NaturalEvent[] }>('/api/natural/v1/list-natural-events').then((d) => d.events ?? []), [] as NaturalEvent[]),
    // Only levels that score are kept (smaller last-good copies; nothing else is read).
    track('Travel advisories', () => getJson<{ advisories: Advisory[]; byCountry: Record<string, string> }>('/api/intelligence/v1/list-security-advisories').then((d) => {
      const byCountry = Object.fromEntries(Object.entries(d.byCountry ?? {}).filter(([, level]) => ADVISORY_POINTS[level]));
      return { byCountry, advisories: (d.advisories ?? []).filter((a) => byCountry[a.country]) };
    }), { advisories: [] as Advisory[], byCountry: {} as Record<string, string> }),
    track('Country instability (CII)', async () => {
      const r = await fetchCachedRiskScores();
      if (!r) throw new Error('no scores');
      return new Map<string, CiiEntry>(r.cii.map((c) => [c.code, { name: c.name, score: c.score, level: c.level, trend: c.trend, lastUpdated: c.lastUpdated }]));
    }, new Map<string, CiiEntry>()),
    track('Federal Register, openFDA, GDELT pulse', () => getJson<Signals>('/api/lodestar/signals'), null as Signals | null),
    track('Commodity quotes (Yahoo)', () => getJson<{ quotes: Quote[] }>('/api/market/v1/list-commodity-quotes').then((d) => d.quotes ?? []), [] as Quote[]),
  ]);

  // The signals feed can answer while one of its parts is missing: say which.
  const signalsFeed = feeds.find((f) => f.name === 'Federal Register, openFDA, GDELT pulse');
  if (signalsFeed?.ok && signals?.errors?.length) signalsFeed.partial = signals.errors;

  const histories = await track('Chokepoint transits (IMF PortWatch)', async () => {
    // One chokepoint without history must not sink the others.
    const results = await Promise.all([...historyIds].map(async (id) => {
      const d = await getJson<{ history?: HistoryPoint[] }>(`/api/supply-chain/v1/get-chokepoint-history?chokepointId=${encodeURIComponent(id)}`)
        .catch(() => ({ history: [] as HistoryPoint[] }));
      return [id, d.history ?? []] as const;
    }));
    if (!results.some(([, h]) => h.length)) throw new Error('no history');
    return new Map<string, HistoryPoint[]>(results);
  }, new Map<string, HistoryPoint[]>());

  const hotspots: Hotspot[] = [];
  const familiesOf = (productIds: Iterable<string>): Family[] =>
    [...new Set([...productIds].map((p) => ix.productById.get(p)?.family).filter(Boolean) as Family[])];

  const norms = ix.net.chokepoint_norms;
  const normFor = (pwName: string) => (norms?.per_day?.[pwName] ? { perDay: norms.per_day[pwName]!, period: norms.period, src: norms.src } : undefined);

  // Chokepoints on OEM lanes.
  const chokepointScore = new Map<string, number>();
  for (const [id, pwName] of laneChokepoints) {
    const cp = chokepointByPortwatchName(pwName)!;
    const ev: Evidence[] = [];
    const traffic = chokepointTrafficEvidence(cp.displayName, histories.get(id) ?? [], normFor(pwName));
    if (traffic) ev.push(traffic);
    const st = status.find((s) => s.id === id || s.name === cp.displayName);
    if (st) ev.push(...chokepointStatusEvidence(st));
    const products = new Set<string>();
    for (const lane of ix.net.lanes) if (lane.via.includes(pwName)) lane.products.forEach((p) => products.add(p));
    const score = combine(ev);
    chokepointScore.set(id, score);
    hotspots.push({
      id: `cp:${id}`, kind: 'chokepoint', title: cp.displayName,
      subtitle: `Chokepoint on ${[...ix.net.lanes].filter((l) => l.via.includes(pwName)).length} OEM lane(s)`,
      lat: cp.lat, lon: cp.lon, score, evidence: ev, products: [...products], families: familiesOf(products),
    });
  }

  // Sites (plants, sub-assembly, DC, ports, airports, demand regions).
  for (const site of ix.net.sites) {
    const iso = countryOf(site.name);
    const ev: Evidence[] = [
      ...quakeEvidence(site.lat, site.lon, quakes),
      ...naturalEvidence(site.lat, site.lon, natural),
    ];
    const adv = advisoryEvidence(iso, advisories.byCountry, advisories.advisories);
    if (adv) ev.push(adv);
    const risk = countryRiskEvidence(iso, cii);
    if (risk) ev.push(risk);
    const products = ix.productsBySite.get(site.id) ?? new Set<string>();
    hotspots.push({
      id: `site:${site.id}`, kind: 'site', title: site.name,
      subtitle: site.role ?? site.type,
      lat: site.lat, lon: site.lon, score: combine(ev), evidence: ev,
      products: [...products], families: familiesOf(products),
    });
  }

  // Critical-input origins.
  for (const input of ix.net.inputs) {
    const control = exportControlEvidence(input.controls, input.src);
    input.origin.forEach((o, i) => {
      const iso = countryOf(o.place);
      const ev: Evidence[] = [
        ...quakeEvidence(o.lat, o.lon, quakes),
        ...naturalEvidence(o.lat, o.lon, natural),
      ];
      const adv = advisoryEvidence(iso, advisories.byCountry, advisories.advisories);
      if (adv) ev.push(adv);
      const risk = countryRiskEvidence(iso, cii);
      if (risk) ev.push(risk);
      // Export controls attach to the origins they apply to: China/Russia
      // origins when the controls name them, otherwise the primary origin.
      // (If no origin is in China/Russia, e.g. tellurium or indium processed
      // elsewhere, the control still bears on the primary origin.)
      const namesCnRu = /China|Russia/i.test(input.controls ?? '');
      const hasCnRuOrigin = input.origin.some((x) => ['CN', 'RU'].includes(countryOf(x.place) ?? ''));
      if (control && iso && namesCnRu && hasCnRuOrigin && ['CN', 'RU'].includes(iso)) ev.push(control);
      else if (control && i === 0 && !(namesCnRu && hasCnRuOrigin)) ev.push(control);
      // The input's own chokepoint hook (network.json live.portwatch_chokepoint)
      // applies to its primary origin, e.g. Gulf helium through Hormuz.
      const hook = input.live?.portwatch_chokepoint;
      if (hook && i === 0) {
        const cp = chokepointByPortwatchName(hook);
        const traffic = cp ? chokepointTrafficEvidence(cp.displayName, histories.get(cp.id) ?? [], normFor(hook)) : null;
        if (traffic) ev.push(traffic);
      }
      if (i === 0) ev.push(...inputSignalEvidence(input.id, input.live?.yahoo, signals, quotes));
      hotspots.push({
        id: `input:${input.id}:${i}`, kind: 'input', title: `${input.name}`,
        subtitle: o.place,
        lat: o.lat, lon: o.lon, score: combine(ev), evidence: ev,
        products: input.used_in, families: familiesOf(input.used_in),
      });
    });
  }

  // Trade/regulatory watch terms not tied to one input, and device regulatory.
  const allProducts = ix.net.products.map((p) => p.id);
  const general = (signals?.federalRegister ?? []).filter((g) => g.inputs.length === 0 && g.items.length);
  if (general.length) {
    const ev: Evidence[] = general.flatMap((g) => g.items.slice(0, 2).map((it) => frEvidence(it, g.term, 18)));
    hotspots.push({
      id: 'reg:us-trade', kind: 'regulatory', title: 'US trade & tariff actions',
      subtitle: `Federal Register, last 14 days: ${general.map((g) => g.term).join(', ')}`,
      lat: 38.9, lon: -77.03, score: combine(ev), evidence: ev, products: allProducts, families: familiesOf(allProducts),
    });
  }
  if (signals?.fda?.configured) {
    // Terminated recalls are closed; recalls whose device class maps to a
    // product line score, cross-modality ones only when nothing else does.
    const openRecalls = groupRecalls(signals.fda.recalls).filter((r) => !/terminated/i.test(r.status ?? ''));
    const mapped = openRecalls.filter((r) => familiesForDeviceClass(r.product).length);
    const ev: Evidence[] = [
      ...(mapped.length ? mapped : openRecalls).slice(0, 5).map((r) => ({
        signal: 'device-regulatory' as const,
        text: `FDA recall (${r.status ?? 'status n/a'}): ${r.product}${r.count > 1 ? ` (${r.count} product entries)` : ''}${r.reason ? ` — root cause: ${r.reason}` : ''}`,
        source: 'openFDA device recalls', url: r.url, at: r.initiated, points: 25, prov: 'live' as const,
      })),
    ];
    // A recall only bears on the product lines of its FDA device class; a
    // cross-modality class (e.g. image-processing software) stays on the
    // regulatory watch without driving any product's exposure.
    const recallFamilies = new Set(mapped.slice(0, 5).flatMap((r) => familiesForDeviceClass(r.product)));
    const fdaProducts = allProducts.filter((p) => recallFamilies.has(ix.productById.get(p)!.family));
    if (ev.length) hotspots.push({
      id: 'reg:fda', kind: 'regulatory', title: 'Device regulatory (FDA)',
      subtitle: fdaProducts.length ? 'Recalls initiated in the last 120 days' : 'Recalls in the last 120 days (no single product line)',
      lat: 39.03, lon: -76.98, score: combine(ev), evidence: ev, products: fdaProducts, families: familiesOf(fdaProducts),
    });
  }

  // Lanes take the worst chokepoint they cross.
  const laneScores = new Map<string, number>();
  for (const lane of ix.net.lanes) {
    let s = 0;
    for (const w of laneWaypoints(ix, lane)) if (w.chokepointId) s = Math.max(s, chokepointScore.get(w.chokepointId) ?? 0);
    laneScores.set(lane.id, s);
  }

  // Product exposure: max over its sites, inputs and lanes, plus TTS/TTR gap.
  const products: ProductExposure[] = ix.net.products.map((p) => {
    // Ties go to the input (e.g. helium at Ras Laffan over the Hormuz chokepoint it depends on).
    const drivers = hotspots.filter((h) => h.products.includes(p.id) && h.score > 0)
      .sort((a, b) => b.score - a.score || Number(b.kind === 'input') - Number(a.kind === 'input'));
    const base = drivers[0]?.score ?? 0;
    let gap = 0;
    for (const inputId of p.inputs) {
      const inp = ix.inputById.get(inputId);
      if (!inp?.tts_days || !inp.ttr_days) continue;
      const inputScore = Math.max(0, ...hotspots.filter((h) => h.id.startsWith(`input:${inputId}:`)).map((h) => h.score));
      if (inputScore >= 30 && inp.ttr_days > inp.tts_days) gap = Math.max(gap, Math.min(15, (inp.ttr_days - inp.tts_days) / 8));
    }
    return {
      productId: p.id, name: p.name, family: p.family,
      score: Math.round(clamp(base + gap)), topDriver: drivers[0] ?? null,
      gapPenalty: Math.round(gap), drivers: drivers.slice(0, 5),
    };
  });

  // Mark live evidence that came from a last-good copy, so the page never shows it as current.
  const staleFeeds = new Set(feeds.filter((f) => f.stale).map((f) => f.name));
  if (staleFeeds.size) for (const h of hotspots) for (const e of h.evidence) if (e.prov === 'live' && staleFeeds.has(feedOf(e))) e.stale = true;

  hotspots.sort((a, b) => b.score - a.score);
  return { computedAt: now, hotspots, products, laneScores, feeds, signals };
}
