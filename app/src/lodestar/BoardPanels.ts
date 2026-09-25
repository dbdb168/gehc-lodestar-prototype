// Lodestar: product exposure board, input clock, and regulatory & trade watch
// (docs/BUILD_BRIEF.md §3e.2, .3, .5).

import { Panel } from '@/components/Panel';
import { h } from '@/utils/dom-utils';
import { extLink } from './links';
import { groupRecalls, type ExposureResult, type Hotspot } from './exposure';
import type { FamilyFilter, Indexed } from './network';
import { scoreColor } from './overlay';

const rgb = (s: number) => { const [r, g, b] = scoreColor(s); return `rgb(${r},${g},${b})`; };
const money = (usd: number) => (usd >= 1e9 ? `$${(usd / 1e9).toFixed(1)}B` : usd >= 1e6 ? `$${Math.round(usd / 1e6)}M` : `$${Math.round(usd / 1e3)}K`);
const synth = () => h('span', { className: 'lodestar-prov prov-synth', title: 'Synthetic demo value, not company data' }, 'synth');
const live = () => h('span', { className: 'lodestar-prov prov-live', title: 'From live public feeds' }, 'live');

// ---------- score history (per browser, for sparklines) ----------

const HISTORY_KEY = 'lodestar-score-history';
type History = Record<string, Array<[number, number]>>;
function readHistory(): History {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? '{}') as History; } catch { return {}; }
}
function recordHistory(result: ExposureResult): History {
  const hist = readHistory();
  const t = Date.parse(result.computedAt);
  for (const p of result.products) {
    const arr = hist[p.productId] ?? [];
    if (!arr.length || t - arr[arr.length - 1]![0] > 4 * 60_000) arr.push([t, p.score]);
    hist[p.productId] = arr.slice(-48);
  }
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(hist)); } catch { /* convenience only */ }
  return hist;
}

function sparkline(points: Array<[number, number]>): SVGSVGElement {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 60 18');
  svg.setAttribute('class', 'lodestar-spark');
  svg.setAttribute('aria-hidden', 'true');
  if (points.length >= 2) {
    const path = document.createElementNS(ns, 'polyline');
    const n = points.length;
    path.setAttribute('points', points.map(([, s], i) => `${(i / (n - 1)) * 60},${18 - (s / 100) * 16 - 1}`).join(' '));
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'currentColor');
    path.setAttribute('stroke-width', '1.5');
    svg.appendChild(path);
  }
  return svg;
}

// ---------- product exposure board ----------

export class LodestarProductsPanel extends Panel {
  private onPick: ((family: FamilyFilter, driver: Hotspot | null) => void) | null = null;

  constructor() {
    super({
      id: 'lodestar-products',
      title: 'Product exposure board',
      infoTooltip: 'Exposure per product line (0-100): the worst live driver across its inputs, sites and lanes, plus a time-to-survive / time-to-recover gap penalty (synthetic cover). Installs and revenue at risk are synthetic. The sparkline is this browser\'s score history.',
    });
    this.showLoading('Waiting for live exposure scores…');
  }

  setPickHandler(fn: (family: FamilyFilter, driver: Hotspot | null) => void): void { this.onPick = fn; }

  update(ix: Indexed, result: ExposureResult, filter: FamilyFilter): void {
    const hist = recordHistory(result);
    const rows = result.products
      .filter((p) => filter === 'ALL' || p.family === filter)
      .sort((a, b) => b.score - a.score);
    this.setContentNodes(h('table', { className: 'lodestar-table' },
      h('thead', null, h('tr', null, h('th', null, 'Product'), h('th', null, 'Exposure'), h('th', null, 'Trend'), h('th', null, 'Top driver'), h('th', null, 'Installs at risk'))),
      h('tbody', null, ...rows.map((p) => {
        const prod = ix.productById.get(p.productId)!;
        const installs = Math.round((prod.installs_next_90d ?? 0) * (p.score / 100));
        const [lo, hi] = prod.price_usd ?? [0, 0];
        return h('tr', { className: 'lodestar-row', onClick: () => this.onPick?.(p.family, p.topDriver) },
          h('td', null, h('div', { className: 'lodestar-hotspot-title' }, prod.name), h('div', { className: 'lodestar-hotspot-sub' }, p.family)),
          h('td', null, h('span', { className: 'lodestar-score', style: `background:${rgb(p.score)}` }, String(p.score)),
            p.gapPenalty ? h('div', { className: 'lodestar-hotspot-sub' }, `incl. +${p.gapPenalty} cover gap `, synth()) : null),
          h('td', { style: `color:${rgb(p.score)}` }, sparkline(hist[p.productId] ?? [])),
          h('td', null, p.topDriver ? h('div', null, h('div', null, `${p.topDriver.title} (${p.topDriver.score})`), h('div', { className: 'lodestar-hotspot-sub' }, p.topDriver.subtitle), live()) : h('span', { className: 'lodestar-quiet' }, 'calm')),
          h('td', null, `${installs} of ${prod.installs_next_90d ?? 0} `, synth(), h('div', { className: 'lodestar-hotspot-sub' }, `${money(installs * ((lo + hi) / 2))} revenue `, synth())),
        );
      })),
    ));
  }
}

// ---------- input clock ----------

export class LodestarInputClockPanel extends Panel {
  constructor() {
    super({
      id: 'lodestar-inputs',
      title: 'Input clock',
      infoTooltip: 'Time to survive (stock and cover on hand) vs time to recover (to restore supply), per critical input. Both are synthetic demo values. Bars turn red where recovery outruns survival and the input\'s live exposure is 30 or more.',
    });
    this.showLoading('Waiting for live exposure scores…');
  }

