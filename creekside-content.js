/* Creekside Region V3 production content.
   Loaded after data.js so the preserved V1 data remains intact while this
   file is the source of truth for the configurable Creekside engine.

   SECURITY: symbolic fragment labels are not keypad digits. Never place the
   real entry code, a code-derived hint, or a digit field in this repository.
*/
(function () {
  "use strict";

  var OPEN_NOW = "OPEN NOW";
  var CARRY_LATER = "CARRY FOR LATER";
  var SAVE_CELEBRATION = "SAVE FOR CELEBRATION";

  function reward(label, category, disposition, packageId) {
    return { label: label, category: category, disposition: disposition, packageId: packageId };
  }

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

    codeFragments: [
      { slot: 1, id: "fragment-leaf", displaySymbol: "Leaf" },
      { slot: 2, id: "fragment-star", displaySymbol: "Star" },
      { slot: 3, id: "fragment-heart", displaySymbol: "Heart" },
      { slot: 4, id: "fragment-wave", displaySymbol: "Wave" },
    ],

    rewards: {
      "blue-deck-box": reward("Blue deck box", "equipment", OPEN_NOW, "TRAINER KIT"),
      "red-card-sleeves": reward("Red Pokémon card sleeves", "equipment", OPEN_NOW, "TRAINER KIT"),
      "cardboard-gold-top-loaders": reward("Cardboard Gold top loaders", "equipment", OPEN_NOW, "TRAINER KIT"),
      "one-touch-edge-case": reward("Ultra Pro One-Touch Edge case", "equipment", OPEN_NOW, "TRAINER KIT"),
      "mega-gallade-ex": reward("Mega Gallade ex", "team-card", OPEN_NOW, "TRAINER KIT"),
      "journey-together-booster": reward("Journey Together booster", "booster", SAVE_CELEBRATION, "TRAINER KIT"),
      "trainer-license": reward("Trainer License", "badge", CARRY_LATER, "TRAINER KIT"),
      "ranger-code-card": reward("Ranger Code Record Card", "quest-item", CARRY_LATER, "TRAINER KIT"),

      "sweet-surprise-reader": reward("Pokémon: Sweet Surprise reader", "book", OPEN_NOW, "FAIRY GYM REWARD"),
      "mega-clefable-ex": reward("Mega Clefable ex", "team-card", OPEN_NOW, "FAIRY GYM REWARD"),
      "alcremie-ex": reward("Alcremie ex", "team-card", OPEN_NOW, "FAIRY GYM REWARD"),
      "perfect-order-loose-1": reward("Loose Perfect Order booster", "booster", SAVE_CELEBRATION, "FAIRY GYM REWARD"),
      "fairy-badge": reward("Fairy Badge", "badge", CARRY_LATER, "FAIRY GYM REWARD"),

      "water-mini-tin": reward("Water-themed Pokémon mini tin", "gift", OPEN_NOW, "WATER RESEARCH CAPSULES 1–4"),
      "chaos-rising-1": reward("Chaos Rising booster from capsule", "booster", SAVE_CELEBRATION, "WATER RESEARCH CAPSULES 1–4"),
      "water-mini-tin-packs": reward("Packs inside water mini tin", "booster", SAVE_CELEBRATION, "WATER RESEARCH CAPSULES 1–4"),
      "sky-fragment": reward("Sky Fragment prop", "quest-item", CARRY_LATER, "WATER RESEARCH CAPSULES 1–4"),
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

      "mega-evolutions-sticker-book": reward("Official Mega Evolutions Sticker Book", "book", OPEN_NOW, "MEGA EVOLUTION RESEARCH FILE"),
      "mega-abomasnow-ex": reward("Mega Abomasnow ex", "team-card", OPEN_NOW, "MEGA EVOLUTION RESEARCH FILE"),
      "mega-evolution-booster": reward("Loose Mega Evolution booster", "booster", SAVE_CELEBRATION, "MEGA EVOLUTION RESEARCH FILE"),
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
          { id: "orientation-briefing", type: "challenge-briefing", title: "Trainer Oath and Equipment Test", instructions: ["Promise to protect Pokémon, help friends, play fairly, and never give up.", "Sleeve one card.", "Place it in a top loader.", "Secure it in the deck box."] },
          { id: "orientation-challenge", type: "physical-challenge", title: "Become an Official Trainer", body: "Take the Trainer Oath and complete the equipment test with Auntie Ariel.", successRule: "Complete each equipment step once. Ariel may help with any fiddly packaging.", fallbackText: "Ariel may hold the sleeve or top loader while Luca slides the card into place.", adultPrompt: "League Recruiter: hold to confirm the oath and equipment test are complete." },
          { id: "orientation-reward", type: "reward", title: "Trainer Kit Earned", body: "Open the Trainer equipment now. Place the booster in the adult-carried Booster Satchel.", rewardIds: ["blue-deck-box","red-card-sleeves","cardboard-gold-top-loaders","one-touch-edge-case","mega-gallade-ex","journey-together-booster","trainer-license","ranger-code-card"] },
          { id: "orientation-inventory", type: "inventory-update", title: "Trainer Profile Activated", body: "Mega Gallade joins the team. The Trainer License and Ranger Code Card are ready." },
          { id: "orientation-fragment", type: "code-fragment-record", title: "Ranger Fragment 1", body: "Write the private physical digit in Slot 1 on the Ranger Code Card. The app records only the Leaf symbol.", fragmentSlot: 1 },
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
          { id: "fairy-warmup", type: "digital-warmup", title: "Optional Fairy Scan", body: "Optional: count eight glowing Fairy symbols, then put the phone away." },
          { id: "fairy-briefing", type: "challenge-briefing", title: "Recover Eight Fairy Lights", instructions: ["Follow Nina’s pointing and short clues.", "Retrieve each battery tea light from a safe, reachable hiding place.", "Bring every light to the Fairy Table."] },
          { id: "fairy-challenge", type: "physical-challenge", title: "Help Nina Restore the Garden", body: "Search safe low branches, bushes, and backyard hiding places with Nina.", successRule: "Bring all eight battery tea lights to the Fairy Table. An adult quietly arranges them into an arrow.", fallbackText: "Move every remaining light into plain sight or let an adult give the clues. Use fewer lights if needed, then complete the arrow.", adultPrompt: "Fairy Garden Guide: hold to confirm the eight lights form an arrow on the table." },
          { id: "fairy-reward", type: "reward", title: "Fairy Gym Reward", body: "Open the reader and team cards now. Save the Perfect Order booster for the final celebration.", rewardIds: ["sweet-surprise-reader","mega-clefable-ex","alcremie-ex","perfect-order-loose-1","fairy-badge"] },
          { id: "fairy-inventory", type: "inventory-update", title: "Fairy Team Update", body: "Mega Clefable and Alcremie join the team. The Fairy Badge is recorded." },
          { id: "fairy-fragment", type: "code-fragment-record", title: "Ranger Fragment 2", body: "Record the second physical digit on the Ranger Code Card. The app records only the Star symbol.", fragmentSlot: 2 },
          { id: "fairy-transition", type: "chapter-transition", title: "Professor Oak Requests Assistance", body: "A priority transmission reports research objects beneath the Water Research Preserve. Travel begins now for a 10:15 arrival." },
        ],
      },
      {
        id: "professor-oak-lab", number: 3, name: "Professor Oak's Water Research Lab", lockedName: "Priority Water Signal",
        type: "water", art: "mega-blastoise.png", locationLabel: "Professor Oak's Lab", scheduleLabel: "Travel 9:52–10:15 · Mission 10:15–10:35", targetMinutes: 43,
        participantIds: ["bruce","monica"],
        scenes: [
          { id: "oak-travel", type: "travel-location", title: "Travel to Professor Oak's Lab", body: "Allow travel and costume-reset time. Target arrival: 10:15 a.m. Bring the phone, Ranger Code Card, and an adult." },
          { id: "oak-entrance", type: "story", title: "The Professors Are Watching the Water", body: "Professor Oak and Professor Monica are studying a strange signal at the preserve. Something important is moving beneath the surface." },
          { id: "monica-entrance", type: "story", title: "The Capsule Readings Are Rising", body: "Four sealed research capsules are missing. The Partner Professors need a Trainer before Team Rocket detects the same energy." },
          { id: "oak-story", type: "story", title: "Four Research Capsules", body: "One capsule holds the final Ranger fragment. Another holds a Sky Fragment producing unstable Mega Energy." },
          { id: "oak-safety", type: "challenge-briefing", title: "Water Research Safety Briefing", instructions: ["One supervising adult watches the water continuously.", "No running on the pool deck.", "Retrieve only floating or shallow prepared capsules.", "Use the skimmer immediately if swimming is not the best option."] },
          { id: "oak-challenge", type: "physical-challenge", title: "Recover the Four Capsules", body: "Use Monica's symbol diagram, retrieve four double-sealed capsules, identify the unstable-energy symbol, and place the Sky Fragment in the research tray.", successRule: "Retrieve all four safely; swimming should be brief and purposeful.", fallbackText: "Use the pool skimmer, float capsules in a tub, or retrieve four marked tennis balls from the deck.", adultPrompt: "Supervising adult: hold to confirm all four research objects are safely recovered." },
          { id: "oak-reward", type: "reward", title: "Professor Oak's Field Research Reward", body: "Open the books, collection, and water mini tin as directed. Every booster goes unopened into the Booster Satchel.", rewardIds: ["water-mini-tin","chaos-rising-1","water-mini-tin-packs","sky-fragment","first-partner-collection","new-journey-reader","adventures-collector-02","first-partner-boosters","water-research-badge"] },
          { id: "oak-inventory", type: "inventory-update", title: "Research Inventory Updated", body: "The Sky Fragment and Water Research Badge are secured for the larger mystery." },
          { id: "oak-fragment", type: "code-fragment-record", title: "Ranger Fragment 4", body: "Record the final physical digit in Slot 4. The app records only the Wave symbol.", fragmentSlot: 4 },
          { id: "oak-transition", type: "chapter-transition", title: "A Pokémon Center Emergency", body: "Oak's readings reveal Pokémon affected by unstable Mega Energy. Nurse Joy needs Luca next." },
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
          { id: "center-fragment", type: "code-fragment-record", title: "Ranger Fragment 3", body: "Record the third physical digit on the Ranger Code Card. The app records only the Heart symbol.", fragmentSlot: 3 },
          { id: "center-transition", type: "chapter-transition", title: "Team Rocket Intercepts the Mission", body: "A loud transmission cuts through the Center. Team Rocket has stolen Professor Oak's Ranger Dispatch." },
        ],
      },
      {
        id: "team-rocket-base", number: 5, name: "Team Rocket Basketball Base", lockedName: "Intercepted Transmission",
        type: "fire", art: "mega-charizard-y.png", locationLabel: "Team Rocket Base", scheduleLabel: "10:47–10:59", targetMinutes: 12,
        participantIds: ["mike"],
        scenes: [
          { id: "rocket-story", type: "story", title: "Team Rocket Blocks the Route", body: "Mike stole the Ranger Dispatch and built a basketball defense around it." },
          { id: "rocket-location", type: "travel-location", title: "Approach Team Rocket Base", body: "Travel with an adult to the prepared adjustable-hoop station." },
          { id: "rocket-character", type: "story", title: "The Team Rocket Boss Is Waiting", body: "Team Rocket is guarding the stolen supplies. Their boss is waiting at the Defense Base with Professor Oak’s Ranger Dispatch." },
          { id: "rocket-briefing", type: "challenge-briefing", title: "Break the Three-Round Defense", instructions: ["Round 1: make one comfortable close shot.", "Round 2: score two baskets in five attempts, or earn three points from baskets and target hits.", "Round 3: choose a team card and attempt the Final Poké Shot."] },
          { id: "rocket-challenge", type: "physical-challenge", title: "Defeat Team Rocket's Basketball Base", body: "Complete the three forgiving rounds while Mike delivers dramatic commentary.", successRule: "Basket = 2 points; rim, backboard, or prepared target = 1 point. After two misses, move closer. Mike must eventually lose.", fallbackText: "Lower the hoop, use the closest marker, hit a large backboard target, or let Ariel perform the Team Rocket role.", adultPrompt: "Team Rocket Boss: hold to surrender the stolen Ranger Dispatch." },
          { id: "rocket-reward", type: "reward", title: "Recovered Team Rocket Loot", body: "Open the three team cards. Place the Destined Rivals booster in the Booster Satchel and carry the Ranger Dispatch.", rewardIds: ["rocket-nidoking-ex","incineroar-ex","mega-pyroar-ex","destined-rivals-1","ranger-dispatch","rocket-badge"] },
          { id: "rocket-inventory", type: "inventory-update", title: "Rocket Defeated", body: "Nidoking, Incineroar, and Mega Pyroar join the team. The stolen dispatch explains the Ranger fragments." },
          { id: "rocket-transition", type: "chapter-transition", title: "The Secret Ranger Vault", body: "Rangers Hannah and Noa left a protected cache. The four physical digits now have a purpose." },
        ],
      },
      {
        id: "secret-ranger-vault", number: 6, name: "Secret Ranger Vault", lockedName: "Protected Ranger Mystery",
        type: "psychic", art: "mega-gengar.png", locationLabel: "Secret Ranger Vault", scheduleLabel: "10:59–11:09", targetMinutes: 10,
        participantIds: ["hannah","noa"],
        requiresFragments: 4,
        scenes: [
          { id: "vault-story", type: "story", title: "The Rangers Left a Warning", body: "Rangers Hannah and Noa are away on expedition. They protected supplies and a sealed research file for a trustworthy Trainer." },
          { id: "vault-location", type: "travel-location", title: "Travel with an Adult Escort", body: "Bring the physical Ranger Code Card to the approved front-entry area. The app never asks for the digits." },
          { id: "vault-character", type: "story", title: "A Secure Ranger Transmission", body: "Rangers Hannah and Noa left a protected cache for the Trainer who recovered all four physical fragments. An Adult Escort must stay beside Luca." },
          { id: "vault-fragments", type: "fragment-check", title: "Four Ranger Symbols Recorded", body: "Leaf, Star, Heart, and Wave are complete. Read the private digits only from the physical Ranger Code Card." },
          { id: "vault-briefing", type: "challenge-briefing", title: "Enter the Ranger Vault", instructions: ["An adult stays beside Luca.", "Use the real keypad with the physical card.", "Remain in the approved front-entry area.", "Follow three prepared Ranger symbols to the cache."] },
          { id: "vault-challenge", type: "physical-challenge", title: "Recover the Secret Ranger Cache", body: "Enter with an adult, follow the symbols, recover the gift bag, and find the sealed Research File without opening it.", successRule: "The adult may enter the physical code or lead directly to the approved cache if needed.", fallbackText: "If access or timing changes, the adult brings the sealed cache outside and the mission continues there.", adultPrompt: "Adult escort: hold to confirm the cache and sealed file are safely recovered." },
          { id: "vault-reward", type: "reward", title: "Secret Ranger Cache", body: "Open the books, mini tin, and team cards. Keep every booster sealed and carry the Research File.", rewardIds: ["five-minute-stories","how-to-draw","fire-mini-tin","mabosstiff-ex","electivire-ex","ascended-heroes","phantasmal-flames","chaos-rising-2","fire-mini-tin-packs","sealed-research-file","league-qualification-seal","ranger-vault-badge"] },
          { id: "vault-inventory", type: "inventory-update", title: "Ranger Mission Complete", body: "The Research File and League Qualification seal unlock Professor Oak's return analysis." },
          { id: "vault-transition", type: "chapter-transition", title: "Return to Professor Oak", body: "Oak requests the Sky Fragment and sealed file before noon. Victory Road remains locked until his analysis." },
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
          { id: "victory-stage-a", type: "multi-stage-progress", title: "Stage A: Victory Road Course", instructions: ["Weave through the Tall Grass markers.", "Balance along the Forest Crossing line.", "Land three soft balls in the target.", "Find three Energy Tokens near the trees."] },
          { id: "victory-challenge-a", type: "physical-challenge", stage: 1, title: "Clear Victory Road", body: "Complete the four fast stations with Ariel narrating and helping.", successRule: "Complete each station once; accuracy can be assisted and harmless comedy penalties replace failure.", fallbackText: "Move under the patio or indoors. Use a hallway path and larger targets.", adultPrompt: "Victory Road Referee: hold to confirm all four stations are complete." },
          { id: "victory-stage-b", type: "multi-stage-progress", title: "Stage B: Mega Rayquaza", instructions: ["Aim one soft Poké Ball at the hanging Rayquaza target.", "One clear target hit completes the encounter.", "Ariel may invoke a Legendary Assist at any time."] },
          { id: "victory-challenge-b", type: "physical-challenge", stage: 2, title: "Calm Mega Rayquaza", body: "Hit the prepared soft-ball target or complete the alternate ring/symbol challenge.", successRule: "One success, or a Legendary Assist after two minutes.", fallbackText: "Use ring toss or assemble three Sky symbols instead of throwing.", adultPrompt: "Victory Road Referee: hold to confirm Rayquaza is calm." },
          { id: "champion-character", type: "story", title: "The Champion Is Waiting", body: "Victory Road is complete and Rayquaza is calm. The reigning Creekside Champion is waiting just out of sight for the final match." },
          { id: "champion-stage", type: "multi-stage-progress", title: "Stage C: Champion Match", instructions: ["Knowledge: choose a helpful type response.", "Skill: complete one comfortable target toss.", "Heart: name one person or Pokémon who helped today."] },
          { id: "champion-challenge", type: "physical-challenge", stage: 3, title: "Challenge the Champion", body: "Complete the Knowledge, Skill, and Heart rounds with Patrick.", successRule: "Every sincere answer counts. The target moves closer after a miss.", fallbackText: "Patrick supplies two choices, uses the closest marker, and celebrates Luca's effort.", adultPrompt: "Champion: hold to concede the match and award the title." },
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
      id: "oak-return", name: "Professor Oak Return Checkpoint", lockedName: "Research Analysis Required",
      type: "water", art: "mega-blastoise.png", locationLabel: "Professor Oak's Lab",
      scheduleLabel: "11:09–11:17", targetMinutes: 8, afterChapterId: "secret-ranger-vault",
      participantIds: ["bruce","monica"],
      scenes: [
        { id: "oak-return-travel", type: "travel-location", title: "Return Before Noon", body: "Bring the Sky Fragment and sealed Research File back to Professor Oak's Lab. Target arrival: 11:09 a.m." },
        { id: "oak-return-character", type: "story", title: "The Partner Professors Are Ready", body: "Professor Oak and Professor Monica are waiting to analyze the Sky Fragment and sealed Ranger file together." },
        { id: "oak-return-analysis", type: "checkpoint", title: "Mega Evolution Analysis", instructions: ["Present the Sky Fragment.", "Monica opens the sealed Research File.", "Answer one friendly callback question.", "Receive League Authorization."] },
        { id: "oak-return-challenge", type: "physical-challenge", title: "Qualify for the Pokémon League", body: "Review Luca's badges, team, and earlier missions with Bruce and Monica.", successRule: "Any remembered detail or prompted answer counts.", fallbackText: "Shorten to one callback question if behind schedule.", adultPrompt: "Professor Oak: hold to award League Authorization." },
        { id: "oak-return-reward", type: "reward", title: "Mega Evolution Research File", body: "Open the sticker book and Mega Abomasnow card. Save the booster and carry League Authorization.", rewardIds: ["mega-evolutions-sticker-book","mega-abomasnow-ex","mega-evolution-booster","league-authorization","sky-pillar-coordinates"] },
        { id: "oak-return-transition", type: "chapter-transition", title: "Victory Road Authorized", body: "Mega Rayquaza energy is gathering above Victory Road. Luca is cleared for the final League trial." },
      ],
    },

    epilogue: {
      id: "mew-epilogue", lockedName: "Hidden", name: "The Mythical Signal",
      type: "psychic", art: "mew.png", locationLabel: "Mythical Trail", scheduleLabel: "11:30–11:36", targetMinutes: 6,
      scenes: [
        { id: "mew-glitch", type: "glitch", title: "SIGNAL DETECTED", body: "The finished screen flickers. Professor Oak's scanner has detected a Pokémon that should be impossible to find." },
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
      successBody: "The Trainer License activates. Mega Gallade joins Luca’s team, and the first Ranger mark appears.",
      resultLabel: "Trainer License earned",
      revealItems: ["Trainer License activated"],
      rewardIds: orientationRewards,
      fragmentSlot: 1,
      fragmentStory: "The first Ranger mark appears. Three remain—and nobody knows what they open.",
      rewardHandoff: "Trainer Kit ready! Auntie Ariel hands Luca the TRAINER KIT now. Introduce the Ranger Code Card and pencil, then place the Journey Together booster in the Save for Celebration container.",
      nextDestination: "But the new Trainer signal has disturbed something in the backyard. Tiny lights are falling from the trees—and Nina saw them first."
    })
  ], {
    "orientation-location": "orientation-story",
    "orientation-character": "orientation-story",
    "orientation-briefing": "orientation-challenge-handoff",
    "orientation-reward": "orientation-challenge-result",
    "orientation-inventory": "orientation-challenge-result",
    "orientation-fragment": "orientation-challenge-result",
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
      body: "Optional: count eight glowing Fairy symbols, then put the phone away and begin the real search."
    }),
    combinedChallenge(fairy, "fairy-challenge", {
      title: "Recover the Eight Fairy Lights",
      successTitle: "The Lights Are Showing the Way!",
      successBody: "Nina stares at the Fairy Table. The eight lights are not scattered anymore. They have formed an arrow.",
      resultLabel: "Fairy Badge earned",
      revealItems: ["The glowing arrow points toward the Partner Professors’ Lab"],
      rewardIds: fairyRewards,
      fragmentSlot: 2,
      fragmentStory: "Two Ranger marks. Perhaps the lights know what the card will open.",
      rewardHandoff: "Your reward has appeared! Auntie Ariel hands Luca the FAIRY GYM REWARD now. Open the reader and team cards; save the Perfect Order booster for the celebration.",
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
      body: "Four capsules surfaced where the reading was strongest. One carries an ancient Sky Fragment. Neither Professor says what they fear it means."
    }),
    sceneFrom(oak, "oak-safety", {
      title: "Luca’s Water Preserve Rule",
      instructions: ["Walk near the pool, wait for the Professors’ signal, and retrieve only the marked capsules."]
    }),
    combinedChallenge(oak, "oak-challenge", {
      title: "Recover the Four Research Capsules",
      successTitle: "“…You Actually Found It.”",
      successBody: "The Sky Fragment answers Luca. The signal is not coming only from the water. Something far above Creekside has noticed him.",
      resultLabel: "Water Research Badge earned",
      revealItems: ["The Sky Fragment answered Luca"],
      rewardIds: oakRewards,
      fragmentSlot: 4,
      fragmentStory: "Three Ranger marks. The Professors go quiet when they see the Wave.",
      rewardHandoff: "The Professors hand Luca the critical clue and story reward at the dry research table. A designated adult carries the larger WATER RESEARCH packages for later. Save every booster for the celebration.",
      nextDestination: "The same energy has frightened nearby Pokémon. Nurse Joy can help them—but she needs the Trainer the signal responds to."
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
      fragmentStory: "Four Ranger marks. The card is complete. Now something has to open.",
      rewardHandoff: "Nurse Joy hands Luca the POKÉMON CENTER FIELD KIT, Care Badge, and Heart clue now. Open the story items and save the included booster for the celebration.",
      nextDestination: "Team Rocket has been following the same energy trail—and Mike claims he knows what the Sky Fragment opens."
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
      body: "Mike intercepted Oak’s Ranger Dispatch and wrapped it in Team Rocket’s most advanced security system: one basketball hoop and far too much confidence."
    }),
    combinedChallenge(rocket, "rocket-challenge", {
      title: "Break Team Rocket’s Defense",
      successTitle: "Team Rocket’s “Unbeatable” Defense Collapses!",
      successBody: "Team Rocket’s “unbeatable” defense collapses. The stolen Dispatch falls open to a Ranger symbol older than Creekside.",
      resultLabel: "Rocket Badge earned",
      revealItems: ["The stolen Ranger Dispatch is recovered"],
      rewardIds: rocketRewards,
      rewardHandoff: "Mike must surrender the stolen loot. Hand Luca the RECOVERED TEAM ROCKET LOOT and Ranger Dispatch now. Open the team cards; save the Destined Rivals booster for the celebration.",
      nextDestination: "The Dispatch says the four fragments do not hide treasure. They protect a warning the Rangers believed someone would need. Why did they leave it for Luca?"
    })
  ], {
    "rocket-location": "rocket-story",
    "rocket-character": "rocket-story",
    "rocket-briefing": "rocket-challenge-handoff",
    "rocket-reward": "rocket-challenge-result",
    "rocket-inventory": "rocket-challenge-result",
    "rocket-transition": "rocket-challenge-result"
  });

  var vault = config.chapters[5];
  var vaultRewards = rewardIdsFrom(vault, "vault-reward");
  streamline(vault, [
    sceneFrom(vault, "vault-story", {
      title: "The Rangers Left a Warning",
      body: "Rangers Hannah and Noa sealed their evidence before leaving. Their message names no Pokémon—only four symbols, the Sky Fragment, and one instruction: bring the file back to Oak unopened."
    }),
    sceneFrom(vault, "vault-fragments"),
    combinedChallenge(vault, "vault-challenge", {
      title: "Recover the Secret Ranger Cache",
      successTitle: "The Sealed File Was Waiting",
      successBody: "Outside the protected area, the sealed file reveals the same mark as Luca’s Trainer License. No one opens it.",
      resultLabel: "Ranger Vault Badge earned",
      revealItems: ["The sealed Research File was waiting for Luca"],
      rewardIds: vaultRewards,
      rewardHandoff: "Outside the Ranger boundary, open one story item only. Keep the Research File sealed; the designated bag carrier takes the larger cache home or to the Professors. Save every booster for the celebration.",
      nextDestination: "Oak must see the matching mark immediately. Whatever the Rangers discovered, they expected Professor Oak’s chosen Trainer to finish it."
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
      body: "The Ranger legend is true: the signal has gathered above Home Base. Victory Road will test four powers Luca has shown all day—courage, kindness, persistence, and trust.",
      instructions: undefined
    }),
    combinedChallenge(victory, "victory-challenge-a", {
      title: "Clear Victory Road",
      body: "Complete one forgiving pass through the four League stations with Auntie Ariel.",
      successTitle: "Victory Road Recognizes Luca",
      successBody: "Every recovered token ignites, proving the Rangers’ path was real. The sky answers with a Legendary cry.",
      resultLabel: "Victory Road achievement earned",
      revealItems: ["The recovered energy forms a green spiral overhead"],
      nextDestination: "Stay with Auntie Ariel. The same referee cue continues into the Rayquaza encounter."
    }),
    sceneFrom(victory, "victory-challenge-b", {
      type: "story",
      audience: "luca",
      title: "Mega Rayquaza Appears!",
      body: "The sky opens. Mega Rayquaza circles the signal, then lowers its gaze toward Luca. It has come to see who answered.",
      successRule: undefined,
      fallbackText: undefined,
      adultPrompt: undefined
    }),
    {
      id: "victory-challenge-b-control",
      type: "physical-challenge",
      audience: "adult",
      preserveAudience: true,
      title: "Continue Ariel’s Legendary Encounter",
      body: "Ariel’s existing cue remains active. Keep the mechanics private while Luca responds to Rayquaza.",
      successRule: "Use one soft throw, ring toss, Sky-symbol match, or Legendary Assist. Move closer after a miss; one assisted success always counts.",
      fallbackText: "Ariel may guide the throw, place the ring, or point to three Sky symbols.",
      adultPrompt: "Phone Captain Patrick: hold when the Legendary encounter is complete."
    },
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
      successBody: "Not for winning. For every person and Pokémon Luca helped to reach this moment.",
      resultLabel: "Champion Luca",
      revealItems: ["The Creekside Region has a new Champion"],
      rewardIds: championRewards,
      rewardHandoff: "Your greatest reward has appeared! Patrick hands Luca the POKÉMON LEAGUE CHAMPION CHEST now. Open the League Battle Deck and Rayquaza model; save every booster for the celebration.",
      nextDestination: "A Champion never reaches the end alone. The Hall of Heroes is ready."
    }),
    sceneFrom(victory, "hall-of-heroes", {
      body: "A Champion never reaches the end alone. Every name here became part of Luca’s story—and every one helped him reach this moment.",
      tributes: {
        ariel: "Made Luca’s first mission official",
        nina: "Found the fallen Fairy lights first",
        bruce: "Trusted Luca with the Sky Fragment",
        monica: "Discovered where the signal was leading",
        polly: "Helped every Pokémon feel safe",
        mike: "Brought Team Rocket’s “unbeatable” defense",
        patrick: "Challenged Luca’s knowledge, skill, and heart",
        hannah: "Protected the Rangers’ secret",
        noa: "Protected the Rangers’ secret"
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
      title: "Oak Has One Last Question",
      body: "Bring the Sky Fragment and sealed file to the Partner Professors. The mark on the file matches Luca’s License—but neither Professor will guess what it means until they open it together."
    }),
    combinedChallenge(checkpoint, "oak-return-challenge", {
      title: "Complete the League Analysis",
      successTitle: "The Legend Points Home",
      successBody: "The Fairies, the frightened Pokémon, and the Sky Fragment all point home. The signal was testing the path to Luca.",
      resultLabel: "Victory Road authorized",
      revealItems: ["League Authorization earned", "Mega Abomasnow joined the team", "Sky Pillar coordinates revealed"],
      rewardIds: checkpointRewards,
      rewardHandoff: "The Professors give Luca the compact MEGA EVOLUTION RESEARCH FILE reward and League Authorization now. Open the sticker book and Mega Abomasnow card; save the booster for the celebration.",
      nextDestination: "The destination is Home Base—but the old Ranger record calls the route Victory Road. Something legendary is waiting at its end."
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
    sceneFrom(mew, "mew-glitch"),
    sceneFrom(mew, "mew-transmission", {
      title: "Professor Oak’s Impossible Reading",
      body: "The reading is not coming from the Sky Fragment. It is small, ancient, and impossibly gentle. Oak sends only two words: “Luca—follow it.”"
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

  function buildRelayScenes(originalScene, cue) {
    var relayScenes = [
      {
        id: originalScene.id + "-handoff",
        type: "cast-handoff",
        audience: "luca",
        title: originalScene.title,
        body: cue.handoffStory,
        characterName: cue.characterName,
        handoffLabel: "Hold to begin the mission",
        phoneCaptain: cue.phoneCaptain,
        waterSafetyAdult: cue.waterSafetyAdult,
        cueId: cue.id
      },
      {
        id: originalScene.id + "-privacy",
        type: "privacy-shield",
        audience: "adult",
        title: "Adult Cast Screen Ahead",
        body: "Turn the phone away from Luca.",
        performerName: cue.performerName,
        phoneCaptain: cue.phoneCaptain,
        waterSafetyAdult: cue.waterSafetyAdult,
        cueId: cue.id
      },
      {
        id: originalScene.id,
        type: "cast-cue",
        audience: "cast",
        title: originalScene.title,
        performerName: cue.performerName,
        characterName: cue.characterName,
        phoneCaptain: cue.phoneCaptain,
        waterSafetyAdult: cue.waterSafetyAdult,
        supportingRole: cue.supportingRole,
        spokenLines: cue.spokenLines.slice(),
        helpLucaSteps: cue.runtimeSteps.slice(),
        whenFinished: cue.whenFinished,
        easyBackup: cue.runtimeBackup,
        completionLabel: "Phone Captain: Hold Mission Complete",
        cueId: cue.id
      },
      {
        id: originalScene.id + "-return",
        type: "return-to-player",
        audience: "adult",
        title: "Turn the screen back to Luca",
        body: "Do not reveal the result, reward, badge, fragment, or next destination until Luca can see the phone.",
        performerName: cue.performerName,
        phoneCaptain: cue.phoneCaptain,
        waterSafetyAdult: cue.waterSafetyAdult,
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
        phoneCaptain: cue.phoneCaptain,
        waterSafetyAdult: cue.waterSafetyAdult,
        cueId: cue.id
      }
    ];
    if ((originalScene.rewardIds && originalScene.rewardIds.length) || originalScene.rewardHandoff || Number.isInteger(originalScene.fragmentSlot)) {
      relayScenes.push({
        id: originalScene.id + "-logistics",
        type: "adult-logistics",
        audience: "adult",
        title: "Prepare the Physical Reward",
        body: "Luca has seen the story result. Use this private checklist to present the physical items without spoiling later rewards.",
        logisticsRewardIds: Array.isArray(originalScene.rewardIds) ? originalScene.rewardIds.slice() : [],
        fragmentSlot: originalScene.fragmentSlot,
        rewardHandoff: originalScene.rewardHandoff,
        performerName: cue.performerName,
        phoneCaptain: cue.phoneCaptain,
        cueId: cue.id
      });
    }
    return relayScenes;
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
          body: "The cast cue could not be loaded. Open Parent Mode and return to the preceding scene.",
          performerName: "Lead Adult",
          handoffLabel: "Adult: Hold to open recovery instructions"
        });
      }
      return scenes.concat(buildRelayScenes(scene, cue));
    }, []);
  }

  config.chapters.forEach(applyTheatricalRelays);
  applyTheatricalRelays(config.checkpoint);
  applyTheatricalRelays(config.epilogue);

  window.CREEKSIDE_CONFIG = config;
})();
