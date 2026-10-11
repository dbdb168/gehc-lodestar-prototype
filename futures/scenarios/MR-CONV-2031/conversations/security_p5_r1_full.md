# Security, phase 5, round 1

## Analysis

Bottom line first. The two axes resolve on published lists: the Entity List and the Chinese counter-lists for U1, the FDA clearance database and the Federal Register for U2. All readings are from 11 October 2026 and none has moved either axis.

**Id:** SEC-1. **Uncertainty:** U1. **Name:** Entity List revisions. **What is measured:** each Bureau of Industry and Security rule adding or removing parties, read for the China plant (N17), its logic supplier (N10) or a cryogenic parts route (N05). **Source name:** Federal Register API, agency filter industry-and-security-bureau. **Source link:** https://www.federalregister.gov/api/v1/documents.json?conditions[term]=%22Entity+List%22+additions&conditions[agencies][]=industry-and-security-bureau&order=newest&per_page=5 **Cadence:** on publication, several rules a quarter. **Mode:** live. **Settles toward A when:** the 2027 sourcing cycle closes with no addition naming any of the three. **Settles toward B when:** a rule names one; the stop follows within a quarter (F3). **False signal:** a rule that only removes parties, or adds defence end users unrelated to imaging. **Last read:** the newest matching rule, "Revisions to the Entity List" of 24 August 2026, removes China-destination parties; nothing cryogenic, superconducting or medical appears in the five newest ([Federal Register](https://www.federalregister.gov/documents/2026/08/24/2026-17231/revisions-to-the-entity-list), 24 August 2026). **Leans toward:** a.

**Id:** SEC-2. **Uncertainty:** U1. **Name:** Chinese counter-listings. **What is measured:** Ministry of Commerce announcements adding parties to the export control list, the watch list or the unreliable entity list, read for the wire mills behind N03, the cold-head maker behind N05, the plant at N17 and the OEM. **Source name:** Ministry of Commerce announcements, read through a law-firm tracker; no official English address is confirmed. **Source link:** https://arnoldporter.com/en/perspectives/advisories/2026/07/china-imposes-export-control-and-government-procurement-restrictions-on-designated-us-companies **Cadence:** irregular, several batches a year. **Mode:** manual. **Settles toward A when:** batches stay on defence firms and the truce is renewed. **Settles toward B when:** an announcement names a wire or cryocooler maker or a foreign-owned imaging plant, or controls 8544.11 wire or cryocoolers. **False signal:** a Japanese batch naming a parent group with a cryogenics division but not the division; the licence route still runs. **Last read:** Announcement No. 23 (22 June 2026) listed 10 United States defence-linked entities; Announcements 27 and 28 (29 June) added 40 Japanese entities; secondary sources, none naming a cryogenics or wire maker ([advisory](https://arnoldporter.com/en/perspectives/advisories/2026/07/china-imposes-export-control-and-government-procurement-restrictions-on-designated-us-companies), July 2026). **Leans toward:** a, weakly.

**Id:** SEC-3. **Uncertainty:** U2. **Name:** Sealed clearances in product code LNH. **What is measured:** new 510(k) clearances for MR systems, read for a 3 tesla sealed magnet and the sealed share of new clearances. Touches N05, N19, N21. **Source name:** openFDA device 510(k) endpoint. **Source link:** https://api.fda.gov/device/510k.json?search=product_code:LNH&sort=decision_date:desc&limit=5 **Cadence:** weekly refresh. **Mode:** live. **Settles toward A when:** through 2028 no 3 tesla sealed clearance appears and sealed designs stay a minority. **Settles toward B when:** a 3 tesla sealed clearance lands and sealed designs pass half of new LNH clearances in a rolling year. **False signal:** a low-field or permanent-magnet clearance, which needs no helium and feeds the Contrarian's fifth future, not end B. **Last read:** newest decision 16 September 2026; the five newest include a neonatal system, a low-field sealed system and a 1.5 tesla system, no 3 tesla sealed magnet ([openFDA](https://api.fda.gov/device/510k.json?search=product_code:LNH&sort=decision_date:desc&limit=5), read 11 October 2026). **Leans toward:** a.

**Id:** SEC-4. **Uncertainty:** U2. **Name:** United States helium export or allocation rule. **What is measured:** any Federal Register rule or presidential document naming helium with export, allocation or Section 232; touches N01, N19, N34. **Source name:** Federal Register API, term search. **Source link:** https://www.federalregister.gov/api/v1/documents.json?conditions[term]=helium+export&order=newest&per_page=5 (built on the carried API pattern; not fetched this round). **Cadence:** on publication. **Mode:** live once confirmed. **Settles toward A when:** a rule is proposed. **Settles toward B when:** none appears and Gulf transits recover. **False signal:** a Bureau of Land Management lease or royalty notice naming helium, which is land administration. **Last read:** none this round; the carried reading is that no rule existed on 11 October 2026 (P3-uncertainties.md). **Leans toward:** neither.

SEC-1 and SEC-3 are live in the command centre today; both addresses return machine-readable JSON and were confirmed this round. SEC-4 is live in form but unfetched, so provisional. SEC-2 is manual: Sourcing or Quality and regulatory reads the Chinese announcements each quarter, because no official English feed was confirmed.

## Critical factors

SEC-1 decides F3; SEC-3 decides whether the cold head (N05) becomes the part that holds every magnet. SEC-2 is the one this lens trusts least and needs most, because a Chinese listing is the legal-action variant of U1 end B.

## Predetermined versus uncertain

Predetermined: the four sources exist and publish on known clocks. Uncertain, outcomes: whether any names a node before mid-2027. Uncertain, actions: whether SEC-2 can be made live without an official feed.

## Contradictions with other lenses

None read this round. The likely one is with Geopolitical over whether the truce notice or the Entity List is the earlier signal for N17; a dated listing settles it.

## Blind spots of this lens

Every indicator here is a government list. None shows a trusted supplier at N03 or N05 quietly degrading, or a carrier at N23 encrypted; the shared 35-day break in phase 6a carries those.

## Sources

- [Federal Register API, Entity List rules](https://www.federalregister.gov/api/v1/documents.json?conditions[term]=%22Entity+List%22+additions&conditions[agencies][]=industry-and-security-bureau&order=newest&per_page=5), read 11 October 2026.
- [Federal Register, Revisions to the Entity List](https://www.federalregister.gov/documents/2026/08/24/2026-17231/revisions-to-the-entity-list), 24 August 2026.
- [Law-firm advisory on Chinese counter-listings](https://arnoldporter.com/en/perspectives/advisories/2026/07/china-imposes-export-control-and-government-procurement-restrictions-on-designated-us-companies), July 2026, secondary.
- [openFDA 510(k) endpoint, product code LNH](https://api.fda.gov/device/510k.json?search=product_code:LNH&sort=decision_date:desc&limit=5), read 11 October 2026.
- P3-uncertainties.md, 11 October 2026, carried.
