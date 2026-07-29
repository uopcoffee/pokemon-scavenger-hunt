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

1. Luca sees a narrator story and challenge introduction. The live performer’s
   entrance lines are not shown.
2. Luca sees the named performer and the Phone Captain completes a protected
   1.5-second **open cue** hold while keeping the phone.
3. The privacy shield says to turn the phone away from Luca.
4. An adult explicitly opens the cast cue.
5. The performer reads the concise Quick Card and runs the forgiving challenge.
6. The Phone Captain completes the protected Mission Complete hold.
7. The return shield says to turn the screen back toward Luca.
8. An adult confirms Luca can see the screen; the adult may keep holding the
   phone.
9. Luca sees one combined achievement screen with reward disposition, physical
   handoff timing, team/inventory/fragment update, and next destination.

The privacy and return shields are independent scenes. Cast instructions are
not rendered behind them. A refresh restores whichever relay scene was
actually visible.

## Named cues and Phone Captains

| Encounter | Performer | Phone Captain |
| --- | --- | --- |
| Trainer Orientation | Auntie Ariel | Patrick |
| Fairy Garden | Auntie Ariel with Nina’s optional help | Patrick |
| Water Research mission | Professor Bruce and Professor Monica | Polly or Auntie Ariel |
| Pokémon Center | Polly as Nurse Joy | Patrick |
| Team Rocket Base | Mike | Patrick or Auntie Ariel |
| Ranger Vault | Designated Adult Escort | Adult Escort |
| Oak return | Professor Bruce and Professor Monica | Patrick |
| Victory Road + Rayquaza (one continuous cue) | Auntie Ariel | Patrick |
| Champion match | Patrick | Auntie Ariel |
| Mew trail | Patrick or Lead Adult | Polly or Auntie Ariel |

At the Water Research mission, Bruce and Monica are equal Partner Professors.
A dedicated Water Safety Adult watches Luca continuously. That person never
operates the phone while Luca is in or near the pool; Polly or Auntie Ariel is
the separate Phone Captain.

## Content ownership

`cast-core.js` is the shared source for performer identity, character identity,
Phone Captain, optional Water Safety Adult/supporting-role metadata, spoken
lines, runtime steps, finish action, backup, entrance cue, full operations,
reward package ownership, fallback, and transition.

`creekside-content.js` derives the live handoff and cast cue scenes from that
source. The participant-facing Cast Portal contains short, friendly cameo
guides written for family members and neighbors. These pages make clear that
Pokémon knowledge, memorized lines, costumes, and acting skill are optional.
Patrick brings the important supplies and gives the start and gift signals.

Detailed timing, exact package IDs, prop and safety ownership, fragment
reminders, setup decisions, fallbacks, spoilers, and shared runtime cue
alignment live separately at `/cast/director/`. Participants do not need to
read the Director view. `cast/cast-data.js` attaches the shared cue objects only
to the Director operations model, preventing production detail from leaking
back into the friendly participant pages.

The runtime cast cue copies only performer/character identity, Phone Captain
metadata, optional supporting-role metadata, Say This, Help Luca Do This, When
He Finishes, Easy Backup, and the protected Mission Complete label. Package
IDs, inventory ownership, formal success terminology, safety documentation,
entrance analysis, and transitions are not mounted in the live Quick Card.

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
type, audience, performer, Phone Captain, and Water Safety Adult when
applicable. An override from a cast cue advances to the return shield. An
override from the return shield may reveal Luca's result. Scene jumps do not
award skipped rewards.

## Party-day operating defaults

1. Lead adult keeps the phone by default.
2. Luca sees story, challenge, reward, and achievement moments.
3. Turn the phone away before opening cast instructions.
4. The performer normally does not hold or operate the phone; the assigned
   Phone Captain opens cues and completes Mission Complete.
5. The Water Safety Adult does not handle the phone during pool activity.
6. Hand over the reward only when the combined result explicitly calls for the
   real-world handoff.
7. Use Parent Mode and the documented fallback if a performer is delayed.

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
node tests/v3-streamlined-flow.test.js
node tests/v3-theatrical-relay.test.js
```

Then serve the repository root from a local static server and review at
390×844 and 320×568:

1. Start onboarding and open Trainer Orientation.
2. Confirm an ordinary tap does not complete the open-cue hold.
3. Complete the hold and confirm only the privacy shield appears.
4. Turn the phone away, open the cue, and confirm the correct performer,
   Phone Captain, speaking lines, Luca steps, finish action, and easy backup.
   Confirm package IDs, ownership, and transition analysis are absent.
5. Have the Phone Captain complete Mission Complete and confirm only the return
   shield appears.
6. Turn the screen back toward Luca, reveal the result, and continue through
   the reward.
7. Refresh separately on handoff, privacy, cast, return, and result.
8. Open Parent Mode and inspect/jump through the full scene directory.
9. Review the Cast Portal overview and the Bruce/Monica, Polly, Mike, Ariel,
   Nina, and Patrick guides. Confirm each feels complete within the first
   screen and uses only the seven friendly sections.
10. Review `/cast/director/` separately for timeline, package IDs, safety,
    setup, fallbacks, decisions, and runtime cue alignment.
11. Print-preview the participant guides. Polly, Mike, and Nina should fit one
    page; Bruce/Monica and Ariel must fit within two pages. Navigation and the
    Director link must not print.
12. Repeat the relay spot-check for Oak, Team Rocket, Champion, and Mew.
13. Confirm no horizontal overflow, inaccessible sticky controls, or
    console-blocking errors.
14. Enable reduced motion and confirm all instructions remain visible and
    progression remains complete.

All test reports must use `PASS`, `FAIL`, or `NOT TESTED`. Do not treat static
source inspection as a physical-device test.
