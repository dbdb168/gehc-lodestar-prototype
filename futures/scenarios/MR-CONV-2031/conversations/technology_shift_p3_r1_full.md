# Technology shift, phase 3, round 1

## Analysis

The bottom line is that the technology question for this line is no longer whether a sealed magnet exists but how fast it spreads, how much helium a sealed magnet still needs on the test floor, and whether the two parts that survive the shift unchanged, the niobium-titanium (NbTi) wire (N03) and the Gifford-McMahon cold head (N05), stay available to both magnet plants. Six uncertainties follow, ranked by how many of the eight screened risks (R1 to R8, in the order of `02-risk-screen.md`) each one moves. A risk counts as moved when the uncertainty changes the replacement time, the number of qualified sources, or the exposure of that risk's node. Everything here is scenario reasoning unless a source is given; no web search was run this round, so dates and figures come from the phase 2 transcripts and their sources.

### T1. By 2031, what share of the OEM's new magnets are sealed, and does the 3 tesla line convert? (moves R1, R2, R5, R8; count 4)

This is the phase 2 item U-A1. The kind of not-knowing is actions mixed with outcomes: the conversion of the 1.5 tesla line is the OEM's own decision, but the 3 tesla clearance date and hospital uptake are outcomes. It could go three ways. In the first, sealed magnets are most of 1.5 tesla new builds by 2029 and a sealed 3 tesla magnet is cleared by 2028, so helium at the plants (N16, N17, N19) shrinks to test volumes and the cold head (N05) becomes the part without which nothing ships. In the second, sealed stays a minority 1.5 tesla option and the 3 tesla line stays conventional, so the helium nodes keep their current weight. In the third, a field reliability problem in the sealed class, which has no helium bath to ride through a cryocooler outage, slows adoption and keeps conventional magnets in demand. It is uncertain rather than predetermined because the clearance exists (FDA K253779, 5 February 2026) but no public installed-base count for any sealed design was found in phase 2, and hospitals buy on service history, not clearance. The resolving indicators are a 510(k) clearance for a sealed 3 tesla magnet under product code LNH, published at accessdata.fda.gov, and the sealed share of the OEM's own order book, which is internal and sits with the S&OP council. AI-suggested on the OEM's order mix; Panel judgement on the directions.

### T6. How much helium does a sealed magnet still consume at ramp and test, and does the plant's liquefaction remain a line risk? (moves R1, R2, R8; count 3)

The kind is causation. The sealed class holds about 7 litres in the field (FDA K181479, 3 August 2018) or 0.7 litres on one competitor's platform (producer release, 8 January 2026), but the helium used to cool down, ramp and test a magnet before sealing is a different and unpublished figure. In one direction the test draw is a small fraction of a conventional fill, and the helium cover at the US plant (N19) and its liquefaction (N16) stop being the eighth risk for new builds. In another, cool-down and test still take a large transient volume, so R8 keeps its weight and the Qatari outage (phase 2 P3) reaches the line through the China plant (N17) in particular. It is uncertain because the number is an engineering fact nobody outside the OEM has published. The indicator is internal: litres per magnet at test by magnet type, which Engineering and Site operations hold. Placeholder until they set it. This uncertainty decides whether the helium story from phase 2 is a delivery story or only a service story (N34).

### T9. Do export controls or dual-use lists reach 4 kelvin cryocoolers or superconducting wire by 2031? (moves R2, R4, R5; count 3)

The kind is causation with an outcomes element. Both parts are shared with fusion, quantum computing and physics, markets that are drawing policy attention, and phase 2 (P18) found the US cryocooler maker owned by a quantum-cryogenics firm and the wire mills' order books filling with fusion work. In one direction, cryocoolers and NbTi wire stay outside the control lists, as they are at the read date (phase 2 P7). In another, a quantum or fusion control entry sweeps in 4 kelvin cold heads or magnet-grade wire, and the China plant (N17), which draws cold heads from Japan and wire from a mill network with a Chinese site, loses one or both across a trade boundary while the US plant does not. A third direction is the mirror: China restricts export of wire from its own mill. It is uncertain because the lists are revised several times a year with no schedule for these items. The indicators are Commerce Control List amendments in the Federal Register, the annex of the EU dual-use regulation on EUR-Lex, and Japan's export-order revisions. Panel judgement; Sourcing confirms which mill and which cold-head plant serve each OEM site.

### T3. Is any 1.5 or 3 tesla magnet wound from something other than NbTi cleared before 2028? (moves R4, R7; count 2)

The kind is outcomes. No such magnet appeared in US clearance records to 11 October 2026 (openFDA, product code LNH), and magnesium diboride magnets have sold only at low field since 2008. If a high-temperature superconductor or magnesium diboride magnet at 1.5 tesla is cleared by 2028, an 18-month mill qualification still leaves time for it to reach a tenth of new installs by 2031, which would loosen the wire lock (N03) and change the winding skill set (N20). If clearance comes after 2028, or not at all, the wire stays the single most design-locked input through the horizon, which is the phase 2 position (P2). It is uncertain because at least one conductor is in commercial use at low field and the barrier is engineering and clearance time, not physics. The indicators are a 510(k) summary naming a conductor other than NbTi at accessdata.fda.gov, and the conductor stated in conference proceedings of the magnetic resonance and applied superconductivity societies. Panel judgement.

