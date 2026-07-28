/* ============================================================
   Stop configuration — edit this to change the hunt.
   Each stop: { number, name, type, clueText, hintText,
                activityType, giftLocationText }
   activityType is one of: "type-match" | "shadow-guess" | "tap-ball" | "memory"
   The hunt works with any number of stops; just add/remove entries.
   ============================================================ */
window.LUCA_CONFIG = {
  trainerTitle: "Trainer",
  /* Real Pokémon GO sprites (assets/pokemon/, personal party use — PokeMiners/pogo_assets). */
  artBase: "assets/pokemon/",
  avatars: [
    { id: "tropius", name: "Tropius", img: "tropius.png" },
    { id: "pikachu", name: "Pikachu", img: "pikachu.png" },
    { id: "charizard", name: "Mega Charizard", img: "mega-charizard-y.png" },
    { id: "lucario", name: "Mega Lucario", img: "mega-lucario.png" },
    { id: "blastoise", name: "Mega Blastoise", img: "mega-blastoise.png" },
    { id: "mewtwo", name: "Mega Mewtwo X", img: "mega-mewtwo-x.png" },
  ],
  stops: [
    { number: 1, name: "The Grass Start", type: "grass", art: "tropius.png",
      clueText: "Your journey begins where green things grow and morning sunshine likes to glow.",
      hintText: "Look near the plants by the front window.",
      activityType: "tap-ball",
      giftLocationText: "Peek inside the watering can!" },
    { number: 2, name: "The Water Way", type: "water", art: "mega-blastoise.png",
      clueText: "Splish and splash! Find the place where water pours to wash your face.",
      hintText: "It's a room with a big mirror and a sink.",
      activityType: "type-match",
      giftLocationText: "Check the cabinet under the sink!" },
    { number: 3, name: "The Psychic Trial", type: "psychic", art: "mega-mewtwo-x.png",
      clueText: "Where the family gathers to watch the big screen, your next challenge waits unseen.",
      hintText: "Think of the coziest room in the house.",
      activityType: "shadow-guess",
      giftLocationText: "Look behind the couch cushions!" },
    { number: 4, name: "The Electric Dash", type: "electric", art: "pikachu.png",
      clueText: "Zap! Head to the spot where cold things hum and tasty snacks and ice cubes come.",
      hintText: "It keeps your food chilly.",
      activityType: "memory",
      giftLocationText: "Open the freezer — brrr, a surprise!" },
    { number: 5, name: "The Fire Forge", type: "fire", art: "mega-charizard-y.png",
      clueText: "Where meals are made and pots get hot, your next badge is waiting on the spot.",
      hintText: "Grown-ups cook dinner here.",
      activityType: "tap-ball",
      giftLocationText: "Look on top of the microwave!" },
    { number: 6, name: "The Normal Nook", type: "normal", art: "mega-gengar.png",
      clueText: "Climb up high where you rest your head, the next clue's hiding near your bed.",
      hintText: "It's where you sleep at night.",
      activityType: "type-match",
      giftLocationText: "Under your pillow!" },
    { number: 7, name: "The Grass Grove", type: "grass", art: "mega-rayquaza.png",
      clueText: "Step outside to the open air, a leafy friend is waiting there.",
      hintText: "Head to the backyard or balcony.",
      activityType: "shadow-guess",
      giftLocationText: "By the big plant pot outside!" },
    { number: 8, name: "The Champion's Cup", type: "psychic", art: "mega-mewtwo-y.png",
      clueText: "The final test! Return to where your journey started — greatness awaits a Trainer so smart.",
      hintText: "Go back to the very first room.",
      activityType: "memory",
      giftLocationText: "The champion's gift is on the table — you did it!" },
  ],
};

/* ============================================================
   Creekside V2 fallback configuration

   The V1 configuration above remains intact. The production Creekside
   story, challenge, participant, and reward configuration is loaded from
   creekside-content.js immediately after this file. This fallback remains
   available so the Phase 1 foundation is preserved for reference.

   PATRICK — CODE FRAGMENT NOTE:
   `displaySymbol` is only a harmless symbol shown in the app. The active
   symbolic values are in creekside-content.js. You may replace those four
   symbols locally if desired, but NEVER put the real keypad digits, full
   code, or code-derived answers in either file.
   The actual digits belong only on the four physical fragment cards.
   ============================================================ */
