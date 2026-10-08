/* ======================================================================
   MOTOR DEL JUEGO
   ====================================================================== */
const SAVE_KEY = "aws-rpg-save-v1";
const app = document.getElementById("app");

/* ---------- AUDIO ---------- */
let AC = null;
function ac(){ if(!AC) AC = new (window.AudioContext||window.webkitAudioContext)(); return AC; }
function tone(f0,f1,dur,vol,type){
  if(P.muted) return;
  try{
    const a = ac(), o = a.createOscillator(), g = a.createGain();
    o.type = type || "sine";
    o.frequency.setValueAtTime(f0, a.currentTime);
    if(f1) o.frequency.exponentialRampToValueAtTime(f1, a.currentTime+dur);
    g.gain.setValueAtTime(vol, a.currentTime);
    g.gain.exponentialRampToValueAtTime(.0001, a.currentTime+dur);
    o.connect(g); g.connect(a.destination); o.start(); o.stop(a.currentTime+dur);
  }catch(e){}
}
const sfx = {
  click:()=>tone(560,560,.05,.13,"square"),
  hit:()=>{tone(420,720,.12,.2);tone(760,980,.1,.14)},
  crit:()=>{[880,1180,1500].forEach((f,i)=>setTimeout(()=>tone(f,f,.09,.2),i*45))},
  miss:()=>tone(200,120,.3,.28,"triangle"),
  unlock:()=>{[523,659,784,1046].forEach((f,i)=>setTimeout(()=>tone(f,f,.16,.2),i*90))},
  win:()=>{[523,659,784,1046,1318].forEach((f,i)=>setTimeout(()=>tone(f,f,.22,.22),i*110))},
  lose:()=>{[392,349,294,220].forEach((f,i)=>setTimeout(()=>tone(f,f,.3,.22),i*180))},
  coin:()=>{tone(1200,1600,.08,.16);setTimeout(()=>tone(1600,2000,.1,.14),70)}
};

/* ---------- ESTADO ---------- */
const P = {
  muted:false,
  xp:0, gold:120,
  lives:3,
  cleared:{},        /* nodeId -> {best, tries} */
  inv:{potion:1, shield:1, oracle:1},
  stats:{kills:0, bosses:0, deaths:0, perfect:0},
  trained:{},        /* nodeId -> true (entrenamiento libre) */
  lastNode:null
};

function load(){
  try{
    const raw = localStorage.getItem(SAVE_KEY);
    if(raw) Object.assign(P, JSON.parse(raw));
  }catch(e){}
}
function save(){
  try{ localStorage.setItem(SAVE_KEY, JSON.stringify(P)); }catch(e){}
}
load();

/* ---------- MAPA DE NODOS ---------- */
const NODE = {};
NODES.forEach(n=>NODE[n.id]=n);
const nodeOf = id => NODE[id];

/* Desafíos: los retos de quiz siguen siendo tuplas [texto, "A|B|C|D", idx, expl].
   Los retos alternos son objetos {type:"match"|"wordsearch"|"crossword", ...}.
   chType() normaliza: Array → quiz, objeto → su type. */
function chType(c){ return Array.isArray(c) ? "quiz" : (c && c.type) || "quiz"; }

/* Banco por tipo de reto alterno (definidos en data.js) */
const CH_BANK = {match:MATCH_BANK, wordsearch:WORDS_BANK, crossword:CROSS_BANK};

/* Instancia un reto alterno: elige un set del banco (ref = id de set, tag o "__any") */
function instantiateChallenge(entry){
  const bank = CH_BANK[entry.type];
  if(!bank) return null;
  const ref = entry.ref || "__any";
  const pool = bank.filter(s=>{
    if(ref==="__any") return true;
    return (s.tags||[]).includes(ref);
  });
  if(!pool.length) return null;
  const s = pool[Math.floor(Math.random()*pool.length)];
  if(entry.type==="wordsearch"){
    /* genera la sopa en el instante: tamaño adaptativo hasta que quepan */
    let made = null, size = 11;
    while(!made && size<=15){ made = buildWordGrid(s.words,{size}); size++; }
    if(!made) return null;
    return {type:"wordsearch", id:s.id, title:s.title, hint:s.hint, words:[...s.words], grid:made.grid, placed:made.placed};
  }
  if(entry.type==="crossword"){
    /* Si un crucigrama del banco es inconsistente, lo saltamos para que el
       juego siga cargando. La verificación por suite lo cazará en tests. */
    let g = null;
    try{ g = buildCrossGrid(s); }catch(e){ return null; }
    return {type:"crossword", id:s.id, title:s.title, hint:s.hint, words:s.words, grid:g.grid, W:g.W, H:g.H};
  }
  /* match */
  return {type:"match", id:s.id, title:s.title, hint:s.hint, pairs:s.pairs.map(p=>({a:p[0],b:p[1]}))};
}

/* preguntas y retos resueltos: marcadores "Tema:N" toman del BANK heredado;
   entradas-objeto {type,ref,n} instancian retos alternos */
function expandQ(n){
  const out = [];
  (n.q||[]).forEach(entry=>{
    if(typeof entry === "string"){
      const [topic,count] = entry.split(":");
      const k = +count || 4;
      const pool = BANK.filter(b=>b.t===topic).map(b=>[b.q,b.o.join("|"),b.a,b.e]);
      const picked = shuffle(pool).slice(0, Math.min(k, pool.length));
      picked.forEach(p=>out.push(p));
    }else if(entry && typeof entry === "object" && entry.type){
      const made = instantiateChallenge(entry);
      if(made) out.push(made);
    }else{
      out.push(entry);
    }
  });
  return out;
}
function allQuestionsFor(n){ return expandQ(n); }

/* total de preguntas y retos disponibles (inline + banco heredado + retos alternos) */
const TOTAL_QUESTIONS = NODES.reduce((a,n)=>a+expandQ(n).length, 0);

/* tiempo por tipo de reto: la sopa de letras tiene 5 minutos y cada palabra
   encontrada añade 5s; los crucigramas dan más margen que una pregunta de quiz */
function timeFor(c){
  const t = chType(c);
  if(t==="wordsearch") return 300;
  if(t==="crossword") return 75;
  if(t==="match") return 40;
  return B.baseTmax || 20;
}

/* ---------- PROGRESO / REQUISITOS ---------- */
const PASS_PCT = 70;

function isCleared(id){ return !!P.cleared[id]; }
function pct(id){ const c = P.cleared[id]; return c ? c.best : 0; }
function unlocked(id){
  const n = nodeOf(id);
  return (n.req||[]).every(r => pct(r) >= PASS_PCT);
}
function missingReqs(id){
  return (nodeOf(id).req||[]).filter(r => pct(r) < PASS_PCT);
}
function anyAvailable(){ return NODES.some(n=>!isCleared(n.id) && unlocked(n.id)); }
function clearedCount(){ return Object.keys(P.cleared).length; }
function totalPct(){
  const v = NODES.map(n=>pct(n.id));
  return v.length ? Math.round(v.reduce((a,b)=>a+b,0)/v.length) : 0;
}

/* nivel de jugador por XP total */
const RANKS = [
  {xp:0,     name:"Becario Cloud",       ico:"🌱"},
  {xp:400,   name:"Cloud Explorer",      ico:"🔍"},
  {xp:1100,  name:"Junior Architect",    ico:"📐"},
  {xp:2200,  name:"Solutions Associate", ico:"🎓"},
  {xp:3800,  name:"Solutions Developer", ico:"⚙️"},
  {xp:6000,  name:"Senior Engineer",     ico:"🛠️"},
  {xp:9000,  name:"Cloud Architect",     ico:"🏛️"},
  {xp:14000, name:"Principal Architect", ico:"🗿"}
];
function rankOf(xp){
  let cur = RANKS[0];
  for(const r of RANKS) if(xp >= r.xp) cur = r;
  const next = RANKS.find(r=>r.xp > xp);
  return {cur, next, toNext: next ? Math.round((xp-cur.xp)/(next.xp-cur.xp)*100) : 100};
}
const rank = () => rankOf(P.xp);

/* ---------- HELPERS ---------- */
function shuffle(a){ const b=[...a]; for(let i=b.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [b[i],b[j]]=[b[j],b[i]] } return b; }
function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
function pctFmt(n){ return n+"%"; }
function realmOf(id){ return REALMS.find(r=>r.id===id); }
function nodeTag(n){ return n.t==="boss" ? "boss" : n.t==="elite" ? "elite" : "enemy"; }
function nodeTypeLabel(n){
  return n.t==="boss" ? "⚔️ BOSS" : n.t==="elite" ? "💀 ELITE" : "⚔️ Enemigo";
}
function nodesOfRealm(rid){ return NODES.filter(n=>n.r===rid); }

function toast(msg){
  const el = document.createElement("div");
  el.className = "toast"; el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(()=>el.remove(), 2500);
}

function floatNum(x,y,txt,cls){
  const fx = document.getElementById("fx");
  const el = document.createElement("div");
  el.className = "float "+(cls||"");
  el.style.left = x+"px"; el.style.top = y+"px";
  el.textContent = txt;
  fx.appendChild(el);
  setTimeout(()=>el.remove(), 1100);
}
function shake(){
  const c = document.querySelector(".card");
  if(!c) return;
  c.classList.remove("shake-screen");
  void c.offsetWidth;
  c.classList.add("shake-screen");
}

/* ---------- CONFETTI ---------- */
const cv = document.createElement("canvas");
cv.id = "confetti";
/* inline styles: garantizamos position:fixed + pointer-events:none incluso si
   el CSS está cacheado, así el canvas NUNCA bloquea clicks ni genera espacio. */
