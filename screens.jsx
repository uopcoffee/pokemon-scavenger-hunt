/* Web-app screens + orchestrator. Exposes window.TrainerApp.
   Immersive "energy field" look: bright glassy cards float on a type-colored
   glowing field. Ported from /project/ui_kits/web-app/Screens.jsx. */

const FIELD = { grass: "var(--field-grass)", water: "var(--field-water)", psychic: "var(--field-psychic)", fire: "var(--field-fire)", electric: "var(--field-electric)", normal: "var(--field-normal)" };
const ART = (window.LUCA_CONFIG && window.LUCA_CONFIG.artBase) || "assets/pokemon/";
const STICKERS = "assets/stickers/";

const shell = { maxWidth: 560, margin: "0 auto", minHeight: "100%", display: "flex", flexDirection: "column", position: "relative", zIndex: 1 };
const pad = { padding: "24px", flex: 1, display: "flex", flexDirection: "column" };

/* Energy-field background wrapper */
function Field({ type, hero, children, style = {} }) {
  const bg = hero ? "var(--field-hero)" : (FIELD[type] || "var(--field-psychic)");
  return (
    <div style={{ minHeight: "100%", background: bg, position: "relative", overflow: "hidden", ...style }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "var(--field-grid)", backgroundSize: "var(--field-grid-size)", pointerEvents: "none", zIndex: 0 }} />
      <Icon name="energy-shard" size={220} color="#fff" style={{ position: "absolute", top: "-40px", right: "-70px", opacity: 0.08, animation: "tj-burst-spin 40s linear infinite", zIndex: 0 }} />
      <Icon name="energy-shard" size={150} color="#fff" style={{ position: "absolute", bottom: "40px", left: "-50px", opacity: 0.07, animation: "tj-burst-spin 50s linear infinite reverse", zIndex: 0 }} />
      {children}
    </div>
  );
}

