"use strict";
/**
 * Integridad del banco de datos del skill tree:
 * estructura del árbol, coherencia de requisitos y formato de preguntas.
 */
const { suite, test, loadGame, assert, assertEqual, assertAtLeast } = require("./harness.cjs");

const g = loadGame();
const { NODES, BANK, REALMS, NODE, ITEM_LIST, RANKS, PASS_PCT, TOTAL_QUESTIONS } = g;

suite("Estructura del árbol");

test("hay 48 nodos en 7 reinos", () => {
  assertEqual(NODES.length, 48, "nodos totales");
  assertEqual(REALMS.length, 7, "reinos");
});

test("cada reino tiene al menos un nodo", () => {
  for (const r of REALMS) {
    assertAtLeast(g.nodesOfRealm(r.id).length, 1, `reino ${r.name} sin nodos`);
  }
});

test("reparto de enemigos, elites y bosses", () => {
  const byType = {};
  NODES.forEach((n) => { byType[n.t] = (byType[n.t] || 0) + 1; });
  assertEqual(byType.enemy, 31, "enemigos");
  assertEqual(byType.elite, 10, "elites (7 originales + 3 salas de puzles)");
  assertEqual(byType.boss, 7, "bosses");
});

test("cada reino cierra con un boss", () => {
  for (const r of REALMS) {
    const bosses = g.nodesOfRealm(r.id).filter((n) => n.t === "boss");
    assert(bosses.length === 1, `el reino ${r.name} debería tener exactamente 1 boss (tiene ${bosses.length})`);
  }
});

test("los ids de nodo son únicos", () => {
  const ids = NODES.map((n) => n.id);
  assertEqual(new Set(ids).size, ids.length, "ids duplicados");
});

test("todo requisito apunta a un nodo existente", () => {
  for (const n of NODES) {
    for (const r of n.req || []) {
      assert(!!g.nodeOf(r), `${n.id} requiere un id inexistente: ${r}`);
    }
  }
});

test("el árbol no tiene ciclos", () => {
  const done = new Set();
  const onPath = new Set();
  const visit = (id) => {
    assert(!onPath.has(id), `ciclo detectado en ${id}`);
    if (done.has(id)) return;
    onPath.add(id);
    (g.nodeOf(id).req || []).forEach(visit);
    onPath.delete(id);
    done.add(id);
  };
  NODES.forEach((n) => visit(n.id));
});

test("cada reino tiene un nodo raíz sin requisitos", () => {
  const roots = NODES.filter((n) => !n.req || n.req.length === 0);
  assertEqual(roots.length, REALMS.length, "raíces del árbol");
  for (const r of REALMS) {
    const hasRoot = g.nodesOfRealm(r.id).some((n) => !n.req || n.req.length === 0);
    assert(hasRoot, `el reino ${r.name} no tiene nodo raíz`);
  }
});

test("todo nodo es alcanzable desde alguna raíz", () => {
  const memo = {};
  const reachable = (id) => {
    if (id in memo) return memo[id];
    const reqs = g.nodeOf(id).req || [];
    if (!reqs.length) return (memo[id] = true);
    return (memo[id] = reqs.every(reachable));
  };
  for (const n of NODES) {
    assert(reachable(n.id), `${n.id} es inalcanzable desde cualquier raíz`);
  }
});

test("cada boss depende del elite de su reino", () => {
  for (const r of REALMS) {
    const nodes = g.nodesOfRealm(r.id);
    const boss = nodes.find((n) => n.t === "boss");
    const elite = nodes.find((n) => n.t === "elite");
    assert(!!boss, `el reino ${r.name} necesita un boss`);
    assert(!!elite, `el reino ${r.name} necesita un elite`);
    assert(boss.req.includes(elite.id), `${boss.id} debería depender de ${elite.id}`);
    assert(!boss.req.includes(boss.id), `${boss.id} no puede depender de sí mismo`);
  }
});

