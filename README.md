# Luca's Trainer Journey 🌿⚡

A Pokémon **Mega-Evolution–themed birthday scavenger hunt** web app for Luca's 7th
birthday. Kids follow clues from stop to stop, win a themed mini-game at each one,
earn a badge, and unlock the gift hidden there — finishing as **Champion**.

Built as a **zero-build static site**: no npm install, no compile step. Immersive,
type-colored "energy field" screens with glassy holographic cards, using real
Pokémon GO sprites for the creature art.

---

## What's in here

```
app/                  The scavenger-hunt game (mobile-first)
  index.html           Entry point — open this
  data.js               👈 EDIT THIS to change clues, gifts, stops (no coding needed)
  styles.css            Design tokens + the "game-grade" energy/glow effects
  components.jsx         Button, Card, TrainerCard, BadgeTrail, ClueCard, etc.
  minigames.jsx           The 4 mini-games (tap-ball, type-match, shadow-guess, memory)
  screens.jsx             Screen flow + orchestrator
  vendor/                 React/ReactDOM/Babel-standalone, vendored (no CDN dependency)
invite/
  index.html            Name → image invitation generator, exports a PNG
assets/                 Pokémon GO sprites, stickers, type icons (personal-use only, see below)
```

## Run it

Just open `app/index.html` on a phone (or `npx serve` / `python3 -m http.server`
from the repo root and visit it). The invite generator is at `invite/index.html`.

## Customize the hunt (no coding needed)

Open **`app/data.js`**. Each stop is `{ number, name, type, clueText, hintText,
activityType, giftLocationText }` — edit clues, hints, gift locations, or add/remove
stops freely (the badge trail and progress adjust to the count). `activityType` is
one of `tap-ball` | `type-match` | `shadow-guess` | `memory`.

Progress is kept in memory for the session (no login, no browser storage) — refresh
starts over, matching the "no localStorage dependency" requirement from the brief.

## Deploy (free) with GitHub Pages

1. Repo **Settings → Pages → Build and deployment → Source: Deploy from a branch**.
2. Branch `main`, folder `/ (root)`, **Save**.
3. The game is live at `https://<owner>.github.io/pokemon-scavenger-hunt/app/` and
   the invite generator at `.../invite/`.

Any static host works too (Netlify, Vercel, Cloudflare Pages) — just drop the folder in.

## Making invitations

Open `invite/index.html`, type a guest's name, choose portrait (1080×1350) or square
(1080×1080), and **Download PNG**. Each guest gets a deterministic, name-seeded
Pokémon sprite lineup (`assets/roster.js`) so the same guest always gets the same
lineup if you regenerate their invite. A ready-to-paste caption is shown alongside.
Edit the date/time/place directly in `invite/index.html` (the details textarea
default, or type over it before downloading).

## Scope note

This covers the interactive web app and the personalized invite generator. Print
pieces (signage, party favors, collectible trading cards) aren't included in this
pass.

## IP / usage

Personal, non-commercial birthday use. Creature art in `assets/` is sourced from
[PokeMiners/pogo_assets](https://github.com/PokeMiners/pogo_assets) (Pokémon GO game
sprites) — © Nintendo/Niantic/The Pokémon Company. Please don't sell or publicly
redistribute these materials; this is a private party build.
