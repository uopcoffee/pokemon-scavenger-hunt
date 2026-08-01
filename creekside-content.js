/* Creekside Region V3 production content.
   Loaded after data.js so the preserved V1 data remains intact while this
   file is the source of truth for the configurable Creekside engine.

   VAULT COMBINATION: the Ranger vault is a luggage combination lock on a prop
   box, re-settable at will. It is not a house entry code, so the combination
   lives here, in the docs, and printed on the four fragment props.

   It is still a SPOILER. The ORDER is the Chapter 6 puzzle, and the only thing
   that reveals it is physically joining the four jagged pieces. So the digits
   must never appear as a group on a Luca-facing screen before Professor Oak's
   checkpoint. Parent Mode is the one place the app shows the full combination.

   Note that `assemblyOrder` is deliberately NOT collection order. Flame is
   collected last but sits first in the stone, so remembering the order he
   picked them up actively misleads.

   The combination is 0151 because 151 is Mew's Pokédex number. Nobody remarks
   on it until after the credits, when Luca says it out loud and it turns out he
   has been carrying Mew's number in his pocket since the Fairy Garden.
*/
(function () {
  "use strict";

  var OPEN_NOW = "OPEN NOW";
  var CARRY_LATER = "CARRY FOR LATER";
  var SAVE_CELEBRATION = "SAVE FOR CELEBRATION";

  function reward(label, category, disposition, packageId) {
    return { label: label, category: category, disposition: disposition, packageId: packageId };
  }

  /* Every runtime screen is now player-facing: the performer cue cards and the
     gift map live on paper. A cast-handoff therefore no longer opens a private
     screen — it tells Luca what is about to happen out in the world and then
     waits for the hold that says the real-world mission is finished. */
  var MISSION_COMPLETE_HOLD_LABEL = "Adult: Hold when the mission is complete";

  var PLAYER_MISSION_BRIEFS = {
    orientation: {
      characterName: "The League Recruiter",
      body: "Auntie Ariel is waiting to make you a real Trainer. Go take the oath and seal your very first card."
    },
    fairy: {
      characterName: "Nina and Auntie Ariel",
      body: "Eight Fairy Lights are hidden in the garden. Go find every one with Nina and carry them to the Fairy Table."
    },
    "oak-water": {
      characterName: "The Partner Professors",
      body: "Four sealed capsules are floating out at the water preserve. Go help the Professors recover all four."
    },
    "nurse-joy": {
      characterName: "Nurse Joy",
      body: "Three frightened Pokémon are waiting at the Center. Go match each one with the care it needs."
    },
    rocket: {
      characterName: "The Team Rocket Boss",
      body: "Team Rocket hid the stolen Dispatch behind a basketball hoop. Go break their defense and take it back."
    },
    vault: {
      characterName: "Rangers Hannah and Noa",
      body: "The Rangers hid their vault at the closest place to the sky in their yard. Go with someone you trust and bring it back."
    },
    "oak-return": {
      characterName: "The Partner Professors",
      body: "The Professors are waiting. Bring the locked vault and all four fragments — Oak says the answer is inside the stone."
    },
    "victory-road": {
      characterName: "Auntie Ariel",
      body: "Victory Road is a game of POKÉ. Auntie Ariel invents the trick, you copy it. Four letters and she is out."
    },
    champion: {
      characterName: "The Creekside Champion",
      body: "The Champion is ready for the final match. Go answer his questions — and tell him about everyone who got you here."
    },
    mew: {
      characterName: "A Mythical Pokémon",
      body: "Pink energy is drifting along the backyard trail. Go follow all three markers and see what is waiting."
    },
    rayquaza: {
      characterName: "Mega Rayquaza",
      body: "The sky opens and Mega Rayquaza circles above, watching. Go send one soft throw and show it who answered."
    }
  };

  var config = {
    version: 3,
    release: "4.0",
    title: "Luca's Creekside Region",
    storageKey: "luca-creekside-v2-progress",
    audiences: ["luca", "adult", "cast"],
    adultHoldMs: 1500,
    artBase: "assets/pokemon/",
    avatars: window.LUCA_CONFIG.avatars,
    settings: {
      startTime: "9:30 a.m.",
      targetChampionTime: "about 12:15 p.m.",
      adultHoldMs: 1500,
      soundEnabled: false,
      respectReducedMotion: true,
    },

    participants: [
      { id: "ariel", displayName: "Auntie Ariel", role: "League Recruiter and Victory Road Referee" },
      { id: "nina", displayName: "Nina", role: "Fairy Gym Leader and Pikachu's Helper" },
      { id: "bruce", displayName: "Professor Oak", role: "Partner Professor, played by Bruce" },
      { id: "monica", displayName: "Professor Monica", role: "Partner Professor" },
      { id: "polly", displayName: "Nurse Joy", role: "Pokémon Center Leader" },
      { id: "mike", displayName: "Mike", role: "Team Rocket Boss" },
      { id: "patrick", displayName: "Patrick", role: "Creekside Region Champion" },
      { id: "hannah", displayName: "Ranger Hannah", role: "Absent Pokémon Ranger" },
      { id: "noa", displayName: "Ranger Noa", role: "Absent Pokémon Ranger" },
    ],

    /* The luggage lock combination, in the order the assembled Sky Stone reads
       left to right. Set the physical lock to this and test it before the party.
       Shown in Parent Mode so an adult can recover it if a fragment goes
       missing. Empty string means Parent Mode reports it is not set. */
    vaultCombination: "0151",

    /* The four Sky Fragments are one broken object, not four keepsakes.

       `slot` is collection order: 1 Fairy Garden, 2 Oak's preserve, 3 Pokémon
       Center, 4 Team Rocket Base.

       `assemblyOrder` is where the piece sits in the joined stone, left to
       right, and it is deliberately unrelated to collection order. Reading the
       digits in assemblyOrder gives `vaultCombination`.

       `digit` is printed on the fragment prop beside its symbol. Individually
       the digits are meaningless; only the jagged fit reveals their order. The
       app renders `displaySymbol` alone and never the digit. */
    codeFragments: [
      { slot: 1, id: "fragment-leaf",  displaySymbol: "Leaf",  assemblyOrder: 3, digit: "5" },
      { slot: 2, id: "fragment-wave",  displaySymbol: "Wave",  assemblyOrder: 4, digit: "1" },
      { slot: 3, id: "fragment-heart", displaySymbol: "Heart", assemblyOrder: 2, digit: "1" },
      { slot: 4, id: "fragment-flame", displaySymbol: "Flame", assemblyOrder: 1, digit: "0" },
    ],

    rewards: {
      "red-card-sleeves": reward("Red Pokémon card sleeves", "equipment", OPEN_NOW, "TRAINER KIT"),
      "cardboard-gold-top-loaders": reward("Cardboard Gold top loaders", "equipment", OPEN_NOW, "TRAINER KIT"),
      "one-touch-edge-case": reward("Ultra Pro One-Touch Edge case", "equipment", OPEN_NOW, "TRAINER KIT"),
      "mega-gallade-ex": reward("Mega Gallade ex", "team-card", OPEN_NOW, "TRAINER KIT"),
      "journey-together-booster": reward("Journey Together booster", "booster", SAVE_CELEBRATION, "TRAINER KIT"),
      "trainer-license": reward("Trainer License", "badge", CARRY_LATER, "TRAINER KIT"),

      "sweet-surprise-reader": reward("Pokémon: Sweet Surprise reader", "book", OPEN_NOW, "FAIRY GYM REWARD"),
      "mega-clefable-ex": reward("Mega Clefable ex", "team-card", OPEN_NOW, "FAIRY GYM REWARD"),
      "alcremie-ex": reward("Alcremie ex", "team-card", OPEN_NOW, "FAIRY GYM REWARD"),
      "perfect-order-loose-1": reward("Loose Perfect Order booster", "booster", SAVE_CELEBRATION, "FAIRY GYM REWARD"),
      "fairy-badge": reward("Fairy Badge", "badge", CARRY_LATER, "FAIRY GYM REWARD"),

      "water-mini-tin": reward("Water-themed Pokémon mini tin", "gift", OPEN_NOW, "WATER RESEARCH CAPSULES 1–4"),
      "chaos-rising-1": reward("Chaos Rising booster from capsule", "booster", SAVE_CELEBRATION, "WATER RESEARCH CAPSULES 1–4"),
      "water-mini-tin-packs": reward("Packs inside water mini tin", "booster", SAVE_CELEBRATION, "WATER RESEARCH CAPSULES 1–4"),
      "first-partner-collection": reward("First Partner Illustration Collection Series 2", "collection", OPEN_NOW, "PROFESSOR OAK'S FIRST PARTNER FILE"),
      "new-journey-reader": reward("Pokémon: A New Journey reader", "book", OPEN_NOW, "PROFESSOR OAK'S FIRST PARTNER FILE"),
      "adventures-collector-02": reward("Pokémon Adventures Collector's Edition 02", "book", OPEN_NOW, "PROFESSOR OAK'S FIRST PARTNER FILE"),
      "first-partner-boosters": reward("Two First Partner collection boosters", "booster", SAVE_CELEBRATION, "PROFESSOR OAK'S FIRST PARTNER FILE"),
      "water-research-badge": reward("Water Research Badge", "badge", CARRY_LATER, "PROFESSOR OAK'S FIRST PARTNER FILE"),

      "meet-the-crew-reader": reward("Pokémon: Meet the Crew reader", "book", OPEN_NOW, "POKÉMON CENTER FIELD KIT"),
      "mini-portfolio": reward("Pokémon mini portfolio", "collection", OPEN_NOW, "POKÉMON CENTER FIELD KIT"),
      "scream-tail-ex": reward("Scream Tail ex", "team-card", OPEN_NOW, "POKÉMON CENTER FIELD KIT"),
      "portfolio-booster": reward("Mini portfolio booster", "booster", SAVE_CELEBRATION, "POKÉMON CENTER FIELD KIT"),
      "care-badge": reward("Care Badge", "badge", CARRY_LATER, "POKÉMON CENTER FIELD KIT"),

      "rocket-nidoking-ex": reward("Team Rocket's Nidoking ex", "team-card", OPEN_NOW, "RECOVERED TEAM ROCKET LOOT"),
      "incineroar-ex": reward("Incineroar ex", "team-card", OPEN_NOW, "RECOVERED TEAM ROCKET LOOT"),
      "mega-pyroar-ex": reward("Mega Pyroar ex", "team-card", OPEN_NOW, "RECOVERED TEAM ROCKET LOOT"),
      "destined-rivals-1": reward("Destined Rivals booster", "booster", SAVE_CELEBRATION, "RECOVERED TEAM ROCKET LOOT"),
      "ranger-dispatch": reward("Recovered Ranger Dispatch", "quest-item", CARRY_LATER, "RECOVERED TEAM ROCKET LOOT"),
      "rocket-badge": reward("Rocket Badge", "badge", CARRY_LATER, "RECOVERED TEAM ROCKET LOOT"),

      "five-minute-stories": reward("Pokémon 5-Minute Stories", "book", OPEN_NOW, "SECRET RANGER CACHE"),
      "how-to-draw": reward("Pokémon How to Draw Adventures", "book", OPEN_NOW, "SECRET RANGER CACHE"),
      "fire-mini-tin": reward("Second Pokémon mini tin", "gift", OPEN_NOW, "SECRET RANGER CACHE"),
      "mabosstiff-ex": reward("Mabosstiff ex", "team-card", OPEN_NOW, "SECRET RANGER CACHE"),
      "electivire-ex": reward("Electivire ex", "team-card", OPEN_NOW, "SECRET RANGER CACHE"),
      "ascended-heroes": reward("Ascended Heroes booster", "booster", SAVE_CELEBRATION, "SECRET RANGER CACHE"),
      "phantasmal-flames": reward("Phantasmal Flames blister", "booster", SAVE_CELEBRATION, "SECRET RANGER CACHE"),
      "chaos-rising-2": reward("Second loose Chaos Rising booster", "booster", SAVE_CELEBRATION, "SECRET RANGER CACHE"),
      "fire-mini-tin-packs": reward("Packs inside second mini tin", "booster", SAVE_CELEBRATION, "SECRET RANGER CACHE"),
      "sealed-research-file": reward("Sealed Mega Evolution Research File", "quest-item", CARRY_LATER, "SECRET RANGER CACHE"),
      "league-qualification-seal": reward("League Qualification seal", "quest-item", CARRY_LATER, "SECRET RANGER CACHE"),
      "ranger-vault-badge": reward("Ranger Vault Badge", "badge", CARRY_LATER, "SECRET RANGER CACHE"),
      "ranger-vault-box": reward("Locked Ranger Vault box", "quest-item", CARRY_LATER, "SECRET RANGER CACHE"),

      "mega-evolutions-sticker-book": reward("Official Mega Evolutions Sticker Book", "book", OPEN_NOW, "MEGA EVOLUTION RESEARCH FILE"),
      "mega-abomasnow-ex": reward("Mega Abomasnow ex", "team-card", OPEN_NOW, "MEGA EVOLUTION RESEARCH FILE"),
      "mega-evolution-booster": reward("Loose Mega Evolution booster", "booster", SAVE_CELEBRATION, "MEGA EVOLUTION RESEARCH FILE"),
      "sky-stone": reward("Assembled Sky Stone", "quest-item", CARRY_LATER, "MEGA EVOLUTION RESEARCH FILE"),
      "league-authorization": reward("League Authorization card", "quest-item", CARRY_LATER, "MEGA EVOLUTION RESEARCH FILE"),
      "sky-pillar-coordinates": reward("Sky Pillar coordinates", "quest-item", CARRY_LATER, "MEGA EVOLUTION RESEARCH FILE"),

      "mega-lucario-deck": reward("Mega Lucario ex League Battle Deck", "gift", OPEN_NOW, "POKÉMON LEAGUE CHAMPION CHEST"),
      "mega-rayquaza-model": reward("Mega Rayquaza model kit", "gift", OPEN_NOW, "POKÉMON LEAGUE CHAMPION CHEST"),
      "perfect-order-bundle": reward("Perfect Order Booster Bundle — 6 packs", "booster", SAVE_CELEBRATION, "POKÉMON LEAGUE CHAMPION CHEST"),
      "chaos-rising-3": reward("Third loose Chaos Rising booster", "booster", SAVE_CELEBRATION, "POKÉMON LEAGUE CHAMPION CHEST"),
      "destined-rivals-2": reward("Second Destined Rivals booster", "booster", SAVE_CELEBRATION, "POKÉMON LEAGUE CHAMPION CHEST"),
      "team-reserve": reward("Hall of Fame Team Reserve and remaining loose packs", "gift", SAVE_CELEBRATION, "POKÉMON LEAGUE CHAMPION CHEST"),
      "champion-title": reward("Creekside Region Champion title", "badge", CARRY_LATER, "POKÉMON LEAGUE CHAMPION CHEST"),

      "mew-figure": reward("Mew vinyl figure", "mythical", OPEN_NOW, "MYTHICAL ENCOUNTER"),
      "booster-satchel": reward("Booster Satchel", "celebration", OPEN_NOW, "FINAL FAMILY CELEBRATION"),
      "popsicles": reward("Popsicles and family celebration", "celebration", OPEN_NOW, "FINAL FAMILY CELEBRATION"),
    },

    chapters: [
      {
        id: "trainer-orientation", number: 1, name: "Trainer Orientation", lockedName: "New Trainer Signal",
        type: "grass", art: "tropius.png", locationLabel: "League Registration", scheduleLabel: "9:30–9:42", targetMinutes: 12,
        participantIds: ["ariel"],
        scenes: [
          { id: "orientation-story", type: "story", title: "A New Region Appears", body: "Unusual energy is spreading through Creekside. The Pokémon League has invited exactly one new Trainer to investigate." },
          { id: "orientation-location", type: "travel-location", title: "Report to League Registration", body: "Meet the League Recruiter at the prepared front-porch or living-room station." },
          { id: "orientation-character", type: "story", title: "The League Recruiter Is Ready", body: "League Registration is prepared. Auntie Ariel is waiting to welcome Creekside’s newest Trainer and make the mission official." },
          { id: "orientation-briefing", type: "challenge-briefing", title: "Trainer Oath and Equipment Test", instructions: ["Promise to protect Pokémon, help friends, play fairly, and never give up.", "Sleeve one card.", "Place it in a top loader.", "Seal it in the One-Touch case."] },
          { id: "orientation-challenge", type: "physical-challenge", title: "Become an Official Trainer", body: "Take the Trainer Oath and complete the equipment test with Auntie Ariel.", successRule: "Complete each equipment step once. Ariel may help with any fiddly packaging.", fallbackText: "Ariel may hold the sleeve or top loader while Luca slides the card into place.", adultPrompt: "League Recruiter: hold to confirm the oath and equipment test are complete." },
          { id: "orientation-reward", type: "reward", title: "Trainer Kit Earned", body: "Open the Trainer equipment now. Place the booster in the adult-carried Booster Satchel.", rewardIds: ["red-card-sleeves","cardboard-gold-top-loaders","one-touch-edge-case","mega-gallade-ex","journey-together-booster","trainer-license"] },
          { id: "orientation-inventory", type: "inventory-update", title: "Trainer Profile Activated", body: "Mega Gallade joins the team. The Trainer License is active." },
          { id: "orientation-transition", type: "chapter-transition", title: "A Tiny Signal in the Garden", body: "Fairy energy is blinking near the backyard trees. The youngest Gym Leader needs help!" },
        ],
      },
      {
        id: "fairy-garden", number: 2, name: "Fairy Garden Rescue", lockedName: "Tiny Garden Signal",
        type: "psychic", art: "pikachu.png", locationLabel: "Fairy Garden", scheduleLabel: "9:42–9:52", targetMinutes: 10,
        participantIds: ["nina"],
        scenes: [
          { id: "fairy-story", type: "story", title: "The Fairy Lights Are Missing", body: "Eight glowing Fairy Lights are hidden throughout the garden. Nina knows where they appeared, but some are too high for the youngest Gym Leader to reach." },
          { id: "fairy-location", type: "travel-location", title: "Enter the Fairy Garden", body: "Travel to the prepared backyard tree and bush area. Do not use the garage or side yard." },
          { id: "fairy-character", type: "story", title: "The Fairy Gym Leader Knows the Way", body: "Nina knows all eight hiding places. Follow her clues, recover each glowing light, and bring it to the Fairy Table." },
          { id: "fairy-warmup", type: "digital-warmup", title: "Eight Lights Are Missing", body: "Optional: count eight glowing Fairy symbols, then put the phone away." },
          { id: "fairy-briefing", type: "challenge-briefing", title: "Recover Eight Fairy Lights", instructions: ["Follow Nina’s pointing and short clues.", "Retrieve each battery tea light from a safe, reachable hiding place.", "Bring every light to the Fairy Table."] },
          { id: "fairy-challenge", type: "physical-challenge", title: "Help Nina Restore the Garden", body: "Search safe low branches, bushes, and backyard hiding places with Nina.", successRule: "Bring all eight battery tea lights to the Fairy Table. An adult quietly arranges them into an arrow.", fallbackText: "Move every remaining light into plain sight or let an adult give the clues. Use fewer lights if needed, then complete the arrow.", adultPrompt: "Fairy Garden Guide: hold to confirm the eight lights form an arrow on the table." },
          { id: "fairy-reward", type: "reward", title: "Fairy Gym Reward", body: "Open the reader and team cards now. Save the Perfect Order booster for the final celebration.", rewardIds: ["sweet-surprise-reader","mega-clefable-ex","alcremie-ex","perfect-order-loose-1","fairy-badge"] },
          { id: "fairy-inventory", type: "inventory-update", title: "Fairy Team Update", body: "Mega Clefable and Alcremie join the team. The Fairy Badge is recorded." },
          { id: "fairy-fragment", type: "code-fragment-record", title: "Sky Fragment 1", body: "Nina finds a small broken piece under the last light. It is warm, it has a Leaf mark, and a number is stamped on the back. Nobody knows what it is. Keep it safe. The app records only the Leaf symbol.", fragmentSlot: 1 },
          { id: "fairy-transition", type: "chapter-transition", title: "Professor Oak Requests Assistance", body: "A priority transmission reports research objects beneath the Water Research Preserve. Travel begins now for a 10:15 arrival." },
        ],
      },
      {
        id: "professor-oak-lab", number: 3, name: "Professor Oak's Water Research Lab", lockedName: "Priority Water Signal",
        type: "water", art: "mega-blastoise.png", locationLabel: "Professor Oak's Lab", scheduleLabel: "Travel 9:52–10:15 · Mission 10:15–10:35", targetMinutes: 43,
        participantIds: ["bruce","monica"],
        scenes: [
          { id: "oak-travel", type: "travel-location", title: "Travel to Professor Oak's Lab", body: "Allow travel and costume-reset time. Target arrival: 10:15 a.m. Bring the phone, the Sky Fragment, and an adult." },
          { id: "oak-entrance", type: "story", title: "The Professors Are Watching the Water", body: "Professor Oak and Professor Monica are studying a strange signal at the preserve. Something important is moving beneath the surface." },
          { id: "monica-entrance", type: "story", title: "The Capsule Readings Are Rising", body: "Four sealed research capsules are missing. The Partner Professors need a Trainer before Team Rocket detects the same energy." },
          { id: "oak-story", type: "story", title: "Four Research Capsules", body: "One capsule holds a broken piece the Professors cannot explain. It looks exactly like the one Nina found in the garden." },
          { id: "oak-safety", type: "challenge-briefing", title: "Water Research Safety Briefing", instructions: ["One supervising adult watches the water continuously.", "No running on the pool deck.", "Retrieve only floating or shallow prepared capsules.", "Use the skimmer immediately if swimming is not the best option."] },
          { id: "oak-challenge", type: "physical-challenge", title: "Recover the Four Capsules", body: "Use Monica's symbol diagram, retrieve four double-sealed capsules, and place the marked piece in the research tray.", successRule: "Retrieve all four safely; swimming should be brief and purposeful.", fallbackText: "Use the pool skimmer, float capsules in a tub, or retrieve four marked tennis balls from the deck.", adultPrompt: "Supervising adult: hold to confirm all four research objects are safely recovered." },
          { id: "oak-reward", type: "reward", title: "Professor Oak's Field Research Reward", body: "Open the books, collection, and water mini tin as directed. Every booster goes unopened into the Booster Satchel.", rewardIds: ["water-mini-tin","chaos-rising-1","water-mini-tin-packs","first-partner-collection","new-journey-reader","adventures-collector-02","first-partner-boosters","water-research-badge"] },
          { id: "oak-inventory", type: "inventory-update", title: "Research Inventory Updated", body: "The second broken piece and the Water Research Badge are secured for the larger mystery." },
          { id: "oak-fragment", type: "code-fragment-record", title: "Sky Fragment 2", body: "The second piece carries a Wave mark and another stamped number. Its broken edge fits the Leaf piece exactly. The app records only the Wave symbol.", fragmentSlot: 2 },
          { id: "oak-transition", type: "chapter-transition", title: "A Pokémon Center Emergency", body: "Oak's readings reveal frightened Pokémon along the same trail. Nurse Joy needs Luca next." },
        ],
      },
      {
        id: "pokemon-center", number: 4, name: "Pokémon Center Emergency", lockedName: "Care Signal",
        type: "electric", art: "pikachu.png", locationLabel: "Creekside Pokémon Center", scheduleLabel: "10:35–10:47", targetMinutes: 12,
        participantIds: ["polly"],
        scenes: [
          { id: "center-story", type: "story", title: "Three Pokémon Need Help", body: "Three patients encountered unstable Mega Energy. A careful Trainer must match each patient with the right treatment." },
          { id: "center-location", type: "travel-location", title: "Report to the Pokémon Center", body: "Travel with an adult to the prepared patio or indoor treatment station." },
          { id: "center-character", type: "story", title: "Nurse Joy Is Waiting", body: "The emergency treatment station is ready. Nurse Joy has three Pokémon patients who need a kind Trainer’s help." },
          { id: "center-briefing", type: "challenge-briefing", title: "Diagnose, Treat, and Deliver", instructions: ["Match tired Pikachu with an Oran Berry.", "Match overheated Charmander with water and rest.", "Match frightened Eevee with comfort and quiet.", "Carry one medicine Poké Ball through the short path."] },
          { id: "center-challenge", type: "physical-challenge", title: "Complete the Emergency Treatment", body: "Inspect the patient cards, match each treatment, and deliver the medicine Poké Ball to Nurse Joy.", successRule: "All three matches are completed with hints allowed. No wrong choice causes failure.", fallbackText: "Nurse Joy removes one incorrect option, demonstrates a match, or moves the activity indoors.", adultPrompt: "Nurse Joy: hold to confirm all patients received care." },
          { id: "center-reward", type: "reward", title: "Pokémon Center Field Kit", body: "Open the reader, portfolio, and Scream Tail card. Keep the included booster sealed.", rewardIds: ["meet-the-crew-reader","mini-portfolio","scream-tail-ex","portfolio-booster","care-badge"] },
          { id: "center-inventory", type: "inventory-update", title: "Field Pokédex Unlocked", body: "Scream Tail joins the team. The Care Badge and mini portfolio are recorded." },
          { id: "center-fragment", type: "code-fragment-record", title: "Sky Fragment 3", body: "The frightened Eevee was curled around the third piece. Heart mark, another number, another matching edge. The app records only the Heart symbol.", fragmentSlot: 3 },
          { id: "center-transition", type: "chapter-transition", title: "Team Rocket Intercepts the Mission", body: "A loud transmission cuts through the Center. Team Rocket has stolen Professor Oak's Ranger Dispatch — and Mike says he knows exactly what Luca has been collecting." },
        ],
      },
      {
        id: "team-rocket-base", number: 5, name: "Team Rocket Basketball Base", lockedName: "Intercepted Transmission",
        type: "fire", art: "mega-charizard-y.png", locationLabel: "Team Rocket Base", scheduleLabel: "10:47–10:59", targetMinutes: 12,
        participantIds: ["mike"],
        scenes: [
          { id: "rocket-story", type: "story", title: "Team Rocket Blocks the Route", body: "Mike stole the Ranger Dispatch — the one document that explains the broken pieces — and built a basketball defense around it." },
          { id: "rocket-location", type: "travel-location", title: "Approach Team Rocket Base", body: "Travel with an adult to the prepared adjustable-hoop station." },
          { id: "rocket-character", type: "story", title: "The Team Rocket Boss Is Waiting", body: "Team Rocket is guarding the stolen supplies. Their boss is waiting at the Defense Base with Professor Oak’s Ranger Dispatch." },
          { id: "rocket-briefing", type: "challenge-briefing", title: "Break the Three-Round Defense", instructions: ["Round 1: make one comfortable close shot.", "Round 2: score two baskets in five attempts, or earn three points from baskets and target hits.", "Round 3: choose a team card and attempt the Final Poké Shot."] },
          { id: "rocket-challenge", type: "physical-challenge", title: "Defeat Team Rocket's Basketball Base", body: "Complete the three forgiving rounds while Mike delivers dramatic commentary.", successRule: "Basket = 2 points; rim, backboard, or prepared target = 1 point. After two misses, move closer. Mike must eventually lose.", fallbackText: "Lower the hoop, use the closest marker, hit a large backboard target, or let Ariel perform the Team Rocket role.", adultPrompt: "Team Rocket Boss: hold to surrender the stolen Ranger Dispatch." },
          { id: "rocket-reward", type: "reward", title: "Recovered Team Rocket Loot", body: "Open the three team cards. Place the Destined Rivals booster in the Booster Satchel and carry the Ranger Dispatch.", rewardIds: ["rocket-nidoking-ex","incineroar-ex","mega-pyroar-ex","destined-rivals-1","ranger-dispatch","rocket-badge"] },
          { id: "rocket-inventory", type: "inventory-update", title: "Rocket Defeated", body: "Nidoking, Incineroar, and Mega Pyroar join the team. The stolen Dispatch explains what the four Sky Fragments are." },
          { id: "rocket-fragment", type: "code-fragment-record", title: "Sky Fragment 4", body: "Mike surrenders the last piece and finally explains it: four fragments of one Sky Stone that fell over Creekside, broken apart and hidden by the Rangers — and the four stamped numbers, in order, open their door. The app records only the Flame symbol.", fragmentSlot: 4 },
          { id: "rocket-transition", type: "chapter-transition", title: "The Secret Ranger Vault", body: "Rangers Hannah and Noa left a protected cache behind that door. Read the four numbers off the fragments in order." },
        ],
      },
      {
        id: "secret-ranger-vault", number: 6, name: "Secret Ranger Vault", lockedName: "Protected Ranger Mystery",
        type: "psychic", art: "mega-gengar.png", locationLabel: "The Rangers' Trampoline", scheduleLabel: "10:59–11:09", targetMinutes: 10,
        participantIds: ["hannah","noa"],
        requiresFragments: 4,
        scenes: [
          { id: "vault-story", type: "story", title: "The Closest Place to the Sky", body: "Rangers Hannah and Noa broke the Sky Stone apart so Team Rocket could never take it whole. Then they locked their vault and hid it at the closest place to the sky in their whole yard." },
          { id: "vault-location", type: "travel-location", title: "Travel with an Adult Escort", body: "Bring the four Sky Fragments to the Rangers' backyard. Look under, on, and around the trampoline — nothing in that yard stands closer to the sky." },
          { id: "vault-character", type: "story", title: "A Secure Ranger Transmission", body: "The Rangers left their vault for the Trainer who recovered all four Sky Fragments. A combination lock holds it shut. An Adult Escort must stay beside Luca." },
          { id: "vault-fragments", type: "fragment-check", title: "Four Ranger Symbols Recorded", body: "Leaf, Wave, Heart, and Flame are all recovered. Each one carries a number — but nothing says which number comes first." },
          { id: "vault-briefing", type: "challenge-briefing", title: "Find the Ranger Vault", instructions: ["An adult stays beside Luca.", "Follow three prepared Ranger symbols to the trampoline.", "Recover the locked box.", "Try the combination lock — it will not open yet.", "Read the message on the lid."] },
          { id: "vault-challenge", type: "physical-challenge", title: "Recover the Locked Ranger Vault", body: "Follow the Ranger symbols to the trampoline, recover the locked box, and let Luca try the combination himself. It will not open. The lid says: FOUR PIECES, ONE STONE. TAKE THIS TO PROFESSOR OAK.", successRule: "Luca finds the box and reads the lid. Failing to open the lock IS the success — do not let anyone solve it here.", fallbackText: "If the trampoline is unavailable, place the box at the highest safe point in the yard and keep the sky clue.", adultPrompt: "Adult escort: hold to confirm the locked vault is recovered and still locked." },
          { id: "vault-reward", type: "reward", title: "The Locked Ranger Vault", body: "The Rangers strapped one book to the lid for whoever found it. Open that now. Everything else stays locked inside until Professor Oak.", rewardIds: ["five-minute-stories","ranger-vault-box","ranger-vault-badge"] },
          { id: "vault-inventory", type: "inventory-update", title: "The Vault Is Found", body: "Luca is carrying a locked Ranger vault and four pieces of a broken stone. Only Professor Oak can turn one into the other." },
          { id: "vault-transition", type: "chapter-transition", title: "Return to Professor Oak", body: "The lid names Professor Oak. Carry the vault and all four fragments back to the lab — Victory Road stays locked until it opens." },
        ],
      },
      {
        id: "victory-road", number: 7, name: "Victory Road and Champion Battle", lockedName: "Final League Trial",
        type: "grass", art: "mega-rayquaza.png", locationLabel: "Victory Road", scheduleLabel: "11:17–11:30", targetMinutes: 13,
        participantIds: ["ariel","patrick"],
        requiresCheckpoint: true,
        scenes: [
          { id: "victory-story", type: "story", title: "Mega Rayquaza Above Victory Road", body: "Oak's research points to a Sky Pillar signal. Only a League-qualified Trainer can cross the final course." },
          { id: "victory-location", type: "travel-location", title: "Enter Victory Road", body: "Return to the prepared backyard, tree, patio, and yard-game stations. Do not use the garage or side yard." },
          { id: "victory-character", type: "story", title: "The Victory Road Referee Is Ready", body: "The final League course is open. Auntie Ariel is waiting to referee every obstacle and authorize the Rayquaza encounter." },
          { id: "victory-stage-a", type: "multi-stage-progress", title: "Stage A: Victory Road — a game of POKÉ", instructions: ["Auntie Ariel invents a backyard trick and does it first.", "Luca copies it. If Ariel misses her own trick, she takes a letter.", "P, O, K, É — four letters and the Elite Four Wild Card is out.", "Use the slide, the swings, the ninja spinners, and the bouncy house."] },
          { id: "victory-challenge-a", type: "physical-challenge", stage: 1, title: "Clear Victory Road", body: "Play POKÉ against Auntie Ariel. She makes up every trick on the spot and loses in spectacular fashion.", successRule: "Ariel spells P-O-K-É before Luca does. Tricks are invented to suit Luca, and Ariel fails hers theatrically.", fallbackText: "Fewer letters, easier tricks, or move under the patio. Ariel can lose in two rounds if the clock is tight.", adultPrompt: "Victory Road Referee: hold to confirm the Elite Four Wild Card has been defeated." },
          { id: "victory-stage-b", type: "multi-stage-progress", title: "Stage B: Mega Rayquaza", instructions: ["Aim one soft Poké Ball at the hanging Rayquaza target.", "One clear target hit completes the encounter.", "Ariel may invoke a Legendary Assist at any time."] },
          { id: "victory-challenge-b", type: "physical-challenge", stage: 2, title: "Calm Mega Rayquaza", body: "Hit the prepared soft-ball target or complete the alternate ring/symbol challenge.", successRule: "One success, or a Legendary Assist after two minutes.", fallbackText: "Use ring toss or assemble three Sky symbols instead of throwing.", adultPrompt: "Victory Road Referee: hold to confirm Rayquaza is calm." },
          { id: "champion-character", type: "story", title: "The Champion Is Waiting", body: "Victory Road is complete and Rayquaza is calm. The reigning Creekside Champion is waiting just out of sight for the final match." },
          { id: "champion-stage", type: "multi-stage-progress", title: "Stage C: Champion Match", instructions: ["Round 1 — Knowledge: three Pokémon trivia questions from the Champion.", "Round 2 — Heart: the Champion names each person who helped today; Luca says what they did.", "Round 3 — Team: Luca names the teammate who carried him furthest and why."] },
          { id: "champion-challenge", type: "physical-challenge", stage: 3, title: "Challenge the Champion", body: "Answer the Champion's trivia, then name every person who helped you get here.", successRule: "Every sincere answer counts. Patrick supplies the name if Luca stalls, and Luca supplies the deed.", fallbackText: "Patrick offers two choices per question and prompts each helper by name.", adultPrompt: "Champion: hold to concede the match and award the title." },
          { id: "champion-reward", type: "reward", title: "Pokémon League Champion Chest", body: "Open the League Battle Deck and Rayquaza model. Keep the full booster inventory sealed for the family celebration.", rewardIds: ["mega-lucario-deck","mega-rayquaza-model","perfect-order-bundle","chaos-rising-3","destined-rivals-2","team-reserve","champion-title"] },
          { id: "champion-inventory", type: "inventory-update", title: "Champion Record Complete", body: "Victory Road, Rayquaza, and the Champion match are recorded." },
          { id: "hall-of-heroes", type: "hall-of-heroes", title: "Hall of Heroes", body: "Every person who helped this morning is part of Luca's Champion story.", participantIds: ["ariel","nina","bruce","monica","polly","mike","patrick","hannah","noa"] },
          { id: "group-photo", type: "story", title: "Champion Group Photo", body: "Gather the family and helpers for a Champion photo. The adventure appears to be complete." },
          { id: "fake-credits", type: "fake-credits", title: "Luca's Trainer Journey", body: "A Creekside Region adventure made possible by family, neighbors, courage, and excellent Trainer teamwork.", durationMs: 10000 },
          { id: "champion-transition", type: "champion-final", title: "Champion Luca", body: "Creekside Region Journey Complete" },
        ],
      },
    ],

    checkpoint: {
      id: "oak-return", name: "Professor Oak Opens the Vault", lockedName: "Research Analysis Required",
      type: "water", art: "mega-blastoise.png", locationLabel: "Professor Oak's Lab",
      scheduleLabel: "11:09–11:17", targetMinutes: 8, afterChapterId: "secret-ranger-vault",
      participantIds: ["bruce","monica"],
      scenes: [
        { id: "oak-return-travel", type: "travel-location", title: "Return Before Noon", body: "Carry the locked vault and all four Sky Fragments back to Professor Oak's Lab. Target arrival: 11:09 a.m." },
        { id: "oak-return-character", type: "story", title: "The Partner Professors Are Ready", body: "Professor Oak takes one look at the lid and asks for the four pieces. He says the Rangers left the answer in the stone itself." },
        { id: "oak-return-analysis", type: "checkpoint", title: "Solve the Sky Stone", instructions: ["Fit the four jagged fragments together — they only join one way.", "Turn the joined stone over: the back forms the Sky Stone.", "Turn it face up and read the four numbers left to right. That is the combination.", "Open the vault, then let Monica open the sealed Research File inside."] },
        { id: "oak-return-challenge", type: "physical-challenge", title: "Open the Ranger Vault", body: "Assemble the Sky Stone with Bruce and Monica, read the combination off the joined face, and let Luca dial the lock himself.", successRule: "Luca turns the last dial and the lock opens. Oak guides the puzzle as much as needed; Luca always opens the lock.", fallbackText: "Oak assembles the stone and reads the numbers aloud while Luca dials.", adultPrompt: "Professor Oak: hold when the vault is open and League Authorization is awarded." },
        { id: "oak-return-reward", type: "reward", title: "The Vault Is Open", body: "Everything the Rangers locked away is Luca's now. Open the books, tin, and team cards; every booster goes in the Satchel. Carry the Sky Stone and League Authorization.", rewardIds: ["how-to-draw","fire-mini-tin","mabosstiff-ex","electivire-ex","ascended-heroes","phantasmal-flames","chaos-rising-2","fire-mini-tin-packs","sealed-research-file","league-qualification-seal","mega-evolutions-sticker-book","mega-abomasnow-ex","mega-evolution-booster","sky-stone","league-authorization","sky-pillar-coordinates"] },
        { id: "oak-return-transition", type: "chapter-transition", title: "Victory Road Authorized", body: "Mega Rayquaza energy is gathering above Victory Road. Luca is cleared for the final League trial." },
      ],
    },

    epilogue: {
      id: "mew-epilogue", lockedName: "Hidden", name: "The Mythical Signal",
      type: "psychic", art: "mew.png", locationLabel: "Mythical Trail", scheduleLabel: "11:30–11:36", targetMinutes: 6,
      scenes: [
        /* The credits have already rolled. Patrick asks one casual leftover
           question, Luca says the four numbers out loud, and that is what
           wakes the screen back up. */
        { id: "champion-code-question", type: "story", title: "One Last Thing", body: "The Champion has one leftover question. “Before we put all this away — do you still remember the code?”" },
        { id: "mew-glitch", type: "glitch", title: "SIGNAL DETECTED", body: "Zero. One. Five. One. Luca says it out loud and the finished screen flickers awake. One hundred fifty-one is not a lock number. It is a Pokédex number — and it has been in his pocket since the Fairy Garden." },
        { id: "mew-transmission", type: "story", title: "Professor Oak’s Impossible Reading", body: "Professor Oak’s scanner has found one final signal after the adventure appeared to be over. Pink energy is moving through the backyard." },
        { id: "mew-location", type: "travel-location", title: "Follow the Mythical Trail", body: "Search only the prepared backyard tree, bush, and patio route. Mew does not appear on the region map." },
        { id: "mew-stage", type: "multi-stage-progress", title: "Three Mew Footprints", instructions: ["Find the first pink-energy marker.", "Follow its clue to the second.", "Use the third marker to locate the translucent discovery box."] },
        { id: "mew-challenge", type: "physical-challenge", title: "Discover the Mythical Pokémon", body: "Complete the three-marker trail and reveal Mew near the prepared family gathering area.", successRule: "Each clue points clearly to the next; an adult may give a warm/cold hint.", fallbackText: "Move all markers under the patio or let Professor Oak transmit the next clue.", adultPrompt: "Adult: hold to confirm Mew has been discovered." },
        { id: "mew-reward", type: "reward", title: "Mew Registered", body: "Open the Mew vinyl figure now. The Mythical silhouette is revealed in Luca's Hall of Fame.", rewardIds: ["mew-figure"] },
        { id: "mew-celebration", type: "celebration", title: "Popsicles and Booster Opening", body: "Gather the family, bring out the Booster Satchel, open the saved packs together, and celebrate the new Creekside Champion.", rewardIds: ["booster-satchel","popsicles"] },
      ],
    },
  };

  /*
   * Logistics Update 2 keeps the original V2/V3 scene IDs available for
   * migration, but replaces tap-heavy runtime sequences with one story beat,
   * one protected live relay, and one combined Luca-facing success reveal.
   */
  var legacyV2SceneIdsBySequence = {};
  config.chapters.concat([config.checkpoint, config.epilogue]).forEach(function (sequence) {
    legacyV2SceneIdsBySequence[sequence.id] = sequence.scenes.map(function (scene) {
      return scene.id;
    });
  });

  function sceneFrom(sequence, sceneId, updates) {
    var scene = sequence.scenes.find(function (candidate) {
      return candidate.id === sceneId;
    });
    return Object.assign({}, scene, updates || {});
  }

  function rewardIdsFrom(sequence, sceneId) {
    var scene = sequence.scenes.find(function (candidate) {
      return candidate.id === sceneId;
    });
    return scene && Array.isArray(scene.rewardIds) ? scene.rewardIds.slice() : [];
  }

  function combinedChallenge(sequence, challengeId, updates) {
    return sceneFrom(sequence, challengeId, Object.assign({
      successTitle: "Mission Complete",
      successBody: "Luca completed the real-world challenge.",
      resultLabel: "Adventure updated",
      revealItems: [],
      rewardHandoff: "",
      nextDestination: ""
    }, updates || {}));
  }

  function streamline(sequence, scenes, aliases) {
    sequence.scenes = scenes;
    sequence.sceneAliases = aliases || {};
  }

  var orientation = config.chapters[0];
  var orientationRewards = rewardIdsFrom(orientation, "orientation-reward");
  streamline(orientation, [
    sceneFrom(orientation, "orientation-story", {
      title: "A Signal Is Waiting",
      body: "Something in Creekside is sending a signal. The League tried to answer it all week. This morning, they sent for someone instead."
    }),
    combinedChallenge(orientation, "orientation-challenge", {
      title: "Trainer Oath and Equipment Test",
      successTitle: "You Arrived Just in Time, Luca!",
      successBody: "The Trainer License activates and Mega Gallade joins Luca’s team. Creekside has an official Trainer for the first time.",
      resultLabel: "Trainer License earned",
      revealItems: ["Trainer License activated"],
      rewardIds: orientationRewards,
      rewardHandoff: "Trainer Kit ready! Auntie Ariel hands Luca the TRAINER KIT now. Then place the Journey Together booster in the Save for Celebration container.",
      nextDestination: "But the new Trainer signal has disturbed something in the backyard. Tiny lights are falling from the trees—and Nina saw them first."
    })
  ], {
    "orientation-location": "orientation-story",
    "orientation-character": "orientation-story",
    "orientation-briefing": "orientation-challenge-handoff",
    "orientation-reward": "orientation-challenge-result",
    "orientation-inventory": "orientation-challenge-result",
    "orientation-transition": "orientation-challenge-result"
  });

  var fairy = config.chapters[1];
  var fairyRewards = rewardIdsFrom(fairy, "fairy-reward");
  streamline(fairy, [
    sceneFrom(fairy, "fairy-story", {
      title: "The Fairy Lights Are Missing",
      body: "Eight glowing Fairy Lights appeared throughout the garden. Nina knows where they are—but some are too high for the youngest Gym Leader to reach."
    }),
    sceneFrom(fairy, "fairy-warmup", {
      body: "Eight Fairy Lights fell somewhere in the garden. Count them here, then go find every one."
    }),
    combinedChallenge(fairy, "fairy-challenge", {
      title: "Recover the Eight Fairy Lights",
      successTitle: "The Lights Are Showing the Way!",
      successBody: "Nina stares at the Fairy Table. The eight lights are not scattered anymore. They have formed an arrow.",
      resultLabel: "Fairy Badge earned",
      revealItems: ["The glowing arrow points toward the Partner Professors’ Lab"],
      rewardIds: fairyRewards,
      fragmentSlot: 1,
      fragmentStory: "Under the last light is a small broken piece — warm, marked with a Leaf, and stamped with a number. Nobody in the garden can say what it is.",
      rewardHandoff: "Your reward has appeared! Auntie Ariel hands Luca the FAIRY GYM REWARD now, plus Sky Fragment 1 — call it a Sky Fragment and say nothing else about it. Open the reader and team cards; save the Perfect Order booster for the celebration.",
      nextDestination: "Follow the Fairy Lights. Professor Oak and Professor Monica may know why the garden chose this path."
    })
  ], {
    "fairy-location": "fairy-story",
    "fairy-character": "fairy-story",
    "fairy-briefing": "fairy-challenge-handoff",
    "fairy-reward": "fairy-challenge-result",
    "fairy-inventory": "fairy-challenge-result",
    "fairy-fragment": "fairy-challenge-result",
    "fairy-transition": "fairy-challenge-result"
  });

  var oak = config.chapters[2];
  var oakRewards = rewardIdsFrom(oak, "oak-reward");
  streamline(oak, [
    sceneFrom(oak, "oak-travel", {
      title: "Oak Is Waiting for His Chosen Trainer",
      body: "The Partner Professors’ urgent signal matches the Fairy lights exactly. Professor Oak and Professor Monica are holding the reading steady—but only until Luca arrives."
    }),
    sceneFrom(oak, "oak-story", {
      title: "Something Answered from the Water",
      body: "Four capsules surfaced where the reading was strongest. The Professors’ instruments show two signals — one enormous and far above, one small and very close, the same as the piece already in Luca’s pocket."
    }),
    sceneFrom(oak, "oak-safety", {
      title: "Luca’s Water Preserve Rule",
      instructions: ["Walk near the pool, wait for the Professors’ signal, and retrieve only the marked capsules."]
    }),
    combinedChallenge(oak, "oak-challenge", {
      title: "Recover the Four Research Capsules",
      successTitle: "“…You Actually Found It.”",
      successBody: "The second piece answers the first. Their broken edges fit. The signal is not coming only from the water — something far above Creekside has noticed Luca.",
      resultLabel: "Water Research Badge earned",
      revealItems: ["Two broken pieces fit together"],
      rewardIds: oakRewards,
      fragmentSlot: 2,
      fragmentStory: "A second Sky Fragment, marked with a Wave and stamped with another number. The Professors go very quiet when the edges match.",
      rewardHandoff: "At the dry research table the Professors hand Luca Sky Fragment 2 and the story reward. Let him fit the two pieces together himself. A designated adult carries the larger WATER RESEARCH packages. Save every booster for the celebration.",
      nextDestination: "The same energy has frightened nearby Pokémon. Nurse Joy can help them—but she needs the Trainer the pieces keep answering."
    })
  ], {
    "oak-entrance": "oak-story",
    "monica-entrance": "oak-story",
    "oak-reward": "oak-challenge-result",
    "oak-inventory": "oak-challenge-result",
    "oak-fragment": "oak-challenge-result",
    "oak-transition": "oak-challenge-result"
  });

  var center = config.chapters[3];
  var centerRewards = rewardIdsFrom(center, "center-reward");
  streamline(center, [
    sceneFrom(center, "center-story", {
      title: "The Signal Left a Trail",
      body: "Three Pokémon arrived trembling after the surge from the preserve. Nurse Joy made the Center warm and safe. When they hear Luca approaching, they stop shaking."
    }),
    combinedChallenge(center, "center-challenge", {
      title: "Care for the Pokémon Patients",
      successTitle: "They Trust You, Luca",
      successBody: "The last patient relaxes. Then the Pokémon Center receiver crackles with an unwanted voice.",
      resultLabel: "Care Badge earned",
      revealItems: ["Every patient is safe"],
      rewardIds: centerRewards,
      fragmentSlot: 3,
      fragmentStory: "The frightened Eevee was curled around a third piece — Heart mark, third number, third matching edge. Three of four, and still nobody can say what they make.",
      rewardHandoff: "Nurse Joy hands Luca the POKÉMON CENTER FIELD KIT, the Care Badge, and Sky Fragment 3 now. Open the story items and save the included booster for the celebration.",
      nextDestination: "Team Rocket has been following the same trail—and Mike claims he knows exactly what Luca has been collecting."
    })
  ], {
    "center-location": "center-story",
    "center-character": "center-story",
    "center-briefing": "center-challenge-handoff",
    "center-reward": "center-challenge-result",
    "center-inventory": "center-challenge-result",
    "center-fragment": "center-challenge-result",
    "center-transition": "center-challenge-result"
  });

  var rocket = config.chapters[4];
  var rocketRewards = rewardIdsFrom(rocket, "rocket-reward");
  streamline(rocket, [
    sceneFrom(rocket, "rocket-story", {
      title: "Team Rocket Blocks the Route",
      body: "Mike intercepted Oak’s Ranger Dispatch — the one page that explains the broken pieces — and wrapped it in Team Rocket’s most advanced security system: one basketball hoop and far too much confidence."
    }),
    combinedChallenge(rocket, "rocket-challenge", {
      title: "Break Team Rocket’s Defense",
      successTitle: "Team Rocket’s “Unbeatable” Defense Collapses!",
      successBody: "Team Rocket’s “unbeatable” defense collapses. The Dispatch falls open, and Mike finally says it out loud: four fragments of one Sky Stone, broken apart by the Rangers. The numbers on them are a combination — and Team Rocket never worked out the order.",
      resultLabel: "Rocket Badge earned",
      revealItems: ["The stolen Ranger Dispatch is recovered"],
      rewardIds: rocketRewards,
      fragmentSlot: 4,
      fragmentStory: "The fourth Sky Fragment, marked with a Flame. Four jagged pieces, four numbers, and no way to tell which number comes first.",
      rewardHandoff: "Mike must surrender the stolen loot. Hand Luca the RECOVERED TEAM ROCKET LOOT, the Ranger Dispatch, and Sky Fragment 4. Mike explains the four fragments, the locked vault, and the trampoline — but NOT how to work out the order. This is the reveal, so let him land it. Open the team cards; save the Destined Rivals booster for the celebration.",
      nextDestination: "The Dispatch says the Rangers hid their vault at the closest place to the sky in their whole yard. Go and find it."
    })
  ], {
    "rocket-location": "rocket-story",
    "rocket-character": "rocket-story",
    "rocket-briefing": "rocket-challenge-handoff",
    "rocket-reward": "rocket-challenge-result",
    "rocket-inventory": "rocket-challenge-result",
    "rocket-fragment": "rocket-challenge-result",
    "rocket-transition": "rocket-challenge-result"
  });

  var vault = config.chapters[5];
  var vaultRewards = rewardIdsFrom(vault, "vault-reward");
  streamline(vault, [
    sceneFrom(vault, "vault-story", {
      title: "The Rangers Left a Warning",
      body: "The Rangers broke the Sky Stone apart so Team Rocket could never take it whole, then locked their vault and hid it at the closest place to the sky in their whole yard. Nothing in that yard stands closer than the trampoline."
    }),
    sceneFrom(vault, "vault-fragments"),
    combinedChallenge(vault, "vault-challenge", {
      title: "Recover the Secret Ranger Cache",
      successTitle: "It Won’t Open",
      successBody: "The vault was under the trampoline. Luca tries the lock. Four numbers, four fragments, and no idea which comes first. Carved into the lid: FOUR PIECES, ONE STONE. TAKE THIS TO PROFESSOR OAK.",
      resultLabel: "Ranger Vault Badge earned",
      revealItems: ["A locked Ranger vault, and a message on the lid"],
      rewardIds: vaultRewards,
      rewardHandoff: "Let Luca try the lock himself and fail — that is the beat. Open only the one book strapped to the lid. The vault stays shut and travels to Oak with him; nobody hints at the answer on the way.",
      nextDestination: "The lid names Professor Oak. Only he knows what four broken pieces do when they finally go back together."
    })
  ], {
    "vault-location": "vault-story",
    "vault-character": "vault-story",
    "vault-briefing": "vault-challenge-handoff",
    "vault-reward": "vault-challenge-result",
    "vault-inventory": "vault-challenge-result",
    "vault-transition": "vault-challenge-result"
  });

  var victory = config.chapters[6];
  var championRewards = rewardIdsFrom(victory, "champion-reward");
  streamline(victory, [
    sceneFrom(victory, "victory-story", {
      title: "The Legend Tests the Path",
      body: "The signal has gathered above Home Base. Guarding the last stretch is the Elite Four Wild Card—and she has invented her own League trial, which she is absolutely certain she cannot lose.",
      instructions: undefined
    }),
    combinedChallenge(victory, "victory-challenge-a", {
      title: "Clear Victory Road",
      body: "Play POKÉ against the Elite Four Wild Card. She invents the trick, Luca copies it, and four missed letters end her reign.",
      successTitle: "The Elite Four Wild Card Is Out!",
      successBody: "P… O… K… É. Auntie Ariel goes down in spectacular fashion, and the sky answers with a Legendary cry.",
      resultLabel: "Victory Road achievement earned",
      revealItems: ["A green spiral opens above the trees"],
      nextDestination: "Don’t leave the path. Auntie Ariel is watching the sky."
    }),
    /* The Legendary encounter is one screen now: Luca sees Rayquaza arrive and
       the same protected hold that used to live on a separate control screen
       releases the result. The mechanics live on the printed cast guide. */
    sceneFrom(victory, "victory-challenge-b", {
      type: "cast-handoff",
      audience: "luca",
      title: "Mega Rayquaza Appears!",
      body: PLAYER_MISSION_BRIEFS.rayquaza.body,
      characterName: PLAYER_MISSION_BRIEFS.rayquaza.characterName,
      handoffLabel: MISSION_COMPLETE_HOLD_LABEL,
      successRule: undefined,
      fallbackText: undefined,
      adultPrompt: undefined
    }),
    {
      id: "victory-challenge-b-result",
      type: "relay-result",
      audience: "luca",
      title: "Legendary Success!",
      body: "Mega Rayquaza lowers its guard. It was never attacking—it was waiting to see which Trainer would reach the end of the signal.",
      resultLabel: "Legendary encounter complete",
      revealItems: ["Rayquaza lowers its head"],
      rewardIds: [],
      nextDestination: "Auntie Ariel raises her hand. The Creekside Champion may enter."
    },
    combinedChallenge(victory, "champion-challenge", {
      title: "Challenge the Creekside Champion",
      successTitle: "Champion Luca",
      successBody: "The Champion asked three questions about Pokémon and one question about people. Luca answered every one, and named every single person who got him here.",
      resultLabel: "Champion Luca",
      revealItems: ["The Creekside Region has a new Champion"],
      rewardIds: championRewards,
      rewardHandoff: "Your greatest reward has appeared! Patrick hands Luca the POKÉMON LEAGUE CHAMPION CHEST now. Open the League Battle Deck and Rayquaza model; save every booster for the celebration. Do not put the Sky Fragments away — Patrick needs them one more time.",
      nextDestination: "A Champion never reaches the end alone. The Hall of Heroes is ready."
    }),
    sceneFrom(victory, "hall-of-heroes", {
      body: "A Champion never reaches the end alone. Every name here became part of Luca’s story—and every one helped him reach this moment.",
      tributes: {
        ariel: "Made Luca’s first mission official",
        nina: "Found the fallen Fairy lights first",
        bruce: "Put the Sky Stone back together with Luca",
        monica: "Discovered where the signal was leading",
        polly: "Helped every Pokémon feel safe",
        mike: "Brought Team Rocket’s “unbeatable” defense",
        patrick: "Asked the questions only a Champion could answer",
        hannah: "Broke the Sky Stone apart to keep it safe",
        noa: "Broke the Sky Stone apart to keep it safe"
      }
    }),
    sceneFrom(victory, "fake-credits"),
    sceneFrom(victory, "champion-transition", {
      type: "champion-final",
      title: "Champion Luca",
      body: "Creekside Region Journey Complete"
    })
  ], {
    "victory-location": "victory-story",
    "victory-character": "victory-story",
    "victory-stage-a": "victory-story",
    "victory-stage-b": "victory-challenge-b",
    "victory-challenge-b-handoff": "victory-challenge-b",
    "victory-challenge-b-privacy": "victory-challenge-b",
    "victory-challenge-b-control": "victory-challenge-b",
    "victory-challenge-b-return": "victory-challenge-b-result",
    "champion-character": "champion-challenge-handoff",
    "champion-stage": "champion-challenge-handoff",
    "champion-reward": "champion-challenge-result",
    "champion-inventory": "champion-challenge-result",
    "group-photo": "hall-of-heroes"
  });

  var checkpoint = config.checkpoint;
  var checkpointRewards = rewardIdsFrom(checkpoint, "oak-return-reward");
  streamline(checkpoint, [
    sceneFrom(checkpoint, "oak-return-travel", {
      type: "story",
      title: "Oak Reads the Lid",
      body: "Carry the locked vault and all four fragments to the Partner Professors. Oak reads the lid once, nods, and asks for the pieces."
    }),
    combinedChallenge(checkpoint, "oak-return-challenge", {
      title: "Open the Ranger Vault",
      successTitle: "Four Pieces, One Stone",
      successBody: "The jagged edges only join one way. Turned over, the four faces make a single stone — and read straight across, the four numbers finally have an order. Luca dials it himself and the lock falls open. It fell from the Sky Pillar, and Mega Rayquaza has been circling Creekside looking for it.",
      resultLabel: "Victory Road authorized",
      revealItems: ["The vault is open"],
      rewardIds: checkpointRewards,
      rewardHandoff: "Luca assembles the stone and dials the lock himself — this is the payoff for the whole morning, so give it room. Then open the vault: the SECRET RANGER CACHE and the MEGA EVOLUTION RESEARCH FILE reward come out together. Open the books, tin, and team cards; every booster goes in the Satchel. He keeps the Sky Stone and League Authorization.",
      nextDestination: "The destination is Home Base—but the Ranger record calls the route Victory Road. Something legendary is waiting at its end."
    })
  ], {
    "oak-return-character": "oak-return-travel",
    "oak-return-analysis": "oak-return-challenge-handoff",
    "oak-return-reward": "oak-return-challenge-result",
    "oak-return-transition": "oak-return-challenge-result"
  });

  var mew = config.epilogue;
  var mewRewards = rewardIdsFrom(mew, "mew-reward").concat(rewardIdsFrom(mew, "mew-celebration"));
  streamline(mew, [
    sceneFrom(mew, "champion-code-question"),
    sceneFrom(mew, "mew-glitch"),
    sceneFrom(mew, "mew-transmission", {
      title: "Professor Oak’s Impossible Reading",
      body: "The Rangers did not choose those numbers at random, and neither did whatever answered them. The reading is small, ancient, and impossibly gentle. Oak sends only two words: “Luca—follow it.”"
    }),
    sceneFrom(mew, "mew-stage"),
    combinedChallenge(mew, "mew-challenge", {
      title: "Follow the Mythical Trail",
      successTitle: "Mew Chose Luca",
      successBody: "Mew chose to be seen by Luca. It came because it wanted to.",
      resultLabel: "A Mythical moment",
      revealItems: ["A quiet Mythical encounter"],
      rewardIds: mewRewards,
      rewardHandoff: "Let the moment stay quiet. Then reveal the separate MYTHICAL ENCOUNTER box and place the Mew figure in Luca’s hands.",
      nextDestination: "Gather the family for popsicles and open the saved Booster Satchel together."
    })
  ], {
    "mew-location": "mew-transmission",
    "mew-reward": "mew-challenge-result",
    "mew-celebration": "mew-challenge-result"
  });

  function applyAudienceContract(sequence) {
    sequence.legacyV2SceneIds = legacyV2SceneIdsBySequence[sequence.id].slice();
    sequence.scenes = sequence.scenes.map(function (scene) {
      return Object.assign({}, scene, { audience: scene.preserveAudience ? scene.audience : "luca" });
    });
  }

  config.chapters.forEach(applyAudienceContract);
  applyAudienceContract(config.checkpoint);
  applyAudienceContract(config.epilogue);

  var relayCueByChallengeId = {
    "orientation-challenge": "orientation",
    "fairy-challenge": "fairy",
    "oak-challenge": "oak-water",
    "center-challenge": "nurse-joy",
    "rocket-challenge": "rocket",
    "vault-challenge": "vault",
    "victory-challenge-a": "victory-road",
    "champion-challenge": "champion",
    "oak-return-challenge": "oak-return",
    "mew-challenge": "mew"
  };

  /* Each live encounter is two player-facing screens: the mission brief that
     ends in the protected "mission is complete" hold, and the reveal. The
     privacy shield, runtime cast screen, return shield, and adult reward
     checklist all moved to the printed cast guides and the printed gift map. */
  function buildRelayScenes(originalScene, cue) {
    var brief = PLAYER_MISSION_BRIEFS[cue.id];
    return [
      {
        id: originalScene.id + "-handoff",
        type: "cast-handoff",
        audience: "luca",
        title: originalScene.title,
        body: brief.body,
        characterName: brief.characterName,
        handoffLabel: MISSION_COMPLETE_HOLD_LABEL,
        cueId: cue.id
      },
      {
        id: originalScene.id + "-result",
        type: "relay-result",
        audience: "luca",
        title: originalScene.successTitle || ("Mission Complete: " + originalScene.title),
        body: originalScene.successBody || "Outstanding work! The real-world mission is complete and Luca’s Trainer record has been updated.",
        resultLabel: originalScene.resultLabel,
        revealItems: Array.isArray(originalScene.revealItems) ? originalScene.revealItems.slice(0, 1) : [],
        rewardIds: Array.isArray(originalScene.rewardIds) ? originalScene.rewardIds.slice() : [],
        fragmentSlot: originalScene.fragmentSlot,
        fragmentStory: originalScene.fragmentStory,
        nextDestination: originalScene.nextDestination,
        cueId: cue.id
      }
    ];
  }

  /* A mid-event refresh must never strand anyone on a screen that no longer
     exists, so every ID the paper-cast rebuild removed still resolves to the
     nearest surviving player-facing screen. */
  function registerRemovedRelayAliases(sequence, challengeId) {
    var aliases = sequence.sceneAliases || (sequence.sceneAliases = {});
    aliases[challengeId + "-privacy"] = challengeId + "-handoff";
    aliases[challengeId] = challengeId + "-handoff";
    aliases[challengeId + "-return"] = challengeId + "-result";
    aliases[challengeId + "-logistics"] = challengeId + "-result";
  }

  function applyTheatricalRelays(sequence) {
    sequence.scenes = sequence.scenes.reduce(function (scenes, scene) {
      var cueId = relayCueByChallengeId[scene.id];
      if (!cueId) return scenes.concat(scene);
      var cue = window.CREEKSIDE_CAST_CORES && window.CREEKSIDE_CAST_CORES[cueId];
      if (!cue) {
        return scenes.concat({
          id: scene.id + "-handoff",
          type: "cast-handoff",
          audience: "adult",
          title: "Mission Recovery",
          body: "The printed guide could not be matched. Open Parent Mode and return to the preceding scene.",
          performerName: "Lead Adult",
          handoffLabel: "Adult: Hold to open recovery instructions"
        });
      }
      registerRemovedRelayAliases(sequence, scene.id);
      return scenes.concat(buildRelayScenes(scene, cue));
    }, []);
  }

  config.chapters.forEach(applyTheatricalRelays);
  applyTheatricalRelays(config.checkpoint);
  applyTheatricalRelays(config.epilogue);

  window.CREEKSIDE_CONFIG = config;
})();
