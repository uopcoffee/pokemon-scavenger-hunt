# CODING AGENTS: READ THIS FIRST

This is a **handoff bundle** from Claude Design (claude.ai/design).

A user mocked up designs in HTML/CSS/JS using an AI design tool, then exported this bundle so a coding agent can implement the designs for real.

## What you should do — IMPORTANT

**Read the chat transcripts first.** There are 1 chat transcript(s) in `chats/`. The transcripts show the full back-and-forth between the user and the design assistant — they tell you **what the user actually wants** and **where they landed** after iterating. Don't skip them. The final HTML files are the output, but the chat is where the intent lives.

**Find the primary design file under `project/` and read it top to bottom.** The chat transcripts will tell you which file the user was last iterating on. Then **follow its imports**: open every file it pulls in (shared components, CSS, scripts) so you understand how the pieces fit together before you start implementing.

**If anything is ambiguous, ask the user to confirm before you start implementing.** It's much cheaper to clarify scope up front than to build the wrong thing.

## About the design files

The design medium is **HTML/CSS/JS** — these are prototypes, not production code. Your job is to **recreate them pixel-perfectly** in whatever technology makes sense for the target codebase (React, Vue, native, whatever fits). Match the visual output; don't copy the prototype's internal structure unless it happens to fit.

**Don't render these files in a browser or take screenshots unless the user asks you to.** Everything you need — dimensions, colors, layout rules — is spelled out in the source. Read the HTML and CSS directly; a screenshot won't tell you anything they don't.

## Bundle contents

- `README.md` — this file
- `chats/` — conversation transcripts (read these!)
- `project/` — the `Luca's Trainer Journey Design System` project files (HTML prototypes, assets, components)

---

## Implementation (this repo)

The design has been implemented as a production static site — no build step, no
npm install, just open the HTML files (or drop the folders on any static host):

- **repo root** — the scavenger-hunt game (Splash → Onboarding → Quest Map → Clue
  → Activity → Gift → Finale) lives at `index.html`, so it's servable straight
  from the repo/site root (e.g. `https://<owner>.github.io/<repo>/`). **Edit
  `data.js`** to change clues, hint text, gift locations, or the number of
  stops — nothing else needs to change. React/ReactDOM/Babel-standalone are
  vendored locally in `vendor/` (not CDN-loaded) so the app doesn't depend on
  reaching unpkg/jsdelivr over venue wifi at party time.
- **`invite/`** — the personalized invite generator (`invite/index.html`). Type a
  guest's name, export a 1080×1350 or 1080×1080 PNG; the caption to paste is
  shown alongside. Each guest gets a deterministic-random Pokémon sprite lineup
  keyed on their name (`assets/roster.js`).
- **`assets/`** — shared sprites/stickers/motifs used by both, copied from
  `project/assets/` (personal party use only — see the IP note above).

Not built in this pass (out of scope for this round — the design system under
`project/print/` has the source to build from if wanted later): the print
pieces (collectible cards, stop signs, banner, name tags, sticker sheet).

Ported from `project/ui_kits/web-app/` and `project/ui_kits/invite/` and
`project/components/**` — the prototype's JSX drop-in `<image-slot>` editor
(design-tool-only, backed by a runtime that doesn't exist outside Claude
Design) was replaced with direct `<img>` rendering of the real sprite art
already wired up in `data.js`/`roster.js`; everything else is a faithful,
pixel-matching port of the component styling.
