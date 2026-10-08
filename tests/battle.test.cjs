"use strict";
/**
 * Motor de combate: daño, críticos, vidas, objetos y fin de partida.
 */
const { suite, test, loadGame, assert, assertEqual, assertAtLeast } = require("./harness.cjs");

const g = loadGame();
const { NODES, PASS_PCT } = g;

function freshGame(seed) {
  const game = loadGame({ store: {}, seed: { lives: 3, gold: 200, cleared: {}, inv: { potion: 2, shield: 2, oracle: 2 }, stats: { kills: 0, bosses: 0, deaths: 0, perfect: 0 } } });
  return game;
}

/** Responde la pregunta actual acertando. */
function answerRight(game) {
  game.B.answered = false;
  game.answer(game.B.qs[game.B.idx][2]);
}
/** Igual, pero sin limpiar el flag `answered` (para probar el anti-doble-clic). */
function answerRightRaw(game) {
  game.answer(game.B.qs[game.B.idx][2]);
}
function answerWrong(game) {
  game.B.answered = false;
  game.answer((game.B.qs[game.B.idx][2] + 1) % 4);
}
/** Responde acertando hasta agotar al enemigo o las preguntas. */
function answerAllRight(game) {
  let guard = 40;
  while (guard-- > 0 && game.B.ehp > 0 && game.B.idx < game.B.qs.length) {
    answerRight(game);
    if (game.B.ehp > 0) game.nextHit();
  }
}

suite("Daño y críticos");

test("el acierto normal hace 1 de daño", () => {
  const game = freshGame();
  game.startBattle("fnd-cloud");
  const hpBefore = game.B.ehp;
  answerRight(game);
  assertEqual(game.B.ehp, hpBefore - 1, "HP del enemigo tras acertar");
  assertEqual(game.B.combo, 1, "combo");
});

test("cada 3 aciertos seguidos el golpe se marca como crítico", () => {
  for (const combo of [3, 6, 9, 12]) {
    const d = g.damageFor(combo);
    assertEqual(d.crit, true, `crítico en el combo ${combo}`);
  }
  for (const combo of [1, 2, 4, 5, 7, 8]) {
    assertEqual(g.damageFor(combo).crit, false, `no crítico en el combo ${combo}`);
  }
});

test("el crítico no quita más vida que un acierto normal", () => {
  for (const combo of [1, 2, 3, 4, 5, 6]) {
    assertEqual(g.damageFor(combo).d, 1, `daño en el combo ${combo}`);
  }
});

test("la barra de vida equivale a las preguntas, así que el 100% es alcanzable", () => {
  /* Si el crítico quitara 2 de vida, en nodos de 4 preguntas el enemigo
     moriría en el tercer acierto y nunca se respondería la última. */
  const game = freshGame();
  game.startBattle("fnd-cloud");
  assertEqual(game.B.qs.length, 4, "preguntas del nodo de prueba");
  answerAllRight(game);
  assertEqual(game.B.idx, game.B.qs.length - 1, "se respondieron todas las preguntas");
  assertEqual(game.B.hits, game.B.emax, "todos los aciertos");
  assertEqual(game.B.ehp, 0, "enemigo derrotado");
});

test("el combo se rompe al fallar y produce críticos reales", () => {
  /* fnd-cloud: nodo raíz enemy tier 1, solo preguntas quiz (4 retos).
     Usamos quiz puro para que answerWrong caiga siempre en una pregunta. */
  const game = freshGame();
  game.startBattle("fnd-cloud");
  let crits = 0;
  for (let i = 0; i < 6 && game.B.ehp > 0; i++) {
    const before = game.B.crits;
    answerRight(game);
    if (game.B.crits > before) crits++;
    if (game.B.ehp > 0) game.nextHit();
  }
  assertAtLeast(crits, 1, "críticos generados en 4 aciertos");

  answerWrong(game);
  assertEqual(game.B.combo, 0, "el combo debe reiniciarse al fallar");
});

test("un error consume una vida y deja marca", () => {
  const game = freshGame();
  game.startBattle("fnd-cloud");
  const lives = game.B.lives;
  answerWrong(game);
  assertEqual(game.B.lives, lives - 1, "vidas tras fallar");
  assertEqual(game.B.misses, 1, "fallos contados");
});

suite("Vidas por tipo de nodo");

