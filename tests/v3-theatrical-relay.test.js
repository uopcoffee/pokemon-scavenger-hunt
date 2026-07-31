/* Dependency-free paper-cast relay validation.
   The performer cue cards are printed, so the runtime relay is two
   player-facing screens: a mission brief whose protected hold means "the
   real-world mission is FINISHED", and the reveal it unlocks.
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
  fairy: "Auntie Ariel",
  "oak-water": "Professor Oak and Professor Monica",
  "nurse-joy": "Polly",
  rocket: "Mike",
  vault: "Designated Adult Escort",
  "oak-return": "Professor Oak and Professor Monica",
  "victory-road": "Auntie Ariel",
  champion: "Patrick",
  mew: "Patrick / Lead Adult",
};
const approvedPhoneCaptains = {
  orientation: "Patrick",
  fairy: "Patrick",
  "oak-water": "Polly or Auntie Ariel",
  "nurse-joy": "Patrick",
  rocket: "Patrick or Auntie Ariel",
  vault: "Adult Escort",
  "oak-return": "Patrick",
  "victory-road": "Patrick",
  champion: "Auntie Ariel",
  mew: "Polly or Auntie Ariel when Patrick guides; Patrick when another adult guides",
};

const MISSION_COMPLETE_HOLD_LABEL = "Adult: Hold when the mission is complete";
/* A mission brief is read aloud to a seven-year-old, so no stage direction or
   operator vocabulary may appear in it. */
const FORBIDDEN_BRIEF_WORDS = /\b(cue|adult|phone|referee|optional)\b/i;

