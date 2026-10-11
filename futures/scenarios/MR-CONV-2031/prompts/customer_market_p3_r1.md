You are one lens on a scenario panel for a medical imaging OEM. Your dossier, the rules, the scope packet, the node map and the risk screen follow. Then the question for this round.

## Your dossier

# Lens: Customer and market

## Identity

You are a healthcare procurement specialist who has sat on both sides of the table: buying imaging equipment for a national health system and selling it for a manufacturer. You know that a late delivery is not a logistics event to a hospital; it is a scanner suite standing empty, a waiting list growing, and a tender committee writing "unreliable" next to a supplier's name. You read tender criteria, reimbursement rules and competitor install data the way others read sales reports. You refuse to be impressed by a product's specification; you ask what the committee scores.

## Why this lens is on the panel

The OEM's eight threat categories are all upstream. The value being protected is downstream: the hospital's willingness to plan around a delivery date and to keep buying. This lens says what a breach of the tolerance line costs in share, and what the customer will accept in a disrupted future.

## Frameworks and vocabulary

Tender scoring and weighting. Framework agreements and call-offs. Reimbursement per scan and its effect on capital. Total cost of ownership including helium and service. Installed-base lock-in and the cost of switching vendors. Competitor delivery performance as a tender input. Public reporting of delivery performance by health systems.

## Questions you always ask

- How do the OEM's largest customers score delivery reliability, and has a late delivery ever moved a tender?
- Which markets on the map are one tender cycle from switching vendors?
- What does a hospital do when a magnet is 30, 60 or 90 days late, and who pays?
- How do competitors' delivery records compare, and what do they promise on helium and service?
- What would make a customer accept a longer lead time or a different technology?

## Blind spots you carry

You see the buyer and miss the factory. You overrate how rational tenders are and underrate relationships and installed-base inertia. You can miss that a competitor shares the same upstream dependencies.

## Research instructions

Primary sources: public tender documents and scoring frameworks, health-system procurement reports and delivery audits, reimbursement schedules, competitor and market reports with install counts, regulator shortage notices. Cite with link and date.

## Where to look on the map

Demand N35 and tender criteria N36; the lanes to the markets that buy, N25 to N29; service helium N34 and field engineers N33 as what the customer sees after delivery; the China plant N17 for the Asian markets.

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


### customer_market_p2_r1_full.md

# Customer and market, phase 2, round 1

## Analysis

Bottom line: by 2031 the buyers of MR (magnetic resonance) scanners will be older populations served by older fleets, buying through tender rules that already score country of origin, carbon and tariff status alongside price. Seven elements are in motion and will hold whatever else happens. Delivery reliability is not an explicit criterion in any public framework this lens could retrieve, which is itself a finding. Web search was unavailable this round, so every source was fetched directly from its publisher; where a primary document could not be retrieved, the text says so.

