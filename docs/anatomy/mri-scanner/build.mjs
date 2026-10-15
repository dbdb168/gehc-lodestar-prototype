// An MRI scanner, cut back layer by layer along its bore.
// World units are centimetres: x runs along the bore (the patient end is +x), y across, z up.
// Built with the Anatomy skill (skills.wheresryan.sh/anatomy): copy this file to the skill's
// examples/mri-scanner/ folder and run `node build.mjs` (add --light for the light theme).
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "../../kit/iso-kit.mjs";
import * as G from "../../kit/lathe.mjs";
import { tubePieces, tubeSvg } from "../../kit/tube.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const THEME = process.argv.includes("--light") ? "light" : "dark";
const DEG = Math.PI / 180;

// ---- Truth -------------------------------------------------------------
// One small model; the readout, legend and caption all read from it.
const MODEL = {
  field: 1.5, // tesla, B0 along the bore
  gamma: 42.577, // MHz per tesla for hydrogen-1
  helium: 4.2, // kelvin, liquid helium at one atmosphere
  shield: 50, // kelvin, thermal shield on the cold head's first stage
  bore: 60, // cm, patient bore diameter
  length: 170, // cm, magnet length end to end
  gradient: 45, // mT/m, peak gradient strength
  rungs: 16, // birdcage body coil rungs
  shims: 16, // passive shim tray pockets
};
const larmor = MODEL.field * MODEL.gamma; // 63.9 MHz

// ---- Layout ------------------------------------------------------------
const W = 760;
const H = 470;
const AZIMUTH = 52;
const ELEVATION = 24;
const Z0 = 116; // bore axis height above the plinth top
const HALF = MODEL.length / 2; // 85
const COVER_R = 108;

// Layers, outside in. Each is a ring [rIn, rOut] that runs from the back of
// the magnet to `front`; inner layers are cut back less, so they step out.
const L = {
  cover: { r: [100, COVER_R], front: -50 },
  vacuum: { r: [96, 100], front: -40 },
  thermal: { r: [92, 96], front: -30 },
  helium: { r: [87, 92], front: -16 },
  former: { r: [45, 49], front: 40 },
  thermalIn: { r: [43, 45], front: 46 },
  warmBore: { r: [41, 43], front: 52 },
  gradient: { r: [34, 41], front: 66 },
  screen: { r: [33, 34], front: 68 },
  rf: { r: [31, 33], front: 78 },
  liner: { r: [MODEL.bore / 2, 31], front: HALF },
};
// Main coil packs on the former (the visible half of six symmetric coils).
const PACK_R = [49, 56];
const PAIRS = [
  [4, 10],
  [18, 25],
  [31, 40],
];
const PACKS = [...PAIRS.map(([a, b]) => [-b, -a]).reverse(), ...PAIRS];
const HE_BACK = -80; // inner face of the helium vessel's back end plate

const PLATE = { x: -168, y: -128, w: 392, d: 256, r: 10 };
const PLATE_H = 12;
const FOOT_H = 5;

const TURRET = [-68, -4]; // cold head turret on top of the cover
const TABLE = { x: 88, top: Z0 - 16 };

const P = k.fitProjection(
  [
    ...k.boxCorners(PLATE, -PLATE_H - FOOT_H, 0),
    [-HALF, 0, Z0 + COVER_R + 92],
    [-HALF, -COVER_R, Z0 + COVER_R],
    [-HALF, COVER_R, Z0 + COVER_R],
  ],
  W,
  H,
  { pad: 30, azimuth: AZIMUTH, elevation: ELEVATION },
);
const V = G.viewOf(P);
const at = (point) => k.iso(point, P);
const S = (paths, style) => k.solidSvg(paths, style);
const Ln = (d, style) => k.lineSvg(d, style);
const Dots = (points, style) => k.dotsSvg(points, style);
const Faded = (list, style) => k.fadedSvg(list, style);
const FADE = [0.04, 0.42];
const byDepth = (points) => [...points].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));

