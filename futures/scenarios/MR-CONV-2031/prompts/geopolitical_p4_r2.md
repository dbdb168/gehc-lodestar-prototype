You are one lens on a scenario panel for a medical imaging OEM. Your dossier, the rules, the scope packet, the node map and the risk screen follow. Then the question for this round.

## Your dossier

# Lens: Geopolitical

## Identity

You are a geopolitical analyst who counts capabilities, not intentions. You have watched states weaponise materials, shipping routes and standards for thirty years and you assume every chokepoint is a lever someone will eventually pull. You read export-control notices and port-state actions before you read speeches. You are not interested in whether a state is friendly; you are interested in what it can stop, for how long, and what it wants in return.

## The OEM's definition of your category

Geopolitical threats, reviewed per process, supplier or vendor and logistics node: conflict, state control of materials and routes, bloc formation, sanctions as instruments of competition, and the political risk of operating a plant in a country that may become a counterparty.

## Frameworks and vocabulary

Chokepoints (Hormuz, Bab el-Mandeb, Suez, Malacca, the Taiwan Strait). Spheres of influence and buffer states. Economic statecraft: export controls, entity lists, investment screening, licensing regimes. Security dilemma. Grey-zone pressure short of war. Strategic materials policy: who holds the reserve, who holds the processing. Decoupling, de-risking, friend-shoring, and their enforcement gaps.

## Questions you always ask

- Who controls access to each material and route on this map, and what leverage does that give them?
- Which states are rising and which are declining in the regions that matter here, and how do states behave in transition?
- Which plant on the map sits inside a potential counterparty's borders, and what happens to it in a rupture?
- Where are the flashpoints on the routes, and what is the alternative route's cost in weeks?
- What historical parallel resolves this, and how did it resolve?

## Blind spots you carry

You are deterministic about geography and dismissive of ideas, non-state actors and domestic politics. You underrate how fast technology removes a dependency and how often a threatened closure never happens.

## Research instructions

Primary sources: export-control registers and licensing notices, sanctions designations, customs and trade statistics, port-state and naval advisories, producer and processor disclosures, official statistics on material production by country. Date everything; this field moves quarterly.

## Where to look on the map

Helium N01 and N34 (producer states and their export rules); niobium N02; wire N03; cold heads N05; logic and graphics N10 and N12; the China plant N17 and its lanes N29; the Gulf lane N27; payment rails N31.

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


### story_grammar.md

# The story grammar

Every future is written in the same seven slots, each a full sentence or two. The slots are fixed so the screens can render them and so a reader always finds the same thing in the same place. No slot holds a bullet list.

| Slot | What goes in it | Example shape |
|---|---|---|
| The future in one sentence | The two answers that define it | "Trade is restricted and magnets still need helium." |
| What happens | The path from today, in two periods (2026 to 2028, 2028 to 2031) | "By 2028 the export register names cryogenic parts. By 2031 ..." |
| What fails first | The node, in plain words, with its tag | "Superconducting wire. The one qualified mill is behind a licence." AI-suggested |
| How soon | A date or a window after the break | "Deliveries pass the 30-day line in the third quarter of 2028." |
| What it costs | Against the tolerance line and the value being protected | "About forty installs a quarter run more than 30 days late. Two tenders are lost." |
| What prevents it | The action, its owner and the start-by date | "Sourcing qualifies a second mill, started by the second quarter of 2027." |
| How sure we are | High, moderate or low, with the basis | "Low. Two reads, and the magnet axis has not moved." |
| What would change this | The event that would move the story | "A tariff rollback signed before 2028." |

# The uncertainty grid (phase 3)

Rows are candidate uncertainties, written as questions. Columns are the eight risks. A mark means the uncertainty moves that risk. The two rows with the most marks that are also independent of each other become the axes. The contrarian's third row is kept as a watch item with the reason it was not chosen.

| Uncertainty (as a question) | Kind of not-knowing | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | Count |
|---|---|---|---|---|---|---|---|---|---|---|


### geopolitical_p4_r1_full.md

# Geopolitical, phase 4, round 1

## Analysis

Bottom line: whenever a state measure lands, the first break is the China plant (R2, N17); whenever none does, it is helium cover (R8, N19) or the cold head (R5, N05). The United States plant (N16) never breaks on a lever a foreign state holds. Every future assumes the design and qualification record (N22) is intact; the encryption break (C4) sits in phase 6a. Demand shape (C5) moves the bill, never the break.

### F1 "Cost only, helium still decides" (U1 A, U2 A)

What happened. 2026 to 2028: the truce is renewed at the notice date (first read 10 November 2026), the Section 232 medical investigation (Federal Register, 26 Sep 2025) ends in a duty that stays a cost, and no state lists wire, niobium or cold heads. Hormuz stays near closed and the Qatari repair runs three to five years (IOM3, 23 Mar 2026). 2028 to 2031: the Gulf reopens in stages; Russian helium stays barred past 31 December 2027 (Global Trade Alert); allocation continues (USGS, Feb 2026).

Nodes. N01 and N34 are allocated, not stopped. N27 reroutes and adds weeks. N17 buys helium in a market without Qatar at full volume. N31 adds duty and days.

