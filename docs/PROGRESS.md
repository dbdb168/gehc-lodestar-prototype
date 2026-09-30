# Progress

- [x] Day 0: prototype live at https://lodestar-prototype.vercel.app (Vercel project `lodestar-prototype`, team "David's projects"). Sends `X-Robots-Tag: noindex, nofollow` and the robots meta tag; page and all assets return 200. Not yet checked in a real browser (headless Chromium here rejects the proxy CA).
- [x] Day 1: shell live at https://lodestar-command.vercel.app (Vercel project `lodestar-command`). World Monitor v2.10.0 vendored at `29227565`; rebranded; noindex (meta, header on every path, disallow-all robots.txt); commodity variant fixed at build; paywall, Pro banner, sign-in, variant switcher and upstream analytics removed; AGPL credit in header, footer and mobile menu. Checked locally in headless Chromium: 32 panels, no gates, no page errors.
- [x] Day 1–2: Upstash + seeder cron (scheduled runs confirmed firing from 25 Sep 00:36 UTC). `.github/workflows/seed.yml` runs 12 seeders (fast group every 2h, slow every 6h; see `docs/SEEDERS.md`). First full run 24 Sep: all OK. Panel set trimmed to the brief's list; every panel endpoint returns live data. Checked in Chromium against production on 25 Sep (map, heatmap, overlay and panels render).
- [x] Day 2–3: `data/network.json` loaded at runtime; OEM overlay on the deck.gl map (plants, input origins, demand regions, sea lanes through chokepoint waypoints, air arcs); product filter All / MR / CT / MI / US / XR in the top bar, remembered per browser.
- [x] Day 3–4: exposure engine (`app/src/lodestar/exposure.ts`), every 5 min. Signals: PortWatch chokepoint transits vs 90-day baseline, NGA chokepoint status, USGS quakes, EONET/GDACS natural events, travel advisories, CII country instability, Federal Register (14 days), openFDA recalls/510(k) (generic device classes only), GDELT news pulse, commodity moves, sourced export controls. Heatmap of hotspots on the map; "Hotspots worth diving into" panel with evidence, source, date and link per item.
- [x] Day 4: `api/lodestar/brief.js` (OpenRouter, JSON schema, 30-min cache, daily cap; model now Sonnet 5.5, see Open issues) and the Command brief panel with Regenerate and Compare. Compare runs Opus 5.5; verified on production 28 Sep (about $0.05 a run).
- [x] Day 5: product exposure board (sparkline per browser), input clock (TTS vs TTR, synth), regulatory & trade watch, evidence drawer (evidence, cascade, costed options from the brief) and "Draft with agent" (`api/lodestar/draft.js`: S&OP escalation, customer notice, supplier RFQ; approval required, nothing sent). Drawer and panels checked in headless Chromium; a live draft was not generated from here (needs a browser session).
- [x] After Day 6: Telegram watch (10 public channels via t.me/s previews, relevance-filtered, unverified, display only); tighter hotspot heat with scores on markers; drafts fixed (token cap, tolerant JSON) and verified on production.
- [x] Evidence drawer rebuilt in the prototype's layout (model-written read per hotspot via `api/lodestar/read.js`, why flagged, cascade, survive vs recover, what-if slider with a visible synthetic model, costed options recommended first, drafts). Verified on production 25 Sep.
- [x] Day 6: snapshot fallback (live → this browser's last good copy → deployed `public/snapshot/last-good.json`, each labelled with its real time; checked with every API down); empty-state sweep on the live site; brand-name leak fixed (openFDA trade names; headline scrub on news/intelligence APIs); demo script (`docs/DEMO_SCRIPT.md`); runbook `docs/runbooks/refresh-snapshot.md`.

Deployed URL: prototype https://lodestar-prototype.vercel.app · command centre https://lodestar-command.vercel.app
Feeds live (25 Sep, checked in Chromium against production): all 8 exposure-engine feeds; chokepoints (NGA + PortWatch transits), Hormuz (WTO), commodities & FX (Yahoo), security advisories (106), earthquakes (USGS), natural events, fires (NASA FIRMS), cyber threats, disaster correlation (13 cards), news digest (125 publishers, 14/14 categories), world / Middle East / Asia news, CII, sanctions (OFAC), Federal Register, openFDA. UCDP armed-conflict events live since 28 Sep. Not live: live AIS vessel counts (upstream relay can't run on Vercel), Canada SEMA sanctions list (parse error upstream; tile says "feed unavailable"), sector summary (503, no panel uses it here).

## Access (30 Sep)
- **Custom domain:** https://lodestar-prototype.buildfirst.io is on the `lodestar-command` project. DNS is a Cloudflare CNAME, DNS only (grey cloud), to Vercel. The API allows this origin (`api/_cors.js`, `server/cors.ts`).
- **Password:** every host, including the vercel.app URLs, asks for a password (`middleware.ts`, `siteGate`).
  - The password is the Vercel env var `LODESTAR_SITE_PASSWORD`. Change it there, then redeploy; changing it signs everyone out.
  - Unset means no gate. The browser remembers a login for 30 days.
  - `/api/health` and `/api/version` stay open. Static assets (JS, `data/network.json`, the snapshot) are not gated.
  - This keeps casual visitors out; it is not strong authentication. Vercel's own password protection needs a paid add-on on Pro.
- **Walkthrough:** `docs/Lodestar-walkthrough.pdf` links to the new domain.

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
- **Brief model.** `LLM_MODEL_BRIEF` switched to `anthropic/claude-sonnet-5.5` on 29 Sep (GLM-5.3 on OpenRouter: always-on max-effort reasoning eats the budget, effort controls not passed through, and providers vary on structured output). Brief and drawer read verified on production; read about $0.01. DeepSeek flash stays the fallback and draft model. GLM hardening (provider `require_parameters` + pinned hosts, larger budget, json_object mode, read reasoning channel) not done.
- **UCDP** live since 28 Sep (`UCDP_ACCESS_TOKEN` repo secret; 5,000 requests/day limit). Panel and map layer on.
- **Brand names beyond `BANNED_TERMS`.** The name scrub and `lint:names` only know the terms in `BANNED_TERMS`. Product brand names that aren't listed can still arrive in live news headlines. Add the product brand names to `BANNED_TERMS` (Vercel env and the lint environment).
- **Live AIS:** upstream's AIS relay can't run on Vercel, so `AISSTREAM_API_KEY` is unused (optional per the brief). The chokepoint panels say so.
- **Upstream static fetches remain:** country-boundary overrides from maps.worldmonitor.app and the widget relay at proxy.worldmonitor.app. Several background calls return 503 (x-feed, telegram-feed, gpsjam, outages, climate): no panel shows them.
- **Non-English locales** still carry upstream branding; only English is rebranded.
- **Repo name** contains the client name (hard rule 1). Accepted for now by the owner; rename before connecting Vercel's Git integration.
- **Snapshot age.** `public/snapshot/last-good.json` is from 29 Sep 18:36 UTC (all 8 feeds). Refresh it the day before a demo (`docs/runbooks/refresh-snapshot.md`).

## Accuracy review (29 Sep)
A full pass over the engine, drawer, panels, prompts, `network.json` and on-screen copy. The demo plan is in `docs/DEMO_SCRIPT.md`.

**Fixed and deployed:**
- **Sea lanes** follow real sea routes through the chokepoints they cross (`app/src/lodestar/searoute.ts`). LA → Japan no longer crosses the Atlantic. Ports are drawn and labelled; Charleston carries three lanes.
- **Provenance** comes from each fact's own tags:
  - a control reads "sourced" only if part of it is (S);
  - the war-risk tier is labelled an editorial setting with its review date;
  - a CII level of "normal" no longer scores.
- **FDA:** recalls score only their own device class's product lines; Terminated recalls are skipped; links go to FDA classification pages (no firm names).
- **Copy:** no claims of live AIS or "real-time".
- **Prompts:** no invented figures; qualitative costs; money amounts not in the evidence are replaced with "Not costed".
- **Brief:**
  - says when it leans on an estimate or editorial setting;
  - makes decisions only on items scoring 30 or more. A calm product line (ultrasound on 29 Sep) now gets "No decisions" and a watch list, not two decisions on an M4.6 quake scored 8.
- **Map defaults:** upstream's Commodity Ports layer (LNG and crude terminals) is off, and links can switch it. It was being mistaken for our labelled OEM ports.
- **Feed line:** it now names a missing part of a live feed ("GDELT news pulse: unavailable") instead of reporting 8/8.
- **News-pulse seeder:** it timed out at the runner's 10-minute limit on every run, because GDELT rate-limits GitHub's runner IPs. Its Redis key had expired. It now:
  - fetches articles only for inputs whose news volume spikes (z of 2 or more, the only case the engine uses);
  - stops starting new queries after 5.5 minutes;
  - publishes the inputs that finished.
- **`?product=` links:** they were dropped when the map rewrote the URL on load, so every demo link opened on All. Fixed 29 Sep; choosing a filter now also writes it to the URL.

**Checked against public sources (29 Sep):**
- Hormuz: 85.5 transits a day in 2025, 3.2 in March 2026, 8.0 in June–September 2026 (IMF PortWatch).
- Bab el-Mandeb: 74.6 a day in Jan–Oct 2023 vs 31.1 in June–September 2026.
- Helium: Russia licensed exports from 14 Apr 2026, to the end of 2027; China imposed a temporary ban from 10 Jul 2026.

Sources are listed in `docs/DEMO_SCRIPT.md`.

**Not done:**
- **Owner to confirm two lanes:**
  - L05 (Gulf port): Dammam through Hormuz, or Jeddah on the Red Sea;
  - L16: Haifa → Rotterdam by sea, or Trieste/Koper and then road.
- **Source links:** most (S) facts in `network.json` have no `src` link, and no estimate carries a `basis`.
- **Travel advisories:** the fallback advisory has no date or link.
- **"Korea / China" origin:** the display-panel marker resolves to China only.
- **Price signals:** the commodity hooks for memory and rare-earth equities never fire, so the demo must not claim memory or rare-earth price signals.
- **GDELT:** the domain scrub matches whole words only.
- **Service parts:** the flow is modelled as one air lane (L21). The researched arrivals at LA/LB, NY/NJ and Tacoma are not modelled.
- **`prototype/data.js`:** the static prototype's wording is left as supplied.
- **GDELT news pulse is still empty.** On 29 Sep GDELT's DOC API refused every query: 503 from this sandbox, and 429s and dropped connections from GitHub's runners.
  - The seeder now fails fast, and the feed line says "GDELT news pulse: unavailable".
  - First CI run with the fix (29 Sep 18:55 UTC) finished in 349 s and published a partial pulse: helium answered (z 0.47, no spike); six inputs failed on GDELT 429s and dropped connections; two were skipped at the time budget. The feed line now reports the inputs that missed the refresh.
  - A durable fix is to derive the pulse from GDELT's bulk files. The upstream materializer already downloads them from CI without trouble, but a spike needs a 4-week baseline, which would have to build up in Redis over time.

## Changes to supplied content
- `data/network.json` (accuracy review, 29 Sep): added destination ports Kobe/Osaka, Nhava Sheva, Santos, Port Botany, Dammam (prov est). Lane `via` corrected to the chokepoints a ship physically crosses: L04 +Dover; L05 now Charleston → Gibraltar → Suez → Bab el-Mandeb → **Hormuz** → Dammam (was missing Hormuz and a Gulf port — needs owner confirmation; Jeddah via Red Sea only is the alternative); L07 +Korea Strait → Kobe; L08/L10/L11 +Taiwan Strait; L10 +Gibraltar +Dover; L16 +Dover → Rotterdam (Haifa → Trieste/Koper → road would be more realistic — owner to confirm); L06 → Santos; L12 → Port Botany; L22 → Kobe.
- `prototype/data.js`: role titles replaced with functions (rule 2): "Procurement", "Supplier quality + Cyber security". One confidence note on the sealed-magnet decision card reworded to "Medium: depends on how fast sealed-magnet output can ramp".
- `docs/RESEARCH_NOTES.md`: chemical symbols for gallium and germanium spelled out (tripped `lint:names`).
- openFDA rows: the firm's own free text (trade names) is replaced by FDA generic device classes and root causes.
- `lint:names` matches whole words, so short banned terms don't match inside ordinary words.
- `.lint-names-allow` (approved by the owner) exempts two banned terms in 99 named upstream files where the match isn't the client: ISO/World Bank codes and a city name. New files are never exempt.
- `app/scripts/data/pipelines-gas.json`: removed a pipeline-operator entry that named the client's former parent company.
- Vendoring left out upstream `tests/`, `e2e/`, `blog-site/`, `pro-test/`, `src-tauri/`. Upstream's `vite.config.ts` pre-paint transform left a dangling `else` in non-`full` builds; fixed.
