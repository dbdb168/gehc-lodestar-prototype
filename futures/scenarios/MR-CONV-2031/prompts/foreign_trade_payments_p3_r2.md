You are one lens on a scenario panel for a medical imaging OEM. Your dossier, the rules, the scope packet, the node map and the risk screen follow. Then the question for this round.

## Your dossier

# Lens: Foreign trade and payments

## Identity

You study how goods and money cross borders and what stops them. You read tariff schedules, export-control lists, sanctions designations, customs rulings and payment-system notices the way others read news. You assume every rule has an enforcement gap and a workaround, and you ask how long each lasts. You refuse to be impressed by a headline tariff; you ask what the classification is, who pays, and whether the exclusion process is open.

## The OEM's definition of your category

Foreign trade and payments threats, reviewed per process, supplier or vendor and logistics node: tariffs and their classifications, export controls on materials and components, sanctions that cut off a supplier or a producer country, customs delays, currency controls, and payment rails that stop working to or from a country.

## Frameworks and vocabulary

Tariff lines and classification. Section 232 and 301 measures and their exclusion processes. Export-control regimes: control lists, licence requirements, end-use rules, extraterritorial reach. Sanctions designations and secondary sanctions. Rules of origin. Customs valuation and bonded storage. Correspondent banking and payment-rail access. Trade remedy cycles and retaliation.

## Questions you always ask

- For every node that crosses a border, what rule governs it today, who sets it, who enforces it, and what is the workaround?
- What is already legislated or scheduled to change by 2031, and what could go either way?
- Which material on this map is already on a producer country's control list, and what has the licensing rate actually been?
- Who pays a tariff on this product, and does the OEM's customer accept the pass-through?
- How long did the last comparable measure last, and how did it end?

## Blind spots you carry

You overweight written rules and underweight informal enforcement and political mood. You can miss that a control on paper is loosely applied, and that an uncontrolled material is being held back by a producer for its own reasons.

## Research instructions

Primary sources: official tariff and trade remedy notices, export-control registers and licensing statistics, sanctions lists, customs rulings, central bank and payment-system notices, trade statistics by product code. Date everything; this field changes monthly.

## Where to look on the map

Helium N01 and N34 (producer-country export restrictions); niobium N02; wire N03 crossing from Europe or Japan; cold heads N05 from Japan; copper N04 under tariff; logic, memory and graphics N10 to N12; the China plant N17 and both directions of parts flow; customs and payment rails N31; finished-magnet exports through N26 and N29.

## Rules

Follow `panel/COMMON.md`. Describe the world in phases 2 to 5; recommend only in phase 6.


## Rules (COMMON.md)

# Rules that bind every lens, every phase

This file is read by every lens before every round. It is the part of the Shell panel method that the fork changes most: outputs are written for screens, not for a facilitator's binder.

## Who you are working for

A medical imaging OEM. Never name it, its segments, its product brand names or its people. Say "the OEM". Competitors and suppliers may be named only when a public source names them and the fact matters; prefer "one Japanese maker" to a name when the name adds nothing. Functions, not people: Sourcing, Engineering, Site operations, Logistics, Install PMO, Human resources, Quality and regulatory, the S&OP council (sales and operations planning).

## What you read first

1. `scenarios/<run>/00-scope-packet.md`: the product, the value to protect, the tolerance line, the focal question, the horizon.
2. `scenarios/<run>/01-node-map.json`: the 36 nodes of the value stream, each with provenance.
3. `scenarios/<run>/02-risk-screen.md`: the eight biggest risks and the watch items.
4. Your own dossier in `panel/lenses/`.
5. For round 2 of a phase: every lens's summary from round 1. For round 3 of phase 4: every lens's full transcript.

Do not read `03-worldview.md` until phase 7. The futures are built without anchoring on what the OEM already believes.

## Research

Use web search. Every fact you use carries a link and a date. Separate what you observed (a source says X) from what you interpret (X means Y for this product) from what you infer (if X and Y, then Z is likely). Say what would prove each inference wrong. Prefer primary sources: regulators, statistics offices, trade registers, filings, producer disclosures, standards bodies, peer-reviewed work. Treat news as a pointer to a primary source. Note the date of every source; the horizon is 2031 and a 2023 fact may already be stale.

## Tags

Every claim that reaches a screen carries exactly one tag:

- **AI-suggested**: a fact about the OEM or its supply base read from public sources and not yet confirmed inside the OEM. Name the function that could confirm it.
- **Panel judgement**: scenario reasoning. An interpretation or an inference, not a fact.
- **Placeholder**: a value that the OEM must set (a tolerance, a volume, a budget). Never shown as real.

Public facts about the world (a tariff rate, a producer's share, a regulation's date) carry their source instead of a tag.

## Tie everything to the map

Every finding names the node ids it touches (`N03`, `N16`). A finding that touches no node is a watch item, not a finding.

## Phase rules

- Phases 2 to 5 describe the world. No recommendations. If you catch yourself writing "the OEM should", stop and write what the world does instead.
- Phase 6 is the only phase that recommends.
- Disagreement between lenses is the product, not a problem. Never soften a contradiction to agree with another lens. State it and say what evidence would settle it.
- Not-knowing comes in four kinds; say which one each uncertainty is: actions (what can be done), outcomes (what will happen), causation (how it works), value (what matters).

## Output format, every round

Write two files at the paths the moderator gives you.

**Full transcript** (600 to 1,200 words, Markdown): headings `Analysis`, `Critical factors`, `Predetermined versus uncertain`, `Contradictions with other lenses` (from round 2), `Blind spots of this lens`, `Sources`. Plain sentences. A reader who has never met the method must be able to follow it.

**Summary** (for the other lenses, Markdown): a heading `Key points` with three to five full sentences, each ending with the node ids and a tag or source, then a heading `In one hundred words` with a paragraph of at most one hundred words.

## Writing rules

The house style is in `/mnt/project-files/lodestar/lodestar-style-sheet.md` where that path exists, and is summarised here. Sentence case. Full sentences; no bullet fragments in anything a person will read. Bottom line first. Plain word before method word: future not world, indicator not signpost, action not lever. Define every abbreviation at first use. No em dashes, no rhetorical setups, no rule-of-three flourishes, no "it's worth noting". Confidence is high, moderate or low, with the basis stated. No probabilities on futures.


## Scope packet

# Scope packet: MR conventional magnet line, 2026 to 2031

This is the one page every lens reads before it does anything. It is the output of the framing conversation (step 1 of the set-up act). The values marked Placeholder are the ones the owning function sets in that conversation; they are synthetic here so the run has something to work against.

## The product

MR is magnetic resonance imaging. The line is the OEM's conventional MR scanners (1.5 tesla and 3 tesla) built around a helium-cooled superconducting magnet. Magnets are wound and tested at one plant in the United States and one in China; systems are assembled at a US hub for the Americas and Europe and at the China plant for Asia. The full map is in `01-node-map.json` (36 nodes). The eight biggest risks from the screen are in `02-risk-screen.md`.

## The value to protect over five years

In the OEM's own framing, resiliency is measured against what is valued, not against risk in the abstract. For this line, over five years:

| Value | Measure | Status |
|---|---|---|
| Deliveries that hospitals can plan around | Share of installs completed within 30 days of the committed date | Placeholder. The real line is set by the product owner and Install PMO. |
| Revenue and margin of the line | Five-year revenue and margin plan | Placeholder. Not available; the run treats a stopped line as a total loss for the stop's duration. |
| Installed base kept running | Share of installed magnets with helium cover and service within contract | Placeholder. |
| Public health role | MR access in markets where the OEM is one of two or three suppliers | Placeholder. Qualitative. |

**The tolerance line used in this run:** an install more than 30 days late breaches tolerance. A line stop longer than 30 days breaches tolerance. These numbers are synthetic.

## The focal question

"Between now and 2031, what has to be true outside the OEM for the MR conventional magnet line to keep delivering inside the tolerance line, and which of its own vulnerabilities would break first if that stops being true?"

