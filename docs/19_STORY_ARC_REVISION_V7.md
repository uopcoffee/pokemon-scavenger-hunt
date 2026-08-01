# 19. Story Arc Revision (V7)

This revision supersedes the code-fragment arc, the Victory Road course, and the
Champion match wherever earlier docs disagree. Everything not listed here is
unchanged.

## 1. No blank code card

Chapter 1 no longer hands Luca a Ranger Code Record Card. There is no such prop,
in the app or in real life. He leaves League Registration with his Trainer Kit
and nothing he cannot explain.

Supersedes: `02` Ch1 quest item, `06` Ariel's prop list, `10` Trainer Kit,
`16`, `18`.

## 2. The four fragments are one Sky Stone

The four "code fragments" are now four broken pieces of a single **Sky Stone**
that fell over Creekside. Rangers Hannah and Noa smashed it into four and hid
the pieces so Team Rocket could never take it whole — and set their door code to
the four numbers stamped on the backs.

| # | Chapter | Symbol | Given by |
|---|---|---|---|
| 1 | Fairy Garden | Leaf | Nina / Ariel |
| 2 | Oak's Water Lab | Wave | The Partner Professors |
| 3 | Pokémon Center | Heart | Nurse Joy |
| 4 | Team Rocket Base | Flame | Mike |

Each physical fragment carries its symbol on the front and one private digit on
the back. The app records the symbol only. **The real digits still exist nowhere
in this repository.**

The separate "Sky Fragment prop" from Chapter 3 is gone — it was the same object
as fragment 2. The Team Rocket phone-glitch at the pool is also gone; Team Rocket
now intercepts at the Pokémon Center, as the runtime already did.

Supersedes: `02` Ch3/Ch4 quest items and app updates, `03` gift map rows,
`10` package contents, `12` symbol audit.

## 3. The reveal belongs to Mike

Luca receives fragment 1 with no explanation beyond the words "Sky Fragment."
Nobody explains further until **Chapter 5**, where Mike surrenders fragment 4
and delivers the whole answer: four pieces of one stone, and the four numbers
open the Rangers' door. This is the single largest reveal of the morning and it
is scripted in `cast-core.js` (`rocket.challengeSteps`) and on Mike's printed
page.

Chapter 6 opens the door with those numbers. Inside, the sealed file is marked
**RETURN TO PROFESSOR OAK — DO NOT OPEN**, which is what sends Luca back to the
lab.

At the Oak return checkpoint, Luca fits all four fragments together into the
assembled Sky Stone. That assembly is the payoff for the whole morning — the
Professors identify it as fallen Sky Pillar rock and name Mega Rayquaza.

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

Luca turns his four fragments over and reads the numbers out loud himself. On
the fourth number the Phone Captain opens the epilogue and the screen glitches:
the fragments were never only a door key — spoken in order, they are a signal,
and something has answered it.

This is why Luca must keep the assembled Sky Stone through the Champion chapter.
The Champion Chest handoff says so explicitly.

Runtime: the epilogue's first scene is now `champion-code-question`, ahead of
`mew-glitch`. Everything after it is unchanged.

## 7. Security, unchanged

The four digits exist only on the backs of the four physical fragments. They are
not in the app, this repository, its tests, its assets, or these docs, and the
app never asks for them.
