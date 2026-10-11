You are one lens on a scenario panel for a medical imaging OEM. Your dossier, the rules, the scope packet, the node map and the risk screen follow. Then the question for this round.

## Your dossier

# Lens: Labor

## Identity

You are a labour economist who has advised manufacturers on skilled trades for twenty-five years. You know that a plant is a set of people who know how to do something that is not written down. You read apprenticeship completions, retirement curves, strike histories and visa rules the way others read order books. You refuse to be impressed by headcount; you ask how many of them can wind a magnet, and how old they are.

## The OEM's definition of your category

Labor threats, reviewed per process, supplier or vendor and logistics node: shortage of skilled trades, strikes and work stoppages at plants, ports and carriers, ageing workforces and retirement cliffs, migration and visa rules that limit hiring, and the loss of tacit knowledge when a line moves.

## Frameworks and vocabulary

Tacit versus codified knowledge. Time to competence by trade. Retirement curves and replacement ratios. Union density and contract cycles. Labour market tightness by region. Migration and visa regimes for skilled trades. Port and carrier labour contract calendars.

## Questions you always ask

- Which trades on this map take more than a year to train, and what is the age profile of the people who hold them?
- When do the labour contracts at the plants, the port and the main carriers expire, and what happened last time?
- Which supplier on the map depends on a small skilled workforce in one town?
- What does the local labour market look like for the trades the plants need, and who else is hiring them?
- What knowledge would be lost if a line moved, and how long would it take to rebuild?

## Blind spots you carry

You see people and miss automation. You overrate the strike that never comes and underrate the slow loss of a trade nobody tracked. You underweight how quickly a plant can retrain when it has to.

## Research instructions

Primary sources: labour statistics offices, apprenticeship and vocational data, union contract calendars and strike records, port labour agreements, migration and visa rules for skilled trades, industry workforce surveys. Cite with link and date.

## Where to look on the map

The US plant trades N20; field engineers N33; the plants N16, N17 and N18; the coil plant N14; the one export port N26 and the oversize carriers N25; the wire mill N03 and cold-head maker N05 as small skilled workforces; rigging contractors N32.

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

### P2-predetermined.md

# Phase 2: what is already certain by 2031

Moderator synthesis of eleven lens transcripts (round 1, isolated). Full transcripts and sources are in `../conversations/*_p2_r1_full.md`. Read date 11 October 2026.

## Bottom line

Most of the border rules, the hazard classifications and the demographic facts that will shape this line to 2031 are already written. The single biggest finding is not a threat but a correction to the scope packet: the question "will a magnet that needs no helium be approved?" is already answered. Sealed, helium-light 1.5 tesla magnets are cleared products with service history at three makers, including the OEM's own platform since February 2026. The second axis in the scope packet must be rebuilt in phase 3. The helium story also splits in two: for new builds helium shrinks to a service and installed-base risk, while for the world market helium is tighter for the whole horizon because Qatar's plant is impaired and the Gulf strait is near closed at the read date.

## Predetermined elements, by threat category

Each line is a fact already in motion, the nodes it reaches, the source, and what would have to happen for it not to hold.

