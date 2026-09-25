// Lodestar entry point: loads the OEM network, runs the exposure engine on
// load and every 5 minutes, and keeps the map overlay, the hotspots panel and
// the product filter in step.

import type { AppContext } from '@/app/app-context';
import { h } from '@/utils/dom-utils';
import { loadNetwork, indexNetwork, type FamilyFilter, type Indexed, FAMILIES, FAMILY_LABELS } from './network';
import { computeExposure, exportSnapshot, type ExposureResult, type Hotspot } from './exposure';
import { buildOverlay, type OverlayState } from './overlay';
import type { LodestarHotspotsPanel } from './HotspotsPanel';
import type { LodestarBriefPanel } from './BriefPanel';
import type { LodestarProductsPanel, LodestarInputClockPanel, LodestarRegWatchPanel, LodestarTelegramPanel } from './BoardPanels';
import { openDrawer } from './drawer';
import './lodestar.css';

const REFRESH_MS = 5 * 60 * 1000;
const FILTER_KEY = 'lodestar-product-filter';

type Listener = (s: { filter: FamilyFilter; result: ExposureResult | null; ix: Indexed }) => void;
const listeners = new Set<Listener>();
/** Other Lodestar panels subscribe to filter and score changes here. */
export function onLodestarUpdate(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function readFilter(): FamilyFilter {
  try {
    const v = localStorage.getItem(FILTER_KEY);
    return v === 'ALL' || (FAMILIES as string[]).includes(v ?? '') ? (v as FamilyFilter) : 'ALL';
  } catch { return 'ALL'; }
}
function writeFilter(v: FamilyFilter): void {
  try { localStorage.setItem(FILTER_KEY, v); } catch { /* per-viewer convenience only */ }
}

export async function startLodestar(ctx: AppContext): Promise<void> {
  const ix = indexNetwork(await loadNetwork());
  const state: OverlayState = {
    ix, result: null, filter: readFilter(), showNetwork: true, showHeat: true, selectedId: null,
  };

  const panel = (): LodestarHotspotsPanel | undefined =>
    ctx.panels['lodestar-hotspots'] as LodestarHotspotsPanel | undefined;

  const focus = (hs: Hotspot) => {
    state.selectedId = hs.id;
    ctx.map?.setCenter(hs.lat, hs.lon, 4);
    render();
  };

  const render = () => {
    ctx.map?.setLodestarOverlay(buildOverlay(state, (hs) => {
      state.selectedId = hs.id;
      render();
      openDrawer(ix, hs);
    }));
    const p = panel();
    if (p && state.result) {
      p.setFocusHandler(focus);
      p.setDrawerHandler((hs) => openDrawer(ix, hs));
      p.update(state.result, state.filter, state.selectedId);
    }
    (ctx.panels['lodestar-brief'] as LodestarBriefPanel | undefined)?.update(ix, state.result, state.filter);
    if (state.result) {
      const board = ctx.panels['lodestar-products'] as LodestarProductsPanel | undefined;
      board?.setPickHandler((family, driver) => {
        state.filter = family; writeFilter(family);
        if (driver) { state.selectedId = driver.id; ctx.map?.setCenter(driver.lat, driver.lon, 4); }
        render();
      });
      board?.update(ix, state.result, state.filter);
      (ctx.panels['lodestar-inputs'] as LodestarInputClockPanel | undefined)?.update(ix, state.result, state.filter);
      (ctx.panels['lodestar-regwatch'] as LodestarRegWatchPanel | undefined)?.update(ix, state.result);
      (ctx.panels['lodestar-telegram'] as LodestarTelegramPanel | undefined)?.update(ix, state.result, state.filter);
    }
    for (const fn of listeners) fn({ filter: state.filter, result: state.result, ix });
    syncFilterButtons();
  };

  // Product filter in the top bar: All / MR / CT / MI / US / XR.
  const buttons = new Map<FamilyFilter, HTMLButtonElement>();
  const syncFilterButtons = () => {
    for (const [k, b] of buttons) {
      b.classList.toggle('active', k === state.filter);
      b.setAttribute('aria-pressed', k === state.filter ? 'true' : 'false');
    }
  };
  const mountFilter = () => {
    if (document.querySelector('.lodestar-filter')) return;
    const host = document.querySelector('.header-left');
    if (!host) return;
    const group = h('div', { className: 'lodestar-filter', role: 'group', 'aria-label': 'Product line' },
      ...(['ALL', ...FAMILIES] as FamilyFilter[]).map((f) => {
        const b = h('button', {
          type: 'button',
          className: 'lodestar-filter-btn',
          onClick: () => { state.filter = f; state.selectedId = null; writeFilter(f); render(); },
        }, FAMILY_LABELS[f]) as HTMLButtonElement;
        buttons.set(f, b);
        return b;
      }));
    host.appendChild(group);
    syncFilterButtons();
  };

  const refresh = async () => {
    try {
      state.result = await computeExposure(ix);
    } catch (err) {
      console.warn('[Lodestar] exposure scoring failed', err);
    }
    mountFilter();
    render();
  };

  // Operator helper: run lodestarExportSnapshot() in the console of a browser
  // with live data to download a fresh public/snapshot/last-good.json
  // (docs/runbooks/refresh-snapshot.md). Public feed data only.
  (window as unknown as { lodestarExportSnapshot: () => void }).lodestarExportSnapshot = () => {
    const blob = new Blob([JSON.stringify(exportSnapshot())], { type: 'application/json' });
    const a = h('a', { href: URL.createObjectURL(blob), download: 'last-good.json' }) as HTMLAnchorElement;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 5000);
  };

  mountFilter();
  render();
  await refresh();
  setInterval(() => { if (!document.hidden) void refresh(); }, REFRESH_MS);
  // The hotspots panel is lazily created; hand it the current result when it appears.
  const waitForPanel = setInterval(() => {
    const ids = ['lodestar-hotspots', 'lodestar-brief', 'lodestar-products', 'lodestar-inputs', 'lodestar-regwatch', 'lodestar-telegram'];
    if (state.result && ids.every((id) => ctx.panels[id])) { render(); clearInterval(waitForPanel); }
    else if (state.result) render();
  }, 1000);
}
