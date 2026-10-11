# Technology shift, phase 5, round 1

## Analysis

The bottom line is that all four indicators exist as public records, two machine-readable, and all read toward end A or neither on 11 October 2026.

**Id:** TS1. **Uncertainty:** U2. **Name:** 3 tesla sealed clearance. **What is measured:** whether a sealed 3 tesla magnet appears in United States clearances under product code LNH (magnetic resonance diagnostic device). **Source name:** openFDA 510(k) endpoint, Food and Drug Administration (FDA). **Source link:** https://api.fda.gov/device/510k.json?search=product_code:LNH+AND+decision_date:[20260101+TO+20261011]&limit=100 (fetched 11 October 2026). **Cadence:** reloaded about weekly. **Mode:** live. **Settles toward A when:** no 3 tesla sealed clearance exists by the 2027 sourcing cycle, so 3 tesla magnets still need a helium delivery (N01, N19, N21). **Settles toward B when:** a 3 tesla sealed clearance appears and a second maker follows within four quarters (N05, N22). **False signal:** a 3 tesla clearance for a software or coil change on a conventional platform. **Last read:** 21 LNH clearances from 1 January to 11 October 2026, none describing a sealed 3 tesla magnet. **Leans toward:** a.

**Id:** TS2. **Uncertainty:** U2. **Name:** sealed share of new clearances. **What is measured:** how many LNH clearances in a year describe a sealed or helium-light cryostat in their 510(k) summary. **Source name:** FDA 510(k) summaries, reached from the TS1 listing. **Source link:** as TS1, with summaries at the pattern https://www.accessdata.fda.gov/cdrh_docs/pdf25/K253779.pdf. **Cadence:** quarterly reading of a weekly feed. **Mode:** manual. **Settles toward A when:** sealed platforms stay a minority and stay at or below 1.5 tesla through 2028 (N01, N19, N21, N34). **Settles toward B when:** sealed platforms are the majority of new 1.5 tesla clearances by 2028 and the test draw is confirmed as a cylinder (Placeholder, Engineering). **False signal:** several K numbers for one platform family; count platforms, not records. **Last read:** five of the 21 records name a sealed or helium-light platform, including the OEM's own 5 February 2026 clearance with a sealed option (AI-suggested, Quality and regulatory confirms); all are 1.5 tesla or below. **Leans toward:** neither; sealed is established at 1.5 tesla and absent at 3 tesla.

**Id:** TS3. **Uncertainty:** U1. **Name:** export rules naming wire, cryocoolers or niobium. **What is measured:** Federal Register documents from the Bureau of Industry and Security naming superconducting wire, cryocoolers or niobium. **Source name:** Federal Register API. **Source link:** https://www.federalregister.gov/api/v1/documents.json?conditions[term]=%22superconducting+wire%22+OR+cryocooler+OR+niobium&conditions[agencies][]=industry-and-security-bureau&order=newest&per_page=20 (fetched 11 October 2026). **Cadence:** daily. **Mode:** live. **Settles toward A when:** the count stays at zero through the 2027 sourcing cycle (N03, N05, N02). **Settles toward B when:** a rule names niobium-titanium magnet wire or 4 kelvin cryocoolers, or an entity listing names the wire mill or the cold-head plant (N03, N05, N17). **False signal:** an edit to the existing superconducting materials entry that does not reach magnet-grade wire; and the feed does not see MOFCOM, so a Chinese listing needs a separate read. **Last read:** zero documents on 11 October 2026. **Leans toward:** a.

**Id:** TS4. **Uncertainty:** U2, settling the six-to-five split on whether cold heads break at end B. **Name:** second 4 kelvin cold-head source. **What is measured:** whether any maker other than the sole Japanese group lists a 4 kelvin Gifford-McMahon cold head. **Source name:** product page of the United States cryocooler maker on the map. **Source link:** https://bluefors.com/products/cryomech-products/ (fetched 11 October 2026). **Cadence:** quarterly. **Mode:** manual. **Settles toward A when:** no second 4 kelvin Gifford-McMahon source exists, so at end B the cold head is a single point with no spare design (N05, N06). **Settles toward B when:** a second maker lists a 4 kelvin cold head, or a sealed magnet is cleared on a pulse-tube cooler (N05, N22). **False signal:** a 4 kelvin pulse-tube cryostat on the same page, which is not a drop-in cold head. **Last read:** the page lists Gifford-McMahon coolers only for 20 to 80 kelvin and 4 kelvin only as pulse-tube cryostats, 11 October 2026. **Leans toward:** a. AI-suggested, Sourcing confirms.

TS1 and TS3 are live in the command centre today as JSON feeds it can poll and count. TS2 and TS4 need a person each quarter, to read each new summary's cryostat section and the two makers' catalogues.

## Critical factors

TS1 moves U2 fastest, because it removes the helium delivery from the half of the line the sealed design has not reached (N01, N19, N21). TS4 decides whether end B is a relief or a transfer of the break to N05 (Panel judgement).

## Predetermined versus uncertain

Predetermined: the 1.5 tesla sealed design is cleared and sold by three makers. Uncertain: a 3 tesla clearance before 2028 (outcomes); a second cold-head source (actions); a sealed majority of clearances (outcomes); the sealed test draw as cylinder or delivery (causation, Placeholder).

## Contradictions with other lenses

TS4 contradicts the five lenses that treat cold heads as a cost at end B. Engineering confirming the sealed design accepts a pulse-tube cooler would settle it.

## Blind spots of this lens

TS2 counts clearances, not shipments, and no installed-base figure for any sealed design was found, so this lens may lean toward B before the market does.

## Sources

openFDA 510(k) endpoint, product code LNH, fetched 11 October 2026 (TS1). Federal Register API, Bureau of Industry and Security, fetched 11 October 2026 (TS3). United States cryocooler maker product page, fetched 11 October 2026 (TS4). FDA summary K253779, 5 February 2026, carried from phase 2. A USGS 2026 helium fetch returned unreadable binary and is not used.
