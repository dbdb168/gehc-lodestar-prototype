You are one lens on a scenario panel for a medical imaging OEM. Your dossier, the rules, the scope packet, the node map and the risk screen follow. Then the question for this round.

## Your dossier

# Lens: Security

## Identity

You are a supply-chain security specialist who has run incident response for manufacturers and their logistics providers. You know that the plant's own network is rarely the way in; the freight forwarder, the wire mill's billing system or the port's terminal operating system is. You track ransomware by sector, counterfeit parts by component class, and cargo theft by lane. You refuse to be impressed by a certification; you ask when the last tabletop exercise was and who was not in the room.

## The OEM's definition of your category

Security threats, reviewed per process, supplier or vendor and logistics node: cyber attack on the OEM or on a supplier or carrier, physical theft and sabotage, counterfeit or substandard parts entering the supply, and the loss of data that gates production (qualification records, design files).

## Frameworks and vocabulary

Attack surface by tier. Ransomware dwell time and recovery time. Operational technology versus information technology. Counterfeit avoidance standards for electronic parts. Known-shipper and trusted-trader programmes. Insider risk. Single points of data: the one system whose loss stops the line.

## Questions you always ask

- Which supplier or carrier on this map, if encrypted tomorrow, stops a shipment, and for how long did recent incidents in that sector last?
- Which component classes on the map have a documented counterfeit market?
- Which lanes have a cargo theft or tampering history?
- Which record (qualification, design, calibration) is the single point of data for this product?
- Who has already been hit in this sector in the last three years, and what did recovery take?

## Blind spots you carry

You see adversaries everywhere and underweight ordinary failure. You overrate the attacker's interest in a niche product and underrate the slow damage of a trusted supplier quietly cutting corners.

## Research instructions

Primary sources: national cyber agencies' sector advisories, ransomware tracking datasets, regulators' cyber incident disclosures, counterfeit part alerts from standards bodies and customs, cargo security reports from carriers and insurers. Cite with link and date.

## Where to look on the map

The two magnet plants N16 and N17 and the hub N18; the wire mill N03 and cold-head maker N05 as single suppliers; the design and qualification record N22; software N15; the export port N26; customs and payment rails N31; electronics N08 to N12 for counterfeit exposure.

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

### P3-uncertainties.md

# Phase 3: critical uncertainties and the two axes

Read date 11 October 2026. Two rounds, eleven lenses each. Round 1 produced sixty-two uncertainties; the moderator grouped them into seven candidates (`P3-round1-moderator-note.md`). Round 2 asked each lens to pick two axes, test their independence and place the rest.

## Bottom line

The panel converged. All eleven lenses put the trade question on the first axis. Ten of eleven put the helium question on the second; the eleventh (Labor) wanted a magnet-mix question that the chosen wording covers. Between them the two axes decide whether six of the eight risks break and what the other two cost. One risk, the technicians (R7, N20), moves on no external uncertainty and stays a Placeholder for Human resources.

## The two axes

### U1. Does something outside the OEM stop a part or a lane for more than 30 days before 2031?

| | |
|---|---|
| End A | Every measure stays a cost. Tariffs, the copper annex, payment friction and customs time raise the bill and stay inside the 30-day line. |
| End B | Something stops. A producer country lists superconducting wire, niobium or cold heads for export control; the United States and China break the truce into entity listings that cut the two-way parts flow through the China plant; a legal action targets the foreign-owned plant; or a sole supplier's owner leaves MR and takes the only qualified source with it. |
| Kind of not-knowing | Outcomes. The measures are in motion; which way they land is not decided. |
| Moves | Breaks R2 China plant (N17), R4 wire (N03), R5 cold heads (N05), R6 logic (N10). Costs R3 US hub (N18) and, through a helium export rule, R8 cover (N19). |
| Lean at read date | Toward end A, weakly. The Section 232 medical investigation had no proclamation on 11 October 2026; the China truce holds (its end date reads 10 November 2026 or 10 January 2027 on two carried sources; the notice settles it); no listing of wire or cold heads exists; one cryocooler maker has already left the market (predetermined element P18). |
| Settles toward A when | The 2027 sourcing cycle closes with the truce renewed, the Section 232 report confined to finished scanners, and no listing of wire, niobium or cold heads. |
| Settles toward B when | A Federal Register, MOFCOM or producer-country notice names any of those parts; an entity listing names the China plant or its logic supplier; a parent company announces the sale or closure of the wire mill or cold-head plant. |
| Folded in | C6 sole-supplier parents (Financial, Labor): a stop by owner exit and a stop by rule land on the same risks. Security's legal-action variant. |

### U2. In 2031, does helium still decide whether a magnet ships?

| | |
|---|---|
| End A | Yes. The Gulf route stays impaired or allocated, a United States export or allocation rule arrives, most new builds are still conventional, and a sealed magnet still draws enough helium at cool-down and test to need a delivery. Helium cover (N19) stays the margin every weather, grid and lane event walks through. |
| End B | No. Helium returns to a buyers' market or sealed magnets take most new builds with a small test draw, so a delivery delay costs money but no magnet waits. The cold head (N05) becomes the part that keeps every magnet cold. |
| Kind of not-knowing | Outcomes for the market and the Gulf; causation for the test draw, which is a Placeholder until Engineering states the litres. |
| Moves | Breaks R1 US magnet plant (N16), R2 China plant (N17), R8 cover (N19). R5 cold heads is split across the panel: six lenses say it breaks at end B (the cold head carries the whole thermal load), five say it is a cost. R7 technicians moves on the trades the plant needs (Labor) but not on whether the plant runs. |
| Lean at read date | Toward end A, clearly. Hormuz is still closed to most traffic (four transits against a normal 85 on 11 October 2026); Qatar's share of United States helium imports fell to 28 percent; the federal reserve was sold in June 2024; the OEM's 1.5 tesla sealed option was cleared on 5 February 2026 but conventional builds still dominate; no 3 tesla sealed clearance exists. |
| Settles toward A when | A United States helium allocation or export rule is proposed; the Gulf repair slips past 2028; the sealed test draw is confirmed as a delivery-sized quantity. |
| Settles toward B when | Hormuz reopens to insured traffic and the allocation letters stop; a 3 tesla sealed magnet is cleared; the test draw is confirmed as a cylinder, not a delivery. |
| Folded in | The external half of C3 (Technology shift, Customer and market): tender pull for sealed designs, a 3 tesla clearance and hospital willingness to buy a first generation. The OEM's own conversion pace is an action in phase 6b, not an axis. |

### Independence

Each end of U1 can occur with each end of U2. The four corners the panel tested:

| | U2 end A, helium still decides | U2 end B, helium no longer decides |
|---|---|---|
| **U1 end A, trade stays a cost** | The Gulf stays shut under open trade; both plants wait for allocated helium while every part still moves. | Open trade and a sealed majority; the cold head and wire still flow, no magnet waits. |
| **U1 end B, something stops** | A listing strands the China plant's cold heads while the US plant still waits for helium deliveries. | Sealed magnets finished converting behind a trade wall; the stop lands on a cold head that now carries every magnet. |

One shared driver, named by the Contrarian: a United States helium export rule is itself a trade measure. The panel keeps it on U2 because it moves the two plants in opposite directions, which no U1 measure does.

## The uncertainty-by-risk grid

