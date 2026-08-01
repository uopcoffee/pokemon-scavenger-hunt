# 19. Story Arc Revision (V7)

This revision supersedes the code-fragment arc, the Victory Road course, and the
Champion match wherever earlier docs disagree. Everything not listed here is
unchanged.

## 1. No blank code card, no deck box

Chapter 1 no longer hands Luca a Ranger Code Record Card. There is no such prop,
in the app or in real life. He leaves League Registration with his Trainer Kit
and nothing he cannot explain.

There is also **no blue deck box** — that item was a mistake. The equipment test
is sleeve → top loader → One-Touch case.

Supersedes: `02` Ch1 quest item and equipment test, `03` and `10` Trainer Kit,
`06` Ariel's prop list, `16`, `18`.

## 2. The four fragments are one Sky Stone

The four "code fragments" are now four broken pieces of a single **Sky Stone**
that fell over Creekside. Rangers Hannah and Noa smashed it into four and hid
the pieces so Team Rocket could never take it whole — then set their vault's
combination to the four numbers written on them.

| # | Chapter | Symbol | Given by |
|---|---|---|---|
| 1 | Fairy Garden | Leaf | Nina / Ariel |
| 2 | Oak's Water Lab | Wave | The Partner Professors |
| 3 | Pokémon Center | Heart | Nurse Joy |
| 4 | Team Rocket Base | Flame | Mike |

### How the props are made

Each fragment carries its symbol **and** one plain digit on the **same face**.
Keep the digits nondescript: no "1 of 4", no slot number, nothing that hints at
the order. On their own the four numbers are meaningless.

Cut the four with **jagged interlocking edges so they join exactly one way**.
That single correct arrangement is the whole puzzle:

- Joined and **turned over**, the backs form the **Sky Stone** image — visual
  proof the arrangement is right.
- Joined **face up and read left to right**, the four digits give the vault
  combination, in order.

Set that combination on the lock and test it before the party. **The real digits
still exist nowhere in this repository.**

The separate "Sky Fragment prop" from Chapter 3 is gone — it was the same object
as fragment 2. The Team Rocket phone-glitch at the pool is also gone; Team Rocket
now intercepts at the Pokémon Center, as the runtime already did.

Supersedes: `02` Ch3/Ch4 quest items and app updates, `03` gift map rows,
`10` package contents, `12` symbol audit.

## 3. The reveal belongs to Mike

Luca receives fragment 1 with no explanation beyond the words "Sky Fragment."
Nobody explains further until **Chapter 5**, where Mike surrenders fragment 4
and delivers the whole answer. This is the single largest reveal of the morning
and it is scripted in `cast-core.js` (`rocket.challengeSteps`) and on Mike's
printed page.

Mike says the numbers are a **combination** and that the Rangers hid their vault
at **the closest place to the sky in their whole yard**. He does *not* say how to
order the numbers — Team Rocket never worked it out either. That answer belongs
to Professor Oak.

## 3b. The vault is a locked box on the trampoline

There is **no keypad and no house entry**. The vault is a box on a **luggage
combination lock**, staged at the Rangers' **trampoline** — nothing in that yard
stands closer to the sky.

Chapter 6 is a find, not an open:

1. Three Ranger symbols lead to the trampoline.
2. Luca recovers the box and **tries the lock himself. It does not open.** That
   failure is the beat — nobody hints at the order.
3. The lid reads: **FOUR PIECES, ONE STONE. TAKE THIS TO PROFESSOR OAK.**
4. One book is strapped to the lid; that is the only thing that opens here.
5. Luca carries the still-locked vault to the lab.

**The SECRET RANGER CACHE therefore opens at Oak's return, not in Chapter 6.**
The gift map and checklist reflect the split.

## 3c. Oak solves the stone and the vault opens

The Oak return checkpoint is no longer a thin callback — it is the payoff for the
whole morning. Oak reads the lid, asks for the pieces, and guides Luca through
the puzzle: join the jagged edges (one fit only), flip to reveal the Sky Stone,
turn it face up, read the numbers left to right. **Luca dials the lock himself
and it opens.**

Out comes the Ranger cache, the sealed Research File, and the Mega Evolution
research reward. Monica names Mega Rayquaza; Oak awards League Authorization.

Budget more than the old eight minutes for this beat — it now carries a puzzle,
a lock, and the largest single reward unpacking of the morning.

Supersedes: `01` and `10` timings for the Oak return, `02` Ch6 security rule and
interaction, `03` gift map, `04` keypad instructions.

## 4. Victory Road is a game of POKÉ

Stage A is no longer four fixed stations. It is a backyard trick-shot contest —
HORSE, but POKÉMON — that **Auntie Ariel invents live**. She does a trick first,
Luca copies it, and Ariel takes a letter every time she misses her own trick.
P, O, K, É and the Elite Four Wild Card is out.

There is nothing to build. She works off the slide, the swings, the ninja
spinners, and the bouncy house, plus any ball or target. Four rounds is the
target; two is fine if the clock is tight. Luca never takes a letter, and Ariel
loses in spectacular fashion.

Supersedes: `02` Ch7 Stage A, `06` Tall Grass line, `10` Victory Road setup,
`11` Ariel's Victory Road script.

## 5. The Champion match is trivia and thanks

Stage C drops the target toss and becomes three rounds:

1. **Knowledge** — three Pokémon trivia questions, two choices offered whenever
   Luca hesitates.
2. **Heart** — Patrick names every helper standing in the yard, one at a time,
   and Luca says what each one did. This round *is* the appreciation. Nobody
   present gets skipped.
3. **Team** — which teammate carried him furthest today, and why.

Then Patrick concedes. Hall of Heroes, group photo, credits — the morning is
allowed to feel genuinely finished.

## 6. The code question triggers Mew

After the credits, once people have started drifting toward the popsicles,
Patrick asks one casual leftover question:

> "Hey — before we put all this away. Do you still remember the code?"

Luca reads the four numbers off the assembled Sky Stone. On the fourth number
the Phone Captain opens the epilogue and the screen glitches:
the fragments were never only a lock combination — spoken in order, they are a
signal, and something has answered it.

This is why Luca must keep the assembled Sky Stone through the Champion chapter.
The Champion Chest handoff says so explicitly.

Runtime: the epilogue's first scene is now `champion-code-question`, ahead of
`mew-glitch`. Everything after it is unchanged.

## 7. Security, unchanged

The four digits exist only on the four physical fragments. They are
not in the app, this repository, its tests, its assets, or these docs, and the
app never asks for them.
