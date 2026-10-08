"use strict";
/**
 * Desafíos alternos (matching, sopa de letras, crucigrama):
 * integridad de bancos, consistencia de crucigramas y combate.
 */
const { suite, test, loadGame, assert, assertEqual, assertAtLeast } = require("./harness.cjs");

const g = loadGame();
const { MATCH_BANK, WORDS_BANK, CROSS_BANK, chType, buildWordGrid, buildCrossGrid, timeFor, B, instantiateChallenge, expandQ } = g;

/** Prepara el estado de combate y monta un reto concreto (como hace renderQuestion). */
function startChallenge(game, ch) {
  game.B.node = { id: "t", r: "fnd", s: "👹", t: "enemy", tier: 1, name: "Enemigo de prueba" };
  game.B.qs = [ch];
  game.B.idx = 0;
  game.B.ehp = 3; game.B.emax = 3;
  game.B.lives = 3; game.B.maxLives = 3;
  game.B.baseTmax = 20; game.B.tmax = 20;
  game.B.answered = false; game.B.itemLock = false;
  game.B.hits = 0; game.B.misses = 0; game.B.crits = 0; game.B.combo = 0; game.B.bestCombo = 0;
  game.B.shieldOn = false; game.B.noDamage = false; game.B.freeplay = true;
  game.B.sub = {};
  if (ch.type === "match") game.renderMatch(ch);
  else if (ch.type === "wordsearch") game.renderWordSearch(ch);
  else if (ch.type === "crossword") game.renderCrossword(ch);
}

suite("Bancos de desafíos");

test("MATCH_BANK tiene al menos 6 sets con 5 pares y tags", () => {
  assertAtLeast(MATCH_BANK.length, 6, "sets de emparejar");
  for (const s of MATCH_BANK) {
    assert(!!s.id && Array.isArray(s.tags) && !!s.title && !!s.hint, `set ${s.id} incompleto`);
    assertEqual(s.pairs.length, 5, `${s.id}: 5 pares`);
    for (const [a, b] of s.pairs) {
      assert(typeof a === "string" && a.length > 0, `${s.id}: par sin término`);
      assert(typeof b === "string" && b.length > 0, `${s.id}: par sin definición`);
    }
  }
});

test("WORDS_BANK tiene sets con palabras únicas en MAYÚSCULAS", () => {
  assertAtLeast(WORDS_BANK.length, 6, "sets de sopa");
  for (const s of WORDS_BANK) {
    assertAtLeast(s.words.length, 4, `${s.id}: pocas palabras`);
    const uniq = new Set(s.words);
    assertEqual(uniq.size, s.words.length, `${s.id}: palabras duplicadas`);
    for (const w of s.words) {
      assert(w === w.toUpperCase().replace(/[^A-Z0-9]/g, ""), `${s.id}: palabra no normalizada: ${w}`);
    }
  }
});

test("CROSS_BANK tiene crucigramas consistentes", () => {
  assertAtLeast(CROSS_BANK.length, 4, "crucigramas");
  for (const c of CROSS_BANK) {
    assert(!!c.id && Array.isArray(c.tags) && Array.isArray(c.words), `${c.id} incompleto`);
    /* buildCrossGrid lanza si hay conflicto de intersecciones */
    const gg = buildCrossGrid(c);
    assert(gg.W > 0 && gg.H > 0, `${c.id}: grid inválido`);
    for (const w of c.words) {
      assert(w.pat.length > 0, `${c.id}: palabra vacía`);
    }
  }
});

test("chType distingue quiz (tupla) y retos alternos (objeto)", () => {
  assertEqual(chType([1, "a|b|c|d", 0, "e"]), "quiz");
  assertEqual(chType({type:"match"}), "match");
  assertEqual(chType({type:"wordsearch"}), "wordsearch");
  assertEqual(chType({type:"crossword"}), "crossword");
});

suite("Helpers de puzzles");

test("buildWordGrid coloca todas las palabras en el grid", () => {
  const words = ["S3", "EC2", "LAMBDA", "VPC"];
  const out = buildWordGrid(words, {size: 12});
  assert(!!out && !!out.grid, "buildWordGrid devuelve un grid");
  for (const w of words) {
    assert(isInGrid(out.grid, w), `palabra ${w} no aparece en el grid`);
  }
});
function isInGrid(grid, w) {
  const H = grid.length, W = grid[0].length;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      for (const [dy, dx] of [[0,1],[1,0],[1,1],[1,-1],[-1,0],[0,-1],[-1,-1],[-1,1]]) {
        let s = "";
        for (let k = 0; k < w.length; k++) {
          const yy = y + dy * k, xx = x + dx * k;
          if (yy < 0 || xx < 0 || yy >= H || xx >= W) { s = ""; break; }
          s += grid[yy][xx];
        }
        if (s === w) return true;
      }
    }
  }
  return false;
}

