# Demo script

About 12 minutes. Lead with **MR**, then **CT**, and close on **ultrasound**.

- Command centre: https://lodestar-command.vercel.app
- Fallback: the static prototype at https://lodestar-prototype.vercel.app

The numbers below were read off production on 29 Sep 2026 at about 18:00 UTC. On the day, read the live values off the screen and don't quote this page:
- external figures move with the feeds;
- OEM figures are synthetic and labelled "synth" wherever they render.

## Why these products

| Product | Why show it | On 29 Sep |
|---|---|---|
| **MR (lead)** | The one line where a fast-moving live signal meets a cover gap, with the hedge inside the same product family. | Conventional magnet 70, driven by Hormuz (live). Sealed low-helium magnet 8. Helium: 41 days to survive vs 120 to recover (synth). |
| **CT (second)** | A different kind of risk: China's export controls on inputs. The input clock tells a real gap from a covered input. | CT 69, also hit by Hormuz through the Beijing → Gulf lane. Tungsten exposed (75 vs 150 days); gadolinium covered (60 vs 45) (synth). |
| **Ultrasound (close)** | Calm: the system also tells you what not to worry about. | 8, with no installs at risk. |

Keep MI (PET/CT and SPECT) for questions. It rests on the same tungsten control plus reference data:
- BGO is exposed by 110 days (synth);
- the CZT detectors carry a tellurium control and an Israel conflict estimate.

## Demo links