Breaks first. R8 helium cover (N19, Placeholder): a rerouted delivery plus a grid or weather event outruns the cover days. Window: any winter from 2027, when the Carolinas grid is rated elevated (NERC, 29 Jan 2026). Panel judgement.

Cost. Installs slip past 30 days in clusters; no line stop.

Most confident: levers stay unpulled, as the 2017 Qatar blockade and the Russian licence show (high). Least confident: how long the Gulf stays impaired (U-H1, outcomes; low, the evidence conflicts).

### F2 "Cost only, helium no longer decides" (U1 A, U2 B)

What happened. 2026 to 2028: the same trade path. Hormuz reopens before 2028, allocation ends, a 3 tesla sealed magnet is cleared, and tenders pull toward low-helium designs (NHS England, Oct 2020). 2028 to 2031: helium is a buyers' market; most new builds are sealed; service helium (N34) is a cost line.

Nodes. N01, N19, N23 and N27 leave the delivery path. N05 cold heads, from one Japanese source, carry the thermal load of every magnet. N17 keeps Asian access (P9).

Breaks first. R5 cold heads (N05, AI-suggested, Engineering confirms), through the single Japanese plant rather than a state measure: its hazard classification rose in September 2025 (P15) and its parent's order book is filling with physics work (P18). After 2028.

Cost. A long interruption stops both lines; a short one is a cluster of late installs.

Most confident: no foreign state holds a lever on N16 or N18 (high). Least confident: whether a sealed magnet's test draw is a cylinder or a delivery (causation; Placeholder).

### F3 "A part stops, helium still decides" (U1 B, U2 A)

What happened. 2026 to 2028: the truce lapses at the notice date; entity listings name the China plant's logic supplier or the plant itself; a producer state lists wire or cold heads (MOFCOM Announcement No. 1, 6 Jan 2026, is the precedent). Hormuz stays impaired. 2028 to 2031: two blocs harden; the China plant builds for Asia without United States-origin logic; the United States plant waits on allocated helium.

Nodes. N17 sits inside a counterparty's borders and its lanes N29 run the Taiwan Strait under grey-zone pressure (U-G1). N10 and N12 cannot reach N17. N03 is behind a licence if the qualified mill sits in a listing state (AI-suggested, Sourcing confirms). N31 splits by bloc.

Breaks first. R2 China plant (N17), through N10 logic, within one quarter of an entity listing, because the plant holds weeks of logic, not months. Window: the 2027 sourcing cycle. Panel judgement, moderate.

Cost. Eastern Hemisphere deliveries stop for longer than 30 days with no second plant to cover (N29); the Western Hemisphere runs late on helium. Both lines breach.

Most confident: a listing strands N17 before it touches N16 (high, basis: geography). Least confident: whether any state pulls the wire lever (outcomes, low).

### F4 "A part stops, helium no longer decides" (U1 B, U2 B)

What happened. 2026 to 2028: sealed conversion completes behind a hardening trade wall; the Gulf reopens; allocation ends. 2028 to 2031: the listing lands on cryogenic parts, and the single Japanese cold-head source sits inside one bloc.

Nodes. N05 is the lever. N17 cannot import cold heads from a bloc-aligned source; N16 can. N03 is in the same position if its mill is in a listing state. N27 and N19 are off the delivery path.

Breaks first. R2 (N17), now through N05 rather than N10, within a quarter of the listing, from 2028.

Cost. A line stop at N17 longer than 30 days; the United States plant keeps shipping.

Most confident: the stop lands on the plant inside the counterparty's borders (high). Least confident: whether the cold head is a break or a cost in a sealed world; the panel split six to five (causation).

## Critical factors

The truce notice date (N17, N31). Any notice naming wire, niobium or cold heads (N03, N05). The Hormuz transit count (N27). Helium cover in days (N19, Placeholder).

## Predetermined versus uncertain

Predetermined in every future: the four-state helium market, the procurement walls, the niobium concentration (P3, P6, P9). Uncertain: U-H1 and U-G1 (outcomes), the wire's control category (AI-suggested), the sealed test draw (causation, Placeholder).

## Blind spots of this lens

This lens reads every unpulled lever as pulled, so F3 and F4 may be more vivid than the record warrants. It underrates how fast a second cold-head or wire source could appear and discounts the domestic politics behind the truce.

## Sources

Carried only: USGS (Feb 2026); Global Trade Alert; IOM3 (23 Mar 2026); Federal Register 2025-18729 (26 Sep 2025); MOFCOM Announcement No. 1 (6 Jan 2026); NERC (29 Jan 2026); FDA K253779 (5 Feb 2026); Regulation (EU) 2025/1197 (20 Jun 2025); NHS England (Oct 2020); Headquarters for Earthquake Research Promotion (2025).


### foreign_trade_payments_p4_r1_full.md

# Foreign trade and payments, phase 4, round 1

## Analysis

Bottom line: no trade rule stops a part in F1 or F2; the stop lands on the China plant in F3 and on the cold head in F4. Every future assumes the design and qualification record (N22) is intact; the encryption break (C4) is phase 6a. Demand shape (C5) changes the bill, not the break.

