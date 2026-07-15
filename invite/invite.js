/* ==========================================================================
   invite.js — Name → image invitation generator (design brief §10).
   Type a guest's name, pick a size, download a PNG ready to text.
   Everything draws on <canvas> so there are no external image assets.
   ========================================================================== */

const CFG = window.HUNT_CONFIG || {}; // config.js is optional here
const PARTY = (CFG.party) || { name: "Luca", age: 7, year: 2026, title: "Luca's Trainer Journey" };

/* Editable party details for the caption / details block */
const DETAILS = {
  date: "Saturday, [DATE]",
  time: "[TIME]",
  place: "[PLACE]",
  rsvp: "RSVP to [PHONE]",
};

const C = {
  paper:"#FBFCFA", ink:"#1B2430", inkSoft:"#54606E",
  x:"#8A4FFF", y:"#4B3A8F", glow:"#B892FF",
  leaf:"#3BA55D", banana:"#F7C948", silver:"#C7CDD4", steel:"#8B95A1",
};

const cv = document.getElementById("cv");
const ctx = cv.getContext("2d");
const nameInput = document.getElementById("name");
const caption = document.getElementById("caption");
let size = "portrait";

const SIZES = { portrait: [1080, 1350], square: [1080, 1080] };

function draw() {
  const [w, hgt] = SIZES[size];
  cv.width = w; cv.height = hgt;
  const name = (nameInput.value.trim() || "Trainer");

  // background — warm white (§3.4 print rule: white ground)
  ctx.fillStyle = C.paper; ctx.fillRect(0, 0, w, hgt);

  // faint diagonal holo sliver (very low opacity, §6)
  const holo = ctx.createLinearGradient(0, 0, w, hgt);
  holo.addColorStop(0, "rgba(184,146,255,0.06)");
  holo.addColorStop(0.5, "rgba(79,176,229,0.05)");
  holo.addColorStop(1, "rgba(59,165,93,0.06)");
  ctx.fillStyle = holo; ctx.fillRect(0, 0, w, hgt);

  // foil-silver keyline frame (§7.1)
  const m = 60;
  const foil = ctx.createLinearGradient(m, m, w - m, hgt - m);
  foil.addColorStop(0, C.silver); foil.addColorStop(0.45, "#FFFFFF"); foil.addColorStop(1, C.steel);
  ctx.strokeStyle = foil; ctx.lineWidth = 10;
  roundRect(m, m, w - m * 2, hgt - m * 2, 40); ctx.stroke();

  // mega energy burst behind the mascot (§6)
  const cx = w / 2, burstY = hgt * (size === "square" ? 0.34 : 0.30);
  const burst = ctx.createRadialGradient(cx, burstY, 10, cx, burstY, w * 0.42);
  burst.addColorStop(0, "rgba(184,146,255,0.55)");
  burst.addColorStop(1, "rgba(184,146,255,0)");
  ctx.fillStyle = burst; ctx.fillRect(0, 0, w, hgt);

  drawTropius(cx, burstY, w * 0.24);

  // meta label (mono caps)
  ctx.fillStyle = C.inkSoft;
  ctx.font = "500 26px 'Space Grotesk', monospace";
  ctx.textAlign = "center";
  ctx.fillText("YOU'RE INVITED · " + String(PARTY.year), cx, hgt * (size === "square" ? 0.52 : 0.50));

  // hero headline: "[NAME], you're invited to Luca's Trainer Journey!"
  const headTop = hgt * (size === "square" ? 0.57 : 0.55);
  ctx.textAlign = "center";
  // the invitee name is the hero, in mega-x violet, heavy italic (auto-shrink long names)
  let nameSize = 120;
  ctx.font = `900 italic ${nameSize}px 'Montserrat', sans-serif`;
  while (ctx.measureText(name + "!").width > w - 200 && nameSize > 48) {
    nameSize -= 4; ctx.font = `900 italic ${nameSize}px 'Montserrat', sans-serif`;
  }
  ctx.fillStyle = C.x;
  ctx.fillText(name + "!", cx, headTop);

  ctx.fillStyle = C.ink;
  ctx.font = "700 40px 'Nunito Sans', sans-serif";
  wrap(`You're invited to`, cx, headTop + 64, w - 220, 48);
  ctx.font = "900 italic 46px 'Montserrat', sans-serif";
  ctx.fillStyle = C.leaf;
  wrap(PARTY.title + "!", cx, headTop + 120, w - 200, 54);

  // details block (mono labels)
  const dTop = hgt * (size === "square" ? 0.80 : 0.78);
  ctx.font = "500 30px 'Space Grotesk', monospace";
  ctx.fillStyle = C.inkSoft;
  const lines = [
    `${DETAILS.date}  ·  ${DETAILS.time}`,
    `${DETAILS.place}`,
    `Wear your trainer gear!  ·  ${DETAILS.rsvp}`,
  ];
  lines.forEach((l, i) => ctx.fillText(l, cx, dTop + i * 44));

  // footer set-name strip
  ctx.font = "500 24px 'Space Grotesk', monospace";
  ctx.fillStyle = C.steel;
  ctx.fillText(`${PARTY.name.toUpperCase()} · ${PARTY.age} · ${PARTY.year}`, cx, hgt - m - 30);

  updateCaption(name);
}

