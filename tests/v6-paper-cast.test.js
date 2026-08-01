/* Paper-cast scene inventory, verified by SIMULATING THE REDUCER.
   The rest of this suite string-matches file contents, which is how a narrative
   contradiction ("hold to begin the mission" leading to a screen that meant the
   mission was already over) shipped with a green run. This file plays the game
   instead: it drives the real reducer from the splash screen to the Mythical
   ending and asserts on the state that comes out.
   Run from the repository root with: node tests/v6-paper-cast.test.js */
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
const REMOVED_SCENE_TYPES = ["privacy-shield", "cast-cue", "return-to-player", "adult-logistics"];
/* Only these types refuse an ordinary tap. A cast-handoff hold now means "the
   real-world mission is finished", so the walk below holds through each one. */
const HOLD_GATED_TYPES = ["physical-challenge", "cast-handoff"];
const EXPECTED_SCENE_COUNT = 41;

/* --- a. Every scene is player-facing --- */
sequences.forEach((sequence) => {
  sequence.scenes.forEach((scene) => {
    assert.strictEqual(scene.audience, "luca", `${sequence.id}/${scene.id} must be player-facing`);
  });
});

/* --- b. The four removed scene types are gone from every sequence --- */
sequences.forEach((sequence) => {
  sequence.scenes.forEach((scene) => {
    assert.ok(
      !REMOVED_SCENE_TYPES.includes(scene.type),
      `${sequence.id}/${scene.id} still uses the removed ${scene.type} type`
    );
  });
});

/* --- c. Total inventory --- */
const totalScenes = sequences.reduce((sum, sequence) => sum + sequence.scenes.length, 0);
assert.strictEqual(totalScenes, EXPECTED_SCENE_COUNT, `Expected ${EXPECTED_SCENE_COUNT} scenes, found ${totalScenes}`);

/* --- d. Walk the whole game through the reducer --- */
/* Hard-coded from the pre-refactor build: removing the private relay screens
   must not change a single earned reward. */
const EXPECTED_EARNED_REWARDS = [
  "adventures-collector-02", "alcremie-ex", "ascended-heroes", "blue-deck-box", "booster-satchel",
  "cardboard-gold-top-loaders", "care-badge", "champion-title", "chaos-rising-1", "chaos-rising-2",
  "chaos-rising-3", "destined-rivals-1", "destined-rivals-2", "electivire-ex", "fairy-badge",
  "fire-mini-tin", "fire-mini-tin-packs", "first-partner-boosters", "first-partner-collection",
  "five-minute-stories", "how-to-draw", "incineroar-ex", "journey-together-booster",
  "league-authorization", "league-qualification-seal", "mabosstiff-ex", "meet-the-crew-reader",
  "mega-abomasnow-ex", "mega-clefable-ex", "mega-evolution-booster", "mega-evolutions-sticker-book",
  "mega-gallade-ex", "mega-lucario-deck", "mega-pyroar-ex", "mega-rayquaza-model", "mew-figure",
  "mini-portfolio", "new-journey-reader", "one-touch-edge-case", "perfect-order-bundle",
  "perfect-order-loose-1", "phantasmal-flames", "popsicles", "portfolio-booster",
  "ranger-dispatch", "ranger-vault-badge", "red-card-sleeves", "rocket-badge", "rocket-nidoking-ex",
  "scream-tail-ex", "sealed-research-file", "sky-pillar-coordinates", "sky-stone",
  "sweet-surprise-reader", "team-reserve", "trainer-license", "water-mini-tin",
  "water-mini-tin-packs", "water-research-badge",
];

let state = stateEngine.initialState();
state = stateEngine.reducer(state, { type: "START_ONBOARDING" });
assert.strictEqual(state.view, "onboarding");
state = stateEngine.reducer(state, { type: "SET_TRAINER", name: "Luca", avatarId: config.avatars[0].id });
assert.strictEqual(state.view, "map");

/* Play the sequence the app is currently showing, one screen at a time, using
   whichever action that screen actually accepts. A screen that does not move is
   a stuck screen, and the walk fails rather than looping forever. */
function playCurrentSequence(label) {
  let visited = 0;
  while (state.view === "scene") {
    const scene = stateEngine.currentScene(state);
    assert.strictEqual(scene.audience, "luca", `${label} showed the non-player screen ${scene.id}`);
    const sceneIdBefore = state.currentSceneId;
    if (HOLD_GATED_TYPES.includes(scene.type)) {
      const tapped = stateEngine.reducer(state, { type: "ADVANCE_SCENE" });
      assert.strictEqual(tapped.currentSceneId, sceneIdBefore, `${scene.id} must resist an ordinary tap`);
      state = stateEngine.reducer(state, { type: "COMPLETE_RELAY_HOLD" });
    } else {
      state = stateEngine.reducer(state, { type: "ADVANCE_SCENE" });
    }
    visited += 1;
    assert.ok(visited <= EXPECTED_SCENE_COUNT, `${label} did not finish within the scene inventory`);
    /* The champion ending is a deliberate dead end: it stays on screen until an
       adult triggers the Mythical epilogue. */
    if (state.view === "scene" && state.currentSceneId === sceneIdBefore) {
      assert.strictEqual(stateEngine.currentScene(state).type, "champion-final", `${scene.id} is stuck`);
      return;
    }
  }
}