### F1 Cost only, helium still decides

2026 to 2028. The United States and China truce rolls over at its notice date. The Section 232 medical investigation ends in a duty on finished scanners only. Duties stay at 10 and 12.5 percent on wire, cold heads and logic, and 50 percent on the copper content of worked copper (Federal Register, 5 August 2025; Supreme Court, 20 February 2026). Hormuz stays near closed and Qatari helium impaired (P3). Russian helium self-licensing lapses on 31 December 2027 (Global Trade Alert, 14 April 2026).

2028 to 2031. Helium is bought on allocation letters in both hemispheres; the United States plant pays the world price but keeps supply. Customs and payment rails (N31) add days and fees, not a stop.

Nodes: N03, N05 and N10 to N12 move at a higher landed cost; N01 and N34 are allocated, not barred; N17 trades parts both ways.

Breaks first: R8, helium cover (N19), when an allocation shortfall meets the container fleet's 35 to 48 day liquid hold (P5), by the first quarter of 2028. Panel judgement.

Cost: a line stop of a few weeks at the United States plant once or twice before 2031, with installs more than 30 days late the quarter after. Placeholder until Logistics sets the cover.

Most confident: duties stay a cost and the copper annex excludes magnet-grade wire (P7). Least confident: whether a United States helium allocation rule arrives.

### F2 Cost only, helium no longer decides

2026 to 2028. The trade path of F1. Hormuz reopens to insured traffic in 2027 and allocation letters stop. A 3 tesla sealed magnet is cleared and sealed builds take most new orders (P1).

2028 to 2031. Trade exposure is price: 12.5 percent on Japanese cold heads, 10 percent on European wire, 25 percent on chips unless the industrial exemption holds (P16; AI-suggested, Sourcing confirms). Helium bans reach service (N34), not shipment.

Nodes: N03 and N05 flow with duty paid; N01 and N19 leave the delivery path.

Breaks first: none through this lens's category. The nearest is R5, cold heads (N05), because a sealed fleet puts every magnet on one Japanese source; the trigger would be a hazard or an owner, not a rule. Panel judgement.

Cost: no installs late from trade; margin pays the duty stack. Placeholder.

Most confident: the tariff stack has no expiry and no court to remove it (P7). Least confident: whether a later proclamation extends the scanner duty to parts.

### F3 A part stops, helium still decides

2026 to 2028. The truce lapses. Entity listings in 2027 name the China plant's logic supplier and a cryogenic parts route; licensed items stop flowing through N17. Hormuz stays shut and Qatar's repair runs past 2028 (U-H1).

2028 to 2031. The China plant is stranded behind a licence with a low approval rate; the United States plant waits on allocated helium and, under the tender walls (Regulation (EU) 2025/1197, 20 June 2025; P9), cannot cover Asia or Europe.

Nodes: N17 loses N05 and N10 supply; N29 exports fall with it; N31 becomes a licence queue.

Breaks first: R2, the China plant (N17), through a licence on cold heads (N05), by the third quarter of 2027; R8 (N19) follows by early 2028. AI-suggested on which parts the China plant imports; Sourcing confirms.

Cost: a line stop longer than 30 days at the China plant; Eastern Hemisphere installs more than 30 days late for two quarters.

Most confident: the listing tools exist and were used on this sector in 2025 (P8, P9). Least confident: the licence approval rate for cryogenic parts, which is not published.

### F4 A part stops, helium no longer decides

2026 to 2028. Hormuz reopens and sealed magnets take new builds as in F2. The truce lapses. A quantum or fusion control sweep in 2028 lists cryocoolers and niobium-titanium wire (Panel judgement; the route the technology lens named in phase 3).

2028 to 2031. Both plants' cold heads need a Japanese export licence; the sole European wire mill ships under licence with delay. Helium is cheap and irrelevant to shipment.

Nodes: N05 is the gate and N03 a second; N16 and N17 wait on the same licence.

Breaks first: R5, cold heads (N05), by 2029, because the sealed fleet makes the cold head carry every magnet's thermal load. R4, wire (N03), breaks within a year.

Cost: a line stop longer than 30 days at both plants; installs late worldwide.

Most confident: a listing of cryocoolers reaches both plants, since there is one qualified source. Least confident: whether a sweep names the Gifford-McMahon class at all; wire sits outside entry 1C005 today (AI-suggested; Quality and regulatory confirms).

## Critical factors

The truce notice; a Section 232 proclamation naming parts; any control-list entry naming cryocoolers, wire or niobium; a United States helium allocation rule (N01, N03, N05, N17, N19, N31).

## Predetermined versus uncertain

Predetermined: the duty stack (P7), the tender walls (P9), the Russian lapse date (P3). Uncertain, outcomes: the truce, the scanner duty, any listing. Uncertain, causation: a sealed magnet's test draw (Placeholder, Engineering).

## Blind spots of this lens

I date breaks by rules and miss a producer holding parts back for its own reasons; F3 may be dated too early if a paper listing is loosely enforced.

## Sources

