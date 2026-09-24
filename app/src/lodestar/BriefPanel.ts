// Lodestar: Command brief (docs/BUILD_BRIEF.md §3e.1). Headline figure is
// revenue at risk over 90 days (synthetic, labelled), then the model-written
// brief and decision cards from api/lodestar/brief.js. The model recommends;
// people decide.

import { Panel } from '@/components/Panel';
import { h } from '@/utils/dom-utils';
import type { ExposureResult, Hotspot } from './exposure';
import type { FamilyFilter, Indexed } from './network';

interface Option { action: string; cost: string; protects: string; regulatory_time: string; confidence: string }
interface Decision { title: string; why: string; owner_function: string; decide_by: string; evidence_ids: string[]; options: Option[] }
interface Brief { headline: string; brief: string; decisions: Decision[]; watch: string[] }
interface BriefResult { brief: Brief; model: string; usage: { prompt: number; completion: number; total: number } | null; cost: number | null; cached: boolean; generatedAt: string }
interface BriefResponse extends Partial<BriefResult> { error?: string; compare?: (BriefResult & { error?: string }) | { error: string } | null }

const money = (usd: number) => usd >= 1e9 ? `$${(usd / 1e9).toFixed(1)}B` : `$${Math.round(usd / 1e6)}M`;

export interface RevenueAtRisk { usd: number; installs: number; byProduct: Array<{ name: string; usd: number; installs: number; score: number }> }

/** Synthetic: installs due in 90 days x mid list price x exposure/100, per product in the filter. */
export function revenueAtRisk(ix: Indexed, result: ExposureResult, filter: FamilyFilter): RevenueAtRisk {
  const byProduct = result.products
    .filter((p) => filter === 'ALL' || p.family === filter)
    .map((p) => {
      const prod = ix.productById.get(p.productId)!;
      const installs = prod.installs_next_90d ?? 0;
      const [lo, hi] = prod.price_usd ?? [0, 0];
      const atRisk = Math.round(installs * (p.score / 100));
      return { name: prod.name, usd: atRisk * ((lo + hi) / 2), installs: atRisk, score: p.score };
    });
  return {
    usd: byProduct.reduce((s, p) => s + p.usd, 0),
    installs: byProduct.reduce((s, p) => s + p.installs, 0),
    byProduct: byProduct.sort((a, b) => b.usd - a.usd),
  };
}

export class LodestarBriefPanel extends Panel {
  private ix: Indexed | null = null;
  private result: ExposureResult | null = null;
  private filter: FamilyFilter = 'ALL';
  private compare = false;
  private loading = false;
  private response: BriefResponse | null = null;
  private lastKey = '';

  constructor() {
    super({
      id: 'lodestar-brief',
      title: 'Command brief',
      infoTooltip: 'Model-written from the top live exposure items and their evidence. It recommends; people decide. Revenue at risk is synthetic: installs due in 90 days (synth) x mid list price (est) x live exposure score.',
    });
    this.showLoading('Waiting for live exposure scores…');
  }

  update(ix: Indexed, result: ExposureResult | null, filter: FamilyFilter): void {
    this.ix = ix;
    this.filter = filter;
    if (!result) return;
    this.result = result;
    const key = `${filter}|${result.computedAt}`;
    if (key !== this.lastKey) {
      this.lastKey = key;
      void this.generate(false);
    } else {
      this.render();
    }
  }

  private items(): unknown[] {
    const r = this.result!;
    const ix = this.ix!;
    return r.hotspots
      .filter((x) => x.score > 0 && (this.filter === 'ALL' || x.families.includes(this.filter as never)))
      .slice(0, 10)
      .map((x: Hotspot) => {
        const inputId = x.kind === 'input' ? x.id.split(':')[1] : undefined;
        const inp = inputId ? ix.inputById.get(inputId) : undefined;
        const installs = x.products.reduce((s, p) => s + (ix.productById.get(p)?.installs_next_90d ?? 0), 0);
        return {
          id: x.id, title: x.title, kind: x.kind, subtitle: x.subtitle, score: x.score,
          products: x.products.map((p) => ix.productById.get(p)?.name ?? p),
          oem: { tts_days: inp?.tts_days, ttr_days: inp?.ttr_days, installs_next_90d: installs || undefined },
          evidence: x.evidence.map((e) => ({ text: e.text, source: e.source, at: e.at, prov: e.prov })),
        };
      });
  }

