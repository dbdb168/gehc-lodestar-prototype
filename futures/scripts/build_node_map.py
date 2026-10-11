#!/usr/bin/env python3
"""Build the synthetic value stream (node map) for the MR conventional magnet line.

Every node carries provenance:
  prov  S     sourced public fact (url in src)
        est   estimate from public information (basis given)
        synth synthetic demo value, not company data
  tag   AI-suggested  read from public sources, awaiting confirmation inside the OEM
        Placeholder   a value the OEM must set (tolerance, volumes)
        Confirmed     never set here; only a named function can set it, with a date

The unit is the node (a material, a component, a site, a trade, a lane, an install step),
not the material, so the screen in screen_risks.py has 30 to 50 things to judge, not thousands.
Output: futures/scenarios/MR-CONV-2031/01-node-map.json
"""
import json, pathlib, datetime

OUT = pathlib.Path(__file__).resolve().parents[1] / "scenarios/MR-CONV-2031/01-node-map.json"

THREATS = ["natural_disasters", "geopolitical", "security", "financial",
           "infrastructure", "labor", "foreign_trade_payments", "macroeconomic"]

def node(id, name, stage, **kw):
    d = dict(id=id, name=name, stage=stage)
    d.update(kw)
    d.setdefault("tag", "AI-suggested")
    d.setdefault("confirm_by", "Sourcing")
    return d

