/* Dependency-free V3 theatrical relay validation.
   Run from the repository root with: node tests/v3-theatrical-relay.test.js */
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
["data.js", "cast-core.js", "creekside-content.js", "state.js", "cast/cast-data.js"].forEach((file) => {
  vm.runInContext(fs.readFileSync(path.join(repositoryRoot, file), "utf8"), context);
});

const config = context.window.CREEKSIDE_CONFIG;
const cues = context.window.CREEKSIDE_CAST_CORES;
const stateEngine = context.window.CreeksideState;
const portal = context.window.CAST_PORTAL;
const sequences = [...config.chapters, config.checkpoint, config.epilogue];
const approvedPerformers = {
  orientation: "Auntie Ariel",
  fairy: "Nina with Auntie Ariel",
  "oak-water": "Professor Oak and Professor Monica",
  "nurse-joy": "Polly",
  rocket: "Mike",
  vault: "Designated Adult Escort",
  "oak-return": "Professor Oak and Professor Monica",
  "victory-road": "Auntie Ariel",
  rayquaza: "Auntie Ariel",
  champion: "Patrick",
  mew: "Patrick or Lead Adult",
};

function plain(value) {
  return JSON.parse(JSON.stringify(value));
}

function locateScene(sceneId) {
  for (const sequence of sequences) {
    const index = sequence.scenes.findIndex((scene) => scene.id === sceneId);
    if (index !== -1) return { sequence, index, scene: sequence.scenes[index] };
  }
  return null;
}

function stateAt(sequence, sceneIndex) {
  const base = stateEngine.initialState();
  if (sequence === config.checkpoint) {
    return {
      ...base,
      view: "scene",
      activeFlow: "checkpoint",
      currentChapterId: config.checkpoint.afterChapterId,
      currentSceneIndex: sceneIndex,
      currentSceneId: sequence.scenes[sceneIndex].id,
      completedChapters: [config.checkpoint.afterChapterId],
    };
  }
  if (sequence === config.epilogue) {
    return {
      ...base,
      view: "scene",
      activeFlow: "mew",
      currentSceneIndex: sceneIndex,
      currentSceneId: sequence.scenes[sceneIndex].id,
      mewUnlocked: true,
    };
  }
  return {
    ...base,
    view: "scene",
    activeFlow: "chapter",
    currentChapterId: sequence.id,
    currentSceneIndex: sceneIndex,
    currentSceneId: sequence.scenes[sceneIndex].id,
  };
}

assert.deepStrictEqual(Object.keys(cues).sort(), Object.keys(approvedPerformers).sort());
assert.strictEqual(config.settings.soundEnabled, false, "The V3 experience must remain sound-off by default");
assert.strictEqual(config.settings.respectReducedMotion, true, "V3 must preserve reduced-motion support");
const monicaEntrance = locateScene("monica-entrance").scene;
assert.strictEqual(monicaEntrance.character, "Professor Monica");
assert.ok(monicaEntrance.title.startsWith("Professor Monica"));

Object.entries(cues).forEach(([cueId, cue]) => {
  assert.strictEqual(cue.performerName, approvedPerformers[cueId], `${cueId} performer must be explicitly approved`);
  assert.ok(cue.handoffLabel.includes("Adult: Hold"), `${cueId} must have an adult handoff label`);
  [
    "characterName",
    "entranceCue",
    "successCondition",
    "rewardPreparation",
    "fallback",
    "transitionLine",
    "transitionDestination",
    "completionLabel",
  ].forEach((field) => assert.ok(cue[field], `${cueId} is missing ${field}`));
  ["spokenLines", "challengeSteps", "rewardPackages", "rewardOwners"].forEach((field) => {
    assert.ok(Array.isArray(cue[field]) && cue[field].length, `${cueId} is missing ${field}`);
  });

  const matchingCastScenes = sequences.flatMap((sequence) =>
    sequence.scenes.filter((scene) => scene.type === "cast-cue" && scene.cueId === cueId)
  );
  assert.strictEqual(matchingCastScenes.length, 1, `${cueId} must power exactly one runtime cast cue`);
  const runtimeCue = matchingCastScenes[0];
  assert.strictEqual(runtimeCue.performerName, cue.performerName);
  assert.strictEqual(runtimeCue.characterName, cue.characterName);
  assert.strictEqual(runtimeCue.entranceCue, cue.entranceCue);
  assert.deepStrictEqual(plain(runtimeCue.spokenLines), plain(cue.spokenLines));
  assert.deepStrictEqual(plain(runtimeCue.challengeSteps), plain(cue.challengeSteps));
  assert.strictEqual(runtimeCue.successCondition, cue.successCondition);
  assert.deepStrictEqual(plain(runtimeCue.rewardPackages), plain(cue.rewardPackages));
  assert.deepStrictEqual(plain(runtimeCue.rewardOwners), plain(cue.rewardOwners));
  assert.strictEqual(runtimeCue.rewardPreparation, cue.rewardPreparation);
  assert.strictEqual(runtimeCue.fallback, cue.fallback);
  assert.strictEqual(runtimeCue.transitionLine, cue.transitionLine);
  assert.strictEqual(runtimeCue.transitionDestination, cue.transitionDestination);
});