test("el tipo de nodo fija el máximo de vidas", () => {
  for (const n of NODES) {
    const game = freshGame();
    game.startBattle(n.id);
    const expected = n.t === "boss" ? 4 : n.t === "elite" ? 3 : 2;
    assertEqual(game.B.maxLives, expected, `vidas máximas de ${n.id} (${n.t})`);
  }
});

test("el enemigo tiene autantos golpes como preguntas", () => {
  for (const n of NODES) {
    const game = freshGame();
    game.startBattle(n.id);
    assertEqual(game.B.emax, game.B.qs.length, `HP inicial de ${n.id}`);
    assertEqual(game.B.ehp, game.B.qs.length, `HP enemigo de ${n.id}`);
    assertAtLeast(game.B.qs.length, 4, `${n.id} debería tener al menos 4 preguntas`);
  }
});

test("el simulacro no hace daño", () => {
  const game = freshGame();
  game.T.mode = "drill";
  game.T.realm = "__all";
  game.startTraining();
  assertEqual(game.B.noDamage, true, "modo sin daño activo");
  const lives = game.B.lives;
  answerWrong(game);
  assertEqual(game.B.lives, lives, "las vidas no deben bajar en simulacro");
  game.__restore();
});

test("las vidas del jugador se respetan como techo en enemigos", () => {
  const game = loadGame({ store: {}, seed: { lives: 1 } });
  game.startBattle("fnd-cloud");
  assertEqual(game.B.lives, 1, "con 1 vida global el enemigo empieza con 1");
  game.__restore();
});

suite("Objetos en combate");

test("no se pueden usar objetos fuera de un combate", () => {
  const game = freshGame();
  game.B.node = null;
  const before = game.P.inv.potion;
  game.useItem("potion");
  assertEqual(game.P.inv.potion, before, "la poción no debe consumirse");
});

test("la poción recupera una vida y se consume", () => {
  const game = freshGame();
  game.startBattle("fnd-cloud");
  game.B.lives = 1;
  const inv = game.P.inv.potion;
  game.useItem("potion");
  assertEqual(game.P.inv.potion, inv - 1, "inventario");
  assertEqual(game.B.lives, 2, "vidas recuperadas");
});

test("la poción no se gasta si ya tienes todas las vidas", () => {
  const game = freshGame();
  game.startBattle("fnd-cloud");
  game.B.lives = game.B.maxLives;
  const inv = game.P.inv.potion;
  game.useItem("potion");
  assertEqual(game.P.inv.potion, inv, "inventario intacto");
});

test("el escudo absorbe el siguiente error", () => {
  const game = freshGame();
  game.startBattle("fnd-cloud");
  game.useItem("shield");
  assertEqual(game.B.shieldOn, true, "escudo activo");
  const lives = game.B.lives;
  answerWrong(game);
  assertEqual(game.B.lives, lives, "la vida no debe bajar");
  assertEqual(game.B.shieldOn, false, "el escudo se consume");
});

test("el oráculo elimina dos opciones incorrectas", () => {
  const game = freshGame();
  game.startBattle("fnd-cloud");
  const inv = game.P.inv.oracle;
  const q = game.B.qs[game.B.idx];
  game.useItem("oracle");
  assertEqual(game.P.inv.oracle, inv - 1, "inventario");
  assertEqual(game.__oracleHits, undefined, "el oráculo actúa sobre el DOM");
  assert(q[2] >= 0 && q[2] <= 3, "la respuesta correcta sigue siendo válida");
});

suite("Fin de combate");

test("acertar todas derrota al enemigo y registra un 100%", () => {
  const game = freshGame();
  game.startBattle("fnd-cloud");
  answerAllRight(game);
  assertEqual(game.B.ehp, 0, "HP enemigo final");
  game.finishBattle(true);
  assert(!!game.P.cleared["fnd-cloud"], "el nodo debe registrarse como superado");
  assertEqual(game.P.cleared["fnd-cloud"].best, 100, "porcentaje registrado");
  assertEqual(game.P.stats.perfect, 1, "cuenta como partida perfecta");
});

test("mantener el combo genera críticos a lo largo del combate", () => {
  const game = freshGame();
  game.startBattle("cmp-lambda-intro");
  answerAllRight(game);
  /* 7 preguntas: críticos en el 3er y 6er acierto */
  assertEqual(game.B.crits, 2, "críticos en una racha perfecta");
  assertEqual(game.B.bestCombo, game.B.emax, "combo máximo");
  game.__restore();
});