Each link opens:
- the right product filter (the link wins over the browser's remembered choice);
- the global view with 7-day events;
- only the map layers that support the story.

A link sets layers for that visit only; it never overwrites the browser's saved layers.

Before the meeting, open steps 1, 2, 3 and 4 in four browser tabs, in order, and move through the tabs as you present. Each tab keeps its own camera and layers. You can also stay in one tab and use the filter buttons in the top bar (All · MR · CT · MI · US · XR); they change the product line but not the map layers.

| Step | Link | Map layers on |
|---|---|---|
| 1. Open (all lines) | https://lodestar-command.vercel.app/dashboard?product=ALL&view=global&lat=28&lon=30&zoom=1.4&timeRange=7d&layers=conflicts,waterways | Conflict Zones, Chokepoints |
| 2. MR | https://lodestar-command.vercel.app/dashboard?product=MR&view=global&lat=28&lon=30&zoom=1.4&timeRange=7d&layers=conflicts,waterways | Conflict Zones, Chokepoints |
| 2a. Hormuz close-up (if you want the map zoomed in) | https://lodestar-command.vercel.app/dashboard?product=MR&view=global&lat=25.5&lon=53&zoom=4&timeRange=7d&layers=conflicts,waterways | Conflict Zones, Chokepoints |
| 3. CT | https://lodestar-command.vercel.app/dashboard?product=CT&view=global&lat=28&lon=75&zoom=1.6&timeRange=7d&layers=conflicts,waterways,minerals | Conflict Zones, Chokepoints, Critical Minerals |
| 4. Ultrasound | https://lodestar-command.vercel.app/dashboard?product=US&view=global&lat=28&lon=30&zoom=1.4&timeRange=7d&layers=conflicts,waterways | Conflict Zones, Chokepoints |

Layers that are **off** on purpose (names as in the Layers panel):
- **Intel Hotspots:** World Monitor's own news hotspots. They pulse and would be confused with our exposure heat.
- **Protests:** they also pulse.
- **Trade Routes:** illustrative dots moving along generic routes; not ships, and not our lanes.
- **Commodity Ports:** upstream's LNG and crude terminals, which would be mistaken for our labelled ports. Off by default since 29 Sep.
- **Armed Conflict Events:** nothing in the Gulf in the last 7 days, so it adds nothing here.
- **Fires** and **CII Instability** shading: noise for this story.

## Before the meeting

**The day before:** refresh the fallback snapshot (`docs/runbooks/refresh-snapshot.md`).

**15 minutes ahead:**
1. Open the four demo links in the browser you will present from, and leave them open for a minute:
   - the exposure engine stores each feed's last good copy in that browser;
   - the brief is cached server-side for 30 minutes.
2. Check the feed line at the bottom of **Hotspots worth diving into**. It should read "Scored … from 8/8 live feeds".
   - If a feed is down, the line names it and the time of the data being shown instead. That's fine to present; say so.
   - If it adds "GDELT news pulse: unavailable", the news-volume signal is missing (GDELT rate-limits the refresh job). Everything else is live; just don't mention news spikes.
3. Check that the **Command brief** shows a headline and decisions, written by Claude Sonnet (the model and cost show under the buttons). The ultrasound tab should say "No decisions": that is the calm close.
   - "Brief unavailable" means an OpenRouter outage or credit problem. Everything else still works: present the evidence and skip the decision card.
4. **Compare models** works (Opus, about $0.05 a run). It's optional; use it only if asked how models differ.
5. In each tab, collapse the **Layers** panel (click its header) so it doesn't cover the Americas.
6. Close any browser tab that has the prototype open, so the two don't get mixed up.

## The walk-through

### 1. Open on All (1 minute)

The map:
- **Glow** = Lodestar's exposure heat. Only items scoring 35 or more glow, and the number on a marker is its score.
- **Lines** = the OEM's lanes. Sea lanes follow real sea routes through the chokepoints they cross; air lanes are arcs.
- **Ports** are labelled. Charleston is the busiest, with three outbound lanes (UK, Gulf, Brazil).

Hover the **Strait of Hormuz** marker. The tooltip gives the live IMF PortWatch count. The line to say:

> "One transit on 27 September [read the day's figure off the tooltip]. In 2025 this strait averaged about 85 a day."

The 85 is sourced: see "Sourced talking points" below. The on-screen comparison is the last 90 days, which were already depressed (8.7 a day).

The **Command brief** (right):
- the headline figure is revenue at risk over 90 days: **synthetic**, $364M across all lines;
- the brief is written by the model from the evidence, and shows the model and cost;
- decision cards carry an owner function, a decide-by date and options, recommended first.

> "The model recommends; people decide."

### 2. MR (4 minutes)

Switch to the MR tab (or click **MR** in the top bar).

- **Product board:** the conventional magnet scores 70; the sealed low-helium magnet scores 8.
  > "Same family. The sealed magnet uses under 1% of the helium, so the system scores it calm. That's the hedge, and you can see it."
- **Hotspots:** Hormuz 60, Qatar helium 57, Russian helium 43.

In **Hotspots worth diving into**, click **Strait of Hormuz**, then **Open evidence drawer**. Walk it top to bottom:
1. **The read.** A headline and three sentences written by the model from the evidence below it. On 29 Sep it also said the war-risk tier is an editorial setting, not a live feed.
2. **Chatter.** Telegram posts, labelled unverified and never scored. On 29 Sep it showed a vessel struck in the strait that morning, and the rejection of a proposal to reopen it (27 Sep).
3. **Why this was flagged.** The live PortWatch count, the war-risk tier (reference, with its review date) and the synthetic cover.
4. **How it reaches us.** Two OEM lanes run through Hormuz (Waukesha → Gulf hospitals; Beijing → Gulf hospitals). Then helium, the plants, the products and the installs.
5. **Survive vs recover.** 41 days vs 120 (synth). Move the **what-if** slider from 2 months to 3:
   - installs short go from 24 to 61;
   - revenue at risk goes from $54M to $137M (synth);
   - the formula is printed under the slider.
6. **What we can do.** The Command brief's decision, recommended option first. On 29 Sep: "Protect MR helium supply from the Ras Laffan and Hormuz exposure", decide by 6 Oct, owner S&OP council.

Under **Have the agent draft it**, click **S&OP escalation**.
- The draft takes a few seconds.
- Point at the banner: "needs your approval · nothing has been sent".
- **Approve & route** is a demo button and sends nothing.

### 3. CT (3 minutes)

Close the drawer (← Back to map) and switch to the CT tab.

- **Product board:** CT scores 69, also driven by Hormuz, through the Beijing → Gulf lane. Photon-counting CT scores 39, driven by tungsten.
- **Input clock:**
  - tungsten is exposed: 75 days of cover vs 150 to recover;
  - gadolinium is covered: 60 vs 45 (all synth).
  > "Both sit under China's controls. Only one is a problem, because the cover differs."
- Open the **Gadolinium** hotspot's drawer. The control line says the October 2025 expansion is suspended to about 10 Nov 2026 (sourced):
  > "Around 10 November. That's the date to watch."
- **Regulatory & trade watch:**
  - FDA device regulatory (live, generic device classes only), including the CT 510(k) clearances;
  - the trade controls on critical inputs, each tagged sourced or estimate.
- **Critical Minerals** (on in the CT link) shows Bayan Obo, the world's largest rare-earth mine, north of the Baotou gadolinium origin.

### 4. Ultrasound (30 seconds)

Switch to the ultrasound tab. It scores 8, with no installs and $0 at risk. The brief says it's a calm day and makes **no decisions**; memory and FPGAs sit on its watch list at 8, after an M4.6 earthquake off Taiwan.

> "It also tells you what not to worry about."

### 5. Landing line

> "Everything outside the company's walls comes from public feeds, time-stamped and refreshed every few hours. Connect ERP, the install backlog and the supplier master, and the synthetic numbers become real."

## Sourced talking points (checked 29 Sep 2026)

**Hormuz** (IMF PortWatch daily chokepoint transits, averages of the daily totals):
- 2025: 85.5 a day;
- Jan–Feb 2026: 67.9 a day;
- March 2026: 3.2 a day;
- June–September 2026: 8.0 a day.

**Red Sea** (same source):
- Bab el-Mandeb: 74.6 a day in Jan–Oct 2023, before the attacks on shipping, vs 31.1 a day in June–September 2026;
- Suez Canal: 73.6 vs 41.0.

**Helium:**
- Russia put helium exports outside the Eurasian Economic Union under government licence from 14 Apr 2026, until the end of 2027. Sources: [Interfax](https://interfax.com/newsroom/top-stories/117116/), [Global Trade Alert](https://globaltradealert.org/state-act/97372-russia-helium-added-to-the-export-licensing-list).
- China's commerce ministry and customs imposed a temporary helium export ban from 10 Jul 2026. Source: [Caixin](https://www.caixinglobal.com/2026-07-11/china-bans-helium-exports-as-global-supply-crunch-hits-chipmaking-gas-102462943.html).

## If something goes wrong

| What happens | What to do |
|---|---|
| A feed dies | The engine shows that feed's last good data with its real timestamp and says so. Present as normal and point at the label. |
| Cold browser and the APIs are down | The engine falls back to the deployed snapshot (`public/snapshot/last-good.json`), labelled with its date. Say it's a snapshot. |
| Brief unavailable | OpenRouter credit or model outage. Scores, evidence, drawer and map still work. Skip the decision card; show the evidence. |
| Small dots moving along lines | The browser has World Monitor's Trade routes layer on. Reopen the demo link, which turns it off. |
| The whole site is down | Switch to the static prototype https://lodestar-prototype.vercel.app. It runs the same story on fixed data. |

## Don'ts

- **Don't say "real-time" or "live AIS".** There is no ship tracking. Transit counts are daily PortWatch figures, published a couple of days behind.
- **Don't present synthetic numbers as company data:** revenue, installs, time to survive and recover, plant capacity. They are always labelled.
- **Don't claim price signals for memory chips or rare earths.** There's no free live price feed for them; they show as sourced controls and estimates.
- **Don't promise Federal Register items.** They appear only when a watch term hits; on 29 Sep there were none in the last 14 days.
- **Don't read Telegram posts as fact.** They are unverified and never scored.
- **Don't name the client or its people.** The product never does.
- **Don't click "Approve & route" as if it sends something.** It doesn't.
- **Don't dwell on two lanes whose routing the owner hasn't confirmed:**
  - Charleston → Gulf (landing at Dammam through Hormuz, or at Jeddah on the Red Sea);
  - Haifa → Germany (by sea to Rotterdam, or to Trieste/Koper and then by road).
