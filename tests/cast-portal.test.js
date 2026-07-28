const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const castRoot = path.join(root, "cast");
const coreSource = fs.readFileSync(path.join(root, "cast-core.js"), "utf8");
const dataSource = fs.readFileSync(path.join(castRoot, "cast-data.js"), "utf8");
const context = { window: {} };
vm.runInNewContext(coreSource, context, { filename: "cast-core.js" });
vm.runInNewContext(dataSource, context, { filename: "cast-data.js" });

const portal = context.window.CAST_PORTAL;
const slugs = ["oak-lab", "nurse-joy", "team-rocket", "league-recruiter", "champion"];
const requiredGuideFields = [
  "title",
  "eyebrow",
  "participants",
  "duration",
  "arrival",
  "mainJob",
  "lucaKnows",
  "entranceCue",
  "script",
  "challenge",
  "success",
  "rewardPackages",
  "rewardHandoff",
  "transition",
  "checklist",
  "fallback",
  "emergency",
  "doNotReveal",
  "placeholders"
];

assert(portal, "Cast portal data should load");
assert.strictEqual(
  portal.acknowledgment,
  "I understand my cue, challenge, reward, and handoff.",
  "Acknowledgment copy must match the approved wording"
);
assert.deepStrictEqual(
  Object.keys(portal.guides).sort(),
  slugs.slice().sort(),
  "Exactly the five requested participant guides should be registered"
);

const routeFiles = [
  path.join(castRoot, "index.html"),
  ...slugs.map((slug) => path.join(castRoot, slug, "index.html"))
];

for (const routeFile of routeFiles) {
  assert(fs.existsSync(routeFile), `Missing static route: ${routeFile}`);
  const html = fs.readFileSync(routeFile, "utf8");
  assert(html.includes('class="cast-page"'), `${routeFile} must use the isolated cast shell`);
  assert(html.includes('name="robots" content="noindex, nofollow"'), `${routeFile} should discourage indexing`);
  assert(html.includes("cast-data.js"), `${routeFile} must load the shared cast data`);
  assert(html.includes("cast-core.js"), `${routeFile} must load the shared runtime cue source`);
  assert(html.includes("cast.js"), `${routeFile} must load the shared portal renderer`);
}

for (const slug of slugs) {
  const guide = portal.guides[slug];
  for (const field of requiredGuideFields) {
    assert(guide[field], `${slug} is missing ${field}`);
    if (Array.isArray(guide[field])) {
      assert(guide[field].length > 0, `${slug}.${field} must not be empty`);
    }
  }
  assert(guide.runtimeCues.length > 0, `${slug} must reference at least one shared runtime cue`);
}

assert(portal.timeline.length >= 10, "Overview must contain the complete event timeline");
for (const item of portal.timeline) {
  for (const field of ["time", "window", "segment", "cast", "handoff", "reward", "responsible"]) {
    assert(item[field], `Timeline item ${item.segment || "(unknown)"} is missing ${field}`);
  }
  if (item.href) {
    assert(
      fs.existsSync(path.join(castRoot, item.href, "index.html")),
      `Timeline href does not resolve: ${item.href}`
    );
  }
}

const overviewData = fs.readFileSync(path.join(castRoot, "cast-data.js"), "utf8");
for (const slug of slugs) {
  assert(overviewData.includes(`href: "${slug}/"`), `Overview should link to ${slug}/`);
}

const renderer = fs.readFileSync(path.join(castRoot, "cast.js"), "utf8");
assert(renderer.includes("Adult Cast Guide — Do Not Show Luca"), "Participant warning label is required");
assert(renderer.includes("One-minute Quick Card"), "Quick Card is required at the top");
assert(renderer.includes("Print / Save as PDF"), "Print control is required");
assert(renderer.includes("data-copy-link"), "Copy-link control is required");
assert(renderer.includes("data-acknowledgment"), "Acknowledgment checkbox is required");
assert(renderer.includes("window.print()"), "Print control must call the browser print function");

const css = fs.readFileSync(path.join(castRoot, "cast.css"), "utf8");
assert(css.includes("@media print"), "Print stylesheet is required");
assert(css.includes("@page"), "Printed page sizing is required");
assert(css.includes(".cast-nav,"), "Print CSS should remove navigation chrome");
assert(css.includes("@media (max-width: 420px)"), "Small-phone layout is required");
assert(css.includes("min-height: 48px"), "Primary controls need mobile-sized touch targets");

const playerFiles = ["index.html", "screens.jsx", "components.jsx", "creekside-content.js", "state.js"];
for (const file of playerFiles) {
  const source = fs.readFileSync(path.join(root, file), "utf8");
  assert(!/href\s*=\s*["'][^"']*\/?cast\//i.test(source), `${file} must not link to the Cast Portal`);
  assert(!source.includes("Cast Portal"), `${file} must not expose the Cast Portal in player copy`);
}

const castFiles = [path.join(castRoot, "cast-data.js"), path.join(castRoot, "cast.js"), path.join(castRoot, "cast.css"), ...routeFiles];
const combined = castFiles.map((file) => fs.readFileSync(file, "utf8")).join("\n");
assert(!/\b\d{3}[-.\s]\d{3}[-.\s]\d{4}\b/.test(combined), "Phone-number-like text must not appear");
assert(!/\b\d{1,5}\s+[A-Z][a-z]+\s+(Street|St|Avenue|Ave|Road|Rd|Drive|Dr|Lane|Ln|Court|Ct)\b/.test(combined), "Street addresses must not appear");
assert(!/\b(code|digit|pin|password)\s*[:=]\s*["']?\d{4}\b/i.test(combined), "A four-digit secret assignment must not appear");
assert(!/\b(digit|value|answer)\s*:/.test(dataSource), "Cast data must not encode code-fragment values");

console.log("Cast Portal regression checks passed.");
