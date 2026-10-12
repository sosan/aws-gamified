#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Genera el banco bilingüe del juego a partir de las traducciones en translations/out/.

Cada pregunta del banco pasa a tener forma:
  { t,  es: {q, o, e?}, en: {q, o, e?}, a }
El juego elige el idioma activo en tiempo de ejecución.

Uso:
  python3 scripts/make_bilingual.py            # lee translations/out/*.out.json
"""
import json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "translations", "out")
SRC_SB = os.path.join(ROOT, "translations", "skillbuilder_src.json")
SRC_LEG = os.path.join(ROOT, "translations", "legacy_src.json")
OUT_JSON = os.path.join(ROOT, "translations", "bilingual_bank.json")

def load(p):
    with open(p, encoding="utf-8") as f:
        return json.load(f)

def norm_ids(arr):
    """El orden de salida debe respetar los ids numéricos."""
    return sorted(arr, key=lambda x: x["id"])

def main():
    sb_src = norm_ids(load(SRC_SB))          # 748, en inglés (origen)
    leg_src = norm_ids(load(SRC_LEG))        # 83, en español (origen)

    # traducidos: sb_en2es_*.out.json (question/options en español)
    #             legacy_es2en_*.out.json    (q/o/e en inglés)
    outs = {}
    for f in os.listdir(OUT_DIR):
        if f.endswith(".out.json"):
            outs[f] = load(os.path.join(OUT_DIR, f))

    def find_out(prefix):
        return [v for k, v in outs.items() if k.startswith(prefix)]

    sb_es = []
    for f in find_out("sb_en2es_"):
        sb_es.extend(f)
    leg_en = []
    for f in find_out("legacy_es2en_"):
        leg_en.extend(f)

    sb_es = norm_ids(sb_es)
    leg_en = norm_ids(leg_en)

    errors = []
    bank = []

    # --- SkillBuilder (EN nativo + ES traducido) ---
    for src, es in zip(sb_src, sb_es):
        if src["id"] != es["id"]:
            errors.append(f"SB id mismatch {src['id']} vs {es['id']}")
            continue
        if src["correct"] != es["correct"]:
            errors.append(f"SB correct mismatch id {src['id']}: {src['correct']} vs {es['correct']}")
            continue
        bank.append({
            "t": src["category"],
            "es": {"q": es["question"], "o": es["options"], "e": ""},
            "en": {"q": src["question"], "o": src["options"], "e": ""},
            "a": src["correct"][0] if len(src["correct"]) == 1 else src["correct"],
            "multi": len(src["correct"]) > 1,
        })

    # --- Legacy (ES nativo + EN traducido) ---
    for src, en in zip(leg_src, leg_en):
        if src["id"] != en["id"]:
            errors.append(f"LEG id mismatch {src['id']} vs {en['id']}")
            continue
        # legacy correct: 'a' es índice o array
        src_a = src["a"]
        corrects = src_a if isinstance(src_a, list) else [src_a]
        if en["a"] != src_a:
            errors.append(f"LEG a mismatch id {src['id']}")
            continue
        bank.append({
            "t": src["t"],
            "es": {"q": src["q"], "o": src["o"], "e": src.get("e", "")},
            "en": {"q": en["q"], "o": en["o"], "e": en.get("e", "")},
            "a": src_a,
            "multi": isinstance(src_a, list),
        })

    if errors:
        print("ERRORES:")
        for e in errors[:40]:
            print("  ", e)
        print(f"Total: {len(errors)} errores")
        sys.exit(1)

    bank.sort(key=lambda x: x["t"])
    with open(OUT_JSON, "w", encoding="utf-8") as f:
        json.dump(bank, f, ensure_ascii=False, indent=1)
    print(f"OK: {len(bank)} preguntas bilingües → {os.path.relpath(OUT_JSON, ROOT)}")

    # js/bank.js: el archivo que carga el juego (define BILINGUAL_BANK)
    OUT_JS = os.path.join(ROOT, "js", "bank.js")
    with open(OUT_JS, "w", encoding="utf-8") as f:
        f.write("/* Banco bilingüe (generado por scripts/make_bilingual.py) */\n")
        f.write("/* Formato: {t, es:{q,o,e}, en:{q,o,e}, a, multi} · a índice o array */\n")
        f.write("const BILINGUAL_BANK = ")
        json.dump(bank, f, ensure_ascii=False, indent=1)
        f.write(";\n")
    print(f"→ {os.path.relpath(OUT_JS, ROOT)}")

if __name__ == "__main__":
    main()