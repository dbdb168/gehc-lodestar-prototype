// Lodestar: evidence drawer (docs/BUILD_BRIEF.md §3e.4). Live evidence with
// links, the cascade from event to money, costed options from the brief, and
// "Draft with agent" for an S&OP escalation, a customer install notice or a
// supplier RFQ. Drafts need a person's approval and are never sent.

import { h } from '@/utils/dom-utils';
import { extLink } from './links';
import type { Hotspot } from './exposure';
import type { Indexed } from './network';
import { decisionsFor } from './store';
import { scoreColor } from './overlay';

type DraftType = 'sop' | 'customer' | 'rfq';
const DRAFT_LABEL: Record<DraftType, string> = { sop: 'S&OP escalation', customer: 'Customer install notice', rfq: 'Supplier RFQ' };
const money = (usd: number) => (usd >= 1e9 ? `$${(usd / 1e9).toFixed(1)}B` : `$${Math.round(usd / 1e6)}M`);

let root: HTMLElement | null = null;

function close(): void {
  root?.remove();
  root = null;
  document.removeEventListener('keydown', onKey);
}
function onKey(e: KeyboardEvent): void {
  if (e.key === 'Escape') close();
}

interface Exposure { installs: number; usd: number; products: string[] }

function exposureOf(ix: Indexed, x: Hotspot): Exposure {
  let installs = 0;
  let usd = 0;
  for (const pid of x.products) {
    const p = ix.productById.get(pid);
    if (!p) continue;
    const n = Math.round((p.installs_next_90d ?? 0) * (x.score / 100));
    const [lo, hi] = p.price_usd ?? [0, 0];
    installs += n;
    usd += n * ((lo + hi) / 2);
  }
  return { installs, usd, products: x.products.map((p) => ix.productById.get(p)?.name ?? p) };
}

export function openDrawer(ix: Indexed, x: Hotspot): void {
  close();
  const inputId = x.kind === 'input' ? x.id.split(':')[1] : undefined;
  const input = inputId ? ix.inputById.get(inputId) : undefined;
  const exp = exposureOf(ix, x);
  const top = x.evidence.slice().sort((a, b) => b.points - a.points);
  const [r, g, b] = scoreColor(x.score);

  const cascade: Array<[string, string]> = [
    ['Event', top[0]?.text ?? 'No live signal'],
    ...(input ? [['Input', `${input.name} · ${x.subtitle}`] as [string, string]] : [['Node', `${x.title} · ${x.subtitle}`] as [string, string]]),
    ...(input?.tts_days ? [['Cover', `Time to survive ${input.tts_days} d vs recover ${input.ttr_days} d (synth)`] as [string, string]] : []),
    ['Products', exp.products.join(' · ') || '—'],
    ['Installs at risk', `${exp.installs} in the next 90 days (synth)`],
    ['Revenue at risk', `${money(exp.usd)} (synth)`],
  ];

  const decisions = decisionsFor(x.id);
  const item = {
    title: x.title, subtitle: x.subtitle, score: x.score,
    products: exp.products,
    oem: { tts_days: input?.tts_days, ttr_days: input?.ttr_days, installs_at_risk: exp.installs, revenue_at_risk_usd: exp.usd },
    evidence: top.slice(0, 5).map((e) => ({ text: e.text, source: e.source, at: e.at })),
    options: decisions.flatMap((d) => d.options.map((o) => o.action)),
  };

  root = h('div', { className: 'lodestar-drawer-backdrop', onClick: (e: Event) => { if (e.target === root) close(); } },
    h('aside', { className: 'lodestar-drawer', role: 'dialog', 'aria-modal': 'true', 'aria-label': `Evidence: ${x.title}` },
      h('div', { className: 'lodestar-drawer-head' },
        h('span', { className: 'lodestar-score', style: `background:rgb(${r},${g},${b})` }, String(x.score)),
        h('div', null, h('div', { className: 'lodestar-drawer-title' }, x.title), h('div', { className: 'lodestar-hotspot-sub' }, x.subtitle)),
        h('button', { type: 'button', className: 'lodestar-x', 'aria-label': 'Close', onClick: close }, '×'),
      ),
      h('section', null, h('h4', null, 'Live evidence'),
        h('ul', { className: 'lodestar-evidence' }, ...top.map((e) => h('li', null,
          h('span', { className: 'lodestar-ev-text' }, extLink(e.url, e.text)),
          h('span', { className: 'lodestar-ev-meta' }, `${e.source}${e.at ? ` · ${e.at}` : ''} · +${e.points} · `,
            h('span', { className: `lodestar-prov prov-${e.prov}` }, e.prov === 'live' ? 'live' : e.prov === 'S' ? 'sourced' : e.prov)))))),
      h('section', null, h('h4', null, 'How it reaches the OEM'),
        h('ol', { className: 'lodestar-cascade' }, ...cascade.map(([k, v]) => h('li', null, h('span', { className: 'lodestar-ev-kind' }, k), h('span', null, v))))),
      h('section', null, h('h4', null, 'Costed options'),
        decisions.length
          ? h('div', null, ...decisions.map((d) => h('div', { className: 'lodestar-decision' },
            h('div', { className: 'lodestar-decide-by' }, `Decide by ${d.decide_by} · ${d.owner_function}`),
            h('div', { className: 'lodestar-decision-title' }, d.title),
            h('ol', { className: 'lodestar-options' }, ...d.options.map((o) => h('li', null,
              h('span', { className: 'lodestar-opt-action' }, o.action),
              h('span', { className: 'lodestar-opt-meta' }, `Cost ${o.cost} · Protects ${o.protects} · Regulatory ${o.regulatory_time} · Confidence ${o.confidence}`)))))))
          : h('p', { className: 'lodestar-quiet' }, 'The current command brief has no decision resting on this item.')),
      h('section', null, h('h4', null, 'Have the agent draft it'),
        h('div', { className: 'lodestar-drafts' }, ...(['sop', 'customer', 'rfq'] as DraftType[]).map((t) =>
          h('button', { type: 'button', className: 'lodestar-btn ghost', onClick: () => void draft(t, item) }, DRAFT_LABEL[t]))),
        h('p', { className: 'lodestar-ai-note' }, 'Drafts need your approval. Nothing is ever sent from Lodestar.')),
    ));
  document.body.appendChild(root);
  document.addEventListener('keydown', onKey);
}

