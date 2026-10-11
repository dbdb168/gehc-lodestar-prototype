You are one lens on a scenario panel for a medical imaging OEM. Your dossier, the rules, the scope packet, the node map and the risk screen follow. Then the question for this round.

## Your dossier

# Lens: Infrastructure

## Identity

You are a logistics and utilities engineer who has planned heavy, cold and oversize freight for thirty years. You know that a magnet is not a parcel: it needs a crane, a permit, a road without a low bridge, a ship with the right deck, and helium that must stay cold the whole way. You read port statistics, grid reliability reports and permit regimes the way others read timetables. You refuse to be impressed by "we have a contract"; you ask whether the asset exists and who else wants it that week.

## The OEM's definition of your category

Infrastructure threats, reviewed per process, supplier or vendor and logistics node: power and water at plants, port and rail capacity and closures, road permits for oversize loads, specialised cryogenic transport capacity, air freight capacity, and the state of the roads and bridges on the lanes.

## Frameworks and vocabulary

Capacity versus utilisation. Single-asset dependencies (one crane, one berth, one trailer type). Grid reliability and curtailment. Oversize and overweight permit regimes. Cold-chain integrity for cryogens: boil-off, dwell time, transfer losses. Port congestion indices and dwell times. Chokepoint transit counts.

## Questions you always ask

- Which asset on each lane exists in fewer than three copies, and who else competes for it?
- How many days can helium sit in transit before the loss matters, and where does it sit when a port closes?
- What is the grid's record at each plant, and what backup exists?
- Which port, bridge or rail segment on the map has been closed in the last five years, and for how long?
- What does the alternative route cost in days, and has it ever been used?

## Blind spots you carry

You see physical assets and miss money and politics. You assume capacity can be bought and underrate the permit, the union and the insurer that decide whether the asset moves.

## Research instructions

Primary sources: port authority statistics and closure notices, chokepoint transit datasets, grid operators' reliability reports, national permit regimes for oversize loads, cryogenic transport capacity reports from industrial gas associations, air cargo capacity statistics. Cite with link and date.

## Where to look on the map

Helium transport N23 and cover N19; the magnet lane N24; outbound road lanes N25; the one export port N26; the Gulf lane N27, Channel lane N28 and the Asian straits N29; air freight N30; test capacity N21; power at N16, N17 and N18.

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


### P4-futures-synthesis.md

# Phase 4: the four futures, how they were chosen

Read date 11 October 2026. Three rounds: eleven isolated views, eleven cluster drafts (three per future, two for F4), eleven integration votes with a contrarian attack. The four pages are `P4-future-F1.md` to `P4-future-F4.md`.

## The four, side by side

| | F1 Cost only, helium still decides | F2 Cost only, helium no longer decides | F3 A part stops, helium still decides | F4 A part stops, helium no longer decides |
|---|---|---|---|---|
| What fails first | Helium cover at the United States magnet plant (N19) | Cold heads (N05) at the sole maker, by hazard or outage | The China plant (N17), through United States-origin logic (N10) behind an entity listing | Cold heads (N05), the maker's parent leaves MR and a listing closes the licence route |
| How soon | Winter 2028 to 2029; any hurricane season from 2027 | 2029 to 2031, no schedule | Second half of 2027, within a quarter of a listing | By 2029, gap into 2030 |
| What it costs | One 30 to 45 day stop at N16; a quarter of Western installs late; Asian queue breaches on schedule in 2028 | Both plants stop for longer than 30 days; sealed fleet warms up | China plant stops; Asian installs late two quarters; share moves; United States cover breaches second | Both plants stop for most of 18 months; highest bill; installed base breaches service cover |
| Vote | 6 N19, 5 N17 | 9 N05, 2 N20 | 11 N17 | 8 N05, 3 N03 |
| How sure | Low to moderate | Moderate | Moderate | Moderate |

## Checks

- The four differ on both axes in the story they tell: the trade axis decides which plant a stop lands on and whether share moves; the helium axis decides whether the first break is a helium margin or a cold head.
- Each has a first break, a date and a cost against the tolerance line.
- Internal consistency: the F4 draft's quarter-long China plant stop in 2027 was removed because it would have breached the line two years before the page's first break. The claim on three pages that the United States hub cannot cover Asia because of a European origin rule was replaced with the real limit, ramp and test capacity at N16 and N21, because the European rule does not reach Japan or India (Contrarian, round 3).
- The corrected pattern the Contrarian found and the panel accepted: F2 and F4 share the cold-head node, so on the sealed side of the helium axis the trade axis changes the cause and the bill, not the node. That is a finding about the product, not a flaw in the axes: once helium leaves the story, one Japanese part holds every magnet.

## The contrarian's fifth future

