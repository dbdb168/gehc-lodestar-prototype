// Lodestar: sea routing for drawing OEM lanes. A small hand-placed graph of
// ocean waypoints (open water, clear of coastlines at map scale); the path
// between two sea points (a port or a chokepoint) is the shortest route through
// it by great-circle distance. Drawing only: which chokepoints a lane crosses
// (and so its score) comes from `via` in data/network.json, not from here.
//
// Longitudes are unwrapped along the path so trans-Pacific legs cross the
// Pacific instead of being drawn the long way round.

type LonLat = [number, number];

const N: Record<string, LonLat> = {
  // North Atlantic and US East Coast
  chs_off: [-78.6, 32.2], nynj_off: [-72.6, 40.0], bahamas_e: [-74.5, 26.5], windward: [-73.8, 19.9],
  carib_c: [-77.5, 14.0], panama_n: [-79.7, 9.6],
  atl_nw: [-62.0, 37.5], atl_mid: [-42.0, 41.0], azores: [-25.0, 38.5],
  cape_sv: [-9.8, 36.6], portugal: [-10.4, 40.5], finisterre: [-10.2, 44.0], ushant: [-6.0, 48.6],
  channel_w: [-3.5, 49.8], lehavre_off: [0.0, 49.75], north_sea_s: [3.3, 52.1],
  // Mediterranean, Suez, Red Sea
  alboran: [-3.0, 36.1], alg_off: [4.0, 37.7], sicily_ch: [11.6, 37.3], ionian: [19.0, 35.3],
  crete_s: [24.5, 34.3], levant: [32.4, 32.2], ps_off: [32.35, 31.45],
  red_n: [34.1, 27.6], red_mid: [38.3, 21.0], red_s: [41.6, 14.9],
  // Gulf of Aden, Arabian Sea, Gulf
  aden: [48.0, 12.4], soqotra_n: [54.0, 13.8], arab_w: [58.0, 17.5], ras_hadd: [60.2, 22.7],
  gulf_oman: [57.6, 25.0], gulf_w: [54.0, 26.3], gulf_nw: [51.0, 27.0],
  arab_e: [66.0, 18.0], mumbai_off: [72.4, 18.85],
  // Indian Ocean to Singapore
  india_sw: [73.5, 12.0], lanka_s: [80.5, 5.3], bengal_s: [88.0, 5.8], malacca_n: [96.5, 5.9],
  sg_e: [104.4, 1.3],
  // South China Sea, East Asia
  scs_s: [106.8, 5.2], scs_mid: [111.5, 12.0], scs_n: [115.5, 19.5], hk_off: [116.5, 21.8],
  taiwan_e: [123.2, 23.0], ecs_s: [122.8, 27.5], shanghai_off: [122.6, 31.0], ecs_n: [125.0, 31.0],
  yellow_s: [123.8, 34.8], yellow_n: [122.6, 37.2], bohai_str: [121.1, 38.35],
  busan_off: [129.2, 34.9], kyushu_s: [131.5, 30.8], kii: [135.0, 33.7], osaka_bay: [135.1, 34.35],
  japan_se: [140.5, 33.8],
  // North Pacific great circle (longitudes may exceed ±180 while unwrapping)
  npac_w: [155.0, 38.5], npac_mid: [180.0, 42.5], npac_e: [-150.0, 41.0], la_off: [-119.6, 33.4],
  // Western Pacific to Australia
  phil_e: [127.5, 12.0], png_n: [136.0, 2.0], bismarck_n: [150.0, 0.0], solomon_n: [161.0, -5.5],
  solomon_e: [164.0, -10.0], coral: [157.5, -20.0], sydney_off: [152.2, -33.9],
  // South Atlantic
  atl_sw: [-62.0, 24.0], brazil_ne: [-34.2, -6.0], bahia_off: [-37.5, -14.0], abrolhos: [-38.2, -20.0],
  santos_off: [-45.8, -24.6],
};