async function draft(type: DraftType, item: unknown): Promise<void> {
  const modal = h('div', { className: 'lodestar-draft-modal' },
    h('div', { className: 'lodestar-modal-kicker' }, 'Drafted by agent · needs your approval · nothing has been sent'),
    h('div', { className: 'lodestar-drawer-title' }, DRAFT_LABEL[type]),
    h('pre', { className: 'lodestar-draft-body' }, 'Drafting…'));
  const drawer = root?.querySelector('.lodestar-drawer');
  drawer?.querySelector('.lodestar-draft-modal')?.remove();
  drawer?.appendChild(modal);
  modal.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  const bodyEl = modal.querySelector('pre')!;
  try {
    const r = await fetch('/api/lodestar/draft', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type, item }) });
    const d = await r.json();
    if (d.error) throw new Error(d.error);
    const text = `${d.draft.title}\nTo: ${d.draft.to}\n\n${d.draft.body}`;
    bodyEl.textContent = text;
    const cost = d.cost != null ? ` · $${Number(d.cost).toFixed(4)}` : '';
    modal.appendChild(h('div', { className: 'lodestar-model' }, `${d.model}${cost}`));
    const approve = h('button', { type: 'button', className: 'lodestar-btn' }, 'Approve & route') as HTMLButtonElement;
    approve.onclick = () => { approve.textContent = 'Approved for routing (demo: nothing sent)'; approve.disabled = true; };
    const copy = h('button', { type: 'button', className: 'lodestar-btn ghost' }, 'Copy') as HTMLButtonElement;
    copy.onclick = () => { void navigator.clipboard?.writeText(text); copy.textContent = 'Copied'; };
    const discard = h('button', { type: 'button', className: 'lodestar-btn ghost', onClick: () => modal.remove() }, 'Discard');
    modal.appendChild(h('div', { className: 'lodestar-drafts' }, copy, discard, approve));
  } catch (err) {
    bodyEl.textContent = `Draft unavailable: ${err instanceof Error ? err.message : String(err)}`;
  }
}