cv.style.cssText = "position:fixed !important;left:0 !important;top:0 !important;right:0 !important;bottom:0 !important;width:100% !important;height:100% !important;pointer-events:none !important;z-index:55 !important";
document.body.appendChild(cv);
const cx = cv.getContext("2d");
let parts = [], confOn = false;
function sizeConfetti(){ cv.width = innerWidth; cv.height = innerHeight; }
sizeConfetti(); addEventListener("resize", sizeConfetti);
function launchConfetti(n){
  const colors = ["#FF9900","#53A8FB","#2EC5BE","#A36BFF","#6BC853","#F06292","#ffd166"];
  const count = n || 170;
  for(let i=0;i<count;i++){
    parts.push({
      x: innerWidth/2 + (Math.random()-.5)*260, y: innerHeight*.32,
      vx:(Math.random()-.5)*10, vy: Math.random()*-12-3,
      s: 6+Math.random()*8, c: colors[i%colors.length],
      r: Math.random()*Math.PI, vr:(Math.random()-.5)*.22, life:1
    });
  }
  if(!confOn){ confOn = true; requestAnimationFrame(drawConfetti); }
}
function drawConfetti(){
  cx.clearRect(0,0,cv.width,cv.height);
  parts.forEach(p=>{
    p.x+=p.vx; p.y+=p.vy; p.vy+=.32; p.r+=p.vr; p.life-=.006;
    cx.save(); cx.translate(p.x,p.y); cx.rotate(p.r);
    cx.globalAlpha = Math.max(0,p.life); cx.fillStyle = p.c;
    cx.fillRect(-p.s/2,-p.s/2,p.s,p.s*.6); cx.restore();
  });
  parts = parts.filter(p=>p.life>0 && p.y < cv.height+50);
  if(parts.length) requestAnimationFrame(drawConfetti); else confOn = false;
}

/* ---------- HUD ---------- */
function hearts(l){ return Array.from({length:l},(_,i)=>`<span class="h">❤️</span>`).join(""); }
function hudHTML(){
  const r = rank();
  return `<div class="hud">
    <div class="brand"><div class="mk">λ</div><div><div>AWS SKILL TREE</div>
      <div style="font-size:10px;color:var(--soft);letter-spacing:1px">RPG DE CERTIFICACIÓN</div></div></div>
    <div class="who">
      <div class="t">${r.cur.ico} ${r.cur.name}</div>
      <div class="s">NIVEL ${RANKS.indexOf(r.cur)+1} · ${P.xp.toLocaleString()} XP</div>
      <div class="xpbar"><i style="width:${r.toNext}%"></i></div>
    </div>
    <div class="sp"></div>
    <div class="pill hp"><span class="hudhearts">${hearts(P.lives)}</span></div>
    <div class="pill gold"><span>🪙</span><span>${P.gold}</span></div>
    <div class="pill xp"><span>💎</span><span>${clearedCount()}/${NODES.length}</span></div>
    <button class="btn btn-sm" onclick="toggleMute()">${P.muted?"🔇":"🔊"}</button>
  </div>`;
}
function invHTML(){
  return `<div class="invbar">
    <div class="lbl">Inventario</div>
    ${ITEM_LIST.map(it=>`<div class="inv ${P.inv[it.id]?"":"empty"}" data-item="${it.id}"
      title="${esc(it.name)}: ${esc(it.desc)} (usar durante el combate)"
      onclick="useItem('${it.id}')">${it.ico}<span class="cnt">${P.inv[it.id]||0}</span></div>`).join("")}
  </div>`;
}

/* ---------- ITEMS ---------- */
const ITEM_LIST = [
  {id:"potion", ico:"🧪", name:"Poción de vida",      desc:"Restaura una vida durante el combate.", price:45},
  {id:"shield", ico:"🛡️", name:"Escudo de AWS",      desc:"Absorbe el próximo golpe sin perder vida.", price:60},
  {id:"oracle", ico:"🔮", name:"Oráculo",            desc:"Elimina dos opciones incorrectas de la pregunta actual.", price:40}
];

/* ---------- RENDER: TITULO ---------- */
function screenTitle(){
  document.getElementById("app").innerHTML = `
    <div class="card title">
      <div class="crest">λ</div>
      <h1>AWS SKILL TREE <em>RPG</em></h1>
      <div class="sub">Domina la nube combatiendo · ${NODES.length} nodos · ${TOTAL_QUESTIONS} desafíos</div>
      <div class="facts">
        <div class="fact">Reinos <b>${REALMS.length}</b></div>
        <div class="fact">Enemigos <b>${NODES.filter(n=>n.t==="enemy").length}</b></div>
        <div class="fact">Elites <b>${NODES.filter(n=>n.t==="elite").length}</b></div>
        <div class="fact">Bosses <b>${NODES.filter(n=>n.t==="boss").length}</b></div>
        <div class="fact">Progreso <b>${totalPct()}%</b></div>
      </div>
      <div class="menu">
        <button class="mbtn" onclick="openMap()">
          <div class="ic">🗺️</div>
          <div class="tx"><b>Mapa de habilidades</b><span>Avanza por los 7 reinos y desbloquea nodos</span></div>
          <div class="tg">${clearedCount()}/${NODES.length}</div>
        </button>
        <button class="mbtn" onclick="openTraining()">
          <div class="ic">🎯</div>
          <div class="tx"><b>Entrenamiento libre</b><span>Combate libre sin progresión: clásico, asalto rápido y simulacro</span></div>
          <div class="tg">SIN LÍMITES</div>
        </button>
        <button class="mbtn" onclick="openShop()">
          <div class="ic">🛒</div>
          <div class="tx"><b>Tienda de objetos</b><span>Gasta oro en pociones, escudos y oráculos</span></div>
          <div class="tg">🪙 ${P.gold}</div>
        </button>
        <button class="mbtn" onclick="openBestiary()">
          <div class="ic">📖</div>
          <div class="tx"><b>Bestiario</b><span>Enemigos, elites y bosses de la nube</span></div>
          <div class="tg">${P.stats.kills}</div>
        </button>
      </div>
      <div style="margin-top:24px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
        <button class="btn btn-sm" onclick="openCodex()">🧾 Registro de trucos</button>
        <button class="btn btn-sm btn-danger" onclick="wipeSave()">🗑 Reiniciar progreso</button>
      </div>
      <div style="margin-top:18px;font-size:13px;color:var(--soft)">
        Vidas: ${P.lives} · Victorias: ${P.stats.kills} · Bosses: ${P.stats.bosses} ·
        Muertes: ${P.stats.deaths} · Perfectas: ${P.stats.perfect}
      </div>
    </div>` + invHTML();
  refreshInventory();
}
/* ---------- RENDER: MAPA ---------- */
function openMap(){
  const done = clearedCount();
  let html = `<div class="card screen mapcard" id="mapCard">
    <div class="map-head">
      <h2>🗺️ Mapa de habilidades</h2>
      <div class="legend">
        <div class="lg"><i style="background:var(--orange)"></i>Disponible</div>
        <div class="lg"><i style="background:var(--green)"></i>Superado</div>
        <div class="lg"><i style="background:var(--soft)"></i>Bloqueado</div>
        <div class="lg">💀 Elite</div>
        <div class="lg">👹 Boss</div>
      </div>
    </div>`;

  REALMS.forEach(r=>{
    const ns = nodesOfRealm(r.id);
    const rd = ns.filter(n=>isCleared(n.id)).length;
    const unlockedAny = ns.some(n=>unlocked(n.id));
    html += `<div class="realm ${unlockedAny?"":"locked"}" style="--rc:${r.color}">
      <div class="realm-head">
        <div class="rsp">${r.sprite}</div>
        <div class="rt"><b>${esc(r.name)}</b><span>${esc(r.desc)}</span></div>
        <div class="rp">${rd}/${ns.length}</div>
      </div>
      <div class="nodes" id="realm-${r.id}">
        ${ns.map(n=>nodeHTML(n)).join("")}
      </div>
    </div>`;
  });

  html += `<div style="display:flex;gap:12px;justify-content:center;margin-top:26px;flex-wrap:wrap">
      <button class="btn btn-primary" onclick="openMap()">🔄 Ver progreso</button>
      <button class="btn" onclick="screenTitle()">🏠 Inicio</button>
      <button class="btn" onclick="openCodex()">🧾 Trucos</button>
      ${P.lives<3?`<button class="btn btn-primary" onclick="restLives()">❤️ Reponer vidas (🪙 60)</button>`:""}
    </div>
    ${done===NODES.length?`<div class="unlocks" style="margin-top:20px">
      <div class="unlock"><span class="u">👑</span>¡Has derrotado a todos los enemigos de la nube! Eres un AWS Architect.</div></div>`:""}
  </div>` + invHTML();

  app.innerHTML = html;
  drawLinks();
  refreshInventory();
}
function nodeHTML(n){
  const done = isCleared(n.id);
  const open = unlocked(n.id);
  const p = pct(n.id);
  const cls = ["node", n.t==="elite"?"elite":"", n.t==="boss"?"boss":"", done?"cleared":"", (!open&&!done)?"locked":"", (!done&&open)?"avail":""].filter(Boolean).join(" ");
  const tag = done ? `<span class="tag-mini done">✓ ${p}%</span>`
                   : n.t==="boss" ? `<span class="tag-mini boss">👹 BOSS</span>`
                   : n.t==="elite" ? `<span class="tag-mini elite">💀 ELITE</span>`
                   : "";
  return `<button class="${cls}" data-node="${n.id}" onclick="openBrief('${n.id}')">
    <div class="ntop">
      <div class="sprite">${done?"✅":(open?n.s:"🔒")}</div>
      <div class="meta">
        <b>${esc(n.name)}</b>
        <span>${nodeTypeLabel(n)} · Nv${n.tier}</span>
      </div>
    </div>
    <div class="lv">
      <div class="bar"><i style="width:${p}%"></i></div>
      <span>${p}%</span>
    </div>
    <div style="margin-top:8px">${tag || (open?`<span class="tag-mini" style="background:rgba(255,153,0,.14);color:var(--orange-soft);border:1px solid rgba(255,153,0,.3)">DISPONIBLE</span>`:"")}</div>
  </button>`;
}
/* líneas que conectan prerequisites */
function drawLinks(){
  document.querySelectorAll("svg.links").forEach(s=>s.remove());
  const host = document.getElementById("mapCard");
  if(!host) return;
  const nodes = host.querySelectorAll("[data-node]");
  if(nodes.length < 2) return;

  const hostBox = host.getBoundingClientRect();
  const svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
  svg.setAttribute("class","links");
  svg.style.cssText = "position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:0;overflow:visible";
  host.insertBefore(svg, host.firstChild);

  nodes.forEach(el=>{
    const child = nodeOf(el.dataset.node);
    (child.req||[]).forEach(rid=>{
      const src = host.querySelector(`[data-node="${rid}"]`);
      if(!src) return;
      /* solo dibujamos enlaces dentro del mismo reino: entre reinos generarían
         líneas cruzando media pantalla que no aportan información */
      if(nodeOf(rid).r !== child.r) return;
      const a = src.getBoundingClientRect(), b = el.getBoundingClientRect();
      const x1 = a.left + a.width/2 - hostBox.left, y1 = a.top + a.height/2 - hostBox.top;
      const x2 = b.left + b.width/2 - hostBox.left, y2 = b.top + b.height/2 - hostBox.top;
      /* salimos por el borde inferior del padre y entramos por el superior del hijo */
      const my = y1 + a.height/2, my2 = y2 - b.height/2;
      const d = `M ${x1} ${my} C ${x1} ${my+22}, ${x2} ${my2-22}, ${x2} ${my2}`;
      const p = document.createElementNS("http://www.w3.org/2000/svg","path");
      p.setAttribute("d", d);
      p.setAttribute("fill","none");
      const on = pct(rid) >= PASS_PCT;
      p.setAttribute("stroke", on ? "rgba(107,200,83,.5)" : "rgba(120,140,170,.16)");
      p.setAttribute("stroke-width","2");
      p.setAttribute("stroke-dasharray", on ? "0" : "5 6");
      p.setAttribute("stroke-linecap","round");
      svg.appendChild(p);
    });
  });
  }

