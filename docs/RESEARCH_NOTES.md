# Research notes (as of 24 Sep 2026)

## World Monitor (base app)
- **Licence:** AGPL-3.0-only; the SDK and CLI are MIT. A trademark policy applies: a fork must rebrand and carry a "Based on World Monitor" credit. A commercial licence is available from the maintainer.
- **Forks:** about 13k, almost all mirrors, and none adds anything substantive for supply chain. **Avoid `worldmonitor-app/worldmonitor`**, which looks like an impersonation / malware-bait repo.
- **Stack:** Vite 6, vanilla TypeScript, deck.gl 9.4 on MapLibre 6.4, globe.gl. Vercel Edge (about 166 functions), Upstash Redis, a Railway relay for the AIS websocket and seeders, Convex and Clerk.
- **Build:** `npm install` 75s, `tsc` 35s, `build:full` about 2m53s. `dist` is 72 MB.
- **With zero keys, locally:**
  - Populated: news digest, chokepoint status, NGA navigational warnings, critical minerals, RSS.
  - Empty until seeded: quakes, cyber, commodities, shipping rates, vessels.
- **LLM chain:** ollama → openrouter → groq → generic (any OpenAI-compatible endpoint via `LLM_API_URL`).

## Live feeds (each tested with curl on 24 Sep 2026)
- **PortWatch chokepoints (no key, CORS open):**
  - Hormuz transits: 20 Sep = 1, 19 Sep = 6, 18 Sep = 7.
  - 20 Sep: Suez 42, Bab el-Mandeb 26, Panama 27.
  - It covers 28 chokepoints.
- **No key, CORS open:** GDELT DOC, GDACS, USGS, Federal Register, openFDA (510k / recall / shortage), NASA EONET, Frankfurter.
- **Proxy needed:**
  - Yahoo chart: HG=F, MU, SOXX, MP, ZIM, BZ=F
  - CISA KEV
  - ransomware.live
  - NOAA NHC
  - USITC HTS
- **Free key:**
  - FRED: PCOPPUSDM, PCU325120325120 (industrial gases), PCU33443344 (semiconductors)
  - EIA
  - NASA FIRMS
  - aisstream (server-side only)
- **No free live source:** tungsten APT, rare-earth oxides, helium, DRAM spot, WCI/FBX freight. Use proxies, label them clearly, and position the paid feeds as the upgrade path.
- **Needs a commercial licence:** ACLED and OpenSanctions.

## OEM grounding (public facts; no company named)
- **Footprint:** about 44 facilities in 17 countries.
- **MR magnets:** built in Florence SC (which has on-site helium liquefaction) and Tianjin.
- **MR coils:** Aurora OH.
- **X-ray and CT tubes:** made in West Milwaukee; anodes in Ohio.
- **CT detectors:** West Milwaukee, Hino and Beijing. Beijing's lights-out detector line opened Apr 2026, and Beijing exports over 60% of its CT output.
- **CT final assembly:** Beijing, Buc, Bengaluru and Waukesha.
- **BGO PET/CT:** assembly moved to Waukesha in 2025. It uses **BGO**, not LYSO.
- **CZT SPECT/CT:** Haifa / Tirat Carmel, with CZT modules from Yavne.
- **Ultrasound:** women's health in Zipf and Seongnam; cardiac in Horten; probes in State College PA.
- **Mammography:** Buc.
- **Photon-counting sensors:** Stockholm.
- **Helium:**
  - A conventional magnet takes about 1,500 L; a sealed magnet takes under 1% of that.
  - Qatar supplied about 1/3 of the world's helium, and the US about 40%.
  - Russia (14 Apr 2026) and China (10 Jul 2026) have restricted helium exports.
- **Lead times:** an MR suite takes 9–15 months from order to install. CT tube replacement costs $42–210K.
- **Service parts:** flow through a Singapore DHL hub, and arrive at LA/LB, NY/NJ and Tacoma.
- **China export controls:**
  - Still in force: tungsten, tellurium, bismuth, molybdenum and indium; also Gd, Lu, Y, Sm, Tb, Dy and Sc.
  - Suspended until about 10–27 Nov 2026: the Oct 2025 rare-earth expansion and the Ga/Ge ban.
- **Sector cost drivers named in 2026:** memory chips, oil, freight. Tariff regime churn: IEEPA refunds, Section 301 (24 Jul 2026), and a Section 232 decision on medical devices that is still pending.
