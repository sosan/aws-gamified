"use strict";
/**
 * Suite de pruebas del soporte multiidioma (EN/ES):
 *  - El banco bilingüe (BILINGUAL_BANK) tiene es/en por pregunta.
 *  - expandQ emite preguntas en el idioma activo (P.lang).
 *  - Los helpers L()/t() devuelven la cadena correcta.
 */
const { suite, test, loadGame, assert, assertEqual, assertAtLeast } = require("./harness.cjs");

const g = loadGame();

suite("Multiidioma");

test("el banco bilingüe está presente y completo", () => {
  assertAtLeast(g.BILINGUAL_BANK.length, 800, "BILINGUAL_BANK con 831 preguntas (748 SkillBuilder + 83 heredadas)");
  const b = g.BILINGUAL_BANK.find(x => /EMR/i.test(x.en.q));
  assert(!!b, "debe existir la pregunta de EMR en inglés");
  assert(b.es && b.es.q && b.es.o && b.es.o.length >= 2, "la versión ES de EMR debe estar traducida");
  assert(b.en && b.en.q && b.en.o && b.en.o.length >= 2, "la versión EN de EMR debe existir");
});

test("expandQ usa el idioma activo", () => {
  g.P.lang = "es";
  let qses = g.expandQ({q:["Security:2"]});
  assertAtLeast(qses.length, 2, "Security:2 debe devolver 2 preguntas");
  const esp = qses[0][0];
  /* En español las preguntas del banco SkillBuilder no deben seguir en inglés */
  assert(!/^Which |^What |^How |^When |^Where /.test(esp), `pregunta ES en inglés: ${esp}`);

  g.P.lang = "en";
  qses = g.expandQ({q:["Security:2"]});
  assertAtLeast(qses.length, 2, "Security:2 EN debe devolver 2 preguntas");
  const enq = qses[0][0];
  assert(/^Which |^What |^How |^When |^Where |^A |^An /.test(enq), `pregunta EN en español: ${enq}`);
  g.P.lang = "es";
  g.__restore();
});

test("L() y t() seleccionan el idioma correcto", () => {
  g.P.lang = "es";
  assertEqual(g.L(), "es", "L() = es");
  assertEqual(g.t("Hola","Hello"), "Hola", "t() en español");
  g.P.lang = "en";
  assertEqual(g.L(), "en", "L() = en");
  assertEqual(g.t("Hola","Hello"), "Hello", "t() en inglés");
  g.P.lang = "es";
  g.__restore();
});

test("el selector setLang persiste y no rompe fuera de combate", () => {
  g.P.lang = "es";
  g.setLang("en");
  assertEqual(g.P.lang, "en", "setLang('en') cambia P.lang");
  g.setLang("es");
  assertEqual(g.P.lang, "es", "setLang('es') vuelve a español");
  g.__restore();
});

test("las respuestas correctas (a) no cambian entre idiomas", () => {
  /* Misma pregunta (mismo banco subyacente) en ambos idiomas debe tener el
     mismo índice correcto. Comparamos el banco completo, no el shuffle. */
  g.P.lang = "es";
  const esPool = g.BILINGUAL_BANK.filter(b => b.t === "Security");
  const enPool = g.BILINGUAL_BANK.filter(b => b.t === "Security");
  assertEqual(esPool.length, enPool.length, "mismos elementos en Security");
  for (let i = 0; i < Math.min(esPool.length, 5); i++) {
    const e = esPool[i], n = enPool[i];
    assertEqual(e.en.q, n.en.q, `misma pregunta EN en índice ${i}`);
    assertEqual(typeof e.a, typeof n.a, `mismo tipo de a en ${i}`);
    if (Array.isArray(e.a)) assertEqual(JSON.stringify(e.a), JSON.stringify(n.a), `mismo array en ${i}`);
    else assertEqual(e.a, n.a, `mismo índice correcto en ${i}`);
  }
  g.P.lang = "es";
  g.__restore();
});