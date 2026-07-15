/* Shared Pokémon roster + deterministic per-guest random picker.
   Loaded by BOTH the invite generator and the name-tag generator, so the
   same guest name always gets the same Pokémon on every material.
   Paths are relative to assets/ — callers prefix with their own base. */
(function () {
  window.TJ_ROSTER = {
    ray:   "pokemon/mega-rayquaza.png",
    zardY: "pokemon/mega-charizard-y.png",
    zardX: "pokemon/mega-charizard-x.png",
    mmx:   "pokemon/mega-mewtwo-x.png",
    mmy:   "pokemon/mega-mewtwo-y.png",
    geng:  "pokemon/mega-gengar.png",
    blast: "pokemon/mega-blastoise.png",
    luc:   "pokemon/mega-lucario.png",
    pika:  "stickers/pikachu-holo.png",
    mewtwo:"pokemon/mewtwo.png",
  };
  // Deterministic PRNG seeded from the guest's name (case/space-insensitive).
  function seed(name) {
    let h = 2166136261;
    const s = (name || "trainer").toLowerCase().replace(/\s+/g, "");
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return function () { // xorshift32
      h ^= h << 13; h ^= h >>> 17; h ^= h << 5;
      return ((h >>> 0) % 100000) / 100000;
    };
  }
  /* Returns `count` distinct roster keys, stable for a given name. */
  window.tjPickPokemon = function (name, count) {
    const keys = Object.keys(window.TJ_ROSTER);
    const rnd = seed(name);
    for (let i = keys.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [keys[i], keys[j]] = [keys[j], keys[i]];
    }
    return keys.slice(0, Math.min(count || keys.length, keys.length));
  };
})();
