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
- Fairy Garden frames Luca as helping Nina recover eight glowing lights she
  cannot reach. An adult quietly forms the returned lights into an arrow,
  revealing the next destination only after the final light arrives.
- Nurse Joy asks Luca to make care decisions with the existing treatment props.
- Bruce consistently plays Professor Oak, while Monica remains an equal Partner
  Professor.
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
  frames the encounter as Mew freely choosing to appear.

## Corrective production pass

- Victory Road no longer shows Luca physical station or phone-handling
  instructions before Auntie Ariel performs the live introduction.
- Hall of Heroes uses emotional story framing instead of read-aloud or photo
  directions.
- Mew uses Mythical-specific result language and a quiet adult handoff instead
  of the ordinary mission-completion vocabulary.

## Verification

`tests/v4-storytelling-audience.test.js` audits Luca-facing scene fields,
Rayquaza audience separation, Mew artwork, protected reward continuation, and
fake-credit language. Existing V2/V3 migration and theatrical relay tests
remain required.