| # | Element | Nodes | Source (date) | What would unmake it |
|---|---|---|---|---|
| P1 | Sealed, helium-light 1.5 tesla magnets are cleared products at three makers, cleared for the OEM's own platform on 5 February 2026. They still use niobium-titanium wire and a Gifford-McMahon cold head. | N01, N03, N05, N19, N21, N34 | FDA K181479 (3 Aug 2018), K253779 (5 Feb 2026); technology lens | A safety recall of the sealed class, or the OEM choosing not to convert its 3 tesla line. The conversion decision is the OEM's, not the world's. |
| P2 | No 1.5 or 3 tesla magnet without niobium-titanium wire appears in United States clearance records to October 2026, and a new wire mill takes about 18 months to qualify, so wire stays the single most design-locked input through 2031. | N02, N03, N22 | openFDA read 11 Oct 2026; technology lens | A high-temperature superconductor magnet cleared before 2028 and adopted at pace; no lens found evidence of either. |
| P3 | Helium is a four-state market (United States 81, Qatar 63, Russia 18, Algeria 11 of 190 million cubic metres in 2025). Qatar's Ras Laffan complex was struck in March 2026, the energy minister put repairs at three to five years, Russian helium is barred from the United States and the European Union and self-licensed to 31 December 2027, Chinese helium is under an export ban with no end date, and the United States federal reserve was sold to a private firm on 27 June 2024. There is no public buffer anywhere. | N01, N19, N23, N27, N34 | USGS (Feb 2026); BLM (27 Jun 2024); Global Trade Alert; QatarEnergy statement via IOM3 (23 Mar 2026); geopolitical, financial, macroeconomic, infrastructure, foreign trade lenses | Qatari helium units restarting much sooner than the minister's estimate. The macroeconomic lens notes a 6 March 2026 satellite analysis saying main equipment was intact and no producer disclosure confirms the helium units were hit. The repair timing is therefore moved to the uncertain list (U-H1). |
| P4 | The United States magnet plant sits inside the only helium producer that is a net exporter. Qatar's share of United States helium imports fell from 40 to 28 percent and Canada's rose from 36 to 47 percent across the 2020 to 2024 windows, and the base price fell. The United States plant and the China plant face different helium worlds. | N01, N16, N17, N19 | USGS (Jan 2025, Feb 2026); contrarian, geopolitical lenses | A United States export control or allocation rule on helium, or a Cliffside or Hugoton outage coinciding with the Gulf outage. |
| P5 | Helium moves in a fleet of roughly 500 to 700 40-foot ISO containers that hold liquid for about 35 to 48 days, with one maker behind most of them. | N23, N19 | Linde product page (read 11 Oct 2026); consultancy analysis (1 Apr 2026), AI-suggested on fleet size | A second container maker at scale, or a shift to air-shipped dewars; neither found. |
| P6 | Niobium is 93 percent Brazilian from one family-controlled private producer; the United States is wholly import dependent; China takes 49 percent of Brazil's ferroniobium exports. Leverage on wire sits with one producer state and one dominant buyer and reaches the OEM through the mill, not the ore. | N02, N03 | USGS (Feb 2026); geopolitical, financial, foreign trade lenses | A Canadian or other second producer at scale before 2031; none is on a published schedule. |
| P7 | United States import duties on wire, cold heads, logic, memory and graphics rest on Section 232 and Section 301 measures with no expiry after the Supreme Court ended emergency-power tariffs on 20 February 2026: 10 percent combined for the European Union, United Kingdom, Taiwan and Canada, 12.5 percent for Japan, South Korea, China and Brazil from 24 July 2026. A 50 percent tariff on the copper content of worked copper has applied since 1 August 2025. Magnet-grade niobium-titanium wire in a copper matrix sits outside the copper annex and outside the control lists. | N03, N04, N05, N08, N10, N11, N12, N31 | Federal Register (5 Aug 2025); Supreme Court (20 Feb 2026); EY (Jul 2026); foreign trade, macroeconomic, contrarian lenses | A trade deal that removes Section 232 measures, or a reclassification of the wire into the copper annex. The wire classification is AI-suggested; Sourcing confirms the declared code. |
| P8 | The Section 232 investigation into medical equipment opened on 2 September 2025 names MRI machines in scope, and no proclamation had followed by 11 October 2026. The tools for restricting trade in finished scanners exist and are court-proof; whether they are used, and at what rate, is open. | N18, N31, N35 | Federal Register (26 Sep 2025); customer, contrarian lenses | Not unmakeable as a tool. The outcome is uncertain (U-T1). |
| P9 | The European Union has excluded Chinese-origin medical devices from public tenders at or above 5 million euros since 30 June 2025 with no expiry, and China barred European Union firms from imported-device procurement above 45 million yuan from 6 July 2025 while exempting products made in China. The China plant keeps Asian market access that a United States-built scanner loses, and is not a backup for Europe. | N17, N28, N29, N36 | Regulation (EU) 2025/1197 (20 Jun 2025); CMS (Jul 2025); customer, geopolitical lenses | Repeal of either measure; neither carries a sunset. Which plant serves which market is AI-suggested; the S&OP council confirms. |
| P10 | Cyber duties with dates inside the horizon are law: United States device cyber law since March 2023 with final guidance February 2026; the European Union Cyber Resilience Act reporting from 11 September 2026 and full application 11 December 2027 for bought-in electronics; the United States Coast Guard port cyber plan deadline 16 July 2027; Japan mandatory reporting from 1 October 2026; China's amended law from 1 January 2026. | N08 to N12, N15, N17, N22, N26 | Cornell LII; EUR-Lex 2024/2847; National Law Review (28 Jan 2025); security lens | Repeal; none scheduled. |
| P11 | An encrypted manufacturer takes five weeks or longer to restart on the 2025 record, which is past the 30-day tolerance line. Programmable logic was the most reported counterfeit part class in 2025 at more than 15 percent of reports. Cargo theft hit 2,646 confirmed incidents in 2025 with electronics the most targeted type. | N03, N05, N10, N16, N17, N18, N30 | BleepingComputer (15 Nov 2025); ERAI 2025 report; Verisk CargoNet (2026); security lens | The recovery figure comes from a vehicle maker and a brewer, not a magnet maker; the inference to this line is Panel judgement. |
| P12 | The United States manufacturing workforce had a median age of 43.9 in 2025, about a quarter is 55 or older, and the cohort turning 65 between 2025 and 2027 is the largest on record. Union density in South Carolina (2.8 percent) and Wisconsin (6.4 percent) sits far below the national rate, so slow attrition of untracked trades is the likelier labour failure, not a strike. Japan and Germany, home to the sole cold-head and wire sources, are shrinking their working-age populations through the 2030s. | N03, N05, N16, N18, N20 | BLS tables 18b and 11b (2025); BLS union tables (2025, 2026); Statistics Bureau of Japan (2024); KfW (1 Jul 2025); labor lens | The contrarian notes welders' median age (39.3) is below the all-worker median, so the "retirement cliff" is a property of one roster, not of the trade. The OEM's roster age is AI-suggested; Human resources confirms. |
| P13 | The East Coast longshore master contract covering the export port runs to 30 September 2030 with automation protections; the last stoppage (October 2024) lasted three days. The port's hurricane closures are two to three days on its own logs; the closure class that breaches 30 days is a blocked channel (Baltimore, 11 weeks in 2024). The port has spare berth after suspending its newest terminal on 1 August 2026. | N25, N26 | ILA (7 Feb 2025); SC Ports Authority (2019, 2024); Maritime Executive (25 Jun 2026); labor, infrastructure, natural disasters lenses | A channel blockage is a low-base-rate event with no schedule. Which terminal the oversize crates use is unconfirmed; Logistics confirms. |
| P14 | Grid recovery after an inland storm in South Carolina ran about ten days after Helene (2024). The reliability body rates the Carolinas grid elevated from 2027 with winter-morning risk and the Midcontinent grid high from winter 2028 on coal retirements and contracted data-centre load. The Pee Dee basin behind the magnet plant had three 100-year rainfall events in 2015 to 2018, and the design rainfall that continuity plans use will be rewritten no earlier than September 2027. | N16, N18, N19, N21 | Duke Energy (30 Sep 2024); NERC Long-Term Reliability Assessment (29 Jan 2026); SC State Climatology Office; NOAA | Grid investment ahead of schedule. The plant's dependence on grid power for liquefaction is AI-suggested; Site operations confirms. |
| P15 | The hazard classification over the Japanese cold-head source rose in September 2025 (Nankai Trough 30-year probability revised to roughly 60 to 90 percent or higher), and the China plant's city is a named subsidence hotspot with an unexplained 80 to 160 centimetre sea surge in October 2024. | N05, N06, N17, N29 | Headquarters for Earthquake Research Promotion (2024, 2025); Science via Asia Times (2024) | Plant locations are AI-suggested; Engineering and Site operations confirm. |
| P16 | Memory makers roughly tripled DRAM contract prices across 2026 and are allocating capacity to AI and server buyers under agreements reported to run into 2028, and mature-node capacity moves partly out of Taiwan by 2028. The 25 percent Section 232 chip tariff of 15 January 2026 exempts non-data-centre industrial uses. | N10, N11, N12 | TrendForce (2 Feb, 8 Jul, 30 Sep 2026); Counterpoint (23 Jan 2026); EY (15 Jan 2026) | Allocation easing before 2028; the duration is Panel judgement. The exemption's application to reconstruction processors is AI-suggested; Sourcing confirms. |
| P17 | The Federal Reserve policy rate is 3.75 to 4.00 percent (September 2026) with 4.1 percent projected through 2027; producer prices are up 5.4 percent a year; United States hospital margins are 2.5 percent year to date; Medicaid phases down from fiscal 2028 to 2032 by statute; Medicare 2026 rates carry a productivity cut. More than a quarter of Europe's MRI installed base was over ten years old in 2023 and every magnet installed 2016 to 2021 passes that line by 2031. | N19, N35, N36 | Federal Reserve (16 Sep 2026); BLS (10 Sep 2026); Kaufman Hall (27 Aug 2026); HANYS (Oct 2025); COCIR (2023) | Rate cuts or reimbursement reversal; replacement need is fixed, orders are not. |
| P18 | The one United States cryocooler maker was bought in March 2023 by a quantum-cryogenics company that does not list MR among its markets, and the Western wire mills belong to listed parents whose superconductor order books are filling with fusion and physics work. | N03, N05, N06 | Bluefors (28 Mar 2023); Bruker 10-K FY2025; financial lens | A buyer or parent reaffirming MR supply; the OEM's qualified mill is AI-suggested; Sourcing confirms. |
| P19 | No public tender framework retrieved scores delivery reliability explicitly; the English NHS ties purchasing to its net zero commitment before 2030, which brings helium and service carbon into scoring. | N33, N34, N36 | NHS England (Oct 2020); customer lens | A published reliability score; none found. The cost of a late delivery is paid through re-tender behaviour, which is Panel judgement. |

