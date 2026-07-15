# Luca's Trainer Journey 🌿⚡

A Pokémon **Mega-Evolution–themed birthday scavenger hunt** web app for Luca's 7th birthday.
Kids follow clues from stop to stop, win a themed mini-game at each one, earn a badge, and
unlock the gift hidden there — finishing as **Champion**.

Built as a **zero-build static site** (plain HTML/CSS/JS): no npm, no framework, no
compile step. It implements the design system in [`docs/design-system.md`](docs/design-system.md)
("collector card meets clean product UI").

---

## What's in here

```
index.html            The scavenger-hunt game (mobile-first)
config/
  config.js           👈 EDIT THIS to change clues, gifts, stops (no coding needed)
  stops.json          Read-only reference mirror of the config
css/
  tokens.css          Design tokens (colors, type, spacing) — brief §16
  styles.css          Components: card frame, buttons, badge trail, mini-games
js/
  art.js              Original "inspired-by" SVG motifs (Tropius, Mega stone, Poké Ball…)
  app.js              Game engine: screen flow + mini-games
invite/
  index.html          Name → image invitation generator (brief §10)
  invite.js           Draws a personalized 1080×1350 / 1080×1080 PNG on <canvas>
docs/
  design-system.md    The full design brief (source of truth)
  tokens.json         JSON token mirror with RGB + approximate CMYK for print
```

---

## Run it locally

Because the app uses JavaScript modules, open it through a tiny local web server
(not by double-clicking `index.html`, which browsers block for module security):

```bash
# from this folder — pick whichever you have
python3 -m http.server 8000
#   then open http://localhost:8000

# or, with Node installed:
npx serve
```

Then visit the game at `/` and the invite generator at `/invite/`.

---

## Customize the hunt (for Patrick — no coding)

Open **`config/config.js`** in any text editor. Everything you'd want to change is there:

- **Party details** — `party.name`, `age`, `year`, `title`.
- **The stops** — each entry has a `clueText`, a `hintText`, a mini-game, and a
  `giftLocationText`. Add or remove stops freely; the badge trail adjusts to the count.
- **Mini-games** per stop — set `activity.type` to one of:
  - `quiz` — a multiple-choice question
  - `shadow-guess` — guess the creature from its shadow
  - `type-match` — pick the correct Pokémon type
  - `catch-tap` — tap the Poké Balls before time runs out

Save the file and reload the page. That's it.

> Progress is remembered in the page URL (the `#…` part), so a refresh keeps you
> in place — no login or browser storage required. Share a fresh link to start over.

---

## Deploy (free) with GitHub Pages

1. Push this repo to GitHub (already done if you're reading this there).
2. Repo **Settings → Pages → Build and deployment → Source: Deploy from a branch**.
3. Choose branch `main`, folder `/ (root)`, **Save**.
4. In a minute the game is live at `https://<owner>.github.io/pokemon-scavenger-hunt/`
   and the invite generator at `.../invite/`.

Any static host works too (Netlify, Vercel, Cloudflare Pages) — just drop the folder in.

---

## Making invitations

Open `/invite/`, type a guest's name, choose portrait or square, and **Download PNG**.
Edit the date/time/place in `invite/invite.js` (the `DETAILS` block near the top).
A ready-to-paste caption is generated alongside each image.

---

## Scope note

This scaffold covers **Track A — the interactive web app** and the **personalized
invite generator** from the brief. The **print pieces** (signs, favors, collectible
cards in Track B, §11) are documented in `docs/design-system.md` and share the same
tokens in `css/tokens.css` / `docs/tokens.json`, ready to build next.

## IP / usage

Personal, non-commercial birthday use. All artwork here is **original, "inspired-by"**
work — no official Pokémon logos, card templates, or trademarked art are copied
(see brief §14). Please don't sell these materials.
