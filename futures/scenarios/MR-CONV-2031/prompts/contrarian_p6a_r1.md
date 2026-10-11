You are one lens on a scenario panel for a medical imaging OEM. Your dossier, the rules, the scope packet, the node map and the risk screen follow. Then the question for this round.

## Your dossier

# Lens: Contrarian

## Identity

You are the panel's professional sceptic. You have no domain; your domain is the other ten lenses. You have watched scenario exercises converge on the comfortable story, the one that flatters the sponsor's existing plan, and you have watched the real future come from the thing nobody put on the grid. You refuse to be impressed by agreement. When ten lenses agree, you ask what they all assumed. When a risk list looks obvious, you ask what the screen threw away.

## Your job in each phase

- Phase 2: find the "predetermined element" that is not predetermined at all, and the one that everyone missed because it is boring.
- Phase 3: attack the candidate axes. Are they independent? Do they move several risks or just the one the sponsor already worries about? What third uncertainty would make both axes irrelevant?
- Phase 4: stress-test each future for internal contradiction, for being a trend extrapolation dressed up as a future, and for being too comfortable. Propose the future nobody wrote.
- Phase 5: find the indicator that would be read the wrong way, and the indicator that lags so far it is useless.
- Phase 6: find the action that is "robust in all four futures" only because all four futures share a hidden assumption.

## Questions you always ask

- What would have to be true for every other lens to be wrong at once?
- What did the risk screen throw away, and why might that be the thing that breaks first?
- Which "uncertainty" is really a decision the OEM has already made?
- Which future is the sponsor hoping for, and is it on the grid only because of that?
- What is the cheapest, most ordinary failure on this map that no lens has mentioned?

## Blind spots you carry

You can be contrary for its own sake. A challenge without evidence is noise. Every attack you make must say what evidence would settle it and which node ids it touches.

## Research instructions

Use web search to find the counter-example: the comparable product, industry or period where the consensus story failed. Cite with link and date.

## Rules

Follow `panel/COMMON.md`. In phases 2 to 5 you describe the world and attack descriptions; you do not recommend. Your summaries must be as readable as anyone else's. State each attack as a full sentence a product owner could act on.


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


### P4-future-F1.md

# F1. Cost only, helium still decides

Position: U1 end A (every trade measure stays a cost), U2 end A (helium still decides whether a magnet ships). Adopted from the Infrastructure draft with the Natural disasters storm path; the Financial draft's China plant queue is carried as the second break. Vote in round 3: six lenses for helium cover at the United States plant, five for the China plant's allocation queue.

## The future in one sentence

Trade stays a cost and magnets still need helium, so the clock on every delivery is a container, a grid and a road, not a rule.

## What happens

From 2026 to 2028 the truce is renewed at its notice date and no part is listed. The Gulf route stays near closed and the Qatari repair runs three to five years (IMF PortWatch via straits.live, 11 October 2026; IOM3, 23 March 2026). The United States plant (N16) buys allocated domestic and Canadian helium (USGS, February 2026); the China plant (N17), with no domestic helium and no allocation seniority, buys Asian spot at the back of the queue. A fleet of 500 to 700 containers with a 35 to 48 day liquid hold cycles hard on the Atlantic side, so container cycle time sets the cover at N19 (phase 2, P5, AI-suggested). The Carolinas grid is rated elevated from 2027 (NERC, 29 January 2026).

From 2028 to 2031 conventional builds still dominate, because no 3 tesla sealed magnet is cleared and the sealed test draw proves to be a delivery, not a cylinder. The Midcontinent grid is rated high from the winter of 2028, so both United States sites (N16, N18) run winters under elevated ratings. Cover at N19 is inventory bought at a 4 percent policy rate with producer prices rising about 5 percent a year (Federal Reserve, 16 September 2026; phase 2, P17), so it thins each year as the grid tightens.

## What fails first

Helium cover at the United States magnet plant (N19). A winter curtailment or a basin flood takes the liquefier's power and the trailer's road (N24) while the next container is still in its hold window, and the cover runs out before the delivery lands. Placeholder on the number of days of cover; Panel judgement on the path.

## How soon

The winter of 2028 to 2029, when the Midcontinent rating turns high and the Carolinas rating is in its second elevated year. A storm of the 2018 inland flood class can bring it forward to any hurricane season from 2027. The China plant's allocation queue is the scheduled second break, pushing Asian installs past the 30-day line in the first half of 2028 (Financial draft).

## What it costs

One line stop at the United States magnet plant of 30 to 45 days, which breaches the tolerance line, and one quarter of Western Hemisphere installs more than 30 days late. Eastern Hemisphere installs carry a higher helium bill and a longer queue, and breach on the allocation schedule rather than on an event. Install counts are Placeholders. Share does not move, because every supplier is short of helium together (Customer and market, round 3).

