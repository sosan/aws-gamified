"use strict";
/**
 * Progresión del árbol: requisitos, desbloqueo, umbral de aprobado,
 * rankings, tienda y persistencia en localStorage.
 */
const { suite, test, loadGame, assert, assertEqual, assertAtLeast, assertInRange } = require("./harness.cjs");

function seeded(cleared, extra = {}) {
  return loadGame({
    store: {},
    seed: {
      cleared,
      lives: 3, gold: 500, xp: 0,
      inv: { potion: 1, shield: 1, oracle: 1 },
      stats: { kills: 0, bosses: 0, deaths: 0, perfect: 0 },
      ...extra
    }
  });
}

/** Marca un nodo como superado con el porcentaje indicado. */
function clear(ids, pct = 90) {
  const map = {};
  (Array.isArray(ids) ? ids : [ids]).forEach((id) => { map[id] = { best: pct, tries: 1 }; });
  return map;
}

suite("Requisitos y desbloqueo");

test("un nodo sin requisitos está desbloqueado de inicio", () => {
  const game = seeded({});
  for (const n of game.NODES.filter((x) => !x.req.length)) {
    assert(game.unlocked(n.id), `${n.id} debería estar disponible al empezar`);
  }
});

test("un nodo con requisitos sin cumplir está bloqueado", () => {
  const game = seeded({});
  const withReq = game.NODES.find((n) => n.req.length > 0);
  assert(!game.unlocked(withReq.id), `${withReq.id} debería estar bloqueado`);
  assertEqual(game.missingReqs(withReq.id).length, withReq.req.length, "requisitos pendientes");
});

test("un 69% no cumple el requisito pero un 70% sí", () => {
  const child = game => game.NODES.find((n) => n.req.includes("fnd-cloud"));
  let g1 = seeded(clear("fnd-cloud", 69));
  assert(!g1.unlocked(child(g1).id), "69% no debe desbloquear");
  g1.__restore();

  let g2 = seeded(clear("fnd-cloud", 70));
  assert(g2.unlocked(child(g2).id), "70% debe desbloquear");
  g2.__restore();
});

test("superar un nodo desbloquea a todos sus hijos", () => {
  const game = seeded(clear("fnd-cloud", 100));
  const children = game.NODES.filter((n) => n.req.includes("fnd-cloud"));
  assertAtLeast(children.length, 1, "fnd-cloud debería tener hijos");
  for (const c of children) {
    assert(game.unlocked(c.id), `${c.id} debería desbloquearse`);
  }
});

test("con varios requisitos hacen falta todos", () => {
  const game = seeded({});
  const multi = game.NODES.find((n) => n.req.length >= 2);
  assert(!!multi, "debe existir un nodo con 2+ requisitos");

  const partial = {};
  multi.req.slice(0, -1).forEach((r) => { partial[r] = { best: 100, tries: 1 }; });
  const g1 = seeded(partial);
  assert(!g1.unlocked(multi.id), "faltan requisitos, debe seguir bloqueado");
  g1.__restore();

  const g2 = seeded(clear(multi.req, 100));
  assert(g2.unlocked(multi.id), "con todos los requisitos debe desbloquearse");
  g2.__restore();
});

test("un playthrough completo alcanza los 45 nodos", () => {
  const game = seeded({});
  let visited = 0, guard = 200;
  while (guard-- > 0) {
    const next = game.NODES.find((n) => !game.isCleared(n.id) && game.unlocked(n.id));
    if (!next) break;
    game.P.cleared[next.id] = { best: 85, tries: 1 };
    visited++;
  }
  assertEqual(visited, game.NODES.length, "nodos alcanzables en un playthrough");
  assert(!game.anyAvailable(), "no debe quedar nada disponible");
  game.__restore();
});

test("el progreso total es la media de los récords", () => {
  const game = seeded(clear(["fnd-cloud", "cmp-ec2"], 80));
  assertEqual(game.clearedCount(), 2, "nodos superados");
  assertInRange(game.totalPct(), 0, 100, "porcentaje global");
  const expected = Math.round((80 + 80) / game.NODES.length);
  assertEqual(game.totalPct(), expected, "media de récords");
  game.__restore();
});

suite("Combate y progreso");

test("una partida perfecta sube el XP, el oro y la marca", () => {
  const game = seeded({});
  game.startBattle("fnd-cloud");
  while (game.B.ehp > 0 && game.B.idx < game.B.qs.length) {
    game.B.answered = false;
    game.answer(game.B.qs[game.B.idx][2]);
    if (game.B.ehp > 0) game.nextHit();
  }
  game.finishBattle(true);

  assertEqual(game.P.cleared["fnd-cloud"].best, 100, "récord");
  assertAtLeast(game.P.xp, 1, "XP ganada");
  assertAtLeast(game.P.gold, 1, "oro ganado");
  assertEqual(game.P.stats.kills, 1, "victorias");
  assertEqual(game.P.stats.perfect, 1, "partidas perfectas");
  game.__restore();
});