let relayCount = 0;
sequences.forEach((sequence) => {
  sequence.scenes.forEach((scene, index) => {
    if (scene.type !== "cast-cue") return;
    relayCount += 1;
    const handoff = sequence.scenes[index - 2];
    const privacy = sequence.scenes[index - 1];
    const returned = sequence.scenes[index + 1];
    const result = sequence.scenes[index + 2];

    assert.deepStrictEqual(
      [handoff.type, privacy.type, scene.type, returned.type, result.type],
      ["cast-handoff", "privacy-shield", "cast-cue", "return-to-player", "relay-result"],
      `${scene.cueId} must preserve the five-beat relay`
    );
    assert.deepStrictEqual(
      [handoff.audience, privacy.audience, scene.audience, returned.audience, result.audience],
      ["luca", "adult", "cast", "adult", "luca"],
      `${scene.cueId} must preserve audience boundaries`
    );
    assert.strictEqual(handoff.cueId, scene.cueId);
    assert.strictEqual(privacy.cueId, scene.cueId);
    assert.strictEqual(returned.cueId, scene.cueId);
    assert.strictEqual(result.cueId, scene.cueId);

    ["spokenLines", "challengeSteps", "successCondition", "rewardPackages", "rewardOwners", "rewardPreparation"].forEach((field) => {
      assert.strictEqual(privacy[field], undefined, `${scene.cueId} privacy shield leaks ${field}`);
      assert.strictEqual(handoff[field], undefined, `${scene.cueId} Luca handoff leaks ${field}`);
      assert.strictEqual(returned[field], undefined, `${scene.cueId} return shield leaks ${field}`);
    });
    ["transitionLine", "transitionDestination"].forEach((field) => {
      assert.strictEqual(returned[field], undefined, `${scene.cueId} return shield leaks ${field}`);
    });

    let relayState = stateAt(sequence, index - 2);
    const blockedHandoff = stateEngine.reducer(relayState, { type: "ADVANCE_SCENE" });
    assert.strictEqual(blockedHandoff.currentSceneId, handoff.id, `${scene.cueId} handoff must resist an ordinary tap`);

    relayState = stateEngine.reducer(relayState, { type: "COMPLETE_RELAY_HOLD" });
    assert.strictEqual(relayState.currentSceneId, privacy.id);
    relayState = stateEngine.reducer(relayState, { type: "ADVANCE_SCENE" });
    assert.strictEqual(relayState.currentSceneId, scene.id);

    const blockedCue = stateEngine.reducer(relayState, { type: "ADVANCE_SCENE" });
    assert.strictEqual(blockedCue.currentSceneId, scene.id, `${scene.cueId} cast cue must resist an ordinary tap`);

    const parentAdvancedCue = stateEngine.reducer(relayState, { type: "PARENT_ADVANCE" });
    assert.strictEqual(parentAdvancedCue.currentSceneId, returned.id, `${scene.cueId} Parent Mode must advance to the return shield`);

    relayState = stateEngine.reducer(relayState, { type: "COMPLETE_RELAY_HOLD" });
    assert.strictEqual(relayState.currentSceneId, returned.id);
    relayState = stateEngine.reducer(relayState, { type: "ADVANCE_SCENE" });
    assert.strictEqual(relayState.currentSceneId, result.id);

    [handoff, privacy, scene, returned, result].forEach((relayScene, offset) => {
      const exactState = stateAt(sequence, index - 2 + offset);
      const backedUp = stateEngine.reducer(exactState, { type: "PARENT_BACK_SCENE" });
      assert.strictEqual(
        backedUp.currentSceneIndex,
        index - 3 + offset,
        `Parent Mode must go back one scene from ${relayScene.id}`
      );

      const parentAdvanced = stateEngine.reducer(exactState, { type: "PARENT_ADVANCE" });
      assert.strictEqual(
        parentAdvanced.currentSceneIndex,
        index - 1 + offset,
        `Parent Mode must advance one scene from ${relayScene.id}`
      );

      memory.clear();
      assert.strictEqual(stateEngine.writeState(exactState), true);
      const restored = stateEngine.readState();
      assert.strictEqual(restored.currentSceneId, relayScene.id, `${relayScene.id} must survive refresh exactly`);
      assert.strictEqual(restored.currentSceneIndex, index - 2 + offset);
    });
  });
});
assert.strictEqual(relayCount, Object.keys(cues).length, "Every cast cue must have one theatrical relay");

