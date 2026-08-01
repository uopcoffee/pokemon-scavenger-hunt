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
const cues = context.window.CREEKSIDE_CAST_CORES;
const sequences = [...config.chapters, config.checkpoint, config.epilogue];
const lucaScenes = sequences.flatMap((sequence) => sequence.scenes.filter((scene) => scene.audience === "luca"));
/* Every runtime scene is player-facing now, so the Luca-facing sweep below is a
   sweep of the entire scene inventory — there is no adult screen left to skip. */
const allScenes = sequences.flatMap((sequence) => sequence.scenes);
assert.strictEqual(lucaScenes.length, allScenes.length, "Every scene must be player-facing");

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
    /turn the screen away from Luca|Phone Captain|The phone returns|Read these names aloud|Adult fallback|Success rule|Real-world reward handoff|bag carrier|SAVE FOR CELEBRATION|OPEN NOW|No gift yet|record updated|League processing|Champion Chest unlocked|Hall of Fame updated|Mew registered/i,
    `${scene.id} contains adult or software language`
  );
});

/* The adult reward checklists are printed. Nothing renders them any more. */
assert.strictEqual(allScenes.filter((scene) => scene.type === "adult-logistics").length, 0);
assert.strictEqual(allScenes.filter((scene) => scene.logisticsRewardIds).length, 0);
assert.strictEqual(allScenes.filter((scene) => scene.rewardHandoff).length, 0);

/* The Legendary encounter is one merged player-facing screen: Rayquaza arrives
   and the same protected hold that lived on the separate control screen now
   releases the result. The mechanics stay on the printed cast guide. */
const rayquaza = config.chapters[6].scenes.find((scene) => scene.id === "victory-challenge-b");
assert.strictEqual(config.chapters[6].scenes.some((scene) => scene.id === "victory-challenge-b-control"), false);
assert.strictEqual(rayquaza.audience, "luca");
assert.strictEqual(rayquaza.type, "cast-handoff");
assert.strictEqual(rayquaza.handoffLabel, "Adult: Hold when the mission is complete");
assert.match(rayquaza.body, /Mega Rayquaza/);
assert.strictEqual(rayquaza.successRule, undefined, "The Legendary fallbacks belong on paper");
assert.match(cues["victory-road"].fallback, /move closer to Rayquaza or use a ring or three Sky symbols/i);

assert.strictEqual(config.epilogue.art, "mew.png");
assert.ok(fs.existsSync(path.join(root, "assets/pokemon/mew.png")));

const screens = fs.readFileSync(path.join(root, "screens.jsx"), "utf8");
assert.match(screens, /A birthday message for Luca/);
assert.match(screens, /WELCOME TO THE/);
assert.match(screens, /CREEKSIDE POKÉMON REGION!/);
assert.match(screens, /Today, Creekside Court has disappeared/);
assert.match(screens, /family and friends have become characters in the Pokémon world/);
assert.match(screens, /Your family is your Trainer team/);
assert.match(screens, /every challenge is designed for you to succeed/);
assert.match(screens, /He asked for you by name/);
assert.match(screens, /Answer the Call/);
assert.match(screens, /Adult: Hold when the mission is complete/, "The hold must confirm a finished mission, not start one");
assert.doesNotMatch(screens, /Hold to begin the mission/, "Adults must never confirm a challenge before it happens");
assert.match(screens, /Put the phone away and go/);
assert.match(screens, /Adult: Hold for reward handoff/);
assert.doesNotMatch(screens, /Finish League processing|Credits rolling…/);
assert.match(screens, /Close the League record/);
assert.match(screens, /Mythical encounter/);
assert.match(screens, /When Luca is ready, pass the phone quietly to an adult/);
assert.match(screens, /Adult: Hold when Luca is ready/);

assert.strictEqual(cues["oak-water"].performerName, "Professor Oak and Professor Monica");
assert.strictEqual(cues["oak-return"].performerName, "Professor Oak and Professor Monica");
assert.doesNotMatch(JSON.stringify(cues), /Professor Bruce/);

console.log("V4 storytelling audience tests passed.");
