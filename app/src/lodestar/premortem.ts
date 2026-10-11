// Lodestar: per-product pre-mortem page. Vulnerability-first, five-year view:
// the product's internal weaknesses (each tagged inferred or confirmed), the
// live signals pressing on each one today, four scenarios and which weaknesses
// each stresses, the levers, and a tolerance line. It reads as a short story,
// not a score.
//
// Content comes from network.json `premortems` at runtime. Live signals are the
// exposure engine's hotspots, joined by each weakness's inputs, sites, lanes,
// chokepoints and regulatory ids; clicking one opens its evidence drawer.

import { h } from '@/utils/dom-utils';
import { extLink } from './links';
import { HOT, type ExposureResult, type Hotspot } from './exposure';
import {
  chokepointByPortwatchName, type Indexed, type Level, type Premortem, type PremortemVulnerability,
} from './network';
import { openDrawer } from './drawer';

export const PREMORTEM_PARAM = 'premortem';

let root: HTMLElement | null = null;
let current: { ix: Indexed; pm: Premortem } | null = null;
let latest: ExposureResult | null = null;

export function premortemFor(ix: Indexed, productOrFamily: string): Premortem | undefined {
  return ix.net.premortems?.find((p) => p.id === productOrFamily || p.product === productOrFamily || p.family === productOrFamily);
}

function setParam(id: string | null): void {
  try {
    const url = new URL(location.href);
    if (id) url.searchParams.set(PREMORTEM_PARAM, id); else url.searchParams.delete(PREMORTEM_PARAM);
    history.replaceState(history.state, '', url.toString());
  } catch { /* history unavailable */ }
}

/** The pre-mortem named in ?premortem=, if any. */
export function premortemFromUrl(ix: Indexed): Premortem | undefined {
  const id = new URLSearchParams(location.search).get(PREMORTEM_PARAM);
  return id ? ix.net.premortems?.find((p) => p.id === id) : undefined;
}

function close(): void {
  root?.remove();
  root = null;
  current = null;
  setParam(null);
  document.removeEventListener('keydown', onKey);
}
function onKey(e: KeyboardEvent): void {
  // The evidence drawer sits on top and closes itself first.
  if (e.key === 'Escape' && !document.querySelector('.lodestar-drawer-backdrop')) close();
}

// ---------- joins to live signals ----------

/** Hotspots for one ref: input:<id>, site:<id>, cp:<PortWatch name> or a hotspot id. */
function hotspotsForRef(result: ExposureResult, ref: string): Hotspot[] {
  const [kind, ...rest] = ref.split(':');
  const key = rest.join(':');
  if (kind === 'input') return result.hotspots.filter((x) => x.id.startsWith(`input:${key}:`));
  if (kind === 'cp') {
    const cp = chokepointByPortwatchName(key);
    return cp ? result.hotspots.filter((x) => x.id === `cp:${cp.id}`) : [];
  }
  return result.hotspots.filter((x) => x.id === ref);
}

function refsFor(ix: Indexed, v: PremortemVulnerability): string[] {
  const refs = [
    ...(v.inputs ?? []).map((i) => `input:${i}`),
    ...(v.sites ?? []).map((s) => `site:${s}`),
    ...(v.chokepoints ?? []).map((c) => `cp:${c}`),
    ...(v.regulatory ?? []),
  ];
  for (const laneId of v.lanes ?? []) {
    const lane = ix.net.lanes.find((l) => l.id === laneId);
    for (const via of lane?.via ?? []) if (chokepointByPortwatchName(via)) refs.push(`cp:${via}`);
  }
  return [...new Set(refs)];
}

function signalsFor(refs: string[], result: ExposureResult | null): Hotspot[] {
  if (!result) return [];
  const seen = new Map<string, Hotspot>();
  for (const ref of refs) for (const x of hotspotsForRef(result, ref)) if (x.score > 0) seen.set(x.id, x);
  return [...seen.values()].sort((a, b) => b.score - a.score);
}

type Pressure = 'high' | 'medium' | 'low' | 'none';
const PRESSURE_LABEL: Record<Pressure, string> = { high: 'Pressing hard', medium: 'Pressing', low: 'Faint signal', none: 'Quiet today' };
const pressureOf = (score: number): Pressure => (score >= 60 ? 'high' : score >= HOT ? 'medium' : score > 0 ? 'low' : 'none');

// ---------- pieces ----------