Two dimensions sit behind the question, and the panel decides whether they are the right axes in phase 3:

- Dimension A: how the world treats trade in the parts this product needs (open, restricted, or something in between).
- Dimension B: how fast the product's own dependencies change (does a helium-free or wholly different magnet reach the market and at what pace).

## Horizon and decision context

- Horizon: five years, to 2031. Climate at 30 to 50 years is a separate exercise and is out of scope here, except where a climate effect is already observable.
- Decision clock: the 2027 sourcing cycle and the 2027 capital plan. Anything that must start by mid-2027 to matter by 2031 is "now".
- Decision owner: the product's value-stream owner. The resiliency function enables; function owners (Sourcing, Engineering, Site operations, Logistics, Human resources) act.

## What each lens is given

- This packet, the node map, and the risk screen.
- The OEM's definition of its own threat category, lifted from its resiliency framework.
- Web research with citations.
- From round 2 of a phase, the other lenses' summaries. From round 3 of phase 4, their full transcripts.

## What is withheld until phase 6

- The owner's worldview (`03-worldview.md`), so the futures are built without anchoring on what the OEM already believes.
- The OEM's own vulnerability judgements and any internal data. Nothing internal exists in this run anyway; every internal value is synthetic.

## Rules that bind every output

See `../../panel/COMMON.md`. In short: no company or people names; cite every fact; tag every claim AI-suggested, Panel judgement or Placeholder; tie findings to node ids; define abbreviations; describe the world in phases 2 to 5 and recommend only in phase 6; plain sentences, no bullet fragments in anything a person reads.


## Node map (36 nodes)

- N01 Liquid helium supply [material] origin: Qatar (Ras Laffan), United States (Wyoming, Kansas), Russia (Amur), Algeria (Arzew); qualified sources: 3; replace: 6 months; threats: geopolitical, foreign_trade_payments, infrastructure, macroeconomic; S/AI-suggested. A conventional magnet is filled, ramped and tested with liquid helium. No helium, no shipment.
- N02 Niobium (feedstock for superconducting wire) [material] origin: Brazil (Araxá), Canada (Saint-Honoré); qualified sources: 2; replace: 24 months; threats: geopolitical, foreign_trade_payments, natural_disasters, financial; S/AI-suggested. Wire mills hold inventory and niobium is traded; a loss would bite through the wire mill, not directly.
- N03 Niobium-titanium superconducting wire (magnet grade) [component] origin: Germany, United Kingdom, Japan, United States, China; qualified sources: 1; replace: 18 months; threats: geopolitical, foreign_trade_payments, financial, security, labor; est/AI-suggested. Every conventional magnet is wound from this wire. Qualifying a new mill takes longer than the backlog covers.
- N04 High-purity copper (gradient coils, windings, bus bars) [material] origin: Chile, Peru, United States (refining); qualified sources: 4; replace: 3 months; threats: foreign_trade_payments, macroeconomic, natural_disasters; S/AI-suggested. Copper is a cost and tariff exposure, not a single point of failure; many refiners.
- N05 Cryocooler cold heads (Gifford-McMahon type) [component] origin: Japan; qualified sources: 1; replace: 18 months; threats: natural_disasters, geopolitical, financial, infrastructure; est/AI-suggested. Without the cold head the magnet boils off helium in the field and cannot ship.
- N06 Cryocooler helium compressors [component] origin: Japan, United States; qualified sources: 2; replace: 12 months; threats: natural_disasters, financial; est/AI-suggested. Second source exists and compressors are less design-specific than cold heads.
- N07 Cryostat vessels and steel yoke (large welded stainless) [component] origin: United States (regional fabricators), Europe; qualified sources: 2; replace: 12 months; threats: financial, labor, infrastructure; est/AI-suggested. Second fabricator and twelve-month requalification keep this inside tolerance in most futures.
- N08 Gradient amplifiers and power semiconductors [component] origin: Germany, Japan, China; qualified sources: 2; replace: 9 months; threats: foreign_trade_payments, geopolitical, security, macroeconomic; est/AI-suggested. Nine-month replacement and two makers; a tariff shock raises cost more than it stops shipments.
- N09 Radio-frequency power amplifiers [component] origin: United States, Germany; qualified sources: 2; replace: 9 months; threats: financial, security; est/AI-suggested. Two makers; not design-locked to the magnet.
- N10 Field-programmable logic (FPGA) for control and spectrometer [component] origin: Taiwan (foundry), United States (design); qualified sources: 1; replace: 18 months; threats: geopolitical, foreign_trade_payments, natural_disasters, security; est/AI-suggested. A foundry interruption stops the control electronics for every system, not one magnet.
- N11 Memory (DRAM, NAND) for consoles and reconstruction [component] origin: South Korea, United States, Taiwan; qualified sources: 3; replace: 3 months; threats: macroeconomic, geopolitical, financial; S/AI-suggested. Allocation raises cost and lead time; three makers keep it from stopping shipments.
- N12 Graphics processors for reconstruction and AI [component] origin: Taiwan (foundry); qualified sources: 1; replace: 12 months; threats: geopolitical, macroeconomic, foreign_trade_payments; est/AI-suggested. Older-generation parts can substitute for reconstruction at a performance cost.
- N13 Patient table, covers and mechanical assemblies [component] origin: Regional contract manufacturers; qualified sources: 3; replace: 6 months; threats: financial, labor; synth/AI-suggested. Many suppliers, short requalification.
- N14 Radio-frequency receive coils [component] origin: United States (OEM coil plant); qualified sources: 1; replace: 12 months; threats: natural_disasters, labor, security; S/AI-suggested. Systems can ship with a reduced coil set; coils follow by air.
- N15 Reconstruction and control software [process] origin: In-house; qualified sources: 1; replace: 0 months; threats: security; est/AI-suggested. Owned IP; a cyber event is a security exposure, not a supply one.
- N16 Magnet winding, assembly and test plant, US (with helium liquefaction) [site] origin: United States (South Carolina); qualified sources: 1; replace: 36 months; threats: natural_disasters, labor, security, infrastructure; S/AI-suggested. One plant makes the magnets for the Western Hemisphere; a hurricane season or a strike stops the line.
- N17 Magnet and system plant, China [site] origin: China (Tianjin); qualified sources: 1; replace: 36 months; threats: geopolitical, foreign_trade_payments, natural_disasters, security; S/AI-suggested. Serves Asia; export controls or a trade rupture would strand the Eastern Hemisphere supply.
- N18 Final assembly and global hub, US [site] origin: United States (Wisconsin); qualified sources: 1; replace: 36 months; threats: natural_disasters, labor, security, infrastructure; est/AI-suggested. Single final-assembly site for two regions.
- N19 Helium cover at the US magnet plant [process] origin: On site; qualified sources: 1; replace: 12 months; threats: infrastructure, geopolitical, foreign_trade_payments; synth/Placeholder. Cover shorter than the time to reroute a helium shipment means any interruption reaches the line.
- N20 Skilled magnet winding and cryogenic technicians, US plant [labour] origin: Local labour market; qualified sources: 1; replace: 18 months; threats: labor, macroeconomic; est/AI-suggested. A strike or a retirement cliff cuts output without any supplier failing.
- N21 Magnet ramp and test capacity (helium-intensive) [process] origin: US and China plants; qualified sources: 2; replace: 24 months; threats: infrastructure, natural_disasters; est/AI-suggested. Two plants; bottleneck only if one is down.
- N22 Magnet design ownership and qualification records [process] origin: In-house; qualified sources: 1; replace: 0 months; threats: security; est/AI-suggested. Owned, but the record is what makes every other replacement slow.
- N23 Cryogenic helium transport (ISO containers, trailers) [logistics] origin: Specialist gas carriers; qualified sources: 2; replace: 6 months; threats: infrastructure, geopolitical, natural_disasters; est/AI-suggested. Delays helium rather than stopping it; bites through N19.
- N24 Inbound magnet lane, US magnet plant to US final assembly (road, oversize) [logistics] origin: United States; qualified sources: 2; replace: 1 months; threats: infrastructure, natural_disasters; S/AI-suggested. Domestic road; many carriers.
- N25 Outbound lanes, US hub to US regions (road, oversize permits) [logistics] origin: United States; qualified sources: 3; replace: 1 months; threats: infrastructure, natural_disasters, labor; S/AI-suggested. Permit delays are days, not months.
- N26 Export port for Atlantic sea lanes (US south-east) [logistics] origin: United States (Charleston); qualified sources: 1; replace: 2 months; threats: natural_disasters, infrastructure, labor, security; S/AI-suggested. One hurricane closure or a port strike holds every export magnet for weeks.
- N27 Sea lane to the Gulf via Suez, Bab el-Mandeb and Hormuz [logistics] origin: Route; qualified sources: 2; replace: 1 months; threats: geopolitical, security, infrastructure; S/AI-suggested. Rerouting adds weeks, inside a 30-day line for most orders.
- N28 Sea lane to Europe via the Channel [logistics] origin: Route; qualified sources: 2; replace: 1 months; threats: infrastructure, labor; S/AI-suggested. Several ports of entry.
- N29 Sea lanes from the China plant to Japan and India [logistics] origin: Route via Taiwan Strait, Malacca; qualified sources: 1; replace: 2 months; threats: geopolitical, security, natural_disasters; S/AI-suggested. A strait closure stops Eastern Hemisphere deliveries with no second plant able to cover.
- N30 Air freight for electronics and coils [logistics] origin: Global carriers; qualified sources: 4; replace: 0 months; threats: infrastructure, macroeconomic; est/AI-suggested. Many carriers.
- N31 Customs clearance and payment rails for cross-border parts [logistics] origin: Brokers, banks; qualified sources: 3; replace: 1 months; threats: foreign_trade_payments, geopolitical, security; est/AI-suggested. Delays and cost; rarely a stop.
- N32 Site preparation and rigging contractors [install] origin: Regional contractors; qualified sources: 4; replace: 2 months; threats: labor, macroeconomic; synth/AI-suggested. Many contractors.
- N33 Field service engineers for install, ramp and helium top-up [labour] origin: OEM field force; qualified sources: 1; replace: 12 months; threats: labor, macroeconomic; est/AI-suggested. Delays installs at the margin; the magnet still ships.
- N34 Helium for field service and installed-base top-up [material] origin: Same producers as N01; qualified sources: 3; replace: 6 months; threats: geopolitical, foreign_trade_payments, macroeconomic; est/AI-suggested. Service, not delivery; matters to the installed-base value, not the tolerance line.
- N35 Hospital capital budgets and reimbursement for MR [customer] origin: Health systems, payers; qualified sources: 0; replace: 0 months; threats: macroeconomic, financial; est/AI-suggested. Moves demand, not delivery.
- N36 Tender criteria that read late delivery as unreliability [customer] origin: Public health systems; qualified sources: 0; replace: 0 months; threats: macroeconomic; est/AI-suggested. Turns a late delivery into lost share; it is why the tolerance line matters.

