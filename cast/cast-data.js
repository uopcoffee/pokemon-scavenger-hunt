(function () {
  "use strict";

  var REASSURANCE = "This is meant to be easy and fun. You do not need to know Pokémon, memorize lines, wear a costume, or be a good actor. Patrick will bring the supplies and help keep everything moving. You can read directly from this page, say things in your own words, and give Luca as many hints as he needs. Your only job is to play along and have fun with him.";
  var IMPROV_NOTE = "You can read this word for word, say it in your own way, or improvise.";
  var COSTUME_NOTE = "You do not need a costume. Normal clothes and reading the lines are completely fine. If it sounds fun, here are a few easy ways to play up the character.";

  var timeline = [
    { time: "9:30 a.m.", window: "Ready by 9:25", segment: "Trainer Orientation", cast: "Auntie Ariel", handoff: "Welcome Luca, lead the short oath, and start the adventure.", reward: "TRAINER KIT", responsible: "Ariel", href: "league-recruiter/" },
    { time: "9:42 a.m.", window: "Ready by 9:38", segment: "Fairy Garden", cast: "Nina with Ariel", handoff: "Help Luca find the three Fairy Orbs.", reward: "FAIRY GYM REWARD", responsible: "Ariel", href: "nina/" },
    { time: "9:52 a.m.", window: "Travel window", segment: "Travel and reset", cast: "Family team", handoff: "Patrick keeps the phone and supplies moving.", reward: "No gift", responsible: "Patrick" },
    { time: "10:15 a.m.", window: "Ready by 10:10", segment: "Creekside Research Lab", cast: "Professor Bruce and Professor Monica", handoff: "Help Luca recover the research capsules.", reward: "WATER RESEARCH CAPSULES 1–4 + PROFESSOR OAK’S FIRST PARTNER FILE", responsible: "Monica + Bruce", href: "oak-lab/" },
    { time: "10:35 a.m.", window: "Ready by 10:30", segment: "Pokémon Center", cast: "Polly", handoff: "Help Luca care for the Pokémon patients.", reward: "POKÉMON CENTER FIELD KIT", responsible: "Polly", href: "nurse-joy/" },
    { time: "10:47 a.m.", window: "Ready by 10:42", segment: "Team Rocket Base", cast: "Mike", handoff: "Run the playful basketball challenge and lose dramatically.", reward: "RECOVERED TEAM ROCKET LOOT", responsible: "Mike", href: "team-rocket/" },
    { time: "10:59 a.m.", window: "Escort ready by 10:55", segment: "Ranger Vault", cast: "Designated adult escort", handoff: "Patrick or the escort handles the protected entry mission.", reward: "SECRET RANGER CACHE", responsible: "Adult escort" },
    { time: "11:09 a.m.", window: "Ready by 11:05", segment: "Research Lab return", cast: "Professor Bruce and Professor Monica", handoff: "Review Luca’s discoveries and send him to Victory Road.", reward: "MEGA EVOLUTION RESEARCH FILE", responsible: "Monica", href: "oak-lab/" },
    { time: "11:17 a.m.", window: "Ready by 11:12", segment: "Victory Road and Rayquaza", cast: "Auntie Ariel", handoff: "Referee the easy course and call in the Champion.", reward: "League qualification handoff", responsible: "Ariel", href: "league-recruiter/" },
    { time: "About 11:24 a.m.", window: "Wait out of sight", segment: "Champion match", cast: "Patrick", handoff: "Run the friendly final match and reveal the Champion Chest.", reward: "POKÉMON LEAGUE CHAMPION CHEST", responsible: "Patrick", href: "champion/" },
    { time: "About 11:30 a.m.", window: "Trail staged before the party", segment: "Mew surprise", cast: "Patrick or lead adult", handoff: "Follow the post-credit signal to the final surprise.", reward: "MYTHICAL ENCOUNTER + FINAL FAMILY CELEBRATION", responsible: "Patrick", href: "champion/" }
  ];

  window.CAST_PORTAL = {
    reassurance: REASSURANCE,
    improvNote: IMPROV_NOTE,
    costumeNote: COSTUME_NOTE,
    guides: {
      "oak-lab": {
        eyebrow: "Bruce & Monica",
        title: "Bruce & Monica’s Part",
        subtitle: "You’ll be Professor Bruce and Professor Monica, the Partner Professors who run the Creekside Research Lab.",
        arrival: "Luca arrives around 10:15 a.m. and returns briefly around 11:09 a.m.",
        ready: "Be ready by 10:10 a.m.",
        duration: "About 15 minutes, plus a short return visit",
        character: "Professor Bruce and Professor Monica — equal Partner Professors",
        firstLine: "Shhh. Something strange is happening in the pool. You must be Trainer Luca.",
        whatLucaDoes: "He finds the sealed research capsules in the pool or with the skimmer.",
        gift: "A research gift and clue card, after Patrick gives the signal",
        finalLine: "You are ready for Victory Road!",
        yourPart: [
          "Welcome Luca to the Creekside Research Lab.",
          "Ask him to recover the sealed capsules and cheer for every find.",
          "Give as many hints as he needs—there is no way for him to fail.",
          "Hand him the research gift and clue after Patrick gives the signal.",
          "Welcome him back for one quick visit before Victory Road."
        ],
        before: [
          "Patrick will bring the capsules, gifts, clue card, and anything else important.",
          "Place the sealed capsules in the pool. Keep a towel and pool skimmer nearby.",
          "Keep the gifts close but out of Luca’s sight.",
          "Patrick or another parent will manage the phone and overall pool safety."
        ],
        arrivalLines: [
          { speaker: "Professor Bruce", line: "Shhh. Something strange is happening in the pool. You must be Trainer Luca." },
          { speaker: "Professor Monica", line: "Perfect timing! Some of our research capsules have gone missing. Luca, can you help us find them?" }
        ],
        sayAndDo: [
          "Let Luca retrieve the capsules. Swimming is optional; the skimmer works just as well.",
          "Give him direct clues whenever helpful and cheer when he finds each one.",
          "Professor Bruce can focus on the welcome and big discoveries. Professor Monica can point out clues and keep the search moving. You are equal partners; divide it however feels natural."
        ],
        successLines: [
          { speaker: "Professor Bruce", line: "Excellent work, Trainer Luca! You saved our research." },
          { speaker: "Professor Monica", line: "And you discovered an important clue. Keep it safe—you may need it later." }
        ],
        successInstruction: "Wait for Patrick’s signal, then hand Luca the research gift and clue card.",
        backup: [
          "Use the skimmer instead of swimming.",
          "Use one capsule instead of four if time is short.",
          "Point directly to every capsule.",
          "Patrick can quietly prompt every line, or you can simply read from this page."
        ],
        optionalPlay: ["Lab coat", "Clipboard", "Glasses or goggles", "Notebook", "Printed Professor badge"],
        secondAppearance: {
          title: "When Luca Comes Back",
          intro: "The return visit is short and relaxed.",
          lines: [
            { speaker: "Professor Bruce", line: "Trainer Luca, you’ve completed some incredible missions. Which one was your favorite?" },
            { speaker: "Professor Monica", line: "We’ve reviewed everything you discovered. Your research is officially complete." },
            { speaker: "Professor Bruce", line: "You are ready for Victory Road!" }
          ],
          note: "Any answer is great. Patrick will tell you when to hand Luca the final research gift."
        }
      },
      "nurse-joy": {
        eyebrow: "Polly",
        title: "Polly’s Part",
        subtitle: "You’ll be Nurse Joy, the kind person who helps Pokémon feel better.",
        arrival: "Luca arrives around 10:35 a.m.",
        ready: "Be ready by 10:30 a.m.",
        duration: "About 8–10 minutes",
        character: "Nurse Joy",
        firstLine: "Trainer Luca, I’m glad you’re here. Three Pokémon need your help.",
        whatLucaDoes: "He matches three pretend Pokémon patients with simple treatments, then carries a medicine ball back to you.",
        gift: "The Pokémon Center gift bag and clue card, after Patrick gives the signal",
        finalLine: "Your Pokémon are feeling better—but Team Rocket has been spotted nearby!",
        yourPart: [
          "Welcome Luca to the pretend Pokémon Center.",
          "Help him match each patient with the right care.",
          "Give hints immediately and celebrate every choice.",
          "Hand him the gift bag and clue card when Patrick signals."
        ],
        before: [
          "Patrick will bring the patient cards, treatments, medicine ball, gift bag, and clue card.",
          "Put the three patients and treatments where Luca can see them.",
          "Keep the gift out of sight until Patrick gives you the signal."
        ],
        arrivalLines: [
          { speaker: "Nurse Joy", line: "Trainer Luca, I’m glad you’re here. Three Pokémon need your help. Will you help me take care of them?" }
        ],
        sayAndDo: [
          "Let Luca match each patient with a treatment. You do not need to know the Pokémon—Patrick’s cards explain everything.",
          "If he pauses, point to two choices or show him the answer. Then let him carry the medicine ball back to you.",
          "Be warm and encouraging. There are no wrong answers and he cannot fail."
        ],
        successLines: [
          { speaker: "Nurse Joy", line: "You did it! Every Pokémon is feeling better. That was very kind, Trainer Luca." }
        ],
        successInstruction: "When Patrick gives the signal, hand Luca the Pokémon Center gift bag and clue card. Then give the Team Rocket warning.",
        backup: [
          "Use just one patient and two choices.",
          "Point to the answer and let Luca hand it to you.",
          "Skip the walking path and have him carry the medicine ball one step."
        ],
        optionalPlay: ["Pink shirt, apron, or scarf", "Toy medical kit", "Small tray or basket", "Printed Nurse Joy badge"]
      },
      "team-rocket": {
        eyebrow: "Mike",
        title: "Mike’s Part",
        subtitle: "You’ll be the funny Team Rocket Boss who challenges Luca to basketball—and loses.",
        arrival: "Luca arrives around 10:47 a.m.",
        ready: "Be ready by 10:42 a.m.",
        duration: "About 10 minutes",
        character: "Team Rocket Boss",
        firstLine: "So you’re Professor Oak’s new Trainer. You’ll have to beat my basketball defense!",
        whatLucaDoes: "He tries a few easy basketball shots while you pretend your defense is falling apart.",
        gift: "The Team Rocket gift bag and Ranger message, after Patrick gives the signal",
        finalLine: "Impossible! My defense has been defeated. Fine—take the stolen message!",
        yourPart: [
          "Be a big, silly opponent—not a scary villain.",
          "Give Luca a few easy shots and move him closer whenever useful.",
          "React dramatically as your pretend defense breaks.",
          "Lose on purpose and hand over the gift when Patrick signals."
        ],
        before: [
          "Patrick will bring the ball, markers, target, gift bag, and Ranger message.",
          "Set the hoop low and start with a very close shooting spot.",
          "Keep the gift and message out of Luca’s sight."
        ],
        arrivalLines: [
          { speaker: "Team Rocket Boss", line: "So you’re Professor Oak’s new Trainer. You’ll have to beat my basketball defense!" }
        ],
        sayAndDo: [
          "Start with one very close shot. Then offer another comfortable shot and let Luca choose a final spot.",
          "After a miss, move him closer or lower the hoop. A rim, backboard, target hit, soft pass, or layup can all count.",
          "Make funny comments about your defense malfunctioning. Luca always wins."
        ],
        successLines: [
          { speaker: "Team Rocket Boss", line: "Impossible! My unbeatable defense has been defeated. Fine—take the stolen message!" }
        ],
        successInstruction: "When Patrick gives the signal, hand Luca the Team Rocket gift bag and Ranger message.",
        backup: [
          "Use one close shot instead of several.",
          "Count a backboard or target hit.",
          "Let Luca make three soft passes to defeat the defense.",
          "If time is short, declare that his first try broke the whole system."
        ],
        optionalPlay: ["Black shirt", "Sunglasses", "Paper Team Rocket “R”", "Hat or gloves"]
      },
      "league-recruiter": {
        eyebrow: "Auntie Ariel",
        title: "Auntie Ariel’s Part",
        subtitle: "You’ll welcome Luca to the adventure, help Nina in the Fairy Garden, and return later as the energetic Victory Road referee.",
        arrival: "Opening at 9:30 a.m.; Victory Road around 11:17 a.m.",
        ready: "Be ready by 9:25 a.m. Patrick will cue the later appearances.",
        duration: "About 12 minutes at the opening and 5–10 minutes later",
        character: "Pokémon League Recruiter and Victory Road Referee",
        firstLine: "Trainer Luca! A new region has appeared, and the Pokémon League chose you.",
        whatLucaDoes: "He takes a playful Trainer promise, protects one card, helps Nina, and later completes an easy obstacle course.",
        gift: "The Trainer gift bag at the opening; Patrick handles the later gifts",
        finalLine: "Victory Road is cleared. The Champion may enter!",
        yourPart: [
          "Launch Luca’s adventure with lots of energy.",
          "Lead a short Trainer promise and help him protect one card.",
          "Support Nina while Luca finds the Fairy Orbs.",
          "Come back later to cheer him through Victory Road and the Rayquaza target.",
          "Improvise freely—your enthusiasm matters more than the words."
        ],
        before: [
          "Patrick will bring the promise card, card supplies, Trainer gift bag, Fairy Orbs, and all Victory Road pieces.",
          "At the opening, keep the Trainer gift nearby and hidden.",
          "For later appearances, Patrick will tell you when the course is ready and where to stand."
        ],
        arrivalLines: [
          { speaker: "Auntie Ariel", line: "Trainer Luca! A new region has appeared, and the Pokémon League chose you to investigate." },
          { speaker: "Auntie Ariel", line: "First, promise to help Pokémon, help your friends, play fairly, and never give up!" }
        ],
        sayAndDo: [
          "Help Luca sleeve and protect one special card. Do any fiddly part for him.",
          "At the Fairy Garden, let Nina point or cheer while you explain that Luca should find three big orbs.",
          "Give hints immediately. Everything counts and nothing needs to be perfect."
        ],
        successLines: [
          { speaker: "Auntie Ariel", line: "Official Trainer status confirmed! Your first signal is waiting in the Fairy Garden." }
        ],
        successInstruction: "When Patrick signals, hand Luca the Trainer gift bag and point him toward the Fairy Garden.",
        backup: [
          "Complete one short promise and protect one card.",
          "Place every Fairy Orb in plain sight or let Luca carry Nina’s basket himself.",
          "Patrick can prompt any line."
        ],
        optionalPlay: ["Bright hat", "Whistle", "Referee sash", "Clipboard", "Extra-energetic announcer voice"],
        secondAppearance: {
          title: "Later: Victory Road",
          intro: "Patrick will reset everything before Luca arrives.",
          lines: [
            { speaker: "Auntie Ariel", line: "Welcome to Victory Road! Every assisted success is completely legal League behavior." },
            { speaker: "Auntie Ariel", line: "Victory Road is cleared. The Champion may enter!" }
          ],
          steps: [
            "Cheer Luca through one easy pass at each station.",
            "Move targets closer, show him the hidden tokens, and help as much as needed.",
            "For Rayquaza, one soft hit, ring toss, or direct assist works."
          ],
          note: "There is no scoring and no way to fail. Keep it loud, funny, and quick."
        }
      },
      "nina": {
        eyebrow: "Nina + supporting adult",
        title: "Nina’s Part",
        subtitle: "Nina can be the Fairy Gym Leader or Pikachu’s Helper—but only if she feels like joining in.",
        arrival: "Luca reaches the Fairy Garden around 9:42 a.m.",
        ready: "Ariel or Patrick will set everything up.",
        duration: "About 5 minutes",
        character: "Fairy Gym Leader or Pikachu’s Helper",
        firstLine: "Luca, look! Tree!",
        whatLucaDoes: "He finds three big, easy-to-see Fairy Orbs and puts them in Nina’s basket.",
        gift: "The Fairy Garden gift bag; Ariel or Patrick will handle it",
        finalLine: "You did it!",
        yourPart: [
          "Nina may hold the basket, point, cheer, or say one short line.",
          "The supporting adult explains the game and gives Luca hints.",
          "Nina’s mood, clothes, and participation never affect Luca’s progress."
        ],
        before: [
          "Patrick will bring the three Fairy Orbs, basket, and gift bag.",
          "Ariel or Patrick will place the orbs where Luca can see them.",
          "Ask Nina if she wants to hold the basket. It is completely fine if she says no."
        ],
        arrivalLines: [
          { speaker: "Supporting adult", line: "Three Fairy lights fell from the trees. Luca, can you help us put them in the basket?" },
          { speaker: "Nina, if she wants", line: "Luca, look! Tree!" }
        ],
        sayAndDo: [
          "Let Luca find the three orbs and place them in the basket.",
          "Point directly to an orb whenever he needs help.",
          "Nina can join, watch, wander away, or skip the scene. The adult keeps it moving."
        ],
        successLines: [
          { speaker: "Nina or supporting adult", line: "You did it! The Fairy Garden is glowing again." }
        ],
        successInstruction: "Ariel or Patrick will give Luca the Fairy Garden gift bag and tell everyone where to go next.",
        backup: [
          "Put all three orbs in plain sight.",
          "Use one orb instead of three.",
          "Let Luca carry the basket himself.",
          "Run the whole scene without Nina if she is busy or uninterested."
        ],
        optionalPlay: ["Fairy wings", "Wand", "Headband", "Favorite dress—only if Nina wants to wear it"]
      },
      "champion": {
        eyebrow: "Patrick",
        title: "Patrick’s Champion Part",
        subtitle: "You’ll appear as the Creekside Champion for a short, friendly final match.",
        arrival: "Enter after Ariel clears Victory Road, around 11:24 a.m.",
        ready: "Stay out of sight until Ariel or the phone gives the signal.",
        duration: "About 4 minutes for the match",
        character: "Creekside Region Champion",
        firstLine: "Trainer Luca, I’ve watched your whole journey. Show me your knowledge, skill, and heart.",
        whatLucaDoes: "He answers one friendly question, tries one easy toss, and names someone who helped him.",
        gift: "The Champion Chest; keep the separate Mew surprise hidden",
        finalLine: "The match is over. Luca, you are the new Champion of the Creekside Region!",
        yourPart: [
          "Make a dramatic entrance after Ariel calls you.",
          "Run three very easy moments: knowledge, skill, and heart.",
          "Make Luca feel completely successful and concede the Champion title.",
          "Reveal the Champion Chest when the phone signals."
        ],
        before: [
          "Keep the Champion Chest and Mew surprise in separate hiding places.",
          "Patrick’s Director page contains the detailed timing, supplies, and final setup.",
          "The public Champion part should stay short and celebratory."
        ],
        arrivalLines: [
          { speaker: "Champion Patrick", line: "Trainer Luca, I’ve watched your whole journey. A Champion needs knowledge, skill, and heart. Show me all three." }
        ],
        sayAndDo: [
          "Knowledge: offer two friendly choices. Any thoughtful answer is great.",
          "Skill: ask for one comfortable soft toss. Move closer, or use a high-five instead.",
          "Heart: ask Luca to name a person or Pokémon who helped him today.",
          "React like Luca has impressed you at every step."
        ],
        successLines: [
          { speaker: "Champion Patrick", line: "The match is over. Luca, you are the new Champion of the Creekside Region!" }
        ],
        successInstruction: "When the phone gives the signal, reveal the Champion Chest and gather everyone for the Hall of Heroes.",
        backup: [
          "Ask one question, accept a high-five, and ask who helped him.",
          "Skip any prop that is not ready.",
          "Keep the ending warm and confident—Luca always becomes Champion."
        ],
        optionalPlay: ["Hat, jacket, cape, or medal", "Dramatic entrance music", "Printed Champion badge", "Normal clothes are completely fine"],
        secondAppearance: {
          title: "Later: The Mew Surprise",
          intro: "After the fake ending, the phone will report one more signal.",
          lines: [
            { speaker: "Patrick or lead adult", line: "Trainer Luca, the scanner found one more signal. Follow the pink trail!" }
          ],
          steps: [
            "Guide Luca along the three visible pink markers.",
            "Give direct hints and lead him to the separate Mew surprise.",
            "Then bring everyone together for the family celebration."
          ],
          note: "Keep this surprise out of sight until the post-credit signal."
        }
      }
    },
    director: {
      title: "Patrick’s Director View",
      intro: "Detailed setup, timing, packages, safety ownership, spoilers, and runtime cue alignment. Participants do not need to read this page.",
      timeline: timeline,
      participantOrder: [
        "Auntie Ariel — opening League Recruiter",
        "Nina with Ariel — Fairy Garden",
        "Professor Bruce and Professor Monica — Research Lab",
        "Polly — Pokémon Center",
        "Mike — Team Rocket Base",
        "Designated adult — Ranger Vault escort",
        "Professor Bruce and Professor Monica — return visit",
        "Auntie Ariel — Victory Road and Rayquaza",
        "Patrick — Champion and Mew surprise"
      ],
      globalOperations: [
        "Patrick keeps the phone by default and gives every participant their start and gift signals.",
        "Patrick brings the important supplies, labeled gifts, clue cards, and printed prompts.",
        "Every sealed booster goes to the adult-held Booster Satchel for the final celebration.",
        "The real Ranger Vault information stays only on the private physical cards. Never copy it into the app or this portal.",
        "Give hints early. Shorten any activity before Luca becomes tired or frustrated.",
        "The supervising pool adult owns water safety and does not operate the phone during swimming.",
        "Keep the Champion Chest, Mew surprise, and later-story props hidden until their cues."
      ],
      packages: [
        { id: "TRAINER KIT", owner: "Ariel", moment: "Trainer Orientation" },
        { id: "FAIRY GYM REWARD", owner: "Ariel", moment: "Fairy Garden" },
        { id: "WATER RESEARCH CAPSULES 1–4", owner: "Monica", moment: "Research Lab" },
        { id: "PROFESSOR OAK’S FIRST PARTNER FILE", owner: "Bruce", moment: "Research Lab" },
        { id: "POKÉMON CENTER FIELD KIT", owner: "Polly", moment: "Pokémon Center" },
        { id: "RECOVERED TEAM ROCKET LOOT", owner: "Mike", moment: "Team Rocket Base" },
        { id: "SECRET RANGER CACHE", owner: "Adult escort", moment: "Ranger Vault" },
        { id: "MEGA EVOLUTION RESEARCH FILE", owner: "Monica", moment: "Research Lab return" },
        { id: "POKÉMON LEAGUE CHAMPION CHEST", owner: "Patrick", moment: "Champion match" },
        { id: "MYTHICAL ENCOUNTER", owner: "Patrick", moment: "Mew surprise" },
        { id: "FINAL FAMILY CELEBRATION", owner: "Patrick", moment: "After Mew" }
      ],
      operations: [
        {
          slug: "oak-lab",
          name: "Professor Bruce & Professor Monica",
          cueIds: ["oak-water", "oak-return"],
          setup: ["Four sealed capsules or dry-tub substitutes", "Pool skimmer, towel, and dry tray", "Research gifts and clue card hidden nearby"],
          safety: "Patrick or another supervising adult owns pool safety and the phone. Bruce and Monica focus on welcoming, clueing, and cheering.",
          fallback: "Use the skimmer or a dry tub. Use one capsule if time is short.",
          decisions: ["Choose pool or dry-tub version", "Confirm which mini tin goes here", "Decide whether to print Professor badges"]
        },
        {
          slug: "nurse-joy",
          name: "Polly / Nurse Joy",
          cueIds: ["nurse-joy"],
          setup: ["Three patient cards and matching treatments", "Medicine ball and short path", "Field Kit and clue card hidden"],
          safety: "Patrick sets the route and removes any tripping hazards.",
          fallback: "Use one patient, two choices, and a one-step delivery.",
          decisions: ["Confirm indoor or patio setup", "Decide whether to print a Nurse Joy badge"]
        },
        {
          slug: "team-rocket",
          name: "Mike / Team Rocket Boss",
          cueIds: ["rocket"],
          setup: ["Low hoop, soft ball, closest marker, and fallback target", "Team Rocket gift and Ranger message hidden"],
          safety: "Patrick chooses a clear shooting area and controls distance.",
          fallback: "One close shot, a target hit, or three soft passes defeats Team Rocket.",
          decisions: ["Set final hoop height", "Choose whether to use the large fallback target"]
        },
        {
          slug: "league-recruiter",
          name: "Auntie Ariel",
          cueIds: ["orientation", "victory-road", "rayquaza"],
          setup: ["Trainer promise and card supplies", "Victory Road markers, ground line, soft target, and tokens", "Rayquaza target plus ring fallback"],
          safety: "Patrick stages the course and removes anything that encourages risky speed.",
          fallback: "One promise, one protected card, one supported pass per station, and a direct Rayquaza assist.",
          decisions: ["Choose final Rayquaza activity", "Decide whether to print a League badge"]
        },
        {
          slug: "nina",
          name: "Nina + supporting adult",
          cueIds: ["fairy"],
          setup: ["Three large visible Fairy Orbs", "Basket", "Fairy gift hidden"],
          safety: "The supporting adult runs the scene whether or not Nina participates.",
          fallback: "Use one visible orb or run the scene entirely with Ariel.",
          decisions: ["Choose the orb hiding spots based on Nina’s mood and the weather"]
        },
        {
          slug: "champion",
          name: "Patrick / Champion",
          cueIds: ["champion", "mew"],
          setup: ["Friendly type-choice cards", "Soft toss target", "Champion Chest", "Three pink trail markers", "Separate Mew surprise"],
          safety: "Keep the route in the approved backyard area and the target comfortable.",
          fallback: "Use one choice, a high-five, one heart answer, and fully visible Mew markers.",
          decisions: ["Confirm Champion clothes and type cards", "Finalize Rayquaza handoff wording", "Choose the Mew hiding place", "Write the Hall of Fame Team Reserve contents on a private paper packing slip"]
        }
      ]
    }
  };

  var sharedCues = window.CREEKSIDE_CAST_CORES || {};
  window.CAST_PORTAL.director.operations.forEach(function (operation) {
    operation.runtimeCues = operation.cueIds.map(function (cueId) {
      return sharedCues[cueId];
    }).filter(Boolean);
  });
}());
