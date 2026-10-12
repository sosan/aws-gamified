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
  lang:"es",         /* idioma activo: "es" o "en" (guardado en localStorage) */
  xp:0, gold:120,
  lives:3,
  cleared:{},        /* nodeId -> {best, tries} */
  inv:{potion:1, shield:1, oracle:1, scroll:1},
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
  if(entry.type==="quiz-bank") return null;  /* se resuelve en expandQ */
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
  if(entry.type==="match"){
    return {type:"match", id:s.id, title:s.title, hint:s.hint, pairs:s.pairs.map(p=>({a:p[0],b:p[1]}))};
  }
  if(entry.type==="memory"){
    /* memoria: usa el banco de matching; cada par se convierte en 2 cartas */
    const pairs = shuffle(s.pairs).slice(0, Math.min(entry.n||4, s.pairs.length));
    const cards = pairs.flatMap((p,i)=>[
      {i, side:"a", txt:p[0]},
      {i, side:"b", txt:p[1]}
    ]);
    return {
      type:"memory", id:s.id+"-mem", title:"Memoria: "+s.title, hint:s.hint,
      pairs:pairs.map(p=>({a:p[0],b:p[1]})), cards:shuffle(cards)
    };
  }
  if(entry.type==="hangman"){
    /* ahorcado: elige una palabra del banco de sopa que sea SOLO A-Z (sin
       dígitos ni caracteres raros), para poder adivinarla letra a letra */
    const words = s.words.filter(w=>/^[A-Z]+$/.test(w));
    if(!words.length) return null;
    return {type:"hangman", id:s.id+"-hang", title:"Ahorcado: "+s.title, hint:s.hint, word:words[Math.floor(Math.random()*words.length)].toUpperCase()};
  }
  return null;
}

/* preguntas y retos resueltos: marcadores "Tema:N" toman del BANK heredado;
   entradas-objeto {type,ref,n} instancian retos alternos */
