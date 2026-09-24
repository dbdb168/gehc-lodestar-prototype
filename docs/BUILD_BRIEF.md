# Build brief: Lodestar supply-chain command centre

**Goal:** a demo-ready, live command centre by next week.
**Standard:** good enough, but it must look detailed, feel live, and run on **real-time data**. The OEM's internal data is synthetic, grounded in public research, and labelled as such.

---

## 1. Approach: vendor World Monitor at a pinned commit, rebrand it, overlay the OEM network

Bring `koala73/worldmonitor` into this repo under `app/`, pinned at commit `29227565` (v2.10.0):

```bash
git clone https://github.com/koala73/worldmonitor /tmp/wm
cd /tmp/wm && git checkout 29227565
rsync -a --exclude .git /tmp/wm/ app/
```

It builds cleanly on Node 22: `npm install` takes about 75s and `build:full` about 3 minutes.

**What World Monitor already gives us:**
- **Maps:** deck.gl + MapLibre, globe.gl, and basemaps that need no key.
- **Panels:** `supply-chain`, `chokepoint-strip`, `hormuz-tracker`, `critical-minerals`, `sanctions-pressure`, `cascade`, `disaster-correlation`, `commodities`, `security-advisories`, `RouteExplorer`.
- **Map layers:** `ais`, `tradeRoutes`, `waterways`, `commodityPorts`, `cables`, `sanctions`, `conflicts`, `natural`, `fires`, `cyberThreats`, `minerals`, `processingPlants`, `ciiChoropleth`.
- **Server RPCs:** `server/worldmonitor/supply-chain/v1/*` and `trade/v1/*`.
- **AI plumbing:** an LLM chain (`server/_shared/llm.ts`) that already supports OpenRouter and any OpenAI-compatible endpoint, plus a client-side correlation engine (`src/services/correlation-engine/`).

**What we add:** the OEM overlay (plants, inputs, lanes), a live exposure engine, model-written briefs and decision cards, and a panel set built around the OEM.

---

## 2. Known gotchas

- **Variant is chosen by hostname.** `app/src/config/variant.ts` falls back to `'full'` on `*.vercel.app`. Patch it to honour `VITE_VARIANT` on any host.
- **Don't add a new variant.** A new one touches about 30 files. Instead, **take over `commodity`**: rename its labels and swap its presets in `src/config/panels.ts`.
- **Empty panels.** Most panels read from Redis, which the seeders fill. Set up Upstash plus a GitHub Actions seeder cron (`scripts/run-seeders.sh`). Hide any panel that is still empty.
- **Services to strip or stub:** Clerk/Convex auth and billing, the paywall gate (`src/services/panel-gating.ts`), Sentry, and the host redirects and ignore-script in `vercel.json`.
- **Rebrand everything to Lodestar** and keep the AGPL credit. Grep the codebase for "World Monitor" and "worldmonitor.app" in UI strings, meta tags, manifest, OG images, favicon and about pages.
- **Vercel limits:** about 166 Edge functions and a 72 MB `dist`. Confirm the team plan allows this. If it doesn't, drop unused API routes.
- **Live AIS** needs a websocket relay that Vercel can't host. It's optional.

---

## 3. The OEM overlay

### 3a. Data: `data/network.json`
The file holds:
- **8 products:** MR conventional, MR sealed low-helium, CT, photon-counting CT, BGO PET/CT, CZT SPECT/CT, women's-health ultrasound, and mammography/X-ray.
- **About 45 sites:** plants, sub-assembly sites, a parts DC, ports, airports and demand regions.
- **20 critical inputs,** each with origin coordinates, export controls, synthetic TTS/TTR, and **live-feed hooks** (GDELT query, Yahoo symbol, FRED series, Federal Register term, PortWatch chokepoint).
- **22 lanes,** each with its chokepoints named exactly as PortWatch names them.

Copy it to `app/public/data/network.json` at build time and fetch it at runtime.

### 3b. Map layers (deck.gl)
Follow the existing `renewableInstallations` and `tradeRoutes` patterns: register each layer in `LAYER_REGISTRY` (`src/config/map-layer-definitions.ts`), add it to the `MapLayers` type, and add its paint code in `DeckGLMap.ts`.

| Key | Render | Notes |
|---|---|---|
| `oemPlants` | Icon/Scatterplot | Square = plant, diamond = sub-assembly; coloured by live exposure |
| `oemInputs` | Scatterplot | Raw-material origins; size = number of dependent products |
| `oemLanes` | Arc (air), Path through chokepoint waypoints (sea) | Animated trips if time allows; red when crossing a disrupted chokepoint |
| `oemDemand` | Scatterplot | Demand regions with installs due in 90 days (synth) |

Add a product filter to the top bar: All / MR / CT / MI / US / XR.

### 3c. Live exposure engine: `src/services/oem-exposure.ts`
It runs on load and every 5 minutes, scoring every node and lane from 0 to 100. Each score carries an evidence array.