nodes = [
# ---- materials and components (tier 2 and below)
node("N01", "Liquid helium supply", "material",
     origin=["Qatar (Ras Laffan)", "United States (Wyoming, Kansas)", "Russia (Amur)", "Algeria (Arzew)"],
     qualified_sources=3, replace_months=6,
     prov="S", src="https://www.usgs.gov/centers/national-minerals-information-center/helium-statistics-and-information",
     basis="Producer shares from public reporting; Russia restricted exports from April 2026 and China from July 2026 (see data/network.json inputs.helium).",
     threats=["geopolitical", "foreign_trade_payments", "infrastructure", "macroeconomic"],
     loss_breaches_tolerance=True, why="A conventional magnet is filled, ramped and tested with liquid helium. No helium, no shipment.",
     confirm_by="Sourcing"),
node("N02", "Niobium (feedstock for superconducting wire)", "material",
     origin=["Brazil (Araxá)", "Canada (Saint-Honoré)"], qualified_sources=2, replace_months=24,
     prov="S", src="https://www.usgs.gov/centers/national-minerals-information-center/niobium-and-tantalum-statistics-and-information",
     basis="One Brazilian producer supplies the large majority of world niobium; a Canadian mine is the main second source.",
     threats=["geopolitical", "foreign_trade_payments", "natural_disasters", "financial"],
     loss_breaches_tolerance=False, why="Wire mills hold inventory and niobium is traded; a loss would bite through the wire mill, not directly."),
node("N03", "Niobium-titanium superconducting wire (magnet grade)", "component",
     origin=["Germany", "United Kingdom", "Japan", "United States", "China"], qualified_sources=1, replace_months=18,
     prov="est", basis="A handful of mills make MR-grade NbTi wire worldwide; public filings suggest the OEM qualifies one mill for a given magnet design. Second-mill qualification is read as 14 to 20 months.",
     threats=["geopolitical", "foreign_trade_payments", "financial", "security", "labor"],
     loss_breaches_tolerance=True, why="Every conventional magnet is wound from this wire. Qualifying a new mill takes longer than the backlog covers.",
     confirm_by="Engineering"),
node("N04", "High-purity copper (gradient coils, windings, bus bars)", "material",
     origin=["Chile", "Peru", "United States (refining)"], qualified_sources=4, replace_months=3,
     prov="S", src="https://www.federalregister.gov/",
     basis="Section 232 copper tariffs on semi-finished and derivative products, 2025 to 2026 (data/network.json inputs.copper).",
     threats=["foreign_trade_payments", "macroeconomic", "natural_disasters"],
     loss_breaches_tolerance=False, why="Copper is a cost and tariff exposure, not a single point of failure; many refiners."),
node("N05", "Cryocooler cold heads (Gifford-McMahon type)", "component",
     origin=["Japan"], qualified_sources=1, replace_months=18,
     prov="est", basis="One Japanese maker holds most of the market for MR cold heads; a second maker exists but is read as not qualified for this design.",
     threats=["natural_disasters", "geopolitical", "financial", "infrastructure"],
     loss_breaches_tolerance=True, why="Without the cold head the magnet boils off helium in the field and cannot ship.",
     confirm_by="Engineering"),
node("N06", "Cryocooler helium compressors", "component",
     origin=["Japan", "United States"], qualified_sources=2, replace_months=12,
     prov="est", basis="Compressors pair with the cold head maker; a US alternative exists for some designs.",
     threats=["natural_disasters", "financial"], loss_breaches_tolerance=False, why="Second source exists and compressors are less design-specific than cold heads."),
node("N07", "Cryostat vessels and steel yoke (large welded stainless)", "component",
     origin=["United States (regional fabricators)", "Europe"], qualified_sources=2, replace_months=12,
     prov="est", basis="Large cryogenic vessels are made by regional pressure-vessel fabricators; two are assumed qualified.",
     threats=["financial", "labor", "infrastructure"], loss_breaches_tolerance=False, why="Second fabricator and twelve-month requalification keep this inside tolerance in most futures."),
node("N08", "Gradient amplifiers and power semiconductors", "component",
     origin=["Germany", "Japan", "China"], qualified_sources=2, replace_months=9,
     prov="est", basis="Power modules (IGBT, SiC) come from a few makers; the amplifier itself may be built in-house or by one contract maker.",
     threats=["foreign_trade_payments", "geopolitical", "security", "macroeconomic"],
     loss_breaches_tolerance=False, why="Nine-month replacement and two makers; a tariff shock raises cost more than it stops shipments."),
node("N09", "Radio-frequency power amplifiers", "component",
     origin=["United States", "Germany"], qualified_sources=2, replace_months=9,
     prov="est", basis="Solid-state RF amplifiers from two or three specialist makers.",
     threats=["financial", "security"], loss_breaches_tolerance=False, why="Two makers; not design-locked to the magnet."),
node("N10", "Field-programmable logic (FPGA) for control and spectrometer", "component",
     origin=["Taiwan (foundry)", "United States (design)"], qualified_sources=1, replace_months=18,
     prov="est", basis="Foundry concentration in one island; redesign to another part family is an 18-month job.",
     threats=["geopolitical", "foreign_trade_payments", "natural_disasters", "security"],
     loss_breaches_tolerance=True, why="A foundry interruption stops the control electronics for every system, not one magnet.",
     confirm_by="Engineering"),
node("N11", "Memory (DRAM, NAND) for consoles and reconstruction", "component",
     origin=["South Korea", "United States", "Taiwan"], qualified_sources=3, replace_months=3,
     prov="S", src="https://www.sec.gov/", basis="Memory named as a sector cost driver in 2026 reporting; lead times 12 to 18 months under AI-driven allocation (data/network.json inputs.memory).",
     threats=["macroeconomic", "geopolitical", "financial"], loss_breaches_tolerance=False, why="Allocation raises cost and lead time; three makers keep it from stopping shipments."),
node("N12", "Graphics processors for reconstruction and AI", "component",
     origin=["Taiwan (foundry)"], qualified_sources=1, replace_months=12,
     prov="est", basis="One foundry, one or two designers; allocation to data-centre buyers already lengthens lead times.",
     threats=["geopolitical", "macroeconomic", "foreign_trade_payments"], loss_breaches_tolerance=False, why="Older-generation parts can substitute for reconstruction at a performance cost."),
node("N13", "Patient table, covers and mechanical assemblies", "component",
     origin=["Regional contract manufacturers"], qualified_sources=3, replace_months=6,
     prov="synth", basis="Synthetic. Commodity mechanical work with several regional suppliers.",
     threats=["financial", "labor"], loss_breaches_tolerance=False, why="Many suppliers, short requalification."),
node("N14", "Radio-frequency receive coils", "component",
     origin=["United States (OEM coil plant)"], qualified_sources=1, replace_months=12,
     prov="S", src="data/network.json sites.aurora", basis="OEM coil plant in Ohio.",
     threats=["natural_disasters", "labor", "security"], loss_breaches_tolerance=False, why="Systems can ship with a reduced coil set; coils follow by air."),
node("N15", "Reconstruction and control software", "process",
     origin=["In-house"], qualified_sources=1, replace_months=0,
     prov="est", basis="Design ownership read as in-house.",
     threats=["security"], loss_breaches_tolerance=False, why="Owned IP; a cyber event is a security exposure, not a supply one."),
# ---- sites and processes
node("N16", "Magnet winding, assembly and test plant, US (with helium liquefaction)", "site",
     origin=["United States (South Carolina)"], qualified_sources=1, replace_months=36,
     prov="S", src="data/network.json sites.florence", basis="Public: superconducting MR magnets and a helium liquefaction plant at one US site.",
     threats=["natural_disasters", "labor", "security", "infrastructure"],
     loss_breaches_tolerance=True, why="One plant makes the magnets for the Western Hemisphere; a hurricane season or a strike stops the line.",
     confirm_by="Site operations"),
node("N17", "Magnet and system plant, China", "site",
     origin=["China (Tianjin)"], qualified_sources=1, replace_months=36,
     prov="S", src="data/network.json sites.tianjin", basis="Public: MR magnets and systems made in Tianjin for the Eastern Hemisphere.",
     threats=["geopolitical", "foreign_trade_payments", "natural_disasters", "security"],
     loss_breaches_tolerance=True, why="Serves Asia; export controls or a trade rupture would strand the Eastern Hemisphere supply.",
     confirm_by="Site operations"),
node("N18", "Final assembly and global hub, US", "site",
     origin=["United States (Wisconsin)"], qualified_sources=1, replace_months=36,
     prov="est", basis="Read from public reporting as the MR final assembly hub for the Americas and Europe.",
     threats=["natural_disasters", "labor", "security", "infrastructure"],
     loss_breaches_tolerance=True, why="Single final-assembly site for two regions.", confirm_by="Site operations"),
node("N19", "Helium cover at the US magnet plant", "process",
     origin=["On site"], qualified_sources=1, replace_months=12,
     prov="synth", basis="Synthetic: nine days of cover against a 30-day tolerance line. The real figure is in the site's business continuity plan.",
     threats=["infrastructure", "geopolitical", "foreign_trade_payments"],
     loss_breaches_tolerance=True, why="Cover shorter than the time to reroute a helium shipment means any interruption reaches the line.",
     confirm_by="Site operations", tag="Placeholder"),
node("N20", "Skilled magnet winding and cryogenic technicians, US plant", "labour",
     origin=["Local labour market"], qualified_sources=1, replace_months=18,
     prov="est", basis="Trades with long on-the-job training and an ageing workforce; public job postings show persistent openings.",
     threats=["labor", "macroeconomic"], loss_breaches_tolerance=True, why="A strike or a retirement cliff cuts output without any supplier failing.",
     confirm_by="Human resources"),
node("N21", "Magnet ramp and test capacity (helium-intensive)", "process",
     origin=["US and China plants"], qualified_sources=2, replace_months=24,
     prov="est", basis="Every magnet is ramped and tested before shipment; test bays are capital-heavy.",
     threats=["infrastructure", "natural_disasters"], loss_breaches_tolerance=False, why="Two plants; bottleneck only if one is down."),
node("N22", "Magnet design ownership and qualification records", "process",
     origin=["In-house"], qualified_sources=1, replace_months=0,
     prov="est", basis="Design is read as owned; the qualification history of wire and cold heads is the record that gates any second source.",
     threats=["security"], loss_breaches_tolerance=False, why="Owned, but the record is what makes every other replacement slow."),
# ---- logistics
node("N23", "Cryogenic helium transport (ISO containers, trailers)", "logistics",
     origin=["Specialist gas carriers"], qualified_sources=2, replace_months=6,
     prov="est", basis="Helium moves in a small fleet of specialised containers; capacity is tight when routes lengthen.",
     threats=["infrastructure", "geopolitical", "natural_disasters"], loss_breaches_tolerance=False, why="Delays helium rather than stopping it; bites through N19."),
node("N24", "Inbound magnet lane, US magnet plant to US final assembly (road, oversize)", "logistics",
     origin=["United States"], qualified_sources=2, replace_months=1,
     prov="S", src="data/network.json lanes.L01", basis="Road lane inside one country.",
     threats=["infrastructure", "natural_disasters"], loss_breaches_tolerance=False, why="Domestic road; many carriers."),
node("N25", "Outbound lanes, US hub to US regions (road, oversize permits)", "logistics",
     origin=["United States"], qualified_sources=3, replace_months=1,
     prov="S", src="data/network.json lanes.L02-L03", basis="Oversize road moves need state permits and escorts.",
     threats=["infrastructure", "natural_disasters", "labor"], loss_breaches_tolerance=False, why="Permit delays are days, not months."),
node("N26", "Export port for Atlantic sea lanes (US south-east)", "logistics",
     origin=["United States (Charleston)"], qualified_sources=1, replace_months=2,
     prov="S", src="data/network.json lanes.L04-L06", basis="All US-built magnets for Europe, the Gulf and South America leave through one port in the lane list.",
     threats=["natural_disasters", "infrastructure", "labor", "security"],
     loss_breaches_tolerance=True, why="One hurricane closure or a port strike holds every export magnet for weeks.", confirm_by="Logistics"),
node("N27", "Sea lane to the Gulf via Suez, Bab el-Mandeb and Hormuz", "logistics",
     origin=["Route"], qualified_sources=2, replace_months=1,
     prov="S", src="data/network.json lanes.L05", basis="Alternative is the Cape route, adding about two weeks.",
     threats=["geopolitical", "security", "infrastructure"], loss_breaches_tolerance=False, why="Rerouting adds weeks, inside a 30-day line for most orders."),
node("N28", "Sea lane to Europe via the Channel", "logistics",
     origin=["Route"], qualified_sources=2, replace_months=1,
     prov="S", src="data/network.json lanes.L04", basis="Short Atlantic route with alternative ports.",
     threats=["infrastructure", "labor"], loss_breaches_tolerance=False, why="Several ports of entry."),
node("N29", "Sea lanes from the China plant to Japan and India", "logistics",
     origin=["Route via Taiwan Strait, Malacca"], qualified_sources=1, replace_months=2,
     prov="S", src="data/network.json lanes.L07-L08", basis="Both Eastern Hemisphere lanes pass through contested straits.",
     threats=["geopolitical", "security", "natural_disasters"], loss_breaches_tolerance=True, why="A strait closure stops Eastern Hemisphere deliveries with no second plant able to cover.", confirm_by="Logistics"),
node("N30", "Air freight for electronics and coils", "logistics",
     origin=["Global carriers"], qualified_sources=4, replace_months=0,
     prov="est", basis="Electronics and coils fly; capacity is commodity.",
     threats=["infrastructure", "macroeconomic"], loss_breaches_tolerance=False, why="Many carriers."),
node("N31", "Customs clearance and payment rails for cross-border parts", "logistics",
     origin=["Brokers, banks"], qualified_sources=3, replace_months=1,
     prov="est", basis="Sanctions screening and tariff classification add days; payment rails to some producer countries are restricted.",
     threats=["foreign_trade_payments", "geopolitical", "security"], loss_breaches_tolerance=False, why="Delays and cost; rarely a stop."),
# ---- customer and install
node("N32", "Site preparation and rigging contractors", "install",
     origin=["Regional contractors"], qualified_sources=4, replace_months=2,
     prov="synth", basis="Synthetic. Crane, shielding and floor work by regional contractors.",
     threats=["labor", "macroeconomic"], loss_breaches_tolerance=False, why="Many contractors."),
node("N33", "Field service engineers for install, ramp and helium top-up", "labour",
     origin=["OEM field force"], qualified_sources=1, replace_months=12,
     prov="est", basis="Magnet install and ramp need trained OEM engineers; training takes about a year.",
     threats=["labor", "macroeconomic"], loss_breaches_tolerance=False, why="Delays installs at the margin; the magnet still ships."),
node("N34", "Helium for field service and installed-base top-up", "material",
     origin=["Same producers as N01"], qualified_sources=3, replace_months=6,
     prov="est", basis="Installed base needs top-ups; service helium competes with production helium in a shortage.",
     threats=["geopolitical", "foreign_trade_payments", "macroeconomic"], loss_breaches_tolerance=False, why="Service, not delivery; matters to the installed-base value, not the tolerance line."),
node("N35", "Hospital capital budgets and reimbursement for MR", "customer",
     origin=["Health systems, payers"], qualified_sources=0, replace_months=0,
     prov="est", basis="Demand side: capital budgets move with rates and reimbursement; not a supply node but it sets the value at stake.",
     threats=["macroeconomic", "financial"], loss_breaches_tolerance=False, why="Moves demand, not delivery."),
node("N36", "Tender criteria that read late delivery as unreliability", "customer",
     origin=["Public health systems"], qualified_sources=0, replace_months=0,
     prov="est", basis="From the discovery conversation: a national health system treating poor on-time delivery as a resiliency failure and shifting to other products.",
     threats=["macroeconomic"], loss_breaches_tolerance=False, why="Turns a late delivery into lost share; it is why the tolerance line matters."),
]

for n in nodes:
    assert set(n["threats"]) <= set(THREATS), n["id"]

out = {
  "meta": {
    "product": "mr_conv",
    "product_name": "MR conventional magnet line (1.5T and 3T, helium-cooled superconducting magnet)",
    "built": datetime.date.today().isoformat(),
    "built_by": "futures/scripts/build_node_map.py",
    "rule": "Synthetic value stream for the futures exercise. Nothing here is company data. prov S = sourced, est = estimate from public information, synth = synthetic. tag AI-suggested = read from public sources, awaiting confirmation by the named function; Placeholder = a value the OEM must set; Confirmed is only ever set by a named function with a date.",
    "threat_categories": THREATS,
    "stages": ["material", "component", "site", "process", "labour", "logistics", "install", "customer"],
    "node_count": len(nodes)
  },
  "nodes": nodes
}
OUT.write_text(json.dumps(out, indent=2, ensure_ascii=False) + "\n")
print(f"wrote {OUT} with {len(nodes)} nodes")
