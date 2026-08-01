# Claude Design Prompt — Printable Pokémon Food Cards (Luca's Birthday)

Copy everything below the line into Claude Design (claude.ai/design), with this
repository attached as context.

---

## What I need

Design a set of **16 small printable food labels** for my son Luca's Pokémon
birthday party. Each card names a snack with a Pokémon pun. I will print them at
home on cardstock, cut them out, and laminate them, so they need to survive being
propped next to a bowl of food outdoors on a folding table all afternoon.

This is a **private, personal, non-commercial party**, so fan art of Pokémon
names is fine — but do not reproduce official Pokémon logotype, the Pokéball
trade dress from official packaging, or any "official product" framing.

## Read first (this repo is the brand)

- `styles.css` — the design tokens live at the top in `:root`. **Use them.**
  Palette: `--paper #FBFCFA`, `--ink #1B2430`, `--tropius-leaf #3BA55D`,
  `--banana #F7C948`, `--sky #4FB0E5`, `--mewtwo-x #8A4FFF`, `--gold #D9B650`,
  plus the `--type-*` colors. Type: `--font-display` Montserrat,
  `--font-body` Nunito Sans, `--font-label` Space Grotesk (uppercase, letter-spaced).
- `AGENTS.md` and `README.md` — the party's world is **Luca's Creekside Region**,
  a Pokémon field-adventure for a seven-year-old. These cards are set dressing in
  that same world: think Pokémon Center cafeteria / Ranger field rations, not
  generic party clipart.
- `assets/` — real art already in the bundle you may reuse: `assets/types/*.png`
  (fire, water, grass, electric, psychic, normal, flying type badges),
  `assets/pokeball.svg`, `assets/frames/*.png`, `assets/fx/*` sparkles and glows,
  `assets/wordmark.svg`.
- `prompts/CLAUDE_DESIGN_PRINT_PROPS_VERDICT.md` — the house style for the other
  printed props. These food cards should look like they came out of the same
  print run.

**Important asset gap:** `assets/pokemon/` only contains Pikachu, Mew, Mewtwo,
Tropius, the Mega forms, and ball icons. **None of the Pokémon on this menu have
sprites in the repo.** So for each card, do both of these:

1. Draw a simple, original **CSS/SVG motif** that reads as the Pokémon at a
   glance — silhouette, signature shape, and its two or three signature colors
   (Charmander's flame tail, Gastly's purple gas cloud, Cubone's bone, Voltorb's
   red/white sphere). Original interpretation, not traced sprite art.
2. Leave that motif in a clearly-labeled swappable slot with a one-line note on
   what art to drop in, in case I source a sprite later. Cards must look finished
   with the motif alone — I should be able to print without sourcing anything.

## The menu — 16 cards

Card name is what prints big; the parenthetical is what's actually in the bowl
and should print small underneath as the "real food" subtitle. I fixed the
Pokémon spellings — use these.

| # | Card name | Actual food | Type/color cue |
|---|---|---|---|
| 1 | Poké Pizzas | pizza | fire |
| 2 | Magikarp Goldfish | Goldfish crackers | water |
| 3 | Charmander Cheetos | Cheetos | fire |
| 4 | Charizard Fireballs | cheese puffs | fire |
| 5 | Gastly Grapes | grapes | psychic/ghost purple |
| 6 | Cubone Bones | pretzel sticks | normal/tan |
| 7 | Squirtle Spit | juice boxes | water |
| 8 | Chansey Energy | Izze sparkling drinks | pink/normal |
| 9 | Poké Potions | cocktails — **adults only** | psychic violet |
| 10 | Fresh Exeggcute | quail eggs | grass/psychic |
| 11 | Fidough Balls | pão de queijo | normal/banana |
| 12 | Pidgey Popcorn | popcorn | flying |
| 13 | Voltorb Minis | cherry tomatoes | electric |
| 14 | Tangela Toes | cherry tomatoes | grass |
| 15 | Cherubi Cherries | cherries | grass/pink |
| 16 | Spheal Poop | blueberries | water/blue |

