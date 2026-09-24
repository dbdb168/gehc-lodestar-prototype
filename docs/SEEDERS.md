# Seeders: what fills each panel

Most panels read Redis (Upstash) keys that upstream fills with always-on
Railway services, some every 5 minutes. Lodestar runs a small subset from
GitHub Actions instead (`.github/workflows/seed.yml` → `scripts/run-seeders.sh`).

## Panel → Redis key → seeder

| Panel / layer | Redis key | Seeder (`app/scripts/`) | Env |
|---|---|---|---|
| Supply chain: shipping rates | `supply_chain:shipping:v2` | `seed-supply-chain-trade.mjs` | `FRED_API_KEY` |
| Supply chain: critical minerals (HHI) | – | none (static data, computed live) | – |
| Chokepoint status + trade-route colour | `supply_chain:chokepoints:v4` (route cache) | computed live from NGA warnings; enriched by `seed-portwatch` → `seed-lodestar-transit-summaries` (+ per-chokepoint history), `seed-chokepoint-baselines` → `seed-chokepoint-flows` | – |
| Hormuz tracker | `supply_chain:hormuz_tracker:v1` | `seed-hormuz.mjs` | – |
| Metals & materials (commodities) | `market:commodities-bootstrap:v1` | `seed-commodity-quotes.mjs` | – |
| Security advisories | `intelligence:advisories(-bootstrap):v1` | `seed-security-advisories.mjs` (`RELAY_URL=direct`) | – |
| Disaster cascade | `correlation:cards-bootstrap:v1` | `seed-correlation.mjs` (needs fresh earthquakes) | – |
| Map: earthquakes | `seismology:earthquakes:v1` | `seed-earthquakes.mjs` | – |
| Map: natural events | `natural:events:v1` | `seed-natural-events.mjs` | – |
| Map: fires | `wildfire:fires(-bootstrap):v1` | `seed-fire-detections.mjs` | `NASA_FIRMS_API_KEY` |
| Map: cyber threats | `cyber:threats(-bootstrap):v2` | `seed-cyber-threats.mjs` | optional free keys |
| News panels | – | none (RSS fetched live at the edge) | – |
| Trade routes, waterways, ports, sanctions layers | – | none (static) | – |

## Not seeded (and what that costs)

- **`scripts/ais-relay.cjs`** is a long-running process that Vercel and Actions
  can't host. Upstream it writes chokepoint transit summaries, card history and
  shipping stress. Lodestar replaces the PortWatch half with
  `seed-lodestar-transit-summaries.mjs` (week-on-week change, traffic-drop
  anomaly, history chart). Live "today" AIS counts and shipping stress stay
  empty; the cards withhold today's count rather than show a lagged one.
- `seed-internet-outages.mjs` needs `CLOUDFLARE_API_TOKEN` (not set).

## Cadence and budget

- **Fast group, every 2h:** commodities, earthquakes, advisories, cyber,
  correlation. About 1 minute including setup.
- **Slow group, every 6h:** shipping/trade, Hormuz, natural events, fires,
  PortWatch, chokepoint baselines and flows. About 4 minutes; fires alone is
  ~3 minutes (three NASA FIRMS satellites).
- Upstream TTLs assume minute-level refresh (commodities 30 min, correlation
  20 min), so the runner sets `SEED_MIN_TTL_SECONDS` (default 7h) to keep values
  between runs. Values keep their own `fetchedAt`; the UI shows true age.
- Budget: a private repo gets 2,000 free Actions minutes a month. Measured on
  the first full run (24 Sep 2026): ~850/month (360 fast runs × ~1 min + 120
  slow runs × ~4 min). Billing rounds each job up to the whole minute.
- First full run: all 12 seeders OK in ~3.5 min. Advisories: 106 stored from
  329 fetched; 14 US embassy feeds fail when fetched directly. Correlation: 13
  disaster cards (military/escalation/economic have no inputs seeded).
- Scheduled workflows only run from the default branch.

## Run by hand

Actions → "Seed live data" → Run workflow (group: all / fast / slow).