B means the uncertainty moves whether the risk breaks. C means it moves only what the break costs. Marks are the panel majority from eleven round 2 tables; a split is shown.

| Uncertainty (as a question) | Kind | R1 N16 US magnet plant | R2 N17 China plant | R3 N18 US hub | R4 N03 wire | R5 N05 cold heads | R6 N10 logic | R7 N20 technicians | R8 N19 helium cover | Breaks | Costs |
|---|---|---|---|---|---|---|---|---|---|---|---|
| U1 Does something outside the OEM stop a part or a lane for more than 30 days? | outcomes | | B | C | B | B | B | | C | 4 | 2 |
| U2 In 2031, does helium still decide whether a magnet ships? | outcomes, causation | B | B | | | B/C split 6 to 5 | | B/C split | B | 3 to 5 | 0 to 2 |
| C4 Can a single site, the sole wire mill, the sole cold-head maker or the design record run 30 days without their systems? | causation | B | B | B | B | B | B (6 of 11, through N22) | | B (9 of 11) | 6 to 7 | 0 |
| C5 Do United States hospitals cut, defer or bunch their orders, and is a late install punished at all? | outcomes, value | C | C | C | C | C | C | C | C | 0 | 8 |
| C7 Do the elevated grid ratings at the two United States sites become a multi-week winter curtailment? | causation | B | | B | | | | | B | 3 | 0 |

## Where the other candidates went

- **C4, thirty days without systems.** Eleven of eleven: not an axis. It is an event, not a condition of the world, and its answer is the same in every future. It goes to phase 6a as a shared break that every future carries, tested at 35 days (the longest public recovery record) against the US magnet plant, the wire mill and the cold-head maker. Condition set by the Contrarian: every future states that it assumes the design and qualification record (N22) is intact.
- **C5, demand shape.** Eleven of eleven: a modifier on every future's bill, never on its breaks. Whether tender criteria ever score delivery reliability is a watch item on N36 (Customer and market).
- **C7, grid becomes curtailment.** Eleven of eleven: a dated watch item (Carolinas rated elevated from 2027, Midcontinent high from winter 2028) that modifies only the two futures where helium still decides. Natural disasters, who proposed it, withdrew it.
- **C3, sealed-magnet pace.** Its external half sits on U2. The OEM's own conversion decision is an action for phase 6b.
- **C6, sole-supplier parents.** Folded into U1 end B.

## Watch rows

Two rewordings of U2 are kept with the reason they were not chosen.

| Proposed by | Row | Why not chosen |
|---|---|---|
| Labor | Is most of what the OEM ships in 2031 still a helium-cooled conventional magnet? | Narrower than U2: it covers the sealed route to end B but not the Gulf and allocation route to end A. The chosen wording contains it. Its point stands: the two routes mean different trades at the plant, and phase 4 writes both. |
| Contrarian | Is helium still an allocated market in 2031? | Strips the sealed clause so the sponsor cannot steer a future by choosing it. The panel kept the sealed clause because a 3 tesla clearance and tender pull are external; the OEM's own pace is held out as an action. The steering concern is recorded for phase 7. |

## Contradictions carried forward

1. **Truce date.** 10 November 2026 (Foreign trade, Global Times 5 November 2025) against 10 January 2027 (Geopolitical, New Straits Times September 2026). Unresolved; each lens adopted the other's date in round 2. Phase 5 names the notice as the indicator and uses the earlier date as the first read.
2. **Cold heads at U2 end B.** Six lenses say the risk breaks (the cold head becomes the only thing keeping every magnet cold); five say it is a cost. Phase 4 writes the sealed futures with the break and phase 6a states the confidence as moderate.
3. **Magnet-grade wire and the dual-use list.** Still unverified (Geopolitical). AI-suggested; Quality and regulatory confirms. Does not change the axes.

## Placeholders that decide how much of this is real

- Helium cover at the US plant, in days (N19). Set by Logistics.
- Litres of helium a sealed magnet consumes at cool-down, ramp and test. Set by Engineering.
- Backup power and flood class at the US magnet plant. Set by Site operations.
- The cold-head maker's and wire mill's addresses against the Nankai Trough zone. Set by Sourcing.
- Whether the plants and sole suppliers have a tested 30-day manual fallback. Set by Site operations and Sourcing.

## Checks

Axes independent: yes, four corners tested by every lens. Each axis moves at least three of the eight risks: U1 breaks four, U2 breaks three to five. Grid complete: yes. Contrarian's third row recorded with reason: yes. No recommendation in this phase: the OEM's conversion pace is deferred to phase 6b, not advised.


### contrarian_p4_r2_full.md

# Contrarian, phase 4, round 2

## The future in one sentence

A state or an owner stops a cryogenic part, and by then helium no longer decides whether a magnet ships.

## What happens

2026 to 2028. Hormuz reopens to insured traffic in 2027 and the allocation letters stop, the only road to this future that does not require the OEM to convert its fleet during a parts stop (straits.live, 11 Oct 2026). Conventional magnets still dominate; the sealed 1.5 tesla platform (FDA K253779, 5 Feb 2026) takes a growing minority and no 3 tesla sealed clearance exists. The truce lapses on its first or second read date and entity listings begin with control logic, which the OEM absorbs at a cost through an older part (N10, N12).

2028 to 2031. A producer-country notice lists magnet-grade niobium-titanium wire alongside cryocoolers by early 2029. Wire has mills in five countries but the OEM has one qualified mill, and the niobium behind every mill sits with one producer state and one dominant buyer (USGS, Feb 2026). Both plants wind out their last qualified spools during 2029 while Sourcing starts an 18-month qualification, and European replacement demand comes due on the same clock (COCIR, 2023).

## What fails first

N03, niobium-titanium superconducting wire. Every magnet the OEM can ship, sealed or conventional, is wound from one qualified mill's wire, and no magnet without it exists in United States clearance records to 11 October 2026 (openFDA product code LNH). AI-suggested; Engineering confirms the sole qualification.

## How soon

Both plants pass the 30-day line in the first quarter of 2029, about one quarter after the listing, once the spool inventory is wound out. Panel judgement.

## What it costs

A line stop at both the United States magnet plant and the China plant that runs most of 18 months, against a tolerance line of 30 days. Every install in the order book slips, and markets that re-tender on lateness move share to a maker whose wire is not behind the same licence (N16, N17, N36). The stop is uninsured because its cause is a rule or an owner. Panel judgement, moderate.

## What prevents it

The world would need a second qualified wire mill outside the listing state, with qualification started by the second quarter of 2027 so the 18 months close before the 2029 listing. The owner is Sourcing, with Engineering on the qualification record (N03, N22). Started after mid-2027 it does not matter by 2031.

## How sure we are

Moderate on the mechanism, low on the date. Moderate because wire is the one input every magnet shares, a public fact. Low because no list names wire or cryocoolers today, and a listing is an outcome nobody has dated.

## What would change this

A cryocooler listing that lands before a wire listing moves the first break to the cold head and makes the Macroeconomic page right. A sale or closure notice from the wire mill's parent brings the same break forward a year without any state acting. A 3 tesla sealed clearance changes nothing, because sealed magnets use the same wire.

## Cluster disagreement

