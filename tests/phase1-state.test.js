/* Dependency-free Phase 1 regression test.
   Run from the repository root with: node tests/phase1-state.test.js */
const assert = require("assert");
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
vm.runInContext(fs.readFileSync(path.join(repositoryRoot, "data.js"), "utf8"), context);
vm.runInContext(fs.readFileSync(path.join(repositoryRoot, "state.js"), "utf8"), context);

const config = context.window.CREEKSIDE_CONFIG;
const stateEngine = context.window.CreeksideState;
const forbiddenFragmentKeys = ["digit", "value", "answer", "code"];

assert.strictEqual(config.chapters.length, 7, "Phase 1 must contain seven chapters");
assert.strictEqual(config.codeFragments.length, 4, "Phase 1 must contain four symbolic fragment slots");
config.codeFragments.forEach((fragment) => {
  forbiddenFragmentKeys.forEach((key) => {
    assert.strictEqual(Object.prototype.hasOwnProperty.call(fragment, key), false, `Fragment config must not contain ${key}`);
  });
  assert.strictEqual(typeof fragment.displaySymbol, "string");
  assert.strictEqual(/[0-9]/.test(fragment.displaySymbol), false, "Fragment symbols must not contain keypad digits");
});

let state = stateEngine.initialState();
assert.strictEqual(state.mewUnlocked, false, "Mew must begin locked");
state = stateEngine.reducer(state, { type: "START_ONBOARDING" });
state = stateEngine.reducer(state, {
  type: "SET_TRAINER",
  name: "Luca",
  avatarId: config.avatars[0].id,
});

let resumeState = stateEngine.reducer(state, { type: "OPEN_CURRENT_CHAPTER" });
resumeState = stateEngine.reducer(resumeState, { type: "ADVANCE_SCENE" });
assert.strictEqual(resumeState.currentSceneIndex, 1);
resumeState = stateEngine.reducer(resumeState, { type: "BACK_TO_MAP" });
resumeState = stateEngine.reducer(resumeState, { type: "OPEN_CURRENT_CHAPTER" });
assert.strictEqual(resumeState.currentSceneIndex, 1, "Returning from the map must resume the current scene");

config.chapters.forEach((chapter, chapterIndex) => {
  assert.strictEqual(state.currentChapterId, chapter.id, `Chapter ${chapter.number} should unlock in order`);
  if (chapterIndex < config.chapters.length - 1) {
    assert.strictEqual(state.mewUnlocked, false, "Mew must remain locked before the Champion finale");
  }

  state = stateEngine.reducer(state, { type: "OPEN_CURRENT_CHAPTER" });
  chapter.scenes.forEach((scene) => {
    if (scene.type === "physical-challenge") {
      const sceneIndexBeforeTap = state.currentSceneIndex;
      state = stateEngine.reducer(state, { type: "ADVANCE_SCENE" });
      assert.strictEqual(state.currentSceneIndex, sceneIndexBeforeTap, "A normal advance must not complete a physical challenge");
      state = stateEngine.reducer(state, { type: "COMPLETE_PHYSICAL" });
    } else {
      state = stateEngine.reducer(state, { type: "ADVANCE_SCENE" });
    }
  });
});

assert.strictEqual(state.completedChapters.length, 7);
assert.deepStrictEqual(Array.from(state.collectedFragments), [1, 2, 3, 4]);
assert.strictEqual(state.mewUnlocked, true, "Champion completion must unlock Mew");
assert.strictEqual(state.mewComplete, false);

state = stateEngine.reducer(state, { type: "OPEN_MEW" });
config.epilogue.scenes.forEach((scene) => {
  state = stateEngine.reducer(state, {
    type: scene.type === "physical-challenge" ? "COMPLETE_PHYSICAL" : "ADVANCE_SCENE",
  });
});

assert.strictEqual(state.mewComplete, true);
assert.strictEqual(state.view, "celebration");
assert.strictEqual(state.earnedRewards.length, Object.keys(config.rewards).length);

assert.strictEqual(stateEngine.writeState(state), true);
const restored = stateEngine.readState();
assert.strictEqual(restored.mewComplete, true, "Valid saved progress must restore");
assert.strictEqual(restored.completedChapters.length, 7);

memory.set(config.storageKey, "{corrupted");
const recovered = stateEngine.readState();
assert.strictEqual(recovered.view, "splash", "Corrupted storage must recover to the beginning");
assert.strictEqual(recovered.completedChapters.length, 0);

console.log("Phase 1 state tests passed.");