test("el XP de la partida incluye la bonificación por críticos", () => {
  const game = freshGame();
  const node = game.nodeOf("cmp-lambda-intro");
  game.startBattle(node.id);
  answerAllRight(game);
  game.finishBattle(true);

  const pct = Math.round(game.B.hits / game.B.emax * 100);
  const critBonus = 1 + Math.min(game.B.crits, 4) * 0.05;
  const expected = Math.round(node.xp * (pct / 100) * (1 + (pct === 100 ? 0.5 : 0)) * critBonus);

  assertEqual(game.P.xp, expected, "XP calculado con la fórmula del motor");
  assertAtLeast(critBonus, 1.05, "los críticos deben subir el XP");
  game.__restore();
});

test("una partida perfecta paga más que una con fallos", () => {
  const perfect = loadGame({ store: {}, seed: {} });
  perfect.startBattle("cmp-lambda-intro");
  answerAllRight(perfect);
  perfect.finishBattle(true);
  const xpPerfect = perfect.P.xp;
  perfect.__restore();

  /* falla una sola pregunta concreta (sin random) y acierta el resto.
     cmp-lambda-intro tiene 7 preguntas (enemy) → 6/7 = 86% ≥ 70% y pasa,
     con 1 vida restante, sin bonus de 100% y con menos críticos. */
  const sloppy = loadGame({ store: {}, seed: {} });
  sloppy.startBattle("cmp-lambda-intro");
  for (let i = 0; i < sloppy.B.qs.length; i++) {
    sloppy.B.answered = false;
    if (i === 2) sloppy.answer((sloppy.B.qs[i][2] + 1) % 4);  // falla la 3ª
    else sloppy.answer(sloppy.B.qs[i][2]);                    // acierta el resto
    if (sloppy.B.ehp > 0 && sloppy.B.idx < sloppy.B.qs.length - 1) sloppy.nextHit();
  }
  sloppy.finishBattle(sloppy.B.lives > 0);
  const xpSloppy = sloppy.P.xp;
  sloppy.__restore();

  assert(xpPerfect > xpSloppy, `perfecta (${xpPerfect} XP) debe superar a la fallida (${xpSloppy} XP)`);
});

test("fallar todo agota las vidas y no registra progreso", () => {
  const game = freshGame();
  game.startBattle("fnd-cloud");
  let guard = 20;
  while (guard-- > 0 && game.B.lives > 0) answerWrong(game);
  assertEqual(game.B.lives, 0, "vidas agotadas");
  game.finishBattle(false);
  assert(!game.P.cleared["fnd-cloud"], "no debe registrarse el nodo");
});

test("un 70% exacto aprueba el nodo", () => {
  const game = freshGame();
  game.startBattle("fnd-cloud");       /* 4 preguntas */
  /* 3 aciertos y 1 fallo = 75% */
  answerRight(game); game.nextHit();
  answerRight(game); game.nextHit();
  answerRight(game); game.nextHit();
  answerWrong(game);
  game.finishBattle(true);
  assert(!!game.P.cleared["fnd-cloud"], "3 de 4 debe aprobar");
  assertAtLeast(game.P.cleared["fnd-cloud"].best, PASS_PCT, "porcentaje por encima del umbral");
});

test("un 50% no aprueba el nodo", () => {
  const game = freshGame();
  game.startBattle("fnd-cloud");
  answerRight(game); game.nextHit();
  answerRight(game); game.nextHit();
  answerWrong(game); game.nextHit();
  answerWrong(game);
  game.finishBattle(true);
  assert(!game.P.cleared["fnd-cloud"], "2 de 4 no debe aprobar");
});

test("no se puede responder dos veces la misma pregunta", () => {
  const game = freshGame();
  game.startBattle("fnd-cloud");
  answerRight(game);                       /* la primera sí cuenta */
  const hits = game.B.hits, hp = game.B.ehp;
  answerRightRaw(game);                    /* el flag sigue puesto */
  answerRightRaw(game);
  assertEqual(game.B.hits, hits, "aciertos no deben aumentar");
  assertEqual(game.B.ehp, hp, "el HP enemigo no debe bajar dos veces");
});