## Contradictions between lenses, and how they are resolved

1. **Is Qatari helium out for years or not?** Five lenses treat the three-to-five-year repair as predetermined; the macroeconomic lens found a satellite analysis saying main equipment was intact and no producer disclosure that the helium units were hit; the contrarian found that United States imports had already shifted toward Canada. Resolution: the strait closure and the force majeure are facts at the read date; the repair duration is an uncertainty (U-H1) and the United States plant's exposure runs through world price and the Asian plant more than through its own supply.
2. **Is the technician cliff real?** The labor lens calls the retirement wave predetermined; the contrarian shows the welding trade is younger than the average worker. Resolution: the demographic wave is predetermined for manufacturing as a whole; whether it hits this plant depends on one roster, so N20 stays on the risk list as AI-suggested with Human resources named.
3. **Is helium-free an uncertainty?** The scope packet treated it as one; the technology lens and the contrarian show the sealed class is cleared and sold. Resolution: dimension B is withdrawn. What remains open is adoption pace, the OEM's own conversion decision (which is an action, not an external uncertainty), and what sealed magnets do to the cold head's criticality.
4. **Is the port the weak point?** The screen dropped the port; the infrastructure and labor lenses both found a quiet labour calendar and short hurricane closures. Resolution: the port stays off the top eight; a channel blockage is the only 30-day class and it has no schedule.

