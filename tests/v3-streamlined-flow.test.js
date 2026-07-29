/* Dependency-free Logistics Update 2 validation.
   Run from the repository root with: node tests/v3-streamlined-flow.test.js */
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
const beforeCounts = {
  "trainer-orientation": 13,
  "fairy-garden": 14,
  "professor-oak-lab": 14,
  "pokemon-center": 13,
  "team-rocket-base": 12,
  "secret-ranger-vault": 13,
  "victory-road": 28,
  "oak-return": 10,
  "mew-epilogue": 11,
};
const expectedAfterCounts = {
  "trainer-orientation": 6,
  "fairy-garden": 7,
  "professor-oak-lab": 8,
  "pokemon-center": 6,
  "team-rocket-base": 6,
  "secret-ranger-vault": 7,
  "victory-road": 17,
  "oak-return": 6,
  "mew-epilogue": 8,
};

assert.strictEqual(config.release, "4.0");
assert.strictEqual(Object.values(beforeCounts).reduce((sum, count) => sum + count, 0), 128);
assert.strictEqual(sequences.reduce((sum, sequence) => sum + sequence.scenes.length, 0), 71);
sequences.forEach((sequence) => {
  assert.strictEqual(sequence.scenes.length, expectedAfterCounts[sequence.id], `${sequence.id} has the wrong streamlined count`);
  assert.ok(sequence.scenes.length < beforeCounts[sequence.id], `${sequence.id} must have fewer runtime screens`);
});
config.chapters.filter((chapter) => !["professor-oak-lab", "victory-road"].includes(chapter.id)).forEach((chapter) => {
  assert.ok(chapter.scenes.length <= 10, `${chapter.id} exceeds the standard chapter target`);
});
assert.ok(config.chapters[2].scenes.length <= 12);
assert.ok(config.chapters[5].scenes.length <= 10);
assert.ok(config.chapters[6].scenes.length <= 18);

const allIds = sequences.flatMap((sequence) => sequence.scenes.map((scene) => scene.id));
assert.strictEqual(new Set(allIds).size, allIds.length, "All remaining scene IDs must be globally unique");

const results = sequences.flatMap((sequence) => sequence.scenes.filter((scene) => scene.type === "relay-result"));
assert.strictEqual(results.length, 11, "Every live encounter and the connected Legendary beat must end in a success screen");
results.forEach((scene) => {
  assert.ok(scene.successBody === undefined, "Runtime result must use the consolidated body field");
  assert.ok(scene.body);
  assert.ok(scene.resultLabel);
  assert.ok(Array.isArray(scene.revealItems) && scene.revealItems.length);
  assert.ok(scene.rewardHandoff);
  assert.ok(scene.nextDestination);
});

const assignedRewards = sequences.flatMap((sequence) =>
  sequence.scenes.flatMap((scene) => scene.rewardIds || [])
);
assert.strictEqual(assignedRewards.length, Object.keys(config.rewards).length);
assert.strictEqual(new Set(assignedRewards).size, assignedRewards.length);
assert.deepStrictEqual(Array.from(new Set(assignedRewards)).sort(), Object.keys(config.rewards).sort());
Object.values(config.rewards).forEach((reward) => {
  assert.ok(["OPEN NOW", "CARRY FOR LATER", "SAVE FOR CELEBRATION"].includes(reward.disposition));
});

const fragmentResults = config.chapters
  .filter((chapter) => chapter.scenes.some((scene) => Number.isInteger(scene.fragmentSlot)))
  .map((chapter) => chapter.number);
assert.deepStrictEqual(Array.from(fragmentResults), [1, 2, 3, 4]);