Carried from phases 2 and 3: Federal Register (5 August 2025; 26 September 2025); Supreme Court (20 February 2026); USGS (February 2026); Global Trade Alert (14 April and 10 July 2026); Regulation (EU) 2025/1197 (20 June 2025); FDA K253779 (5 February 2026); truce sources of 5 November 2025 and September 2026.


### security_p4_r1_full.md

# Security, phase 4, round 1

## Analysis

Bottom line first. The four futures differ less in whether a system gets encrypted than in which system matters when it does. Where helium still decides, the first break runs through the helium chain's outside systems. Where it no longer decides, the break moves to the electronics and cold-head channels, where counterfeit and grey-market pressure rise once a single part carries every magnet. Every future assumes the design and qualification record (N22) is intact; the encryption break (C4) is carried in phase 6a. Demand shape (C5) moves the bill, not the break.

### F1 "Cost only, helium still decides"

What happened. In 2026 to 2028 the truce renews, the Section 232 medical report stays confined to finished scanners, and no listing names wire or cold heads (P3 settle events). Qatari helium stays impaired past 2028, so the Gulf is allocated by price (U-H1). Port cyber plans are due by 16 July 2027 (P10). In 2028 to 2031 the Carolinas grid is rated elevated and the Midcontinent high (P14), and helium still moves in one container fleet (P5).

What is true for this lens. The weak system is not the plant but the gas carrier's dispatch and the port's terminal operating system (N23, N26, N31). The five-week recovery record (P11) applies to a carrier too. Panel judgement.

What breaks first. R8 helium cover (N19), through a cyber outage at a gas carrier or port system in a winter when the grid also curtails (N23, N26, N16). Window: winter 2028 to 2029.

What it costs. The United States magnet plant stops for as long as the outage outlasts the cover; whether that passes 30 days rests on the cover Placeholder.

Most confident: port and device cyber duties are dated law (P10). Least confident: the cover in days (N19, Placeholder, Logistics).

### F2 "Cost only, helium no longer decides"

What happened. Same trade path as F1. In 2026 to 2028 a 3 tesla sealed magnet is cleared and Hormuz reopens to insured traffic (P3 settle events). By 2031 sealed magnets take most new builds (U2 end B). Logic and memory allocation runs into 2028 (P16).

What is true for this lens. Allocation pushes buyers toward brokers, and programmable logic was the most reported counterfeit class in 2025 at more than 15 percent of reports (P11). Panel judgement.

What breaks first. R6 logic (N10), through a counterfeit lot entering by the broker and air channel (N30, N31). Window: 2027 to 2028, during allocation.

What it costs. A quality hold on control electronics across every system; installs run late for the hold's length. Thirty days is plausible, not shown.

Most confident: the counterfeit logic market is measured (P11). Least confident: whether the OEM buys logic through brokers at all (AI-suggested, Sourcing confirms).

### F3 "A part stops, helium still decides"

What happened. In 2026 to 2028 the truce lapses at its notice date (phase 3, contradiction 1), entity listings follow, and China's amended cyber law, in force from 1 January 2026 (P10), is used in an investigation that freezes exports from the foreign-owned plant (U1 end B, legal-action variant). The Gulf stays shut and a United States allocation rule is proposed (P3 settle events). In 2028 to 2031 the plants live in different helium worlds (P4); neither covers the other.

What is true for this lens. The stop arrives as a data demand and a payment freeze, not a tariff (N31, N17). Panel judgement.

What breaks first. R2 China plant (N17), through customs and payment rails (N31), inside the 2027 sourcing cycle. Window: first half of 2027.

What it costs. An Eastern Hemisphere line stop longer than 30 days; Asian installs late for a quarter or more (P9).

Most confident: the law and listing tools exist (P10, P7). Least confident: whether either is used on this plant (outcomes).

### F4 "A part stops, helium no longer decides"

What happened. In 2026 to 2028 a producer-country notice lists cryocoolers or the cold-head maker's parent leaves MR (P18, U1 end B). Sealed conversion finishes by 2029 behind a trade wall; by 2031 every magnet depends on one listed part.

What is true for this lens. A sole part that keeps every magnet cold draws counterfeit and theft, and cold heads were not a documented counterfeit class in 2025 (P11), so no detection record exists. Cargo theft targeted electronics most in 2025 (P11); the hub and air lanes carry the highest value per crate (N18, N30). Panel judgement.

What breaks first. R5 cold heads (N05), through the licence queue at N31, then theft and substitution on N30. Window: 2029.

What it costs. Both plants stop beyond 30 days; the installed base loses service cold heads too (N34).

Most confident: a scarce sole part creates a grey market. Least confident: that cold heads are listed (outcomes).

## Critical factors

Carrier and port systems (N23, N26) in F1; the broker channel (N10, N30) in F2; the cyber-law instrument against N17 in F3; the cold-head licence and aftermarket (N05, N31) in F4.

## Predetermined versus uncertain

Predetermined: dated cyber duties (P10), the five-week recovery record, the counterfeit and theft markets (P11). Uncertain: outcomes in every future; causation for the sealed test draw; value for whether a late install is punished (C5).

## Contradictions with other lenses

