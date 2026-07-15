/* ==========================================================================
   app.js — Luca's Trainer Journey scavenger-hunt game engine.
   Vanilla JS, no build step. Data comes from window.HUNT_CONFIG (config.js).
   Progress persists in the URL hash so a refresh keeps you where you were
   (no localStorage dependency — see brief §9 behavior notes).
   ========================================================================== */

import * as art from "./art.js";

const CFG = window.HUNT_CONFIG;
const stops = CFG.stops;
const TYPE_LABEL = { grass:"Grass", fire:"Fire", water:"Water", electric:"Electric", psychic:"Psychic", normal:"Normal" };

/* ---- State (restored from URL hash) ----------------------------------- */
const state = {
  screen: "splash",
  name: "",
  avatar: CFG.avatars[0].key,
  current: 0,           // index of the active stop
  earned: 0,            // how many badges cleared
  justEarned: -1,       // index that should play the snap-in animation
};

function saveState() {
  const p = new URLSearchParams();
  if (state.name) p.set("n", state.name);
  p.set("a", state.avatar);
  p.set("e", String(state.earned));
  p.set("c", String(state.current));
  p.set("s", state.screen);
  location.hash = p.toString();
}
function restoreState() {
  const p = new URLSearchParams(location.hash.slice(1));
  if (p.get("n")) {
    state.name = p.get("n");
    state.avatar = p.get("a") || state.avatar;
    state.earned = Math.min(Number(p.get("e")) || 0, stops.length);
    state.current = Math.min(Number(p.get("c")) || 0, stops.length - 1);
    state.screen = p.get("s") || "map";
    if (state.earned >= stops.length) state.screen = "finale";
  }
}

/* ---- Tiny DOM helpers -------------------------------------------------- */
const $ = (sel, root = document) => root.querySelector(sel);
function h(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}
function heroArt(key, size) {
  switch (key) {
    case "tropius": return art.tropius(size);
    case "megaX":   return art.megaHero("var(--mewtwo-x)", size);
    case "megaY":   return art.megaHero("var(--mewtwo-y)", size);
    case "spark":   return `<div style="width:${size||120}px;height:${size||120}px">${art.spark()}</div>`;
    case "ball":    return art.pokeball(size || 120);
    case "leaf":    return art.leaf(size || 120);
    default:        return art.tropius(size);
  }
}

/* ---- Header + progress dots ------------------------------------------- */
function renderHeader() {
  const header = $("#app-header");
  const started = !!state.name;
  const dots = stops.map((_, i) => {
    const cls = i < state.earned ? "done" : (i === state.current && started ? "active" : "");
    return `<span class="dot ${cls}"></span>`;
  }).join("");
  header.innerHTML = `
    <button class="wordmark" id="wordmark" aria-label="Go to quest map">
      ${art.spark()}<span>Trainer <em>Journey</em></span>
    </button>
    ${started ? `<span class="progress-dots" aria-label="Progress: ${state.earned} of ${stops.length}">${dots}</span>` : ""}
  `;
  const wm = $("#wordmark", header);
  wm.addEventListener("click", () => go(state.name ? (state.earned >= stops.length ? "finale" : "map") : "splash"));
}

/* ---- Router ----------------------------------------------------------- */
function go(screen) {
  state.screen = screen;
  saveState();
  render();
}
function render() {
  renderHeader();
  const root = $("#app-screen");
  root.innerHTML = "";
  (SCREENS[state.screen] || SCREENS.splash)(root);
  root.focus?.();
  window.scrollTo(0, 0);
}

/* ==========================================================================
   SCREENS
   ========================================================================== */
const SCREENS = {};

/* 1 — Splash / Welcome */
SCREENS.splash = (root) => {
  root.append(h(`
    <div class="screen center stack">
      <div class="card">
        <div class="card__hero">${art.tropius(168)}</div>
        <h1 class="display">${CFG.party.title.replace("Journey","<em>Journey</em>")}</h1>
        <p class="lead">${CFG.party.name}, your journey to become a great Pokémon Trainer begins now. Clear every stop, win every challenge, and claim your Trainer title!</p>
        <div class="btn-row">
          <button class="btn btn--primary btn--game" id="begin">Begin your journey →</button>
        </div>
      </div>
      <p class="footer-note label">${CFG.party.name} · ${CFG.party.age} · ${CFG.party.year}</p>
    </div>
  `));
  $("#begin", root).addEventListener("click", () => go(state.name ? "map" : "onboard"));
};

