# 18. Storytelling and Audience Revision

## Objective

This revision preserves the chapter order, physical challenges, reward
mapping, theatrical relay, state schema, Parent Mode, Ranger privacy, Champion
ending, and adult-triggered Mew while preventing the mission controller from
exposing its own logistics to Luca.

## Result and reward contract

Each reward-bearing encounter now ends in two audience-specific beats:

1. Luca sees a concise emotional result, no more than one achievement line,
   symbolic Ranger progress when applicable, and the next story question.
2. A protected adult hold opens the product manifest, dispositions, Booster
   Satchel instructions, bag-carrier notes, reward handoff, and private
   fragment procedure.

`rewardIds` remain on the Luca result as non-rendered state effects so progress
and saved-state compatibility are unchanged. `logisticsRewardIds` are rendered
only on the adult continuation.

## Story changes

- Splash and onboarding frame the adventure as a summons, not a checklist.
- Ariel reveals that the League requested Luca by name.
- The four Ranger marks become a mystery beginning in Orientation.
- Fairy Garden frames Luca as helping Nina reach what she cannot safely reach.
- Nurse Joy asks Luca to make care decisions with the existing treatment props.
- Bruce and Monica are presented as equal Partner Professors.
- Monica identifies the skyward signal and later names Mega Rayquaza.
- The Oak return asks about the mystery; the Champion asks about the people who
  helped Luca.
- Team Rocket keeps the no-score structure and warranty joke.
- Hall of Heroes records deeds and memories rather than production roles.

## Finale protections

- Victory Road and Rayquaza still use Ariel's one continuous private cue.
- Luca sees only the Rayquaza story; the existing mechanics and protected hold
  render on an adult-only continuation.
- Patrick's spoken declaration owns the Champion title.
- Fake credits keep their delay without a visible countdown or processing text.
- The terminal Champion screen remains after the credits.
- The Mew epilogue uses Mew art, keeps operational instructions adult-only, and
  ends with the restrained line: “Not captured. Not earned.”

## Verification

`tests/v4-storytelling-audience.test.js` audits Luca-facing scene fields,
Rayquaza audience separation, Mew artwork, protected reward continuation, and
fake-credit language. Existing V2/V3 migration and theatrical relay tests
remain required.