Carried from phase 3: the cold head at U2 end B is a break for six lenses, a cost for five. This lens writes it as a break in F4.

## Blind spots of this lens

A trusted supplier quietly degrading stays invisible in all four futures; ramp failures by lot at N03 and N05 are the indicator. This lens may overrate attacker interest in a niche part.

## Sources

No new fetch. Carried: security news report on the five-week recovery, 15 November 2025; counterfeit-reporting body, 2025 report; cargo-security insurer, 2026 report; EUR-Lex 2024/2847; National Law Review, 28 January 2025; NERC, 29 January 2026; FDA K253779, 5 February 2026; Federal Register, 26 September 2025.


### contrarian_p4_r1_summary.md

# Contrarian, phase 4, round 1, summary

## Key points

In F1 the first risk to break is the China plant, not the United States magnet plant, because the United States plant sits inside the one net-exporting helium producer while the China plant's helium ran through Qatar and Hormuz, so allocated test helium pushes Asian installs past 30 days by the second half of 2027. N17, N01, N27, N16, N19; Panel judgement, built on USGS (Feb 2026).

F2 contains no external break by construction; the only risk that moves on no external uncertainty is the technicians, and it breaks there only if sealed conversion retools trades on an older roster than anyone has confirmed, which is the weakest claim this lens makes. N20, N35, N36; Panel judgement, low confidence.

In F3 the stop most ready to land is the truce lapse and the entity listings that follow it, so the China plant stops for more than 30 days by mid-2027 before any wire licence appears. N17, N31, N29, N03; Panel judgement, moderate confidence.

In F4 the panel's cold-head break is the wrong first break, because every magnet the OEM can ship, sealed or conventional, is wound from one qualified mill's niobium-titanium wire, so a producer-country listing on wire stops both plants from the first quarter of 2029. N03, N02, N16, N17, N05; Panel judgement, moderate confidence.

Every future above assumes the design and qualification record is intact, and demand shape changes each bill but no break. N22, N35, N36; Panel judgement.

## In one hundred words

Three of the four futures break first at a node the obvious story does not name. In F1 and F3 the China plant goes first: it has no domestic helium in F1 and sits on the dated truce in F3. In F4 wire goes first, because sealed and conventional magnets share it and the cold head does not carry the whole story. F2 has no external break; its only candidate is the technicians, on an unconfirmed roster age, which makes F2 the sponsor's comfortable future and the one to test hardest in round 2. All assume N22 intact.


### customer_market_p4_r1_summary.md

# Customer and market, phase 4, round 1, summary

## Key points

In F1 and F3, where helium still decides, the Asian markets served from the China plant learn of lateness first, because their helium comes through the closed Gulf, and R2 breaks first through that plant in the 2027 to 2028 window (N17, N29, N36; Panel judgement). In F2 and F4, where helium no longer decides, the cold head becomes the part that keeps every sealed magnet cold, so a single-source outage hits the installed base and the order book in the same month (N05, N33, N34; Panel judgement, moderate confidence). Sealed demand in F2 and F4 is pulled by European origin rules and net zero scoring rather than pushed by the OEM (N36; Regulation (EU) 2025/1197, 20 Jun 2025; NHS England, Oct 2020). No retrieved tender framework scores delivery reliability, so the cost of lateness is paid through re-tender behaviour, and Japan and India are one tender cycle from a China-built competitor in F3 (N36, N29; Panel judgement). Whether competitors share the same cold-head source decides if any share moves in F2 or F4 (N05; AI-suggested, Sourcing confirms).

## In one hundred words

From the buyer's chair the futures differ in which market finds out first. Where helium still decides, Asian buyers see late installs first and the China plant breaks by the 2027 sourcing cycle. Where helium no longer decides, committees have bought sealed designs on carbon grounds and the cold head carries every magnet, so an outage stops shipments and service together, and the installed base is where value is lost. No tender scores reliability yet; lateness costs share through re-tenders. The open question for this lens is whether competitors share the cold-head source, which decides whether any share moves at all.


### financial_p4_r1_summary.md

# Financial, phase 4, round 1, summary

## Key points

In F1 the China plant breaks first in 2028 to 2029 when an allocation letter cuts a helium delivery, while the carrying cost of cover rises with a 4 percent rate and 5.4 percent producer inflation. N17, N19, N23. Panel judgement on P3, P5, P17.

In F2 nothing breaks; the largest financial change is the release of working capital tied up in helium cover, and the cold head becomes a cost that stretches with its parent's priorities. N05, N19. Panel judgement on P18.

In F3 the China plant breaks first in 2027 to 2028 through a listing of cold heads or logic, and the loss is uninsured because trade rules and owner exits sit outside contingent business interruption cover. N05, N10, N17. Panel judgement, low confidence.

In F4 the cold head breaks first in 2029 to 2030 at both plants at once, an 18-month gap with no helium margin to hide behind, and it is the largest loss of the four. N05, N16, N17. AI-suggested; Engineering confirms the sole source.

Across all four, a sole supplier for whom MR is a minority of parent revenue is one board decision from exit, which is the event that turns F2 into F4. N03, N05. High confidence on P18.

## In one hundred words

