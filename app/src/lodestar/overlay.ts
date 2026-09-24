// Lodestar map overlay: OEM network layers (docs/BUILD_BRIEF.md §3b) and the
// exposure heatmap, as deck.gl layers handed to the map through
// DeckGLMap.setLodestarOverlay. Layer ids all start with 'lodestar-'.

import type { Layer, PickingInfo } from '@deck.gl/core';
import { ScatterplotLayer, PathLayer, ArcLayer, TextLayer } from '@deck.gl/layers';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import { escapeHtml } from '@/utils/sanitize';
import { type Indexed, type FamilyFilter, type Site, type Lane, laneWaypoints, productMatches } from './network';
import type { ExposureResult, Hotspot } from './exposure';

type RGBA = [number, number, number, number];

export interface OverlayState {
  ix: Indexed;
  result: ExposureResult | null;
  filter: FamilyFilter;
  showNetwork: boolean;
  showHeat: boolean;
  selectedId: string | null;
}

export interface LodestarOverlay {
  layers: Layer[];
  tooltip: (info: PickingInfo) => string | null;
  click: (info: PickingInfo) => boolean;
}

/** Exposure colour ramp: calm teal -> amber -> red. */
export function scoreColor(score: number, alpha = 230): RGBA {
  if (score >= 60) return [255, 90, 60, alpha];
  if (score >= 35) return [245, 170, 50, alpha];
  if (score >= 15) return [220, 210, 90, alpha];
  return [80, 190, 160, alpha];
}

const PROV_LABEL: Record<string, string> = { S: 'sourced', est: 'estimate', synth: 'synthetic' };
const prov = (p?: string) => (p ? `<span class="lodestar-prov">${escapeHtml(PROV_LABEL[p.split(/[\s/(]/)[0]!] ?? p)}</span>` : '');