function expandQ(n){
  const out = [];
  /* banco según idioma: BILINGUAL_BANK (es/en) si está, si no BANK plano */
  const bank = (typeof BILINGUAL_BANK !== "undefined" && BILINGUAL_BANK.length) ? BILINGUAL_BANK : BANK;
  const pickLang = (b) => {
    if (b && b.es && b.en) return [ (L()==="en" ? b.en : b.es).q, (L()==="en" ? b.en : b.es).o.join("|"), b.a, (L()==="en" ? b.en : b.es).e || "" ];
    return [b.q, b.o.join("|"), b.a, b.e || ""];
  };
  (n.q||[]).forEach(entry=>{
    if(typeof entry === "string"){
      /* Marcador "Tema:N": el separador es el ÚLTIMO ':' para que temas con ':'
         interno (p. ej. "AWS Industry Quest: Healthcare") funcionen. */
      const m = /^(.*):(\d+)$/.exec(entry);
      const topic = m ? m[1] : entry;
      const k = m ? +m[2] : 4;
      const pool = bank.filter(b=>b.t===topic).map(pickLang);
      const picked = shuffle(pool).slice(0, Math.min(k, pool.length));
      picked.forEach(p=>out.push(p));
    }else if(entry && typeof entry === "object" && entry.type==="quiz-bank"){
      /* marcador de banco de preguntas (SAA/SAP Practitioner): toma n preguntas
         al azar del topic indicado y las añade como tuplas de quiz */
      const topic = entry.topic, k = +entry.n || 1;
      const pool = bank.filter(b=>b.t===topic).map(pickLang);
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

/* BANCO AWS SKILL BUILDER: js/skillbuilder_bank.js se carga tras data.js y
   define SKILLBUILDER_BANK (748 preguntas, multi-select con 'a' como array).
   Se fusiona aquí (no en data.js, que se carga antes) para que los marcadores
   "Tema:N" (p. ej. "Security:5") y quiz-bank puedan usarlas. */
if (typeof SKILLBUILDER_BANK !== "undefined" && typeof BANK !== "undefined") {
  BANK.push(...SKILLBUILDER_BANK);
}

/* total de preguntas y retos disponibles (inline + banco heredado + retos alternos) */
const TOTAL_QUESTIONS = NODES.reduce((a,n)=>a+expandQ(n).length, 0);

/* tiempo por tipo de reto: cada uno tiene su margen en segundos */
function timeFor(c){
  const t = chType(c);
  if(t==="wordsearch") return 300;
  if(t==="crossword") return 75;
  if(t==="memory") return 90;
  if(t==="hangman") return 60;
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
  return n.t==="boss" ? "⚔️ BOSS" : n.t==="elite" ? "💀 ELITE" : "⚔️ "+t("Enemigo","Enemy");
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
      <div style="font-size:10px;color:var(--soft);letter-spacing:1px">${t("RPG DE CERTIFICACIÓN","CERTIFICATION RPG")}</div></div></div>
    <div class="who">
      <div class="t">${r.cur.ico} ${r.cur.name}</div>
      <div class="s">${t("NIVEL","LEVEL")} ${RANKS.indexOf(r.cur)+1} · ${P.xp.toLocaleString()} XP</div>
      <div class="xpbar"><i style="width:${r.toNext}%"></i></div>
    </div>
    <div class="sp"></div>
    <div class="pill hp"><span class="hudhearts">${hearts(P.lives)}</span></div>
    <div class="pill gold"><span>🪙</span><span>${P.gold}</span></div>
    <div class="pill xp"><span>💎</span><span>${clearedCount()}/${NODES.length}</span></div>
    <button class="btn btn-sm langbtn" onclick="setLang(L()==='es'?'en':'es')" title="${t('Cambiar idioma / Change language','Change language / Cambiar idioma')}">${L()==='es'?'EN':'ES'}</button>
    <button class="btn btn-sm" onclick="toggleMute()">${P.muted?"🔇":"🔊"}</button>
  </div>`;
}
function invHTML(){
  return `<div class="invbar">
    <div class="lbl">${t("Inventario","Inventory")}</div>
    ${ITEM_LIST.map(it=>`<div class="inv ${P.inv[it.id]?"":"empty"}" data-item="${it.id}"
      title="${esc(iname(it))}: ${esc(idesc(it))} (${t("usar durante el combate","use during battle")})"
      onclick="useItem('${it.id}')">${it.ico}<span class="cnt">${P.inv[it.id]||0}</span></div>`).join("")}
  </div>`;
}

/* ---------- ITEMS ---------- */
function iname(it){ return typeof it.name==="function" ? it.name() : it.name; }
function idesc(it){ return typeof it.desc==="function" ? it.desc() : it.desc; }
const ITEM_LIST = [
  {id:"potion", ico:"🧪", name:()=>t("Poción de vida","Health potion"),      desc:()=>t("Restaura una vida durante el combate.","Restores one life during battle."), price:45},
  {id:"shield", ico:"🛡️", name:()=>t("Escudo de AWS","AWS Shield"),      desc:()=>t("Absorbe el próximo golpe sin perder vida.","Absorbs the next hit without losing a life."), price:60},
  {id:"oracle", ico:"🔮", name:()=>t("Oráculo","Oracle"),            desc:()=>t("Elimina dos opciones incorrectas de la pregunta actual.","Removes two wrong options from the current question."), price:40},
  {id:"scroll", ico:"📜", name:()=>t("Pergamino de pista","Hint scroll"), desc:()=>t("Revela la respuesta correcta de la pregunta actual durante 5s.","Reveals the correct answer of the current question for 5s."), price:55}
];

/* ---------- RENDER: TITULO ---------- */
function screenTitle(){
  document.getElementById("app").innerHTML = `
    <div class="card title">
      <div class="crest">λ</div>
      <h1>AWS SKILL TREE <em>RPG</em></h1>
      <div class="sub">${t("Domina la nube combatiendo · "+NODES.length+" nodos · "+TOTAL_QUESTIONS+" desafíos","Master the cloud by battling · "+NODES.length+" nodes · "+TOTAL_QUESTIONS+" challenges")}</div>
      <div class="facts">
        <div class="fact">${t("Reinos","Realms")} <b>${REALMS.length}</b></div>
        <div class="fact">${t("Enemigos","Enemies")} <b>${NODES.filter(n=>n.t==="enemy").length}</b></div>
        <div class="fact">${t("Elites","Elites")} <b>${NODES.filter(n=>n.t==="elite").length}</b></div>
        <div class="fact">${t("Bosses","Bosses")} <b>${NODES.filter(n=>n.t==="boss").length}</b></div>
        <div class="fact">${t("Progreso","Progress")} <b>${totalPct()}%</b></div>
      </div>
      <div class="menu">
        <button class="mbtn" onclick="openMap()">
          <div class="ic">🗺️</div>
          <div class="tx"><b>${t("Mapa de habilidades","Skill map")}</b><span>${t("Avanza por los 7 reinos y desbloquea nodos","Advance through the realms and unlock nodes")}</span></div>
          <div class="tg">${clearedCount()}/${NODES.length}</div>
        </button>
        <button class="mbtn" onclick="openTraining()">
          <div class="ic">🎯</div>
          <div class="tx"><b>${t("Entrenamiento libre","Free training")}</b><span>${t("Combate libre sin progresión: clásico, asalto rápido y simulacro","Free battle without progression: classic, blitz, and drill")}</span></div>
          <div class="tg">${t("SIN LÍMITES","UNLIMITED")}</div>
        </button>
        <button class="mbtn" onclick="openShop()">
          <div class="ic">🛒</div>
          <div class="tx"><b>${t("Mercader","Merchant")}</b><span>${t("Compra pociones, escudos, oráculos y pergaminos con tu oro","Buy potions, shields, oracles, and scrolls with your gold")}</span></div>
          <div class="tg">🪙 ${P.gold}</div>
        </button>
        <button class="mbtn" onclick="openBestiary()">
          <div class="ic">📖</div>
          <div class="tx"><b>${t("Bestiario","Bestiary")}</b><span>${t("Enemigos, elites y bosses de la nube","Cloud enemies, elites, and bosses")}</span></div>
          <div class="tg">${P.stats.kills}</div>
        </button>
      </div>
      <div style="margin-top:24px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
        <button class="btn btn-sm" onclick="openCodex()">🧾 ${t("Registro de trucos","Cheat sheet")}</button>
        <button class="btn btn-sm btn-danger" onclick="wipeSave()">🗑 ${t("Reiniciar progreso","Reset progress")}</button>
        <button class="btn btn-sm langbtn" onclick="setLang(L()==='es'?'en':'es')" title="${t('Cambiar idioma / Change language','Change language / Cambiar idioma')}">${L()==='es'?'EN':'ES'}</button>
      </div>
      <div style="margin-top:18px;font-size:13px;color:var(--soft)">
        ${t("Vidas","Lives")}: ${P.lives} · ${t("Victorias","Wins")}: ${P.stats.kills} · ${t("Bosses","Bosses")}: ${P.stats.bosses} ·
        ${t("Muertes","Deaths")}: ${P.stats.deaths} · ${t("Perfectas","Perfects")}: ${P.stats.perfect}
      </div>
    </div>` + invHTML();
  refreshInventory();
}
/* ---------- RENDER: MAPA ---------- */
function openMap(){
  const done = clearedCount();
  let html = `<div class="card screen mapcard" id="mapCard">
    <div class="map-head">
      <h2>🗺️ ${t("Mapa de habilidades","Skill map")}</h2>
      <div class="legend">
        <div class="lg"><i style="background:var(--orange)"></i>${t("Disponible","Available")}</div>
        <div class="lg"><i style="background:var(--green)"></i>${t("Superado","Cleared")}</div>
        <div class="lg"><i style="background:var(--soft)"></i>${t("Bloqueado","Locked")}</div>
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
      <button class="btn btn-primary" onclick="openMap()">🔄 ${t("Ver progreso","View progress")}</button>
      <button class="btn" onclick="openShop()">🛒 ${t("Mercader","Merchant")}</button>
      <button class="btn" onclick="screenTitle()">🏠 ${t("Inicio","Home")}</button>
      <button class="btn" onclick="openCodex()">🧾 ${t("Trucos","Cheats")}</button>
      ${P.lives<3?`<button class="btn btn-primary" onclick="restLives()">❤️ ${t("Reponer vidas","Restore lives")} (🪙 60)</button>`:""}
    </div>
    ${done===NODES.length?`<div class="unlocks" style="margin-top:20px">
      <div class="unlock"><span class="u">👑</span>${t("¡Has derrotado a todos los enemigos de la nube! Eres un AWS Architect.","You defeated all cloud enemies! You are an AWS Architect.")}</div></div>`:""}
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
  const nodeName = n.name_local && n.name_local[L()] ? n.name_local[L()] : n.name;
  return `<button class="${cls}" data-node="${n.id}" onclick="openBrief('${n.id}')">
    <div class="ntop">
      <div class="sprite">${done?"✅":(open?n.s:"🔒")}</div>
      <div class="meta">
        <b>${esc(nodeName)}</b>
        <span>${nodeTypeLabel(n)} · Nv${n.tier}</span>
      </div>
    </div>
    <div class="lv">
      <div class="bar"><i style="width:${p}%"></i></div>
      <span>${p}%</span>
    </div>
    <div style="margin-top:8px">${tag || (open?`<span class="tag-mini" style="background:rgba(255,153,0,.14);color:var(--orange-soft);border:1px solid rgba(255,153,0,.3)">${t("DISPONIBLE","AVAILABLE")}</span>`:"")}</div>
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
          <div class="attr"><div class="l">${t("Nivel","Level")}</div><div class="v">Nv ${n.tier}</div></div>
          <div class="attr"><div class="l">${t("Desafíos","Challenges")}</div><div class="v">${totalHp}</div></div>
          <div class="attr"><div class="l">${t("Vidas","Lives")}</div><div class="v">${n.t==="boss"?4:n.t==="elite"?3:2}</div></div>
          <div class="attr"><div class="l">${t("Recompensa","Reward")}</div><div class="v">${n.xp} XP</div></div>
          <div class="attr"><div class="l">${t("Tu mejor","Your best")}</div><div class="v">${pct(id)}%</div></div>
        </div>
        <div class="reqs">
          <div style="font-size:12px;font-weight:800;letter-spacing:1.4px;color:var(--soft);text-transform:uppercase">${t("Requisitos","Requirements")}</div>
          ${n.req.length ? n.req.map(rid=>{
            const ok = pct(rid) >= PASS_PCT;
            return `<div class="req ${ok?"ok":"no"}">${ok?"✅":"🔒"} ${esc(nodeOf(rid).name)} — ${ok?t("superado","cleared")+" ("+pct(rid)+"%)":"necesitas "+PASS_PCT+"%"}</div>`;
          }).join("") : `<div class="req ok">✅ ${t("Sin requisitos — nodo raíz","No requirements — root node")}</div>`}
        </div>
        <div class="itemrow">
          ${open ? `<button class="btn btn-primary" onclick="startBattle('${id}')">⚔️ ${done?t("Repetir combate","Repeat battle"):t("Combatir","Battle")}</button>`
                 : `<button class="btn" disabled>🔒 ${t("Bloqueado","Locked")}</button>`}
          <button class="btn btn-ghost" onclick="openMap()">← ${t("Volver al mapa","Back to map")}</button>
        </div>
        ${done?`<div class="best" style="margin-top:16px;font-size:14px;color:var(--green)">${t("Ya superaste este nodo con ","You already cleared this node with ")}${pct(id)}%. ${t("Puedes repetirlo para mejorar tu marca.","You can repeat it to improve your score.")}</div>`:""}
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
  if(!n){ toast(t("Nodo no encontrado","Node not found")); return; }
  const pool = allQuestionsFor(n);
  if(!pool.length){ toast(t("Ese nodo no tiene preguntas","That node has no questions")); return; }
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
  const timerHTML = B.tmax ? `<div class="stat timer-pill pill ${B.tleft<=5?"low":""}"><span>⏱️</span><span>${Math.max(0,Math.ceil(B.tleft))}s</span></div>` : "";
  return `<div class="arena-top">
    <div class="enemy-box">
      <div class="es" id="enemySprite">${n.s}</div>
      <div class="ei">
        <div class="en">${esc(n.name_local && n.name_local[L()] ? n.name_local[L()] : n.name)}</div>
        <div class="ty">${nodeTypeLabel(n)} · ${realmOf(n.r).name}</div>
        <div class="hpbar ${barCls}"><i id="ehp" style="width:${B.ehp>0?Math.round(B.ehp/B.emax*100):0}%"></i></div>
        <div class="turns" style="margin-top:7px">${turnMarks}</div>
      </div>
    </div>
    ${timerHTML}
    <div class="fighter">
      <div class="fs">🧑‍💻</div>
      <div class="fi">
        <b>${rank().cur.name}</b>
        <span>${B.noDamage?t("Modo simulacro","Drill mode"):t("Vidas","Lives")} <span id="bLives">${B.noDamage?"🛡️ "+t("sin daño","no damage"):hearts(B.lives)}</span></span>
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
  if(chType(c)==="memory") return renderMemory(c);
  if(chType(c)==="hangman") return renderHangman(c);
  return renderQuiz(c);
}

function fmtQ(t){ return esc(t).replace(/`([^`]+)`/g,"<code>$1</code>"); }

/* ----- cabecera común a todos los retos: arena + meta ----- */
function qmetaHTML(){
  return `<div class="qmeta">
    <span class="chip req">⚔️ ${nodeTypeLabel(B.node)}</span>
    <span class="chip rpl">${realmOf(B.node.r).sprite} ${esc(realmOf(B.node.r).name)}</span>
    <span class="chip n">${t("GOLPE","HIT")} ${B.idx+1} / ${B.qs.length}</span>
  </div>`;
}

/* ----- controles compartidos: ítems + botón "Siguiente golpe" ----- */
function challengeControlsHTML(hint){
  return `<div style="display:flex;gap:10px;margin-top:20px;flex-wrap:wrap;align-items:center">
    <button class="btn btn-primary hidden" id="nextBtn" onclick="nextHit()">${t("Siguiente golpe →","Next hit →")}</button>
    <span style="font-size:13px;color:var(--soft)">${hint||t("Atajos: A-B-C-D · Enter para continuar","Shortcuts: A-B-C-D · Enter to continue")}</span>
    <span style="margin-left:auto"></span>
    <button class="btn btn-sm" onclick="useItem('potion')">🧪 ${P.inv.potion}</button>
    <button class="btn btn-sm" onclick="useItem('shield')">🛡️ ${P.inv.shield}</button>
    <button class="btn btn-sm" onclick="useItem('oracle')">🔮 ${P.inv.oracle}</button>
    <button class="btn btn-sm btn-ghost" onclick="quitBattle()">🏃 ${t("Huir","Flee")}</button>
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
/* c[2] puede ser un índice (una respuesta) o un array de índices (multi-select). */
function renderQuiz(c){
  const opts = c[1].split("|");
  const letters = ["A","B","C","D"];
  const multi = Array.isArray(c[2]);
  B.picked = multi ? new Set() : null;
  app.innerHTML = hudHTML() + `<div class="card screen">
    ${battleTopHTML()}
    <div class="qcard">
      ${qmetaHTML()}
      ${multi ? `<div class="q"><span class="multi-badge">☑ ${t("Selecciona todas las correctas","Select all that apply")}</span> ${fmtQ(c[0])}</div>`
              : `<div class="q">${fmtQ(c[0])}</div>`}
      <div class="opts" id="opts">
        ${opts.map((o,i)=>`<button class="opt" id="opt${i}" onclick="${multi?`toggleOpt(${i})`:`answer(${i})`}">
          <span class="letter">${multi?`<span id="chk${i}">☐</span>`:letters[i]}</span><span>${esc(o)}</span></button>`).join("")}
      </div>
      ${multi ? `<button class="btn btn-primary" id="confirmBtn" style="margin-top:14px;width:100%" onclick="confirmAnswer()">✓ ${t("Confirmar selección","Confirm selection")}</button>` : ""}
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
  /* teclas A/B/C/D responden las opciones 0-3 (case-insensitive) */
  const k = e.key.toLowerCase();
  const idx = ["a","b","c","d"].indexOf(k);
  if(idx !== -1){
    const b = document.getElementById("opt"+idx);
    if(b && !b.disabled && !B.answered){
      const c = B.qs[B.idx];
      if(Array.isArray(c) && Array.isArray(c[2])) toggleOpt(idx);
      else answer(idx);
    }
  }
  if(e.key==="Enter"){
    const c = B.qs[B.idx];
    if(Array.isArray(c) && Array.isArray(c[2]) && !B.answered){ confirmAnswer(); return; }
    const nb = document.getElementById("nextBtn");
    if(nb && !nb.classList.contains("hidden")) nextHit();
  }
}

function removeTwoOptions(){
  const q = B.qs[B.idx];
  const correct = Array.isArray(q[2]) ? new Set(q[2]) : new Set([q[2]]);
  const wrong = [0,1,2,3].filter(i=>!correct.has(i));
  shuffle(wrong).slice(0,2).forEach(i=>{
    const b = document.getElementById("opt"+i);
    if(b){ b.disabled = true; b.style.opacity = ".2"; b.style.filter = "grayscale(1)"; }
  });
  toast(t("🔮 El Oráculo reduce las opciones","🔮 The Oracle removes two options"));
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
    <div><b>${crit?t("¡Golpe crítico!","Critical hit!"):t("¡Impacto!","Impact!")}</b> · ${esc(expl)}</div>
    <div class="dmg"><div class="${crit?"dmg-crit":"dmg-num"}">-1 HP ${t("enemigo","enemy")}${crit?" · "+t("doble XP","double XP"):""}</div>
    <div style="font-size:12px;color:var(--muted);font-weight:800">🔥 ${t("Combo","Combo")} ${B.combo}</div></div>`;
  if(B.ehp<=0){
    log.innerHTML += `<div style="width:100%;margin-top:6px;color:var(--green);font-weight:800">☠️ ${t("¡Enemigo derrotado!","Enemy defeated!")}</div>`;
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
      <div><b>${t("Reporte (simulacro)","Drill report")}</b> · ${esc(expl)}</div>
      <div class="dmg"><div style="font-size:13px;color:var(--muted);font-weight:800">${t("Combo perdido","Combo lost")}</div></div>`;
  }else if(B.shieldOn){
    B.shieldOn = false;
    log.className = "logline ok";
    log.innerHTML = `<span class="big">🛡️</span>
      <div><b>${t("El Escudo de AWS absorbió el golpe","The AWS Shield absorbed the hit")}</b> · ${esc(expl)}</div>`;
  }else if(B.lives>0){
    B.lives--;
    const lb = document.getElementById("bLives"); if(lb) lb.innerHTML = hearts(B.lives);
    const pb = document.getElementById("php"); if(pb) pb.style.width = Math.round(B.lives/B.maxLives*100)+"%";
    log.className = "logline bad";
    log.innerHTML = `<span class="big">${icon||"💔"}</span>
      <div><b>${esc(title||t("¡Golpe recibido!","Hit received!"))}</b> · ${esc(expl)}</div>
      <div class="dmg"><div class="dmg-num" style="color:var(--red)">-1 ${t("vida","life")}</div>
      <div style="font-size:12px;color:var(--muted);font-weight:800">${t("Combo perdido","Combo lost")}</div></div>`;
    if(B.lives<=0){ finishBattle(false); return; }
  }
  showNextBtn();
}

function showNextBtn(){
  const nb = document.getElementById("nextBtn");
  if(nb){ nb.classList.remove("hidden"); nb.textContent = (B.ehp<=0)?t("Cobrar victoria →","Claim victory →"):t("Siguiente golpe →","Next hit →"); }
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
      <div class="ch-sub">${esc(c.hint)} · ${t("clic en la 1ª y la última letra · los fallos restan 5s, no vidas","click the 1st and last letter · mistakes cost 5s, not lives")}</div>
      <div class="wswrap">
        <div class="wsgrid" style="--ws-cols:${W}">${cells}</div>
        <div class="wslist" id="wslist">${wlist}</div>
      </div>
      <div class="logline" id="log"></div>
      ${challengeControlsHTML(t("Línea recta: horizontal, vertical o diagonal","Straight line: horizontal, vertical, or diagonal"))}
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
  toast("⏱️ -5s · " + (msg || t("fallo","mistake")));
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
  if(!val){ toast(t("Escribe la respuesta primero","Enter the answer first")); return; }
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
    missHit(c, "💔", t("Respuesta incorrecta","Wrong answer"), t("Pista","Hint")+": "+w.clue);
  }
}

/* ---------- RENDER: MEMORIA (parejas de cartas boca-abajo) ---------- */
function renderMemory(c){
  B.sub = B.sub || {};
  B.sub.mem = {
    c, cards:c.cards, flipped:[], matched:new Set(),
    attempts:3, done:0, total:c.cards.length/2,
    colors:MATCH_COLORS.slice()
  };
  const grid = c.cards.map((cd,k)=>{
    const found = false; // se actualizará en runtime
    return `<button class="memcard" id="mem${k}" data-i="${cd.i}" data-side="${cd.side}" onclick="memPick(${k})"><span class="memface memback">?</span><span class="memface memfront">${esc(cd.txt)}</span></button>`;
  }).join("");
  app.innerHTML = hudHTML() + `<div class="card screen">
    ${battleTopHTML()}
    <div class="qcard">
      ${qmetaHTML()}
      <div class="ch-head"><span class="ch-ico">🃏</span> ${esc(c.title)}</div>
      <div class="ch-sub">${esc(c.hint)} · clic en 2 cartas para revelar las parejas · 3 intentos</div>
      <div class="memgrid" id="memgrid">${grid}</div>
      <div class="memstats"><span>Intentos: <b id="memAttempts">3</b></span><span>Parejas: <b id="memPairs">0</b>/${B.sub.mem.total}</span></div>
      <div class="logline" id="log"></div>
      ${challengeControlsHTML("Las parejas correctas se quedan boca arriba")}
    </div>
  </div>` + invHTML();
  startTurnTimer();
  refreshInventory();
}
function memPaint(el, state, color){
  if(!el) return;
  el.classList.remove("sel","err","ok");
  if(state==="back"){ el.style.cssText = "background:#12223a !important;color:var(--orange) !important;border-color:var(--edge)"; }
  else if(state==="flip"){ el.style.cssText = "background:#1b3057 !important;color:#fff !important;border-color:var(--blue)"; }
  else if(state==="ok"){ el.style.cssText = "background:"+(color||"#6BC853")+" !important;color:#0b1729 !important;border-color:"+(color||"#6BC853"); }
  else if(state==="err"){ el.style.cssText = "background:#ff5a5a !important;color:#fff !important;border-color:#ff5a5a"; }
}
function memPick(k){
  if(B.answered) return;
  const st = B.sub.mem; if(!st) return;
  const c = st.c;
  if(k<0 || k>=st.cards.length) return;
  const cd = st.cards[k];
  /* ya está emparejada de forma permanente */
  if(st.matched.has(k)) return;
  /* re-clic sobre la única carta volteada: la deselecciona (vuelve boca abajo) */
  if(st.flipped.length===1 && st.flipped[0]===k){
    st.flipped = [];
    memPaint(document.getElementById("mem"+k), "back");
    return;
  }
  /* ya hay 2 cartas volteadas esperando evaluar: bloquear más clics */
  if(st.flipped.length >= 2) return;
  if(st.flipped.includes(k)) return;
  const el = document.getElementById("mem"+k);
  /* mostrar la cara frontal */
  el.classList.add("sel");
  memPaint(el, "flip");
  st.flipped.push(k);
  if(st.flipped.length < 2) return;
  /* segundo clic: evaluar pareja */
  const [i,j] = st.flipped;
  const a = st.cards[i], b = st.cards[j];
  const elI = document.getElementById("mem"+i);
  const elJ = document.getElementById("mem"+j);
  if(a.i === b.i && a.side !== b.side){
    /* pareja correcta: boca arriba permanente con el color del pool */
    const color = st.colors.shift();
    st.matched.add(i); st.matched.add(j);
    memPaint(elI, "ok", color);
    memPaint(elJ, "ok", color);
    st.done++;
    st.flipped = [];
    sfx.hit();
    document.getElementById("memPairs").textContent = st.done;
    if(st.done === st.total){
      B.answered = true; clearInterval(B.timer);
      hit(c, "¡Memoria completada!");
    }
  }else{
    /* par incorrecto: destello rojo breve y vuelven a estar boca-abajo. El
       estado se limpia al instante para que el siguiente clic funcione ya;
       la reversión visual se programa aparte sin tocar st.flipped. */
    memPaint(elI, "err"); memPaint(elJ, "err");
    sfx.miss();
    st.attempts--;
    st.flipped = [];
    document.getElementById("memAttempts").textContent = st.attempts;
    setTimeout(()=>{
      memPaint(elI, "back"); memPaint(elJ, "back");
    }, 700);
    if(st.attempts <= 0){
      B.answered = true; clearInterval(B.timer);
      missHit(c, "💔", "¡Sin intentos!", c.hint);
    }
  }
}

/* ---------- RENDER: AHORCADO (letras A-Z) ---------- */
const HANG_LIVES = 6;
function renderHangman(c){
  B.sub = B.sub || {};
  const word = c.word;
  const revealed = {};   /* letra -> true si fue adivinada */
  for(const ch of word) revealed[ch] = false;
  B.sub.hang = {
    c, word, revealed, lives:HANG_LIVES,
    picked:new Set(), guessed:new Set()
  };
  const cellsHTML = word.split("").map((ch,i)=>{
    const isSpace = ch === " ";
    return `<span class="hangcell ${isSpace?"hangspace":""}" id="hangw${i}">${isSpace?"&nbsp;":(revealed[ch]?ch:"")}</span>`;
  }).join("");
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const letterBtns = letters.map(L=>`<button class="hangletter" id="hangL${L}" onclick="hangPick('${L}')">${L}</button>`).join("");
  app.innerHTML = hudHTML() + `<div class="card screen">
    ${battleTopHTML()}
    <div class="qcard">
      ${qmetaHTML()}
      <div class="ch-head"><span class="ch-ico">💀</span> ${esc(c.title)}</div>
      <div class="ch-sub">${word.length} letras · ${HANG_LIVES} vidas</div>
      <div class="hangclue">💡 <b>${t("Pista:","Hint:")}</b> ${esc(HANG_CLUES[word] || c.hint || t("Adivina el término AWS","Guess the AWS term"))}</div>
      <div class="hangword" id="hangword">${cellsHTML}</div>
      <div class="hanglives" id="hanglives">${"❤️".repeat(HANG_LIVES)}</div>
      <div class="hanggrid">${letterBtns}</div>
      <div class="logline" id="log"></div>
      ${challengeControlsHTML(t("Adivina letras antes de quedarte sin vidas","Guess letters before you run out of lives"))}
    </div>
  </div>` + invHTML();
  startTurnTimer();
  refreshInventory();
}
function hangPick(L){
  if(B.answered) return;
  const st = B.sub.hang; if(!st) return;
  const c = st.c;
  if(st.picked.has(L)) return;
  st.picked.add(L);
  const btn = document.getElementById("hangL"+L);
  if(btn){ btn.disabled = true; }
  const inWord = c.word.includes(L);
  const livesEl = document.getElementById("hanglives");
  if(inWord){
    /* acierto: revelar todas las apariciones de la letra */
    st.guessed.add(L);
    for(let i=0;i<c.word.length;i++){
      if(c.word[i]===L){
        const cell = document.getElementById("hangw"+i);
        if(cell && !c.word[i].match(/\s/)) cell.textContent = L;
      }
    }
    if(btn){ btn.style.cssText = "background:var(--green) !important;color:#0b1729 !important;border-color:var(--green)"; }
    sfx.hit();
    /* victoria: ¿adivinó toda la palabra? */
    if(c.word.split("").every(ch => ch.match(/\s/) || st.guessed.has(ch))){
      B.answered = true; clearInterval(B.timer);
      hit(c, `¡${c.word}!`);
    }
  }else{
    /* fallo: pierde una vida */
    st.lives--;
    if(btn){ btn.style.cssText = "background:#ff5a5a !important;color:#fff !important;border-color:#ff5a5a !important"; }
    if(livesEl){ livesEl.textContent = "❤️".repeat(Math.max(0,st.lives)) + "🖤".repeat(Math.max(0,HANG_LIVES-st.lives)); }
    sfx.miss();
    shake();
    if(st.lives <= 0){
      B.answered = true; clearInterval(B.timer);
      missHit(c, "💀", `La palabra era ${c.word}`, c.hint);
    }
  }
}

/* ---------- RESPUESTA A PREGUNTA DE QUIZ ---------- */
/* Single-select: clic resuelve al instante. Multi-select: toggleOpt marca/desmarca
   y confirmAnswer compara el conjunto elegido con el conjunto correcto. */
function answer(i){
  if(B.answered) return;
  const c = B.qs[B.idx];
  if(!c){ finishBattle(true); return; }
  /* los retos no-quiz se resuelven con sus propios controles */
  if(!Array.isArray(c)) return;
  if(Array.isArray(c[2])){ toggleOpt(i); return; } /* multi: solo marca */
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

/* Marca/desmarca una opción en preguntas multi-select (no evalúa todavía). */
function toggleOpt(i){
  if(B.answered) return;
  const c = B.qs[B.idx];
  if(!Array.isArray(c) || !Array.isArray(c[2]) || !B.picked) return;
  if(B.picked.has(i)) B.picked.delete(i); else B.picked.add(i);
  const el = document.getElementById("opt"+i);
  const chk = document.getElementById("chk"+i);
  if(el) el.classList.toggle("picked", B.picked.has(i));
  if(chk) chk.textContent = B.picked.has(i) ? "☑" : "☐";
}

/* Evalúa una pregunta multi-select: debe coincidir el conjunto exacto. */
function confirmAnswer(){
  if(B.answered) return;
  const c = B.qs[B.idx];
  if(!Array.isArray(c) || !Array.isArray(c[2]) || !B.picked) return;
  if(B.picked.size === 0){ toast(t("Selecciona al menos una opción","Select at least one option")); return; }
  B.answered = true;
  clearInterval(B.timer);
  const correct = new Set(c[2]);
  const ok = B.picked.size === correct.size && [...B.picked].every(i=>correct.has(i));
  const els = document.querySelectorAll(".opt");
  els.forEach((el,j)=>{
    el.disabled = true;
    el.classList.remove("picked");
    if(correct.has(j)) el.classList.add("correct");
    else if(B.picked.has(j)) el.classList.add("wrong");
    else el.classList.add("dim");
    const chk = document.getElementById("chk"+j);
    if(chk) chk.textContent = correct.has(j) ? "✓" : (B.picked.has(j) ? "✗" : "");
  });
  const cb = document.getElementById("confirmBtn");
  if(cb) cb.disabled = true;
  if(ok) hit(c, c[3]);
  else missHit(c, "💔", "¡Golpe recibido!", c[3]);
  refreshInventory();
}

function onTimeout(){
  const c = B.qs[B.idx];
  if(!c){ finishBattle(true); return; }
  if(Array.isArray(c)){
    const correct = Array.isArray(c[2]) ? new Set(c[2]) : new Set([c[2]]);
    const els = document.querySelectorAll(".opt");
    els.forEach((el,j)=>{ el.disabled=true; el.classList.add(correct.has(j)?"correct":"dim"); });
  }
  B.answered = true; clearInterval(B.timer);
  missHit(c, "⏰", t("¡Se acabó el tiempo!","Time is up!"), c[3] || "");
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
  if((P.inv[id]||0) <= 0){ toast(t("No tienes ","You don't have ")+iname(it)); return; }
  if(!B.node){ toast(t("Solo usable durante un combate","Only usable during battle")); return; }
  if(B.answered){ toast(t("Espera a la próxima pregunta","Wait for the next question")); return; }
  if(B.itemLock){ return; }

  if(id==="potion"){
    if(B.lives >= B.maxLives){ toast(t("Ya tienes todas las vidas","You already have all your lives")); return; }
    P.inv.potion--; B.lives++;
    sfx.coin();
    const lb = document.getElementById("bLives"); if(lb) lb.innerHTML = hearts(B.lives);
    const pb = document.getElementById("php"); if(pb) pb.style.width = Math.round(B.lives/B.maxLives*100)+"%";
    toast(t("🧪 Recuperaste una vida","🧪 You recovered a life"));
  }
  if(id==="shield"){
    if(B.shieldOn){ toast(t("El escudo ya está activo","The shield is already active")); return; }
    P.inv.shield--; B.shieldOn = true;
    sfx.coin();
    toast(t("🛡️ Escudo activo: absorbe un error","🛡️ Shield active: absorbs one mistake"));
  }
  if(id==="oracle"){
    const c = B.qs[B.idx];
    if(!c || !Array.isArray(c)){ toast(t("🔮 El Oráculo solo actúa sobre preguntas","🔮 The Oracle only works on questions")); return; }
    P.inv.oracle--;
    removeTwoOptions();
    sfx.coin();
  }
  if(id==="scroll"){
    const c = B.qs[B.idx];
    if(!c || !Array.isArray(c)){ toast(t("📜 El Pergamino solo actúa sobre preguntas","📜 The Scroll only works on questions")); return; }
    P.inv.scroll--;
    const ok = document.getElementById("opt"+ (Array.isArray(c[2]) ? c[2][0] : c[2]));
    if(ok){
      ok.style.cssText = "background:#6BC853 !important;color:#0b1729 !important;border-color:#6BC853 !important";
      setTimeout(()=>{ ok.style.cssText = ""; }, 5000);
    }
    toast(t("📜 Respuesta revelada (5s)","📜 Answer revealed (5s)"));
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

    /* loot: elites y bosses siempre sueltan objetos (motivación para usar
       pociones); los enemigos tienen 34% de drop. El entrenamiento no reparte
       objetos para no romper la economía. */
    if(!free){
      if(n.t==="boss"){
        loot.push(pickItem()); loot.push(pickItem());   /* bosses: 2 drops garantizados */
      }else if(n.t==="elite"){
        loot.push(pickItem());                          /* elites: 1 drop garantizado */
      }else{
        if(Math.random() < 0.34) loot.push(pickItem());
      }
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
    setTimeout(()=>toast(t("❤️ Te han dejado 1 vida. Repón en la tienda.","❤️ You were left with 1 life. Restore it at the shop.")), 700);
  }

  /* devuelve los ítems usados a la cuenta */
  loot.forEach(it=>{ P.inv[it] = (P.inv[it]||0)+1; });
  save();

  const prevBest = prevRecord;

  app.innerHTML = hudHTML() + `<div class="card result screen">
    <div class="rc ${won?"":"lose"}">
      <div class="pct">${maxPct}%</div>
      <div class="lbl">${t(passed?"victoria":(won?"casi":"derrota"),passed?"victory":(won?"close":"defeat"))}</div>
    </div>
    <h2>${verdictTitle(maxPct, passed, n)}</h2>
    <div class="rank-line" style="color:${passed?"var(--orange-soft)":"var(--red)"}">${esc(n.s)} ${esc(n.name)}</div>
    ${!passed && won ? `<div class="best" style="margin-top:10px">${t("Necesitas al menos ","You need at least ")}${PASS_PCT}% ${t("para superar este nodo.","to clear this node.")}</div>`:""}
    ${passed && !newBest ? `<div class="best" style="margin-top:10px">${t("Récord de este nodo:","Record for this node:")} <b>${prevBest}%</b></div>`:""}
    ${newBest && passed ? `<div class="best" style="margin-top:10px;color:var(--gold)">🎉 ${t("¡Nuevo récord en este nodo!","New record for this node!")}</div>`:""}

    <div class="stats">
      <div class="sbox"><div class="n">${B.hits}/${B.emax}</div><div class="l">${t("Aciertos","Hits")}</div></div>
      <div class="sbox"><div class="n ${B.crits?"good":""}">${B.crits}</div><div class="l">${t("Críticos","Criticals")}</div></div>
      <div class="sbox"><div class="n">${B.bestCombo}</div><div class="l">${t("Combo máx","Max combo")}</div></div>
      <div class="sbox"><div class="n ${passed?"good":"bad"}">${free?Math.round(xp/3):(xp||0)}</div><div class="l">XP</div></div>
      <div class="sbox"><div class="n gold">${gold||0}</div><div class="l">${t("Oro","Gold")}</div></div>
    </div>

    ${loot.length?`<div class="loot">${loot.map(l=>{const li=ITEM_LIST.find(i=>i.id===l);return `<div class="li">${li.ico} ${iname(li)}</div>`}).join("")}</div>`:""}
    ${unlockedList.length?`<div class="unlocks">
      <div style="font-size:12px;font-weight:800;letter-spacing:1.4px;color:var(--soft);text-transform:uppercase">${t("Nodos desbloqueados","Unlocked nodes")}</div>
      ${unlockedList.map(o=>`<div class="unlock"><span class="u">${o.s}</span>${esc(o.name)} · Nv${o.tier} · ${realmOf(o.r).name}</div>`).join("")}
    </div>`:""}

    <div class="res-actions">
      ${free
        ? `<button class="btn btn-primary" onclick="startTraining()">🔁 ${t("Otro combate","Another battle")}</button>
           <button class="btn" onclick="openTraining()">🎯 ${t("Cambiar modo","Change mode")}</button>`
        : passed
          ? `<button class="btn btn-primary" onclick="openBrief('${n.id}')">🔁 ${t("Repetir","Repeat")}</button>
             <button class="btn" onclick="openMap()">🗺️ ${t("Mapa","Map")}</button>`
          : `<button class="btn btn-primary" onclick="startBattle('${n.id}')">⚔️ ${t("Reintentar","Retry")}</button>
             <button class="btn" onclick="openMap()">🗺️ ${t("Mapa","Map")}</button>
             ${P.lives<3?`<button class="btn" onclick="restLives()">🪙 ${t("Reponer vidas","Restore lives")} (60)</button>`:""}`}
      <button class="btn btn-ghost" onclick="screenTitle()">🏠 ${t("Inicio","Home")}</button>
    </div>
    ${free?`<div class="best" style="margin-top:16px">${t("El entrenamiento no consume vidas ni desbloquea nodos. Te llevas un tercio de la XP.","Training does not consume lives or unlock nodes. You earn one third of the XP.")}</div>`:""}
  </div>` + invHTML();
  refreshInventory();
  if(passed && unlockedList.length) toast("🗺️ "+unlockedList.length+" "+(unlockedList.length===1?t("nodo desbloqueado","node unlocked"):t("nodos desbloqueados","nodes unlocked")));
}
function verdictTitle(p, passed, n){
  if(passed && p===100) return t("👑 ¡PERFECCIÓN ABSOLUTA!","👑 ABSOLUTE PERFECTION!");
  if(passed) return t("🏆 ¡NODO SUPERADO!","🏆 NODE CLEARED!");
  if(p>=50) return t("💪 Casi lo tienes","💪 So close");
  if(p>=25) return t("😤 Duro de roer","😤 Tough to crack");
  return t("💀 Derrota aplastante","💀 Crushing defeat");
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
  classic:{n:()=>t("Combate clásico","Classic battle"),ico:"⚔️",badge:()=>t("2 vidas · 20 s","2 lives · 20 s"),p:()=>t("2 vidas y 20 segundos por golpe, sin límite de nodos. Gana un tercio de la XP.","2 lives and 20 seconds per hit, no node limit. Earn one third of the XP.")},
  blitz:{n:()=>t("Asalto rápido","Blitz"),ico:"⚡",badge:()=>t("2 vidas · 15 s","2 lives · 15 s"),p:()=>t("Solo 15 segundos por pregunta y 2 vidas. Máxima presión.","Only 15 seconds per question and 2 lives. Maximum pressure.")},
  drill:{n:()=>t("Simulacro","Drill"),ico:"🎯",badge:()=>t("sin daño · 30 s","no damage · 30 s"),p:()=>t("Sin pérdida de vidas y 30 segundos por golpe. Ideal para memorizar antes de un boss.","No lost lives and 30 seconds per hit. Ideal for memorizing before a boss.")}
};
let T = {mode:"classic", realm:"__all", lives:2, perQ:20, noDamage:false};

function openTraining(){
  app.innerHTML = hudHTML() + `<div class="card screen">
    <div class="map-head"><h2>🎯 ${t("Entrenamiento libre","Free training")}</h2></div>
    <div class="modes">
      ${Object.entries(TRAIN_MODES).map(([k,m])=>`
        <button class="mode" onclick="T.mode='${k}';openTraining()">
          <span class="badge">${typeof m.badge==="function"?m.badge():m.badge}</span>
          <div class="ico">${m.ico}</div>
          <h3 style="color:${T.mode===k?"var(--orange)":"#fff"}">${typeof m.n==="function"?m.n():m.n}</h3>
          <p>${typeof m.p==="function"?m.p():m.p}</p>
        </button>`).join("")}
    </div>
    <div style="margin-top:22px">
      <div style="font-size:12px;font-weight:800;letter-spacing:1.4px;color:var(--soft);text-transform:uppercase;margin-bottom:10px">${t("Reino","Realm")}</div>
      <div class="topics" style="justify-content:flex-start">
        <button class="tchip ${T.realm==="__all"?"on":""}" onclick="T.realm='__all';openTraining()">${t("Todos","All")}</button>
        ${REALMS.map(r=>`<button class="tchip ${T.realm===r.id?"on":""}" onclick="T.realm='${r.id}';openTraining()">${r.sprite} ${esc(r.name)}</button>`).join("")}
      </div>
    </div>
    <div style="margin-top:24px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
      <button class="btn btn-primary" onclick="startTraining()">⚔️ ${t("Comenzar combate","Start battle")}</button>
      <button class="btn btn-ghost" onclick="openMap()">← ${t("Mapa","Map")}</button>
      <button class="btn btn-ghost" onclick="screenTitle()">🏠 ${t("Inicio","Home")}</button>
    </div>
  </div>` + invHTML();
  refreshInventory();
}
function startTraining(){
  const rid = T.realm;
  const pool = rid==="__all"
    ? NODES.flatMap(n=>allQuestionsFor(n))
    : nodesOfRealm(rid).flatMap(n=>allQuestionsFor(n));
  if(!pool.length){ toast(t("No hay preguntas en ese reino","No questions in that realm")); return; }

  const mode = TRAIN_MODES[T.mode];
  const picks = shuffle(pool).slice(0, Math.min(15, pool.length));
  /* nodo sintético con las preguntas ya elegidas, para que startBattle lo trate igual */
  const fake = {
    id:"__train", r: rid==="__all" ? "fnd" : rid, s:"🎯", t:"enemy",
    name:t("Simulacro","Drill")+" · "+(typeof mode.n==="function"?mode.n():mode.n),
    lore:t("Entrenamiento libre: sin progresión, sin perder progreso.","Free training: no progression, no lost progress."),
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
    <div class="mhead"><div class="mi">🛒</div><div><h3>${t("Tienda de objetos","Item shop")}</h3>
      <div style="font-size:13px;color:var(--muted)">${t("Salen de los combates. Tu oro actual:","Dropped from battles. Your current gold:")} <b style="color:var(--gold)">🪙 ${P.gold}</b></div></div></div>
    <div class="shopgrid">
      ${ITEM_LIST.map(it=>`
        <div class="item">
          <div class="ic">${it.ico}</div>
          <b>${esc(typeof it.name==="function"?it.name():it.name)}</b>
          <p>${esc(typeof it.desc==="function"?it.desc():it.desc)}</p>
          <div class="pr">
            <span class="price">🪙 ${it.price}</span>
            <span style="font-size:12px;color:var(--muted);font-weight:700">${t("Tienes","You have")} ${P.inv[it.id]||0}</span>
          </div>
          <button class="btn btn-sm btn-primary" onclick="buy('${it.id}')"
            ${P.gold<it.price?"disabled":""}>${t("Comprar","Buy")}</button>
        </div>`).join("")}
      <div class="item">
        <div class="ic">❤️</div>
        <b>${t("Reponer vidas","Restore lives")}</b>
        <p>${t("Recupera tus vidas al máximo de 3 para volver al mapa.","Restore your lives to the max of 3 to return to the map.")}</p>
        <div class="pr"><span class="price">🪙 60</span>
          <span style="font-size:12px;color:var(--muted);font-weight:700">${t("Tienes","You have")} ${P.lives}</span></div>
        <button class="btn btn-sm btn-primary" onclick="restLives()" ${P.lives>=3?"disabled":""}>${t("Comprar","Buy")}</button>
      </div>
    </div>
    <div style="display:flex;gap:12px;justify-content:center;margin-top:22px">
      <button class="btn btn-primary" onclick="openShop()">🔄 ${t("Actualizar","Refresh")}</button>
      <button class="btn btn-ghost" onclick="openMap()">← ${t("Mapa","Map")}</button>
      <button class="btn btn-ghost" onclick="screenTitle()">🏠 Inicio</button>
    </div>
  </div>` + invHTML();
  refreshInventory();
}
function buy(id){
  const it = ITEM_LIST.find(i=>i.id===id);
  if(P.gold < it.price){ toast(t("Oro insuficiente","Not enough gold")); return; }
  P.gold -= it.price;
  P.inv[id] = (P.inv[id]||0)+1;
  sfx.coin(); save(); openShop(); refreshInventory();
}
function restLives(){
  if(P.lives>=3){ toast(t("Ya tienes 3 vidas","You already have 3 lives")); return; }
  if(P.gold<60){
    if(P.lives < 1){ P.lives = 1; save(); toast(t("❤️ Al menos 1 vida","❤️ At least 1 life")); refreshInventory(); openMap(); }
    else toast(t("Necesitas 60 de oro (tienes ","You need 60 gold (you have ")+P.gold+")");
    return;
  }
  P.gold -= 60; P.lives = 3;
  sfx.coin(); save(); toast(t("❤️ Vidas repuestas","❤️ Lives restored"));
  openMap();
  refreshInventory();
}

/* ---------- BESTIARIO ---------- */
function openBestiary(){
  app.innerHTML = hudHTML() + `<div class="card screen">
    <div class="mhead"><div class="mi">📖</div><div><h3>${t("Bestiario de AWS","AWS Bestiary")}</h3>
      <div style="font-size:13px;color:var(--muted)">${P.stats.kills} ${t("enemigos derrotados","enemies defeated")} · ${P.stats.bosses} ${t("bosses","bosses")}</div></div></div>
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
          ${done?`<div class="bscore">${pct(n.id)}%</div>`:`<button class="btn btn-sm" onclick="openBrief('${n.id}')">${t("Ver","View")}</button>`}
        </div>`;
      }).join("")}
    </div>
    <div style="display:flex;gap:12px;justify-content:center;margin-top:22px">
      <button class="btn btn-primary" onclick="openBestiary()">🔄 ${t("Actualizar","Refresh")}</button>
      <button class="btn btn-ghost" onclick="screenTitle()">🏠 ${t("Inicio","Home")}</button>
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
    <div class="mhead"><div class="mi">🧾</div><div><h3>${t("Registro de trucos","Cheat sheet")}</h3>
      <div style="font-size:13px;color:var(--muted)">${t("Progreso global:","Overall progress:")} <b style="color:var(--orange)">${totalPct()}%</b> · ${rank().cur.ico} ${rank().cur.name}</div></div></div>
    <div class="unlocks">${realms}</div>
    <div style="display:flex;gap:12px;justify-content:center;margin-top:22px">
      <button class="btn btn-primary" onclick="openMap()">🗺️ ${t("Mapa","Map")}</button>
      <button class="btn btn-ghost" onclick="screenTitle()">🏠 ${t("Inicio","Home")}</button>
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
