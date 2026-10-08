"use strict";
/**
 * Entorno de pruebas headless para aws_skill_rpg.html.
 *
 * El juego es un único HTML autocontenido con su lógica en un <script>.
 * Para testearlo cargamos ese script en un stub mínimo de DOM y exponemos
 * sus variables globales en un objeto `game`.
 */
const fs = require("fs");
const path = require("path");
const nodeTest = require("node:test");

const GAME_PATH = path.join(__dirname, "..", "aws_skill_rpg.html");

/* --------------------------------------------------------------------- */
/* registro de pruebas                                                    */
/* --------------------------------------------------------------------- */
/**
 * `suite("Grupo")` + `test("caso", fn)` se registran en el runner de Node,
 * de forma que cada caso aparece por separado en el informe.
 */
function suite(name) { return nodeTest.describe(name); }
function test(name, fn) { return nodeTest.it(name, fn); }

/* --------------------------------------------------------------------- */
/* aserciones                                                              */
/* --------------------------------------------------------------------- */
class AssertionError extends Error {}

function fail(msg) { throw new AssertionError(msg); }
function assert(cond, msg) { if (!cond) fail(msg || "condición falsa"); }
function assertEqual(actual, expected, msg) {
  if (actual !== expected) {
    fail(`${msg || "valores distintos"}: esperado ${JSON.stringify(expected)}, obtenido ${JSON.stringify(actual)}`);
  }
}
function assertDeep(actual, expected, msg) {
  const a = JSON.stringify(actual), b = JSON.stringify(expected);
  if (a !== b) fail(`${msg || "estructuras distintas"}: esperado ${b}, obtenido ${a}`);
}
function assertAtLeast(actual, min, msg) {
  if (!(actual >= min)) fail(`${msg || "valor demasiado bajo"}: esperado >= ${min}, obtenido ${actual}`);
}
function assertInRange(actual, min, max, msg) {
  if (!(actual >= min && actual <= max)) {
    fail(`${msg || "fuera de rango"}: esperado ${min}..${max}, obtenido ${actual}`);
  }
}
function assertMatch(value, re, msg) {
  if (!re.test(String(value))) fail(`${msg || "no coincide"}: ${value} no cumple ${re}`);
}

/* --------------------------------------------------------------------- */
/* stub de DOM                                                             */
/* --------------------------------------------------------------------- */
function mkEl(tag) {
  const el = {
    tagName: String(tag || "div").toUpperCase(),
    style: {},
    dataset: {},
    children: [],
    innerHTML: "",
    textContent: "",
    className: "",
    value: "",
    disabled: false,
    placeholder: "",
    _cls: new Set(),
    classList: {
      add(c) { el._cls.add(c); },
      remove(c) { el._cls.delete(c); },
      toggle(c) { el._cls.has(c) ? el._cls.delete(c) : el._cls.add(c); },
      contains(c) { return el._cls.has(c); }
    },
    appendChild(c) { el.children.push(c); return c; },
    insertBefore(c) { el.children.unshift(c); return c; },
    remove() {},
    querySelectorAll() { return []; },
    querySelector() { return null; },
    addEventListener() {},
    removeEventListener() {},
    setAttribute() {},
    focus() {},
    click() {},
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 60, right: 100, bottom: 60 }),
    getContext: () => ({
      clearRect() {}, save() {}, translate() {}, rotate() {},
      restore() {}, fillRect() {}
    })
  };
  return el;
}

function buildDocument() {
  const els = {};
  return {
    _els: els,
    getElementById(id) {
      if (!els[id]) els[id] = mkEl("div");
      return els[id];
    },
    createElement: (t) => mkEl(t),
    createElementNS: (ns, t) => mkEl(t),
    addEventListener() {},
    removeEventListener() {},
    /* el motor busca .opt al responder y .inv/.hud al refrescar la UI */
    querySelectorAll(sel) {
      if (sel === ".opt") return [mkEl("button"), mkEl("button"), mkEl("button"), mkEl("button")];
      return [];
    },
    querySelector() { return null; },
    body: { appendChild() {}, removeChild() {} }
  };
}

function buildAudioContext() {
  return function AudioContext() {
    this.currentTime = 0;
    this.destination = {};
    this.createOscillator = () => ({
      type: "sine", frequency: {
        setValueAtTime() {}, exponentialRampToValueAtTime() {}
      },
      connect() {}, start() {}, stop() {}
    });
    this.createGain = () => ({
      gain: { setValueAtTime() {}, exponentialRampToValueAtTime() {} },
      connect() {}
    });
  };
}