/* 2 — Become a Trainer (onboarding) */
SCREENS.onboard = (root) => {
  const opts = CFG.avatars.map(a => `
    <button type="button" class="avatar-opt" data-key="${a.key}" aria-pressed="${a.key === state.avatar}">
      ${heroArt(a.key, 56)}<span>${a.label}</span>
    </button>`).join("");
  const view = h(`
    <div class="screen stack">
      <div class="card">
        <div class="card__top"><h2 class="card__name">Become a Trainer</h2><span class="card__meta">Step 1</span></div>
        <div class="field">
          <label for="tname">What's your Trainer name?</label>
          <input type="text" id="tname" maxlength="20" autocomplete="off" placeholder="Type your name" value="${state.name}">
        </div>
        <p class="label">Choose your partner</p>
        <div class="avatar-grid" id="avatars">${opts}</div>
        <div class="btn-row">
          <button class="btn btn--primary btn--game" id="make" disabled>Create my Trainer Card</button>
        </div>
      </div>
    </div>
  `);
  root.append(view);
  const input = $("#tname", root);
  const makeBtn = $("#make", root);
  const sync = () => { makeBtn.disabled = input.value.trim().length === 0; };
  input.addEventListener("input", sync); sync();
  $("#avatars", root).addEventListener("click", (e) => {
    const b = e.target.closest(".avatar-opt"); if (!b) return;
    state.avatar = b.dataset.key;
    view.querySelectorAll(".avatar-opt").forEach(x => x.setAttribute("aria-pressed", x === b));
  });
  makeBtn.addEventListener("click", () => {
    state.name = input.value.trim();
    state.current = 0; state.earned = 0;
    go("trainer");
  });
};

/* 2b — Trainer Card reveal */
SCREENS.trainer = (root) => {
  root.append(h(`
    <div class="screen stack">
      <div class="card trainer-card">
        <div class="card__top"><h2 class="card__name">${state.name}</h2><span class="card__meta">Trainer Card</span></div>
        <div class="card__hero">${heroArt(state.avatar, 168)}</div>
        <div class="trainer-stats">
          <div class="stat"><b>${state.earned}</b><span>Badges</span></div>
          <div class="stat"><b>${stops.length}</b><span>Stops</span></div>
          <div class="stat"><b>${CFG.party.age}</b><span>Level</span></div>
        </div>
        <div class="card__footer"><span>${CFG.party.name} · ${CFG.party.age} · ${CFG.party.year}</span>${art.pokeball(18)}</div>
      </div>
      <div class="btn-row">
        <button class="btn btn--primary btn--game" id="toMap">Start the hunt →</button>
      </div>
    </div>
  `));
  $("#toMap", root).addEventListener("click", () => go("map"));
};

/* 3 — Quest Map / Badge Trail */
SCREENS.map = (root) => {
  const slots = stops.map((s, i) => {
    const earned = i < state.earned;
    const active = i === state.current;
    const locked = i > state.current;
    const gem = earned ? art.gemFilled(typeColor(s.type)) : art.gemEmpty();
    const cls = [earned ? "" : "", active ? "is-active" : "", (state.justEarned === i) ? "just-earned" : ""].join(" ");
    return `<button class="badge-slot ${cls}" data-i="${i}" ${locked ? "disabled" : ""}
              aria-label="Stop ${s.number}: ${s.name}${earned ? " (cleared)" : active ? " (current)" : " (locked)"}">
              ${gem}<span class="num">${s.number}</span>
            </button>`;
  }).join("");
  state.justEarned = -1;
  root.append(h(`
    <div class="screen stack">
      <div class="card">
        <div class="card__top"><h2 class="card__name">Quest Map</h2><span class="card__meta">Stop ${Math.min(state.current+1, stops.length)} of ${stops.length}</span></div>
        <p class="card__body">Tap your glowing badge to take on the next challenge, Trainer!</p>
        <div class="badge-trail">${slots}</div>
      </div>
      <div class="btn-row">
        <button class="btn btn--primary btn--game" id="continue">Go to Stop ${stops[state.current].number} →</button>
      </div>
    </div>
  `));
  $("#continue", root).addEventListener("click", () => go("clue"));
  root.querySelectorAll(".badge-slot").forEach(b => b.addEventListener("click", () => {
    const i = Number(b.dataset.i);
    if (i <= state.current) { state.current = i; go("clue"); }
  }));
};

