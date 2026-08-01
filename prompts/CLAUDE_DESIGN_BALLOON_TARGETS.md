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
- **Nothing gets cut. This is the governing constraint.** Each sheet is printed,
  laminated whole in its own pouch, and the finished pouches are butted edge to
  edge. I never trim paper and I never trim laminate. Design to that, not around it.
- **This means there is a dead band between neighboring sheets**, and it is wider
  than people expect. It is the printer's unprintable margin on both sheets, plus
  the sealed laminate border sticking out past the paper on both sheets — call it
  **1 inch total between the two printable areas**, horizontally and vertically.
  Treat that band as **gutter**: real, unavoidable, and part of the design.
- **Make it a `gutter` config value in inches, default 1.0**, so I can retune it
  after measuring my actual pouches. Everything downstream — art slicing, zone
  geometry, final poster size — recomputes from it.
- **Slice the art gutter-aware ("exploded" layout).** The Pokémon is laid out
  across the full assembled poster *including* the gutters, and each sheet renders
  only the part that falls inside its own printable area. The band simply isn't
  drawn. The result is a shape pulled slightly apart at the seams — that is
  correct and it reads fine from throwing distance. **Do not** scale or squeeze the
  art to close the gaps: that bends the silhouette and misaligns every zone.
- **Make the grid look intentional.** Since the seams will be visible, own them:
  give every sheet a thin panel frame in the target's type color, just inside its
  printable edge, so the assembled poster reads as a deliberate six-panel grid
  rather than a poster that didn't line up. This is the single highest-leverage
  thing you can do for how it looks on the fence.
- **Finished poster:** roughly **18 in wide × 34.5 in tall** including laminate
  overhang at the default gutter. Give me the exact numbers your layout produces,
  and recompute them if I change `gutter`.
- **Assembly aids** — with nothing trimmed there is no discard margin, so these
  have to live inside the printed area and be designed, not slapped on. Keep them
  small, muted `--ink-soft`, tucked into the panel frame like a trading-card
  corner index:
  - a **sheet ID** such as `CHARIZARD · R2C1`, bottom-left of each panel
  - a **tiny 6-cell grid glyph** with this sheet's cell filled, bottom-right
  - a small **TOP arrow** on the row-1 sheets only
  Nothing bigger than the smallest text on the scoreboard. From ten feet away
  these should disappear.
- **Calibration page, print this first:** one Letter sheet with a ruled scale
  along all four printable edges and clear instructions to print it, laminate it,
  measure the distance from the printed edge rule to the outer laminate edge, and
  double that number to get my real `gutter`. Pouch seal widths vary by brand and
  my guess of 1.0 in could be off by a quarter inch in either direction — which
  across three rows is an inch of accumulated error in Charizard's neck.

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
- **Zone chips must never land in a gutter.** A zone's natural centroid can fall
  in the dead band between sheets, which would erase its point number entirely.
  Detect that case and push the chip to the nearest spot inside a printable area,
  still within the zone. Do this automatically — I should not have to hand-check
  24-plus zones every time I change `gutter` or swap in new art.
- A zone region itself may span the gutter; that's expected and fine. Draw its
  outline continuous across the band in the layout so the two halves line up when
  the sheets are butted.
- Keep zone outlines and chips at least 0.5 in inside each panel's printable edge,
  so nothing important sits where a corner zip-tie or a curling laminate edge
  will obscure it.

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
- **No trimming at any stage.** Print the sheet, laminate it whole in a standard
  9 × 11.5 in pouch, butt the finished pouches together. Do not put a cut line,
  crop mark, or trim guide anywhere in the design — I will not use them and they
  would print on the visible face.
- Every sheet is mounted independently, so add a **zip-tie mark at all four
  corners of every panel**, not just the poster's outer corners — a small ring
  glyph in the panel frame showing where to punch through the laminate. Six
  sheets, four ties each, straight onto the fence; the fence is the backing.
  That means the poster tolerates one sheet coming loose mid-party, which a
  taped-together slab would not.
- Note in the assembly instructions that punching the laminate **inside the sealed
  border** breaks the water seal at that spot. Put the ring marks so the punch
  lands in the sealed margin, outside the printed panel frame.
- Give me a short **assembly note** at the top of the file: print the calibration
  page, measure, set `gutter`, print all 36, laminate all 36, sort by sheet ID,
  then mount row by row from the top.

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