// The bore frame: s along +x, angle 0 toward +y, angle 90° straight up.
const BORE = G.frameOf([0, 0, Z0], [1, 0, 0], [0, 1, 0], [0, 0, 1]);
const ring = (s0, s1, rIn, rOut, opts = {}) => G.ringBand(s0, s1, rIn, rOut, BORE, P, opts);
const voidOf = (s, r) => `<path class="mr-void" d="${G.circleOf(BORE, s, r, P)}"/>` + Ln(G.arcOf(BORE, s, r, P, { inward: true, least: -1 }), { tone: "lo" });
// Content seen through a round opening: clipped to the opening, in the cavity's own darker tones.
let clips = 0;
const through = (s, r, inside) => {
  const id = `mr-clip-${++clips}`;
  const d = G.circleOf(BORE, s, r, P);
  return `<clipPath id="${id}"><path d="${d}"/></clipPath><g class="mr-cavity" clip-path="url(#${id})"><path class="mr-void" d="${d}"/>${inside}</g>` + Ln(d, { tone: "lo" });
};

const out = [];

// ---- Plinth ------------------------------------------------------------
function plinth() {
  const o = [`<path class="iso-halo" d="${k.haloOf(PLATE, -PLATE_H - FOOT_H, PLATE_H, P)}"/>`];
  for (const [x, y] of byDepth(k.corners(PLATE, 24))) {
    o.push(S(k.cylinder(x, y, 8, -PLATE_H - FOOT_H, 1.6, P, 28), { tone: "lo" }));
    o.push(S(k.cylinder(x, y, 6.2, -PLATE_H - FOOT_H + 1.6, FOOT_H - 1.6, P, 28), { tone: "mid" }));
  }
  o.push(S(k.slabOf(PLATE, -PLATE_H, PLATE_H, P, 8, 1.6), { tone: "mid" }));
  o.push(Ln(k.planOutline(k.insetPlan(PLATE, 5), 0, P), { tone: "lo" }));
  const screws = k.corners(PLATE, 11);
  o.push(Ln(screws.map(([x, y]) => k.ring(x, y, 2.4, 0, P, 16)).join(""), { tone: "lo" }));
  o.push(Dots(screws.map(([x, y]) => at([x, y, 0])), { size: 0.5 }));
  // A centimetre ruler along the near edge, a major tick every 25 cm.
  const strip = { x: -150, y: PLATE.y + PLATE.d - 17, w: 360, d: 8, r: 1 };
  o.push(S(k.slabOf(strip, 0, 0.6, P, 3), { tone: "lo", crease: "none" }));
  const ticks = k.topTicks(strip.x + 2, strip.x + strip.w - 2, 5, 5, strip.y + 0.8, 0.6, [2.2, 4.2], P);
  o.push(Ln(ticks.minor, { tone: "lo" }), Ln(ticks.major, { tone: "mid" }));
  o.push(Dots([at([strip.x + 1.2, strip.y + 4, 0.6]), at([strip.x + strip.w - 1.2, strip.y + 4, 0.6])], { size: 0.45 }));
  // Label plate, engraved with the field strength.
  const label = { x: 150, y: -112, w: 44, d: 22, r: 2 };
  o.push(S(k.slabOf(label, 0, 0.8, P, 4), { tone: "lo", crease: "none" }));
  o.push(Ln(k.planOutline(k.insetPlan(label, 1.8), 0.8, P, 4), { tone: "faint" }));
  o.push(k.faceTextSvg(k.topMatrix([label.x + label.w / 2, label.y + 9], 0.8, P, "x"), `${MODEL.field.toFixed(1)} T`, { size: 6, tone: "mid", anchor: "middle" }));
  o.push(Ln(k.lineOnTop([label.x + 6, label.y + 14], [label.x + 34, label.y + 14], 0.8, P) + k.lineOnTop([label.x + 6, label.y + 17], [label.x + 26, label.y + 17], 0.8, P), { tone: "lo", free: true }));
  o.push(Dots([at([label.x + 3, label.y + 3, 0.8]), at([label.x + label.w - 3, label.y + label.d - 3, 0.8])], { size: 0.4 }));
  return o.join("");
}

// ---- Feet under the cover ---------------------------------------------
function feet() {
  const o = [`<path class="iso-halo" d="${k.haloOf({ x: -HALF, y: -70, w: HALF * 2, d: 140, r: 30 }, 0, 0.5, P)}" style="filter:blur(6px)"/>`];
  for (const x of [-80, -62]) {
    const plan = { x: x - 6, y: -14, w: 12, d: 28, r: 2 };
    o.push(S(k.slabOf({ x: plan.x - 3, y: plan.y - 3, w: plan.w + 6, d: plan.d + 6, r: 3 }, 0, 2, P, 3, 0.4), { tone: "lo" }));
    o.push(S(k.slabOf(plan, 2, Z0 - COVER_R - 2, P, 3, 0.4), { tone: "mid" }));
    o.push(Dots([at([plan.x - 1.5, plan.y - 1.5, 2]), at([plan.x + plan.w + 1.5, plan.y + plan.d + 1.5, 2])], { size: 0.4 }));
  }
  return o.join("");
}

