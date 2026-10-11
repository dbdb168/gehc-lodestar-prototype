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


## The question for this round (phase 5, round 1)

Phase 5, indicators. The two uncertainties are U1 (does something outside the OEM stop a part or a lane for more than 30 days before 2031: end A every measure stays a cost, end B something stops) and U2 (in 2031 does helium still decide whether a magnet ships: end A yes, end B no), as fixed in phases/P3-uncertainties.md, with the four futures in the P4 synthesis. Through your lens, name at most four indicators, the ones your lens would actually watch, that show U1 or U2 resolving one way or the other. Prefer indicators that already exist as published data over indicators someone would have to build. For each indicator give, as a labelled block of full sentences: Id (your lens prefix and a number); Uncertainty (U1 or U2); Name (plain, a few words); What is measured; Source name; Source link (a real address you have seen in the phase 2 or phase 3 material, or one you fetch and confirm now); Cadence (how often it updates); Mode (live if a feed or page can be read by a machine, manual if a person reads it); Settles toward A when (the reading that would count); Settles toward B when; False signal (a reading that looks like a settle but is not, and why); Last read (the latest reading you can cite, in words, with its date); Leans toward (a, b or neither, on that last read). Then, in one short paragraph, say which of your indicators is live in the command centre today and which would need someone to read it each quarter. Research is allowed for this round only to confirm an address and a latest reading: use WebFetch on addresses you already have; if WebSearch is available use it sparingly, and if it fails fall back to carried sources and say so. Never invent an address. Keep the full transcript under 900 words.

## What to produce

Do the research with web search before you write. Every fact carries a link and a date. Write the full transcript, then the summary, exactly in the format COMMON.md gives. Begin the full transcript with the line `# <lens name>, phase 5, round 1` and the summary with the line `# <lens name>, phase 5, round 1, summary`. Target paths: full transcript `scenarios/MR-CONV-2031/conversations/customer_market_p5_r1_full.md`, summary `scenarios/MR-CONV-2031/conversations/customer_market_p5_r1_summary.md`. If you can write files, write them there; if you cannot, print the full transcript, then a line containing only `=====SUMMARY=====`, then the summary.
