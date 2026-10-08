#!/usr/bin/env node
"use strict";
/**
 * Runner de las pruebas del AWS Skill Tree RPG.
 *
 *   node tests/run.cjs              todas las suites
 *   node tests/run.cjs battle       solo las que coincidan con "battle"
 *
 * Sin dependencias externas: usa el módulo node:test y el runner de Node.
 */
const path = require("path");
const fs = require("fs");
const { spawnSync } = require("child_process");

const TESTS_DIR = __dirname;
const filter = process.argv[2] || "";

const files = fs
  .readdirSync(TESTS_DIR)
  .filter((f) => f.endsWith(".test.cjs"))
  .filter((f) => !filter || f.includes(filter))
  .sort();

if (!files.length) {
  console.error(`No hay suites que coincidan con "${filter}".`);
  console.error(`Disponibles: ${fs.readdirSync(TESTS_DIR).filter((f) => f.endsWith(".test.cjs")).join(", ")}`);
  process.exit(1);
}

console.log(`\n▶ Ejecutando ${files.length} suite(s): ${files.join(", ")}\n`);

let failed = 0;

for (const file of files) {
  const res = spawnSync(
    process.execPath,
    ["--test", path.join(TESTS_DIR, file)],
    { stdio: "inherit", env: process.env }
  );
  if (res.status !== 0) failed++;
}

console.log("");
if (failed) {
  console.error(`✗ ${failed} suite(s) con fallos\n`);
  process.exit(1);
}
console.log(`✓ ${files.length} suite(s) en verde\n`);