test("cada elite depende de nodos de su propio reino", () => {
  for (const n of NODES.filter((x) => x.t === "elite")) {
    const local = n.req.filter((rid) => g.nodeOf(rid).r === n.r);
    assertAtLeast(local.length, 1, `${n.id} (elite) debería depender de un nodo de su reino`);
  }
});

suite("Preguntas");

test("el banco Lambda heredado se conserva íntegro", () => {
  assertEqual(BANK.length, 52, "preguntas heredadas");
  for (const q of BANK) {
    assertEqual(q.o.length, 4, `opciones de "${q.q}"`);
    assert(q.a >= 0 && q.a <= 3, `índice de respuesta inválido en "${q.q}"`);
    assert(!!q.e, `falta explicación en "${q.q}"`);
  }
});

test("todas las preguntas están bien formadas", () => {
  let total = 0;
  for (const n of NODES) {
    for (const q of g.expandQ(n)) {
      total++;
      /* los retos alternos (matching, sopa, crucigrama) no son tuplas de quiz */
      if (!Array.isArray(q)) {
        assert(typeof q.type === "string", `reto alterno sin type en ${n.id}`);
        assert(q.id && q.title && q.hint, `reto alterno sin metadatos en ${n.id}`);
        continue;
      }
      const [text, optsRaw, answer, explain] = q;
      assert(typeof text === "string" && text.length > 8, `texto inválido en ${n.id}`);
      const opts = String(optsRaw).split("|");
      assertEqual(opts.length, 4, `opciones de ${n.id}: "${text}"`);
      assertEqual(typeof answer, "number", `respuesta no numérica en ${n.id}`);
      assert(answer >= 0 && answer <= 3, `respuesta fuera de rango en ${n.id}`);
      assert(typeof explain === "string" && explain.length > 15, `explicación corta en ${n.id}`);
      opts.forEach((o, i) => {
        assert(o.trim().length > 0, `opción ${i} vacía en ${n.id}`);
        if (i === answer) {
          const key = o.trim().toLowerCase();
          assert(!!key, `la respuesta correcta está vacía en ${n.id}`);
        }
      });
    }
  }
  assertAtLeast(total, 200, "total de preguntas disponibles");
  assertEqual(total, TOTAL_QUESTIONS, "TOTAL_QUESTIONS coincide con la expansión");
});

test("no hay preguntas repetidas dentro de un nodo", () => {
  for (const n of NODES) {
    const texts = g.expandQ(n)
      .filter((q) => Array.isArray(q))
      .map((q) => q[0]);
    assertEqual(new Set(texts).size, texts.length, `preguntas repetidas en ${n.id}`);
  }
});

test("los marcadores de tema Lambda son válidos", () => {
  const topics = new Set(BANK.map((b) => b.t));
  let markers = 0;
  for (const n of NODES) {
    for (const entry of n.q) {
      if (typeof entry !== "string") continue;
      markers++;
      const [topic, count] = entry.split(":");
      assert(topics.has(topic), `tema inexistente "${topic}" en ${n.id}`);
      assertAtLeast(+count, 1, `cantidad inválida en ${n.id}: ${entry}`);
      const available = BANK.filter((b) => b.t === topic).length;
      assert(+count <= available, `${n.id} pide ${count} de "${topic}" pero solo hay ${available}`);
    }
  }
  assertAtLeast(markers, 12, "marcadores que reutilizan el banco Lambda");
});

test("las 52 preguntas heredadas alimentan los nodos de Lambda", () => {
  const lambdaNodes = NODES.filter((n) => n.id.startsWith("cmp-lambda-"));
  assertEqual(lambdaNodes.length, 4, "nodos de Lambda");
  const covered = new Set();
  for (const n of lambdaNodes) {
    for (const entry of n.q) {
      if (typeof entry !== "string") continue;
      const topic = entry.split(":")[0];
      BANK.filter((b) => b.t === topic).forEach((b) => covered.add(b.q));
    }
  }
  assertAtLeast(covered.size, 40, "preguntas heredadas cubiertas por los nodos de Lambda");
});

suite("Economía de progresión");

test("el umbral de aprobado es 70%", () => {
  assertEqual(PASS_PCT, 70, "PASS_PCT");
});