The futures sort by insurability and bridge. F1 and F3 are helium queues at the China plant, breaking in 2028 to 2029 and 2027 to 2028 respectively, with F3 uninsured because the cause is a rule or an owner. F2 breaks nothing and frees the capital held in cover. F4 is the worst: sealed magnets make the cold head the only thing keeping every magnet cold, and its sole maker's parent has better customers, so an exit or listing stops both plants for most of 18 months. The owner question, not the thermal load, decides whether the cold head breaks.


### foreign_trade_payments_p4_r1_summary.md

# Foreign trade and payments, phase 4, round 1, summary

## Key points

In F1 (cost only, helium still decides) no trade rule stops a part and the first break is helium cover at the United States plant when allocation letters meet the container fleet's liquid hold, by the first quarter of 2028 (N19, N01, N23; Panel judgement).

In F2 (cost only, helium no longer decides) nothing breaks through this lens's category; the duty stack on wire, cold heads and chips has no expiry and the nearest risk is the sole Japanese cold head carrying every sealed magnet (N03, N05, N31; Federal Register 5 August 2025, Supreme Court 20 February 2026).

In F3 (a part stops, helium still decides) the truce lapses and an entity listing puts the China plant's cold heads and logic behind a licence, stopping that plant by the third quarter of 2027 with the United States plant unable to cover Asia under the tender walls (N17, N05, N10, N29; AI-suggested, Sourcing confirms).

In F4 (a part stops, helium no longer decides) a quantum or fusion control sweep lists cryocoolers and wire by 2028, and the cold head breaks both plants at once by 2029 because the sealed fleet puts every magnet on it (N05, N03, N16, N17; Panel judgement).

The least certain thing across all four is whether any control list ever names the Gifford-McMahon class or magnet-grade wire; today neither is listed (N03, N05; AI-suggested, Quality and regulatory confirms).

## In one hundred words

Trade stays a cost in F1 and F2: tariffs with no expiry, customs friction, allocated helium. F1 breaks on helium cover at the United States plant by early 2028; F2 breaks on nothing this lens can reach, with margin paying the duty stack. Trade stops a part in F3 and F4. F3 strands the China plant behind a licence on cold heads and logic by late 2027, with no plant able to cover Asia. F4 lists cryocoolers and wire by 2028 and breaks the cold head at both plants by 2029. Nothing yet names cryocoolers or wire on any control list.


### geopolitical_p4_r1_summary.md

# Geopolitical, phase 4, round 1, summary

## Key points

In both futures where a state measure stops a part (F3, F4), the first break is the China plant, because it sits inside a counterparty's borders and its only lanes run the Taiwan Strait; a listing strands it within a quarter, through logic in F3 and through cold heads in F4, and no second plant covers Asia. N17, N10, N05, N29. Panel judgement.

In F1, where trade stays a cost and helium still decides, nothing stops but helium cover at the United States plant is the margin every rerouted delivery and winter grid event walks through, from 2027 when the Carolinas grid is rated elevated. N19, N27, N01. NERC (29 Jan 2026); Placeholder on cover days.

In F2, where helium no longer decides, this lens finds no foreign lever on the United States sites at all, and the first break moves to the single Japanese cold-head source through hazard and parent allocation rather than through a state. N05, N16, N18. AI-suggested, Engineering confirms.

The United States magnet plant never breaks on a lever a foreign state holds in any future; it is reached only through helium price, allocation and weather. N16, N19. Panel judgement.

This lens's least confident claim is the same in every future: whether a state that holds the wire or cold-head lever ever pulls it, since the 2017 Qatar blockade and the Russian helium licence show levers held unpulled. N03, N05. Global Trade Alert.

## In one hundred words

Across the four futures, the geography decides the order of breaks. Whenever a state measure lands, the China plant breaks first: through logic in F3, through cold heads in F4, within a quarter of a listing, with Eastern Hemisphere deliveries stopped past 30 days. Whenever no measure lands, the break is helium cover at the United States plant in F1 and the single Japanese cold-head source in F2. The United States plant is reached only by price, allocation and weather. The open question in every future is whether a state that can stop a part chooses to.


### infrastructure_p4_r1_summary.md

# Infrastructure, phase 4, round 1, summary

## Key points

In F1 the scarce asset is the helium ISO container fleet, so cycle time sets cover and the first break is helium cover through a winter curtailment or basin flood at the United States magnet plant, likeliest in the winter of 2028 to 2029. N16, N19, N23; Panel judgement.

In F2 no lane breaks on a schedule; the first break is the United States magnet plant through a flood that cuts grid, road and trailer access together, and it breaches 30 days only if road access stays cut longer than the ten-day Helene grid record. N16, N18, N24; Panel judgement, NERC 29 Jan 2026.

In F3 the China plant breaks first through cold heads under an entity listing by mid-2028, before any lane fails, and helium cover at the United States plant becomes a licensed number once an allocation rule lands. N05, N17, N19, N29; Panel judgement.

In F4 the cold head carries every magnet's thermal load and breaks by 2029 through a listing or owner exit; air freight has four carriers and is never the limiting asset. N05, N30; Panel judgement, moderate.

