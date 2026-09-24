# Progress

- [x] Day 0: prototype live at https://lodestar-prototype.vercel.app (Vercel project `lodestar-prototype`, team "David's projects"). Sends `X-Robots-Tag: noindex, nofollow` and the robots meta tag; page and all assets return 200. Not yet checked in a real browser (headless Chromium here rejects the proxy CA).
- [ ] Day 1: vendor app, rebrand, lint:names, noindex, variant patch, strip auth/paywall, preview deploy. `lint:names` is done (`npm run lint:names`, fails closed if `BANNED_TERMS` is unset).
- [ ] Day 1–2: Upstash + seeder cron, no empty panels
- [ ] Day 2–3: network.json overlay layers + product filter
- [ ] Day 3–4: exposure engine + proxies + evidence
- [ ] Day 4: brief API + Compare toggle
- [ ] Day 5: board, input clock, drawer, drafts, provenance chips
- [ ] Day 6: polish, snapshot fallback, demo script

Deployed URL: prototype https://lodestar-prototype.vercel.app · command centre _
Feeds live / failing: _ (none wired yet)

## How deploys work in this environment
- Vercel, OpenRouter and Upstash credentials are **API credentials**: the proxy injects them on requests to those hosts, and the session never sees them. `VERCEL_TOKEN` is not an env var here.
- The Vercel CLI refuses to run without a local token, so deploy through the Vercel REST API (`POST https://api.vercel.com/v13/deployments?teamId=$VERCEL_ORG_ID`) or the Vercel connector. `VERCEL_ORG_ID` = team "David's projects".
- Run `npm run lint:names` before every deploy.

## Open issues
- **Upstash returns 401** through the proxy. Re-enter the credential as the REST token (not read-only, not the Redis password) for the database in `UPSTASH_REDIS_REST_URL`.
- **Repo name** contains the client name (hard rule 1). Accepted for now by the owner; rename before connecting Vercel's Git integration.

## Changes to supplied content
- `prototype/data.js`: role titles replaced with functions (rule 2): "Procurement", "Supplier quality + Cyber security". One confidence note on the sealed-magnet decision card reworded to "Medium: depends on how fast sealed-magnet output can ramp".
- `docs/RESEARCH_NOTES.md`: chemical symbols for gallium and germanium spelled out (tripped `lint:names`).
- `lint:names` matches whole words, so short banned terms don't match inside ordinary words.
