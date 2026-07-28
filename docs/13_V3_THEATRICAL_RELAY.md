# 13. V3 Theatrical Relay Operating Model

## Purpose

V3 turns one phone into a controlled theatrical relay among Luca, the lead
adult, and the active performer without changing the chapter order, physical
activities, rewards, progression, static architecture, or protected Ranger
Vault information. The real-world encounter remains primary.

## Audience contract

Every runtime scene has:

- a stable, globally unique `id`
- an explicit `audience`: `luca`, `adult`, or `cast`

The content configuration, renderer, Parent Mode, state sanitizer, styles, and
tests all use this metadata. Audience is not inferred only from scene type.
Unknown audience values recover to a preceding Luca-facing scene, and the
renderer refuses to display them.

## Relay sequence

Each physical encounter follows one reusable sequence:

1. Luca sees the story and challenge introduction.
2. Luca sees the named performer and the lead adult completes a protected
   1.5-second handoff hold.
3. The privacy shield says to turn the phone away from Luca.
4. An adult explicitly opens the cast cue.
5. The performer reads the concise cue, runs the forgiving challenge, and
   completes a protected 1.5-second hold.
6. The return shield says to give the phone back to Luca.
7. An adult confirms Luca can see the phone.
8. Luca sees the achievement, reward, inventory, fragment, and transition
   sequence.

The privacy and return shields are independent scenes. Cast instructions are
not rendered behind them. A refresh restores whichever relay scene was
actually visible.

## Named handoffs

| Encounter | Performer |
| --- | --- |
| Trainer Orientation | Auntie Ariel |
| Fairy Garden | Nina with Auntie Ariel |
| Water Research mission | Professor Oak and Professor Monica |
| Pokémon Center | Polly as Nurse Joy |
| Team Rocket Base | Mike |
| Ranger Vault | Designated Adult Escort |
| Oak return | Professor Oak and Professor Monica |
| Victory Road | Auntie Ariel |
| Rayquaza | Auntie Ariel |
| Champion match | Patrick |
| Mew trail | Patrick or Lead Adult |

At the Water Research mission, Bruce performs Professor Oak, Monica performs
Professor Monica and manages research logistics, and a supervising adult owns
water safety. The safety adult is never required to handle the phone while
Luca is swimming.

## Content ownership

`cast-core.js` is the shared concise source for performer identity, character
identity, entrance cue, spoken lines, challenge steps, success condition,
reward package ownership, fallback, and transition.

`creekside-content.js` derives the live handoff and cast cue scenes from that
source. `cast/cast-data.js` attaches the same shared cue objects to each full
Cast Portal guide. The Cast Portal supplies long-form rehearsal details,
costumes, props, emergency versions, and placeholders; the runtime supplies the
short day-of Quick Card.

## Persistence and V2 migration

The existing localStorage key remains unchanged. V3 state adds
`currentSceneId` and continues writing `currentSceneIndex`.

For a V3 save, the stable ID is resolved first. For a V2 save without that ID,
the legacy sequence order maps the old numeric index to its original scene ID:

1. An old physical challenge maps to the new Luca-facing handoff.
2. Other original Luca content maps to the matching stable scene.
3. If neither is possible, restoration uses the nearest preceding Luca scene.
4. Final fallback is the beginning of the current sequence.

Migration preserves trainer identity, completed chapters, earned rewards,
fragment slots, checkpoint completion, fake credits, Mew unlock, and Mew
completion. Invalid or corrupt storage recovers to a clean initial state.

## Parent Mode

Parent Mode retains back, override/advance, chapter and scene jumps, Oak return,
Mew testing, JSON export/restore, map return, and double-confirmed reset.

The current-scene panel and complete directory show chapter, scene ID, title,
type, audience, and performer. An override from a cast cue advances to the
return shield. An override from the return shield may reveal Luca's result.
Scene jumps do not award skipped rewards.

## Party-day operating defaults

1. Lead adult keeps the phone by default.
2. Luca sees story, challenge, reward, and achievement moments.
3. Turn the phone away before opening cast instructions.
4. A safety adult does not handle the phone during pool or movement-heavy play.
5. Hand over the reward only after Luca sees the result.
6. Use Parent Mode and the documented fallback if a performer is delayed.

Cast screens are high contrast, mostly static, and usable one-handed. Sound is
off by default and never required. System reduced-motion preferences suppress
nonessential motion. No code digit, private address, phone number, credential,
or contact information belongs in the runtime, portal, source, tests, or docs.

## Local test procedure

From the repository root:

```sh
node tests/phase1-state.test.js
node tests/phase2-content.test.js
node tests/phase3-release.test.js
node tests/cast-portal.test.js
node tests/v3-audience-state.test.js
node tests/v3-theatrical-relay.test.js
```

Then serve the repository root from a local static server and review at
390×844 and 320×568:

1. Start onboarding and open Trainer Orientation.
2. Confirm an ordinary tap does not complete the handoff hold.
3. Complete the hold and confirm only the privacy shield appears.
4. Turn the phone away, open the cue, and confirm the correct performer,
   speaking lines, steps, success, fallback, reward preparation, and transition.
5. Complete the cast hold and confirm only the return shield appears.
6. Return the phone, reveal the result, and continue through the reward.
7. Refresh separately on handoff, privacy, cast, return, and result.
8. Open Parent Mode and inspect/jump through the full scene directory.
9. Review Cast Portal overview and each individual guide, including print
   preview.
10. Repeat the relay spot-check for Oak, Team Rocket, Champion, and Mew.
11. Confirm no horizontal overflow, inaccessible sticky controls, or
    console-blocking errors.
12. Enable reduced motion and confirm all instructions remain visible and
    progression remains complete.

All test reports must use `PASS`, `FAIL`, or `NOT TESTED`. Do not treat static
source inspection as a physical-device test.
