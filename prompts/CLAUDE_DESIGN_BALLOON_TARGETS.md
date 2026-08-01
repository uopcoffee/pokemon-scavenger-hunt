# Claude Design Prompt — Giant Tiled Pokémon Water-Balloon Targets

Copy everything below the horizontal rule into Claude Design (claude.ai/design),
with this repository attached as context.

---

## What I need

A **large-format target poster generator** for a water-balloon game at my son
Luca's Pokémon birthday party.

Each target is **one giant Pokémon printed across 6 sheets of US Letter paper —
2 sheets wide × 3 sheets tall**. I print the 6 sheets on my home printer,
laminate each sheet individually, tape them together into one big poster, and zip-tie
it to a backyard fence. Kids throw water balloons at it. Different parts of the
Pokémon are worth different points.

I need **6 different Pokémon targets** hanging on the fence at once, so kids can
pick which one to aim at — and I need to be able to **swap in a different Pokémon
later** without you rebuilding anything. That swappability is the most important
requirement in this document: build a template driven by a config object, not six
hand-made posters.

This is a **private, personal, non-commercial party**. Fan-art interpretation is
fine; no official Pokémon logotype, packaging trade dress, or "official product"
framing.

## Read first (this repo is the brand)

- `styles.css` — design tokens in `:root`. Palette: `--paper #FBFCFA`,
  `--ink #1B2430`, `--tropius-leaf #3BA55D`, `--banana #F7C948`, `--sky #4FB0E5`,
  `--mewtwo-x #8A4FFF`, `--gold #D9B650`, and the `--type-*` colors. Type:
  `--font-display` Montserrat, `--font-body` Nunito Sans, `--font-label`
  Space Grotesk.
- `AGENTS.md` — the world is **Luca's Creekside Region**. These targets are a
  Ranger training range inside that world, not generic carnival signage.
- `prompts/CLAUDE_DESIGN_FOOD_CARDS.md` — the food labels you just built. Same
  print run, same visual family.
- `assets/types/*.png`, `assets/pokeball.svg`, `assets/fx/*` — reusable art.

**Asset gap, same as the food cards:** `assets/pokemon/` only holds Pikachu, Mew,
Mewtwo, Tropius, the Mega forms, and ball icons. Assume the Pokémon art is
supplied per-target, and make the artwork slot the primary input (see below).

## Geometry — get this exactly right

- **Tile grid:** 2 columns × 3 rows = 6 sheets, US Letter **portrait**
  (8.5 in × 11 in each).
- **Finished poster:** roughly **16.5 in wide × 32 in tall** after overlap and
  trim. Give me the exact final dimensions your layout produces.
- **Printable area:** assume a home inkjet cannot print to the edge. Use a
  **0.25 in unprintable margin** on all four sides of every sheet, and design so
  the artwork survives it.