/* 4 — Clue screen */
SCREENS.clue = (root) => {
  const s = stops[state.current];
  root.append(h(`
    <div class="screen stack">
      <div class="card">
        <div class="card__top">
          <h2 class="card__name">${s.name}</h2>
          <span class="card__meta">Stop ${zero(s.number)} · ${TYPE_LABEL[s.type] || s.type}</span>
        </div>
        <div class="card__hero">${art.burst(typeColor(s.type))}</div>
        <p class="card__body" style="font-size:var(--fs-h3)">${s.clueText}</p>
        <details class="hint">
          <summary>${art.leaf(18)} Need a little help? Here's a clue.</summary>
          <p>${s.hintText}</p>
        </details>
        <div class="card__footer"><span>${TYPE_LABEL[s.type] || s.type} Trial</span>${art.pokeball(18)}</div>
      </div>
      <div class="btn-row">
        <button class="btn btn--primary btn--game" id="start">I found it — start the challenge!</button>
        <button class="btn btn--ghost" id="back">← Back to map</button>
      </div>
    </div>
  `));
  $("#start", root).addEventListener("click", () => go("activity"));
  $("#back", root).addEventListener("click", () => go("map"));
};

/* 5 — Activity / Challenge shell + mini-games */
SCREENS.activity = (root) => {
  const s = stops[state.current];
  const shell = h(`
    <div class="screen stack">
      <div class="card">
        <div class="card__top">
          <h2 class="card__name">Challenge!</h2>
          <span class="card__meta">Stop ${zero(s.number)}</span>
        </div>
        <div class="chip" data-type="${s.type}" style="margin-bottom:var(--sp-3)"><span class="chip-dot"></span>${TYPE_LABEL[s.type] || s.type} Type</div>
        <p class="card__body" style="font-weight:700">${s.activity.prompt}</p>
        <div class="game-area" id="game"></div>
      </div>
    </div>
  `);
  root.append(shell);
  const mount = $("#game", shell);
  const games = { quiz, "shadow-guess": shadowGuess, "type-match": typeMatch, "catch-tap": catchTap };
  (games[s.activity.type] || quiz)(mount, s.activity, onWin, onRetry);
};

function onWin() {
  const wasLast = state.current + 1 >= stops.length;
  if (state.current + 1 > state.earned) state.earned = state.current + 1;
  state.justEarned = state.current;
  go("cleared");
}
function onRetry(mount, activity) {
  mount.innerHTML = `
    <div class="feedback feedback--retry">
      ${art.burst("var(--danger)")}
      <p class="display">So close!</p>
      <p class="lead">Give it another try, Trainer.</p>
      <button class="btn btn--secondary btn--game" id="again">Try again</button>
    </div>`;
  $("#again", mount).addEventListener("click", () => go("activity"));
}

