# Labor, phase 5, round 1

## Analysis

Bottom line first. Labour resolves U1 through one lane, the export port (N26), and reads U2 through the trades the plant will need rather than through helium itself. Three indicators already exist as published data; none needs building. A fourth, parent-company disclosures on the wire mill and cold-head maker (N03, N05), belongs to this lens but the Japanese disclosure feed returned a 403 on 11 October 2026, so no address is given and it stays a watch item for Sourcing.

**Id:** LAB-1. **Uncertainty:** U1. **Name:** Major work stoppages at ports and carriers. **What is measured:** stoppages of 1,000 or more workers lasting at least one shift, with establishment, union, location, workers and days idle. **Source name:** Bureau of Labor Statistics (BLS), Work Stoppages program. **Source link:** https://www.bls.gov/wsp/ (confirmed 11 October 2026). **Cadence:** monthly listing, annual release each February. **Mode:** live; the detailed monthly listing is an XLSX file a machine can read. **Settles toward A when:** no stoppage at the south-east export port (N26), the oversize carriers (N25) or the gas carriers (N23) runs past 30 days through 2031. **Settles toward B when:** a listed stoppage at any of those nodes passes 30 days idle. **False signal:** a short strike with large headcount, such as the three-day port strike of October 2024, which fills the workers column but never reaches the tolerance line. **Last read:** September 2026, preliminary, five major stoppages in effect and 169.4 thousand days of idleness, none at a port ([BLS, read 11 October 2026](https://www.bls.gov/wsp/)). **Leans toward:** a.

**Id:** LAB-2. **Uncertainty:** U1. **Name:** Export port labour contract calendar. **What is measured:** the status of the master contract between the International Longshoremen's Association (ILA) and the employers' alliance that covers the south-east export port (N26): in force, extended, in negotiation, expired. **Source name:** ILA union site. **Source link:** https://ilaunion.org/?p=8780 (confirmed 11 October 2026). **Cadence:** event-driven; a person checks each quarter and monthly from mid-2030. **Mode:** manual. **Settles toward A when:** the contract is extended or replaced before 30 September 2030 with no stoppage. **Settles toward B when:** 30 September 2030 passes with no agreement and the port stops; a stop past 30 days breaches the line. **False signal:** strike authorisation votes and public ultimatums, which this union issues as bargaining theatre and which preceded a strike of only three days in 2024. **Last read:** contract approved by the wage scale committee on 7 February 2025, retroactive to 1 October 2024, in effect to 30 September 2030 ([ILA, 7 February 2025](https://ilaunion.org/?p=8780)). **Leans toward:** a, for the whole horizon except its last fifteen months.

**Id:** LAB-3. **Uncertainty:** U2. **Name:** Sealed share of new MR clearances. **What is measured:** 510(k) clearances in product code LNH (magnetic resonance diagnostic device) by decision date, with each summary read for whether the magnet is helium-sealed. **Source name:** openFDA device 510(k) endpoint. **Source link:** https://api.fda.gov/device/510k.json?search=product_code:LNH&count=decision_date (confirmed 11 October 2026). **Cadence:** the dataset updates about weekly; last_updated read 28 September 2026. **Mode:** live for the count; manual for the sealed tag, because the feed does not classify magnet type and a person must read each summary. **Settles toward A when:** conventional magnets still take most new clearances through 2029 and no 3 tesla sealed clearance appears; the plant (N16) keeps needing helium handling and liquefaction trades (N20). **Settles toward B when:** sealed designs take the majority of new clearances and a 3 tesla sealed clearance lands; the scarce trade shifts to cold-head service (N05, N33). **False signal:** a burst of clearances for software or coil changes on existing conventional platforms, which raises the count without changing the magnet mix. **Last read:** the latest LNH decision date in the feed is 16 September 2026; the sealed share of 2026 clearances is unread this round, and the carried reading is that conventional builds still dominate with one 1.5 tesla sealed clearance on 5 February 2026 (P3 note, 11 October 2026). **Leans toward:** a.

What this lens does not have is a published series on the age of magnet winders. BLS table 18b gives a median age of 43.9 for medical equipment manufacturing ([BLS, 2025](https://www.bls.gov/cps/cpsaat18b.htm)), but that series moves on no external uncertainty and the technicians (N20) stay a Placeholder for Human resources, as phase 3 recorded.

## Critical factors

LAB-2 is the only dated labour event on the map and it falls inside the horizon. LAB-1 is the only machine-readable record of whether a labour stop ever reaches 30 days. LAB-3 decides which trades the plant needs in 2031, which is the labour meaning of U2. Confidence is high that the three sources exist and update as stated, because each was fetched today; moderate on LAB-3 as an indicator, because the sealed tag depends on a person reading summaries.

## Predetermined versus uncertain

Predetermined: the contract expiry of 30 September 2030 (N26) and the ageing of the manufacturing workforce (N20). Uncertain: whether the 2030 negotiation stops the port for longer than three days (outcome); whether sealed designs take the majority of new clearances by 2029 (outcome); whether a sealed plant needs fewer or different cryogenic trades (causation, Engineering states it).

## Contradictions with other lenses

None read this round. The expected one: Logistics or Geopolitical may name the port's hurricane closure as the N26 indicator and read the labour calendar as noise. The 2030 expiry settles it one way; a stoppage record above 30 days settles it the other.

## Blind spots of this lens

I may be overrating the 2030 strike that never comes. The disclosure feed that would show a supplier parent leaving the business was unreachable, so U1 end B by owner exit has no labour indicator here. I have no series on automation at N16 and N18, which could remove the trades I am counting.

## Sources

- BLS, Work Stoppages program, read 11 October 2026: https://www.bls.gov/wsp/
- ILA, Wage Scale Committee approval and contract term, 7 February 2025: https://ilaunion.org/?p=8780
- openFDA, device 510(k) endpoint, product code LNH by decision date, last_updated 28 September 2026: https://api.fda.gov/device/510k.json?search=product_code:LNH&count=decision_date
- BLS, Employed persons by detailed industry and age, 2025: https://www.bls.gov/cps/cpsaat18b.htm

Live in the command centre today: LAB-1, by polling the BLS monthly listing, and the count half of LAB-3 from openFDA. Needing a person each quarter: LAB-2, and the sealed tag on each LAB-3 clearance summary.
