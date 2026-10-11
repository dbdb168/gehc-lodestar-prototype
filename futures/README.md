# Futures: the five-year scenario exercise

This folder is the second half of Lodestar. The command centre in `app/` watches today's problems with live feeds. This folder looks five years out: four possible futures for one product line, which future the tracked indicators lean toward, and what the OEM can do now that is right in every future.

It is a fork of the Shell scenario panel method (lens, world, lens: elicit a worldview, build the futures without it, then integrate). What the fork changes is in `panel/RUNBOOK.md`. Nothing here is company data. Every internal value is synthetic and tagged; every public fact carries a source and a date.

## Layout

```
futures/
  panel/                 the forked method
    COMMON.md            rules every lens follows every round
    RUNBOOK.md           phases, rounds, cast, invocation, cost
    CHECKS.md            the moderator's quality checks per phase
    lenses/              eleven dossiers: the OEM's eight threat categories, technology shift, customer and market, contrarian
    templates/           output shapes: the uncertainty grid, the story grammar, output.json schema
  scenarios/
    MR-CONV-2031/        one run: the MR conventional magnet line, to 2031
      00-scope-packet.md     product, value, tolerance line, focal question, horizon
      01-node-map.json       36 nodes with provenance (synthetic value stream)
      02-risk-screen.md      the eight biggest risks, from scripts/screen_risks.py
      03-worldview.md        owner worldview (placeholder), sealed until phase 7
      conversations/         every lens output, every round
      phases/                moderator syntheses per phase
      output.json            what the screens read
  bakeoff/               the research-model bake-off on one lens, with the rubric and the verdict
  scripts/               build_node_map.py, screen_risks.py, lens_prompt.py, openrouter_lens.py, assemble_output.py
```

## How to run a new product

1. Copy `scenarios/MR-CONV-2031/00-scope-packet.md`, fill the product, value, tolerance line and focal question.
2. Build the node map (from the OEM's own supplier map where it exists; otherwise `scripts/build_node_map.py` as the pattern) and run `scripts/screen_risks.py`.
3. Interview the owner; write `03-worldview.md`; do not show it to the panel.
4. Run the panel per `panel/RUNBOOK.md`. Each round is eleven invocations with the same prompt builder, `scripts/lens_prompt.py`.
5. Assemble `output.json` and point the screens at it.

## What it is not

It is not a prediction, and it carries no probabilities. It is not the command centre; the two meet only at the indicators. It is not a tool the OEM would run as is; it is the worked example that shows what the method produces for one product, so the set-up experience can be designed around real content.
