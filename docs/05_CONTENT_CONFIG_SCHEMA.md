# 05. Content Configuration Schema

## Goal

Move from a flat list of identical stops to configurable chapters made of typed scenes. Keep content editable without changing rendering logic.

## Proposed global configuration

```js
window.CREEKSIDE_CONFIG = {
  version: 2,
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
    { id: "monica", displayName: "Research Assistant Monica", role: "Research Assistant" },
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
  locationLabel: "8 Creekside",
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