My cluster-mate, the Macroeconomic lens, named the cold head (N05) first in F4, through a listing or parent sale by 2029, because a sealed fleet puts every magnet's thermal load on it. I chose wire because the cold-head story needs the sealed share to pass half before the stop lands, and no 3 tesla clearance exists to carry that share; wire needs no conversion, since the part is common to both designs. The cold head belongs to the sealed programme already on the plan; wire is the boring one. If the sealed share is still a minority in 2029, the cold-head break is partial and the wire break is total. What settles it is which part a notice names first, and the sealed share on that date.

## Shared break

A 35-day encryption event (C4) at the wire mill does what the listing does, only earlier and with no notice to watch for. If it lands at the OEM instead, it removes the intact design record (N22) this page assumes, and the 18-month qualification has nothing to qualify against.

## Other lenses

Every summary outside the cluster names the cold head first in F4; Technology shift concedes wire is common to every future but still picks the cold head. Customer and market says share moves only if competitors do not share the cold-head source, which cuts the other way for wire: a wire listing reaches every maker, so share moves least when the whole industry stops together.

## Sources

Carried: FDA K253779 (5 Feb 2026); openFDA product code LNH (11 Oct 2026); USGS (Feb 2026); straits.live (11 Oct 2026); COCIR (2023).


### customer_market_p4_r2_full.md

# Customer and market, phase 4, round 2

## The future in one sentence

Trade stays a cost, helium stops deciding whether a magnet ships, and the hospital's new sealed scanner is kept cold by one part from one maker.

## What happens

From 2026 to 2028 the truce renews, the Section 232 medical report stops at finished scanners, and Hormuz reopens to insured traffic, so allocation stops and service helium (N34) becomes a cylinder trade. The sealed class builds service history (FDA K181479, 3 August 2018; FDA K253779, 5 February 2026) and a 3 tesla sealed magnet is cleared. Committees (N36) ask for sealed designs because carbon scoring (NHS England, October 2020) and the European Union origin rule (Regulation 2025/1197, 20 June 2025) reward them.

From 2028 to 2031 sealed magnets take most new builds and replacements, which are many because every European magnet installed 2016 to 2021 is past ten years by 2031 (COCIR, 2023). Hospital capital (N35) stays thin (Kaufman Hall, 27 August 2026). The sealed fleet grows faster than its spares stock, and the cold head (N05) carries new builds and field service alike.

## What fails first

Cryocooler cold heads, N05. The one qualified Japanese maker supplies every new magnet and every service swap for a sealed fleet that warms up when a cold head fails, with no helium reserve. AI-suggested on location and ownership; Engineering and Sourcing confirm.

## How soon

No date, because the trigger is unscheduled: a parent allocating output to quantum and physics buyers (P18), or a Nankai Trough earthquake (Headquarters for Earthquake Research Promotion, 26 September 2025). Exposure is largest from 2029, when the sealed share passes half and service competes with new builds for the part.

## What it costs

Against the tolerance line, a line stop past 30 days at both plants (N16, N17), which share the part. Against the installed-base value, running scanners go dark in the same quarter, which is the loss the hospital notices first. A committee that lost a running scanner writes "unreliable" against the sealed class, not one vendor, unless a competitor keeps shipping, so share moves only if competitors do not share the source (N05; AI-suggested, Sourcing confirms). Panel judgement, moderate confidence.

## What prevents it

The future in which this does not happen has a second cold head qualified for the sealed design before the sealed share passes half, owned by Engineering with Sourcing and started by mid-2027 since requalification runs 18 months, and an Install PMO spares stock sized to the fleet, not the order book.

## How sure we are

Moderate. The sealed pull rests on dated public documents and six of eleven lenses carry the single source (P3). Timing is low confidence: the trigger has no schedule and the panel splits six to five on break versus cost.

## What would change this

A second cold-head maker qualified by any OEM before 2029, or evidence that competitors share the source, which makes this a market-wide pause with no tender moving. Hospitals refusing a first-generation 3 tesla sealed magnet would push the exposure past 2031.

## Cluster disagreement

Technology shift also names the cold head, in 2029 to 2031. Labor names the technicians (N20) in 2029, when the plant retrains mid-conversion and installs run late at the margin. The Contrarian says F2 has no external break and the technicians are the only candidate, on an unconfirmed roster age. I keep the cold head because the line is measured at the hospital: a retraining lag is a slow install the customer can plan around, while a cold-head stop takes a running scanner. The Contrarian is right that the trigger is a parent's board or a fault line, not a state, which is an outcomes uncertainty. A confirmed roster age (Human resources) would settle Labor's claim; a confirmed second cold-head source would kill mine.

## Shared break

A 35-day encryption event at the cold-head maker or the US magnet plant breaches the line here as everywhere, and with no helium margin it halts service swaps too, so installed base and order book are hit the same day (N05, N16, N22). This page assumes N22 intact.

## Other lenses

Financial says nothing breaks in F2. Security names counterfeit logic (N10) in 2027 to 2028, which the buyer sees as faults, not lateness. Infrastructure names a flood at the US magnet plant (N16). Foreign trade, Geopolitical and Natural disasters point at the cold head.

## Blind spots of this lens

I see the buyer, not the maker's order book, so the parent-exit reading is borrowed from Financial. I overrate how far carbon scoring moves a committee against installed-base inertia, which would soften this page.

## Sources

Carried from phases 2 to 4, cited inline. Nothing new.


### financial_p4_r2_full.md

# Financial, phase 4, round 2

## The future in one sentence

Trade stays a cost and magnets still need helium, so the line runs on allocated helium that gets dearer every year it is held.

## What happens

From 2026 to 2028 the truce renews and nothing lists wire or cold heads (P7). Hormuz stays near closed (IMF PortWatch via straits.live, 11 October 2026) and the Qatari repair runs three to five years (IOM3, 23 March 2026). The United States plant (N16) buys allocated domestic helium (P4); the China plant (N17) buys Asian spot with no domestic producer behind it (USGS, February 2026). The rate holds near 4.1 percent and producer prices rise 5.4 percent a year (Federal Reserve, 16 September 2026; BLS, 10 September 2026), so every week of cover (N19) is inventory financed at a rising cost.

From 2028 to 2031 helium remains allocated and the container fleet (N23, P5) cycles hard. Conventional builds still dominate. Cover at the United States plant thins in real terms as the balance sheet pays 4 percent to keep it. Panel judgement.

## What fails first

The China plant, N17. It has no domestic helium and no allocation seniority, so one cut delivery while the container fleet is booked stops its ramp and test. AI-suggested; the S&OP council confirms the plant split, Logistics the cover at N17.

## How soon

Asian installs pass the 30-day line in the first half of 2028, with a first stop of 30 to 60 days and one a year after that.

## What it costs

One Eastern Hemisphere line stop past 30 days each year, with no second plant able to cover Asia (N29). Western installs stay inside the line at a higher bill; the carrying cost of cover at N19 rises roughly 9 percent a year on rate plus producer inflation (Panel judgement on P17). The loss is largely uninsured, because contingent business interruption cover answers only where a supplier's premises are physically damaged, and an allocation is a commercial event. Panel judgement, low confidence, no policy wording carried.

## What prevents it

The world would need the China plant to hold cover at least as long as the Asian reroute time: Logistics sets the cover number at N17 and Sourcing holds a second allocation contract with a non-Gulf producer, started by the second quarter of 2027 so a first delivery lands before 2028. A year of cover in working capital is a Placeholder.

