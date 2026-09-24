// Lodestar live exposure engine (docs/BUILD_BRIEF.md §3c).
//
// Scores every OEM site, input origin and lane-crossing chokepoint 0-100 from
// live public signals, each score carrying the evidence behind it. Product
// exposure is the max over its inputs, sites and lanes plus a time-to-survive /
// time-to-recover gap penalty (TTS/TTR are synthetic, and labelled so).
//
// Every external number here comes from a live feed with its source, date and
// link. When a feed fails, its signals are simply absent and the failure is
// reported in `feeds`, never replaced with a made-up value.

import { fetchCachedRiskScores } from '@/services/cached-risk-scores';
import {
  type Indexed, type Family, laneWaypoints, countryOf, chokepointByPortwatchName,
} from './network';

export interface Evidence {
  signal: 'chokepoint' | 'quake' | 'natural' | 'advisory' | 'country-risk' | 'export-control';
  text: string;
  source: string;
  url?: string;
  at?: string;
  points: number;
  /** Provenance: live feed, or S/est/synth for OEM-side facts. */
  prov: 'live' | 'S' | 'est' | 'synth';
}

export type HotspotKind = 'site' | 'input' | 'chokepoint';

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

export interface FeedStatus { name: string; ok: boolean; at: string; detail?: string }

export interface ExposureResult {
  computedAt: string;
  hotspots: Hotspot[];
  products: ProductExposure[];
  /** Lane id -> max chokepoint score along it. */
  laneScores: Map<string, number>;
  feeds: FeedStatus[];
}

// ---------- live feeds ----------

async function getJson<T>(path: string): Promise<T> {
  const r = await fetch(path, { headers: { Accept: 'application/json' } });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json() as Promise<T>;
}

interface ChokepointStatus { id: string; name: string; status: string; disruptionScore: number; activeWarnings: number }
interface HistoryPoint { date: string; total: number }
interface Quake { id: string; place: string; magnitude: number; location: { latitude: number; longitude: number }; occurredAt: number; sourceUrl?: string }
interface NaturalEvent { id: string; title: string; category: string; categoryTitle?: string; lat: number; lon: number; date: number; sourceUrl?: string; sourceName?: string; closed?: boolean; windKt?: number }
interface Advisory { title: string; link: string; pubDate: string; source: string; level: string; country: string }

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
function chokepointTrafficEvidence(name: string, history: HistoryPoint[]): Evidence | null {
  const days = [...history].filter((h) => Number.isFinite(h.total)).sort((a, b) => b.date.localeCompare(a.date));
  if (days.length < 30) return null;
  const recent = days.slice(0, 7);
  const base = days.slice(7, 97);
  const avg = (xs: HistoryPoint[]) => xs.reduce((s, x) => s + x.total, 0) / xs.length;
  const recentAvg = avg(recent);
  const baseAvg = avg(base);
  if (baseAvg < 2) return null;
  const latest = days[0]!;
  const drop = 1 - latest.total / baseAvg;
  const points = Math.round(clamp(drop * 60, 0, 60));
  const pct = Math.round(drop * 100);
  return {
    signal: 'chokepoint',
    text: `${name}: ${latest.total} transit${latest.total === 1 ? '' : 's'} on ${latest.date} vs a 90-day average of ${baseAvg.toFixed(1)}/day (${pct >= 0 ? '−' : '+'}${Math.abs(pct)}%). Last 7 days: ${recentAvg.toFixed(1)}/day.`,
    source: 'IMF PortWatch',
    url: 'https://portwatch.imf.org/pages/port-monitor',
    at: latest.date,
    points,
    prov: 'live',
  };
}

