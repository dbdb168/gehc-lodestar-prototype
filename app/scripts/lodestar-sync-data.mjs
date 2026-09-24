#!/usr/bin/env node
// Lodestar: copy the OEM network (repo-root data/network.json, the single
// source of truth) into public/data/ so the app fetches it at runtime.
// On Vercel only app/ is uploaded; scripts/deploy-command.sh adds the file
// to the upload as public/data/network.json, so the source may be absent.
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const appDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(appDir, '../data/network.json');
const target = resolve(appDir, 'public/data/network.json');

if (existsSync(source)) {
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(source, target);
  console.log('lodestar: copied data/network.json -> public/data/network.json');
} else if (existsSync(target)) {
  console.log('lodestar: using uploaded public/data/network.json');
} else {
  console.error('lodestar: data/network.json not found');
  process.exit(1);
}
