# Demo script

About 10 minutes. The command centre is at https://lodestar-command.vercel.app and the fallback is the static prototype at https://lodestar-prototype.vercel.app.

The story follows `BUILD_BRIEF.md` §5. Numbers below are examples from 24–25 Sep 2026. **Read the live values off the screen and never quote this page.** External figures change with the feeds. OEM figures are synthetic and labelled "synth" wherever they render.

## Before the meeting (15 minutes ahead)

1. Open the command centre in the browser you will present from, and leave it open for a minute:
   - the exposure engine stores each feed's last good copy in that browser;
   - the brief is cached server-side for 30 minutes.
2. Check the feed line at the bottom of **Hotspots worth diving into**. It should read "Scored … from 8/8 live feeds".
   - If a feed is down, the line names it and the time of the data being shown instead. That's fine to present; say so.
3. Check that the **Command brief** shows a headline and decisions.
   - If it says "Brief unavailable", the OpenRouter key is probably out of credit.
   - Everything else still works. Present the evidence and skip steps 4–5 below.
4. Leave **Compare models** off unless the OpenRouter credit has been topped up. Compare runs the most expensive model.
5. Close any browser tab that has the prototype open, so the two don't get mixed up.

## The walk-through

1. **Live globe.** The map glows where live signals meet the OEM network:
   - red and orange heat = exposure score;
   - lines = the OEM's shipping lanes (sea through chokepoints, air as arcs).

   Point at the Strait of Hormuz and hover it. The tooltip gives the live IMF PortWatch count: "1 transit on 2026-09-20 vs a 90-day average of 9.5/day". The 90-day average is itself already depressed; the pre-conflict norm was far higher (see `RESEARCH_NOTES.md`).
2. **Command brief (right).** Point out:
   - the headline figure, revenue at risk over 90 days, labelled **synthetic**;
   - the model-written brief;
   - the decision cards, with their owner function, decide-by date and costed options.

   Line: "The model recommends; people decide."
3. **Filter to MR** (top bar). The magnet plants and helium origins light up.
   - The product board shows the conventional-magnet MR line leading, driven by liquid helium from Ras Laffan.
   - The sealed low-helium magnet scores lower. That's the hedge.
4. **Click the Qatar helium hotspot** on the map, or use "Open evidence drawer" in the Hotspots list. The drawer shows:
   - the live evidence, each item with its source and date and a link;
   - the cascade from event to input, products, installs and revenue (synth);
   - the input clock: time to survive 41 d vs time to recover 120 d (synth).
5. **Decision and draft.** In the drawer, go to "Costed options" (these come from the current brief) and click **S&OP escalation**.
   - The agent drafts the note in a few seconds.
   - Point at the banner: "needs your approval · nothing has been sent". **Approve & route** is a demo button and sends nothing.
6. **Switch to CT.** Tungsten, rare earths and the input clock's BGO and tungsten rows come up.
   - **Regulatory & trade watch** lists the live Federal Register items for the watch terms, and the export controls on critical inputs (sourced).
   - Gadolinium: the October 2025 expansion of China's controls is suspended until about 10 Nov 2026 (sourced, on screen).
7. **Close on ultrasound.** Its score is low. The system also tells you what not to worry about.
8. **Landing line.** "Everything outside the company's walls is live today. Connect ERP, the install backlog and the supplier master, and the synthetic numbers become real."

## If something goes wrong

| What happens | What to do |
|---|---|
| A feed dies | The engine shows that feed's last good data with its real timestamp and says so. Present as normal and point at the label. |
| Cold browser and the APIs are down | The engine falls back to the deployed snapshot (`public/snapshot/last-good.json`), labelled with its date. Say it's a snapshot. |
| Brief unavailable | OpenRouter credit or model outage. Scores, evidence, drawer and map still work. Skip the decision card; show the evidence. |
| The whole site is down | Switch to the static prototype https://lodestar-prototype.vercel.app. It runs the same story on fixed data. |

## Don'ts

- Don't present synthetic numbers (revenue, installs, TTS/TTR, plant capacity) as company data. They are always labelled.
- Don't name the client or its people; the product never does.
- Don't click "Approve & route" as if it sends something. It doesn't.