## How sure we are

Moderate. High that cover gets dearer, on the rate path and the reserve sale. Moderate that the China plant goes first, on the producer map. Low on the year: Gulf repair timing is an outcomes uncertainty and cover at N17 is a Placeholder.

## What would change this

Hormuz reopening to insured traffic before 2028 turns this into F2. A United States helium allocation rule moves the break to N19. A confirmed cover number at N17 longer than the Asian reroute removes the break.

## Cluster disagreement

Both cluster-mates name helium cover at the United States plant (N19) as the first break: Infrastructure through a winter curtailment or basin flood while a container is in transit, winter 2028 to 2029; Natural disasters through a correlated storm with a ten-day grid rebuild, any hurricane season from 2027. I do not take that break first. Theirs needs a hazard to land and cover at N19 shorter than the rebuild, and that cover is a Placeholder; Natural disasters says itself that if cover exceeds the rebuild it has no break. Mine needs only that the plant without a domestic producer sits at the back of an allocated queue, which is true today. The cover number at each plant, set by Logistics, settles it.

## Shared break

A 35-day encryption event (C4) at the United States magnet plant turns this future's cost into a stop at N16 regardless of helium. At the wire mill or cold-head maker the backlog absorbs it only if finished-goods stock is held, a Placeholder. A cyber policy's waiting period typically exceeds 30 days, so recovery arrives after tolerance is breached. Panel judgement.

## Other lenses

Foreign trade and payments, Security, Labor, Geopolitical and Technology shift put the first break at N19, with my cluster-mates. Contrarian, Macroeconomic and Customer and market agree on N17 but put it in 2027. The panel splits seven to four.

## Blind spots of this lens

I price the cost of holding cover and underweight the restart of a cold plant. The China plant's buyer position is inferred; no public contract exists.

## Sources

Carried from phases 2 to 4: USGS (February 2026); federal reserve sale (27 June 2024); IMF PortWatch via straits.live (11 October 2026); IOM3 (23 March 2026); Federal Reserve (16 September 2026); BLS (10 September 2026).


### foreign_trade_payments_p4_r2_full.md

# Foreign trade and payments, phase 4, round 2

## The future in one sentence

A trade rule stops a part before 2031 and helium still decides whether a magnet ships, so the stop lands on the plant inside a counterparty's borders.

## What happens

2026 to 2028. The truce lapses at its notice date (first read 10 November 2026; Global Times, 5 November 2025; New Straits Times, September 2026). In 2027 entity listings name the China plant (N17) and its logic supplier, so United States-origin logic (N10) needs a licence reviewed under presumption of denial. Customs and payment rails (N31) become a licence queue. The Section 232 scanner duty (Federal Register, 26 September 2025) stays a cost. Hormuz stays near closed past 2028 (IOM3, 23 March 2026), so helium (N01) is allocated in both hemispheres.

2028 to 2031. The China plant has no second logic source inside 18 months. No producer country lists cryocoolers (N05) or wire (N03) on 11 October 2026; the stop does not need them. The United States plant (N16) keeps its parts but waits on allocated helium that outruns cover (N19), and the tender walls (Regulation (EU) 2025/1197, 20 June 2025) keep it from covering Asia or Europe.

## What fails first

The China plant, N17. Its control electronics stop when the listing puts United States-origin logic behind a licence that is not granted, because the plant holds weeks of logic, not months. AI-suggested; Sourcing confirms.

## How soon

Within one quarter of the listing: the third quarter of 2027 on the earlier truce date, the first quarter of 2028 on the later. Helium cover (N19) breaks second, by early 2028.

## What it costs

A line stop longer than 30 days at the China plant breaches tolerance. Asian installs run more than 30 days late for two quarters and Japan and India are one tender cycle from a China-built competitor (N36). The United States plant runs late in clusters on helium, so both halves breach. The loss is uninsured because a rule caused it. Placeholder on install volume, set by Install PMO.

## What prevents it

This future does not happen where, before the 2027 sourcing cycle closes, Sourcing holds a non-United States-origin logic path for the China plant or a licensed 18-month stock, and Logistics has tested helium cover against the container fleet's 35 to 48 day hold. Both start by the second quarter of 2027. This describes a requirement, not advice.

## How sure we are

Moderate. The listing tools exist and were used on this sector in 2025 (MOFCOM Announcement No. 1, 6 January 2026), and the plant's geography is fixed. The licence approval rate is not published and the plant's logic holding is unconfirmed.

## What would change this

A truce notice renewed past 2027 moves the stop out of the sourcing window. A notice naming cryocoolers or wire moves the first break to N05 or N03 and reaches both plants. A published approval rate above half makes this a delay, not a stop.

## Cluster disagreement

All three cluster lenses name the China plant, N17, through different gates. Geopolitical names logic (N10) within a quarter of a listing. Security names a cyber-law investigation and payment freeze at the rails (N31) in the first half of 2027. My round 1 named a licence on Japanese cold heads (N05). I now choose logic, because the entity list is a rule on the books with a written review standard, while a cold-head licence needs a Japanese listing that does not exist and a payment freeze needs a legal act never used on a medical plant. Security's route wins if a data demand precedes any listing; mine fails if the plant holds a year of logic.

## Shared break

A 35-day encryption event (C4) at the China plant lands on a line already stopped and only lengthens it. At the United States plant it is the one event that stops the line without a foreign rule, since five weeks outruns both the cover at N19 and the 30-day line. This page assumes the design record (N22) is intact.

## Other lenses

Labor names wire (N03) first, by mid-2028; no producer country lists magnet-grade wire and the mill sits outside the listing bloc (AI-suggested; Quality and regulatory confirms). Natural disasters names a storm behind the United States plant (N16, N19), which comes first only if the truce renews, which is F1. Infrastructure, Technology shift and Macroeconomic date the China plant's stop to 2028 through cold heads; the logic route is a year earlier.

## Sources

Carried, no new fetch: Federal Register (26 September 2025); Regulation (EU) 2025/1197 (20 June 2025); MOFCOM Announcement No. 1 (6 January 2026); IOM3 (23 March 2026); USGS (February 2026); truce sources of 5 November 2025 and September 2026.


### geopolitical_p4_r2_full.md

# Geopolitical, phase 4, round 2

## The future in one sentence

A state stops a part before 2031, and magnets still need helium to ship.

## What happens

2026 to 2028. The United States and China truce lapses at its notice date, read first as 10 November 2026 (phase 3, contradiction 1). Entity listings in 2027 name the China plant's logic supplier and a cryogenic parts route; the China plant (N17) can no longer import United States-origin programmable logic (N10) or licensed cold heads (N05) without a licence that is rarely granted. MOFCOM Announcement No. 1 (6 January 2026) is the precedent for the reply. Hormuz stays near closed (four transits against a normal 85 on 11 October 2026) and the Qatari repair runs three to five years (IOM3, 23 March 2026), so helium at both plants is bought on allocation letters (USGS, February 2026).

2028 to 2031. Two blocs harden. The China plant builds for Asia without United States-origin logic; its lanes to Japan and India (N29) run the Taiwan Strait under grey-zone pressure. The United States plant (N16) keeps shipping but waits on allocated helium, and the tender walls (Regulation (EU) 2025/1197, 20 June 2025) stop it covering Asia or Europe. Payment rails and customs (N31) split by bloc and become a licence queue.