// ---- Cold head turret, hoses and quench vent ---------------------------
const TF = G.frameOf([TURRET[0], TURRET[1], Z0], [0, 0, 1], [1, 0, 0], [0, 1, 0]);
const PAD_R = 20;
const PAD_TOP = COVER_R + 3; // s along the turret frame, from the bore axis
const COMP = { x: -162, y: -118, w: 46, d: 66, r: 3 };
const COMP_H = 44;
const PORTS = [[-140, -100], [-140, -84]];
function compressor() {
  // Helium compressor on the plinth behind the magnet: it drives the cold head.
  const o = [`<path class="iso-halo" d="${k.haloOf(COMP, 0, 1, P)}" style="filter:blur(3px)"/>`];
  o.push(S(k.slabOf(COMP, 0, COMP_H, P, 4, 0.8), { tone: "mid", inner: Ln(k.sideSeam(COMP, 8, P, 4) + k.sideSeam(COMP, COMP_H - 6, P, 4), { tone: "faint" }) }));
  const grille = { x: COMP.x + 6, y: COMP.y + 34, w: 34, d: 26, r: 2 };
  o.push(Ln(k.planOutline(grille, COMP_H, P, 3), { tone: "lo" }));
  o.push(Dots(k.dotGrid(grille.x + 3, grille.y + 3, 8, 6, 4, COMP_H, P), { size: 0.4, tone: "lo" }));
  for (const [x, y] of PORTS) {
    o.push(S(k.cylinder(x, y, 4.2, COMP_H, 2, P, 24), { tone: "mid" }));
    o.push(S(k.cylinder(x, y, 3, COMP_H + 2, 3, P, 20), { tone: "mid" }));
  }
  o.push(Dots([at([COMP.x + 3, COMP.y + 3, COMP_H]), at([COMP.x + COMP.w - 3, COMP.y + 3, COMP_H]), at([COMP.x + 3, COMP.y + COMP.d - 3, COMP_H]), at([COMP.x + COMP.w - 3, COMP.y + COMP.d - 3, COMP_H])], { size: 0.45 }));
  return o.join("");
}
function hoses() {
  // Two braided helium lines, supply and return, from the turret to the compressor.
  const o = [];
  const base = Z0 + PAD_TOP;
  PORTS.forEach(([px, py], i) => {
    const y = TURRET[1] - 5 + i * 8;
    const start = [TURRET[0] - 18, y, base + 15];
    o.push(S(G.disc(0, 3.2, 3.2, G.frameAlong([TURRET[0] - 14.8, y, base + 15], [-1, 0, 0]), P), { tone: "mid" }));
    const route = G.fillet([start, [-108, y, base + 15], [px, py, 112], [px, py, COMP_H + 5]], 12, 14);
    for (const piece of tubePieces(route, 2.1, P, { maxLength: 400, caps: [false, true], rings: { pitch: 1.6, twist: 0.6, cross: true, tone: "lo" } }))
      o.push(tubeSvg(piece, { tone: "mid" }));
  });
  return o.join("");
}
function turret() {
  const o = [];
  const [x, y] = TURRET;
  o.push(`<path class="iso-halo" d="${G.circleOf(TF, PAD_TOP, PAD_R + 2, P)}" style="filter:blur(3px)"/>`);
  o.push(S(G.saddleOf(TF, PAD_R, COVER_R, PAD_TOP, P), { tone: "mid" }));
  const base = Z0 + PAD_TOP;
  o.push(S(k.cylinder(x, y, PAD_R + 2, base, 3, P, 64, 0.6), { tone: "mid" }));
  o.push(Dots(G.dotsOf(TF, PAD_TOP + 3, PAD_R - 0.4, 16, P, { all: true }), { size: 0.45 }));
  // Service turret neck, with its seam rings.
  o.push(S(k.cylinder(x, y, 15, base + 3, 24, P, 56), { tone: "mid", crease: "none" }));
  o.push(Ln([base + 9, base + 21].map((z) => k.sideArc(x, y, 15, z, P, 40)).join(""), { tone: "faint" }));
  // Hose ports on the back, feeding the braided lines.
  o.push(S(k.cylinder(x, y, 17, base + 27, 3, P, 64, 0.6), { tone: "mid" }));
  o.push(Dots(G.dotsOf(TF, PAD_TOP + 30, 15.6, 12, P, { all: true }), { size: 0.42 }));
  // Quench vent: a stack to the roof, with a burst-disc flange.
  const q = [x - 7, y - 8];
  o.push(S(k.cylinder(q[0], q[1], 5, base + 30, 4, P, 32), { tone: "mid" }));
  o.push(S(k.cylinder(q[0], q[1], 3.6, base + 34, 36, P, 32), { tone: "mid", crease: "none" }));
  o.push(Ln(k.sideArc(q[0], q[1], 3.6, base + 52, P, 20), { tone: "faint" }));
  o.push(S(k.cylinder(q[0], q[1], 6.4, base + 70, 2.4, P, 36, 0.4), { tone: "mid" }));
  o.push(Dots(G.dotsOf(G.frameOf([q[0], q[1], 0], [0, 0, 1], [1, 0, 0], [0, 1, 0]), base + 72.4, 5, 6, P, { all: true }), { size: 0.38 }));
  // Two-stage cold head: motor housing with cooling fins and a cap.
  const ch = [x + 2, y + 4];
  o.push(S(k.cylinder(ch[0], ch[1], 10, base + 30, 26, P, 48), { tone: "hi", crease: "none" }));
  o.push(Ln(Array.from({ length: 9 }, (_, i) => k.sideArc(ch[0], ch[1], 10, base + 33 + i * 2.4, P, 32)).join(""), { tone: "lo" }));
  o.push(S(k.cylinder(ch[0], ch[1], 11, base + 56, 3, P, 48, 0.5), { tone: "hi" }));
  o.push(S(k.cylinder(ch[0], ch[1], 4, base + 59, 2.4, P, 24), { tone: "mid" }));
  o.push(Ln(k.ring(ch[0], ch[1], 7.6, base + 59, P, 32), { tone: "faint" }));
  // Helium fill port with a cap.
  const fill = [x + 11, y - 5];
  o.push(S(k.cylinder(fill[0], fill[1], 2.6, base + 30, 5, P, 20), { tone: "mid" }));
  o.push(S(k.cylinder(fill[0], fill[1], 3.4, base + 35, 2, P, 20), { tone: "mid" }));
  o.push(Ln(k.knurl(fill[0], fill[1], 3.4, base + 35, base + 37, 14, P, 0.3), { tone: "lo" }));
  return o.join("");
}

