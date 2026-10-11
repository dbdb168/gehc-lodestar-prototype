# Phase 5: the indicator register

Read date 11 October 2026. Eleven lenses proposed 42 indicators; the moderator merged them into twelve, six per uncertainty, plus two watch rows. Every indicator names a public source with an address, a cadence, a settle reading in both directions and a false signal. The structured copy the screens read is `indicators.json`.

## Bottom line

On 11 October 2026 every indicator that can lean leans toward end A of its axis: trade is still a cost, and helium still decides. Nothing has moved either axis. The two readings that would move them first are the truce notice (I03, due 10 November 2026 or 10 January 2027) and the Federal Register (I01, I02), both of which the command centre can poll today.

## The register

| Id | Axis | Indicator | Source | Cadence | Mode | Leans | Last read |
|---|---|---|---|---|---|---|---|
| I01 | U1 | Federal Register actions naming the parts | Federal Register documents interface | Each publication day | live | a | Zero Bureau of Industry and Security documents naming the parts, and no Section 232 medical proclamation, on 11 October 2026. |
| I02 | U1 | Entity List additions | Federal Register documents interface, Bureau of Industry and Security | On publication, several rules a quarter | live | a | Newest action 24 August 2026, removals only; no addition touching the map. |
| I03 | U1 | China truce notice and counter-listings | State Council Tariff Commission notices and Ministry of Commerce announcements, read through wire reports and a law-firm tracker | Event driven; several announcements a month, checked quarterly | manual | neither | Suspension in force from 10 November 2025 for one year, no renewal notice found; Announcement No. 46 of 9 October 2026 carries no export-control item. The truce end date reads 10 November 2026 or 10 January 2027 on two carried sources. |
| I04 | U1 | Sole-supplier parent filings | United States Securities and Exchange Commission EDGAR filing list; owners' press release pages | Within four days of an event for the listed parent; quarterly read of the press pages | live | a | No disposal filed on 11 October 2026. The United States second cryocooler source was bought and allocated to research in 2023 (predetermined element P18). The Japanese parent's investor address is still owed by Sourcing. |
| I05 | U1 | Export port closures and the longshore contract | Port authority advisories; Bureau of Labor Statistics Work Stoppages; longshore union site | Per event, daily in a storm; monthly stoppages file | live | a | No weather closure in 2026; newest advisory is a gate-hours notice of 23 September 2026. Contract approved 7 February 2025, runs to 30 September 2030. |
| I06 | U1 | European origin rule on medical tenders | EUR-Lex | On amendment; read quarterly | manual | a | In force since 20 June 2025 at the 5 million euro threshold; the page rendered empty on fetch on 11 October 2026, so the reading is carried from phase 2. |
| I07 | U2 | Gulf strait daily transits | IMF PortWatch, republished by straits.live | Daily rows, published weekly, last three days open to revision | live | a | Four ships on 4 October 2026 against a typical 85. |
| I08 | U2 | Helium price and import mix | United States Geological Survey Mineral Commodity Summaries, helium chapter; IMARC bulk helium price index; Bureau of Labor Statistics series PCU325120325120 | Annual in February; quarterly for the bulk index; monthly for the producer index | manual | a | About 12 dollars per cubic metre in 2025 from 14 in 2024, surcharges posted; Canada 47 percent, Qatar 28 percent of imports for 2021 to 2024 (USGS, February 2026, carried from phase 2). Producer index up 5.4 percent in the year to August 2026. |
| I09 | U2 | United States helium export or allocation rule | Federal Register documents interface | On publication | live | neither | No rule existed on 11 October 2026; the address is built on the confirmed interface pattern but was not fetched this round. |
| I10 | U2 | Sealed magnets in new United States clearances | openFDA device 510(k) endpoint; FDA 510(k) summaries | Weekly refresh; quarterly read of each summary's cryostat section | live | a | 21 clearances in 2026 to 16 September; five name a sealed or helium-light cryostat, all at or below 1.5 tesla; no 3 tesla sealed clearance. |
| I11 | U2 | Second 4 kelvin cold-head source | Product pages of the United States cryocooler maker on the map | Quarterly | manual | a | On 11 October 2026 the second maker lists Gifford-McMahon coolers only at 20 to 80 kelvin and reaches 4 kelvin only as a pulse tube; no drop-in second source. |
| I12 | U2 | Winter grid rating at the two United States sites | North American Electric Reliability Corporation, Winter Reliability Assessment | Annual, each November; read each quarter against the plant's backup-power Placeholder | manual | a | Carolinas rated elevated from 2027 and Midcontinent high from winter 2028 in the January 2026 long-term assessment; the 2025 winter assessment is the carried address. |