portal.director.operations.forEach((operation) => {
  operation.cueIds.forEach((cueId, index) => {
    assert.strictEqual(operation.runtimeCues[index], cues[cueId], `${operation.slug} must use the shared cue object for ${cueId}`);
  });
});

const rocketLocation = locateScene("rocket-challenge");
const v2ChallengeIndex = rocketLocation.sequence.legacyV2SceneIds.indexOf("rocket-challenge");
const v2Snapshot = {
  version: 2,
  view: "scene",
  activeFlow: "chapter",
  trainer: { name: "Luca", avatarId: config.avatars[0].id },
  currentChapterId: rocketLocation.sequence.id,
  currentSceneIndex: v2ChallengeIndex,
  completedChapters: ["trainer-orientation", "fairy-garden", "professor-oak-lab", "pokemon-center"],
  earnedRewards: ["mega-gallade-ex", "trainer-license", "fairy-badge"],
  collectedFragments: [1, 2, 4],
  checkpointComplete: true,
  mewUnlocked: true,
  fakeCreditsComplete: true,
  mewComplete: true,
};
const migrated = stateEngine.sanitizeState(v2Snapshot);
assert.strictEqual(migrated.currentSceneId, "rocket-challenge-handoff", "V2 challenge progress must migrate to the Luca handoff");
assert.notStrictEqual(migrated.currentSceneId, "rocket-challenge", "V2 challenge progress must never open on a cast cue");
assert.strictEqual(migrated.trainer.name, "Luca");
assert.deepStrictEqual(plain(migrated.completedChapters), plain(v2Snapshot.completedChapters));
assert.deepStrictEqual(plain(migrated.earnedRewards), plain(v2Snapshot.earnedRewards));
assert.deepStrictEqual(plain(migrated.collectedFragments), plain(v2Snapshot.collectedFragments));
assert.strictEqual(migrated.checkpointComplete, true);
assert.strictEqual(migrated.mewUnlocked, true);
assert.strictEqual(migrated.fakeCreditsComplete, true);
assert.strictEqual(migrated.mewComplete, true);

const screenSource = fs.readFileSync(path.join(repositoryRoot, "screens.jsx"), "utf8");
const componentSource = fs.readFileSync(path.join(repositoryRoot, "components.jsx"), "utf8");
const privacySource = screenSource.slice(
  screenSource.indexOf("function PrivacyShieldScreen"),
  screenSource.indexOf("function CastCueScreen")
);
assert.ok(privacySource.includes("Turn the phone away from Luca."));
assert.ok(privacySource.includes("Phone is turned away — open cast cue"));
["spokenLines", "challengeSteps", "rewardPackages", "transitionDestination"].forEach((field) => {
  assert.ok(!privacySource.includes(field), `PrivacyShieldScreen must not render ${field}`);
});
assert.ok(screenSource.includes('audience="luca"'));
assert.ok(screenSource.includes('audience="adult"'));
assert.ok(screenSource.includes('data-audience="cast"'));
assert.ok(componentSource.includes("onPointerUp={endHold}"));
assert.ok(componentSource.includes("onPointerCancel={cancelHold}"));
assert.ok(componentSource.includes("onLostPointerCapture={endHold}"));
assert.ok(componentSource.includes("if (!completedRef.current) cancelHold();"));
assert.strictEqual(
  componentSource.slice(
    componentSource.indexOf("function AdultHoldButton"),
    componentSource.indexOf("function CodeFragmentSlots")
  ).split("onComplete();").length - 1,
  1,
  "AdultHoldButton must have one completion call site"
);

console.log("V3 theatrical relay tests passed.");