// ---- The magnet, back to front along the bore --------------------------
function magnet() {
  const o = [];
  const back = -HALF;
  // Cover: the outer shell, with two seams and a front lip.
  o.push(S(ring(back, L.cover.front, ...L.cover.r, { bevel: 0.8 }), { tone: "mid", inner: Ln(G.arcOf(BORE, -72, COVER_R, P) + G.arcOf(BORE, -58, COVER_R, P), { tone: "faint" }) }));
  o.push(Ln(G.circleOf(BORE, L.cover.front, 104, P), { tone: "faint" }));
  return o.join("");
}
function cryostat() {
  const o = [];
  // Vacuum vessel outer wall: steel, bolted end flange.
  o.push(S(ring(L.cover.front, L.vacuum.front, ...L.vacuum.r), { tone: "mid" }));
  o.push(Dots(G.dotsOf(BORE, L.vacuum.front, 98, 64, P, { all: true }), { size: 0.4 }));
  // Thermal shield: aluminium wrapped in layers of foil insulation.
  o.push(S(ring(L.vacuum.front, L.thermal.front, ...L.thermal.r), { tone: "lo", inner: Ln([-38, -36, -34, -32].map((s) => G.arcOf(BORE, s, 96, P)).join(""), { tone: "faint" }) }));
  o.push(Ln(G.circleOf(BORE, L.thermal.front, 94, P), { tone: "faint" }));
  // Helium vessel outer wall, cut to show the coils inside.
  o.push(S(ring(L.thermal.front, L.helium.front, ...L.helium.r), { tone: "mid" }));
  o.push(Dots(G.dotsOf(BORE, L.helium.front, 89.5, 56, P, { all: true }), { size: 0.4 }));
  // Through the cut: the back end plate, the far coils and the vessel's inner wall.
  const [fIn, fOut] = L.former.r;
  const inner = [S(ring(HE_BACK - 4, HE_BACK, fOut, L.helium.r[0]), { tone: "mid" })];
  inner.push(Ln([-70, -52].map((t) => G.arcOf(BORE, t, L.helium.r[0], P, { inward: true })).join(""), { tone: "faint" }));
  let s = HE_BACK;
  for (const [a, b] of PACKS.filter(([, b]) => b < L.helium.front)) {
    inner.push(S(ring(s, a, fIn, fOut), { tone: "mid" }), pack(a, b));
    s = b;
  }
  inner.push(S(ring(s, L.helium.front, fIn, fOut), { tone: "mid" }));
  o.push(through(L.helium.front, L.helium.r[0], inner.join("")));
  return o.join("");
}
// A pack of niobium-titanium windings: a faint line every few turns, layer rings on its face.
function pack(a, b) {
  const turns = [];
  for (let t = a + 1.1; t < b - 0.5; t += 1.3) turns.push(G.arcOf(BORE, t, PACK_R[1], P));
  return S(ring(a, b, ...PACK_R, { bevel: 0.4 }), { tone: "hi", lit: true, inner: Ln(turns.join(""), { tone: "lo" }) }) + Ln(G.circleOf(BORE, b, 51.4, P) + G.circleOf(BORE, b, 53.8, P), { tone: "faint" });
}
function coldMass() {
  const o = [];
  const [fIn, fOut] = L.former.r;
  let s = L.helium.front;
  for (const [a, b] of PACKS.filter(([a]) => a > L.helium.front)) {
    o.push(S(ring(s, a, fIn, fOut), { tone: "mid" }), pack(a, b));
    s = b;
  }
  o.push(S(ring(s, L.former.front, fIn, fOut), { tone: "mid" }));
  return o.join("");
}
function bore() {
  const o = [];
  o.push(S(ring(L.former.front, L.thermalIn.front, ...L.thermalIn.r), { tone: "lo" }));
  o.push(S(ring(L.thermalIn.front, L.warmBore.front, ...L.warmBore.r), { tone: "mid" }));
  // Gradient coil: three coils potted in one epoxy cylinder, with shim pockets in its face.
  const zTurns = [55, 57.5, 61, 63.5].map((t) => G.arcOf(BORE, t, L.gradient.r[1], P)).join("");
  o.push(S(ring(L.warmBore.front, L.gradient.front, ...L.gradient.r, { bevel: 0.5 }), { tone: "hi", inner: Ln(zTurns, { tone: "faint" }) }));
  const pockets = [];
  for (let i = 0; i < MODEL.shims; i++) {
    const t = (i / MODEL.shims) * Math.PI * 2;
    const w = 0.06;
    const corners = [
      [36.2, t - w],
      [38.8, t - w],
      [38.8, t + w],
      [36.2, t + w],
    ].map(([r, a]) => at(G.pointOf(BORE, L.gradient.front, r, a)));
    pockets.push(`M${corners.map(([px, py]) => `${px.toFixed(1)} ${py.toFixed(1)}`).join("L")}Z`);
  }
  o.push(Ln(pockets.join(""), { tone: "lo" }));
  // RF screen: copper foil between the gradient and the body coil.
  o.push(S(ring(L.gradient.front, L.screen.front, ...L.screen.r), { tone: "lo" }));
  // RF body coil: a 16-rung birdcage between two end rings, a capacitor on every rung.
  const [rIn, rOut] = L.rf.r;
  o.push(S(ring(L.screen.front, L.screen.front + 2, rIn, rOut + 0.6), { tone: "hi" }));
  const rungs = G.ribsOf(BORE, L.screen.front + 2, L.rf.front - 2, rOut, MODEL.rungs, P, { fade: [0.1, 0.55], phase: Math.PI / MODEL.rungs });
  o.push(S(ring(L.screen.front + 2, L.rf.front - 2, rIn, rOut), { tone: "mid", inner: Faded(rungs, { tone: "hi" }) }));
  o.push(Dots(G.dotsOf(BORE, (L.screen.front + L.rf.front) / 2, rOut + 0.2, MODEL.rungs, P, { phase: Math.PI / MODEL.rungs, fade: FADE }), { size: 0.55, tone: "hi" }));
  o.push(S(ring(L.rf.front - 2, L.rf.front, rIn, rOut + 0.6), { tone: "hi" }));
  // Bore liner: the smooth tube the patient sees, and the dark bore itself.
  o.push(S(ring(L.rf.front, L.liner.front, ...L.liner.r, { bevel: 0.4 }), { tone: "mid" }));
  o.push(through(L.liner.front, L.liner.r[0], Ln([62, 30, 0].map((t) => G.arcOf(BORE, t, L.liner.r[0], P, { inward: true })).join(""), { tone: "faint" })));
  return o.join("");
}