/* The challenge IDs the removed relay screens were named after. */
const relayChallengeIdByCueId = {
  orientation: "orientation-challenge",
  fairy: "fairy-challenge",
  "oak-water": "oak-challenge",
  "nurse-joy": "center-challenge",
  rocket: "rocket-challenge",
  vault: "vault-challenge",
  "oak-return": "oak-return-challenge",
  "victory-road": "victory-challenge-a",
  champion: "champion-challenge",
  mew: "mew-challenge",
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
const narratorTeaserIds = [
  "orientation-story",
  "fairy-story",
  "oak-story",
  "center-story",
  "rocket-story",
  "vault-story",
  "oak-return-travel",
  "victory-story",
  "mew-transmission",
];
narratorTeaserIds.forEach((sceneId) => {
  const teaser = locateScene(sceneId).scene;
  assert.strictEqual(teaser.type, "story", `${sceneId} must be narrator story, not performer dialogue`);
  assert.ok(teaser.body, `${sceneId} must retain a Luca-facing story teaser`);
  assert.strictEqual(teaser.dialogue, undefined, `${sceneId} must not show live performer dialogue`);
  assert.strictEqual(teaser.character, undefined, `${sceneId} must not present narrator copy as a performer quote`);
});
assert.strictEqual(locateScene("champion-character"), null, "The phone must not narrate the Champion's entrance before Patrick speaks");

Object.entries(cues).forEach(([cueId, cue]) => {
  assert.strictEqual(cue.performerName, approvedPerformers[cueId], `${cueId} performer must be explicitly approved`);
  assert.strictEqual(cue.phoneCaptain, approvedPhoneCaptains[cueId], `${cueId} must name the approved Phone Captain`);
  /* The cast core is what gets printed; its own labels stay adult-facing and
     must never reach a runtime screen. */
  assert.ok(cue.handoffLabel.startsWith("Adult: Hold to open"), `${cueId} printed guide must keep its adult label`);
  assert.ok(!/hand off|hand the phone|give the phone/i.test(cue.handoffLabel), `${cueId} must not instruct a phone handoff`);
  [
    "characterName",
    "entranceCue",
    "successCondition",
    "rewardPreparation",
    "fallback",
    "transitionLine",
    "transitionDestination",
    "completionLabel",
    "whenFinished",
    "runtimeBackup",
  ].forEach((field) => assert.ok(cue[field], `${cueId} is missing ${field}`));
  ["spokenLines", "challengeSteps", "runtimeSteps", "rewardPackages", "rewardOwners"].forEach((field) => {
    assert.ok(Array.isArray(cue[field]) && cue[field].length, `${cueId} is missing ${field}`);
  });

  /* No cast cue is rendered any more. Each printed guide backs exactly one
     player-facing mission brief, and that brief must leak none of the guide. */
  assert.strictEqual(
    sequences.flatMap((sequence) => sequence.scenes.filter((scene) => scene.type === "cast-cue")).length,
    0,
    "The runtime cast cue screen is printed, not rendered"
  );
  const matchingBriefs = sequences.flatMap((sequence) =>
    sequence.scenes.filter((scene) => scene.type === "cast-handoff" && scene.cueId === cueId)
  );
  assert.strictEqual(matchingBriefs.length, 1, `${cueId} must power exactly one player-facing mission brief`);
  const brief = matchingBriefs[0];
  assert.strictEqual(brief.audience, "luca");
  assert.strictEqual(brief.handoffLabel, MISSION_COMPLETE_HOLD_LABEL, `${cueId} brief must hold AFTER the mission`);
  assert.ok(brief.body, `${cueId} brief must tell Luca what is about to happen`);
  assert.ok(brief.characterName, `${cueId} brief must name who is waiting`);
  assert.ok(brief.body.trim().split(/\s+/).length < 25, `${cueId} brief must stay under 25 words`);
  assert.doesNotMatch(brief.body, FORBIDDEN_BRIEF_WORDS, `${cueId} brief must stay in Luca's world`);
  assert.doesNotMatch(brief.characterName, FORBIDDEN_BRIEF_WORDS, `${cueId} brief must not name an operator role`);
  [
    "performerName",
    "phoneCaptain",
    "waterSafetyAdult",
    "supportingRole",
    "spokenLines",
    "helpLucaSteps",
    "whenFinished",
    "easyBackup",
    "completionLabel",
    "entranceCue",
    "challengeSteps",
    "successCondition",
    "rewardPackages",
    "rewardOwners",
    "rewardPreparation",
    "fallback",
    "transitionLine",
    "transitionDestination",
  ].forEach((field) => {
    assert.strictEqual(brief[field], undefined, `${cueId} mission brief must hide Director field ${field}`);
  });
  const printedWords = [
    cue.spokenLines.join(" "),
    cue.runtimeSteps.join(" "),
    cue.whenFinished,
    cue.runtimeBackup,
  ].join(" ").trim().split(/\s+/).length;
  assert.ok(printedWords <= 125, `${cueId} printed guide must stay concise; found ${printedWords} words`);
});

assert.ok(!cues.fairy.handoffLabel.includes("Nina"), "Nina must never be named as the phone operator");
assert.ok(/optional/i.test(cues.fairy.supportingRole), "Nina’s participation must remain optional");
assert.ok(cues["oak-water"].waterSafetyAdult, "Oak Water Research must name a separate Water Safety Adult");
assert.ok(!cues["oak-water"].waterSafetyAdult.includes(cues["oak-water"].phoneCaptain), "Pool safety and phone roles must remain separate");
assert.ok(/Rayquaza/i.test(cues["victory-road"].characterName), "One Ariel cue must cover Victory Road and Rayquaza");
assert.ok(cues["victory-road"].runtimeSteps.some((step) => /Rayquaza/i.test(step)), "The combined Ariel cue must include the Rayquaza activity");

let relayCount = 0;
sequences.forEach((sequence) => {
  sequence.scenes.forEach((scene, index) => {
    if (scene.type !== "cast-handoff") return;
    relayCount += 1;
    const result = sequence.scenes[index + 1];

    assert.deepStrictEqual(
      [scene.type, result.type],
      ["cast-handoff", "relay-result"],
      `${scene.id} must preserve the two-beat player-facing relay`
    );
    assert.deepStrictEqual(
      [scene.audience, result.audience],
      ["luca", "luca"],
      `${scene.id} must keep both beats player-facing`
    );
    if (scene.cueId) assert.strictEqual(result.cueId, scene.cueId, `${scene.id} must pair with its own reveal`);

    /* Neither beat may carry the operator metadata that used to ride along on
       the private screens. */
    ["spokenLines", "helpLucaSteps", "whenFinished", "easyBackup", "performerName", "phoneCaptain", "waterSafetyAdult", "rewardHandoff", "logisticsRewardIds"].forEach((field) => {
      assert.strictEqual(scene[field], undefined, `${scene.id} leaks ${field}`);
      assert.strictEqual(result[field], undefined, `${result.id} leaks ${field}`);
    });

    /* The hold is the only way past a brief: an ordinary tap must not confirm a
       real-world mission that has not happened yet. */
    let relayState = stateAt(sequence, index);
    const blockedBrief = stateEngine.reducer(relayState, { type: "ADVANCE_SCENE" });
    assert.strictEqual(blockedBrief.currentSceneId, scene.id, `${scene.id} must resist an ordinary tap`);

    relayState = stateEngine.reducer(relayState, { type: "COMPLETE_RELAY_HOLD" });
    assert.strictEqual(relayState.currentSceneId, result.id, `${scene.id} must reveal the result once the hold completes`);

    const parentAdvanced = stateEngine.reducer(stateAt(sequence, index), { type: "PARENT_ADVANCE" });
    assert.strictEqual(parentAdvanced.currentSceneId, result.id, `Parent Mode must advance past ${scene.id}`);

    [scene, result].forEach((relayScene, offset) => {
      const exactState = stateAt(sequence, index + offset);
      const backedUp = stateEngine.reducer(exactState, { type: "PARENT_BACK_SCENE" });
      assert.strictEqual(
        backedUp.currentSceneIndex,
        index - 1 + offset,
        `Parent Mode must go back one scene from ${relayScene.id}`
      );

      memory.clear();
      assert.strictEqual(stateEngine.writeState(exactState), true);
      const restored = stateEngine.readState();
      assert.strictEqual(restored.currentSceneId, relayScene.id, `${relayScene.id} must survive refresh exactly`);
      assert.strictEqual(restored.currentSceneIndex, index + offset);
    });
  });
});
/* Ten printed guides plus the merged Legendary encounter, which absorbed the
   hold that used to live on its own adult control screen. */
assert.strictEqual(relayCount, Object.keys(cues).length + 1, "Every printed guide plus Rayquaza must gate on one hold");

/* Every scene ID the paper-cast rebuild removed must still resolve, so a
   mid-event refresh can never land on a screen that no longer exists. */
const removedSceneIds = Object.keys(cues)
  .flatMap((cueId) => ["-privacy", "", "-return", "-logistics"].map((suffix) => relayChallengeIdByCueId[cueId] + suffix))
  .concat(["victory-challenge-b-control"]);
assert.strictEqual(removedSceneIds.length, 41, "Forty relay screens plus the merged Legendary control were removed");
removedSceneIds.forEach((removedId) => {
  const owner = sequences.find((sequence) => Object.prototype.hasOwnProperty.call(sequence.sceneAliases || {}, removedId));
  assert.ok(owner, `${removedId} must have an alias so a refresh cannot strand anyone`);
  const target = owner.scenes.find((candidate) => candidate.id === owner.sceneAliases[removedId]);
  assert.ok(target, `${removedId} must alias to a scene that exists`);
  assert.strictEqual(target.audience, "luca", `${removedId} must alias to a player-facing scene`);
});

portal.director.operations.forEach((operation) => {
  operation.cueIds.forEach((cueId, index) => {
    assert.strictEqual(operation.runtimeCues[index], cues[cueId], `${operation.slug} must use the shared cue object for ${cueId}`);
  });
});

const rocketLocation = locateScene("rocket-challenge-handoff");
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
assert.strictEqual(migrated.currentSceneId, "rocket-challenge-handoff", "V2 challenge progress must migrate to the Luca mission brief");
assert.strictEqual(
  rocketLocation.sequence.scenes.some((scene) => scene.id === "rocket-challenge"),
  false,
  "The Rocket cast cue screen must be gone from the runtime"
);
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
/* The three private relay renderers are deleted outright. */
["function PrivacyShieldScreen", "function CastCueScreen", "function ReturnToPlayerScreen"].forEach((declaration) => {
  assert.ok(!screenSource.includes(declaration), `${declaration} must be deleted`);
});
['scene.type === "privacy-shield"', 'scene.type === "cast-cue"', 'scene.type === "return-to-player"'].forEach((branch) => {
  assert.ok(!screenSource.includes(branch), `CreeksideScene must not dispatch on ${branch}`);
});
["Turn the Screen Away", "Phone is turned away — open private cue", "Turn the Screen Back to Luca", "1. Say This", "2. Help Luca Do This", "3. When He Finishes", "4. Easy Backup"].forEach((copy) => {
  assert.ok(!screenSource.includes(copy), `Removed private-screen copy still present: ${copy}`);
});
assert.ok(!screenSource.includes('data-audience="cast"'), "No screen renders to the cast any more");

/* The mission brief screen: the hold confirms a FINISHED mission, and the brief
   still shows nothing operational. */
const handoffSource = screenSource.slice(
  screenSource.indexOf("function RelayHandoffScreen"),
  screenSource.indexOf("function CreeksideScene")
);
assert.ok(handoffSource.includes(MISSION_COMPLETE_HOLD_LABEL), "The hold must read as a completion confirmation");
assert.ok(!handoffSource.includes("Hold to begin the mission"), "The old start-of-mission hold must be gone");
assert.ok(handoffSource.includes("Put the phone away and go"), "The brief must send Luca out into the world");
assert.ok(!handoffSource.includes("Ready for the real-world mission"), "The pre-mission meta line must be gone");
assert.ok(!handoffSource.includes("phoneCaptain"), "The mission brief must not show Phone Captain operations");
assert.ok(!handoffSource.includes("AudienceIndicator"), "A fully player-facing brief needs no audience chrome");

/* The audience guard and Parent Mode audiences survive untouched. */
assert.ok(screenSource.includes("function AudienceIndicator"), "The indicator stays available for adult surfaces");
assert.ok(screenSource.includes("config.audiences.indexOf(scene.audience) === -1"), "The unknown-audience guard must remain");
assert.deepStrictEqual(Array.from(config.audiences), ["luca", "adult", "cast"], "Parent Mode still needs every audience name");
assert.ok(screenSource.includes('scene.type === "physical-challenge"'), "Parent Mode may still jump to a physical challenge");
assert.ok(screenSource.includes("Water Safety Adult"));
assert.ok(screenSource.includes('audience="luca"'));
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

console.log("Paper-cast relay tests passed.");
