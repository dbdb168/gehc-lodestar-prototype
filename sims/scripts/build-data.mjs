// Copies the MR-CONV-2031 run outputs the stress test reads at runtime into sims/public/data.
// Run from the repo root or from sims/: node sims/scripts/build-data.mjs
// The app never compiles run data into its code; it fetches these files when it loads.
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..', '..');
const run = join(root, 'futures', 'scenarios', 'MR-CONV-2031');
const out = join(here, '..', 'public', 'data');
mkdirSync(out, { recursive: true });

// The assembled run output: futures, risks, actions, indicators, brief.
const output = JSON.parse(readFileSync(join(run, 'output.json'), 'utf8'));
writeFileSync(join(out, 'output.json'), JSON.stringify(output));

// Each panel member's phase 4, round 3 summary, quoted word for word ("In one hundred words").
const conv = join(run, 'conversations');
const quotes = {};
for (const f of readdirSync(conv).filter(f => /_p4_r3_summary\.md$/.test(f)).sort()) {
  const member = f.replace(/_p4_r3_summary\.md$/, '');
  const text = readFileSync(join(conv, f), 'utf8');
  const i = text.indexOf('hundred words');
  if (i < 0) throw new Error(`No "In one hundred words" section in ${f}`);
  quotes[member] = { file: f, text: text.slice(text.indexOf('\n', i) + 1).trim() };
}
writeFileSync(join(out, 'quotes.json'), JSON.stringify(quotes, null, 1));
console.log(`build-data: output.json and ${Object.keys(quotes).length} member quotes written to ${out}`);
