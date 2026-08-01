/* Dependency-free Creekside state-engine regression test.
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
vm.runInContext(fs.readFileSync(path.join(repositoryRoot, "cast-core.js"), "utf8"), context);
vm.runInContext(fs.readFileSync(path.join(repositoryRoot, "creekside-content.js"), "utf8"), context);
vm.runInContext(fs.readFileSync(path.join(repositoryRoot, "state.js"), "utf8"), context);

const config = context.window.CREEKSIDE_CONFIG;
const stateEngine = context.window.CreeksideState;
/* `digit` is expected now — the digits are printed on the fragment props. */
const forbiddenFragmentKeys = ["value", "answer", "code"];
/* Paper-cast contract: the only scene types that resist an ordinary tap are the
   physical-challenge legacy type and the cast-handoff, whose hold now means
   "the real-world mission is finished". The cast-cue type no longer exists. */
const HOLD_GATED_TYPES = ["physical-challenge", "cast-handoff"];

assert.strictEqual(config.chapters.length, 7, "Creekside must contain seven chapters");
assert.strictEqual(config.codeFragments.length, 4, "Creekside must contain four symbolic fragment slots");
config.codeFragments.forEach((fragment) => {
  forbiddenFragmentKeys.forEach((key) => {
    assert.strictEqual(Object.prototype.hasOwnProperty.call(fragment, key), false, `Fragment config must not contain ${key}`);
  });
  assert.strictEqual(typeof fragment.displaySymbol, "string");
  assert.strictEqual(/[0-9]/.test(fragment.displaySymbol), false, "Fragment display symbols are names, not digits");
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
    if (HOLD_GATED_TYPES.includes(scene.type)) {
      const sceneIndexBeforeTap = state.currentSceneIndex;
      state = stateEngine.reducer(state, { type: "ADVANCE_SCENE" });
      assert.strictEqual(state.currentSceneIndex, sceneIndexBeforeTap, "A normal advance must not complete a protected relay hold");
      state = stateEngine.reducer(state, { type: "COMPLETE_RELAY_HOLD" });
    } else {
      state = stateEngine.reducer(state, { type: "ADVANCE_SCENE" });
    }
  });

  if (chapter.id === config.checkpoint.afterChapterId) {
    assert.strictEqual(state.activeFlow, "checkpoint", "Oak return must follow the Ranger Vault");
    assert.strictEqual(state.checkpointComplete, false);
    const blockedVictoryState = stateEngine.reducer(state, { type: "OPEN_CURRENT_CHAPTER" });
    assert.strictEqual(blockedVictoryState.view, "map", "Victory Road must remain locked before Oak's return");
    state = stateEngine.reducer(state, { type: "OPEN_CHECKPOINT" });
    config.checkpoint.scenes.forEach((scene) => {
      state = stateEngine.reducer(state, {
        type: HOLD_GATED_TYPES.includes(scene.type) ? "COMPLETE_RELAY_HOLD" : "ADVANCE_SCENE",
      });
    });
    assert.strictEqual(state.checkpointComplete, true);
    assert.strictEqual(state.activeFlow, "chapter");
  }
});

assert.strictEqual(state.completedChapters.length, 7);
assert.deepStrictEqual(Array.from(state.collectedFragments).sort(), [1, 2, 3, 4]);
assert.strictEqual(state.championEndingComplete, true, "Champion ending must be recorded as complete");
assert.strictEqual(state.mewUnlocked, false, "Champion completion must not automatically unlock Mew");
assert.strictEqual(state.mewComplete, false);
assert.strictEqual(state.activeFlow, "chapter", "The convincing Champion ending must remain on screen");
assert.strictEqual(state.fakeCreditsComplete, true);
const normalTapAtEnding = stateEngine.reducer(state, { type: "ADVANCE_SCENE" });
assert.strictEqual(normalTapAtEnding.currentSceneId, "champion-transition");
assert.strictEqual(normalTapAtEnding.mewUnlocked, false);
state = stateEngine.reducer(state, { type: "PARENT_TRIGGER_MEW" });
assert.strictEqual(state.mewUnlocked, true, "The confirmed adult action must unlock Mew");
assert.strictEqual(state.activeFlow, "mew");
config.epilogue.scenes.forEach((scene) => {
  state = stateEngine.reducer(state, {
    type: HOLD_GATED_TYPES.includes(scene.type) ? "COMPLETE_RELAY_HOLD" : "ADVANCE_SCENE",
  });
});

assert.strictEqual(state.mewComplete, true);
assert.strictEqual(state.view, "celebration");
assert.strictEqual(state.earnedRewards.length, Object.keys(config.rewards).length);
assert.strictEqual(state.team.length, 10);
assert.strictEqual(state.earnedBadges.length, 7);
assert.strictEqual(state.questItems.length, 7);

assert.strictEqual(stateEngine.writeState(state), true);
const restored = stateEngine.readState();
assert.strictEqual(restored.mewComplete, true, "Valid saved progress must restore");
assert.strictEqual(restored.completedChapters.length, 7);

const migrated = stateEngine.sanitizeState({
  ...stateEngine.initialState(),
  earnedRewards: ["mega-gallade-ex", "trainer-license", "red-card-sleeves"],
  team: undefined,
  earnedBadges: undefined,
  inventory: undefined,
  questItems: undefined,
});
assert.deepStrictEqual(Array.from(migrated.team), ["mega-gallade-ex"], "Older saves must backfill the team registry");
assert.deepStrictEqual(Array.from(migrated.earnedBadges), ["trainer-license"], "Older saves must backfill badges");
assert.deepStrictEqual(Array.from(migrated.inventory), ["red-card-sleeves"], "Older saves must backfill inventory");

memory.set(config.storageKey, "{corrupted");
const recovered = stateEngine.readState();
assert.strictEqual(recovered.view, "splash", "Corrupted storage must recover to the beginning");
assert.strictEqual(recovered.completedChapters.length, 0);

let gatedVault = stateEngine.initialState();
gatedVault = stateEngine.reducer(gatedVault, { type: "PARENT_JUMP_CHAPTER", chapterId: "secret-ranger-vault" });
gatedVault = stateEngine.reducer(gatedVault, { type: "BACK_TO_MAP" });
gatedVault = stateEngine.reducer(gatedVault, { type: "OPEN_CURRENT_CHAPTER" });
assert.strictEqual(gatedVault.view, "map", "The Ranger Vault must reject normal entry without all four fragments");

const mewHandoffIndex = config.epilogue.scenes.findIndex((scene) => scene.type === "cast-handoff");
assert.notStrictEqual(mewHandoffIndex, -1, "The Mew epilogue must still gate its mission behind a hold");
const parentMew = stateEngine.reducer(stateEngine.initialState(), {
  type: "PARENT_JUMP_MEW",
  sceneIndex: mewHandoffIndex,
});
assert.strictEqual(parentMew.activeFlow, "mew");
assert.strictEqual(stateEngine.currentScene(parentMew).type, "cast-handoff");
assert.strictEqual(stateEngine.currentScene(parentMew).audience, "luca", "Parent Mode must land on a player-facing screen");
assert.strictEqual(parentMew.mewUnlocked, true);

console.log("Creekside state tests passed.");
