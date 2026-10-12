# Run status: MR conventional magnet line, to 2031

Read date 11 October 2026. All phases complete. Research model: Claude Fable 5.1 for every lens; the bake-off against other models is deferred (`../../bakeoff/VERDICT.md`).

| Phase | Rounds run | Output | State |
|---|---|---|---|
| 1 Focal question | scope packet | `00-scope-packet.md` | done, tolerance line is a Placeholder |
| 2 Predetermined elements | 1 | `phases/P2-predetermined.md` (19 elements) | done |
| 3 Critical uncertainties | 2 | `phases/P3-uncertainties.md` (two axes: 11 of 11 on trade, 10 of 11 on helium) | done |
| 4 Futures | 3 | `phases/P4-future-F1.md` to `F4.md`, `P4-futures-synthesis.md` | done |
| 5 Indicators | 1 | `phases/P5-indicators.md`, `indicators.json` (12), `indicators-watch.json` (2) | done, all leans toward end A or neither |
| 6a Impact | 1 | `phases/P6a-impact.md` | done |
| 6b Actions | 1 | `phases/P6b-actions.md`, `actions.json` (26) | done, every action waiting for an owner |
| 7 Integration | moderator | `phases/P7-integration.md` | done against a Placeholder worldview |
| Assembly | script | `output.json` (schema valid, text checks clean) | done |

Invocations: 11 (phase 2) + 22 (phase 3) + 33 (phase 4) + 11 (phase 5) + 11 (6a) + 11 (6b) = 99 lens runs, plus the moderator syntheses, as the RUNBOOK planned.

## What a real run would change

- The owner interview replaces `03-worldview.md`, and phase 7 is rerun against it.
- The ten Placeholders (listed in `phases/P6a-impact.md`) are confirmed by their named functions before any action is sized.
- The node map comes from the OEM's own supplier map rather than `scripts/build_node_map.py`.
- Web research is turned back on from phase 2, with the bake-off deciding which model does it.
