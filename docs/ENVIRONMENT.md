# Environment: Claude Code on the web

## 1. Repo
- Private GitHub repo: `lodestar-command-center`. Connect it to Claude Code on the web through the GitHub app.
- Sessions clone this repo. Pushes go through Claude's GitHub proxy.

## 2. Create the cloud environment (claude.ai/code → Environments → New)
**Name:** `lodestar`

**Network access:** **Full** is simplest. If you'd rather use **Custom**, allow these domains in addition to the defaults:
```
api.vercel.com, vercel.com, *.vercel.app, *.vercel.com
openrouter.ai
github.com, codeload.github.com, raw.githubusercontent.com, objects.githubusercontent.com
services9.arcgis.com                       # IMF PortWatch
api.gdeltproject.org                       # GDELT
www.gdacs.org                              # GDACS
earthquake.usgs.gov                        # USGS
eonet.gsfc.nasa.gov                        # NASA EONET
www.federalregister.gov                    # Federal Register
api.fda.gov                                # openFDA
api.stlouisfed.org                         # FRED
query1.finance.yahoo.com, query2.finance.yahoo.com
www.cisa.gov, api.ransomware.live
api.frankfurter.dev
*.upstash.io                               # Redis cache
stream.aisstream.io                        # optional, live AIS
tiles.openfreemap.org, basemaps.cartocdn.com, cdn.jsdelivr.net, fonts.googleapis.com, fonts.gstatic.com
```
The default "Trusted" list already covers npm, PyPI and api.anthropic.com. It does **not** include Vercel or OpenRouter.

**Setup script** (runs once, then cached):
```bash
#!/bin/bash
set -e
npm i -g vercel@latest
node -v
```

## 3. Environment variables (paste as `.env` lines in the environment dialog)
| Variable | Needed | Where to get it | Cost |
|---|---|---|---|
| `VERCEL_TOKEN` | yes | vercel.com → Account → Tokens (scope it to the team) | free |
| `VERCEL_ORG_ID` | yes | Team ID (Vercel team settings) | – |
| `OPENROUTER_API_KEY` | yes | openrouter.ai → Keys (keep account-wide Zero Data Retention on) | pay per use |
| `LLM_MODEL_BRIEF` | yes | `z-ai/glm-5.3` | – |
| `LLM_MODEL_FAST` | yes | `deepseek/deepseek-v4-flash` | – |
| `LLM_MODEL_COMPARE` | optional | `anthropic/claude-opus-5.5` | – |
| `FRED_API_KEY` | yes | fred.stlouisfed.org → API keys | free |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | yes | upstash.com → Redis → free database | free |
| `BANNED_TERMS` | yes | Comma-separated list of the client and product names that must never appear. Keep this list **only** here. | – |
| `OEM_FDA_APPLICANT` | optional | Applicant name used for openFDA queries (server-side only, never rendered) | – |
| `AISSTREAM_API_KEY` | optional | aisstream.io | free |
| `NASA_FIRMS_KEY` | optional | firms.modaps.eosdis.nasa.gov | free |

Plain environment variables are visible to the session. That's fine here, because the session needs to pass them to Vercel with `vercel env add`.

## 4. Vercel
- **Project name:** `lodestar-command`, so the URL is `lodestar-command.vercel.app`. **Never include a client or segment name in any project name, alias or domain.**
- The session creates the project on the first `vercel deploy`, then syncs runtime env vars with `vercel env add … production`.
- **Deploy commands:**
  - Preview: `vercel deploy --token "$VERCEL_TOKEN" --scope "$VERCEL_ORG_ID"`
  - Production: `vercel deploy --prod --token "$VERCEL_TOKEN" --scope "$VERCEL_ORG_ID"`
- **Seeders:** a GitHub Actions cron (`.github/workflows/seed.yml`, every 30 min) uses repo secrets for the same keys. Add them with `gh secret set`, or add them by hand if the proxy blocks that.
- **Live AIS vessels (optional):** these need an always-on websocket relay, which Vercel can't host. Skip them for the demo; PortWatch transit counts carry the story.

## 5. Limits worth knowing
- VM: 4 vCPU, 16 GB RAM. The World Monitor build takes about 3 minutes and fits comfortably.
- A session can push only to its current branch. Work on `main` for speed, or on a branch with PRs if you prefer review.
