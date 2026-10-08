"use strict";
/**
 * Renderizado de pantallas y flujo de navegación.
 * El stub de DOM registra el HTML generado para poder inspeccionarlo.
 */
const { suite, test, loadGame, assert, assertEqual, assertAtLeast } = require("./harness.cjs");

const SCREENS = [
  ["screenTitle", "título"],
  ["openMap", "mapa"],
  ["openTraining", "entrenamiento"],
  ["openShop", "tienda"],
  ["openBestiary", "bestiario"],
  ["openCodex", "registro de trucos"]
];

function app(g) {
  return g.__doc.getElementById("app").innerHTML;
}

suite("Renderizado de pantallas");

for (const [fn, label] of SCREENS) {
  test(`la pantalla de ${label} renderiza contenido`, () => {
    const g = loadGame();
    g[fn]();
    const html = app(g);
    assertAtLeast(html.length, 500, `HTML de ${label} demasiado corto`);
    assert(html.includes("<div"), `${label} no contiene nodos`);
    g.__restore();
  });
}

test("el mapa lista los 45 nodos con sus reinos", () => {
  const g = loadGame();
  g.openMap();
  const html = app(g);
  const nodes = (html.match(/data-node="/g) || []).length;
  assertEqual(nodes, g.NODES.length, "nodos pintados en el mapa");
  for (const r of g.REALMS) {
    assert(html.includes(r.name), `falta el reino ${r.name} en el mapa`);
  }
  g.__restore();
});

test("el briefing de cada nodo muestra sus requisitos", () => {
  const g = loadGame();
  for (const n of g.NODES) {
    g.openBrief(n.id);
    const html = app(g);
    assert(html.includes(n.name), `falta el nombre de ${n.id}`);
    assert(/Desafíos/.test(html), `faltan los atributos de ${n.id}`);
    if (!n.req.length) {
      assert(/Sin requisitos/.test(html), `${n.id} debería indicar que no tiene requisitos`);
    } else {
      for (const r of n.req) {
        assert(html.includes(g.nodeOf(r).name), `${n.id} no muestra el requisito ${r}`);
      }
    }
  }
  g.__restore();
});

test("el briefing bloquea el botón de combate si faltan requisitos", () => {
  const g = loadGame();
  const child = g.NODES.find((n) => n.req.length > 0);
  g.openBrief(child.id);
  assert(/Bloqueado/.test(app(g)), "debería mostrar el botón bloqueado");
  g.__restore();
});

test("el briefing ofrece combate en los nodos disponibles", () => {
  const g = loadGame();
  const root = g.NODES.find((n) => !n.req.length);
  g.openBrief(root.id);
  assert(/Combatir/.test(app(g)), "debería ofrecer combatir");
  g.__restore();
});

test("el mapa marca como superado los nodos ganados", () => {
  const g = loadGame();
  g.P.cleared["fnd-cloud"] = { best: 96, tries: 1 };
  g.openMap();
  const html = app(g);
  assert(/96%/.test(html), "el mapa debe mostrar el porcentaje del nodo superado");
  g.__restore();
});

test("el bestiario oculta los enemigos no derrotados", () => {
  const g = loadGame();
  g.openBestiary();
  const before = app(g);
  assert(before.includes("???"), "los enemigos sin superar deben salir ocultos");

  g.P.cleared["fnd-cloud"] = { best: 100, tries: 1 };
  g.openBestiary();
  const after = app(g);
  assert(after.includes("La Nube"), "el enemigo derrotado debe mostrar su nombre");
  assert(after.includes("100%"), "debe mostrar el porcentaje");
  g.__restore();
});

test("el registro de trucos refleja el progreso por reino", () => {
  const g = loadGame();
  g.P.cleared["fnd-cloud"] = { best: 90, tries: 1 };
  g.P.xp = 4300;
  g.openCodex();
  const html = app(g);
  assert(/90%/.test(html), "debe mostrar el récord del nodo");
  assert(/Solutions Developer/.test(html), "debe mostrar el rango del jugador");
  g.__restore();
});

test("la tienda muestra los tres objetos y sus precios", () => {
  const g = loadGame();
  g.openShop();
  const html = app(g);
  for (const it of g.ITEM_LIST) {
    assert(html.includes(it.name), `falta ${it.name} en la tienda`);
    assert(html.includes(String(it.price)), `falta el precio de ${it.name}`);
  }
  g.__restore();
});

suite("Flujo de combate");

test("iniciar un combate pinta la pregunta y las cuatro opciones", () => {
  const g = loadGame();
  g.startBattle("net-maze");
  const html = app(g);
  assert(/GOLPE 1/.test(html), "debe indicar el golpe 1");
  assert(/20s/.test(html), "debe mostrar el temporizador");
  assertEqual((html.match(/id="opt[0-3]"/g) || []).length, 4, "opciones pintadas");
  assert(html.includes(g.B.qs[0][0].replace(/"/g, "&quot;")), "debe pintar el texto de la pregunta");
  g.__restore();
});

test("el enemigo aparece con su nombre, tipo y reino", () => {
  const g = loadGame();
  const n = g.nodeOf("sto-colossus");
  g.startBattle(n.id);
  const html = app(g);
  assert(html.includes(n.name), "nombre del enemigo");
  assert(/BOSS/.test(html), "etiqueta de boss");
  assert(html.includes(g.realmOf(n.r).name), "reino del enemigo");
  g.__restore();
});

test("responder muestra la explicación y habilita el botón de continuar", () => {
  const g = loadGame();
  g.startBattle("fnd-cloud");
  const q = g.B.qs[0];
  g.B.answered = false;
  g.answer(q[2]);

  /* la explicación se inyecta en el elemento #log, no en el contenedor raíz */
  const log = g.__doc.getElementById("log");
  assert(log.innerHTML.includes(g.esc(q[3]).slice(0, 25)), "debe mostrar la explicación");
  assert(log.className.includes("ok"), "el registro debe marcarse como acierto");

  const next = g.__doc.getElementById("nextBtn");
  assert(!/hidden/.test(next.className), "el botón de continuar debe quedar visible");
  g.__restore();
});

test("fallar muestra el motivo y descuenta una vida en pantalla", () => {
  const g = loadGame();
  g.startBattle("fnd-cloud");
  const q = g.B.qs[0];
  g.B.answered = false;
  g.answer((q[2] + 1) % 4);

  const log = g.__doc.getElementById("log");
  assert(log.innerHTML.includes("Golpe recibido"), "debe indicar el golpe recibido");
  assert(log.className.includes("bad"), "el registro debe marcarse como fallo");
  assert(g.__doc.getElementById("bLives").innerHTML.includes("❤️"), "debe repintar los corazones");
  g.__restore();
});

test("el resultado muestra el porcentaje, las recompensas y los desbloqueos", () => {
  const g = loadGame();
  g.startBattle("fnd-cloud");
  while (g.B.ehp > 0 && g.B.idx < g.B.qs.length) {
    g.B.answered = false;
    g.answer(g.B.qs[g.B.idx][2]);
    if (g.B.ehp > 0) g.nextHit();
  }
  g.finishBattle(true);
  const html = app(g);
  assert(/100%/.test(html), "porcentaje final");
  assert(/Aciertos/.test(html), "aciertos");
  assert(/XP/.test(html), "XP");
  assert(/Oro/.test(html), "oro");
  g.__restore();
});

test("ganar un nodo lista en el resultado los nodos que desbloquea", () => {
  const g = loadGame();
  g.startBattle("fnd-cloud");
  while (g.B.ehp > 0 && g.B.idx < g.B.qs.length) {
    g.B.answered = false;
    g.answer(g.B.qs[g.B.idx][2]);
    if (g.B.ehp > 0) g.nextHit();
  }
  g.finishBattle(true);
  const html = app(g);
  const children = g.NODES.filter((n) => n.req.includes("fnd-cloud"));
  if (children.length) {
    assert(/Nodos desbloqueados/.test(html), "debe listar los desbloqueos");
  }
  g.__restore();
});

test("el HUD refleja XP, rango, oro y progreso", () => {
  const g = loadGame();
  g.P.xp = 4300;
  g.P.gold = 640;
  g.P.lives = 2;
  g.P.cleared["fnd-cloud"] = { best: 90, tries: 1 };
  g.P.cleared["cmp-ec2"] = { best: 80, tries: 1 };
  g.openCodex();
  const html = app(g);
  assert(/4300/.test(html), "XP en el HUD");
  assert(/640/.test(html), "oro en el HUD");
  assert(/2\/48/.test(html), "progreso en el HUD");
  assert(/Solutions Developer/.test(html), "rango del jugador");

  /* las vidas se pintan como corazones sueltos dentro de un contenedor */
  const hp = html.match(/<div class="pill hp">([\s\S]*?)<\/div>/);
  assert(!!hp, "el HUD debe incluir el contador de vidas");
  const hearts = (hp[1].match(/class="h"/g) || []).length;
  assertEqual(hearts, 2, "corazones mostrados en el HUD");
  g.__restore();
});

test("el inventario aparece en todas las pantallas", () => {
  const g = loadGame();
  for (const [fn] of SCREENS) {
    g[fn]();
    assert(/class="invbar"/.test(app(g)), `sin inventario en ${fn}`);
    assertEqual((app(g).match(/class="inv /g) || []).length, g.ITEM_LIST.length, `objetos en ${fn}`);
  }
  g.__restore();
});

test("huir un combate devuelve al mapa", () => {
  const g = loadGame();
  g.startBattle("fnd-cloud");
  g.quitBattle();
  assert(/Mapa de habilidades/.test(app(g)), "debe volver al mapa");
  g.__restore();
});

test("el texto se escapa para evitar inyectar HTML", () => {
  const g = loadGame();
  const evil = "<img src=x onerror=alert(1)>";
  assertEqual(g.esc(evil), "&lt;img src=x onerror=alert(1)&gt;", "escape de HTML");
  assert(!g.esc(evil).includes("<img"), "no debe quedar HTML crudo");
  g.__restore();
});