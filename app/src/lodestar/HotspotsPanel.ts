// Lodestar: "Hotspots worth diving into" — the exposure engine's ranked list,
// with click-through evidence. Pairs with the heatmap layer on the map.

import { Panel } from '@/components/Panel';
import { h } from '@/utils/dom-utils';
import type { ExposureResult, Hotspot, Evidence } from './exposure';
import type { FamilyFilter } from './network';
import { scoreColor } from './overlay';

const SIGNAL_LABEL: Record<Evidence['signal'], string> = {
  chokepoint: 'Chokepoint',
  quake: 'Earthquake',
  natural: 'Natural hazard',
  advisory: 'Travel advisory',
  'country-risk': 'Country risk',
  'export-control': 'Export control',
};
const PROV_LABEL: Record<Evidence['prov'], string> = { live: 'live', S: 'sourced', est: 'estimate', synth: 'synthetic' };
const KIND_LABEL: Record<Hotspot['kind'], string> = { site: 'Site', input: 'Input origin', chokepoint: 'Chokepoint' };

const rgb = (score: number) => { const [r, g, b] = scoreColor(score); return `rgb(${r},${g},${b})`; };

export class LodestarHotspotsPanel extends Panel {
  private result: ExposureResult | null = null;
  private filter: FamilyFilter = 'ALL';
  private expanded: string | null = null;
  private onFocus: ((h: Hotspot) => void) | null = null;

  constructor() {
    super({
      id: 'lodestar-hotspots',
      title: 'Hotspots worth diving into',
      showCount: true,
      infoTooltip: 'Live exposure of the OEM network (0-100): chokepoint traffic vs baseline, hazards within 300 km, travel advisories, country instability and export controls, per site, input origin and chokepoint. Every point links to its evidence.',
    });
    this.showLoading('Scoring the network against live signals…');
  }

  setFocusHandler(fn: (h: Hotspot) => void): void {
    this.onFocus = fn;
  }

  update(result: ExposureResult, filter: FamilyFilter, selectedId: string | null): void {
    this.result = result;
    this.filter = filter;
    if (selectedId) this.expanded = selectedId;
    this.render();
  }

  private render(): void {
    const r = this.result;
    if (!r) return;
    const rows = r.hotspots
      .filter((x) => x.score > 0 && (this.filter === 'ALL' || x.families.includes(this.filter as never)))
      .slice(0, 25);
    this.setCount(rows.length);

    const failed = r.feeds.filter((f) => !f.ok);
    const list = rows.length
      ? h('ol', { className: 'lodestar-hotspot-list' }, ...rows.map((x) => this.row(x)))
      : h('p', { className: 'lodestar-quiet' }, 'Nothing scores above zero for this filter right now. The system also tells you what not to worry about.');

    this.setContentNodes(
      h('div', { className: 'lodestar-hotspots' },
        list,
        h('div', { className: 'lodestar-feed-status' },
          `Scored ${new Date(r.computedAt).toUTCString().replace(' GMT', ' UTC')} from ${r.feeds.length - failed.length}/${r.feeds.length} live feeds.`,
          failed.length ? h('span', { className: 'lodestar-feed-failed' }, ` Unavailable: ${failed.map((f) => f.name).join(', ')}.`) : null,
        ),
      ),
    );
  }

  private row(x: Hotspot): HTMLElement {
    const open = this.expanded === x.id;
    const top = x.evidence.slice().sort((a, b) => b.points - a.points);
    const header = h('button', {
      className: 'lodestar-hotspot-head',
      type: 'button',
      'aria-expanded': open ? 'true' : 'false',
      onClick: () => {
        this.expanded = open ? null : x.id;
        this.render();
        if (!open) this.onFocus?.(x);
      },
    },
      h('span', { className: 'lodestar-score', style: `background:${rgb(x.score)}` }, String(x.score)),
      h('span', { className: 'lodestar-hotspot-main' },
        h('span', { className: 'lodestar-hotspot-title' }, x.title),
        h('span', { className: 'lodestar-hotspot-sub' }, `${KIND_LABEL[x.kind]} · ${x.subtitle}`),
        top[0] ? h('span', { className: 'lodestar-hotspot-driver' }, top[0].text) : null,
      ),
      h('span', { className: 'lodestar-hotspot-families' }, x.families.join(' ')),
    );
    if (!open) return h('li', { className: 'lodestar-hotspot' }, header);
    return h('li', { className: 'lodestar-hotspot open' }, header,
      h('ul', { className: 'lodestar-evidence' }, ...top.map((e) => h('li', null,
        h('span', { className: 'lodestar-ev-kind' }, SIGNAL_LABEL[e.signal]),
        h('span', { className: 'lodestar-ev-text' },
          e.url ? h('a', { href: e.url, target: '_blank', rel: 'noopener' }, e.text) : e.text),
        h('span', { className: 'lodestar-ev-meta' },
          `${e.source}${e.at ? ` · ${e.at}` : ''} · +${e.points} · `,
          h('span', { className: `lodestar-prov prov-${e.prov}` }, PROV_LABEL[e.prov])),
      ))),
    );
  }
}
