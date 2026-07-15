# Design System Brief — "Luca's Trainer Journey"

**A Pokémon Mega Evolution / EX–themed birthday scavenger hunt**

> **How to use this file:** Hand this whole document to Claude Design (or any design/build agent). It is the single source of truth for building (1) a web app scavenger-hunt game and (2) a set of printable party materials. Everything is written so an agent can implement it directly — design tokens are provided as copy-pasteable CSS variables at the end. Where a decision is left open, it is marked **[DESIGNER CHOICE]**.

---

## 1. Project at a glance

| | |
|---|---|
| **Guest of honor** | Luca, turning **7** |
| **Theme** | Pokémon, styled after the **latest Mega Evolution / "ex" trading-card look** (2025–2026 TCG era) |
| **Core experience** | A **scavenger hunt**: Luca follows clues from stop to stop on a quest to "become a great Pokémon Trainer." Each stop has a Pokémon-themed game/activity he must complete to earn the gift waiting there. |
| **Two deliverable tracks** | **A. Web app** (the interactive scavenger-hunt guide/game). **B. Print + digital assets** (signage, decor, party favors, and a personalized text-message invitation). |
| **Signature Pokémon** | **Tropius** (Luca's favorite) as the friendly mascot; **Mega Mewtwo X & Y** as the "hero/epic" motif. A broader cast of **Mega-Evolved Pokémon** is welcome as accents. |
| **Design constraint** | Must **print economically**: white / near-white backgrounds, generous white space, color used as bold accents rather than full-bleed color fields. Foil/holo effects live on screen; print approximates them with flat metallics or spot gloss only where it matters. |

### The North Star
Modern Pokémon cards from the Mega Evolution era feel **premium, clean, and high-energy**: a crisp light background, a strong angular frame, a burst of "Mega energy" behind the creature, sharp silver/foil edges, and confident italic type. We are translating *that* feeling — **not** a busy, rainbow, full-color kids' party look. Think **"collector card meets clean product UI,"** playful enough for a 7-year-old but sharp enough to look designed.

---

## 2. Design principles

1. **White space is the hero.** The page (and the paper) breathes. Color and holo effects earn attention *because* they sit on calm, light ground. This also keeps print costs and ink use low.
2. **One bold moment per surface.** Each screen, sign, or card has a single focal "Mega moment" (a burst, a foil frame, a hero creature). Everything else is quiet.
3. **Everything is a "card."** The trading-card frame is the system's core object. Screens, clues, activities, and print pieces all echo the same framed, cornered, foil-edged card anatomy.
4. **Energy through geometry, not clutter.** Motion and excitement come from **angular shards, diagonal energy bursts, and prism gradients** — used sparingly — never from crowded backgrounds.
5. **Legible for a 7-year-old.** Big tap targets, large friendly-but-bold type, high contrast, short words. A kid should be able to use the app while excited and moving.
6. **Print-first, screen-enhanced.** Design each asset so it survives as flat CMYK on white paper, then layer screen-only holo/foil/animation on top for the web.

---

## 3. Color system

The palette is anchored to **Tropius** (grassy green, banana yellow, sky blue, warm tan) with **Mega Mewtwo X (violet-magenta)** and **Mega Mewtwo Y (deep indigo-violet)** as the "epic" accents. Base is white/paper. Silver is the "foil" connective tissue.

### 3.1 Core palette

| Token | Name | HEX | Role |
|---|---|---|---|
| `--paper` | Paper White | `#FBFCFA` | Primary background (screen + print). Slightly warm white. |
| `--paper-alt` | Card Cream | `#F2F4EF` | Secondary surface / card wells / zebra rows. |
| `--ink` | Trainer Ink | `#1B2430` | Primary text, frame outlines. Near-black with a cool tint. |
| `--ink-soft` | Soft Ink | `#54606E` | Secondary text, captions. |
| `--tropius-leaf` | Tropius Leaf | `#3BA55D` | Primary brand green (Tropius wings/collar). |
| `--tropius-leaf-deep` | Deep Leaf | `#1E7A43` | Green for contrast, hovers, headings on light. |
| `--banana` | Banana Yellow | `#F7C948` | Warm highlight / "reward" / success accent (Tropius fruit). |
| `--sky` | Sky Blue | `#4FB0E5` | Cool accent, links, water-type energy, calm panels. |
| `--tan` | Sauro Tan | `#C9A66B` | Warm neutral, earthy dividers (Tropius body). |
| `--mewtwo-x` | Mega X Violet | `#8A4FFF` | HERO accent 1 — magenta-leaning violet (Mega Mewtwo X). |
| `--mewtwo-y` | Mega Y Indigo | `#4B3A8F` | HERO accent 2 — deep indigo-violet (Mega Mewtwo Y). |
| `--mega-glow` | Mega Glow | `#B892FF` | Light violet used only inside energy bursts / glows. |
| `--silver` | Foil Silver | `#C7CDD4` | "Foil" edges, frame accents, metallic dividers. |
| `--silver-deep` | Steel | `#8B95A1` | Silver shadow / etched-frame lowlight. |
| `--gold` | Etch Gold | `#D9B650` | Rare "chase" accent — finale/gift moments only. |

### 3.2 Semantic / UI tokens

| Token | Value | Use |
|---|---|---|
| `--bg` | `--paper` | App + page background |
| `--surface` | `#FFFFFF` | Cards, sheets, modals |
| `--text` | `--ink` | Body text |
| `--brand` | `--tropius-leaf` | Primary brand actions |
| `--accent` | `--mewtwo-x` | Energy / hero highlights, primary CTA |
| `--success` | `--tropius-leaf` | "Correct!" / stop cleared |
| `--reward` | `--banana` | Gift unlocked, points earned |
| `--info` | `--sky` | Hints, tips, clue framing |
| `--danger` | `#E4572E` | "Try again" (warm, not scary) |
| `--line` | `--silver` | Borders, dividers, frame edges |

### 3.3 Energy-type accent chips (optional flavor)
Each scavenger-hunt stop can be tagged with a Pokémon "type" for flavor. Provide a small chip using these accents (kept muted so they don't fight the base palette): Grass `#3BA55D`, Fire `#E4572E`, Water `#4FB0E5`, Electric `#F7C948`, Psychic `#8A4FFF`, Normal `#C9A66B`. Chip = small pill, colored dot + label in `--ink`.

### 3.4 Print rules for color
- **Backgrounds stay white/paper.** No full-bleed color fields. Accents appear as frames, bursts, icons, and type — not as page fills.
- Convert accents to **CMYK** before print; the violets (`--mewtwo-x/y`) can shift on press — soften to ~90% and proof them. Provide both RGB (screen) and CMYK (print) swatches in the handoff.
- **Silver & gold "foil":** on screen use the metallic gradients (§6). In print, either (a) print as flat solid `--silver` / `--gold`, or (b) reserve for **spot metallic foil / spot-gloss** only on one hero element per piece (e.g., the frame of a sign header). Never rely on gradient foil to read in flat CMYK.
- Design every print asset to still work in **grayscale** as a fallback (home printers).

---

## 4. Typography

Three roles. Prioritize free/open, print-safe fonts with strong italics (the TCG look leans on **bold italic** display type and clean humanist body type).

| Role | Font (primary) | Fallbacks | Usage |
|---|---|---|---|
| **Display / Hero** | **Montserrat** (800/900, often *italic*) | Poppins, Nunito Sans, system-ui | Big titles, the wordmark, stop names, "Mega" moments. Use heavy italic for energy. |
| **Body / UI** | **Nunito Sans** (400/600/700) | Inter, system-ui, sans-serif | Paragraphs, clues, buttons, forms. Rounded-humanist = friendly + legible for kids. |
| **Label / Meta** | **Space Grotesk** or **Roboto Mono** (500) | ui-monospace, monospace | Tiny caps labels: "STOP 03 / 08", "PSYCHIC TYPE", HP-style stat lines, foil card metadata. Use UPPERCASE + letter-spacing. |

**[DESIGNER CHOICE]** If a more authentic "card" display face is wanted, a condensed heavy italic (e.g., a Gill/Frutiger-condensed-style face) may be substituted for Hero — keep it bold, italic-capable, and legible at small sizes.

### Type scale (web, rem @ 16px base)
`--fs-display` 2.75 / `--fs-h1` 2.0 / `--fs-h2` 1.5 / `--fs-h3` 1.25 / `--fs-body` 1.0625 / `--fs-small` 0.875 / `--fs-label` 0.75 (uppercase, tracking `0.08em`).

Rules: Hero titles are heavy italic, tight leading (`1.05`). Body is regular weight, comfortable leading (`1.55`), max line length ~62ch. Never set long copy in all-caps. For a 7-year-old audience, keep game-facing body ≥ `1.0625rem` and buttons ≥ `1.125rem`.

---

## 5. Iconography & motifs

**Signature motifs (use, in priority order):**
1. **Mega Stone / Key Stone spark** — a faceted gem with a swirling infinity-glint inside. The system's "energy" glyph; use for progress markers, loading, and the "Mega moment" bursts. *(Design an original stylized gem — see IP note §14 — do not copy the exact trademarked Key Stone artwork.)*
2. **Poké Ball** — simplified, single-line or two-tone. Bullets, list markers, favicon, map pins.
3. **Angular energy shards / diagonal burst** — the "mid-transformation" energy behind a hero, straight from the Mega Attack Rare look. Screen-only or spot-print.
4. **Tropius leaf + banana cluster** — the friendly mascot motif; use on kid-facing/soft moments (welcome, success, favors).
5. **Prism/holo sliver** — a thin diagonal rainbow-silver sliver as a foil accent on frames.

**Icon style:** geometric, 2px stroke on a 24px grid, rounded joints, two-tone fills allowed (`--ink` + one accent). Keep icons flat; the "premium" comes from the frame and foil, not from gradients inside icons.

**Do:** one motif per surface, large and confident. **Don't:** scatter Poké Balls + sparkles + leaves + shards all at once. Restraint is the brand.

---

## 6. Texture & effects (screen vs. print)

| Effect | Screen (web) | Print |
|---|---|---|
| **Foil edge** | Linear metallic gradient on 2–3px frame border (`--silver` → `#FFFFFF` → `--silver-deep`, angled 120°). Subtle sheen animation on hover. | Flat `--silver` keyline, OR spot metallic foil on one hero element. |
| **Holo background** | Very low-opacity (6–10%) diagonal prism gradient inside a card panel only. | Omit; keep white. Optional light 5% dot/vine pattern in one grayscale tint. |
| **Mega energy burst** | Radial `--mega-glow` → transparent, with angular shards masked behind the hero creature. Can animate on stop-clear. | A flat, screened (≤15%) burst behind the hero, or leave as white with shards as line art. |
| **Card sheen / tilt** | Optional 3D tilt + gloss follow on hover for "collectible" feel. | N/A |

**Golden rule:** any effect must be **decorative-only** and degrade gracefully. If foil/holo is removed, the layout still reads perfectly on white.

---

## 7. Layout, grid & spacing

- **Spacing scale (8px base):** `4, 8, 12, 16, 24, 32, 48, 64, 96`. Tokens `--sp-1`…`--sp-9`.
- **Radius:** cards `--r-card: 18px`; buttons/chips `--r-pill: 999px`; insets `--r-sm: 10px`. The TCG frame is fairly sharp — keep radii moderate, not bubbly.
- **Web grid:** mobile-first, single column, max content width `560px` for the game (it's a phone-in-hand experience), `1080px` for any desktop/parent views. Comfortable side gutters (`--sp-5`).
- **Print grid:** define per piece in §11 with explicit bleed/margins.
- **Elevation:** shadows are soft and cool (`0 6px 24px rgba(27,36,48,.10)`), plus the silver keyline. Avoid heavy drop shadows.

### 7.1 The Card Frame (the core component)
Every "card" (screen hero, clue, activity, print favor) shares this anatomy:
1. **Foil keyline** border (silver, 2–3px).
2. **Top bar:** name (Hero italic) left, meta label (mono caps) right — e.g. `TROPIUS` / `STOP 03·GRASS`. Optional stat line (HP-style) for flavor.
3. **Hero zone:** the creature/illustration on white or a faint burst, breaking slightly past its inner frame (the "extended art" IR look).
4. **Body zone:** clue text / instructions / activity.
5. **Footer strip:** small type — set number style (e.g., `LUCA · 7 · 2026`), a Poké Ball glyph, progress dots.

Provide this as a reusable component with variants: `hero`, `clue`, `activity`, `reward`, `favor`, `sign`.

---

## 8. Components (web)

Build these as a documented component set with all states (default / hover / focus / active / disabled / loading). Focus rings are **required** and visible (`2px --mewtwo-x` offset).

- **Button** — Primary (filled `--mewtwo-x`, white text, pill), Secondary (outline `--tropius-leaf`), Ghost, and **Big Game Button** (min 56px tall, `--fs` ≥1.125rem, full-width on mobile). Icon-left optional.
- **Type chip / badge** — §3.3 pills.
- **Card** — the §7.1 frame, all variants.
- **Progress tracker ("Gym Badge trail")** — a horizontal/vertical row of **badge slots** (empty = silver outline gem, earned = filled colored Mega-stone gem). Shows `STOP x of 8` and animates a badge "snapping in" on clear. This is the spine of the scavenger hunt.
- **Clue card** — riddle text, a "Reveal hint" disclosure (`--info`), and a "Where to next?" reveal.
- **Activity/mini-game shell** — a consistent frame that any game plugs into: title, instructions, the interactive area, a big Submit/Check button, and success/retry feedback.
- **Feedback states** — Success ("You caught it!" burst + badge), Retry (warm, encouraging, never a harsh red X).
- **Gift-unlock modal** — the "chase card" moment: gold `--gold` foil frame, burst, "Your gift is here!" + where to find it.
- **Trainer Card (profile)** — see §9; a personalized card with Luca's/each guest's name, avatar, and badge count.
- **Nav / header** — minimal: wordmark + progress dots. Bottom-sheet or big-button nav on mobile.
- **Form fields** — for the name entry / any RSVP: large labels, big inputs (min 48px), clear validation using `--info`/`--danger`.
- **Empty/loading** — Mega-stone spinner (rotating faceted gem).

---

## 9. The web app — scavenger-hunt game

**Platform:** mobile-web first (kids and helpers use phones). Keep it a single-player-per-device guided flow; no login required — a simple name entry is enough.

**Narrative frame:** "Luca, your journey to become a great Pokémon Trainer begins now. Clear every stop, win every challenge, and claim your Trainer title." Each stop = a **Gym-style challenge**; clearing it earns a **badge** and reveals the **next clue** + the **gift location** for that stop.

### Screen flow
1. **Splash / Welcome** — wordmark, "Begin your journey," big start button. Hero: Tropius + a Mega energy burst.
2. **Become a Trainer (onboarding)** — enter name → generates a **Trainer Card** (name, chosen starter avatar **[DESIGNER CHOICE of 4–6 avatars, incl. Tropius]**, 0 badges). Sets the playful stakes.
3. **Quest Map / Badge Trail** — the home base. Shows all 8 stops as locked/unlocked badge slots and current progress. Tapping the active stop opens its clue.
4. **Clue screen** — riddle/clue card leading to the next physical location. "Reveal hint" fallback for a stuck 7-year-old.
5. **Activity/Challenge screen** — the themed mini-game/quiz at that stop (e.g., "match the type," "which Pokémon is this shadow?", "tap the right Poké Ball," a simple memory or catch tap-game). Must be **winnable** — generous, forgiving, retry-friendly.
6. **Stop cleared → Gift unlock** — success burst, badge snaps into the trail, "Your gift is hidden [location]!" reveal, then "Next clue" button.
7. **Finale / Champion screen** — all badges earned: a gold "Champion" Trainer Card, confetti/energy burst, "Happy Birthday, Luca!" This is the one place gold `--gold` foil goes full hero.

**Content model (so it's editable):** stops are data-driven — each stop has `{ number, name, type, clueText, hintText, activityType, giftLocationText }`. Build an easy config (JSON) so the parent can edit clues, locations, and the number of stops without touching design. **Assume 8 stops but make the count flexible.**

**Behavior notes:** progress should persist within the session (in-memory / URL state — **no browser localStorage dependency assumptions**; if persistence is needed, use a lightweight backend or URL/query state). Keep animations optional and skippable. Everything works one-handed on a phone.

---

## 10. Personalized text-message invitation

Invitations go out **by text (MMS/iMessage)**, personalized with each **invitee's name**. Deliver this as a **repeatable image template** (not a web page), so Patrick can generate one per guest.

- **Format:** portrait image, **1080 × 1350 px** (safe for MMS/social), plus a **1080 × 1080** square variant. Export **PNG** (and a print-ready PDF version if any get handed out).
- **Layout:** a Trainer-Card frame on white. Headline: *"[NAME], you're invited to Luca's Trainer Journey!"* — the **`{{invitee_name}}`** is the hero, set in Hero italic, in `--mewtwo-x`. Tropius mascot + a subtle energy burst. Details block (mono labels): date, time, place, "wear your trainer gear," RSVP contact.
- **Personalization mechanism:** provide the template as either (a) a layered file with a clearly named `{{invitee_name}}` text layer, and/or (b) a tiny generator (HTML canvas or script) where you type a name and export the image. Prefer **(b)** so Patrick can batch them quickly. Include a "long name" fallback (auto-shrink text).
- **Tone:** exciting, short, kid-parent-friendly. Include a plain-text caption to paste alongside the image.

---

## 11. Print pieces

All print pieces share: **white/paper background, foil-silver keyline frame, one hero motif, generous margins.** Provide print-ready **PDF (CMYK, 300dpi, 3mm/0.125" bleed, crop marks)** and a **home-printer PDF (RGB, no bleed, fits Letter/A4)** for each. Design each to also read in grayscale.

### 11.1 Signage & decor
- **Welcome banner / poster** — large format. "Luca's Trainer Journey — Begins Here!" Hero Tropius + Mega burst, big wordmark. Provide at **18×24"** and **24×36"**, plus a tiled **A4/Letter DIY** version.
- **Station / Stop signs (×8)** — one per scavenger-hunt stop. Big **STOP number**, stop name, type chip, and a one-line prompt ("Challenge 3: The Psychic Trial"). Consistent template, swappable content. **A4/Letter portrait**, framed.
- **Directional arrows** — foil-framed arrow cards to guide between stops. Left/right/up variants.
- **Table tents / food labels** — small folded cards ("Berry Punch," "Poké Puffs"). **[DESIGNER CHOICE]** of playful renamed snacks.
- **Door/entry sign** — "A Trainer's journey starts beyond this door."

### 11.2 Party favors
- **Trainer name tags** — a mini Trainer Card per guest with `{{name}}`, a starter avatar, and "Trainer" title. Lanyard/pin format, ~**3.5×2.25"** (badge size) or **2.5×3.5"** (card size). Same personalization mechanism as §10.
- **Custom "trainer cards" (collectible handout)** — the star favor: a **2.5×3.5" trading-card** styled after the Mega Evolution frame, featuring the party's cast (Tropius, Mega Mewtwo X/Y, etc.) with fun made-up stats and Luca's party as the "set name" in the footer (`LUCA · 7 · 2026`). Design **a small series (4–8 cards)** so kids can collect/trade. This is where the full TCG aesthetic shines.
- **Thank-you cards** — folded A6 / quarter-Letter. "Thanks for training with me!" White front with foil frame + Tropius; inside blank for a note. Include a **`{{name}}`-personalized** variant.
- **Treat-bag / goody-bag labels** — sticker sheet, circular (2") + rectangular (3×2") labels with Poké Ball / Mega-stone motifs and "Trainer [name]" line.
- **Sticker sheet** — a page of the motifs (Poké Ball, Mega stone, Tropius, badges) as a bonus favor.

**Sheet/imposition:** deliver favors laid out for efficient printing (e.g., name tags 8-up on Letter, cards 9-up), with cut guides.

---

## 12. Voice, tone & sample copy

**Voice:** an encouraging Trainer's-journey narrator — excited, warm, simple, action-forward. Short sentences. Second person ("you"). Celebrate constantly. Never condescending, never scary on failure.

Sample microcopy:
- Start: **"Ready, Trainer? Your journey begins!"**
- Clue intro: **"Your next challenge is hidden nearby…"**
- Hint: **"Need a little help? Here's a clue."**
- Success: **"You did it! Badge earned! 🌟"** *(emoji optional — [DESIGNER CHOICE])*
- Retry: **"So close! Give it another try, Trainer."**
- Gift unlock: **"Challenge cleared! Your gift is waiting [here]."**
- Finale: **"You're officially a Champion. Happy Birthday, Luca!"**

Keep proper nouns simple; assume a 7-year-old reader (with a helper nearby).

---

## 13. Accessibility & kid-usability

- **Contrast:** body/UI text meets **WCAG AA** (≥4.5:1) on white — verify violets and greens at their used sizes; darken to `--tropius-leaf-deep` / `--mewtwo-y` for text if needed. Never put light `--banana` text on white.
- **Tap targets:** ≥44×44px (game buttons ≥56px). Big spacing between interactive elements so excited hands don't misfire.
- **Motion:** honor `prefers-reduced-motion`; all bursts/tilts are optional enhancements.
- **Reading load:** minimal text per screen; icons reinforce words; never rely on color alone (pair type chips with labels, success with a check + word).
- **Focus visible** everywhere; logical tab order for any parent using keyboard.

---

## 14. IP / usage note (please read)

This is a **personal, non-commercial birthday party** for Luca, which is the appropriate context for fan-themed decor. To keep it clean and original:
- **Create original, "inspired-by" artwork and glyphs** rather than copying official trademarked logos/wordmarks (e.g., the Pokémon logo, the exact Key Stone, official card templates). Build our **own** Mega-stone gem, our own wordmark ("Luca's Trainer Journey"), our own card frame that *evokes* the era.
- **Do not sell** these materials or the collectible cards; they're party favors only.
- If any official character likeness is used in decor, treat it as personal-use fan art, and avoid implying official endorsement.

This keeps the project safe and, honestly, makes it look more custom and special.

---

## 15. Deliverables checklist (for Claude Design)

**Foundations**
- [ ] Design-token file (CSS variables + a JSON mirror) — colors (RGB **and** CMYK), type scale, spacing, radii, shadows.
- [ ] Typography specimen + the "Luca's Trainer Journey" wordmark (screen + foil/print versions).
- [ ] Icon/motif set (Mega stone, Poké Ball, energy shard, Tropius leaf/banana, badge gems) as SVG.
- [ ] The Card Frame component with all variants (`hero, clue, activity, reward, favor, sign`).

**Web app**
- [ ] Component library with all states + focus styles.
- [ ] Screens: Splash, Onboarding/Trainer-Card, Quest Map/Badge Trail, Clue, Activity shell, Gift-unlock, Finale.
- [ ] Badge/progress tracker with earned-animation.
- [ ] Data-driven stop config (JSON) + docs so Patrick can edit clues/locations/count.
- [ ] Responsive (mobile-first) build; reduced-motion + AA contrast verified.

**Personalized invite**
- [ ] 1080×1350 + 1080×1080 templates with `{{invitee_name}}`.
- [ ] A quick name→image generator (preferred) or clearly-layered template + paste-in caption.

**Print + favors**
- [ ] Welcome banner (18×24, 24×36, DIY tiled) + door/entry sign.
- [ ] 8 station/stop signs (template + swappable content), directional arrows, table tents/food labels.
- [ ] Trainer name tags (`{{name}}`), collectible trainer-card series (4–8), thank-you cards (`{{name}}`), goody-bag labels, sticker sheet.
- [ ] Every print asset: CMYK print-PDF (bleed+crops) **and** home-printer PDF, grayscale-safe, imposed for efficient cutting.

**QA pass**
- [ ] Contrast + tap-target audit. [ ] Grayscale print test. [ ] "Foil removed" degradation check. [ ] 7-year-old legibility sanity check.

---

## 16. Appendix — build-ready tokens

```css
:root {
  /* Core palette */
  --paper:            #FBFCFA;
  --paper-alt:        #F2F4EF;
  --surface:          #FFFFFF;
  --ink:              #1B2430;
  --ink-soft:         #54606E;

  --tropius-leaf:     #3BA55D;
  --tropius-leaf-deep:#1E7A43;
  --banana:           #F7C948;
  --sky:              #4FB0E5;
  --tan:              #C9A66B;

  --mewtwo-x:         #8A4FFF;
  --mewtwo-y:         #4B3A8F;
  --mega-glow:        #B892FF;

  --silver:           #C7CDD4;
  --silver-deep:      #8B95A1;
  --gold:             #D9B650;

  /* Semantic */
  --bg:      var(--paper);
  --text:    var(--ink);
  --brand:   var(--tropius-leaf);
  --accent:  var(--mewtwo-x);
  --success: var(--tropius-leaf);
  --reward:  var(--banana);
  --info:    var(--sky);
  --danger:  #E4572E;
  --line:    var(--silver);

  /* Type */
  --font-display: "Montserrat", "Poppins", system-ui, sans-serif;
  --font-body:    "Nunito Sans", "Inter", system-ui, sans-serif;
  --font-label:   "Space Grotesk", "Roboto Mono", ui-monospace, monospace;
  --fs-display: 2.75rem; --fs-h1: 2rem; --fs-h2: 1.5rem; --fs-h3: 1.25rem;
  --fs-body: 1.0625rem; --fs-small: .875rem; --fs-label: .75rem;

  /* Spacing (8px base) */
  --sp-1:4px; --sp-2:8px; --sp-3:12px; --sp-4:16px; --sp-5:24px;
  --sp-6:32px; --sp-7:48px; --sp-8:64px; --sp-9:96px;

  /* Radius & elevation */
  --r-card:18px; --r-sm:10px; --r-pill:999px;
  --shadow-card: 0 6px 24px rgba(27,36,48,.10);
  --foil-edge: linear-gradient(120deg,#C7CDD4 0%,#FFFFFF 45%,#8B95A1 100%);
  --mega-burst: radial-gradient(circle at 50% 45%, rgba(184,146,255,.55), rgba(184,146,255,0) 60%);
}
```

```json
{
  "stopConfigExample": {
    "number": 3,
    "name": "The Psychic Trial",
    "type": "psychic",
    "clueText": "Where the family gathers to watch the big screen, your next challenge waits unseen.",
    "hintText": "Think of the coziest room in the house.",
    "activityType": "shadow-guess",
    "giftLocationText": "Look behind the couch cushions!"
  }
}
```

---

*Prepared for Patrick — Luca's 7th birthday. Theme grounded in the Pokémon TCG Mega Evolution series (2025–2026). Build originals inspired by that era; keep it personal-use.*