### T2. Does the cold head gain a second qualified source, or lose its only one? (moves R5; count 1)

The kind is actions on the OEM side and outcomes on the supplier side. One Japanese group makes most 4 kelvin Gifford-McMahon coolers, with plants in Japan, the United States and the Philippines (producer page, read 11 October 2026), and a second US maker exists but was bought in March 2023 by a firm that does not list MR among its markets. It could go toward a qualified second cold head by 2029, toward the status quo, or toward the Japanese plant being lost to a Nankai Trough event (phase 2 P15) with no second source in place. It is uncertain because qualification is the OEM's choice and the supplier's priorities are a parent decision. The indicators are the second maker's product page listing an MR-grade 4 kelvin cold head, and the Japanese group's disclosed plant locations. AI-suggested: Engineering confirms whether the sealed design uses the same cold head as the conventional one.

### T5. Does the 16 nanometre control logic get a second fab outside Taiwan before the part goes end of life? (moves R6; count 1)

The kind is actions. Mature-node capacity in Taiwan falls 15 to 20 percent by 2028 while Arizona, Kumamoto and Dresden ramp (Counterpoint via Benzinga, 23 January 2026; TSMC, 4 March 2025). The part could be re-sourced to a non-Taiwanese fab by 2028, stay Taiwan-only, or be discontinued first, forcing a board redesign that runs through the qualification record (N22, N15). It is uncertain because the foundry allocates nodes by customer and the logic vendor decides discontinuation. The indicators are the foundry's quarterly fab-by-node disclosures and the logic vendor's product discontinuation notices. Panel judgement; Engineering confirms the part and fab.

## Critical factors

T1 and T6 together decide whether helium is a delivery risk or a service risk by 2031, and they move four risks at once (N16, N17, N19, N05). T9 is the one uncertainty this lens sees that the phase 2 list misses, and it is the one that could strand the China plant without any trade rupture in finished scanners. The wire (N03) and the cold head (N05) survive every direction of T1 and T6; only T3 and T2 loosen them.

## Predetermined versus uncertain

Predetermined, carried from phase 2: the sealed 1.5 tesla class is cleared and sold; no non-NbTi magnet is cleared at 1.5 or 3 tesla; the wire and the cold head remain in the sealed design. Uncertain, as ranked above: T1, T6, T9, T3, T2, T5. Watch items that touch no screened risk: memory allocation and end-of-life for the console (N11, N12, N22), and whether a Chinese-built helium-light scanner sets price in the OEM's Asian markets (N17, N36).

## Contradictions with other lenses

Round 1 is isolated; no summaries yet. The likely contradiction is with the geopolitical and foreign trade lenses on whether export controls on components (T9) are a technology matter or a trade matter; this lens holds that the control entry follows the technology's dual use, not the scanner's trade status. The settling evidence is a control-list entry naming cryocoolers or superconducting wire.

## Blind spots of this lens

This lens overrates adoption speed, so T1 may resolve slower than the first direction reads. It underrates service networks, so a sealed fleet's dependence on cryocooler uptime (N05, N33) may matter more to the installed-base value than to the tolerance line. No installed-base count for any sealed design was found; T1 rests on clearances only.

## Ranking table

| Uncertainty | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | Count |
|---|---|---|---|---|---|---|---|---|---|
| T1 Sealed adoption pace and 3 tesla conversion | x | x | | | x | | | x | 4 |
| T6 Helium consumed at magnet test | x | x | | | | | | x | 3 |
| T9 Export controls reach cryocoolers or wire | | x | | x | x | | | | 3 |
| T3 Non-NbTi magnet cleared before 2028 | | | | x | | | x | | 2 |
| T2 Second cold-head source or loss of the first | | | | | x | | | | 1 |
| T5 Control logic second fab before end of life | | | | | | x | | | 1 |

## Sources

All from the phase 2 technology transcript, read 11 October 2026: FDA 510(k) summaries [K181479](https://www.accessdata.fda.gov/cdrh_docs/pdf18/K181479.pdf) (3 August 2018) and [K253779](https://www.accessdata.fda.gov/cdrh_docs/pdf25/K253779.pdf) (5 February 2026); [openFDA product code LNH](https://api.fda.gov/device/510k.json?search=product_code:LNH+AND+decision_date:[20250101+TO+20261011]&limit=100); [USGS helium](https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-helium.pdf) (February 2026); [cryocooler producer page](https://www.shicryogenics.com/about-us/) and [second maker](https://bluefors.com/products/cryomech-products/); [wire producer page](https://www.luvata.com/products/superconductors); [TSMC](https://pr.tsmc.com/english/news/3210) (4 March 2025); [Counterpoint via Benzinga](https://finviz.com/news/284980/taiwan-semiconductor-shrinks-old-chip-lines-goes-all-in-on-next-gen-tech) (23 January 2026). No new sources were added this round.