- **Seam handling:** this is the part that usually goes wrong, so pick one
  approach and be explicit about it. I want **trim-and-butt**: each sheet prints
  a thin **cut line** 0.25 in inside the paper edge on the interior seams only
  (not on the poster's outer edges), I cut on that line, and the sheets butt
  together with no overlap. Artwork must be positioned so the image is continuous
  across the cut lines.
- **Assembly aids on every sheet, printed in the margin outside the cut line:**
  - a **sheet ID** like `CHARIZARD · R2C1` in the label font, large enough to
    read from a pile
  - a **mini thumbnail** of the whole poster with this sheet's cell highlighted
  - **edge-match tick marks** at the seams so I can align neighbors by eye
  - an **arrow marked TOP**
  These must all fall in the discarded margin, so nothing shows on the assembled
  poster.

## The swappable target config

Everything about a target comes from one plain JS object I can copy, edit, and
duplicate. Something shaped like this — refine the shape if you have a better
one, but keep it this simple to edit:

```js
{
  name: "Charizard",
  type: "fire",              // drives palette from --type-* tokens
  art: "art/charizard.png",  // transparent PNG, portrait, drop-in
  artScale: 1.0,             // nudge size
  artOffset: [0, 0],         // nudge position
  zones: [
    { label: "Head",  points: 50, shape: "ellipse", at: [50, 18], size: [26, 16] },
    { label: "Wings", points: 25, shape: "ellipse", at: [50, 42], size: [78, 30] },
    { label: "Body",  points: 10, shape: "ellipse", at: [50, 58], size: [34, 26] },
    { label: "Tail Flame", points: 100, shape: "ellipse", at: [80, 80], size: [16, 14] },
  ],
}
```

Zone coordinates in **percentages of the poster**, so they survive any paper size.
Support at minimum `ellipse` and `polygon` shapes. **Four to six zones per
target.** If a config has no `art`, fall back to a bold flat silhouette drawn from
the type color so the poster still prints and plays.

## Scoring zones — how they should look and behave

- Each zone is a **translucent colored region with a heavy outline** over the
  Pokémon art, so the Pokémon is still clearly the Pokémon. The art reads first,
  the scoring reads second.
- Each zone carries a **big point number** and a small label, placed at the zone's
  centroid, in a chip that stays legible over busy artwork.
- **Point values must be readable from ~20 feet** by a running seven-year-old and
  by the adult keeping score. Oversized numerals, dark `--ink` on a light chip,
  heavy outline.
- Make the **highest-value zone the smallest and hardest** — the tail flame, the
  forehead, the tiny Voltorb dot. That's the whole game.
- Water balloons hit hard and wet: use **high-contrast fills**, not subtle ones.
  Assume the laminate will glare in sun.
- Include a **wet-strike note in the design**: nothing important within 0.5 in of
  the poster's outer edge, since that's where tape, zip ties, and grommet
  reinforcement go.

## Six targets to ship

Build the six configs below so I can print immediately. Choose point spreads that
differ across targets so kids pick favorites — one "many easy points," one
"all-or-nothing," and so on. Silhouettes are deliberately distinct so the six
read differently from across the yard.

| Target | Type | Why it's on the fence |
|---|---|---|
| Charizard | fire | huge wingspan, tiny high-value tail flame |
| Snorlax | normal | enormous easy body, the low-skill crowd-pleaser |
| Gengar | psychic/ghost violet | wide grin, mid-difficulty |
| Voltorb | electric | small round target, tight rings, all-or-nothing |
| Bulbasaur | grass | bulb on the back as the bonus zone |
| Magikarp | water | joke target — enormous points, comically hard mouth zone |

Do not merge or drop any of these; I want all six on the fence at once.

## Extra pieces I need alongside the posters

1. **Print sheet index** — a one-page cover listing all 36 sheets in print order,
   so I can run the whole job and keep the pile straight.
2. **Scoreboard poster** — one Letter sheet listing all six Pokémon and their zone
   values, for the adult scorekeeper to hang at the throwing line.
3. **Throw-line sign** — one Letter sheet, `RANGER TRAINING RANGE`, with the rules
   in three short lines a seven-year-old can read: how many balloons per turn,
   where to stand, that you call your target before you throw.

## Print, laminate, and mount constraints

- **No dark full-bleed backgrounds and no heavy ink floods** — home inkjet, 36
  sheets. Keep posters **paper-light with saturated accents**. The screen app's
  dark energy-field treatments are wrong here for the same reason they were wrong
  on the food cards.
- Laminating happens **per sheet, before assembly** — standard 9 × 11.5 in pouches
  swallow a Letter sheet with a sealing edge, so the cut line must fall inside the
  laminate, not on the sealed border. Call out in your notes that I should
  **cut the interior seams before laminating**, then laminate, then tape.
- Add a **corner reinforcement mark** at the poster's four outer corners showing
  where to punch a hole or add a grommet for zip-tying to the fence.
- Give me a short **assembly note** at the top of the file: print order, cut
  order, laminate, tape the seams on the back with clear packing tape, mount.

## Heads-up before you build

Six targets × 6 sheets is **36 printed sheets and 36 laminating pouches** per full
set. Build all six as specced — but make the config-driven template good enough
that I can print two targets on Friday and four on Saturday, and add a note in the
file telling me which two are the best minimum viable pair if I run short on
laminate.

## Do not

- Do not put scavenger-hunt spoilers on any of this: no chapter names, no vault
  combination or digits, no Team Rocket / Rayquaza / Mew references. These hang in
  the open all afternoon where Luca will read them.
- Do not use PDF-only or image-only output — I need editable HTML/CSS I can
  re-run with a new config.
- Do not require me to hand-place zone outlines in a graphics editor. Percentages
  in the config, nothing else.
- Do not include surnames, the address, or private household details, and no QR
  codes or sponsor marks.
