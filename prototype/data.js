// Lodestar prototype data.
// EXTERNAL events, dates and sources are real public reporting (as of 24 Sep 2026).
// INTERNAL figures (inventory days, installs, revenue at risk, supplier names marked "representative")
// are ILLUSTRATIVE placeholders, not company data.

window.LODESTAR = (function () {
  const WP = {
    suez: [32.55, 30.0], bab: [43.3, 12.6], hormuz: [56.3, 26.6], arabSea: [60, 16],
    cape: [19.5, -35.2], gib: [-5.6, 35.95], malacca: [100.5, 3.0], sriLanka: [80.5, 5.5],
    panama: [-79.7, 9.1], midAtl: [-40, 34], southAtl: [-10, -20], indian: [70, -10],
    westMed: [5, 37.5], eastMed: [28, 33.2], redSea: [38.5, 21], gulfAden: [48, 12.5],
    nPac: [-170, 45], biscay: [-9, 44], jeddah: [39.1, 21.5]
  };

  const nodes = [
    // Raw materials
    { id: 'heQ', name: 'Ras Laffan helium', place: 'Qatar', lon: 51.53, lat: 25.9, type: 'raw', note: '≈⅓ of world helium supply' },
    { id: 'heUS', name: 'US helium', place: 'Wyoming / Kansas', lon: -110.2, lat: 42.3, type: 'raw', note: 'Now the swing supplier' },
    { id: 'heRU', name: 'Amur helium', place: 'Russia', lon: 128.0, lat: 51.9, type: 'raw', note: 'Export authorisation since 14 Apr 2026' },
    { id: 'heDZ', name: 'Arzew helium', place: 'Algeria', lon: -0.32, lat: 35.85, type: 'raw', note: 'Secondary source' },
    { id: 'nb', name: 'Niobium', place: 'Araxá, Brazil', lon: -46.94, lat: -19.6, type: 'raw', note: 'Input to NbTi superconducting wire' },
    { id: 'cu', name: 'Copper', place: 'Antofagasta, Chile', lon: -70.4, lat: -23.65, type: 'raw', note: 'Gradient coils, windings, HV generators' },
    { id: 'w', name: 'Tungsten', place: 'Ganzhou, China', lon: 114.93, lat: 25.85, type: 'raw', note: '≈80% of world output; export-licensed' },
    { id: 'ree', name: 'Rare earths (Gd, Lu, Y)', place: 'Baotou, China', lon: 109.84, lat: 40.65, type: 'raw', note: 'Scintillators; licensed since Apr 2025' },
    { id: 'mem', name: 'Memory (DRAM/NAND)', place: 'Icheon, Korea', lon: 127.44, lat: 37.27, type: 'raw', note: 'AI-driven shortage' },
    { id: 'semi', name: 'Logic / FPGA', place: 'Hsinchu, Taiwan', lon: 120.97, lat: 24.8, type: 'raw', note: 'Recon compute, control' },
    // Tier-2
    { id: 'wire', name: 'NbTi wire supplier', place: 'Germany (representative)', lon: 8.92, lat: 50.13, type: 'tier2', note: 'Representative tier-2; actual supplier mix unknown' },
    // Plants
    { id: 'flo', name: 'Florence, SC', place: 'MR magnets', lon: -79.76, lat: 34.2, type: 'plant', note: 'Superconducting magnet build, helium fill & ramp test' },
    { id: 'wau', name: 'Waukesha / Milwaukee', place: 'MR & CT systems, tubes', lon: -88.23, lat: 43.01, type: 'plant', note: 'Systems integration; X-ray/CT tubes in West Milwaukee' },
    { id: 'bj', name: 'Beijing (Yizhuang)', place: 'CT systems & detectors', lon: 116.5, lat: 39.79, type: 'plant', note: '>60% of CT output exported; lights-out detector line (Apr 2026)' },
    { id: 'blr', name: 'Bengaluru', place: 'Value CT', lon: 77.59, lat: 12.97, type: 'plant', note: 'Value CT' },
    { id: 'zipf', name: 'Zipf, Austria', place: 'Women’s health ultrasound', lon: 13.6, lat: 48.03, type: 'plant', note: 'Women’s health ultrasound' },
    // Hubs
    { id: 'rtm', name: 'Rotterdam', place: 'Port', lon: 4.14, lat: 51.95, type: 'port' },
    { id: 'chs', name: 'Charleston', place: 'Port', lon: -79.93, lat: 32.78, type: 'port' },
    { id: 'lax', name: 'Los Angeles', place: 'Port', lon: -118.26, lat: 33.74, type: 'port' },
    { id: 'sin', name: 'Singapore', place: 'Port', lon: 103.84, lat: 1.26, type: 'port' },
    { id: 'jeb', name: 'Jebel Ali', place: 'Port', lon: 55.06, lat: 25.01, type: 'port' },
    { id: 'vie', name: 'Vienna', place: 'Air hub', lon: 16.57, lat: 48.11, type: 'port' },
    // Customers — illustrative install sites
    { id: 'c_bos', name: 'Academic medical centre', place: 'Boston', lon: -71.1, lat: 42.34, type: 'customer' },
    { id: 'c_ric', name: 'Regional health system', place: 'Richmond, VA', lon: -77.43, lat: 37.54, type: 'customer' },
    { id: 'c_leeds', name: 'NHS trust', place: 'Leeds', lon: -1.55, lat: 53.8, type: 'customer' },
    { id: 'c_muc', name: 'University hospital', place: 'Munich', lon: 11.58, lat: 48.14, type: 'customer' },
    { id: 'c_riy', name: 'Tertiary hospital', place: 'Riyadh', lon: 46.68, lat: 24.71, type: 'customer' },
    { id: 'c_mum', name: 'Private hospital group', place: 'Mumbai', lon: 72.88, lat: 19.07, type: 'customer' },
    { id: 'c_sp', name: 'Imaging network', place: 'São Paulo', lon: -46.63, lat: -23.55, type: 'customer' },
    { id: 'c_syd', name: 'Women’s health clinics', place: 'Sydney', lon: 151.2, lat: -33.87, type: 'customer' },
    { id: 'c_sin', name: 'Public hospital cluster', place: 'Singapore', lon: 103.8, lat: 1.35, type: 'customer' }
  ];
  const N = Object.fromEntries(nodes.map(n => [n.id, n]));
  const pt = id => [N[id].lon, N[id].lat];

  // stage: raw | comp | fin ; mode: sea | land | air
  const routes = [
    // ---------- MR ----------
    { p: 'mr', stage: 'raw', mode: 'sea', from: 'heQ', to: 'flo', path: ['heQ', WP.hormuz, WP.arabSea, WP.gulfAden, WP.bab, WP.redSea, WP.suez, WP.eastMed, WP.westMed, WP.gib, WP.midAtl, 'chs', 'flo'], hs: ['h_rl', 'h_hz', 'h_bab'], label: 'Liquid helium (ISO containers)' },
    { p: 'mr', stage: 'raw', mode: 'land', from: 'heUS', to: 'flo', path: ['heUS', 'flo'], hs: [], label: 'US helium (bridge supply)' },
    { p: 'mr', stage: 'raw', mode: 'sea', from: 'heRU', to: 'flo', path: ['heRU', WP.nPac, 'lax', 'flo'], hs: ['h_he_exp'], label: 'Russian helium (restricted)' },
    { p: 'mr', stage: 'raw', mode: 'sea', from: 'heDZ', to: 'flo', path: ['heDZ', WP.gib, WP.midAtl, 'chs', 'flo'], hs: [], label: 'Algerian helium' },
    { p: 'mr', stage: 'raw', mode: 'sea', from: 'nb', to: 'wire', path: ['nb', WP.southAtl, 'rtm', 'wire'], hs: [], label: 'Niobium → wire' },
    { p: 'mr', stage: 'comp', mode: 'sea', from: 'wire', to: 'flo', path: ['wire', 'rtm', WP.midAtl, 'chs', 'flo'], hs: [], label: 'NbTi superconducting wire' },
    { p: 'mr', stage: 'raw', mode: 'sea', from: 'cu', to: 'wau', path: ['cu', WP.panama, 'chs', 'wau'], hs: ['h_cu'], label: 'Copper (gradient coils)' },
    { p: 'mr', stage: 'comp', mode: 'sea', from: 'mem', to: 'wau', path: ['mem', WP.nPac, 'lax', 'wau'], hs: ['h_mem'], label: 'Memory / compute' },
    { p: 'mr', stage: 'comp', mode: 'land', from: 'flo', to: 'wau', path: ['flo', 'wau'], hs: [], label: 'Filled magnets' },
    { p: 'mr', stage: 'fin', mode: 'land', from: 'wau', to: 'c_bos', path: ['wau', 'c_bos'], hs: ['h_rl'], label: 'MR install' },
    { p: 'mr', stage: 'fin', mode: 'land', from: 'wau', to: 'c_ric', path: ['wau', 'c_ric'], hs: ['h_rl'], label: 'MR install' },
    { p: 'mr', stage: 'fin', mode: 'sea', from: 'wau', to: 'c_leeds', path: ['wau', 'chs', WP.midAtl, 'rtm', 'c_leeds'], hs: ['h_rl'], label: 'MR install' },
    { p: 'mr', stage: 'fin', mode: 'sea', from: 'wau', to: 'c_riy', path: ['wau', 'chs', WP.midAtl, WP.gib, WP.westMed, WP.eastMed, WP.suez, WP.redSea, WP.jeddah, 'c_riy'], hs: ['h_rl', 'h_bab'], label: 'MR install' },
    { p: 'mr', stage: 'fin', mode: 'sea', from: 'wau', to: 'c_sp', path: ['wau', 'chs', 'c_sp'], hs: ['h_rl'], label: 'MR install' },

    // ---------- CT ----------
    { p: 'ct', stage: 'raw', mode: 'sea', from: 'w', to: 'wau', path: ['w', WP.nPac, 'lax', 'wau'], hs: ['h_w'], label: 'Tungsten (tube anodes)' },
    { p: 'ct', stage: 'raw', mode: 'land', from: 'ree', to: 'bj', path: ['ree', 'bj'], hs: ['h_ree'], label: 'Gadolinium (GOS scintillator)' },
    { p: 'ct', stage: 'comp', mode: 'sea', from: 'mem', to: 'bj', path: ['mem', 'bj'], hs: ['h_mem'], label: 'Memory' },
    { p: 'ct', stage: 'comp', mode: 'sea', from: 'semi', to: 'bj', path: ['semi', 'bj'], hs: ['h_tw'], label: 'Logic / FPGA' },
    { p: 'ct', stage: 'comp', mode: 'sea', from: 'bj', to: 'wau', path: ['bj', WP.nPac, 'lax', 'wau'], hs: ['h_tariff'], label: 'CT detector modules' },
    { p: 'ct', stage: 'fin', mode: 'land', from: 'wau', to: 'c_bos', path: ['wau', 'c_bos'], hs: [], label: 'CT install' },
    { p: 'ct', stage: 'fin', mode: 'land', from: 'wau', to: 'c_ric', path: ['wau', 'c_ric'], hs: [], label: 'CT install' },
    { p: 'ct', stage: 'fin', mode: 'sea', from: 'bj', to: 'c_leeds', path: ['bj', 'sin', WP.malacca, WP.sriLanka, WP.gulfAden, WP.bab, WP.redSea, WP.suez, WP.eastMed, WP.westMed, WP.gib, WP.biscay, 'rtm', 'c_leeds'], hs: ['h_bab'], label: 'CT export to Europe' },
    { p: 'ct', stage: 'fin', mode: 'sea', from: 'bj', to: 'c_muc', path: ['bj', 'sin', WP.malacca, WP.sriLanka, WP.indian, WP.cape, WP.southAtl, WP.biscay, 'rtm', 'c_muc'], hs: ['h_bab'], label: 'CT export to Europe (Cape diversion)' },
    { p: 'ct', stage: 'fin', mode: 'sea', from: 'bj', to: 'c_riy', path: ['bj', 'sin', WP.malacca, WP.sriLanka, WP.arabSea, WP.hormuz, 'jeb', 'c_riy'], hs: ['h_hz'], label: 'CT export to Gulf' },
    { p: 'ct', stage: 'fin', mode: 'sea', from: 'bj', to: 'c_syd', path: ['bj', 'sin', 'c_syd'], hs: [], label: 'CT export to ANZ' },
    { p: 'ct', stage: 'fin', mode: 'land', from: 'blr', to: 'c_mum', path: ['blr', 'c_mum'], hs: [], label: 'Value CT install' },
    { p: 'ct', stage: 'fin', mode: 'sea', from: 'bj', to: 'c_sin', path: ['bj', 'c_sin'], hs: [], label: 'CT install' },

    // ---------- Ultrasound ----------
    { p: 'us', stage: 'comp', mode: 'air', from: 'mem', to: 'zipf', path: ['mem', 'zipf'], hs: ['h_mem'], label: 'Memory (air)' },
    { p: 'us', stage: 'comp', mode: 'air', from: 'semi', to: 'zipf', path: ['semi', 'zipf'], hs: [], label: 'Logic (air)' },
    { p: 'us', stage: 'fin', mode: 'land', from: 'zipf', to: 'vie', path: ['zipf', 'vie'], hs: [], label: 'To air hub' },
    { p: 'us', stage: 'fin', mode: 'air', from: 'vie', to: 'c_leeds', path: ['vie', 'c_leeds'], hs: [], label: 'Ultrasound (air)' },
    { p: 'us', stage: 'fin', mode: 'air', from: 'vie', to: 'c_bos', path: ['vie', 'c_bos'], hs: ['h_tariff'], label: 'Ultrasound (air)' },
    { p: 'us', stage: 'fin', mode: 'air', from: 'vie', to: 'c_mum', path: ['vie', 'c_mum'], hs: [], label: 'Ultrasound (air)' },
    { p: 'us', stage: 'fin', mode: 'air', from: 'vie', to: 'c_syd', path: ['vie', 'c_syd'], hs: [], label: 'Ultrasound (air)' },
    { p: 'us', stage: 'fin', mode: 'air', from: 'vie', to: 'c_sp', path: ['vie', 'c_sp'], hs: [], label: 'Ultrasound (air)' }
  ].map(r => ({ ...r, coords: r.path.map(x => (typeof x === 'string' ? pt(x) : x)) }));

  const products = {
    all: {
      name: 'All lines in view', short: 'All', level: null,
      rar: 262, installs: 49, decisions: 3,
      brief: [
        'Helium is this quarter’s story. Ras Laffan is still offline, QatarEnergy has pushed force majeure into November, and with Russia and China now restricting exports, US supply is the swing source. That is where most of the exposure sits: MR installs.',
        'CT is exposed but manageable. The two things to watch are tungsten for tubes and today’s Trump–Xi talks on the rare-earth truce. Ultrasound is clear: it flies, and memory cover runs into 2027.'
      ]
    },
    mr: {
      name: 'MR · 1.5T / 3T conventional magnets', short: 'MR', level: 'high',
      rar: 214, installs: 38, decisions: 2, scheduled: 112,
      brief: [
        'Magnet fill at Florence is running on constrained helium. Ras Laffan is down, the strait is closed, and the two fallback exporters (Russia and China) have restricted exports. Time to survive on current dewar stock is shorter than any credible recovery window.',
        'Two levers are ours to pull this week: gate fills to sites that are actually ready, and steer new quotes to the sealed low-helium MR where it fits clinically.'
      ],
      inputs: [
        { name: 'Liquid helium (factory fill)', tts: 41, ttr: 120, ttrPlus: true, hs: 'h_rl' },
        { name: 'NbTi superconducting wire', tts: 150, ttr: 60, hs: null },
        { name: 'Copper (gradient coils)', tts: 90, ttr: 30, note: 'cost, not supply', hs: 'h_cu' },
        { name: 'Recon compute memory', tts: 95, ttr: 180, hs: 'h_mem' }
      ],
      journey: [
        { k: 'Raw material', s: 'high', t: 'Helium: ⅓ of world supply offline' },
        { k: 'Tier-2', s: 'low', t: 'NbTi wire flowing' },
        { k: 'Florence magnets', s: 'high', t: 'Fill at ~55% of plan' },
        { k: 'Waukesha systems', s: 'med', t: 'Memory cost pressure' },
        { k: 'Logistics', s: 'med', t: 'Gulf deliveries rerouted' },
        { k: 'Installs', s: 'high', t: '38 of 112 at risk (90 days)' }
      ]
    },
    ct: {
      name: 'CT · premium and value', short: 'CT', level: 'med',
      rar: 41, installs: 11, decisions: 1, scheduled: 164,
      brief: [
        'CT runs on two Chinese chokepoints: tungsten for tube anodes (export-licensed, prices up several hundred percent) and gadolinium for detector scintillators. Beijing-built detectors also carry Section 301 duty into the US.',
        'The rare-earth truce is on the table at today’s White House meeting. Pre-position now; don’t over-buy until the outcome is known.'
      ],
      inputs: [
        { name: 'Tungsten (tube anodes)', tts: 75, ttr: 150, hs: 'h_w' },
        { name: 'Gadolinium scintillator', tts: 60, ttr: 45, note: 'hinges on truce', hs: 'h_ree' },
        { name: 'Detector modules (Beijing)', tts: 50, ttr: 25, hs: 'h_bab' },
        { name: 'Recon compute memory', tts: 95, ttr: 180, hs: 'h_mem' }
      ],
      journey: [
        { k: 'Raw material', s: 'med', t: 'Tungsten, rare earths licensed' },
        { k: 'Beijing detectors', s: 'low', t: 'Producing to plan' },
        { k: 'Tubes (Milwaukee)', s: 'med', t: 'Anode stock ~75 days' },
        { k: 'Logistics', s: 'high', t: 'Suez out; Cape adds 10–14 days' },
        { k: 'Tariff', s: 'med', t: '301 duty; 232 decision pending' },
        { k: 'Installs', s: 'med', t: '11 of 164 at risk (90 days)' }
      ]
    },
    us: {
      name: 'Women’s health ultrasound', short: 'Ultrasound', level: 'low',
      rar: 7, installs: 0, decisions: 0, scheduled: 0,
      brief: [
        'Nothing to act on. Ultrasound is built in Austria and flies to customers, so it doesn’t touch Hormuz, the Red Sea or Panama. Its one live exposure is memory, and last-time-buy cover runs to Q2 2027.',
        'The intelligence here is permission to stop worrying. We check it again on 15 October.'
      ],
      inputs: [
        { name: 'Memory modules', tts: 250, ttr: 180, hs: 'h_mem' },
        { name: 'Transducer ceramics', tts: 120, ttr: 40, hs: null },
        { name: 'Air freight capacity', tts: 30, ttr: 5, hs: null }
      ],
      journey: [
        { k: 'Components', s: 'low', t: 'Memory covered to Q2 2027' },
        { k: 'Zipf plant', s: 'low', t: 'On plan' },
        { k: 'Air freight', s: 'low', t: 'Avoids sea chokepoints' },
        { k: 'Tariff', s: 'low', t: 'EU rate 0–10% into US' },
        { k: 'Deliveries', s: 'low', t: 'On time' }
      ]
    }
  };

  const hotspots = [
    {
      id: 'h_rl', lab: [12,14,'start'], title: 'Ras Laffan helium outage', place: 'Ras Laffan, Qatar', lon: 51.53, lat: 25.9,
      cat: 'Geopolitical · materials', sev: { mr: 'high' }, date: 'Since 2 Mar 2026', status: 'Escalating',
      headline: 'A third of the world’s helium has been offline for six months, and QatarEnergy now says November at the earliest.',
      story: 'QatarEnergy halted production on 2 March after the US/Israel–Iran war began, and declared force majeure two days later. Iranian strikes on 18–19 March damaged LNG trains and Pearl GTL. The 12 undamaged trains need about two months to restart once the Strait of Hormuz is secure; the two damaged trains need three to five years. On 31 August force majeure was extended into November. Distributors have rationed customers, with some Airgas accounts reported at 50% of normal volume plus a surcharge.',
      video: { id: 'bjc6MgUY0BE', title: 'Now There’s a Helium Shortage and It Affects More Than Balloons', ch: 'Bloomberg · Odd Lots' },
      evidence: [
        { k: 'ext', t: 'QatarEnergy extends LNG cancellations into November as Hormuz disruption drags on', src: 'Euronews · 31 Aug 2026', url: 'https://www.euronews.com/business/2026/08/31/qatarenergy-extends-lng-cancellations-into-november-as-hormuz-disruption-drags-on', c: 0.95 },
        { k: 'ext', t: 'Iran war disrupts one-third of global helium supply', src: 'Exiger', url: 'https://www.exiger.com/perspectives/iran-war-disrupts-one-third-of-global-helium-supply/', c: 0.9 },
        { k: 'ext', t: 'Helium hitch: why the war on Iran could cause MRI scan delays', src: 'Al Jazeera · 26 Mar 2026', url: 'https://aljazeera.com/economy/2026/3/26/helium-hitch-why-us-israel-war-on-iran-could-cause-mri-scan-delays', c: 0.85 },
        { k: 'int', t: 'Florence dewar and contract helium position: 41 days of fill at current build rate', src: 'ERP inventory · illustrative', c: 0.8 },
        { k: 'int', t: 'Q4 install schedule: 112 conventional-magnet MR installs in the next 90 days', src: 'Install backlog · illustrative', c: 0.8 }
      ],
      cascade: [
        { t: 'Ras Laffan offline', d: 'Force majeure into November' },
        { t: '≈⅓ of world helium removed', d: 'Spot price roughly doubled' },
        { t: 'Florence magnet fill', d: 'Supply at ~55% of plan' },
        { t: 'MR 1.5T / 3T builds', d: 'Fill and ramp test is the constraint' },
        { t: '38 installs at risk', d: '14 US · 11 EMEA · 13 APAC/LatAm' },
        { t: '$214M quarter revenue', d: 'Plus service refills for the installed base' }
      ],
      tts: 41, ttr: 120, ttrPlus: true,
      scenario: {
        label: 'Strait of Hormuz reopens', base: 1,
        steps: ['Oct 2026', 'Nov 2026', 'Jan 2027', 'Apr 2027'],
        rar: [128, 214, 336, 510], installs: [22, 38, 61, 94], ttr: [60, 120, 180, 270]
      },
      decideBy: 'Fri 2 Oct',
      decideWhy: 'Q4 magnet-fill schedule locks (illustrative)',
      options: [
        { rec: true, t: 'Gate factory fills to site readiness', d: 'Fill only magnets whose hospital site is confirmed ready within 30 days. 9 of the 38 at-risk installs have construction slips anyway; their helium goes to sites that can take a scanner.', cost: 'Low', gain: '+9 installs protected', reg: 'None', owner: 'Install PMO + Florence ops', conf: 'High' },
        { rec: true, t: 'Steer new quotes to the sealed low-helium MR', d: 'Sealed 1.5T magnet using under 1% of a conventional helium fill (FDA-cleared Feb 2026). Where clinically equivalent, each conversion frees roughly a full conventional fill.', cost: 'Margin mix', gain: '+6–10 installs / qtr', reg: 'None (cleared)', owner: 'MR product line + Commercial', conf: 'Medium: depends on how fast sealed-magnet output can ramp' },
        { t: 'Bridge with US-origin helium', d: 'Term allocation from US producers outside the Hormuz corridor. Premium price; covers roughly six weeks of the gap.', cost: '+60–90% on volume', gain: '+12 installs', reg: 'None', owner: 'Procurement', conf: 'Medium' },
        { t: 'Tell affected customers now', d: 'Re-date the installs we can’t protect, with a firm new window, before they hear it from a competitor.', cost: 'Relationship', gain: 'Trust, fewer cancellations', reg: 'None', owner: 'Commercial + Service', conf: 'High' }
      ],
      drafts: ['sop', 'customer']
    },
    {
      id: 'h_hz', lab: [-12,-10,'end'], title: 'Strait of Hormuz closed', place: 'Strait of Hormuz', lon: 56.3, lat: 26.6,
      cat: 'Logistics chokepoint', sev: { mr: 'high', ct: 'med' }, date: 'Re-closed 20 Jun 2026', status: 'Unresolved',
      headline: 'The strait re-closed three days after the June US–Iran memorandum. Traffic was still halted at the end of August.',
      story: 'The closure keeps Qatari helium from restarting and has stranded roughly a third of the world’s cryogenic ISO containers in the Gulf, so even non-Qatari helium is harder to move. For CT, Gulf-bound systems out of Beijing can’t use Jebel Ali and need a route that avoids both Hormuz and a contested Red Sea.',
      video: { id: 'P82VrvbCvkQ', title: 'International shipping “chaos” as Strait of Hormuz closure sends ripple effects', ch: 'France 24' },
      evidence: [
        { k: 'ext', t: 'QatarEnergy: undamaged trains need ~2 months to restart once the strait is secure', src: 'Euronews · 31 Aug 2026', url: 'https://www.euronews.com/business/2026/08/31/qatarenergy-extends-lng-cancellations-into-november-as-hormuz-disruption-drags-on', c: 0.9 },
        { k: 'ext', t: 'About one-third of cryogenic ISO containers stranded in Qatar', src: 'Exiger', url: 'https://www.exiger.com/perspectives/iran-war-disrupts-one-third-of-global-helium-supply/', c: 0.8 },
        { k: 'int', t: '3 CT systems for Gulf customers booked via Jebel Ali in Q4', src: 'Order book · illustrative', c: 0.7 }
      ],
      cascade: [
        { t: 'Strait closed', d: 'Re-closed 20 Jun' },
        { t: 'Helium restart blocked', d: 'Plus stranded ISO containers' },
        { t: 'Gulf deliveries rerouted', d: 'Salalah / Duqm plus trucking' },
        { t: 'Riyadh-class installs', d: '+3–5 weeks' }
      ],
      tts: 30, ttr: 90, ttrPlus: true,
      decideBy: 'Tue 6 Oct', decideWhy: 'Next Gulf-bound sailing cut-off (illustrative)',
      options: [
        { rec: true, t: 'Reroute Gulf deliveries via Oman', d: 'Land at Salalah or Duqm (outside the strait) and truck to site. Avoids both Hormuz and the Red Sea.', cost: '+$18–25K per system', gain: '3 installs held on date', reg: 'None', owner: 'Logistics', conf: 'Medium' },
        { t: 'Lease ISO capacity outside the Gulf', d: 'Charter cryogenic containers from US or European pools for helium moves.', cost: 'High', gain: 'Helium logistics', reg: 'None', owner: 'Procurement', conf: 'Low–medium' }
      ],
      drafts: ['sop']
    },
    {
      id: 'h_he_exp', lab: [-12,-10,'end'], title: 'Russia and China restrict helium exports', place: 'Amur GPP, Russia', lon: 128.0, lat: 51.9,
      cat: 'Export control', sev: { mr: 'high' }, date: '14 Apr & 10 Jul 2026', status: 'In force',
      headline: 'The two obvious fallbacks to Qatar closed their doors within three months of each other.',
      story: 'Russia introduced helium export authorisation on 14 April, valid to the end of 2027. On 10 July China’s commerce ministry imposed a “temporary” helium export ban with no end date. That leaves US producers as the swing supply for everyone, including the chip fabs our electronics depend on.',
      video: { id: 'vcQw274TloA', title: 'China’s Helium Export Ban Triggers Global Tech Alarm as Hormuz Crisis Chokes Supply', ch: 'Business Today' },
      evidence: [
        { k: 'ext', t: 'Russia introduces helium export restrictions amid global shortage', src: 'Moscow Times · 14 Apr 2026', url: 'https://www.themoscowtimes.com/2026/04/14/russia-introduces-helium-export-restrictions-amid-global-shortage-a92496', c: 0.95 },
        { k: 'ext', t: 'China bans helium exports to protect domestic supply', src: 'Trivium China · 13 Jul 2026', url: 'https://triviumchina.com/2026/07/13/china-bans-helium-exports-to-protect-domestic-supply/', c: 0.9 },
        { k: 'ext', t: 'China announces temporary ban on helium exports', src: 'SCMP', url: 'https://www.scmp.com/economy/china-economy/article/3360114/china-announces-temporary-ban-helium-exports', c: 0.9 }
      ],
      cascade: [
        { t: 'Fallback exporters closed', d: 'Russia, China' },
        { t: 'US becomes swing supplier', d: 'Price and allocation power shifts' },
        { t: 'Longer recovery for MR', d: 'Adds to Ras Laffan exposure' }
      ],
      tts: 41, ttr: 180, ttrPlus: true,
      options: [
        { rec: true, t: 'Lock a multi-year US helium term contract', d: 'Trade price for security of allocation through 2027.', cost: 'Premium', gain: 'Allocation certainty', reg: 'None', owner: 'Procurement', conf: 'Medium' },
        { t: 'Fund helium recovery at ramp test', d: 'Capture and reliquefy boil-off at Florence. Capex, 4–6 months to stand up.', cost: 'Capex', gain: '15–25% less fill loss', reg: 'Process validation', owner: 'Florence ops', conf: 'Medium' }
      ],
      drafts: ['sop']
    },
    {
      id: 'h_w', lab: [12,18,'start'], title: 'China tungsten export licensing', place: 'Ganzhou, Jiangxi', lon: 114.93, lat: 25.85,
      cat: 'Export control · price', sev: { ct: 'med' }, date: 'Since Feb 2025; 15 licensed exporters for 2026–27', status: 'Tight',
      headline: 'Tube anodes run on a metal that China controls and that has gone up several hundred percent in a year.',
      story: 'China placed export controls on tungsten, tellurium, bismuth, molybdenum and indium in February 2025, cut mining quotas, and limited 2026–27 tungsten exports to 15 approved firms. Rotterdam APT passed $3,000 per tonne unit in April 2026. New non-China supply (Almonty’s Sangdong mine in Korea) started in March 2026 and reaches Phase 2 in 2027.',
      video: { id: 'r1LLYg8MI24', title: 'China’s Tungsten Monopoly: The Hidden Threat', ch: 'Firstpost · FP Explains' },
      evidence: [
        { k: 'ext', t: 'Tungsten breaks records as China export curbs and military demand bite', src: 'Mining.com', url: 'https://www.mining.com/web/tungsten-breaks-records-as-china-export-curbs-military-demand-boost-investment/', c: 0.9 },
        { k: 'ext', t: 'Tungsten 2026: geopolitics sets the global tone', src: 'Fastmarkets', url: 'https://www.fastmarkets.com/insights/tungsten-2026-geopolitics-sets-global-tone/', c: 0.9 },
        { k: 'ext', t: 'China restrictions lead to tungsten supply crunch', src: 'Industrial Info', url: 'https://www.industrialinfo.com/news/article/china-restrictions-lead-to-tungsten-supply-crunch--358432', c: 0.85 },
        { k: 'int', t: 'Anode blank inventory at West Milwaukee: ~75 days', src: 'ERP inventory · illustrative', c: 0.7 }
      ],
      cascade: [
        { t: 'Export licensing', d: '15 approved exporters' },
        { t: 'APT price spike', d: 'Several hundred percent in 12 months' },
        { t: 'Tube anode blanks', d: '~75 days cover' },
        { t: 'CT and X-ray tubes', d: 'New build and service swaps compete' },
        { t: 'Installed-base uptime', d: 'Tubes are the costliest CT service part' }
      ],
      tts: 75, ttr: 150,
      decideBy: 'Wed 14 Oct', decideWhy: 'Q1 2027 tube build plan (illustrative)',
      options: [
        { rec: true, t: 'Forward-buy anode blanks to 6 months of cover', d: 'Buy through the licensed exporters now, before Q1 contract resets.', cost: '~$4–6M working capital', gain: 'TTS 75 → 180 days', reg: 'None (same part)', owner: 'Procurement', conf: 'High' },
        { rec: true, t: 'Start qualifying a non-China tungsten source', d: 'Same spec from new supply (e.g. Korea). A material-source change needs a documented risk assessment under QMSR; likely a letter to file if the spec is identical, not a new 510(k).', cost: 'Engineering + test', gain: 'Structural fix', reg: '6–9 months', owner: 'Tube engineering + Quality/RA', conf: 'Medium' },
        { t: 'Scale tube reclaim from service returns', d: 'Recover tungsten from end-of-life tubes pulled in service swaps.', cost: 'Low–medium', gain: 'Partial cover', reg: 'Process validation', owner: 'Service + Tubes', conf: 'Low' }
      ],
      drafts: ['rfq']
    },
    {
      id: 'h_ree', lab: [-12,-10,'end'], title: 'Rare-earth truce: decided today?', place: 'Baotou, Inner Mongolia', lon: 109.84, lat: 40.65,
      cat: 'Export control · event today', sev: { ct: 'med' }, date: 'Trump–Xi at the White House, 24 Sep 2026', status: 'Live',
      headline: 'The April 2025 licensing on gadolinium, lutetium and yttrium still bites. The wider October 2025 controls are suspended, and the suspension is on the table today.',
      story: 'China began licensing exports of seven medium and heavy rare earths in April 2025, including gadolinium (CT/X-ray scintillators, MR contrast), lutetium (PET crystals) and yttrium. A wider extraterritorial expansion in October 2025 was suspended for a year in the November truce. The suspension is reported extended through January, and analysts expect staged extensions rather than resolution.',
      video: { id: 'SR_4RqwVPbE', title: 'Why China’s rare earth export controls are a key issue in trade tensions with the US', ch: 'Al Jazeera English' },
      evidence: [
        { k: 'ext', t: 'A test of metal: China’s rare-earth leverage looms over Trump–Xi talks', src: 'The National · 24 Sep 2026', url: 'https://www.thenationalnews.com/business/energy/2026/09/24/a-test-of-metal-chinas-rare-earth-leverage-looms-over-trump-xi-talks/', c: 0.9 },
        { k: 'ext', t: 'China rare-earth export pause nears expiry amid persistent supply concentration', src: 'Mining Technology', url: 'https://www.mining-technology.com/news/china-rare-earth-export-pause-nears-expiry-amid-persistent-supply-concentration/', c: 0.85 },
        { k: 'ext', t: 'Export controls on certain medium and heavy rare-earth items', src: 'IEA policy database', url: 'https://www.iea.org/policies/26796-export-controls-on-certain-medium-and-heavy-rare-earth-items', c: 0.95 },
        { k: 'int', t: 'GOS scintillator stock at detector line: ~60 days', src: 'Supplier portal · illustrative', c: 0.6 }
      ],
      cascade: [
        { t: 'Licensing on Gd / Lu / Y', d: 'In force since Apr 2025' },
        { t: 'GOS scintillator ceramics', d: '~60 days cover' },
        { t: 'CT detector modules', d: 'Beijing line' },
        { t: 'CT output', d: 'Exposure scales with truce outcome' }
      ],
      tts: 60, ttr: 45,
      scenario: {
        label: 'Truce outcome', base: 1,
        steps: ['Extended to 2027', 'Extended to Jan', 'Lapses in Nov'],
        rar: [18, 41, 96], installs: [5, 11, 27], ttr: [20, 45, 120]
      },
      options: [
        { rec: true, t: 'Hold, and pre-authorise a buy', d: 'Don’t over-buy on today’s headlines. Pre-approve a 90-day scintillator buy that triggers automatically if the suspension isn’t extended past January.', cost: 'None until triggered', gain: 'TTS 60 → 150 days if triggered', reg: 'None', owner: 'Procurement', conf: 'High' }
      ],
      drafts: ['sop']
    },
    {
      id: 'h_bab', lab: [12,-9,'start'], title: 'Houthis take the Red Sea coast', place: 'Bab el-Mandeb', lon: 43.3, lat: 12.6,
      cat: 'Logistics chokepoint', sev: { ct: 'high', mr: 'med' }, date: '10–11 Sep 2026', status: 'Escalating',
      headline: 'The Houthis now hold the whole Yemeni Red Sea coast. Treat Suez as unavailable.',
      story: 'Carriers had tentatively returned to Suez early in 2026. After the Iran war began, the Houthis resumed attacks (22 July; a ship hit on 11–12 August with six killed; a Saudi tanker on 24 August). On 10–11 September they took Mocha and the entire Yemeni Red Sea coast and moved onto islands in the strait. Going round the Cape adds 10–14 days Asia–Europe, and the Saudi Red Sea route that bypasses Hormuz is now threatened too.',
      video: { id: 'KKt142VMUFg', title: 'Houthi Advance Puts Bab el-Mandeb Shipping at Risk', ch: 'Al Jazeera English' },
      evidence: [
        { k: 'ext', t: 'Houthis take control of Yemen’s Red Sea coast, a key shipping route', src: 'Al Jazeera · 11 Sep 2026', url: 'https://www.aljazeera.com/news/2026/9/11/houthis-take-control-of-yemens-red-sea-coast-key-shipping-route', c: 0.95 },
        { k: 'ext', t: 'Six killed in Houthi attack on Bab al-Mandeb ship', src: 'Al Jazeera · 12 Aug 2026', url: 'https://www.aljazeera.com/news/2026/8/12/six-killed-in-houthi-attack-on-bab-al-mandeb-ship-yemens-government-says', c: 0.95 },
        { k: 'ext', t: 'Houthis, Red Sea and Saudi oil: the Iran link', src: 'CNBC · 22 Jul 2026', url: 'https://www.cnbc.com/2026/07/22/houthis-red-sea-bab-el-mandeb-saudi-oil-iran.html', c: 0.9 },
        { k: 'int', t: '7 Beijing-built CT systems for EMEA on Suez-routed bookings, Oct–Nov', src: 'Freight bookings · illustrative', c: 0.7 }
      ],
      cascade: [
        { t: 'Red Sea coast held', d: 'Suez effectively closed' },
        { t: 'Cape diversion', d: '+10–14 days Asia→Europe' },
        { t: 'Beijing CT exports', d: '>60% of output ships abroad' },
        { t: '7 EMEA installs slip', d: 'Unless we move now' }
      ],
      tts: 50, ttr: 14,
      decideBy: 'Mon 28 Sep', decideWhy: 'October sailings cut-off (illustrative)',
      options: [
        { rec: true, t: 'Re-book via the Cape and pull shipping forward two weeks', d: 'Protects on-site dates for the 7 EMEA installs. Freight cost rises but no install moves.', cost: '+$9–12K per system', gain: '7 installs on date', reg: 'None', owner: 'Logistics', conf: 'High' },
        { t: 'Air-freight detector modules for install-critical sites', d: 'Ship the system by sea but fly the long-lead subassembly, so the site can start.', cost: 'High per unit', gain: 'Buys ~10 days', reg: 'None', owner: 'Logistics + Install PMO', conf: 'Medium' }
      ],
      drafts: ['customer']
    },
    {
      id: 'h_mem', lab: [12,16,'start'], title: 'AI-driven memory shortage', place: 'Icheon, Korea', lon: 127.44, lat: 37.27,
      cat: 'Components · price', sev: { mr: 'med', ct: 'med', us: 'low' }, date: 'Since Q4 2025', status: 'Worsening',
      headline: 'Memory lead times are 12–18 months or more, and no relief is expected before 2028.',
      story: 'SK Hynix sold out its 2026 capacity by October 2025; Micron said in January it could meet only about two-thirds of some customers’ needs. PwC calls the medtech version a “revalidation trap”: a replacement part can mean 12–24 months of requalification. Imaging OEMs have named memory chips as a leading 2026 cost driver.',
      video: { id: 'PEuvslSm1Ow', title: 'The Memory Shortage of 2026, Explained', ch: 'Behind Asia' },
      evidence: [
        { k: 'ext', t: 'Medtech and the semiconductor memory shortage', src: 'PwC · Jun 2026', url: 'https://www.pwc.com/us/en/industries/health-industries/library/medtech-semiconductor-memory-shortage.html', c: 0.9 },
        { k: 'ext', t: 'Global memory chip shortage worsens', src: 'Everstream', url: 'https://www.everstream.ai/risk-centers/global-memory-chip-shortage-worsens/', c: 0.8 },
        { k: 'int', t: 'Ultrasound memory last-time buy covers to Q2 2027', src: 'Procurement · illustrative', c: 0.7 }
      ],
      cascade: [
        { t: 'Memory allocation', d: 'Capacity sold out' },
        { t: 'Recon & console compute', d: 'Every modality' },
        { t: 'Cost, then supply', d: 'Revalidation trap' },
        { t: 'Margin pressure', d: 'Memory is a leading 2026 cost driver' }
      ],
      tts: 95, ttr: 180,
      options: [
        { rec: true, t: 'Extend last-time buys through 2027 on qualified parts', d: 'Stay on qualified parts rather than redesign mid-shortage.', cost: 'Working capital', gain: 'Avoids revalidation', reg: 'None', owner: 'Procurement', conf: 'High' },
        { t: 'Design-in a second qualified module per platform', d: 'Start now for the 2028 platform refresh.', cost: 'Engineering', gain: 'Structural fix', reg: '12–24 months', owner: 'Engineering + Quality/RA', conf: 'Medium' }
      ],
      drafts: []
    },
    {
      id: 'h_tariff', title: 'Section 232 decision on medical devices', place: 'Washington, DC', lon: -77.03, lat: 38.9,
      cat: 'Tariff · regulatory', sev: { ct: 'med', mr: 'low', us: 'low' }, date: 'Opened Sep 2025; decision overdue', status: 'Pending',
      headline: 'Action was expected by mid-September and hasn’t come. Meanwhile, Section 301 duties apply to China-origin detectors.',
      story: 'Commerce opened a Section 232 national-security investigation into medical equipment and devices in September 2025. Pharma got 232 tariffs on 31 July 2026; devices are still waiting. After the Supreme Court struck down the IEEPA tariffs in February, a Section 122 tariff followed and was then replaced on 24 July by Section 301 tariffs on 60 economies (China 13%, EU and Japan 0–10%, USMCA goods exempt).',
      video: { id: 'B9QLjeYyAUM', title: 'Supreme Court rules that IEEPA doesn’t authorize Trump to impose tariffs', ch: 'FOX 5 New York' },
      evidence: [
        { k: 'ext', t: 'Current and forthcoming Section 232 actions', src: 'Covington · Apr 2026', url: 'https://www.cov.com/en/news-and-insights/insights/2026/04/current-and-forthcoming-section-232-actions-by-the-trump-administration', c: 0.85 },
        { k: 'ext', t: 'And the tariff beat goes on (Section 301 on 60 economies)', src: 'Holland & Knight · Jul 2026', url: 'https://www.hklaw.com/en/insights/publications/2026/07/and-the-tariff-beat-goes-on', c: 0.85 }
      ],
      cascade: [
        { t: '232 decision pending', d: 'Rate and scope unknown' },
        { t: 'China-origin detectors', d: 'Already carry 301 duty' },
        { t: 'US landed cost', d: 'CT most exposed' }
      ],
      tts: 60, ttr: 30,
      options: [
        { rec: true, t: 'Pre-model three 232 outcomes against the US CT bill of materials', d: 'Have the pricing and sourcing response ready the day the decision drops.', cost: 'Analyst time', gain: 'Speed', reg: 'None', owner: 'Trade compliance + Finance', conf: 'High' },
        { t: 'Evaluate FTZ status for Waukesha inbound', d: 'Defer duty on imported subassemblies until they enter US commerce.', cost: 'Set-up', gain: 'Cash-flow', reg: 'CBP approval', owner: 'Trade compliance', conf: 'Medium' }
      ],
      drafts: []
    },
    {
      id: 'h_cu', title: 'Copper tariffs near record prices', place: 'Antofagasta, Chile', lon: -70.4, lat: -23.65,
      cat: 'Tariff · price', sev: { mr: 'low', ct: 'low' }, date: '50% semi-finished (Aug 2025); derivatives widened Apr 2026', status: 'In force',
      headline: 'A cost problem, not a supply problem. Gradient coils and HV generators carry it.',
      story: 'The US put a 50% tariff on semi-finished copper in 2025, and on 6 April 2026 widened Section 232 metals tariffs to copper derivatives at 25–50% of full customs value. Copper prices are near record highs.',
      video: { id: 'tC0TPZAOZWA', title: 'Copper Price Record High as Trump Touts 50% Tariffs', ch: 'Bloomberg Television' },
      evidence: [
        { k: 'ext', t: 'United States modifies steel, aluminum and copper Section 232 tariffs', src: 'White & Case', url: 'https://www.whitecase.com/insight-alert/united-states-modifies-steel-aluminum-and-copper-section-232-tariffs', c: 0.9 },
        { k: 'ext', t: 'Section 232 copper tariffs (CRS)', src: 'Congressional Research Service', url: 'https://www.congress.gov/crs-product/IN12614', c: 0.9 }
      ],
      cascade: [
        { t: 'Copper tariff + price', d: 'Derivative content taxed' },
        { t: 'Coils, windings, generators', d: 'Cost up' },
        { t: 'Margin', d: 'No install impact' }
      ],
      tts: 90, ttr: 30,
      options: [
        { rec: true, t: 'Index-link copper-heavy component contracts', d: 'Share price risk with suppliers instead of absorbing it.', cost: 'Negotiation', gain: 'Margin protection', reg: 'None', owner: 'Procurement', conf: 'Medium' }
      ],
      drafts: []
    },
    {
      id: 'h_cyber', title: 'Iran-linked attacks on US medtech', place: 'Kalamazoo, MI', lon: -85.6, lat: 42.3,
      cat: 'Cyber · peer signal', sev: { mr: 'med', ct: 'med', us: 'low' }, date: 'Stryker 11 Mar; Boston Scientific 25 Aug 2026', status: 'Active threat',
      headline: 'A peer’s ordering, shipping and manufacturing went dark overnight. We’re an obvious next target.',
      story: 'On 11 March the Iran-linked group Handala ran a wiper attack on Stryker, disrupting ordering, shipping and manufacturing worldwide; most plants were back in about two weeks, and NHS England issued supply guidance. A single report says Boston Scientific’s systems were compromised on 25 August (unconfirmed by a primary source).',
      video: { id: 'nqjSCcVizdI', title: 'Stryker hit by cyberattack linked to Iranian-affiliated hacker group', ch: 'WXYZ-TV Detroit' },
      evidence: [
        { k: 'ext', t: 'Stryker restores most manufacturing after cyberattack', src: 'Cybersecurity Dive', url: 'https://www.cybersecuritydive.com/news/stryker-restores-most-manufacturing-after-cyberattack/816024/', c: 0.95 },
        { k: 'ext', t: 'Stryker cyber attack: disruption to supply of medical equipment', src: 'NHS England', url: 'https://www.england.nhs.uk/long-read/stryker-medical-cyber-attack-disruption-supply-medical-equipment-consumables/', c: 0.95 },
        { k: 'ext', t: 'Boston Scientific cyberattack stalls cardiac device supply chain (single source)', src: 'Tech Times · 27 Aug 2026', url: 'https://www.techtimes.com/articles/325756/20260827/boston-scientific-cyberattack-stalls-cardiac-device-supply-chain-hospitals.htm', c: 0.5 }
      ],
      cascade: [
        { t: 'Peer wiped', d: 'Two weeks to restore plants' },
        { t: 'Order-to-ship systems', d: 'Ours are the same shape' },
        { t: 'Tier-1 suppliers', d: 'Weakest link' }
      ],
      tts: 14, ttr: 14,
      options: [
        { rec: true, t: 'Run a cyber posture check on the top-20 single-source suppliers', d: 'The attack surface is our suppliers as much as us.', cost: 'Low', gain: 'Visibility', reg: 'None', owner: 'Supplier quality + Cyber security', conf: 'High' }
      ],
      drafts: ['cyber']
    },
    {
      id: 'h_tw', lab: [12,16,'start'], title: 'Taiwan Strait pressure', place: 'Taiwan Strait', lon: 119.5, lat: 24.0,
      cat: 'Geopolitical · watch', sev: { ct: 'low', mr: 'low' }, date: 'Drills Dec 2025; blockade rehearsal Jul 2026', status: 'Watch',
      headline: 'No blockade, but the rehearsals are getting specific.',
      story: 'Large PLA drills around Taiwan at the end of December 2025, Taiwan planning counter-blockade drills in April, and China’s coast guard rehearsing blockade tools in July. FPGAs, GPUs and power-management parts for every modality run through here.',
      video: null,
      evidence: [
        { k: 'ext', t: 'US says Chinese military drills around Taiwan cause unnecessary tensions', src: 'Al Jazeera · 1 Jan 2026', url: 'https://www.aljazeera.com/news/2026/1/1/us-says-chinese-military-drills-around-taiwan-cause-unnecessary-tensions', c: 0.9 },
        { k: 'ext', t: 'China’s coast guard rehearses blockade tools as Taiwan plans counter-drills', src: 'Tech Times · 20 Jul 2026', url: 'https://www.techtimes.com/articles/321075/20260720/chinas-coast-guard-rehearses-blockade-tools-as-taiwan-plans-counter-drills.htm', c: 0.7 }
      ],
      cascade: [{ t: 'Watch only', d: 'No action recommended' }],
      tts: 120, ttr: 365,
      options: [],
      drafts: []
    },
    {
      id: 'h_kum', title: 'Kumamoto earthquake (resolved)', place: 'Kumamoto, Japan', lon: 130.7, lat: 32.8,
      cat: 'Natural hazard', sev: { ct: 'done', mr: 'done', us: 'done' }, date: '30 Jul 2026', status: 'Resolved',
      headline: 'An M7.1 quake stopped Kyushu fabs for a week. They’ve resumed, and we saw no impact.',
      story: 'The quake halted TSMC’s JASM fab, Renesas, Sony, Tokyo Electron and others. Most resumed within about a week. We keep it on the map to show that the system closes loops as well as opening them.',
      video: { id: 'bEQ03Ot-BGU', title: 'Kumamoto Earthquake: TSMC Plant Resumes Work', ch: 'TaiwanPlus News' },
      evidence: [
        { k: 'ext', t: 'Japan Kumamoto earthquake hits semiconductor supply chain', src: 'UPI · 30 Jul 2026', url: 'https://www.upi.com/Top_News/World-News/2026/07/30/japan-kumamoto-earthquake-semiconductors-supply-chain/7601785452429/', c: 0.9 },
        { k: 'int', t: 'No open POs delayed at affected suppliers', src: 'Supplier portal · illustrative', c: 0.7 }
      ],
      cascade: [{ t: 'Closed', d: 'No impact detected' }],
      tts: null, ttr: null,
      options: [],
      drafts: []
    }
  ];

  const horizon = [
    { d: '2026-09-24', t: 'Trump–Xi meet: rare-earth truce', hs: 'h_ree', k: 'ext' },
    { d: '2026-09-28', t: 'October sailings cut-off', hs: 'h_bab', k: 'int' },
    { d: '2026-10-02', t: 'Q4 magnet-fill schedule locks', hs: 'h_rl', k: 'int' },
    { d: '2026-10-14', t: 'Q1 tube build plan', hs: 'h_w', k: 'int' },
    { d: '2026-10-15', t: 'Ultrasound memory review', hs: 'h_mem', k: 'int' },
    { d: '2026-11-10', t: 'Original truce expiry (reported extended to Jan)', hs: 'h_ree', k: 'ext' },
    { d: '2026-11-30', t: 'QatarEnergy force majeure runs to', hs: 'h_rl', k: 'ext' }
  ];

  const drafts = {
    sop: {
      title: 'S&OP escalation: MR helium constraint',
      to: 'To: S&OP council · From: Supply chain',
      body: `Summary
Helium available for magnet fill at Florence is running at ~55% of plan. Time to survive on current stock is 41 days; credible recovery is 120+ days. 38 of 112 MR installs in the next 90 days are at risk ($214M quarter revenue).

What changed
• QatarEnergy extended force majeure into November (31 Aug).
• Russia (Apr) and China (Jul) restricted helium exports; US supply is now the swing source.

Decisions requested by Fri 2 Oct
1. Approve gating factory fills to sites confirmed ready ≤30 days (protects ~9 installs).
2. Approve commercial guidance to lead with sealed low-helium MR where clinically equivalent.
3. Approve a bridging US helium term buy at premium (~6 weeks of gap).

Owner: [name] · Next review: Fri 9 Oct`
    },
    customer: {
      title: 'Customer notice: revised install window',
      to: 'To: [Customer project lead] · From: [Project manager]',
      body: `Dear [Name],

I want to give you an early and straight update on your [system] installation.

The global helium shortage (the Qatar outage and export restrictions this year) is limiting how many superconducting magnets we can fill and test each week. To protect your project, we're confirming a revised on-site window of [new window], rather than the original [date].

What this means for you
• Your site readiness work can continue on its current plan.
• We'll hold your production slot. You won't move further back in the queue.
• If a sealed-magnet configuration suits your clinical needs, we can talk about whether it brings your date forward.

I'll call you this week to walk through it.

[Name]`
    },
    rfq: {
      title: 'Supplier RFQ: tungsten anode blanks, 6-month cover',
      to: 'To: [Licensed exporter / alternate source] · From: Procurement',
      body: `Request for quotation

Part: Tungsten anode blanks, spec [drawing no.], identical to current qualified part
Quantity: [X] units (6 months of consumption) + option for [Y]
Delivery: staged monthly from November 2026
Please confirm:
1. Export licence status for 2026–27 shipments
2. Country of origin of the tungsten concentrate / APT
3. Price basis (fixed vs APT-indexed)
4. Ability to supply material from non-China sources for a parallel qualification lot

Response requested by: [date]`
    },
    cyber: {
      title: 'Supplier cyber posture check',
      to: 'To: Top-20 single-source suppliers · From: Supplier Quality',
      body: `Following recent attacks on medical-device manufacturers, we're asking our critical suppliers to confirm the following within 10 business days:

1. Offline, immutable backups of ERP and MES, tested in the last 90 days
2. Ability to ship against open POs manually for 14 days if systems are down
3. A named incident contact available 24/7
4. Any incidents in the last 12 months that affected delivery

This is a readiness check, not an audit finding. Thank you for helping us protect patient care together.`
    }
  };

  return { nodes, routes, products, hotspots, horizon, drafts };
})();
