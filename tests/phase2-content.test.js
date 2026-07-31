/* Dependency-free production-content validation.
   Run from the repository root with: node tests/phase2-content.test.js */
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const repositoryRoot = path.resolve(__dirname, "..");
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(repositoryRoot, "data.js"), "utf8"), context);
vm.runInContext(fs.readFileSync(path.join(repositoryRoot, "cast-core.js"), "utf8"), context);
vm.runInContext(fs.readFileSync(path.join(repositoryRoot, "creekside-content.js"), "utf8"), context);

const config = context.window.CREEKSIDE_CONFIG;
const expectedChapterNames = [
  "Trainer Orientation",
  "Fairy Garden Rescue",
  "Professor Oak's Water Research Lab",
  "Pokémon Center Emergency",
  "Team Rocket Basketball Base",
  "Secret Ranger Vault",
  "Victory Road and Champion Battle",
];
const requiredParticipants = ["ariel", "nina", "bruce", "monica", "polly", "mike", "patrick", "hannah", "noa"];
/* The paper-cast rebuild leaves two runtime beats per live encounter: the
   player-facing mission brief and the player-facing reveal. */
const requiredChapterSceneTypes = ["story", "cast-handoff", "relay-result"];
const removedSceneTypes = ["privacy-shield", "cast-cue", "return-to-player", "adult-logistics"];
const validDispositions = ["OPEN NOW", "CARRY FOR LATER", "SAVE FOR CELEBRATION"];

assert.deepStrictEqual(Array.from(config.chapters, (chapter) => chapter.name), expectedChapterNames);
assert.deepStrictEqual(Array.from(config.participants, (participant) => participant.id), requiredParticipants);
assert.strictEqual(config.release, "4.0");
assert.strictEqual(config.settings.startTime, "9:30 a.m.");
assert.strictEqual(config.settings.targetChampionTime, "about 12:15 p.m.");
assert.ok(config.chapters[2].scheduleLabel.includes("10:15"), "Professor Oak arrival must target 10:15");
assert.ok(config.checkpoint.scheduleLabel.includes("11:17"), "Oak return checkpoint must finish before noon");

const coreMinutes = config.chapters.reduce((total, chapter) => total + chapter.targetMinutes, 0) + config.checkpoint.targetMinutes;
assert.strictEqual(coreMinutes, 120, "Core route must run from 9:30 to approximately 11:30");

config.chapters.forEach((chapter) => {
  const sceneTypes = chapter.scenes.map((scene) => scene.type);
  requiredChapterSceneTypes.forEach((sceneType) => {
    assert.ok(sceneTypes.includes(sceneType), `${chapter.name} must include ${sceneType}`);
  });
  removedSceneTypes.forEach((removedType) => {
    assert.ok(!sceneTypes.includes(removedType), `${chapter.name} must not ship a ${removedType} screen`);
  });
  chapter.scenes.forEach((scene) => {
    assert.strictEqual(scene.audience, "luca", `${scene.id} must be player-facing`);
  });
  assert.ok(chapter.scenes.length <= (chapter.id === "victory-road" ? 10 : 5), `${chapter.name} exceeds its paper-cast screen-count target`);
  chapter.scenes.filter((scene) => scene.type === "relay-result").forEach((scene) => {
    assert.ok(scene.resultLabel, `${scene.title} must name its combined achievement`);
    assert.ok(scene.nextDestination, `${scene.title} must include its story transition`);
    assert.strictEqual(scene.rewardHandoff, undefined, `${scene.title} must not expose reward logistics to Luca`);
    assert.ok(scene.revealItems.length <= 1, `${scene.title} must keep Luca's emotional reveal concise`);
  });
  /* Reward logistics now live on the printed gift map, so no runtime screen may
     carry them and every mission brief must stay short enough to read aloud. */
  chapter.scenes.forEach((scene) => {
    assert.strictEqual(scene.rewardHandoff, undefined, `${scene.id} must not carry reward logistics`);
    assert.strictEqual(scene.logisticsRewardIds, undefined, `${scene.id} must not carry an adult reward manifest`);
    assert.strictEqual(scene.spokenLines, undefined, `${scene.id} must not carry performer lines`);
    assert.strictEqual(scene.helpLucaSteps, undefined, `${scene.id} must not carry live challenge steps`);
  });
  chapter.scenes.filter((scene) => scene.type === "cast-handoff").forEach((scene) => {
    assert.ok(scene.body, `${scene.title} must tell Luca what is about to happen`);
    assert.ok(scene.body.trim().split(/\s+/).length < 25, `${scene.title} must stay under 25 words`);
    assert.ok(scene.characterName, `${scene.title} must name who is waiting`);
    assert.strictEqual(
      scene.handoffLabel,
      "Adult: Hold when the mission is complete",
      `${scene.title} must hold AFTER the real-world mission, never before it`
    );
  });
});

