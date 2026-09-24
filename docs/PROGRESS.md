# Progress

- [x] Day 0: prototype live at https://lodestar-prototype.vercel.app (Vercel project `lodestar-prototype`, team "David's projects"). Sends `X-Robots-Tag: noindex, nofollow` and the robots meta tag; page and all assets return 200. Not yet checked in a real browser (headless Chromium here rejects the proxy CA).
- [x] Day 1: shell live at https://lodestar-command.vercel.app (Vercel project `lodestar-command`). World Monitor v2.10.0 vendored at `29227565`; rebranded; noindex (meta, header on every path, disallow-all robots.txt); commodity variant fixed at build; paywall, Pro banner, sign-in, variant switcher and upstream analytics removed; AGPL credit in header, footer and mobile menu. Checked locally in headless Chromium: 32 panels, no gates, no page errors.
- [ ] Day 1–2: Upstash + seeder cron, no empty panels
- [ ] Day 2–3: network.json overlay layers + product filter
- [ ] Day 3–4: exposure engine + proxies + evidence
- [ ] Day 4: brief API + Compare toggle
- [ ] Day 5: board, input clock, drawer, drafts, provenance chips
- [ ] Day 6: polish, snapshot fallback, demo script

Deployed URL: prototype https://lodestar-prototype.vercel.app · command centre https://lodestar-command.vercel.app
Feeds live / failing: API reachable from the browser; Redis connected. Chokepoint status and bootstrap return live data. Most other caches are empty until seeders run (health: 226 of 312 checks critical).

## How deploys work in this environment
- Vercel, OpenRouter and Upstash credentials are **API credentials**: the proxy injects them on requests to those hosts, and the session never sees them. `VERCEL_TOKEN` is not an env var here.
- The Vercel CLI refuses to run without a local token, so deploy through the Vercel REST API (`POST https://api.vercel.com/v13/deployments?teamId=$VERCEL_ORG_ID`) or the Vercel connector. `VERCEL_ORG_ID` = team "David's projects".
- Run `npm run lint:names` before every deploy.
- Command centre deploys upload `app/`'s committed files by SHA (`POST /v2/files`), then create the deployment with that manifest and `projectSettings` (`framework: null`, `installCommand: npm install`, `buildCommand: npm run build:lodestar`, `outputDirectory: dist`, `nodeVersion: 22.x`). Vercel runs the build (~4 min).
- `middleware.ts` must keep `runtime: 'edge'`; without it Vercel runs it as unbundled Node and every page 500s.
- Deploy the command centre with `npm run deploy:command` (production) or `npm run deploy:command -- preview`. It runs `lint:names`, uploads only files Vercel is missing, and waits for the build. Commit first: it deploys committed files only.
- Vercel env vars on `lodestar-command` (set by the owner): Upstash, OpenRouter, FRED, `LLM_MODEL_*`, NASA FIRMS, AISStream, `OEM_FDA_APPLICANT`, `BANNED_TERMS`. Added by the session: `WM_SESSION_SECRET` (random; signs anonymous browser sessions) and `NASA_FIRMS_API_KEY` (the name upstream reads; same value as `NASA_FIRMS_KEY`). Env changes need a redeploy.
- The API accepts browser calls only from `lodestar-command.vercel.app` and this team's `lodestar-command-*` deployment URLs (`api/_cors.js`, `server/cors.ts`).

## Open issues
- **Seeders:** not running yet. Seed only what the kept panels read; GitHub Actions (2,000 free min/month on a private repo) can't afford all 217 seeders every 30 min.
- **Live AIS:** upstream's AIS relay can't run on Vercel, so `AISSTREAM_API_KEY` is unused (optional per the brief).
- **Onboarding modal** ("Choose Workspace") shows on first load; remove or preset it when the panels are reworked.
- **Upstream static fetches remain:** country-boundary overrides from maps.worldmonitor.app and the widget relay at proxy.worldmonitor.app.
- **Non-English locales** still carry upstream branding; only English is rebranded.
- **Repo name** contains the client name (hard rule 1). Accepted for now by the owner; rename before connecting Vercel's Git integration.

## Changes to supplied content
- `prototype/data.js`: role titles replaced with functions (rule 2): "Procurement", "Supplier quality + Cyber security". One confidence note on the sealed-magnet decision card reworded to "Medium: depends on how fast sealed-magnet output can ramp".
- `docs/RESEARCH_NOTES.md`: chemical symbols for gallium and germanium spelled out (tripped `lint:names`).
- `lint:names` matches whole words, so short banned terms don't match inside ordinary words.
- `.lint-names-allow` (approved by the owner) exempts two banned terms in 99 named upstream files where the match isn't the client: ISO/World Bank codes and a city name. New files are never exempt.
- `app/scripts/data/pipelines-gas.json`: removed a pipeline-operator entry that named the client's former parent company.
- Vendoring left out upstream `tests/`, `e2e/`, `blog-site/`, `pro-test/`, `src-tauri/`. Upstream's `vite.config.ts` pre-paint transform left a dangling `else` in non-`full` builds; fixed.
