/* Dependency-free Logistics Update 3 validation.
   Run from the repository root with: node tests/v3-real-world-logistics.test.js */
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const context = { window: {}, Array, Date, JSON, Math, Number, Object, Set };
vm.createContext(context);
["data.js", "cast-core.js", "creekside-content.js", "cast/cast-data.js"].forEach((file) => {
  vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context);
});

const config = context.window.CREEKSIDE_CONFIG;
const cues = context.window.CREEKSIDE_CAST_CORES;
const portal = context.window.CAST_PORTAL;
const allTrackedText = [
  fs.readFileSync(path.join(root, "cast-core.js"), "utf8"),
  fs.readFileSync(path.join(root, "creekside-content.js"), "utf8"),
  fs.readFileSync(path.join(root, "cast/cast-data.js"), "utf8"),
].join("\n");

assert.strictEqual(config.release, "3.4");

const oak = config.chapters.find((chapter) => chapter.id === "professor-oak-lab");
const safety = oak.scenes.find((scene) => scene.id === "oak-safety");
assert.deepStrictEqual(
  Array.from(safety.instructions),
  ["Walk near the pool, wait for the Professors’ signal, and retrieve only the marked capsules."]
);
assert.match(cues["oak-water"].runtimeSteps.join(" "), /Water Safety Adult.*Phone Captain.*Professors/);
assert.match(cues["oak-water"].runtimeSteps.join(" "), /Stow the phone safely away/i);
assert.match(cues["oak-water"].runtimeBackup, /skimmer.*dry-tub.*one capsule/i);
assert.match(JSON.stringify(oak.scenes), /Record the Wave clue in Slot 4\. One Ranger clue is still missing\./);

assert.match(cues.fairy.supportingRole, /never handles the phone/i);
assert.match(cues.fairy.supportingRole, /point.*basket.*one object.*lose interest.*skip/i);
assert.match(cues.rocket.challengeSteps.join(" "), /Close Basket.*Defense Target.*Final Poké Shot/);
assert.match(cues.rocket.challengeSteps.join(" "), /rim or backboard weakens/i);
assert.match(cues.rocket.challengeSteps.join(" "), /Luca always wins/i);

assert.match(cues.vault.entranceCue, /approved boundary.*keypad fallback.*outside fallback.*bag carrier/i);
assert.match(cues.vault.runtimeSteps.join(" "), /exit.*confirm outside/i);
assert.match(cues.vault.runtimeSteps.join(" "), /one story item/i);

const victory = config.chapters.find((chapter) => chapter.id === "victory-road");
assert.strictEqual(victory.scenes.filter((scene) => scene.type === "cast-cue" && scene.cueId === "victory-road").length, 1);
assert.ok(victory.scenes.find((scene) => scene.id === "victory-challenge-a-result"));
assert.ok(victory.scenes.find((scene) => scene.id === "victory-challenge-b"));
assert.ok(victory.scenes.find((scene) => scene.id === "victory-challenge-b-result"));
assert.match(cues["victory-road"].entranceCue, /single private cue.*Victory Road.*Rayquaza.*Champion summon/i);
assert.strictEqual(cues.champion.phoneCaptain, "Auntie Ariel");
assert.match(victory.scenes.find((scene) => scene.id === "hall-of-heroes").body, /Gather everyone who is here for the Champion photo\./);

assert.ok(portal.director.timeline.some((item) => /20–25 min/.test(item.window)));
assert.ok(portal.director.timeline.some((item) => /10–15 min sheltered reset/.test(item.window)));
assert.ok(portal.director.timeline.some((item) => /25–35 min combined finale/.test(item.window)));
assert.ok(portal.director.globalOperations.some((item) => /individual photos at neighbor stations/i.test(item)));

assert.doesNotMatch(allTrackedText, /\b(?:code|digit|pin|keypad)\s*[:=]\s*["']?\d{4}\b/i);
assert.doesNotMatch(allTrackedText, /\b\d{3}[-.)\s]\d{3}[-.\s]\d{4}\b/);

console.log("V3.4 real-world logistics tests passed.");