test("cada nodo otorga XP proporcional a su dificultad", () => {
  for (const n of NODES) {
    assertAtLeast(n.xp, 50, `XP de ${n.id}`);
  }
  const total = NODES.reduce((a, n) => a + n.xp, 0);
  assertAtLeast(total, 5000, "XP total del árbol");
});

test("los XP de nodo crecen con el nivel", () => {
  for (const r of REALMS) {
    const ns = g.nodesOfRealm(r.id).sort((a, b) => a.tier - b.tier);
    for (let i = 1; i < ns.length; i++) {
      if (ns[i].tier === ns[i - 1].tier) continue;
      assert(ns[i].xp >= ns[i - 1].xp, `${ns[i].id} (Nv${ns[i].tier}) no paga más que ${ns[i - 1].id}`);
    }
  }
});

test("la tabla de rangos es creciente y acaba en arquitecto", () => {
  assertEqual(RANKS[0].xp, 0, "el primer rango arranca en 0 XP");
  for (let i = 1; i < RANKS.length; i++) {
    assert(RANKS[i].xp > RANKS[i - 1].xp, `rango ${i} no crece`);
  }
  assertEqual(g.rankOf(0).cur.name, "Becario Cloud", "rango inicial");
  assertEqual(g.rankOf(1e9).cur.name, "Principal Architect", "rango máximo");
  assert(g.rankOf(1e9).toNext === 100, "sin rango siguiente el progreso marca 100%");
});

test("los objetos de la tienda están bien definidos", () => {
  assertEqual(ITEM_LIST.length, 3, "objetos");
  for (const it of ITEM_LIST) {
    assert(!!it.id && !!it.ico && !!it.name, `objeto incompleto: ${JSON.stringify(it)}`);
    assert(it.desc.length > 15, `descripción corta en ${it.id}`);
    assert(it.price > 0, `precio inválido en ${it.id}`);
    assert(g.P.inv[it.id] >= 0, `inventario inicial sin ${it.id}`);
  }
});

suite("Coherencia de la interfaz");

test("cada handler de onclick está definido", () => {
  /* En la versión modular, los onclick viven en los templates de los
     renderers (js/engine.js). El shell sólo enlaza scripts. */
  const fs = require("fs"), path = require("path");
  const code = ["js/data.js", "js/engine.js", "js/main.js"]
    .map((m) => fs.readFileSync(path.join(__dirname, "..", m), "utf8"))
    .join("\n");
  const handlers = [...new Set([...code.matchAll(/onclick="([a-zA-Z_$][\w$]*)\(/g)].map((m) => m[1]))];
  assert(handlers.length > 10, `solo ${handlers.length} handlers encontrados`);
  for (const fn of handlers) {
    assert(
      new RegExp(`(?:function|const|let|var)\\s+${fn}\\b`).test(code),
      `el handler ${fn} no está definido en los módulos`
    );
  }
});

test("el HTML es autocontenido", () => {
  const html = g.__html;
  /* la versión modular usa <script src> para los 3 módulos */
  const scripts = (html.match(/<script/g) || []).length;
  assertAtLeast(scripts, 1, "al menos un <script>");
  const styles = (html.match(/<link[^>]+stylesheet/g) || []).length;
  assertAtLeast(styles, 1, "al menos una hoja de estilo enlazada");
  const external = (html.match(/https?:\/\/(?!www\.w3\.org)/g) || []).length;
  assertEqual(external, 0, "referencias externas (CDN, fuentes)");
  /* los 3 módulos existen */
  const fs = require("fs"), path = require("path");
  for (const m of ["js/data.js", "js/engine.js", "js/main.js", "css/style.css"]) {
    assert(fs.existsSync(path.join(__dirname, "..", m)), `falta el módulo ${m}`);
  }
});

test("no quedan marcadores de desarrollo en el archivo", () => {
  assert(!g.__html.includes("__DATA__"), "queda el marcador __DATA__");
  assert(!g.__html.includes("__ENGINE__"), "queda el marcador __ENGINE__");
});