const LEVEL_LABEL: Record<Level, string> = { high: 'High', medium: 'Medium', low: 'Low' };

function provChip(prov: string, title?: string): HTMLElement {
  const label = prov === 'S' ? 'sourced' : prov === 'est' ? 'estimate' : prov === 'synth' ? 'synth' : prov === 'live' ? 'live' : prov;
  const cls = prov.includes('synth') ? 'synth' : prov === 'live' ? 'live' : 'ref';
  return h('span', { className: `pm-prov ${cls}`, title: title ?? '' }, label);
}

function statusTag(v: PremortemVulnerability): HTMLElement {
  return v.status === 'confirmed'
    ? h('span', { className: 'pm-tag confirmed', title: 'Confirmed by the source named; not yet validated by the product team unless it says so' }, `Confirmed · ${v.confirmed_by ?? 'source'}`)
    : h('span', { className: 'pm-tag inferred', title: 'Inferred: our reading of public information. Stays inferred until the product team confirms it.' }, `Inferred · ${LEVEL_LABEL[v.confidence].toLowerCase()} confidence`);
}

function miniClock(ix: Indexed, inputIds: string[]): HTMLElement | null {
  const inputs = inputIds.map((i) => ix.inputById.get(i)).filter((i) => !!i?.tts_days && !!i?.ttr_days);
  if (!inputs.length) return null;
  return h('div', { className: 'pm-clocks' },
    ...inputs.map((i) => {
      const gap = i!.ttr_days! - i!.tts_days!;
      return h('div', { className: `pm-clock${gap > 0 ? ' gap' : ''}` },
        h('span', null, i!.name.split(' (')[0]),
        h('b', null, `survive ${i!.tts_days} d · recover ${i!.ttr_days} d`),
        provChip('synth', 'Synthetic cover: time to survive (TTS) vs time to recover (TTR)'));
    }));
}

function signalCell(ix: Indexed, v: PremortemVulnerability, result: ExposureResult | null): HTMLElement {
  if (!result) return h('div', { className: 'pm-cell pm-signals' }, h('p', { className: 'ld-quiet' }, 'Waiting for live signals…'));
  const sig = signalsFor(refsFor(ix, v), result);
  const top = sig[0]?.score ?? 0;
  const p = pressureOf(top);
  return h('div', { className: 'pm-cell pm-signals' },
    h('div', { className: `pm-pressure ${p}` }, PRESSURE_LABEL[p], top ? h('span', null, ` · strongest ${top}`) : null),
    ...(sig.length ? sig.slice(0, 3).map((x) => {
      const ev = x.evidence.slice().sort((a, b) => b.points - a.points)[0];
      return h('div', { className: 'pm-sig' },
        h('button', { type: 'button', className: 'pm-sig-t', title: 'Open the evidence drawer', onClick: () => openDrawer(ix, x, latest) },
          h('span', { className: `pm-dot ${pressureOf(x.score)}` }), `${x.title}`, h('span', { className: 'pm-sig-sc' }, String(x.score))),
        ev ? h('div', { className: 'pm-sig-ev' }, extLink(ev.url, ev.text)) : null,
        ev ? h('div', { className: 'pm-sig-m' }, `${ev.source}${ev.at ? ` · ${ev.at}` : ''}`, ' ', provChip(ev.stale ? 'last good copy' : ev.prov)) : null);
    }) : [h('p', { className: 'ld-quiet' }, 'No live signal touches this today. Quiet is not the same as safe: the weakness is still there.')]));
}

function stressCell(pm: Premortem, v: PremortemVulnerability): HTMLElement {
  return h('div', { className: 'pm-cell pm-stress' },
    ...pm.scenarios.map((s) => {
      const lvl = s.stresses[v.id] ?? 'low';
      return h('div', { className: `pm-st ${lvl}`, title: `${s.name}: ${LEVEL_LABEL[lvl]} stress` },
        h('span', { className: 'pm-st-n' }, s.name), h('b', null, LEVEL_LABEL[lvl]));
    }));
}