  private async generate(regenerate: boolean): Promise<void> {
    if (!this.result || !this.ix) return;
    this.loading = true;
    this.render();
    try {
      const r = await fetch('/api/lodestar/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: this.items(), filter: this.filter,
          date: new Date().toISOString().slice(0, 10), compare: this.compare, regenerate,
        }),
      });
      this.response = await r.json() as BriefResponse;
      if (!r.ok && !this.response.error) this.response.error = `HTTP ${r.status}`;
    } catch (err) {
      this.response = { error: err instanceof Error ? err.message : String(err) };
    }
    this.loading = false;
    this.render();
  }

  private render(): void {
    if (!this.result || !this.ix) return;
    const rar = revenueAtRisk(this.ix, this.result, this.filter);
    const decisions = this.response?.brief?.decisions?.length ?? 0;

    const figure = h('div', { className: 'lodestar-rar' },
      h('div', { className: 'lodestar-rar-num' }, money(rar.usd)),
      h('div', { className: 'lodestar-rar-label' }, 'revenue at risk, next 90 days ',
        h('span', { className: 'lodestar-prov prov-synth' }, 'synthetic')),
      h('div', { className: 'lodestar-rar-sub' },
        h('span', null, h('b', null, String(rar.installs)), ' installs at risk ', h('span', { className: 'lodestar-prov prov-synth' }, 'synth')),
        h('span', null, h('b', null, String(decisions)), ' decisions')),
    );

    const controls = h('div', { className: 'lodestar-brief-controls' },
      h('button', { type: 'button', className: 'lodestar-btn', disabled: this.loading, onClick: () => void this.generate(true) }, this.loading ? 'Writing…' : 'Regenerate'),
      h('label', { className: 'lodestar-toggle' },
        h('input', { type: 'checkbox', checked: this.compare, onChange: (e: Event) => { this.compare = (e.target as HTMLInputElement).checked; void this.generate(false); } }),
        ' Compare models'),
    );

    const resp = this.response;
    let body: HTMLElement;
    if (this.loading && !resp?.brief) body = h('p', { className: 'lodestar-quiet' }, 'Writing the brief from live evidence…');
    else if (resp?.error) body = h('p', { className: 'lodestar-feed-failed' }, `Brief unavailable: ${resp.error}. The scores and evidence below are still live.`);
    else if (resp?.brief) {
      const cmp = resp.compare && !('error' in resp.compare && !('brief' in resp.compare)) ? resp.compare as BriefResult : null;
      body = cmp
        ? h('div', { className: 'lodestar-compare' }, this.briefView(resp as BriefResult), this.briefView(cmp))
        : this.briefView(resp as BriefResult);
      if (resp.compare && 'error' in resp.compare && resp.compare.error) {
        body.appendChild(h('p', { className: 'lodestar-feed-failed' }, `Compare model unavailable: ${resp.compare.error}`));
      }
    } else body = h('p', { className: 'lodestar-quiet' }, '');

    this.setContentNodes(h('div', { className: 'lodestar-brief' }, figure, controls, body));
  }

  private briefView(r: BriefResult): HTMLElement {
    const b = r.brief;
    const cost = r.cost != null ? ` · $${r.cost.toFixed(4)}` : '';
    const tokens = r.usage ? ` · ${r.usage.total.toLocaleString()} tokens` : '';
    return h('div', { className: 'lodestar-brief-body' },
      h('div', { className: 'lodestar-model' }, `${r.model}${tokens}${cost}${r.cached ? ' · cached' : ''} · ${new Date(r.generatedAt).toISOString().slice(11, 16)} UTC`),
      h('div', { className: 'lodestar-headline' }, b.headline),
      h('p', { className: 'lodestar-prose' }, b.brief),
      ...(b.decisions ?? []).map((d) => h('div', { className: 'lodestar-decision' },
        h('div', { className: 'lodestar-decide-by' }, `Decide by ${d.decide_by} · ${d.owner_function}`),
        h('div', { className: 'lodestar-decision-title' }, d.title),
        h('div', { className: 'lodestar-decision-why' }, d.why),
        h('ol', { className: 'lodestar-options' }, ...d.options.map((o) => h('li', null,
          h('span', { className: 'lodestar-opt-action' }, o.action),
          h('span', { className: 'lodestar-opt-meta' }, `Cost ${o.cost} · Protects ${o.protects} · Regulatory ${o.regulatory_time} · Confidence ${o.confidence}`)))),
      )),
      b.watch?.length ? h('div', { className: 'lodestar-watch' }, h('span', { className: 'lodestar-ev-kind' }, 'Watch'),
        h('ul', null, ...b.watch.map((w) => h('li', null, w)))) : null,
      h('div', { className: 'lodestar-ai-note' }, 'Model-written from the live evidence shown in Hotspots. It recommends options; people decide. Figures marked synthetic are demo values, not company data.'),
    );
  }
}
