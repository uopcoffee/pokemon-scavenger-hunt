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

The list below describes supported moments, not a requirement to render each
moment as a separate tap. Logistics Update 2 combines ordinary mission success,
badge, reward, inventory, fragment, and transition information into one
Luca-facing success screen.

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

### V3 audience and stable-position contract

V3 preserves the same state machine and storage key while adding two safeguards:

- Every runtime scene has a globally unique `id` and an explicit `audience` of
  `luca`, `adult`, or `cast`.
- Newly saved progress includes both `currentSceneId` and
  `currentSceneIndex`. The stable ID is authoritative; the index remains for
  compatibility and debugging.

The live state schema is version 3. Valid version-2 saves are migrated instead
of discarded. An old numeric scene index is first resolved against the
preserved V2 scene-ID list. If that content became a relay, restoration lands
on its Luca-facing handoff, never the private cast cue. Otherwise restoration
uses the matching Luca scene, the nearest preceding Luca scene, or the
sequence beginning. Trainer identity, completed chapters, rewards, fragments,
checkpoint state, fake-credit state, and Mew state are retained.

V3.3 also keeps aliases for V3.2 scene IDs removed during consolidation. A save
on a removed briefing returns to the protected handoff; a save on a removed
reward, inventory, fragment, or transition screen returns to the combined
success screen. A save inside the former separate Rayquaza relay returns to the
Luca-facing start of the combined Victory Road/Rayquaza cue.

Unknown or missing audience values fail safely to a preceding Luca-facing
scene. The renderer also refuses to render an unknown audience.

### V3 theatrical relay

Every substantial physical encounter uses this deterministic sequence:

1. Luca-facing narrator story and challenge introduction, without the live
   performer’s spoken lines
2. Luca-facing named cue-opening control with a 1.5-second adult hold; the
   designated Phone Captain keeps the phone
3. Adult-only privacy shield
4. Cast-only Quick Card: Say This, Help Luca Do This, When He Finishes, and
   Easy Backup
5. Phone Captain completes the protected Mission Complete hold
6. Adult-only return-to-player shield; the Phone Captain turns the screen back
   toward Luca without handing over the device
7. One Luca-facing combined achievement screen with reward, inventory,
   fragment, and transition information

The cast cue is a separate scene. It is not mounted behind the privacy shield,
hidden with CSS, or exposed in the shield's accessibility tree.

Recommended top-level state:

```js
{
  version: 3,
  trainer: {
    name: "Luca",
    avatarId: "..."
  },
  currentChapterId: "trainer-orientation",
  currentSceneIndex: 0,
  currentSceneId: "orientation-story",
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

In V3, Parent Mode also shows the current chapter, stable scene ID, scene type,
audience, performer, Phone Captain, and Water Safety Adult when applicable. Its
scene directory exposes the same metadata for every chapter, the Oak return
checkpoint, and the Mew epilogue. Overriding a cast cue advances only to the
return shield; overriding the return shield may advance to Luca's result.

## Map behavior

- Use an illustrated Creekside Region path rather than a literal street map.
- Locked chapters show silhouettes and mysterious labels.
- Reveal the next destination only when unlocked.
- The protected destination should appear only as “Secret Ranger Vault,” never as an address or visible access code.
- Clock times and adult scheduling details are absent from Luca's map.
- Mew has no locked silhouette or “Unknown Signal” row. It is completely absent
  from the map until the postgame event unlocks.

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
