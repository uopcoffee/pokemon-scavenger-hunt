const assert = require("assert");
const fs = require("fs");

const screens = fs.readFileSync("screens.jsx", "utf8");
const styles = fs.readFileSync("styles.css", "utf8");

assert.match(screens, /function LicenseCeremony/);
assert.match(screens, /state\.view === "onboarding" && <LicenseCeremony/);
assert.match(screens, /I will protect Pokémon\./);
assert.match(screens, /I will help my friends\./);
assert.match(screens, /I will play fairly\./);
assert.match(screens, /I will never give up\./);
assert.match(screens, /creekside-license-ceremony-v1/);
assert.match(screens, /earnedRewards\.includes\("trainer-license"\)/);
assert.match(screens, /trainer-license-modal/);
assert.doesNotMatch(screens, /sequence\.id === "trainer-orientation".*LicenseCeremony/);
assert.match(styles, /perspective:1400px/);
assert.match(styles, /rotateY\(180deg\)/);

console.log("V4 Trainer License ceremony tests passed.");
