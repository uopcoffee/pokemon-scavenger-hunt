/* Paper League design implementation — License Ceremony, Quest Map destination
   plate, Trainer Record award classes, and the Award Earned celebration. */
const assert = require("assert");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const screens = fs.readFileSync(path.join(root, "screens.jsx"), "utf8");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");

/* --- Hand-tuned constants must stay as named values, not magic numbers --- */
assert.match(screens, /const PAPER_LEAGUE_ART = \{ hero: 156, plate: 90, detail: 72, tile: 46, license: 56 \}/);
assert.match(screens, /const CEREMONY_CALC_SECONDS = 3/);
assert.match(screens, /const CEREMONY_GOLD_SATURATION = 100/);
assert.match(screens, /const AWARD_REVEAL_PACE_MS = 600/);
assert.match(screens, /const LICENSE_BIRTHDAY = "AUGUST 1 · 2026"/);

/* --- Ceremony: adult-paced typewriter, nothing auto-plays --- */
assert.match(screens, /i \* 150/, "name types one letter every 150ms");
assert.match(screens, /i \* 70/, "birthday types at 70ms per character");
assert.match(screens, /ch \* 48/, "oath lines type at 48ms per character");
assert.match(screens, /Tap as he says his name/);
assert.match(screens, /Waiting for his name/, "birthday slot stays locked until the name lands");
assert.match(screens, /Tap after he repeats line \$\{index \+ 1\}/);
assert.match(screens, /Line \$\{index \+ 1\} locked/);
assert.match(screens, /Tap to<br \/>assign buddy/);

/* The caret must leave the layout entirely when typing stops — an opacity of 0
   cannot beat a running keyframe that animates opacity. */
assert.match(screens, /\{!c\.nameDone && <span className="license-caret" aria-hidden \/>\}/);
assert.match(screens, /\{typing && <span className="license-caret license-caret--sm"/);

/* --- Ceremony: the three-beat birthday reveal --- */
assert.match(screens, /calc: false, flood: true/, "calculating hands off to the flood");
assert.match(screens, /update\(\{ badge: true \}\)/, "the badge pops after the flood");
assert.match(screens, /license-calculating__bar/);
assert.match(screens, /Cross-checking League records…/);
assert.match(screens, /license-badge__numeral/);
assert.match(screens, /Creekside League Record/);

/* Seven appears exactly once on the card: the giant numeral carries it. */
assert.strictEqual((screens.match(/\{LICENSE_AGE\}/g) || []).length, 1);

/* --- Ceremony: completion hands the party back to the quest --- */
assert.match(screens, /License issued\. Chapter 1 cleared — Nina is waiting at the Fairy Garden\./);
assert.match(screens, /Back to the Quest Map →/);
assert.match(screens, /data-testid="license-back-to-map"/);

/* Every pending typewriter timer must be cancellable on reset and unmount. */
assert.match(screens, /const clearTimers = \(\) => \{ timers\.current\.forEach\(clearTimeout\); timers\.current = \[\]; \}/);
assert.match(screens, /React\.useEffect\(\(\) => clearTimers, \[\]\)/);
assert.match(screens, /const reset = \(\) => \{\n\s*clearTimers\(\);/);

/* --- Quest Map: the destination plate --- */
assert.match(screens, /destination-plate__chevrons/);
assert.match(screens, /Go here next/);
assert.match(screens, /--plate-art-size/);
assert.match(styles, /\.destination-plate \{[\s\S]*?border: 2px solid var\(--mewtwo-y\)/);
assert.match(styles, /box-shadow: 0 14px 40px rgba\(75,58,143,\.18\)/);

/* --- Trainer Record: three award classes, derived from config --- */
assert.match(screens, /Class I · License/);
assert.match(screens, /Class II · Gym Badges/);
assert.match(screens, /Class III · Code Fragments/);
assert.match(screens, /earnedRewards\.includes\("trainer-license"\)/);
assert.doesNotMatch(screens, /Class IV/, "Ranger clues were folded into wayfinding, not a collected class");
/* The License is Class I; it must not double as a Class II gym badge. */
assert.match(screens, /rewardId !== "trainer-license"/);
/* Fragment chits show the symbolic label only — never a keypad digit. */
assert.match(screens, /fragment\.displaySymbol\.charAt\(0\)/);
assert.match(screens, /four real digits stay on the physical Ranger Code Card/);

/* --- Award Earned: rendered for the Luca-facing relay result --- */
assert.match(screens, /if \(scene\.type === "relay-result"\) \{\n\s*return \(\n\s*<AwardEarnedScreen/);
assert.match(screens, /awardCount === 1 \? "1 Award" : `\$\{awardCount\} Awards`/, "the headline is derived, never hardcoded");
assert.match(screens, /--hero-art-size/);
assert.match(screens, /award-earned__replay/);
/* The adult reward handoff must survive the redesign. */
assert.match(screens, /Adult: Hold for reward handoff/);
assert.match(screens, /Adult: Hold when Luca is ready/);

/* --- Shared motion set, and reduced motion is honored --- */
["cs-sweep", "cs-pop", "cs-rise", "cs-zoomin", "cs-ringout", "cs-dash", "cs-grow", "cs-scanbar", "cs-slidein", "cs-blink", "cs-waiting"]
  .forEach((name) => assert.match(styles, new RegExp("@keyframes " + name + " "), name + " must be defined once"));
assert.match(styles, /\[style\*="cs-"\] \{ animation: none !important; \}/);

console.log("V5 Paper League design tests passed.");
