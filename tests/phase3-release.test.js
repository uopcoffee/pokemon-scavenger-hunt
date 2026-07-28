/* Dependency-free Phase 3 release audit.
   Run from the repository root with: node tests/phase3-release.test.js */
const assert = require("assert");
const childProcess = require("child_process");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const repositoryRoot = path.resolve(__dirname, "..");
const memory = new Map();
const context = {
  window: {
    localStorage: {
      getItem(key) {
        return memory.has(key) ? memory.get(key) : null;
      },
      setItem(key, value) {
        memory.set(key, value);
      },
      removeItem(key) {
        memory.delete(key);
      },
    },
  },
  Array,
  Date,
  JSON,
  Math,
  Number,
  Object,
  Set,
};

vm.createContext(context);
["data.js", "cast-core.js", "creekside-content.js", "state.js"].forEach((file) => {
  vm.runInContext(fs.readFileSync(path.join(repositoryRoot, file), "utf8"), context);
});

const config = context.window.CREEKSIDE_CONFIG;
const stateEngine = context.window.CreeksideState;
const guide = fs.readFileSync(
  path.join(repositoryRoot, "docs/11_PHASE3_PARTY_REHEARSAL_AND_RELEASE.md"),
  "utf8"
);
const styles = fs.readFileSync(path.join(repositoryRoot, "styles.css"), "utf8");
const components = fs.readFileSync(path.join(repositoryRoot, "components.jsx"), "utf8");
const screens = fs.readFileSync(path.join(repositoryRoot, "screens.jsx"), "utf8");

// Persistence snapshots must round-trip from every chapter, checkpoint, and Mew.
config.chapters.forEach((chapter) => {
  const snapshot = stateEngine.reducer(stateEngine.initialState(), {
    type: "PARENT_JUMP_CHAPTER",
    chapterId: chapter.id,
  });
  assert.strictEqual(stateEngine.writeState(snapshot), true);
  const restored = stateEngine.readState();
  assert.strictEqual(restored.currentChapterId, chapter.id);
  assert.strictEqual(restored.view, "scene");
});

let checkpoint = stateEngine.reducer(stateEngine.initialState(), {
  type: "PARENT_JUMP_CHECKPOINT",
  sceneIndex: 2,
});
stateEngine.writeState(checkpoint);
checkpoint = stateEngine.readState();
assert.strictEqual(checkpoint.activeFlow, "checkpoint");
assert.strictEqual(checkpoint.currentSceneIndex, 2);

let mew = stateEngine.reducer(stateEngine.initialState(), {
  type: "PARENT_JUMP_MEW",
  sceneIndex: 3,
});
stateEngine.writeState(mew);
mew = stateEngine.readState();
assert.strictEqual(mew.activeFlow, "mew");
assert.strictEqual(mew.mewUnlocked, true);
assert.strictEqual(mew.currentSceneIndex, 3);

memory.set(config.storageKey, "not-json");
assert.strictEqual(stateEngine.readState().view, "splash");
assert.strictEqual(memory.has(config.storageKey), false);

const resetSource = stateEngine.reducer(stateEngine.initialState(), {
  type: "PARENT_JUMP_CHAPTER",
  chapterId: config.chapters[4].id,
});
stateEngine.writeState(resetSource);
const reset = stateEngine.reducer(resetSource, { type: "RESET" });
assert.strictEqual(reset.view, "splash");
assert.strictEqual(reset.completedChapters.length, 0);
assert.strictEqual(memory.has(config.storageKey), false);

// Reward registry and package documentation.
const assignments = [];
[...config.chapters, config.checkpoint, config.epilogue].forEach((sequence) => {
  sequence.scenes.forEach((scene) => assignments.push(...(scene.rewardIds || [])));
});
assert.strictEqual(assignments.length, Object.keys(config.rewards).length);
assert.strictEqual(new Set(assignments).size, assignments.length);
Object.entries(config.rewards).forEach(([rewardId, reward]) => {
  assert.ok(assignments.includes(rewardId), `${rewardId} must be assigned`);
  assert.ok(guide.includes(`| ${reward.packageId} |`), `${reward.packageId} must have an operating row`);
});