// ---- Patient table -----------------------------------------------------
function table() {
  const o = [];
  const x0 = TABLE.x;
  const base = { x: x0 + 40, y: -26, w: 74, d: 52, r: 4 };
  o.push(`<path class="iso-halo" d="${k.haloOf(base, 0, 1, P)}" style="filter:blur(4px)"/>`);
  o.push(S(k.slabOf(base, 0, 9, P, 4, 0.8), { tone: "mid" }));
  o.push(Ln(k.planOutline(k.insetPlan(base, 4), 9, P, 4), { tone: "faint" }));
  o.push(Dots(k.corners(base, 4).map(([x, y]) => at([x, y, 9])), { size: 0.45 }));
  // Lift column with a bellows cover.
  const col = { x: x0 + 58, y: -16, w: 36, d: 32, r: 3 };
  o.push(S(k.slabOf(col, 9, 5, P, 3, 0.5), { tone: "mid" }));
  const bellowsTop = TABLE.top - 14;
  o.push(S(k.slabOf(k.insetPlan(col, 2), 14, bellowsTop - 14, P, 3), { tone: "lo", crease: "none", inner: Ln(Array.from({ length: Math.floor((bellowsTop - 18) / 4) }, (_, i) => k.sideSeam(k.insetPlan(col, 2), 17 + i * 4, P, 3)).join(""), { tone: "faint" }) }));
  o.push(S(k.slabOf(col, bellowsTop, 5, P, 3, 0.5), { tone: "mid" }));
  // Carriage, cradle and mattress.
  const carriage = { x: x0 + 6, y: -24, w: 128, d: 48, r: 4 };
  o.push(S(k.slabOf(carriage, bellowsTop + 5, TABLE.top - 4 - bellowsTop - 5, P, 4, 0.6), { tone: "mid", inner: Ln(k.sideSeam(carriage, bellowsTop + 7, P, 4), { tone: "faint" }) }));
  // Pendant buttons on the near side.
  const face = carriage.y + carriage.d;
  o.push(Ln([x0 + 112, x0 + 119, x0 + 126].map((x) => G.circleOf(G.frameOf([x, face, TABLE.top - 8], [0, 1, 0], [1, 0, 0], [0, 0, 1]), 0, 1.4, P, 16)).join(""), { tone: "mid" }));
  o.push(Dots([at([x0 + 126, face, TABLE.top - 8])], { size: 0.6, tone: "hi" }));
  const cradle = { x: x0, y: -22, w: 140, d: 44, r: 6 };
  o.push(S(k.slabOf(cradle, TABLE.top - 4, 4, P, 6, 0.6), { tone: "mid" }));
  const mattress = { x: x0 + 2, y: -19, w: 136, d: 38, r: 8 };
  o.push(S(k.slabOf(mattress, TABLE.top, 3, P, 8, 1.2), { tone: "hi" }));
  // Two patient straps across the mattress, each with a buckle.
  for (const x of [x0 + 84, x0 + 116]) {
    o.push(S(k.slabOf({ x, y: mattress.y - 0.6, w: 5, d: mattress.d + 1.2, r: 0.6 }, TABLE.top + 3, 0.5, P, 2), { tone: "mid", crease: "none" }));
    o.push(S(k.slabOf({ x: x - 0.8, y: 4, w: 6.6, d: 5, r: 0.8 }, TABLE.top + 3.5, 0.7, P, 2), { tone: "mid" }));
  }
  // Head coil: a small birdcage resting on the mattress, at the bore end.
  const HF = G.frameOf([x0 + 40, 0, TABLE.top + 3 + 13], [1, 0, 0], [0, 1, 0], [0, 0, 1]);
  o.push(S(G.ringBand(0, 2, 10.5, 13.6, HF, P), { tone: "hi" }));
  const ribs = G.ribsOf(HF, 2, 22, 13, 12, P, { fade: [0.1, 0.55] });
  o.push(S(G.ringBand(2, 22, 10.5, 13, HF, P), { tone: "mid", inner: Faded(ribs, { tone: "hi" }) }));
  o.push(S(G.ringBand(22, 24, 10.5, 13.6, HF, P), { tone: "hi" }));
  o.push(`<path class="mr-void" d="${G.circleOf(HF, 24, 10.5, P)}"/>` + Ln(G.arcOf(HF, 24, 10.5, P, { inward: true, least: -1 }), { tone: "lo" }));
  return o.join("");
}