const victory = config.chapters.find((chapter) => chapter.id === "victory-road");
assert.strictEqual(victory.scenes.filter((scene) => scene.cueId === "victory-road" && scene.type === "cast-cue").length, 1);
assert.strictEqual(victory.scenes.some((scene) => scene.cueId === "rayquaza"), false);
const arielCue = victory.scenes.find((scene) => scene.cueId === "victory-road" && scene.type === "cast-cue");
assert.ok(arielCue.helpLucaSteps.some((step) => /Rayquaza/i.test(step)));
assert.strictEqual(config.checkpoint.scenes.filter((scene) => scene.type === "cast-cue").length, 1);
assert.strictEqual(config.checkpoint.scenes.length, 6);

const lucaRuntimeText = JSON.stringify(sequences.map((sequence) => sequence.scenes));
assert.doesNotMatch(lucaRuntimeText, /\b\d{1,2}:\d{2}\b/);
assert.doesNotMatch(lucaRuntimeText, /costume reset|setup window|adult preparation|schedule buffer/i);

const screens = fs.readFileSync(path.join(repositoryRoot, "screens.jsx"), "utf8");
assert.match(screens, /React\.useState\("Luca"\)/, "Trainer name must be prefilled");
assert.doesNotMatch(screens, /sequence\.scheduleLabel|chapter\.scheduleLabel|checkpoint\.scheduleLabel/, "Luca screens must not render operational clock times");
assert.match(screens, /\{state\.mewUnlocked && \(/, "Mew map entry must not mount before unlock");
assert.match(screens, /Real-world reward handoff/);
assert.match(screens, /Next signal/);
assert.match(screens, /Parent Mode/);
assert.match(screens, /scrollRootRef\.current\.scrollTop = 0/, "Each new scene must begin at the top");
assert.strictEqual(config.settings.soundEnabled, false);
assert.strictEqual(config.settings.respectReducedMotion, true);

// Every remaining screen must survive a save/refresh at its stable ID.
sequences.forEach((sequence) => {
  sequence.scenes.forEach((scene, sceneIndex) => {
    let state = stateEngine.initialState();
    if (sequence === config.checkpoint) {
      state = stateEngine.reducer(state, { type: "PARENT_JUMP_CHECKPOINT", sceneIndex });
    } else if (sequence === config.epilogue) {
      state = stateEngine.reducer(state, { type: "PARENT_JUMP_MEW", sceneIndex });
    } else {
      state = stateEngine.reducer(state, {
        type: "PARENT_JUMP_SCENE",
        chapterId: sequence.id,
        sceneIndex,
      });
    }
    memory.clear();
    assert.strictEqual(stateEngine.writeState(state), true);
    assert.strictEqual(stateEngine.readState().currentSceneId, scene.id, `${scene.id} must restore exactly`);
  });
});

// Removed V3.2 taps resolve to safe consolidated screens instead of resetting.
[
  ["orientation-reward", "orientation-challenge-result", config.chapters[0]],
  ["fairy-fragment", "fairy-challenge-result", config.chapters[1]],
  ["victory-challenge-b-privacy", "victory-challenge-b", victory],
  ["champion-reward", "champion-challenge-result", victory],
  ["oak-return-reward", "oak-return-challenge-result", config.checkpoint],
  ["mew-reward", "mew-challenge-result", config.epilogue],
].forEach(([oldId, expectedId, sequence]) => {
  const snapshot = stateEngine.initialState();
  snapshot.version = 3;
  snapshot.view = "scene";
  snapshot.currentSceneId = oldId;
  snapshot.currentSceneIndex = 0;
  if (sequence === config.checkpoint) snapshot.activeFlow = "checkpoint";
  else if (sequence === config.epilogue) {
    snapshot.activeFlow = "mew";
    snapshot.mewUnlocked = true;
  } else {
    snapshot.activeFlow = "chapter";
    snapshot.currentChapterId = sequence.id;
  }
  assert.strictEqual(stateEngine.sanitizeState(snapshot).currentSceneId, expectedId, `${oldId} must migrate safely`);
});

console.log("V3.5 streamlined-flow tests passed.");
