/* Simple, forgiving mini-games. Each calls onResult(true|false).
   Exposed via window.MiniGame. Ported from /project/ui_kits/web-app/MiniGames.jsx. */
const MG_ART = (window.LUCA_CONFIG && window.LUCA_CONFIG.artBase) || "../assets/pokemon/";

function TapBall({ onResult }) {
  // Tap the shaking Poké Ball 3 times to catch it.
  const [taps, setTaps] = React.useState(0);
  React.useEffect(() => { if (taps >= 3) onResult(true); }, [taps]);
  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ margin: "0 0 12px", fontFamily: "var(--font-body)", fontWeight: 700 }}>Tap the Poké Ball to catch it! ({taps}/3)</p>
      <button onClick={() => setTaps((t) => t + 1)} aria-label="Catch"
        style={{ border: "none", background: "transparent", cursor: "pointer", padding: 8, borderRadius: 999,
          animation: taps < 3 ? "mg-shake .5s ease-in-out infinite" : "none" }}>
        <img src={MG_ART + "pokeball.png"} alt="Poké Ball" style={{ width: 92, filter: "drop-shadow(0 8px 16px rgba(27,36,48,.3))" }} />
      </button>
      <style>{`@keyframes mg-shake{0%,100%{transform:rotate(-8deg)}50%{transform:rotate(8deg)}}@media(prefers-reduced-motion:reduce){[style*="mg-shake"]{animation:none!important}}`}</style>
    </div>
  );
}

function TypeMatch({ onResult }) {
  // Match the type to the right colored dot.
  const target = "water";
  const opts = ["fire", "water", "grass"];
  const [pick, setPick] = React.useState(null);
  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ margin: "0 0 14px", fontFamily: "var(--font-body)", fontWeight: 700 }}>Which type is <em>Water</em>?</p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        {opts.map((o) => (
          <button key={o} onClick={() => { setPick(o); onResult(o === target); }}
            style={{ cursor: "pointer", border: `2px solid ${pick === o ? "var(--mewtwo-x)" : "var(--silver)"}`,
              background: "#fff", borderRadius: 999, padding: 4 }}>
            <TypeChip type={o} />
          </button>
        ))}
      </div>
    </div>
  );
}

function ShadowGuess({ onResult }) {
  // Guess which Pokémon casts the shadow (real sprite, blacked out until answered).
  const [pick, setPick] = React.useState(null);
  const answered = pick !== null;
  const opts = [{ img: "tropius.png", nm: "Tropius", ok: true }, { img: "pikachu.png", nm: "Pikachu", ok: false }, { img: "mega-gengar.png", nm: "Mega Gengar", ok: false }];
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ marginBottom: 12 }}>
        <img src={MG_ART + "tropius.png"} alt="Mystery Pokémon" style={{ width: 96, filter: answered ? "none" : "brightness(0) opacity(.85)", transition: "filter .4s" }} />
      </div>
      <p style={{ margin: "0 0 12px", fontFamily: "var(--font-body)", fontWeight: 700 }}>Who casts this shadow?</p>
      <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
        {opts.map((o) => (
          <button key={o.nm} onClick={() => { setPick(o.nm); onResult(o.ok); }} title={o.nm}
            style={{ cursor: "pointer", border: `2px solid ${pick === o.nm ? "var(--mewtwo-x)" : "var(--silver)"}`,
              background: "#fff", borderRadius: 12, padding: 8, width: 72, height: 72 }}>
            <img src={MG_ART + o.img} alt={o.nm} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </button>
        ))}
      </div>
    </div>
  );
}

function MemoryGame({ onResult }) {
  // Tap the glowing ball.
  const [target] = React.useState(() => Math.floor(Math.random() * 3));
  const balls = ["greatball.png", "ultraball.png", "masterball.png"];
  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ margin: "0 0 14px", fontFamily: "var(--font-body)", fontWeight: 700 }}>Tap the glowing Ball!</p>
      <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
        {[0, 1, 2].map((i) => (
          <button key={i} onClick={() => onResult(i === target)}
            style={{ cursor: "pointer", border: "none", background: "transparent", padding: 4,
              filter: i === target ? "drop-shadow(0 0 12px var(--mega-glow)) drop-shadow(0 0 4px #fff)" : "grayscale(.7) opacity(.65)" }}>
            <img src={MG_ART + balls[i]} alt="" style={{ width: 60 }} />
          </button>
        ))}
      </div>
    </div>
  );
}

function MiniGame({ activityType, onResult }) {
  switch (activityType) {
    case "type-match": return <TypeMatch onResult={onResult} />;
    case "shadow-guess": return <ShadowGuess onResult={onResult} />;
    case "memory": return <MemoryGame onResult={onResult} />;
    case "tap-ball":
    default: return <TapBall onResult={onResult} />;
  }
}

window.MiniGame = MiniGame;