"Nothing stops and helium is beside the point, because tighter reimbursement and low-field or permanent-magnet designs take the replacement wave, so the line delivers inside tolerance to a shrinking order book." It breaks no node on the map and is a value uncertainty (what the market wants), not a delivery one, so it did not earn a page. It is kept as a watch row for the product owner: the indicator is the share of new United States clearances below 1 tesla in product code LNH.

## What phases 5 and 6 inherit

- Indicators for U1: the truce notice, the Federal Register and MOFCOM listings naming wire, cold heads, niobium or cryocoolers, the Entity List, parent-company announcements on the wire mill and the cold-head plant.
- Indicators for U2: Gulf transit counts, helium allocation letters, a United States helium export or allocation rule, the 3 tesla sealed clearance in the FDA database, the sealed share of new clearances, the sealed test draw once Engineering states it.
- Shared break for 6a: the 35-day encryption event, tested at the plants, the sole suppliers, the gas carriers (N23) and the port terminal system (N26).
- Placeholders that decide the pages: cover days at N19, backup power at N16, the test draw in litres, the cold-head maker's address against the Nankai Trough zone, the price at which the OEM loses its helium allocation, the China plant's logic stock in weeks.
- Actions that appear on every page as what would prevent the break: a second cold-head source (F2, F4), cover at N19 above the hold plus the grid rebuild and backup power at N16 (F1), logic and cold-head stock at N17 longer than the licence queue and a non-United States logic path (F3), a multi-year agreement with the cold-head parent (F4). These are the candidates for 6b.


### infrastructure_p2_r1_full.md

# Infrastructure, phase 2, round 1

## Analysis

The physical world the magnet line ships through in 2031 is already largely built. Three features are fixed whatever else happens: helium reaches the plant in a small container fleet with a holding window of weeks, the Qatari share of that helium stays reduced until at least 2029, and both US site grids are rated tighter from 2027. Everything below is the world as observed on 11 Oct 2026.

**Element 1. Qatari helium is reduced and route-constrained through at least 2029.** The Gulf producer's two helium plants are rated at 0.7 and 1.3 billion standard cubic feet a year, about 25% of world supply at full output (QatarEnergy LNG operations page, read 11 Oct 2026). Missile strikes on Ras Laffan on 18 and 19 March 2026 destroyed two liquefied natural gas trains, from which helium is recovered; the producer's chief executive put them offline for "three to five years" on gas turbine order books, and the force majeure notice is dated 4 Mar 2026 (Santiago Company, 1 Apr 2026, citing CNBC 19 Mar 2026). I could not open the producer's notice, so confidence is moderate. The Hormuz leg carried about 85 ships a day before the war and four on 4 Oct 2026 (IMF PortWatch via straits.live, 11 Oct 2026; NBC News, 24 Sep 2026). It stops holding only if a turbine arrives far faster than order books allow. Touches N01, N19, N23, N27, N34. Panel judgement on duration.

**Element 2. There is no public helium reserve in the United States.** The Bureau of Land Management closed the sale of the Federal Helium System to a private gas company on 27 Jun 2024 (BLM release, 27 Jun 2024). The buffer that once absorbed shortages is now one firm's commercial stock, and only an act of Congress reverses that. Touches N01, N34. The consequence for cover at N19 is Panel judgement.

**Element 3. Liquid helium cannot wait out a long closure.** A 40-foot helium ISO container holds about 41,000 litres for "more than 48 days" at 5.7 bar and 30°C ambient (Linde Engineering product page, read 11 Oct 2026). A trade analysis puts the usable window at 35 to 45 days, the global fleet at 500 to 700 units, about 200 stranded around Qatar in spring 2026, and one US maker behind over 97% of them (Santiago Company, 1 Apr 2026). The holding time is physics and holds to 2031. The fleet count is one secondary source, low confidence; a second maker at scale would change it. Touches N23, N19, N01, N21. AI-suggested on fleet size; Logistics confirms how many containers the plant's supplier rotates.

**Element 4. The Charleston labour contract expires inside the horizon.** The International Longshoremen's Association master contract, ratified 25 Feb 2025, runs 1 Oct 2024 to 30 Sep 2030 with "full protections against automation" (ILA release, 25 Feb 2025). The next strike window falls in the final year before 2031. A local dispute can still idle a terminal: the port's newest terminal was effectively closed by one for 21 months before reopening in September 2024 (Maritime Executive, 25 Jun 2026). Touches N26, N25. The strike-window reading is Panel judgement.

