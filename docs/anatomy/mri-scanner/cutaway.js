// The magnet's layers for one cutaway pose. Plain script on purpose: build.mjs
// evaluates it in Node for the first frame, and the page inlines it to redraw
// the layers while the slider moves. `F` holds each layer's front edge (x, cm);
// a layer is drawn only where it stands out past the layer outside it.
function cutaway(k, G, P, C, F) {
  const { L, PACKS, PACK_R, HE_BACK, HALF, COVER_R } = C;
  const BORE = G.frameOf([0, 0, C.Z0], [1, 0, 0], [0, 1, 0], [0, 0, 1]);
  const at = (point) => k.iso(point, P);
  const S = (paths, style) => k.solidSvg(paths, style);
  const Ln = (d, style) => k.lineSvg(d, style);
  const Dots = (points, style) => k.dotsSvg(points, style);
  const EPS = 0.05;
  const ring = (s0, s1, rIn, rOut, opts = {}) => (s1 - s0 > EPS ? G.ringBand(s0, s1, rIn, rOut, BORE, P, opts) : null);
  const solid = (paths, style) => (paths ? S(paths, style) : "");
  const between = (from, to, step, lo, hi) => {
    const out = [];
    for (let s = from; s < to - 1e-6; s += step) if (s > lo && s < hi) out.push(s);
    return out;
  };
  // While the slider moves only one or two layers change, so each piece is kept
  // until the front edges it depends on move.
  const memo = cutaway.memo || (cutaway.memo = {});
  const once = (name, deps, build) => {
    const key = deps.map((d) => d.toFixed(3)).join(",");
    const held = memo[name];
    if (held && held.key === key && held.P === P) return held.out;
    const out = build();
    memo[name] = { key, P, out };
    return out;
  };
  // Content seen through a round opening: clipped to it, in the cavity's darker tones.
  const through = (name, s, r, inside) => {
    const id = `mr-clip-${name}`;
    const d = G.circleOf(BORE, s, r, P);
    return `<clipPath id="${id}"><path d="${d}"/></clipPath><g class="mr-cavity" clip-path="url(#${id})"><path class="mr-void" d="${d}"/>${inside}</g>` + Ln(d, { tone: "lo" });
  };
  // A pack of niobium-titanium windings: a faint line every few turns, layer rings on its face.
  const pack = (a, b, face = true) => {
    const turns = between(a + 1.1, b - 0.5, 1.3, -Infinity, Infinity).map((t) => G.arcOf(BORE, t, PACK_R[1], P));
    const paths = ring(a, b, PACK_R[0], PACK_R[1], { bevel: 0.4 });
    if (!paths) return "";
    return S(paths, { tone: "hi", lit: true, inner: Ln(turns.join(""), { tone: "lo" }) }) + (face ? Ln(G.circleOf(BORE, b, 51.4, P) + G.circleOf(BORE, b, 53.8, P), { tone: "faint" }) : "");
  };
  // The former carrying the packs, from s0 to s1, with every pack that lies in that span.
  const coils = (s0, s1) => {
    const [fIn, fOut] = L.former.r;
    const o = [];
    let s = s0;
    for (const [a, b] of PACKS) {
      const lo = Math.max(a, s0);
      const hi = Math.min(b, s1);
      if (hi - lo <= EPS) continue;
      o.push(solid(ring(s, lo, fIn, fOut), { tone: "mid" }), lo === a && hi === b ? once(`pack${a}`, [a, b], () => pack(a, b)) : pack(lo, hi, hi === b));
      s = hi;
    }
    o.push(solid(ring(s, s1, fIn, fOut), { tone: "mid" }));
    return o.join("");
  };

  // ---- Cover (drawn before the turret that sits on it) ----
  const cover = [];
  cover.push(once("cover", [F.cover], () => S(G.ringBand(-HALF, F.cover, L.cover.r[0], COVER_R, BORE, P, { bevel: 0.8 }), { tone: "mid", inner: Ln([-72, -58, F.cover - 8].filter((s, i) => s < F.cover - 4 && (i < 2 || s > -40)).map((s) => G.arcOf(BORE, s, COVER_R, P)).join(""), { tone: "faint" }) }) + Ln(G.circleOf(BORE, F.cover, 104, P), { tone: "faint" })));

  // ---- Everything inside it, back to front ----
  const o = [];
  // Vacuum vessel outer wall: steel, with a bolted end flange.
  o.push(once("vacuum", [F.cover, F.vacuum], () => {
    const o = [];
    if (F.vacuum - F.cover > EPS) {
      o.push(S(ring(F.cover, F.vacuum, ...L.vacuum.r), { tone: "mid" }));
      o.push(Dots(G.dotsOf(BORE, F.vacuum, 98, 64, P, { all: true }), { size: 0.4 }));
    }
    return o.join("");
  }));

  // Thermal shield: aluminium wrapped in layers of foil insulation.
  o.push(once("thermal", [F.vacuum, F.thermal], () => {
    const o = [];
    if (F.thermal - F.vacuum > EPS) {
      const mli = between(F.vacuum + 2, F.thermal - 1, 2, -Infinity, Infinity).map((s) => G.arcOf(BORE, s, 96, P));
      o.push(S(ring(F.vacuum, F.thermal, ...L.thermal.r), { tone: "lo", inner: Ln(mli.join(""), { tone: "faint" }) }));
      o.push(Ln(G.circleOf(BORE, F.thermal, 94, P), { tone: "faint" }));
    }
    return o.join("");
  }));

  // Helium vessel outer wall.
  o.push(once("helium", [F.thermal, F.helium], () => {
    const o = [];
    if (F.helium - F.thermal > EPS) {
      o.push(S(ring(F.thermal, F.helium, ...L.helium.r), { tone: "mid" }));
      o.push(Dots(G.dotsOf(BORE, F.helium, 89.5, 56, P, { all: true }), { size: 0.4 }));
    }
    return o.join("");
  }));

  // Cut open, it shows the coils: the far ones through the opening, the rest standing out.
  o.push(once("cavity", [F.helium, F.former, F.thermalIn, F.warmBore], () => {
    const o = [];
    if (F.former - F.helium > 0.5) {
      o.push(once("far", [F.helium], () => {
        const [, fOut] = L.former.r;
        const inner = [S(G.ringBand(HE_BACK - 4, HE_BACK, fOut, L.helium.r[0], BORE, P), { tone: "mid" })];
        inner.push(Ln(between(-70, F.helium - 6, 18, -Infinity, Infinity).map((t) => G.arcOf(BORE, t, L.helium.r[0], P, { inward: true })).join(""), { tone: "faint" }));
        inner.push(coils(HE_BACK, F.helium));
        return through("cavity", F.helium, L.helium.r[0], inner.join(""));
      }));
      o.push(coils(F.helium, F.former));
    }
    // Inner walls of the cryostat: thermal shield, then the warm bore at room temperature.
    o.push(solid(ring(F.former, F.thermalIn, ...L.thermalIn.r), { tone: "lo" }));
    o.push(solid(ring(F.thermalIn, F.warmBore, ...L.warmBore.r), { tone: "mid" }));
    return o.join("");
  }));
  // Gradient coil: three coils potted in one epoxy cylinder, with shim pockets in its face.
  o.push(once("gradient", [F.warmBore, F.gradient, F.screen], () => {
    const o = [];
    if (F.gradient - F.warmBore > EPS) {
      const zTurns = [11, 8.5, 5, 2.5].map((d) => F.gradient - d).filter((s) => s > F.warmBore + 0.5).map((s) => G.arcOf(BORE, s, L.gradient.r[1], P));
      o.push(S(ring(F.warmBore, F.gradient, ...L.gradient.r, { bevel: 0.5 }), { tone: "hi", inner: Ln(zTurns.join(""), { tone: "faint" }) }));
      const pockets = [];
      for (let i = 0; i < C.shims; i++) {
        const t = (i / C.shims) * Math.PI * 2;
        const corners = [[36.2, t - 0.06], [38.8, t - 0.06], [38.8, t + 0.06], [36.2, t + 0.06]].map(([r, a]) => at(G.pointOf(BORE, F.gradient, r, a)));
        pockets.push(`M${corners.map(([px, py]) => `${px.toFixed(1)} ${py.toFixed(1)}`).join("L")}Z`);
      }
      o.push(Ln(pockets.join(""), { tone: "lo" }));
    }
    // RF screen: copper foil between the gradient and the body coil.
    o.push(solid(ring(F.gradient, F.screen, ...L.screen.r), { tone: "lo" }));
    return o.join("");
  }));
  // RF body coil: a birdcage of rungs between two end rings, a capacitor on every rung.
  o.push(once("rf", [F.screen, F.rf], () => {
    const o = [];
    const [rIn, rOut] = L.rf.r;
    if (F.rf - F.screen >= 4.5) {
      const a = F.screen + 2;
      const b = F.rf - 2;
      o.push(S(ring(F.screen, a, rIn, rOut + 0.6), { tone: "hi" }));
      const rungs = G.ribsOf(BORE, a, b, rOut, C.rungs, P, { fade: [0.1, 0.55], phase: Math.PI / C.rungs });
      o.push(S(ring(a, b, rIn, rOut), { tone: "mid", inner: k.fadedSvg(rungs, { tone: "hi" }) }));
      o.push(Dots(G.dotsOf(BORE, (a + b) / 2, rOut + 0.2, C.rungs, P, { phase: Math.PI / C.rungs, fade: [0.04, 0.42] }), { size: 0.55, tone: "hi" }));
      o.push(S(ring(b, F.rf, rIn, rOut + 0.6), { tone: "hi" }));
    } else o.push(solid(ring(F.screen, F.rf, rIn, rOut), { tone: "hi" }));
    return o.join("");
  }));
  // Bore liner: the smooth tube the patient sees, and the dark bore itself.
  o.push(once("liner", [F.rf], () => {
    const o = [];
    o.push(solid(ring(F.rf, HALF, ...L.liner.r, { bevel: 0.4 }), { tone: "mid" }));
    o.push(through("bore", HALF, L.liner.r[0], Ln([62, 30, 0].map((t) => G.arcOf(BORE, t, L.liner.r[0], P, { inward: true })).join(""), { tone: "faint" })));
    return o.join("");
  }));
  return { cover: cover.join(""), rest: o.join("") };
}
