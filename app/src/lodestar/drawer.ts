// Lodestar: evidence drawer (docs/BUILD_BRIEF.md §3e.4), laid out like the
// first prototype: a model-written read of the hotspot, why it was flagged,
// how it reaches the OEM, survive vs recover with a what-if, costed options
// (recommended first) and "Draft with agent". The read and options are
// written by a model from the live evidence only; OEM numbers are synthetic
// and labelled. Drafts need a person's approval and are never sent.

import { h } from '@/utils/dom-utils';
import { extLink } from './links';
import type { Evidence, ExposureResult, Hotspot } from './exposure';
import { type Indexed, type Input, chokepointByPortwatchName } from './network';
import { decisionsFor } from './store';

type DraftType = 'sop' | 'customer' | 'rfq';
const DRAFT_LABEL: Record<DraftType, string> = { sop: 'S&OP escalation', customer: 'Customer install notice', rfq: 'Supplier RFQ' };
const money = (usd: number) => (usd >= 1e9 ? `$${(usd / 1e9).toFixed(1)}B` : usd >= 1e6 ? `$${Math.round(usd / 1e6)}M` : usd > 0 ? `$${Math.round(usd / 1e3)}K` : '$0');
const SIGNAL_LABEL: Record<Evidence['signal'], string> = {
  chokepoint: 'Chokepoint traffic', quake: 'Earthquake', natural: 'Natural hazard', advisory: 'Travel advisory',
  'country-risk': 'Country risk', 'export-control': 'Export control', regulatory: 'Trade & regulatory',
  'device-regulatory': 'Device regulatory', news: 'News spike', commodity: 'Commodity price',
};

interface ReadOption { action: string; detail?: string; cost: string; protects: string; regulatory_time: string; confidence: string; owner_function?: string }
interface Read { headline: string; lede: string; story: string; category: string; decide_by: string; decide_why: string; options: ReadOption[] }
interface ReadResponse { read?: Read; model?: string; cost?: number | null; cached?: boolean; error?: string }

// Per-session cache of reads, so reopening a hotspot is instant.
const readCache = new Map<string, Promise<ReadResponse>>();

let root: HTMLElement | null = null;
function close(): void {
  root?.remove();
  root = null;
  document.removeEventListener('keydown', onKey);
}
function onKey(e: KeyboardEvent): void {
  if (e.key === 'Escape') close();
}

const sev = (score: number): [string, string] => (score >= 60 ? ['high', 'High'] : score >= 35 ? ['medium', 'Medium'] : ['low', 'Low']);

/** The input behind a hotspot: the input itself, or the input hooked to a chokepoint. */
function inputFor(ix: Indexed, x: Hotspot): Input | undefined {
  if (x.kind === 'input') return ix.inputById.get(x.id.split(':')[1]!);
  if (x.kind === 'chokepoint') {
    const cpId = x.id.slice(3);
    return ix.net.inputs.find((i) => i.tts_days && i.live?.portwatch_chokepoint
      && chokepointByPortwatchName(i.live.portwatch_chokepoint)?.id === cpId);
  }
  return undefined;
}

interface Exposure { installs90: number; midPrice: number }
function exposureOf(ix: Indexed, x: Hotspot): Exposure {
  let installs90 = 0;
  let value = 0;
  for (const pid of x.products) {
    const p = ix.productById.get(pid);
    if (!p) continue;
    const n = p.installs_next_90d ?? 0;
    const [lo, hi] = p.price_usd ?? [0, 0];
    installs90 += n;
    value += n * ((lo + hi) / 2);
  }
  return { installs90, midPrice: installs90 ? value / installs90 : 0 };
}

// ---------- what-if model (synthetic, and shown on screen) ----------

const STEPS: Array<[string, number]> = [['2 weeks', 14], ['1 month', 30], ['2 months', 60], ['3 months', 90], ['6 months', 180]];
const BASE_STEP = 2;
/** Days without supply if a disruption lasts `d` days: stock covers TTS days, an alternative lands after TTR days. */
const daysShort = (d: number, tts: number, ttr: number) => Math.max(0, Math.min(d, ttr) - tts);
function atRisk(ex: Exposure, short: number) {
  const installs = Math.round(ex.installs90 * Math.min(1, short / 90));
  return { installs, usd: installs * ex.midPrice };
}

