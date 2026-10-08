#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const HTML = path.join(ROOT, "aws_skill_rpg.html");

const html = fs.readFileSync(HTML, "utf8");

const styleM = html.match(/<style>([\s\S]*?)<\/style>/);
if (!styleM) throw new Error("no se encontró <style>");
fs.mkdirSync(path.join(ROOT, "css"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "css", "style.css"), styleM[1]);

const scriptM = html.match(/<script>([\s\S]*?)<\/script>/);
if (!scriptM) throw new Error("no se encontró <script>");
const script = scriptM[1];

const motorAnchor = "/* ======================================================================\n   MOTOR DEL JUEGO";
const motorIdx = script.indexOf(motorAnchor);
if (motorIdx < 0) throw new Error("no se encontró el delimitador MOTOR DEL JUEGO");

const bootAnchor = 'window.addEventListener("resize"';
const bootIdx = script.indexOf(bootAnchor, motorIdx);
if (bootIdx < 0) throw new Error("no se encontró el arranque (resize listener)");

const dataJs   = script.slice(0, motorIdx);
const engineJs = script.slice(motorIdx, bootIdx).replace(/\n+$/,"") + "\n";
const mainJs   = script.slice(bootIdx);

fs.mkdirSync(path.join(ROOT, "js"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "js", "data.js"),   dataJs);
fs.writeFileSync(path.join(ROOT, "js", "engine.js"), engineJs);
fs.writeFileSync(path.join(ROOT, "js", "main.js"),   mainJs);

const shell = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>AWS Skill Tree RPG · Domina la Nube</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<div id="fx"></div>
<div id="app"></div>
<script src="js/data.js"></script>
<script src="js/engine.js"></script>
<script src="js/main.js"></script>
</body>
</html>
`;
fs.writeFileSync(HTML, shell);

console.log("OK · css=" + styleM[1].length + "B data=" + dataJs.length + "B engine=" + engineJs.length + "B main=" + mainJs.length);
