# Claude Design — Print Props Verdict (V7 arc)

Thank you for the inventory. It was thorough and the flags were useful — three of
them caught real problems, and I have answers for every open question you raised.

Read this whole document before touching anything. Section 0 is urgent, section 3
is the hard build, and section 6 answers the questions you could not resolve.

---

## 0. Urgent — the code is exposed in two places

You were right to lead with this, and it is worse than a formatting issue.

Under the revised arc **the digits must never be printed at all**. They open a
real combination lock, and the whole Chapter 6 → Oak sequence depends on Luca not
being able to read the answer off anything.

Do this before any other work:

1. **Strip the digits from the assembly sheet's contents table.** Replace the row
   label with a neutral description. That page is the first thing anyone picks
   up, exactly as you said.
2. **Strip the digits from the fragment artwork.** They are replaced by a blank
   hand-lettering field — see section 3.
3. Tell me if the digits exist anywhere else in the document, including layer
   names, artboard names, slug lines, alt text, or comments.

Do not put placeholder digits in the replacement artwork, and do not ask me what
the numbers are.

---

## 1. What changed in the story

**The four fragments are now one object.** They are four broken pieces of a
single **Sky Stone** that fell over Creekside. Rangers Hannah and Noa smashed it
apart so Team Rocket could never take it whole, then set their vault's
combination to the four numbers on the pieces.

**Chapter 1 hands over no fragment and no card.** You were right that the Ranger
Record's removal orphaned the fragment-writing surface — that was deliberate, and
it goes further than you knew. There is no record card, no writing surface, and
no Chapter 1 fragment at all. Luca leaves registration with his License only.

**The chapter mapping moved.** This resolves your least-confident item #1:

| Piece | Chapter | Symbol | Handed over by |
|---|---|---|---|
| Leaf | 2 · Fairy Garden | Leaf | Nina / Ariel |
| Wave | 3 · Oak's preserve | Wave | The Partner Professors |
| Heart | 4 · Pokémon Center | Heart | Nurse Joy |
| Flame | 5 · Team Rocket Base | Flame | Mike |

Chapter 1 yields none; Chapter 5 now yields one. That also resolves your
least-confident item #3.

**The order is now the secret.** This is the single most important change for
you. The correct sequence is what Luca cannot know until Professor Oak shows him.
Nothing printed may disclose or imply it.

**The vault is a locked box, not a chest in a yard.** It is a box on a **luggage
combination lock**, staged at the Rangers' **trampoline** — the closest place to
the sky in their yard. In Chapter 6 Luca finds it and **fails** to open it. That
failure is the intended beat. The lid sends him to Professor Oak, who guides him
through the assembly and lets him dial the lock himself. The vault's whole
contents open there, not at the trampoline.

**Victory Road is now a made-up trick-shot game** ("POKÉ", a HORSE variant) that
Ariel invents live off the backyard play equipment. There are no fixed stations.

**The Champion match is trivia and thanks.** Three Pokémon trivia questions, then
Patrick names every helper present and Luca says what each one did, then one
question about his favourite teammate. This answers your open question about what
follows round 1.

**After the credits**, Patrick asks Luca whether he still remembers the code.
Luca reads the numbers **out loud** off the assembled stone, and that triggers the
Mew epilogue.

---

## 2. Verdict on every piece you listed

| # | Piece | Verdict | Why |
|---|---|---|---|
| 1 | Trainer License (front) | **REVISE** | One conflict — see below |
| 2 | Trainer Oath (back) | **KEEP** | Four lines match the app exactly |
| 3, 5, 12, 14 | Ranger code fragment slips ×4 | **RETIRE** | Replaced entirely — section 3 |
| 4 | Station Sign 1 · League Registration | **KEEP** | Chapter unchanged |
| 6 | Station Sign 2 · Fairy Garden | **KEEP** | See note on your item #2 |
| 7–10 | Research capsule labels 01–04 | **KEEP** | Now fully specified — see §6 |
| 11 | Capsule label backs | **KEEP** | No change |
| 13 | Station Sign 3 · Oak's Lab | **REVISE** | Add the return-visit variant |
| 15 | Station Sign 4 · Pokémon Center | **KEEP** | No change |
| 16 | Station Sign 5 · Team Rocket | **KEEP** | Copy still accurate |
| 17 | Station Sign 6 · Secret Ranger Vault | **REVISE** | Location and sky clue |
| 18–20 | Type-choice cards ×3 | **REVISE** | Becomes one of three trivia questions |
| 21 | Station Sign 7 · Victory Road | **REVISE** | Ariel's title, no stations |
| 22 | Print & Assembly sheet | **REVISE** | Urgent, §0. Also stale footer |
| 23 | Cut marks | **KEEP** | No change |
| — | Ranger Record (dropped) | **STAYS DROPPED** | Correctly retired |