/* Big glowing hero medallion */
function HeroMedallion({ children, size = 260 }) {
  return (
    <div style={{ position: "relative", width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
      <span aria-hidden style={{ position: "absolute", inset: "-6%", borderRadius: "50%", background: "radial-gradient(circle, rgba(184,146,255,.65), rgba(184,146,255,0) 65%)", animation: "tj-burst-pulse 3.5s ease-in-out infinite" }} />
      <span aria-hidden style={{ position: "absolute", width: "128%", height: "128%", background: "conic-gradient(from 0deg,#fff0 0deg,#ffffff55 22deg,#fff0 44deg,#ffffff55 66deg,#fff0 88deg,#ffffff55 110deg,#fff0 132deg,#ffffff55 154deg,#fff0 176deg,#ffffff55 198deg,#fff0 220deg)", borderRadius: "50%", opacity: 0.5, animation: "tj-burst-spin 22s linear infinite" }} />
      <div style={{ position: "relative", width: "82%", height: "82%", borderRadius: "50%", background: "radial-gradient(circle at 50% 38%, #ffffff, #EEF0FA)", boxShadow: "var(--glow-soft-white)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>{children}</div>
    </div>
  );
}

/* ---------- Splash ---------- */
function Splash({ onStart }) {
  return (
    <Field hero>
      <div style={{ ...shell }}>
        <div style={{ ...pad, justifyContent: "center", alignItems: "center", textAlign: "center", gap: 10 }}>
          <div style={{ animation: "tj-float 5s ease-in-out infinite" }}>
            <HeroMedallion size={230}><HeroArt src={STICKERS + "tropius.png"} label="Tropius" size={150} bob /></HeroMedallion>
          </div>
          <div style={{ fontFamily: "var(--font-label)", fontSize: "0.85rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--banana)", fontWeight: 700, marginTop: 6, display: "flex", alignItems: "center", gap: 10 }}>
            <img src={ART + "mega-icon.png"} alt="" style={{ width: 22, height: 22 }} />Luca's<img src={ART + "mega-icon.png"} alt="" style={{ width: 22, height: 22, transform: "scaleX(-1)" }} />
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontStyle: "italic", fontSize: "3rem", lineHeight: 0.95, margin: "0 0 8px", color: "#fff", textShadow: "0 4px 24px rgba(138,79,255,.6), 0 2px 3px rgba(0,0,0,.3)" }}>
            TRAINER <span style={{ color: "var(--banana)" }}>JOURNEY</span>
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.0625rem", lineHeight: 1.5, color: "rgba(255,255,255,.85)", maxWidth: 360, margin: "0 0 26px" }}>
            Clear every stop, win every challenge, and claim your Trainer title!
          </p>
          <Button variant="reward" size="lg" icon="arrow-right" block onClick={onStart} style={{ maxWidth: 360 }}>Begin your journey</Button>
        </div>
      </div>
    </Field>
  );
}

/* ---------- Onboarding ---------- */
function Onboarding({ config, onDone }) {
  const [name, setName] = React.useState("");
  const [avatar, setAvatar] = React.useState(config.avatars[0]);
  return (
    <Field hero>
      <div style={{ ...shell }}>
        <div style={{ ...pad, gap: 18 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontStyle: "italic", fontSize: "2.1rem", margin: "8px 0 0", color: "#fff", textShadow: "0 2px 12px rgba(0,0,0,.3)" }}>Become a Trainer</h2>
          <div style={{ background: "#fff", borderRadius: "var(--r-card)", padding: 18, boxShadow: "var(--shadow-float)" }}>
            <Input label="What's your name, Trainer?" placeholder="Type your name" value={name} onChange={(e) => setName(e.target.value)} />
            <div style={{ marginTop: 16 }}>
              <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, marginBottom: 10, color: "var(--ink)" }}>Pick your starter</div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {config.avatars.map((a) => (
                  <button key={a.id} onClick={() => setAvatar(a)} aria-pressed={avatar.id === a.id} title={a.name}
                    style={{ cursor: "pointer", width: 72, height: 72, borderRadius: "14px", background: avatar.id === a.id ? "radial-gradient(circle at 50% 35%,#F7F5FF,#EEE7FF)" : "var(--paper-alt)",
                      border: "none", boxShadow: avatar.id === a.id ? "inset 0 0 0 3px var(--mewtwo-x), var(--glow-violet)" : "inset 0 0 0 2px var(--silver)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .15s", padding: 6 }}>
                    <img src={ART + a.img} alt={a.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <TrainerCard name={name || "Trainer"} avatarSrc={ART + avatar.img} badges={0} totalBadges={config.stops.length} style={{ maxWidth: "none" }} />
          <div style={{ marginTop: "auto", paddingTop: 12 }}>
            <Button variant="reward" size="lg" icon="arrow-right" block disabled={!name.trim()} onClick={() => onDone({ name: name.trim(), avatar })}>Start the hunt</Button>
          </div>
        </div>
      </div>
    </Field>
  );
}

/* ---------- Quest Map ---------- */
function QuestMap({ config, trainer, earned, onOpenStop }) {
  const stops = config.stops;
  const activeType = stops[Math.min(earned, stops.length - 1)].type;
  return (
    <Field type={activeType}>
      <div style={{ ...shell }}>
        <Header total={stops.length} earned={earned} iconSrc={ART + "mega-icon-violet.png"} style={{ background: "rgba(255,255,255,.92)", backdropFilter: "blur(6px)" }} />
        <div style={{ ...pad, gap: 16 }}>
          <TrainerCard name={trainer.name} avatarSrc={ART + trainer.avatar.img} badges={earned} totalBadges={stops.length} style={{ maxWidth: "none" }} />
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontStyle: "italic", fontSize: "1.6rem", margin: "4px 0 0", color: "#fff", textShadow: "0 2px 10px rgba(0,0,0,.3)" }}>Your Quest Map</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {stops.map((s, i) => {
              const done = i < earned, active = i === earned, locked = i > earned;
              return (
                <button key={s.number} disabled={locked} onClick={() => active && onOpenStop(i)}
                  style={{ display: "flex", alignItems: "center", gap: 14, textAlign: "left", cursor: active ? "pointer" : "default",
                    padding: "13px 15px", borderRadius: "var(--r-card)", background: locked ? "rgba(255,255,255,.5)" : "#fff",
                    border: "none", boxShadow: active ? "inset 0 0 0 3px var(--mewtwo-x), var(--shadow-float)" : done ? "var(--shadow-card)" : "none",
                    opacity: locked ? 0.8 : 1, transition: "all .15s" }}>
                  <span style={{ filter: done ? "drop-shadow(0 3px 6px rgba(59,165,93,.5))" : "none", display: "flex" }}>
                    <Icon name={done ? "badge" : locked ? "lock" : "badge-slot"} size={42} color={done ? "var(--tropius-leaf)" : active ? "var(--mewtwo-x)" : "var(--silver)"} style={active ? { animation: "tj-burst-pulse 1.5s ease-in-out infinite" } : undefined} />
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "var(--font-label)", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-soft)", fontWeight: 700 }}>Stop {String(s.number).padStart(2, "0")}</div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontStyle: "italic", fontSize: "1.2rem", color: "var(--ink)" }}>{done || active ? s.name : "? ? ?"}</div>
                  </div>
                  {(done || active) && s.art && <img src={ART + s.art} alt="" style={{ width: 46, height: 46, objectFit: "contain", flex: "none", filter: locked ? "brightness(0) opacity(.3)" : "drop-shadow(0 3px 6px rgba(27,36,48,.25))" }} />}
                  {locked && s.art && <img src={ART + s.art} alt="" style={{ width: 46, height: 46, objectFit: "contain", flex: "none", filter: "brightness(0) opacity(.35)" }} />}
                  {active && <Icon name="arrow-right" size={24} color="var(--mewtwo-x)" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Field>
  );
}

/* ---------- Clue ---------- */
function ClueScreen({ stop, total, onContinue, onBack }) {
  return (
    <Field type={stop.type}>
      <div style={{ ...shell }}>
        <div style={{ ...pad, gap: 16 }}>
          <Button variant="ghost" onClick={onBack} style={{ alignSelf: "flex-start", padding: "6px 8px", color: "#fff", background: "rgba(255,255,255,.16)", fontStyle: "italic" }}>← Quest Map</Button>
          <ClueCard stopNumber={stop.number} totalStops={total} name={stop.name} type={stop.type}
            clueText={stop.clueText} hintText={stop.hintText} nextText={"Go there, then start the challenge!"}
            holo float
            hero={<HeroArt src={stop.art ? ART + stop.art : undefined} glyph="pokeball" color="var(--mewtwo-x)" label="Clue art" size={110} />}
            style={{ maxWidth: "none" }} />
          <Button variant="reward" size="lg" icon="arrow-right" block onClick={onContinue}>I'm here — start challenge</Button>
        </div>
      </div>
    </Field>
  );
}

/* ---------- Activity ---------- */
function ActivityScreen({ stop, onCleared }) {
  const [status, setStatus] = React.useState("idle");
  const [correct, setCorrect] = React.useState(false);
  const instructions = { "tap-ball": "Catch the Pokémon to prove your skill!", "type-match": "Match the energy type below.", "shadow-guess": "Guess the Pokémon from its shadow.", "memory": "Watch closely and tap the right one." }[stop.activityType];
  return (
    <Field type={stop.type}>
      <div style={{ ...shell }}>
        <div style={{ ...pad, gap: 16, justifyContent: "center" }}>
          <ActivityShell stopNumber={stop.number} name={stop.name} type={stop.type} instructions={instructions}
            status={status} float style={{ maxWidth: "none" }}
            onCheck={() => setStatus(correct ? "success" : "retry")}
            onContinue={onCleared}>
            {window.MiniGame ? React.createElement(window.MiniGame, { activityType: stop.activityType, onResult: (ok) => { setCorrect(ok); if (ok) setStatus("success"); } }) : <Spinner label="Loading game…" />}
          </ActivityShell>
        </div>
      </div>
    </Field>
  );
}

/* ---------- Finale ---------- */
function Finale({ trainer, total, onRestart }) {
  return (
    <Field hero style={{ background: "radial-gradient(130% 100% at 50% -10%, #F4D976 0%, #B8922E 38%, #3a2c0c 100%)" }}>
      <div style={{ ...shell }}>
        <div style={{ ...pad, justifyContent: "center", alignItems: "center", textAlign: "center", gap: 16, position: "relative" }}>
          <img src={STICKERS + "star-1.png"} alt="" style={{ position: "absolute", top: "6%", left: "6%", width: 64, animation: "tj-float 4s ease-in-out infinite" }} />
          <img src={STICKERS + "star-3.png"} alt="" style={{ position: "absolute", top: "12%", right: "8%", width: 52, animation: "tj-bob 5s ease-in-out infinite" }} />
          <img src={STICKERS + "star-6.png"} alt="" style={{ position: "absolute", bottom: "18%", left: "10%", width: 56, animation: "tj-float 4.5s ease-in-out infinite" }} />
          <img src={STICKERS + "pikachu-holo.png"} alt="" style={{ position: "absolute", bottom: "4%", right: "5%", width: 110, animation: "tj-bob 4s ease-in-out infinite" }} />
          <div style={{ fontFamily: "var(--font-label)", fontSize: "0.85rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#fff", fontWeight: 700 }}>★ Champion ★</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontStyle: "italic", fontSize: "2.6rem", lineHeight: 1.02, margin: 0, color: "#fff", textShadow: "0 4px 20px rgba(0,0,0,.35)" }}>Happy Birthday,<br /><span style={{ color: "#FFF3C4" }}>{trainer.name}!</span></h1>
          <div style={{ animation: "tj-float 5s ease-in-out infinite" }}>
            <TrainerCard name={trainer.name} avatarSrc={ART + trainer.avatar.img} champion badges={total} totalBadges={total} />
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.0625rem", color: "rgba(255,255,255,.9)", margin: 0 }}>You're officially a Champion Trainer! 🌟</p>
          <Button variant="reward" onClick={onRestart}>Play again</Button>
        </div>
      </div>
    </Field>
  );
}

/* ---------- Orchestrator ---------- */
function TrainerApp() {
  const config = window.LUCA_CONFIG;
  const total = config.stops.length;
  const [screen, setScreen] = React.useState("splash");
  const [trainer, setTrainer] = React.useState({ name: "", avatar: config.avatars[0] });
  const [earned, setEarned] = React.useState(0);
  const [activeStop, setActiveStop] = React.useState(0);
  const [gift, setGift] = React.useState(false);

  const stop = config.stops[activeStop];
  return (
    <div style={{ height: "100%", overflowY: "auto", background: "var(--field-hero)" }}>
      {screen === "splash" && <Splash onStart={() => setScreen("onboarding")} />}
      {screen === "onboarding" && <Onboarding config={config} onDone={(t) => { setTrainer(t); setScreen("map"); }} />}
      {screen === "map" && <QuestMap config={config} trainer={trainer} earned={earned} onOpenStop={(i) => { setActiveStop(i); setScreen("clue"); }} />}
      {screen === "clue" && <ClueScreen stop={stop} total={total} onBack={() => setScreen("map")} onContinue={() => setScreen("activity")} />}
      {screen === "activity" && <ActivityScreen stop={stop} onCleared={() => setGift(true)} />}
      {gift && <GiftModal open stopName={stop.name} giftLocation={stop.giftLocationText} iconSrc="assets/ui/gift.png"
        nextLabel={activeStop + 1 >= total ? "See your results" : "Next clue"}
        onNext={() => {
          setGift(false);
          const next = Math.max(earned, activeStop + 1);
          setEarned(next);
          if (next >= total) setScreen("finale"); else setScreen("map");
        }} />}
      {screen === "finale" && <Finale trainer={trainer} total={total} onRestart={() => { setEarned(0); setActiveStop(0); setScreen("splash"); }} />}
    </div>
  );
}

window.TrainerApp = TrainerApp;