/* ---------- RENDER: BRIEFING ---------- */
function openBrief(id){
  const n = nodeOf(id);
  const open = unlocked(id);
  const done = isCleared(id);
  const qs = allQuestionsFor(n);
  const r = realmOf(n.r);
  const miss = missingReqs(id);
  const totalHp = qs.length;

  app.innerHTML = hudHTML() + `<div class="card screen">
    <div class="brief">
      <div>
        <div class="bsprite ${n.t}">${n.s}</div>
        <div style="text-align:center;margin-top:12px">
          <span class="tag-mini ${n.t==="boss"?"boss":n.t==="elite"?"elite":"done"}">${nodeTypeLabel(n)}</span>
        </div>
      </div>
      <div>
        <h2>${esc(n.name)}</h2>
        <div style="margin-top:6px;font-size:13px;font-weight:800;letter-spacing:1.2px;color:${r.color}">
          ${r.sprite} ${esc(r.name)}
        </div>
        <div class="lore">${esc(n.lore)}</div>
        <div class="attrs">
          <div class="attr"><div class="l">Nivel</div><div class="v">Nv ${n.tier}</div></div>
          <div class="attr"><div class="l">Desafíos</div><div class="v">${totalHp}</div></div>
          <div class="attr"><div class="l">Vidas</div><div class="v">${n.t==="boss"?4:n.t==="elite"?3:2}</div></div>
          <div class="attr"><div class="l">Recompensa</div><div class="v">${n.xp} XP</div></div>
          <div class="attr"><div class="l">Tu mejor</div><div class="v">${pct(id)}%</div></div>
        </div>
        <div class="reqs">
          <div style="font-size:12px;font-weight:800;letter-spacing:1.4px;color:var(--soft);text-transform:uppercase">Requisitos</div>
          ${n.req.length ? n.req.map(rid=>{
            const ok = pct(rid) >= PASS_PCT;
            return `<div class="req ${ok?"ok":"no"}">${ok?"✅":"🔒"} ${esc(nodeOf(rid).name)} — ${ok?"superado ("+pct(rid)+"%)":"necesitas "+PASS_PCT+"%"}</div>`;
          }).join("") : `<div class="req ok">✅ Sin requisitos — nodo raíz</div>`}
        </div>
        <div class="itemrow">
          ${open ? `<button class="btn btn-primary" onclick="startBattle('${id}')">⚔️ ${done?"Repetir combate":"Combatir"}</button>`
                 : `<button class="btn" disabled>🔒 Bloqueado</button>`}
          <button class="btn btn-ghost" onclick="openMap()">← Volver al mapa</button>
        </div>
        ${done?`<div class="best" style="margin-top:16px;font-size:14px;color:var(--green)">Ya superaste este nodo con ${pct(id)}%. Puedes repetirlo para mejorar tu marca.</div>`:""}
      </div>
    </div>
  </div>` + invHTML();
  refreshInventory();
}

/* ---------- COMBATE ---------- */
const B = {
  node:null, qs:[], idx:0, lives:0, maxLives:0,
  ehp:0, emax:0, kills:0, hits:0, crits:0, misses:0,
  combo:0, bestCombo:0, startAt:0, timer:null, tleft:0, tmax:0, baseTmax:20,
  answered:false, shieldOn:false, blocked:false, itemLock:false,
  bonusAt:[], usedIds:[], sub:null
};

function startBattle(id, opts){
  opts = opts || {};
  const n = nodeOf(id);
  if(!n){ toast("Nodo no encontrado"); return; }
  const pool = allQuestionsFor(n);
  if(!pool.length){ toast("Ese nodo no tiene preguntas"); return; }
  B.node = n;
  B.qs = shuffle(pool);
  B.idx = 0;
  B.maxLives = opts.lives || (n.t==="boss"?4:n.t==="elite"?3:2);
  if(opts.freeplay){
    B.lives = B.maxLives;
  }else{
    /* elites y bosses arrancan con un mínimo de 3 vidas aunque el jugador
       tenga menos, para que un boss nunca sea imposible de superar */
    const floor = n.t==="enemy" ? 1 : 3;
    B.lives = Math.min(B.maxLives, Math.max(P.lives, floor));
  }
  B.emax = B.qs.length;
  B.ehp = B.emax;
  B.kills = 0; B.hits = 0; B.crits = 0; B.misses = 0;
  B.combo = 0; B.bestCombo = 0;
  B.shieldOn = false; B.blocked = false; B.itemLock = false;
  B.answered = false;
  B.usedIds = [];
  B.freeplay = !!opts.freeplay;
  B.noDamage = !!opts.noDamage;
  B.baseTmax = opts.perQ || 20;
  B.tmax = B.baseTmax;
  P.lastNode = id;
  save();
  renderQuestion();
}

/* Crítico de combo: cada 3 aciertos seguidos el golpe se marca como crítico.
   El daño sigue siendo 1 porque la barra de vida del enemigo equivale al número
   de preguntas: si el crítico quitara 2, en los nodos de 4 preguntas sería
   imposible responderlas todas y el 100% quedaría fuera de alcance. El crítico
   se paga en XP y oro al final del combate. */
function damageFor(combo){
  const crit = combo >= 2 && combo % 3 === 0;
  return {d:1, crit};
}

function battleTopHTML(){
  const n = B.node;
  const barCls = n.t==="boss"?"boss":n.t==="elite"?"elite":"";
  const turnMarks = B.qs.map((_,i)=>{
    const cls = i<B.kills?"done":(i===B.idx?"now":"");
    return `<i class="${cls}"></i>`;
  }).join("");
  const t = B.tmax ? `<div class="stat timer-pill pill ${B.tleft<=5?"low":""}"><span>⏱️</span><span>${Math.max(0,Math.ceil(B.tleft))}s</span></div>` : "";
  return `<div class="arena-top">
    <div class="enemy-box">
      <div class="es" id="enemySprite">${n.s}</div>
      <div class="ei">
        <div class="en">${esc(n.name)}</div>
        <div class="ty">${nodeTypeLabel(n)} · ${realmOf(n.r).name}</div>
        <div class="hpbar ${barCls}"><i id="ehp" style="width:${B.ehp>0?Math.round(B.ehp/B.emax*100):0}%"></i></div>
        <div class="turns" style="margin-top:7px">${turnMarks}</div>
      </div>
    </div>
    ${t}
    <div class="fighter">
      <div class="fs">🧑‍💻</div>
      <div class="fi">
        <b>${rank().cur.name}</b>
        <span>${B.noDamage?"Modo simulacro":"Vidas"} <span id="bLives">${B.noDamage?"🛡️ sin daño":hearts(B.lives)}</span></span>
        <div class="hpbar" style="margin-top:6px;height:10px">${B.noDamage?"":`<i id="php" style="width:${Math.min(100,B.lives/B.maxLives*100)}%;background:linear-gradient(90deg,#6BC853,#2E9B3A)"></i>`}</div>
      </div>
      <div style="text-align:right;font-size:12px;color:var(--muted);font-weight:800">
        <div>🔥 <span id="combo">0</span></div>
        <div>💀 <span id="kills">0</span>/${B.emax}</div>
      </div>
    </div>
  </div>`;
}