window.CREEKSIDE_CONFIG = {
  version: 2,
  title: "Luca's Creekside Region",
  storageKey: "luca-creekside-v2-progress",
  adultHoldMs: 1500,
  artBase: "assets/pokemon/",
  avatars: window.LUCA_CONFIG.avatars,

  codeFragments: [
    { slot: 1, id: "fragment-leaf", displaySymbol: "Leaf" },
    { slot: 2, id: "fragment-wave", displaySymbol: "Wave" },
    { slot: 3, id: "fragment-star", displaySymbol: "Star" },
    { slot: 4, id: "fragment-flame", displaySymbol: "Flame" },
  ],

  rewards: {
    "trainer-kit": { label: "Trainer Kit", category: "equipment", openNow: true },
    "trainer-license": { label: "Trainer License", category: "badge", openNow: true },
    "water-research-kit": { label: "Water Research Kit", category: "research", openNow: true },
    "family-badge": { label: "Family Team Badge", category: "badge", openNow: true },
    "rocket-recovery-pack": { label: "Recovered Team Rocket Pack", category: "team", openNow: true },
    "ranger-cache": { label: "Secret Ranger Cache", category: "gift", openNow: true },
    "victory-road-medal": { label: "Victory Road Medal", category: "badge", openNow: true },
    "champion-chest": { label: "Pokémon League Champion Chest", category: "gift", openNow: true },
    "mew-figure": { label: "Mew Mythical Encounter", category: "mythical", openNow: true },
  },

  chapters: [
    {
      id: "trainer-orientation",
      number: 1,
      name: "Trainer Orientation",
      lockedName: "New Trainer Signal",
      type: "grass",
      art: "tropius.png",
      scenes: [
        { id: "orientation-story", type: "story", title: "A New Region Appears", body: "The Creekside Pokémon League has selected one new Trainer for an important mission." },
        { id: "orientation-character", type: "character-encounter", title: "Meet the League Recruiter", character: "Auntie Ariel", body: "Report to the League Recruiter and prepare to take the Trainer Oath." },
        { id: "orientation-challenge", type: "physical-challenge", title: "Trainer Equipment Check", body: "Complete the Trainer Oath and prepare one card using the Trainer equipment.", adultPrompt: "Adult: confirm the oath and equipment check are complete." },
        { id: "orientation-reward", type: "reward", title: "Trainer Kit Earned", body: "Your equipment is ready. Welcome to the Creekside League.", rewardIds: ["trainer-kit", "trainer-license"] },
        { id: "orientation-inventory", type: "inventory-update", title: "Inventory Updated", body: "The Trainer Kit and Trainer License have been added to your inventory." },
        { id: "orientation-fragment", type: "code-fragment-record", title: "Ranger Fragment 1", body: "Record the digit from the physical fragment card in Slot 1. The app stores only that the slot is complete.", fragmentSlot: 1 },
        { id: "orientation-transition", type: "chapter-transition", title: "Research Signal Detected", body: "Professor Oak has detected unusual energy near his Water Research Lab." },
      ],
    },
    {
      id: "professor-oak-lab",
      number: 2,
      name: "Professor Oak's Water Research Lab",
      lockedName: "Water Signal",
      type: "water",
      art: "mega-blastoise.png",
      scenes: [
        { id: "oak-story", type: "story", title: "An Anomaly in the Water", body: "Professor Oak needs help recovering research capsules from the preserve." },
        { id: "oak-travel", type: "travel-location", title: "Travel to the Water Research Lab", body: "Bring the phone to Professor Oak's Lab with an adult. Follow the prepared family route." },
        { id: "oak-character", type: "character-encounter", title: "Professor Oak and Monica", character: "Professor Oak", body: "Meet Professor Oak and his Research Assistant for the capsule briefing." },
        { id: "oak-challenge", type: "physical-challenge", title: "Recover the Research Capsules", body: "Retrieve the prepared capsules safely. Use the skimmer fallback if needed.", adultPrompt: "Adult: confirm all prepared research capsules are safely recovered." },
        { id: "oak-reward", type: "reward", title: "Water Research Complete", body: "The recovered research has been secured.", rewardIds: ["water-research-kit"] },
        { id: "oak-inventory", type: "inventory-update", title: "Research Inventory Updated", body: "The Water Research Kit is now in the mission inventory." },
        { id: "oak-fragment", type: "code-fragment-record", title: "Ranger Fragment 2", body: "Record the physical fragment in Slot 2. No digit is entered in the app.", fragmentSlot: 2 },
        { id: "oak-transition", type: "chapter-transition", title: "Family Signal Incoming", body: "A new challenge has appeared back in the Creekside Region." },
      ],
    },
    {
      id: "family-challenge",
      number: 3,
      name: "Family Challenge",
      lockedName: "Friendly Signal",
      type: "electric",
      art: "pikachu.png",
      scenes: [
        { id: "family-story", type: "story", title: "The Teamwork Test", body: "A family challenge will test helping, listening, and working together." },
        { id: "family-travel", type: "travel-location", title: "Find the Family Station", body: "Follow the next prepared family clue with an adult." },
        { id: "family-character", type: "character-encounter", title: "Family Gym Leaders", character: "Family Team", body: "Your family has prepared a cooperative mission." },
        { id: "family-challenge-action", type: "physical-challenge", title: "Complete the Family Challenge", body: "Finish the prepared teamwork activity. This placeholder will be expanded in Phase 2.", adultPrompt: "Adult: confirm the teamwork activity is complete." },
        { id: "family-reward", type: "reward", title: "Family Badge Earned", body: "Great Trainers succeed with help from their team.", rewardIds: ["family-badge"] },
        { id: "family-inventory", type: "inventory-update", title: "Badge Case Updated", body: "The Family Team Badge has been added." },
        { id: "family-fragment", type: "code-fragment-record", title: "Ranger Fragment 3", body: "Record the physical fragment in Slot 3. The app records only completion.", fragmentSlot: 3 },
        { id: "family-transition", type: "chapter-transition", title: "Transmission Interrupted", body: "Someone wearing a red R has blocked the next route." },
      ],
    },
    {
      id: "team-rocket-base",
      number: 4,
      name: "Team Rocket Basketball Base",
      lockedName: "Intercepted Transmission",
      type: "fire",
      art: "mega-charizard-y.png",
      scenes: [
        { id: "rocket-story", type: "story", title: "Team Rocket Takes the Court", body: "Team Rocket has intercepted the Ranger Dispatch and is guarding the route." },
        { id: "rocket-travel", type: "travel-location", title: "Travel to the Rocket Base", body: "Head to the prepared basketball station with an adult." },
        { id: "rocket-character", type: "character-encounter", title: "Team Rocket Enforcer", character: "Mike", body: "The Team Rocket Enforcer challenges the new Trainer." },
        { id: "rocket-challenge", type: "physical-challenge", title: "Break the Basketball Defense", body: "Complete the forgiving basketball rounds. Move closer or use the adult assist whenever needed.", adultPrompt: "Adult: confirm the Team Rocket basketball challenge is complete." },
        { id: "rocket-reward", type: "reward", title: "Rocket Loot Recovered", body: "The Ranger Dispatch has been recovered.", rewardIds: ["rocket-recovery-pack"] },
        { id: "rocket-inventory", type: "inventory-update", title: "Mission Inventory Updated", body: "Recovered supplies are secure." },
        { id: "rocket-fragment", type: "code-fragment-record", title: "Ranger Fragment 4", body: "Record the final physical fragment in Slot 4. Keep all four digits only on the physical card.", fragmentSlot: 4 },
        { id: "rocket-transition", type: "chapter-transition", title: "The Vault Is Revealed", body: "The four physical fragments point to the Secret Ranger Vault." },
      ],
    },
    {
      id: "secret-ranger-vault",
      number: 5,
      name: "Secret Ranger Vault",
      lockedName: "Ranger Mystery",
      type: "psychic",
      art: "mega-gengar.png",
      scenes: [
        { id: "vault-story", type: "story", title: "A Message from the Rangers", body: "The Rangers left a protected cache for a Trainer who completed all four fragment slots." },
        { id: "vault-travel", type: "travel-location", title: "Travel with an Adult", body: "Bring the physical Ranger Code Card. The app will never ask for or display its digits." },
        { id: "vault-character", type: "character-encounter", title: "Ranger Transmission", character: "Rangers Hannah and Noa", body: "Follow the prepared Ranger symbols inside the approved entry area." },
        { id: "vault-challenge", type: "physical-challenge", title: "Open the Physical Ranger Vault", body: "Read the four digits from the physical card and use the real keypad with an adult. Do not enter anything in this app.", adultPrompt: "Adult: confirm the physical vault visit is complete." },
        { id: "vault-reward", type: "reward", title: "Ranger Cache Found", body: "The protected supplies and sealed research file are secure.", rewardIds: ["ranger-cache"] },
        { id: "vault-inventory", type: "inventory-update", title: "Ranger Inventory Updated", body: "The Ranger Cache has been added to the mission inventory." },
        { id: "vault-transition", type: "chapter-transition", title: "Victory Road Opens", body: "The Creekside League has approved access to Victory Road." },
      ],
    },
    {
      id: "victory-road",
      number: 6,
      name: "Victory Road",
      lockedName: "League Trial",
      type: "grass",
      art: "mega-rayquaza.png",
      scenes: [
        { id: "victory-story", type: "story", title: "The Final League Trial", body: "Cross the prepared Victory Road course and calm the legendary energy." },
        { id: "victory-travel", type: "travel-location", title: "Return to Victory Road", body: "Travel to the prepared course with the League Referee." },
        { id: "victory-character", type: "character-encounter", title: "Meet the Victory Road Referee", character: "Auntie Ariel", body: "The referee will guide every stage and provide assists when needed." },
        { id: "victory-challenge", type: "physical-challenge", title: "Complete Victory Road", body: "Finish the prepared movement, accuracy, and Rayquaza stages. There is no hard failure.", adultPrompt: "Adult: confirm Victory Road and the Rayquaza stage are complete." },
        { id: "victory-reward", type: "reward", title: "Victory Road Cleared", body: "The path to the Champion is open.", rewardIds: ["victory-road-medal"] },
        { id: "victory-inventory", type: "inventory-update", title: "League Record Updated", body: "The Victory Road Medal has been recorded." },
        { id: "victory-transition", type: "chapter-transition", title: "The Champion Awaits", body: "Only one final match remains." },
      ],
    },
    {
      id: "champion-finale",
      number: 7,
      name: "Champion Finale",
      lockedName: "Final League Match",
      type: "psychic",
      art: "mega-mewtwo-y.png",
      scenes: [
        { id: "champion-story", type: "story", title: "The Creekside Champion", body: "The final match tests knowledge, skill, courage, and friendship." },
        { id: "champion-character", type: "character-encounter", title: "Champion Patrick", character: "Creekside Champion", body: "The reigning Champion recognizes the Trainer's complete journey." },
        { id: "champion-challenge", type: "physical-challenge", title: "Complete the Champion Match", body: "Finish the prepared Champion rounds with the family watching.", adultPrompt: "Adult: confirm the Champion match is complete." },
        { id: "champion-reward", type: "reward", title: "A New Champion", body: "The Champion Chest is earned and the Hall of Heroes is complete.", rewardIds: ["champion-chest"] },
        { id: "champion-inventory", type: "inventory-update", title: "Champion Record Updated", body: "The Champion title has been added to the Trainer record." },
        { id: "champion-transition", type: "chapter-transition", title: "Journey Complete", body: "The Creekside League celebrates its new Champion. Something unusual may still be nearby." },
      ],
    },
  ],

  epilogue: {
    id: "mew-epilogue",
    lockedName: "Unknown Signal",
    name: "Mew Epilogue",
    type: "psychic",
    art: "mewtwo.png",
    scenes: [
      { id: "mew-signal", type: "story", title: "Signal Detected", body: "A friendly pink signal appears after the Champion celebration." },
      { id: "mew-travel", type: "travel-location", title: "Follow the Mythical Trail", body: "Follow the three prepared footprint markers with the family." },
      { id: "mew-challenge", type: "physical-challenge", title: "Find the Mythical Pokémon", body: "Complete the physical footprint trail and discover the final hiding place.", adultPrompt: "Adult: confirm the Mew trail and reveal are complete." },
      { id: "mew-reward", type: "reward", title: "Mew Registered", body: "A Mythical Encounter has joined the Hall of Fame.", rewardIds: ["mew-figure"] },
      { id: "mew-celebration", type: "celebration", title: "Adventure Complete", body: "Gather the family for the celebration and booster opening." },
    ],
  },
};