/* 6 — Stop cleared → Gift unlock */
SCREENS.cleared = (root) => {
  const s = stops[state.current];
  const wasLast = state.earned >= stops.length;
  root.append(h(`
    <div class="screen stack center">
      <div class="feedback feedback--success">${art.burst("var(--tropius-leaf)")}<p class="display">You caught it! <em>Badge earned!</em> 🌟</p></div>
      <div class="card card--gift">
        <div class="card__top"><h2 class="card__name">Gift unlocked!</h2><span class="card__meta">Reward</span></div>
        <div class="card__hero">${art.gemFilled(typeColor(s.type))}</div>
        <p class="card__body" style="font-size:var(--fs-h3)">Challenge cleared! Your gift is waiting…</p>
        <p class="card__body" style="font-weight:800;color:var(--tropius-leaf-deep)">${s.giftLocationText}</p>
      </div>
      <div class="btn-row">
        <button class="btn btn--primary btn--game" id="next">${wasLast ? "See your Champion title →" : "Next clue →"}</button>
      </div>
    </div>
  `));
  $("#next", root).addEventListener("click", () => {
    if (wasLast) return go("finale");
    state.current = Math.min(state.current + 1, stops.length - 1);
    go("map");
  });
};

/* 7 — Finale / Champion */
SCREENS.finale = (root) => {
  root.append(h(`
    <div class="screen stack center">
      <div class="card card--champion">
        <div class="card__top"><h2 class="card__name">Champion ${state.name}!</h2><span class="card__meta">★ Champion</span></div>
        <div class="card__hero">${heroArt(state.avatar, 168)}</div>
        <div class="trainer-stats">
          <div class="stat"><b>${state.earned}</b><span>Badges</span></div>
          <div class="stat"><b>★</b><span>Champion</span></div>
          <div class="stat"><b>${CFG.party.age}</b><span>Today!</span></div>
        </div>
        <p class="card__body" style="font-size:var(--fs-h3);margin-top:var(--sp-4)">You're officially a Champion.<br><strong>Happy Birthday, ${CFG.party.name}!</strong></p>
        <div class="card__footer"><span>${CFG.party.name} · ${CFG.party.age} · ${CFG.party.year}</span>${art.pokeball(18)}</div>
      </div>
      <div class="btn-row">
        <button class="btn btn--ghost" id="replay">Play again</button>
      </div>
    </div>
  `));
  confetti();
  $("#replay", root).addEventListener("click", () => { state.current = 0; state.earned = 0; go("map"); });
};

/* ==========================================================================
   MINI-GAMES  — each: (mount, activity, onWin, onRetry)
   ========================================================================== */
function bigCheck(label = "Check answer") {
  return `<button class="btn btn--primary btn--game" id="check" disabled style="margin-top:var(--sp-4)">${label}</button>`;
}

function quiz(mount, a, win, retry) {
  let picked = -1;
  mount.innerHTML = `<div class="choice-grid" id="opts">
    ${a.options.map((o,i)=>`<button class="choice" data-i="${i}">${o}</button>`).join("")}
  </div>${bigCheck()}`;
  const check = $("#check", mount);
  $("#opts", mount).addEventListener("click", (e) => {
    const b = e.target.closest(".choice"); if (!b) return;
    picked = Number(b.dataset.i);
    mount.querySelectorAll(".choice").forEach(c => c.style.borderColor = "");
    b.style.borderColor = "var(--mewtwo-x)";
    check.disabled = false;
  });
  check.addEventListener("click", () => {
    picked === a.answerIndex ? win() : retry(mount, a);
  });
}

function typeMatch(mount, a, win, retry) {
  mount.innerHTML = `
    <div class="card__hero" style="margin:0">${heroArt(a.art, 120)}</div>
    <div class="choice-grid" id="opts">
      ${a.options.map(t=>`<button class="choice" data-t="${t}"><span class="chip" data-type="${t}"><span class="chip-dot"></span>${TYPE_LABEL[t]||t}</span></button>`).join("")}
    </div>`;
  $("#opts", mount).addEventListener("click", (e) => {
    const b = e.target.closest(".choice"); if (!b) return;
    if (b.dataset.t === a.answer) { b.classList.add("correct"); setTimeout(win, 450); }
    else { b.classList.add("wrong"); setTimeout(() => retry(mount, a), 500); }
  });
}

