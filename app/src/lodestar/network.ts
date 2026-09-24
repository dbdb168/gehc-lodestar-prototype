// Lodestar: the OEM supply network, loaded at runtime from /data/network.json
// (copied from the repo's data/network.json; never compiled into components).
// Every internal number carries a provenance tag: S (sourced public fact),
// est (estimate) or synth (synthetic demo value).

import { CHOKEPOINT_REGISTRY } from '@/config/chokepoint-registry';

export type Family = 'MR' | 'CT' | 'MI' | 'US' | 'XR';
export type FamilyFilter = Family | 'ALL';
export const FAMILIES: Family[] = ['MR', 'CT', 'MI', 'US', 'XR'];
export const FAMILY_LABELS: Record<FamilyFilter, string> = {
  ALL: 'All', MR: 'MR', CT: 'CT', MI: 'MI', US: 'US', XR: 'XR',
};

export interface Product {
  id: string;
  name: string;
  family: Family;
  final_assembly?: string[];
  subassembly?: string[];
  installs_next_90d?: number;
  installs_prov?: string;
  price_usd?: [number, number];
  price_prov?: string;
  inputs: string[];
  [key: string]: unknown;
}

export interface Site {
  id: string;
  name: string;
  type: 'plant' | 'subassembly' | 'dc' | 'port' | 'airport' | 'demand';
  lat: number;
  lon: number;
  role?: string;
  prov?: string;
  portwatch?: string;
  src?: string;
}

export interface InputOrigin {
  place: string;
  lat: number;
  lon: number;
  share?: string;
}

export interface Input {
  id: string;
  name: string;
  used_in: string[];
  origin: InputOrigin[];
  industry_suppliers?: string[];
  controls?: string;
  tts_days?: number;
  ttr_days?: number;
  cover_prov?: string;
  live?: { gdelt?: string; yahoo?: string; fred?: string; federal_register?: string; portwatch_chokepoint?: string };
  oem_link?: string;
  note?: string;
}

export interface Lane {
  id: string;
  from: string;
  to: string;
  mode: 'sea' | 'air' | 'road';
  products: string[];
  via: string[];
  alt?: string;
  note?: string;
}

export interface Network {
  meta: { as_of: string; provenance_legend: Record<string, string> };
  products: Product[];
  sites: Site[];
  inputs: Input[];
  lanes: Lane[];
  chokepoints_portwatch: string[];
  regulatory_watch?: { federal_register_terms?: string[] };
}

let cached: Promise<Network> | null = null;

export function loadNetwork(): Promise<Network> {
  if (!cached) {
    cached = fetch('/data/network.json', { cache: 'no-cache' }).then((r) => {
      if (!r.ok) throw new Error(`network.json: HTTP ${r.status}`);
      return r.json() as Promise<Network>;
    });
    cached.catch(() => { cached = null; });
  }
  return cached;
}

/** Chokepoint coordinates, keyed by the PortWatch name the lanes use. */
export function chokepointByPortwatchName(name: string): { id: string; lat: number; lon: number; displayName: string } | null {
  const cp = CHOKEPOINT_REGISTRY.find((c) => c.portwatchName === name || c.displayName === name);
  return cp ? { id: cp.id, lat: cp.lat, lon: cp.lon, displayName: cp.displayName } : null;
}

export interface Indexed {
  net: Network;
  productById: Map<string, Product>;
  siteById: Map<string, Site>;
  inputById: Map<string, Input>;
  /** Products each site serves (final assembly, subassembly, or on a lane). */
  productsBySite: Map<string, Set<string>>;
}

export function indexNetwork(net: Network): Indexed {
  const productById = new Map(net.products.map((p) => [p.id, p]));
  const siteById = new Map(net.sites.map((s) => [s.id, s]));
  const inputById = new Map(net.inputs.map((i) => [i.id, i]));
  const productsBySite = new Map<string, Set<string>>();
  const add = (site: string, product: string) => {
    if (!siteById.has(site)) return;
    if (!productsBySite.has(site)) productsBySite.set(site, new Set());
    productsBySite.get(site)!.add(product);
  };
  for (const p of net.products) {
    for (const s of [...(p.final_assembly ?? []), ...(p.subassembly ?? [])]) add(s, p.id);
  }
  for (const l of net.lanes) {
    for (const p of l.products) {
      add(l.from, p);
      add(l.to, p);
      for (const v of l.via) add(v, p);
    }
  }
  return { net, productById, siteById, inputById, productsBySite };
}

export function productMatches(ix: Indexed, productIds: Iterable<string>, filter: FamilyFilter): boolean {
  if (filter === 'ALL') return true;
  for (const id of productIds) if (ix.productById.get(id)?.family === filter) return true;
  return false;
}

/** Waypoints for a lane: site ids resolve to sites, other names to chokepoints. */
export function laneWaypoints(ix: Indexed, lane: Lane): Array<{ lon: number; lat: number; label: string; chokepointId?: string }> {
  const pts: Array<{ lon: number; lat: number; label: string; chokepointId?: string }> = [];
  const push = (ref: string) => {
    const site = ix.siteById.get(ref);
    if (site) { pts.push({ lon: site.lon, lat: site.lat, label: site.name }); return; }
    const cp = chokepointByPortwatchName(ref);
    if (cp) pts.push({ lon: cp.lon, lat: cp.lat, label: cp.displayName, chokepointId: cp.id });
  };
  push(lane.from);
  for (const v of lane.via) push(v);
  push(lane.to);
  return pts;
}

/**
 * ISO-3166 alpha-2 country for a site or origin, from the country named in its
 * place string. Covers every country in network.json; returns null otherwise.
 */
const COUNTRY_HINTS: Array<[RegExp, string]> = [
  [/, (WI|SC|OH|PA|WY)\b|\bUS\b|Kansas|Wyoming|Chicago|Los Angeles|New York|Charleston|US (Northeast|Southeast)/i, 'US'],
  [/China|Tianjin|Beijing|Shanghai|Baotou|Ganzhou/i, 'CN'],
  [/Japan|Hino|Hamamatsu|Tokyo/i, 'JP'],
  [/France|Buc|Le Havre|Paris/i, 'FR'],
  [/India|Bengaluru|Mumbai/i, 'IN'],
  [/Israel|Haifa|Yavne|Tirat Carmel/i, 'IL'],
  [/Austria|Zipf|Vienna/i, 'AT'],
  [/Korea|Seongnam|Busan|Incheon|Icheon|Pyeongtaek|Sangdong/i, 'KR'],
  [/Norway|Horten/i, 'NO'],
  [/Stockholm|Sweden/i, 'SE'],
  [/Singapore/i, 'SG'],
  [/Rotterdam|Netherlands/i, 'NL'],
  [/Jebel Ali|UAE/i, 'AE'],
  [/Qatar|Ras Laffan/i, 'QA'],
  [/Russia|Amur/i, 'RU'],
  [/Algeria|Arzew/i, 'DZ'],
  [/Brazil|Araxá/i, 'BR'],
  [/Chile|Antofagasta/i, 'CL'],
  [/Peru/i, 'PE'],
  [/Germany|Hanau|Fürstenfeldbruck|DACH/i, 'DE'],
  [/Finland|Pori/i, 'FI'],
  [/Taiwan|Hsinchu/i, 'TW'],
  [/UK |NHS/i, 'GB'],
  [/GCC/i, 'SA'],
  [/ANZ/i, 'AU'],
];

export function countryOf(place: string): string | null {
  for (const [re, iso] of COUNTRY_HINTS) if (re.test(place)) return iso;
  return null;
}
