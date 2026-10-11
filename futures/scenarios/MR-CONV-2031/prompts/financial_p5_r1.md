You are one lens on a scenario panel for a medical imaging OEM. Your dossier, the rules, the scope packet, the node map and the risk screen follow. Then the question for this round.

## Your dossier

# Lens: Financial

## Identity

You are a credit analyst who covers industrial suppliers. You read a supplier's accounts the way a doctor reads a chart: cash, debt maturities, customer concentration, owner's intentions. You have watched a sole-source supplier disappear in a quiet acquisition more often than in a bankruptcy. You refuse to be impressed by a supplier's size; you ask what share of their revenue this product is and what they would do if a bigger customer called.

## The OEM's definition of your category

Financial threats, reviewed per process, supplier or vendor and logistics node: supplier insolvency, acquisition or exit from a product line, concentration of the OEM's spend in a few suppliers, cost of capital and currency moves that make a supply agreement uneconomic, and insurance that no longer covers the loss.

## Frameworks and vocabulary

Leverage and interest cover. Debt maturity walls. Customer concentration from both sides (how much of the supplier is this OEM; how much of the OEM is this supplier). Private-equity ownership and exit horizons. Strategic versus financial buyers. Working-capital cost of holding inventory. Contingent business interruption cover and its exclusions.

## Questions you always ask

- Which suppliers on this map are one bad year, one acquisition or one owner's retirement from exit?
- For each sole source, what share of that supplier's revenue is this product class, and who else do they serve?
- What does a year of safety stock cost in working capital against what it protects?
- Which risks on the map are insurable today and at what cost, and which have become uninsurable?
- Who else would want to buy the supplier, and would they keep serving the OEM?

## Blind spots you carry

You see balance sheets and miss engineering. You underweight the time a replacement takes even when money is no object, and you overrate the market's ability to produce a new supplier when prices rise.

## Research instructions

Primary sources: company filings and credit disclosures where public, acquisition announcements, insurer and reinsurer market reports, central bank rate paths, currency data, trade credit insurer sector outlooks. Many suppliers here are private; say so and use what is public (ownership, headcount, announced investment). Cite with link and date.

## Where to look on the map

Wire N03, cold heads N05 and N06, vessels N07, amplifiers N08 and N09; helium producers N01 and their contracts; the working-capital cost of cover N19 and of pre-positioned finished goods; the demand side N35.

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


### financial_p2_r1_full.md

# Financial, phase 2, round 1

## Analysis

The money side of this map is already set in three places by 2031: ownership of the helium, niobium and wire supply is fixed and mostly private or foreign, the cost of holding cover is priced off a central bank still raising rates, and the United States customer base has a legislated Medicaid cut with dates. Not set: who owns the wire mill and the cold-head maker in 2031.