function shadowGuess(mount, a, win, retry) {
  mount.innerHTML = `
    <div class="card__hero" style="margin:0"><div class="shadow-silhouette">${heroArt(a.art, 140)}</div></div>
    <div class="choice-grid" id="opts">
      ${a.options.map(k=>`<button class="choice" data-k="${k}">${heroArt(k, 72)}</button>`).join("")}
    </div>`;
  $("#opts", mount).addEventListener("click", (e) => {
    const b = e.target.closest(".choice"); if (!b) return;
    if (b.dataset.k === a.art) {
      b.classList.add("correct");
      mount.querySelector(".shadow-silhouette").classList.remove("shadow-silhouette");
      setTimeout(win, 600);
    } else { b.classList.add("wrong"); setTimeout(() => retry(mount, a), 500); }
  });
}

function catchTap(mount, a, win, retry) {
  const target = a.target || 6;
  const seconds = a.seconds || 15;
  let caught = 0, timeLeft = seconds, timer, spawnT;
  mount.innerHTML = `
    <div class="catch-score" id="score">Caught 0 / ${target} · ⏱ ${timeLeft}s</div>
    <div class="catch-arena" id="arena" aria-label="Tap the Poké Balls"></div>`;
  const arena = $("#arena", mount), score = $("#score", mount);
  const update = () => score.textContent = `Caught ${caught} / ${target} · ⏱ ${timeLeft}s`;

  function spawn() {
    const b = document.createElement("button");
    b.className = "catch-target";
    b.innerHTML = art.pokeball(64);
    b.setAttribute("aria-label", "Catch");
    const max = arena.clientWidth - 64;
    b.style.left = Math.max(0, Math.floor(seededPos() * max)) + "px";
    b.style.top = Math.max(0, Math.floor(seededPos() * (arena.clientHeight - 64))) + "px";
    b.addEventListener("click", () => {
      caught++; b.remove(); update();
      if (caught >= target) finish(true);
    });
    arena.append(b);
    setTimeout(() => b.remove(), 1100);
  }
  function finish(won) {
    clearInterval(timer); clearInterval(spawnT); arena.innerHTML = "";
    won ? win() : retry(mount, a);
  }
  spawnT = setInterval(spawn, 620); spawn();
  timer = setInterval(() => {
    timeLeft--; update();
    if (timeLeft <= 0) finish(caught >= target);
  }, 1000);
}

/* Position source that avoids Math.random dependency issues in some sandboxes */
let _seed = 7;
function seededPos() { _seed = (_seed * 1103515245 + 12345) & 0x7fffffff; return (_seed % 1000) / 1000; }

/* ==========================================================================
   Helpers
   ========================================================================== */
function typeColor(t) {
  return ({ grass:"var(--type-grass)", fire:"var(--type-fire)", water:"var(--type-water)",
    electric:"var(--type-electric)", psychic:"var(--type-psychic)", normal:"var(--type-normal)" })[t] || "var(--mewtwo-x)";
}
function zero(n) { return String(n).padStart(2, "0") + "·" + String(stops.length).padStart(2,"0"); }

/* Lightweight confetti for the finale (respects reduced motion) */
function confetti() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const c = document.createElement("canvas");
  c.id = "confetti"; document.body.append(c);
  const ctx = c.getContext("2d");
  const resize = () => { c.width = innerWidth; c.height = innerHeight; };
  resize(); addEventListener("resize", resize);
  const colors = ["#8A4FFF","#3BA55D","#F7C948","#4FB0E5","#D9B650"];
  const bits = Array.from({length: 120}, (_, i) => ({
    x: (i * 53) % innerWidth, y: -20 - (i * 17) % 400,
    vy: 2 + (i % 5), vx: ((i % 7) - 3) * .6,
    s: 6 + (i % 6), c: colors[i % colors.length], r: (i % 360)
  }));
  let frames = 0;
  (function loop() {
    ctx.clearRect(0, 0, c.width, c.height);
    bits.forEach(b => {
      b.y += b.vy; b.x += b.vx; b.r += 4;
      if (b.y > c.height + 20) b.y = -20;
      ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.r * Math.PI / 180);
      ctx.fillStyle = b.c; ctx.fillRect(-b.s/2, -b.s/2, b.s, b.s); ctx.restore();
    });
    if (++frames < 300) requestAnimationFrame(loop); else c.remove();
  })();
}

/* ---- Boot ------------------------------------------------------------- */
restoreState();
render();
