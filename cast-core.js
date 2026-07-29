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
      entranceCue: "Stand ready with the Trainer Kit and greet Luca like the League has been waiting specifically for him.",
      spokenLines: [
        "Trainer Luca! A new region has appeared, and the Pokémon League chose you to investigate.",
        "Promise to protect Pokémon, help your friends, play fairly, and never give up.",
        "Now show me how an official Trainer protects one special card!"
      ],
      challengeSteps: [
        "Lead Luca through the short Trainer Oath.",
        "Help him sleeve one card and place it in a top loader.",
        "Help him secure the protected card in the deck box."
      ],
      runtimeSteps: [
        "Lead the short Trainer Oath.",
        "Help Luca sleeve one card and place it in the top loader and deck box."
      ],
      whenFinished: "Celebrate his new Trainer status. Tell Patrick the oath and card test are complete.",
      runtimeBackup: "Hold the sleeve or top loader for Luca. One protected card is enough.",
      successCondition: "Every sincere oath response counts. Complete each equipment step once, with as much adult help as needed.",
      rewardPackages: ["TRAINER KIT"],
      rewardOwners: ["Ariel"],
      rewardPreparation: "Keep the Trainer Kit nearby. After Luca sees the victory screen, open the equipment and team card; place the sealed booster in the adult Booster Satchel.",
      fallback: "Hold the sleeve or top loader while Luca slides the card into place. If time is short, protect one card and move on.",
      transitionLine: "Official Trainer status confirmed. A tiny Fairy signal is waiting in the garden.",
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
      supportingRole: "Nina’s role is optional. She may hold the basket, point, cheer, wander away, or skip the scene.",
      entranceCue: "Nina holds the basket. Ariel quietly gives the longer prompt and lets Nina point, cheer, or use one-word directions.",
      spokenLines: [
        "Nina: Luca, look! Tree! There!",
        "Ariel: Three Fairy lights fell from the trees. Help Nina return them to her basket.",
        "Nina: You did it!"
      ],
      challengeSteps: [
        "Guide Luca toward three large orbs placed at toddler-visible height.",
        "Let Nina point to an orb whenever the search slows.",
        "Place all three orbs in Nina’s basket."
      ],
      runtimeSteps: [
        "Let Luca find three visible Fairy Orbs and place them in the basket.",
        "Nina may point or cheer, but Luca never depends on her participation."
      ],
      whenFinished: "Celebrate the glowing garden. Tell Patrick the orbs are back in the basket.",
      runtimeBackup: "Put one orb in plain sight or let Luca carry the basket. Run it without Nina if needed.",
      successCondition: "All three orbs reach the basket. Pointing, visible placement, and immediate hints are always allowed.",
      rewardPackages: ["FAIRY GYM REWARD"],
      rewardOwners: ["Ariel"],
      rewardPreparation: "Have the Fairy reward ready. After Luca sees the success screen, open the reader and team cards; place the booster in the adult Booster Satchel.",
      fallback: "Place the final orb in full view. If Nina loses interest, she hands Luca the basket and cheers while he finishes. Move indoors if needed.",
      transitionLine: "The Fairy signal is restored. Professor Oak has detected an urgent water-energy reading.",
      transitionDestination: "Professor Oak’s Lab",
      handoffStory: "The youngest Gym Leader is ready, with Auntie Ariel beside her.",
      handoffLabel: "Adult: Hold to open Auntie Ariel’s Fairy Garden cue",
      completionLabel: "Phone Captain: Hold Mission Complete"
    },
    "oak-water": {
      id: "oak-water",
      portalGuide: "oak-lab",
      performerName: "Professor Bruce and Professor Monica",
      characterName: "Partner Professors",
      phoneCaptain: "Polly or Auntie Ariel",
      waterSafetyAdult: "Dedicated Water Safety Adult — watches Luca continuously and never operates the phone.",
      entranceCue: "Bruce watches the water and delivers Oak’s opening. Monica holds the diagram, manages the research cues, and keeps the mission moving.",
      spokenLines: [
        "Professor Oak: Shhh… the preserve is unusually active. You must be Trainer Luca.",
        "Professor Monica: The readings are rising. Use this symbol diagram to find all four samples.",
        "Professor Oak: Recover the capsules safely and bring the Sky Fragment to our research tray."
      ],
      challengeSteps: [
        "The dedicated Water Safety Adult watches Luca continuously and never operates the phone.",
        "The Phone Captain keeps the phone and operates the protected controls.",
        "Professor Monica gives symbol clues and manages the skimmer, towel, and dry tray.",
        "Luca safely retrieves four floating or shallow capsules.",
        "Professor Oak asks Luca to identify the unstable symbol and place the Sky Fragment in the tray."
      ],
      runtimeSteps: [
        "Professor Monica gives clues while Luca retrieves the four capsules.",
        "Use the skimmer or dry-tub version at any time.",
        "Professor Bruce asks Luca to place the Sky Fragment in the tray."
      ],
      whenFinished: "Celebrate the recovered research. Tell the Phone Captain all capsules and the Sky Fragment are secure.",
      runtimeBackup: "Use the skimmer and one easy capsule at a time. Safety always comes first.",
      successCondition: "All four objects are safely recovered and the Sky Fragment reaches the tray. Swimming, skimmer, dry tub, hints, and decoys all count.",
      rewardPackages: ["WATER RESEARCH CAPSULES 1–4", "PROFESSOR OAK’S FIRST PARTNER FILE"],
      rewardOwners: ["Monica", "Bruce"],
      rewardPreparation: "Stage both packages away from the water. After the result screen, open the assigned items and place every sealed booster in the adult Booster Satchel. Hand over the physical fragment without showing its private mark.",
      fallback: "Retrieve every object with the skimmer from the deck, or use four marked tennis balls in a dry tub. Never rush water safety.",
      transitionLine: "The samples are secure. The energy pattern shows that Pokémon at the Center need help.",
      transitionDestination: "Pokémon Center",
      handoffStory: "Two Water Research Professors are waiting at the preserve.",
      handoffLabel: "Adult: Hold to open Professor Bruce and Professor Monica’s cue",
      completionLabel: "Phone Captain: Hold Mission Complete"
    },
    "nurse-joy": {
      id: "nurse-joy",
      portalGuide: "nurse-joy",
      performerName: "Polly",
      characterName: "Nurse Joy",
      phoneCaptain: "Patrick",
      entranceCue: "Wait beside the three patient cards and treatments, then greet Luca with warmth and urgency.",
      spokenLines: [
        "Trainer Luca, I’m glad you’re here. Three Pokémon need help.",
        "Match each patient with the right care, then bring the medicine Poké Ball back to me.",
        "You may ask for a Nurse Joy hint at any time."
      ],
      challengeSteps: [
        "Show the three patient cards and matching treatments.",
        "Let Luca choose a treatment for each patient, offering immediate hints.",
        "Guide the short medicine Poké Ball delivery path."
      ],
      runtimeSteps: [
        "Let Luca match each patient with a treatment and give hints immediately.",
        "Guide the short medicine Poké Ball delivery."
      ],
      whenFinished: "Celebrate every patient feeling better. Tell Patrick the care mission is complete.",
      runtimeBackup: "Use one patient and two choices, then make the medicine delivery one step.",
      successCondition: "All patients receive care with unlimited hints. No wrong choice causes failure, and a demonstrated match still counts.",
      rewardPackages: ["POKÉMON CENTER FIELD KIT"],
      rewardOwners: ["Polly"],
      rewardPreparation: "Keep the field kit ready. After the result screen, open the reader, portfolio, and team card; place the booster in the adult Booster Satchel and hand over the physical fragment privately.",
      fallback: "Remove one wrong option, demonstrate the first match, say two choices aloud, or move the entire activity indoors.",
      transitionLine: "Your team is healthy again—but Team Rocket has been spotted nearby. Stay alert.",
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
      entranceCue: "Stand near the hoop with the Ranger Dispatch out of reach. Begin imposing; become funnier as Luca breaks the defense.",
      spokenLines: [
        "So you’re Professor Oak’s new Trainer. This Ranger Dispatch belongs to Team Rocket now.",
        "Break my basketball defense and attempt the Final Poké Shot.",
        "Impossible! My defense was scientifically unbeatable!"
      ],
      challengeSteps: [
        "Start with one very close shot.",
        "Run one comfortable scoring round; count baskets, rim, backboard, or the prepared target.",
        "Let Luca choose the Final Poké Shot location.",
        "Move closer after misses and narrate the defense failing."
      ],
      runtimeSteps: [
        "Start with one very close shot and count baskets, rim, backboard, or the target.",
        "Let Luca choose a Final Poké Shot, then move him closer after any miss."
      ],
      whenFinished: "Lose dramatically and praise Luca. Tell the Phone Captain Team Rocket is defeated.",
      runtimeBackup: "Use one close shot, a target hit, or three soft passes. Luca always wins.",
      successCondition: "Mike always loses. A basket, target hit, layup, soft pass, or prepared fallback defeats the defense.",
      rewardPackages: ["RECOVERED TEAM ROCKET LOOT"],
      rewardOwners: ["Mike"],
      rewardPreparation: "Keep the loot and Ranger Dispatch ready. After the result screen, open the team cards, place the booster in the adult Booster Satchel, and hand over the Dispatch.",
      fallback: "Lower the hoop, use the closest marker, count target hits, accept three soft passes, or use one close shot plus two easy Pokémon questions.",
      transitionLine: "Those Rangers left something behind. You will never figure out what the fragments are for!",
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
      entranceCue: "Keep the phone and physical Ranger Code Card with the adults. Stay beside Luca for the entire approved entry-area mission.",
      spokenLines: [
        "Trainer Luca, read the four private marks from your physical Ranger Code Card.",
        "I will stay beside you while we use the real keypad.",
        "Now follow the three Ranger symbols to the protected cache."
      ],
      challengeSteps: [
        "The escort keeps Luca in the approved front-entry area.",
        "Use only the private physical card; the app never receives or displays the entry information.",
        "Follow the three prepared Ranger symbols.",
        "Recover the cache and sealed Research File without opening the file."
      ],
      runtimeSteps: [
        "Stay beside Luca in the approved entry area and use only the private physical card.",
        "Follow the three Ranger symbols and recover the cache with the sealed file."
      ],
      whenFinished: "Keep the Research File sealed. Hold Mission Complete before revealing the cache result to Luca.",
      runtimeBackup: "Operate the keypad for Luca or bring the sealed cache outside.",
      successCondition: "Adult-accompanied entry and safe recovery of the cache and sealed file. The escort may operate the keypad or bring the cache outside.",
      rewardPackages: ["SECRET RANGER CACHE"],
      rewardOwners: ["Designated Adult Escort"],
      rewardPreparation: "Keep the cache staged in the approved area. After the result screen, open the approved items, place sealed boosters in the adult Booster Satchel, and carry the sealed Research File.",
      fallback: "The escort enters the private information or brings the sealed cache outside and delivers the Ranger transmission verbally.",
      transitionLine: "The Rangers’ file is secure. Professor Oak needs it and the Sky Fragment immediately.",
      transitionDestination: "Professor Oak’s Lab",
      handoffStory: "The protected Ranger mission requires one designated adult beside Luca.",
      handoffLabel: "Adult: Hold to open the Adult Escort’s cue",
      completionLabel: "Phone Captain: Hold Mission Complete"
    },
    "oak-return": {
      id: "oak-return",
      portalGuide: "oak-lab",
      performerName: "Professor Bruce and Professor Monica",
      characterName: "Partner Professors",
      phoneCaptain: "Patrick",
      entranceCue: "Bruce accepts the Sky Fragment. Monica accepts and opens the sealed Research File. Keep the callback friendly and brief.",
      spokenLines: [
        "Professor Oak: You brought back the Sky Fragment and the Rangers’ file—excellent.",
        "Professor Monica: The research confirms a Mega Rayquaza energy pattern.",
        "Professor Oak: Tell us one thing you learned today. Any answer counts."
      ],
      challengeSteps: [
        "Accept the Sky Fragment and sealed Research File.",
        "Professor Monica opens the file and announces the Rayquaza finding.",
        "Professor Oak asks one friendly callback question.",
        "Award League Authorization."
      ],
      runtimeSteps: [
        "Accept the Sky Fragment and sealed Research File.",
        "Monica announces the Rayquaza finding; Bruce asks one friendly question.",
        "Any answer counts, then award League Authorization."
      ],
      whenFinished: "Celebrate Luca’s League qualification. Tell Patrick the authorization is ready.",
      runtimeBackup: "Ask one two-choice question or simply announce that the scan confirms qualification.",
      successCondition: "Any remembered detail, prompted choice, or sincere answer qualifies Luca for the League.",
      rewardPackages: ["MEGA EVOLUTION RESEARCH FILE"],
      rewardOwners: ["Monica"],
      rewardPreparation: "Keep the research reward and League Authorization ready. After the result screen, open the book and card, save the booster, and hand over the authorization.",
      fallback: "Ask only one two-choice question or announce that Oak’s scan confirms qualification.",
      transitionLine: "Research complete. Victory Road is authorized, and Mega Rayquaza is gathering above Home Base.",
      transitionDestination: "Victory Road",
      handoffStory: "The research partners are ready to analyze Luca’s evidence.",
      handoffLabel: "Adult: Hold to open Professor Bruce and Professor Monica’s return cue",
      completionLabel: "Phone Captain: Hold Mission Complete"
    },
    "victory-road": {
      id: "victory-road",
      portalGuide: "league-recruiter",
      performerName: "Auntie Ariel",
      characterName: "Victory Road Referee",
      phoneCaptain: "Patrick",
      entranceCue: "Stand at the course entrance with whistle and clipboard. Be loud, funny, and completely encouraging.",
      spokenLines: [
        "Welcome to Victory Road!",
        "Clear the Tall Grass, cross the forest line, hit the target, and recover the Energy Tokens.",
        "The League recognizes every assisted success as completely legitimate Champion behavior!"
      ],
      challengeSteps: [
        "Guide one supported pass through the Tall Grass markers.",
        "Cross the ground-level balance line.",
        "Use soft balls at the prepared target.",
        "Reveal or point toward the three Energy Tokens whenever needed."
      ],
      runtimeSteps: [
        "Guide one easy pass through the markers, ground line, target, and Energy Tokens.",
        "Point, widen targets, and help whenever Luca needs it."
      ],
      whenFinished: "Declare Victory Road cleared. Tell Patrick to open the result before the Rayquaza stage.",
      runtimeBackup: "Shorten the route to one pass per station and reveal every token.",
      successCondition: "One supported pass through each station. Accuracy never hard-fails, and harmless comedy replaces penalties.",
      rewardPackages: ["League qualification handoff"],
      rewardOwners: ["Ariel"],
      rewardPreparation: "Confirm the Rayquaza target is ready before returning the phone. No physical package is opened at this stage.",
      fallback: "Shorten the route, widen the target, reveal every token, or use an indoor hallway path.",
      transitionLine: "Victory Road is cleared. One Legendary encounter remains before the Champion can appear.",
      transitionDestination: "Sky Pillar",
      handoffStory: "The Victory Road Referee is ready to judge the final course.",
      handoffLabel: "Adult: Hold to open Auntie Ariel’s Victory Road cue",
      completionLabel: "Phone Captain: Hold Mission Complete"
    },
    rayquaza: {
      id: "rayquaza",
      portalGuide: "league-recruiter",
      performerName: "Auntie Ariel",
      characterName: "Legendary Encounter Referee",
      phoneCaptain: "Patrick",
      entranceCue: "Reset Luca at the closest safe throwing point and make the Rayquaza target feel enormous and dramatic.",
      spokenLines: [
        "Mega Rayquaza is above Sky Pillar!",
        "One clear hit will calm the Legendary energy.",
        "If the signal fights back, the League authorizes a Legendary Assist!"
      ],
      challengeSteps: [
        "Use one soft Poké Ball at the secured Rayquaza target.",
        "Move the throwing point closer after a miss.",
        "Invoke a Legendary Assist after two minutes or whenever Luca needs it."
      ],
      runtimeSteps: [
        "Give Luca one soft throw at the secured Rayquaza target.",
        "Move closer after a miss and use a Legendary Assist whenever helpful."
      ],
      whenFinished: "Declare Rayquaza calm. Tell Patrick the Champion entrance is ready.",
      runtimeBackup: "Move close, switch to ring toss, or point to three Sky symbols.",
      successCondition: "One hit, ring toss, symbol match, or Legendary Assist completes the encounter.",
      rewardPackages: ["League qualification handoff"],
      rewardOwners: ["Ariel"],
      rewardPreparation: "Keep Patrick and the Champion Chest out of sight until the result screen and transition call for the Champion.",
      fallback: "Move closer, switch to ring toss, or let Luca assemble or point to three Sky symbols.",
      transitionLine: "Mega Rayquaza is calm. The Creekside Champion may now enter.",
      transitionDestination: "Champion Arena",
      handoffStory: "A Legendary signal has appeared above Sky Pillar.",
      handoffLabel: "Adult: Hold to open Auntie Ariel’s Rayquaza cue",
      completionLabel: "Phone Captain: Hold Mission Complete"
    },
    champion: {
      id: "champion",
      portalGuide: "champion",
      performerName: "Patrick",
      characterName: "Creekside Region Champion",
      phoneCaptain: "Auntie Ariel",
      entranceCue: "Stay hidden until Ariel clears Rayquaza. Enter with the Champion Chest still out of Luca’s view.",
      spokenLines: [
        "Trainer Luca, I watched your whole journey.",
        "A Champion needs knowledge, skill, and heart. Show me all three.",
        "The match is over. Luca, you are the new Champion of the Creekside Region."
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
      whenFinished: "Concede dramatically and name Luca the new Champion. Ariel opens the result.",
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
      phoneCaptain: "Polly or Auntie Ariel",
      entranceCue: "Only open this cue after the fake credits and Oak’s signal. Keep the separate Mew reward hidden until the final marker.",
      spokenLines: [
        "Trainer Luca, the scanner found one more signal.",
        "Follow the pink energy traces through the prepared Mythical Trail.",
        "This may be a Pokémon that should be impossible to find."
      ],
      challengeSteps: [
        "Guide Luca to the first visible pink-energy marker.",
        "Use warm/cold hints between the second and third markers.",
        "Lead the final clue to the separate Mew reveal box."
      ],
      runtimeSteps: [
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
