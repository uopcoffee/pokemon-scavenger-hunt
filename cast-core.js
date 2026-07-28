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
      successCondition: "Every sincere oath response counts. Complete each equipment step once, with as much adult help as needed.",
      rewardPackages: ["TRAINER KIT"],
      rewardOwners: ["Ariel"],
      rewardPreparation: "Keep the Trainer Kit nearby. After Luca sees the victory screen, open the equipment and team card; place the sealed booster in the adult Booster Satchel.",
      fallback: "Hold the sleeve or top loader while Luca slides the card into place. If time is short, protect one card and move on.",
      transitionLine: "Official Trainer status confirmed. A tiny Fairy signal is waiting in the garden.",
      transitionDestination: "Fairy Garden",
      handoffStory: "The League Recruiter is ready to make this mission official.",
      handoffLabel: "Adult: Hold to hand off to Auntie Ariel",
      completionLabel: "Mission complete — hold to return the phone to Luca"
    },
    fairy: {
      id: "fairy",
      portalGuide: "league-recruiter",
      performerName: "Nina with Auntie Ariel",
      characterName: "Fairy Gym Leader and Adult Helper",
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
      successCondition: "All three orbs reach the basket. Pointing, visible placement, and immediate hints are always allowed.",
      rewardPackages: ["FAIRY GYM REWARD"],
      rewardOwners: ["Ariel"],
      rewardPreparation: "Have the Fairy reward ready. After Luca sees the success screen, open the reader and team cards; place the booster in the adult Booster Satchel.",
      fallback: "Place the final orb in full view. If Nina loses interest, she hands Luca the basket and cheers while he finishes. Move indoors if needed.",
      transitionLine: "The Fairy signal is restored. Professor Oak has detected an urgent water-energy reading.",
      transitionDestination: "Professor Oak’s Lab",
      handoffStory: "The youngest Gym Leader is ready, with Auntie Ariel beside her.",
      handoffLabel: "Adult: Hold to hand off to Nina and Auntie Ariel",
      completionLabel: "Garden restored — hold to return the phone to Luca"
    },
    "oak-water": {
      id: "oak-water",
      portalGuide: "oak-lab",
      performerName: "Professor Oak and Professor Monica",
      characterName: "Water Research Professors",
      entranceCue: "Bruce watches the water and delivers Oak’s opening. Monica holds the diagram, manages the research cues, and keeps the mission moving.",
      spokenLines: [
        "Professor Oak: Shhh… the preserve is unusually active. You must be Trainer Luca.",
        "Professor Monica: The readings are rising. Use this symbol diagram to find all four samples.",
        "Professor Oak: Recover the capsules safely and bring the Sky Fragment to our research tray."
      ],
      challengeSteps: [
        "A supervising adult watches the water continuously and keeps the phone; that adult does not operate it during swimming.",
        "Professor Monica gives symbol clues and manages the skimmer, towel, and dry tray.",
        "Luca safely retrieves four floating or shallow capsules.",
        "Professor Oak asks Luca to identify the unstable symbol and place the Sky Fragment in the tray."
      ],
      successCondition: "All four objects are safely recovered and the Sky Fragment reaches the tray. Swimming, skimmer, dry tub, hints, and decoys all count.",
      rewardPackages: ["WATER RESEARCH CAPSULES 1–4", "PROFESSOR OAK’S FIRST PARTNER FILE"],
      rewardOwners: ["Monica", "Bruce"],
      rewardPreparation: "Stage both packages away from the water. After the result screen, open the assigned items and place every sealed booster in the adult Booster Satchel. Hand over the physical fragment without showing its private mark.",
      fallback: "Retrieve every object with the skimmer from the deck, or use four marked tennis balls in a dry tub. Never rush water safety.",
      transitionLine: "The samples are secure. The energy pattern shows that Pokémon at the Center need help.",
      transitionDestination: "Pokémon Center",
      handoffStory: "Two Water Research Professors are waiting at the preserve.",
      handoffLabel: "Adult: Hold to hand off to Professor Oak and Professor Monica",
      completionLabel: "Research recovered — hold to return the phone to Luca"
    },
    "nurse-joy": {
      id: "nurse-joy",
      portalGuide: "nurse-joy",
      performerName: "Polly",
      characterName: "Nurse Joy",
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
      successCondition: "All patients receive care with unlimited hints. No wrong choice causes failure, and a demonstrated match still counts.",
      rewardPackages: ["POKÉMON CENTER FIELD KIT"],
      rewardOwners: ["Polly"],
      rewardPreparation: "Keep the field kit ready. After the result screen, open the reader, portfolio, and team card; place the booster in the adult Booster Satchel and hand over the physical fragment privately.",
      fallback: "Remove one wrong option, demonstrate the first match, say two choices aloud, or move the entire activity indoors.",
      transitionLine: "Your team is healthy again—but Team Rocket has been spotted nearby. Stay alert.",
      transitionDestination: "Team Rocket Base",
      handoffStory: "Nurse Joy has prepared an emergency treatment station.",
      handoffLabel: "Adult: Hold to hand off to Nurse Joy",
      completionLabel: "Patients restored — hold to return the phone to Luca"
    },
    rocket: {
      id: "rocket",
      portalGuide: "team-rocket",
      performerName: "Mike",
      characterName: "Team Rocket Boss",
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
      successCondition: "Mike always loses. A basket, target hit, layup, soft pass, or prepared fallback defeats the defense.",
      rewardPackages: ["RECOVERED TEAM ROCKET LOOT"],
      rewardOwners: ["Mike"],
      rewardPreparation: "Keep the loot and Ranger Dispatch ready. After the result screen, open the team cards, place the booster in the adult Booster Satchel, and hand over the Dispatch.",
      fallback: "Lower the hoop, use the closest marker, count target hits, accept three soft passes, or use one close shot plus two easy Pokémon questions.",
      transitionLine: "Those Rangers left something behind. You will never figure out what the fragments are for!",
      transitionDestination: "Secret Ranger Vault",
      handoffStory: "Team Rocket is blocking the route and holding Oak’s Ranger Dispatch.",
      handoffLabel: "Adult: Hold to hand off to Mike",
      completionLabel: "Team Rocket defeated — hold to return the phone to Luca"
    },
    vault: {
      id: "vault",
      portalGuide: null,
      performerName: "Designated Adult Escort",
      characterName: "Ranger Vault Escort",
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
      successCondition: "Adult-accompanied entry and safe recovery of the cache and sealed file. The escort may operate the keypad or bring the cache outside.",
      rewardPackages: ["SECRET RANGER CACHE"],
      rewardOwners: ["Designated Adult Escort"],
      rewardPreparation: "Keep the cache staged in the approved area. After the result screen, open the approved items, place sealed boosters in the adult Booster Satchel, and carry the sealed Research File.",
      fallback: "The escort enters the private information or brings the sealed cache outside and delivers the Ranger transmission verbally.",
      transitionLine: "The Rangers’ file is secure. Professor Oak needs it and the Sky Fragment immediately.",
      transitionDestination: "Professor Oak’s Lab",
      handoffStory: "The protected Ranger mission requires one designated adult beside Luca.",
      handoffLabel: "Adult: Hold to open Lead Adult instructions",
      completionLabel: "Cache recovered — hold to return the phone to Luca"
    },
    "oak-return": {
      id: "oak-return",
      portalGuide: "oak-lab",
      performerName: "Professor Oak and Professor Monica",
      characterName: "Water Research Professors",
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
      successCondition: "Any remembered detail, prompted choice, or sincere answer qualifies Luca for the League.",
      rewardPackages: ["MEGA EVOLUTION RESEARCH FILE"],
      rewardOwners: ["Monica"],
      rewardPreparation: "Keep the research reward and League Authorization ready. After the result screen, open the book and card, save the booster, and hand over the authorization.",
      fallback: "Ask only one two-choice question or announce that Oak’s scan confirms qualification.",
      transitionLine: "Research complete. Victory Road is authorized, and Mega Rayquaza is gathering above Home Base.",
      transitionDestination: "Victory Road",
      handoffStory: "The research partners are ready to analyze Luca’s evidence.",
      handoffLabel: "Adult: Hold to hand off to Professor Oak and Professor Monica",
      completionLabel: "League qualification confirmed — hold to return the phone to Luca"
    },
    "victory-road": {
      id: "victory-road",
      portalGuide: "league-recruiter",
      performerName: "Auntie Ariel",
      characterName: "Victory Road Referee",
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
      successCondition: "One supported pass through each station. Accuracy never hard-fails, and harmless comedy replaces penalties.",
      rewardPackages: ["League qualification handoff"],
      rewardOwners: ["Ariel"],
      rewardPreparation: "Confirm the Rayquaza target is ready before returning the phone. No physical package is opened at this stage.",
      fallback: "Shorten the route, widen the target, reveal every token, or use an indoor hallway path.",
      transitionLine: "Victory Road is cleared. One Legendary encounter remains before the Champion can appear.",
      transitionDestination: "Sky Pillar",
      handoffStory: "The Victory Road Referee is ready to judge the final course.",
      handoffLabel: "Adult: Hold to hand off to Auntie Ariel",
      completionLabel: "Victory Road cleared — hold to return the phone to Luca"
    },
    rayquaza: {
      id: "rayquaza",
      portalGuide: "league-recruiter",
      performerName: "Auntie Ariel",
      characterName: "Legendary Encounter Referee",
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
      successCondition: "One hit, ring toss, symbol match, or Legendary Assist completes the encounter.",
      rewardPackages: ["League qualification handoff"],
      rewardOwners: ["Ariel"],
      rewardPreparation: "Keep Patrick and the Champion Chest out of sight until the result screen and transition call for the Champion.",
      fallback: "Move closer, switch to ring toss, or let Luca assemble or point to three Sky symbols.",
      transitionLine: "Mega Rayquaza is calm. The Creekside Champion may now enter.",
      transitionDestination: "Champion Arena",
      handoffStory: "A Legendary signal has appeared above Sky Pillar.",
      handoffLabel: "Adult: Hold to hand off to Auntie Ariel",
      completionLabel: "Legendary encounter complete — hold to return the phone to Luca"
    },
    champion: {
      id: "champion",
      portalGuide: "champion",
      performerName: "Patrick",
      characterName: "Creekside Region Champion",
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
      successCondition: "Every sincere answer counts. Move the target closer after a miss. Patrick always concedes.",
      rewardPackages: ["POKÉMON LEAGUE CHAMPION CHEST"],
      rewardOwners: ["Patrick"],
      rewardPreparation: "Keep the chest hidden until Luca sees the Champion result. Open the deck and model afterward; every booster stays sealed for the family celebration.",
      fallback: "Give two knowledge choices, use the closest marker, and replace the skill toss with a high-five.",
      transitionLine: "The Hall of Heroes is ready. Treat the ending as final and do not explain the coming pause.",
      transitionDestination: "Hall of Heroes",
      handoffStory: "Victory Road is complete. The reigning Champion is ready.",
      handoffLabel: "Adult: Hold to hand off to Patrick",
      completionLabel: "Champion match complete — hold to return the phone to Luca"
    },
    mew: {
      id: "mew",
      portalGuide: "champion",
      performerName: "Patrick or Lead Adult",
      characterName: "Mythical Trail Guide",
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
      successCondition: "Luca follows the safe prepared route and discovers Mew. Visible markers and direct hints always count.",
      rewardPackages: ["MYTHICAL ENCOUNTER", "FINAL FAMILY CELEBRATION"],
      rewardOwners: ["Patrick"],
      rewardPreparation: "Keep Mew separate from the Champion Chest. After the result screen, reveal the figure, then bring out the Booster Satchel and family celebration.",
      fallback: "Move every marker into open view or let the lead adult give three direct spoken clues to the adult-held Mew reward.",
      transitionLine: "Mew has been discovered. Gather the family for popsicles, photos, and the Booster Satchel.",
      transitionDestination: "Final Family Celebration",
      handoffStory: "A Mythical signal is waiting along the prepared backyard trail.",
      handoffLabel: "Adult: Hold to open Lead Adult instructions",
      completionLabel: "Mew discovered — hold to return the phone to Luca"
    }
  };
}());