## What settles each one


### I01. Federal Register actions naming the parts

Measures: Any proclamation or Commerce rule naming finished MR scanners, superconducting wire, niobium, cryocoolers or cold heads, including the Section 232 medical equipment investigation opened 26 September 2025.

Settles toward end A when: The 2027 sourcing cycle closes with no document naming the parts, and the Section 232 medical action is confined to finished scanners or lapses.

Settles toward end B when: A document names wire, niobium, cryocoolers or cold heads, or a proclamation imposes a quota or licence on MR parts; the stop reaches N03, N05 or N17 within a quarter.

False signal: Silence. A Section 232 report goes to the President unpublished, so no proclamation can mean a decision pending rather than no decision. An edit to the existing superconducting materials entry is not a new listing.

Address: https://www.federalregister.gov/api/v1/documents.json?conditions[term]=%22superconducting+wire%22+OR+cryocooler+OR+niobium&conditions[agencies][]=industry-and-security-bureau&order=newest&per_page=20

Nodes: N03, N02, N05, N17, N18. Proposed by: Foreign trade, Geopolitical, Technology shift, Macroeconomic, Customer and market, Contrarian.

### I02. Entity List additions

Measures: Bureau of Industry and Security rules adding parties, read for the China plant, its logic supplier, a cryogenic parts route or a Chinese wire mill.

Settles toward end A when: The truce notice renews with no addition touching medical electronics or cryogenic parts by the close of the 2027 sourcing cycle.

Settles toward end B when: A rule names the plant, its logic supplier or a logic distributor serving China; the stop follows within a quarter (future F3).

False signal: A rule that only removes parties, or adds defence end users unrelated to imaging.

Address: https://www.federalregister.gov/api/v1/documents.json?conditions[term]=%22Entity+List%22+additions&conditions[agencies][]=industry-and-security-bureau&order=newest&per_page=5

Nodes: N17, N10, N31. Proposed by: Geopolitical, Security.

### I03. China truce notice and counter-listings

Measures: Whether the suspension of China's 24 percent additional tariff is renewed at its notice date, and whether a Ministry of Commerce announcement adds a wire mill, the cold-head maker, the OEM or a foreign-owned imaging plant to an export-control or unreliable-entity list.

Settles toward end A when: The suspension is renewed for a year or longer and no 2026 or 2027 announcement names cryogenic or superconducting items or an imaging plant.

Settles toward end B when: The 24 percent duty returns, or an announcement names a cryocooler or wire maker or a foreign-owned imaging plant, or extends dual-use controls to cold heads bound for China.

False signal: Quota and anti-dumping announcements, and batches that stay on defence firms.

Address: https://www.mofcom.gov.cn/

Nodes: N17, N03, N05, N31. Proposed by: Foreign trade, Geopolitical, Security.

### I04. Sole-supplier parent filings

Measures: Filings and press releases by the listed parents of the qualified wire mill and the two cryocooler makers, read for a sale, closure or market exit of the superconductor or cryocooler unit, and for how much of the backlog is fusion or physics work.

Settles toward end A when: The 2027 sourcing cycle closes with no disposal and both parents still offer the MR part.

Settles toward end B when: A filing or release announces a sale or closure of the unit, or restricts it to research markets; this is the owner-exit route to a stop in futures F4 and F2.

False signal: A backlog rise or a segment reshuffle that changes nothing on the shop floor.

Address: https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001109354&type=8-K&dateb=&owner=include&count=10

Nodes: N03, N05, N06. Proposed by: Financial, Labor, Macroeconomic.

### I05. Export port closures and the longshore contract