out.push(plinth(), compressor(), feet(), hoses(), magnet(), turret(), cryostat(), coldMass(), bore(), table());

const LABEL =
  `A ${MODEL.field} tesla MRI scanner on a plinth, cut back layer by layer along its ${MODEL.bore} cm bore. From the outside in: the cover; the cryostat's vacuum vessel, ${MODEL.shield} kelvin thermal shield and helium vessel; the superconducting main coils on their former; the warm bore; the gradient coil with shim pockets; the RF screen; a ${MODEL.rungs}-rung birdcage body coil; and the bore liner. A cold head turret with its helium lines and quench vent sits on top, and a patient table with a head coil waits in front of the bore.`;

const svg = k.figureSvg({ width: W, height: H, label: LABEL, body: out });
const CSS = `
.mr-void{fill:var(--mr-void);stroke:none}
.iso{--mr-void:#08080a}
.iso[data-theme="light"]{--mr-void:#bdbdb9}
.iso .mr-cavity{--mr-void:#060607;--anatomy-paper:#0d0d0d;--anatomy-face:#121212;--anatomy-top:#141414;--anatomy-shade-0:#0a0a0a;--anatomy-shade-1:#0c0c0c;--anatomy-shade-2:#0e0e0e;--anatomy-shade-3:#101010;--anatomy-hi:#8c8c8c;--anatomy-mid:#4a4a4a;--anatomy-lo:#2c2c2c;--anatomy-faint:#1e1e1e;--anatomy-lit:#b8b8b8}
.iso[data-theme="light"] .mr-cavity{--mr-void:#b9b9b5;--anatomy-paper:#c6c6c2;--anatomy-face:#d0d0cc;--anatomy-top:#d4d4d0;--anatomy-shade-0:#b6b6b2;--anatomy-shade-1:#bcbcb8;--anatomy-shade-2:#c2c2be;--anatomy-shade-3:#c8c8c4;--anatomy-hi:#4a4a4e;--anatomy-mid:#86868a;--anatomy-lo:#a2a2a5;--anatomy-faint:#b0b0b2;--anatomy-lit:#2a2a2e}
`;
const body = k.plateHtml({
  fig: "Fig 1",
  title: "MRI scanner",
  hint: "Cut back, outside in",
  readout: `B₀ ${MODEL.field.toFixed(1)} T · ${larmor.toFixed(1)} MHz · ${MODEL.helium} K`,
  keys: [
    { mark: "lit", label: `Main coils: niobium-titanium, superconducting at ${MODEL.helium} K` },
    { mark: "raised", label: "Gradient and RF body coils, closest to the patient" },
    { mark: "flat", label: "Cryostat: vacuum vessel, thermal shield, helium vessel" },
  ],
  caption: `A ${MODEL.field} T scanner, drawn in centimetres. Current circulating without loss in the main coils makes a steady field along the bore, so hydrogen nuclei precess at ${larmor.toFixed(1)} MHz (${MODEL.gamma} MHz per tesla). The gradient coil adds fields up to about ${MODEL.gradient} mT/m that make that frequency depend on position, and the birdcage body coil sends and hears the ${larmor.toFixed(1)} MHz pulses. The coils sit in liquid helium at ${MODEL.helium} K; a ${MODEL.shield} K shield and a vacuum keep the room's heat out, and the two-stage cold head on top recondenses the helium that boils off. If the coils ever warm and quench, the helium leaves through the vent stack.`,
  body: `<div class="iso-stage">${svg}</div>`,
});

const name = THEME === "light" ? "mri-scanner-light.html" : "mri-scanner.html";
writeFileSync(join(HERE, name), k.pageHtml({ title: "MRI scanner", theme: THEME, body: `<style>${CSS}</style>${body}`, width: 820 }));
console.log("wrote", name);
