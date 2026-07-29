# 15. Logistics Update 2 — Streamlined Real-World Pacing

## Release objective

V3.3 reduces phone time while preserving every story beat, physical challenge,
reward, badge, fragment, progression effect, privacy shield, and Phone Captain
assignment from V3.2. The app introduces, protects, records, and celebrates the
real adventure; it does not become the adventure.

## Runtime pattern

A standard encounter now uses:

1. one Luca-facing story/location screen
2. protected open-cue hold
3. privacy shield
4. concise private cast cue and live physical challenge
5. protected Mission Complete hold
6. return-to-Luca shield
7. one combined Luca-facing success screen
8. map return or the next meaningful story beat

The combined success screen may progressively reveal the achievement, badge,
team/inventory changes, reward disposition, symbolic fragment prompt, physical
gift handoff, and next destination. These remain separate data and state
effects even though they share one screen.

## Screen counts

| Sequence | V3.2 | V3.3 |
|---|---:|---:|
| Trainer Orientation | 13 | 6 |
| Fairy Garden | 14 | 7 |
| Professor Oak Water Research | 14 | 8 |
| Pokémon Center | 13 | 6 |
| Team Rocket Base | 12 | 6 |
| Secret Ranger Vault | 13 | 7 |
| Victory Road, Rayquaza, and Champion | 28 | 16 |
| Professor Oak return | 10 | 6 |
| Mew epilogue | 11 | 8 |
| **Total** | **128** | **70** |

No physical activity was removed to reach these counts.

## Connected finale

Auntie Ariel receives one private cue covering both Victory Road and Mega
Rayquaza. Patrick keeps the phone throughout those connected activities. The
screen returns to Luca only after the course and Legendary encounter are both
complete. Patrick's Champion appearance remains a separate protected cue
operated by Auntie Ariel.

## Onboarding and map

- Trainer name is prefilled as Luca and remains editable.
- Luca's map and runtime screens do not render clock times or adult setup text.
- Operational timing remains in Director View and the party-day guide.
- Mew is not mounted on the map at all until the postgame event unlocks.

## Physical rewards

Every combined success screen names the real package handoff and distinguishes
`OPEN NOW`, `CARRY FOR LATER`, and `SAVE FOR CELEBRATION`. The adult waits until
Luca sees the success reveal before handing over the physical package.

## Persistence

The storage key and version-3 state schema remain unchanged. Every remaining
runtime scene retains a stable, globally unique ID. `sceneAliases` migrate
removed V3.2 briefing, reward, inventory, fragment, transition, and separate
Rayquaza positions to the nearest safe V3.3 handoff or combined success screen.
V2 numeric migration remains active.

## Release markers

- Pre-change production rollback tag: `pre-v3.3-streamlined-flow`
- Release tag: `v3.3-streamlined-flow`
- Release tag message: `Streamline screens and real-world pacing`
