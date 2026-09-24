# Lodestar Command Center: operating notes for Claude Code (cloud)

You are building **Lodestar**, a live supply-chain command centre for a **medical imaging OEM**. It covers MR, CT, molecular imaging, ultrasound and X-ray/mammography, and it runs on real-time public data. The OEM's internal data is **synthetic** and lives in `data/network.json`.

Read `docs/BUILD_BRIEF.md` before doing anything. It is the plan. `docs/RESEARCH_NOTES.md` has the grounding facts, and `docs/ENVIRONMENT.md` covers credentials and deployment.

## Autonomy
- You have full read, write and deploy rights in this repo and the Vercel project. Work through the brief's day plan end to end without stopping for confirmation. Commit early and often with clear messages, and deploy previews as you go.
- **Stop and ask only for:**
  - a missing credential;
  - anything that would spend money beyond the free tiers listed in ENVIRONMENT.md;
  - deleting anything outside this repo.
- Keep `docs/PROGRESS.md` current. Record what's done, what's next, which feeds are live or failing, and the deployed URL.

## Hard rules
1. **No company names.** The UI, code, commits, URLs, repo name, Vercel project name, page titles and metadata must never name the client company, its segments, its product brand names, or any of its people. Use generic terms: "the OEM", "MR", "CT", "PET/CT", "SPECT/CT", "ultrasound", "mammography". Before every deploy, run `npm run lint:names` (you create it in the day-1 work; it greps for the banned list kept in the `BANNED_TERMS` env var) and fail the build on any match.
2. **No people.** Don't name leaders or roles at the client. Use functions instead: "Procurement", "Install PMO", "S&OP council", "Quality/RA".
3. **Provenance on every internal number.** Each value in `network.json` carries `S` (sourced public fact), `est` (estimate) or `synth` (synthetic), and the UI shows that tag. Never present `synth` as real company data.
4. **Real data stays real.** External feeds show source, timestamp and link. If a feed fails, show "feed unavailable" with the last good timestamp. Never fake a live value.
5. **Licensing.** The map app is based on World Monitor (AGPL-3.0).
   - Keep the `LICENSE` file and a visible "Based on World Monitor (AGPL-3.0)" credit with a link.
   - Rebrand everything else to Lodestar, following its trademark policy.
   - Keep the repo private.
   - Load OEM data at runtime from `data/network.json`; never compile it into components.
6. **Keep secrets out of code.** Read them from env. Never commit `.env`.
7. **No `noindex` regressions.** Every deployed page sends `X-Robots-Tag: noindex` and a `<meta name="robots" content="noindex">`.

## Models
- Everything goes through **OpenRouter**, using the `OPENROUTER_API_KEY` and `LLM_MODEL_*` env vars.
- Defaults:
  - Briefs and decisions: `LLM_MODEL_BRIEF=z-ai/glm-5.3`.
  - Triage and summaries: `LLM_MODEL_FAST=deepseek/deepseek-v4-flash`.
  - Comparison: `LLM_MODEL_COMPARE=anthropic/claude-opus-5.5`, used only when the UI "Compare" toggle is on.
- Always use JSON-schema `response_format` for structured outputs.
- Cache briefs for 30 minutes.

## Definition of done (demo)
- The live URL loads a command centre with a globe or map, the OEM network overlay, and live chokepoint, news, disaster, tariff, FDA, cyber, commodity and FX signals.
- No panel is empty.
- An exposure score is shown for each product, with evidence you can click through to.
- A model-written brief and decision cards appear, with drafts that need approval before anything is sent.
- The three-product story from the brief works: MR high, CT medium, ultrasound low.
- `lint:names` passes, and the page is noindexed.