## What is open for phase 3

- U-H1: how long Qatari helium stays impaired and when Hormuz reopens (outcomes).
- U-T1: whether the Section 232 medical-equipment investigation produces a tariff on finished scanners, at what rate, and whether the United States-China truce survives the 2027 sourcing cycle (outcomes).
- U-T2: whether wider chip tariffs, mineral price floors and the refined copper duty land (outcomes).
- U-S1: whether a wire mill or the cold-head maker exits MR through sale, allocation to fusion and physics, or parent decision (outcomes, with a causation element: is MR a priority for the parent).
- U-G1: whether Taiwan Strait grey-zone pressure becomes interdiction of the Asian lanes and the foundry (outcomes).
- U-A1: how fast sealed magnets take the installed base and the 3 tesla line, and what that does to the cold head and to service helium (actions mixed with outcomes).
- U-C1: whether hospital margin pressure cuts orders or only delays them, and whether delivery reliability becomes a scored tender criterion (value).
- U-L1: whether the magnet plant's roster carries a retirement cliff (an internal fact to confirm, not an external uncertainty; passed to the baseline).

## Gaps the lenses reported

The shared web search budget ran out during this round, so several lenses finished on direct fetches of known addresses. Unverified: the wire mill and cold-head plant locations (N03, N05), the China plant's power and port record (N17), the sealed-magnet installed-base count, QatarEnergy's own force majeure notice, and the United States semiconductor tariff rate as applied to reconstruction processors. These are carried into phase 3 as facts to treat at low confidence.

