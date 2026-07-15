/* ==========================================================================
   config.js — EDIT THIS FILE to customize the hunt. No coding needed.
   --------------------------------------------------------------------------
   Everything the party runner (Patrick!) needs to change lives here:
     • the number of stops (add or remove entries in `stops`)
     • each clue, hint, and where the gift is hidden
     • which mini-game each stop plays
     • the party details in `party`

   After editing, just save and reload the page. A matching JSON copy lives in
   config/stops.json for reference / other tools.

   ---- Mini-game types you can set as "activity.type" ----------------------
   "quiz"        : a multiple-choice question.
                   fields: prompt, options:[...], answerIndex
   "shadow-guess": guess the creature from its shadow.
                   fields: prompt, art (correct art key), options:[art keys]
   "type-match"  : pick the correct Pokémon type.
                   fields: prompt, art, answer (a type), options:[types]
   "catch-tap"   : tap the Poké Balls before time runs out.
                   fields: prompt, target (how many to catch), seconds

   Valid art keys: "tropius", "megaX", "megaY", "spark", "ball", "leaf"
   Valid types: "grass","fire","water","electric","psychic","normal"
   ========================================================================== */

window.HUNT_CONFIG = {
  party: {
    name: "Luca",
    age: 7,
    year: 2026,
    title: "Luca's Trainer Journey",
  },

  /* Onboarding starter avatars (§9). Pick from the art keys above. */
  avatars: [
    { key: "tropius", label: "Tropius" },
    { key: "megaX",   label: "Mega X" },
    { key: "megaY",   label: "Mega Y" },
    { key: "spark",   label: "Mega Stone" },
    { key: "ball",    label: "Poké Ball" },
    { key: "leaf",    label: "Leaf" },
  ],

  /* The stops. Add/remove freely — the badge trail adapts to the count. */
  stops: [
    {
      number: 1,
      name: "The Grass Trial",
      type: "grass",
      clueText: "Your journey begins where green things grow and the morning sunlight loves to glow.",
      hintText: "Somewhere plants live — a windowsill or the garden!",
      activity: {
        type: "type-match",
        prompt: "Tropius is a Grass-type! Tap the Grass energy to help it grow.",
        art: "tropius",
        answer: "grass",
        options: ["fire", "grass", "water", "psychic"],
      },
      giftLocationText: "Look near the biggest plant in the house!",
    },
    {
      number: 2,
      name: "The Catching Field",
      type: "normal",
      clueText: "A real Trainer must be quick! Race to the place where balls are kicked.",
      hintText: "Think of where toys or sports gear are kept.",
      activity: {
        type: "catch-tap",
        prompt: "Tap 6 Poké Balls before time runs out!",
        target: 6,
        seconds: 15,
      },
      giftLocationText: "Check the toy box!",
    },
    {
      number: 3,
      name: "The Psychic Trial",
      type: "psychic",
      clueText: "Where the family gathers to watch the big screen, your next challenge waits unseen.",
      hintText: "Think of the coziest room in the house.",
      activity: {
        type: "shadow-guess",
        prompt: "A mysterious shadow appears! Which Pokémon is it?",
        art: "megaX",
        options: ["tropius", "megaX", "ball"],
      },
      giftLocationText: "Look behind the couch cushions!",
    },
    {
      number: 4,
      name: "The Water Trial",
      type: "water",
      clueText: "Splish and splash — go find the spot where water pours out nice and hot.",
      hintText: "A place with a sink or a tub.",
      activity: {
        type: "quiz",
        prompt: "Which of these is a Water-type move?",
        options: ["Water Gun", "Flamethrower", "Vine Whip", "Thunderbolt"],
        answerIndex: 0,
      },
      giftLocationText: "Peek in the bathroom cabinet!",
    },
    {
      number: 5,
      name: "The Electric Trial",
      type: "electric",
      clueText: "Sparks and zaps and buzzing light — find where things plug in nice and tight.",
      hintText: "Where do phones and lamps get their power?",
      activity: {
        type: "type-match",
        prompt: "Zap! Which energy powers an Electric-type?",
        art: "spark",
        answer: "electric",
        options: ["water", "electric", "grass", "normal"],
      },
      giftLocationText: "Look near a lamp or charging spot!",
    },
    {
      number: 6,
      name: "The Fire Trial",
      type: "fire",
      clueText: "Warmth and cooking, yummy treats — head to where the family eats.",
      hintText: "The kitchen table might be a good guess!",
      activity: {
        type: "quiz",
        prompt: "What do Trainers use to heal their Pokémon?",
        options: ["A Potion", "A rock", "A sock", "A cloud"],
        answerIndex: 0,
      },
      giftLocationText: "Check under the kitchen table!",
    },
    {
      number: 7,
      name: "The Shadow Challenge",
      type: "psychic",
      clueText: "Where you rest your sleepy head, look around your comfy bed.",
      hintText: "Your own bedroom!",
      activity: {
        type: "shadow-guess",
        prompt: "One more shadow! Who could it be?",
        art: "tropius",
        options: ["tropius", "megaY", "ball"],
      },
      giftLocationText: "Look under your pillow!",
    },
    {
      number: 8,
      name: "The Champion's Test",
      type: "psychic",
      clueText: "The final challenge, brave and true — the greatest gift is waiting for you!",
      hintText: "Ask a grown-up where the biggest surprise is!",
      activity: {
        type: "catch-tap",
        prompt: "Final test! Catch 8 to become Champion!",
        target: 8,
        seconds: 18,
      },
      giftLocationText: "Ask Mom or Dad — your Champion gift is ready!",
    },
  ],
};