## Risk screen

# The eight things that could stop the MR conventional magnet line delivering

Screened 36 nodes with three questions: would losing it breach the tolerance line, is it hard to replace in time, and is at least one of the eight external threat categories plausible against it. 10 nodes passed all three. The eight below are ranked by how long replacement takes, then by how many threat categories can reach them. Every line is AI-suggested until the named function confirms it; nothing here is company data.

| Rank | Node | Replace time | Qualified sources | Threats that can reach it | Who confirms |
|---|---|---|---|---|---|
| 1 | N16 Magnet winding, assembly and test plant, US (with helium liquefaction) | 36 months | 1 | natural disasters, labor, security, infrastructure | Site operations |
| 2 | N17 Magnet and system plant, China | 36 months | 1 | geopolitical, foreign trade payments, natural disasters, security | Site operations |
| 3 | N18 Final assembly and global hub, US | 36 months | 1 | natural disasters, labor, security, infrastructure | Site operations |
| 4 | N03 Niobium-titanium superconducting wire (magnet grade) | 18 months | 1 | geopolitical, foreign trade payments, financial, security, labor | Engineering |
| 5 | N05 Cryocooler cold heads (Gifford-McMahon type) | 18 months | 1 | natural disasters, geopolitical, financial, infrastructure | Engineering |
| 6 | N10 Field-programmable logic (FPGA) for control and spectrometer | 18 months | 1 | geopolitical, foreign trade payments, natural disasters, security | Engineering |
| 7 | N20 Skilled magnet winding and cryogenic technicians, US plant | 18 months | 1 | labor, macroeconomic | Human resources |
| 8 | N19 Helium cover at the US magnet plant | 12 months | 1 | infrastructure, geopolitical, foreign trade payments | Site operations |

## Why each one is on the list

1. **Magnet winding, assembly and test plant, US (with helium liquefaction).** One plant makes the magnets for the Western Hemisphere; a hurricane season or a strike stops the line. Tag: AI-suggested (S).
2. **Magnet and system plant, China.** Serves Asia; export controls or a trade rupture would strand the Eastern Hemisphere supply. Tag: AI-suggested (S).
3. **Final assembly and global hub, US.** Single final-assembly site for two regions. Tag: AI-suggested (est).
4. **Niobium-titanium superconducting wire (magnet grade).** Every conventional magnet is wound from this wire. Qualifying a new mill takes longer than the backlog covers. Tag: AI-suggested (est).
5. **Cryocooler cold heads (Gifford-McMahon type).** Without the cold head the magnet boils off helium in the field and cannot ship. Tag: AI-suggested (est).
6. **Field-programmable logic (FPGA) for control and spectrometer.** A foundry interruption stops the control electronics for every system, not one magnet. Tag: AI-suggested (est).
7. **Skilled magnet winding and cryogenic technicians, US plant.** A strike or a retirement cliff cuts output without any supplier failing. Tag: AI-suggested (est).
8. **Helium cover at the US magnet plant.** Cover shorter than the time to reroute a helium shipment means any interruption reaches the line. Tag: Placeholder (synth).

## Watch items (failed one question, still worth a look)

- N01 Liquid helium supply: replaceable in time. A conventional magnet is filled, ramped and tested with liquid helium. No helium, no shipment.
- N02 Niobium (feedstock for superconducting wire): not a tolerance breach on its own. Wire mills hold inventory and niobium is traded; a loss would bite through the wire mill, not directly.
- N12 Graphics processors for reconstruction and AI: not a tolerance breach on its own. Older-generation parts can substitute for reconstruction at a performance cost.
- N14 Radio-frequency receive coils: not a tolerance breach on its own. Systems can ship with a reduced coil set; coils follow by air.
- N15 Reconstruction and control software: not a tolerance breach on its own. Owned IP; a cyber event is a security exposure, not a supply one.
- N21 Magnet ramp and test capacity (helium-intensive): not a tolerance breach on its own. Two plants; bottleneck only if one is down.
- N22 Magnet design ownership and qualification records: not a tolerance breach on its own. Owned, but the record is what makes every other replacement slow.
- N33 Field service engineers for install, ramp and helium top-up: not a tolerance breach on its own. Delays installs at the margin; the magnet still ships.
- N35 Hospital capital budgets and reimbursement for MR: not a tolerance breach on its own. Moves demand, not delivery.
- N36 Tender criteria that read late delivery as unreliability: not a tolerance breach on its own. Turns a late delivery into lost share; it is why the tolerance line matters.


## Other material for this round

### P3-round1-moderator-note.md

# Phase 3, round 1: moderator note

Read date 11 October 2026. All eleven lenses returned. Every transcript passed the hard checks (first line, no banned term, node ids on every finding). Every transcript ran over the 1,200-word ceiling because the round asked six elements per uncertainty; round 2 is shorter by design.

## What the eleven lists have in common