test("timeFor devuelve tiempos específicos por tipo", () => {
  B.baseTmax = 20;
  assertEqual(timeFor([0, "a|b|c|d", 0, ""]), 20, "quiz usa baseTmax");
  assertEqual(timeFor({type:"match"}), 40, "match 40s");
  assertEqual(timeFor({type:"wordsearch"}), 300, "wordsearch 300s");
  assertEqual(timeFor({type:"crossword"}), 75, "crossword 75s");
});

suite("Combate con desafíos alternos");

test("un nodo elite mixto genera retos de quiz, match y wordsearch", () => {
  const game = loadGame({ store: {}, seed: { lives: 3, gold: 500 } });
  game.startBattle("fnd-auditor");
  const types = new Set();
  for (const c of game.B.qs) types.add(game.chType(c));
  assert(types.has("quiz"), "debe haber quiz");
  assert(types.has("match"), "debe haber match");
  assert(types.has("wordsearch"), "debe haber wordsearch");
  game.__restore();
});

test("matchPick con pareja correcta hace un hit al enemigo", () => {
  const game = loadGame({ store: {}, seed: { lives: 3, gold: 500 } });
  const ch = {type:"match", id:"t", title:"t", hint:"h",
    pairs:[{a:"Lambda", b:"Serverless"},{a:"EC2", b:"VM clásica"}]};
  startChallenge(game, ch);
  const st = game.B.sub.match;
  assertEqual(st.terms.length, 2, "dos tarjetas de términos");
  assertEqual(st.defs.length, 2, "dos tarjetas de definiciones");
  assert(st.colors.length > 0, "pool de colores clonado");
  const color0 = st.colors[0];
  /* acertamos AMBOS pares para que el match se cierre */
  for (let k = 0; k < st.total; k++) {
    game.B.answered = false;
    const termI = st.terms[k].i;
    const matchDef = st.defs.findIndex(d => d.i === termI);
    game.matchPick("mt", k);
    if (k === 0) {
      const tEl = game.__doc.getElementById("mt0");
      assertEqual(tEl.style.background, color0, "primer clic pinta con el color del pool");
    }
    game.matchPick("md", matchDef);
  }
  assertEqual(st.done, 2, "ambos pares acertados");
  assertEqual(game.B.answered, true, "se cierra el match tras el último par");
  assertEqual(game.B.hits, 1, "1 golpe al enemigo");
  assertEqual(game.B.ehp, 2, "el enemigo pierde 1 HP");
  assert(st.colors.length < 5, "se descartaron colores del pool clonado");
  game.__restore();
});

test("matchPick con pareja equivocada consume intentos y NO resta vida hasta el 3er fallo", () => {
  const game = loadGame({ store: {}, seed: { lives: 3, gold: 500 } });
  const ch = {type:"match", id:"t", title:"t", hint:"h",
    pairs:[{a:"A1", b:"B1"},{a:"A2", b:"B2"},{a:"A3", b:"B3"}]};
  startChallenge(game, ch);
  const color0 = game.B.sub.match.colors[0];
  assertEqual(game.B.sub.match.attempts, 3, "3 intentos al empezar");

  /* fallamos 2 veces (pares incorrectos) → vidas intactas, attempts baja */
  for (let i = 0; i < 2; i++) {
    const termI = game.B.sub.match.terms[0].i;
    const wrongDef = game.B.sub.match.defs.findIndex(d => d.i !== termI);
    game.matchPick("mt", 0);
    game.matchPick("md", wrongDef);
    assertEqual(game.B.lives, 3, "vidas intactas tras "+(i+1)+"º fallo");
    assertEqual(game.B.sub.match.attempts, 3 - (i+1), "intentos restantes: "+(3-(i+1)));
    /* reset de selección para el siguiente intento */
    game.B.sub.match.sel = null;
    /* las tarjetas del trazo vuelven al fondo base (vía setTimeout 380ms;
       el test no espera el timeout — sólo verifica estado JS) */
  }
  assertEqual(game.B.sub.match.colors[0], color0, "el color NO se descarta al fallar");

  /* 3er fallo: attempts=0, B.answered=true, missHit (-1 vida) */
  const termI = game.B.sub.match.terms[0].i;
  const wrongDef = game.B.sub.match.defs.findIndex(d => d.i !== termI);
  game.matchPick("mt", 0);
  game.matchPick("md", wrongDef);
  assertEqual(game.B.sub.match.attempts, 0, "intentos agotados");
  assertEqual(game.B.answered, true, "el desafío termina tras agotar intentos");
  assertEqual(game.B.lives, 2, "se pierde una vida al fallar el desafío");
  game.__restore();
});

