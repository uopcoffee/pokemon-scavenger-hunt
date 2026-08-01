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
/* Paper-cast inventory: the privacy shield, runtime cast screen, return shield,
   and adult reward checklist are printed now, so each live encounter is two
   player-facing screens instead of six. */
const expectedAfterCounts = {
  "trainer-orientation": 3,
  "fairy-garden": 4,
  "professor-oak-lab": 5,
  "pokemon-center": 3,
  "team-rocket-base": 3,
  "secret-ranger-vault": 4,
  "victory-road": 10,
  "oak-return": 3,
  "mew-epilogue": 6,
};
const removedSceneTypes = ["privacy-shield", "cast-cue", "return-to-player", "adult-logistics"];

assert.strictEqual(config.release, "4.0");
assert.strictEqual(Object.values(beforeCounts).reduce((sum, count) => sum + count, 0), 128);
assert.strictEqual(Object.values(expectedAfterCounts).reduce((sum, count) => sum + count, 0), 41);
assert.strictEqual(sequences.reduce((sum, sequence) => sum + sequence.scenes.length, 0), 41);
sequences.forEach((sequence) => {
  assert.strictEqual(sequence.scenes.length, expectedAfterCounts[sequence.id], `${sequence.id} has the wrong streamlined count`);
  assert.ok(sequence.scenes.length < beforeCounts[sequence.id], `${sequence.id} must have fewer runtime screens`);
});
config.chapters.filter((chapter) => !["professor-oak-lab", "victory-road"].includes(chapter.id)).forEach((chapter) => {
  assert.ok(chapter.scenes.length <= 4, `${chapter.id} exceeds the standard chapter target`);
});
assert.ok(config.chapters[2].scenes.length <= 5);
assert.ok(config.chapters[5].scenes.length <= 4);
assert.ok(config.chapters[6].scenes.length <= 10);
sequences.forEach((sequence) => {
  sequence.scenes.forEach((scene) => {
    assert.strictEqual(scene.audience, "luca", `${scene.id} must be player-facing`);
    assert.ok(!removedSceneTypes.includes(scene.type), `${scene.id} must not use the removed ${scene.type} type`);
  });
});

const allIds = sequences.flatMap((sequence) => sequence.scenes.map((scene) => scene.id));
assert.strictEqual(new Set(allIds).size, allIds.length, "All remaining scene IDs must be globally unique");

const results = sequences.flatMap((sequence) => sequence.scenes.filter((scene) => scene.type === "relay-result"));
assert.strictEqual(results.length, 11, "Every live encounter and the connected Legendary beat must end in a success screen");
results.forEach((scene) => {
  assert.ok(scene.successBody === undefined, "Runtime result must use the consolidated body field");
  assert.ok(scene.body);
  assert.ok(scene.resultLabel);
  assert.ok(Array.isArray(scene.revealItems) && scene.revealItems.length);
  assert.ok(scene.revealItems.length <= 1);
  assert.strictEqual(scene.rewardHandoff, undefined);
  assert.ok(scene.nextDestination);
});
/* Reward logistics live on the printed gift map. The reward-bearing reveal is
   now the last screen of its sequence and must still apply its rewards when the
   player advances out of it. */
const handoffs = sequences.flatMap((sequence) => sequence.scenes.filter((scene) => scene.type === "cast-handoff"));
assert.strictEqual(handoffs.length, 11, "Every live encounter plus the Legendary beat must gate on one hold");
handoffs.forEach((scene) => {
  assert.strictEqual(scene.audience, "luca");
  assert.strictEqual(scene.handoffLabel, "Adult: Hold when the mission is complete");
  assert.ok(scene.body.trim().split(/\s+/).length < 25, `${scene.id} must stay readable aloud`);
  assert.strictEqual(scene.performerName, undefined, `${scene.id} must not name a performer to Luca`);
});
const rewardBearingSequences = sequences.filter((sequence) =>
  sequence.scenes.some((scene) => (scene.rewardIds || []).length)
);
rewardBearingSequences.forEach((sequence) => {
  sequence.scenes.forEach((scene) => {
    assert.strictEqual(scene.rewardHandoff, undefined, `${scene.id} must not carry reward logistics`);
    assert.strictEqual(scene.logisticsRewardIds, undefined, `${scene.id} must not carry an adult manifest`);
  });
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
assert.deepStrictEqual(Array.from(fragmentResults), [2, 3, 4, 5]);

const victory = config.chapters.find((chapter) => chapter.id === "victory-road");
assert.strictEqual(victory.scenes.filter((scene) => scene.cueId === "victory-road" && scene.type === "cast-handoff").length, 1);
assert.strictEqual(victory.scenes.some((scene) => scene.cueId === "rayquaza"), false);
/* The combined Ariel guide still covers Rayquaza — on paper, not on screen. */
const arielCue = context.window.CREEKSIDE_CAST_CORES["victory-road"];
assert.ok(arielCue.runtimeSteps.some((step) => /Rayquaza/i.test(step)));
assert.strictEqual(config.checkpoint.scenes.filter((scene) => scene.type === "cast-handoff").length, 1);
assert.strictEqual(config.checkpoint.scenes.length, 3);

const lucaRuntimeText = JSON.stringify(sequences.map((sequence) => sequence.scenes));
assert.doesNotMatch(lucaRuntimeText, /\b\d{1,2}:\d{2}\b/);
assert.doesNotMatch(lucaRuntimeText, /costume reset|setup window|adult preparation|schedule buffer/i);

const screens = fs.readFileSync(path.join(repositoryRoot, "screens.jsx"), "utf8");
assert.match(screens, /React\.useState\("Luca"\)/, "Trainer name must be prefilled");
assert.doesNotMatch(screens, /sequence\.scheduleLabel|chapter\.scheduleLabel|checkpoint\.scheduleLabel/, "Luca screens must not render operational clock times");
assert.match(screens, /\{state\.mewUnlocked && \(/, "Mew map entry must not mount before unlock");
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
  ["rocket-fragment", "rocket-challenge-result", config.chapters[4]],
  ["victory-challenge-b-privacy", "victory-challenge-b", victory],
  ["victory-challenge-b-control", "victory-challenge-b", victory],
  ["orientation-challenge", "orientation-challenge-handoff", config.chapters[0]],
  ["center-challenge-return", "center-challenge-result", config.chapters[3]],
  ["vault-challenge-logistics", "vault-challenge-result", config.chapters[5]],
  ["champion-challenge-privacy", "champion-challenge-handoff", victory],
  ["oak-return-challenge-logistics", "oak-return-challenge-result", config.checkpoint],
  ["mew-challenge", "mew-challenge-handoff", config.epilogue],
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