// Chokepoints (registry ids) and ports (network.json site ids) join the graph here.
const EDGES: Array<[string, string]> = [
  // US East Coast / Caribbean / Panama
  ['p_chs', 'chs_off'], ['p_nynj', 'nynj_off'], ['chs_off', 'nynj_off'], ['chs_off', 'bahamas_e'],
  ['bahamas_e', 'windward'], ['windward', 'carib_c'], ['carib_c', 'panama_n'], ['panama_n', 'panama'],
  ['chs_off', 'atl_nw'], ['nynj_off', 'atl_nw'], ['atl_nw', 'atl_mid'], ['atl_mid', 'azores'],
  ['azores', 'cape_sv'], ['azores', 'finisterre'], ['atl_mid', 'finisterre'],
  ['cape_sv', 'gibraltar'], ['cape_sv', 'portugal'], ['portugal', 'finisterre'], ['finisterre', 'ushant'],
  ['ushant', 'channel_w'], ['channel_w', 'lehavre_off'], ['lehavre_off', 'p_lehavre'],
  ['channel_w', 'dover_strait'], ['lehavre_off', 'dover_strait'], ['dover_strait', 'north_sea_s'],
  ['north_sea_s', 'p_rtm'],
  // Mediterranean and Suez
  ['gibraltar', 'alboran'], ['alboran', 'alg_off'], ['alg_off', 'sicily_ch'], ['sicily_ch', 'ionian'],
  ['ionian', 'crete_s'], ['crete_s', 'levant'], ['crete_s', 'ps_off'], ['levant', 'p_haifa'], ['levant', 'ps_off'],
  ['ps_off', 'suez'], ['suez', 'red_n'], ['red_n', 'red_mid'], ['red_mid', 'red_s'], ['red_s', 'bab_el_mandeb'],
  // Arabian Sea, Gulf, India
  ['bab_el_mandeb', 'aden'], ['aden', 'soqotra_n'], ['soqotra_n', 'arab_w'], ['arab_w', 'ras_hadd'],
  ['ras_hadd', 'gulf_oman'], ['gulf_oman', 'hormuz_strait'], ['hormuz_strait', 'gulf_w'],
  ['gulf_w', 'p_jebelali'], ['gulf_w', 'gulf_nw'], ['gulf_nw', 'p_dammam'],
  ['soqotra_n', 'arab_e'], ['arab_w', 'arab_e'], ['arab_e', 'mumbai_off'], ['mumbai_off', 'p_nhava'],
  ['mumbai_off', 'india_sw'], ['arab_e', 'india_sw'], ['india_sw', 'lanka_s'], ['aden', 'lanka_s'],
  ['lanka_s', 'bengal_s'], ['bengal_s', 'malacca_n'], ['malacca_n', 'malacca_strait'],
  ['malacca_strait', 'p_sin'], ['p_sin', 'sg_e'],
  // South China Sea and East Asia
  ['sg_e', 'scs_s'], ['scs_s', 'scs_mid'], ['scs_mid', 'scs_n'], ['scs_n', 'hk_off'], ['hk_off', 'taiwan_strait'],
  ['scs_n', 'taiwan_e'], ['taiwan_strait', 'ecs_s'], ['taiwan_e', 'ecs_s'], ['ecs_s', 'shanghai_off'],
  ['shanghai_off', 'p_shanghai'], ['shanghai_off', 'ecs_n'], ['ecs_s', 'ecs_n'], ['ecs_n', 'yellow_s'],
  ['yellow_s', 'yellow_n'], ['yellow_n', 'bohai_str'], ['bohai_str', 'p_tianjin'],
  ['yellow_s', 'korea_strait'], ['ecs_n', 'korea_strait'], ['korea_strait', 'busan_off'], ['busan_off', 'p_busan'],
  ['ecs_n', 'kyushu_s'], ['korea_strait', 'kii'], ['kyushu_s', 'kii'], ['kii', 'osaka_bay'], ['osaka_bay', 'p_kobe'],
  ['kii', 'japan_se'], ['kyushu_s', 'japan_se'],
  // Trans-Pacific
  ['japan_se', 'npac_w'], ['npac_w', 'npac_mid'], ['npac_mid', 'npac_e'], ['npac_e', 'la_off'], ['la_off', 'p_lalb'],
  // Western Pacific to Australia
  ['taiwan_e', 'phil_e'], ['scs_n', 'phil_e'], ['phil_e', 'png_n'], ['png_n', 'bismarck_n'], ['bismarck_n', 'solomon_n'],
  ['solomon_n', 'solomon_e'], ['solomon_e', 'coral'], ['coral', 'sydney_off'], ['sydney_off', 'p_botany'],
  // South Atlantic
  ['chs_off', 'atl_sw'], ['bahamas_e', 'atl_sw'], ['atl_sw', 'brazil_ne'], ['brazil_ne', 'bahia_off'],
  ['bahia_off', 'abrolhos'], ['abrolhos', 'santos_off'], ['santos_off', 'p_santos'],
];