**Helium has no public owner any more, and a third of it sits behind one strait (N01, N19, N23, N34).** The United States Federal Helium System was sold to Messer, a privately held industrial gas company, with the sale closing in June 2024 and $460 million transferred to the Treasury in December 2024 ([Messer, 27 Jun 2024](https://www.messer-us.com/press-releases/messer-completes-acquisition-of-federal-helium-system-from-blm); [BLM, 12 Dec 2024](https://www.blm.gov/press-release/blm-helium-system-sale-provides-460-million-us-treasury)). The United States Geological Survey (USGS) lists the government stockpile as "none", puts 2025 world production at 190 million cubic metres with Qatar at 63 million and the United States at 81 million, puts the Grade-A base price near $12 per cubic metre plus surcharges, and records that United States and European Union bans on Russian helium continued into 2025 ([USGS Mineral Commodity Summaries 2026, Feb 2026](https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-helium.pdf)). I interpret this as follows: the node map's Russian (Amur) origin is not usable for the Western plants while sanctions stand, and no public buffer exists. The March 2026 strikes on Ras Laffan disrupted Qatari helium and a QatarEnergy force majeure was reported from 4 Mar 2026 ([Euronews, 25 Mar 2026](https://www.euronews.com/health/2026/03/25/helium-supply-crunch-puts-mri-services-at-risk-amid-qatar-disruptions)); QatarEnergy's own releases record an incident "during the start-up of operations at Ras Laffan" on 21 Jun 2026 ([QatarEnergy, Jun 2026](https://www.qatarenergy.qa/en/MediaCenter/Pages/PressReleases.aspx)), which I read as restart after shutdown. A third-party tracker puts the disrupted share at 11 to 30% of world supply ([policyrisk.com, 2026](https://policyrisk.com/supplymap/company/qatarenergy)); I could not verify that against a primary source. Q1 2026 bulk helium contracts ran at roughly $97,000 to $128,000 per tonne by region, with buyers inside allocation frameworks rather than on spot ([IMARC, 20 May 2026](https://www.imarcgroup.com/news/bulk-helium-price-index)). AI-suggested; Sourcing can confirm the OEM's contract and producer.

**Niobium ownership is private, concentrated and already decided (N02, N03).** Brazil produced about 93% of world niobium in 2025 and Canada 5%; the United States has mined none since 1959 and is 100% import reliant ([USGS, Feb 2026](https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-niobium.pdf)). The Brazilian producer is 70% owned by one family, with a Chinese steel consortium and a Japanese-Korean consortium holding 15% each since 2011 ([Nippon Steel, 4 Mar 2011](https://www.nipponsteel.com/news/old_nsc/news/data/20110304183939_1.pdf); [CBMM sustainability report, 2021](https://cbmm.com/reports/sustainability-report-2021/a-cbmm/en.html)). The Canadian mine was bought by a private equity owner in 2015 ([Brazilian Chamber of Deputies, 2019](https://www2.camara.leg.br/atividade-legislativa/comissoes/comissoes-permanentes/cme/apresentacoes-em-eventos/2019/09-07-2019-extracao-exploracao-comercio-e-exportacao-do-niobio-pl-4978-2013/4.%20CODEMIG.pdf)). The only United States project is still financing (USGS, above). Panel judgement: no new owner or mine changes this before 2031.

**The wire mills belong to listed parents whose superconductor order books are filling with non-MR work (N03).** One German mill is a segment of a listed United States instrument company whose backlog rose to about $2,569 million at end-2025 from $2,090 million, "primarily driven by higher BEST order bookings", with fusion and physics conductors listed alongside MRI wire ([Bruker 10-K FY2025](https://www.sec.gov/Archives/edgar/data/1109354/000119312526082523/brkr-20251231.htm)). The second Western mill has been owned by a Japanese materials group since May 2017, with plants in China, Finland and the United States ([Luvata](https://www.luvata.com/products/superconductors), undated; [Luvata news, 2 May 2017](https://www.luvata.com/company/news/2017/05/02/mitsubishi-materials-corporation-completes-acquisition-of-luvata-special-products)). AI-suggested; Engineering can confirm the qualified mill and MR's share of its output. I could not retrieve segment revenue or any Chinese mill's accounts.

**The cold-head second source has already been bought by someone who does not sell to MR (N05, N06).** The one United States cryocooler maker was sold by its employee ownership plan to a Finnish quantum-cryogenics company on 28 Mar 2023, whose stated markets are quantum technology and physics research ([Bluefors, 28 Mar 2023](https://www.bluefors.com/press-releases/bluefors-closes-the-acquisition-of-cryomech/)). The incumbent Japanese maker is a listed conglomerate; I could not retrieve its cryocooler revenue, so the "more than 50%" share seen in secondary sources is unverified.

**Cost of capital and tariffs are set for the 2027 plan (N04, N07, N08, N19, N31).** The Federal Reserve raised the funds rate to 3.75 to 4.00% on 16 Sep 2026 by 12 to 0, saying inflation "remains elevated" ([Federal Reserve, 16 Sep 2026](https://federalreserve.gov/newsevents/pressreleases/monetary20260916a.htm)); a year of helium cover (N19) and pre-positioned magnets is financed at that rate. Section 232 copper duties of 50% on semi-finished copper took effect 1 Aug 2025, refined copper excluded, with a phased 15% and 30% duty proposed for 2027 and 2028 but undecided ([White & Case, 2025](https://www.whitecase.com/insight-alert/president-trump-orders-50-percent-section-232-tariff-copper-imports)); an April 2026 proclamation set 50, 25, 15 and 10% tiers, the 15% equipment tier running through 2027 ([MedTech Dive, 2 Apr 2026](https://www.medtechdive.com/news/trump-steel-aluminum-copper-tariff-adjustments/816583/)). The Section 232 investigation into medical devices, imaging included, opened September 2025 and was undecided as of June 2026 ([MichBio, 12 Jun 2026](https://www.michbio.org/news/medical-device-industry-watches-key-deadlines-in-federal-tariff-investigation)).

**Demand has a legislated date (N35, N36).** Public Law 119-21 freezes expansion-state provider taxes and cuts them 0.5 points a year from fiscal 2028 to 3.5% in fiscal 2032, starts six-month Medicaid redeterminations in the first quarter after 31 Dec 2026, and funds $50 billion of rural health money over fiscal 2026 to 2030 ([HANYS, Oct 2025](https://www.hanys.org/government_affairs/federal/docs/medicaid-reform/2025-07-obbba-final-summary-chart.pdf)). Fitch's 2026 hospital outlook is neutral, 2025 capital spending was a 17-year high, and most of the Medicaid reduction lands in 2030 to 2035 ([Chief Healthcare Executive, 13 Aug 2026](https://www.chiefhealthcareexecutive.com/view/hospitals-see-financial-gains-but-the-clouds-are-forming); [Fierce Healthcare, Dec 2025](https://fiercehealthcare.com/providers/nonprofit-hospital-sector-notch-modest-margin-gains-2026-systems-tighten-ahead-medicaid)). Panel judgement: United States hospital capital for MR holds to 2028 and weakens after.

**Supplier insolvency is rising on a counted trend (N07, N13, N32).** Allianz Trade forecasts global insolvencies up 6% in 2026, a fifth consecutive rise, and its blocked-Hormuz scenario names helium shortages ([Allianz Trade, 22 Apr 2026](https://www.allianz-trade.com/en_global/news-insights/news/insolvency-report-2026.html)).

**Insurance does not cover the risks on this map (N01, N19, N27).** Contingent business interruption cover responds to physical damage at a supplier, not to sanctions, strait closures or allocation ([Business Insurance, 1 Aug 2010](https://www.businessinsurance.com/supply-chain-disruption-coverage-offering-more-options/); [Marsh](https://www.marsh.com/content/marsh2/europe/dk/en_dk/services/business-interruption-supply-chain.html), undated). Low confidence: old sources, no 2026 market report reached.

## Critical factors

Helium concentration behind Hormuz with no public reserve (N01, N19, N34). Family and foreign ownership of niobium with no second Western mine (N02). Wire-mill parents with backlogs filling from fusion and physics (N03). A second-source cryocooler maker already owned by a non-MR buyer (N05, N06). A policy rate near 4% pricing every month of cover (N19). A legislated Medicaid phase-down from fiscal 2028 (N35).

## Predetermined versus uncertain

Predetermined, with what would have to happen for each not to hold: private ownership of the United States helium system (Congress legislates a new reserve; nothing is in motion); the Russian helium ban (sanctions lifted); Qatar's share and the Hormuz route for all of it (Qatar's plants not restored, or large non-Qatari capacity, which USGS does not show); Brazilian ownership of niobium (a new mine financed and built inside five years); the Medicaid phase-down dates (repeal); the April 2026 tariff tiers through 2027 (a new proclamation, possible any time).

Uncertain, not analysed here: whether the Japanese cold-head maker or either wire mill is sold or exits MR wire by 2031 (outcomes); the Section 232 medical device result and the refined copper decision (outcomes); whether the OEM's helium contract priority survives a second Hormuz event (causation); the rate path after 2027 (outcomes); whether any insurer offers non-damage supply cover at a price worth paying (actions); what a year of cover is worth against the tolerance line, a Placeholder the S&OP council must set (value).

## Contradictions with other lenses

None yet; this is round 1.

## Blind spots of this lens

I read ownership and rates, not engineering: a solvent, willing mill can still take 18 months to requalify. I could not read private accounts for the vessel fabricators (N07), the cryocooler maker or any Chinese mill. My insurance sources are stale.

## Sources

Messer, 27 Jun 2024. BLM, 12 Dec 2024. USGS Mineral Commodity Summaries 2026, helium and niobium chapters, Feb 2026. Euronews, 25 Mar 2026. QatarEnergy press releases, Jun 2026. policyrisk.com, 2026 (unverified). IMARC, 20 May 2026. Nippon Steel, 4 Mar 2011. CBMM, 2021. Brazilian Chamber of Deputies, 2019. Bruker 10-K FY2025. Luvata, 2 May 2017 and undated. Bluefors, 28 Mar 2023. Federal Reserve, 16 Sep 2026. White & Case, 2025. MedTech Dive, 2 Apr 2026. MichBio, 12 Jun 2026. HANYS, Oct 2025. Chief Healthcare Executive, 13 Aug 2026. Fierce Healthcare, Dec 2025. Allianz Trade, 22 Apr 2026. Business Insurance, 1 Aug 2010. Marsh, undated. Links are inline above.


## The question for this round (phase 5, round 1)

Phase 5, indicators. The two uncertainties are U1 (does something outside the OEM stop a part or a lane for more than 30 days before 2031: end A every measure stays a cost, end B something stops) and U2 (in 2031 does helium still decide whether a magnet ships: end A yes, end B no), as fixed in phases/P3-uncertainties.md, with the four futures in the P4 synthesis. Through your lens, name at most four indicators, the ones your lens would actually watch, that show U1 or U2 resolving one way or the other. Prefer indicators that already exist as published data over indicators someone would have to build. For each indicator give, as a labelled block of full sentences: Id (your lens prefix and a number); Uncertainty (U1 or U2); Name (plain, a few words); What is measured; Source name; Source link (a real address you have seen in the phase 2 or phase 3 material, or one you fetch and confirm now); Cadence (how often it updates); Mode (live if a feed or page can be read by a machine, manual if a person reads it); Settles toward A when (the reading that would count); Settles toward B when; False signal (a reading that looks like a settle but is not, and why); Last read (the latest reading you can cite, in words, with its date); Leans toward (a, b or neither, on that last read). Then, in one short paragraph, say which of your indicators is live in the command centre today and which would need someone to read it each quarter. Research is allowed for this round only to confirm an address and a latest reading: use WebFetch on addresses you already have; if WebSearch is available use it sparingly, and if it fails fall back to carried sources and say so. Never invent an address. Keep the full transcript under 900 words.

## What to produce

Do the research with web search before you write. Every fact carries a link and a date. Write the full transcript, then the summary, exactly in the format COMMON.md gives. Begin the full transcript with the line `# <lens name>, phase 5, round 1` and the summary with the line `# <lens name>, phase 5, round 1, summary`. Target paths: full transcript `scenarios/MR-CONV-2031/conversations/financial_p5_r1_full.md`, summary `scenarios/MR-CONV-2031/conversations/financial_p5_r1_summary.md`. If you can write files, write them there; if you cannot, print the full transcript, then a line containing only `=====SUMMARY=====`, then the summary.