## What fails first

The China plant, N17. It sits inside a counterparty's borders and holds weeks of programmable logic, not months, so an entity listing on its logic supplier stops the control electronics for every system it builds before any cold-head or wire licence bites. AI-suggested on what the plant imports; Sourcing confirms.

## How soon

Within one quarter of the first entity listing, inside the 2027 sourcing cycle. The first read is the second half of 2027.

## What it costs

A line stop at the China plant longer than 30 days, breaching the tolerance line, with no second plant able to cover Asia. Eastern Hemisphere installs run more than 30 days late for two quarters or more, and Japan and India are one tender cycle from a China-built competitor (N36, N29). The Western Hemisphere line runs late on allocated helium, so helium cover (N19) breaches second, by early 2028. Both lines breach.

## What prevents it

The China plant would need logic and cold-head inventory longer than the licence queue, a Sourcing action started before the truce notice date, and a qualified non-United States logic path for the Asian build, an Engineering action started by the first quarter of 2027.

## How sure we are

Moderate. The listing tools exist and were used on this sector in 2025, and geography fixes which plant a listing strands. The date rests on the truce notice and on an unpublished licence approval rate.

## What would change this

The truce renewed at its notice date with no listing naming the plant or its suppliers. A listing that names cold heads before logic moves the break to N05 and delays it a quarter, because cold-head stock is deeper. Hormuz reopening leaves the Western Hemisphere inside tolerance.

## Cluster disagreement

All three cluster lenses name the China plant first, through three different doors. Foreign trade and payments puts it behind a cold-head licence by the third quarter of 2027. Security puts it under an investigation and payment freeze through the amended cyber law in the first half of 2027. This lens chooses logic (N10) because it is the thinnest stock on the plant floor and the one a United States entity listing reaches without any producer-state action; the cyber-law route needs a second state to act, and cold-head stock outlasts logic stock. The plant's weeks of cover by part (Sourcing) and the first instrument on the register settle it.

## Shared break

A 35-day encryption of the China plant's or the wire mill's systems lands on a line already behind a licence queue, so it lengthens an existing stop rather than opening a new one. At the United States plant it would eat the helium cover and turn a late hemisphere into a stopped one. N22 is assumed intact.

## Other lenses

Labor names wire (N03) first, by mid-2028, through a mill in a listing state; no register lists wire to 11 October 2026 (Quality and regulatory confirms) and this page dates the plant stop a year earlier. Natural disasters names a storm at the United States magnet plant (N16, N19), a hazard without a schedule where the listing has one. Infrastructure, Macroeconomic and Technology shift agree on N17 but through cold heads in 2028.

## Sources

Carried only: USGS (February 2026); IOM3 (23 March 2026); MOFCOM Announcement No. 1 (6 January 2026); Regulation (EU) 2025/1197 (20 June 2025); truce sources of 5 November 2025 and September 2026.


### infrastructure_p4_r2_full.md

# Infrastructure, phase 4, round 2

## The future in one sentence

Trade stays a cost and magnets still need helium, so the clock on every delivery is a container, a grid and a road, not a rule.

## What happens

From 2026 to 2028 the truce renews and no part is listed. Hormuz stays near closed (four transits against 85, IMF PortWatch, 11 October 2026) and the Qatari repair runs three to five years (IOM3, 23 March 2026). The United States plant (N16) buys allocated domestic and Canadian helium (USGS, February 2026); the China plant (N17) buys Asian spot. The ISO container fleet of 500 to 700 units with a 35 to 48 day hold (P5, AI-suggested) cycles hard on the Atlantic side, so container cycle time sets cover at N19. The Carolinas grid is rated elevated from 2027 (NERC, 29 January 2026).

From 2028 to 2031 conventional builds still dominate and no 3 tesla sealed clearance arrives. The Midcontinent grid is rated high from winter 2028, so both United States sites (N16, N18) run under elevated winter ratings. The export port (N26) runs normally under the longshore contract to 2030 (P13). Cover at N19 is inventory bought at a 4 percent rate with producer prices up 5.4 percent a year (P17), so it thins each year as the grid tightens.

## What fails first

Helium cover at the United States magnet plant (N19). A winter curtailment or a basin flood takes the liquefier's power and the trailer's road (N24) while the next container is still in its hold window, and cover runs out before the delivery lands. Placeholder on cover days; Panel judgement on the path.

## How soon

The winter of 2028 to 2029, when the Midcontinent rating turns high and the Carolinas rating is in its second elevated year; a storm can bring it forward to any hurricane season from 2027.

## What it costs

One line stop at N16 of 30 to 45 days, which breaches the 30-day tolerance line, and one quarter of Western Hemisphere installs late; the count is a Placeholder. Eastern Hemisphere installs carry a higher helium bill and a longer queue, not a stop.

## What prevents it

The break does not land if cover at N19 exceeds the container hold plus the ten-day grid rebuild on the Helene record (Duke Energy, 30 September 2024), and if the liquefier at N16 has backup power off the plant feeder. Logistics owns the cover figure and Site operations owns the backup; both would need to be in place before the winter of 2028, which puts the start by the second quarter of 2027.

## How sure we are

Moderate. The fleet, hold window, grid ratings and port record are on dated public sources. The path from an elevated rating to a multi-week curtailment is a causation uncertainty with no record yet, and cover days are a Placeholder.

## What would change this

A 3 tesla sealed clearance or Hormuz reopening to insured traffic moves this to F2. A United States helium allocation rule moves it toward F3. A confirmed cover figure at N19 above 60 days removes my break and leaves the China plant's queue first.

## Cluster disagreement

Financial names the China plant (N17) first, through an allocation letter cutting a helium delivery while the fleet is fully booked, in 2028 to 2029. I chose N19 because an allocation letter is a shorter delivery, and Asian spot plus a 35 to 48 day hold absorb a shorter delivery without a stop; a dark liquefier with a closed road does not. Natural disasters agrees on the node and brings it forward to any hurricane season from 2027, which I accept as the early edge of my window. Financial is right that cover thins every year, which makes the N19 break likelier. Allocation seniority and cover days would settle it; the S&OP council and Logistics hold both.

## Shared break

A 35-day encryption event at N16 stops the liquefier's controls and the carrier's dispatch at once, and because cover at N19 is already the margin, the stop runs 35 days plus the container hold. The record (N22) is assumed intact.

## Other lenses

Contrarian, Macroeconomic and Customer and market put the first break at the China plant (N17) in 2027, on Gulf helium. Foreign trade, Geopolitical, Labor, Security and Technology shift put it at N19. The contradiction is whether Asian spot helium exists in volume; the China plant's allocation record would settle it.

## Sources

IMF PortWatch via straits.live, 11 October 2026. USGS, February 2026. NERC, 29 January 2026. Duke Energy, 30 September 2024. SC Ports Authority logs and ILA contract, 7 February 2025. Container maker page, 1 April 2026. IOM3, 23 March 2026. Phase 2 and 3 syntheses, 11 October 2026.


### labor_p4_r2_full.md

# Labor, phase 4, round 2

## The future in one sentence

Trade stays a cost and magnets no longer need helium to ship, so the plant floor changes trade mid-run.

## What happens

