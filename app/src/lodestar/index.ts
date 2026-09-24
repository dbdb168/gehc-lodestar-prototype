// Lodestar entry point: loads the OEM network, runs the exposure engine on
// load and every 5 minutes, and keeps the map overlay, the hotspots panel and
// the product filter in step.

import type { AppContext } from '@/app/app-context';
import { h } from '@/utils/dom-utils';
import { loadNetwork, indexNetwork, type FamilyFilter, type Indexed, FAMILIES, FAMILY_LABELS } from './network';
import { computeExposure, type ExposureResult, type Hotspot } from './exposure';
import { buildOverlay, type OverlayState } from './overlay';
import type { LodestarHotspotsPanel } from './HotspotsPanel';
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
      const p = panel();
      p?.getElement?.().scrollIntoView?.({ behavior: 'smooth', block: 'nearest' });
    }));
    const p = panel();
    if (p && state.result) {
      p.setFocusHandler(focus);
      p.update(state.result, state.filter, state.selectedId);
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

  mountFilter();
  render();
  await refresh();
  setInterval(() => { if (!document.hidden) void refresh(); }, REFRESH_MS);
  // The hotspots panel is lazily created; hand it the current result when it appears.
  const waitForPanel = setInterval(() => {
    if (panel() && state.result) { render(); clearInterval(waitForPanel); }
  }, 1000);
}