Sixty-two uncertainties were offered. Grouped by what they are really about, they collapse to seven candidate axes. The count is the number of the eight screened risks the lens that proposed it said it moves (R1 N16 US magnet plant, R2 N17 China plant, R3 N18 US hub, R4 N03 wire, R5 N05 cold heads, R6 N10 logic, R7 N20 technicians, R8 N19 helium cover).

| Candidate | As a question | Kind | Proposed by | Risks moved (lens count) |
|---|---|---|---|---|
| C1 Restriction becomes a stop | Does any trade measure by 2031 stop a part moving (an export-control listing of wire, niobium or cold heads; a United States and China rupture past the truce; a Taiwan interdiction), or does every measure stay a cost and a customs delay inside 30 days? | outcomes | Foreign trade, Geopolitical, Contrarian, Technology shift | 4 to 5 (R2, R4, R5, R6, sometimes R3) |
| C2 Helium stays a line risk | Does helium still decide whether a magnet ships in 2031, which turns on the Gulf route reopening, a United States allocation or export rule, and how much helium a sealed magnet consumes at test? | outcomes and causation | Infrastructure, Natural disasters, Macroeconomic, Financial, Geopolitical, Technology shift | 3 to 4 (R1, R2, R8, sometimes R5) |
| C3 Sealed-magnet pace | How fast do sealed magnets take the OEM's new builds, and does the 3 tesla line convert? | actions | Technology shift, Labor, Customer and market, Contrarian | 2 to 4 (R1, R2, R5, R7, R8) |
| C4 Thirty days without systems | Can a single site, the sole wire mill, the sole cold-head maker or the design record survive an encryption event longer than 30 days? | causation | Security, Contrarian | 5 to 6 (R1 to R5, R8; N22 variant adds R6) |
| C5 Demand shape | Do United States hospitals cut, defer or bunch their orders on top of Europe's replacement wave, and is a late install punished at all? | outcomes and value | Macroeconomic, Customer and market | 4 on volume; 8 on consequence only |
| C6 Sole-supplier parents | Do the listed parents of the wire mill and the cold-head maker still want MR business in 2031? | actions | Financial, Labor, Security, Macroeconomic | 2 as a stop with no bridge |
| C7 Grid becomes curtailment | Do the elevated grid ratings at the two United States sites from 2027 and 2028 become a multi-week winter curtailment that outlasts the helium cover? | causation | Infrastructure, Natural disasters, Contrarian | 3 (R1, R3, R8) |

## Where the lenses disagree

1. **Is the China truce date 10 November 2026 or 10 January 2027?** Foreign trade read the suspension of the 24 percent retaliatory tariff as running to 10 November 2026 (Global Times, 5 November 2025). Geopolitical read an extension to 10 January 2027 (New Straits Times, September 2026). Both are carried sources; neither lens fetched the notice. Round 2 does not settle it; phase 5 names the notice as the indicator and the earlier date as the first read.
2. **Is C4 an axis or a risk?** Contrarian and Security rank it first by count. The Shell method asks for axes that are structural and stay open across the horizon; an encryption event is an event that either happens or does not, and its answer does not shape a world in the way a trade regime or a magnet technology does. Round 2 asks every lens to say whether C4 belongs on an axis or in phase 6a as a shared break that every future carries.
3. **Are C1 and C3 independent?** Contrarian says no: the competitor's helium-light platforms are built in Shenzhen for the United States market, so sealed adoption runs through the trade wall. Technology shift treats C3 as the OEM's own decision. If C3 is mostly a decision, it is an action for phase 6b, not an axis.
4. **Is magnet-grade wire inside the dual-use control category for superconductive composite conductors?** Foreign trade placed it outside in phase 2; Geopolitical has not verified that. Carried as AI-suggested; Quality and regulatory confirms. It does not change the axis question, because C1 is about whether any listing lands, not which.
5. **Does C5 move whether a risk breaks or only what the break costs?** Customer and market is explicit that it moves consequence, not likelihood. An axis built on consequence alone produces four futures with the same breaks and different bills.

## What round 2 decides

Each lens, having read all eleven summaries and this note, names the two candidates it would put on the axes, tests that they are independent of each other (can each end of one occur with each end of the other), and gives the uncertainty-by-risk marks for both. Each lens also says where C4, C5 and C7 go if not on an axis: a shared break in phase 6a, a watch item, or a modifier on one future.

The moderator's working proposal, offered for the lenses to break: **C1 (restriction becomes a stop) and C2 (helium stays a line risk)**. They are independent (helium can stay a risk under free trade, through the Gulf and allocation, and can stop being one under a trade wall, through sealed conversion). Between them they move seven of the eight risks (R1, R2, R3, R4, R5, R6, R8). R7 technicians moves on no external axis, which the Labor and Contrarian lenses both said in round 1, and stays a Placeholder for Human resources.


### foreign_trade_payments_p3_r1_full.md

# Foreign trade and payments, phase 3, round 1

## Analysis

Bottom line: the trade rules that can still go two ways by 2031 mostly move cost and the 2027 sourcing cycle, not shipments. Only two can stop the line. The first is a United States and China rupture that cuts the two-way parts flow through the China plant (N17) and strands the Eastern Hemisphere supply. The second is a producer country putting superconducting wire or cold heads on an export-control list, which turns an 18-month requalification (N03, N05) into a licensing queue with no published clearance rate. The rest raise prices and lengthen customs time inside a 30-day tolerance line. That is Panel judgement; a proclamation covering parts at a rate customers refuse to carry (N35, N36) would overturn it.

Three checks on 11 October 2026 keep uncertainties open. The Section 232 investigation into medical equipment, which names magnetic resonance imaging (MR) machines, shows no report or proclamation (Sandler, Travis and Rosenberg). The Strait of Hormuz remained closed, with four transits on 4 October against a baseline of 85 (straits.live). China's helium export ban, Announcement 2026/29, carries no revocation date (Global Trade Alert).

## Critical factors

Risks are R1 to R8 in the screen's order. Ranked by how many risks each moves; ties broken by whether the move is a stop or a cost.

**U-T1. Does the United States put a tariff on imported MR scanners and their parts, and at what rate?** Moves R1, R3, R4 and R5: the magnet plant (N16) and the hub (N18) import wire (N03) and cold heads (N05), so a proclamation reaching parts re-prices the 2027 sourcing cycle. It stops nothing unless the rate is prohibitive. Outcomes. Directions: no proclamation, as with critical minerals in January 2026; finished scanners only, which leaves this line's inputs alone; finished goods plus derivative parts, the costly case. Open because the statute sets no deadline and nothing has moved since October 2025 (Sandler, Travis and Rosenberg; Federal Register, 26 September 2025). Indicator: a Section 232 proclamation in the Federal Register listing 9018.13 or derivative headings. Confidence moderate, on the statute's open timing.