Measures: Dated closure advisories from the one export port, major work stoppages at ports and carriers, and the status of the longshore master contract expiring 30 September 2030.

Settles toward end A when: Closures stay at days through 2031 and the 2030 contract is renewed before expiry.

Settles toward end B when: One closure or stoppage at the port, the oversize carriers or the gas carriers runs past 30 days, or 30 September 2030 passes with no agreement.

False signal: An inland-yard or gate-hours notice; a short strike with large headcount, such as the three-day port strike of October 2024.

Address: https://scspa.com/advisories/

Nodes: N26, N25, N23, N24. Proposed by: Infrastructure, Natural disasters, Labor.

### I06. European origin rule on medical tenders

Measures: The status of Regulation (EU) 2025/1197, which bars Chinese-origin medical devices from tenders at or above 5 million euros, and any widening, counter-measure or withdrawal.

Settles toward end A when: The measure stays at its threshold or is withdrawn after a settlement; nothing stops.

Settles toward end B when: The threshold is removed, the measure extends to components, or a Chinese counter-rule bars foreign-built MR systems from Chinese hospitals.

False signal: A European preference clause in the procurement directives, which scores origin rather than barring it.

Address: https://eur-lex.europa.eu/eli/reg_impl/2025/1197/oj/eng

Nodes: N17, N28, N36. Proposed by: Customer and market.

### I07. Gulf strait daily transits

Measures: Ships broadcasting through the Strait of Hormuz each day, the lane Gulf helium leaves by, against a typical 85 a day.

Settles toward end A when: The count stays below about 40 a day through 2028 and war-risk cover stays withdrawn, or a United States allocation rule arrives.

Settles toward end B when: The count holds above about 70 a day for two consecutive quarters, insured container traffic resumes and allocation letters stop.

False signal: A one-week jump from convoyed tankers. The count is all ships, not helium carriers; transits can recover while Qatar's liquefaction is still being rebuilt.

Address: https://straits.live/data

Nodes: N27, N23, N01, N19. Proposed by: Infrastructure, Geopolitical, Contrarian.

### I08. Helium price and import mix

Measures: The posted Grade-A base price per cubic metre and United States import shares by origin from the annual survey; the quarterly bulk contract price by region under allocation; the producer price index for industrial gases.

Settles toward end A when: The base price rises two editions running with surcharges still posted, the Qatari share falls further, and the United States bulk price holds above 100,000 dollars a tonne through 2027.

Settles toward end B when: The surcharge sentence disappears, the base price falls two editions running, and the bulk price falls two quarters running with spot availability.

False signal: A lower posted base price with surcharges still posted, because allocation lives in the surcharge. A producer-index fall driven by argon and oxygen.

Address: https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-helium.pdf

Nodes: N01, N19, N34. Proposed by: Macroeconomic, Financial, Infrastructure, Contrarian.

### I09. United States helium export or allocation rule

Measures: Any Federal Register rule or presidential document naming helium with export, allocation or Section 232.

Settles toward end A when: A rule is proposed or signed; it also moves U1 toward a stop for the China plant, which cannot buy Chinese helium.

Settles toward end B when: None appears while Gulf transits recover.

False signal: A Bureau of Land Management lease or royalty notice naming helium, which is land administration.

Address: https://www.federalregister.gov/api/v1/documents.json?conditions[term]=helium+export&order=newest&per_page=5

Nodes: N01, N16, N17, N19. Proposed by: Security, Foreign trade, Macroeconomic.

### I10. Sealed magnets in new United States clearances

Measures: New 510(k) clearances in product code LNH (magnetic resonance diagnostic device), read for the first 3 tesla sealed magnet and for the sealed share of new clearances.

Settles toward end A when: No 3 tesla sealed clearance appears by the 2027 sourcing cycle and sealed designs stay a minority through 2028.

Settles toward end B when: A 3 tesla sealed clearance lands, sealed designs pass half of new clearances in a rolling year, and Engineering confirms the test draw as a cylinder (Placeholder).

False signal: A 3 tesla clearance for a software or coil change on a conventional platform; several K numbers for one platform family; a run of low-field or portable clearances, which feed the fifth-future watch row rather than end B.

