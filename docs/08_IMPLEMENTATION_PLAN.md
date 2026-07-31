# 08. Implementation Plan

## Repository strategy

Use the existing repository. Preserve V1 before changes:

- branch: `archive/v1-original`
- annotated tag: `v1.0-original`
- working branch: `feature/creekside-v2`

Do not implement V2 directly on `main`. Merge only after a complete rehearsal.

## Existing architecture assessment

The current application already provides:

- static deployment from repository root
- vendored React, ReactDOM, and Babel
- a polished visual component library
- trainer onboarding
- a quest map
- clue, activity, gift, and finale screens
- data-driven stop configuration

The main architectural gap is that all stops currently follow the same simple clue → digital mini-game → gift loop. V2 needs typed scenes, physical challenge confirmation, multi-stage chapters, persistent state, checkpoint visits, and epilogue sequencing.

## Phase 1: Preserve and scaffold

1. Create archive branch and tag.
2. Create `feature/creekside-v2`.
3. Add this handoff package under `/docs` and root `AGENTS.md`.
4. Add a `window.CREEKSIDE_CONFIG` alongside the old config during migration.
5. Keep a temporary query parameter or Parent Mode switch to run V1 while V2 is under development.

## Phase 2: State machine and persistence

1. Replace flat `screen` orchestration with chapter/scene indices.
2. Add reducer-style actions:
   - `START_GAME`
   - `ADVANCE_SCENE`
   - `COMPLETE_CHALLENGE`
   - `RECORD_FRAGMENT`
   - `ADD_REWARD`
   - `COMPLETE_CHAPTER`
   - `RESTORE_PROGRESS`
   - `RESET_GAME`
3. Persist to `localStorage` after each reducer change.
4. Add config versioning so old saves can be discarded safely.

## Phase 3: Reusable V2 screens

Build generic renderers rather than hardcoding each chapter:

- `DialogueScreen`
- `TravelScreen`
- `CharacterEncounterScreen`
- `PhysicalChallengeScreen`
- `AdultHoldButton`
- `RewardRevealScreen`
- `InventoryUpdateScreen`
- `CodeFragmentScreen`
- `MultiStageProgressScreen`
- `CheckpointScreen`
- `HallOfHeroesScreen`
- `FakeCreditsScreen`
- `GlitchScreen`
- `EpilogueClueScreen`
- `CelebrationScreen`

## Phase 4: Moderator and resilience

1. Add hidden Parent Mode.
2. Add scene jump and challenge override.
3. Add progress export/restore.
4. Test refresh, back navigation, and accidental close.
5. Store the game-only yard-box combination `0151` in config; never frame it as a door or household access code.

## Phase 5: Content integration

1. Enter all chapter dialogue and challenge instructions from `02_CHAPTER_SPECIFICATIONS.md`.
2. Register all rewards from `03_GIFT_AND_WRAPPING_MAP.md`.
3. Add participant portraits or role illustrations.
4. Add badge and quest-item artwork.
5. Add Hall of Heroes entries.
6. Add fake credits and Mew glitch.

## Phase 6: Polish

- Keep current energy-field visual language.
- Add character-specific color treatments.
- Add subtle sound cues with a mute control.
- Add a progress animation for physical challenge completion.
- Add Mew glitch visuals that remain friendly.
- Add outdoor brightness and contrast checks.

## Recommended file changes

### `data.js`

- introduce participant registry
- introduce reward registry
- replace stops with chapter scene definitions
- do not include actual code digits

### `screens.jsx`

- implement scene renderer and state reducer
- add persistence
- add checkpoint, finale, credits, and epilogue orchestration

### `components.jsx`

- add DialogueCard
- add CharacterBadge
- add AdultHoldButton
- add RewardGrid
- add QuestInventory
- add CodeFragmentSlots
- add StageProgress
- add ModeratorDrawer

### `minigames.jsx`

- retain existing mini-games as optional warmups
- do not use them as the primary proof of completion
- add only lightweight warmups needed by content

### `styles.css`

- add physical-challenge, glitch, credits, moderator, and outdoor-readability styles

## Testing order

1. Content-less state-machine test
2. Chapter 1 through Chapter 7 progression
3. Oak checkpoint insertion
4. Refresh persistence
5. Parent Mode overrides
6. Fake finale to Mew epilogue
7. Full iPhone rehearsal
8. Full physical dress rehearsal with props