/** Globals del juego que exponemos a las pruebas. */
const EXPORTS = [
  "NODES", "BANK", "REALMS", "NODE", "ITEM_LIST", "RANKS",
  "nodeOf", "nodesOfRealm", "realmOf", "expandQ", "allQuestionsFor", "TOTAL_QUESTIONS",
  "PASS_PCT", "P", "B", "T", "TRAIN_MODES", "SAVE_KEY",
  "isCleared", "pct", "unlocked", "missingReqs", "clearedCount", "totalPct", "anyAvailable",
  "rankOf", "damageFor", "save", "load",
  "screenTitle", "openMap", "openBrief", "openTraining", "startTraining",
  "openShop", "buy", "restLives", "openBestiary", "openCodex",
  "startBattle", "answer", "nextHit", "finishBattle", "quitBattle",
  "useItem", "toggleMute", "wipeSave", "drawLinks", "refreshInventory",
  "hearts", "esc", "shuffle",
  "MATCH_BANK", "WORDS_BANK", "CROSS_BANK", "MATCH_COLORS",
  "chType", "instantiateChallenge", "timeFor", "buildWordGrid", "buildCrossGrid",
  "renderQuiz", "renderMatch", "renderWordSearch", "renderCrossword",
  "matchPick", "wsPick", "xwSelect", "xwSubmit", "hit", "missHit"
];

/**
 * Carga el juego en un entorno limpio.
 * @param {{store?:object, seed?:object}} opts
 *   store: backing store de localStorage simulado
 *   seed:  valores a escribir en la partida antes de arrancar
 */
function loadGame(opts = {}) {
  const store = opts.store || {};
  const prev = {};

  const globals = {
    document: buildDocument(),
    window: { addEventListener() {}, innerWidth: 1280, innerHeight: 900, AudioContext: buildAudioContext() },
    innerWidth: 1280,
    innerHeight: 900,
    localStorage: {
      getItem: (k) => (k in store ? store[k] : null),
      setItem: (k, v) => { store[k] = String(v); },
      removeItem: (k) => { delete store[k]; }
    },
    confirm: () => true,
    location: { reload() {} },
    addEventListener: () => {},
    setInterval: () => 0,
    clearInterval: () => {},
    requestAnimationFrame: () => 0,
    alert: () => {}
  };

  for (const [k, v] of Object.entries(globals)) {
    prev[k] = global[k];
    global[k] = v;
  }

  /* Math.random determinista para que __play() y los generadores de puzzles
     (buildWordGrid, shuffle) produzcan resultados reproducibles. Se restaura
     en restore(). Copiamos TODAS las props (incluidas no-enumerables como
     imul/floor) con Object.getOwnPropertyDescriptors para no romper el juego. */
  prev.Math = global.Math;
  let _s = ((opts.seed && (opts.seed.gold | 0)) || 0) + 0xA1B2C3D4;
  global.Math = Object.defineProperties(
    Object.create(Object.getPrototypeOf(global.Math)),
    Object.getOwnPropertyDescriptors(global.Math)
  );
  global.Math.random = function () {
    _s |= 0; _s = (_s + 0x6D2B79F5) | 0;
    let t = Math.imul(_s ^ (_s >>> 15), 1 | _s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  /* El juego ahora es modular: los módulos viven en js/data.js, js/engine.js
     y js/main.js, y el HTML solo enlaza hojas de estilo y scripts. */
  const html = fs.readFileSync(GAME_PATH, "utf8");
  const MODULES = ["js/data.js", "js/engine.js", "js/main.js"];
  const js = MODULES
    .map((m) => fs.readFileSync(path.join(__dirname, "..", m), "utf8"))
    .join("\n");

  /* El script declara sus datos con const/let, que en un eval indirecto NO
     pasan a globalThis. Inyectamos un acumulador global y hacemos que sea el
     propio script el que se vuelque dentro. */
  const SLOT = "__awsRpgExports__";
  prev[SLOT] = global[SLOT];
  global[SLOT] = {};

  const restore = () => {
    for (const [k, v] of Object.entries(prev)) {
      if (v === undefined) delete global[k];
      else global[k] = v;
    }
  };

  try {
    (0, eval)(js + `\n;Object.assign(${SLOT},{${EXPORTS.join(",")}});`);
  } catch (err) {
    restore();
    throw new Error(`fallo al cargar el juego: ${err.message}`);
  }

  const game = global[SLOT];
  delete global[SLOT];

  if (opts.seed) Object.assign(game.P, opts.seed);

  game.__store = store;
  game.__html = html;
  game.__restore = restore;
  game.__doc = globals.document;

  /* Helpers de simulación. Referencian game.* de forma explícita porque los
     const del script no son visibles desde este módulo. */
  game.__play = function play(accuracy = 1) {
    let guard = 60;
    while (guard-- > 0 && game.B.ehp > 0 && game.B.lives > 0 && game.B.idx < game.B.qs.length) {
      game.B.answered = false;
      const q = game.B.qs[game.B.idx];
      game.answer(Math.random() < accuracy ? q[2] : (q[2] + 1) % 4);
      if (game.B.ehp > 0 && game.B.lives > 0) game.nextHit();
    }
    return game.B;
  };

  game.__playAndFinish = function playAndFinish(accuracy = 1) {
    game.__play(accuracy);
    game.finishBattle(game.B.lives > 0);
  };

  return game;
}

module.exports = {
  GAME_PATH,
  suite, test,
  fail, assert, assertEqual, assertDeep, assertAtLeast, assertInRange, assertMatch,
  loadGame, mkEl,
  AssertionError
};