function clock(tts: number, ttr: number): HTMLElement {
  const max = Math.max(200, tts, ttr);
  const w = (v: number) => `${Math.min(100, (v / max) * 100).toFixed(1)}%`;
  const gap = ttr - tts;
  return h('div', { className: 'ld-clock' },
    h('div', { className: 'ld-clock-row' }, h('span', null, 'Time to survive'), h('div', { className: 'ld-bar tts' }, h('i', { style: `width:${w(tts)}` })), h('b', null, `${tts} d`)),
    h('div', { className: 'ld-clock-row' }, h('span', null, 'Time to recover'), h('div', { className: `ld-bar ttr${gap <= 0 ? ' ok' : ''}` }, h('i', { style: `width:${w(ttr)}` })), h('b', null, `${ttr} d`)),
    gap <= 0
      ? h('p', { className: 'ld-verdict' }, h('b', { className: 'ok' }, 'Covered.'), ` Stock outlasts recovery here by ${-gap} days.`)
      : h('p', { className: 'ld-verdict' }, h('b', { className: 'gap' }, `Exposed by ${gap} days.`), ' Recovery outruns stock on hand, so this needs action rather than monitoring.'),
  );
}

function whatIf(ex: Exposure, tts: number, ttr: number): HTMLElement {
  const out = h('div', { className: 'ld-scen-out' });
  const steps = h('div', { className: 'ld-scen-steps' }, ...STEPS.map(([label], i) => h('span', { 'data-i': String(i) }, label)));
  const slider = h('input', { type: 'range', min: '0', max: String(STEPS.length - 1), step: '1', value: String(BASE_STEP), 'aria-label': 'How long the disruption lasts' }) as HTMLInputElement;
  const calc = (i: number) => { const short = daysShort(STEPS[i]![1], tts, ttr); return { short, ...atRisk(ex, short) }; };
  const base = calc(BASE_STEP);
  const delta = (v: number, b: number, fmt: (n: number) => string) => (v === b ? null
    : h('span', { className: `ld-delta ${v > b ? 'up' : 'down'}` }, `${v > b ? '+' : '−'}${fmt(Math.abs(v - b))}`));
  const update = () => {
    const i = Number(slider.value);
    const c = calc(i);
    out.replaceChildren(
      h('div', null, h('b', null, money(c.usd)), h('span', null, 'revenue at risk (synth)'), delta(c.usd, base.usd, money)),
      h('div', null, h('b', null, String(c.installs)), h('span', null, 'installs at risk (synth)'), delta(c.installs, base.installs, String)),
      h('div', null, h('b', null, `${c.short} d`), h('span', null, 'days without supply'), delta(c.short, base.short, (n) => `${n} d`)),
    );
    steps.querySelectorAll('span').forEach((s) => s.classList.toggle('on', Number((s as HTMLElement).dataset.i) === i));
  };
  slider.addEventListener('input', update);
  update();
  return h('div', { className: 'ld-scen' },
    h('div', { className: 'ld-h4', style: 'margin-top:18px' }, 'What if ', h('em', null, 'the disruption lasts…')),
    slider, steps, out,
    h('p', { className: 'ld-note' }, `Days without supply = min(disruption, ${ttr} d to recover) − ${tts} d of stock. Installs at risk = ${ex.installs90} installs due in 90 days × days without supply ÷ 90. Cover and installs are synthetic; list price is an estimate.`));
}

// ---------- sections ----------

function evidenceKind(e: Evidence): ['source' | 'reference' | 'internal', string] {
  if (e.prov === 'live') return ['source', 'Source'];
  if (e.prov === 'synth') return ['internal', 'Internal'];
  return ['reference', 'Reference'];
}

