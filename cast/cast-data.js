(function () {
  "use strict";

  var REASSURANCE = "This is meant to be easy and fun. You do not need to know Pokémon, memorize lines, wear a costume, or be a good actor. Patrick will bring the supplies and help keep everything moving. You can read directly from this page, say things in your own words, and give Luca as many hints as he needs. Your only job is to play along and have fun with him.";
  var IMPROV_NOTE = "You can read this word for word, say it in your own way, or improvise.";
  var COSTUME_NOTE = "You do not need a costume. Normal clothes and reading the lines are completely fine. If it sounds fun, here are a few easy ways to play up the character.";

  var timeline = [
    { time: "9:30 a.m.", window: "10–15 min · ready by 9:25", segment: "Trainer Orientation", cast: "Auntie Ariel", phoneCaptain: "Patrick", handoff: "Private cue, live oath and equipment, Trainer Kit, Code Card, pencil, and first booster stored.", reward: "TRAINER KIT", responsible: "Ariel", href: "league-recruiter/" },
    { time: "About 9:40–9:45", window: "8–12 min · flexible Nina participation", segment: "Fairy Garden", cast: "Auntie Ariel with Nina’s optional help", phoneCaptain: "Patrick", handoff: "Ariel runs the scene; Nina may point, hold the basket, help once, or leave.", reward: "FAIRY GYM REWARD", responsible: "Ariel", href: "nina/" },
    { time: "About 9:50–9:57", window: "18–25 min walking/readiness buffer", segment: "Travel and Oak readiness", cast: "Family team", phoneCaptain: "Patrick", handoff: "Walk, carry gifts, allow a child pause, and preserve the 10:15 Oak arrival goal.", reward: "No gift", responsible: "Patrick" },
    { time: "10:15 a.m. goal", window: "20–25 min including exit and drying", segment: "Oak Water Research", cast: "Professor Bruce and Professor Monica", phoneCaptain: "Polly or Auntie Ariel", handoff: "Separate Water Safety Adult, Phone Captain, and Professors; finish at the dry table.", reward: "WATER RESEARCH CAPSULES 1–4 + PROFESSOR OAK’S FIRST PARTNER FILE", responsible: "Monica + Bruce", href: "oak-lab/" },
    { time: "About 10:35–10:40", window: "10–15 min sheltered reset", segment: "Pokémon Center", cast: "Polly", phoneCaptain: "Patrick", handoff: "Dry/change/bathroom/water as needed, then run the short care challenge.", reward: "POKÉMON CENTER FIELD KIT", responsible: "Polly", href: "nurse-joy/" },
    { time: "About 10:50–11:00", window: "10–15 min plus walking/readiness", segment: "Team Rocket Base", cast: "Mike", phoneCaptain: "Patrick or Auntie Ariel", handoff: "Run Close Basket, Defense Target, and Luca’s Final Poké Shot with no formal score.", reward: "RECOVERED TEAM ROCKET LOOT", responsible: "Mike", href: "team-rocket/" },
    { time: "About 11:05–11:20", window: "12–18 min including travel and exit", segment: "Ranger Vault", cast: "Designated Adult Escort", phoneCaptain: "Adult Escort", handoff: "Use physical Code Card, recover cache, exit, confirm outside; bag carrier takes bulk items.", reward: "SECRET RANGER CACHE", responsible: "Adult escort" },
    { time: "About 11:20–11:38", window: "5–8 min after return travel", segment: "Oak return", cast: "Professor Bruce and Professor Monica", phoneCaptain: "Patrick", handoff: "Accept items, one callback, Rayquaza finding, authorization, compact reward, immediate departure.", reward: "MEGA EVOLUTION RESEARCH FILE", responsible: "Monica", href: "oak-lab/" },
    { time: "About 11:35–11:50", window: "25–35 min combined finale", segment: "Victory Road + Rayquaza + Champion", cast: "Auntie Ariel, then Patrick", phoneCaptain: "Patrick; Auntie Ariel for Champion", handoff: "One Ariel cue covers Victory Road, Rayquaza, and Champion summon; allow photos and child pauses.", reward: "POKÉMON LEAGUE CHAMPION CHEST", responsible: "Patrick", href: "league-recruiter/" },
    { time: "About 12:00–12:25", window: "8–12 min after fake-credit pause", segment: "Mew surprise", cast: "Patrick or lead adult", phoneCaptain: "Polly or Auntie Ariel", handoff: "Follow the post-credit signal; bring major rewards out now and bulk packs at celebration.", reward: "MYTHICAL ENCOUNTER + FINAL FAMILY CELEBRATION", responsible: "Patrick", href: "champion/" }
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
        arrival: "Luca’s first arrival goal is 10:15 a.m.; the return visit happens later when the group is ready.",
        ready: "Be ready by 10:10 a.m.",
        duration: "20–25 minutes including exit/drying, plus a 5–8 minute return",
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
          "A dedicated Water Safety Adult watches Luca only. Polly or Ariel is the separate Phone Captain. The Professors run clues and props."
        ],
        arrivalLines: [
          { speaker: "Professor Bruce", line: "Luca. Just in time. I asked the League to find you." },
          { speaker: "Professor Monica", line: "The reading jumped when you arrived. Use this diagram to find four samples." }
        ],
        sayAndDo: [
          "Let Luca retrieve the capsules. Swimming is optional; the skimmer works just as well.",
          "Give him direct clues whenever helpful and cheer when he finds each one.",
          "You are equal Partner Professors: Bruce welcomes Luca; Monica owns the scan and its biggest discovery."
        ],
        successLines: [
          { speaker: "Professor Monica", line: "Bruce—this reading is not coming only from the water. It is coming from above it." },
          { speaker: "Professor Bruce", line: "Luca, this was waiting for you." }
        ],
        successInstruction: "After Luca exits and dries, move to the dry table. Hand over the critical reward and clue; a designated adult carries larger packages later.",
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
            { speaker: "Professor Bruce", line: "Luca, the mark on this file matches the License I asked the League to prepare for you." },
            { speaker: "Professor Monica", line: "The Fairies, the patients, and the fragment all point home. The signal is from Mega Rayquaza." },
            { speaker: "Professor Bruce", line: "Why do you think the signal kept leading you home?" }
          ],
          note: "Any answer is great. Patrick will tell you when to hand Luca the final research gift."
        }
      },
      "nurse-joy": {
        eyebrow: "Polly",
        title: "Polly’s Part",
        subtitle: "You’ll be Nurse Joy, the kind person who helps Pokémon feel better.",
        arrival: "Luca arrives after the Water Preserve, around 10:35–10:40 if the morning is on pace.",
        ready: "Be ready for a flexible sheltered reset.",
        duration: "About 10–15 minutes including dry/change/bathroom/water time",
        character: "Nurse Joy",
        firstLine: "Luca, look—the patients stopped shaking when they heard you coming.",
        whatLucaDoes: "He listens to each patient’s symptoms, chooses or points to the care it needs, then carries a medicine ball back to you.",
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
          { speaker: "Nurse Joy", line: "Luca, look—the patients stopped shaking when they heard you coming. Will you help me choose their care?" }
        ],
        sayAndDo: [
          "Describe each patient. Luca may answer, point, or choose the matching treatment; Patrick’s cards explain everything.",
          "If he pauses, point to two choices or show him the answer. Then let him carry the medicine ball back to you.",
          "Be warm and encouraging. There are no wrong answers and he cannot fail."
        ],
        successLines: [
          { speaker: "Nurse Joy", line: "Three blankets, three happy patients, and one heroic Trainer." }
        ],
        successInstruction: "Hand Luca the Pokémon Center gift bag and clue card. Then give the Team Rocket warning.",
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
        arrival: "Luca arrives after the Pokémon Center reset, roughly 10:50–11:00.",
        ready: "Be ready within the flexible arrival window.",
        duration: "About 10–15 minutes",
        character: "Team Rocket Boss",
        firstLine: "So you’re Professor Oak’s new Trainer. You’ll have to beat my basketball defense!",
        whatLucaDoes: "He tries a few easy basketball shots while you pretend your defense is falling apart.",
        gift: "The Team Rocket gift bag and Ranger message, after Patrick gives the signal",
        finalLine: "That defense had a warranty! Fine—take the stolen message.",
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
          "Stage 1: Close Basket. Stage 2: one comfortable Defense Target. Stage 3: Luca chooses the Final Poké Shot.",
          "After a miss, move him closer or lower the hoop. A rim, backboard, target hit, soft pass, or layup can all count.",
          "Make funny comments about your defense malfunctioning. Luca always wins."
        ],
        successLines: [
          { speaker: "Team Rocket Boss", line: "That defense had a warranty! Fine—take the stolen message. You still won’t like what the Rangers found." }
        ],
        successInstruction: "Hand Luca the Team Rocket gift bag and Ranger message.",
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
        arrival: "Opening at 9:30 a.m.; the connected finale begins later when the group returns to Home Base.",
        ready: "Be ready by 9:25 a.m. Patrick will cue the later appearances.",
        duration: "10–15 minutes at opening; 25–35 minutes for the combined finale with Champion",
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
        successInstruction: "Hand Luca the Trainer gift bag and point him toward the Fairy Garden.",
        backup: [
          "Complete one short promise and protect one card.",
          "Place every Fairy Orb in plain sight or let Luca carry Nina’s basket himself.",
          "Patrick can prompt any line."
        ],
        optionalPlay: ["Bright hat", "Whistle", "Referee sash", "Clipboard", "Extra-energetic announcer voice"],
        secondAppearance: {
          title: "Later: Victory Road",
          intro: "Patrick will reset everything before Luca arrives. One private Ariel cue covers Victory Road, Rayquaza, and the Champion summon.",
          lines: [
            { speaker: "Auntie Ariel", line: "Welcome to Victory Road! Every assisted success is completely legal League behavior." },
            { speaker: "Auntie Ariel", line: "Victory Road is cleared! Now follow the Sky signal to Mega Rayquaza." }
          ],
          steps: [
            "Cheer Luca through one easy pass at each station.",
            "Move targets closer, show him the hidden tokens, and help as much as needed.",
            "For Rayquaza, one soft hit, ring toss, or direct assist works."
          ],
          note: "The phone returns for Victory Road cleared, then Rayquaza appears without a second full cue. After Legendary success, Ariel summons Patrick and remains Phone Captain."
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
          { speaker: "Supporting adult", line: "The lights fell where Nina cannot safely reach them. Luca, can you bring them back to her?" },
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
        arrival: "Enter after Ariel clears Rayquaza and summons the Champion.",
        ready: "Stay out of sight until Ariel or the phone gives the signal.",
        duration: "Part of the 25–35 minute combined finale",
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
        successInstruction: "Reveal the Champion Chest. Gather everyone who is here for the Champion photo.",
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
        "Auntie Ariel with Nina’s optional help — Fairy Garden",
        "Professor Bruce and Professor Monica — Research Lab",
        "Polly — Pokémon Center",
        "Mike — Team Rocket Base",
        "Designated adult — Ranger Vault escort",
        "Professor Bruce and Professor Monica — return visit",
        "Auntie Ariel — Victory Road and Rayquaza",
        "Patrick — Champion and Mew surprise"
      ],
      globalOperations: [
        "The phone stays with the assigned Phone Captain. Performers normally do not hold or operate it.",
        "Patrick is Phone Captain by default; the timeline and runtime cue show every exception.",
        "Patrick brings the important supplies, labeled gifts, clue cards, and printed prompts.",
        "Every sealed booster goes to the adult-held Booster Satchel for the final celebration.",
        "The real Ranger Vault information stays only on the private physical cards. Never copy it into the app or this portal.",
        "Give hints early. Shorten any activity before Luca becomes tired or frustrated.",
        "At the pool, the dedicated Water Safety Adult watches Luca continuously and never operates the phone. Polly or Auntie Ariel is Phone Captain.",
        "At the pool, open the private cue before approach, stow the phone safely away, exit and dry Luca, and return the phone only at the dry research table.",
        "At the Ranger Vault, confirm the approved boundary, keypad fallback, outside fallback, and bag carrier without recording any private digits.",
        "Offer individual photos at neighbor stations when convenient; the Hall moment gathers everyone who is present for one Champion photo.",
        "Keep the Champion Chest, Mew surprise, and later-story props hidden until their cues."
      ],
      phoneProtocol: {
        before: [
          "Fully charge the phone and carry a battery pack.",
          "Set Auto-Lock to Never or the longest available time.",
          "Turn on Do Not Disturb and set useful outdoor brightness.",
          "Load the site before the adventure.",
          "Keep a protective case on the phone and a dry towel near the pool.",
          "Export or verify progress recovery.",
          "Confirm Parent Mode access and test the deliberate Mew trigger."
        ],
        during: [
          "Patrick keeps the phone by default; the assigned Phone Captain handles exceptions.",
          "The Water Safety Adult never operates the phone during the pool mission.",
          "Turn the screen away before opening cast cues.",
          "Put the phone away during physical play.",
          "Hand over gifts only after Luca sees the app success.",
          "Use Parent Mode rather than troubleshooting in front of Luca."
        ],
        recovery: [
          "Page reloads: reload once; saved progress should restore the exact scene.",
          "Phone locks: unlock and return to the existing browser tab.",
          "Wrong scene: use Parent Mode → Scene directory.",
          "Participant unavailable: use the cue’s Easy Backup or have the lead adult perform it.",
          "Challenge skipped: use Parent Mode → Override / advance only after the adult accepts completion.",
          "Gift handed over early: keep the story moving and use the next app result as the celebration.",
          "Mew triggered too early: Parent Mode → return to Champion ending, then trigger again later.",
          "Internet unavailable: keep the loaded tab open; do not cold-close the browser."
        ]
      },
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
          setup: ["Four sealed capsules or dry-tub substitutes", "Pool skimmer, towel, and dry research table", "Research gifts and clue card hidden away from water"],
          safety: "The dedicated Water Safety Adult watches Luca continuously and never operates the phone. Polly or Auntie Ariel is Phone Captain. Bruce and Monica focus on welcoming, clueing, and cheering.",
          fallback: "Use swimming when appropriate, the skimmer, a dry tub, or one capsule if time is short.",
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
          slug: "ranger-vault",
          name: "Designated Adult Escort",
          cueIds: ["vault"],
          setup: ["Physical Trainer Code Card", "Approved boundary and cache", "One story item separated from larger packages", "Designated bag carrier"],
          safety: "Escort stays beside Luca. Confirm the approved boundary and exit before opening the success screen. Never place private digits in the phone or portal.",
          fallback: "Adult operates the keypad, brings the cache outside, or runs the entire recovery outside.",
          decisions: ["Confirm approved boundary", "Confirm keypad fallback", "Confirm outside fallback", "Name the bag carrier"]
        },
        {
          slug: "league-recruiter",
          name: "Auntie Ariel",
          cueIds: ["orientation", "victory-road"],
          setup: ["Trainer promise and card supplies", "Victory Road markers, ground line, soft target, and tokens", "Rayquaza target plus ring fallback"],
          safety: "Patrick stages the course and removes anything that encourages risky speed.",
          fallback: "One promise, one protected card, one supported pass per station, and a direct Rayquaza assist. One Ariel cue covers the full finale handoff.",
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
          safety: "Auntie Ariel remains Phone Captain for the Champion match. Keep the route in the approved backyard area and the target comfortable.",
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