Notes on specific cards:

- **13 and 14 are the same bowl of cherry tomatoes** — I want both designed so I
  can pick the funnier one on the day. Don't merge them.
- **9, Poké Potions, is the alcohol table.** Give this one a visibly different
  treatment from the other fifteen — a deeper violet field, a small
  `ADULTS ONLY` tag in the label font. It should be unmistakable from six feet
  away to a parent scanning the table, while still being the prettiest card in
  the set.
- **16, Spheal Poop, is deliberate seven-year-old humor.** Keep it, play it
  straight, make it cute.
- Add a small, optional **allergen chip** in the corner where it matters:
  #2/#3/#4/#6/#11 contain gluten or dairy, #10 is egg, #11 is dairy. Design the
  chip so it can be omitted per-card without leaving a hole in the layout.

## Format and print specs

- **Card size:** 3.5 in × 2.5 in landscape (standard business-card ratio, reads
  well on a table). Design at 300 DPI equivalent.
- **Bleed:** 0.125 in bleed on all sides, plus a 0.125 in interior safe margin.
  Nothing important — text, allergen chip, motif — inside the bleed.
- **Sheet layout:** an 8-up US Letter (8.5 × 11 in) print sheet with thin
  hairline crop marks at the corners, printable in the browser with
  `@page { size: letter; margin: 0.25in }`. Two sheets total covers all 16.
- **Also give me a tent-card variant:** 3.5 in × 5 in with a center fold line, so
  the card stands up on its own without a stand. Front carries the full design;
  the back half can be a simple repeating pattern in the card's type color.
- **Cut-and-laminate friendly:** rounded corners drawn as art at ~0.12 in radius,
  and a solid color band running all the way to bleed so a slightly-off scissor
  cut still looks intentional.
- **Printer-safe:** no full-page black or heavy dark floods (I'm on a home inkjet
  — that's the constraint the screen app's dark energy-fields would violate).
  Keep the cards **paper-light with saturated color accents**: `--paper`
  background, a bold type-colored header band, dark `--ink` text. High contrast,
  readable from three feet away by a running kid.

## Card anatomy

Every card, same skeleton, so the set reads as one deck:

1. **Type-color header band** across the top, with the type badge icon from
   `assets/types/` at small size on the left.
2. **Pun name** in Montserrat, heavy, one or two lines, as large as fits — this
   is the whole point of the card, so let it dominate.
3. **Real-food subtitle** in Space Grotesk, uppercase, letter-spaced, muted
   `--ink-soft` — small but unambiguous, because grandparents need to know it's
   pretzel sticks.
4. **Pokémon motif** on the right third, bleeding slightly under the header band,
   with a soft glow from `assets/fx/` behind it.
5. **Optional allergen chip**, bottom-right, pill-shaped, tiny.
6. **A tiny shared footer mark** on every card — a small Pokéball glyph plus
   `CREEKSIDE REGION · LUCA'S 7TH` in the label font, so the set is obviously a
   set.

## Deliverables

- One HTML/CSS file per print sheet (or one file with both sheets), self-contained
  and printable, plus the tent-card variant.
- All 16 cards visible on screen in a preview grid before the print sheets.
- A short note at the top of the file on paper weight, cut order, and laminate
  pouch size that fits 3.5 × 2.5 with a sealing edge.

## Do not

- Do not use dark full-bleed backgrounds or the screen app's glow-heavy
  energy-field treatments — those are screen-only and will drink my ink.
- Do not put any scavenger-hunt spoilers on these cards: no chapter names, no
  vault combination or digits, no Team Rocket / Rayquaza / Mew references. These
  sit out on the food table all day where Luca will read them.
- Do not include surnames, the address, or any private household detail.
- Do not add QR codes, sponsor marks, or "official" Pokémon branding.