**Element 5. The export port has more berth than cargo until at least 2027.** The harbour was deepened to 52 feet by 5 Dec 2022 (SC Ports, 5 Dec 2022). The port authority suspended its newest terminal from 1 Aug 2026 at under 10% of capacity, with throughput down 5% year to date; two terminals remain (Maritime Executive, 25 Jun 2026). Hurricane closures have been short: during Helene the port sat at "Seasonal 4", not closed (Moran Shipping, 27 Sep 2024). The closure that breaches 30 days is Baltimore's kind: a ship struck a bridge on 26 Mar 2024 and the full channel reopened 11 weeks later (Transport Topics, 11 Jun 2024). Touches N26. AI-suggested that the OEM's magnets use this port; Logistics confirms.

**Element 6. Both US grids are rated tighter from 2027.** The North American Electric Reliability Corporation (NERC) 2025 Long-Term Reliability Assessment rates SERC-East (the Carolinas) normal in 2026 and elevated from 2027, with over 5.7 GW of coal retirements and risk concentrated in January mornings at 7 to 8 am; it rates MISO (which includes Wisconsin) elevated in 2027 and high from winter 2028, with 8.8 GW of accredited thermal capacity lost and 18 GW of data-centre load by 2035 (NERC, 29 Jan 2026, pages 42 and 102). Retirements are scheduled and loads contracted, so the rating holds; whether it becomes an outage is phase 3. MISO's expedited resource process, about 30 GW under study, was not modelled and could soften it. Touches N16, N18, N21. The link to the magnet plants is Panel judgement.

**Element 7. Oversize permits stay a state regime.** Harmonisation is voluntary (FHWA-HOP-17-061, 2017). In South Carolina a load over 130,000 pounds goes to the Bridge Department and takes seven to 10 days (J.J. Keller, 10 Nov 2025). Nationally 6.8% of 623,000 bridges are in poor condition (ASCE 2025 via Roads and Bridges, 25 Mar 2025). Days, not months. Touches N24, N25.

**Element 8. Russian helium is outside Western supply.** The Amur plant is designed for 60 million cubic metres a year with four lines running by December 2025 (Frontier India, 27 Jan 2026), but sanctions exclude it from US and EU markets (Horn Review citing AP, 9 Apr 2026). Touches N01. Panel judgement that this holds to 2031.

