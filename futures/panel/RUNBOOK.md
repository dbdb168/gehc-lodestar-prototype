# Runbook: how one run of the panel goes

The fork keeps the Shell panel's phases and its progressive convergence (isolation, then summaries, then full transcripts). It changes four things: the cast is the OEM's eight external threat categories plus three lenses the method needs; the panel reads a product scope packet and a node map instead of a company profile; two steps come before the panel (the node map and the risk screen) that the Shell method does not have; and every output is written in a fixed shape so screens can render it without a person rewriting prose.

## The cast

| Lens | File | Watches |
|---|---|---|
| Natural disasters | `lenses/natural_disasters.md` | Floods, storms, quakes, heat, fire at plants, mills, ports |
| Geopolitical | `lenses/geopolitical.md` | Blocs, conflict, state control of materials, chokepoints |
| Security | `lenses/security.md` | Cyber on suppliers and logistics, theft, sabotage, counterfeit parts |
| Financial | `lenses/financial.md` | Supplier solvency and concentration, capital cost, insurance |
| Infrastructure | `lenses/infrastructure.md` | Power, ports, rail, cryogenic transport, air freight, water |
| Labor | `lenses/labor.md` | Skilled trades, strikes, ageing workforces, migration rules |
| Foreign trade and payments | `lenses/foreign_trade_payments.md` | Tariffs, export controls, sanctions, customs, currency, payment rails |
| Macroeconomic | `lenses/macroeconomic.md` | Demand cycles, hospital capital, input inflation, rates |
| Technology shift | `lenses/technology_shift.md` | Helium-free and low-helium magnets, other superconductors, chip allocation |
| Customer and market | `lenses/customer_market.md` | Procurement criteria, competitors, reimbursement, how late delivery is read |
| Contrarian | `lenses/contrarian.md` | Attacks the other ten |

The research lens from the Shell repo is folded into every lens (each does its own cited research). The quality analyst is replaced by the moderator's checks in `CHECKS.md`.

## Before the panel (set-up steps 1 to 3)

1. Framing: write `00-scope-packet.md`. Product, value to protect, tolerance line, horizon, decision clock, focal question.
2. Node map: run `scripts/build_node_map.py` (or load the OEM's own map). Output `01-node-map.json`.
3. Risk screen: run `scripts/screen_risks.py`. Output `02-risk-screen.md` and `.json`.
4. Worldview: interview the owner; write `03-worldview.md`. Seal it until phase 7.

## The panel (phases 2 to 7)

Each round is eleven invocations in parallel. Each lens writes a full transcript and a summary to `conversations/`. The moderator reads and writes the phase output to `phases/`.

| Phase | Rounds | What each lens answers | Moderator output |
|---|---|---|---|
| 2 Predetermined elements | 1, isolated | What is already certain by 2031 in your domain for the nodes you can reach | `phases/P2-predetermined.md` |
| 3 Critical uncertainties | 2: isolated, then summaries | What could go several ways, which nodes it moves, what kind of not-knowing it is; round 2 names convergence and contradiction | `phases/P3-uncertainties.md` with the uncertainty-by-risk grid and the two axes |
| 4 Futures | 3: isolated, cluster, all transcripts | What each of the four futures looks like through your lens; round 2 refines one cluster's future; round 3 integrates and the contrarian attacks | `phases/P4-future-<name>.md` x4 in the story grammar |
| 5 Indicators | 1, isolated | What observable thing would show each uncertainty resolving, where it is published, how often, what threshold | `phases/P5-indicators.md` and `indicators.json` |
| 6a Impact | 1, isolated | For each future, which risk breaks first, how soon, what it costs against the tolerance line | `phases/P6a-impact.md` |
| 6b Actions | 1, isolated | For each candidate action, does it work in all four futures or in some; act, pause, look again triggers | `phases/P6b-actions.md` and `actions.json` |
| 7 Integration | moderator only | Where the owner's worldview is confirmed, challenged or silent | `phases/P7-integration.md` |

Invocation cost: 11 + 22 + 33 + 11 + 11 + 11 = 99 lens invocations plus seven moderator syntheses. Phase 1 (the focal question) is done in the scope packet.

## The invocation

Every invocation gives the lens: the run folder, the phase and round, the files to read (per COMMON.md), the one question for the round, the output paths, and the research model to use. It never gives the lens the moderator's own view.

## After the panel

`scripts/assemble_output.py` reads `phases/*.json` and writes `output.json`, the single file the screens read: the eight risks, the two uncertainties with their lean, the four futures in the story grammar, the indicators with sources and thresholds, the actions with owners and triggers, and the brief.

## Monitoring

Quarterly: read the indicators (live where the control centre already has a feed, manual otherwise), update the lean of each uncertainty, re-write the brief and the cards, fire any trigger whose condition is met. Once a year, or the day an uncertainty settles, re-run from phase 3 with the current node map.
