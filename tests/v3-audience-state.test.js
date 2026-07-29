/* Dependency-free V3 audience and stable-position validation.
   Run from the repository root with: node tests/v3-audience-state.test.js */
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
["data.js", "cast-core.js", "creekside-content.js", "state.js"].forEach((file) => {
  vm.runInContext(fs.readFileSync(path.join(repositoryRoot, file), "utf8"), context);
});

const config = context.window.CREEKSIDE_CONFIG;
const stateEngine = context.window.CreeksideState;
const sequences = [...config.chapters, config.checkpoint, config.epilogue];
const sceneIds = [];

assert.strictEqual(config.version, 3);
assert.deepStrictEqual(Array.from(config.audiences), ["luca", "adult", "cast"]);

sequences.forEach((sequence) => {
  assert.ok(Array.isArray(sequence.legacyV2SceneIds), `${sequence.id} must preserve its V2 scene order`);
  sequence.scenes.forEach((scene) => {
    assert.ok(scene.id, `${sequence.id} contains a scene without an ID`);
    assert.ok(config.audiences.includes(scene.audience), `${scene.id} has an invalid audience`);
    sceneIds.push(scene.id);
  });
});
assert.strictEqual(new Set(sceneIds).size, sceneIds.length, "Runtime scene IDs must be globally unique");

let state = stateEngine.initialState();
assert.strictEqual(state.currentSceneId, config.chapters[0].scenes[0].id);
state = stateEngine.reducer(state, {
  type: "PARENT_JUMP_SCENE",
  chapterId: config.chapters[1].id,
  sceneIndex: 2,
});
assert.strictEqual(state.currentSceneId, config.chapters[1].scenes[2].id);
assert.strictEqual(stateEngine.currentScene(state).id, state.currentSceneId);

const v2Snapshot = {
  version: 2,
  view: "scene",
  activeFlow: "chapter",
  trainer: { name: "Luca", avatarId: config.avatars[0].id },
  currentChapterId: "team-rocket-base",
  currentSceneIndex: 3,
  completedChapters: ["trainer-orientation", "fairy-garden"],
  earnedRewards: ["mega-gallade-ex", "trainer-license"],
  collectedFragments: [1, 2],
  checkpointComplete: false,
  mewUnlocked: false,
  fakeCreditsComplete: false,
  mewComplete: false,
};
const migrated = stateEngine.sanitizeState(v2Snapshot);
assert.strictEqual(migrated.version, 3);
assert.strictEqual(migrated.trainer.name, "Luca");
assert.strictEqual(migrated.currentSceneId, "rocket-challenge-handoff");
assert.deepStrictEqual(Array.from(migrated.completedChapters), ["trainer-orientation", "fairy-garden"]);
assert.deepStrictEqual(Array.from(migrated.collectedFragments), [1, 2]);
assert.deepStrictEqual(Array.from(migrated.earnedRewards), ["mega-gallade-ex", "trainer-license"]);

const v32RewardSnapshot = {
  ...v2Snapshot,
  version: 3,
  currentSceneId: "rocket-reward",
  currentSceneIndex: 9,
};
const v32Migrated = stateEngine.sanitizeState(v32RewardSnapshot);
assert.strictEqual(v32Migrated.currentSceneId, "rocket-challenge-result", "Removed V3.2 reward screens must migrate to the combined success");
assert.strictEqual(v32Migrated.trainer.name, "Luca");

const targetSequence = config.chapters[0];
const invalidAudienceScene = targetSequence.scenes[1];
const originalAudience = invalidAudienceScene.audience;
invalidAudienceScene.audience = "unknown";
const safelyRecovered = stateEngine.sanitizeState({
  ...stateEngine.initialState(),
  currentSceneId: invalidAudienceScene.id,
  currentSceneIndex: 1,
});
assert.strictEqual(safelyRecovered.currentSceneIndex, 0, "Unknown audiences must recover to a preceding Luca scene");
assert.strictEqual(safelyRecovered.currentSceneId, targetSequence.scenes[0].id);
invalidAudienceScene.audience = originalAudience;

console.log("V3 audience and stable-position tests passed.");
