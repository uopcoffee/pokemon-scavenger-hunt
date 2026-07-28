/* Creekside Region V2 production content.
   Loaded after data.js so V1 remains intact while this file becomes the
   source of truth for the configurable V2 engine.

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

  window.CREEKSIDE_CONFIG = {
    version: 2,
    title: "Luca's Creekside Region",
    storageKey: "luca-creekside-v2-progress",
    adultHoldMs: 1500,
    artBase: "assets/pokemon/",
    avatars: window.LUCA_CONFIG.avatars,
    settings: {
      startTime: "9:30 a.m.",
      targetChampionTime: "11:30 a.m.",
      adultHoldMs: 1500,
      soundEnabled: false,
      respectReducedMotion: true,
    },

    participants: [
      { id: "ariel", displayName: "Auntie Ariel", role: "League Recruiter and Victory Road Referee" },
      { id: "nina", displayName: "Nina", role: "Fairy Gym Leader and Pikachu's Helper" },
      { id: "bruce", displayName: "Professor Oak", role: "Water Research Professor" },
      { id: "monica", displayName: "Monica", role: "Lead Research Assistant" },
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
          { id: "orientation-character", type: "character-encounter", title: "Auntie Ariel, League Recruiter", character: "Auntie Ariel", dialogue: ["Trainer Luca! The Creekside Pokémon League has reviewed your record.", "Today, you begin your first official mission!"] },
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
          { id: "fairy-story", type: "story", title: "Fairy Energy Has Fallen", body: "Three Fairy Energy Orbs have fallen from the trees. The next map signal cannot power on until they are returned." },
          { id: "fairy-location", type: "travel-location", title: "Enter the Fairy Garden", body: "Travel to the prepared backyard tree and bush area. Do not use the garage or side yard." },
          { id: "fairy-character", type: "character-encounter", title: "Nina, Fairy Gym Leader", character: "Nina", dialogue: ["Luca, look!", "Tree!", "You did it!"] },
          { id: "fairy-warmup", type: "digital-warmup", title: "Optional Fairy Scan", body: "Optional: point to the three glowing Fairy symbols, then put the phone away." },
          { id: "fairy-briefing", type: "challenge-briefing", title: "Recover Three Fairy Orbs", instructions: ["Find three large prepared orbs at toddler-visible height.", "Hand each orb to Nina.", "Nina places each orb in her basket."] },
          { id: "fairy-challenge", type: "physical-challenge", title: "Help Nina Restore the Garden", body: "Search the prepared low branches and visible bushes with Nina.", successRule: "Find all three, or let Nina point to the final orb after two minutes.", fallbackText: "If Nina loses interest, she hands Luca the basket and cheers while he finishes. Move indoors during bad weather.", adultPrompt: "Fairy Gym Leader's helper: hold to confirm all three orbs are in the basket." },
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
          { id: "oak-entrance", type: "character-encounter", title: "Professor Oak Watches the Water", character: "Professor Oak", dialogue: ["Shhh... the preserve is unusually active.", "Wait. You must be Trainer Luca."] },
          { id: "monica-entrance", type: "character-encounter", title: "Monica Reports Rising Energy", character: "Monica", dialogue: ["Professor, the capsule readings are rising.", "Trainer Luca, we need all four samples before Team Rocket finds them."] },
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
          { id: "center-character", type: "character-encounter", title: "Polly as Nurse Joy", character: "Nurse Joy", dialogue: ["Trainer Luca, I'm glad you're here.", "Three Pokémon need help, and I heard you know how to take care of your team."] },
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
          { id: "rocket-character", type: "character-encounter", title: "Mike, Team Rocket Boss", character: "Mike", dialogue: ["So you're Professor Oak's new Trainer.", "That Ranger Dispatch belongs to Team Rocket now!"] },
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
          { id: "vault-story", type: "story", title: "A Mission Left by the Rangers", body: "Rangers Hannah and Noa are away on expedition. They protected supplies and a sealed research file for a trustworthy Trainer." },
          { id: "vault-location", type: "travel-location", title: "Travel with an Adult Escort", body: "Bring the physical Ranger Code Card to the approved front-entry area. The app never asks for the digits." },
          { id: "vault-character", type: "character-encounter", title: "Ranger Transmission", character: "Rangers Hannah and Noa", dialogue: ["Trainer Luca, you protected all four fragments.", "Use your physical card with an adult, then follow our three Ranger symbols."] },
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
          { id: "victory-character", type: "character-encounter", title: "Auntie Ariel, Victory Road Referee", character: "Auntie Ariel", dialogue: ["The Tall Grass has never seen speed like that!", "Slowpoke penalty! Five very slow steps!", "The League recognizes that as completely legitimate Champion behavior!"] },
          { id: "victory-stage-a", type: "multi-stage-progress", title: "Stage A: Victory Road Course", instructions: ["Weave through the Tall Grass markers.", "Balance along the Forest Crossing line.", "Land three soft balls in the target.", "Find three Energy Tokens near the trees."] },
          { id: "victory-challenge-a", type: "physical-challenge", stage: 1, title: "Clear Victory Road", body: "Complete the four fast stations with Ariel narrating and helping.", successRule: "Complete each station once; accuracy can be assisted and harmless comedy penalties replace failure.", fallbackText: "Move under the patio or indoors. Use a hallway path and larger targets.", adultPrompt: "Victory Road Referee: hold to confirm all four stations are complete." },
          { id: "victory-stage-b", type: "multi-stage-progress", title: "Stage B: Mega Rayquaza", instructions: ["Aim one soft Poké Ball at the hanging Rayquaza target.", "One clear target hit completes the encounter.", "Ariel may invoke a Legendary Assist at any time."] },
          { id: "victory-challenge-b", type: "physical-challenge", stage: 2, title: "Calm Mega Rayquaza", body: "Hit the prepared soft-ball target or complete the alternate ring/symbol challenge.", successRule: "One success, or a Legendary Assist after two minutes.", fallbackText: "Use ring toss or assemble three Sky symbols instead of throwing.", adultPrompt: "Victory Road Referee: hold to confirm Rayquaza is calm." },
          { id: "champion-character", type: "character-encounter", title: "Patrick, Creekside Region Champion", character: "Patrick", dialogue: ["Trainer Luca, I've watched your entire journey.", "Champions need skill, courage, and people they trust. Show me all three."] },
          { id: "champion-stage", type: "multi-stage-progress", title: "Stage C: Champion Match", instructions: ["Knowledge: choose a helpful type response.", "Skill: complete one comfortable target toss.", "Heart: name one person or Pokémon who helped today."] },
          { id: "champion-challenge", type: "physical-challenge", stage: 3, title: "Challenge the Champion", body: "Complete the Knowledge, Skill, and Heart rounds with Patrick.", successRule: "Every sincere answer counts. The target moves closer after a miss.", fallbackText: "Patrick supplies two choices, uses the closest marker, and celebrates Luca's effort.", adultPrompt: "Champion: hold to concede the match and award the title." },
          { id: "champion-reward", type: "reward", title: "Pokémon League Champion Chest", body: "Open the League Battle Deck and Rayquaza model. Keep the full booster inventory sealed for the family celebration.", rewardIds: ["mega-lucario-deck","mega-rayquaza-model","perfect-order-bundle","chaos-rising-3","destined-rivals-2","team-reserve","champion-title"] },
          { id: "champion-inventory", type: "inventory-update", title: "Champion Record Complete", body: "Victory Road, Rayquaza, and the Champion match are recorded." },
          { id: "hall-of-heroes", type: "hall-of-heroes", title: "Hall of Heroes", body: "Every person who helped this morning is part of Luca's Champion story.", participantIds: ["ariel","nina","bruce","monica","polly","mike","patrick","hannah","noa"] },
          { id: "group-photo", type: "story", title: "Champion Group Photo", body: "Gather the family and helpers for a Champion photo. The adventure appears to be complete." },
          { id: "fake-credits", type: "fake-credits", title: "Luca's Trainer Journey", body: "A Creekside Region adventure made possible by family, neighbors, courage, and excellent Trainer teamwork.", durationMs: 10000 },
          { id: "champion-transition", type: "chapter-transition", title: "THE END", body: "Champion record saved. Please remain near the screen for final League processing." },
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
        { id: "oak-return-character", type: "character-encounter", title: "Professor Oak's Final Analysis", character: "Professor Oak", dialogue: ["You came back with the Sky Fragment and the Rangers' file.", "Excellent. Let's see how far you've come."] },
        { id: "oak-return-analysis", type: "checkpoint", title: "Mega Evolution Analysis", instructions: ["Present the Sky Fragment.", "Monica opens the sealed Research File.", "Answer one friendly callback question.", "Receive League Authorization."] },
        { id: "oak-return-challenge", type: "physical-challenge", title: "Qualify for the Pokémon League", body: "Review Luca's badges, team, and earlier missions with Bruce and Monica.", successRule: "Any remembered detail or prompted answer counts.", fallbackText: "Shorten to one callback question if behind schedule.", adultPrompt: "Professor Oak: hold to award League Authorization." },
        { id: "oak-return-reward", type: "reward", title: "Mega Evolution Research File", body: "Open the sticker book and Mega Abomasnow card. Save the booster and carry League Authorization.", rewardIds: ["mega-evolutions-sticker-book","mega-abomasnow-ex","mega-evolution-booster","league-authorization","sky-pillar-coordinates"] },
        { id: "oak-return-transition", type: "chapter-transition", title: "Victory Road Authorized", body: "Mega Rayquaza energy is gathering above Victory Road. Luca is cleared for the final League trial." },
      ],
    },

    epilogue: {
      id: "mew-epilogue", lockedName: "Unknown Signal", name: "The Mythical Signal",
      type: "psychic", art: "mewtwo.png", locationLabel: "Mythical Trail", scheduleLabel: "11:30–11:36", targetMinutes: 6,
      scenes: [
        { id: "mew-glitch", type: "glitch", title: "SIGNAL DETECTED", body: "The finished screen flickers. Professor Oak's scanner has detected a Pokémon that should be impossible to find." },
        { id: "mew-transmission", type: "character-encounter", title: "Professor Oak's Impossible Reading", character: "Professor Oak", dialogue: ["Trainer Luca—wait! The scanner found one more signal.", "Follow the pink energy traces. This may be a Mythical Pokémon."] },
        { id: "mew-location", type: "travel-location", title: "Follow the Mythical Trail", body: "Search only the prepared backyard tree, bush, and patio route. Mew does not appear on the region map." },
        { id: "mew-stage", type: "multi-stage-progress", title: "Three Mew Footprints", instructions: ["Find the first pink-energy marker.", "Follow its clue to the second.", "Use the third marker to locate the translucent discovery box."] },
        { id: "mew-challenge", type: "physical-challenge", title: "Discover the Mythical Pokémon", body: "Complete the three-marker trail and reveal Mew near the prepared family gathering area.", successRule: "Each clue points clearly to the next; an adult may give a warm/cold hint.", fallbackText: "Move all markers under the patio or let Professor Oak transmit the next clue.", adultPrompt: "Adult: hold to confirm Mew has been discovered." },
        { id: "mew-reward", type: "reward", title: "Mew Registered", body: "Open the Mew vinyl figure now. The Mythical silhouette is revealed in Luca's Hall of Fame.", rewardIds: ["mew-figure"] },
        { id: "mew-celebration", type: "celebration", title: "Popsicles and Booster Opening", body: "Gather the family, bring out the Booster Satchel, open the saved packs together, and celebrate the new Creekside Champion.", rewardIds: ["booster-satchel","popsicles"] },
      ],
    },
  };
})();
