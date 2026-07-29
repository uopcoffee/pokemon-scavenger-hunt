# 05. Content Configuration Schema

## Goal

Move from a flat list of identical stops to configurable chapters made of typed scenes. Keep content editable without changing rendering logic.

## Proposed global configuration

```js
window.CREEKSIDE_CONFIG = {
  version: 3,
  title: "Luca's Creekside Region",
  trainerTitle: "Trainer",
  storageKey: "luca-creekside-v2",

  settings: {
    adultHoldMs: 1500,
    enableSound: true,
    enableReducedMotion: false,
    hidePrivateAddressesInUi: true
  },

  participants: [
    { id: "ariel", displayName: "Auntie Ariel", role: "Pokémon League Recruiter" },
    { id: "nina", displayName: "Nina", role: "Fairy Gym Leader" },
    { id: "polly", displayName: "Nurse Joy", role: "Pokémon Center Leader" },
    { id: "oak", displayName: "Professor Oak", role: "Professor" },
    { id: "monica", displayName: "Professor Monica", role: "Water Research Professor and Oak's Research Partner" },
    { id: "mike", displayName: "Team Rocket Enforcer", role: "Team Rocket" },
    { id: "patrick", displayName: "Creekside Champion", role: "Champion" }
  ],

  chapters: [
    // See example below
  ],

  checkpoint: {
    id: "oak-return",
    afterChapterId: "secret-ranger-vault",
    scenes: []
  },

  finale: {},
  epilogue: {}
};
```

## Chapter shape

```js
{
  id: "team-rocket-base",
  number: 5,
  publicName: "Team Rocket Basketball Base",
  lockedName: "Intercepted Signal",
  type: "dark",
  locationLabel: "Team Rocket Base",
  participantIds: ["mike"],
  art: "team-rocket.png",
  badge: {
    id: "rocket-badge",
    label: "Rocket Badge",
    icon: "rocket-badge.svg"
  },
  scenes: [
    {
      id: "transmission",
      type: "dialogue",
      speakerId: "mike",
      lines: ["You'll never recover the Ranger Dispatch!"]
    },
    {
      id: "challenge",
      type: "physical-challenge",
      title: "Break Team Rocket's Defense",
      instructions: [
        "Make one close basket.",
        "Earn three defense points.",
        "Finish with the Final Poké Shot."
      ],
      completionMode: "adult-hold",
      fallbackText: "Move the shooting marker closer and continue."
    },
    {
      id: "reward",
      type: "reward",
      rewards: ["nidoking-ex", "incineroar-ex", "mega-pyroar-ex", "destined-rivals-pack"],
      questItems: ["ranger-dispatch"]
    }
  ],
  transition: {
    title: "The Secret Ranger Vault",
    text: "The four fragments finally have a purpose."
  }
}
```

## Supported scene types

- `dialogue`
- `story`
- `travel-clue`
- `character-encounter`
- `digital-warmup`
- `physical-challenge`
- `adult-confirmation`
- `reward`
- `inventory-update`
- `code-fragment-record`
- `checkpoint`
- `multi-stage-progress`
- `hall-of-heroes`
- `fake-credits`
- `glitch`
- `epilogue-clue`
- `celebration`

V3 adds:

- `cast-handoff` — Luca-facing named cue-opening control with protected hold;
  the Phone Captain keeps the phone
- `privacy-shield` — adult-only confirmation before any cue is mounted
- `cast-cue` — concise performer operations
- `return-to-player` — adult-only confirmation before revealing the outcome
- `relay-result` — Luca-facing achievement immediately after the return shield
- `adult-logistics` — adult-only reward manifest and physical handoff checklist

The state-bearing `relay-result` retains `rewardIds` for progression but renders
only the emotional result, one reveal item, symbolic fragment progress, and
`nextDestination`. The following `adult-logistics` scene renders
`logisticsRewardIds`, `rewardHandoff`, dispositions, and private fragment
procedure only after a protected adult hold.

Sequences may also declare `sceneAliases` for removed V3.2 IDs. Aliases are
migration metadata only and never create extra runtime screens.

Every scene must also declare one of the configured audience values:

```js
{
  id: "center-challenge-handoff",
  type: "cast-handoff",
  audience: "luca"
}
```

Scene IDs are stable and globally unique across chapters, checkpoint, and
epilogue.

## Shared cast cue source

`cast-core.js` owns the concise operational fields shared by the live relay and
the Cast Portal:

```js
{
  id,
  portalGuide,
  performerName,
  characterName,
  phoneCaptain,
  waterSafetyAdult,
  supportingRole,
  entranceCue,
  spokenLines,
  challengeSteps,
  runtimeSteps,
  whenFinished,
  runtimeBackup,
  successCondition,
  rewardPackages,
  rewardOwners,
  rewardPreparation,
  fallback,
  transitionLine,
  transitionDestination,
  handoffStory,
  handoffLabel,
  completionLabel
}
```

`creekside-content.js` derives the runtime cast cue from these fields.
`cast/cast-data.js` attaches the same shared objects to the full rehearsal
guides, and `cast/cast.js` renders their live alignment summary. The Cast Portal
remains the detailed rehearsal document; the in-adventure cast scene remains a
short Quick Card.

The runtime scene copies only performer/character identity, Phone Captain
metadata, optional supporting-role metadata, spoken lines, `runtimeSteps`,
`whenFinished`, `runtimeBackup`, and the protected completion label. Package
IDs, reward ownership, formal success rules, entrance analysis, safety
documentation, and transitions stay in Director data and are not mounted in
the live cast cue.

## Reward registry

Rewards should be registered once and referenced by ID.

```js
rewards: {
  "mega-gallade-ex": {
    category: "team-card",
    label: "Mega Gallade ex",
    openNow: true,
    art: "rewards/mega-gallade-ex.jpg"
  },
  "journey-together-pack": {
    category: "booster",
    label: "Journey Together Booster",
    openNow: false,
    celebrationBucket: "booster-satchel"
  }
}
```

## Code-fragment rule

Code-fragment scenes contain only:

```js
{
  type: "code-fragment-record",
  slot: 1,
  prompt: "Record the physical digit in Slot 1."
}
```

There must be no `digit`, `value`, `answer`, or code-derived field anywhere in the repository.