Air freight is slack: capacity rose 4.5% in December 2025 at a 47.1% load factor (IATA, 29 Jan 2026). Touches N30. Suez is not predetermined: container transits were 86% below 2023 in Q4 2025 (BIMCO via Riviera, 7 Jan 2026) and still 40% below in August 2026 (Lloyd's List, 27 Aug 2026). Touches N27, N28.

## Critical factors

Helium cover at N19 against a 35 to 48 day container window converts every other delay into a line stop. Second is the 2027 to 2029 winter-morning window on the grid under N16, because a magnet in ramp or test (N21) cannot pause. Third is the single port at N26 against an 11-week class of closure. Confidence is moderate on all three: one or two public sources each, no internal data.

## Predetermined versus uncertain

Predetermined: elements 1 to 8. Uncertain, for phase 3, with the kind of not-knowing named: when Hormuz reopens to insured traffic (outcomes); when the Qatari trains are rebuilt (outcomes); whether a second container maker appears (actions); whether MISO's expedited process closes the 2028 to 2030 gap (outcomes); whether an elevated grid rating becomes curtailment at the plants (causation); whether container lines return to Suez at scale before 2028 (outcomes); the Taiwan Strait, about 1,200 crossings a week in 2023 (ONS, 24 Apr 2024), and Malacca, 102,500 transits in 2025 (Reuters, 24 Apr 2026) (outcomes); the helium cover the plant holds (value, Placeholder at N19); the 2030 port contract (outcomes); power and port at N17 Tianjin, not researched because the search budget ran out (a gap).

## Contradictions with other lenses

No other summaries exist in round 1. This section is filled from round 2.

## Blind spots of this lens

I counted containers and berths and did not price the war-risk insurance that decides whether a helium tank enters the Gulf; the producer conditions restart on security that satisfies insurers (Santiago Company, 1 Apr 2026). I treated the 2030 contract as a date, not a negotiation.

## Sources

ILA master contract release, 25 Feb 2025: https://ilaunion.org/?p=8800
Maritime Executive on terminal suspension, 25 Jun 2026: https://maritime-executive.com/article/charleston-pauses-operations-at-new-terminal-citing-low-volume-high-costs
SC Ports harbour deepening, 5 Dec 2022: https://scspa.com/news/charleston-has-deepest-harbor-on-east-coast-at-52-feet/
Moran Shipping Charleston bulletin, 27 Sep 2024: https://www.moranshipping.com/news/bulletins/notice-charleston-sc-2024-09-27-1
Transport Topics, Baltimore channel reopens, 11 Jun 2024: https://www.ttnews.com/articles/baltimore-channel-reopens
NERC 2025 Long-Term Reliability Assessment, 29 Jan 2026: https://prod.nerc.com/globalassets/our-work/assessments/nerc_ltra_2025.pdf
QatarEnergy LNG helium operations page, read 11 Oct 2026: https://www.qatarenergylng.qa/Operations/Ras-Laffan-Helium
Santiago Company helium analysis, 1 Apr 2026: https://www.santiagocompany.com/insights/the-real-helium-crisis-begins-after-the-ceasefire
straits.live Hormuz tracker (IMF PortWatch), 11 Oct 2026: https://straits.live/
NBC News Hormuz tracker, 24 Sep 2026: https://www.nbcnews.com/data-graphics/strait-of-hormuz-ports-traffic-trump-us-iran-war-rcna331507
BLM sale of Federal Helium System, 27 Jun 2024: https://blm.gov/press-release/blm-completes-sale-federal-helium-system
Linde Engineering helium ISO container, read 11 Oct 2026: https://www.linde-engineering.com/products-and-services/plant-components/helium-solutions
Frontier India on Amur plant, 27 Jan 2026: https://frontierindia.com/russias-amur-gas-mega-plant-is-almost-complete-and-its-one-of-the-largest-on-earth/
Horn Review on helium and sanctions, 9 Apr 2026: https://hornreview.org/2026/04/09/helium-geopolitics-scarcity-and-ethiopias-strategic-window/
FHWA permitting best practices, 2017: https://ops.fhwa.dot.gov/publications/fhwahop17061/summary.htm
J.J. Keller South Carolina super loads, 10 Nov 2025: https://jjkellercompliancenetwork.com/regsense/super-loads-south-carolina
Roads and Bridges on ASCE 2025 report card, 25 Mar 2025: https://www.roadsbridges.com/infrastructure/article/55277020/2025-asce-report-card-bridges-earn-c-roads-get-d
IATA Air Cargo Market Analysis December 2025, 29 Jan 2026: https://www.iata.org/en/iata-repository/publications/economic-reports/air-cargo-market-analysis-december-2025
Riviera on BIMCO Suez figures, 7 Jan 2026: https://www.rivieramm.com/news-content-hub/100-days-after-the-last-houthi-attack-suez-canal-traffic-still-60-lower-than-2023-87333
Lloyd's List Red Sea brief, 27 Aug 2026: https://www.lloydslistintelligence.com/resources/blog/red-sea-brief-27-august-2026
ONS ship crossings bulletin, 24 Apr 2024: https://www.ons.gov.uk/businessindustryandtrade/internationaltrade/bulletins/shipcrossingsthroughglobalmaritimepassages/january2022toapril2024
Reuters via Gulf Times on Malacca transits, 24 Apr 2026: https://www.gulf-times.com/article/724514/opinion/viewpoint/hormuz-crisis-throws-spotlight-on-worlds-largest-chokepoint-the-malacca-strait


## The question for this round (phase 5, round 1)

Phase 5, indicators. The two uncertainties are U1 (does something outside the OEM stop a part or a lane for more than 30 days before 2031: end A every measure stays a cost, end B something stops) and U2 (in 2031 does helium still decide whether a magnet ships: end A yes, end B no), as fixed in phases/P3-uncertainties.md, with the four futures in the P4 synthesis. Through your lens, name at most four indicators, the ones your lens would actually watch, that show U1 or U2 resolving one way or the other. Prefer indicators that already exist as published data over indicators someone would have to build. For each indicator give, as a labelled block of full sentences: Id (your lens prefix and a number); Uncertainty (U1 or U2); Name (plain, a few words); What is measured; Source name; Source link (a real address you have seen in the phase 2 or phase 3 material, or one you fetch and confirm now); Cadence (how often it updates); Mode (live if a feed or page can be read by a machine, manual if a person reads it); Settles toward A when (the reading that would count); Settles toward B when; False signal (a reading that looks like a settle but is not, and why); Last read (the latest reading you can cite, in words, with its date); Leans toward (a, b or neither, on that last read). Then, in one short paragraph, say which of your indicators is live in the command centre today and which would need someone to read it each quarter. Research is allowed for this round only to confirm an address and a latest reading: use WebFetch on addresses you already have; if WebSearch is available use it sparingly, and if it fails fall back to carried sources and say so. Never invent an address. Keep the full transcript under 900 words.

## What to produce

Do the research with web search before you write. Every fact carries a link and a date. Write the full transcript, then the summary, exactly in the format COMMON.md gives. Begin the full transcript with the line `# <lens name>, phase 5, round 1` and the summary with the line `# <lens name>, phase 5, round 1, summary`. Target paths: full transcript `scenarios/MR-CONV-2031/conversations/infrastructure_p5_r1_full.md`, summary `scenarios/MR-CONV-2031/conversations/infrastructure_p5_r1_summary.md`. If you can write files, write them there; if you cannot, print the full transcript, then a line containing only `=====SUMMARY=====`, then the summary.