function renderQuestion(){
  clearInterval(B.timer);
  B.answered = false; B.blocked = false;
  const c = B.qs[B.idx];
  if(!c){ finishBattle(true); return; }
  B.sub = {};
  B.itemLock = false;
  B.tmax = timeFor(c);
  B.tleft = B.tmax;
  if(chType(c)==="match") return renderMatch(c);
  if(chType(c)==="wordsearch") return renderWordSearch(c);
  if(chType(c)==="crossword") return renderCrossword(c);
  return renderQuiz(c);
}

function fmtQ(t){ return esc(t).replace(/`([^`]+)`/g,"<code>$1</code>"); }

/* ----- cabecera común a todos los retos: arena + meta ----- */
function qmetaHTML(){
  return `<div class="qmeta">
    <span class="chip req">⚔️ ${nodeTypeLabel(B.node)}</span>
    <span class="chip rpl">${realmOf(B.node.r).sprite} ${esc(realmOf(B.node.r).name)}</span>
    <span class="chip n">GOLPE ${B.idx+1} / ${B.qs.length}</span>
  </div>`;
}

/* ----- controles compartidos: ítems + botón "Siguiente golpe" ----- */
function challengeControlsHTML(hint){
  return `<div style="display:flex;gap:10px;margin-top:20px;flex-wrap:wrap;align-items:center">
    <button class="btn btn-primary hidden" id="nextBtn" onclick="nextHit()">Siguiente golpe →</button>
    <span style="font-size:13px;color:var(--soft)">${hint||"Atajos: 1-4 · Enter para continuar"}</span>
    <span style="margin-left:auto"></span>
    <button class="btn btn-sm" onclick="useItem('potion')">🧪 ${P.inv.potion}</button>
    <button class="btn btn-sm" onclick="useItem('shield')">🛡️ ${P.inv.shield}</button>
    <button class="btn btn-sm" onclick="useItem('oracle')">🔮 ${P.inv.oracle}</button>
    <button class="btn btn-sm btn-ghost" onclick="quitBattle()">🏃 Huir</button>
  </div>`;
}

/* ----- turno del reloj (común) ----- */
function startTurnTimer(){
  B.timer = setInterval(()=>{
    if(B.answered) return;
    B.tleft -= 1;
    const el = document.querySelector(".timer-pill span:last-child");
    if(el) el.textContent = Math.max(0,Math.ceil(B.tleft))+"s";
    const pill = document.querySelector(".timer-pill");
    if(pill && B.tleft<=5) pill.classList.add("low");
    if(B.tleft<=0){ clearInterval(B.timer); onTimeout(); }
  },1000);
}

/* ---------- RENDER: QUIZ (pregunta de opción múltiple) ---------- */
function renderQuiz(c){
  const opts = c[1].split("|");
  const letters = ["A","B","C","D"];
  app.innerHTML = hudHTML() + `<div class="card screen">
    ${battleTopHTML()}
    <div class="qcard">
      ${qmetaHTML()}
      <div class="q">${fmtQ(c[0])}</div>
      <div class="opts" id="opts">
        ${opts.map((o,i)=>`<button class="opt" id="opt${i}" onclick="answer(${i})">
          <span class="letter">${letters[i]}</span><span>${esc(o)}</span></button>`).join("")}
      </div>
      <div class="logline" id="log"></div>
      ${challengeControlsHTML()}
    </div>
  </div>` + invHTML();
  startTurnTimer();
  document.removeEventListener("keydown", battleKeys);
  document.addEventListener("keydown", battleKeys);
  refreshInventory();
}

function battleKeys(e){
  if(!B.node) return;
  if(["1","2","3","4"].includes(e.key)){
    const b = document.getElementById("opt"+(+e.key-1));
    if(b && !b.disabled && !B.answered) answer(+e.key-1);
  }
  if(e.key==="Enter"){
    const nb = document.getElementById("nextBtn");
    if(nb && !nb.classList.contains("hidden")) nextHit();
  }
}

function removeTwoOptions(){
  const q = B.qs[B.idx];
  const wrong = [0,1,2,3].filter(i=>i!==q[2]);
  shuffle(wrong).slice(0,2).forEach(i=>{
    const b = document.getElementById("opt"+i);
    if(b){ b.disabled = true; b.style.opacity = ".2"; b.style.filter = "grayscale(1)"; }
  });
  toast("🔮 El Oráculo reduce las opciones");
}

/* ---------- resolver el reto actual: compartido por quiz y puzles ---------- */
/* Un acierto quita 1 HP al enemigo, sube el combo y aplica críticos. */
function hit(c, expl){
  const dmg = damageFor(B.combo+1);
  const crit = dmg.crit;
  B.hits++; B.kills++;
  if(crit) B.crits++;
  B.combo++;
  B.bestCombo = Math.max(B.bestCombo, B.combo);
  B.ehp = Math.max(0, B.ehp - dmg.d);
  sfx[crit?"crit":"hit"]();
  const sprite = document.getElementById("enemySprite");
  if(sprite){ sprite.style.transform = "translateX(-8px) scale(.9)"; setTimeout(()=>sprite.style.transform="",120); }
  const r = sprite ? sprite.getBoundingClientRect() : {left:innerWidth/2, top:innerHeight/2, width:0, height:0};
  floatNum(r.left + r.width/2, r.top + r.height/2, crit ? "¡CRIT! -1" : "-1", crit ? "dmg-crit" : "dmg-num");
  const hp = document.getElementById("ehp"); if(hp) hp.style.width = Math.round(B.ehp/B.emax*100)+"%";
  const cb = document.getElementById("combo"); if(cb) cb.textContent = B.combo;
  const kb = document.getElementById("kills"); if(kb) kb.textContent = B.kills;
  const log = document.getElementById("log");
  log.className = "logline ok";
  log.innerHTML = `<span class="big">${crit?"💥":"✅"}</span>
    <div><b>${crit?"¡Golpe crítico!":"¡Impacto!"}</b> · ${esc(expl)}</div>
    <div class="dmg"><div class="${crit?"dmg-crit":"dmg-num"}">-1 HP enemigo${crit?" · doble XP":""}</div>
    <div style="font-size:12px;color:var(--muted);font-weight:800">🔥 Combo ${B.combo}</div></div>`;
  if(B.ehp<=0){
    log.innerHTML += `<div style="width:100%;margin-top:6px;color:var(--green);font-weight:800">☠️ ¡Enemigo derrotado!</div>`;
    endTurnWin();
  }
  showNextBtn();
}

/* Un fallo consume un turno, resta vida (si no es simulacro y no hay escudo),
   resetea el combo y muestra el log. */
function missHit(c, icon, title, expl){
  B.misses++;
  B.combo = 0;
  const fr = document.querySelector(".fighter");
  if(!B.noDamage){ sfx.miss(); shake(); }
  if(fr && !B.noDamage){
    const r = fr.getBoundingClientRect();
    floatNum(r.left+30, r.top+20, "-1 ❤️", "dmg-num");
  }
  const log = document.getElementById("log");
  if(B.noDamage){
    log.className = "logline bad";
    log.innerHTML = `<span class="big">📌</span>
      <div><b>Reporte (simulacro)</b> · ${esc(expl)}</div>
      <div class="dmg"><div style="font-size:13px;color:var(--muted);font-weight:800">Combo perdido</div></div>`;
  }else if(B.shieldOn){
    B.shieldOn = false;
    log.className = "logline ok";
    log.innerHTML = `<span class="big">🛡️</span>
      <div><b>El Escudo de AWS absorbió el golpe</b> · ${esc(expl)}</div>`;
  }else if(B.lives>0){
    B.lives--;
    const lb = document.getElementById("bLives"); if(lb) lb.innerHTML = hearts(B.lives);
    const pb = document.getElementById("php"); if(pb) pb.style.width = Math.round(B.lives/B.maxLives*100)+"%";
    log.className = "logline bad";
    log.innerHTML = `<span class="big">${icon||"💔"}</span>
      <div><b>${esc(title||"¡Golpe recibido!")}</b> · ${esc(expl)}</div>
      <div class="dmg"><div class="dmg-num" style="color:var(--red)">-1 vida</div>
      <div style="font-size:12px;color:var(--muted);font-weight:800">Combo perdido</div></div>`;
    if(B.lives<=0){ finishBattle(false); return; }
  }
  showNextBtn();
}

function showNextBtn(){
  const nb = document.getElementById("nextBtn");
  if(nb){ nb.classList.remove("hidden"); nb.textContent = (B.ehp<=0)?"Cobrar victoria →":"Siguiente golpe →"; }
}

/* ---------- RENDER: EMPAREJAR (matching) ---------- */
function renderMatch(c){
  B.sub = B.sub || {};
  /* dos columnas separadas: términos a la izquierda, definiciones a la derecha.
     Cada lado se baraja por separado para no perder la correspondencia. */
  const terms = shuffle(c.pairs.map((p,i)=>({i, txt:p.a})));
  const defs  = shuffle(c.pairs.map((p,i)=>({i, txt:p.b})));
  B.sub.match = {
    c, terms, defs, sel:null, curColor:null,
    done:0, total:c.pairs.length,
    /* copia del pool de colores: la plantilla MATCH_COLORS nunca se muta.
       Se descarta un color por pareja acertada; si fallas, se mantiene. */
    colors: MATCH_COLORS.slice(),
    /* cada reto de matching da 3 intentos; al agotarlos, el desafío falla */
    attempts:3
  };
  const termsHTML = terms.map((t,k)=>`<button class="mcard" id="mt${k}" data-i="${t.i}" onclick="matchPick('mt',${k})">${esc(t.txt)}</button>`).join("");
  const defsHTML  = defs.map((d,k)=>`<button class="mcard" id="md${k}" data-i="${d.i}" onclick="matchPick('md',${k})">${esc(d.txt)}</button>`).join("");
  app.innerHTML = hudHTML() + `<div class="card screen">
    ${battleTopHTML()}
    <div class="qcard">
      ${qmetaHTML()}
      <div class="ch-head"><span class="ch-ico">🧩</span> ${esc(c.title)}</div>
      <div class="ch-sub">${esc(c.hint)} · ${c.pairs.length} parejas</div>
      <div class="mcards" id="mcards">
        <div class="mcol mcol-terms">${termsHTML}</div>
        <div class="mcol mcol-defs">${defsHTML}</div>
      </div>
      <div class="logline" id="log"></div>
      ${challengeControlsHTML("Clic en un término y luego en su pareja")}
    </div>
  </div>` + invHTML();
  startTurnTimer();
  refreshInventory();
}
function matchPaint(el, state, color){
  /* pinta inline para que el feedback sea inmediato, sin depender de caché CSS */
  if(!el) return;
  if(state==="base"){ el.classList.remove("sel","err","ok"); el.style.background=""; el.style.borderColor=""; el.style.color=""; }
  else if(state==="sel"){ el.classList.add("sel"); el.style.background=color||"#FF9900"; el.style.borderColor=color||"#FF9900"; el.style.color="#0b1729"; }
  else if(state==="err"){ el.classList.add("err"); el.style.background="#ff5a5a"; el.style.borderColor="#ff5a5a"; el.style.color="#fff"; }
  else if(state==="ok"){ el.classList.add("ok"); el.style.background=color||"#6BC853"; el.style.borderColor=color||"#6BC853"; el.style.color="#0b1729"; }
}

function matchPick(side, k){
  if(B.answered) return;
  const st = B.sub.match; if(!st) return;
  const c = st.c;
  const list = side==="mt" ? st.terms : st.defs;
  const cd = list[k]; if(!cd) return;
  const el = document.getElementById(side+k);
  if(!el || el.classList.contains("ok")) return;

  /* el color en uso: el primero de la copia del pool (no se consume al elegir) */
  const color = st.colors[0];

  /* re-clic sobre la misma tarjeta ya seleccionada: deseleccionar */
  if(st.sel && st.sel.side===side && st.sel.k===k){
    st.sel = null; st.curColor = null;
    matchPaint(el, "base");
    return;
  }

  if(st.sel===null){
    /* primer clic: marca con el color del pool */
    st.sel = {side, k};
    st.curColor = color;
    matchPaint(el, "sel");
    return;
  }

  /* segundo clic en el mismo lado (otra tarjeta): cambia la selección */
  if(st.sel.side === side){
    const prevEl = document.getElementById(st.sel.side+st.sel.k);
    matchPaint(prevEl, "base");
    st.sel = {side, k};
    st.curColor = color;
    matchPaint(el, "sel");
    return;
  }

  /* segundo clic en el lado contrario: compara el par */
  const prev = st.sel;
  const prevCard = prev.side==="mt" ? st.terms[prev.k] : st.defs[prev.k];
  const prevEl = document.getElementById(prev.side+prev.k);
  matchPaint(el, "sel");

  if(prevCard.i === cd.i){
    /* acierto: se descarta el color del pool y se fija el par con ese color */
    const used = st.curColor || color;
    st.colors.shift();
    matchPaint(prevEl, "ok", used); if(prevEl) prevEl.disabled = true;
    matchPaint(el,     "ok", used); if(el)     el.disabled     = true;
    st.sel = null; st.curColor = null; st.done++;
    sfx.hit();
    if(st.done===st.total){
      B.answered = true; clearInterval(B.timer);
      hit(c, c.hint);
    }
    return;
  }

  /* fallo: destello rojo breve en ambas tarjetas + se consume un intento */
  matchPaint(prevEl, "err"); matchPaint(el, "err");
  sfx.miss();
  setTimeout(()=>{ matchPaint(prevEl, "base"); matchPaint(el, "base"); }, 380);
  st.sel = null; st.curColor = null;
  st.attempts--;

  if(st.attempts <= 0){
    /* agotó los intentos: el desafío falla (pierde vida y termina el turno) */
    B.answered = true; clearInterval(B.timer);
    missHit(c, "💔", "¡Sin intentos!", c.hint);
    return;
  }
  /* todavía le quedan intentos: puede reintentar en el mismo desafío */
  toast(`💔 Fallo: te ${st.attempts===1?"queda 1":"quedan "+st.attempts} intento${st.attempts===1?"":"s"}`);
}

/* ---------- RENDER: SOPA DE LETRAS (word search) ---------- */
function renderWordSearch(c){
  B.sub = B.sub || {};
  const H = c.grid.length, W = c.grid[0].length;
  B.sub.ws = {c, sel:null, done:new Set()};
  const cells = c.grid.map((row,y)=>row.map((ch,x)=>`<button class="wscell" id="w${y}_${x}" data-r="${y}" data-c="${x}" onclick="wsPick(${y},${x})">${ch}</button>`).join("")).join("");
  const wlist = c.words.map(w=>`<div class="wsword" id="wsw_${w}">${w}</div>`).join("");
  app.innerHTML = hudHTML() + `<div class="card screen">
    ${battleTopHTML()}
    <div class="qcard">
      ${qmetaHTML()}
      <div class="ch-head"><span class="ch-ico">🔍</span> ${esc(c.title)}</div>
      <div class="ch-sub">${esc(c.hint)} · clic en la 1ª y la última letra · los fallos restan 5s, no vidas</div>
      <div class="wswrap">
        <div class="wsgrid" style="--ws-cols:${W}">${cells}</div>
        <div class="wslist" id="wslist">${wlist}</div>
      </div>
      <div class="logline" id="log"></div>
      ${challengeControlsHTML("Línea recta: horizontal, vertical o diagonal")}
    </div>
  </div>` + invHTML();
  startTurnTimer();
  refreshInventory();
}
/* Colores en línea (inline styles): garantizan feedback visual aunque el CSS
   esté cacheado o no cargue, y además se aplican sobre el fondo base. */
const WS_COLORS = {sel:"#FF9900", err:"#ff5a5a", ok:"#6BC853", okText:"#d5f5c5", dark:"#0b1729"};

function wsPaint(el, state){
  if(!el) return;
  /* usamos cssText para reemplazar el bloque inline completo y garantizar que
     el navegador no esté sirviendo estilos antiguos cacheados */
  el.classList.remove("sel","err","ok");
  if(state==="base"){
    el.style.cssText = "";
  }else if(state==="sel"){
    el.style.cssText = "background:#FF9900 !important;color:#0b1729 !important;box-shadow:0 0 0 3px #FF9900,0 0 18px #FF9900 !important;transform:scale(1.18);z-index:5";
    el.classList.add("sel");
  }else if(state==="err"){
    el.style.cssText = "background:#ff5a5a !important;color:#fff !important;box-shadow:0 0 0 3px #ff5a5a !important";
    el.classList.add("err");
  }else if(state==="ok"){
    el.style.cssText = "background:#6BC853 !important;color:#d5f5c5 !important;box-shadow:0 0 0 2px rgba(107,200,83,.6) !important";
    el.classList.add("ok");
  }
}

function wsPick(y,x){
  if(B.answered) return;
  const st = B.sub.ws; if(!st) return;
  const c = st.c;
  const cell = document.getElementById("w"+y+"_"+x);
  if(!cell) return;

  /* Si no hay selección: este clic inicia una. */
  if(st.sel===null){
    st.sel=[y,x];
    wsPaint(cell, "sel");
    return;
  }

  const [y0,x0]=st.sel;

  /* Clic sobre la misma letra inicial: deseleccionar (vuelve al fondo base). */
  if(y===y0 && x===x0){
    st.sel=null;
    wsPaint(cell, "base");
    return;
  }

  const dy=y-y0, dx=x-x0;
  /* Solo líneas rectas: horizontal, vertical o diagonal. */
  if(!(dy===0||dx===0||Math.abs(dy)===Math.abs(dx))){
    flashRange(st, y0, x0, y, x, "err");
    st.sel=null;
    wsPenalty(c, "¡Eso no es una línea recta!");
    return;
  }

  const stepY=Math.sign(dy), stepX=Math.sign(dx);
  const len=Math.max(Math.abs(dy),Math.abs(dx));
  let word="";
  for(let i=0;i<=len;i++) word += c.grid[y0+stepY*i][x0+stepX*i];
  const inv=word.split("").reverse().join("");
  const foundWord = c.words.find(w=>!st.done.has(w) && (w===word || w===inv));

  if(!foundWord){
    /* fallo: destello rojo, vuelta al base y -5 segundos (el enemigo es el
       reloj, no las vidas). Si el trazo forma parte de una palabra, se
       avisa con una pista en lugar de castigar. */
    flashRange(st, y0, x0, y, x, "err");
    st.sel=null;
    const partial = c.words.find(w=>!st.done.has(w) && (w.includes(word) || w.includes(inv)));
    wsPenalty(c, partial ? `Es parte de ${partial}: marca la primera y la última letra` : "No está en la lista");
    return;
  }

  /* acierto: se ilumina el trazo y la palabra de la lista lateral,
     y como recompensa se suman 5s al temporizador (sin superar el tiempo
     inicial) */
  st.done.add(foundWord);
  for(let i=0;i<=len;i++){
    const c2=document.getElementById("w"+(y0+stepY*i)+"_"+(x0+stepX*i));
    if(c2){ wsPaint(c2, "ok"); c2.disabled=true; }
  }
  const wel=document.getElementById("wsw_"+foundWord);
  if(wel){ wel.classList.add("ok"); wel.style.textDecoration="line-through"; }
  B.tleft = Math.min(B.tmax || 180, (B.tleft === undefined ? B.tmax : B.tleft) + 5);
  const pill = document.querySelector(".timer-pill span:last-child");
  if(pill) pill.textContent = Math.max(0, Math.ceil(B.tleft))+"s";
  toast(`⏱️ +5s · ¡${foundWord}!`);
  st.sel=null;

  if(st.done.size===c.words.length){
    B.answered=true; clearInterval(B.timer);
    hit(c, "¡Encontraste las "+c.words.length+" palabras!");
  }
}

/* Penalización de la sopa: los fallos no cuestan vidas ni terminan el turno;
   restan 5 segundos del reloj. Solo el agotar el tiempo (onTimeout) cuesta
   una vida. El reloj es el enemigo. */
function wsPenalty(c, msg){
  sfx.miss();
  B.tleft = Math.max(0, (B.tleft === undefined ? B.tmax : B.tleft) - 5);
  const pill = document.querySelector(".timer-pill span:last-child");
  if(pill) pill.textContent = Math.max(0, Math.ceil(B.tleft))+"s";
  toast("⏱️ -5s · " + (msg || "fallo"));
  /* nota: NO se toca B.answered ni B.combo → el reto sigue activo */
}

/* Pinta (o revierte) el trazo entre (y0,x0) y (y1,x1) con el estado dado.
   En fallo se aplica "err" (fondo rojo) y luego se revierte sola. */
function flashRange(st, y0, x0, y1, x1, cls){
  const stepY = Math.sign(y1-y0) || 0, stepX = Math.sign(x1-x0) || 0;
  const len = Math.max(Math.abs(y1-y0), Math.abs(x1-x0));
  for(let i=0;i<=len;i++){
    const el=document.getElementById("w"+(y0+stepY*i)+"_"+(x0+stepX*i));
    if(el) wsPaint(el, cls);
  }
  setTimeout(()=>{
    for(let i=0;i<=len;i++){
      const el=document.getElementById("w"+(y0+stepY*i)+"_"+(x0+stepX*i));
      if(el && !el.classList.contains("ok")) wsPaint(el, "base");
    }
  }, 450);
}

/* ---------- RENDER: CRUCIGRAMA ---------- */
function renderCrossword(c){
  B.sub = B.sub || {};
  B.sub.xw = {c, active:null, done:new Set()};
  const {W, H, grid} = c;
  /* números de pista en cada celda de inicio de palabra */
  const startNum={};
  c.words.forEach(w=>{ startNum[w.x+","+w.y] = w.num; });
  let html="";
  for(let y=0;y<H;y++){
    for(let x=0;x<W;x++){
      const ch=grid[y][x];
      if(ch===""){ html+=`<div class="xwcell blk"></div>`; continue; }
      const num=startNum[x+","+y];
      html+=`<div class="xwcell" id="x${y}_${x}">${num?`<i class="n">${num}</i>`:""}${ch}</div>`;
    }
  }
  const clues = c.words.map(w=>{
    const key = "xc"+w.num+(w.dir==="down"?"d":"a");
    return `<button class="xwclue" id="${key}" data-num="${w.num}" data-dir="${w.dir}" onclick="xwSelect(${w.num},'${w.dir}')"><b>${w.num}${w.dir==="down"?"↓":"→"}</b> ${esc(w.clue)}</button>`;
  }).join("");
  app.innerHTML = hudHTML() + `<div class="card screen">
    ${battleTopHTML()}
    <div class="qcard">
      ${qmetaHTML()}
      <div class="ch-head"><span class="ch-ico">✏️</span> ${esc(c.title)}</div>
      <div class="ch-sub">${esc(c.hint)} · elige una pista y escribe la respuesta</div>
      <div class="xw-wrap">
        <div class="xwgrid" style="--xw-cols:${W}">${html}</div>
        <div class="xwlist">${clues}</div>
      </div>
      <div class="xw-input-row">
        <input id="xwinput" class="xwinput" placeholder="Respuesta..." autocomplete="off" maxlength="14" onkeydown="if(event.key==='Enter')xwSubmit()">
        <button class="btn btn-sm btn-primary" onclick="xwSubmit()">Comprobar</button>
      </div>
      <div class="logline" id="log"></div>
      ${challengeControlsHTML("Enter para comprobar · clic en la pista para activarla")}
    </div>
  </div>` + invHTML();
  startTurnTimer();
  refreshInventory();
}
function xwSelect(num, dir){
  const st = B.sub.xw; if(!st) return;
  const c = st.c;
  const w = c.words.find(w=>w.num===num && w.dir===dir);
  document.querySelectorAll(".xwcell.sel").forEach(el=>el.classList.remove("sel"));
  document.querySelectorAll(".xwclue.active").forEach(el=>el.classList.remove("active"));
  if(!w || st.done.has(w.num+w.dir)) return;
  st.active = w;
  const el=document.getElementById("xc"+w.num+(dir==="down"?"d":"a")); if(el) el.classList.add("active");
  for(let i=0;i<w.pat.length;i++){
    const x=w.x+(dir==="across"?i:0), y=w.y+(dir==="down"?i:0);
    const cell=document.getElementById("x"+y+"_"+x); if(cell) cell.classList.add("sel");
  }
  const inp=document.getElementById("xwinput"); if(inp) inp.focus();
}
function xwSubmit(){
  if(B.answered) return;
  const st = B.sub.xw; if(!st || !st.active) return;
  const c = st.c;
  const inp=document.getElementById("xwinput");
  const val = String((inp && inp.value) || "").toUpperCase().trim();
  if(!val){ toast("Escribe la respuesta primero"); return; }
  const w = st.active;
  if(val===w.pat){
    st.done.add(w.num+w.dir);
    for(let i=0;i<w.pat.length;i++){
      const x=w.x+(w.dir==="across"?i:0), y=w.y+(w.dir==="down"?i:0);
      const cell=document.getElementById("x"+y+"_"+x);
      if(cell){ cell.classList.remove("sel"); cell.classList.add("ok"); }
    }
    const clueEl=document.getElementById("xc"+w.num+(w.dir==="down"?"d":"a"));
    if(clueEl){ clueEl.classList.remove("active"); clueEl.classList.add("ok"); }
    if(inp) inp.value="";
    st.active = null;
    if(st.done.size===c.words.length){
      B.answered=true; clearInterval(B.timer);
      hit(c, "¡Crucigrama completado!");
    }
  }else{
    B.answered=true; clearInterval(B.timer);
    missHit(c, "💔", "Respuesta incorrecta", "Pista: "+w.clue);
  }
}

/* ---------- RESPUESTA A PREGUNTA DE QUIZ ---------- */
function answer(i){
  if(B.answered) return;
  const c = B.qs[B.idx];
  if(!c){ finishBattle(true); return; }
  /* los retos no-quiz se resuelven con sus propios controles */
  if(!Array.isArray(c)) return;
  B.answered = true;
  clearInterval(B.timer);
  const ok = i === c[2];
  const els = document.querySelectorAll(".opt");
  els.forEach((el,j)=>{
    el.disabled = true;
    el.classList.add(j===c[2] ? "correct" : (j===i ? "wrong" : "dim"));
  });
  if(ok) hit(c, c[3]);
  else missHit(c, "💔", "¡Golpe recibido!", c[3]);
  refreshInventory();
}

function onTimeout(){
  const c = B.qs[B.idx];
  if(!c){ finishBattle(true); return; }
  if(Array.isArray(c)){
    const els = document.querySelectorAll(".opt");
    els.forEach((el,j)=>{ el.disabled=true; el.classList.add(j===c[2]?"correct":"dim"); });
  }
  B.answered = true; clearInterval(B.timer);
  missHit(c, "⏰", "¡Se acabó el tiempo!", c[3] || "");
}

function endTurnWin(){
  clearInterval(B.timer);
  const nb = document.getElementById("nextBtn");
  if(nb){ nb.classList.remove("hidden"); nb.textContent="Cobrar victoria →"; }
  sfx.win();
}
function nextHit(){
  if(B.ehp<=0){ finishBattle(true); return; }
  B.idx++;
  if(B.idx >= B.qs.length){ finishBattle(true); return; }
  renderQuestion();
}

/* ---------- ITEMS EN COMBATE ---------- */
function useItem(id){
  const it = ITEM_LIST.find(i=>i.id===id);
  if(!it) return;
  if((P.inv[id]||0) <= 0){ toast("No tienes "+it.name); return; }
  if(!B.node){ toast("Solo usable durante un combate"); return; }
  if(B.answered){ toast("Espera a la próxima pregunta"); return; }
  if(B.itemLock){ return; }

  if(id==="potion"){
    if(B.lives >= B.maxLives){ toast("Ya tienes todas las vidas"); return; }
    P.inv.potion--; B.lives++;
    sfx.coin();
    const lb = document.getElementById("bLives"); if(lb) lb.innerHTML = hearts(B.lives);
    const pb = document.getElementById("php"); if(pb) pb.style.width = Math.round(B.lives/B.maxLives*100)+"%";
    toast("🧪 Recuperaste una vida");
  }
  if(id==="shield"){
    if(B.shieldOn){ toast("El escudo ya está activo"); return; }
    P.inv.shield--; B.shieldOn = true;
    sfx.coin();
    toast("🛡️ Escudo activo: absorbe un error");
  }
  if(id==="oracle"){
    const c = B.qs[B.idx];
    if(!c || !Array.isArray(c)){ toast("🔮 El Oráculo solo actúa sobre preguntas"); return; }
    P.inv.oracle--;
    removeTwoOptions();
    sfx.coin();
  }
  save();
  refreshInventory();
}

/* ---------- FIN DE COMBATE ---------- */
function finishBattle(won){
  clearInterval(B.timer);
  document.removeEventListener("keydown", battleKeys);
  const n = B.node;
  const maxPct = Math.round(B.hits / B.emax * 100);
  const passed = won && maxPct >= PASS_PCT;
  const free = B.freeplay;

  let gold = 0, xp = 0, newBest = false, unlockedList = [];
  const loot = [];
  const prevRecord = !free && P.cleared[n.id] ? P.cleared[n.id].best : 0;

  if(passed){
    if(!free){
      const prev = P.cleared[n.id];
      P.cleared[n.id] = {best: Math.max(prev ? prev.best : 0, maxPct), tries: (prev?prev.tries:0)+1};
      newBest = !prev || maxPct > prev.best;
    }else{
      newBest = false;
    }
    /* los críticos no hacen daño extra (la barra equivale a las preguntas),
       pero se pagan en XP: premian mantener el combo */
    const critBonus = 1 + Math.min(B.crits, 4) * 0.05;
    xp = Math.round(n.xp * (maxPct/100) * (1 + (maxPct===100?0.5:0)) * critBonus);
    gold = free ? 0 : Math.round((20 + n.tier*8 + (n.t!=="enemy"?40:0)) * (1 + B.crits*0.02));
    if(free){ P.xp += Math.round(xp/3); }
    else { P.xp += xp; P.gold += gold; }
    P.stats.kills++;
    if(n.t==="boss") P.stats.bosses++;
    if(maxPct===100) P.stats.perfect++;
    sfx.win();
    if(maxPct>=70 || n.t==="boss") launchConfetti(n.t==="boss"?260:150);
    sfx.coin();

    /* loot: el entrenamiento no reparte objetos, para no romper la economía */
    if(!free){
      if(Math.random() < 0.34) loot.push(pickItem());
      if(n.t!=="enemy" && Math.random() < 0.42) loot.push(pickItem());
      NODES.forEach(o=>{
        if(!isCleared(o.id) && unlocked(o.id) && (o.req||[]).includes(n.id)) unlockedList.push(o);
      });
      if(unlockedList.length) setTimeout(()=>sfx.unlock(), 600);
      P.lives = Math.min(3, P.lives + 1);
    }
  }else{
    P.stats.deaths++;
    if(!free) P.lives = Math.max(0, P.lives - 1);
    sfx.lose();
  }

  /* nunca dejes al jugador sin vidas: al llegar a 0 se repone a 1 */
  if(!free && P.lives < 1){
    P.lives = 1;
    setTimeout(()=>toast("❤️ Te han dejado 1 vida. Repón en la tienda."), 700);
  }

  /* devuelve los ítems usados a la cuenta */
  loot.forEach(it=>{ P.inv[it] = (P.inv[it]||0)+1; });
  save();

  const prevBest = prevRecord;

  app.innerHTML = hudHTML() + `<div class="card result screen">
    <div class="rc ${won?"":"lose"}">
      <div class="pct">${maxPct}%</div>
      <div class="lbl">${passed?"victoria":(won?"casi":"derrota")}</div>
    </div>
    <h2>${verdictTitle(maxPct, passed, n)}</h2>
    <div class="rank-line" style="color:${passed?"var(--orange-soft)":"var(--red)"}">${esc(n.s)} ${esc(n.name)}</div>
    ${!passed && won ? `<div class="best" style="margin-top:10px">Necesitas al menos ${PASS_PCT}% para superar este nodo.</div>`:""}
    ${passed && !newBest ? `<div class="best" style="margin-top:10px">Récord de este nodo: <b>${prevBest}%</b></div>`:""}
    ${newBest && passed ? `<div class="best" style="margin-top:10px;color:var(--gold)">🎉 ¡Nuevo récord en este nodo!</div>`:""}

    <div class="stats">
      <div class="sbox"><div class="n">${B.hits}/${B.emax}</div><div class="l">Aciertos</div></div>
      <div class="sbox"><div class="n ${B.crits?"good":""}">${B.crits}</div><div class="l">Críticos</div></div>
      <div class="sbox"><div class="n">${B.bestCombo}</div><div class="l">Combo máx</div></div>
      <div class="sbox"><div class="n ${passed?"good":"bad"}">${free?Math.round(xp/3):(xp||0)}</div><div class="l">XP</div></div>
      <div class="sbox"><div class="n gold">${gold||0}</div><div class="l">Oro</div></div>
    </div>

    ${loot.length?`<div class="loot">${loot.map(l=>`<div class="li">${ITEM_LIST.find(i=>i.id===l).ico} ${ITEM_LIST.find(i=>i.id===l).name}</div>`).join("")}</div>`:""}
    ${unlockedList.length?`<div class="unlocks">
      <div style="font-size:12px;font-weight:800;letter-spacing:1.4px;color:var(--soft);text-transform:uppercase">Nodos desbloqueados</div>
      ${unlockedList.map(o=>`<div class="unlock"><span class="u">${o.s}</span>${esc(o.name)} · Nv${o.tier} · ${realmOf(o.r).name}</div>`).join("")}
    </div>`:""}

    <div class="res-actions">
      ${free
        ? `<button class="btn btn-primary" onclick="startTraining()">🔁 Otro combate</button>
           <button class="btn" onclick="openTraining()">🎯 Cambiar modo</button>`
        : passed
          ? `<button class="btn btn-primary" onclick="openBrief('${n.id}')">🔁 Repetir</button>
             <button class="btn" onclick="openMap()">🗺️ Mapa</button>`
          : `<button class="btn btn-primary" onclick="startBattle('${n.id}')">⚔️ Reintentar</button>
             <button class="btn" onclick="openMap()">🗺️ Mapa</button>
             ${P.lives<3?`<button class="btn" onclick="restLives()">🪙 Reponer vidas (60)</button>`:""}`}
      <button class="btn btn-ghost" onclick="screenTitle()">🏠 Inicio</button>
    </div>
    ${free?`<div class="best" style="margin-top:16px">El entrenamiento no consume vidas ni desbloquea nodos. Te llevas un tercio de la XP.</div>`:""}
  </div>` + invHTML();
  refreshInventory();
  if(passed && unlockedList.length) toast("🗺️ "+unlockedList.length+" nodo(s) desbloqueado(s)");
}
function verdictTitle(p, passed, n){
  if(passed && p===100) return "👑 ¡PERFECCIÓN ABSOLUTA!";
  if(passed) return "🏆 ¡NODO SUPERADO!";
  if(p>=50) return "💪 Casi lo tienes";
  if(p>=25) return "😤 Duro de roer";
  return "💀 Derrota aplastante";
}
function pickItem(){
  const it = ITEM_LIST[Math.floor(Math.random()*ITEM_LIST.length)];
  return it.id;
}

function quitBattle(){
  clearInterval(B.timer);
  document.removeEventListener("keydown", battleKeys);
  sfx.click();
  openMap();
}

/* ---------- ENTRENAMIENTO LIBRE ---------- */
const TRAIN_MODES = {
  classic:{n:"Combate clásico",ico:"⚔️",badge:"2 vidas · 20 s",p:"2 vidas y 20 segundos por golpe, sin límite de nodos. Gana un tercio de la XP."},
  blitz:{n:"Asalto rápido",ico:"⚡",badge:"2 vidas · 15 s",p:"Solo 15 segundos por pregunta y 2 vidas. Máxima presión."},
  drill:{n:"Simulacro",ico:"🎯",badge:"sin daño · 30 s",p:"Sin pérdida de vidas y 30 segundos por golpe. Ideal para memorizar antes de un boss."}
};
let T = {mode:"classic", realm:"__all", lives:2, perQ:20, noDamage:false};

function openTraining(){
  app.innerHTML = hudHTML() + `<div class="card screen">
    <div class="map-head"><h2>🎯 Entrenamiento libre</h2></div>
    <div class="modes">
      ${Object.entries(TRAIN_MODES).map(([k,m])=>`
        <button class="mode" onclick="T.mode='${k}';openTraining()">
          <span class="badge">${m.badge}</span>
          <div class="ico">${m.ico}</div>
          <h3 style="color:${T.mode===k?"var(--orange)":"#fff"}">${m.n}</h3>
          <p>${m.p}</p>
        </button>`).join("")}
    </div>
    <div style="margin-top:22px">
      <div style="font-size:12px;font-weight:800;letter-spacing:1.4px;color:var(--soft);text-transform:uppercase;margin-bottom:10px">Reino</div>
      <div class="topics" style="justify-content:flex-start">
        <button class="tchip ${T.realm==="__all"?"on":""}" onclick="T.realm='__all';openTraining()">Todos</button>
        ${REALMS.map(r=>`<button class="tchip ${T.realm===r.id?"on":""}" onclick="T.realm='${r.id}';openTraining()">${r.sprite} ${esc(r.name)}</button>`).join("")}
      </div>
    </div>
    <div style="margin-top:24px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
      <button class="btn btn-primary" onclick="startTraining()">⚔️ Comenzar combate</button>
      <button class="btn btn-ghost" onclick="openMap()">← Mapa</button>
      <button class="btn btn-ghost" onclick="screenTitle()">🏠 Inicio</button>
    </div>
  </div>` + invHTML();
  refreshInventory();
}
function startTraining(){
  const rid = T.realm;
  const pool = rid==="__all"
    ? NODES.flatMap(n=>allQuestionsFor(n))
    : nodesOfRealm(rid).flatMap(n=>allQuestionsFor(n));
  if(!pool.length){ toast("No hay preguntas en ese reino"); return; }

  const mode = TRAIN_MODES[T.mode];
  const picks = shuffle(pool).slice(0, Math.min(15, pool.length));
  /* nodo sintético con las preguntas ya elegidas, para que startBattle lo trate igual */
  const fake = {
    id:"__train", r: rid==="__all" ? "fnd" : rid, s:"🎯", t:"enemy",
    name:"Simulacro · "+mode.n,
    lore:"Entrenamiento libre: sin progresión, sin perder progreso.",
    q: picks, xp:Math.round(picks.length*14), tier:2, req:[]
  };
  NODE.__train = fake;

  const opts = {freeplay:true};
  if(T.mode==="drill"){ opts.lives = 99; opts.noDamage = true; opts.perQ = 30; }
  else if(T.mode==="blitz"){ opts.lives = 2; opts.perQ = 15; }
  else { opts.lives = 2; opts.perQ = 20; }

  startBattle("__train", opts);
}

/* ---------- TIENDA ---------- */
function openShop(){
  app.innerHTML = hudHTML() + `<div class="card screen">
    <div class="mhead"><div class="mi">🛒</div><div><h3>Tienda de objetos</h3>
      <div style="font-size:13px;color:var(--muted)">Salen de los combates. Tu oro actual: <b style="color:var(--gold)">🪙 ${P.gold}</b></div></div></div>
    <div class="shopgrid">
      ${ITEM_LIST.map(it=>`
        <div class="item">
          <div class="ic">${it.ico}</div>
          <b>${esc(it.name)}</b>
          <p>${esc(it.desc)}</p>
          <div class="pr">
            <span class="price">🪙 ${it.price}</span>
            <span style="font-size:12px;color:var(--muted);font-weight:700">Tienes ${P.inv[it.id]||0}</span>
          </div>
          <button class="btn btn-sm btn-primary" onclick="buy('${it.id}')"
            ${P.gold<it.price?"disabled":""}>Comprar</button>
        </div>`).join("")}
      <div class="item">
        <div class="ic">❤️</div>
        <b>Reponer vidas</b>
        <p>Recupera tus vidas al máximo de 3 para volver al mapa.</p>
        <div class="pr"><span class="price">🪙 60</span>
          <span style="font-size:12px;color:var(--muted);font-weight:700">Tienes ${P.lives}</span></div>
        <button class="btn btn-sm btn-primary" onclick="restLives()" ${P.lives>=3?"disabled":""}>Comprar</button>
      </div>
    </div>
    <div style="display:flex;gap:12px;justify-content:center;margin-top:22px">
      <button class="btn btn-primary" onclick="openShop()">🔄 Actualizar</button>
      <button class="btn btn-ghost" onclick="openMap()">← Mapa</button>
      <button class="btn btn-ghost" onclick="screenTitle()">🏠 Inicio</button>
    </div>
  </div>` + invHTML();
  refreshInventory();
}
function buy(id){
  const it = ITEM_LIST.find(i=>i.id===id);
  if(P.gold < it.price){ toast("Oro insuficiente"); return; }
  P.gold -= it.price;
  P.inv[id] = (P.inv[id]||0)+1;
  sfx.coin(); save(); openShop(); refreshInventory();
}
function restLives(){
  if(P.lives>=3){ toast("Ya tienes 3 vidas"); return; }
  if(P.gold<60){
    if(P.lives < 1){ P.lives = 1; save(); toast("❤️ Al menos 1 vida"); refreshInventory(); openMap(); }
    else toast("Necesitas 60 de oro (tienes "+P.gold+")");
    return;
  }
  P.gold -= 60; P.lives = 3;
  sfx.coin(); save(); toast("❤️ Vidas repuestas");
  openMap();
  refreshInventory();
}

/* ---------- BESTIARIO ---------- */
function openBestiary(){
  app.innerHTML = hudHTML() + `<div class="card screen">
    <div class="mhead"><div class="mi">📖</div><div><h3>Bestiario de AWS</h3>
      <div style="font-size:13px;color:var(--muted)">${P.stats.kills} enemigos derrotados · ${P.stats.bosses} bosses</div></div></div>
    <div class="bestiary">
      ${NODES.map(n=>{
        const done = isCleared(n.id);
        const r = realmOf(n.r);
        return `<div class="brow ${done?"":"dead"}">
          <div class="bs">${done?n.s:"❓"}</div>
          <div class="bi">
            <b>${done?esc(n.name):"???"} ${n.t==="boss"?"👹":n.t==="elite"?"💀":""}</b>
            <span>${r.sprite} ${esc(r.name)} · Nv${n.tier} · ${nodeTypeLabel(n)}${done?" · "+pct(n.id)+"%":""}</span>
          </div>
          ${done?`<div class="bscore">${pct(n.id)}%</div>`:`<button class="btn btn-sm" onclick="openBrief('${n.id}')">Ver</button>`}
        </div>`;
      }).join("")}
    </div>
    <div style="display:flex;gap:12px;justify-content:center;margin-top:22px">
      <button class="btn btn-primary" onclick="openBestiary()">🔄 Actualizar</button>
      <button class="btn btn-ghost" onclick="screenTitle()">🏠 Inicio</button>
    </div>
  </div>` + invHTML();
  refreshInventory();
}

/* ---------- REGISTRO DE TRUCOS ---------- */
function openCodex(){
  const realms = REALMS.map(r=>{
    const ns = nodesOfRealm(r.id);
    const done = ns.filter(n=>isCleared(n.id));
    return `<div class="unlock" style="flex-direction:column;align-items:flex-start;gap:8px;background:rgba(255,255,255,.04);border-color:${r.color}55;color:var(--muted)">
      <div style="font-size:16px;font-weight:800;color:#fff">${r.sprite} ${esc(r.name)} <span style="font-size:13px;color:${r.color}">${done.length}/${ns.length}</span></div>
      <div style="font-size:13.5px;line-height:1.6">
        ${ns.map(n=>`<div style="display:flex;gap:8px;align-items:center;margin-top:4px">
          <span style="width:22px;text-align:center">${isCleared(n.id)?"✅":"⬜"}</span>
          <span style="flex:1;color:${isCleared(n.id)?"var(--text)":"var(--soft)"}">${esc(n.name)}</span>
          <span style="font-size:11.5px">${isCleared(n.id)?pct(n.id)+"%":"Nv"+n.tier}</span>
        </div>`).join("")}
      </div>
    </div>`;
  }).join("");
  app.innerHTML = hudHTML() + `<div class="card screen">
    <div class="mhead"><div class="mi">🧾</div><div><h3>Registro de trucos</h3>
      <div style="font-size:13px;color:var(--muted)">Progreso global: <b style="color:var(--orange)">${totalPct()}%</b> · ${rank().cur.ico} ${rank().cur.name}</div></div></div>
    <div class="unlocks">${realms}</div>
    <div style="display:flex;gap:12px;justify-content:center;margin-top:22px">
      <button class="btn btn-primary" onclick="openMap()">🗺️ Mapa</button>
      <button class="btn btn-ghost" onclick="screenTitle()">🏠 Inicio</button>
    </div>
  </div>` + invHTML();
  refreshInventory();
}

/* ---------- HUD REFRESH ---------- */
function refreshInventory(){
  /* sincroniza contadores del inventario visible */
  document.querySelectorAll(".inv").forEach(el=>{
    const it = ITEM_LIST.find(i=>i.id===el.dataset.item);
    if(!it) return;
    const n = P.inv[it.id]||0;
    el.classList.toggle("empty", n===0);
    const c = el.querySelector(".cnt");
    if(c) c.textContent = n;
  });
  /* sincroniza vidas y contadores del HUD */
  const hud = document.querySelector(".hud");
  if(hud){
    const hb = hud.querySelector(".pill.hp .hudhearts");
    if(hb) hb.innerHTML = hearts(P.lives);
    const gc = hud.querySelector(".pill.xp span:last-child");
    if(gc) gc.textContent = clearedCount()+"/"+NODES.length;
    const gl = hud.querySelector(".pill.gold span:last-child");
    if(gl) gl.textContent = P.gold;
  }
}
function toggleMute(){ P.muted = !P.muted; save(); screenTitle(); }

/* ---------- RESET ---------- */
function wipeSave(){
  if(!confirm("¿Seguro que quieres borrar todo tu progreso, XP, oro y objetos?")) return;
  localStorage.removeItem(SAVE_KEY);
  location.reload();
}

/* ---------- BOOT ---------- */