From 2026 to 2028 the truce is renewed with no listing of wire or cold heads, Hormuz reopens and allocation stops. A 3 tesla sealed magnet is cleared, following the 1.5 tesla clearance of 5 February 2026 (FDA K253779), and the test draw proves a cylinder. Tender pull arrives from European origin rules and net zero scoring (Regulation (EU) 2025/1197, 20 June 2025; NHS England, October 2020). The largest retirement cohort turns 65 (P12).

From 2028 to 2031 sealed designs take most new builds. The United States magnet plant (N16) runs both processes on one roster during conversion. Fill, ramp and helium handling shrink as trades; vacuum, leak test and cold-head integration grow, each about 18 months to competence (N20; AI-suggested, Human resources confirms). Helium becomes a service matter (N34). The cold head (N05) keeps every new magnet cold, from one Japanese maker with a shrinking workforce (P12, P18).

## What fails first

The skilled technicians at the United States magnet plant (N20). The sealed share passes half of output before the second crew is competent, so magnets wait on people, not parts. Panel judgement.

## How soon

The first installs pass the 30-day line in 2029, about 18 months after the 3 tesla clearance starts conversion.

## What it costs

Installs run late rather than stopping. A share of Western Hemisphere installs runs more than 30 days late for two to three quarters, breaching the delivery line but not the 30-day stop line. The count is a Placeholder for Install PMO. The value lost is deliveries hospitals can plan around (N35, N36).

## What prevents it

The world that avoids this break has a second crew competent before the sealed share passes half: an 18-month training arc owned by Human resources with Site operations, started by the second quarter of 2027, inside the decision clock. The headcount of a sealed line is a Placeholder for Site operations; no public source states it.

## How sure we are

Low. The claim rests on an AI-suggested 18-month time to competence and an unconfirmed roster age (U-L1). Welders are younger than the average worker (P12), which cuts against a cliff, and this lens underweights how fast a plant retrains.

## What would change this

A confirmed roster age under 45 with a tested cross-training plan would remove the break. A 3 tesla clearance after 2029 would push it past the horizon. Automation of leak test and cold-head integration would shrink the second crew until it no longer matters.

## Cluster disagreement

Both cluster-mates, Technology shift and Customer and market, name the cold head (N05) as the first break in F2, through a Nankai Trough event or a parent allocating elsewhere, in 2029 to 2031. I chose the technicians for two reasons. First, F2 is the future where no part stops; the phase 3 note folds a sole supplier's owner leaving MR into U1 end B, so a parent exit is F4's break, not F2's. Second, what remains for the cold head in F2 is an earthquake with no schedule, while the trade swap is scheduled by the conversion itself. I agree that if the cold head goes, both plants stop and the installed base warms up; I hold that the labour break lands first here. Roster age and sealed-line headcount from Human resources, against the cold-head plant's address from Sourcing, would settle it.

## Shared break

A 35-day encryption event (C4) at the United States magnet plant stops the line past 30 days here as everywhere, and lands on a roster split between two processes. A crew idled five weeks mid-conversion is the crew other employers hire, so the restart is slower than in F1 (N16, N20; Panel judgement). The design record (N22) is assumed intact.

## Other lenses

The Contrarian says F2 has no external break and the technicians claim is this lens's weakest; I accept that and record confidence as low. Financial says nothing breaks. Infrastructure names a flood at the magnet plant (N16), Security counterfeit logic (N10), Macroeconomic and Natural disasters the cold head. None contradicts the trade swap, only its ranking as first.

## Blind spots of this lens

I see people and miss automation, which could remove this break. I overrate strikes; none appears here. I underweight retraining speed, the one assumption the break rests on.

## Sources

All carried from phases 2 to 4. BLS tables 18b, 11b and union tables (2025, 2026); Statistics Bureau of Japan (2024); Nankai Trough revision (26 September 2025); cryocooler maker acquisition notice (28 March 2023); FDA K253779 (5 February 2026), https://www.accessdata.fda.gov/cdrh_docs/pdf25/K253779.pdf; Regulation (EU) 2025/1197 (20 June 2025); NHS England (October 2020); P3-uncertainties.md.


### macroeconomic_p4_r2_full.md

# Macroeconomic, phase 4, round 2

## The future in one sentence

A part stops and helium no longer decides: sealed magnets take most new builds behind a trade wall, and the stop lands on the cold head that now keeps every magnet cold.

## What happens

2026 to 2028. The truce lapses and the first listings name control logic, so the China plant (N17) loses a quarter and recovers. Hormuz reopens and helium (N01, N34) becomes a cost line. The sealed 1.5 tesla platform (FDA K253779, 5 Feb 2026) takes most new builds and a 3 tesla clearance arrives by 2028. Rates near 4 percent (Federal Reserve, 16 Sep 2026) and hospital margins at 2.5 percent (Kaufman Hall, 27 Aug 2026) make hospitals defer, so MR orders dip in 2027 and the OEM slips down its suppliers' queues.

2028 to 2031. The cold-head parent's order book fills with fusion, physics and quantum work (P18), and a producer-country notice lists Gifford-McMahon cryocoolers as dual use. Europe's 2016 to 2021 MR cohort passes ten years old (COCIR, 2023), so replacement orders rise just as the sole cold-head source goes behind a licence and an allocation. The sealed fleet has no helium reserve, so the cold head is the service part too.

## What fails first

Cryocooler cold heads, N05. The one qualified maker's parent, for whom MR is a minority of revenue, allocates capacity to better-paying buyers while a listing removes the licence route, and every magnet shipped or in the field depends on it. AI-suggested; Engineering confirms the maker's location and ownership, Sourcing confirms the parent's MR share.

## How soon

By 2029. Lead time passes 30 days within a quarter of the listing or allocation letter, and a second maker takes 18 months to qualify, so the gap runs into 2030.

## What it costs

Both plants (N16, N17) stop for longer than 30 days, for most of 18 months. Every backlog install runs past the tolerance line, and the installed base breaches service cover through N34 because sealed magnets warm without a spare cold head. The lateness lands on the European replacement peak, so share moves through N36. It is the highest bill of the four futures, because no magnet has a helium fallback.

## What prevents it

In the future where this does not happen, Engineering and Sourcing have a second cold-head maker qualified before 2029, which means the work started by the second quarter of 2027, and Sourcing holds a multi-year supply agreement with the parent from the 2027 sourcing cycle.

## How sure we are

Moderate. The sole source, the parent's revenue mix and the 18-month requalification are carried from phase 2 (P18), and nine of eleven lenses land on this node. The date rests on an allocation nobody has announced and a listing that does not exist.

## What would change this

A producer-country notice naming wire before cryocoolers moves the first break to N03. No 3 tesla sealed clearance by 2028 collapses this future into F3. A parent announcing the sale or closure of the cold-head plant pulls the date to the announcement.

## Cluster disagreement

The Contrarian names wire (N03) first, because every magnet, sealed or conventional, is wound from one qualified mill's niobium-titanium wire and niobium leverage sits with one producer state. I chose the cold head and do not concede. Both parts have one qualified source and 18 months to replace, so the question is which stop needs the least to happen. A wire stop needs a state to list wire; mills exist in five countries, niobium is traded with inventory at the mill (N02), and the mill's other customers buy the same wire, so no mill drops MR on its own. A cold-head stop needs only a parent's board to prefer quantum and fusion buyers after a 2027 order cut, with no notice from anyone. The cold head also breaks the installed base (N34); wire breaks only new builds. The next producer-country notice and the parent's next annual filing settle it. My blind spot is the Contrarian's strength: I price allocation and underrate the physical single mill.

