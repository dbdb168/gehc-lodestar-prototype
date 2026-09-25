# Progress

- [x] Day 0: prototype live at https://lodestar-prototype.vercel.app (Vercel project `lodestar-prototype`, team "David's projects"). Sends `X-Robots-Tag: noindex, nofollow` and the robots meta tag; page and all assets return 200. Not yet checked in a real browser (headless Chromium here rejects the proxy CA).
- [x] Day 1: shell live at https://lodestar-command.vercel.app (Vercel project `lodestar-command`). World Monitor v2.10.0 vendored at `29227565`; rebranded; noindex (meta, header on every path, disallow-all robots.txt); commodity variant fixed at build; paywall, Pro banner, sign-in, variant switcher and upstream analytics removed; AGPL credit in header, footer and mobile menu. Checked locally in headless Chromium: 32 panels, no gates, no page errors.
- [x] Day 1–2: Upstash + seeder cron. `.github/workflows/seed.yml` runs 12 seeders (fast group every 2h, slow every 6h; see `docs/SEEDERS.md`). First full run 24 Sep: all OK. Panel set trimmed to the brief's list; every panel endpoint returns live data. Not yet eyeballed in a real browser.
- [x] Day 2–3: `data/network.json` loaded at runtime; OEM overlay on the deck.gl map (plants, input origins, demand regions, sea lanes through chokepoint waypoints, air arcs); product filter All / MR / CT / MI / US / XR in the top bar, remembered per browser.
- [x] Day 3–4: exposure engine (`app/src/lodestar/exposure.ts`), every 5 min. Signals: PortWatch chokepoint transits vs 90-day baseline, NGA chokepoint status, USGS quakes, EONET/GDACS natural events, travel advisories, CII country instability, Federal Register (14 days), openFDA recalls/510(k) (generic device classes only), GDELT news pulse, commodity moves, sourced export controls. Heatmap of hotspots on the map; "Hotspots worth diving into" panel with evidence, source, date and link per item.
- [x] Day 4: `api/lodestar/brief.js` (GLM-5.3 via OpenRouter, JSON schema, 30-min cache, daily cap) and the Command brief panel with Regenerate and Compare. Compare is wired but blocked: the OpenRouter key's credit limit is too low for the compare model (HTTP 402).
- [x] Day 5: product exposure board (sparkline per browser), input clock (TTS vs TTR, synth), regulatory & trade watch, evidence drawer (evidence, cascade, costed options from the brief) and "Draft with agent" (`api/lodestar/draft.js`: S&OP escalation, customer notice, supplier RFQ; approval required, nothing sent). Drawer and panels checked in headless Chromium; a live draft was not generated from here (needs a browser session).
- [x] Day 6: snapshot fallback (live → this browser's last good copy → deployed `public/snapshot/last-good.json`, each labelled with its real time; checked with every API down); empty-state sweep on the live site; brand-name leak fixed (openFDA trade names; headline scrub on news/intelligence APIs); demo script (`docs/DEMO_SCRIPT.md`); runbook `docs/runbooks/refresh-snapshot.md`.

Deployed URL: prototype https://lodestar-prototype.vercel.app · command centre https://lodestar-command.vercel.app
Feeds live (25 Sep, checked in Chromium against production): all 8 exposure-engine feeds; chokepoints (NGA + PortWatch transits), Hormuz (WTO), commodities & FX (Yahoo), security advisories (106), earthquakes (USGS), natural events, fires (NASA FIRMS), cyber threats, disaster correlation (13 cards), news digest (125 publishers, 14/14 categories), world / Middle East / Asia news, CII, sanctions (OFAC), Federal Register, openFDA. Not live: live AIS vessel counts (upstream relay can't run on Vercel), UCDP (API needs a token; panel off), Canada SEMA sanctions list (parse error upstream; tile says "feed unavailable"), sector summary (503, no panel uses it here).

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
- **Scheduled seeding not yet seen firing.** `seed.yml` crons exist on the default branch (`claude/busy-hamilton-1ve9ec`, the only branch), but no `schedule` run had appeared by 00:40 UTC on 25 Sep; all runs so far were manual. If none appear, check Actions is enabled for scheduled runs on the repo. Without them, seeded values expire (7h fast / 30h slow).
- **OpenRouter credit.** The key's credit limit blocks Compare (Opus) and will soon block briefs and drafts (about $0.005–0.01 per brief). Raise the key's limit on openrouter.ai.
- **UCDP** needs a free `UCDP_ACCESS_TOKEN` (request at ucdp.uu.se); then add it to the repo secrets and re-enable the `ucdp-events` panel in `app/src/config/panels.ts`.
- **Brand names beyond `BANNED_TERMS`.** The name scrub and `lint:names` only know the terms in `BANNED_TERMS`. Product brand names that aren't listed can still arrive in live news headlines. Add the product brand names to `BANNED_TERMS` (Vercel env and the lint environment).
- **Live AIS:** upstream's AIS relay can't run on Vercel, so `AISSTREAM_API_KEY` is unused (optional per the brief). The chokepoint panels say so.
- **Upstream static fetches remain:** country-boundary overrides from maps.worldmonitor.app and the widget relay at proxy.worldmonitor.app. Several background calls return 503 (x-feed, telegram-feed, gpsjam, outages, climate): no panel shows them.
- **Non-English locales** still carry upstream branding; only English is rebranded.
- **Repo name** contains the client name (hard rule 1). Accepted for now by the owner; rename before connecting Vercel's Git integration.
- **Snapshot age.** `public/snapshot/last-good.json` is from 24 Sep 22:59 UTC. Refresh it before a demo (`docs/runbooks/refresh-snapshot.md`).

## Changes to supplied content
- `prototype/data.js`: role titles replaced with functions (rule 2): "Procurement", "Supplier quality + Cyber security". One confidence note on the sealed-magnet decision card reworded to "Medium: depends on how fast sealed-magnet output can ramp".
- `docs/RESEARCH_NOTES.md`: chemical symbols for gallium and germanium spelled out (tripped `lint:names`).
- openFDA rows: the firm's own free text (trade names) is replaced by FDA generic device classes and root causes.
- `lint:names` matches whole words, so short banned terms don't match inside ordinary words.
- `.lint-names-allow` (approved by the owner) exempts two banned terms in 99 named upstream files where the match isn't the client: ISO/World Bank codes and a city name. New files are never exempt.
- `app/scripts/data/pipelines-gas.json`: removed a pipeline-operator entry that named the client's former parent company.
- Vendoring left out upstream `tests/`, `e2e/`, `blog-site/`, `pro-test/`, `src-tauri/`. Upstream's `vite.config.ts` pre-paint transform left a dangling `else` in non-`full` builds; fixed.
