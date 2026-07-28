# 04. App UX and State Model

## Product role of the app

The app is a mission controller, not the venue. It should:

- establish story
- reveal only the next destination
- brief characters and challenges
- display progress and earned rewards
- wait while physical play occurs
- let an adult confirm completion
- preserve state through refreshes
- provide recovery controls
- stage the Champion fake ending and Mew glitch

## Required screen inventory

1. Splash
2. Trainer setup
3. Trainer Oath / Orientation
4. Creekside Region Map
5. Story Transmission
6. Travel Clue
7. Character Encounter
8. Challenge Briefing
9. Optional Digital Warmup
10. Physical Challenge Standby
11. Adult Completion Confirmation
12. Reward Reveal
13. Team / Inventory Update
14. Code Fragment Recording
15. Chapter Complete
16. Oak Return Checkpoint
17. Victory Road Multi-Stage Progress
18. Champion Results
19. Hall of Heroes
20. Fake Credits
21. Glitch Interruption
22. Mew Footprint Quest
23. Mythical Encounter Reveal
24. Celebration Screen
25. Hidden Parent Mode

## Navigation model

Use a deterministic scene state machine rather than many independent booleans.

Recommended top-level state:

```js
{
  version: 2,
  trainer: {
    name: "Luca",
    avatarId: "..."
  },
  chapterIndex: 0,
  sceneIndex: 0,
  completedChapters: [],
  earnedBadges: [],
  team: [],
  inventory: [],
  codeFragmentsRecorded: [false, false, false, false],
  questItems: [],
  oakReturnComplete: false,
  championComplete: false,
  fakeCreditsComplete: false,
  mewEpilogueComplete: false,
  startedAt: null,
  updatedAt: null
}
```

Persist after every scene transition.

## Adult completion control

Physical challenge screen should show:

- challenge title
- large illustration
- concise rules
- optional hint
- status: “Complete this challenge in the real world”
- adult button labeled **Gym Leader: Hold to Confirm**

Interaction:

- press and hold for 1.5 seconds
- progress ring fills while held
- release early cancels
- completion produces haptic feedback when available and a success animation

## Parent Mode

Access through a two-second press on the header badge or a five-tap corner gesture.

Controls:

- resume current scene
- go back one scene
- mark current challenge complete
- jump to chapter
- jump to Oak return
- trigger Champion finale
- trigger Mew glitch
- export progress as JSON text
- restore progress from saved JSON text
- reset entire game with double confirmation

Parent Mode must not display the house-entry code.

## Map behavior

- Use an illustrated Creekside Region path rather than a literal street map.
- Locked chapters show silhouettes and mysterious labels.
- Reveal the next destination only when unlocked.
- 9 Creekside should appear as “Secret Ranger Vault,” not a visible access code.
- Mew is absent from the map until the glitch.

## Code-fragment UX

The app never asks for or displays the digits.

After each of Chapters 1-4:

1. Show the numbered fragment slot.
2. Say: “Write the digit from your physical fragment in Slot X on your Ranger Code Card.”
3. Adult confirms that Luca recorded it.
4. App marks only the slot as complete.

At Chapter 6:

- Show four completed symbolic fragment icons.
- Instruct Luca to read his physical code card and use the real keypad with an adult.
- No virtual keypad is needed.

## Fake finale and glitch

After Champion completion:

1. show victory animation
2. show Hall of Heroes
3. prompt group photo
4. run 8-12 seconds of fake credits
5. screen fades almost to black
6. subtle visual distortion and audio cue
7. text: “SIGNAL DETECTED”
8. Professor Oak transmission begins
9. Mew quest unlocks

The glitch must feel surprising but not scary.

## Accessibility and resilience

- Large touch targets
- High contrast
- Short paragraphs and read-aloud-friendly dialogue
- Reduced motion support
- Sound optional and never required
- Outdoor-readable text
- No challenge dependent on reading speed
- Offline operation after page load
- No external API calls