// Rehearsal guide coverage.
[
  "Auntie Ariel", "Nina", "Bruce", "Monica", "Polly", "Mike", "Patrick",
  "Fairy Garden Rescue", "Professor Oak pool research mission",
  "Nurse Joy challenge", "Team Rocket basketball mission",
  "Secret Ranger Vault", "Professor Oak return checkpoint",
  "Victory Road", "Champion battle", "Mew epilogue",
  "Popsicle and booster celebration",
].forEach((requiredText) => {
  assert.ok(guide.includes(requiredText), `Guide must include ${requiredText}`);
});
["Easier fallback", "No-prop fallback", "Duration", "Adult", "Props", "Safety"].forEach((field) => {
  assert.ok(guide.includes(field), `Challenge cards must include ${field}`);
});

// Accessibility and offline resilience markers.
assert.match(styles, /prefers-reduced-motion:\s*reduce/);
assert.match(styles, /button:focus-visible/);
assert.match(styles, /--screen-pad:\s*14px/);
assert.doesNotMatch(styles, /@import\s+url/);
assert.match(components, /minHeight:\s*"48px"/);
assert.match(components, /Release early to cancel/);
assert.match(screens, /role="dialog"/);
assert.match(screens, /event\.key === "Escape"/);
assert.match(screens, /event\.key === "Tab"/);
assert.match(screens, /role="status"/);

// JSX must parse with the exact vendored Babel used by the browser.
const babelContext = {};
babelContext.self = babelContext;
babelContext.window = babelContext;
vm.createContext(babelContext);
vm.runInContext(
  fs.readFileSync(path.join(repositoryRoot, "vendor/babel.min.js"), "utf8"),
  babelContext
);
const compiledBrowserScripts = ["components.jsx", "minigames.jsx", "screens.jsx"].map((file) => {
  return babelContext.Babel.transform(
    fs.readFileSync(path.join(repositoryRoot, file), "utf8"),
    { presets: ["react"] }
  ).code;
});
const browserScriptContext = {
  window: {
    LUCA_CONFIG: { artBase: "assets/pokemon/" },
  },
};
vm.createContext(browserScriptContext);
compiledBrowserScripts.forEach((compiledSource, index) => {
  vm.runInContext(compiledSource, browserScriptContext, {
    filename: ["components.jsx", "minigames.jsx", "screens.jsx"][index],
  });
});
assert.strictEqual(typeof browserScriptContext.window.MiniGame, "function");
assert.strictEqual(typeof browserScriptContext.window.TrainerApp, "function");

// Tracked-file privacy scan. Symbolic fragment slot numbers are permitted;
// numbered household addresses and common secret assignments are not.
const trackedFiles = childProcess.execFileSync("git", ["ls-files"], {
  cwd: repositoryRoot,
  encoding: "utf8",
}).trim().split("\n").filter(Boolean);
[
  "docs/11_PHASE3_PARTY_REHEARSAL_AND_RELEASE.md",
  "docs/12_PHASE3_VERIFICATION_REPORT.md",
  "tests/phase3-release.test.js",
].forEach((file) => {
  if (!trackedFiles.includes(file)) trackedFiles.push(file);
});
const textExtensions = new Set([".css", ".html", ".js", ".jsx", ".md", ".svg", ".txt"]);
trackedFiles.forEach((file) => {
  if (!textExtensions.has(path.extname(file))) return;
  const text = fs.readFileSync(path.join(repositoryRoot, file), "utf8");
  assert.doesNotMatch(text, /\b\d+\s+Creekside(?:\s+Ct)?\b/i, `${file} contains a numbered household address`);
  assert.doesNotMatch(text, /\b(?:api[_-]?key|password|passwd|access[_-]?token)\s*[:=]\s*["'][^"']+["']/i, `${file} contains a secret-like assignment`);
  assert.doesNotMatch(text, /\b\d{3}[-. )]\d{3}[-.]\d{4}\b/, `${file} contains a phone-number-like value`);
});

config.codeFragments.forEach((fragment) => {
  assert.strictEqual(/[0-9]/.test(fragment.displaySymbol), false);
  ["digit", "value", "answer", "code"].forEach((key) => {
    assert.strictEqual(Object.prototype.hasOwnProperty.call(fragment, key), false);
  });
});

console.log("Phase 3 release tests passed.");
