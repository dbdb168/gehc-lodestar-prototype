# Research-model bake-off

One lens, one phase, the same prompt, two or three models. The winner does the research for the panel. The brief writer can be a different model, chosen the same way.

## The task

Foreign trade and payments lens, phase 2 (predetermined elements), for the MR conventional magnet line to 2031. Prompt: `prompt_foreign_trade_p2.md`, built by `scripts/lens_prompt.py` so every candidate gets the identical brief.

## Candidates

| Candidate | How it ran | Status |
|---|---|---|
| Claude Fable 5.1 with web search | Agent in this session, writing files directly | ran |
| Perplexity sonar-deep-research | `scripts/openrouter_lens.py` through the project's OpenRouter connection | did not run: the connection returned 401 User not found on 11 Oct 2026 |
| OpenAI gpt-5.6-sol-pro with the OpenRouter web plugin | same script | did not run: same 401 |

The two OpenRouter runs are repeatable with the same command once the connection is restored:

```
python3 scripts/openrouter_lens.py perplexity/sonar-deep-research bakeoff/prompt_foreign_trade_p2.md bakeoff/sonar-deep-research_full.md bakeoff/sonar-deep-research_summary.md
python3 scripts/openrouter_lens.py openai/gpt-5.6-sol-pro bakeoff/prompt_foreign_trade_p2.md bakeoff/gpt-5.6-sol-pro_full.md bakeoff/gpt-5.6-sol-pro_summary.md
```

## Rubric

Scored by the moderator, 0 to 3 each, on the full transcript only.

| Criterion | 3 | 0 |
|---|---|---|
| Source quality | Mostly primary: regulators, registers, statistics offices, filings | Mostly news and secondary summaries |
| Recency | Every source dated; nothing older than it needs to be; 2026 measures found | Undated or stale |
| Traceability | Every factual claim has a link; the reader could check each one | Claims without links |
| Fit to the map | Every finding names node ids and lands in the right threat category | Findings float free of the map |
| Rule-keeping | No OEM name, no people, no recommendations, tags used correctly, plain sentences | Breaks several rules |
| Finds what others miss | Surfaces a dated measure or fact the other candidates did not | Nothing beyond the obvious |

## Verdict

See `VERDICT.md`, written after the runs.