test("re-clic sobre la misma tarjeta la deselecciona", () => {
  const game = loadGame({ store: {}, seed: { lives: 3, gold: 500 } });
  const ch = {type:"match", id:"t", title:"t", hint:"h",
    pairs:[{a:"A", b:"B"},{a:"X", b:"Y"}]};
  startChallenge(game, ch);
  game.matchPick("mt", 0);
  assert(game.B.sub.match.sel, "primera tarjeta seleccionada");
  game.matchPick("mt", 0);  /* re-clic sobre la misma */
  assertEqual(game.B.sub.match.sel, null, "sel queda null tras re-clic");
  /* los intentos no se consumen al deseleccionar */
  assertEqual(game.B.sub.match.attempts, 3, "intentos intactos tras deseleccionar");
  game.__restore();
});

test("MATCH_COLORS es la plantilla inmutable; cada reto obtiene una copia", () => {
  const game = loadGame({ store: {}, seed: {} });
  const len0 = game.MATCH_COLORS.length;
  const ch = {type:"match", id:"t", title:"t", hint:"h",
    pairs:[{a:"X", b:"y"},{a:"Y", b:"x"},{a:"Z", b:"z"}]};
  startChallenge(game, ch);
  /* acertamos dos pares para descartar dos colores */
  for (let k = 0; k < 2; k++) {
    game.B.answered = false;
    const termI = game.B.sub.match.terms[0].i;
    const matchDef = game.B.sub.match.defs.findIndex(d => d.i === termI);
    game.matchPick("mt", 0);
    game.matchPick("md", matchDef);
  }
  assert(game.B.sub.match.colors.length < len0, "se descartaron colores del clon");
  assertEqual(game.MATCH_COLORS.length, len0, "la plantilla original NO se mutó");
  game.__restore();
});

test("wsPick con palabra válida marca la palabra y completa el reto", () => {
  const game = loadGame({ store: {}, seed: { lives: 3, gold: 500 } });
  const grid = [
    ["A","B","C"],
    ["X","X","X"],
    ["X","X","X"]
  ];
  const ch = {type:"wordsearch", id:"t", title:"t", hint:"h", words:["ABC"], grid:grid, placed:[]};
  startChallenge(game, ch);
  game.wsPick(0, 0);
  game.wsPick(0, 2);
  assertEqual(game.B.sub.ws.done.size, 1, "palabra encontrada");
  assertEqual(game.B.answered, true, "se cierra el reto");
  assertEqual(game.B.hits, 1, "1 golpe al enemigo");
  game.__restore();
});

test("wsPick con selección inválida NO resta vida pero sí 5 segundos", () => {
  const game = loadGame({ store: {}, seed: { lives: 3, gold: 500 } });
  const grid = [
    ["A","B","C"],
    ["D","E","F"],
    ["G","H","I"]
  ];
  const ch = {type:"wordsearch", id:"t", title:"t", hint:"h", words:["ABC"], grid:grid, placed:[]};
  startChallenge(game, ch);
  game.B.tleft = 60; game.B.tmax = 60;
  game.wsPick(0, 0);
  game.wsPick(2, 2); /* diagonal "AEI" no está en la lista */
  assertEqual(game.B.lives, 3, "la sopa NO resta vidas en fallos (el reloj es el enemigo)");
  assertEqual(game.B.tleft, 55, "se restaron 5 segundos del temporizador");
  assertEqual(game.B.answered, false, "el turno continúa tras un fallo");
  game.__restore();
});

