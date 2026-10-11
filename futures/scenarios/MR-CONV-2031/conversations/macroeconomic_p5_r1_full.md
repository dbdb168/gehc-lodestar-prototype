# Macroeconomic, phase 5, round 1

## Analysis

This lens watches prices and rules. Two published price series read U2; one legal register and one price bulletin read U1. All four addresses were fetched on 11 October 2026.

**Id** MAC-1. **Uncertainty** U2. **Name** Helium base price and import mix. **What is measured** The estimated base price of Grade-A helium per cubic metre, the surcharge note, and United States import shares by origin. Touches N01, N19, N34. **Source name** United States Geological Survey (USGS), Mineral Commodity Summaries, helium chapter. **Source link** https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-helium.pdf. **Cadence** Annual, January or February. **Mode** Manual; a PDF a person reads. **Settles toward A when** the base price rises, surcharges are still posted, and Qatar's import share falls further. **Settles toward B when** the surcharge sentence disappears and the base price falls for two editions. **False signal** A lower base price with surcharges still posted, since allocation lives in the surcharge. **Last read** About 12 dollars per cubic metre in 2025, surcharges posted; imports 2021 to 2024 were Canada 47 percent, Qatar 28 percent, Algeria 10 percent (USGS, February 2026). **Leans toward** a.

**Id** MAC-2. **Uncertainty** U2. **Name** Industrial gas producer prices. **What is measured** The producer price index (PPI) for industrial gas manufacturing, series PCU325120325120, a blend of helium, argon, oxygen and nitrogen. Touches N01, N19, N34. **Source name** Bureau of Labor Statistics (BLS). **Source link** https://data.bls.gov/timeseries/PCU325120325120. **Cadence** Monthly, about the tenth of the next month; four months of revisions. **Mode** Live; the BLS public API serves the series by id. **Settles toward A when** the index keeps rising faster than final demand PPI (5.4 percent in the year to August 2026, BLS, 10 September 2026) through 2027. **Settles toward B when** the index flattens for four consecutive quarters while the Gulf route is still shut. **False signal** A fall driven by argon and oxygen, which have no Gulf exposure; a move needs MAC-1 to confirm. **Last read** 295.224 for August 2026, preliminary, up from 288.020 in May 2026 (BLS, read 11 October 2026). **Leans toward** a, weakly, because the helium share of the rise is not published.

**Id** MAC-3. **Uncertainty** U1. **Name** Section 232 presidential actions. **What is measured** Every presidential document in the Federal Register citing Section 232, read for whether it imposes a duty (a cost) or a quota or licence (a stop) on copper, semiconductors, cryogenic equipment or medical imaging. Touches N04, N08, N10, N12, N31. **Source name** Federal Register. **Source link** https://www.federalregister.gov/api/v1/documents.json?conditions[type][]=PRESDOCU&conditions[term]=%22section+232%22&order=newest&per_page=5. **Cadence** Each publication day. **Mode** Live; the address returns JSON. **Settles toward A when** the refined copper duty of 1 January 2027 arrives as a tariff only and the medical investigation ends in a duty on finished scanners. **Settles toward B when** a proclamation restricts wire, cryocoolers, logic or memory by quota or licence, as the polysilicon action of 24 September 2026 did for its product. **False signal** A duty on imported finished MR scanners; for a United States-assembled line that is a cost, not a stop. **Last read** 71 matching documents; the newest, 14 September 2026, concerns Canadian motor vehicles; none since the copper proclamation of 30 July 2025 and the semiconductor proclamation of 15 January 2026 names copper, chips or medical devices (Federal Register, read 11 October 2026). **Leans toward** a.

**Id** MAC-4. **Uncertainty** U1. **Name** Memory contract price direction. **What is measured** The quarterly forecast of conventional DRAM contract prices and the wording on server allocation. Touches N11, N12. **Source name** TrendForce press centre. **Source link** https://www.trendforce.com/presscenter/news/20260930-13258.html. **Cadence** Quarterly, with monthly bulletins. **Mode** Manual. **Settles toward A when** increases fall to single digits and the market is no longer described as undersupplied. **Settles toward B when** industrial customers receive no quotation at any price for two quarters, since N12 has one source and a twelve-month replacement. **False signal** Rising prices alone; three makers and a three-month replacement at N11 make a price rise a cost, never a stop. **Last read** Conventional DRAM contract prices projected up 10 to 15 percent quarter on quarter in the fourth quarter of 2026, market still undersupplied, pace slowing (TrendForce, 30 September 2026). **Leans toward** a.

MAC-2 and MAC-3 are live in the command centre today; both addresses return machine-readable data. MAC-1 needs a reader yearly and MAC-4 quarterly.

## Critical factors

Whether the helium surcharge survives into the 2027 USGS edition (N19), and whether any Section 232 action moves from duty to quota before the 2027 sourcing cycle (N04, N10).

## Predetermined versus uncertain

Predetermined: the refined copper duty is scheduled for 1 January 2027 (N04). Uncertain: whether it is taken (actions); whether the gas PPI reflects helium or argon (causation); whether memory allocation ever reaches no-quote (outcomes).

## Contradictions with other lenses

None in round 1.

## Blind spots of this lens

No public series isolates helium, so a physical shortage can hide inside a flat index. None of these four watches a sole supplier's owner, the other route to U1 end B. No web search was run; all readings came from carried addresses.

## Sources

USGS, Mineral Commodity Summaries 2026, helium, February 2026: https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-helium.pdf
BLS, PPI industrial gas manufacturing, read 11 October 2026: https://data.bls.gov/timeseries/PCU325120325120
BLS, Producer Price Index August 2026, 10 September 2026: https://www.bls.gov/news.release/ppi.nr0.htm
Federal Register API, Section 232 presidential documents, read 11 October 2026: https://www.federalregister.gov/api/v1/documents.json?conditions[type][]=PRESDOCU&conditions[term]=%22section+232%22&order=newest&per_page=5
Federal Register, polysilicon stockpiling measures, 24 September 2026: https://www.federalregister.gov/documents/2026/09/24/2026-19537/measures-to-restrict-stockpiling-of-polysilicon-and-polysilicon-derivatives-under-proclamation-11052
TrendForce, 4Q26 memory contract prices, 30 September 2026: https://www.trendforce.com/presscenter/news/20260930-13258.html