## Shared break

A 35-day encryption event at the cold-head maker pulls this break forward to whenever it lands and stops service spares with builds. The same event at the United States magnet plant (N16) stops Western builds past the line on its own. Both assume N22 intact.

## Other lenses

Geopolitical names the China plant (N17) first in F4, within a quarter of a listing, earlier and on a different node than this page. Technology shift supports the Contrarian on wire being common to every magnet, though it still lands F4 on the cold head.

## Sources

Carried: FDA K253779 (5 Feb 2026); Federal Reserve (16 Sep 2026); Kaufman Hall (27 Aug 2026); COCIR (2023); parent filings per P18.


### natural_disasters_p4_r2_full.md

# Natural disasters, phase 4, round 2

## The future in one sentence

Trade stays a cost and magnets still need helium, so the US magnet plant runs every storm season on a helium margin it has never measured.

## What happens

2026 to 2028. The truce renews, the Section 232 report stays on finished scanners, and nothing lists wire or cold heads. Hormuz stays near closed (four transits against 85, IMF PortWatch via straits.live, 11 October 2026) and the Gulf repair runs three to five years (producer statement via IOM3, 23 March 2026). The US magnet plant (N16) buys allocated domestic helium by road in ISO containers (N23) on a 35 to 48 day liquid hold. The Carolinas grid is rated elevated from 2027 (NERC, 29 January 2026). The China plant (N17) cannot lend cover.

2028 to 2031. The Midcontinent grid is rated high from winter 2028 (NERC, 29 January 2026). Conventional builds still dominate. Helium cover at the US plant (N19) is the margin every storm, flood and curtailment walks through. The port (N26) closes two to three days per hurricane (SC Ports Authority logs, 2019 and 2024) and never reaches the line.

## What fails first

Helium cover at the US magnet plant, N19. A correlated inland storm of the 2015 to 2018 Pee Dee basin class takes the grid, the inbound road (N24) and the helium trailer together for longer than the cover holds, so the plant stands but the liquefier is dark. Panel judgement; cover days are a Placeholder set by Logistics.

## How soon

Any hurricane season from 2027, with the winter of 2028 to 2029 as the second window once the grid ratings bite. The storm that matters outlasts the ten-day Helene grid rebuild (Duke Energy, 30 September 2024).

## What it costs

A line stop at N16 of 30 to 45 days, which breaches the 30-day line, and every Western Hemisphere magnet in that window ships late. The install count is a Placeholder. The China plant (N17) sees price, not volume.

## What prevents it

The world would need cover at N19 longer than the longest correlated recovery: Site operations states backup power and flood class for the liquefier, Logistics sets cover in days above the Helene record, and both land in the 2027 capital plan, since a liquefier backup takes a budget year. Panel judgement.

## How sure we are

Moderate. High that the port is not the breaking node and that grid, road and trailer fail together, on the Helene record. Low on whether cover is shorter than a ten-day rebuild; if it is longer, this lens has no break in F1.

## What would change this

Hormuz reopening to insured traffic before 2028 would move this future toward F2 and shrink the margin to days. A stated cover above 14 days would move the first break to the China plant's allocation queue. A tested liquefier backup would take the grid out of the storm chain.

## Cluster disagreement

Infrastructure names the same node, N19, through a winter curtailment with a container in transit, likeliest in the winter of 2028 to 2029. I keep the hurricane season from 2027 as the first window because the flood is a loss history and the curtailment is a forecast. The disagreement is about timing and the first winter curtailment notice would settle it.

Financial names the China plant, N17, through an allocation letter in 2028 to 2029. I do not adopt it. An allocation letter is a schedule and can be planned around; a storm cannot. Financial's break rests on an AI-suggested plant split; mine rests on cover days. Whichever Placeholder is set first decides which of us is right.

## Shared break

The 35-day encryption event (C4) at N16 breaches the line in this future without any weather, because the plant cannot liquefy, ramp or test without its systems and the longest public recovery is five weeks. In F1 it is worse than in the sealed futures because a storm in the window of a restore adds the grid rebuild to the 35 days. This page assumes the design record (N22) is intact.

## Other lenses

Macroeconomic, Customer and market and the Contrarian name the China plant (N17) first in F1, in 2027 to 2028, because its helium came through Hormuz. Foreign trade, Geopolitical, Labor, Security and Technology shift name N19. The panel is split five to four; the cover Placeholder and the plant split would settle it.

## Sources

Carried from phases 2 to 4. Duke Energy restoration notice, 30 September 2024. NERC Long-Term Reliability Assessment, 29 January 2026. SC Ports Authority closure logs, 2019 and 2024. IMF PortWatch via straits.live, 11 October 2026. QatarEnergy statement via IOM3, 23 March 2026. USGS helium figures, February 2026.


### security_p4_r2_full.md

# Security, phase 4, round 2

## The future in one sentence

Trade stops a part and magnets still need helium: a state measure strands the China plant while the Gulf stays shut, so neither plant can cover the other.

## What happens

2026 to 2028. The United States and China truce lapses at its notice date (first read 10 November 2026; phase 3, contradiction 1). Entity listings name the China plant's logic supplier and a cryogenic parts route. The stop arrives not as a tariff but as a data demand under China's amended cyber law, in force from 1 January 2026, and a payment freeze on the rails that feed the foreign-owned plant (N31, N17). Hormuz stays near closed and a United States helium allocation rule is proposed (N01, N27).

2028 to 2031. Two blocs harden. The China plant builds for Asia without United States-origin logic or a licensed cold head; the United States plant waits on allocated helium and cannot cover Asia or Europe under the tender walls (Regulation (EU) 2025/1197, 20 June 2025). Customs and payment rails split by bloc into a licence queue with an unpublished approval rate (N31).

## What fails first

N17, the magnet and system plant in China. An investigation and a payment freeze stop its inbound parts before any licence is written down. Panel judgement.

## How soon

The first half of 2027, inside the 2027 sourcing cycle. The plant holds weeks of logic and cold heads, not months, so a freeze at N31 reaches the line within one quarter.

## What it costs

An Eastern Hemisphere line stop longer than 30 days, which breaches the tolerance line. Asian installs run more than 30 days late for two quarters, and Japan and India sit one tender cycle from a China-built competitor (N29, N36). The Western Hemisphere runs late on allocated helium but stops only if a winter event outruns cover (N16, N19). The loss is uninsured.

## What prevents it

The world would need Sourcing to hold a bloc-split parts inventory at the China plant and a tested manual fallback for the payment rails, started by the second quarter of 2027, and Logistics to have set helium cover at the United States plant in days. These are what the future requires, not advice.

## How sure we are

Moderate. The instruments exist and are dated: the cyber law, the listing tools used on this sector in 2025, and the five-week recovery record. Whether any is used on this plant is an undecided outcome.

## What would change this

The truce renewed with no listing naming the plant or its suppliers moves this page back to F1. A listing naming cold heads before logic keeps the node but changes the channel. Hormuz reopening to insured traffic before 2028 moves the page toward F4.

## Cluster disagreement