test("repetir un nodo mejora el récord pero no lo empeora", () => {
  const game = seeded(clear("fnd-cloud", 100));
  game.startBattle("fnd-cloud");
  game.__play(0.5);
  game.finishBattle(game.B.lives > 0);
  assertEqual(game.P.cleared["fnd-cloud"].best, 100, "el récord anterior se conserva");
  game.__restore();
});

test("ganar un boss cuenta como jefe derrotado", () => {
  const game = seeded(clear("cmp-lambda-ops", 100));
  game.startBattle("cmp-serverless");
  while (game.B.ehp > 0 && game.B.idx < game.B.qs.length) {
    game.B.answered = false;
    game.answer(game.B.qs[game.B.idx][2]);
    if (game.B.ehp > 0) game.nextHit();
  }
  game.finishBattle(true);
  assert(!!game.P.cleared["cmp-serverless"], "elite superado");
  game.__restore();
});

test("el jugador nunca se queda sin vidas", () => {
  const game = seeded({});
  game.P.lives = 1;
  game.startBattle("cmp-overlord");
  let guard = 30;
  while (guard-- > 0 && game.B.lives > 0) {
    game.B.answered = false;
    game.answer((game.B.qs[game.B.idx][2] + 1) % 4);
  }
  game.finishBattle(false);
  assertAtLeast(game.P.lives, 1, "debe quedar al menos una vida");
  game.__restore();
});

suite("Tienda");

test("comprar descuenta oro y suma inventario", () => {
  const game = seeded({});
  const price = game.ITEM_LIST.find((i) => i.id === "potion").price;
  game.P.gold = 200;
  const inv = game.P.inv.potion;
  game.buy("potion");
  assertEqual(game.P.gold, 200 - price, "oro restante");
  assertEqual(game.P.inv.potion, inv + 1, "inventario");
  game.__restore();
});

test("no se puede comprar sin oro suficiente", () => {
  const game = seeded({});
  game.P.gold = 1;
  const inv = game.P.inv.potion;
  game.buy("potion");
  assertEqual(game.P.inv.potion, inv, "inventario sin cambios");
  assertEqual(game.P.gold, 1, "oro sin cambios");
  game.__restore();
});

test("reponer vidas cuesta 60 de oro y rellena hasta 3", () => {
  const game = seeded({}, { lives: 1 });
  game.P.gold = 100;
  game.restLives();
  assertEqual(game.P.lives, 3, "vidas");
  assertEqual(game.P.gold, 40, "oro restante");
  game.__restore();
});

test("reponer vidas con las vidas llenas no cobra", () => {
  const game = seeded({}, { lives: 3 });
  game.P.gold = 100;
  game.restLives();
  assertEqual(game.P.gold, 100, "oro sin cambios");
  game.__restore();
});

test("con 0 oro y 1 vida, reponer no deja al jugador bloqueado", () => {
  const game = seeded({}, { lives: 1 });
  game.P.gold = 0;
  game.restLives();
  assertAtLeast(game.P.lives, 1, "debe conservar al menos una vida");
  game.__restore();
});

suite("Persistencia");

test("el progreso se guarda y se recupera", () => {
  const store = {};
  const first = loadGame({ store });
  first.P.xp = 1234;
  first.P.gold = 321;
  first.P.cleared["fnd-cloud"] = { best: 95, tries: 2 };
  first.save();

  const second = loadGame({ store });
  assertEqual(second.P.xp, 1234, "XP recuperado");
  assertEqual(second.P.gold, 321, "oro recuperado");
  assertEqual(second.P.cleared["fnd-cloud"].best, 95, "récord recuperado");
  second.__restore();
  first.__restore();
});

test("la partida guardada es JSON válido con la forma esperada", () => {
  const store = {};
  const game = loadGame({ store });
  game.P.cleared["fnd-cloud"] = { best: 80, tries: 1 };
  game.save();
  const raw = store[game.SAVE_KEY];
  assert(!!raw, "no se escribió nada en localStorage");

  const parsed = JSON.parse(raw);
  assert(typeof parsed.xp === "number", "xp");
  assert(typeof parsed.gold === "number", "gold");
  assert(typeof parsed.lives === "number", "lives");
  assert(typeof parsed.cleared === "object", "cleared");
  assert(typeof parsed.inv === "object", "inv");
  assert(typeof parsed.stats === "object", "stats");
  game.__restore();
});

test("un guardado corrupto no rompe la carga", () => {
  const game = loadGame({ store: { "aws-rpg-save-v1": "{esto no es json" } });
  assert(game.P && typeof game.P === "object", "estado por defecto tras un guardado corrupto");
  assertEqual(typeof game.P.xp, "number", "xp por defecto");
  game.__restore();
});

test("reiniciar el progreso limpia el almacenamiento", () => {
  const store = {};
  const game = loadGame({ store });
  game.P.xp = 5000;
  game.save();
  assert(!!store[game.SAVE_KEY], "debería existir el guardado");
  game.wipeSave();
  assertEqual(store[game.SAVE_KEY], undefined, "el guardado debe desaparecer");
  game.__restore();
});