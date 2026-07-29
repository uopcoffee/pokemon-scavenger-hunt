/* Dependency-free storytelling audience validation.
   Run from the repository root with: node tests/v4-storytelling-audience.test.js */
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const context = { window: {}, Array, Date, JSON, Math, Number, Object, Set };
vm.createContext(context);
["data.js", "cast-core.js", "creekside-content.js"].forEach((file) => {
  vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context);
});

const config = context.window.CREEKSIDE_CONFIG;
const sequences = [...config.chapters, config.checkpoint, config.epilogue];
const lucaScenes = sequences.flatMap((sequence) => sequence.scenes.filter((scene) => scene.audience === "luca"));
const adultLogistics = sequences.flatMap((sequence) => sequence.scenes.filter((scene) => scene.type === "adult-logistics"));

lucaScenes.forEach((scene) => {
  [
    "rewardHandoff",
    "logisticsRewardIds",
    "performerName",
    "successRule",
    "fallbackText",
    "adultPrompt",
  ].forEach((field) => {
    assert.strictEqual(scene[field], undefined, `${scene.id} exposes adult field ${field}`);
  });
  const visibleText = [
    scene.title,
    scene.body,
    scene.resultLabel,
    scene.fragmentStory,
    scene.nextDestination,
    ...(scene.revealItems || []),
    ...(scene.instructions || []),
  ].filter(Boolean).join(" ");
  assert.doesNotMatch(
    visibleText,
    /turn the screen away from Luca|Phone Captain|Adult fallback|Success rule|Real-world reward handoff|bag carrier|SAVE FOR CELEBRATION|OPEN NOW|No gift yet|record updated|League processing|Champion Chest unlocked|Hall of Fame updated|Mew registered/i,
    `${scene.id} contains adult or software language`
  );
});

assert.strictEqual(adultLogistics.length, 9);
adultLogistics.forEach((scene) => {
  assert.strictEqual(scene.audience, "adult");
  assert.ok(Array.isArray(scene.logisticsRewardIds));
  assert.ok(scene.rewardHandoff);
});

const rayquazaStory = config.chapters[6].scenes.find((scene) => scene.id === "victory-challenge-b");
const rayquazaControl = config.chapters[6].scenes.find((scene) => scene.id === "victory-challenge-b-control");
assert.strictEqual(rayquazaStory.audience, "luca");
assert.strictEqual(rayquazaStory.type, "story");
assert.strictEqual(rayquazaControl.audience, "adult");
assert.strictEqual(rayquazaControl.type, "physical-challenge");
assert.match(rayquazaControl.successRule, /Legendary Assist/);

assert.strictEqual(config.epilogue.art, "mew.png");
assert.ok(fs.existsSync(path.join(root, "assets/pokemon/mew.png")));

const screens = fs.readFileSync(path.join(root, "screens.jsx"), "utf8");
assert.match(screens, /Hold to begin the mission/);
assert.match(screens, /Adult: Hold for reward handoff/);
assert.doesNotMatch(screens, /Finish League processing|Credits rolling…/);
assert.match(screens, /Close the League record/);

console.log("V4 storytelling audience tests passed.");