## What prevents it

In the version of this future that does not break, the cover at N19 exceeds the container hold plus the ten-day grid rebuild on the 2024 record (Duke Energy, 30 September 2024), and the liquefier at N16 has backup power off the plant feeder. Logistics owns the cover figure and Site operations owns the backup. Both would need to be in place before the winter of 2028, which puts the start by the second quarter of 2027.

## How sure we are

Low to moderate. The fleet, the hold window, the grid ratings and the allocation letters are on dated public sources. The path from an elevated grid rating to a multi-week curtailment is a causation uncertainty with no record yet, the cover days are a Placeholder, and the panel split six to five on which plant breaks first.

## What would change this

A 3 tesla sealed clearance, or the Gulf route reopening to insured traffic, moves this future to F2. A United States helium allocation rule moves it toward F3. A confirmed cover figure at N19 above 60 days removes the United States break and leaves the China plant's queue as the first break.

## Shared break

A 35-day encryption event at the plant, the wire mill or the cold-head maker (C4) is a line stop in this future as in every other, and here it is worse at the logistics layer: the two specialist gas carriers (N23) and the port terminal system (N26) both walk through the helium cover (Security, round 3). Every page assumes the design and qualification record (N22) is intact.


### P4-future-F2.md

# F2. Cost only, helium no longer decides

Position: U1 end A (every trade measure stays a cost), U2 end B (helium no longer decides whether a magnet ships). Adopted from the Technology shift draft. Vote in round 3: nine lenses for the cold head, two for the technicians. The Customer and market draft's parent-allocation trigger was moved to F4, where it belongs under U1 end B.

## The future in one sentence

Trade stays a cost and by 2031 helium no longer decides whether a magnet ships, so the one part that keeps every magnet cold is a cold head from one maker.

## What happens

From 2026 to 2028 the truce is renewed and wire, cold heads and chips flow at a tariff cost (Federal Register, 5 August 2025). The Gulf route reopens to insured traffic and the allocation letters stop. The sealed 1.5 tesla class, cleared at three makers (FDA K181479, 3 August 2018; FDA K253779, 5 February 2026), builds service history, and European tenders pull sealed designs through net zero scoring and the origin rule (NHS England, October 2020; Regulation (EU) 2025/1197, 20 June 2025).

From 2028 to 2031 a 3 tesla sealed magnet is cleared, the test draw proves to be a cylinder, and sealed designs take most new builds and the European replacement wave (COCIR, 2023). Helium cover (N19), ramp and test (N21) and container transport (N23) leave the tolerance story; helium becomes a service matter (N34). The magnet is still wound from one mill's niobium-titanium wire (N03), since no magnet without it appears in United States clearance records (openFDA, product code LNH, read 11 October 2026). The one Japanese cold head (N05) now carries the whole thermal load of every new magnet and much of the installed base, with no helium reserve behind it. The plant floor changes trade mid-run, from helium handling to vacuum and cryocooler work (Labor draft).

## What fails first

Cryocooler cold heads (N05). The sole maker supplies both new builds and the spares of a sealed fleet that warms up when a cold head fails, so an earthquake or a plant outage at the maker stops both magnet plants at once. Panel judgement; the maker's location is AI-suggested and Engineering confirms it against the Nankai Trough zone.

## How soon

The window opens once the sealed share passes half of output, which the panel places in 2029, and runs to 2031. The event itself has no schedule.

## What it costs

A line stop longer than 30 days at both plants (N16, N17), because they share the cold head and 18 months of requalification outlasts any inventory. Installed sealed magnets that lose a cold head warm up while service (N33, N34) competes with new builds for the part, so the hospital feels this as a dark scanner, not a slow install (Customer and market draft). Demand shape (C5) sets the count of late installs, not the break. The technicians (N20) are the runner-up: a mid-conversion trade swap puts installs two to three quarters late in 2029 without a line stop (Labor draft, low confidence).

## What prevents it

In the version of this future that does not break, a second cold-head source is qualified on the sealed design before the sealed share passes half, or the design carries a tested hold that buys 30 days without a working cold head. The owner would be Engineering with Sourcing, starting by mid-2027 given 18 months of requalification.

## How sure we are

Moderate. High that wire and the cold head are unchanged sole-source parts in 2031 (openFDA, read 11 October 2026). Moderate that the cold head breaks rather than costs, the six-to-five split from phase 3. Low on the date, because the technology lens overrates adoption and the trigger has no schedule.

## What would change this