## Checks

All eleven transcripts and summaries exist with the required first lines. `lint:names` passes. Every element above names node ids. No recommendations were found in the transcripts. Two transcripts run slightly over 1,200 words; kept.


### labor_p2_r1_full.md

# Labor, phase 2, round 1

## Analysis

Bottom line first. The US manufacturing workforce is in its mid-forties and its oldest cohort retires inside the horizon; the Charleston longshore contract expires on 30 September 2030; union density at both US plant states is near the national floor, so quiet attrition is a likelier labour failure than a strike; and US skilled immigration is restricted and litigated, so hiring at the plants rests on the local market and on retraining.

**Element 1: the US manufacturing workforce is middle-aged and its oldest cohort retires inside the horizon.** The Bureau of Labor Statistics (BLS) gives a 2025 median age of 43.9 years for manufacturing employees and 43.9 for medical equipment manufacturing, against 42.1 for all industries ([BLS table 18b, 2025](https://www.bls.gov/cps/cpsaat18b.htm)). A secondary tabulation of the same survey puts about 26 percent of manufacturing workers at 55 or older ([manufacturingleadgeneration.com, 2026](https://manufacturingleadgeneration.com/manufacturing-workforce-age-statistics/)), and about 4.1 million Americans a year turn 65 from 2024 to 2027, the largest flow on record ([AARP, 2023, quoting Social Security Administration projections](https://www.aarp.org/retirement/planning-for-retirement/info-2023/silver-tsunami-late-boomers-turn-65.html)). This touches N20, N16, N18, N14 and N07. The share of the OEM's winding and cryogenic technicians in the oldest cohort is AI-suggested; Human resources can confirm it from the roster. Nothing breaks this; retention past 65 or faster retraining could blunt it.

**Element 2: demand for manufacturing workers outruns supply at both plant regions for the whole horizon.** Deloitte and the Manufacturing Institute projected in April 2024 that US manufacturing could need 3.8 million workers by 2033 with 1.9 million roles unfilled ([ASME summary, April 2024](https://www.asme.org/topics-resources/content/manufacturing-faces-critical-gaps)). Wisconsin lost about 9,500 manufacturing jobs in the year to January 2026, attributed more to retirement than to layoffs ([WPR, 4 May 2026](https://www.wpr.org/news/wisconsin-lost-thousands-of-manufacturing-jobs-in-2025)), and projects a labour gap of 294,000 workers by 2032 ([Wisconsin DWD and WEDC, November 2025](https://www.dwd.wisconsin.gov/workforce-solutions/wig/pdf/dec25-wedc-dwd-workforceinnovationgrantreport-career-pathways.pdf)). South Carolina manufacturers expect to seek about 4,800 assembly workers, 3,500 maintenance workers and 2,300 equipment mechanics over five years ([SC Daily Gazette, February 2026](https://scdailygazette.com/?p=12324)), while a vehicle plant near Columbia hires toward 4,000 and local employers describe competition "in a way never seen before" ([Post and Courier, 3 September 2023](https://www.postandcourier.com/columbia/business/scout-motors-prompting-paradigm-shift-to-build-up-columbia-area-workforce/article_92e892dc-4689-11ee-88ed-eb883d839e86.html)). This touches N20 and N18. Panel judgement: the OEM competes for electricians and mechanics with vehicle and battery plants, while the magnet trades have no outside market, so nobody poaches a winder and nobody trains one either. A deep recession, or automation that removes roles faster than people leave, would break this.

**Element 3: the Charleston longshore contract runs to 30 September 2030.** The International Longshoremen's Association (ILA) and United States Maritime Alliance (USMX) master contract was ratified on 25 February 2025, is retroactive to 1 October 2024 and expires 30 September 2030, with what the union calls full protection against automation ([ILA, 7 February 2025](https://ilaunion.org/?p=8780); [Progressive Railroading, 27 February 2025](https://www.progressiverailroading.com/intermodal/news/Longshoremen-ratify-6-year-contract-with-USMX--73982)). The October 2024 strike lasted three days. For N26 the port labour calendar is quiet until mid-2030 and live for the last fifteen months of the horizon. Separately, the state port authority and the local union agreed in June 2024 a framework to reopen a container terminal idle since 2021 over who runs the cranes ([Live 5 News, 26 June 2024](https://www.live5news.com/2024/06/26/sc-ports-union-come-agreement-reopen-hugh-leatherman-terminal)); I have not verified that it reopened, and Logistics can confirm which terminal the magnet crates use. An early reopener or a wildcat action would break the calendar; both are rare in this union.

**Element 4: union density at both plant states is near the national floor.** South Carolina's membership rate was 2.8 percent in 2024, third lowest nationally, with private-sector density of 1.5 percent ([BLS Southeast, 28 February 2025](https://www.bls.gov/regions/southeast/news-release/2025/unionmembers_southcarolina_20250228.htm); [SC DEW, April 2025](https://dew.sc.gov/labor-market-information-blog/2025-04/private-sector-unionization-rates-selected-states-2025-update)). Wisconsin's was 6.4 percent in 2025, down from 14.2 percent in 2010 ([BLS Midwest table, 2026](https://www.bls.gov/regions/midwest/data/unionmembershiphistorical_wisconsin_table.htm)), against 10.0 percent nationally and 5.9 percent in the private sector ([BLS TED, 24 April 2026](https://www.bls.gov/opub/ted/2026/union-membership-rate-10-0-percent-in-2025.htm)). Whether the OEM's N16 and N18 workforces are organised is AI-suggested, for Human resources to confirm. Panel judgement: a bargaining stoppage at either plant is a low-base-rate event through 2031, and the risk screen's "a strike stops the line" overweights it relative to attrition. Density trends reverse only over decades.

**Element 5: US skilled immigration is restricted on paper and litigated in practice.** A proclamation of 19 September 2025 placed a 100,000 dollar payment on new H-1B (specialty occupation) petitions for beneficiaries abroad; it was extended on 18 September 2026 to 21 September 2027, while a federal court vacated the implementing policy in June 2026 and the appeals court refused a stay in July 2026, so the fee is not being collected ([Mintz, 23 September 2026](https://www.mintz.com/insights-center/viewpoints/2806/2026-09-23-presidential-proclamation-extends-100k-h-1b-fee); [Fragomen, September 2026](https://www.fragomen.com/insights/united-states-president-trump-extends-dollar100000-h-1b-fee-but-policy-currently-vacated-by-court-order.html)). The route matters for magnet and cryogenic engineers at N22 and N16 more than for technicians at N20 or field engineers at N33. What is settled is a restrictive and unstable policy direction; the proclamation lapsing in 2027 would break it.

**Element 6: the wire and cold-head supplier countries are shrinking their working-age populations.** Japan's population aged 15 to 64 was 73.7 million, 59.6 percent of a total that fell by 550,000 in the year to 1 October 2024 ([Statistics Bureau of Japan, 2024](https://www.stat.go.jp/english/data/jinsui/2024np/index.html)). Germany's 15 to 64 population fell by 2.4 million between 1995 and 2022 and drops a further 3.5 million by 2050 in KfW's base case, with baby boomers retiring through the early 2030s ([KfW Research Focus 505, 1 July 2025](https://www.kfw.de/PDF/Download-Center/Konzernthemen/Research/PDF-Dokumente-Fokus-Volkswirtschaft/Fokus-englische-Dateien/Fokus-2025-EN/Focus-No.-505-July-2025-Skills-shortage.pdf)). This touches N03 and N05. The mills' actual headcount and age profile are AI-suggested, for Sourcing to confirm on a supplier visit.

**Element 7: field service and rigging draw on replacement-heavy trades.** BLS projects medical equipment repairer employment to grow 13 percent from 2025 to 2035 from about 71,800 jobs, with about 8,200 openings a year, most of them replacement ([BLS Occupational Outlook Handbook, 27 August 2026](https://www.bls.gov/ooh/installation-maintenance-and-repair/medical-equipment-repairers.htm)). For N33 the pool loses roughly one worker in nine each year. For N32, the construction trade body puts demand at 349,000 net new workers in 2026 and 456,000 in 2027, most of it retirement-driven ([Construction Dive, 28 January 2026](https://www.constructiondive.com/news/labor-demand-gap-shrinks-abc-construction-staff/810681/)).

## Critical factors

The age structure of N20 decides whether the magnet line's labour holds, because the trade takes eighteen months to replace and has no external market. The 2030 port contract is the one dated event. Regional tightness sets the price and speed of every backfill. Confidence is high on the public demographics and contract dates and low on how they map onto the OEM's roster, because nothing internal has been seen.

## Predetermined versus uncertain

Predetermined: the seven elements above.

Genuinely uncertain, listed for phase 3 without analysis: whether the OEM's N20 roster is older or younger than the industry median (outcome); whether the N03 wire mill and N05 cold-head maker each depend on one town's small skilled workforce (causation); whether the 2030 ILA negotiation produces a stoppage longer than three days (outcome); whether the H-1B fee survives appeal and whether Japan and Germany widen or narrow skilled-trade visas (actions); whether automation at N16 and N18 removes trades faster than people leave (causation); how much winding knowledge is codified in N22 rather than held in heads at N16 (value); and China's working-age trend at N17, unsourced this round.

## Contradictions with other lenses

No other summaries exist yet in round 1. The tension I expect is with any lens that reads "strike" at N16 as the main labour threat; my reading is attrition, and the plant's union status and age roster would settle it.

## Blind spots of this lens

I see people and miss automation, and the Wisconsin and South Carolina sources both say employers are replacing retirees with machines. I lean on the strike that never comes at N26. I could not reach a primary source on the Charleston terminal reopening, on China's working-age population, or on the H-1B litigation beyond law-firm summaries.

## Sources

- BLS, Employed persons by detailed industry and age, 2025 annual averages: https://www.bls.gov/cps/cpsaat18b.htm
- BLS Southeast, Union membership in South Carolina 2024, 28 February 2025: https://www.bls.gov/regions/southeast/news-release/2025/unionmembers_southcarolina_20250228.htm
- SC Department of Employment and Workforce, private-sector unionisation update, April 2025: https://dew.sc.gov/labor-market-information-blog/2025-04/private-sector-unionization-rates-selected-states-2025-update
- BLS Midwest, Wisconsin union membership historical table, 2026: https://www.bls.gov/regions/midwest/data/unionmembershiphistorical_wisconsin_table.htm
- BLS TED, Union membership rate 10.0 percent in 2025, 24 April 2026: https://www.bls.gov/opub/ted/2026/union-membership-rate-10-0-percent-in-2025.htm
- BLS Occupational Outlook Handbook, Medical equipment repairers, modified 27 August 2026: https://www.bls.gov/ooh/installation-maintenance-and-repair/medical-equipment-repairers.htm
- ILA, Wage Scale Committee endorsement and term, 7 February 2025: https://ilaunion.org/?p=8780
- Progressive Railroading, Longshoremen ratify six-year contract, 27 February 2025: https://www.progressiverailroading.com/intermodal/news/Longshoremen-ratify-6-year-contract-with-USMX--73982
- Live 5 News, SC Ports and union agreement on Leatherman terminal, 26 June 2024: https://www.live5news.com/2024/06/26/sc-ports-union-come-agreement-reopen-hugh-leatherman-terminal
- Mintz, Proclamation extends 100k H-1B fee, 23 September 2026: https://www.mintz.com/insights-center/viewpoints/2806/2026-09-23-presidential-proclamation-extends-100k-h-1b-fee
- Fragomen, H-1B fee extended but vacated by court order, September 2026: https://www.fragomen.com/insights/united-states-president-trump-extends-dollar100000-h-1b-fee-but-policy-currently-vacated-by-court-order.html
- Statistics Bureau of Japan, Population estimates as of 1 October 2024: https://www.stat.go.jp/english/data/jinsui/2024np/index.html
- KfW Research, Focus on Economics No. 505, 1 July 2025: https://www.kfw.de/PDF/Download-Center/Konzernthemen/Research/PDF-Dokumente-Fokus-Volkswirtschaft/Fokus-englische-Dateien/Fokus-2025-EN/Focus-No.-505-July-2025-Skills-shortage.pdf
- Wisconsin DWD and WEDC, Workforce Innovation Grant report, November 2025: https://www.dwd.wisconsin.gov/workforce-solutions/wig/pdf/dec25-wedc-dwd-workforceinnovationgrantreport-career-pathways.pdf
- WPR, Wisconsin lost thousands of manufacturing jobs in 2025, 4 May 2026: https://www.wpr.org/news/wisconsin-lost-thousands-of-manufacturing-jobs-in-2025
- SC Daily Gazette, SC manufacturing economy continues to grow, February 2026: https://scdailygazette.com/?p=12324
- Post and Courier, Scout Motors prompting paradigm shift, 3 September 2023: https://www.postandcourier.com/columbia/business/scout-motors-prompting-paradigm-shift-to-build-up-columbia-area-workforce/article_92e892dc-4689-11ee-88ed-eb883d839e86.html
- ASME summary of Deloitte and Manufacturing Institute study, April 2024: https://www.asme.org/topics-resources/content/manufacturing-faces-critical-gaps
- Construction Dive, ABC labour demand 2026 and 2027, 28 January 2026: https://www.constructiondive.com/news/labor-demand-gap-shrinks-abc-construction-staff/810681/
- AARP, Late boomers turn 65 (secondary, quoting Social Security Administration), 2023: https://www.aarp.org/retirement/planning-for-retirement/info-2023/silver-tsunami-late-boomers-turn-65.html
- manufacturingleadgeneration.com, manufacturing workforce age statistics (secondary, citing BLS), 2026: https://manufacturingleadgeneration.com/manufacturing-workforce-age-statistics/


## The question for this round (phase 3, round 1)

Phase 3, critical uncertainties, round 1 (isolated). Phase 2 is done; its synthesis is attached and it withdrew the scope packet's second dimension (helium-free magnets are already cleared products). For the nodes your lens can reach, what could plausibly go two or more ways by 2031 and would change whether the line delivers inside the tolerance line? Start from the open list in the phase 2 synthesis but add what your lens sees that it misses. For each uncertainty: name it as a question a product owner can read without a glossary; say which of the eight risks in 02-risk-screen.md it moves and how; say which kind of not-knowing it is (actions, outcomes, causation, value); give the two or three directions it could go; say why it is uncertain rather than predetermined; and name the observable thing that would show it resolving, with where it is published. Rank your uncertainties by how many of the eight risks they move at once. End the full transcript with a table: one row per uncertainty, columns for the eight risks (R1 to R8 in the screen's order), a mark where it moves that risk, and the count. Research note: the shared web search budget for this run is spent. Work from the phase 2 transcripts, which carry sources, and from direct fetches of known addresses where you need a date or a figure. Do not invent sources.

## What to produce

Do the research with web search before you write. Every fact carries a link and a date. Write the full transcript, then the summary, exactly in the format COMMON.md gives. Begin the full transcript with the line `# <lens name>, phase 3, round 1` and the summary with the line `# <lens name>, phase 3, round 1, summary`. Target paths: full transcript `scenarios/MR-CONV-2031/conversations/labor_p3_r1_full.md`, summary `scenarios/MR-CONV-2031/conversations/labor_p3_r1_summary.md`. If you can write files, write them there; if you cannot, print the full transcript, then a line containing only `=====SUMMARY=====`, then the summary.