function chokepointStatusEvidence(cp: ChokepointStatus): Evidence | null {
  if (!cp.disruptionScore) return null;
  return {
    signal: 'chokepoint',
    text: `${cp.name}: status ${cp.status}, disruption score ${cp.disruptionScore}/100 (${cp.activeWarnings} active navigational warning${cp.activeWarnings === 1 ? '' : 's'}).`,
    source: 'NGA maritime safety warnings + threat config',
    url: 'https://msi.nga.mil/NavWarnings',
    points: Math.round(cp.disruptionScore * 0.4),
    prov: 'live',
  };
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

function countryRiskEvidence(iso: string | null, cii: Map<string, { name: string; score: number; level: string; trend: string }>): Evidence | null {
  if (!iso) return null;
  const c = cii.get(iso);
  if (!c || c.score < 45) return null;
  return {
    signal: 'country-risk',
    text: `Country instability for ${c.name}: ${Math.round(c.score)}/100 (${c.level}, ${c.trend}).`,
    source: 'Country Instability Index (conflict, unrest, advisories, sanctions, hazards)',
    points: Math.round(clamp((c.score - 40) * 1.1, 0, 55)),
    prov: 'live',
  };
}

function exportControlEvidence(controls: string | undefined): Evidence | null {
  if (!controls || !/export control|licens|ban|restrict|authoris/i.test(controls)) return null;
  return {
    signal: 'export-control',
    text: `Export controls on this input: ${controls}`,
    source: 'OEM network research (public reporting)',
    points: 30,
    prov: 'S',
  };
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

export async function computeExposure(ix: Indexed): Promise<ExposureResult> {
  const feeds: FeedStatus[] = [];
  const now = new Date().toISOString();
  const track = async <T>(name: string, fn: () => Promise<T>, fallback: T): Promise<T> => {
    try {
      const v = await fn();
      feeds.push({ name, ok: true, at: now });
      return v;
    } catch (err) {
      feeds.push({ name, ok: false, at: now, detail: err instanceof Error ? err.message : String(err) });
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

  const [status, quakes, natural, advisories, cii] = await Promise.all([
    track('Chokepoint status (NGA)', () => getJson<{ chokepoints: ChokepointStatus[] }>('/api/supply-chain/v1/get-chokepoint-status').then((d) => d.chokepoints ?? []), [] as ChokepointStatus[]),
    track('Earthquakes (USGS)', () => getJson<{ earthquakes: Quake[] }>('/api/seismology/v1/list-earthquakes').then((d) => d.earthquakes ?? []), [] as Quake[]),
    track('Natural events (EONET/GDACS/NHC)', () => getJson<{ events: NaturalEvent[] }>('/api/natural/v1/list-natural-events').then((d) => d.events ?? []), [] as NaturalEvent[]),
    track('Travel advisories', () => getJson<{ advisories: Advisory[]; byCountry: Record<string, string> }>('/api/intelligence/v1/list-security-advisories'), { advisories: [] as Advisory[], byCountry: {} as Record<string, string> }),
    track('Country instability (CII)', async () => {
      const r = await fetchCachedRiskScores();
      if (!r) throw new Error('no scores');
      return new Map(r.cii.map((c) => [c.code, { name: c.name, score: c.score, level: c.level, trend: c.trend }]));
    }, new Map<string, { name: string; score: number; level: string; trend: string }>()),
  ]);

  const histories = new Map<string, HistoryPoint[]>();
  await track('Chokepoint transits (IMF PortWatch)', async () => {
    const results = await Promise.all([...historyIds].map(async (id) => {
      const d = await getJson<{ history?: HistoryPoint[] }>(`/api/supply-chain/v1/get-chokepoint-history?chokepointId=${encodeURIComponent(id)}`);
      return [id, d.history ?? []] as const;
    }));
    let any = false;
    for (const [id, h] of results) { histories.set(id, h); if (h.length) any = true; }
    if (!any) throw new Error('no history');
  }, undefined);

  const hotspots: Hotspot[] = [];
  const familiesOf = (productIds: Iterable<string>): Family[] =>
    [...new Set([...productIds].map((p) => ix.productById.get(p)?.family).filter(Boolean) as Family[])];

  // Chokepoints on OEM lanes.
  const chokepointScore = new Map<string, number>();
  for (const [id, pwName] of laneChokepoints) {
    const cp = chokepointByPortwatchName(pwName)!;
    const ev: Evidence[] = [];
    const traffic = chokepointTrafficEvidence(cp.displayName, histories.get(id) ?? []);
    if (traffic) ev.push(traffic);
    const st = status.find((s) => s.id === id || s.name === cp.displayName);
    const stEv = st ? chokepointStatusEvidence(st) : null;
    if (stEv) ev.push(stEv);
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
    const control = exportControlEvidence(input.controls);
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
      if (control && iso && /China|Russia/i.test(input.controls ?? '') && ['CN', 'RU'].includes(iso)) ev.push(control);
      else if (control && i === 0 && !/China|Russia/i.test(input.controls ?? '')) ev.push(control);
      // The input's own chokepoint hook (network.json live.portwatch_chokepoint)
      // applies to its primary origin, e.g. Gulf helium through Hormuz.
      const hook = input.live?.portwatch_chokepoint;
      if (hook && i === 0) {
        const cp = chokepointByPortwatchName(hook);
        const traffic = cp ? chokepointTrafficEvidence(cp.displayName, histories.get(cp.id) ?? []) : null;
        if (traffic) ev.push(traffic);
      }
      hotspots.push({
        id: `input:${input.id}:${i}`, kind: 'input', title: `${input.name}`,
        subtitle: o.place,
        lat: o.lat, lon: o.lon, score: combine(ev), evidence: ev,
        products: input.used_in, families: familiesOf(input.used_in),
      });
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
    const drivers = hotspots.filter((h) => h.products.includes(p.id) && h.score > 0).sort((a, b) => b.score - a.score);
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

  hotspots.sort((a, b) => b.score - a.score);
  return { computedAt: now, hotspots, products, laneScores, feeds };
}
