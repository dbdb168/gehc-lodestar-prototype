# Contrarian, phase 5, round 1

## Analysis

The bottom line is that my four indicators each fail differently: one never warns, one is misread, one lags a year, one tests whether the axes were right.

**Id.** C1. **Uncertainty.** U1. **Name.** Federal Register listings naming the parts. **What is measured.** Federal Register documents naming superconducting wire, niobium, cryocoolers or medical imaging equipment under Section 232 or an export control. **Source name.** Federal Register API. **Source link.** https://www.federalregister.gov/api/v1/documents.json?conditions[term]=helium&order=newest&per_page=5 (term swapped per part). **Cadence.** Daily. **Mode.** Live; the API returns JSON, though the search page blocked a fetch on 11 October 2026. **Settles toward A when.** The 2027 sourcing cycle closes with none named. **Settles toward B when.** One document names one. **False signal.** Silence. A Section 232 report goes to the President unpublished; the 270-day clock from September 2025 has passed with no proclamation, which reads as end A but only means the decision is pending. The indicator confirms a stop the day it starts and warns of nothing. **Last read.** 767 documents match helium; the newest five (to 4 August 2026) are hazardous-materials and foreign-trade-zone notices, none a control; no medical equipment proclamation found (11 October 2026). **Leans toward.** a, weakly, on silence alone. Touches N03, N05, N10, N17.

**Id.** C2. **Uncertainty.** U2. **Name.** Hormuz daily transits. **What is measured.** Vessels crossing the Strait of Hormuz per day, baseline 85. **Source name.** IMF PortWatch, mirrored by straits.live. **Source link.** https://straits.live/ (dashboard, JSON and RSS). **Cadence.** Daily, about a week late. **Mode.** Live. **Settles toward A when.** Transits stay below 40 into 2028 or a United States allocation rule arrives. **Settles toward B when.** Transits hold above 70 for a quarter and allocation letters stop. **False signal.** A rising count. It counts all AIS-broadcasting ships, not helium carriers, and says nothing about Qatar's liquefaction; transits can recover while helium waits on repaired plant. Equally, the panel's lean to end A rests on this count while United States landed helium leans on Canada (USGS, February 2026). **Last read.** Four vessels on 4 October 2026, five percent of normal (read 11 October 2026). **Leans toward.** a. Touches N01, N19, N23, N34.

**Id.** C3. **Uncertainty.** U2. **Name.** Grade-A helium base price. **What is measured.** Posted United States Grade-A base price per cubic metre, with import shares. **Source name.** United States Geological Survey, Mineral Commodity Summaries, helium chapter. **Source link.** https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-helium.pdf **Cadence.** Annual, each February for the prior year. **Mode.** Manual. **Settles toward A when.** Price rises two years running. **Settles toward B when.** Price falls two years running. **False signal.** A posted list price, not an allocation or spot price; it fell while Hormuz closed. **Last read.** About 12 dollars per cubic metre in 2025 from 14 in 2024, Qatar's share of imports 28 percent (February 2026; carried from phase 2, the PDF would not parse today). **Leans toward.** b, against the panel's lean. It lags so far it is useless for a 30-day line; it stays only because it is the sole public price. Touches N01, N19, N34.

**Id.** C4. **Uncertainty.** Neither; the fifth-future watch row from phase 4. **Name.** Low-field share of new MR clearances. **What is measured.** New United States 510(k) clearances in product code LNH and the share below 1 tesla. **Source name.** openFDA device 510(k) endpoint. **Source link.** https://api.fda.gov/device/510k.json?search=product_code:LNH&count=decision_date&limit=1000 **Cadence.** Weekly. **Mode.** Live for the count; manual for field strength, which is not a field and must be read from each summary each quarter. **Settles toward.** This row settles no axis. If the low-field share passes one third for two years, both axes describe a line delivering inside tolerance to a shrinking order book, and the grid was the wrong grid. **False signal.** A rise in counts; most LNH clearances are coils and software, not magnets. **Last read.** 21 clearances in 2026 to 16 September 2026 and 26 in 2025; the low-field share has not been computed (11 October 2026). **Leans toward.** neither. Touches N35, N36, N03.

C1, C2 and the count half of C4 are live today; C3 and the field-strength half of C4 need a person, quarterly and yearly.

## Critical factors

Whether silence on C1 is read as a settle (N03, N05, N10; Panel judgement). Whether C2 is read as helium when it counts ships (N01, N23; Panel judgement). Whether the OEM holds a transaction price to replace C3 (N19; Placeholder, Sourcing).

## Predetermined versus uncertain

Predetermined: a listing publishes on its effective day and the USGS price is annual, so neither C1 nor C3 can lead. Uncertain: whether the Section 232 report exists unpublished (outcomes); whether Qatar's plant runs behind the transit count (causation); what the market wants in 2031 (value).

## Contradictions with other lenses

C3 leans b while the panel's U2 lean is a. Settled by a Sourcing transaction price or a 2026 allocation letter.

## Blind spots of this lens

The Federal Register API was read for one term only; the USGS figures are carried; the truce notice date is unconfirmed. One search found no proclamation, which is the silence I warn about.

## Sources

Federal Register API, read 11 October 2026 (link at C1). straits.live mirror of IMF PortWatch, read 11 October 2026 (link at C2). USGS Mineral Commodity Summaries 2026, helium, February 2026 (link at C3). openFDA 510(k) endpoint, read 11 October 2026 (link at C4). Federal Register, Section 232 medical equipment notice, 26 September 2025, https://www.federalregister.gov/documents/2025/09/26/2025-18729/notice-of-request-for-public-comments-on-section-232-national-security-investigation-of-imports-of.