function vulnerabilityRow(ix: Indexed, pm: Premortem, v: PremortemVulnerability, result: ExposureResult | null): HTMLElement {
  return h('div', { className: 'pm-row', id: `pm-v-${v.id}` },
    h('div', { className: 'pm-cell pm-vuln' },
      h('div', { className: 'pm-vt' }, v.title),
      h('div', { className: 'pm-tags' }, v.category ? h('span', { className: 'pm-tag cat', title: 'Internal-vulnerability group' }, v.category) : null, statusTag(v)),
      h('p', { className: 'pm-vx' }, v.text),
      v.why_internal ? h('p', { className: 'pm-vw' }, h('b', null, 'Why it is ours to fix: '), v.why_internal) : null,
      miniClock(ix, v.inputs ?? []),
      v.basis ? h('p', { className: 'ld-note' }, v.basis) : null,
      v.links?.length ? h('div', { className: 'pm-links' }, ...v.links.map((l) => extLink(l.url, l.label))) : null),
    signalCell(ix, v, result),
    stressCell(pm, v));
}

function todayLine(ix: Indexed, pm: Premortem, result: ExposureResult | null): HTMLElement {
  if (!result) return h('p', { className: 'pm-today' }, 'Reading today’s live signals…');
  const pressed = pm.vulnerabilities
    .map((v) => ({ v, top: signalsFor(refsFor(ix, v), result)[0]?.score ?? 0 }))
    .filter((x) => x.top >= HOT)
    .sort((a, b) => b.top - a.top);
  const n = pm.vulnerabilities.length;
  return h('p', { className: 'pm-today' },
    h('b', null, 'Today: '),
    pressed.length
      ? `live signals press on ${pressed.length} of ${n} weaknesses: ${pressed.map((x) => x.v.title.toLowerCase()).join('; ')}. The rest are quiet, which is not the same as safe.`
      : `no live signal presses on any of the ${n} weaknesses. Calm days are when the levers are cheapest.`);
}

function feedLine(result: ExposureResult | null): HTMLElement | null {
  if (!result) return null;
  const ok = result.feeds.filter((f) => f.ok).length;
  const down = result.feeds.filter((f) => !f.ok);
  const at = new Date(result.computedAt).toISOString().slice(0, 16).replace('T', ' ');
  return h('p', { className: 'ld-note' },
    `Live signals computed ${at} UTC, re-read every 5 minutes. ${ok} of ${result.feeds.length} feeds live`,
    down.length ? `; unavailable: ${down.map((f) => `${f.name}${f.stale ? ` (last good ${f.at.slice(0, 16).replace('T', ' ')} UTC)` : ''}`).join(', ')}.` : '.');
}

