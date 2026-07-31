/* Shared V3 cast Quick Cards.
   Runtime relay screens and the Cast Portal both read these core fields.
   Keep the private Ranger Vault digits off this file and every tracked file. */
(function () {
  "use strict";

  window.CREEKSIDE_CAST_CORES = {
    orientation: {
      id: "orientation",
      portalGuide: "league-recruiter",
      performerName: "Auntie Ariel",
      characterName: "Pokémon League Recruiter",
      phoneCaptain: "Patrick",
      entranceCue: "Patrick privately opens this cue before Luca enters. Stand ready with the Trainer Kit, Ranger Code Card, pencil, and a clearly labeled Save for Celebration container.",
      spokenLines: [
        "Luca—we’ve been waiting for you. Professor Oak asked for you by name.",
        "Your Trainer License is official. Now let’s prepare your first field card.",
        "Now show me how an official Trainer protects one special card!"
      ],
      challengeSteps: [
        "Help him sleeve one card and place it in a top loader.",
        "Help him secure the protected card in the deck box.",
        "Introduce the Ranger Code Card and pencil.",
        "Put the first sealed booster directly into the Save for Celebration container."
      ],
      runtimeSteps: [
        "Help Luca sleeve one card and place it in the top loader and deck box."
      ],
      whenFinished: "Say, “It worked. Oak was right about you.” Then tell Patrick the result is ready. Present the Trainer Kit only after Luca sees it.",
      runtimeBackup: "Hold the sleeve or top loader for Luca. One protected card is enough.",
      successCondition: "Complete each equipment step once, with as much adult help as needed. The oath was completed during license registration.",
      rewardPackages: ["TRAINER KIT"],
      rewardOwners: ["Ariel"],
      rewardPreparation: "Keep the Trainer Kit, Ranger Code Card, pencil, and Save for Celebration container together. Hand over the kit immediately after success and visibly store the first booster.",
      fallback: "Hold the sleeve or top loader while Luca slides the card into place. If time is short, protect one card and move on.",
      transitionLine: "It worked. Oak was right about you—and something in the Fairy Garden just answered.",
      transitionDestination: "Fairy Garden",
      handoffStory: "The League Recruiter is ready to make this mission official.",
      handoffLabel: "Adult: Hold to open Auntie Ariel’s cue",
      completionLabel: "Phone Captain: Hold Mission Complete"
    },
    fairy: {
      id: "fairy",
      portalGuide: "league-recruiter",
      performerName: "Auntie Ariel",
      characterName: "Fairy Garden Guide with Nina’s optional help",
      phoneCaptain: "Patrick",
      supportingRole: "Nina never handles the phone. Her role is optional: she knows the eight hiding places and may point, use one-word clues, carry one light, cheer, lose interest, or skip.",
      entranceCue: "Turn on and safely hide eight battery tea lights before Luca arrives. Nina knows every location. Choose Polly, Ariel, or Patrick to quietly arrange each returned light into an arrow on the Fairy Table without explaining the pattern.",
      spokenLines: [
        "Nina: Luca! Lights! Can’t reach!",
        "Ariel: Nina knows where eight Fairy lights are. Follow her clues and bring them to the table.",
        "Ariel: Step back. They made an arrow!"
      ],
      challengeSteps: [
        "Let Nina point Luca toward eight glowing battery tea lights hidden in safe backyard locations.",
        "Luca retrieves each light from the ground or from standing reach and carries it to the Fairy Table.",
        "Polly, Ariel, or Patrick quietly forms an arrow with the returned lights while the search continues.",
        "After the eighth light arrives, reveal that the arrow points toward Professor Oak and Professor Monica’s Lab."
      ],
      runtimeSteps: [
        "Ariel runs the mission and keeps the phone-facing role.",
        "Nina gives short clues; Luca brings eight lights to the table.",
        "An adult quietly builds the arrow and hides the pattern.",
        "Luca succeeds without Nina."
      ],
      whenFinished: "Reveal the arrow. Say, “The lights know where to send you next.” Patrick opens Luca’s result and prepares the gift.",
      runtimeBackup: "Move lights into plain sight, use fewer lights, or have an adult give every clue. Still complete the arrow.",
      successCondition: "All eight lights reach the Fairy Table and the arrow is revealed. Direct pointing, visible placement, and immediate hints are always allowed.",
      rewardPackages: ["FAIRY GYM REWARD"],
      rewardOwners: ["Ariel"],
      rewardPreparation: "Have the Fairy reward ready. After Luca sees the success screen, open the reader and team cards; place the booster in the adult Booster Satchel.",
      fallback: "Place the remaining lights in full view. If Nina loses interest, an adult gives the clues while Luca finishes. Move the search indoors if needed and form the arrow on a table.",
      transitionLine: "The lights are pointing toward Professor Oak’s Lab. They are trying to tell Luca something.",
      transitionDestination: "Professor Oak’s Lab",
      handoffStory: "The youngest Gym Leader is ready, with Auntie Ariel beside her.",
      handoffLabel: "Adult: Hold to open Auntie Ariel’s Fairy Garden cue",
      completionLabel: "Phone Captain: Hold Mission Complete"
    },
    "oak-water": {
      id: "oak-water",
      portalGuide: "oak-lab",
      performerName: "Professor Oak and Professor Monica",
      characterName: "Partner Professors",
      phoneCaptain: "Polly or Auntie Ariel",
      waterSafetyAdult: "Dedicated Water Safety Adult — watches Luca continuously and never operates the phone.",
      entranceCue: "Open this private cue before anyone approaches the pool. Professors are ready at the dry research table; the Phone Captain stows the phone safely away before Luca enters the preserve.",
      spokenLines: [
        "Professor Oak: Luca. Just in time. I asked the League to find you.",
        "Professor Monica: The reading jumped when you arrived. Use this diagram to find four samples.",
        "Professor Monica: Oak—this reading is not coming only from the water. It is coming from above it."
      ],
      challengeSteps: [
        "The dedicated Water Safety Adult watches Luca continuously and never operates the phone.",
        "The Phone Captain keeps the phone and operates the protected controls.",
        "Professor Oak and Professor Monica run the clues from the prepared research position.",
        "Keep a skimmer, towel, and dry research tray ready.",
        "Luca safely retrieves four floating or shallow capsules.",
        "Exit the water, dry Luca, and move every capsule to the dry table before the phone returns."
      ],
      runtimeSteps: [
        "Water Safety Adult watches Luca; Phone Captain handles the phone; Professors run clues.",
        "Stow the phone safely away. Use swimming, the skimmer, or one easy capsule at a time.",
        "Exit and dry Luca, then move to the dry research table before the phone returns."
      ],
      whenFinished: "At the dry table: “Luca, this was waiting for you.” Confirm he is dry, then open the result.",
      runtimeBackup: "Use the skimmer, a dry-tub version, or one capsule only. Safety always comes first.",
      successCondition: "All four objects are safely recovered and the Sky Fragment reaches the tray. Swimming, skimmer, dry tub, hints, and decoys all count.",
      rewardPackages: ["WATER RESEARCH CAPSULES 1–4", "PROFESSOR OAK’S FIRST PARTNER FILE"],
      rewardOwners: ["Monica", "Bruce"],
      rewardPreparation: "Stage both packages away from the water. After the result screen, open the assigned items and place every sealed booster in the adult Booster Satchel. Hand over the physical fragment without showing its private mark.",
      fallback: "Use swimming only when appropriate, retrieve with the skimmer from the deck, switch to a dry tub, or run one capsule only. Never rush water safety.",
      transitionLine: "…You actually found it. And the same energy has reached the Pokémon Center.",
      transitionDestination: "Pokémon Center",
      handoffStory: "Two Water Research Professors are waiting at the preserve.",
      handoffLabel: "Adult: Hold to open Professor Oak and Professor Monica’s cue",
      completionLabel: "Phone Captain: Hold Mission Complete"
    },
    "nurse-joy": {
      id: "nurse-joy",
      portalGuide: "nurse-joy",
      performerName: "Polly",
      characterName: "Nurse Joy",
      phoneCaptain: "Patrick",
      entranceCue: "Patrick privately opens this cue while Luca uses the sheltered reset for drying, changing, bathroom, or water. Wait beside the short treatment activity.",
      spokenLines: [
        "Luca, look—the patients stopped shaking when they heard you coming.",
        "I will describe each patient. You choose the care it needs, then bring the medicine Poké Ball back to me.",
        "You may ask for a Nurse Joy hint at any time. That is official medical advice—and excellent Trainer strategy."
      ],
      challengeSteps: [
        "Show the three patient cards and matching treatments.",
        "Let Luca choose a treatment for each patient, offering immediate hints.",
        "Guide the short medicine Poké Ball delivery path."
      ],
      runtimeSteps: [
        "Describe each patient; Luca may answer, point, or choose the matching treatment. Give hints immediately.",
        "Guide the short medicine Poké Ball delivery."
      ],
      whenFinished: "Say, “Three blankets, three happy patients, and one heroic Trainer.” Then let Patrick open the result.",
      runtimeBackup: "Use one patient and two choices, then make the medicine delivery one step.",
      successCondition: "All patients receive care with unlimited hints. No wrong choice causes failure, and a demonstrated match still counts.",
      rewardPackages: ["POKÉMON CENTER FIELD KIT"],
      rewardOwners: ["Polly"],
      rewardPreparation: "Keep the field kit ready. After the result screen, open the reader, portfolio, and team card; place the booster in the adult Booster Satchel and hand over the physical fragment privately.",
      fallback: "Remove one wrong option, demonstrate the first match, say two choices aloud, or move the entire activity indoors.",
      transitionLine: "They trust you, Luca. But that receiver says Team Rocket followed the same trail.",
      transitionDestination: "Team Rocket Base",
      handoffStory: "Nurse Joy has prepared an emergency treatment station.",
      handoffLabel: "Adult: Hold to open Polly’s Nurse Joy cue",
      completionLabel: "Phone Captain: Hold Mission Complete"
    },
    rocket: {
      id: "rocket",
      portalGuide: "team-rocket",
      performerName: "Mike",
      characterName: "Team Rocket Boss",
      phoneCaptain: "Patrick or Auntie Ariel",
      entranceCue: "No score. Luca always wins. Stand near the adjustable hoop with the Ranger Dispatch and stolen loot visible but out of reach.",
      spokenLines: [
        "So you’re the famous Luca. Oak chose you; Team Rocket chose this extremely secure basketball hoop.",
        "Break my patented, unstoppable, definitely-not-adjustable defense and attempt the Final Poké Shot!",
        "Impossible! That defense had a warranty! Fine—take the Dispatch. You still won’t like what the Rangers found."
      ],
      challengeSteps: [
        "Stage 1 — Close Basket: begin at the easiest marker.",
        "Stage 2 — Defense Target: use any comfortable target; rim or backboard weakens the defense.",
        "Stage 3 — Final Poké Shot: Luca chooses the spot.",
        "Move closer or lower the hoop immediately. Luca always wins."
      ],
      runtimeSteps: [
        "Close Basket, then one comfortable Defense Target. Rim or backboard weakens the defense.",
        "Luca chooses the Final Poké Shot. Move closer or lower the hoop until Team Rocket loses."
      ],
      whenFinished: "Say Team Rocket is defeated and surrender the stolen loot to Luca after the success screen.",
      runtimeBackup: "Use one close shot, a target hit, or three soft passes. Luca always wins.",
      successCondition: "Mike always loses. A basket, target hit, layup, soft pass, or prepared fallback defeats the defense.",
      rewardPackages: ["RECOVERED TEAM ROCKET LOOT"],
      rewardOwners: ["Mike"],
      rewardPreparation: "Keep the loot, Ranger Dispatch, and the last physical fragment card ready. After the result screen, open the team cards, place the booster in the adult Booster Satchel, then hand over the Dispatch and the final fragment together without showing its private mark.",
      fallback: "Lower the hoop, use the closest marker, count target hits, accept three soft passes, or use one close shot plus two easy Pokémon questions.",
      transitionLine: "The Rangers left a warning, not treasure. And somehow, they were waiting for you!",
      transitionDestination: "Secret Ranger Vault",
      handoffStory: "Team Rocket is blocking the route and holding Oak’s Ranger Dispatch.",
      handoffLabel: "Adult: Hold to open Mike’s cue",
      completionLabel: "Phone Captain: Hold Mission Complete"
    },
    vault: {
      id: "vault",
      portalGuide: null,
      performerName: "Designated Adult Escort",
      characterName: "Ranger Vault Escort",
      phoneCaptain: "Adult Escort",
      entranceCue: "Confirm the approved boundary, keypad fallback, outside fallback, and designated bag carrier. Keep the phone and physical Trainer Code Card with the adults.",
      spokenLines: [
        "Trainer Luca, read the four private marks from your physical Ranger Code Card.",
        "I will stay beside you while we use the real keypad.",
        "Now follow the three Ranger symbols to the protected cache."
      ],
      challengeSteps: [
        "The escort keeps Luca inside the approved configurable boundary.",
        "Use only the private physical card; the app never receives or displays the entry information.",
        "Follow the three prepared Ranger symbols.",
        "Recover the cache, exit, and confirm success outside.",
        "Open one story item only; the bag carrier takes larger items home or to the Professors."
      ],
      runtimeSteps: [
        "Stay beside Luca inside the approved boundary and use only the private physical Trainer Code Card.",
        "Recover the cache, exit, and confirm outside. Open one story item; the bag carrier takes the rest."
      ],
      whenFinished: "Outside, say, “This file bears the same mark as your License.” Keep it sealed and tell the Phone Captain the result is ready.",
      runtimeBackup: "Operate the keypad for Luca or bring the sealed cache outside.",
      successCondition: "Adult-accompanied entry and safe recovery of the cache and sealed file. The escort may operate the keypad or bring the cache outside.",
      rewardPackages: ["SECRET RANGER CACHE"],
      rewardOwners: ["Designated Adult Escort"],
      rewardPreparation: "Keep the cache staged inside the approved boundary. Outside, open one story item only; the designated bag carrier takes larger items home or to the Professors.",
      fallback: "The escort enters the private information or brings the sealed cache outside and delivers the Ranger transmission verbally.",
      transitionLine: "The mark on the sealed file matches Luca’s License. Professor Oak must see it immediately.",
      transitionDestination: "Professor Oak’s Lab",
      handoffStory: "The protected Ranger mission requires one designated adult beside Luca.",
      handoffLabel: "Adult: Hold to open the Adult Escort’s cue",
      completionLabel: "Phone Captain: Hold Mission Complete"
    },
    "oak-return": {
      id: "oak-return",
      portalGuide: "oak-lab",
      performerName: "Professor Oak and Professor Monica",
      characterName: "Partner Professors",
      phoneCaptain: "Patrick",
      entranceCue: "Run a compact 5–8 minute return: accept the items, one callback, Rayquaza finding, League Authorization, compact reward, then immediate Victory Road departure.",
      spokenLines: [
        "Professor Oak: Luca… the mark on this file matches the License I asked the League to prepare for you.",
        "Professor Monica: The Fairies, the patients, and the fragment all point home. The signal is from Mega Rayquaza.",
        "Professor Oak: The signal was testing a path to you. Why do you think it kept leading you home?"
      ],
      challengeSteps: [
        "Accept the Sky Fragment and sealed Research File.",
        "Professor Monica opens the file and announces the Rayquaza finding.",
        "Professor Oak asks one friendly callback question.",
        "Award League Authorization."
      ],
      runtimeSteps: [
        "Accept the Sky Fragment and sealed Research File.",
        "Monica announces the Rayquaza finding; Oak asks one friendly question.",
        "Any answer counts, then award League Authorization."
      ],
      whenFinished: "Give the compact reward and League Authorization, then send Luca immediately to Victory Road.",
      runtimeBackup: "Ask one two-choice question or simply announce that the scan confirms qualification.",
      successCondition: "Any remembered detail, prompted choice, or sincere answer qualifies Luca for the League.",
      rewardPackages: ["MEGA EVOLUTION RESEARCH FILE"],
      rewardOwners: ["Monica"],
      rewardPreparation: "Keep the research reward and League Authorization ready. After the result screen, open the book and card, save the booster, and hand over the authorization.",
      fallback: "Ask only one two-choice question or announce that Oak’s scan confirms qualification.",
      transitionLine: "The legend points home. Victory Road will reveal whether the signal has truly chosen Luca.",
      transitionDestination: "Victory Road",
      handoffStory: "The research partners are ready to analyze Luca’s evidence.",
      handoffLabel: "Adult: Hold to open Professor Oak and Professor Monica’s return cue",
      completionLabel: "Phone Captain: Hold Mission Complete"
    },
    "victory-road": {
      id: "victory-road",
      portalGuide: "league-recruiter",
      performerName: "Auntie Ariel",
      characterName: "Victory Road and Mega Rayquaza Referee",
      phoneCaptain: "Patrick",
      entranceCue: "This single private cue covers Victory Road, the Rayquaza reveal and physical encounter, and the Champion summon. Ariel remains ready while the phone briefly returns to Luca between achievements.",
      spokenLines: [
        "Luca, the Ranger legend ends here—but the path is watching how you travel it.",
        "Clear the Tall Grass, cross the forest line, hit the target, and recover the Energy Tokens.",
        "Clear each station with courage and the help your team earned. The sky will answer."
      ],
      challengeSteps: [
        "Guide one supported pass through the Tall Grass markers.",
        "Cross the ground-level balance line.",
        "Use soft balls at the prepared target.",
        "Reveal or point toward the three Energy Tokens whenever needed.",
        "Let the phone return for Victory Road cleared, then continue without another full private cue.",
        "At Rayquaza, move closer after a miss and invoke a Legendary Assist whenever helpful.",
        "After Legendary success, summon Champion Patrick while Ariel keeps the phone."
      ],
      runtimeSteps: [
        "Guide one easy pass through the markers, ground line, target, and Energy Tokens.",
        "Return the phone for Victory Road cleared, then use one soft Rayquaza throw or Legendary Assist without a second full cue.",
        "After the Legendary success screen, summon Champion Patrick."
      ],
      whenFinished: "After Victory Road, use the Phone Captain hold so Luca sees the achievement. Stay ready for Rayquaza and the Champion summon.",
      runtimeBackup: "Shorten the route, reveal every token, then move close to Rayquaza or point to three Sky symbols.",
      successCondition: "One supported pass through each station plus a Rayquaza hit, ring toss, symbol match, or Legendary Assist.",
      rewardPackages: ["League qualification handoff"],
      rewardOwners: ["Ariel"],
      rewardPreparation: "Keep Patrick and the Champion Chest out of sight until both Victory Road and Rayquaza are complete.",
      fallback: "Shorten the course, widen targets, reveal every token, then move closer to Rayquaza or use a ring or three Sky symbols.",
      transitionLine: "Mega Rayquaza recognizes Luca. The Creekside Champion may now enter.",
      transitionDestination: "Champion Arena",
      handoffStory: "Auntie Ariel will referee Victory Road, stay ready through the Luca-facing achievement, then lead Mega Rayquaza and summon the Champion from this one cue.",
      handoffLabel: "Adult: Hold to open Auntie Ariel’s Victory Road and Rayquaza cue",
      completionLabel: "Phone Captain: Hold Mission Complete"
    },
    champion: {
      id: "champion",
      portalGuide: "champion",
      performerName: "Patrick",
      characterName: "Creekside Region Champion",
      phoneCaptain: "Auntie Ariel",
      entranceCue: "Stay hidden until Ariel completes the one-cue Victory Road and Rayquaza sequence. Ariel remains Phone Captain and summons you with the Champion Chest still hidden.",
      spokenLines: [
        "Trainer Luca, I watched the mystery choose you one clue at a time.",
        "You answered it with kindness, courage, and your team. Now show me the knowledge, skill, and heart of a Champion.",
        "I understand why Oak asked for you. Luca, you are the new Champion of the Creekside Region."
      ],
      challengeSteps: [
        "Knowledge: offer friendly type choices; every thoughtful answer counts.",
        "Skill: use one comfortable soft target toss or a high-five fallback.",
        "Heart: ask Luca to name a person or Pokémon who helped today."
      ],
      runtimeSteps: [
        "Ask one easy knowledge choice.",
        "Use one comfortable target toss or a high-five.",
        "Ask who helped Luca today; every sincere answer counts."
      ],
      whenFinished: "Concede dramatically and name Luca the new Champion. Ariel opens the result and gathers everyone who is here for the Champion photo.",
      runtimeBackup: "Give two choices, use a high-five, and accept any person or Pokémon.",
      successCondition: "Every sincere answer counts. Move the target closer after a miss. Patrick always concedes.",
      rewardPackages: ["POKÉMON LEAGUE CHAMPION CHEST"],
      rewardOwners: ["Patrick"],
      rewardPreparation: "Keep the chest hidden until Luca sees the Champion result. Open the deck and model afterward; every booster stays sealed for the family celebration.",
      fallback: "Give two knowledge choices, use the closest marker, and replace the skill toss with a high-five.",
      transitionLine: "The Hall of Heroes is ready. Treat the ending as final and do not explain the coming pause.",
      transitionDestination: "Hall of Heroes",
      handoffStory: "Victory Road is complete. The reigning Champion is ready.",
      handoffLabel: "Adult: Hold to open Patrick’s Champion cue",
      completionLabel: "Phone Captain: Hold Mission Complete"
    },
    mew: {
      id: "mew",
      portalGuide: "champion",
      performerName: "Patrick / Lead Adult",
      characterName: "Mythical Trail Guide",
      phoneCaptain: "Polly or Auntie Ariel when Patrick guides; Patrick when another adult guides",
      entranceCue: "Only open this cue after an adult deliberately triggers the signal. If Patrick guides the physical trail, Polly or Ariel operates the phone. If another adult guides, Patrick may operate it. Keep Mew separate from the Champion Chest.",
      spokenLines: [
        "Luca… this signal is not from the fragment. Oak says it has been following you.",
        "Follow the pink energy traces quietly. Do not rush the last clue.",
        "This Pokémon is not waiting to be won. It is choosing whether to be seen."
      ],
      challengeSteps: [
        "Guide Luca to the first visible pink-energy marker.",
        "Use warm/cold hints between the second and third markers.",
        "Lead the final clue to the separate Mew reveal box."
      ],
      runtimeSteps: [
        "Choose roles: Patrick guides with Polly or Ariel on phone, or another adult guides with Patrick on phone.",
        "Guide Luca through the three visible pink-energy markers.",
        "Give direct warm/cold hints and lead the final clue to Mew."
      ],
      whenFinished: "Keep Mew hidden until the Phone Captain opens Luca’s result, then reveal it.",
      runtimeBackup: "Put every marker in plain sight or give three direct spoken clues.",
      successCondition: "Luca follows the safe prepared route and discovers Mew. Visible markers and direct hints always count.",
      rewardPackages: ["MYTHICAL ENCOUNTER", "FINAL FAMILY CELEBRATION"],
      rewardOwners: ["Patrick"],
      rewardPreparation: "Keep Mew separate from the Champion Chest. After the result screen, reveal the figure, then bring out the Booster Satchel and family celebration.",
      fallback: "Move every marker into open view or let the lead adult give three direct spoken clues to the adult-held Mew reward.",
      transitionLine: "Mew has been discovered. Gather the family for popsicles, photos, and the Booster Satchel.",
      transitionDestination: "Final Family Celebration",
      handoffStory: "A Mythical signal is waiting along the prepared backyard trail.",
      handoffLabel: "Adult: Hold to open the Lead Adult’s Mew Trail cue",
      completionLabel: "Phone Captain: Hold Mission Complete"
    }
  };
}());