### Piece 1 — the one conflict

The License prints **"Buddy · Tropius"**, but the app still opens with a live
avatar picker offering six choices: Tropius, Pikachu, Mega Charizard Y, Mega
Lucario, Mega Blastoise, Mega Mewtwo X. If Luca picks Mewtwo, his printed license
contradicts his screen on the first screen of the morning.

Pick one:

- **(a)** Leave the buddy portrait well **empty**, and supply six small
  peel-and-stick buddy chips sized to it. Ariel applies the one he picks. My
  recommendation — it makes the choice feel consequential.
- **(b)** Print six complete licenses, one per buddy, and hand over the match.
- **(c)** Drop the buddy field from the card.

Everything else on that card is fine. `CRK-2026-007` conflicts with nothing.

### Your least-confident item #2 — you are not wrong

Pikachu with a psychic icon on a sheet titled Fairy Garden does read as three
signals. But it **matches the app**, which has Chapter 2 as type `psychic` with
`pikachu.png`. That inconsistency is upstream of you. Leave the sign as is; I
will decide separately whether to change the app.

---

## 3. The Sky Fragments — full spec for the replacement

This prop carries the puzzle. Treat it as an engineering problem.

Your existing slips are the right instinct at the wrong scale — "a piece of
something, not a collectible" is exactly right, and I want that kept. But the new
pieces must physically interlock, so they cannot be rectangles.

### What must change from the old slips

- **"1 of 4" must go.** It prints the answer. The ordering is the entire puzzle.
- **"Earned at [location]" must go.** Chapter order implies sequence just as
  plainly as a number does.
- **"Never say it aloud" must go.** The ending now depends on Luca saying the
  numbers out loud after the credits.
- **The printed digit must go**, replaced by a hand-lettering field.
- **The identical backs must go** — the backs now carry the payoff image.

### Behaviour required

1. Four pieces, cut with **jagged interlocking edges that join in exactly one
   arrangement**. Avoid regular or symmetric zigzags — findable by feel, but only
   one fit.
2. **Front of each piece:** its symbol (Leaf / Wave / Heart / Flame) and a blank
   field for one hand-written digit. The four fronts must **not** combine into a
   picture — no front-side cue to the order.
3. **Backs:** when correctly joined and turned over, the four backs form **one
   complete Sky Stone image**. This is the confirmation beat.
4. Turned face up and read **left to right**, the digits give the combination.

### Two things that will ruin the prop

**Mirroring.** Flipping a joined set reverses left-to-right order. The front digit
sequence and the back image must be designed as a **mirrored pair**, so the
arrangement that produces the correct Sky Stone also produces the correct digit
order. Cut one out of paper and test it before committing to final art.

**Registration.** Double-sided registration on jagged shapes is unforgiving.
Deliver as a single sheet showing the assembled stone with the cut path marked —
print once, laminate, then cut. Assume outdoor handling, a pool deck, and a
trampoline.

---

## 4. New pieces the arc now requires

**Chapter 6 set — all new, all load-bearing:**

- **Vault lid label**, exactly: `FOUR PIECES, ONE STONE. TAKE THIS TO PROFESSOR OAK.`
  It is the only instruction Luca gets at the trampoline. Readable at arm's
  length, outdoors, by a new reader.
- **Three Ranger trail symbols** leading to the trampoline. Weatherproof, ground-
  or fence-mountable.
- **Ranger Dispatch** — the document Mike surrenders, which you correctly flagged
  as named-but-never-built. It now carries the reveal: the pieces are one stone,
  the numbers are a combination, and the vault is at the closest place to the sky.
  Field-worn, written by the Rangers. **It must not disclose the order.**
- **Sealed Mega Evolution Research File** — locked inside the vault, opened by
  Monica. Sealed so a child visibly cannot peek.

**Chapter 4 — a gap neither of us listed:** three **patient cards** and three
matching **treatment cards**. Tired Pikachu → Oran Berry; overheated Charmander →
water and rest; frightened Eevee → comfort and a quiet place. Your Sign 4 says
"Three patients waiting" and there is nothing for them to hold.

**Chapter 3:** **Professor Monica's capsule symbol diagram** — a single card
showing all four capsule symbols so Luca can identify the unstable one. It pairs
directly with your existing labels; use the same four icons.

