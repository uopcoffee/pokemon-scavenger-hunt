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
      entranceCue: "Patrick privately opens this cue before Luca enters. Stand ready with the Trainer Kit and a clearly labeled Save for Celebration container. There is no code card in this chapter — Luca receives nothing he cannot explain.",
      spokenLines: [
        "Luca—we’ve been waiting for you. Professor Oak asked for you by name.",
        "Your Trainer License is official. Now let’s prepare your first field card.",
        "Now show me how an official Trainer protects one special card!"
      ],
      challengeSteps: [
        "Help him sleeve one card and place it in a top loader.",
        "Help him seal the protected card in the One-Touch case.",
        "Put the first sealed booster directly into the Save for Celebration container."
      ],
      runtimeSteps: [
        "Help Luca sleeve one card and seal it in the top loader and One-Touch case."
      ],
      whenFinished: "Say, “It worked. Oak was right about you.” Then tell Patrick the result is ready. Present the Trainer Kit only after Luca sees it.",
      runtimeBackup: "Hold the sleeve or top loader for Luca. One protected card is enough.",
      successCondition: "Complete each equipment step once, with as much adult help as needed. The oath was completed during license registration.",
      rewardPackages: ["TRAINER KIT"],
      rewardOwners: ["Ariel"],
      rewardPreparation: "Keep the Trainer Kit and the Save for Celebration container together. Hand over the kit immediately after success and visibly store the first booster.",
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
        "Ariel: Step back. They made an arrow! …Nina, what is that under the last light?"
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
      rewardPreparation: "Have the Fairy reward and SKY FRAGMENT 1 (Leaf) ready. After Luca sees the success screen, open the reader and team cards and place the booster in the Booster Satchel. Hand him the fragment last: say only “This is a Sky Fragment. Keep it safe.” Do NOT mention the number, the other three, or a door — that reveal belongs to Mike in Chapter 5.",
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
        "Professor Monica: Oak—the edges match. And this reading is coming from above the water, not in it."
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
        "Stow the phone safely away. Use the skimmer or one capsule at a time.",
        "Exit and dry Luca, then move to the dry research table before the phone returns."
      ],
      whenFinished: "At the dry table: “Luca, this was waiting for you.” Let him fit Fragment 2 against the piece he carries. Explain nothing. Open the result.",
      runtimeBackup: "Use the skimmer, a dry-tub version, or one capsule only. Safety comes first.",
      successCondition: "All four objects are safely recovered and the marked capsule reaches the tray. Swimming, skimmer, dry tub, hints, and decoys all count.",
      rewardPackages: ["WATER RESEARCH CAPSULES 1–4", "PROFESSOR OAK’S FIRST PARTNER FILE"],
      rewardOwners: ["Monica", "Bruce"],
      rewardPreparation: "Stage both packages away from the water. After the result screen, open the assigned items and place every sealed booster in the Booster Satchel. Hand over SKY FRAGMENT 2 (Wave) at the dry table. Keep its number turned away from anyone but Luca.",
      fallback: "Use swimming only when appropriate, retrieve with the skimmer from the deck, switch to a dry tub, or run one capsule only. Never rush water safety.",
      transitionLine: "…You actually found it. Two pieces of the same stone. And the same energy has reached the Pokémon Center.",
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
      rewardPreparation: "Keep the field kit ready and hide SKY FRAGMENT 3 (Heart) with the Eevee patient so Luca finds it while caring for her. After the result screen, open the reader, portfolio, and team card and place the booster in the Booster Satchel. Still no explanation — three pieces, no answer.",
      fallback: "Remove one wrong option, demonstrate the first match, say two choices aloud, or move the entire activity indoors.",
      transitionLine: "They trust you, Luca. But that receiver says Team Rocket followed the same trail—and they claim they know what you have been picking up.",
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
      entranceCue: "No score. Luca always wins. Stand near the adjustable hoop with the Ranger Dispatch, the stolen loot, and SKY FRAGMENT 4 (Flame) visible but out of reach. YOU CARRY THE BIGGEST REVEAL OF THE MORNING — read the reveal lines below before you start.",
      spokenLines: [
        "So you’re the famous Luca. We chose this very secure basketball hoop.",
        "Break my patented defense and attempt the Final Poké Shot!",
        "Impossible! That defense had a warranty! Take it.",
        "REVEAL, slowly: Those pieces are ONE thing — a Sky Stone the Rangers smashed apart. Every piece has a number. Together they are a combination.",
        "Which comes first? We never worked it out. Their vault is at the closest place to the sky."
      ],
      challengeSteps: [
        "Stage 1 — Close Basket: begin at the easiest marker.",
        "Stage 2 — Defense Target: use any comfortable target; rim or backboard weakens the defense.",
        "Stage 3 — Final Poké Shot: Luca chooses the spot.",
        "Move closer or lower the hoop immediately. Luca always wins.",
        "AFTER the loss: surrender Sky Fragment 4, then deliver the REVEAL while Luca fits all four edges together.",
        "Full reveal script, in this order: (1) They are not four things, they are one. (2) A Sky Stone fell over Creekside. (3) The Rangers smashed it into four so Team Rocket could never take it whole. (4) Every piece has a number, and together they are a combination. (5) Team Rocket never worked out which number comes first. (6) The Rangers hid their vault at the closest place to the sky in their whole yard.",
        "Do NOT hint at how to order the numbers. That answer belongs to Professor Oak.",
        "This is the biggest reveal of the morning. Slow down. Let him assemble the stone in his own hands while you talk."
      ],
      runtimeSteps: [
        "Close Basket, then a Defense Target. Move closer or lower the hoop until you lose.",
        "Surrender Fragment 4 and deliver the REVEAL. Never hint at the order."
      ],
      whenFinished: "Surrender the loot and Fragment 4, deliver the REVEAL, then send him skyward.",
      runtimeBackup: "One close shot or three soft passes. Never cut the reveal.",
      successCondition: "Mike always loses. A basket, target hit, layup, soft pass, or prepared fallback defeats the defense.",
      rewardPackages: ["RECOVERED TEAM ROCKET LOOT"],
      rewardOwners: ["Mike"],
      rewardPreparation: "Keep the loot, Ranger Dispatch, and SKY FRAGMENT 4 (Flame) ready. After the result screen, open the team cards, place the booster in the Booster Satchel, then hand over the Dispatch and the final fragment and deliver the reveal. Say the numbers are a combination; never say the order, and never demonstrate the jagged fit.",
      fallback: "Lower the hoop, use the closest marker, count target hits, accept three soft passes, or use one close shot plus two easy Pokémon questions.",
      transitionLine: "The Rangers hid their vault at the closest place to the sky in their yard. Go find it!",
      transitionDestination: "The Rangers’ Trampoline",
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
      entranceCue: "Stage the LOCKED vault under or beside the Rangers’ trampoline with three Ranger symbols leading to it, and one book strapped to the lid. Confirm the approved boundary and the designated bag carrier. THE BOX MUST NOT OPEN TODAY UNTIL PROFESSOR OAK — do not test the combination in front of Luca.",
      spokenLines: [
        "The Rangers hid it at the closest place to the sky in their whole yard. What in this yard is closest to the sky?",
        "Try the lock, Trainer. Four numbers… but which one comes first?",
        "Read the lid. It says take this to Professor Oak. Carry it — you found it."
      ],
      challengeSteps: [
        "The escort keeps Luca inside the approved configurable boundary.",
        "Follow the three prepared Ranger symbols to the trampoline.",
        "Let Luca recover the locked box and try the combination himself. It will not open. That failure IS the beat.",
        "Read the lid aloud: FOUR PIECES, ONE STONE. TAKE THIS TO PROFESSOR OAK.",
        "Open ONLY the book strapped to the lid. Never hint at the order of the numbers.",
        "Exit, confirm success outside, and carry the still-locked vault to the lab."
      ],
      runtimeSteps: [
        "Stay beside Luca, follow the symbols to the trampoline, and let him try the locked box himself.",
        "It stays locked. Read the lid, open one story item only, then exit and confirm outside."
      ],
      whenFinished: "Let Luca read the lid himself. Keep the vault locked and tell the Phone Captain the result is ready.",
      runtimeBackup: "Point straight to the box if the search stalls. It still travels to Oak locked.",
      successCondition: "Luca finds the vault and tries the lock. Not opening it is the success. The escort may lead directly to the box if the search stalls.",
      rewardPackages: ["SECRET RANGER CACHE"],
      rewardOwners: ["Designated Adult Escort"],
      rewardPreparation: "Stage the locked vault at the trampoline with one book strapped to the lid. Only that book opens here. Everything else stays locked inside until Oak, and the bag carrier moves the vault.",
      fallback: "If the trampoline is unavailable, place the box at the highest safe point in the yard and keep the sky clue. The escort may point straight to it.",
      transitionLine: "The lid names Professor Oak. Only he knows what four broken pieces do when they go back together.",
      transitionDestination: "Professor Oak’s Lab",
      handoffStory: "The Rangers hid their vault at the closest place to the sky. Bring someone you trust.",
      handoffLabel: "Adult: Hold to open the Adult Escort’s cue",
      completionLabel: "Phone Captain: Hold Mission Complete"
    },
    "oak-return": {
      id: "oak-return",
      portalGuide: "oak-lab",
      performerName: "Professor Oak and Professor Monica",
      characterName: "Partner Professors",
      phoneCaptain: "Patrick",
      entranceCue: "Luca arrives carrying a LOCKED vault and four jagged fragments. You are the only person who can open it, and that is the payoff for the whole morning — do not rush it. The pieces join one way only; joined and turned over they form the Sky Stone, and read left to right across the joined face the four numbers give the combination. Have a tray or clear table ready.",
      spokenLines: [
        "Professor Oak: Let me see that lid. Ah. Give me the pieces.",
        "Professor Monica: Fit them together — they only join one way. …Turn it over. Oak, it is whole. A Sky Stone, from the Sky Pillar.",
        "Professor Oak: Now read it face up, left to right. There is your combination. You found it — you open it."
      ],
      challengeSteps: [
        "Read the vault lid aloud, then ask Luca for the four fragments.",
        "Guide him to join the jagged edges — they only fit one way. Turn the joined stone over: that is the Sky Stone.",
        "Turn it face up and read the four numbers left to right. That is the combination.",
        "Luca dials the lock himself and opens the vault. Help as much as needed; he always turns the last dial.",
        "Monica opens the sealed Research File from inside and announces the Rayquaza finding.",
        "One friendly callback question, then award League Authorization."
      ],
      runtimeSteps: [
        "Luca joins the pieces, flips to see the Sky Stone, reads the numbers, and dials the lock.",
        "Open the vault. Monica announces Rayquaza; Oak asks one friendly question.",
        "Any answer counts, then award League Authorization."
      ],
      whenFinished: "Unpack the vault, award League Authorization, send Luca to Victory Road. He keeps the Sky Stone.",
      runtimeBackup: "Oak joins the pieces and reads the numbers aloud while Luca dials. He always opens it.",
      successCondition: "The vault opens with Luca’s hand on the dial. Any amount of help from Oak is fine.",
      rewardPackages: ["SECRET RANGER CACHE", "MEGA EVOLUTION RESEARCH FILE"],
      rewardOwners: ["Monica", "Bruce"],
      rewardPreparation: "The SECRET RANGER CACHE lives inside the vault and comes out here, with the MEGA EVOLUTION RESEARCH FILE. Open the books, tin, and team cards; every booster goes in the Booster Satchel. Luca keeps the assembled Sky Stone — Patrick needs the numbers on it after the credits.",
      fallback: "Oak assembles the stone and reads the combination aloud. If the lock jams, Oak opens it and hands the vault straight to Luca.",
      transitionLine: "The legend points home. Victory Road will reveal whether the signal has truly chosen Luca.",
      transitionDestination: "Victory Road",
      handoffStory: "The research partners are the only people who can open that vault.",
      handoffLabel: "Adult: Hold to open Professor Oak and Professor Monica’s return cue",
      completionLabel: "Phone Captain: Hold Mission Complete"
    },
    "victory-road": {
      id: "victory-road",
      portalGuide: "league-recruiter",
      performerName: "Auntie Ariel",
      characterName: "Elite Four Wild Card and Mega Rayquaza Referee",
      phoneCaptain: "Patrick",
      entranceCue: "This single private cue covers Victory Road, the Rayquaza reveal and physical encounter, and the Champion summon. Victory Road is YOUR game — a backyard trick-shot contest you invent live. Nothing is pre-set. Available: slide, swings, ninja spinners, bouncy house, plus any ball or target.",
      spokenLines: [
        "The last thing standing in your way is ME. Elite Four Wild Card. Undefeated. Allegedly.",
        "We play POKÉ. I invent a trick, I go first, you copy it. Miss your own trick, take a letter. Four letters and you are OUT.",
        "P… O… K… …É. É! Defeated by a seven-year-old!"
      ],
      challengeSteps: [
        "Invent each trick live off what the yard offers: down the slide and land a throw, a shot from the swing, through the ninja spinners, a bounce-house buzzer-beater.",
        "Do the trick first yourself. Scale it to whatever Luca can land — the trick exists to be copied, not to be hard.",
        "Take a letter every time you miss your own trick, and miss BIG. P, O, K, É, then go down theatrically.",
        "Four rounds is the target. Two is fine if the clock is tight.",
        "Let the phone return for Victory Road cleared, then continue without another full private cue.",
        "At Rayquaza, move closer after a miss and invoke a Legendary Assist whenever helpful.",
        "After Legendary success, summon Champion Patrick while Ariel keeps the phone."
      ],
      runtimeSteps: [
        "Invent trick shots off the slide, swings, spinners, and bouncy house. Luca copies; you miss yours and take P-O-K-É.",
        "Return the phone for Victory Road cleared, then one soft Rayquaza throw or a Legendary Assist.",
        "After the Legendary success screen, summon Champion Patrick."
      ],
      whenFinished: "Lose loudly, concede the title, then use the Phone Captain hold. Stay ready for Rayquaza and the Champion summon.",
      runtimeBackup: "Cut to two rounds and lose immediately, then move close to Rayquaza.",
      successCondition: "Ariel spells P-O-K-É and concedes, plus a Rayquaza hit, ring toss, symbol match, or Legendary Assist. Luca never takes a losing letter.",
      rewardPackages: ["League qualification handoff"],
      rewardOwners: ["Ariel"],
      rewardPreparation: "Keep Patrick and the Champion Chest out of sight until both Victory Road and Rayquaza are complete.",
      fallback: "Fewer rounds, easier tricks, or play it seated under the patio. Then move closer to Rayquaza or use a ring or three Sky symbols.",
      transitionLine: "Mega Rayquaza recognizes Luca. The Creekside Champion may now enter.",
      transitionDestination: "Champion Arena",
      handoffStory: "Auntie Ariel is blocking the last stretch. She has invented a game she is certain she cannot lose.",
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
        "A Champion match is two things: what you know, and who you know.",
        "First, what you know. Three questions about Pokémon.",
        "Now the part that decides it. I name every person who helped you today, and you tell me what they did.",
        "Luca, you are the new Champion of the Creekside Region."
      ],
      challengeSteps: [
        "Round 1 — Knowledge: three Pokémon trivia questions. Offer two choices whenever he hesitates; every thoughtful answer counts.",
        "Round 2 — Heart: go around the yard person by person. Name each helper, let Luca say what they did, and let that person hear it. This round IS the appreciation — do not rush it and do not skip anyone present.",
        "Round 3 — Team: ask which teammate carried him furthest today and why. Any answer wins the match.",
        "AFTER the Hall of Heroes and the credits, when he thinks it is over: ask him the code question. See the post-credits note below."
      ],
      runtimeSteps: [
        "Three easy trivia questions, two choices if he hesitates.",
        "Then name every helper present and let Luca say what each one did.",
        "Ask which teammate carried him furthest. Concede.",
        "After the credits, ask the code question."
      ],
      whenFinished: "Concede dramatically and name Luca Champion. Ariel opens the result and gathers everyone for the photo. Let the credits play all the way out.",
      runtimeBackup: "Two choices per question; prompt each helper by name. Any sincere answer wins.",
      successCondition: "Every sincere answer counts. Prompt freely. Patrick always concedes.",
      rewardPackages: ["POKÉMON LEAGUE CHAMPION CHEST"],
      rewardOwners: ["Patrick"],
      rewardPreparation: "Keep the chest hidden until Luca sees the Champion result. Open the deck and model afterward; every booster stays sealed for the family celebration.",
      fallback: "Two choices per trivia question, and Patrick names the helper and the deed together while Luca nods along.",
      transitionLine: "The Hall of Heroes is ready. Treat the ending as final, let the credits finish, and do not explain the pause that follows.",
      transitionDestination: "Hall of Heroes",
      postCreditsCue: "POST-CREDITS — this is what starts the Mew epilogue. Wait until the credits have finished and people have started drifting toward the popsicles. Then, casually, to Luca: “Hey — before we put all this away. Do you still remember the code?” Let him turn the four Sky Fragments over and read the numbers out loud himself. The moment he finishes the fourth number, the Phone Captain opens the epilogue and the screen glitches. Never explain that the question was planned.",
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
      entranceCue: "Open this cue only after Luca has said the four numbers out loud in answer to the Champion’s post-credits question. That is the trigger. If Patrick guides the physical trail, Polly or Ariel operates the phone. If another adult guides, Patrick may operate it. Keep Mew separate from the Champion Chest.",
      spokenLines: [
        "Luca… say those numbers again. …That is not a door code. Oak says something just answered it.",
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