function whyFlagged(x: Hotspot, input: Input | undefined): HTMLElement {
  const ev = x.evidence.slice().sort((a, b) => b.points - a.points);
  const internal: Evidence[] = input?.tts_days ? [{
    signal: 'export-control',
    text: `${input.name}: stock on hand covers about ${input.tts_days} days; restoring supply takes about ${input.ttr_days} days`,
    source: 'Cover model · illustrative', points: 0, prov: 'synth',
  }] : [];
  const rows = [...ev, ...internal];
  const max = Math.max(1, ...ev.map((e) => e.points));
  const n = { source: 0, reference: 0, internal: 0 };
  for (const e of rows) n[evidenceKind(e)[0]]++;
  const counts = [n.source && `${n.source} live`, n.reference && `${n.reference} reference`, n.internal && `${n.internal} internal`].filter(Boolean).join(' · ');
  const gap = !!(input?.tts_days && input.ttr_days && input.ttr_days > input.tts_days);
  return h('section', { className: 'ld-sec' },
    h('div', { className: 'ld-h4' }, 'Why this was flagged ', h('em', null, counts)),
    h('p', { className: 'ld-why' }, 'Flagged because ', h('b', null, `${ev.length} signal${ev.length === 1 ? '' : 's'}`),
      ` point here, and they reach ${x.families.join(' and ') || 'the portfolio'}${gap ? ' where recovery time exceeds stock on hand' : ''}.`),
    ...rows.map((e) => {
      const [k, label] = evidenceKind(e);
      return h('div', { className: 'ld-ev' },
        h('span', { className: `ld-kind ${k}` }, label),
        h('div', null,
          h('div', { className: 'ld-et' }, extLink(e.url, e.text)),
          h('div', { className: 'ld-em' }, h('span', null, `${e.source}${e.at ? ` · ${e.at}` : ''}`),
            e.points ? h('span', { className: 'ld-str', title: `Adds ${e.points} to the score` }, h('i', { style: `width:${Math.round((e.points / max) * 100)}%` })) : null)));
    }));
}

function cascade(ix: Indexed, x: Hotspot, input: Input | undefined, ex: Exposure): HTMLElement {
  const top = x.evidence.slice().sort((a, b) => b.points - a.points)[0];
  const products = x.products.map((p) => ix.productById.get(p)).filter((p) => !!p);
  const plants = [...new Set(products.flatMap((p) => [...(p.subassembly ?? []), ...(p.final_assembly ?? [])]))]
    .map((s) => ix.siteById.get(s)?.name.split(',')[0]).filter((s): s is string => !!s);
  const steps: Array<[string, string]> = [[SIGNAL_LABEL[top?.signal ?? 'news'], top?.text ?? x.subtitle]];
  if (input) steps.push([input.name, `${input.origin.map((o) => o.place).slice(0, 2).join(' · ')}${input.controls ? ` · ${input.controls.split(';')[0]}` : ''}`]);
  if (plants.length) steps.push(['Where it is used', plants.slice(0, 4).join(' · ')]);
  steps.push(['Products', products.map((p) => p.name).join(' · ') || '—']);
  steps.push(['Output', `${ex.installs90} installs due in 90 days (synth); exposure scales with how long it lasts`]);
  return h('section', { className: 'ld-sec' },
    h('div', { className: 'ld-h4' }, 'How it reaches us'),
    h('div', { className: 'ld-cascade' }, ...steps.map(([t, d], i) => h('div', { className: `ld-cs${i === steps.length - 1 ? ' last' : ''}` },
      h('div', { className: 'ld-ct' }, t), h('div', { className: 'ld-cd' }, d)))));
}

