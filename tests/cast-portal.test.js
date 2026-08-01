const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const castRoot = path.join(root, "cast");
const coreSource = fs.readFileSync(path.join(root, "cast-core.js"), "utf8");
const dataSource = fs.readFileSync(path.join(castRoot, "cast-data.js"), "utf8");
const rendererSource = fs.readFileSync(path.join(castRoot, "cast.js"), "utf8");
const dataContext = { window: {} };
vm.runInNewContext(coreSource, dataContext, { filename: "cast-core.js" });
vm.runInNewContext(dataSource, dataContext, { filename: "cast-data.js" });

const portal = dataContext.window.CAST_PORTAL;
const slugs = ["oak-lab", "nurse-joy", "team-rocket", "league-recruiter", "nina", "champion"];
const requiredGuideFields = [
  "title",
  "eyebrow",
  "subtitle",
  "arrival",
  "ready",
  "duration",
  "character",
  "firstLine",
  "whatLucaDoes",
  "gift",
  "finalLine",
  "yourPart",
  "before",
  "arrivalLines",
  "sayAndDo",
  "successLines",
  "successInstruction",
  "backup",
  "optionalPlay",
];
const expectedSections = [
  "Your Part",
  "Before Luca Arrives",
  "When Luca Arrives",
  "What to Say and Do",
  "When Luca Succeeds",
  "Easy Backup Plan",
  "Optional Ways to Play Up the Part",
];
const beforeWordCounts = {
  "oak-lab": 538,
  "nurse-joy": 396,
  "team-rocket": 416,
  "league-recruiter": 548,
  champion: 535,
};
const wordTargets = {
  "oak-lab": [0, 600],
  "nurse-joy": [250, 400],
  "team-rocket": [250, 400],
  "league-recruiter": [0, 500],
  nina: [200, 350],
  champion: [0, 650],
};

function words(value) {
  if (typeof value === "string") return (value.match(/[A-Za-zÀ-ÖØ-öø-ÿ0-9’-]+/g) || []).length;
  if (Array.isArray(value)) return value.reduce((total, item) => total + words(item), 0);
  if (value && typeof value === "object") {
    return Object.values(value).reduce((total, item) => total + words(item), 0);
  }
  return 0;
}

function renderPage(page) {
  const app = { innerHTML: "" };
  const context = {
    window: {},
    navigator: {},
    document: {
      title: "",
      body: {
        getAttribute(name) {
          if (name === "data-cast-page") return page;
          if (name === "data-root") return "../..";
          return null;
        },
      },
      getElementById() {
        return app;
      },
      addEventListener() {},
    },
  };
  vm.createContext(context);
  vm.runInContext(coreSource, context, { filename: "cast-core.js" });
  vm.runInContext(dataSource, context, { filename: "cast-data.js" });
  vm.runInContext(rendererSource, context, { filename: "cast.js" });
  return { html: app.innerHTML, title: context.document.title };
}

assert(portal, "Cast Portal data should load");
assert(portal.reassurance.includes("do not need to know Pokémon"));
assert(portal.reassurance.includes("memorize lines"));
assert(portal.reassurance.includes("Patrick will bring the supplies"));
assert(portal.reassurance.includes("play along and have fun"));
assert.deepStrictEqual(
  Object.keys(portal.guides).sort(),
  slugs.slice().sort(),
  "All six friendly participant guides should be registered"
);

const routeFiles = [
  path.join(castRoot, "index.html"),
  path.join(castRoot, "director", "index.html"),
  ...slugs.map((slug) => path.join(castRoot, slug, "index.html")),
];

for (const routeFile of routeFiles) {
  assert(fs.existsSync(routeFile), `Missing static route: ${routeFile}`);
  const html = fs.readFileSync(routeFile, "utf8");
  assert(html.includes('class="cast-page'), `${routeFile} must use the isolated cast shell`);
  assert(html.includes('name="robots" content="noindex, nofollow"'), `${routeFile} should discourage indexing`);
  assert(html.includes("cast-data.js"), `${routeFile} must load the shared cast data`);
  assert(html.includes("cast-core.js"), `${routeFile} must load the shared runtime cue source`);
  assert(html.includes("cast.js"), `${routeFile} must load the shared portal renderer`);
}