| Live signal | Source (auth) | Join rule |
|---|---|---|
| Chokepoint transits vs 90-day baseline | IMF PortWatch `Daily_Chokepoints_Data` (none, CORS open) | Lanes whose `via` includes the chokepoint: `(1 − today/baseline) × 60` |
| Port calls vs baseline | PortWatch `Daily_Ports_Data` | Sites with a `portwatch` name |
| Disasters | GDACS orange/red; USGS M4.5+ (none) | Within 300 km of any site or input origin |
| News pulse | GDELT DOC `timelinevol`/`artlist` (none) | Each input's `live.gdelt`; volume z-score > 2 raises the score |
| Commodities | Yahoo chart (proxy) `HG=F, MU, SOXX, MP, BZ=F`; FRED `PCOPPUSDM`, `PCU325120325120`, `PCU33443344` (key) | Each input's `live.yahoo` / `live.fred`, 30-day change |
| Tariff and regulatory | Federal Register (none) | `regulatory_watch` terms; new in the last 14 days |
| Device regulatory | openFDA 510k / recall / shortage (none) | `OEM_FDA_APPLICANT` env var, server-side only |
| Cyber | CISA KEV (proxy), ransomware.live (proxy) | Sector match and peer watch list |
| FX | Frankfurter (none) | USD/CNY, JPY, KRW, EUR |

- Product exposure = the maximum over its inputs, sites and lanes, plus a TTS/TTR gap penalty.
- Add thin Edge proxies for Yahoo, FRED, CISA and ransomware.live, cached 15 minutes in Upstash.
- Keep a `snapshot/last-good.json` fallback so the demo still works if a feed dies mid-meeting.

### 3d. Model-written brief: `api/brief.ts` (Edge, calls OpenRouter)
- **Input:** the top 10 scored items with evidence, the product filter, and the date.
- **Output (JSON schema):**
  - `headline`
  - `brief` (3 sentences)
  - `decisions[]`: `{title, why, owner_function, decide_by, options[{action, cost, protects, regulatory_time, confidence}]}`
  - `watch[]`
- **Prompt rules:**
  - Cite only the evidence given.
  - Label synthetic numbers.
  - Use medtech operations language: S&OP, SQDCI, QMSR/510(k) change control, site readiness.
  - Recommend; don't decide.
  - Never name a company or person.
- **Models:** `LLM_MODEL_BRIEF` (GLM-5.3) by default. A **Compare** toggle re-runs the brief with `LLM_MODEL_COMPARE` (Opus 5.5) and shows the two side by side, with the token cost of each call.
- Cache for 30 minutes. Include a Regenerate button.

### 3e. Panels (on the taken-over variant)
**Keep:** supply-chain, chokepoint-strip, hormuz-tracker, critical-minerals, commodities, security-advisories, disaster-correlation, news.

**Add:**
1. **Command brief:** the headline figure is "revenue at risk, 90 days (synth)", with the decisions below it.
2. **Product exposure board:** score, sparkline, top driver, installs at risk (synth).
3. **Input clock:** TTS vs TTR bars, re-scored live.
4. **Evidence drawer:** live evidence with links, a cascade (event → input → part → product → installs → $), costed options, and "Draft with agent" buttons for an S&OP escalation, a customer install notice and a supplier RFQ. Every draft needs approval, and nothing is ever sent.
5. **Regulatory and trade watch.**

**UX patterns to reuse** (drawer, decision cards, scenario slider): see `prototype/`, the earlier static prototype. Keep its interaction model and restyle it to match.

---

## 4. Day plan

| Day | Work | Done when |
|---|---|---|
| 0 | Deploy `prototype/` as a separate Vercel project `lodestar-prototype` (static, noindex). This is the fallback demo | Prototype live |
| 1 | Vendor the app, rebrand, add the `lint:names` script and noindex headers, patch the variant, take over `commodity`, strip auth/paywall/Sentry, deploy a preview | Rebranded shell live on `lodestar-command.vercel.app` |
| 1–2 | Upstash + seeder cron; hide empty panels | No empty panels |
| 2–3 | Load `network.json`; four OEM layers; product filter | Overlay renders; filter works |
| 3–4 | Exposure engine + proxies + evidence | Scores move with live data; links resolve |
| 4 | `api/brief.ts` + Command brief panel + Compare toggle | Brief regenerates from live evidence |
| 5 | Product board, input clock, drawer, drafts, provenance chips | Full click path works |
| 6 | Polish, empty-state sweep, snapshot fallback, update `docs/PROGRESS.md` and the demo script | Demo runs even if a feed fails |

---

## 5. Demo story
1. **Live globe.** Hormuz shows about 1 transit a day against a pre-war norm of about 85 (live PortWatch). The Red Sea is contested. The brief leads with helium.
2. **Filter to MR.** Magnet plants and helium origins light up. The sealed low-helium magnet stands out as the hedge.
3. **Click the Qatar helium hotspot.** Show the live evidence, the cascade to installs, and TTS 41 d vs TTR 120+ d (synthetic, labelled).
4. **Decision card.** Gate magnet fills to site readiness and steer quotes to sealed magnets. Draft the S&OP escalation.
5. **Switch to CT.** Tungsten and rare-earth controls, with live Federal Register and GDELT items. The China control suspension ends around 10 Nov 2026.
6. **Close on ultrasound.** Calm: the system also tells you what not to worry about.
7. **Landing line.** Everything outside the company's walls is live today. Connect ERP, the install backlog and the supplier master, and the synthetic numbers become real.

## 6. Accuracy checklist
- The BGO PET/CT uses **BGO** crystals, and bismuth is under Chinese export control. It does not use LYSO.
- MR magnets are built in Florence SC and Tianjin. CT detectors come from West Milwaukee, Hino and Beijing. Tubes are made in West Milwaukee and anodes in Ohio.
- Supplier names are "industry suppliers" unless marked `S`.
