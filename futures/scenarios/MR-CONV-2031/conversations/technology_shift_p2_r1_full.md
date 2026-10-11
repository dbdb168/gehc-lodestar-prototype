# Technology shift, phase 2, round 1

## Analysis

The bottom line is that the sealed, helium-light 1.5 tesla magnet is no longer a prototype. By October 2026 it is a cleared product with service history at three of the largest makers, including the OEM, and that holds whatever else happens before 2031. It changes the meaning of the helium nodes (N01, N19, N21, N23, N34) for new builds, but it does not remove the superconducting wire (N03) or the cold head (N05), and it makes the cold head more important, because a sealed magnet has no helium bath to ride through a cryocooler outage.

Nine predetermined elements follow, each with its nodes, source, date, and what would have to happen for it not to hold.

**1. Sealed 1.5 tesla magnets are cleared, sold and serviced.** The first sealed 1.5 tesla system was cleared by the US Food and Drug Administration (FDA) on 3 Aug 2018; its 510(k) summary describes a closed cooling system holding about 7 litres of helium with no quench pipe ([K181479](https://www.accessdata.fda.gov/cdrh_docs/pdf18/K181479.pdf)). A 0.55 tesla system needing 0.7 litres was cleared on 1 Jul 2021 ([K210611](https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K210611)), and the same maker's 70 cm 1.5 tesla platform with 0.7 litres was cleared in January 2026 ([producer release, 8 Jan 2026](https://www.siemens-healthineers.com/en-us/press-room/press-releases/magnetom-flow-mr-platform-fda-clearance)). The OEM's own 1.5 tesla platform was cleared on 5 Feb 2026 with two magnet options, one conventional and one sealed with complete helium containment and no quench pipe ([K253779 summary](https://www.accessdata.fda.gov/cdrh_docs/pdf25/K253779.pdf)). AI-suggested: Quality and regulatory can confirm which markets the sealed option is cleared in. Nodes N01, N19, N21, N23, N34, N22. It stops holding only if a safety recall withdraws sealed designs.

**2. Helium-light magnets are already made in China for the US market.** FDA records list a Shenzhen manufacturing entity as applicant for a competitor's 0.55 tesla and 60 cm 1.5 tesla helium-light platforms on 16 Jun 2025, 20 Nov 2025, 23 Feb 2026 and 1 Sep 2026 ([openFDA, product code LNH](https://api.fda.gov/device/510k.json?search=product_code:LNH+AND+decision_date:[20250101+TO+20261011]&limit=100)). New-technology supply already crosses the trade boundary of dimension A. Nodes N17, N29. It stops holding if US import rules exclude Chinese-built scanners.

**3. Helium supply is concentrated and the US has no reserve.** World production in 2025 was about 190 million cubic metres: United States 81, Qatar 63, Russia 18, Algeria 11 ([USGS, Feb 2026](https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-helium.pdf)). The same source records "Government stockpile: none" and that EU and US sanctions banning Russian helium continued into 2025 ([EU restriction, 24 Jun 2024](https://eur-lex.europa.eu/eli/reg/2024/1745/oj)). The Federal Helium System was sold on 27 Jun 2024 ([BLM](https://www.blm.gov/press-release/blm-completes-sale-federal-helium-system)). Nodes N01, N19, N23, N34. It stops holding if sanctions lift or a public reserve is re-legislated.

**4. Qatari output is impaired for years.** Attacks on Ras Laffan on 2 Mar 2026 led to force majeure, and restoring full capacity is estimated at three to five years ([PIIE, 21 Apr 2026, citing Reuters 19 Mar 2026](https://www.piie.com/blogs/realtime-economics/2026/bring-back-helium-reserve-next-shock-hits); [trade account, 23 Mar 2026](https://rareearthexchanges.com/news/when-a-commodity-becomes-rare-the-helium-crisis-the-ras-laffan-shock-and-the-fragility-of-global-supply/)). Moderate confidence: one newspaper estimate, no producer disclosure found. Nodes N01, N19, N23, N34. It stops holding if repairs finish early.

**5. Helium and niobium are EU critical raw materials.** Annex II of Regulation (EU) 2024/1252 of 11 Apr 2024 lists both; neither is strategic, so the 2030 benchmarks do not apply ([text](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R1252)). Nodes N01, N02. It changes only by amendment.

**6. Niobium stays Brazilian.** Brazil produced about 93 percent of world niobium in 2025, Canada 5 percent; US import reliance is 100 percent ([USGS, Feb 2026](https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-niobium.pdf)). No mine opening by 2031 changes this. Nodes N02, N03.

**7. The wire does not change by 2031.** Sealed magnets are still wound from niobium-titanium (NbTi). One wire producer runs mills in Finland, China and the United States ([producer page, 2026](https://www.luvata.com/products/superconductors)); a 2025 securities filing claims it supplies wire for over one-third of global MR scanners ([SEC Form C/A](https://www.sec.gov/Archives/edgar/data/1621902/000166919125000547/offeringstatement.pdf); low confidence, a company claim). Magnesium diboride (MgB2) cryogen-free magnets have sold at low field since 2008 ([producer page](https://www.asgsuperconductors.com/)); no 1.5 or 3 tesla magnet without NbTi appears in FDA clearance records for 2025 to 2026. With 18 months to qualify a mill, a wire change cleared after 2027 cannot reach a tenth of installs by 2031. Panel judgement. Nodes N03, N02, N22.

**8. The cold head stays, and matters more.** Four-kelvin Gifford-McMahon cryocoolers come principally from one Japanese group with plants in Japan, the United States and the Philippines ([producer page, 2026](https://www.shicryogenics.com/about-us/); [products](https://www.shicryogenics.com/products/4k-cryocoolers/)), with a second maker in the United States ([Bluefors](https://bluefors.com/products/cryomech-products/)). AI-suggested: Engineering can confirm whether the sealed design uses the same cold head. Nodes N05, N06.

**9. Dated rules and chip trends already in motion.** EU legacy medical devices lose transition cover on 31 Dec 2028 ([Regulation (EU) 2023/607, 15 Mar 2023](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32023R0607)); the Cyber Resilience Act applies from 11 Dec 2027 to component suppliers though not to the scanner itself ([Regulation (EU) 2024/2847](https://eur-lex.europa.eu/eli/reg/2024/2847/oj)); FDA cyber-device rules have applied since 29 Mar 2023 ([FDA, 27 Jun 2025](https://www.fda.gov/medical-devices/digital-health-center-excellence/cybersecurity)). Arizona has been in volume production since late 2024 ([TSMC, 4 Mar 2025](https://pr.tsmc.com/english/news/3210)); Kumamoto ramps 12/16 nm by end 2026, Dresden tools up in 2027, and Taiwanese 12-inch mature capacity falls 15 to 20 percent by 2028 ([Counterpoint via Benzinga, 23 Jan 2026](https://finviz.com/news/284980/taiwan-semiconductor-shrinks-old-chip-lines-goes-all-in-on-next-gen-tech)). Legacy DRAM is on allocation with 26 to 42 week lead times ([RAND Technology, 19 Nov 2025](https://randtech.com/the-coming-dram-crunch-what-oems-should-expect/)). Nodes N10, N11, N12, N15, N22.

## Critical factors

The sealed magnet moves helium from a delivery risk to an installed-base risk (N34), while new builds still need helium for ramp and test (N21) in smaller volumes; AI-suggested, Engineering can state the litres per sealed magnet at test. The single-source cold head (N05) and the single wire mill (N03) survive the shift unchanged. Memory end-of-life (N11) is the nearest dated technology break for the console.

## Predetermined versus uncertain

Predetermined: elements 1 to 9 above, each dated. Uncertain, held for phase 3 without analysis:

- The share of the OEM's new installs that are sealed by 2031 (outcomes).
- Whether any 1.5 tesla magnet without NbTi wire is cleared before 2028 (outcomes).
- Whether the cold head gains a second qualified source (actions).
- When Ras Laffan returns to full helium output (outcomes).
- Whether export controls reach cryocoolers or superconducting wire (causation).
- Whether the OEM's 16 nm logic moves to a non-Taiwanese fab (actions).
- Whether hospitals weigh helium independence in tenders (value).

## Contradictions with other lenses

Round 1; no summaries yet. The likely contradiction is with any lens that treats helium as the first break for new builds through 2031; this lens expects the installed base to break first. The settling evidence is the OEM's sealed share of orders in 2027 and the helium volume at magnet test.

## Blind spots of this lens

This lens tends to overrate adoption speed and underrate the installed base and the hospital's reluctance to buy a first-generation device, so element 1 may matter less by 2031 than it reads. It can also miss that removing the helium bath adds a cryocooler uptime dependency (N05, N33). No installed-base count for any sealed design was found.

## Sources

All sources are linked and dated inline above: 20 primary (USGS, BLM, FDA records and openFDA, four EU regulations, FDA cybersecurity page, TSMC, producer pages, SEC filing) and four secondary (PIIE, the Ras Laffan trade account, Counterpoint via Benzinga, RAND Technology). The OEM's 18 Feb 2026 wire release is not linked because its URL carries the OEM's name; the FDA record stands in for it.