function chatter(x: Hotspot, input: Input | undefined, result: ExposureResult | null): HTMLElement | null {
  const s = result?.signals;
  const key = x.title.split(/[\s/(]+/).find((w) => w.length > 3)?.toLowerCase() ?? '';
  const tg = (s?.telegram?.posts ?? []).filter((p) => p.tags.some((t) =>
    (input && x.kind === 'input' && t.input === input.id)
    || (x.kind === 'chokepoint' && t.kind === 'chokepoint' && !!key && t.label.toLowerCase().includes(key)))).slice(0, 3);
  const news = input && x.kind === 'input' ? (s?.newsPulse?.inputs?.[input.id]?.articles ?? []).slice(0, 3) : [];
  if (!tg.length && !news.length) return null;
  return h('section', { className: 'ld-sec' },
    h('div', { className: 'ld-h4' }, 'Chatter ', h('em', null, 'news and Telegram · unverified')),
    ...news.map((a) => h('div', { className: 'ld-ev' }, h('span', { className: 'ld-kind news' }, 'News'),
      h('div', null, h('div', { className: 'ld-et' }, extLink(a.url, a.title)),
        h('div', { className: 'ld-em' }, h('span', null, `${a.domain ?? 'GDELT'}${a.seendate ? ` · ${a.seendate.slice(0, 8)}` : ''}`))))),
    ...tg.map((p) => h('div', { className: 'ld-ev' }, h('span', { className: 'ld-kind tg' }, 'Telegram'),
      h('div', null, h('div', { className: 'ld-et' }, extLink(p.url, p.text.length > 200 ? `${p.text.slice(0, 197)}…` : p.text)),
        h('div', { className: 'ld-em' }, h('span', null, `${p.label} · ${p.at.slice(0, 16).replace('T', ' ')} UTC`))))));
}

function optionsView(opts: ReadOption[], decideBy: string, decideWhy: string, source: string): HTMLElement {
  return h('div', null,
    decideBy ? h('div', { className: 'ld-deadline' }, h('b', null, `Decide by ${decideBy}`), decideWhy ? h('span', null, decideWhy) : null) : null,
    ...opts.map((o, i) => h('div', { className: `ld-opt${i === 0 ? ' rec' : ''}` },
      h('div', { className: 'ld-opt-top' }, h('div', { className: 'ld-opt-t' }, o.action), i === 0 ? h('span', { className: 'ld-opt-rec' }, 'Recommended') : null),
      o.detail ? h('div', { className: 'ld-opt-d' }, o.detail) : null,
      h('div', { className: 'ld-opt-m' },
        h('span', null, 'Cost', h('b', null, o.cost)), h('span', null, 'Protects', h('b', null, o.protects)),
        h('span', null, 'Regulatory', h('b', null, o.regulatory_time)), h('span', null, 'Confidence', h('b', null, o.confidence))),
      o.owner_function ? h('div', { className: 'ld-opt-own' }, 'Owner: ', h('b', null, o.owner_function)) : null)),
    h('p', { className: 'ld-note' }, source));
}

function readItem(ix: Indexed, x: Hotspot, input: Input | undefined, ex: Exposure) {
  return {
    id: x.id, title: x.title, subtitle: x.subtitle, kind: x.kind, score: x.score,
    products: x.products.map((p) => ix.productById.get(p)?.name ?? p),
    oem: { input: input?.name, tts_days: input?.tts_days, ttr_days: input?.ttr_days, installs_next_90d: ex.installs90 || undefined, controls: input?.controls },
    evidence: x.evidence.slice().sort((a, b) => b.points - a.points).slice(0, 8).map((e) => ({ text: e.text, source: e.source, at: e.at, prov: e.prov })),
  };
}

function fetchRead(item: ReturnType<typeof readItem>): Promise<ReadResponse> {
  const key = JSON.stringify(item);
  let p = readCache.get(key);
  if (!p) {
    p = fetch('/api/lodestar/read', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ item, date: new Date().toISOString().slice(0, 10) }) })
      .then((r) => r.json() as Promise<ReadResponse>)
      .catch((e: unknown) => ({ error: e instanceof Error ? e.message : String(e) }));
    void p.then((r) => { if (r.error) readCache.delete(key); });
    readCache.set(key, p);
  }
  return p;
}

// ---------- drawer ----------