const R = Math.PI / 180;
function gcKm(a: LonLat, b: LonLat): number {
  const dLat = (b[1] - a[1]) * R;
  const dLon = (b[0] - a[0]) * R;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a[1] * R) * Math.cos(b[1] * R) * Math.sin(dLon / 2) ** 2;
  return 12742 * Math.asin(Math.min(1, Math.sqrt(h)));
}

export interface SeaGraph { pos: Map<string, LonLat>; adj: Map<string, Array<[string, number]>> }

/** Build the graph; `extra` supplies positions for ports and chokepoints by id. */
export function buildSeaGraph(extra: Record<string, LonLat>): SeaGraph {
  const pos = new Map<string, LonLat>(Object.entries({ ...N, ...extra }));
  const adj = new Map<string, Array<[string, number]>>();
  for (const [a, b] of EDGES) {
    const pa = pos.get(a);
    const pb = pos.get(b);
    if (!pa || !pb) continue; // a port not in this network
    const d = gcKm(pa, pb);
    if (!adj.has(a)) adj.set(a, []);
    if (!adj.has(b)) adj.set(b, []);
    adj.get(a)!.push([b, d]);
    adj.get(b)!.push([a, d]);
  }
  return { pos, adj };
}

/** Shortest sea path between two graph nodes (inclusive), or null if not connected. */
export function seaPath(g: SeaGraph, from: string, to: string): LonLat[] | null {
  if (from === to) return g.pos.has(from) ? [g.pos.get(from)!] : null;
  if (!g.adj.has(from) || !g.adj.has(to)) return null;
  const dist = new Map<string, number>([[from, 0]]);
  const prev = new Map<string, string>();
  const open = new Set<string>([from]);
  while (open.size) {
    let u = '';
    let best = Infinity;
    for (const k of open) { const d = dist.get(k)!; if (d < best) { best = d; u = k; } }
    open.delete(u);
    if (u === to) break;
    for (const [v, w] of g.adj.get(u) ?? []) {
      const nd = best + w;
      if (nd < (dist.get(v) ?? Infinity)) { dist.set(v, nd); prev.set(v, u); open.add(v); }
    }
  }
  if (!dist.has(to)) return null;
  const ids = [to];
  while (ids[0] !== from) ids.unshift(prev.get(ids[0]!)!);
  return ids.map((id) => g.pos.get(id)!);
}

/** Unwrap longitudes so consecutive points never jump more than 180°. */
export function unwrap(path: LonLat[]): LonLat[] {
  const out: LonLat[] = [];
  for (const [lon, lat] of path) {
    if (!out.length) { out.push([lon, lat]); continue; }
    let l = lon;
    const prevLon = out[out.length - 1]![0];
    while (l - prevLon > 180) l -= 360;
    while (l - prevLon < -180) l += 360;
    out.push([l, lat]);
  }
  return out;
}