const assignedRewards = [];
config.chapters.forEach((chapter) => chapter.scenes.forEach((scene) => assignedRewards.push(...(scene.rewardIds || []))));
config.checkpoint.scenes.forEach((scene) => assignedRewards.push(...(scene.rewardIds || [])));
config.epilogue.scenes.forEach((scene) => assignedRewards.push(...(scene.rewardIds || [])));
assert.strictEqual(new Set(assignedRewards).size, assignedRewards.length, "Each reward must be assigned once");
assert.deepStrictEqual(Array.from(new Set(assignedRewards)).sort(), Object.keys(config.rewards).sort(), "Every registered reward must be assigned");
Object.entries(config.rewards).forEach(([rewardId, item]) => {
  assert.ok(item.label, `${rewardId} must have a label`);
  assert.ok(item.packageId, `${rewardId} must have a parent-facing package ID`);
  assert.ok(validDispositions.includes(item.disposition), `${rewardId} must have a valid disposition`);
});

const fragmentChapters = config.chapters
  .filter((chapter) => chapter.scenes.some((scene) => Number.isInteger(scene.fragmentSlot)))
  .map((chapter) => chapter.number);
assert.deepStrictEqual(Array.from(fragmentChapters), [2, 3, 4, 5], "All fragments must be earned before the Ranger Vault");
assert.strictEqual(config.chapters[5].requiresFragments, 4);

// Ranger Code Card arc: Chapter 1 hands over a blank card; one mark per chapter
// through Chapters 2–5, in chronological slot order, all before the vault.
const orientationChapter = config.chapters.find((chapter) => chapter.id === "trainer-orientation");
assert.strictEqual(
  orientationChapter.scenes.some((scene) => Number.isInteger(scene.fragmentSlot)),
  false,
  "Trainer Orientation must hand over a blank card with no fragment moment"
);
// One mark per chapter, recorded once on the Luca-facing result screen. The
// duplicate on the old adult logistics screen is gone, so this must stay unique.
const chapterSlots = (chapter) => {
  const slots = chapter.scenes.filter((scene) => Number.isInteger(scene.fragmentSlot)).map((scene) => scene.fragmentSlot);
  assert.strictEqual(new Set(slots).size, slots.length, `${chapter.id} must record each mark on exactly one screen`);
  return slots;
};
const orderedSlots = Array.from(config.chapters).flatMap(chapterSlots);
assert.deepStrictEqual(orderedSlots, [1, 2, 3, 4], "Fragment slots must fill chronologically with no duplicates");
const rocketChapter = config.chapters.find((chapter) => chapter.id === "team-rocket-base");
assert.ok(
  rocketChapter.scenes.some((scene) => scene.fragmentSlot === 4),
  "The final mark must be earned at the Team Rocket Base alongside the Ranger Dispatch"
);
const vaultChapterIndex = config.chapters.findIndex((chapter) => chapter.id === "secret-ranger-vault");
const slotsBeforeVault = Array.from(config.chapters).slice(0, vaultChapterIndex).flatMap(chapterSlots);
assert.deepStrictEqual(slotsBeforeVault, [1, 2, 3, 4], "All four slots must be earned before the Secret Ranger Vault");
const fairy = config.chapters.find((chapter) => chapter.id === "fairy-garden");
const fairyStory = fairy.scenes.find((scene) => scene.id === "fairy-story");
const fairyResult = fairy.scenes.find((scene) => scene.id === "fairy-challenge-result");
assert.match(fairyStory.body, /Eight glowing Fairy Lights.*Nina knows where they are/i);
assert.match(fairyResult.body, /eight lights.*formed an arrow/i);
assert.match(fairyResult.nextDestination, /Professor Oak and Professor Monica/i);
assert.strictEqual(fairyResult.rewardIds.length, 5, "Fairy rewards must remain unchanged");
config.codeFragments.forEach((fragment) => {
  ["digit", "value", "answer", "code"].forEach((forbiddenKey) => {
    assert.strictEqual(Object.prototype.hasOwnProperty.call(fragment, forbiddenKey), false);
  });
  assert.strictEqual(/[0-9]/.test(fragment.displaySymbol), false);
});

assert.strictEqual(config.checkpoint.afterChapterId, "secret-ranger-vault");
assert.ok(config.chapters[6].scenes.some((scene) => scene.type === "hall-of-heroes"));
assert.ok(config.chapters[6].scenes.some((scene) => scene.type === "fake-credits" && scene.durationMs >= 8000 && scene.durationMs <= 12000));
assert.strictEqual(config.chapters[6].scenes.filter((scene) => scene.cueId === "victory-road" && scene.type === "cast-handoff").length, 1);
assert.strictEqual(config.chapters[6].scenes.some((scene) => scene.cueId === "rayquaza"), false);
assert.strictEqual(config.epilogue.scenes[0].type, "glitch");
assert.strictEqual(config.epilogue.scenes.some((scene) => scene.id === "mew-challenge"), false, "The Mew cast cue screen is printed, not rendered");
assert.ok(config.epilogue.scenes.some((scene) => scene.id === "mew-challenge-handoff" && scene.type === "cast-handoff"));
assert.ok(config.epilogue.scenes.some((scene) => scene.type === "relay-result" && scene.rewardIds.includes("mew-figure")));

const publicConfigText = JSON.stringify(config);
assert.strictEqual(/\b(?:8|9|10|11) Creekside\b/.test(publicConfigText), false, "Player-facing config must not expose household numbers");

console.log("Phase 2 content tests passed.");