config.chapters.forEach((chapter) => {
  assert.strictEqual(state.currentChapterId, chapter.id, `Chapter ${chapter.number} must unlock in order`);
  state = stateEngine.reducer(state, { type: "OPEN_CURRENT_CHAPTER" });
  assert.strictEqual(state.view, "scene", `${chapter.id} must open`);
  playCurrentSequence(chapter.id);
  if (state.activeFlow === "checkpoint") {
    state = stateEngine.reducer(state, { type: "OPEN_CHECKPOINT" });
    assert.strictEqual(state.view, "scene", "The Oak return checkpoint must open");
    playCurrentSequence(config.checkpoint.id);
    assert.strictEqual(state.checkpointComplete, true);
  }
});

assert.strictEqual(state.completedChapters.length, 7, "All seven chapters must complete");
assert.strictEqual(state.championEndingComplete, true, "The reducer walk must reach the Champion ending");
assert.deepStrictEqual(Array.from(state.collectedFragments).sort(), [1, 2, 3, 4], "All four Ranger marks must be collected");
assert.strictEqual(state.fakeCreditsComplete, true);
assert.strictEqual(state.mewUnlocked, false, "Finishing the Champion ending must not reveal Mew on its own");

/* --- e. The adult Mew trigger still reaches the Mythical ending --- */
state = stateEngine.reducer(state, { type: "PARENT_TRIGGER_MEW" });
assert.strictEqual(state.mewUnlocked, true, "PARENT_TRIGGER_MEW must unlock the epilogue");
assert.strictEqual(state.activeFlow, "mew");
playCurrentSequence(config.epilogue.id);
assert.strictEqual(state.mewComplete, true, "The epilogue walk must reach mewComplete");
assert.strictEqual(state.view, "celebration");

/* Earned state must match the pre-refactor build exactly. */
assert.deepStrictEqual(Array.from(state.earnedRewards).sort(), EXPECTED_EARNED_REWARDS, "The earned reward set must be unchanged");
assert.strictEqual(state.earnedRewards.length, Object.keys(config.rewards).length, "Every registered reward must be earnable");
assert.strictEqual(state.team.length, 10);
assert.strictEqual(state.earnedBadges.length, 7);
assert.strictEqual(state.questItems.length, 6);

/* --- f. Every removed scene ID resolves to a real player-facing screen --- */
const removedChallengeIds = [
  "orientation-challenge", "fairy-challenge", "oak-challenge", "center-challenge", "rocket-challenge",
  "vault-challenge", "victory-challenge-a", "champion-challenge", "oak-return-challenge", "mew-challenge",
];
const removedSceneIds = removedChallengeIds
  .flatMap((challengeId) => ["-privacy", "", "-return", "-logistics"].map((suffix) => challengeId + suffix))
  .concat(["victory-challenge-b-control"]);
assert.strictEqual(removedSceneIds.length, 41, "Forty relay screens plus the merged Legendary control were removed");

removedSceneIds.forEach((removedId) => {
  const owner = sequences.find((sequence) =>
    Object.prototype.hasOwnProperty.call(sequence.sceneAliases || {}, removedId)
  );
  assert.ok(owner, `${removedId} must have a sceneAliases entry`);
  assert.strictEqual(
    owner.scenes.some((scene) => scene.id === removedId),
    false,
    `${removedId} must actually be deleted, not merely aliased`
  );

  /* Restore a save pointed at the removed ID and confirm where it lands. */
  const snapshot = {
    ...stateEngine.initialState(),
    version: config.version,
    view: "scene",
    currentSceneId: removedId,
    currentSceneIndex: 0,
    activeFlow: owner === config.checkpoint ? "checkpoint" : owner === config.epilogue ? "mew" : "chapter",
    currentChapterId: owner === config.checkpoint || owner === config.epilogue ? config.chapters[0].id : owner.id,
    mewUnlocked: owner === config.epilogue,
  };
  const restored = stateEngine.sanitizeState(snapshot);
  const landed = owner.scenes.find((scene) => scene.id === restored.currentSceneId);
  assert.ok(landed, `${removedId} must restore onto a scene that exists`);
  assert.strictEqual(landed.audience, "luca", `${removedId} must restore onto a player-facing scene`);
  assert.strictEqual(restored.currentSceneId, owner.sceneAliases[removedId], `${removedId} must follow its alias`);
  assert.strictEqual(
    owner.scenes[restored.currentSceneIndex].id,
    restored.currentSceneId,
    `${removedId} must restore with a consistent index`
  );
});

/* --- g. No player-facing string carries production vocabulary --- */
const PRODUCTION_VOCABULARY = /Luca-facing|referee cue|designated adult|Phone Captain|privacy|cast cue/i;
sequences.forEach((sequence) => {
  sequence.scenes.forEach((scene) => {
    const visibleText = [
      scene.title,
      scene.body,
      scene.characterName,
      scene.handoffLabel,
      scene.resultLabel,
      scene.fragmentStory,
      scene.nextDestination,
      ...(scene.revealItems || []),
      ...(scene.instructions || []),
      ...Object.values(scene.tributes || {}),
    ].filter(Boolean).join(" ");
    assert.doesNotMatch(visibleText, PRODUCTION_VOCABULARY, `${scene.id} shows production vocabulary to Luca`);
  });
});

console.log("V6 paper-cast tests passed.");
