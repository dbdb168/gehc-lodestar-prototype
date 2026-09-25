#!/usr/bin/env node
// Lodestar: Telegram watch. Reads a short list of public channels through
// Telegram's public web preview (t.me/s/<handle>, no account, no API key) and
// keeps only posts from the last 72 hours that mention something on the OEM
// network: a chokepoint, a critical input, export controls or shipping.
// Posts are unverified; the page labels them so and they never feed scores.
//
// Output key: lodestar:telegram:v1 → { posts: [...], channels: [...], scanned, fetchedAt }

import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnvFile, runSeed } from './_seed-utils.mjs';

loadEnvFile(import.meta.url);

const CANONICAL_KEY = 'lodestar:telegram:v1';
const TTL = 6 * 3600;
const WINDOW_MS = 72 * 3600 * 1000;
const PER_CHANNEL = 8;
const MAX_POSTS = 80;

const here = dirname(fileURLToPath(import.meta.url));
const { channels: CHANNELS } = JSON.parse(readFileSync(resolve(here, 'data/lodestar-telegram-channels.json'), 'utf8'));

// What makes a post relevant, and the tag it gets. `input` ties a tag to an
// input id in data/network.json so the page can filter by product family.
const TAGS = [
  { id: 'hormuz', label: 'Strait of Hormuz', kind: 'chokepoint', re: /\bHormuz\b/i },
  { id: 'red-sea', label: 'Red Sea / Houthis', kind: 'chokepoint', re: /\bRed Sea\b|\bBab[ -]el[ -]Mandeb\b|\bHouthis?\b/i },
  { id: 'suez', label: 'Suez', kind: 'chokepoint', re: /\bSuez\b/i },
  { id: 'malacca', label: 'Malacca', kind: 'chokepoint', re: /\bMalacca\b|\bSingapore Strait\b/i },
  { id: 'taiwan-strait', label: 'Taiwan Strait', kind: 'chokepoint', re: /\bTaiwan Strait\b/i },
  { id: 'panama', label: 'Panama Canal', kind: 'chokepoint', re: /\bPanama Canal\b/i },
  { id: 'helium', label: 'Helium / Ras Laffan', kind: 'input', input: 'helium', re: /\bhelium\b|\bRas Laffan\b/i },
  { id: 'tungsten', label: 'Tungsten', kind: 'input', input: 'tungsten', re: /\btungsten\b/i },
  { id: 'rare-earths', label: 'Rare earths', kind: 'input', input: 'gadolinium', re: /\brare[- ]earths?\b|\bgadolinium\b/i },
  { id: 'bismuth-germanium', label: 'Bismuth / germanium', kind: 'input', input: 'bgo', re: /\bbismuth\b|\bgermanium\b|\bgallium\b/i },
  { id: 'tellurium', label: 'Tellurium', kind: 'input', input: 'czt_tellurium', re: /\btellurium\b/i },
  { id: 'indium', label: 'Indium', kind: 'input', input: 'indium_detector', re: /\bindium\b/i },
  { id: 'copper', label: 'Copper', kind: 'input', input: 'copper', re: /\bcopper\b/i },
  { id: 'chips', label: 'Chips / memory', kind: 'input', input: 'memory', re: /\bsemiconductors?\b|\bchipmakers?\b|\bDRAM\b|\bmemory chips?\b|\bTSMC\b/i },
  { id: 'export-controls', label: 'Export controls / tariffs', kind: 'trade', re: /\bexport (?:controls?|bans?|licen[cs]es?|restrictions?)\b|\btariffs?\b/i },
  { id: 'shipping', label: 'Shipping', kind: 'shipping', re: /\btankers?\b|\bcontainer ships?\b|\bcargo ships?\b|\bshipping (?:lanes?|routes?|traffic|companies)\b|\bfreight rates?\b|\bport (?:closure|strike)s?\b/i },
  { id: 'supply-chain-cyber', label: 'Supply-chain cyber', kind: 'cyber', re: /\bsupply[- ]chain attack\b|\bransomware\b.*\b(?:manufactur|hospital|medical|logistics)/i },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', '#39': "'" };
function htmlToText(html) {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+|#39);/gi, (m, e) => {
      if (e[0] === '#') { const n = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : Number(e.slice(1)); return Number.isFinite(n) ? String.fromCodePoint(n) : m; }
      return ENTITIES[e.toLowerCase()] ?? m;
    })
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

async function fetchChannel(ch) {
  const r = await fetch(`https://t.me/s/${encodeURIComponent(ch.handle)}`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; lodestar-seeder/1.0)', 'Accept-Language': 'en' },
    signal: AbortSignal.timeout(20_000),
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const html = await r.text();
  const blocks = html.split('tgme_widget_message_wrap').slice(1);
  const now = Date.now();
  const posts = [];
  for (const b of blocks) {
    const post = b.match(/data-post="([^"]+)"/)?.[1];
    const at = b.match(/<time datetime="([^"]+)"/)?.[1];
    const textHtml = b.match(/<div class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/)?.[1];
    if (!post || !at || !textHtml) continue;
    const t = Date.parse(at);
    if (!Number.isFinite(t) || now - t > WINDOW_MS) continue;
    const text = htmlToText(textHtml);
    const tags = TAGS.filter((g) => g.re.test(text)).map(({ id, label, kind, input }) => ({ id, label, kind, ...(input ? { input } : {}) }));
    if (!tags.length) continue;
    posts.push({
      id: post, channel: ch.handle, label: ch.label, kind: ch.kind,
      at: new Date(t).toISOString(), url: `https://t.me/${post}`,
      text: text.slice(0, 600), tags,
    });
  }
  return { posts: posts.sort((a, b) => b.at.localeCompare(a.at)).slice(0, PER_CHANNEL), scanned: blocks.length };
}

async function build() {
  const all = [];
  const channels = [];
  let scanned = 0;
  for (const ch of CHANNELS) {
    try {
      const { posts, scanned: n } = await fetchChannel(ch);
      all.push(...posts);
      scanned += n;
      channels.push({ handle: ch.handle, label: ch.label, kind: ch.kind, ok: true, relevant: posts.length });
      console.log(`  ${ch.handle}: ${n} scanned, ${posts.length} relevant`);
    } catch (err) {
      channels.push({ handle: ch.handle, label: ch.label, kind: ch.kind, ok: false });
      console.warn(`  ${ch.handle}: ${err.message}`);
    }
    await sleep(1500);
  }
  const posts = all.sort((a, b) => b.at.localeCompare(a.at)).slice(0, MAX_POSTS);
  return { posts, channels, scanned, fetchedAt: Date.now(), okChannels: channels.filter((c) => c.ok).length };
}

const isMain = process.argv[1]?.endsWith('seed-lodestar-telegram.mjs');
if (isMain) {
  runSeed('lodestar', 'telegram', CANONICAL_KEY, build, {
    validateFn: (d) => d && d.okChannels > 0,
    ttlSeconds: TTL,
    sourceVersion: 'lodestar-telegram-web-preview',
    recordCount: (d) => d.posts.length,
    declareRecords: (d) => d?.posts?.length ?? 0,
    zeroIsValid: true,
    schemaVersion: 1,
    maxStaleMin: 360,
  }).catch((err) => {
    console.warn('WARNING: telegram watch not refreshed:', err.message || err);
    process.exit(0);
  });
}

export { fetchChannel, htmlToText, TAGS };