All three cluster-mates name the China plant, so the disagreement is the channel and the date. Geopolitical breaks it through logic (N10) within a quarter of an entity listing. Foreign trade and payments breaks it through a licence on cold heads (N05) by the third quarter of 2027. The Contrarian breaks it through the truce lapse by mid-2027. This lens keeps the legal and payment channel (N31) in the first half of 2027 because an investigation needs no published listing and freezes payment the day it opens; a paper listing can be loosely enforced, a frozen account cannot. If the first notice on the record is a listing, the cluster-mates are right and this lens is a quarter early.

## Shared break

The 35-day encryption event (C4) extends a breach already open in China. At the United States plant it is the event that outruns cover, because magnet test cannot restart without the liquefaction controls (N16, N19). The page assumes the design and qualification record (N22) is intact; if C4 reaches N22, every requalification date on the map moves right.

## Other lenses

Labor names wire (N03) by mid-2028 as F3's first break, which contradicts this page. Natural disasters names a storm behind the United States magnet plant (N16, N19), the wrong hemisphere for this future. Infrastructure, Technology shift and Macroeconomic agree on N17 but date it to 2028 through cold heads.

## Blind spots of this lens

This lens reads a legal instrument as used because it exists, and a trusted supplier quietly cutting corners at the stranded plant stays invisible; ramp failures by lot are the indicator.

## Sources

Carried, no new fetch: National Law Review, 28 January 2025; security news report on the five-week recovery, 15 November 2025; Federal Register 2025-18729, 26 September 2025; MOFCOM Announcement No. 1, 6 January 2026; Regulation (EU) 2025/1197, 20 June 2025; USGS, February 2026; truce sources of 5 November 2025 and September 2026.


### technology_shift_p4_r2_full.md

# Technology shift, phase 4, round 2

## The future in one sentence

Trade stays a cost and by 2031 helium no longer decides whether a magnet ships. (Panel judgement)

## What happens

From 2026 to 2028, the truce is renewed and wire, cold heads and chips flow at a tariff cost (Federal Register, 5 August 2025). Hormuz reopens and allocation stops. The sealed 1.5 tesla class, cleared at three makers (FDA K181479, 3 August 2018; FDA K253779, 5 February 2026), builds service history, and European tenders pull sealed designs through net zero scoring and the origin rule (NHS England, October 2020; Regulation (EU) 2025/1197, 20 June 2025).

From 2028 to 2031, a 3 tesla sealed magnet is cleared, the test draw proves a cylinder, and sealed designs take most new builds and the European replacement wave (COCIR, 2023). Helium cover (N19), ramp and test (N21) and container transport (N23) leave the tolerance story; helium becomes service only (N34). The magnet is still wound from one mill's niobium-titanium wire (N03), since no magnet without it is in United States clearance records (openFDA, product code LNH, read 11 October 2026). The one Japanese cold head (N05) now carries the whole thermal load of every new magnet and much of the installed base, with no helium reserve behind it.

## What fails first

N05, cryocooler cold heads. The sole maker supplies both new builds and the spares of a sealed fleet that warms up when a cold head fails, so an earthquake, an outage or a parent allocating output elsewhere stops both magnet plants at once. Panel judgement; plant location and ownership are AI-suggested, Engineering confirms.

## How soon

The window opens once the sealed share passes half, which this lens places in 2029, and runs to 2031. The event itself has no schedule.

## What it costs

A line stop longer than 30 days at both plants (N16, N17), because they share the cold head and 18 months of requalification outlasts any inventory. Installed sealed magnets that lose a cold head warm up while service (N33, N34) competes with new builds for the part. Demand shape (C5) sets the count of late installs, not the break.

## What prevents it

In the version of this future that does not break, a second cold-head source is qualified on the sealed design before the sealed share passes half, or the design carries a tested hold that buys 30 days without helium. The owner would be Engineering with Sourcing, starting by mid-2027 given 18 months of requalification.

## How sure we are

Moderate. High that wire and the cold head are unchanged sole-source parts in 2031 (openFDA, read 11 October 2026). Moderate that the cold head breaks rather than costs, the six-to-five split from phase 3. Low on the date, because this lens overrates adoption.

## What would change this

A second cold-head maker cleared on the sealed design before 2029 turns the break into a cost. A delivery-sized test draw pulls this future back toward F1. No 3 tesla sealed clearance by 2028 defers it past the horizon.

## Cluster disagreement

Labor names the technicians (N20) as the first break in 2029, when the plant swaps fill and ramp hands for vacuum and leak-test hands before either crew is competent. The Contrarian lands there too and calls it its weakest claim, since F2 has no external break by construction. Customer and market agrees on the cold head but gives no date. I keep the cold head because a trade swap delays installs while the magnet still ships, whereas a lost cold head stops both plants and the installed base. The roster age profile (Human resources) against the cold-head maker's parent revenue mix (Sourcing) would settle it.

## Shared break

A 35-day encryption event (C4) at the cold-head maker is the worst form of this future, because the sealed fleet has no helium reserve to wait behind. At the US magnet plant (N16) or the wire mill (N03) it stops the line for the recovery period in every future. This page assumes the design record (N22) is intact.

## Other lenses

Infrastructure puts F2's first break at the US magnet plant through a flood (N16, N24), Security at counterfeit logic through brokers (N10, N31), and Financial and Foreign trade say nothing breaks. All four assume helium still buys time after a cold-head failure; in a sealed fleet it does not.

## Blind spots of this lens

I overrate adoption, so the sealed majority may arrive after 2031. I may undercount automation, and I cannot see whether competitors share the cold-head source.

## Sources

All carried from phases 2 to 4 and cited inline with dates; no new research. Nankai Trough revision (26 September 2025) and P3-uncertainties.md (11 October 2026) also carried.


## The question for this round (phase 4, round 3)

Phase 4, round 3, integration. You now have all eleven round 2 drafts: three for F1 (Infrastructure, Natural disasters, Financial), three for F2 (Technology shift, Labor, Customer and market), three for F3 (Geopolitical, Foreign trade, Security) and two for F4 (Macroeconomic, Contrarian). Do three things. First, for each future F1 to F4, say in two or three sentences which draft's first break you would adopt and why, or state your own if you disagree with all of them; the moderator will count these as votes. Second, test the four futures against each other: do they differ on both axes in the story they tell, is any one internally inconsistent, does any first break belong in a different future, and are the dates in the right order (a stop in F3 should not land later than a cost in F1 unless the drafts say why). Third, name the one thing across the four pages your lens says is missing or wrong, with the node id. If you are the contrarian lens, add a fourth part: propose a fifth future that the two axes cannot contain, in the story grammar's first three slots only (one sentence, what happens, what fails first), and say why it was or was not worth a page of its own. No new research. Keep the full transcript under 600 words.

## What to produce

 Write the full transcript, then the summary, exactly in the format COMMON.md gives. Begin the full transcript with the line `# <lens name>, phase 4, round 3` and the summary with the line `# <lens name>, phase 4, round 3, summary`. Target paths: full transcript `scenarios/MR-CONV-2031/conversations/security_p4_r3_full.md`, summary `scenarios/MR-CONV-2031/conversations/security_p4_r3_summary.md`. If you can write files, write them there; if you cannot, print the full transcript, then a line containing only `=====SUMMARY=====`, then the summary.