export function buildOverlay(state: OverlayState, onSelect: (h: Hotspot) => void): LodestarOverlay {
  const { ix, result, filter } = state;
  const layers: Layer[] = [];
  const hotspotById = new Map((result?.hotspots ?? []).map((h) => [h.id, h]));
  const siteScore = (s: Site) => hotspotById.get(`site:${s.id}`)?.score ?? 0;
  const visibleHotspots = (result?.hotspots ?? []).filter((h) => filter === 'ALL' || h.families.includes(filter as never));

  if (state.showHeat && visibleHotspots.length) {
    const heatData = visibleHotspots.filter((h) => h.score > 0);
    layers.push(new HeatmapLayer<Hotspot>({
      id: 'lodestar-heat',
      data: heatData,
      getPosition: (h) => [h.lon, h.lat],
      getWeight: (h) => h.score * (1 + Math.log10(1 + h.products.length)),
      radiusPixels: 60,
      intensity: 1.2,
      threshold: 0.04,
      colorRange: [
        [255, 255, 178], [254, 217, 118], [254, 178, 76], [253, 141, 60], [240, 59, 32], [189, 0, 38],
      ],
      aggregation: 'SUM',
      pickable: false,
    }));
  }

  if (state.showNetwork) {
    const lanes = ix.net.lanes.filter((l) => productMatches(ix, l.products, filter));
    const seaLanes = lanes.filter((l) => l.mode === 'sea');
    const otherLanes = lanes.filter((l) => l.mode !== 'sea');
    const laneScore = (l: Lane) => result?.laneScores.get(l.id) ?? 0;

    layers.push(new PathLayer<Lane>({
      id: 'lodestar-lanes-sea',
      data: seaLanes,
      getPath: (l) => laneWaypoints(ix, l).map((w) => [w.lon, w.lat] as [number, number]),
      getColor: (l) => (laneScore(l) >= 35 ? scoreColor(laneScore(l), 210) : [140, 180, 220, 150]),
      getWidth: (l) => (laneScore(l) >= 35 ? 3 : 1.5),
      widthUnits: 'pixels',
      jointRounded: true,
      capRounded: true,
      pickable: true,
    }));
    layers.push(new ArcLayer<Lane>({
      id: 'lodestar-lanes-arc',
      data: otherLanes,
      getSourcePosition: (l) => { const s = ix.siteById.get(l.from)!; return [s.lon, s.lat]; },
      getTargetPosition: (l) => { const s = ix.siteById.get(l.to)!; return [s.lon, s.lat]; },
      getSourceColor: (l) => (l.mode === 'air' ? [190, 150, 230, 170] : [200, 200, 210, 140]),
      getTargetColor: (l) => (l.mode === 'air' ? [190, 150, 230, 170] : [200, 200, 210, 140]),
      getWidth: 1.5,
      getHeight: (l) => (l.mode === 'air' ? 0.4 : 0.05),
      pickable: true,
    }));

    const inputOrigins = ix.net.inputs
      .filter((i) => productMatches(ix, i.used_in, filter))
      .flatMap((i) => i.origin.map((o, idx) => ({ input: i, origin: o, id: `input:${i.id}:${idx}` })));
    layers.push(new ScatterplotLayer<(typeof inputOrigins)[number]>({
      id: 'lodestar-inputs',
      data: inputOrigins,
      getPosition: (d) => [d.origin.lon, d.origin.lat],
      getRadius: (d) => 3 + Math.sqrt(d.input.used_in.length) * 2,
      radiusUnits: 'pixels',
      getFillColor: (d) => scoreColor(hotspotById.get(d.id)?.score ?? 0, 200),
      stroked: true,
      getLineColor: [20, 20, 20, 200],
      lineWidthMinPixels: 1,
      pickable: true,
    }));

    const sites = ix.net.sites.filter((s) => s.type !== 'port' && s.type !== 'airport'
      && (filter === 'ALL' || productMatches(ix, ix.productsBySite.get(s.id) ?? [], filter)));
    const plants = sites.filter((s) => s.type === 'plant' || s.type === 'subassembly' || s.type === 'dc');
    const demand = sites.filter((s) => s.type === 'demand');

    layers.push(new ScatterplotLayer<Site>({
      id: 'lodestar-demand',
      data: demand,
      getPosition: (s) => [s.lon, s.lat],
      getRadius: 6,
      radiusUnits: 'pixels',
      filled: false,
      stroked: true,
      getLineColor: [230, 230, 240, 200],
      lineWidthMinPixels: 1.5,
      pickable: true,
    }));
    layers.push(new ScatterplotLayer<Site>({
      id: 'lodestar-plants',
      data: plants,
      getPosition: (s) => [s.lon, s.lat],
      getRadius: (s) => (s.type === 'plant' ? 7 : 5),
      radiusUnits: 'pixels',
      getFillColor: (s) => scoreColor(siteScore(s)),
      stroked: true,
      getLineColor: [15, 15, 20, 255],
      lineWidthMinPixels: 1.5,
      pickable: true,
    }));
    layers.push(new TextLayer<Site>({
      id: 'lodestar-plant-labels',
      data: plants.filter((s) => s.type === 'plant'),
      getPosition: (s) => [s.lon, s.lat],
      getText: (s) => s.name.split(',')[0]!,
      getSize: 11,
      getPixelOffset: [9, 0],
      getTextAnchor: 'start',
      getAlignmentBaseline: 'center',
      getColor: [235, 235, 240, 230],
      outlineWidth: 2,
      outlineColor: [10, 12, 16, 255],
      fontSettings: { sdf: true },
      pickable: false,
    }));
  }

  // Hotspot markers: the entries worth diving into, clickable.
  const markers = visibleHotspots.filter((h) => h.score >= 35);
  if (markers.length) {
    layers.push(new ScatterplotLayer<Hotspot>({
      id: 'lodestar-hotspots',
      data: markers,
      getPosition: (h) => [h.lon, h.lat],
      getRadius: (h) => 9 + h.score / 8,
      radiusUnits: 'pixels',
      filled: false,
      stroked: true,
      getLineColor: (h) => (h.id === state.selectedId ? [255, 255, 255, 255] : scoreColor(h.score, 255)),
      getLineWidth: (h) => (h.id === state.selectedId ? 3 : 2),
      lineWidthUnits: 'pixels',
      pickable: true,
      updateTriggers: { getLineColor: state.selectedId, getLineWidth: state.selectedId },
    }));
  }

  const tooltip = (info: PickingInfo): string | null => {
    const id = info.layer?.id ?? '';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const o = info.object as any;
    if (!o) return null;
    if (id === 'lodestar-hotspots') {
      const h = o as Hotspot;
      const top = h.evidence.slice().sort((a, b) => b.points - a.points)[0];
      return `<strong>${escapeHtml(h.title)}</strong> · exposure ${h.score}<br/>${escapeHtml(h.subtitle)}${top ? `<br/><em>${escapeHtml(top.text)}</em>` : ''}<br/><small>Click for evidence</small>`;
    }
    if (id === 'lodestar-plants' || id === 'lodestar-demand') {
      const s = o as Site;
      const score = siteScore(s);
      const products = [...(ix.productsBySite.get(s.id) ?? [])].map((p) => ix.productById.get(p)?.name).filter(Boolean);
      return `<strong>${escapeHtml(s.name)}</strong> ${prov(s.prov)}<br/>${escapeHtml(s.role ?? s.type)}${products.length ? `<br/>${escapeHtml(products.join(' · '))}` : ''}${s.type !== 'demand' ? `<br/>Live exposure ${score}` : ''}`;
    }
    if (id === 'lodestar-inputs') {
      const { input, origin } = o;
      const h = hotspotById.get(o.id as string);
      return `<strong>${escapeHtml(input.name)}</strong><br/>${escapeHtml(origin.place)}${origin.share ? ` · ${escapeHtml(origin.share)}` : ''}<br/>Used in ${input.used_in.length} product(s) · live exposure ${h?.score ?? 0}${input.tts_days ? `<br/>Time to survive ${input.tts_days} d vs recover ${input.ttr_days} d ${prov(input.cover_prov)}` : ''}`;
    }
    if (id.startsWith('lodestar-lanes')) {
      const l = o as Lane;
      const names = l.products.map((p) => ix.productById.get(p)?.name).filter(Boolean);
      const via = laneWaypoints(ix, l).slice(1, -1).map((w) => w.label);
      return `<strong>${escapeHtml(ix.siteById.get(l.from)?.name ?? l.from)} → ${escapeHtml(ix.siteById.get(l.to)?.name ?? l.to)}</strong> (${escapeHtml(l.mode)})<br/>${escapeHtml(names.join(' · '))}${via.length ? `<br/>via ${escapeHtml(via.join(', '))}` : ''}<br/>Worst chokepoint exposure ${result?.laneScores.get(l.id) ?? 0}`;
    }
    return null;
  };

  const click = (info: PickingInfo): boolean => {
    const id = info.layer?.id ?? '';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const o = info.object as any;
    if (!o) return false;
    let h: Hotspot | undefined;
    if (id === 'lodestar-hotspots') h = o as Hotspot;
    else if (id === 'lodestar-plants' || id === 'lodestar-demand') h = hotspotById.get(`site:${(o as Site).id}`);
    else if (id === 'lodestar-inputs') h = hotspotById.get(o.id as string);
    if (!h) return false;
    onSelect(h);
    return true;
  };

  return { layers, tooltip, click };
}