**Chapter 7:** three **trivia question cards** (each with two large answer
choices for when he hesitates), and a **helper roll-call card** for Patrick —
the list of everyone to name in round 2, so nobody standing there gets skipped.
Optional and worth it: **POKÉ letter cards** (P, O, K, É) held up as Ariel loses
each round. The visible tally is most of the comedy.

**Epilogue:** three **Mew footprint / pink-energy markers**.

**Awards:** **seven** badges, not eight — Trainer License, Fairy, Water Research,
Care, Rocket, Ranger Vault, Champion. League Authorization is not a badge; it is
a separate card, alongside the **League Qualification seal** and the **Sky Pillar
coordinates** card.

**Packaging:** eleven package labels — TRAINER KIT · FAIRY GYM REWARD · WATER
RESEARCH CAPSULES 1–4 · PROFESSOR OAK'S FIRST PARTNER FILE · POKÉMON CENTER FIELD
KIT · RECOVERED TEAM ROCKET LOOT · SECRET RANGER CACHE · MEGA EVOLUTION RESEARCH
FILE · POKÉMON LEAGUE CHAMPION CHEST · MYTHICAL ENCOUNTER · FINAL FAMILY
CELEBRATION — plus three disposition stickers used across all of them: `OPEN NOW`,
`CARRY FOR LATER`, `SAVE FOR CELEBRATION`. Plus a **Booster Satchel** label, since
sealed packs accumulate in it all morning.

**Station sign for Oak's return.** Chapter 3's location is visited twice, and the
second visit is now the largest beat of the morning. A "Station 3 · Return"
variant, or a companion sign.

---

## 5. Your lanyard suggestion — yes, and it is now more important

You flagged a loose License as the cheapest fix worth making. Under the new arc it
is close to mandatory, for a different reason: Luca now carries **four small
laminated pieces** from Chapter 2 through Chapter 6, across a pool deck and a
trampoline. Lose one and the puzzle is unsolvable.

Design a **fragment pouch or zip sleeve** on the lanyard, sized for four pieces
plus the License. Treat it as required, not optional.

---

## 6. Answers to everything you could not resolve

**What is inside the research capsules.** Now specified. Four capsules: one holds
**Sky Fragment 2 (Wave)**, one a booster pack, one a water-themed mini tin, one a
decoy. Retrieval order does not matter; the count does.

**What makes capsule 04 "unstable."** Your inference was right and it is now
canon — the unstable capsule is the one holding the Sky Fragment. Keep that copy.
Bruce asks Luca to identify which capsule holds the unstable energy from its
symbol, which is why the diagram in section 4 exists.

**What the Chapter 6 chest and lock are.** A box closed with a **luggage
combination lock**, four digits, staged at the trampoline. Not a dial safe, not a
padlock with a key, not an adult-opened box.

**Whether badges are a printed prop.** Yes, printed. Seven of them.

**What follows Champion round 1.** Round 2 is Heart — naming every helper and
what they did. Round 3 is Team — his favourite teammate and why. Round 1 is now
trivia rather than a type choice, which is why pieces 18–20 are revised rather
than kept.

**Whether station signs go outdoors.** Yes, all of them. Laminate.

**Whether the assembly sheet belongs in the same document.** Your instinct was
right — split it out. It is the only adult-facing sheet in a pack that a child
will be near all morning, and it is the page that leaked the code.

**Adult run-of-show — do not build this.** It already exists. The repository
generates per-character cast guides at `cast/`, printed to PDF from a browser.
They carry each performer's lines, steps, fallbacks, and reward handoffs. Leave
them alone.

---

## 7. Standing constraints

- **Never print, store, or request the four digits.** Hand-lettering fields only.
- **Never disclose or imply the fragment order** on any printed surface.
- **Do not spoil the arc.** Nothing printed before Chapter 5 may hint that the
  fragments are one object, that they are a combination, or that a vault exists.
- **Preserve the existing visual identity.** Evolve it; do not rebrand.
- **Outdoor readability** in August daylight, at a child's arm's length.
- **No surnames, addresses, phone numbers, or household details.**

## 8. Order of work

1. Section 0 — strip the digits from both places, and report where else they live.
2. The four Sky Fragments, including the paper mirroring test before final art.
3. The Chapter 6 set — lid label, trail symbols, Dispatch, sealed file.
4. The Chapter 4 patient and treatment cards.
5. Everything else in section 4.
6. Revisions to pieces 1, 13, 17, 18–20, 21, 22.
