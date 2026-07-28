(function () {
  "use strict";

  var ACKNOWLEDGMENT = "I understand my cue, challenge, reward, and handoff.";

  window.CAST_PORTAL = {
    acknowledgment: ACKNOWLEDGMENT,
    eventDateLabel: "Birthday adventure run of show",
    timeline: [
      {
        time: "9:30 a.m.",
        window: "Arrive by 9:25",
        segment: "Trainer Orientation",
        cast: "Auntie Ariel",
        handoff: "League Recruiter welcomes Luca, completes the oath, and sends him to the Fairy Garden.",
        reward: "TRAINER KIT",
        responsible: "Ariel",
        href: "league-recruiter/"
      },
      {
        time: "9:42 a.m.",
        window: "Ready by 9:38",
        segment: "Fairy Garden Rescue",
        cast: "Nina, supported by Ariel",
        handoff: "Collect the Fairy Energy Orbs, then begin travel to Professor Oak’s Lab.",
        reward: "FAIRY GYM REWARD",
        responsible: "Ariel",
        href: "league-recruiter/"
      },
      {
        time: "9:52 a.m.",
        window: "23-minute travel/reset window",
        segment: "Travel and costume reset",
        cast: "Family team",
        handoff: "Bring the phone, Ranger Code Card, dry clothes, and an adult to Professor Oak’s Lab.",
        reward: "No package",
        responsible: "Lead adult"
      },
      {
        time: "10:15 a.m.",
        window: "Cast ready by 10:10",
        segment: "Professor Oak pool mission",
        cast: "Bruce and Monica",
        handoff: "Recover the research capsules, reveal the field rewards, then send Luca to Nurse Joy.",
        reward: "WATER RESEARCH CAPSULES 1–4 + PROFESSOR OAK’S FIRST PARTNER FILE",
        responsible: "Monica + Bruce",
        href: "oak-lab/"
      },
      {
        time: "10:35 a.m.",
        window: "Cast ready by 10:30",
        segment: "Pokémon Center",
        cast: "Polly",
        handoff: "Treat the patients, award the field kit, then warn Luca about Team Rocket.",
        reward: "POKÉMON CENTER FIELD KIT",
        responsible: "Polly",
        href: "nurse-joy/"
      },
      {
        time: "10:47 a.m.",
        window: "Cast ready by 10:42",
        segment: "Team Rocket basketball mission",
        cast: "Mike",
        handoff: "Lose theatrically, surrender the Ranger Dispatch and recovered loot, and point Luca toward the Ranger Vault.",
        reward: "RECOVERED TEAM ROCKET LOOT",
        responsible: "Mike",
        href: "team-rocket/"
      },
      {
        time: "10:59 a.m.",
        window: "Escort ready by 10:55",
        segment: "Secret Ranger Vault",
        cast: "Designated adult escort",
        handoff: "Stay beside Luca, use only the private physical fragments, and recover the sealed cache and research file.",
        reward: "SECRET RANGER CACHE",
        responsible: "Adult escort"
      },
      {
        time: "11:09 a.m.",
        window: "Cast reset by 11:05",
        segment: "Professor Oak return",
        cast: "Bruce and Monica",
        handoff: "Analyze the quest items, ask one friendly callback, award League Authorization, and send Luca to Victory Road.",
        reward: "MEGA EVOLUTION RESEARCH FILE",
        responsible: "Monica",
        href: "oak-lab/"
      },
      {
        time: "11:17 a.m.",
        window: "Course ready by 11:12",
        segment: "Victory Road and Rayquaza",
        cast: "Auntie Ariel",
        handoff: "Referee one supported pass through each station and hand the cleared course to the Champion.",
        reward: "League qualification handoff",
        responsible: "Ariel",
        href: "league-recruiter/"
      },
      {
        time: "About 11:24 a.m.",
        window: "Champion hidden until called",
        segment: "Champion match and apparent finale",
        cast: "Patrick",
        handoff: "Concede after Knowledge, Skill, and Heart; reveal the chest; gather the Hall of Heroes; preserve the fake-credit pause.",
        reward: "POKÉMON LEAGUE CHAMPION CHEST",
        responsible: "Patrick",
        href: "champion/"
      },
      {
        time: "11:30 a.m.",
        window: "Mew trail staged before event",
        segment: "Mew epilogue",
        cast: "Patrick or Ariel shadows the route",
        handoff: "Follow the signal only after the fake credits, reveal Mew, then begin the family celebration.",
        reward: "MYTHICAL ENCOUNTER + FINAL FAMILY CELEBRATION",
        responsible: "Patrick",
        href: "champion/"
      }
    ],
    participantOrder: [
      "Auntie Ariel — League opening",
      "Nina with Ariel — Fairy Garden",
      "Bruce and Monica — Oak pool mission",
      "Polly — Pokémon Center",
      "Mike — Team Rocket Base",
      "Designated adult — Ranger Vault escort",
      "Bruce and Monica — Oak return",
      "Auntie Ariel — Victory Road referee",
      "Patrick — Champion and epilogue lead"
    ],
    guides: {
      "oak-lab": {
        title: "Professor Oak’s Water Research Lab",
        eyebrow: "Bruce and Monica",
        participants: [
          { name: "Bruce", role: "Professor Oak" },
          { name: "Monica", role: "Lead Research Assistant" }
        ],
        duration: "15–20 minutes, plus an 8-minute return checkpoint",
        arrival: "First visit about 10:15 a.m.; return about 11:09 a.m.",
        mainJob: "Run the safe pool-retrieval mission, award the research packages, advance the fragment mystery, and later qualify Luca for the League.",
        lucaKnows: "Professor Oak requested help with unusual energy in the Water Preserve. Luca expects a research mission, but does not know what the fragments ultimately unlock.",
        entranceCue: [
          { speaker: "Bruce", line: "Shhh… the preserve is unusually active. Wait. You must be Trainer Luca." },
          { speaker: "Monica", line: "Professor, the capsule readings are rising. Trainer Luca, we need all four samples before Team Rocket finds them." }
        ],
        script: [
          { speaker: "Bruce", line: "Trainer Luca, strange Pokémon energy has appeared across the Creekside Region. Four research capsules are waiting in the Water Preserve, and one carries unusual Sky energy." },
          { speaker: "Monica", line: "Use this symbol diagram to find every sample. I have the skimmer, towel, and research tray ready." },
          { speaker: "Bruce", line: "Recover the capsules safely, identify the unstable symbol, and protect the research." }
        ],
        challenge: [
          "One water-safety adult watches Luca continuously.",
          "Luca safely recovers four clearly marked floating or shallow capsules and places them in the dry research tray.",
          "Monica gives clues from the symbol diagram and may use the pool skimmer at any time.",
          "The Sky Fragment goes in the tray; valuable items remain double-contained."
        ],
        success: "All four objects are safely recovered and the Sky Fragment reaches the tray. Decoys, hints, a skimmer, or a fully dry version never count against Luca.",
        rewardPackages: [
          "WATER RESEARCH CAPSULES 1–4 — Monica",
          "PROFESSOR OAK’S FIRST PARTNER FILE — Bruce",
          "MEGA EVOLUTION RESEARCH FILE at the return checkpoint — Monica"
        ],
        rewardHandoff: "Wait for the app’s success animation. Open the assigned open-now items, move every sealed booster to the adult Booster Satchel, and hand over the assigned physical fragment card without reading or showing its private mark.",
        transition: "First visit: Oak reports that affected Pokémon need Nurse Joy. Return: Bruce and Monica accept the Sky Fragment and sealed file, ask one friendly callback question, award League Authorization, and send Luca to Victory Road.",
        checklist: [
          "Bruce: white coat; optional Professor-style hair; clipboard or binoculars",
          "Monica: lab coat or field vest; clipboard; capsule symbol diagram",
          "Four double-sealed capsules; dry tray; towel; pool skimmer",
          "Sky Fragment prop and assigned physical fragment card",
          "All three labeled reward packages",
          "Dedicated water-safety adult"
        ],
        fallback: "Keep the full story but retrieve every capsule with the skimmer from the deck. If the pool is unavailable, place four marked tennis balls in a dry tub or on a towel. At the return, ask only one callback question; any answer counts.",
        emergency: "Bruce announces an urgent sample. Monica points out the marked capsule or uses the skimmer. Luca retrieves it, receives the field reward and physical fragment, and hears: “Excellent work. Continue your journey and return when you have collected the others.” On return, accept the two quest items and immediately award League Authorization.",
        doNotReveal: [
          "The private mark on any physical fragment or the final purpose of the fragments",
          "The Secret Ranger Vault solution",
          "The Champion outcome",
          "The fake credits or Mew epilogue"
        ],
        placeholders: [
          "Confirm whether the pool version or dry-tub fallback will be staged.",
          "Confirm final costume pieces and whether printed role badges are wanted.",
          "Confirm which photographed mini tin is assigned to this station."
        ]
      },
      "nurse-joy": {
        title: "Nurse Joy’s Pokémon Center",
        eyebrow: "Polly",
        participants: [{ name: "Polly", role: "Nurse Joy" }],
        duration: "8–12 minutes",
        arrival: "Luca arrives about 10:35 a.m.; be ready by 10:30.",
        mainJob: "Help Luca care for three Pokémon, award the field kit, and send him onward with a Team Rocket warning.",
        lucaKnows: "Professor Oak’s readings suggest Pokémon have been affected by unstable energy. Luca knows the next stop is a Pokémon Center emergency.",
        entranceCue: [
          { speaker: "Polly", line: "Trainer Luca, I’m glad you’re here. Three Pokémon need help, and I heard you know how to take care of your team." }
        ],
        script: [
          { speaker: "Polly", line: "Pikachu, Charmander, and Eevee each need the right care. Match every patient with a treatment, then carry the medicine Poké Ball back to me." },
          { speaker: "Polly", line: "You may ask for a Nurse Joy hint at any time." },
          { speaker: "Polly", line: "You treated your Pokémon with patience and kindness. That is what makes someone a real Trainer." }
        ],
        challenge: [
          "Show three patient cards and three matching treatment cards.",
          "Let Luca identify what is wrong and choose a treatment.",
          "Complete the short medicine Poké Ball delivery path.",
          "Give an immediate hint, remove a wrong option, or demonstrate the first match whenever useful."
        ],
        success: "All three patients receive care with unlimited hints. No wrong choice causes failure, and a demonstrated match still counts.",
        rewardPackages: ["POKÉMON CENTER FIELD KIT — Polly"],
        rewardHandoff: "After the app’s success animation, open the reader, portfolio, and team card; put the sealed booster in the adult Booster Satchel; hand over the assigned physical fragment without revealing its private mark.",
        transition: "Warn Luca: “Your Pokémon is healthy again, but Team Rocket has been spotted nearby. Stay alert.” Send the group toward Team Rocket Base.",
        checklist: [
          "Pink apron, pink headband, or other Nurse Joy costume piece",
          "Three patient cards and three treatment cards",
          "Soft medicine Poké Ball and two short path markers",
          "POKÉMON CENTER FIELD KIT",
          "Assigned physical fragment card"
        ],
        fallback: "Move indoors, shorten the delivery path, remove one wrong choice, or say two treatment choices aloud and let Luca point. Keep the tone warm and collaborative.",
        emergency: "Show one patient and two treatments. Luca chooses with a hint, carries the medicine Poké Ball back, receives the field kit and physical fragment, and hears the Team Rocket warning.",
        doNotReveal: [
          "The private mark on the physical fragment or what all fragments unlock",
          "What Team Rocket is holding",
          "The Champion ending",
          "The fake credits or Mew epilogue"
        ],
        placeholders: [
          "Confirm the exact Pokémon Center setup area within Home Base.",
          "Confirm final Nurse Joy costume pieces or printed badge."
        ]
      },
      "team-rocket": {
        title: "Team Rocket Basketball Base",
        eyebrow: "Mike",
        participants: [{ name: "Mike", role: "Team Rocket Boss" }],
        duration: "10–15 minutes",
        arrival: "Luca arrives about 10:47 a.m.; be ready by 10:42.",
        mainJob: "Run a dramatic, forgiving basketball challenge, lose on purpose, and surrender the recovered loot and Ranger Dispatch.",
        lucaKnows: "Nurse Joy warned that Team Rocket is nearby. The app reveals that Team Rocket took Professor Oak’s Ranger Dispatch.",
        entranceCue: [
          { speaker: "Mike", line: "So you’re Professor Oak’s new Trainer. That Ranger Dispatch belongs to Team Rocket now." },
          { speaker: "Mike", line: "You want it back? Then defeat the Team Rocket Defense System." }
        ],
        script: [
          { speaker: "Mike", line: "Make three baskets before the defenses reset: one very close shot, one comfortable shot, and a final spot you choose." },
          { speaker: "Mike", line: "My defense is scientifically unbeatable—unless you get closer, which would be extremely unfair to me." },
          { speaker: "Mike", line: "Impossible! The Team Rocket Defense System has been defeated! Fine. Take the stolen item." }
        ],
        challenge: [
          "Round one is a very close shot.",
          "Round two is a comfortable shot.",
          "Luca chooses the final shooting spot.",
          "After two misses, move closer; lower the hoop or count a rim, backboard, or prepared target hit as damage.",
          "Mike narrates the defense failing and always loses."
        ],
        success: "Luca completes the three forgiving rounds with any needed assists. Effort, a target hit, a layup, or the prepared fallback all defeat the defense.",
        rewardPackages: ["RECOVERED TEAM ROCKET LOOT — Mike"],
        rewardHandoff: "After the app’s success animation, open the three team cards, place the sealed booster in the adult Booster Satchel, and hand over the Ranger Dispatch and Rocket Badge.",
        transition: "Say: “Those Rangers left something behind before they disappeared. You will never figure out what the fragments are for.” Send Luca with an adult toward the Secret Ranger Vault.",
        checklist: [
          "Black shirt with red Team Rocket R",
          "Sunglasses",
          "Adjustable hoop; child-sized or soft basketball",
          "Three close shooting markers and large fallback target",
          "RECOVERED TEAM ROCKET LOOT",
          "Ranger Dispatch and reward envelope"
        ],
        fallback: "Use the closest marker, lower the hoop, count target or backboard hits, throw soft Poké Balls at three Team Rocket targets, or use one close basket plus two easy Pokémon questions. Ariel can perform a Team Rocket takeover if Mike is unavailable.",
        emergency: "Luca takes one close shot or soft toss. Mike dramatically declares the defense destroyed, surrenders the loot and Ranger Dispatch, and sends him toward the Ranger Vault.",
        doNotReveal: [
          "How the Ranger Vault is opened",
          "Any private fragment marks",
          "What is inside later reward packages",
          "The Champion ending, fake credits, or Mew epilogue"
        ],
        placeholders: [
          "Confirm the final hoop height and whether the large fallback target will be used.",
          "Confirm final Team Rocket costume pieces."
        ]
      },
      "league-recruiter": {
        title: "Pokémon League Recruiter & Victory Road Referee",
        eyebrow: "Auntie Ariel",
        participants: [{ name: "Auntie Ariel", role: "League Recruiter and Victory Road Referee" }],
        duration: "About 12 minutes at opening; 5–10 minutes at Victory Road",
        arrival: "Opening at 9:30 a.m.; Victory Road begins about 11:17 a.m.",
        mainJob: "Launch Luca’s official mission, support the Fairy Garden handoff, then referee Victory Road and pass the cleared course to the Champion.",
        lucaKnows: "At opening, Luca only knows that a birthday Pokémon adventure is beginning. At Victory Road, he knows Oak has qualified him for the League and one final trial remains.",
        entranceCue: [
          { speaker: "Ariel, opening", line: "Trainer Luca! A new region has appeared, and the Pokémon League chose you to investigate." },
          { speaker: "Ariel, Victory Road", line: "Welcome to Victory Road! I will judge every move with complete League fairness—and possibly one very slow Slowpoke penalty." }
        ],
        script: [
          { speaker: "Opening", line: "Promise to protect Pokémon, help your friends, play fairly, and never give up. Then show me how an official Trainer protects one special card!" },
          { speaker: "Victory Road", line: "Clear the Tall Grass, cross the forest line, hit the target, and recover the Energy Tokens. Ready, Trainer?" },
          { speaker: "Rayquaza", line: "One clear hit completes the encounter. If needed, the League authorizes a Legendary Assist!" }
        ],
        challenge: [
          "Opening: guide the Trainer Oath and a simple card-protection equipment test; help with any fiddly packaging.",
          "Fairy handoff: support Nina with short prompts while Luca gathers the visible Energy Orbs.",
          "Victory Road: referee one supported pass through Tall Grass markers, a ground-level balance line, a soft target, and visible Energy Tokens.",
          "Rayquaza: one soft target hit, ring toss, or immediate Legendary Assist."
        ],
        success: "Every sincere oath response counts. Luca clears each Victory Road station once with any assistance; accuracy never hard-fails, and harmless comedy replaces penalties.",
        rewardPackages: [
          "TRAINER KIT — Ariel",
          "FAIRY GYM REWARD — Ariel",
          "League qualification handoff — Ariel confirms Victory Road is cleared"
        ],
        rewardHandoff: "At opening, reveal the Trainer Kit, keep its booster sealed in the adult Booster Satchel, and preserve the physical Ranger Code Card. At Victory Road, wait for the app’s confirmation and call the Champion only after Rayquaza is cleared.",
        transition: "Opening: send Luca to the Fairy Garden. After the Fairy reward, begin travel to Professor Oak’s Lab. Victory Road: announce that the final League challenger may enter, then step aside for Patrick.",
        checklist: [
          "Whistle, clipboard, League badge or jacket",
          "Trainer Oath card, Trainer License, Trainer Kit",
          "Fairy basket, three large visible Energy Orbs, Fairy reward",
          "Victory Road markers, ground line, soft balls, target, three tokens",
          "Soft Rayquaza target and ball; optional rings or symbol fallback",
          "Obstacle-course scorecard"
        ],
        fallback: "Help with every equipment step. Let Nina point to fully visible orbs. Shorten Victory Road to one safe pass per station, widen targets, reveal tokens, and invoke a Legendary Assist after the first Rayquaza attempt.",
        emergency: "Complete the oath with one promise, place one protected card in the Trainer Kit, and send Luca onward. At Victory Road, Luca crosses one visible line, touches one token, and makes one assisted soft toss; Ariel announces the course cleared and calls the Champion.",
        doNotReveal: [
          "Locked participants or locations before the player app reveals them",
          "The Ranger Vault solution or any private fragment marks",
          "Patrick’s Champion entrance or the outcome of the match",
          "The fake credits or Mew epilogue"
        ],
        placeholders: [
          "Confirm the exact Fairy Energy Orb hiding spots.",
          "Confirm the final Rayquaza game: hanging target, ring toss, or symbol assembly.",
          "Confirm final League costume pieces and printed badge."
        ]
      },
      "champion": {
        title: "Creekside Region Champion",
        eyebrow: "Patrick",
        participants: [{ name: "Patrick", role: "Champion and epilogue lead" }],
        duration: "About 3–4 minutes for the match; roughly 13 minutes through fake credits; 6 more minutes for the epilogue",
        arrival: "Stay out of sight until Victory Road clears, about 11:24 a.m.; apparent finale ends about 11:30.",
        mainJob: "Run the Knowledge, Skill, and Heart match, concede the title, reveal the Champion Chest, hold the fake-credit pause, then lead the Mew epilogue and celebration.",
        lucaKnows: "Luca has qualified for the League and cleared Victory Road. He expects a final Champion match and believes the adventure ends with the Hall of Heroes.",
        entranceCue: [
          { speaker: "Patrick", line: "Trainer Luca, I’ve watched your entire journey. A Champion needs knowledge, skill, and heart. Show me all three." }
        ],
        script: [
          { speaker: "Knowledge", line: "Choose a helpful Pokémon type for this challenge. Any thoughtful choice counts." },
          { speaker: "Skill", line: "Make one comfortable target toss. We can move closer whenever you want." },
          { speaker: "Heart", line: "Name someone or a Pokémon who helped you today." },
          { speaker: "Concession", line: "The match is over. Luca, you are the new Champion of the Creekside Region." }
        ],
        challenge: [
          "Knowledge: offer two or three friendly type-choice cards.",
          "Skill: use one soft target toss from a comfortable distance.",
          "Heart: accept any person or Pokémon Luca names.",
          "After the reward, gather the Hall of Heroes and group photo, then let the fake credits play without explaining the pause."
        ],
        success: "Every sincere answer counts. Move the target closer after a miss; the no-prop skill fallback is a high-five. Patrick always concedes.",
        rewardPackages: [
          "POKÉMON LEAGUE CHAMPION CHEST — Patrick",
          "MYTHICAL ENCOUNTER — Patrick, hidden separately",
          "FINAL FAMILY CELEBRATION — Patrick"
        ],
        rewardHandoff: "After the app’s success animation, reveal the Champion Chest, open the deck and model, and keep every booster sealed for the family celebration. Keep the Mew reward physically separate until the post-credit signal and trail are complete.",
        transition: "Gather the Hall of Heroes and group photo. Treat the ending as real. Do not talk over the fake credits. When the app reports a new signal, shadow Luca along the prepared three-marker Mythical Trail, reveal Mew, then bring out the Booster Satchel and celebration.",
        checklist: [
          "Champion jacket, cape, or badge",
          "Printed type-choice cards",
          "Soft target game and closest marker",
          "POKÉMON LEAGUE CHAMPION CHEST",
          "Three pink Mythical Trail markers",
          "Separate Mew reveal box and MYTHICAL ENCOUNTER package",
          "Adult Booster Satchel, treats, sleeves, clear table, and photo area"
        ],
        fallback: "Give two knowledge choices, use the closest marker, and replace the skill toss with a high-five. If the Mew trail needs help, move markers into open view or give warm/cold clues. Keep the full fake-credit pause even on a compressed schedule.",
        emergency: "Ask one knowledge choice, accept one easy toss or high-five, and ask who helped today. Concede, reveal the chest, gather one quick photo, preserve the fake-credit pause, then guide Luca directly through the three visible Mew markers to the separate reveal.",
        doNotReveal: [
          "Your entrance before Ariel clears Victory Road",
          "That Luca is guaranteed to win",
          "That the apparent ending is followed by a signal",
          "Mew or the hidden Mew reward before the post-credit reveal",
          "Any private Ranger Vault information"
        ],
        placeholders: [
          "Confirm the exact Champion costume and final type-choice card art.",
          "Confirm the final Rayquaza-to-Champion handoff wording.",
          "Confirm the exact Mew hiding place and final celebration setup.",
          "Write the Hall of Fame Team Reserve’s exact physical contents on a private paper packing slip."
        ]
      }
    }
  };
}());
