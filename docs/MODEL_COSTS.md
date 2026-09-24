# Model costs: GLM-5.3 vs Claude Opus 5.5 (Sep 2026 list prices)

| Model | Input $/M tokens | Output $/M tokens | Notes |
|---|---|---|---|
| GLM-5.3 (OpenRouter) | 0.5625 | 2.50 | Cache read $0.125/M. 1M context. Open weights. |
| Claude Opus 5.5 | 4.00 | 20.00 | Cache read $0.20/M. Batch pricing is 50% off. |

At list price, Opus 5.5 costs about **7× more per input token and 8× more per output token**.

## Workload assumption (per month, live 24/7)
| Job | Calls | In / call | Out / call | Tokens in | Tokens out |
|---|---|---|---|---|---|
| Command brief, every 30 min | 1,440 | 15k | 1.5k | 21.6M | 2.2M |
| Drill-downs and drafts | 600 | 8k | 1k | 4.8M | 0.6M |
| News triage (~2k articles/day) | 60,000 | 600 | 60 | 36.0M | 3.6M |
| **Total** | | | | **62.4M** | **6.4M** |

## Monthly cost
| Setup | Brief | Drafts | Triage | **Total** |
|---|---|---|---|---|
| All GLM-5.3 | $18 | $4 | $29 | **≈ $51** |
| All Opus 5.5 (no caching) | $130 | $31 | $216 | **≈ $377** |
| Opus 5.5 for brief and drafts (with prompt caching) + GLM-5.3 for triage | $64 | $18 | $29 | **≈ $111** |

A single command brief costs about **$0.012 on GLM-5.3** and **$0.09 on Opus 5.5**.

Notes:
- Token counts differ a little between tokenizers, so treat these as ±15%.
- The DeepSeek V4 Flash triage default costs less than GLM, so the all-open-weights setup lands under $51.
- For a demo week with a handful of users, all options come to single-digit dollars.
