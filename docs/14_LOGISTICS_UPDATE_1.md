# 14. Logistics Update 1 — Handoff Flow and Phone Ownership

## Release objective

V3.2 corrects the theatrical order without changing chapters, challenges,
rewards, progression, persistence, Parent Mode, the Cast Portal, or the static
deployment architecture.

The live performer’s entrance is no longer displayed to Luca before the
performer receives the private cue. Existing stable scene IDs remain in place
so saved progress and Parent Mode scene recovery continue to work.

## Runtime order

Every physical encounter follows:

1. Luca-facing narrator story establishes location, problem, and stakes.
2. The Phone Captain completes the named **open cue** hold.
3. The privacy shield confirms that the screen is turned away from Luca.
4. The performer reads the private Quick Card and runs the live challenge.
5. The Phone Captain completes the protected Mission Complete hold.
6. The return shield confirms that Luca can see the screen.
7. Luca sees the result, achievement, reward, and next destination.

The performer normally does not hold or operate the phone.

## Phone Captain assignments

| Encounter | Phone Captain |
|---|---|
| Trainer Orientation | Patrick |
| Fairy Garden | Patrick |
| Oak Water Research | Polly or Auntie Ariel |
| Pokémon Center | Patrick |
| Team Rocket | Patrick or Auntie Ariel |
| Ranger Vault | Adult Escort |
| Oak return | Patrick |
| Victory Road | Patrick |
| Rayquaza | Patrick |
| Champion match | Auntie Ariel |
| Mew trail | Polly or Auntie Ariel |

At Oak Water Research, a dedicated Water Safety Adult watches Luca
continuously and never operates the phone. The separate Phone Captain keeps the
device and operates both protected controls.

## Live Quick Card contract

The runtime cast cue shows only:

1. Say This
2. Help Luca Do This
3. When He Finishes
4. Easy Backup
5. Phone Captain’s protected Mission Complete control

Full entrance analysis, formal success criteria, package IDs, inventory and
gift ownership, safety documentation, and transition details remain in
Patrick’s Director view and the full rehearsal guides.

## Recovery contract

- An ordinary tap cannot complete either protected hold.
- Refresh restores the exact open-cue, privacy, cast cue, return, or result
  scene.
- Parent Mode override from a cast cue advances to the return shield.
- Parent Mode override from a return shield advances to Luca’s result.
- Back one scene continues to move exactly one stable scene.
- Nina is never assigned to operate the phone; her Fairy Garden role remains
  optional.

## Release markers

- Pre-change production rollback tag: `pre-v3.2-handoff-flow`
- Release tag after deployment: `v3.2-handoff-flow`
- Release tag message: `Correct theatrical handoffs and phone ownership`

The protected Ranger Vault information remains only on private physical
materials and is never stored in this repository.