/* Original stylized Tropius drawn directly on canvas */
function drawTropius(cx, cy, r) {
  ctx.save(); ctx.translate(cx, cy);
  // body
  ctx.fillStyle = C.leaf;
  ellipse(0, r * 0.35, r * 1.1, r * 0.9);
  // neck + head
  ctx.beginPath();
  ctx.moveTo(r * 0.5, -r * 0.1);
  ctx.quadraticCurveTo(r * 1.1, -r * 0.9, r * 0.9, -r * 1.3);
  ctx.quadraticCurveTo(r * 0.4, -r * 1.0, r * 0.2, -r * 0.2);
  ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.arc(r * 0.95, -r * 1.35, r * 0.32, 0, 7); ctx.fill();
  ctx.fillStyle = C.ink;
  ctx.beginPath(); ctx.arc(r * 1.05, -r * 1.4, r * 0.07, 0, 7); ctx.fill();
  // leaf wings
  ctx.fillStyle = "#1E7A43";
  wing(-r * 1.0, -r * 0.1, -r * 1.9, -r * 0.5);
  wing(r * 1.0, r * 0.1, r * 1.9, -r * 0.2);
  // banana cluster
  ctx.fillStyle = C.banana; ctx.strokeStyle = "#C9A66B"; ctx.lineWidth = 3;
  for (let i = -1; i <= 1; i++) {
    ctx.beginPath();
    ctx.moveTo(i * r * 0.28, r * 0.9);
    ctx.quadraticCurveTo(i * r * 0.28 - r * 0.14, r * 1.25, i * r * 0.28, r * 1.35);
    ctx.quadraticCurveTo(i * r * 0.28 + r * 0.16, r * 1.15, i * r * 0.28, r * 0.9);
    ctx.closePath(); ctx.fill(); ctx.stroke();
  }
  ctx.restore();
}
function wing(x1, y1, x2, y2) {
  ctx.beginPath(); ctx.moveTo(x1, y1);
  ctx.quadraticCurveTo((x1 + x2) / 2, y2 - 40, x2, y2);
  ctx.quadraticCurveTo((x1 + x2) / 2, y1 + 30, x1, y1);
  ctx.closePath(); ctx.fill();
}
function ellipse(x, y, rx, ry) { ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, 7); ctx.fill(); }

function roundRect(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
function wrap(text, x, y, maxW, lh) {
  const words = text.split(" "); let line = "", yy = y;
  for (const wd of words) {
    if (ctx.measureText(line + wd + " ").width > maxW && line) { ctx.fillText(line.trim(), x, yy); line = ""; yy += lh; }
    line += wd + " ";
  }
  ctx.fillText(line.trim(), x, yy);
}
function updateCaption(name) {
  caption.value =
`🎉 ${name}, you're invited to ${PARTY.title}! 🎉
A Pokémon-themed adventure for ${PARTY.name}'s ${PARTY.age}th birthday.
🗓 ${DETAILS.date} at ${DETAILS.time}
📍 ${DETAILS.place}
👕 Wear your trainer gear! ${DETAILS.rsvp}`;
}

/* ---- Events ----------------------------------------------------------- */
nameInput.addEventListener("input", draw);
document.querySelectorAll("[data-size]").forEach(b => b.addEventListener("click", () => {
  size = b.dataset.size;
  document.querySelectorAll("[data-size]").forEach(x => x.setAttribute("aria-pressed", x === b));
  draw();
}));
document.getElementById("download").addEventListener("click", () => {
  const name = (nameInput.value.trim() || "Trainer").replace(/[^a-z0-9]+/gi, "-");
  const a = document.createElement("a");
  a.download = `invite-${name}-${size}.png`;
  a.href = cv.toDataURL("image/png");
  a.click();
});

/* Fonts may load a beat after first paint — redraw when ready */
if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);
draw();