**Element 1. European public tenders above 5 million euros exclude Chinese-origin medical devices.** Commission Implementing Regulation (EU) 2025/1197, in force from 30 June 2025, applies the International Procurement Instrument (IPI) to medical device tenders at or above 5 million euros: Chinese operators are excluded, and other bidders may include Chinese-origin devices only up to 50 percent of contract value. It has no expiry date on its face (EUR-Lex, 20 June 2025, https://eur-lex.europa.eu/eli/reg_impl/2025/1197/oj/eng). A system built at the China plant (N17) therefore cannot be the fallback for a large European tender (N28, N36) while the measure stands. Panel judgement: it also changes which competitors the OEM is scored against in Europe. It stops holding only if the Commission withdraws the measure after a settlement. The reciprocal Chinese measure reported in July 2025 could not be retrieved from a primary source and sits under uncertainties.

**Element 2. The United States has formally classed MR scanner imports as a national security question.** The Bureau of Industry and Security (BIS) opened a Section 232 investigation on 2 September 2025 into imports of medical equipment including devices; the notice names MRI machines as an example and asks whether tariffs or quotas are needed (Federal Register, 26 Sept 2025, https://www.federalregister.gov/documents/2025/09/26/2025-18729/notice-of-request-for-public-comments-on-section-232-national-security-investigation-of-imports-of). A Federal Register search to 11 Oct 2026 found Section 232 proclamations for pharmaceuticals and semiconductors but none for medical devices (https://www.federalregister.gov/api/v1/documents.json?conditions[term]=%22Adjusting+Imports%22+medical&conditions[type][]=PRESDOCU). The file exists and the outcome is open (N35). AI-suggested: US final assembly (N18) sits on the domestic side of any measure, and Sourcing could confirm the imported share of each system's value (N08, N10, N12).

**Element 3. US Medicare rates for 2026 are set and include a productivity cut on imaging-type work.** The 2026 Physician Fee Schedule final rule raised the conversion factor by 3.26 percent and applied a minus 2.5 percent efficiency adjustment to non-time-based services, which include diagnostic imaging (CMS, 31 Oct 2025, https://www.cms.gov/newsroom/fact-sheets/calendar-year-cy-2026-medicare-physician-fee-schedule-final-rule-cms-1832-f). This touches N35. The 2026 rates are in force; only Congress can change them.

**Element 4. The European fleet due for replacement by 2031 is already installed.** The trade association COCIR reported in 2023 that more than one fourth of Europe's MRI installed base is over 10 years old, against its own rule of no more than 10 percent, concentrated in Germany, Italy, Spain, the United Kingdom and Poland (COCIR, 2023 edition, https://www.cocir.org/wp-content/uploads/23049_COC_Medical-Imaging_Age-Profile-Density-combined.pdf). Eurostat shows MRI density rising in every EU country but Cyprus from 2013 to 2023 (Eurostat, data year 2023, https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Healthcare_resource_statistics_-_technical_resources_and_medical_technology). Every magnet installed from 2016 to 2021 will be 10 or more years old by 2031. This fixes the need, not the orders, at N35 and on lanes N26 and N28. It stops holding only if health systems run fleets past 15 years, which they already do.

**Element 5. English NHS procurement will score carbon and, by 2030, will not buy from suppliers outside its net zero commitment.** The NHS (National Health Service) strategy of October 2020 sets net zero by 2040 for its direct footprint and 2045 for its supply chain, and states that before the end of the decade it will no longer purchase from suppliers that do not meet that commitment (NHS England, Oct 2020, https://www.england.nhs.uk/greenernhs/wp-content/uploads/sites/51/2020/10/delivering-a-net-zero-national-health-service.pdf). Procurement Policy Note 06/21 requires a published carbon reduction plan for major contracts (gov.uk, 5 June 2021, https://www.gov.uk/government/publications/procurement-policy-note-0621-taking-account-of-carbon-reduction-plans-in-the-procurement-of-major-government-contracts), and NHS Supply Chain requires Evergreen Level 1 from April 2026 (NHS Supply Chain, March 2026, https://www.supplychain.nhs.uk/sustainability/). This touches N36 and, through helium and service carbon, N34 and N33. The often-cited 10 percent weighting could not be retrieved from a primary page and is not relied on.

**Element 6. China is funding hospital equipment renewal to 2027.** The State Council action plan of 13 March 2024 names medical imaging among the equipment hospitals are encouraged to renew, with a target of 25 percent growth in equipment investment by 2027 against 2023 (State Council, 13 Mar 2024, https://www.gov.cn/zhengce/content/202403/content_6939232.htm). This is demand at N35 served by the China plant (N17) and its lanes (N29). It stops holding if fiscal support is withdrawn before 2027.

**Element 7. The buying population is older.** US adults over 65 outnumber children from 2029 in the Census Bureau's middle series (US Census Bureau, 9 Nov 2023, https://www.census.gov/newsroom/press-releases/2023/population-projections.html). Japan's fiscal 2026 fee revision reported on 13 Feb 2026, and the biennial cycle fixes revisions for 2028 and 2030 (MHLW, https://www.mhlw.go.jp/stf/newpage_67729.html); the 2026 rate was not retrieved. Both touch N35, and Japan touches N29.

## Critical factors

Origin and carbon have entered tender scoring (N36) ahead of delivery reliability, which no retrieved framework scores explicitly. Panel judgement: a late delivery is punished through re-tender behaviour rather than a published formula, so its cost is real but hard to see from outside. The China plant (N17) is on the wrong side of a European rule and possibly a US one, so it is a regional plant, not a global backup. Reimbursement in the largest market is flat in real terms (N35) while the fleet ages, which pushes buyers toward total cost of ownership, where helium (N34) and service (N33) are visible lines.

## Predetermined versus uncertain

The seven elements above are predetermined. The following are uncertain and are listed for phase 3 without analysis.

Whether the Section 232 investigation ends in tariffs or quotas on imported MR systems or components, and at what rate, is an outcomes uncertainty (N08, N10, N12, N18, N31).

Whether the EU measure is withdrawn, widened or matched by a lasting Chinese counter-measure is an outcomes uncertainty; the Chinese notice of July 2025 was not retrieved (N17, N28, N36).

Whether tender committees score delivery reliability explicitly, and whether a late delivery has ever moved a tender, is a causation uncertainty (N36).

Whether hospitals require sealed or helium-free magnets by 2031, rather than prefer them, is a value uncertainty; sealed-magnet installed-base counts could not be retrieved (N34, N36).

Whether the CMS efficiency adjustment repeats each year is an outcomes uncertainty (N35).

Whether European health systems replace the over-10-year fleet or run it longer is an actions uncertainty on the buyer's side (N35, N26, N28).

Whether China's renewal subsidies favour domestic makers in practice, and whether MR permit quotas are renewed for 2026 to 2030, is a causation uncertainty (N17, N29).

Whether the EU adds a European preference to its procurement directives, as signalled for 2026, is an outcomes uncertainty (N36, N28).

## Contradictions with other lenses

Round 1 has no other summaries to read. This lens expects to contradict any lens that treats the China plant (N17) as a backup for European demand, because the European rule bars that above 5 million euros. The contract value split of the OEM's European orders, held by the S&OP council, would settle it.

## Blind spots of this lens

This lens reads tender rules and misses the factory. It overrates how rationally tenders are decided. It has not checked whether competitors share the same wire (N03) and cold head (N05) suppliers, in which case a disruption hurts everyone and moves no share. It found no public delivery-performance audit by a health system, so its claim about how late delivery is punished rests on judgement, not a source.

## Sources

EUR-Lex, Commission Implementing Regulation (EU) 2025/1197, 20 June 2025, primary: https://eur-lex.europa.eu/eli/reg_impl/2025/1197/oj/eng

Federal Register, Section 232 investigation notice, 26 Sept 2025, primary: https://www.federalregister.gov/documents/2025/09/26/2025-18729/notice-of-request-for-public-comments-on-section-232-national-security-investigation-of-imports-of

Federal Register API search for proclamations to 11 Oct 2026, primary: https://www.federalregister.gov/api/v1/documents.json?conditions[term]=%22Adjusting+Imports%22+medical&conditions[type][]=PRESDOCU

CMS, CY 2026 Physician Fee Schedule final rule fact sheet, 31 Oct 2025, primary: https://www.cms.gov/newsroom/fact-sheets/calendar-year-cy-2026-medicare-physician-fee-schedule-final-rule-cms-1832-f

COCIR, Medical Imaging Equipment Age Profile and Density, 2023 edition, trade association: https://www.cocir.org/wp-content/uploads/23049_COC_Medical-Imaging_Age-Profile-Density-combined.pdf

Eurostat, healthcare resource statistics, data year 2023, primary: https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Healthcare_resource_statistics_-_technical_resources_and_medical_technology

NHS England, Delivering a net zero NHS, Oct 2020, primary: https://www.england.nhs.uk/greenernhs/wp-content/uploads/sites/51/2020/10/delivering-a-net-zero-national-health-service.pdf

Gov.uk, Procurement Policy Note 06/21, 5 June 2021, updated 17 Apr 2023, primary: https://www.gov.uk/government/publications/procurement-policy-note-0621-taking-account-of-carbon-reduction-plans-in-the-procurement-of-major-government-contracts

NHS Supply Chain, sustainability requirements, page current to March 2026, primary: https://www.supplychain.nhs.uk/sustainability/

State Council of China, equipment renewal action plan, 13 Mar 2024, primary: https://www.gov.cn/zhengce/content/202403/content_6939232.htm

US Census Bureau, population projections, 9 Nov 2023, primary: https://www.census.gov/newsroom/press-releases/2023/population-projections.html

MHLW Japan, fiscal 2026 medical fee revision page, items dated to 2026, primary: https://www.mhlw.go.jp/stf/newpage_67729.html


## The question for this round (phase 3, round 1)

Phase 3, critical uncertainties, round 1 (isolated). Phase 2 is done; its synthesis is attached and it withdrew the scope packet's second dimension (helium-free magnets are already cleared products). For the nodes your lens can reach, what could plausibly go two or more ways by 2031 and would change whether the line delivers inside the tolerance line? Start from the open list in the phase 2 synthesis but add what your lens sees that it misses. For each uncertainty: name it as a question a product owner can read without a glossary; say which of the eight risks in 02-risk-screen.md it moves and how; say which kind of not-knowing it is (actions, outcomes, causation, value); give the two or three directions it could go; say why it is uncertain rather than predetermined; and name the observable thing that would show it resolving, with where it is published. Rank your uncertainties by how many of the eight risks they move at once. End the full transcript with a table: one row per uncertainty, columns for the eight risks (R1 to R8 in the screen's order), a mark where it moves that risk, and the count. Research note: the shared web search budget for this run is spent. Work from the phase 2 transcripts, which carry sources, and from direct fetches of known addresses where you need a date or a figure. Do not invent sources.

## What to produce

Do the research with web search before you write. Every fact carries a link and a date. Write the full transcript, then the summary, exactly in the format COMMON.md gives. Begin the full transcript with the line `# <lens name>, phase 3, round 1` and the summary with the line `# <lens name>, phase 3, round 1, summary`. Target paths: full transcript `scenarios/MR-CONV-2031/conversations/customer_market_p3_r1_full.md`, summary `scenarios/MR-CONV-2031/conversations/customer_market_p3_r1_summary.md`. If you can write files, write them there; if you cannot, print the full transcript, then a line containing only `=====SUMMARY=====`, then the summary.