function scenariosSection(ix: Indexed, pm: Premortem, result: ExposureResult | null): HTMLElement {
  const ax = pm.scenario_axes;
  const at = (x: 'low' | 'high', y: 'low' | 'high') => pm.scenarios.find((s) => s.quadrant.x === x && s.quadrant.y === y);
  const titleOf = (id: string) => pm.vulnerabilities.find((v) => v.id === id)?.title ?? id;
  const card = (s: ReturnType<typeof at>) => {
    if (!s) return h('div', { className: 'pm-scen empty' });
    const highs = Object.entries(s.stresses).filter(([, l]) => l === 'high').map(([id]) => id);
    const watch = result ? (s.watch ?? []).flatMap((r) => hotspotsForRef(result, r).slice(0, 1)) : [];
    return h('div', { className: 'pm-scen' },
      h('div', { className: 'pm-k' }, `${ax.x[s.quadrant.x]} · ${ax.y[s.quadrant.y]}`),
      h('div', { className: 'pm-scen-n' }, s.name),
      s.threats?.length ? h('div', { className: 'pm-threats', title: 'External threat types this future draws on' }, ...s.threats.map((t) => h('span', null, t))) : null,
      h('p', { className: 'pm-scen-s' }, s.story),
      h('div', { className: 'pm-k' }, 'Hits hardest'),
      h('ul', { className: 'pm-list' }, ...highs.map((id) => h('li', null, h('button', {
        type: 'button', className: 'pm-jump',
        onClick: () => root?.querySelector(`#pm-v-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      }, titleOf(id))))),
      h('div', { className: 'pm-k' }, 'Early signs it is arriving'),
      h('ul', { className: 'pm-list' }, ...s.early_signs.map((e) => h('li', null, e))),
      watch.length ? h('div', { className: 'pm-k' }, 'Today’s reading') : null,
      watch.length ? h('div', { className: 'pm-watch' }, ...watch.map((x) =>
        h('button', { type: 'button', className: 'pm-sig-t', onClick: () => openDrawer(ix, x, latest) },
          h('span', { className: `pm-dot ${pressureOf(x.score)}` }), `${x.title}${x.kind === 'input' ? ` (${x.subtitle})` : ''}`, h('span', { className: 'pm-sig-sc' }, x.score ? String(x.score) : 'quiet')))) : null);
  };
  return h('section', { className: 'ld-sec' },
    h('div', { className: 'ld-h4' }, 'Four five-year futures ', h('em', null, 'scenarios, not forecasts')),
    ax.note ? h('p', { className: 'pm-intro' }, ax.note) : null,
    h('div', { className: 'pm-quad' },
      h('div', { className: 'pm-quad-grid' }, card(at('low', 'high')), card(at('high', 'high')), card(at('low', 'low')), card(at('high', 'low'))),
      h('div', { className: 'pm-axis-x' }, h('span', null, `← ${ax.x.low}`), h('b', null, `${ax.x.label} across · ${ax.y.label.toLowerCase()} up: ${ax.y.high.toLowerCase()} on top`), h('span', null, `${ax.x.high} →`))));
}

function leversSection(pm: Premortem): HTMLElement {
  const titleOf = (id: string) => pm.vulnerabilities.find((v) => v.id === id)?.title ?? id;
  // Grouped under the resiliency principles, in the taxonomy's order.
  const order = pm.taxonomy?.principles ?? [];
  const rank = (p?: string) => { const i = order.indexOf(p ?? ''); return i < 0 ? order.length : i; };
  const levers = pm.levers.slice().sort((a, b) => rank(a.principle) - rank(b.principle));
  return h('section', { className: 'ld-sec' },
    h('div', { className: 'ld-h4' }, 'Levers ', h('em', null, 'by resiliency principle: what the OEM can pull, and who owns it')),
    h('div', { className: 'pm-levers' }, ...levers.map((l) => h('div', { className: 'pm-lever' },
      l.principle ? h('div', { className: 'pm-k' }, l.principle) : null,
      h('div', { className: 'pm-lever-t' }, l.title),
      h('p', null, l.text),
      h('div', { className: 'pm-lever-m' },
        h('span', null, 'Eases ', h('b', null, l.addresses.map(titleOf).join('; '))),
        l.shifts_to?.length ? h('span', null, 'Moves load onto ', h('b', null, l.shifts_to.map(titleOf).join('; '))) : null,
        h('span', null, 'Owner ', h('b', null, l.owner_function)),
        h('span', null, 'When ', h('b', null, l.horizon)))))),
    h('p', { className: 'ld-note' }, 'Levers are drafted from public information for discussion. Lodestar recommends; people decide.'));
}

function toleranceSection(ix: Indexed, pm: Premortem): HTMLElement {
  const t = pm.tolerance;
  const rows = t.inputs.map((id) => ix.inputById.get(id)).filter((i) => !!i?.tts_days && !!i?.ttr_days)
    .map((i) => ({ name: i!.name.split(' (')[0]!, gap: i!.ttr_days! - i!.tts_days! }))
    .sort((a, b) => b.gap - a.gap);
  const lo = Math.min(-100, ...rows.map((r) => r.gap));
  const hi = Math.max(t.line_days + 60, ...rows.map((r) => r.gap));
  const pos = (d: number) => ((d - lo) / (hi - lo)) * 100;
  const over = rows.filter((r) => r.gap > t.line_days);
  return h('section', { className: 'ld-sec' },
    h('div', { className: 'ld-h4' }, t.heading ?? 'Tolerance line', h('em', null, 'a first tolerance line, drafted for the product team to set')),
    h('p', { className: 'pm-tol-s' }, t.statement, ' ', provChip(t.prov, 'The line and the gaps are synthetic for now')),
    t.value_basis ? h('p', { className: 'pm-intro' }, h('b', null, 'Why this line: '), t.value_basis) : null,
    h('div', { className: 'pm-tol' },
      h('div', { className: 'pm-tol-axis' },
        h('span', { style: `left:${pos(0)}%` }, '0'),
        h('span', { className: 'line', style: `left:${pos(t.line_days)}%` }, `+${t.line_days} d tolerance`)),
      ...rows.map((r) => {
        const a = pos(Math.min(0, r.gap));
        const b = pos(Math.max(0, r.gap));
        return h('div', { className: `pm-tol-row${r.gap > t.line_days ? ' over' : r.gap > 0 ? ' near' : ''}` },
          h('span', { className: 'pm-tol-n' }, r.name),
          h('div', { className: 'pm-tol-track' },
            h('i', { className: 'zero', style: `left:${pos(0)}%` }),
            h('i', { className: 'limit', style: `left:${pos(t.line_days)}%` }),
            h('b', { style: `left:${a}%;width:${Math.max(0.5, b - a)}%` })),
          h('span', { className: 'pm-tol-v' }, r.gap > 0 ? `+${r.gap} d` : `${r.gap} d`));
      })),
    h('p', { className: 'pm-verdict' }, over.length
      ? h('span', null, h('b', { className: 'gap' }, `Outside tolerance on ${over.length} of ${rows.length} inputs: `), `${over.map((r) => r.name).join(', ')}. Recovery would outrun stock by more than ${t.line_days} days.`)
      : h('span', null, h('b', { className: 'ok' }, 'Inside tolerance. '), `No input recovers more than ${t.line_days} days after its stock runs out.`)),
    h('p', { className: 'ld-note' }, `${t.metric}. Left of zero, stock outlasts recovery. ${t.basis ?? ''}`));
}

function glossarySection(pm: Premortem): HTMLElement {
  return h('section', { className: 'ld-sec' },
    h('div', { className: 'ld-h4' }, 'Abbreviations and tags'),
    h('dl', { className: 'pm-gloss' }, ...pm.glossary.flatMap(([k, v]) => [h('dt', null, k), h('dd', null, v)])),
    h('p', { className: 'ld-note' }, 'Inferred: our reading of public information, with a confidence. Confirmed: stated by the source named. Nothing here has been validated by the product team yet; validating it is the next step.'));
}

function render(): void {
  if (!root || !current) return;
  const { ix, pm } = current;
  const product = ix.productById.get(pm.product);
  const page = h('article', { className: 'lodestar-premortem ld', role: 'dialog', 'aria-modal': 'true', 'aria-label': `Pre-mortem: ${product?.name ?? pm.product}` },
    h('section', { className: 'ld-sec ld-top' },
      h('button', { type: 'button', className: 'ld-back', onClick: close }, '← Back to map'),
      h('div', { className: 'ld-kicker' }, h('span', { className: 'ld-sev medium' }, 'Pre-mortem'), h('span', null, product?.name ?? pm.product), h('span', null, pm.horizon), h('span', null, pm.status)),
      h('h2', { className: 'ld-title pm-title' }, pm.title),
      ...pm.story.map((p, i) => h('p', { className: i === 0 ? 'ld-lede' : 'pm-story' }, p)),
      pm.story_note ? h('p', { className: 'ld-note' }, pm.story_note) : null,
      todayLine(ix, pm, latest),
      h('p', { className: 'ld-note' }, pm.method)),
    h('section', { className: 'ld-sec' },
      h('div', { className: 'ld-h4' }, 'What outcomes we are protecting'),
      h('div', { className: 'pm-value' }, ...pm.value.map((v) => h('div', null,
        h('div', { className: 'pm-k' }, v.label, ' ', ...v.prov.split('/').map((p) => provChip(p, v.basis))),
        h('p', null, v.text))))),
    h('section', { className: 'ld-sec' },
      h('div', { className: 'ld-h4' }, 'Where it breaks ', h('em', null, 'weaknesses we control · live signals today · futures that stress them')),
      h('div', { className: 'pm-grid' },
        h('div', { className: 'pm-row pm-head' },
          h('div', null, 'Weakness'), h('div', null, 'Pressing on it today (live)'), h('div', null, 'Stress in each future')),
        ...pm.vulnerabilities.map((v) => vulnerabilityRow(ix, pm, v, latest))),
      feedLine(latest)),
    scenariosSection(ix, pm, latest),
    leversSection(pm),
    toleranceSection(ix, pm),
    glossarySection(pm));
  const scroll = root.scrollTop;
  root.replaceChildren(page);
  root.scrollTop = scroll;
}

export function openPremortem(ix: Indexed, pm: Premortem, result: ExposureResult | null): void {
  latest = result ?? latest;
  if (!root) {
    root = h('div', { className: 'lodestar-premortem-backdrop' });
    document.body.appendChild(root);
    document.addEventListener('keydown', onKey);
  }
  current = { ix, pm };
  setParam(pm.id);
  render();
  root.scrollTop = 0;
}

/** Called on every exposure refresh, so an open page shows today's signals. */
export function updatePremortem(result: ExposureResult | null): void {
  if (result) latest = result;
  if (root && current) render();
}