for (const slug of slugs) {
  const guide = portal.guides[slug];
  for (const field of requiredGuideFields) {
    assert(guide[field], `${slug} is missing ${field}`);
    if (Array.isArray(guide[field])) assert(guide[field].length > 0, `${slug}.${field} must not be empty`);
  }

  const count = words(guide);
  const [minimum, maximum] = wordTargets[slug];
  assert(count >= minimum, `${slug} is too short at ${count} role-specific words`);
  assert(count <= maximum, `${slug} is too long at ${count} role-specific words`);

  const rendered = renderPage(slug).html;
  expectedSections.forEach((section) => {
    assert(rendered.includes(`<h2>${section}</h2>`), `${slug} is missing ${section}`);
  });
  assert.strictEqual(
    (rendered.match(/class="participant-section /g) || []).length,
    guide.secondAppearance ? 8 : 7,
    `${slug} must use only the seven approved sections plus an optional second appearance`
  );
  assert(rendered.includes("You can’t mess this up."));
  assert(rendered.includes("You can read this word for word, say it in your own way, or improvise."));
  assert(rendered.includes("You do not need a costume."));
  assert(rendered.includes("Wait for Patrick’s signal."));
  assert(rendered.includes("What Luca does"));
  assert(rendered.includes("What you hand Luca"));
  assert(rendered.includes("Your final line"));
  assert(rendered.includes("Patrick’s detailed setup notes"));
  assert(!rendered.includes("data-acknowledgment"));
  assert(!rendered.includes("Live relay cue alignment"));
  assert(!rendered.includes("Exact package IDs"));
  assert(!rendered.includes("Booster Satchel"));
  assert(!rendered.includes("Parent Mode"));
  assert(!/required costume|must wear|must memorize|required to memorize/i.test(rendered));
}

const oakText = JSON.stringify(portal.guides["oak-lab"]);
assert(oakText.includes("equal Partner Professors"));
assert(oakText.includes("Professor Oak and Professor Monica"));
assert(!/assistant|supporting professor|Bruce’s helper/i.test(oakText));

const ninaText = JSON.stringify(portal.guides.nina);
assert(ninaText.includes("participation never affect"));
assert(ninaText.includes("without Nina"));

assert(portal.director, "Director data is required");
assert.strictEqual(portal.director.timeline.length, 10);
portal.director.timeline.forEach((item) => assert(item.phoneCaptain, `${item.segment} needs a Phone Captain`));
assert(portal.director.packages.length >= 10);
assert(portal.director.globalOperations.some((item) => item.includes("Booster Satchel")));
assert(portal.director.globalOperations.some((item) => item.includes("Phone Captain")));
assert(portal.director.globalOperations.some((item) => item.includes("Water Safety Adult")));
assert(portal.director.globalOperations.some((item) => item.includes("Ranger Vault information")));
assert.ok(portal.director.operations.length >= slugs.length);
portal.director.operations.forEach((operation) => {
  assert(operation.setup.length);
  assert(operation.safety);
  assert(operation.fallback);
  assert(operation.decisions.length);
  assert.strictEqual(operation.runtimeCues.length, operation.cueIds.length);
  operation.runtimeCues.forEach((cue) => assert(cue.phoneCaptain));
});

const overview = renderPage("overview").html;
slugs.forEach((slug) => assert(overview.includes(`href="${slug}/"`), `Overview should link to ${slug}/`));
assert(overview.includes('href="director/"'));
assert(!overview.includes("Run of show"));
assert(!overview.includes("Exact package IDs"));

const director = renderPage("director").html;
assert(director.includes("Patrick owns the logistics"));
assert(director.includes("Run of show"));
assert(director.includes("Exact package IDs"));
assert(director.includes("Runtime cue alignment"));
assert(director.includes("Phone Captain"));
assert(director.includes("Water Safety Adult"));
assert(director.includes("Safety owner"));
assert(director.includes("Patrick to decide"));

assert(rendererSource.includes("Print / Save as PDF"), "Print control is required");
assert(rendererSource.includes("data-copy-link"), "Copy-link control is required");
assert(rendererSource.includes("window.print()"), "Print control must call the browser print function");
assert(!rendererSource.includes("data-acknowledgment"), "Participant acknowledgment must be removed");

const css = fs.readFileSync(path.join(castRoot, "cast.css"), "utf8");
assert(css.includes("@media print"), "Print stylesheet is required");
assert(css.includes("@page"), "Printed page sizing is required");
assert(css.includes(".participant-footer,"), "Print CSS should remove the Director link");
assert(css.includes(".cast-nav,"), "Print CSS should remove navigation chrome");
assert(css.includes("@media (max-width: 420px)"), "Small-phone layout is required");
assert(css.includes("min-height: 48px"), "Primary controls need mobile-sized touch targets");

const playerFiles = ["index.html", "screens.jsx", "components.jsx", "creekside-content.js", "state.js"];
for (const file of playerFiles) {
  const source = fs.readFileSync(path.join(root, file), "utf8");
  assert(!/href\s*=\s*["'][^"']*\/?cast\//i.test(source), `${file} must not link to the Cast Portal`);
  assert(!source.includes("Cast Portal"), `${file} must not expose the Cast Portal in player copy`);
}

const castFiles = [
  path.join(castRoot, "cast-data.js"),
  path.join(castRoot, "cast.js"),
  path.join(castRoot, "cast.css"),
  ...routeFiles,
];
const combined = castFiles.map((file) => fs.readFileSync(file, "utf8")).join("\n");
assert(!/\b\d{3}[-.\s]\d{3}[-.\s]\d{4}\b/.test(combined), "Phone-number-like text must not appear");
assert(!/\b\d{1,5}\s+[A-Z][a-z]+\s+(Street|St|Avenue|Ave|Road|Rd|Drive|Dr|Lane|Ln|Court|Ct)\b/.test(combined), "Street addresses must not appear");
/* Cast guides are adult-facing and may carry the combination, but they are
   printed and left around, so keep the guide CONTENT free of it by convention.
   Checked against the guide data rather than `combined`, which also holds the
   renderer and its unrelated numeric literals. */
assert(!/\b\d{4}\b/.test(dataSource.replace(/\b(?:19|20)\d{2}\b/g, "")), "Printed cast guide content should not carry a four-digit run");

console.log("Simplified Cast Portal regression checks passed.");
console.log("Before word counts:", beforeWordCounts);
console.log("After role-specific word counts:", Object.fromEntries(
  slugs.map((slug) => [slug, words(portal.guides[slug])])
));
