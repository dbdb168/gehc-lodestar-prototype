# Progress

- [ ] Day 0: deploy prototype/ → lodestar-prototype.vercel.app (fallback demo). **Blocked: no Vercel credentials in the session.** Files are in place and `prototype/vercel.json` already sends `X-Robots-Tag: noindex`.
- [ ] Day 1: vendor app, rebrand, lint:names, noindex, variant patch, strip auth/paywall, preview deploy. `lint:names` is done (`npm run lint:names`, fails closed if `BANNED_TERMS` is unset).
- [ ] Day 1–2: Upstash + seeder cron, no empty panels
- [ ] Day 2–3: network.json overlay layers + product filter
- [ ] Day 3–4: exposure engine + proxies + evidence
- [ ] Day 4: brief API + Compare toggle
- [ ] Day 5: board, input clock, drawer, drafts, provenance chips
- [ ] Day 6: polish, snapshot fallback, demo script

Deployed URL: _
Feeds live / failing: _ (none wired yet)

## Blockers
- **Credentials:** none of the env vars in `docs/ENVIRONMENT.md` §3 are set in the session, and the Vercel CLI isn't installed. Run the session in the `lodestar` environment.
- **Repo name:** the GitHub repo name contains the client name, which breaks hard rule 1. Rename it to `lodestar-command-center` before any Vercel Git integration is connected.

## Changes to supplied content
- `prototype/data.js`: role titles replaced with functions (rule 2): "Procurement", "Supplier quality + Cyber security". One confidence note on the sealed-magnet decision card reworded to "Medium: depends on how fast sealed-magnet output can ramp".