The export port is not a 30-day risk in any future; the only closure class that long is a blocked channel, which has no schedule. N26; SC Ports Authority logs, ILA contract 7 Feb 2025.

## In one hundred words

In the two futures where helium still decides, the clock is the container, not the molecule: a 500 to 700 unit fleet with a 35 to 48 day hold, cycling against grid ratings elevated from 2027. Cover at the United States magnet plant breaks first in F1 and second in F3, behind the China plant losing cold heads to a listing. In the sealed futures lanes go quiet; the magnet plant's flood exposure leads F2 and the cold head leads F4. The export port stays inside tolerance everywhere. In F3 and F4 the break is a permission, not an asset.


### labor_p4_r1_summary.md

# Labor, phase 4, round 1, summary

## Key points

In F1, cost only and helium still decides, no new trade is needed and the first break is helium cover when a winter grid curtailment meets an allocated delivery in 2028 to 2029, with the roster setting the restart rather than causing the stop (N19, N16, N20; Panel judgement). In F2, cost only and helium no longer decides, the plant swaps one 18-month trade for another and the technicians break first in 2029 when the sealed share passes half before either crew is competent, delaying installs at the margin (N20, N16, N33; Panel judgement). In F3, a part stops and helium still decides, wire breaks first by mid-2028 and a line idle for six months loses its winders faster than its inventory (N03, N16, N20; Panel judgement, Sourcing confirms the mill). In F4, a part stops and helium no longer decides, the cold head breaks first in 2029 to 2030 and its small ageing Japanese workforce becomes the thinnest labour pool on the map (N05, N20, N33; P12, P18, AI-suggested). Every future assumes the design record is intact and no future contains a strike (N22, N26; P13).

## In one hundred words

The two axes decide which trade the plant needs, not whether people exist. Where helium still decides, the roster is unchanged and the break runs through helium cover, with attrition lengthening every restart. Where helium no longer decides, the plant retrains mid-conversion and the cold-head maker's small, ageing workforce carries every magnet. Where a part stops, the labour cost outlasts the stop because an idle line sheds the tacit knowledge that takes 18 months to rebuild. This lens is most confident on the trades, least confident on how many people a sealed line needs, and may be missing automation.


### macroeconomic_p4_r1_summary.md

# Macroeconomic, phase 4, round 1, summary

## Key points

In every future the rate path, producer prices and hospital margins set the bill, and demand opens a break only through a supplier's parent deciding MR is a small customer (N35, N36, N05; Federal Reserve 16 Sep 2026, Kaufman Hall 27 Aug 2026). In F1 the China plant breaks first through helium allocation at the Asian end in the first half of 2027, while the United States plant's helium is a price problem, not a volume problem (N17, N19, N01; USGS Feb 2026; AI-suggested, S&OP council confirms). In F2 the cold heads break first around 2029 when the sole maker allocates to quantum and physics buyers after a 2027 MR order cut (N05; Panel judgement, low confidence). In F3 the China plant breaks first by mid-2028 through a listing of cold heads while its helium queue only shortens the window, and the bill is the highest of the four (N17, N05, N03; AI-suggested, Sourcing confirms). In F4 the cold heads break first by 2029 and cost most, because no magnet shipped or in the field has a helium fallback (N05, N34; AI-suggested, Engineering confirms).

## In one hundred words

The macroeconomic lens prices all four futures and breaks only two. Rates near 4 percent to 2027, producer prices up 5.4 percent, hospital margins at 2.5 percent and memory allocation to 2028 lengthen the backlog everywhere. Where helium still decides, the China plant breaks first because it bought Gulf helium and sits behind an allocation queue, in 2027 in F1 and by mid-2028 in F3 when a listing adds cold heads. Where helium no longer decides, the cold head breaks first around 2029, through a parent choosing fusion and quantum buyers over MR. The litres at test remain a Placeholder.


### natural_disasters_p4_r1_summary.md

# Natural disasters, phase 4, round 1, summary

## Key points

The hazards do not change across the four futures; the axes change only which node a storm or earthquake walks through to reach the 30-day line, helium cover where helium still decides and the cold head where it does not. N19, N05. Panel judgement.

In F1 and F3 the first break from this lens is a correlated inland storm behind the US magnet plant, taking grid, road and helium trailer together for longer than the cover, with a ten-day grid rebuild already on the record. N16, N19, N24. Duke Energy, 30 September 2024; NERC, 29 January 2026.

In F2 and F4 the first break is the Japanese cold-head source under a Nankai Trough classification raised in September 2025, which stops both plants at once and has no schedule. N05, N16, N17. Headquarters for Earthquake Research Promotion, 26 September 2025.

Weather at the export port and the US final assembly hub costs days in every future and never reaches 30 on its own. N18, N26. SC Ports Authority logs, 2019 and 2024.

Whether any of this is real turns on cover days at N19, the addresses of the wire mill and cold-head plant, and backup power at the magnet plant. N03, N05, N16, N19. Placeholder.

## In one hundred words