test("el combate avanza golpe a golpe hasta el final", () => {
  const game = freshGame();
  game.startBattle("fnd-cloud");
  const total = game.B.qs.length;
  let steps = 0;
  while (game.B.idx < total && steps++ < 40) {
    answerRight(game);
    if (game.B.ehp > 0) {
      const before = game.B.idx;
      game.nextHit();
      if (game.B.idx === before) break;
    }
  }
  assertAtLeast(steps, total - 1, "no debe quedarse atascado en la misma pregunta");
});

suite("Robustez");

test("200 combates aleatorios no lanzan excepciones", () => {
  const ids = NODES.map((n) => n.id);
  let crashes = 0;
  for (let i = 0; i < 200; i++) {
    const game = loadGame({ store: {}, seed: { gold: 9000 } });
    try {
      game.startBattle(ids[i % ids.length]);
      game.__play(0.7);
      game.finishBattle(game.B.lives > 0);
      assert(game.P.lives >= 0, "vidas negativas");
      assert(game.P.gold >= 0, "oro negativo");
    } catch (err) {
      crashes++;
      if (crashes <= 3) console.error(`    fallo en ${ids[i % ids.length]}: ${err.message}`);
    }
    game.__restore();
  }
  assertEqual(crashes, 0, "combates con excepciones");
});

test("el estado permanece coherente tras muchos combates", () => {
  const game = loadGame({ store: {}, seed: { gold: 5000, lives: 3 } });
  for (let i = 0; i < 60; i++) {
    game.P.lives = 3;
    game.startBattle("cmp-lambda-ops");
    game.__play(0.8);
    game.finishBattle(game.B.lives > 0);
  }
  assert(game.P.lives >= 1 && game.P.lives <= 3, `vidas fuera de rango: ${game.P.lives}`);
  assert(game.P.gold >= 0, `oro negativo: ${game.P.gold}`);
  assert(Object.values(game.P.inv).every((v) => v >= 0), "inventario negativo");
  assert(game.P.xp > 0, "debe haber ganado XP");
  game.__restore();
});

suite("Entrenamiento libre");

test("existen tres modos de entrenamiento", () => {
  assertEqual(Object.keys(g.TRAIN_MODES).length, 3, "modos");
  for (const [k, m] of Object.entries(g.TRAIN_MODES)) {
    assert(!!m.n && !!m.ico && !!m.badge, `modo ${k} incompleto`);
  }
});

test("el entrenamiento no toca la progresión", () => {
  const game = loadGame({ store: {}, seed: { lives: 3, gold: 300, cleared: {} } });
  game.T.mode = "classic";
  game.T.realm = "__all";
  game.startTraining();
  const clearedBefore = Object.keys(game.P.cleared).length;
  const goldBefore = game.P.gold;

  game.finishBattle(true);

  assertEqual(Object.keys(game.P.cleared).length, clearedBefore, "no registra nodos");
  assertEqual(game.P.gold, goldBefore, "no da oro");
  assertEqual(game.P.lives, 3, "no consume vidas");
  assert(!("__train" in game.P.cleared), "no deja el nodo sintético en el progreso");
  game.__restore();
});

test("cada modo y reino arrancan un combate válido", () => {
  for (const mode of ["classic", "blitz", "drill"]) {
    for (const realm of ["__all", "fnd", "cmp"]) {
      const game = loadGame({ store: {}, seed: { lives: 3 } });
      game.T.mode = mode;
      game.T.realm = realm;
      game.startTraining();
      assert(!!game.B.node, `${mode}/${realm}: sin nodo`);
      assertEqual(game.B.node.id, "__train", `${mode}/${realm}: id del nodo`);
      assertAtLeast(game.B.qs.length, 5, `${mode}/${realm}: pocas preguntas`);
      assert(game.B.lives >= 1, `${mode}/${realm}: sin vidas`);
      assert(game.B.tmax > 0, `${mode}/${realm}: sin temporizador`);
      game.__restore();
    }
  }
});

test("el asalto rápido tiene menos tiempo por golpe", () => {
  const fast = loadGame({ store: {}, seed: {} });
  fast.T.mode = "blitz"; fast.T.realm = "fnd"; fast.startTraining();
  const blitzTime = fast.B.tmax;
  fast.__restore();

  const slow = loadGame({ store: {}, seed: {} });
  slow.T.mode = "classic"; slow.T.realm = "fnd"; slow.startTraining();
  const classicTime = slow.B.tmax;
  slow.__restore();

  assert(blitzTime < classicTime, `blitz (${blitzTime}s) debería ser más rápido que clásico (${classicTime}s)`);
});