export function openDrawer(ix: Indexed, x: Hotspot, result: ExposureResult | null = null): void {
  close();
  const input = inputFor(ix, x);
  const ex = exposureOf(ix, x);
  const [sevClass, sevLabel] = sev(x.score);
  const top = x.evidence.slice().sort((a, b) => b.points - a.points)[0];
  const newest = x.evidence.map((e) => e.at).filter(Boolean).sort().pop();
  const item = readItem(ix, x, input, ex);
  const base = input?.tts_days && input.ttr_days ? atRisk(ex, daysShort(STEPS[BASE_STEP]![1], input.tts_days, input.ttr_days)) : null;
  const draftItem: Record<string, unknown> = {
    title: x.title, subtitle: x.subtitle, score: x.score, products: item.products,
    oem: { tts_days: input?.tts_days, ttr_days: input?.ttr_days, installs_at_risk: base?.installs, revenue_at_risk_usd: base?.usd },
    evidence: item.evidence.slice(0, 5), options: [] as string[],
  };

  const category = h('span', null, SIGNAL_LABEL[top?.signal ?? 'news']);
  const title = h('h2', { className: 'ld-title' }, x.title);
  const lede = h('p', { className: 'ld-lede loading' }, 'Reading the evidence…');
  const story = h('p', { className: 'ld-story' });
  const aiNote = h('p', { className: 'ld-note' });
  const optionsHost = h('div', null, h('p', { className: 'ld-quiet' }, 'Working out costed options from the evidence…'));

  // Brief decisions that rest on this hotspot win, so the drawer agrees with the Command brief.
  const briefDecision = decisionsFor(x.id)[0];
  if (briefDecision) {
    optionsHost.replaceChildren(optionsView(
      briefDecision.options.map((o) => ({ ...o, owner_function: briefDecision.owner_function })),
      briefDecision.decide_by, briefDecision.why, 'From the current Command brief. The model recommends; people decide.'));
    draftItem.options = briefDecision.options.map((o) => o.action);
  }

  root = h('div', { className: 'lodestar-drawer-backdrop', onClick: (e: Event) => { if (e.target === root) close(); } },
    h('aside', { className: 'lodestar-drawer ld', role: 'dialog', 'aria-modal': 'true', 'aria-label': `Evidence: ${x.title}` },
      h('section', { className: 'ld-sec ld-top' },
        h('button', { type: 'button', className: 'ld-back', onClick: close }, '← Back to map'),
        h('div', { className: 'ld-kicker' }, h('span', { className: `ld-sev ${sevClass}` }, `${sevLabel} · ${x.score}`), category, h('span', null, 'Live')),
        title,
        h('div', { className: 'ld-place' }, h('b', null, x.title), ` · ${x.subtitle}${newest ? ` · latest ${newest}` : ''}`),
        lede, story, aiNote),
      chatter(x, input, result),
      whyFlagged(x, input),
      cascade(ix, x, input, ex),
      input?.tts_days && input.ttr_days
        ? h('section', { className: 'ld-sec' },
          h('div', { className: 'ld-h4' }, 'Survive vs recover ', h('em', null, `${input.name} · synthetic cover`)),
          clock(input.tts_days, input.ttr_days),
          ex.installs90 ? whatIf(ex, input.tts_days, input.ttr_days) : null)
        : null,
      h('section', { className: 'ld-sec' },
        h('div', { className: 'ld-h4' }, 'What we can do ', h('em', null, 'costed options, recommended first')),
        optionsHost,
        h('div', { className: 'ld-h4', style: 'margin-top:18px' }, 'Have the agent draft it'),
        h('div', { className: 'lodestar-drafts' }, ...(['sop', 'customer', 'rfq'] as DraftType[]).map((t) =>
          h('button', { type: 'button', className: 'lodestar-btn ghost', onClick: () => void draft(t, draftItem) }, DRAFT_LABEL[t]))),
        h('p', { className: 'ld-note' }, 'Drafts need your approval. Nothing is ever sent from Lodestar.')),
    ));
  document.body.appendChild(root);
  document.addEventListener('keydown', onKey);

  const mine = root;
  void fetchRead(item).then((r) => {
    if (root !== mine) return;
    lede.classList.remove('loading');
    if (r.error || !r.read) {
      lede.textContent = top?.text ?? x.subtitle;
      aiNote.textContent = `Model read unavailable (${r.error ?? 'no response'}); showing the top evidence.`;
      if (!briefDecision) optionsHost.replaceChildren(h('p', { className: 'ld-quiet' }, 'No costed options: the model read is unavailable and the Command brief has no decision on this item.'));
      return;
    }
    const rd = r.read;
    title.textContent = rd.headline || x.title;
    if (rd.category) category.textContent = rd.category;
    lede.textContent = rd.lede;
    story.textContent = rd.story;
    const cost = r.cost != null ? ` · $${Number(r.cost).toFixed(4)}` : '';
    aiNote.textContent = `AI-written from the evidence below (${r.model ?? 'model'}${cost}${r.cached ? ' · cached' : ''}). It recommends; people decide.`;
    if (!briefDecision) {
      optionsHost.replaceChildren(rd.options.length
        ? optionsView(rd.options, rd.decide_by, rd.decide_why, 'Options written by the model from the evidence above. Synthetic figures are labelled.')
        : h('p', { className: 'ld-quiet' }, 'Watch only. No action recommended; re-scored every 5 minutes.'));
      draftItem.options = rd.options.map((o) => o.action);
    }
  });
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
