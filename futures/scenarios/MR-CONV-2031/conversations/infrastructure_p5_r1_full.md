# Infrastructure, phase 5, round 1

## Analysis

Bottom line: four published readings, two for U2 (does helium still decide) and two for U1 (does a lane stop). One is live; three are quarterly reads. All four lean toward end A on 11 Oct 2026.

**Id:** INF-1. **Uncertainty:** U2. **Name:** Hormuz daily transits. **What is measured:** ships broadcasting AIS through the Strait of Hormuz each day, the lane Gulf helium leaves by. **Source name:** straits.live, republishing IMF PortWatch. **Source link:** https://straits.live/ with a CSV at https://straits.live/data. **Cadence:** daily rows, published weekly, with the last three days open to revision. **Mode:** live. **Settles toward A when:** the count stays below about 40 a day through 2028 and war-risk cover stays withdrawn. **Settles toward B when:** the count returns above about 70 a day for two consecutive quarters and insured container traffic resumes. **False signal:** a one-week jump from convoyed tankers; helium rides cargo ships, so the cargo column must rise, and dark transits already understate the flow. **Last read:** four ships on 4 Oct 2026 against a typical 85 a day (straits.live, read 11 Oct 2026). **Leans toward:** A. Touches N01, N23, N27, N19.

**Id:** INF-2. **Uncertainty:** U2. **Name:** Gulf share of US helium imports. **What is measured:** the share of United States helium imports by origin over a rolling four-year window. **Source name:** USGS Mineral Commodity Summaries, helium chapter. **Source link:** https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-helium.pdf. **Cadence:** annual, late January or February. **Mode:** manual. **Settles toward A when:** the Qatari share falls further and the chapter records allocation or a rising base price. **Settles toward B when:** the Qatari share recovers toward 40 percent and the base price falls, which needs the two destroyed trains rebuilt. **False signal:** a 2027 chapter still carries 2023 and 2024 flows; one annual step is noise, two in one direction is a read. **Last read:** Canada 47 percent, Qatar 28 percent, Algeria 10 percent, China 5 percent for 2021 to 2024 (USGS, 5 Feb 2026, downloaded and read 11 Oct 2026). **Leans toward:** A. Touches N01, N16, N19, N34.

**Id:** INF-3. **Uncertainty:** U1. **Name:** Red Sea weekly transits. **What is measured:** weekly transits of Suez and Bab el-Mandeb, the Gulf lane. **Source name:** Lloyd's List Intelligence Red Sea brief. **Source link:** https://www.lloydslistintelligence.com/resources/blog/red-sea-brief-1-october-2026 (series; the 27 Aug 2026 brief is the carried source). **Cadence:** about monthly. **Mode:** manual. **Settles toward A when:** transits hold or rise, so the lane costs weeks round the Cape and never stops. **Settles toward B when:** a closure to insured traffic lasts more than 30 days with no Cape alternative accepted by carriers. **False signal:** a weekly fall later revised upward once dark transits are found; the brief warns of this. **Last read:** 278 Suez transits and 290 Bab el-Mandeb transits in the week of 21 to 27 Sep 2026, about 10 percent above and 8 percent below the June average; the four weeks to 23 Aug 2026 were still 40 percent below the pre-attack period (Lloyd's List, 27 Aug and 1 Oct 2026). **Leans toward:** A. Touches N27, N28.

**Id:** INF-4. **Uncertainty:** U1. **Name:** Export port closure notices. **What is measured:** dated advisories from the one export port on closures and gate changes, read against the longshore contract expiring 30 Sep 2030. **Source name:** port authority client advisories. **Source link:** https://scspa.com/advisories/ with the contract at https://ilaunion.org/?p=8800. **Cadence:** event-driven, several a month. **Mode:** manual. **Settles toward A when:** closures stay at days, as since 2022, and the 2030 contract renews before expiry. **Settles toward B when:** a closure runs past 30 days (the 2024 Baltimore class, 11 weeks) or a strike notice is posted in the contract's final year. **False signal:** a one-terminal suspension for low volume, as on 1 Aug 2026; two terminals still load. **Last read:** the newest advisory is a gate-hours notice of 23 Sep 2026; no closure or labour item is listed in 2026 (SC Ports advisories, read 11 Oct 2026). **Leans toward:** A. Touches N25, N26.

Only INF-1 is live today: its CSV and JSON feed can be read by a machine weekly. INF-2 is an annual PDF; INF-3 and INF-4 are pages a person reads each quarter, monthly in hurricane season. A Taiwan Strait count for N29 exists in the IMF PortWatch dataset but I hold no confirmed address, so it is a gap.

## Critical factors

INF-1 is the one reading that moves U2 inside a quarter. The rest confirm slowly. Confidence moderate: each rests on one public source read today.

## Predetermined versus uncertain

The contract date, the four-year import window and the daily count are predetermined as data. Whether the count means insured helium traffic is an outcomes uncertainty; whether an allocation note appears in the 2027 chapter is outcomes.

## Contradictions with other lenses

None yet; round 2.

## Blind spots of this lens

I read ship counts and port notices and cannot see insurer decisions or allocation letters, which decide whether a container moves before any count changes. The helium container fleet has no published feed.

## Sources

straits.live Hormuz tracker and data page, read 11 Oct 2026: https://straits.live/ and https://straits.live/data
USGS Mineral Commodity Summaries 2026, helium, 5 Feb 2026: https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-helium.pdf
Lloyd's List Intelligence Red Sea brief, 27 Aug 2026: https://www.lloydslistintelligence.com/resources/blog/red-sea-brief-27-august-2026
Lloyd's List Intelligence Red Sea brief, 1 Oct 2026: https://www.lloydslistintelligence.com/resources/blog/red-sea-brief-1-october-2026
SC Ports client advisories, read 11 Oct 2026: https://scspa.com/advisories/
ILA master contract release, 25 Feb 2025: https://ilaunion.org/?p=8800