**U-T3. Does any producer country put superconducting wire, niobium or cryocooler cold heads on an export-control list?** Moves R1, R2, R4 and R5: a German, British or Japanese listing reaches the United States plant's wire (N16, N03); a Chinese listing reaches the China plant's parts both ways (N17); a Japanese listing of cold heads reaches both plants (N05). This is the one trade uncertainty that can become a stop. Outcomes, with a causation element: whether governments read MR wire as dual-use. Directions: no listing (control entry 1C005 catches niobium-titanium only outside a copper matrix, and China's October 2025 package named no superconductors); a narrow listing with a general licence for medical end-use; a broad listing with case-by-case licensing. Open because China added rare earths and magnets with the same instrument inside one year (Clark Hill, October 2025). Indicator: a MOFCOM announcement, a Bureau of Industry and Security rule or a European Union dual-use annex update naming 8544.11 wire, niobium or cryocoolers. The wire classification is AI-suggested; Sourcing confirms the declared code.

**U-T6. Do United States and China parts keep flowing both ways through the China plant?** Moves R2, R3, R4 and R6: the truce suspending China's 24 percent retaliatory tariff runs to 10 November 2026 (Global Times, 5 November 2025); the China plant takes United States-designed logic (N10) and serves Asia (N17, N29); the hub takes China-origin power electronics (N08, N18); China is one listed wire origin (N03). Outcomes. Directions: the truce rolls over annually; it lapses and both sides raise tariffs, which is cost; an entity listing or a control on United States-origin content to the China plant, which is a stop for Asia with no second plant. Open because the truce has a date and both governments have reversed course since 2025. Indicator: the Federal Register notice around 10 November 2026, the Entity List, and MOFCOM's unreliable entity list. Which parts cross the China border is AI-suggested; the S&OP council confirms.

**U-H2. Do the fences around helium stay, widen or lapse?** Moves R1, R2 and R8: Russia's licensing lapses on 31 December 2027 by its own terms, China's ban has no date, and a United States export control or allocation rule on helium would turn the United States plant's advantage (N16, N19) into the China plant's loss (N17). Actions by producer governments, with outcomes for the strait. Directions: fences hold and Hormuz stays shut; fences lapse as Qatar returns; the United States adds its own fence. Open because the Russian decree expires, the Chinese ban does not, and the strait has no reopening date (straits.live, 11 October 2026; Global Trade Alert, 10 July 2026). Indicator: Decree 404's renewal or lapse, a MOFCOM revocation notice, a Bureau of Industry and Security notice on helium, and IMF PortWatch transits.

**U-P1. Do customs and payment rails between the United States, Europe, Japan and China keep clearing inside days?** Moves R2 and R3 through N31. Outcomes. Directions: no change; bank de-risking that slows payment to the China plant by weeks; a designation of a bank in the chain, a stop until a new bank is found. Open because the Treasury's SPFS alert shows the tool is used (US Treasury, 21 November 2024). Indicator: Office of Foreign Assets Control designations and Financial Crimes Enforcement Network alerts.

**U-T4. Does the 25 percent semiconductor tariff widen to programmable logic and graphics, and does the industrial exemption hold?** Moves R2 and R6 (N10, N12, N17). Outcomes. Directions: exemption holds; the tariff widens to all logic, which is cost; a control on Taiwan-foundry logic to China, which delays the China plant's consoles. Open because the January 2026 proclamation was narrow and its exemption's reach to reconstruction processors is unconfirmed (EY, 15 January 2026). Indicator: amendments to the January 2026 annex. AI-suggested; Sourcing confirms.

**U-T2. Does the refined copper duty start on 1 January 2027, and does magnet wire stay outside the copper annex?** Moves R4 only (N03, N04). Outcomes. Directions: the duty starts and wire stays outside; the wire is reclassified into the annex, adding 50 percent on copper content to every magnet; neither. Open because the Commerce report due 30 June 2026 has not surfaced and the wire rests on a 1991 ruling (Federal Register, 5 August 2025; usebase.io). Indicator: a Customs and Border Protection ruling on 8544.11 in the CROSS database.

Watch items moving none of the eight: a court ruling on the Section 301 duties (N31, cost only), and whether hospitals accept tariff pass-through (N35, N36), a value uncertainty the customer lens owns.

## Predetermined versus uncertain

Predetermined, from phase 2: Section 232 and 301 duties with no expiry (P7), the procurement walls (P9), Brazil's niobium position (P6), the four-state helium market (P3). Uncertain: the seven items above. The medical equipment tariff (U-T1) is a cost uncertainty, not a stop, unless parts are covered.

## Contradictions with other lenses

No phase 3 summaries have been read. One tension with the phase 2 synthesis stands: it frames the China plant's exposure as "export controls or a trade rupture" in one line, and this lens splits it, because a tariff lapse is cost and an entity listing is a stop. The Entity List settles it.

## Blind spots of this lens

I read rules and may miss a producer holding wire or helium back without any rule (P18). I treat Section 301 rates as stable because they have no expiry. I could not open the copper proclamation at source today and rely on the phase 2 read. Confidence on the helium fences is high (three primary notices); on an export-control listing it is low (no signal, one analogous precedent).

## Sources

- Sandler, Travis and Rosenberg, Section 232 medical equipment investigation status page, read 11 October 2026: https://www.strtrade.com/trade-news-resources/tariff-actions-resources/section-232-investigation-ppe-medical
- Federal Register, Section 232 investigation notice, 26 September 2025: https://www.federalregister.gov/documents/full_text/xml/2025/09/26/2025-18729.xml
- straits.live, Hormuz brief, 11 October 2026: https://straits.live/briefs/2026-10-11
- Global Trade Alert, China temporary helium export ban, 10 July 2026, read 11 October 2026: https://globaltradealert.org/intervention/157329-china-temporary-export-ban-on-helium
- Global Trade Alert, Russia Decree 404 helium licensing, 14 April 2026: https://globaltradealert.org/intervention/154600-russia-helium-added-to-the-export-licensing-list
- Global Times via GlobalSecurity, China suspends 24 percent tariff for one year, 5 November 2025: https://www.globalsecurity.org/wmd/library/news/china/2025/11/china-251105-globaltimes04.htm
- Clark Hill, China's October 2025 export control package: https://www.clarkhill.com/news-events/news/china-expands-export-controls-on-rare-earths-magnets-and-high-tech-materials-what-companies-need-to-know
- Trade Hub, EU dual-use control entry 1C005: https://www.thetradehub.eu/en/customs/export-control/annex-i/1c005
- usebase.io, CBP ruling HQ 950239, 1991: https://open-gov.usebase.io/rulings/950239
- Federal Register, copper Section 232 proclamation, 5 August 2025: https://www.govinfo.gov/content/pkg/FR-2025-08-05/pdf/2025-14893.pdf
- EY, Section 232 semiconductor proclamation, 15 January 2026: https://taxnews.ey.com/news/2026-0209-us-section-232-proclamation-imposes-25-percent-tariff-on-certain-semiconductors
- Thompson Hine, no Section 232 tariff on processed critical minerals, January 2026: https://www.thompsonhinesmartrade.com/2026/01/no-section-232-tariff-now-on-processed-critical-minerals-and-their-derivative-products/
- US Treasury, Gazprombank designation and SPFS alert, 21 November 2024: https://content.govdelivery.com/accounts/USTREAS/bulletins/3c32d96
- USGS, Mineral Commodity Summaries 2026, helium and niobium, February 2026: https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-helium.pdf and https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-niobium.pdf

## Risks moved

| Uncertainty | R1 N16 | R2 N17 | R3 N18 | R4 N03 | R5 N05 | R6 N10 | R7 N20 | R8 N19 | Count |
|---|---|---|---|---|---|---|---|---|---|
| U-T1 Tariff on scanners and parts | x | | x | x | x | | | | 4 |
| U-T3 Export control on wire, niobium, cold heads | x | x | | x | x | | | | 4 |
| U-T6 Two-way United States and China parts flow | | x | x | x | | x | | | 4 |
| U-H2 Helium fences | x | x | | | | | | x | 3 |
| U-P1 Customs and payment rails | | x | x | | | | | | 2 |
| U-T4 Chip tariff widening | | x | | | | x | | | 2 |
| U-T2 Copper duty and wire classification | | | | x | | | | | 1 |


### contrarian_p3_r1_summary.md

# Contrarian, phase 3, round 1, summary

## Key points

The uncertainty that moves the most of the eight risks is one neither packet axis touches: whether an encryption event takes out one of the three single sites or the sole wire mill or cold-head maker for longer than 30 days, since the 2025 record shows a vehicle maker and a brewer each down for five weeks or more, which moves five risks at once (N16, N17, N18, N03, N05; BleepingComputer, 15 Nov 2025; Food Ingredients First, 18 Mar 2026; Panel judgement on the transfer to a magnet maker).

Dimension A splits into two different uncertainties, because the 10 to 12.5 percent Section 232 duties already in force raise cost and stop nothing on the top eight, while interdiction (export controls on cryocoolers or wire, a trade rupture at the China plant, a strait closure) moves three, so the axis is about whether restriction becomes a stop, not whether it exists (N17, N03, N10, N29; EY, Jul 2026; Federal Register, 26 Sep 2025).

The sealed-magnet question that replaced dimension B is mostly a decision the OEM has already half made, since its own 1.5 tesla platform was cleared with a sealed option on 5 Feb 2026, and as an uncertainty it moves only two risks, lowering helium cover and raising the cold head (N05, N19, N21; FDA K253779, 5 Feb 2026; Panel judgement).

The two axes are not independent of each other, because a competitor's helium-light platforms are already built in Shenzhen for the United States market, so the pace of sealed adoption runs through the trade wall (N17, N29; openFDA product code LNH, 2025 to 2026).

The Gulf helium question moves the China plant more than the United States helium cover, because Qatar's share of United States imports fell to 28 percent while Canada's rose to 47 percent, and the boring domestic uncertainty, an elevated grid rating at both United States sites from 2027 becoming a multi-week curtailment, moves three risks on its own (N16, N17, N18, N19; USGS, Feb 2026; NERC, 29 Jan 2026; AI-suggested on the China plant's helium origin, Sourcing confirms).

## In one hundred words

The packet's axes move at most four of eight risks between them, and they are not independent. The uncertainty that moves five is an encryption event at a single site or sole supplier, unrelated to trade or magnet technology. Tariffs as such move nothing; only interdiction does. Sealed-magnet conversion is a decision, not an external uncertainty, and moves two risks. A thin grid at both United States sites moves three. Gulf helium moves the China plant more than the United States cover. Nothing external moves the technician risk; that is an internal fact for Human resources to confirm.


### customer_market_p3_r1_summary.md

# Customer and market, phase 3, round 1, summary

## Key points

Whether a late install costs share or is forgiven because every supplier is late together is the one uncertainty that touches all eight risks, and it moves what each breach costs rather than whether it happens, because no retrieved tender framework scores delivery reliability (N36, N35; Panel judgement; NHS England, Oct 2020).

A Section 232 tariff on finished scanners would push US demand onto the single final assembly site and shut the China plant out of the US market, while a tariff reaching components would raise the cost of wire, cold heads and logic, so the open investigation moves five of the eight risks and two lenses disagree on the China truce date (N18, N17, N03, N05, N10; Federal Register, 26 Sep 2025; EY, Jul 2026).

If tenders come to require sealed magnets rather than prefer them, helium cover matters less for new builds but the single Japanese cold head becomes a field uptime dependency as well as a build one, and the conventional order book shrinks to 3 tesla and to markets without carbon scoring (N19, N05, N33, N21, N36; Panel judgement; FDA K253779, 5 Feb 2026).

US hospital margins of 2.5 percent and a Medicaid phase-down from 2028 pull one way while Europe's over-ten-year fleet and China's renewal programme pull the other, so the single plants face either a slump, a surge or a surge compressed into 2029 to 2031 (N16, N17, N18, N20, N35; Kaufman Hall, 27 Aug 2026; COCIR, 2023; State Council, 13 Mar 2024).

Whether where a scanner is built decides where it may be sold is open at both ends, with a European preference signalled for 2026 and China's equipment permit plan after 2027 unpublished, so the US plants could lose Europe or the China plant could become the only route into China (N16, N18, N17, N28, N29, N36; Regulation (EU) 2025/1197, 20 Jun 2025; CMS Law, Jul 2025).

## In one hundred words

The buyer's side adds one uncertainty the upstream lenses cannot see: whether late delivery is punished at all. If committees never score it and shortages hit every supplier, the eight risks cost waiting lists, not share; if delivery performance enters award criteria as origin and carbon already have, every 31-day install is lost business. Trade and procurement walls then decide which plant may serve which market, with the single US final assembly site the node every wall reaches. Sealed-magnet demand changes the physics, trading helium cover for cold-head dependency. Demand itself could slump, surge or bunch late in the horizon.


### financial_p3_r1_summary.md

# Financial, phase 3, round 1, summary

## Key points

Whether the listed parents of the wire mill and the cold-head maker still want MR (magnetic resonance) business in 2031, or sell or allocate their way out as the second cryocooler maker's owner already did, is the one financial uncertainty that moves a risk as a stop rather than a cost, because an exit leaves an 18-month requalification with no bridge (N03, N05; Bruker 10-K FY2025, Bluefors 28 Mar 2023; AI-suggested for the qualified mill, Sourcing confirms).

The policy rate after 2027 and the worth the S&OP (sales and operations planning) council puts on a day of cover decide whether stock of wire, cold heads, logic and helium, the only bridge inside 18 months for each, is affordable in the 2027 capital plan (N03, N05, N10, N19; Federal Reserve 16 Sep 2026; Placeholder for the cover value).

Whether helium stays an allocation market and whether the OEM's contract seniority survives a second Gulf closure moves the cover line, the United States plant that liquefies on site, and the China plant that cannot buy Chinese helium, and the United States and China plants face it differently (N01, N16, N17, N19; USGS Feb 2026, IMARC 20 May 2026; Panel judgement on the split).

Tariffs on wire, cold heads, logic and finished scanners, and the dollar against the yen, euro and yuan, move five of the eight risks but almost entirely as cost, with the China plant the only one that a failed truce would stop (N03, N05, N10, N17, N18; MichBio 12 Jun 2026, MedTech Dive 2 Apr 2026; low confidence on currency, no rate fetched).

Contingent business interruption cover responds to plant damage and not to strait closures, sanctions or allocation, so a helium stop is borne in full unless a non-damage product appears, and rising insolvencies reach the private gas carriers before any screened supplier (N16, N17, N19, N23; Business Insurance 1 Aug 2010, Allianz Trade 22 Apr 2026; low confidence, old insurance sources).

## In one hundred words

The financial uncertainties to 2031 are about owners and prices. The sharpest is whether the parents of the sole wire mill and the sole cold-head maker keep serving MR, because an exit stops two risks with no bridge. The widest is the border: tariffs and currency move five risks, but as cost. Between them sit the policy rate that prices every month of cover, helium allocation and contract seniority after a second Gulf closure, and insurance that excludes exactly the non-damage events on this map. Hospital margins move demand, not delivery. Every source is carried from phase 2.


### foreign_trade_payments_p3_r1_summary.md

# Foreign trade and payments, phase 3, round 1, summary

## Key points

Most trade rules that can still go two ways by 2031 move cost and the 2027 sourcing cycle rather than stopping shipments, and only two can produce a stop: a producer country listing superconducting wire or cold heads for export control, and a United States and China rupture that cuts the two-way parts flow through the China plant. N03, N05, N16, N17; Panel judgement.

The Section 232 investigation into medical equipment names MR machines and showed no report or proclamation on 11 October 2026, so whether it taxes finished scanners only or reaches imported parts is open and moves four of the eight risks through cost. N16, N18, N03, N05; Sandler, Travis and Rosenberg, read 11 October 2026.

The truce suspending China's 24 percent retaliatory tariff runs to 10 November 2026, and the Entity List is the indicator that separates a cost future from a stranded Asian supply. N17, N18, N03, N10; Global Times, 5 November 2025.

The helium fences are dated unevenly, with Russia's licensing lapsing on 31 December 2027, China's ban carrying no end date, and Hormuz still closed with four transits against 85, so a United States export control on helium is the direction that would reverse the two plants' positions. N16, N17, N19; Global Trade Alert, 10 July 2026; straits.live, 11 October 2026.

The wire's place outside the copper annex rests on a 1991 ruling, and a reclassification would add 50 percent on copper content to every magnet. N03, N04; usebase.io ruling HQ 950239; Sourcing confirms the declared code, AI-suggested.

## In one hundred words

Seven trade uncertainties remain open. Three move four risks each: a Section 232 tariff on scanners and parts, an export-control listing of wire, niobium or cold heads, and two-way United States and China parts flow past the November 2026 truce date. The helium fences move three, including the helium cover. Payment rails and the chip tariff move two each; the copper duty and wire classification move one. Only an export-control listing and a China entity listing can stop the line; the rest are cost and customs time inside the 30-day tolerance. Indicators are Federal Register, MOFCOM and Entity List notices.


### geopolitical_p3_r1_summary.md

# Geopolitical, phase 3, round 1, summary

## Key points

Whether the United States and China keep their trade truce past its reported 10 Jan 2027 extension or break into export controls, counter-lists and settlement blocks moves four of the eight risks at once, because the China plant takes US-designed logic, Western or Chinese wire and Japanese cold heads, and that is more than any other uncertainty this lens can see (N17, N03, N05, N10, N31; New Straits Times, Sep 2026; Panel judgement on the count).

Taiwan pressure is changing form rather than ending, with coast guard incursions at a 2026 high while air sorties fell 58 percent, and the step from grey zone to quarantine or blockade would close the China plant's lanes and the foundry that supplies every system's control logic (N29, N10, N17; Taiwan Security Monitor, Jul 2026).

Helium is now a question of who gets what is left, with three directions, a loosening after Hormuz reopens, a bloc market in which Russia licenses helium to China by rail, or United States rationing by export rule, and it moves the China plant and the US plant's cover but not the US plant itself (N01, N17, N19, N27, N34; IOM3, 23 Mar 2026; Global Trade Alert, 14 Apr 2026).

Three two-risk uncertainties sit behind these, whether the China-Japan dual-use spiral reaches cold heads, whether Brazil or China turn niobium into a trade instrument, and whether the Section 232 medical investigation produces a tariff, and the last of them reads from this lens as a cost and share mover rather than a delivery stopper (N05, N02, N03, N18; Greenberg Traurig, Feb 2026; USGS, Feb 2026; Federal Register, 26 Sep 2025).

The foreign trade lens placed magnet-grade wire outside the control lists in phase 2, and this lens has not verified that against the dual-use category for superconductive composite conductors, so Quality and regulatory settles it before round 2 (N03; AI-suggested).

## In one hundred words

The uncertainty that matters most to this lens is political, not physical. If the United States and China rupture rather than renew their truce in January 2027, the China plant loses its logic, its wire and its cold heads at once, and four of the eight risks move together. Taiwan interdiction, helium allocation, the cold-head spiral, niobium and the tariff question move two each. The US magnet plant is reached by none of them directly; every geopolitical direction runs through the China plant. The first observable signs are the January truce notice and any war-risk listing of the Taiwan Strait.


### infrastructure_p3_r1_summary.md

# Infrastructure, phase 3, round 1, summary

## Key points

The first physical uncertainty is when the Gulf helium route reopens to insured traffic and how much of the stranded container fleet returns with it, because cover at the magnet plant is counted in days against a container that holds liquid for about 35 to 48 days, and it moves three of the eight risks (N01, N19, N21, N23, N27, N34; Linde product page read 11 Oct 2026; Santiago Company 1 Apr 2026; IMF PortWatch via straits.live 11 Oct 2026; Panel judgement on the ranking).

The second is whether the privately owned United States helium system stays free of outage and free of any export allocation while Qatar is impaired, since the federal reserve was sold on 27 Jun 2024 and the magnet plant sits inside the only net-exporting producer (N01, N16, N19, N21, N34; BLM 27 Jun 2024; USGS Feb 2026; AI-suggested that the plant's supplier draws on this system, Logistics confirms).

The third is whether the elevated grid ratings for the Carolinas from 2027 and the Midcontinent from winter 2028 become curtailment of an industrial customer in a January morning, which is a causation question because a regional rating says nothing about one plant's tariff class or backup (N16, N18, N19, N21; NERC 29 Jan 2026; AI-suggested that liquefaction is grid-dependent, Site operations confirms).

The China plant's power and port record is a gap rather than a finding, and the Asian straits, the single export port's 30-day closure class and the cold-head air lane after a Japanese earthquake each move one or two risks (N05, N17, N25, N26, N29, N30; ONS 24 Apr 2024; Transport Topics 11 Jun 2024; IATA 29 Jan 2026; Placeholder on N17 until Site operations supplies the record).

## In one hundred words

The open physical questions to 2031 are about timing and coincidence, not whether an asset exists. Helium reaches the United States magnet plant through a few hundred containers, one strait and one private pipeline system, and the first two uncertainties ask when the strait reopens and whether the domestic system holds while it is shut. The third asks whether a grid rating on paper becomes a blackout in a winter morning at either United States site. The China plant has not been checked. Ports, straits and air lanes move one or two risks each. Helium cover is the Placeholder that decides how much any of this matters.


### labor_p3_r1_summary.md

# Labor, phase 3, round 1, summary

## Key points

The labour uncertainty that moves the most of the eight risks is whether the magnet plant needs helium hands or cryocooler hands by 2031, because a shift to sealed magnets shrinks the liquefaction trades behind the helium cover, grows the vacuum and cryocooler trades, and leaves the cold head as the only thing keeping a magnet cold (N16, N05, N20, N19, N33; Panel judgement on the staffing, FDA K181479 and K253779 on the magnets).

Whether the two United States plants have the hands they need is an outcome of the state labour markets, which are tight on predetermined numbers, but the nearest trades run younger than the all-worker median nationally, so a cliff is a property of one roster and the middle direction, automation replacing leavers, is the one this lens sees least well (N16, N18, N20; BLS tables 18b and 11b, 2025; Wisconsin DWD and WEDC, Nov 2025).

If the United States magnet plant stopped, whether the China plant could wind its magnets with its own people turns on how much of the winding process is written in the design record rather than held in heads, which no public source describes (N16, N17, N20, N22; AI-suggested, Engineering and Human resources confirm).

The sole wire mill and sole cold-head maker sit in countries losing working-age people while their parents fill order books with fusion and quantum work, so a trade can be lost in one town without any stoppage being announced (N03, N05; Statistics Bureau of Japan, 1 Oct 2024; KfW, 1 Jul 2025; AI-suggested on each plant's headcount).

The 2030 longshore negotiation and the field force's replacement rate are dated watch items that move none of the eight risks but sit on the tolerance line (N25, N26, N33; ILA, 7 Feb 2025; BLS, 27 Aug 2026).

## In one hundred words

Seven labour uncertainties, none a strike. The one moving four of eight risks is which trades the magnet plant needs in 2031, because sealed magnets swap helium handling for cryocooler work and make the cold head the part that keeps every magnet cold. Two move three risks each: whether local markets or machines replace leavers at the United States plants, and whether the China plant could wind the Western Hemisphere's magnets if it had to. Supplier-town workforces at the wire mill and cold-head maker move two. Immigration moves one. The 2030 port talks and the field force move none.


### macroeconomic_p3_r1_summary.md

# Macroeconomic, phase 3, round 1, summary

## Key points

Whether squeezed United States hospitals cut, defer or pile up MR (magnetic resonance) orders on top of Europe's replacement wave sets the volume every single source must carry, and moves four of the eight screened risks (N18, N03, N05, N20; Panel judgement, causation).

The path of the policy rate, projected at 4.1 percent through 2027 and 3.2 in the longer run, and of the dollar, with the yen at 157.81 and the yuan at 6.70 on 2 October 2026, moves what imported wire and cold heads cost, which plant is cheaper to load and what helium cover costs to hold (N17, N03, N05, N19; Federal Reserve projections 16 Sep 2026, H.10 5 Oct 2026).

The price of a helium fill in 2028 and whether suppliers keep allocating healthcare first depend on a Qatari repair date that rests on one ministerial statement (N16, N17, N19; USGS Jan 2026, Panel judgement, outcomes).

A United States allocation or export rule on helium, with none proposed at the read date, would help the United States plant and starve the China plant by rule rather than price (N16, N17, N19; Panel judgement, actions, low confidence).

Whether the wire mill and cold-head parents keep MR a priority against fusion and physics work during a downturn rests on no retrieved balance sheet (N03, N05; AI-suggested, Sourcing confirms).

## In one hundred words

Two uncertainties move four risks each: what United States hospitals do with a 2.5 percent margin and a Medicaid cut in their 2027 capital plans, and where the dollar and policy rate go, which sets the cost of imported wire, cold heads and helium cover. Helium price and a possible United States allocation rule each move three risks through both plants and the cover at N19. Supplier exit under recession, the copper and chip tariffs, regional labour pricing and chip allocation follow. No hospital capital survey or supplier accounts were retrieved, so confidence on orders and suppliers is low.


### natural_disasters_p3_r1_summary.md

# Natural disasters, phase 3, round 1, summary

## Key points

The hazard that could breach 30 days behind the US magnet plant is not the headline hurricane but a Florence-class basin flood that cuts grid, road and helium trailer access at once, and whether the plant's flood class and backup power can take it is unconfirmed by Site operations (N16, N18, N19, N20, N24; AI-suggested).

A Taiwan earthquake or typhoon at the one foundry is the single natural event that reaches every magnet plant on the map at the same time, and the April 2024 magnitude 7.4 shock near Hualien shows the hazard is live even though the foundry's recovery time is not in my sources (N10, N16, N17, N18; USGS event us7000m9g4, 2 April 2024).

A Nankai Trough earthquake carries a 30-year probability now revised to roughly 60 to 90 percent, but whether the sole cold-head source sits in its zone is an address the OEM can find and the panel cannot (N05, N03, N16, N17; Headquarters for Earthquake Research Promotion, 26 September 2025).

Grid emergencies rated elevated in the Carolinas from 2027 and high in the Midcontinent from 2028 are a classification, not an event, and the ten-day Helene rebuild is the only measured recovery I can set against the helium cover (N16, N18, N19; NERC, 29 January 2026; Duke Energy, 30 September 2024).

Weather at a United States helium source now lands on a market with no Qatari slack, so a 2021-style plains winter storm would reach the line through helium cover rather than through any plant (N01, N19, N23; Panel judgement).

## In one hundred words

Weather alone has never closed any node on this map for 30 days, so my uncertainties are about correlation. Four risks move if a basin flood takes the US magnet plant's grid, roads and helium together; four move if a Taiwan earthquake stops the one foundry every system depends on; three move if a Nankai Trough event hits a cold-head source whose address nobody has confirmed; three move if a grid emergency outlasts the helium cover. Everything else moves one or two risks. Two internal facts, the plant's backup power and the Japanese addresses, decide how much of this is real.


### security_p3_r1_summary.md

# Security, phase 3, round 1, summary

## Key points

Whether an encryption event at one of the three sites or at the sole wire mill or cold-head maker stops the line for more than 30 days is the top uncertainty, because the only public recovery record (a vehicle maker restarting over five weeks, a brewer disrupted at 30 plants) is longer than the tolerance line and no source shows a tested manual fallback. N16, N17, N18, N03, N05, N19; Panel judgement on the inference, BleepingComputer 15 November 2025 and Food Ingredients First 18 March 2026 on the record.

Whether the single design and qualification record stays whole, available and trusted moves six of the eight risks, because every replacement time on the map assumes that record is intact, and the node map cannot both call it "not a tolerance breach on its own" and the thing that makes every replacement slow. N22, N16, N17, N18, N03, N05, N10; AI-suggested, Engineering and Quality and regulatory confirm.

A trusted sole supplier quietly letting process control drift while its parent fills fusion and physics order books is the failure this lens is built to miss, and it would surface only as ramp failures that consume helium and test slots. N03, N05, N19; Panel judgement, parent filings per phase 2 P18.

Strategic cargo theft and impersonation moving from consumer electronics to the inbound boards, coils and cold heads that feed the hub is a measured, rising trend with an unmeasured route into this product. N18, N30, N24, N05, N10, N31; Verisk CargoNet via SDCE 2026, Risk and Insurance 1 July 2026.

Deliberate use of pre-positioned access against the utilities feeding the two United States sites, counterfeit logic reaching the control boards during allocation, and China using its amended cyber law against the foreign-owned plant each move two or three risks and have no precedent in this run's sources. N16, N18, N19, N10, N17; Panel judgement, low confidence.

## In one hundred words

Two security uncertainties move six risks each and share one unknown: can the plants, the sole suppliers and the design record run for 30 days without their systems. The public recovery record for an encrypted manufacturer is five weeks or longer, past the tolerance line, but from other sectors. The design and qualification record is the single point of data behind every replacement time on the map. Below those sit a quietly degrading sole supplier, theft reaching inbound parts, pre-positioned access to utilities, counterfeit logic and Chinese legal pressure on the Asian plant. All resolve inside the OEM first.


### technology_shift_p3_r1_summary.md

# Technology shift, phase 3, round 1, summary

## Key points

The biggest open question is how fast sealed magnets take the OEM's new builds and whether the 3 tesla line converts, because that single decision-plus-outcome moves four of the eight screened risks at once by shrinking helium at both plants and raising the cold head's criticality (N16, N17, N19, N05; Panel judgement, AI-suggested on the OEM's order mix).

Whether helium stays a delivery risk at all turns on an unpublished engineering number, the litres consumed to cool down, ramp and test a sealed magnet before it is sealed, which decides if the plant's helium cover remains the eighth risk or drops to a service matter (N16, N17, N19, N34; Placeholder until Engineering sets it).

The uncertainty the phase 2 list misses is whether quantum or fusion export controls reach 4 kelvin cryocoolers or niobium-titanium wire, which could strand the China plant's supply of one or both without any tariff on finished scanners (N03, N05, N17; Panel judgement).

A magnet wound from something other than niobium-titanium must be cleared by 2028 to reach a tenth of new installs by 2031, and none appears in United States clearance records to October 2026 (N03, N20; openFDA product code LNH, read 11 October 2026).

The cold head's second source and the control logic's second fab are each the OEM's own choices to make and move one risk apiece (N05, N06, N10, N22; Panel judgement).

## In one hundred words

The sealed magnet is cleared and sold, so the technology question for 2031 is pace, not possibility. Adoption pace and the 3 tesla conversion decision move four screened risks at once. Whether helium stays a line risk depends on how much a sealed magnet still consumes at test, a number only the OEM holds. The wire and the cold head survive every version of the shift, and the uncertainty phase 2 missed is whether dual-use export controls on quantum and fusion parts sweep them in and strand the China plant. A non-niobium-titanium magnet matters only if cleared by 2028.


## The question for this round (phase 3, round 2)

Phase 3, round 2, convergence. You have now read the other ten lenses' round 1 summaries and the moderator's note, which groups sixty-two uncertainties into seven candidates C1 to C7 and proposes C1 and C2 as the axes. Do four things, briefly. First, name the two candidates you would put on the axes and say why in a few sentences, agreeing with or breaking the moderator's proposal; you may merge or reword a candidate but must keep it a question a product owner can read. Second, test independence: can each end of your first axis occur with each end of your second? Give one sentence per combination (four combinations). Third, give the uncertainty-by-risk table for your two axes and for C4, C5 and C7, marking which of the eight risks each moves and whether it moves whether the risk breaks or only what the break costs. Fourth, say where C4, C5 and C7 belong if not on an axis: a shared break every future carries (phase 6a), a watch item, or a modifier on one future. Correct anything in your own round 1 transcript that another lens has shown to be wrong, naming the lens. No new research: use only sources already carried in the phase 2 and phase 3 material. Keep the full transcript under 700 words.

## What to produce

 Write the full transcript, then the summary, exactly in the format COMMON.md gives. Begin the full transcript with the line `# <lens name>, phase 3, round 2` and the summary with the line `# <lens name>, phase 3, round 2, summary`. Target paths: full transcript `scenarios/MR-CONV-2031/conversations/foreign_trade_payments_p3_r2_full.md`, summary `scenarios/MR-CONV-2031/conversations/foreign_trade_payments_p3_r2_summary.md`. If you can write files, write them there; if you cannot, print the full transcript, then a line containing only `=====SUMMARY=====`, then the summary.