My four futures share one set of hazards and differ only in the carrying node. Where helium still decides (F1, F3), a correlated storm behind the US magnet plant outlasts helium cover and stops the line for 30 to 45 days, worse in F3 with no second plant to cover. Where helium no longer decides (F2, F4), the cold head is the only cryogenic dependency, and an earthquake at its unconfirmed address stops both plants, longest in F4 because the trade stop removes the alternative route. Port and hub cost days everywhere. Three Placeholders decide how real this is.


### security_p4_r1_summary.md

# Security, phase 4, round 1, summary

## Key points

In F1 the first break is helium cover, through a cyber outage at a gas carrier or port system during a winter grid curtailment, around 2028 to 2029 (N19, N23, N26, N16; Panel judgement). In F2 the first break is counterfeit programmable logic entering through the broker and air channel during the allocation squeeze of 2027 to 2028 (N10, N30, N31; Panel judgement on the counterfeit-reporting body's 2025 figures). In F3 the first break is the China plant, stopped by an investigation under the amended cyber law and a payment freeze inside the 2027 sourcing cycle (N17, N31; Panel judgement). In F4 the first break is the cold head, listed or orphaned, then targeted by theft and substitution once it carries every magnet, around 2029 (N05, N31, N30, N34; Panel judgement). Every future assumes the design and qualification record is intact (N22; Placeholder until a restore test).

## In one hundred words

Where helium still decides, the security break runs through the helium chain's outside systems: a carrier or port encrypted in a bad winter in F1, or the China plant frozen by a legal instrument in F3. Where helium no longer decides, the break moves to parts: counterfeit logic through brokers in F2, and a listed, scarce cold head drawing theft and substitution in F4. The five-week recovery record exceeds the 30-day line in every case. Least confident in each: the cover in days, broker buying, use of the law, and whether cold heads are listed.


### technology_shift_p4_r1_summary.md

# Technology shift, phase 4, round 1, summary

## Key points

In all four futures the magnet is still wound from niobium-titanium wire and kept cold by a Gifford-McMahon cold head, because no magnet without that wire is in United States clearance records to 11 October 2026, so only the helium fill changes between futures (N03, N05, N22; openFDA product code LNH, read 11 October 2026).

In F1 the first break is helium cover at the US magnet plant, when a container delay and a winter grid curtailment land together in the winter of 2027 to 2028, and the sealed share stays small because hospitals wait for service history (N19, N23, N16; Panel judgement).

In F2 the first break is the cold head, because a sealed fleet with no helium reserve makes the sole Japanese maker the supplier of both new builds and service spares, with a window of 2029 to 2031 (N05, N34; Panel judgement, plant location AI-suggested, Engineering confirms).

In F3 a listing of cryogenic parts stops the China plant through its cold heads in the second half of 2028, before any helium event stops the US plant, since an 18-month requalification outlasts any cover (N17, N05, N19, N29; Panel judgement).

In F4 the sealed conversion moved the single-source dependency from helium to the cold head, and a listing or parent exit stops both plants and leaves installed sealed magnets to warm up, with a window of 2029 (N05, N16, N17, N34; Panel judgement, moderate).

## In one hundred words

The product changes less than the borders do. In all four futures the wire and cold head are the same parts from the same sole sources; sealed magnets remove only the helium fill. Where helium still decides, the first break is cover at the US plant in F1 and a cold-head listing at the China plant in F3. Where helium no longer decides, the cold head becomes the part without which nothing ships, breaking through capacity in F2 and through a listing or owner exit in F4. The test draw, a Placeholder for Engineering, sets the distance between those pairs.


## The question for this round (phase 4, round 2)

Phase 4, round 2, cluster. Your cluster is assigned future F3, "A part stops, helium still decides". You have the full round 1 transcripts of your cluster-mates for this future and the round 1 summaries of all eleven lenses. Write F3 as one future page in the story grammar (panel/templates/story_grammar.md), in this order with these exact headings: The future in one sentence; What happens (two periods, 2026 to 2028 and 2028 to 2031, each a short paragraph); What fails first (one node, its id, one plain sentence, its tag); How soon; What it costs (against the tolerance line); What prevents it (describe the action, its owner function and start-by date as the world would need them, without advising); How sure we are (high, moderate or low, with the basis); What would change this. Then under a heading Cluster disagreement, state where your cluster-mates named a different first break and why you chose yours; do not soften it. Under Shared break, say what the 35-day encryption event (C4) does to this future. Under Other lenses, name any round 1 summary from outside the cluster that contradicts this page. Every sentence is a full plain sentence a product owner can read; no bullet fragments. No new research; carry sources with their dates from phases 2 to 4. Keep the full transcript under 800 words.

## What to produce

 Write the full transcript, then the summary, exactly in the format COMMON.md gives. Begin the full transcript with the line `# <lens name>, phase 4, round 2` and the summary with the line `# <lens name>, phase 4, round 2, summary`. Target paths: full transcript `scenarios/MR-CONV-2031/conversations/geopolitical_p4_r2_full.md`, summary `scenarios/MR-CONV-2031/conversations/geopolitical_p4_r2_summary.md`. If you can write files, write them there; if you cannot, print the full transcript, then a line containing only `=====SUMMARY=====`, then the summary.