Address: https://api.fda.gov/device/510k.json?search=product_code:LNH&sort=decision_date:desc&limit=10

Nodes: N05, N19, N21, N34. Proposed by: Technology shift, Security, Labor, Customer and market.

### I11. Second 4 kelvin cold-head source

Measures: Whether any maker other than the sole Japanese group lists a 4 kelvin Gifford-McMahon cold head, which settles the six-to-five split on whether the cold head breaks or costs when helium no longer decides.

Settles toward end A when: No second 4 kelvin Gifford-McMahon source exists, so at end B the cold head is a single point with no spare design.

Settles toward end B when: A second maker lists a 4 kelvin cold head, or a sealed magnet is cleared on a pulse-tube cooler.

False signal: A 4 kelvin pulse-tube cryostat on the same page, which is not a drop-in cold head.

Address: https://bluefors.com/products/cryomech-products/

Nodes: N05, N06, N22. Proposed by: Technology shift.

### I12. Winter grid rating at the two United States sites

Measures: The winter risk rating and extreme-scenario reserve margin for the regions covering the magnet plant and the hub.

Settles toward end A when: A region is rated high and a multi-week curtailment reaches the plant while the Gulf is still impaired, because the liquefier stops and helium cover becomes the margin.

Settles toward end B when: It cannot settle end B; a normal rating only removes one route to end A.

False signal: A cold-snap advisory that lifts in days.

Address: https://prod.nerc.com/globalassets/our-work/assessments/nerc_wra_2025.pdf

Nodes: N16, N18, N19. Proposed by: Natural disasters, Infrastructure.

## Watch rows

- **W1 Low-field share of new MR clearances.** The share of new product code LNH clearances below 1 tesla, the contrarian's fifth-future watch row. It settles no axis. If the low-field share passes one third for two years, the line delivers inside tolerance to a shrinking order book and the grid was the wrong grid. Last read: 21 clearances in 2026 to 16 September; field strength not yet tallied.
- **W2 MR on the regulator's shortage list.** Whether any MR product code or helium-dependent imaging device appears on the FDA device shortages list under Section 506J, which is what a procurement team sees before accepting a longer lead time. An MR code is listed with helium supply as the reason; this is a lagging confirmation of U2 end A, not a leading read. Last read: Updated 16 June 2026; no imaging code listed.

## Live today and read by a person

Live in the command centre today, as addresses that return machine-readable data: I01, I02 (Federal Register interface), I04 (EDGAR feed for the listed parent), I05 (port advisories page and the monthly stoppages file), I07 (strait transits), I09 (once its address is fetched and confirmed), I10 (the clearance list; the sealed tag needs a reader). Read by a person each quarter: I03 (Chinese, no official English feed confirmed), I06 (the European register renders poorly to a machine), I08 (an annual PDF and a quarterly web page), I11 (two makers' catalogues), I12 (an annual PDF). At least one live indicator serves each axis, which meets the phase 5 check.

## Contradictions and gaps

1. The contrarian reads the helium base price (I08) as leaning toward end B, because the posted list price fell from 14 to 12 dollars while the Gulf closed. The panel keeps the lean at end A because allocation lives in the surcharge, not the list price, and the bulk contract index and the transit count both read end A. The disagreement is recorded; the index and the transit count decide.
2. The strait transit count (I07) counts all ships, not helium carriers, and says nothing about Qatar's rebuilt liquefaction. A recovery in transits is a necessary reading for end B, not a sufficient one; I08 confirms.
3. Three addresses could not be confirmed this round: the Japanese cryocooler parent's investor page (Sourcing supplies it), a Taiwan Strait transit series (exists in the IMF dataset, no address held), and the Chinese ministry's English feed. Each is a gap, not a guess.
4. The sealed tag on clearances (I10) is not a field in the feed; a person reads each summary's cryostat section each quarter. Engineering's test-draw Placeholder decides whether a sealed majority ends helium as a line risk.

## Checks

Every indicator names a public source with a link and a cadence: yes. At least one indicator per uncertainty is live: yes, four for U1 and three for U2. Each has a settle reading in both directions and a false-signal reading: yes, with I12 noting it cannot settle end B.