A second cold-head maker cleared on the sealed design before 2029 turns the break into a cost. A delivery-sized test draw pulls this future back toward F1. No 3 tesla sealed clearance by 2028 defers it past the horizon.

## Shared break

A 35-day encryption event (C4) at either plant, the wire mill or the cold-head maker is a line stop here too, and the cold-head maker is the one site where it coincides with the first break. Every page assumes the design and qualification record (N22) is intact.


### P4-future-F3.md

# F3. A part stops, helium still decides

Position: U1 end B (something outside the OEM stops a part or a lane), U2 end A (helium still decides whether a magnet ships). Adopted from the Geopolitical draft. Vote in round 3: eleven of eleven for the China plant, through its logic supply.

## The future in one sentence

A state stops a part before 2031 while magnets still need helium to ship, so the stop lands on the plant inside a counterparty's borders and the other plant cannot cover for it.

## What happens

From 2026 to 2028 the United States and China truce lapses at its notice date, read first as 10 November 2026 (phase 3, contradiction 1). Entity listings in 2027 name the China plant's logic supplier and a cryogenic parts route; the China plant (N17) can no longer import United States-origin programmable logic (N10) or licensed cold heads (N05) without a licence that is rarely granted. The January 2026 export-control announcement from the Chinese commerce ministry is the precedent for the reply. The Gulf route stays near closed and the Qatari repair runs three to five years (straits.live, 11 October 2026; IOM3, 23 March 2026), so helium at both plants is bought on allocation letters (USGS, February 2026).

From 2028 to 2031 two blocs harden. The China plant builds for Asia without United States-origin logic; its lanes to Japan and India (N29) run the Taiwan Strait under grey-zone pressure. The United States plant (N16) keeps shipping but waits on allocated helium, and it cannot cover Asia because its ramp and test capacity (N21) is sized for one hemisphere, not because of any origin rule (Infrastructure and Contrarian, round 3). Payment rails and customs (N31) split by bloc and become a licence queue.

## What fails first

The China plant (N17). It sits inside a counterparty's borders and holds weeks of programmable logic, not months, so an entity listing on its logic supplier stops the control electronics for every system it builds before any cold-head or wire licence bites. AI-suggested on what the plant imports and how much it holds; Sourcing confirms.

## How soon

Within one quarter of the first entity listing, inside the 2027 sourcing cycle. The first read is the second half of 2027. An investigation under the amended Chinese cyber law, with a payment freeze on the rails that feed the plant, is the earlier door to the same stop (Security draft).

## What it costs

A line stop at the China plant longer than 30 days, breaching the tolerance line, with no second plant able to cover Asia. Eastern Hemisphere installs run more than 30 days late for two quarters or more, and Japan and India are one tender cycle from a China-built competitor (N36, N29). This is the one future in which share moves, because a competitor outside the bloc keeps delivering (Customer and market, round 3). The Western Hemisphere line runs late on allocated helium, so helium cover (N19) breaches second, by early 2028. Both lines breach.

## What prevents it

In the version of this future that does not break, the China plant holds logic and cold-head inventory longer than the licence queue, a Sourcing action started before the truce notice date, and a qualified non-United States logic path exists for the Asian build, an Engineering action started by the first quarter of 2027.

## How sure we are

Moderate. The listing tools exist and were used on this sector in 2025, and geography fixes which plant a listing strands. The date rests on the truce notice and on an unpublished licence approval rate.

## What would change this

The truce renewed at its notice date with no listing naming the plant or its suppliers. A listing that names cold heads before logic moves the break to N05 and delays it a quarter, because cold-head stock is deeper. The Gulf route reopening leaves the Western Hemisphere inside tolerance and makes this a one-hemisphere future.

## Shared break

A 35-day encryption event (C4) is a line stop here as everywhere, and the Security lens expects it to be more likely in a future where states are already using grey-zone tools. Every page assumes the design and qualification record (N22) is intact.


### P4-future-F4.md

# F4. A part stops, helium no longer decides

Position: U1 end B (something outside the OEM stops a part or a lane), U2 end B (helium no longer decides whether a magnet ships). Adopted from the Macroeconomic draft with two corrections from round 3: the 2027 China plant stop is removed, because a quarter-long stop in 2027 would itself have breached the line before the cold-head break (Natural disasters, Foreign trade); and the mechanism that stops both plants is the maker's parent leaving MR, not a listing alone, because export controls are addressed by destination and a listing aimed at China strands only the China plant (Geopolitical, Foreign trade). Vote in round 3: eight lenses for the cold head, three for the wire.

## The future in one sentence

Sealed magnets take most new builds behind a trade wall, and the stop lands on the cold head that now keeps every magnet cold.

