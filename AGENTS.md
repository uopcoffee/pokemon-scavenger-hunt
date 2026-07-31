# AGENTS.md

## Product

You are working on **Luca's Creekside Region**, a mobile-first Pokémon birthday adventure for one seven-year-old player and his family. The web app is the mission controller. The neighborhood, family, and neighbors are the game world.

## Read first

Before changing code, read every file in `docs/` in numeric order. The chapter sequence, physical interactions, rewards, security constraints, and timing are intentional.

## Non-negotiable design principles

1. The real world is primary. The phone introduces, tracks, and celebrates physical play.
2. Every chapter must contain story, travel or location context, a character encounter, a substantial physical interaction, an adult-confirmed completion, a reward reveal, and a transition.
3. Luca must feel successful. Challenges may be exciting but cannot hard-fail or stall the adventure.
4. Preserve the existing polished visual identity. Evolve it rather than redesigning from scratch.
5. Keep the app mobile-first, fast, offline-friendly, and usable on venue Wi-Fi with no external runtime dependencies.
6. The Secret Ranger Vault is a combination-locked box staged in Hannah and Noa's yard. Its game-only combination is `0151`, revealed through the four Ranger fragments.
7. Do not publish surnames, phone numbers, private access codes, or unnecessary household details. The game-only box combination is not a household access code.
8. Physical challenges are completed by an adult press-and-hold action. Luca must not be able to skip chapters accidentally.
9. Add durable progress persistence so a refresh or accidental close does not restart the game.
10. The apparent Champion ending must be followed by a deliberate fake-credit pause and a Mew glitch epilogue.

## Existing technical constraints

- Static site served from repository root
- React and ReactDOM loaded as browser globals
- JSX transpiled by vendored Babel standalone
- No npm install or build step
- Current content lives in `data.js`
- Current screen orchestration lives in `screens.jsx`
- Current mini-games live in `minigames.jsx`
- Shared UI lives in `components.jsx`
- Styling lives in `styles.css`

Preserve the no-build model for V2. Do not introduce a framework migration for this birthday build.

## Required implementation behavior

- Persist trainer identity, current chapter, current scene, earned badges, rewards, code-fragment slots, and epilogue state in `localStorage`.
- Provide a hidden moderator panel with: mark complete, go back one scene, jump to chapter, restore progress, and full reset.
- Add a visible adult completion control requiring a 1.5-second hold.
- Support physical-only challenges, optional digital warmups, multi-stage chapters, checkpoint visits, fake finale, and epilogue.
- Use the four game-only Ranger digits `0`, `1`, `5`, and `1` in order.
- Provide one-tap reduced-motion and sound-off behavior through browser preferences or settings.

## Do not do

- Do not replace physical challenges with tap-only mini-games.
- Do not expose locked chapter names too early if doing so spoils Team Rocket, Rayquaza, or Mew.
- Do not require camera, GPS, account login, network APIs, or location permissions.
- Do not make chapter completion depend on precise athletic performance.
- Do not frame the Ranger Vault as a door lock, house entry, or household-access challenge.