test("wsPick avisa si el trazo es parte de una palabra pero no completa", () => {
  const game = loadGame({ store: {}, seed: {} });
  const grid = [
    ["B","U","C","K","E","T"],
    ["X","X","X","X","X","X"]
  ];
  const ch = {type:"wordsearch", id:"t", title:"t", hint:"h", words:["BUCKET"], grid:grid, placed:[]};
  startChallenge(game, ch);
  game.B.tleft = 60;
  /* click en U(0,1) y C(0,2): "UC" es substring de BUCKET */
  game.wsPick(0, 1);
  game.wsPick(0, 2);
  assertEqual(game.B.lives, 3, "vidas intactas en pista");
  assertEqual(game.B.tleft, 55, "5s restados");
  game.__restore();
});

test("encontrar una palabra suma 5 segundos al temporizador", () => {
  const game = loadGame({ store: {}, seed: {} });
  const grid = [
    ["B","U","C","K","E","T"],
    ["X","X","X","X","X","X"]
  ];
  const ch = {type:"wordsearch", id:"t", title:"t", hint:"h", words:["BUCKET"], grid:grid, placed:[]};
  startChallenge(game, ch);
  game.B.tleft = 100;
  game.B.tmax = 180;
  /* B(0,0) → T(0,5) = BUCKET (horizontal) */
  game.wsPick(0, 0);
  game.wsPick(0, 5);
  assertEqual(game.B.sub.ws.done.size, 1, "palabra encontrada");
  assertEqual(game.B.tleft, 105, "+5s por palabra encontrada");
  assertEqual(game.B.hits, 1, "1 golpe al enemigo");
  game.__restore();
});

test("xwSubmit con respuesta correcta completa el crucigrama", () => {
  const game = loadGame({ store: {}, seed: { lives: 3, gold: 500 } });
  const ch = {
    type:"crossword", id:"t", title:"t", hint:"h",
    words:[{num:1, pat:"HI", x:0, y:0, dir:"across", clue:"saludo"}],
    grid:[["H","I"],["",""]], W:2, H:2
  };
  startChallenge(game, ch);
  game.xwSelect(1, "across");
  const inp = game.__doc.getElementById("xwinput");
  if(inp) inp.value = "HI";
  game.xwSubmit();
  assertEqual(game.B.sub.xw.done.size, 1, "pista marcada como hecha");
  assertEqual(game.B.answered, true, "se cierra el crucigrama");
  assertEqual(game.B.hits, 1, "1 golpe al enemigo");
  game.__restore();
});

test("xwSubmit con respuesta incorrecta resta vida", () => {
  const game = loadGame({ store: {}, seed: { lives: 3, gold: 500 } });
  const ch = {
    type:"crossword", id:"t", title:"t", hint:"h",
    words:[{num:1, pat:"HI", x:0, y:0, dir:"across", clue:"saludo"}],
    grid:[["H","I"],["",""]], W:2, H:2
  };
  startChallenge(game, ch);
  game.xwSelect(1, "across");
  const inp = game.__doc.getElementById("xwinput");
  if(inp) inp.value = "NO";
  game.xwSubmit();
  assertEqual(game.B.lives, 2, "vida perdida");
  assertEqual(game.B.combo, 0, "combo reseteado");
  game.__restore();
});

test("El oráculo sólo actúa sobre preguntas de quiz", () => {
  const game = loadGame({ store: {}, seed: { lives: 3, gold: 500, inv: { potion: 1, shield: 1, oracle: 1 } } });
  const ch = {type:"match", id:"t", title:"t", hint:"h", pairs:[{a:"A", b:"B"}]};
  startChallenge(game, ch);
  const before = game.P.inv.oracle;
  game.useItem("oracle");
  assertEqual(game.P.inv.oracle, before, "el oráculo no se gasta fuera de quiz");
  game.__restore();
});

test("Las salas de puzles existen y son elites", () => {
  for (const id of ["puz-hall-fnd", "puz-hall-cmp", "grand-puz-hall"]) {
    const n = g.nodeOf(id);
    assert(!!n, `${id} existe`);
    assertEqual(n.t, "elite", `${id} es elite`);
  }
});

test("un boss recibe wordsearch y crossword de forma decorativa", () => {
  const n = g.nodeOf("fnd-guardian");
  const types = new Set();
  for (const e of n.q) {
    if (e && typeof e === "object" && e.type) types.add(e.type);
  }
  assert(types.has("wordsearch"), "boss con wordsearch");
  assert(types.has("crossword"), "boss con crossword");
});