## What happens

From 2026 to 2028 the truce lapses and the first measures are tariffs and a listing on control logic that the China plant (N17) absorbs with stock raised after the notice; nothing stops for 30 days. The Gulf route reopens and helium (N01, N34) becomes a cost line. The sealed 1.5 tesla platform (FDA K253779, 5 February 2026) takes most new builds and a 3 tesla clearance arrives by 2028. Rates near 4 percent and hospital margins near 2.5 percent (Federal Reserve, 16 September 2026; Kaufman Hall, 27 August 2026) make United States hospitals defer, so MR orders dip in 2027 and the OEM slips down its suppliers' queues.

From 2028 to 2031 the cold-head maker's parent, for whom MR is a minority of revenue, fills its order book with fusion, physics and quantum work (phase 2, P18), and a producer-country notice lists 4 kelvin cryocoolers as dual use, which closes the licence route for the China plant. Europe's 2016 to 2021 MR cohort passes ten years old (COCIR, 2023), so replacement orders rise just as the sole cold-head source is allocated away. The sealed fleet has no helium reserve, so the cold head is the service part too.

## What fails first

Cryocooler cold heads (N05). The one qualified maker's parent allocates capacity to better-paying buyers and the listing removes the licence route, and every magnet shipped or in the field depends on the part. AI-suggested; Engineering confirms the maker's location and ownership, Sourcing confirms the parent's MR share. The Contrarian's alternative is the wire (N03), which both sealed and conventional magnets share, with both plants past the line in the first quarter of 2029 after a producer-country listing; the panel kept the cold head because a cold-head stop is total once the sealed share passes half, while a wire listing addressed to one destination strands one plant.

## How soon

By 2029. Lead time passes 30 days within a quarter of the allocation letter, and a second maker takes 18 months to qualify, so the gap runs into 2030.

## What it costs

Both plants (N16, N17) stop for longer than 30 days, for most of 18 months. Every backlog install runs past the tolerance line, and the installed base breaches service cover through N34 because sealed magnets warm without a spare cold head. The lateness lands on the European replacement peak, so share moves through N36. It is the highest bill of the four futures, because no magnet has a helium fallback.

## What prevents it

In the future where this does not happen, Engineering and Sourcing have a second cold-head maker qualified before 2029, which means the work started by the second quarter of 2027, and Sourcing holds a multi-year supply agreement with the parent from the 2027 sourcing cycle.

## How sure we are

Moderate. The sole source, the parent's revenue mix and the 18-month requalification are carried from phase 2 (P18), and eight of eleven lenses land on this node. The date rests on an allocation nobody has announced and a listing that does not exist. The price at which the OEM loses its allocation is a Placeholder for Sourcing (Macroeconomic, round 3).

## What would change this

A producer-country notice naming wire before cryocoolers moves the first break to N03. No 3 tesla sealed clearance by 2028 collapses this future into F3. A parent announcing the sale or closure of the cold-head plant pulls the date to the announcement.

## Shared break

A 35-day encryption event (C4) at the cold-head maker in this future is indistinguishable from the first break. Every page assumes the design and qualification record (N22) is intact.


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


## The question for this round (phase 6a, round 1)

Phase 6a, impact. The four futures are fixed in phases/P4-future-F1.md to F4.md. For each of the four futures, trace through your lens how it reaches the eight risks in 02-risk-screen.md: which risk breaks first, through which node id, by when, how long the break lasts, and what it costs against the tolerance line (installs more than 30 days late, or a line stop longer than 30 days). Then say which breaks are shared by all four futures and which belong to one, and give the shared encryption break (C4, a 35-day loss of systems at a plant, a sole supplier, a gas carrier or a port terminal) its own paragraph: where it lands, how long, and what it costs in each future. Give confidence high, moderate or low with the basis for each break. Where a page names a Placeholder that decides the break, say which reading of the Placeholder removes the break. Describe, do not recommend. No new research. Keep the full transcript under 900 words. End with a table: rows are the eight risks R1 to R8 with node ids, columns F1 to F4, cell is the date the risk breaks in that future or a dash if it only costs.

## What to produce

 Write the full transcript, then the summary, exactly in the format COMMON.md gives. Begin the full transcript with the line `# <lens name>, phase 6a, round 1` and the summary with the line `# <lens name>, phase 6a, round 1, summary`. Target paths: full transcript `scenarios/MR-CONV-2031/conversations/contrarian_p6a_r1_full.md`, summary `scenarios/MR-CONV-2031/conversations/contrarian_p6a_r1_summary.md`. If you can write files, write them there; if you cannot, print the full transcript, then a line containing only `=====SUMMARY=====`, then the summary.
