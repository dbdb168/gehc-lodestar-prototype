(function () {
  const D = window.LODESTAR;
  const HS = Object.fromEntries(D.hotspots.map(h => [h.id, h]));
  const RANK = { high: 3, med: 2, low: 1, done: 0 };
  const SEVLBL = { high: 'High', med: 'Medium', low: 'Low', done: 'Resolved' };
  const state = { product: 'all', view: 'globe', selected: null, rotating: true, scen: {}, layers: { flows: true, hotspots: true, plants: true, sites: true, suppliers: true } };

  // ---------- helpers ----------
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function sevFor(h, p = state.product) {
    if (p === 'all') {
      const vals = Object.values(h.sev);
      return vals.reduce((a, b) => (RANK[b] > RANK[a] ? b : a), vals[0]);
    }
    return h.sev[p] || null;
  }
  function relevantHotspots(p = state.product) {
    return D.hotspots.filter(h => sevFor(h, p)).sort((a, b) => RANK[sevFor(b, p)] - RANK[sevFor(a, p)]);
  }
  const fmtM = v => `$${v}M`;

  // ---------- header ----------
  const nav = $('#productNav');
  [['all', 'All lines', null], ['mr', 'MR', 'high'], ['ct', 'CT', 'med'], ['us', 'Ultrasound', 'low']].forEach(([k, label, lvl]) => {
    const b = document.createElement('button');
    b.dataset.p = k;
    b.innerHTML = `${esc(label)}${lvl ? `<span class="lvl ${lvl}">${SEVLBL[lvl]}</span>` : ''}`;
    b.onclick = () => setProduct(k);
    nav.appendChild(b);
  });
  document.querySelectorAll('.viewtoggle button').forEach(b => b.onclick = () => setView(b.dataset.view));

  // ---------- map ----------
  const svg = d3.select('#map');
  const gRoot = svg.append('g');
  const gSphere = gRoot.append('path').attr('class', 'sphere');
  const gGrat = gRoot.append('path').attr('class', 'grat');
  const gLand = gRoot.append('g');
  const gRoutes = gRoot.append('g');
  const gFlows = gRoot.append('g');
  const gNodes = gRoot.append('g');
  const gHs = gRoot.append('g');
  const tip = $('#tip');

  let W = 800, H = 600, proj, path, baseScale, zoomK = 1;
  const graticule = d3.geoGraticule10();
  const rot = [-30, -22, 0];

  function makeProjection() {
    const r = $('#stage').getBoundingClientRect();
    W = r.width; H = r.height;
    svg.attr('viewBox', `0 0 ${W} ${H}`);
    const usableH = H - 80;
    if (state.view === 'globe') {
      baseScale = Math.min(W, usableH) * 0.46;
      proj = d3.geoOrthographic().scale(baseScale * zoomK).translate([W / 2, usableH / 2 + 8]).rotate(rot).clipAngle(90).precision(0.5);
    } else {
      proj = d3.geoEqualEarth().rotate([-20, 0]).fitExtent([[16, 16], [W - 16, usableH]], { type: 'Sphere' });
    }
    path = d3.geoPath(proj);
  }

  function visible(lon, lat) {
    if (state.view !== 'globe') return true;
    const c = proj.invert([W / 2, (H - 80) / 2 + 8]);
    return d3.geoDistance([lon, lat], c) < Math.PI / 2 - 0.03;
  }

  let land;
  const routeData = D.routes.map((r, i) => ({ ...r, i, feature: { type: 'LineString', coordinates: r.coords } }));

  function routeClass(r) {
    const p = state.product;
    const cls = ['route', r.mode === 'air' ? 'airm' : r.stage];
    if (p !== 'all' && r.p !== p) cls.push('dim');
    if (r.hs.includes('h_he_exp') && r.from === 'heRU') cls.push('blocked');
    if (r.from === 'heQ') cls.push('blocked');
    if (state.selected) {
      if (r.hs.includes(state.selected) && (p === 'all' || r.p === p)) {
        const s = sevFor(HS[state.selected]);
        cls.push(s === 'high' ? 'hit' : 'hitmed');
      } else cls.push('dim');
    }
    return cls.join(' ');
  }
  function flowClass(r) {
    const c = routeClass(r).replace('route', 'flow');
    return c + (r.from === 'heQ' || r.from === 'heRU' ? ' slow' : '');
  }

  function drawStatic() {
    gRoutes.selectAll('path').data(routeData, d => d.i).join('path');
    gFlows.selectAll('path').data(routeData, d => d.i).join('path');

    const nodes = gNodes.selectAll('g.node').data(D.nodes, d => d.id).join(enter => {
      const g = enter.append('g').attr('class', d => `node ${d.type}`);
      g.each(function (d) {
        const s = d3.select(this);
        if (d.type === 'plant') s.append('rect').attr('x', -4.5).attr('y', -4.5).attr('width', 9).attr('height', 9);
        else s.append('circle').attr('r', d.type === 'port' ? 2.5 : d.type === 'customer' ? 3.6 : 3.4);
        if (d.type === 'plant' || d.type === 'raw' || d.type === 'customer') s.append('text').attr('x', 8).attr('y', 3.5).text(d.type === 'customer' ? d.place : d.name);
      });
      g.on('mousemove', (e, d) => showTip(e, `<b>${esc(d.name)}</b><span>${esc(d.place || '')}${d.note ? ' · ' + esc(d.note) : ''}${d.type === 'customer' ? ' · illustrative install site' : ''}</span>`))
        .on('mouseleave', hideTip);
      return g;
    });

    gHs.selectAll('g.hs').data(D.hotspots, d => d.id).join(enter => {
      const g = enter.append('g').attr('class', 'hs').attr('tabindex', 0).attr('role', 'button');
      g.append('circle').attr('class', 'ring').attr('r', 7);
      g.append('circle').attr('class', 'core').attr('r', 7);
      g.append('text').attr('x', d => (d.lab || [12])[0]).attr('y', d => (d.lab || [0, -9])[1]).attr('text-anchor', d => (d.lab || [0, 0, 'start'])[2]).text(d => d.title);
      g.on('click', (e, d) => { e.stopPropagation(); select(d.id); })
        .on('keydown', (e, d) => { if (e.key === 'Enter') select(d.id); })
        .on('mousemove', (e, d) => showTip(e, `<b>${esc(d.title)}</b><span>${esc(d.cat)} · ${esc(d.status)}</span>`))
        .on('mouseleave', hideTip);
      return g;
    });
    restyle();
  }

  function restyle() {
    const p = state.product;
    gRoutes.selectAll('path').attr('class', routeClass);
    gFlows.selectAll('path').attr('class', flowClass);
    const relevantNode = new Set();
    D.routes.forEach(r => { if (p === 'all' || r.p === p) { relevantNode.add(r.from); relevantNode.add(r.to); r.path.forEach(x => typeof x === 'string' && relevantNode.add(x)); } });
    gNodes.selectAll('g.node').classed('dim', d => !relevantNode.has(d.id));
    gHs.selectAll('g.hs').attr('class', d => {
      const s = sevFor(d);
      const cls = ['hs', s || 'low'];
      if (!s) cls.push('dim');
      if (state.selected === d.id) cls.push('sel');
      else if (state.selected) cls.push('dim');
      return cls.join(' ');
    }).select('.core').attr('r', d => { const s = sevFor(d); return s === 'high' ? 7.5 : s === 'med' ? 6 : 4.5; });
    gHs.selectAll('g.hs').select('.ring').attr('r', d => { const s = sevFor(d); return s === 'high' ? 7.5 : 6; });
    gHs.selectAll('g.hs').select('text').style('display', d => {
      const s = sevFor(d);
      if (state.selected) return state.selected === d.id ? null : 'none';
      if (window.innerWidth <= 700) return 'none';
      return s === 'high' || (s === 'med' && p !== 'all') ? null : 'none';
    });
    applyLayers();
  }

  function applyLayers() {
    const L = state.layers;
    gRoutes.style('display', L.flows ? null : 'none');
    gFlows.style('display', L.flows ? null : 'none');
    gHs.style('display', L.hotspots ? null : 'none');
    gNodes.selectAll('g.node').style('display', d => {
      if (d.type === 'plant') return L.plants ? null : 'none';
      if (d.type === 'customer') return L.sites ? null : 'none';
      if (d.type === 'raw' || d.type === 'tier2') return L.suppliers ? null : 'none';
      return L.flows ? null : 'none';
    });
  }

  function render() {
    gSphere.attr('d', path({ type: 'Sphere' }));
    gGrat.attr('d', path(graticule));
    if (land) gLand.selectAll('path').data(land.features).join('path').attr('class', 'land').attr('d', path);
    gRoutes.selectAll('path').attr('d', d => path(d.feature));
    gFlows.selectAll('path').attr('d', d => path(d.feature));
    gNodes.selectAll('g.node').attr('transform', d => { const xy = proj([d.lon, d.lat]); return `translate(${xy[0]},${xy[1]})`; })
      .attr('visibility', d => (visible(d.lon, d.lat) ? 'visible' : 'hidden'));
    gHs.selectAll('g.hs').attr('transform', d => { const xy = proj([d.lon, d.lat]); return `translate(${xy[0]},${xy[1]})`; })
      .attr('visibility', d => (visible(d.lon, d.lat) ? 'visible' : 'hidden'));
  }

  // rotation + drag + zoom
  let lastT = 0;
  function tick(t) {
    if (state.view === 'globe' && state.rotating && !tweening) {
      const dt = lastT ? t - lastT : 16;
      rot[0] += dt * 0.004;
      proj.rotate(rot);
      render();
    }
    lastT = t;
    requestAnimationFrame(tick);
  }
  let tweening = false;
  function flyTo(lon, lat) {
    if (state.view !== 'globe') return;
    const from = proj.rotate();
    const to = [-lon, -lat + 8, 0];
    // shortest path on longitude
    let d0 = to[0] - from[0];
    d0 = ((d0 + 540) % 360) - 180;
    to[0] = from[0] + d0;
    const interp = d3.interpolate(from, to);
    tweening = true;
    d3.transition().duration(1100).ease(d3.easeCubicInOut).tween('rot', () => t => {
      const r = interp(t); rot[0] = r[0]; rot[1] = r[1]; rot[2] = 0;
      proj.rotate(rot); render();
    }).on('end', () => { tweening = false; });
  }

  svg.call(d3.drag()
    .on('start', () => { state.rotating = false; })
    .on('drag', (e) => {
      if (state.view !== 'globe') return;
      const k = 0.25 / zoomK;
      rot[0] += e.dx * k; rot[1] = Math.max(-75, Math.min(75, rot[1] - e.dy * k));
      proj.rotate(rot); render();
    }));
  svg.on('wheel', (e) => {
    if (state.view !== 'globe') return;
    e.preventDefault();
    zoomK = Math.max(0.8, Math.min(3.2, zoomK * (e.deltaY < 0 ? 1.08 : 0.93)));
    proj.scale(baseScale * zoomK); render();
  }, { passive: false });
  svg.on('click', () => { if (state.selected) select(null); });

  function showTip(e, html) {
    const r = $('#stage').getBoundingClientRect();
    tip.innerHTML = html; tip.hidden = false;
    let x = e.clientX - r.left + 14, y = e.clientY - r.top + 14;
    if (x > r.width - 250) x -= 270;
    tip.style.left = x + 'px'; tip.style.top = y + 'px';
  }
  function hideTip() { tip.hidden = true; }

  // ---------- layers control ----------
  function drawLayers() {
    const lg = $('#legend');
    const items = [['flows', 'Flows'], ['hotspots', 'Hotspots'], ['suppliers', 'Raw & tier-2'], ['plants', 'Plants'], ['sites', 'Install sites']];
    const box = document.createElement('div');
    box.className = 'layers';
    box.innerHTML = `<div class="lg-sep"></div><div class="lg-h">Layers</div>` + items.map(([k, l]) => `<label><input type="checkbox" data-l="${k}" checked> ${l}</label>`).join('');
    lg.appendChild(box);
    box.querySelectorAll('input').forEach(inp => inp.onchange = () => { state.layers[inp.dataset.l] = inp.checked; applyLayers(); });
  }

  // ---------- horizon ----------
  function drawHorizon() {
    const el = $('#horizon');
    const start = new Date('2026-09-24'), end = new Date('2026-12-31');
    const span = end - start;
    const pos = d => `calc(14px + (100% - 28px) * ${((new Date(d) - start) / span).toFixed(4)})`;
    let html = `<div class="hz-lbl">Next 90 days · decision points and dated events</div><div class="hz-axis"></div>`;
    ['2026-10-01', '2026-11-01', '2026-12-01'].forEach(d => { html += `<div class="hz-tick" style="left:${pos(d)}">${new Date(d).toLocaleString('en-GB', { month: 'short' })}</div>`; });
    html += `<div class="hz-today" style="left:${pos('2026-09-24')}"><span>Today</span></div>`;
    D.horizon.forEach((h, i) => {
      html += `<button class="hz-ev ${h.k}" data-i="${i}" style="left:${pos(h.d)}" aria-label="${esc(h.t)}"></button>`;
    });
    el.innerHTML = html;
    el.querySelectorAll('.hz-ev').forEach(b => {
      const h = D.horizon[+b.dataset.i];
      b.onmousemove = e => showTip(e, `<b>${new Date(h.d).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })} · ${esc(h.t)}</b><span>${h.k === 'ext' ? 'External, dated event' : 'Internal decision point (illustrative)'}</span>`);
      b.onmouseleave = hideTip;
      b.onclick = e => { e.stopPropagation(); select(h.hs); };
    });
  }

  // ---------- left brief ----------
  function drawBrief() {
    const P = D.products[state.product];
    const list = relevantHotspots();
    const decisions = list.filter(h => h.decideBy && (sevFor(h) === 'high' || sevFor(h) === 'med')).slice(0, 3);
    let html = `<div class="b-date">Thursday 24 September · morning brief</div>
      <div class="b-exposure">
        <div class="num">$${P.rar}<small>M</small></div>
        <div class="lbl">revenue at risk in the next 90 days${state.product === 'all' ? ' across the three lines' : ''}</div>
        <div class="sub"><span><b>${P.installs}</b> installs at risk</span><span><b>${decisions.length}</b> decisions due</span></div>
      </div>
      <div class="b-prose">${P.brief.map(p => `<p>${esc(p)}</p>`).join('')}</div>`;
    if (decisions.length) {
      html += `<div class="b-h"><span>Decisions this fortnight</span></div>`;
      decisions.forEach(h => {
        const o = h.options.find(o => o.rec) || h.options[0];
        html += `<div class="decide" data-h="${h.id}"><div class="when">By ${esc(h.decideBy)}</div><div class="dt">${esc(o.t)}</div><div class="dw">${esc(h.title)}</div></div>`;
      });
    } else {
      html += `<div class="b-h"><span>Decisions</span></div><p class="quiet">None needed. Next scheduled review 15 Oct.</p>`;
    }
    html += `<div class="b-h"><span>Signals, ranked by exposure</span><span>${list.length}</span></div>`;
    list.forEach(h => {
      const s = sevFor(h);
      html += `<div class="sig" data-h="${h.id}"><span class="sd ${s}"></span><div><div class="st">${esc(h.title)}</div><div class="sm">${esc(h.date)}</div></div><div class="sv ${s}">${SEVLBL[s]}</div></div>`;
    });
    html += `<div class="b-h"><span>Signal wire</span><span>last 30 days</span></div><div class="wire">${wire()}</div>`;
    $('#brief').innerHTML = html;
    $('#brief').querySelectorAll('[data-h]').forEach(el => el.onclick = () => select(el.dataset.h));
  }

  function wire() {
    const items = [
      ['24 Sep', 'The National', 'China’s rare-earth leverage looms over Trump–Xi talks', 'h_ree'],
      ['11 Sep', 'Al Jazeera', 'Houthis take control of Yemen’s Red Sea coast', 'h_bab'],
      ['31 Aug', 'Euronews', 'QatarEnergy extends LNG cancellations into November', 'h_rl'],
      ['28 Aug', 'Bloomberg', 'Hormuz traffic still halted', 'h_hz'],
      ['27 Aug', 'Tech Times', 'Boston Scientific cyberattack reported (single source)', 'h_cyber'],
      ['15 Aug', 'gCaptain', 'Panama Canal cuts max draft to 48.5 ft as El Niño strengthens', null]
    ];
    return items.map(([d, s, t, h]) => `<div class="wi" ${h ? `data-h="${h}"` : ''}><span class="wd">${d}</span><span class="wt">${esc(t)} <em>${esc(s)}</em></span></div>`).join('');
  }

  // ---------- right panel ----------
  function clockHTML(tts, ttr, plus, max = 200) {
    if (tts == null) return '';
    const w = v => Math.min(100, (v / max) * 100).toFixed(1) + '%';
    const gap = ttr - tts;
    const ok = gap <= 0;
    return `<div class="clock">
      <div class="clock-row"><span class="cl">Time to survive</span><div class="bar tts"><i style="width:${w(tts)}"></i></div><span class="cv">${tts} d</span></div>
      <div class="clock-row"><span class="cl">Time to recover</span><div class="bar ttr ${ok ? 'ok' : ''}"><i class="${plus ? 'plus' : ''}" style="width:${w(ttr)}"></i></div><span class="cv">${ttr}${plus ? '+' : ''} d</span></div>
      <div class="clock-verdict">${ok
        ? `<b class="ok">Covered.</b> We can outlast a disruption here by ${-gap} days.`
        : `<b class="gap">Exposed by ${gap}${plus ? '+' : ''} days.</b> Recovery outruns what we have on hand, so this needs action rather than monitoring.`}</div>
    </div>`;
  }

  function drawProduct() {
    const p = state.product;
    const P = D.products[p];
    if (p === 'all') {
      let html = `<div class="p-sec"><div class="p-cat">Portfolio view</div><div class="pv-title">Where the exposure sits</div><div class="pv-sub">Three product lines chosen to show high, medium and low exposure. Pick one to trace its journey from raw material to hospital.</div></div>`;
      ['mr', 'ct', 'us'].forEach(k => {
        const Q = D.products[k];
        html += `<div class="p-sec pcard" data-p="${k}" style="cursor:pointer">
          <div class="p-cat"><span class="sv ${Q.level}">${SEVLBL[Q.level]}</span><span>${esc(Q.short)}</span></div>
          <div style="display:flex;align-items:baseline;gap:14px;margin:8px 0 6px"><span style="font-family:var(--serif);font-size:${k === 'mr' ? 40 : k === 'ct' ? 30 : 22}px;font-weight:500;letter-spacing:-0.02em">${fmtM(Q.rar)}</span><span style="color:var(--muted);font-size:12.5px">at risk · ${Q.installs} installs</span></div>
          <div style="font-size:13px;color:var(--ink2);line-height:1.5">${esc(Q.brief[0])}</div></div>`;
      });
      $('#panel').innerHTML = html;
      $('#panel').querySelectorAll('.pcard').forEach(el => el.onclick = () => setProduct(el.dataset.p));
      return;
    }
    let html = `<div class="p-sec"><div class="p-cat"><span class="sv ${P.level}">${SEVLBL[P.level]} exposure</span></div>
      <div class="pv-title">${esc(P.name)}</div>
      <div class="pv-sub">${P.scheduled ? `${P.installs} of ${P.scheduled} scheduled installs at risk in 90 days` : 'No installs at risk'} · ${fmtM(P.rar)} revenue at risk</div></div>`;
    html += `<div class="p-sec"><div class="h4">Raw material to hospital <em>click a hotspot on the map to drill in</em></div><div class="journey">` +
      P.journey.map(j => `<div class="j"><span class="jd ${j.s}"></span><span class="jk">${esc(j.k)}</span><span class="jt">${esc(j.t)}</span></div>`).join('') + `</div></div>`;
    html += `<div class="p-sec"><div class="h4">Critical inputs <em>time to survive vs time to recover</em></div>` +
      P.inputs.map(inp => {
        const max = 260;
        const w = v => Math.min(100, (v / max) * 100).toFixed(1) + '%';
        const ok = inp.ttr <= inp.tts;
        return `<div class="inp ${inp.hs ? 'link' : ''}" ${inp.hs ? `data-h="${inp.hs}"` : ''}>
          <div class="in"><span>${esc(inp.name)}${inp.note ? ` <small>· ${esc(inp.note)}</small>` : ''}</span><small style="font-family:var(--mono);color:${ok ? 'var(--low)' : 'var(--high)'}">${ok ? 'covered' : `gap ${inp.ttr - inp.tts}${inp.ttrPlus ? '+' : ''} d`}</small></div>
          <div class="bars"><div class="bar tts"><i style="width:${w(inp.tts)}"></i></div><div class="bar ttr ${ok ? 'ok' : ''}"><i style="width:${w(inp.ttr)}"></i></div></div></div>`;
      }).join('') +
      `<div style="display:flex;gap:16px;margin-top:10px;font-size:11px;color:var(--muted)"><span><span style="display:inline-block;width:14px;height:6px;background:var(--ink2);margin-right:6px"></span>Survive</span><span><span style="display:inline-block;width:14px;height:6px;background:var(--high);margin-right:6px"></span>Recover (gap)</span><span><span style="display:inline-block;width:14px;height:6px;background:var(--low);margin-right:6px"></span>Recover (covered)</span></div></div>`;
    $('#panel').innerHTML = html;
    $('#panel').querySelectorAll('[data-h]').forEach(el => el.onclick = () => select(el.dataset.h));
  }

  function drawHotspot(id) {
    const h = HS[id];
    const s = sevFor(h) || Object.values(h.sev)[0];
    const extN = h.evidence.filter(e => e.k === 'ext').length, intN = h.evidence.length - extN;
    const conf = h.evidence.reduce((a, e) => a + e.c, 0) / h.evidence.length;
    let html = `<div class="p-sec">
      <button class="p-back" id="back">← ${state.product === 'all' ? 'Portfolio' : esc(D.products[state.product].short)}</button>
      <div class="p-cat"><span class="sv ${s}">${SEVLBL[s]}</span><span>${esc(h.cat)}</span><span>${esc(h.status)}</span></div>
      <div class="p-title">${esc(h.title)}</div>
      <div class="p-place"><b>${esc(h.place)}</b> · ${esc(h.date)}</div>
      <div class="p-head">${esc(h.headline)}</div>
      <p class="p-story">${esc(h.story)}</p>
    </div>`;
    if (h.video) {
      html += `<div class="p-sec"><div class="h4">Watch <em>${esc(h.video.ch)}</em></div>
        <div class="video" id="vid" style="background-image:url(https://i.ytimg.com/vi/${h.video.id}/hqdefault.jpg)">
        <div class="play"><i>▶</i><span>${esc(h.video.title)}<small>Plays here · <a href="https://www.youtube.com/watch?v=${h.video.id}" target="_blank" rel="noopener">open on YouTube</a></small></span></div></div></div>`;
    }
    html += `<div class="p-sec"><div class="h4">Why this was flagged <em>${extN} external · ${intN} internal · confidence ${Math.round(conf * 100)}%</em></div>
      <p class="why-sum">Flagged because <b>${h.evidence.length} independent signals</b> agree, and they intersect ${Object.keys(h.sev).map(k => D.products[k].short).join(' and ')}${h.tts != null && h.ttr > h.tts ? ' where recovery time exceeds stock on hand' : ''}.</p>` +
      h.evidence.map(e => `<div class="ev"><span class="kind ${e.k}">${e.k === 'ext' ? 'Source' : 'Internal'}</span><div><div class="et">${e.url ? `<a href="${e.url}" target="_blank" rel="noopener">${esc(e.t)}</a>` : esc(e.t)}</div><div class="em"><span>${esc(e.src)}</span><span class="conf" title="Confidence"><i style="width:${e.c * 100}%"></i></span></div></div></div>`).join('') + `</div>`;
    html += `<div class="p-sec"><div class="h4">How it reaches us</div><div class="cascade">` +
      h.cascade.map(c => `<div class="cs"><div class="ct">${esc(c.t)}</div><div class="cd">${esc(c.d)}</div></div>`).join('') + `</div></div>`;
    if (h.tts != null) {
      html += `<div class="p-sec" id="clockSec"><div class="h4">Survive vs recover <em>Simchi-Levi TTS / TTR</em></div><div id="clockWrap">${clockHTML(h.tts, h.ttr, h.ttrPlus)}</div>`;
      if (h.scenario) {
        const sc = h.scenario;
        const v = state.scen[h.id] ?? sc.base;
        html += `<div class="scen"><div class="h4" style="margin-top:18px">What if <em>${esc(sc.label)}</em></div>
          <input type="range" min="0" max="${sc.steps.length - 1}" step="1" value="${v}" id="scen">
          <div class="scen-steps">${sc.steps.map((t, i) => `<span data-i="${i}" class="${i === v ? 'on' : ''}">${esc(t)}</span>`).join('')}</div>
          <div class="scen-out" id="scenOut"></div></div>`;
      }
      html += `</div>`;
    }
    if (h.options.length) {
      html += `<div class="p-sec"><div class="h4">What we can do <em>costed options, recommended first</em></div>`;
      if (h.decideBy) html += `<div class="deadline"><b>Decide by ${esc(h.decideBy)}</b><span>${esc(h.decideWhy)}</span></div>`;
      html += h.options.map(o => `<div class="opt ${o.rec ? 'rec' : ''}"><div class="opt-top"><div class="opt-t">${esc(o.t)}</div>${o.rec ? '<span class="opt-rec">Recommended</span>' : ''}</div>
        <div class="opt-d">${esc(o.d)}</div>
        <div class="opt-m"><span>Cost<b>${esc(o.cost)}</b></span><span>Protects<b>${esc(o.gain)}</b></span><span>Regulatory<b>${esc(o.reg)}</b></span><span>Confidence<b>${esc(o.conf)}</b></span></div>
        <div class="opt-own">Owner: <b>${esc(o.owner)}</b></div></div>`).join('');
      if (h.drafts.length) {
        html += `<div class="h4" style="margin-top:18px">Have the agent draft it</div><div class="drafts">` +
          h.drafts.map(k => `<button class="btn ghost" data-draft="${k}">${esc(D.drafts[k].title.split(':')[0])}</button>`).join('') + `</div>`;
      }
      html += `</div>`;
    } else {
      html += `<div class="p-sec"><p class="quiet">${id === 'h_kum' ? 'Closed. Kept on the map so the system shows what it has stopped worrying about, not only what it has started to.' : 'Watch only. No action recommended; the agent re-scores this daily.'}</p></div>`;
    }
    const panel = $('#panel');
    panel.innerHTML = html;
    panel.scrollTop = 0;
    $('#back').onclick = () => select(null);
    const vid = $('#vid');
    if (vid) vid.onclick = e => {
      if (e.target.closest('a')) return;
      vid.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${h.video.id}?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen title="${esc(h.video.title)}"></iframe>`;
    };
    panel.querySelectorAll('[data-draft]').forEach(b => b.onclick = () => openDraft(b.dataset.draft));
    if (h.scenario) {
      const inp = $('#scen');
      const update = () => {
        const i = +inp.value; state.scen[h.id] = i;
        const sc = h.scenario, b = sc.base;
        const d = (v, bv, unit = '') => v === bv ? '' : `<span class="delta ${v > bv ? 'up' : 'down'}">${v > bv ? '+' : ''}${unit === '$' ? '$' + (v - bv) + 'M' : v - bv}</span>`;
        $('#scenOut').innerHTML = `<div><b>$${sc.rar[i]}M</b><span>revenue at risk</span>${d(sc.rar[i], sc.rar[b], '$')}</div>
          <div><b>${sc.installs[i]}</b><span>installs at risk</span>${d(sc.installs[i], sc.installs[b])}</div>
          <div><b>${sc.ttr[i]} d</b><span>time to recover</span>${d(sc.ttr[i], sc.ttr[b])}</div>`;
        panel.querySelectorAll('.scen-steps span').forEach(sp => sp.classList.toggle('on', +sp.dataset.i === i));
        $('#clockWrap').innerHTML = clockHTML(h.tts, sc.ttr[i], i >= b && h.ttrPlus);
      };
      inp.oninput = update; update();
    }
  }

  // ---------- draft modal ----------
  let typer;
  function openDraft(k) {
    const d = D.drafts[k];
    $('#modalTitle').textContent = d.title;
    $('#modalTo').textContent = d.to;
    const body = $('#modalBody');
    body.textContent = '';
    $('#modal').hidden = false;
    clearInterval(typer);
    let i = 0;
    const txt = d.body;
    typer = setInterval(() => {
      i = Math.min(txt.length, i + 9);
      body.innerHTML = esc(txt.slice(0, i)) + (i < txt.length ? '<span class="cursor"></span>' : '');
      if (i >= txt.length) clearInterval(typer);
    }, 16);
    $('#modalCopy').onclick = () => { navigator.clipboard?.writeText(txt); $('#modalCopy').textContent = 'Copied'; setTimeout(() => $('#modalCopy').textContent = 'Copy', 1400); };
    $('#modalApprove').textContent = 'Approve & route';
    $('#modalApprove').onclick = () => { $('#modalApprove').textContent = 'Routed for sign-off (demo)'; };
  }
  $('#modalClose').onclick = () => { $('#modal').hidden = true; clearInterval(typer); };
  $('#modal').onclick = e => { if (e.target.id === 'modal') $('#modalClose').onclick(); };
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { if (!$('#modal').hidden) $('#modalClose').onclick(); else if (state.selected) select(null); } });

  // ---------- state changes ----------
  function setProduct(p) {
    state.product = p;
    if (state.selected && !sevFor(HS[state.selected], p)) state.selected = null;
    nav.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.p === p));
    drawBrief();
    state.selected ? drawHotspot(state.selected) : drawProduct();
    restyle();
    const focus = { mr: [-40, 32], ct: [80, 30], us: [20, 35] }[p];
    if (focus && !state.selected) { state.rotating = false; flyTo(focus[0], focus[1]); }
  }
  function select(id) {
    state.selected = id;
    hideTip();
    if (id) {
      const h = HS[id];
      if (!sevFor(h)) { state.product = 'all'; nav.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.p === 'all')); drawBrief(); }
      state.rotating = false;
      flyTo(h.lon, h.lat);
      drawHotspot(id);
      if (window.innerWidth <= 1000) $('#panel').scrollIntoView({ behavior: 'smooth' });
    } else drawProduct();
    document.querySelectorAll('.hz-ev').forEach(b => b.classList.toggle('sel', D.horizon[+b.dataset.i].hs === id));
    restyle();
  }
  function setView(v) {
    state.view = v;
    document.querySelectorAll('.viewtoggle button').forEach(b => b.classList.toggle('on', b.dataset.view === v));
    makeProjection(); render();
  }

  // ---------- boot ----------
  makeProjection();
  drawStatic();
  drawLayers();
  drawHorizon();
  setProduct('all');
  render();
  requestAnimationFrame(tick);
  window.addEventListener('resize', () => { makeProjection(); render(); });

  d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json').then(topo => {
    land = topojson.feature(topo, topo.objects.countries);
    render();
  });

  // deep link: #h_rl or #mr
  const hash = location.hash.slice(1);
  if (HS[hash]) setTimeout(() => select(hash), 300);
  else if (D.products[hash]) setProduct(hash);
})();
