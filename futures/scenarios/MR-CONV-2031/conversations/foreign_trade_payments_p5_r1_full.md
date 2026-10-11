# Foreign trade and payments, phase 5, round 1

## Analysis

Bottom line: the rules that decide U1 sit in the Federal Register, Chinese ministry notices and the Global Trade Alert register. The Federal Register has a public JSON interface, confirmed on 11 October 2026, so two of the four indicators are live today; the other two need a reader. Read date 11 October 2026.

**Id** FT1. **Uncertainty** U1. **Name** China truce renewal notice. **What is measured** Whether the one-year suspension of China's 24 percent additional tariff on United States goods is renewed, lapsed or replaced. **Source name** State Council Tariff Commission notice, carried by Global Times via GlobalSecurity and by wire reports. **Source link** https://www.globalsecurity.org/wmd/library/news/china/2025/11/china-251105-globaltimes04.htm (paywalled today; confirmed at https://gulfnews.com/business/markets/china-says-extends-suspension-of-extra-24-tariff-on-us-goods-1.500334167, 5 November 2025). **Cadence** Event driven, one notice per truce term. **Mode** Manual. **Settles toward A when** A notice renews the suspension for a year or longer before it lapses. **Settles toward B when** The 24 percent duty returns or an entity listing names the China plant (N17) or its logic supplier (N10). **False signal** A wire report with no ministry notice, or an extension of weeks, which leaves N17 and N31 queued. **Last read** The suspension took effect at 13:01 on 10 November 2025 for one year; no renewal notice found on 11 October 2026 (Gulf News, 5 November 2025). **Leans toward** Neither; the term ends in about a month. Nodes N17, N31, N29.

**Id** FT2. **Uncertainty** U1. **Name** Section 232 medical equipment action. **What is measured** Any Commerce report or proclamation under the Section 232 medical equipment investigation opened 26 September 2025. **Source name** Federal Register documents interface. **Source link** https://www.federalregister.gov/api/v1/documents.json?conditions[term]=%22section+232%22+%22medical+equipment%22&order=newest&per_page=5 **Cadence** Each publication day. **Mode** Live. **Settles toward A when** A proclamation confines duties to finished scanners or exempts imaging equipment, or the statutory clock passes with no action. **Settles toward B when** A proclamation reaches MR components or systems built at the China plant for Asia. **False signal** An unrelated notice matching the terms; the reader checks agency and document type. **Last read** Newest matching document is the 26 September 2025 request for comments; no report or proclamation (Federal Register API, 11 October 2026). **Leans toward** A. Nodes N17, N18, N31.

**Id** FT3. **Uncertainty** U1. **Name** Listing of wire, niobium or cold heads. **What is measured** Any export-control or trade-remedy notice by a producer country naming superconducting wire, niobium, Gifford-McMahon cryocoolers or cold heads. **Source name** Federal Register documents interface for the United States; Global Trade Alert for other producer countries. **Source link** https://www.federalregister.gov/api/v1/documents.json?conditions[term]=%22superconducting%22+%22export%22&order=newest&per_page=5 and https://globaltradealert.org **Cadence** Daily for the Federal Register; the register posts within days of a measure. **Mode** Live for the United States search; manual for the register. **Settles toward A when** The 2027 sourcing cycle closes with no listing. **Settles toward B when** Any notice names the part; the stop reaches N03, N05 or N17 within a quarter. **False signal** A re-issue of control entry 1C005, which already names niobium-titanium with a non-copper matrix and does not reach magnet-grade wire in copper (Trade Hub, current). **Last read** Newest match is the January 2025 artificial intelligence diffusion rule; none of 44 matches names superconducting wire or cryocoolers (Federal Register API, 11 October 2026). **Leans toward** A. Nodes N02, N03, N05, N17.

**Id** FT4. **Uncertainty** U2. **Name** Producer-country helium export measures. **What is measured** The count and end dates of helium export licensing or bans in force at Russia, China and Qatar, plus any United States allocation or export rule. **Source name** Global Trade Alert interventions 154600 and 157329. **Source link** https://globaltradealert.org/intervention/154600-russia-helium-added-to-the-export-licensing-list and https://globaltradealert.org/intervention/157329-china-temporary-export-ban-on-helium **Cadence** As measures change; checked quarterly. **Mode** Manual. **Settles toward A when** Russian licensing is extended past 31 December 2027, the Chinese ban stays, or a United States rule appears. **Settles toward B when** Both measures lapse and Qatari volume returns through Hormuz. **False signal** The Russian decree lapsing on its own date while Hormuz stays shut; helium that is legal but not shipped still decides whether a magnet ships. **Last read** Russia Decree 404 in force 14 April 2026, revocation date 31 December 2027; China Announcement 2026/29 in force 10 July 2026, no revocation date (Global Trade Alert, read 11 October 2026). **Leans toward** A. Nodes N01, N19, N34.

## Critical factors

FT2 and the United States half of FT3 are live in the command centre today through the Federal Register interface. FT1 and FT4 have no feed, so a person reads them each quarter and on each truce date. Only FT1 moves within a month. Panel judgement.

## Predetermined versus uncertain

Predetermined: the Russian measure's end date and the truce term. Uncertain, outcomes: whether either is renewed. Uncertain, actions: whether a producer country lists wire or cold heads at all.

## Contradictions with other lenses

Round 1; none read. The truce date split with Geopolitical (10 November 2026 against 10 January 2027) stands; FT1 settles it.

## Blind spots of this lens

A term search misses a listing written as a tariff code, and misses informal holds at a producer that never become a notice.

## Sources

- Federal Register, Section 232 medical equipment comment request, 26 September 2025: https://www.federalregister.gov/documents/2025/09/26/2025-18729/notice-of-request-for-public-comments-on-section-232-national-security-investigation-of-imports-of
- Sandler, Travis and Rosenberg status page, read 11 October 2026: https://www.strtrade.com/trade-news-resources/tariff-actions-resources/section-232-investigation-ppe-medical
- Gulf News, 5 November 2025: https://gulfnews.com/business/markets/china-says-extends-suspension-of-extra-24-tariff-on-us-goods-1.500334167
- Global Trade Alert, Russia Decree 404 and China helium ban, read 11 October 2026: links above
- Trade Hub, control entry 1C005: https://www.thetradehub.eu/en/customs/export-control/annex-i/1c005