  update(ix: Indexed, result: ExposureResult, filter: FamilyFilter): void {
    const inputScore = (id: string) => Math.max(0, ...result.hotspots.filter((x) => x.id.startsWith(`input:${id}:`)).map((x) => x.score));
    const rows = ix.net.inputs
      .filter((i) => i.tts_days && i.ttr_days)
      .filter((i) => filter === 'ALL' || i.used_in.some((p) => ix.productById.get(p)?.family === filter))
      .map((i) => ({ i, score: inputScore(i.id), gap: (i.ttr_days ?? 0) - (i.tts_days ?? 0) }))
      .sort((a, b) => (b.score >= 30 ? b.gap : -999) - (a.score >= 30 ? a.gap : -999) || b.score - a.score);
    const max = Math.max(200, ...rows.map((r) => Math.max(r.i.tts_days!, r.i.ttr_days!)));
    const w = (d: number) => `${Math.min(100, (d / max) * 100).toFixed(1)}%`;
    this.setContentNodes(h('div', { className: 'lodestar-clock' },
      h('div', { className: 'lodestar-clock-legend' }, h('span', { className: 'k tts' }, 'Survive'), h('span', { className: 'k ttr' }, 'Recover'), ' days ', synth(), ' · live exposure ', live()),
      ...rows.map(({ i, score, gap }) => {
        const exposed = score >= 30 && gap > 0;
        return h('div', { className: `lodestar-clock-row${exposed ? ' exposed' : ''}` },
          h('div', { className: 'lodestar-clock-name' },
            h('span', null, i.name),
            h('span', { className: 'lodestar-score sm', style: `background:${rgb(score)}` }, String(score))),
          h('div', { className: 'lodestar-bar tts' }, h('i', { style: `width:${w(i.tts_days!)}` }), h('b', null, `${i.tts_days} d`)),
          h('div', { className: `lodestar-bar ttr${gap <= 0 ? ' ok' : ''}` }, h('i', { style: `width:${w(i.ttr_days!)}` }), h('b', null, `${i.ttr_days} d`)),
          h('div', { className: 'lodestar-hotspot-sub' }, gap > 0 ? `${exposed ? 'Exposed' : 'Gap'}: recovery outruns cover by ${gap} days` : `Covered by ${-gap} days`),
        );
      }),
    ));
  }
}

// ---------- regulatory & trade watch ----------

export class LodestarRegWatchPanel extends Panel {
  constructor() {
    super({
      id: 'lodestar-regwatch',
      title: 'Regulatory & trade watch',
      infoTooltip: 'Federal Register documents from the last 14 days on the network\'s watch terms, FDA device recalls and 510(k) decisions for the OEM (last 120 days, shown by generic FDA device class), and export controls on critical inputs from public reporting.',
    });
    this.showLoading('Loading Federal Register and openFDA…');
  }

  update(ix: Indexed, result: ExposureResult): void {
    const s = result.signals;
    const fr = (s?.federalRegister ?? []).filter((g) => g.items.length);
    const controls = ix.net.inputs.filter((i) => i.controls);
    const sections: HTMLElement[] = [];
    sections.push(h('section', null, h('h4', null, 'Federal Register, last 14 days ', live()),
      fr.length ? h('ul', { className: 'lodestar-evidence' }, ...fr.flatMap((g) => g.items.map((it) => h('li', null,
        h('span', { className: 'lodestar-ev-text' }, extLink(it.url, it.title)),
        h('span', { className: 'lodestar-ev-meta' }, `${it.type} · ${it.date} · watch term "${g.term}"${it.agencies[0] ? ` · ${it.agencies[0]}` : ''}`)))))
        : h('p', { className: 'lodestar-quiet' }, s ? 'Nothing new on the watch terms in the last 14 days.' : 'Federal Register feed unavailable.')));
    if (s?.fda?.configured) {
      sections.push(h('section', null, h('h4', null, 'FDA device regulatory, last 120 days ', live()),
        (s.fda.recalls.length || s.fda.clearances.length) ? h('ul', { className: 'lodestar-evidence' },
          ...groupRecalls(s.fda.recalls).map((r) => h('li', null,
            h('span', { className: 'lodestar-ev-kind' }, `Recall · ${r.status ?? ''}${r.count > 1 ? ` · ${r.count} product entries` : ''}`),
            h('span', { className: 'lodestar-ev-text' }, extLink(r.url, r.product)),
            h('span', { className: 'lodestar-ev-meta' }, `${r.initiated ?? ''}${r.reason ? ` · root cause: ${r.reason}` : ''}`))),
          ...s.fda.clearances.map((c) => h('li', null,
            h('span', { className: 'lodestar-ev-kind' }, `510(k) ${c.kNumber ?? ''}`),
            h('span', { className: 'lodestar-ev-text' }, extLink(c.url, c.device)),
            h('span', { className: 'lodestar-ev-meta' }, c.date ?? ''))))
          : h('p', { className: 'lodestar-quiet' }, 'No recalls or 510(k) decisions in the window.')));
    }
    sections.push(h('section', null, h('h4', null, 'Export controls on critical inputs ', h('span', { className: 'lodestar-prov prov-S' }, 'sourced')),
      h('ul', { className: 'lodestar-evidence' }, ...controls.map((i) => h('li', null,
        h('span', { className: 'lodestar-ev-text' }, `${i.name}: ${i.controls}`),
        h('span', { className: 'lodestar-ev-meta' }, `Used in ${i.used_in.map((p) => ix.productById.get(p)?.family).filter((v, k, a) => v && a.indexOf(v) === k).join(', ')}`))))));
    this.setContentNodes(h('div', { className: 'lodestar-regwatch' }, ...sections));
  }
}
