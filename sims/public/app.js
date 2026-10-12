/* Lodestar futures lab: MR line stress test.
   Loads the run data at runtime from data/, then runs a five-step guided exploration.
   The rules engine (timing, stop lengths, action effects) is an estimate written for this prototype. */
(async function main(){
const load = u => fetch(u, {cache:'no-store'}).then(r => { if (!r.ok) throw new Error(u + ' ' + r.status); return r.json(); });
const [D, QUOTES, MEDIA] = await Promise.all([load('data/output.json'), load('data/quotes.json'), load('data/media.json')]);
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const QL = []; for (let i = 0; i <= 20; i++){ const t = 3 + i; QL.push({y: 2026 + Math.floor(t/4), q: (t%4)+1}); }
const ORD = ['','first','second','third','fourth'];
const qWords = i => { const x = QL[Math.min(i,20)]; return `the ${ORD[x.q]} quarter of ${x.y}`; };
const MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const fmtDate = s => { const [y,m,d] = s.split('-').map(Number); return `${d} ${MON[m-1]} ${y}`; };
const money = m => `$${m >= 1 ? (Math.round(m*10)/10) : m} million`;
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const byId = (a,k='id') => Object.fromEntries(a.map(x => [x[k], x]));
const FUT = byId(D.futures), ACT = byId(D.actions), IND = byId(D.indicators), RISK = byId(D.risks,'node');
const FIRST = {N16:'the United States magnet plant is the first to fail',N17:'the China plant is the first to fail',N18:'the United States hub is the first to fail',N19:'the United States magnet plant runs out of helium on hand first',N03:'superconducting wire is the first to fail',N05:'cold heads are the first to fail',N10:'programmable logic is the first to fail',N20:'the technicians are the first to fail'};
/* The source risk sentence for helium on hand predates the word list, so this screen re-says it in the fixed terms. */
const RISK_TEXT = {N19:'The United States plant holds fewer days of helium on hand than it takes to reroute a shipment, so any interruption to power, road or port stops the line.'};
const FNUM = {F1:'Future 1',F2:'Future 2',F3:'Future 3',F4:'Future 4'};

/* Plain names for sites and suppliers */
const PLACE = {N16:'United States magnet plant',N17:'China plant',N18:'United States hub',N19:'Helium on hand at the United States plant',N03:'Superconducting wire',N05:'Cold heads',N10:'Programmable logic',N20:'Winding and cryogenic technicians'};
const SHORT = {N16:'United States magnet plant',N17:'China plant',N18:'United States hub',N19:'Helium on hand',N03:'Superconducting wire',N05:'Cold heads',N10:'Programmable logic',N20:'Technicians'};

/* Panel members. Roles from futures/panel/lenses. Votes from each member's phase 4, round 3 summary. */
const MEM = {
  geo:{name:'Geopolitical',role:'a geopolitical analyst',file:'geopolitical',votes:['N17','N05','N17','N05']},
  ftp:{name:'Foreign trade and payments',role:'an analyst of how goods and money cross borders',file:'foreign_trade_payments',votes:['N19','N05','N17','N05']},
  fin:{name:'Financial',role:'a credit analyst who covers industrial suppliers',file:'financial',votes:['N17','N05','N17','N05']},
  mac:{name:'Macroeconomic',role:'a macroeconomist who covers capital goods and healthcare spending',file:'macroeconomic',votes:['N17','N05','N17','N05']},
  tec:{name:'Technology shift',role:'a technologist who follows magnet, cryogenic and semiconductor technology',file:'technology_shift',votes:['N19','N05','N17','N03']},
  inf:{name:'Infrastructure',role:'a logistics and utilities engineer',file:'infrastructure',votes:['N19','N05','N17','N05']},
  nat:{name:'Natural disasters',role:'a catastrophe analyst',file:'natural_disasters',votes:['N19','N05','N17','N05']},
  sec:{name:'Security',role:'a supply-chain security specialist',file:'security',votes:['N19','N05','N17','N05']},
  lab:{name:'Labor',role:'a labor economist',file:'labor',votes:['N19','N20','N17','N05']},
  cus:{name:'Customer and market',role:'a healthcare procurement specialist',file:'customer_market',votes:['N17','N05','N17','N05']},
  con:{name:'Contrarian',role:"the panel's professional skeptic",file:'contrarian',votes:['N17','N20','N17','N03']},
};
const QUOTE_KEY = 'Key to the panel’s working labels: F1 to F4 are Future 1 to Future 4. N03 is superconducting wire, N05 cold heads, N10 programmable logic, N16 the United States magnet plant, N17 the China plant, N19 helium on hand at the United States plant, N20 technicians and N21 ramp and test at the United States plant. A “lens” is a panel member.';
function quoteBlock(k){
  const m = MEM[k], q = QUOTES[m.file];
  return `<div class="voice"><span>The ${esc(m.name)} member is an AI model briefed to act as ${esc(m.role)}.</span>
    <span class="qlabel">Quoted word for word from the run files (${esc(q.file)})</span>
    <span>${esc(q.text)}</span><span class="muted" style="font-size:11.5px">${esc(QUOTE_KEY)}</span></div>`;
}

/* Controls, grouped by the two questions */
const CTRL = [
  {k:'truce',m:'geo',g:'U1',label:'Trade truce with China at its notice date',ind:'I03',opts:[['renewed','Renewed'],['lapses','Lapses']]},
  {k:'listing',m:'ftp',g:'U1',label:'First export-control listing that names a part',ind:'I01',opts:[['none','None'],['logic','Logic parts in 2027'],['cryo','4 kelvin cryocoolers in 2029'],['wire','Superconducting wire in 2029']]},
  {k:'parent',m:'fin',g:'U1',label:'Owner of the cold-head maker',ind:'I04',opts:[['stays','Stays in the MR business'],['allocates','Gives capacity to other buyers in 2029']]},
  {k:'helium',m:'mac',g:'U2',label:'Helium supply through the Gulf strait',ind:'I07',opts:[['allocated','On allocation'],['buyers',"Buyers' market"]]},
  {k:'sealed',m:'tec',g:'U2',label:'Sealed magnets as a share of new builds by 2029',ind:'I10',range:[0,90,5]},
  {k:'grid',m:'inf',g:'X',label:'Winter power grid at the United States plant',ind:'I12',opts:[['normal','Holds'],['curtail','Curtailed in the winter of 2028']]},
  {k:'hazard',m:'nat',g:'X',label:'Major natural hazard',ind:'I05',opts:[['none','None'],['hurricane','Hurricane in 2027'],['quake','Earthquake off Japan in 2029'],['both','Both']]},
  {k:'cyber',m:'sec',g:'X',label:'A 35-day systems outage, such as ransomware, in 2028',opts:[['none','None'],['plant','At a plant'],['carrier','At the helium carrier']]},
  {k:'labor',m:'lab',g:'X',label:'Winding and cryogenic technicians',opts:[['stable','Enough stay'],['cliff','Many retire in 2029']]},
  {k:'demand',m:'cus',g:'X',label:'Demand for scanners',opts:[['deferral','United States hospitals defer orders'],['base','Base'],['peak','European replacement peak']]},
];
const PRESETS = {
  F1:{truce:'renewed',listing:'none',parent:'stays',helium:'allocated',sealed:20,grid:'curtail',hazard:'none',cyber:'none',labor:'stable',demand:'base'},
  F2:{truce:'renewed',listing:'none',parent:'stays',helium:'buyers',sealed:70,grid:'normal',hazard:'quake',cyber:'none',labor:'stable',demand:'peak'},
  F3:{truce:'lapses',listing:'logic',parent:'stays',helium:'allocated',sealed:20,grid:'curtail',hazard:'none',cyber:'none',labor:'stable',demand:'base'},
  F4:{truce:'lapses',listing:'cryo',parent:'allocates',helium:'buyers',sealed:70,grid:'normal',hazard:'none',cyber:'none',labor:'stable',demand:'peak'},
};

/* Action rules for this mock (estimate). cost: $ million, synthetic. lead: quarters from start until it works. last: latest start index that is still in time. */
const AM = {
  A10:{cost:.3,lead:1,last:2,note:'Confirms the Placeholder numbers every duration here rests on. It changes how far the numbers can be trusted, so the mock does not move any bar for it.'},
  A9:{cost:1.5,lead:1,last:5,eff:'Cuts a 35-day systems outage at a plant to about 10 days.'},
  A1:{cost:12,lead:6,last:4,eff:'Adds a second cold-head source 18 months after the start.'},
  A12:{cost:.8,lead:1,last:5,eff:'Without it, a systems outage adds about 25 days to restore the design record.'},
  A3:{cost:9,lead:2,last:6,eff:'Removes the helium stop in a curtailment. Under allocation it works fully only with A22.'},
  A4:{cost:4,lead:2,last:6,eff:'Halves a curtailment stop at the United States plant.'},
  A5:{cost:6,lead:1,last:2,eff:'Cuts a logic listing stop at the China plant from about 120 days to about 25.'},
  A2:{cost:3,lead:1,last:4,eff:'Cuts a stop caused by the cold-head maker’s owner by 70 percent.'},
  A13:{cost:.4,lead:1,last:2,eff:'Improves A5 and gives a quarter of warning on a wire listing.'},
  A14:{cost:.2,lead:1,last:6,eff:'Shows an owner leaving in its filings, and trims that stop by 15 percent.'},
  A15:{cost:.6,lead:1,last:2,eff:'Trims hurricane and earthquake stops by 20 to 25 percent.'},
  A6:{cost:10,lead:6,last:2,eff:'Ends a logic listing stop once the other logic path is qualified.'},
  A8:{cost:18,lead:6,last:6,eff:'Halves Asian install delays when the China plant stops, but raises helium use at the United States plant.'},
  A7:{cost:2,lead:6,last:6,eff:'Keeps installed sealed magnets cold through a cold-head shortage.'},
  A16:{cost:3,lead:6,last:4,eff:'Cuts install delays from a retirement wave from about 45 days to about 10.'},
  A17:{cost:.1,lead:1,last:12,none:true},
  A18:{cost:.5,lead:1,last:12,eff:'Lowers market share at risk by one step. It does not shorten a stop.'},
  A19:{cost:.1,lead:1,last:6,eff:'Lowers market share at risk by one step. It does not shorten a stop.'},
  A20:{cost:2.5,lead:2,last:2,eff:'Takes about 10 days off a hurricane stop.'},
  A21:{cost:2,lead:2,last:6,eff:'Cuts a systems outage at the helium carrier from about 55 days to about 10.'},
  A22:{cost:1,lead:1,last:6,eff:'Lets A3 be built at allocated volumes.'},
  A23:{cost:.3,lead:1,last:12,none:true},
  A24:{cost:.5,lead:1,last:4,eff:'Stops A1 relying on the same sub-suppliers in an earthquake.'},
  A25:{cost:1.5,lead:1,last:12,none:true},
  A26:{cost:.5,lead:1,last:12,none:true},
  A11:{cost:0,lead:1,last:6,none:true,decision:true},
};
const STARTS = [[0,'Now'],[2,'Second quarter of 2027'],[4,'Fourth quarter of 2027'],[6,'Second quarter of 2028']];
const DEFAULT_START = {A1:2,A3:2,A4:2,A2:2,A8:2,A7:2,A16:2,A21:2,A22:2,A24:2,A9:2};
const BUDGET = 40;
const PLANS = {none:[], brief:['A10','A9','A1'], lean:['A3','A4','A22']};

let W = {...PRESETS.F1}, CONTRA = false, PLAN = {}, SEL = null, OPEN = null;
function setPlan(ids){ PLAN = {}; ids.forEach(id => PLAN[id] = {start: DEFAULT_START[id] ?? 0}); }

/* ---------- rules engine ---------- */
function simulate(w, plan, contra){
  const ready = id => plan[id] ? plan[id].start + AM[id].lead : 99;
  const valid = id => plan[id] && plan[id].start <= AM[id].last;
  const has = (id,q) => valid(id) && ready(id) <= q;
  const hd = w.helium === 'allocated' ? (w.sealed < 50 ? 1 : .5) : 0;
  const sealedMost = w.sealed >= 50;
  const ev = [];
  const add = e => { e.stop = Math.round(e.stop||0); e.late = Math.max(Math.round(e.late||0), e.stop); ev.push(e); };

  if (w.grid === 'curtail'){
    const used = []; let d = hd > 0 ? 40*hd : 7;
    if (hd > 0){
      if (has('A3',8)){ if (has('A22',8)){ d = 0; used.push('A3','A22'); } else { d *= .5; used.push('A3'); } }
      if (has('A4',8)){ d *= .5; used.push('A4'); }
      if (has('A8',8) && d > 0){ d += 10; used.push('A8'); }
    }
    add({id:'grid',q:8,node:'N19',stop:d,fut:'F1',ind:'I12',help:['A3','A22','A4'],used,
      title:'A winter power curtailment cuts power to the helium liquefier',
      why: hd > 0 ? 'The curtailment cuts power to the liquefier and closes the trailer road while the next helium container is still in transit. The helium on hand runs out before the delivery arrives.' : 'Helium no longer limits shipments here, so the curtailment is a short outage.'});
  }
  if (hd > 0){
    if (contra) add({id:'cnq',q:3,node:'N17',stop:35*hd,fut:'F1',ind:'I08',help:[],used:[],gap:true,
      title:'The China plant stops at the back of the helium queue',
      why:'The Contrarian member argues that the China plant fails first in Future 1. The United States plant buys helium from domestic and Canadian sources, while the China plant’s helium came through the Gulf, so allocated test helium stops it first.'});
    else add({id:'cnq',q:6,node:'N17',late:35*hd,fut:'F1',ind:'I08',help:[],used:[],gap:true,
      title:'Asian installs run late on helium allocation',
      why:'The China plant buys helium at the back of the Asian spot queue. The panel expects this to push Asian installs more than 30 days late in the first half of 2028.'});
  }
  if (w.truce === 'lapses' && w.listing === 'none') add({id:'tariff',q:1,node:'N17',late:5,fut:'F3',ind:'I03',help:[],used:[],
    title:'Tariffs return when the truce lapses', why:'The truce lapses but no part is listed. The tariffs cost money but stay inside the 30-day limit.'});
  if (w.listing === 'logic'){
    const used = []; let d = 120;
    if (has('A5',3)){ d = has('A13',3) ? 20 : 25; used.push('A5'); if (has('A13',3)) used.push('A13'); }
    const r6 = ready('A6'); if (valid('A6') && r6 >= 3 && (r6-3)*91 < d){ d = Math.max(0,(r6-3)*91); used.push('A6'); }
    let late = d; if (has('A8',4)){ late = d*.5; used.push('A8'); }
    add({id:'logic',q:3,node:'N17',stop:d,late,fut:'F3',ind:'I02',help:['A5','A13','A6','A8'],used,
      title:'An entity listing cuts off the China plant’s logic supplier',
      why:'The China plant holds weeks, not months, of programmable logic parts. A listing of its logic supplier stops the control electronics for every system it builds.'});
  }
  if (w.listing === 'cryo'){
    const used = []; let d = sealedMost ? 120 : 45;
    if (has('A5',9)){ d *= .5; used.push('A5'); } if (has('A1',9)){ d *= .5; used.push('A1'); } if (has('A13',9)){ d *= .9; used.push('A13'); }
    add({id:'cryo',q:9,node:'N05',stop:d,fut:'F4',ind:'I01',help:['A5','A1','A13'],used,
      title:'A producer country lists 4 kelvin cryocoolers as dual use',
      why:'The listing closes the export license route for cold heads into the China plant.'});
  }
  if (w.listing === 'wire'){
    const used = []; let d = 180; if (has('A13',8)){ d = 150; used.push('A13'); }
    add({id:'wire',q:9,node:'N03',stop:d,fut:'F4',ind:'I01',help:['A13'],used,gap:true,
      title:'A producer country lists superconducting wire',
      why:'Every magnet, sealed or conventional, is wound from one qualified mill’s wire, and a second mill takes 18 months to qualify. Both plants stop. The Technology shift and Contrarian members chose this as the first failure in Future 4. No action on the panel’s list qualifies a second wire mill.'});
  }
  if (w.parent === 'allocates'){
    const used = []; let d = sealedMost ? 300 : 60; const r1 = ready('A1');
    if (valid('A1') && r1 <= 9){ d *= .1; used.push('A1'); }
    else if (valid('A1') && (r1-9)*91 < d){ d = (r1-9)*91; used.push('A1'); }
    if (has('A2',9) && plan.A2.start <= 4){ d *= .3; used.push('A2'); }
    if (has('A14',8)){ d *= .85; used.push('A14'); }
    const base = sealedMost && !has('A7',9);
    add({id:'parent',q:9,node:'N05',stop:d,fut:'F4',ind:'I04',help:['A1','A2','A14','A7'],used,base,
      title:'The cold-head maker’s owner gives its capacity to other buyers',
      why:'MR is a minority of the owner’s revenue, and it fills its order book with fusion, physics and quantum work. Lead times pass 30 days within a quarter.'});
  }
  if (w.hazard === 'hurricane' || w.hazard === 'both'){
    const used = []; let d = 20 + 25*hd;
    if (has('A3',3) && hd > 0){ d -= 25*hd; used.push('A3'); }
    if (has('A20',3)){ d = Math.max(0, d-10); used.push('A20'); }
    if (has('A15',3)){ d *= .75; used.push('A15'); }
    add({id:'hurr',q:3,node:'N16',stop:d,fut:'F1',ind:'I05',help:['A3','A20','A15'],used,
      title:'A hurricane closes the plant, the export port and the helium roads together',
      why:'A storm as severe as the 2018 inland flood closes the plant, the export port and the trailer road at the same time. Plans that test one site at a time miss this.'});
  }
  if (w.hazard === 'quake' || w.hazard === 'both'){
    const used = []; let d = sealedMost ? 150 : 40;
    if (has('A1',10)){ d *= has('A24',10) ? .2 : .6; used.push('A1'); if (has('A24',10)) used.push('A24'); }
    if (has('A15',10)){ d *= .8; used.push('A15'); }
    const base = sealedMost && !has('A7',10);
    add({id:'quake',q:10,node:'N05',stop:d,fut:'F2',ind:'I11',help:['A1','A24','A15','A7'],used,base,
      title:'An earthquake in the Nankai Trough zone stops the cold-head maker',
      why:'One maker supplies cold heads for new builds and spares for installed sealed magnets, so the earthquake stops both plants at once. The compressor maker sits in the same region.'});
  }
  if (w.cyber === 'plant'){
    const used = []; let d = (has('A9',6) ? 10 : 35) + (has('A12',6) ? 0 : 25);
    if (has('A9',6)) used.push('A9'); if (has('A12',6)) used.push('A12');
    add({id:'cyber',q:6,node:'N16',stop:d,help:['A9','A12'],used,
      title:'A 35-day systems outage stops the United States plant',
      why:'This is the one failure every future shares. Cyber insurance excludes acts by states, so the stop is largely uninsured.'});
  }
  if (w.cyber === 'carrier'){
    const used = []; let d = hd > 0 ? 55 : 10;
    if (has('A21',6) && hd > 0){ d = 10; used.push('A21'); }
    if (has('A9',6)){ d *= .5; used.push('A9'); }
    add({id:'carrier',q:6,node:'N19',stop:d,help:['A21','A9'],used,
      title:'A 35-day systems outage stops the helium carrier',
      why:'The Security member points out that outages in this sector mostly start at forwarders, terminals and gas carriers. An outage at the helium carrier uses up the helium on hand at the United States plant without any storm or trade rule.'});
  }
  if (w.labor === 'cliff'){
    const used = []; let late = 45 + (sealedMost ? 15 : 0);
    if (has('A16',9)){ late = 10; used.push('A16'); }
    add({id:'labor',q:9,node:'N20',late,fut:'F2',help:['A16'],used,
      title:'Many winding and cryogenic technicians retire',
      why:'The trades at the United States plant live in one town, and a new technician takes 18 months to become competent.'+(sealedMost?' The move to sealed magnets also changes the trade they need.':'')});
  }
  ev.sort((a,b) => a.q - b.q);
  const first = ev.find(e => e.stop > 30) || null;
  const firstLate = ev.find(e => e.late > 30) || null;
  const worst = ev.reduce((m,e) => Math.max(m,e.stop), 0);
  const lateMax = ev.reduce((m,e) => Math.max(m,e.late), 0);
  const totalStop = ev.reduce((s,e) => s + e.stop, 0);
  let share = 0, why = 'Every supplier is short at the same time';
  const cn = ev.find(e => e.node === 'N17' && e.stop > 30);
  const longBoth = ev.find(e => e.stop > 90 && ['N05','N03'].includes(e.node));
  if (ev.some(e => e.base)){ share += 1; why = 'Installed sealed magnets stop working'; }
  if (longBoth){ share += (longBoth.stop > 180 ? 2 : 1) + (w.demand === 'peak' ? 1 : 0); why = w.demand === 'peak' ? 'Both plants stop for months during the European replacement peak' : 'Both plants stop for months'; }
  if (cn && w.truce === 'lapses'){ share += 4; why = 'A competitor outside the trade bloc keeps delivering'; }
  if (w.demand === 'deferral') share -= 1;
  if (has('A18',4)) share -= 1; if (has('A19',4)) share -= 1;
  share = Math.max(0, share);
  return {ev, first, firstLate, worst, lateMax, totalStop, share, why};
}
function position(w){
  const u1 = [w.truce==='lapses', w.listing!=='none', w.parent==='allocates'].filter(Boolean).length;
  const u2 = (w.helium==='buyers'?1:0) + (w.sealed>=50?1:0);
  const id = {aa:'F1',ab:'F2',ba:'F3',bb:'F4'}[(u1?'b':'a')+(u2?'b':'a')];
  const flags = [];
  if (w.truce==='renewed' && w.listing!=='none') flags.push('The panel tied every export-control listing to the truce lapsing. A listing with the truce renewed appears in no future.');
  if (w.listing==='wire') flags.push('A wire listing is the Contrarian and Technology shift members’ case for Future 4. The other nine members chose cold heads.');
  if (w.helium==='allocated' && w.sealed>=50) flags.push('No future has sealed magnets as most new builds while helium is still on allocation. The mock halves the helium effect here.');
  if (w.parent==='allocates' && w.sealed<50) flags.push('The owner leaving while most magnets are still conventional is milder than Future 4, because helium is still the fallback.');
  return {id, u1, u2, flags};
}

/* ---------- plan test: four futures by six named events ---------- */
const EVENTS = [
  ['base','No added event',w=>w],
  ['cyber','35-day systems outage at a plant',w=>({...w,cyber:'plant'})],
  ['carrier','35-day systems outage at the helium carrier',w=>({...w,cyber:'carrier'})],
  ['hurr','Hurricane in 2027',w=>({...w,hazard:w.hazard==='quake'?'both':'hurricane'})],
  ['quake','Earthquake off Japan in 2029',w=>({...w,hazard:w.hazard==='hurricane'?'both':'quake'})],
  ['labor','Many technicians retire in 2029',w=>({...w,labor:'cliff'})],
  ['wire','Wire listing in 2029',w=>({...w,listing:'wire'})],
];
function testPlan(plan){
  const cells = []; let pass = 0, stopDays = 0;
  ['F1','F2','F3','F4'].forEach(f => EVENTS.forEach(([k,,fn]) => {
    const R = simulate(fn({...PRESETS[f]}), plan, CONTRA);
    const ok = !R.first; if (ok) pass++; stopDays += R.totalStop;
    cells.push({f,k,ok,worst:R.worst});
  }));
  return {cells, pass, stopDays, total: cells.length};
}



/* ---------- plain re-statements of each member's summary (same content, word-list terms) ---------- */
const PLAIN = {
  geo:"Future 1 and Future 3: the China plant fails first. Future 2 and Future 4: cold heads fail first. Export controls are aimed at a destination, so a listing aimed at China stops only the China plant. Only the cold-head maker's owner leaving, or a ban on all buyers, stops both plants at once.",
  ftp:"Future 1: the United States plant runs out of helium on hand first. Future 2 and Future 4: cold heads. Future 3: the China plant. A listing by a producer country delays the United States plant by the time an export license takes, and stops only the China plant.",
  fin:"Future 1 and Future 3: the China plant fails first. Future 2 and Future 4: cold heads. No future looks at the finances of the cold-head maker's owner: how much of its revenue MR is, when its debt falls due, and who would buy the business. Sourcing can read these in public filings before the 2027 sourcing cycle.",
  mac:"Future 1 and Future 3: the China plant fails first. Future 2 and Future 4: cold heads. Every future treats a helium or cold-head allocation as a stop, but none says what the OEM would pay to stay in the queue. That price is a Placeholder for Sourcing.",
  tec:"Future 1: the United States plant runs out of helium on hand first. Future 2: cold heads. Future 3: the China plant. Future 4: superconducting wire. The sealed-magnet futures assume sealed magnets become most new builds a year after a 3 tesla clearance, but the 1.5 tesla sealed magnets stayed a minority for eight years. How fast sealed magnets spread decides whether Future 2 and Future 4 happen by 2031.",
  inf:"Future 1: the United States plant runs out of helium on hand first. Future 2 and Future 4: cold heads. Future 3: the China plant. Ramp-up and test capacity at the United States plant runs on allocated helium and a container cycle sized for one region, so it could not take over the Asian build in Future 3.",
  nat:"Future 1: the United States plant runs out of helium on hand first. Future 2 and Future 4: cold heads. Future 3: the China plant. Cold heads and their compressors both come from Japan, so one earthquake would stop both, plus the shipping routes from Japan. Every future prices the loss of one site only.",
  sec:"Future 1: the United States plant runs out of helium on hand first. Future 2 and Future 4: cold heads. Future 3: the China plant. No future tests an outage at the helium carrier, yet systems outages in this sector mostly start at forwarders, terminals and gas carriers. A five-week outage there would use up the helium on hand at the United States plant without any storm or trade rule.",
  lab:"Future 1: the United States plant runs out of helium on hand first. Future 2: the technicians. Future 3: the China plant. Future 4: cold heads. The export port's labor contract ends in 2030 and no future watches it. Every plan relies on an 18-month requalification that needs skilled people nobody has counted, so 18 months is a minimum.",
  cus:"Future 1 and Future 3: the China plant fails first. Future 2 and Future 4: cold heads. Late delivery loses market share only when a competitor keeps delivering. A listing on wire or cryocoolers, a closed strait or a sealed magnet type warming up affects every maker, so tender committees wait rather than switch. Only Future 3 moves market share.",
  con:"The four futures tell three stories. In Future 1 the China plant fails first because it is last in the helium queue. In Future 3 the same plant fails a year earlier through its logic parts. In Future 4 superconducting wire fails first, in 2029. The cold-head owner leaving belongs to Future 4, so the only failure that belongs in Future 2 is the technicians.",
};
const GLOSS = {F1:'Future 1',F2:'Future 2',F3:'Future 3',F4:'Future 4',N03:'superconducting wire',N05:'cold heads',N06:'cold-head compressors',N10:'programmable logic',N16:'United States magnet plant',N17:'China plant',N19:'helium on hand at the United States plant',N20:'technicians',N21:'ramp-up and test at the United States plant',N29:'shipping routes from the China plant to Japan and India'};
function exactWords(k){
  const q = QUOTES[MEM[k].file];
  const t = esc(q.text).replace(/\b([NF]\d{1,2})\b/g, (m) => GLOSS[m] ? `${m} <span class="gloss">[${GLOSS[m]}]</span>` : m);
  return `<div class="exact"><span class="small muted">Quoted word for word from the run files (${esc(q.file)}). Plain names in brackets are added.</span><span>${t}</span></div>`;
}
function memberCard(k, open){
  const m = MEM[k];
  return `<div class="member"><span class="role">The ${esc(m.name)} member is an AI model briefed to act as ${esc(m.role)}.</span>
    <span>${esc(PLAIN[k])} <span class="tag">Panel judgement</span></span>
    <details ${open?'open':''}><summary class="small" style="cursor:pointer;color:var(--accent)">Show the member's exact words</summary>${exactWords(k)}</details></div>`;
}

/* ---------- state ---------- */
let STEP = 1, START = 'F1', OPEN_M = null;
const STEP_NAMES = ['Choose a future','Set the outside conditions','Choose the OEM’s actions','See the result','Decide'];
const lc = s => s.charAt(0).toLowerCase() + s.slice(1);
const plainFirst = n => FIRST[n];
const fmtDays = d => `${d} day${d===1?'':'s'}`;
const sevOf = e => e.stop > 30 || e.late > 30 ? 'bad' : (e.stop > 0 || e.late > 0) ? 'warn' : 'ok';
const evAmount = e => e.stop > 0 ? `${e.stop}-day stop` : e.late > 0 ? `${e.late} days late` : 'no stop or delay';
const changedCount = () => Object.keys(PRESETS[START]).filter(k => W[k] !== PRESETS[START][k]).length + (CONTRA ? 1 : 0);
const spendOf = p => Object.keys(p).reduce((s,id) => s + AM[id].cost, 0);

function go(n){ STEP = n; ENTER = true; render(); window.scrollTo({top:0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'}); }

function renderSteps(){
  $('#steps').innerHTML = STEP_NAMES.map((t,i) => `<li class="${i+1<STEP?'done':i+1===STEP?'now':''}"><button data-step="${i+1}" ${i+1===STEP?'aria-current="step"':''}><span class="n">Step ${i+1}</span><span class="t">${t}</span></button></li>`).join('');
  $('#steps').querySelectorAll('button').forEach(b => b.onclick = () => go(+b.dataset.step));
  const n = Object.keys(PLAN).length, ch = changedCount();
  $('#sofar').innerHTML = `<span>Starting future: <b>${FNUM[START]}</b></span><span>Outside conditions changed: <b>${ch}</b></span><span>Actions chosen: <b>${n}</b>${n?`, ${money(spendOf(PLAN))} (synthetic)`:''}</span>`;
}

/* ---------- motion and media helpers ---------- */
let ENTER = true;                  // true only on the render that follows a step change
const PREV_NUM = {};               // last value shown for each animated number
let PREV_EV = new Set();           // events shown in the live list on the last render
const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
function animateNumbers(root){
  root.querySelectorAll('[data-num]').forEach(el => {
    const key = el.dataset.key, to = +el.dataset.num, suffix = el.dataset.suffix || '', prefix = el.dataset.prefix || '';
    const dec = +(el.dataset.dec || 0);
    const from = key in PREV_NUM ? PREV_NUM[key] : (ENTER ? 0 : to);
    PREV_NUM[key] = to;
    const fmt = v => prefix + (dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-US')) + suffix;
    if (from === to || reduceMotion()){ el.textContent = fmt(to); return; }
    if (!ENTER){ const box = el.closest('.bignum, .live'); if (box){ box.classList.remove('flash'); void box.offsetWidth; box.classList.add('flash'); } }
    const t0 = performance.now(), dur = 520;
    const tick = now => { const k = Math.min(1, (now - t0)/dur), ease = 1 - Math.pow(1-k, 3); el.textContent = fmt(from + (to-from)*ease); if (k < 1) requestAnimationFrame(tick); };
    el.textContent = fmt(from); requestAnimationFrame(tick);
  });
}
const num = (key, v, suffix='', prefix='', dec=0) => `<span data-num="${v}" data-key="${key}" data-suffix="${esc(suffix)}" data-prefix="${esc(prefix)}" data-dec="${dec}">${prefix}${dec ? v.toFixed(dec) : v.toLocaleString('en-US')}${esc(suffix)}</span>`;

function videoSlot(fid, size){
  const m = MEDIA.futures && MEDIA.futures[fid];
  if (!m) return '';
  if (m.src) return `<button class="video-slot ${size}" data-video="futures.${fid}"><span class="play" aria-hidden="true"></span><span><b>${esc(m.title)}</b><span class="small muted">${esc(m.length || '')}</span></span></button>`;
  return `<div class="video-slot empty ${size}"><span class="play" aria-hidden="true"></span><span><b>${esc(m.title)}</b><span class="small muted">Video coming soon</span></span></div>`;
}
function openVideo(path){
  const m = path.split('.').reduce((o,k) => o && o[k], MEDIA);
  if (!m || !m.src) return;
  const d = document.getElementById('player');
  d.querySelector('h2').textContent = m.title;
  const v = d.querySelector('video');
  // MP4 (H.264) for Safari and Chrome, WebM (VP9) for browsers without H.264.
  const srcs = [m.src, m.webm].filter(Boolean);
  v.innerHTML = srcs.map(s => `<source src="${esc(s)}" type="video/${s.endsWith('.webm') ? 'webm' : 'mp4'}">`).join('');
  if (m.poster) v.poster = m.poster; else v.removeAttribute('poster');
  v.load();
  d.showModal(); v.play().catch(() => {});
}

/* ---------- step 1: futures ---------- */
function step1(){
  const lean = D.futures.find(f => f.leans_here);
  const q = D.uncertainties;
  const ans = {F1:['No part is cut off','Helium still limits shipments'],F2:['No part is cut off','Helium no longer limits'],F3:['A part is cut off','Helium still limits shipments'],F4:['A part is cut off','Helium no longer limits']};
  const order = ['F1','F3','F2','F4'];
  const card = f => {
    const ff = f.what_fails_first;
    return `<article class="card fcard ${START===f.id?'sel':''}" style="--i:${order.indexOf(f.id)}">
      <div class="fcard-top"><span class="label">${FNUM[f.id]}</span>${f.leans_here?'<span class="chip lean"><span class="pulse" aria-hidden="true"></span>The indicators lean here</span>':''}</div>
      <div class="ans">${ans[f.id].map(a => `<span class="chip">${a}</span>`).join('')}</div>
      <h3>${esc(f.name)}</h3>
      <p class="small ink2">${esc(f.sentence)}</p>
      <dl class="facts">
        <dt>First to fail</dt><dd>${esc(PLACE[ff.node])}</dd>
        <dt>When</dt><dd>${esc(f.how_soon.split('. ')[0])}.</dd>
        <dt>Confidence</dt><dd>${cap(f.how_sure.level)}</dd>
      </dl>
      ${videoSlot(f.id, 'compact')}
      <div class="fcard-cta"><button class="btn ${START===f.id?'primary':''}" data-start="${f.id}">Explore ${FNUM[f.id]} <span class="arrow" aria-hidden="true">&rarr;</span></button></div>
    </article>`;
  };
  const F = id => card(FUT[id]);
  return `<div class="screen-head">
      <p class="bluf">Choose the future you want to explore. The indicators lean toward ${FNUM[lean.id]} today.</p>
      <p class="lede">The panel answered two questions about the next five years, yes or no, which gives four futures. Each one shows which site or supplier is the first to fail and when.</p>
    </div>
    <div class="questions">
      ${q.map((u,i) => `<div class="question"><span class="qnum">${i+1}</span><div><p class="qtitle">Question ${i+1}: ${esc(u.question)}</p>
        <details class="why"><summary>Why the indicators lean ${i===0?'toward no':'toward yes'}</summary><p class="small muted">${esc(u.lean_sentence)} <span class="tag">Panel judgement</span></p></details></div></div>`).join('')}
    </div>
    <div class="fgrid" role="group" aria-label="The four futures, arranged by the answers to the two questions">
      <div class="corner" aria-hidden="true"></div>
      <div class="colh"><span class="label">Question 1: no</span><b>No part is cut off</b></div>
      <div class="colh"><span class="label">Question 1: yes</span><b>A part is cut off</b></div>
      <div class="rowh"><span class="label">Question 2: yes</span><b>Helium still limits shipments</b></div>
      ${F('F1')}${F('F3')}
      <div class="rowh"><span class="label">Question 2: no</span><b>Sealed magnets end the helium limit</b></div>
      ${F('F2')}${F('F4')}
    </div>`;
}

/* ---------- step 2: outside conditions ---------- */
let NEXT_EV = new Set();
function livePanel(R, P, showActions){
  const vis = R.ev.filter(e => e.stop > 0 || e.late > 0);
  const evKey = e => e.id + ':' + e.stop + ':' + e.late;
  vis.forEach(e => NEXT_EV.add(evKey(e)));
  return `<div class="card live">
    <span class="live-title">${showActions ? 'Result with your actions' : 'What these conditions do'}</span>
    <div><span class="label">Closest future</span><h3>${FNUM[P.id]}: ${esc(FUT[P.id].name)}</h3>
      ${P.id!==START?`<p class="small" style="color:var(--warn);margin-top:4px">Your changes have moved this away from ${FNUM[START]}.</p>`:''}</div>
    <div class="bignum"><span class="label">First line stop over 30 days</span><span class="v ${R.first?'bad':'ok'}">${R.first ? esc(SHORT[R.first.node]) : 'None'}</span><span class="s">${R.first ? `${cap(qWords(R.first.q))}, ${num('first', R.first.stop, '-day stop')}` : (R.firstLate ? `No stop, but installs run ${R.firstLate.late} days late from ${qWords(R.firstLate.q)}` : 'Nothing goes past the 30-day limit')} <span class="tag syn">synthetic</span></span></div>
    <div><span class="label">Everything that goes wrong, in order</span>
      ${vis.length ? `<ul class="evlist" style="margin-top:6px">${vis.map(e => `<li class="${!ENTER && !PREV_EV.has(evKey(e)) ? 'new' : ''}"><span class="dot ${sevOf(e)}"></span><span>${esc(e.title)}<span class="when">${cap(qWords(e.q))}</span></span><span class="days">${evAmount(e)}</span></li>`).join('')}</ul>` : '<p class="small muted" style="margin-top:6px">Nothing stops the line or delays an install.</p>'}
    </div>
    ${P.flags.map(f => `<p class="note">Outside what the panel studied: ${esc(f)}</p>`).join('')}
  </div>`;
}
function step2(){
  const R = simulate(W, {}, CONTRA), P = position(W);
  const lead = R.first ? `In these conditions ${plainFirst(R.first.node)}, in ${qWords(R.first.q)}, with a ${R.first.stop}-day line stop.` : R.firstLate ? `In these conditions no line stop goes past the 30-day limit, but installs run ${R.firstLate.late} days late from ${qWords(R.firstLate.q)}.` : 'In these conditions nothing goes past the 30-day limit before 2031.';
  const groups = [['U1',`Question 1: ${D.uncertainties[0].question}`, D.uncertainties[0].lean_sentence],['U2',`Question 2: ${D.uncertainties[1].question}`, D.uncertainties[1].lean_sentence],['X','Events that can happen in any future','']];
  const controls = groups.map(([g,q,l]) => `<div class="group"><p class="group-q">${esc(q)}</p>${l?`<p class="group-lean">${esc(l)}</p>`:''}
    ${CTRL.filter(c => c.g===g).map(c => {
      const m = MEM[c.m], changed = W[c.k] !== PRESETS[START][c.k];
      const ctl = c.range
        ? `<div class="range-row"><input type="range" id="lv-${c.k}" min="${c.range[0]}" max="${c.range[1]}" step="${c.range[2]}" value="${W[c.k]}" aria-label="${esc(c.label)}"><output>${W[c.k]}%</output></div>`
        : `<div class="seg" role="group" aria-label="${esc(c.label)}">${c.opts.map(([v,t]) => `<button data-k="${c.k}" data-v="${v}" class="${W[c.k]===v?'on':''}" aria-pressed="${W[c.k]===v}">${esc(t)}</button>`).join('')}</div>`;
      return `<div class="control"><div class="control-h"><span class="control-label">${esc(c.label)}</span>${changed?`<span class="changed">Changed from ${FNUM[START]}</span>`:''}</div>${ctl}
        <div><button class="btn quiet small" data-m="${c.m}" aria-expanded="${OPEN_M===c.m}">${OPEN_M===c.m?'Hide':'Read'} the ${esc(m.name)} member's view</button></div>
        ${OPEN_M===c.m ? memberCard(c.m) : ''}</div>`;
    }).join('')}</div>`).join('');
  return `<div class="screen-head">
      <p class="bluf">${esc(lead)}</p>
      <p class="lede">These are the conditions outside the control of the OEM (original equipment manufacturer) in ${FNUM[START]}. Change any of them to see what fails and when. Each one belongs to a panel member, and you can read that member's view under it.</p>
    </div>
    ${MEDIA.futures && MEDIA.futures[START] ? videoSlot(START, 'wide') : ''}
    <div class="split">
      <div class="card">${controls}
        <div class="group"><p class="group-q">The panel member who disagrees most</p>
          <label style="display:flex;gap:10px;align-items:flex-start;cursor:pointer;margin-top:8px"><input type="checkbox" id="contra" ${CONTRA?'checked':''} style="width:18px;height:18px;margin-top:3px;accent-color:var(--accent)"><span><b>Use the Contrarian member's view</b><br><span class="small muted">The China plant's helium queue stops the plant in 2027, instead of only delaying Asian installs in 2028.</span></span></label>
          ${memberCard('con')}
        </div>
      </div>
      <div class="sticky">${livePanel(R,P,false)}
        <button class="btn" id="reset">Reset to ${FNUM[START]}</button></div>
    </div>`;
}

/* ---------- step 3: actions, grouped by the problem they address ---------- */
function actionCard(id, ev){
  const a = ACT[id], m = AM[id], p = PLAN[id], st = p ? p.start : (DEFAULT_START[id] ?? 0);
  let status = '';
  if (m.decision) status = '<span class="pill mute">A decision on sealed magnets. Set it with the sealed-magnet control in step 2.</span>';
  else if (m.none) status = '<span class="pill mute">Changes what a failure costs. Not modelled here.</span>';
  else if (p && p.start > m.last) status = '<span class="pill bad">Starts too late to help</span>';
  else if (p && ev && !ev.used.includes(id)) status = `<span class="pill warn">Not in place by ${qWords(ev.q)}</span>`;
  else if (p) status = `<span class="pill ok">In place by ${qWords(p.start + m.lead)}</span>`;
  return `<div class="act ${p?'on':''}">
    <input type="checkbox" id="act-${id}${ev?'-'+ev.id:''}" data-act="${id}" ${p?'checked':''} ${m.decision?'disabled':''}>
    <label for="act-${id}${ev?'-'+ev.id:''}" class="name">${esc(a.name)} <span class="muted mono small">(${id})</span></label>
    ${m.eff ? `<p class="eff">${esc(m.eff)}</p>` : m.note ? `<p class="eff">${esc(m.note)}</p>` : ''}
    <div class="row"><span>Owner: ${esc(a.owner)}</span><span>Spend: ${money(m.cost)} <span class="tag syn">synthetic</span></span></div>
    ${m.none ? '' : `<div class="row"><label for="st-${id}${ev?'-'+ev.id:''}">Start:</label><select id="st-${id}${ev?'-'+ev.id:''}" data-st="${id}">${STARTS.map(([q,l]) => `<option value="${q}" ${q===st?'selected':''}>${l}</option>`).join('')}</select><span>${esc(a.too_late_after)}</span></div>`}
    ${status ? `<div class="row">${status}</div>` : ''}
  </div>`;
}
function step3(){
  const R0 = simulate(W, {}, CONTRA), R = simulate(W, PLAN, CONTRA), P = position(W);
  const problems = R0.ev.filter(e => e.stop > 0 || e.late > 0);
  const bad = problems.filter(e => e.stop > 30 || e.late > 30).length;
  const covered = new Set(problems.flatMap(e => e.help));
  const others = D.actions.map(a => a.id).filter(id => !covered.has(id));
  const spend = spendOf(PLAN);
  const lead = problems.length ? `In these conditions ${bad} ${bad===1?'event pushes':'events push'} the line past the 30-day limit. Choose the actions that shorten them.` : 'Nothing goes wrong in these conditions, so no action is needed. You can still test actions against other futures in step 5.';
  return `<div class="screen-head"><p class="bluf">${esc(lead)}</p>
      <p class="lede">The actions are the 26 the panel proposed for the OEM. Each one sits under the event it changes. Pick a start date: an action only helps if it is in place before the event.</p></div>
    <div class="split">
      <div class="stack">
        ${problems.map(e => {
          const after = R.ev.find(x => x.id === e.id);
          return `<div class="card problem"><div class="problem-h"><div><span class="label">${cap(qWords(e.q))}, ${esc(PLACE[e.node])}</span><h3>${esc(e.title)}</h3></div>
            <span class="days mono">${evAmount(e)}${after && evAmount(after)!==evAmount(e) ? ` <span class="better">now ${evAmount(after)}</span>` : ''}</span></div>
            <p class="small muted">${esc(e.why)}</p>
            ${e.gap ? '<p class="note gap">No action on the panel’s list changes this event.</p>' : `<div class="acts">${e.help.map(id => actionCard(id, after)).join('')}</div>`}
          </div>`; }).join('')}
        <details class="more"><summary>Other actions from the panel (${others.length})</summary><div class="acts">${others.map(id => actionCard(id, null)).join('')}</div></details>
      </div>
      <div class="sticky">
        <div class="card live"><span class="live-title">Your spend</span>
          <div class="bignum"><span class="v">${num('spend', spend, ' million', '$', spend % 1 ? 1 : 0)}</span><span class="s">of a ${money(BUDGET)} budget <span class="tag syn">synthetic</span></span></div>
          <div class="meter ${spend>BUDGET?'over':''}"><span style="width:${Math.min(100,spend/BUDGET*100)}%"></span></div>
        </div>
        ${livePanel(R,P,true)}
        <div class="card live"><span class="live-title">Load a set of actions</span>
          <button class="btn" data-plan="brief">The three actions the brief recommends</button>
          <button class="btn" data-plan="lean">Actions that pay off only in Future 1 and Future 3</button>
          <button class="btn" data-plan="none">Clear all actions</button></div>
      </div>
    </div>`;
}

/* ---------- step 4: result ---------- */
function step4(){
  const R0 = simulate(W, {}, CONTRA), R = simulate(W, PLAN, CONTRA);
  const n = Object.keys(PLAN).length;
  const shareTxt = s => s >= 4 ? 'High' : s >= 1 ? 'Medium' : 'Low';
  let lead;
  if (!n) lead = 'You have not chosen any actions yet, so the result is the same as the outside conditions alone.';
  else if (!R.first && R0.first) lead = `Your ${n} actions keep every line stop within the 30-day limit in these conditions.`;
  else if (R.first) lead = `With your ${n} actions, ${plainFirst(R.first.node)}, in ${qWords(R.first.q)}, with a ${R.first.stop}-day line stop.`;
  else lead = `Nothing goes past the 30-day limit in these conditions, with or without your actions.`;
  const rows = R0.ev.filter(e => e.stop > 0 || e.late > 0).map(e => {
    const a = R.ev.find(x => x.id === e.id) || e;
    const b0 = Math.max(e.stop,e.late), b1 = Math.max(a.stop,a.late);
    return `<tr><td>${esc(e.title)}<br><span class="small muted">${cap(qWords(e.q))}</span></td><td class="n">${evAmount(e)}</td><td class="n ${b1<b0?'better':b1>b0?'worse':''}">${evAmount(a)}</td><td>${a.used.length ? a.used.map(id => esc(ACT[id]?ACT[id].name:id)).join('; ') : (e.gap ? '<span class="muted">No action on the panel’s list</span>' : '<span class="muted">None in place</span>')}</td></tr>`;
  }).join('');
  const stat = (k,v0,v1,unit,tag) => `<div class="card bignum"><span class="label">${k}</span><span class="v ${v1<v0?'ok':''}">${num('r4'+k, v1, unit)}</span><span class="s">Without actions: ${v0}${unit} <span class="tag ${tag[1]}">${tag[0]}</span></span></div>`;
  return `<div class="screen-head"><p class="bluf">${esc(lead)}</p>
      <p class="lede">This compares the conditions you set in step 2, with and without the actions you chose in step 3.</p></div>
    <div class="stats">
      ${stat('Longest line stop', R0.worst, R.worst, ' days', ['synthetic','syn'])}
      ${stat('Longest install delay', R0.lateMax, R.lateMax, ' days', ['synthetic','syn'])}
      ${stat('Total line-stop days', R0.totalStop, R.totalStop, '', ['synthetic','syn'])}
      <div class="card bignum"><span class="label">Market share at risk</span><span class="v">${shareTxt(R.share)}</span><span class="s">${esc(R.why)}. Without actions: ${shareTxt(R0.share)} <span class="tag est">estimate</span></span></div>
    </div>
    <div class="card"><h3 style="margin-bottom:8px">Event by event</h3>
      ${rows ? `<div class="table-wrap"><table><thead><tr><th>Event</th><th class="n">Without actions</th><th class="n">With your actions</th><th>Actions that changed it</th></tr></thead><tbody>${rows}</tbody></table></div>` : '<p class="muted">Nothing goes wrong in these conditions.</p>'}
    </div>
    ${R.ev.some(e => e.base) ? '<p class="note">Installed sealed magnets are exposed. Without a spare cold head they warm up, so hospitals face a scanner that cannot run rather than a late install.</p>' : ''}`;
}

/* ---------- step 5: decide ---------- */
function step5(){
  const ids = Object.keys(PLAN);
  const T = testPlan(PLAN), T0 = testPlan({});
  const P = position(W);
  const cands = Object.keys(AM).filter(id => !PLAN[id] && !AM[id].none);
  const best = cands.map(id => { const t = testPlan({...PLAN, [id]: {start: DEFAULT_START[id] ?? 0}}); return [id, t.pass - T.pass, T.stopDays - t.stopDays]; })
    .filter(x => x[1] > 0 || x[2] > 0).sort((a,b) => b[2]-a[2] || b[1]-a[1]).slice(0,3);
  const saved = T0.stopDays - T.stopDays;
  const lead = ids.length
    ? `Start ${ids.length===1?'this action':`these ${ids.length} actions`} if you want this plan. Across all four futures and six added events, it saves ${saved.toLocaleString('en-US')} of ${T0.stopDays.toLocaleString('en-US')} line-stop days.`
    : 'Choose actions in step 3 to build a plan. The table below shows how the four futures turn out with no actions.';
  const events = simulate(W, {}, CONTRA).ev;
  const inds = [...new Set(events.map(e => e.ind).filter(Boolean))].map(i => IND[i]);
  return `<div class="screen-head"><p class="bluf">${esc(lead)}</p>
      <p class="lede">A good plan holds up in futures you did not choose. This step tests your actions against every future, not only the one you explored.</p></div>
    ${ids.length ? `<div class="card decide"><h3>Your plan</h3><div class="table-wrap"><table><thead><tr><th>Action</th><th>Owner</th><th>Your start</th><th>Pays off in</th><th class="n">Spend (synthetic)</th></tr></thead><tbody>
      ${ids.map(id => { const a = ACT[id]; const late = PLAN[id].start > AM[id].last; return `<tr><td>${esc(a.name)}${late?'<br><span class="pill bad">Starts too late to help</span>':''}</td><td>${esc(a.owner)}</td><td>${STARTS.find(s=>s[0]===PLAN[id].start)[1]}</td><td>${a.futures_where_it_works.length===4?'Every future':a.futures_where_it_works.map(f=>FNUM[f]).join(', ')}</td><td class="n">${money(AM[id].cost)}</td></tr>`; }).join('')}
      </tbody></table></div><p class="small muted">Total spend: ${money(spendOf(PLAN))} of a ${money(BUDGET)} budget.</p></div>` : ''}
    <div class="card decide"><h3>How the plan holds up in every future</h3>
      <p class="small">Each cell is one future with one event added. It shows the longest line stop in days. Green means no stop over 30 days. Your plan keeps every stop within the limit in ${T.pass} of ${T.total} cases, against ${T0.pass} with no actions. <span class="tag syn">synthetic</span></p>
      <div class="table-wrap"><table class="matrix"><thead><tr><th>Future</th>${EVENTS.map(([,l]) => `<th>${esc(l)}</th>`).join('')}</tr></thead><tbody>
        ${['F1','F2','F3','F4'].map(f => `<tr><td><b>${FNUM[f]}</b><br><span class="small muted">${esc(FUT[f].name)}</span></td>${T.cells.filter(c => c.f===f).map((c,i) => `<td class="cell ${c.ok?'pass':'fail'}" style="--c:${['F1','F2','F3','F4'].indexOf(f)*7+i}">${c.worst}</td>`).join('')}</tr>`).join('')}
      </tbody></table></div>
      <p class="small muted">Every future stops the line somewhere, as the brief says, so few cells turn green. The useful comparison is the total of line-stop days saved. The wire listing column is the case two panel members made, and it replaces any other listing in that future.</p>
    </div>
    <div class="card decide"><h3>Actions that would add the most</h3>
      ${best.length ? `<div class="table-wrap"><table><thead><tr><th>Action</th><th>Owner</th><th class="n">Line-stop days saved</th></tr></thead><tbody>
        ${best.map(([id,,ds]) => `<tr><td>${esc(ACT[id].name)}<br><span class="small muted">${money(AM[id].cost)} (synthetic). Start by: ${esc(lc(ACT[id].start_by))}.</span></td><td>${esc(ACT[id].owner)}</td><td class="n">${ds.toLocaleString('en-US')}</td></tr>`).join('')}</tbody></table></div>
        <div><button class="btn" id="goActs">Add actions in step 3</button></div>` : '<p class="muted">No single added action saves more line-stop days.</p>'}
    </div>
    ${inds.length ? `<div class="card decide"><h3>Indicators to watch for these conditions</h3><p class="small muted">These public sources show early whether the conditions you set in step 2 are starting to happen.</p>
      ${inds.map(i => `<div class="ind"><a href="${esc(i.source_url)}" target="_blank" rel="noopener">${esc(i.name)}</a><span class="small muted">${esc(i.last_read)}</span><span><span class="tag pub">${esc(i.source_name)}</span></span></div>`).join('')}</div>` : ''}`;
}

/* ---------- render ---------- */
function navBar(){
  const prev = STEP > 1 ? `<button class="btn" data-go="${STEP-1}">Back to ${lc(STEP_NAMES[STEP-2])}</button>` : '<span></span>';
  const next = STEP < 5 ? `<button class="btn primary" data-go="${STEP+1}">Next: ${lc(STEP_NAMES[STEP])}</button>` : `<button class="btn" data-go="1">Start again with another future</button>`;
  return `<div class="nav">${prev}${next}</div>`;
}
function render(){
  renderSteps();
  const body = [null, step1, step2, step3, step4, step5][STEP]();
  NEXT_EV = new Set();
  const s = $('#screen');
  s.innerHTML = body + navBar();
  s.classList.toggle('enter', ENTER && !reduceMotion());
  animateNumbers(s);
  PREV_EV = NEXT_EV; ENTER = false;
  s.querySelectorAll('[data-video]').forEach(b => b.onclick = () => openVideo(b.dataset.video));
  s.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(+b.dataset.go));
  s.querySelectorAll('[data-start]').forEach(b => b.onclick = () => { START = b.dataset.start; W = {...PRESETS[START]}; CONTRA = false; OPEN_M = null; go(2); });
  s.querySelectorAll('.seg button').forEach(b => b.onclick = () => { W[b.dataset.k] = b.dataset.v; OPEN_M = CTRL.find(c => c.k === b.dataset.k).m; render(); });
  s.querySelectorAll('input[type=range]').forEach(r => r.onchange = () => { W.sealed = +r.value; render(); });
  s.querySelectorAll('input[type=range]').forEach(r => r.oninput = () => { r.nextElementSibling.textContent = r.value + '%'; });
  s.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { OPEN_M = OPEN_M === b.dataset.m ? null : b.dataset.m; render(); });
  const c = s.querySelector('#contra'); if (c) c.onchange = () => { CONTRA = c.checked; render(); };
  const r = s.querySelector('#reset'); if (r) r.onclick = () => { W = {...PRESETS[START]}; CONTRA = false; render(); };
  s.querySelectorAll('[data-act]').forEach(cb => cb.onchange = () => {
    const id = cb.dataset.act; const sel = s.querySelector(`[data-st="${id}"]`);
    if (cb.checked) PLAN[id] = {start: sel ? +sel.value : (DEFAULT_START[id] ?? 0)}; else delete PLAN[id];
    const y = window.scrollY; render(); window.scrollTo(0, y);
  });
  s.querySelectorAll('[data-st]').forEach(sel => sel.onchange = () => { PLAN[sel.dataset.st] = {start: +sel.value}; const y = window.scrollY; render(); window.scrollTo(0, y); });
  s.querySelectorAll('[data-plan]').forEach(b => b.onclick = () => { setPlan(PLANS[b.dataset.plan]); const y = window.scrollY; render(); window.scrollTo(0, y); });
  const ga = s.querySelector('#goActs'); if (ga) ga.onclick = () => go(3);
}
$('#readDate').textContent = fmtDate(D.meta.read_date);
const demo = $('#demoBtn');
if (MEDIA.demo && MEDIA.demo.src){ demo.hidden = false; demo.onclick = () => openVideo('demo'); }
$('#player').querySelector('[data-close]').onclick = () => $('#player').close();
$('#player').addEventListener('close', () => $('#player').querySelector('video').pause());
setPlan([]); render();

})().catch(err => {
  console.error(err);
  const s = document.getElementById('screen');
  if (s) s.innerHTML = '<p class="note">The scenario data could not be loaded. Reload the page to try again.</p>';
});
