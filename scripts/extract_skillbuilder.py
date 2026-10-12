#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Extractor de preguntas del HTML de AWS Skill Builder (Solution Center).
Genera:
  1. skillbuilder_raw.json   -> datos crudos: categoría, pregunta, opciones, correctas[] (multi-select real)
  2. skillbuilder_bank.js    -> banco en el formato que usa el juego AWS Skill Tree RPG
                                (BANK con {t,q,o,a,e}; multi-select -> primera correcta, a:Array)

Uso:  python3 scripts/extract_skillbuilder.py [ruta_al_html]
"""
import re
import json
import sys
from html import unescape

SRC = sys.argv[1] if len(sys.argv) > 1 else "skillbuilder.html"
OUT_RAW = "skillbuilder_raw.json"
OUT_BANK = "js/skillbuilder_bank.js"

CARD_SEP = '<div class="p-4 w-full flex flex-col justify-between gap-5 bg-secondary-dark-1 rounded md:rounded-lg">'

def clean(t):
    t = re.sub(r"\s+", " ", t).strip()
    return unescape(t)

def main():
    src = open(SRC, encoding="utf-8").read()
    cards = src.split(CARD_SEP)[1:]
    raw, bank = [], []
    stats = {"multi": 0, "single": 0, "skip": 0}
    cats = {}

    for i, card in enumerate(cards, 1):
        # --- pregunta (h2 > span) ---
        m = re.search(r'<h2[^>]*>\s*<span[^>]*>([^<]+)</span>', card)
        if not m:
            stats["skip"] += 1
            continue
        question = clean(m.group(1))

        # --- opciones: solo role="radio" (excluye el checkbox de la pregunta) ---
        opts = re.findall(
            r'aria-checked="(true|false)"[^>]*?\brole="radio"[^>]*?\bname="([^"]+)"',
            card,
        )
        if not opts:
            stats["skip"] += 1
            continue

        options = [clean(t) for (_ck, t) in opts]
        correct = [i for (i, (_ck, _t)) in enumerate(opts) if _ck == "true"]
        if not correct:
            stats["skip"] += 1
            continue

        # --- categoría: último badge (span con bg-*) ---
        badges = re.findall(r'bg-[a-z-]+">([^<]+)</span>', card)
        category = clean(badges[-1]) if badges else "General"
        cats[category] = cats.get(category, 0) + 1

        multi = len(correct) > 1
        stats["multi" if multi else "single"] += 1

        raw.append({
            "id": i,
            "category": category,
            "question": question,
            "options": options,
            "correct": correct,        # lista de índices (soporta multi-select)
            "multiSelect": multi,
        })

        # --- formato del juego: BANK {t,q,o,a,e} ---
        bank.append({
            "t": category,
            "q": question,
            "o": options,
            "a": correct if multi else correct[0],
            "e": "",
        })

    # salida raw (JSON aparte, el objetivo del usuario)
    with open(OUT_RAW, "w", encoding="utf-8") as f:
        json.dump(raw, f, ensure_ascii=False, indent=2)

    # salida integrable (formato BANK)
    with open(OUT_BANK, "w", encoding="utf-8") as f:
        f.write("/* Banco generado por scripts/extract_skillbuilder.py */\n")
        f.write("/* Formato: {t: tema/categoría, q: pregunta, o: opciones, a: correcta(s), e: explicación} */\n")
        f.write("/* Multi-select: 'a' es un array de índices correctos. */\n")
        f.write("const SKILLBUILDER_BANK = ")
        json.dump(bank, f, ensure_ascii=False, indent=2)
        f.write(";\n")

    print(f"Total: {len(raw)} preguntas")
    print(f"  multi-select: {stats['multi']}")
    print(f"  single: {stats['single']}")
    print(f"  omitidas: {stats['skip']}")
    print("Categorías:")
    for k, v in sorted(cats.items(), key=lambda x: -x[1]):
        print(f"  {v:4d}  {k}")
    print(f"→ {OUT_RAW}")
    print(f"→ {OUT_BANK}")

if __name__ == "__main__":
    main()
