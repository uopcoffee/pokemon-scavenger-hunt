/* Dependency-free Logistics Update 4 validation.
   Run from the repository root with: node tests/v3-mew-surprise.test.js */
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const memory = new Map();
const context = {
  window: {
    localStorage: {
      getItem(key) { return memory.has(key) ? memory.get(key) : null; },
      setItem(key, value) { memory.set(key, value); },
      removeItem(key) { memory.delete(key); },
    },
  },
  Array, Date, JSON, Math, Number, Object, Set,
};
vm.createContext(context);
["data.js", "cast-core.js", "creekside-content.js", "state.js", "cast/cast-data.js"].forEach((file) => {
  vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context);
});

const config = context.window.CREEKSIDE_CONFIG;
const engine = context.window.CreeksideState;
const cues = context.window.CREEKSIDE_CAST_CORES;
const portal = context.window.CAST_PORTAL;
const finale = config.chapters[config.chapters.length - 1];
const finalIndex = finale.scenes.findIndex((scene) => scene.type === "champion-final");

assert.strictEqual(config.release, "3.5");
assert.ok(finalIndex >= 0);
assert.strictEqual(finale.scenes[finalIndex].title, "Champion Luca");
assert.strictEqual(finale.scenes[finalIndex].body, "Creekside Region Journey Complete");
assert.doesNotMatch(JSON.stringify(finale.scenes), /remain near|final processing|countdown|Unknown Signal|Postgame Event/i);

let ending = engine.initialState();
ending = {
  ...ending,
  view: "scene",
  activeFlow: "chapter",
  currentChapterId: finale.id,
  currentSceneIndex: finalIndex,
  currentSceneId: finale.scenes[finalIndex].id,
  completedChapters: config.chapters.map((chapter) => chapter.id),
  fakeCreditsComplete: true,
  championEndingComplete: true,
};

const ordinaryTap = engine.reducer(ending, { type: "ADVANCE_SCENE" });
assert.strictEqual(ordinaryTap.currentSceneId, finale.scenes[finalIndex].id);
assert.strictEqual(ordinaryTap.mewUnlocked, false);

const premature = engine.reducer(engine.initialState(), { type: "PARENT_TRIGGER_MEW" });
assert.strictEqual(premature.mewUnlocked, false);

const triggered = engine.reducer(ending, { type: "PARENT_TRIGGER_MEW" });
assert.strictEqual(triggered.mewUnlocked, true);
assert.strictEqual(triggered.activeFlow, "mew");
assert.strictEqual(triggered.currentSceneId, config.epilogue.scenes[0].id);
assert.strictEqual(engine.writeState(triggered), true);
assert.strictEqual(engine.readState().currentSceneId, config.epilogue.scenes[0].id);
assert.strictEqual(engine.readState().mewUnlocked, true);

const rearmed = engine.reducer(triggered, { type: "PARENT_REARM_MEW" });
assert.strictEqual(rearmed.currentSceneId, finale.scenes[finalIndex].id);
assert.strictEqual(rearmed.mewUnlocked, false);

let completedMew = {
  ...triggered,
  view: "celebration",
  mewComplete: true,
};
completedMew = engine.reducer(completedMew, { type: "REPLAY_HALL" });
assert.strictEqual(completedMew.currentSceneId, "hall-of-heroes");
while (completedMew.currentSceneId !== finale.scenes[finalIndex].id) {
  completedMew = engine.reducer(completedMew, { type: "ADVANCE_SCENE" });
}
assert.strictEqual(completedMew.mewUnlocked, true, "Hall replay must not hide a completed Mew event");
assert.strictEqual(completedMew.mewComplete, true);

assert.match(cues.mew.phoneCaptain, /Polly or Auntie Ariel when Patrick guides/);
assert.match(cues.mew.phoneCaptain, /Patrick when another adult guides/);
assert.match(cues.mew.runtimeSteps.join(" "), /three visible pink-energy markers/);
assert.match(cues.mew.rewardPreparation, /separate from the Champion Chest/);

assert.ok(portal.director.phoneProtocol.before.some((line) => /battery pack/i.test(line)));
assert.ok(portal.director.phoneProtocol.before.some((line) => /Auto-Lock/i.test(line)));
assert.ok(portal.director.phoneProtocol.before.some((line) => /Mew trigger/i.test(line)));
assert.ok(portal.director.phoneProtocol.during.some((line) => /Water Safety Adult never operates/i.test(line)));
assert.ok(portal.director.phoneProtocol.recovery.some((line) => /Mew triggered too early/i.test(line)));
assert.ok(portal.director.phoneProtocol.recovery.some((line) => /Internet unavailable/i.test(line)));

const screens = fs.readFileSync(path.join(root, "screens.jsx"), "utf8");
assert.match(screens, /Trigger Mew Signal/);
assert.match(screens, /Confirm Mew Signal/);
assert.match(screens, />Cancel</);
assert.match(screens, /!isChampionFinal/);
assert.match(screens, /Replay Hall of Heroes/);
assert.doesNotMatch(screens, /PARENT_UNLOCK_MEW/);

const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");
assert.match(styles, /prefers-reduced-motion/);
assert.strictEqual(config.settings.soundEnabled, false);

const tracked = [screens, fs.readFileSync(path.join(root, "state.js"), "utf8"), fs.readFileSync(path.join(root, "cast/cast-data.js"), "utf8")].join("\n");
assert.doesNotMatch(tracked, /\b(?:code|digit|pin|keypad)\s*[:=]\s*["']?\d{4}\b/i);

console.log("V3.5 adult-triggered Mew surprise tests passed.");
