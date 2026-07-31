/* Web-app screens + orchestrator. Exposes window.TrainerApp.
   Immersive "energy field" look: bright glassy cards float on a type-colored
   glowing field. Ported from /project/ui_kits/web-app/Screens.jsx. */

const FIELD = { grass: "var(--field-grass)", water: "var(--field-water)", psychic: "var(--field-psychic)", fire: "var(--field-fire)", electric: "var(--field-electric)", normal: "var(--field-normal)" };
const ART = (window.LUCA_CONFIG && window.LUCA_CONFIG.artBase) || "assets/pokemon/";
const STICKERS = "assets/stickers/";

const shell = { maxWidth: 560, margin: "0 auto", minHeight: "100%", display: "flex", flexDirection: "column", position: "relative", zIndex: 1 };
const pad = { padding: "var(--screen-pad)", flex: 1, display: "flex", flexDirection: "column" };

/* Energy-field background wrapper */
function Field({ type, hero, children, style = {}, className = "", audience }) {
  const bg = hero ? "var(--field-hero)" : (FIELD[type] || "var(--field-psychic)");
  return (
    <div className={className} data-audience={audience} style={{ minHeight: "100%", background: bg, position: "relative", overflow: "hidden", ...style }}>
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
  const [name, setName] = React.useState("Luca");
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
          <TrainerCard name={name || "Trainer"} avatarSrc={ART + avatar.img} badges={0} totalBadges={config.stops ? config.stops.length : config.chapters.length} style={{ maxWidth: "none" }} />
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

/* ============================================================
   Creekside V2 configurable application

   The V1 screens above intentionally remain available as
   window.V1TrainerApp while the production chapter engine is active.
   ============================================================ */
window.V1TrainerApp = TrainerApp;

function CreeksideMap({ config, state, dispatch }) {
  const [mapView, setMapView] = React.useState("map");
  const currentChapter = window.CreeksideState.chapterById(state.currentChapterId);
  const activeType = state.activeFlow === "mew"
    ? config.epilogue.type
    : state.activeFlow === "checkpoint"
      ? config.checkpoint.type
      : (currentChapter ? currentChapter.type : "psychic");
  const avatar = config.avatars.find((item) => item.id === state.trainer.avatarId) || config.avatars[0];
  const finalChapterId = config.chapters[config.chapters.length - 1].id;
  const activeChapter = state.activeFlow === "checkpoint"
    ? config.checkpoint
    : state.activeFlow === "mew"
      ? config.epilogue
      : currentChapter;
  const awardArt = (rewardId) => {
    const reward = config.rewards[rewardId] || {};
    if (rewardId === "champion-title") return ART + "masterball.png";
    if (rewardId === "mew-figure") return ART + "mew.png";
    if (reward.category === "badge") return "assets/ui/gym-badge.png";
    if (reward.category === "quest-item") return "assets/items/Bag_Sinnoh_Stone_Sprite.png";
    if (reward.category === "team-card") return ART + "pokeball.png";
    return "assets/items/GiftBox.png";
  };
  return (
    <Field type={activeType} className="creekside-map-field">
      <div className="paper-league-shell" style={{ ...shell }}>
        <Header
          total={config.chapters.length}
          earned={state.completedChapters.length}
          iconSrc={ART + "mega-icon-violet.png"}
          style={{ background: "rgba(255,255,255,.94)", backdropFilter: "blur(6px)" }}
        />
        <div className="paper-league-content" style={{ ...pad, gap: 16 }}>
          <button type="button" className="trainer-record-bar" onClick={() => setMapView(mapView === "map" ? "record" : "map")} aria-expanded={mapView === "record"}>
            <span className="trainer-record-bar__shine" aria-hidden />
            <img src="assets/ui/gym-badge-ink.png" alt="" />
            <span><small>Trainer Record</small><strong>{state.trainer.name || "Luca"}</strong></span>
            <span className="trainer-record-bar__count"><b>{state.earnedBadges.length + state.collectedFragments.length}</b><small>Awards</small></span>
            <span aria-hidden>{mapView === "record" ? "⌃" : "›"}</span>
          </button>

          {mapView === "record" ? (
            <section className="trainer-record-view" aria-label="Trainer Record">
              <TrainerCard
                name={state.trainer.name || "Trainer Luca"}
                avatarSrc={ART + avatar.img}
                badges={state.completedChapters.length}
                totalBadges={config.chapters.length}
                champion={state.completedChapters.includes(finalChapterId)}
                style={{ maxWidth: "none" }}
              />
              <h2>Earned Awards</h2>
              <div className="trainer-award-grid">
                {state.earnedRewards.map((rewardId) => (
                  <div className="trainer-award-tile" key={rewardId}>
                    <img className="trainer-award-tile__frame" src="assets/frames/badge_frame_0.png" alt="" />
                    <img className="trainer-award-tile__art" src={awardArt(rewardId)} alt="" />
                    <strong>{config.rewards[rewardId].label}</strong>
                    <small>{config.rewards[rewardId].category.replace(/-/g, " ")}</small>
                  </div>
                ))}
              </div>
              {state.earnedRewards.length === 0 && <p className="trainer-record-empty">Your first award will appear here after League Registration.</p>}
              <h2>Ranger Fragments</h2>
              <CodeFragmentSlots fragments={config.codeFragments} collectedSlots={state.collectedFragments} />
            </section>
          ) : <>

          {activeChapter && (
            <section className="destination-plate" aria-label="Next destination">
              <div className="destination-plate__label"><span>Go here next</span><b aria-hidden>› › ›</b></div>
              <div className="destination-plate__body">
                <div className="destination-plate__emblem">
                  <img className="destination-plate__frame" src="assets/frames/badge_frame_4.png" alt="" />
                  <img className="destination-plate__art" src={ART + (activeChapter.art || "mega-icon-violet.png")} alt="" />
                  <img className="destination-plate__type" src={`assets/types/${activeChapter.type || activeType}.png`} alt="" />
                </div>
                <div><h2>{activeChapter.locationLabel || activeChapter.name}</h2><small>{state.activeFlow === "chapter" && activeChapter.number ? `Chapter ${activeChapter.number}` : "Special mission"}</small><p>{activeChapter.name}</p></div>
              </div>
              <div className="destination-plate__hint"><img src={ART + "tropius.png"} alt="" /><span>Open the active mission when your adult team is ready.</span></div>
            </section>
          )}

          <h2 className="quest-map-heading" style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontStyle: "italic", fontSize: "1.65rem", margin: "2px 0 0" }}>
            Creekside Region Map
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {config.chapters.map((chapter) => {
              const complete = state.completedChapters.includes(chapter.id);
              const fragmentRequirementMet = !chapter.requiresFragments || state.collectedFragments.length >= chapter.requiresFragments;
              const checkpointRequirementMet = !chapter.requiresCheckpoint || state.checkpointComplete;
              const active = !complete
                && state.activeFlow === "chapter"
                && chapter.id === state.currentChapterId
                && fragmentRequirementMet
                && checkpointRequirementMet;
              const locked = !complete && !active;
              return (
                <React.Fragment key={chapter.id}>
                  <button
                    type="button"
                    className={`creekside-map-card${complete ? " creekside-map-card--complete" : ""}${active ? " creekside-map-card--active" : ""}`}
                    disabled={!active}
                    onClick={() => active && dispatch({ type: "OPEN_CURRENT_CHAPTER" })}
                    data-testid={`chapter-${chapter.number}`}
                  >
                    <Icon
                      name={complete ? "check" : locked ? "lock" : "badge-slot"}
                      size={38}
                      color={complete ? "var(--tropius-leaf)" : active ? "var(--mewtwo-x)" : "var(--silver-deep)"}
                    />
                    <span style={{ flex: 1, minWidth: 0 }}>
                      <small style={{ display: "block", fontFamily: "var(--font-label)", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ink-soft)" }}>
                        Chapter {chapter.number}
                      </small>
                      <strong style={{ display: "block", fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "1.08rem" }}>
                        {locked ? chapter.lockedName : chapter.name}
                      </strong>
                    </span>
                    {chapter.art && <img src={ART + chapter.art} alt="" style={{ width: 46, height: 46, objectFit: "contain", filter: locked ? "brightness(0) opacity(.3)" : "drop-shadow(0 3px 6px rgba(27,36,48,.22))" }} />}
                  </button>
                  {chapter.id === config.checkpoint.afterChapterId && (
                    <button
                      type="button"
                      className={`creekside-map-card${state.checkpointComplete ? " creekside-map-card--complete" : ""}${state.activeFlow === "checkpoint" && !state.checkpointComplete ? " creekside-map-card--active" : ""}`}
                      disabled={state.checkpointComplete || state.activeFlow !== "checkpoint"}
                      onClick={() => dispatch({ type: "OPEN_CHECKPOINT" })}
                      data-testid="oak-return-checkpoint"
                    >
                      <Icon name={state.checkpointComplete ? "check" : state.activeFlow === "checkpoint" ? "sparkle" : "lock"} size={38} color={state.checkpointComplete ? "var(--tropius-leaf)" : "var(--sky)"} />
                      <span style={{ flex: 1, minWidth: 0 }}>
                        <small style={{ display: "block", fontFamily: "var(--font-label)", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ink-soft)" }}>
                          Research checkpoint
                        </small>
                        <strong style={{ display: "block", fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "1.08rem" }}>
                          {state.activeFlow === "checkpoint" || state.checkpointComplete ? config.checkpoint.name : config.checkpoint.lockedName}
                        </strong>
                      </span>
                    </button>
                  )}
                </React.Fragment>
              );
            })}

            {state.mewUnlocked && (
              <button
                type="button"
                className={`creekside-map-card${state.mewComplete ? " creekside-map-card--complete" : ""}${!state.mewComplete ? " creekside-map-card--active" : ""}`}
                onClick={() => dispatch({ type: "OPEN_MEW" })}
                data-testid="mew-epilogue"
              >
                <Icon
                  name={state.mewComplete ? "check" : "sparkle"}
                  size={38}
                  color="var(--mewtwo-x)"
                />
                <span style={{ flex: 1 }}>
                  <small style={{ display: "block", fontFamily: "var(--font-label)", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ink-soft)" }}>Mythical Signal Revealed</small>
                  <strong style={{ display: "block", fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "1.08rem" }}>
                    {config.epilogue.name}
                  </strong>
                </span>
                <img src={ART + config.epilogue.art} alt="" style={{ width: 46, height: 46, objectFit: "contain", filter: "drop-shadow(0 0 10px rgba(184,146,255,.65))" }} />
              </button>
            )}
          </div>
          </>}
        </div>
      </div>
    </Field>
  );
}

function FakeCreditsControl({ scene, onComplete }) {
  const durationMs = scene.durationMs || 10000;
  const [remainingMs, setRemainingMs] = React.useState(durationMs);
  React.useEffect(() => {
    const startedAt = Date.now();
    const timer = setInterval(() => {
      setRemainingMs(Math.max(0, durationMs - (Date.now() - startedAt)));
    }, 100);
    return () => clearInterval(timer);
  }, [durationMs]);
  const ready = remainingMs <= 0;
  return (
    <div className="fake-credits-panel">
      <div className="fake-credits-roll" aria-live="polite">
        <strong>CHAMPION LUCA</strong>
        <span>League Recruiter · Auntie Ariel</span>
        <span>Fairy Gym Leader · Nina</span>
        <span>Professor Oak · Bruce</span>
        <span>Professor Monica · Research Partner</span>
        <span>Nurse Joy · Polly</span>
        <span>Team Rocket Boss · Mike</span>
        <span>Creekside Champion · Patrick</span>
        <span>Pokémon Rangers · Hannah and Noa</span>
      </div>
      <Button variant={ready ? "reward" : "secondary"} block disabled={!ready} onClick={onComplete} data-testid="finish-fake-credits">
        {ready ? "Finish League processing" : `Credits rolling… ${Math.ceil(remainingMs / 1000)}s`}
      </Button>
    </div>
  );
}

function SceneSpecificContent({ config, state, scene }) {
  if (scene.type === "relay-result") {
    const projectedRewardIds = Array.from(new Set(state.earnedRewards.concat(scene.rewardIds || [])));
    const projectedTeam = projectedRewardIds.filter((rewardId) => config.rewards[rewardId] && config.rewards[rewardId].category === "team-card");
    const projectedBadges = projectedRewardIds.filter((rewardId) => config.rewards[rewardId] && config.rewards[rewardId].category === "badge");
    const projectedQuestItems = projectedRewardIds.filter((rewardId) => config.rewards[rewardId] && config.rewards[rewardId].category === "quest-item");
    const projectedInventory = projectedRewardIds.filter((rewardId) => config.rewards[rewardId] && !["team-card", "badge", "quest-item"].includes(config.rewards[rewardId].category));
    const projectedFragments = Number.isInteger(scene.fragmentSlot)
      ? Array.from(new Set(state.collectedFragments.concat(scene.fragmentSlot)))
      : state.collectedFragments;
    return (
      <div className="combined-success">
        {!!scene.revealItems.length && (
          <div className="success-reveal-list" aria-label="Mission achievements">
            {scene.revealItems.map((item, index) => (
              <div key={`${scene.id}-reveal-${index}`} style={{ "--reveal-order": index }}>
                <Icon name="check" size={20} color="var(--tropius-leaf)" />
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        )}
        {!!scene.rewardIds.length && (
          <div className="combined-reward-list">
            {scene.rewardIds.map((rewardId, index) => {
              const reward = config.rewards[rewardId];
              return reward ? (
                <div key={rewardId} className="reward-item" style={{ "--reveal-order": index }}>
                  <Icon name="sparkle" color="var(--gold)" />
                  <strong>{reward.label}</strong>
                  <span className={`reward-disposition reward-disposition--${reward.disposition.toLowerCase().replace(/\s+/g, "-")}`}>{reward.disposition}</span>
                </div>
              ) : null;
            })}
          </div>
        )}
        {Number.isInteger(scene.fragmentSlot) && (
          <div className="combined-fragment">
            <strong>Record physical Fragment {scene.fragmentSlot}</strong>
            <CodeFragmentSlots fragments={config.codeFragments} collectedSlots={projectedFragments} />
            <small>Write the private digit only on the physical Ranger Code Card. The app stores the symbol, never the digit.</small>
          </div>
        )}
        {(scene.rewardIds.length > 0 || Number.isInteger(scene.fragmentSlot)) && (
          <div className="inventory-summary">
            <span><strong>{projectedTeam.length}</strong> team cards</span>
            <span><strong>{projectedBadges.length}</strong> badges</span>
            <span><strong>{projectedQuestItems.length}</strong> quest items</span>
            <span><strong>{projectedInventory.length}</strong> gifts and packs</span>
          </div>
        )}
        {scene.rewardHandoff && (
          <div className="physical-reward-callout">
            <Icon name="sparkle" size={26} color="var(--gold)" />
            <div><strong>Real-world reward handoff</strong><p>{scene.rewardHandoff}</p></div>
          </div>
        )}
        {scene.nextDestination && (
          <div className="next-destination">
            <strong>Next signal</strong>
            <p>{scene.nextDestination}</p>
          </div>
        )}
      </div>
    );
  }

  if (Array.isArray(scene.dialogue)) {
    return (
      <div className="dialogue-lines">
        {scene.dialogue.map((line, index) => <p key={`${scene.id}-line-${index}`}>“{line}”</p>)}
      </div>
    );
  }

  if (Array.isArray(scene.instructions)) {
    return (
      <div className="mission-instructions">
        <ol>
          {scene.instructions.map((instruction, index) => <li key={`${scene.id}-instruction-${index}`}>{instruction}</li>)}
        </ol>
      </div>
    );
  }

  if (scene.type === "code-fragment-record") {
    return (
      <div style={{ marginTop: 16 }}>
        <CodeFragmentSlots fragments={config.codeFragments} collectedSlots={state.collectedFragments} />
        <p style={{ margin: "12px 0 0", padding: 12, borderRadius: "var(--r-sm)", background: "rgba(79,176,229,.12)", border: "1.5px solid var(--sky)", fontSize: ".95rem" }}>
          Keep the real digit on the physical Ranger Code Card. This app records only that Slot {scene.fragmentSlot} was completed.
        </p>
      </div>
    );
  }

  if (scene.type === "fragment-check") {
    return (
      <div style={{ marginTop: 16 }}>
        <CodeFragmentSlots fragments={config.codeFragments} collectedSlots={state.collectedFragments} />
        {state.collectedFragments.length < 4 && (
          <p className="mission-warning">The Ranger Vault remains locked until all four symbolic fragment slots are complete.</p>
        )}
      </div>
    );
  }

  if (Array.isArray(scene.rewardIds)) {
    return (
      <div style={{ display: "grid", gap: 8, marginTop: 16 }}>
        {(scene.rewardIds || []).map((rewardId) => {
          const reward = config.rewards[rewardId];
          return (
            <div key={rewardId} className="reward-item" style={{ display: "flex", gap: 10, alignItems: "center", padding: 12, borderRadius: "var(--r-sm)", background: "rgba(247,201,72,.16)", border: "1.5px solid var(--banana)" }}>
              <Icon name="sparkle" color="var(--gold)" />
              <span style={{ flex: 1, minWidth: 0 }}>
                <strong style={{ display: "block" }}>{reward.label}</strong>
              </span>
              <strong className={`reward-disposition reward-disposition--${reward.disposition.toLowerCase().replace(/\s+/g, "-")}`}>{reward.disposition}</strong>
            </div>
          );
        })}
      </div>
    );
  }

  if (scene.type === "inventory-update") {
    return (
      <div className="inventory-summary">
        <span><strong>{state.team.length}</strong> team cards</span>
        <span><strong>{state.earnedBadges.length}</strong> badges</span>
        <span><strong>{state.questItems.length}</strong> quest items</span>
        <span><strong>{state.inventory.length}</strong> gifts and packs</span>
      </div>
    );
  }

  if (scene.type === "hall-of-heroes") {
    return (
      <div className="hall-of-heroes">
        {(scene.participantIds || []).map((participantId) => {
          const participant = config.participants.find((item) => item.id === participantId);
          return participant ? (
            <div key={participant.id}>
              <Icon name="badge" size={24} color="var(--gold)" />
              <span><strong>{participant.displayName}</strong><small>{participant.role}</small></span>
            </div>
          ) : null;
        })}
      </div>
    );
  }

  if (scene.type === "glitch") {
    return <div className="friendly-glitch" aria-label="Friendly scanner interference"><span>SIGNAL DETECTED</span><small>MYTHICAL ENERGY TRACE</small></div>;
  }

  return null;
}

function AudienceIndicator({ audience, performerName }) {
  const label = audience === "luca"
    ? "Trainer View · Show Luca"
    : audience === "cast"
      ? "Adult Cast Screen · Do Not Show Luca"
      : "Lead Adult Screen · Turn Away from Luca";
  return (
    <div className={`audience-indicator audience-indicator--${audience}`} data-testid="audience-indicator">
      <Icon name={audience === "luca" ? "sparkle" : "lock"} size={18} color="currentColor" />
      <span>{label}</span>
      {performerName && audience !== "luca" && <small>{performerName}</small>}
    </div>
  );
}

function RelayHandoffScreen({ config, sequence, scene, dispatch }) {
  return (
    <Field type={sequence.type} className="relay-field relay-field--luca" audience="luca">
      <div style={{ ...shell }}>
        <div style={{ ...pad, gap: 16, justifyContent: "center" }}>
          <AudienceIndicator audience="luca" />
          <Card
            name={scene.title}
            meta="Ready for the real-world mission"
            hero={<HeroArt src={sequence.art ? ART + sequence.art : undefined} glyph="sparkle" color="var(--mewtwo-x)" label={sequence.name} size={132} bob />}
            burst
            holo
            style={{ maxWidth: "none" }}
            footer={<span>{sequence.name}</span>}
          >
            <p className="luca-story-line">{scene.body}</p>
            <div className="handoff-performer">
              <span>Next up</span>
              <strong>{scene.performerName}</strong>
              <small>{scene.characterName}</small>
            </div>
            <p className="handoff-instruction">The designated adult keeps the phone. Complete the hold, then turn the screen away from Luca.</p>
            <AdultHoldButton
              duration={config.adultHoldMs}
              label={scene.handoffLabel}
              onComplete={() => dispatch({ type: "COMPLETE_RELAY_HOLD" })}
            />
          </Card>
        </div>
      </div>
    </Field>
  );
}

function PrivacyShieldScreen({ sequence, scene, dispatch }) {
  return (
    <Field hero className="relay-field relay-field--adult" audience="adult">
      <div style={{ ...shell }}>
        <div style={{ ...pad, justifyContent: "center" }}>
          <section className="relay-shield" data-testid="privacy-shield" aria-labelledby="privacy-shield-title">
            <AudienceIndicator audience="adult" performerName={scene.performerName} />
            <div className="relay-shield__icon" aria-hidden><Icon name="lock" size={64} color="var(--banana)" /></div>
            <p className="relay-shield__eyebrow">Private cue ahead</p>
            <h1 id="privacy-shield-title">Turn the Screen Away</h1>
            <p>Turn the phone away from Luca.</p>
            <Button
              variant="reward"
              size="lg"
              block
              onClick={() => dispatch({ type: "ADVANCE_SCENE" })}
              data-testid="open-cast-cue"
            >
              Phone is turned away — open private cue
            </Button>
            <small>The next screen contains short speaking lines and live challenge steps.</small>
          </section>
        </div>
      </div>
    </Field>
  );
}

function CastCueScreen({ config, sequence, scene, dispatch }) {
  return (
    <div className="runtime-cast-screen" data-audience="cast" data-testid="cast-cue-screen">
      <div className="runtime-cast-screen__shell">
        <AudienceIndicator audience="cast" performerName={scene.performerName} />
        <header className="runtime-cast-header">
          <p>Active performer</p>
          <h1>{scene.performerName}</h1>
          <strong>{scene.characterName}</strong>
          {scene.supportingRole && <small>{scene.supportingRole}</small>}
          <div className="runtime-cast-meta">
            <span><b>Phone Captain</b>{scene.phoneCaptain}</span>
            {scene.waterSafetyAdult && <span><b>Water Safety Adult</b>{scene.waterSafetyAdult}</span>}
          </div>
        </header>

        <section className="runtime-cue-card">
          <span>1. Say This</span>
          <div className="runtime-spoken-lines">
            {scene.spokenLines.map((line, index) => <blockquote key={`${scene.id}-spoken-${index}`}>“{line}”</blockquote>)}
          </div>
        </section>

        <section className="runtime-cue-card">
          <span>2. Help Luca Do This</span>
          <ol>
            {scene.helpLucaSteps.map((step, index) => <li key={`${scene.id}-step-${index}`}>{step}</li>)}
          </ol>
        </section>

        <div className="runtime-cue-grid">
          <section className="runtime-cue-box runtime-cue-box--success">
            <strong>3. When He Finishes</strong>
            <p>{scene.whenFinished}</p>
          </section>
          <section className="runtime-cue-box runtime-cue-box--fallback">
            <strong>4. Easy Backup</strong>
            <p>{scene.easyBackup}</p>
          </section>
        </div>

        <div className="runtime-cast-completion">
          <p><strong>Phone Captain: {scene.phoneCaptain}.</strong> Keep the phone; the performer does not need to operate it.</p>
          <AdultHoldButton
            duration={config.adultHoldMs}
            label={scene.completionLabel}
            onComplete={() => dispatch({ type: "COMPLETE_RELAY_HOLD" })}
          />
        </div>
      </div>
    </div>
  );
}

function ReturnToPlayerScreen({ sequence, scene, dispatch }) {
  return (
    <Field hero className="relay-field relay-field--adult" audience="adult">
      <div style={{ ...shell }}>
        <div style={{ ...pad, justifyContent: "center" }}>
          <section className="relay-shield relay-shield--return" data-testid="return-to-player" aria-labelledby="return-player-title">
            <AudienceIndicator audience="adult" performerName={scene.performerName} />
            <div className="relay-shield__icon" aria-hidden><Icon name="pokeball" size={68} color="var(--banana)" /></div>
            <p className="relay-shield__eyebrow">Mission result ready</p>
            <h1 id="return-player-title">Turn the Screen Back to Luca</h1>
            <p>The adult may keep holding the phone. Make sure Luca can see the next screen before continuing.</p>
            <Button
              variant="reward"
              size="lg"
              block
              onClick={() => dispatch({ type: "ADVANCE_SCENE" })}
              data-testid="reveal-mission-result"
            >
              Luca can see the screen — reveal mission result
            </Button>
          </section>
        </div>
      </div>
    </Field>
  );
}

function CreeksideScene({ config, state, dispatch }) {
  const sequence = window.CreeksideState.activeSequence(state);
  const scene = window.CreeksideState.currentScene(state);
  if (!sequence || !scene || config.audiences.indexOf(scene.audience) === -1) {
    return (
      <Field hero>
        <div style={{ ...shell, ...pad }}>
          <Card name="Mission Recovery"><p>This scene could not be loaded safely.</p><Button onClick={() => dispatch({ type: "BACK_TO_MAP" })}>Return to map</Button></Card>
        </div>
      </Field>
    );
  }

  if (scene.type === "cast-handoff") {
    return <RelayHandoffScreen config={config} sequence={sequence} scene={scene} dispatch={dispatch} />;
  }
  if (scene.type === "privacy-shield") {
    return <PrivacyShieldScreen sequence={sequence} scene={scene} dispatch={dispatch} />;
  }
  if (scene.type === "cast-cue") {
    return <CastCueScreen config={config} sequence={sequence} scene={scene} dispatch={dispatch} />;
  }
  if (scene.type === "return-to-player") {
    return <ReturnToPlayerScreen sequence={sequence} scene={scene} dispatch={dispatch} />;
  }

  const sceneLabel = scene.type.replace(/-/g, " ");
  const isPhysical = scene.type === "physical-challenge";
  const isFakeCredits = scene.type === "fake-credits";
  const isRewardResult = scene.type === "reward";
  const isCelebrationResult = ["relay-result", "reward", "inventory-update", "code-fragment-record", "hall-of-heroes", "celebration", "champion-final"].includes(scene.type);
  const isChampionFinal = scene.type === "champion-final";
  const isLast = state.currentSceneIndex === sequence.scenes.length - 1;
  const continueLabel = isLast
    ? (state.activeFlow === "mew" ? "Finish the adventure" : state.activeFlow === "checkpoint" ? "Complete checkpoint" : "Complete chapter")
    : scene.type === "reward" ? "Add rewards" : "Continue";
  const footerLabel = state.activeFlow === "mew"
    ? "Mythical Signal"
    : state.activeFlow === "checkpoint"
      ? "Oak Return Checkpoint"
      : `Chapter ${sequence.number} · ${sequence.name}`;

  return (
    <Field type={sequence.type} className="luca-scene-field" audience={scene.audience}>
      <div style={{ ...shell }}>
        <div style={{ ...pad, gap: 14 }}>
          <AudienceIndicator audience={scene.audience} performerName={scene.performerName} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
            <Button
              variant="ghost"
              onClick={() => dispatch({ type: "BACK_TO_MAP" })}
              style={{ color: "#fff", background: "rgba(255,255,255,.16)", padding: "8px 12px" }}
            >
              ← Region Map
            </Button>
            <span style={{ fontFamily: "var(--font-label)", color: "#fff", fontWeight: 700, fontSize: ".72rem", letterSpacing: ".08em", textTransform: "uppercase" }}>
              {state.currentSceneIndex + 1} / {sequence.scenes.length}
            </span>
          </div>

          <Card
            className={`luca-scene-card${isCelebrationResult ? " luca-scene-card--result" : ""}`}
            name={scene.title}
            meta={sceneLabel}
            variant={isRewardResult ? "reward" : "clue"}
            foil={isRewardResult ? "gold" : scene.type === "hall-of-heroes" ? "rainbow" : "silver"}
            hero={
              <HeroArt
                src={sequence.art ? ART + sequence.art : undefined}
                glyph={isPhysical ? "badge" : "pokeball"}
                color="var(--mewtwo-x)"
                label={sequence.name}
                size={isCelebrationResult ? 156 : 136}
                bob={scene.type === "character-encounter" || isCelebrationResult}
              />
            }
            burst={scene.type === "reward" || scene.type === "celebration" || scene.type === "hall-of-heroes"}
            holo={scene.type === "reward"}
            float
            style={{ maxWidth: "none" }}
            footer={<span>{footerLabel}</span>}
          >
            {(isRewardResult || scene.type === "relay-result") && (
              <div className="mission-result-burst" role="status">
                <Icon name="sparkle" size={24} color="var(--gold)" />
                <strong>{scene.type === "relay-result" ? (scene.resultLabel || "Challenge complete!") : "Mission complete!"}</strong>
                <span>{scene.type === "relay-result" ? "Story, rewards, and Trainer record updated together" : "New rewards unlocked"}</span>
              </div>
            )}
            {scene.character && (
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 12px", marginBottom: 12, borderRadius: "var(--r-pill)", background: "rgba(138,79,255,.10)", color: "var(--mewtwo-y)", fontFamily: "var(--font-label)", fontWeight: 700 }}>
                <Icon name="sparkle" size={18} color="var(--mewtwo-x)" />
                {scene.character}
              </div>
            )}
            {scene.body && (
              <p style={{ margin: 0, fontSize: "1.08rem", lineHeight: 1.58 }}>
                {isRewardResult ? "Your earned supplies are ready. See what joined your adventure!" : scene.body}
              </p>
            )}
            <SceneSpecificContent config={config} state={state} scene={scene} />
            {scene.successRule && (
              <div className="success-rule"><strong>Success rule</strong><span>{scene.successRule}</span></div>
            )}
            {scene.fallbackText && (
              <div className="fallback-rule"><strong>Adult fallback</strong><span>{scene.fallbackText}</span></div>
            )}
            {isPhysical && (
              <div style={{ marginTop: 18 }}>
                <p style={{ margin: "0 0 12px", fontSize: ".95rem", fontWeight: 700, color: "var(--ink-soft)" }}>{scene.adultPrompt}</p>
                <AdultHoldButton
                  duration={config.adultHoldMs}
                  onComplete={() => dispatch({ type: "COMPLETE_PHYSICAL" })}
                />
              </div>
            )}
            {isFakeCredits && (
              <FakeCreditsControl scene={scene} onComplete={() => dispatch({ type: "ADVANCE_SCENE" })} />
            )}
            {!isPhysical && !isFakeCredits && !isChampionFinal && (
              <Button
                variant={scene.type === "reward" || scene.type === "celebration" ? "reward" : "primary"}
                size="lg"
                icon="arrow-right"
                block
                onClick={() => dispatch({ type: "ADVANCE_SCENE" })}
                style={{ marginTop: 18 }}
                data-testid="continue-scene"
              >
                {continueLabel}
              </Button>
            )}
          </Card>
        </div>
      </div>
    </Field>
  );
}

function ParentMode({ config, state, dispatch, onClose }) {
  const [confirmReset, setConfirmReset] = React.useState(false);
  const [confirmMew, setConfirmMew] = React.useState(false);
  const [restoreText, setRestoreText] = React.useState(() => JSON.stringify(state, null, 2));
  const [restoreError, setRestoreError] = React.useState("");
  const panelRef = React.useRef(null);
  React.useEffect(() => {
    const previouslyFocused = document.activeElement;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab" && panelRef.current) {
        const focusable = Array.from(panelRef.current.querySelectorAll(
          "button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])"
        ));
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused && previouslyFocused.focus && previouslyFocused.focus();
    };
  }, []);
  React.useEffect(() => {
    if (!confirmReset) return undefined;
    const timeout = setTimeout(() => setConfirmReset(false), 5000);
    return () => clearTimeout(timeout);
  }, [confirmReset]);

  const runAndClose = (action) => {
    dispatch(action);
    onClose();
  };
  const currentSequence = window.CreeksideState.activeSequence(state);
  const currentScene = window.CreeksideState.currentScene(state);
  const sequenceDirectory = [
    ...config.chapters.map((sequence) => ({ kind: "chapter", sequence })),
    { kind: "checkpoint", sequence: config.checkpoint },
    { kind: "mew", sequence: config.epilogue },
  ];
  const jumpActionFor = (kind, sequence, sceneIndex) => {
    if (kind === "checkpoint") return { type: "PARENT_JUMP_CHECKPOINT", sceneIndex };
    if (kind === "mew") return { type: "PARENT_JUMP_MEW", sceneIndex };
    return { type: "PARENT_JUMP_SCENE", chapterId: sequence.id, sceneIndex };
  };

  return (
    <div className="parent-mode-overlay" role="dialog" aria-modal="true" aria-labelledby="parent-mode-title">
      <div className="parent-mode-panel" ref={panelRef}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div style={{ fontFamily: "var(--font-label)", color: "var(--mewtwo-x)", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" }}>Adult controls</div>
            <h2 id="parent-mode-title" style={{ margin: "2px 0 0", fontFamily: "var(--font-display)", fontStyle: "italic" }}>Parent Mode</h2>
          </div>
          <Button variant="ghost" onClick={onClose} aria-label="Close Parent Mode" autoFocus>Close</Button>
        </div>

        <section className="parent-current-scene" aria-label="Current scene details">
          <strong>{currentSequence ? currentSequence.name : "Mission recovery"}</strong>
          <span>Scene ID: {currentScene ? currentScene.id : "unavailable"}</span>
          <span>Type: {currentScene ? currentScene.type : "unavailable"}</span>
          <span>Audience: {currentScene ? currentScene.audience : "unavailable"}</span>
          {currentScene && currentScene.performerName && <span>Performer: {currentScene.performerName}</span>}
          {currentScene && currentScene.phoneCaptain && <span>Phone Captain: {currentScene.phoneCaptain}</span>}
          {currentScene && currentScene.waterSafetyAdult && <span>Water Safety Adult: {currentScene.waterSafetyAdult}</span>}
          <small>No keypad code is stored here.</small>
        </section>

        <div className="parent-mode-grid">
          <Button
            variant="primary"
            disabled={state.view !== "scene"}
            onClick={() => runAndClose({ type: "PARENT_ADVANCE" })}
            data-testid="parent-advance"
          >
            Override / advance
          </Button>
          <Button
            variant="secondary"
            disabled={state.view !== "scene" || state.currentSceneIndex === 0}
            onClick={() => runAndClose({ type: "PARENT_BACK_SCENE" })}
          >
            Go back one scene
          </Button>
          <Button variant="secondary" onClick={() => runAndClose({ type: "BACK_TO_MAP" })}>Return to map</Button>
          <Button
            variant="secondary"
            onClick={() => runAndClose({ type: "PARENT_JUMP_CHECKPOINT" })}
          >
            Jump to Oak return
          </Button>
        </div>

        <h3 style={{ fontFamily: "var(--font-display)", margin: "20px 0 10px" }}>Jump to chapter</h3>
        <div className="parent-mode-grid">
          {config.chapters.map((chapter) => (
            <Button
              key={chapter.id}
              variant="secondary"
              onClick={() => runAndClose({ type: "PARENT_JUMP_CHAPTER", chapterId: chapter.id })}
            >
              {chapter.number}. {chapter.name}
            </Button>
          ))}
        </div>

        <h3 style={{ fontFamily: "var(--font-display)", margin: "20px 0 10px" }}>Scene directory</h3>
        <p style={{ margin: "0 0 10px", color: "var(--ink-soft)", fontSize: ".9rem" }}>
          Every entry shows its stable ID, type, audience, and performer. Jumping does not award skipped rewards.
        </p>
        <div className="parent-scene-directory">
          {sequenceDirectory.map(({ kind, sequence }) => (
            <details key={`${kind}-${sequence.id}`} open={currentSequence && currentSequence.id === sequence.id}>
              <summary>{sequence.number ? `${sequence.number}. ` : ""}{sequence.name}</summary>
              <div>
                {sequence.scenes.map((scene, sceneIndex) => (
                  <button
                    type="button"
                    key={scene.id}
                    className={currentScene && currentScene.id === scene.id ? "is-current" : ""}
                    onClick={() => runAndClose(jumpActionFor(kind, sequence, sceneIndex))}
                  >
                    <strong>{scene.title}</strong>
                    <span>{scene.id} · {scene.type} · {scene.audience}</span>
                    {scene.performerName && <small>Performer: {scene.performerName}</small>}
                    {scene.phoneCaptain && <small>Phone Captain: {scene.phoneCaptain}</small>}
                    {scene.waterSafetyAdult && <small>Water Safety Adult: {scene.waterSafetyAdult}</small>}
                  </button>
                ))}
              </div>
            </details>
          ))}
        </div>

        <h3 style={{ fontFamily: "var(--font-display)", margin: "20px 0 10px" }}>Mew surprise</h3>
        {state.championEndingComplete && !state.mewUnlocked && !confirmMew && (
          <Button
            variant="secondary"
            block
            onClick={() => setConfirmMew(true)}
            data-testid="parent-trigger-mew"
          >
            Trigger Mew Signal
          </Button>
        )}
        {state.championEndingComplete && !state.mewUnlocked && confirmMew && (
          <section className="parent-confirm-card" data-testid="confirm-mew-signal">
            <strong>Trigger the Mew Signal now?</strong>
            <p>Only continue after Luca has accepted the Champion ending. This immediately begins the visual signal.</p>
            <div className="parent-mode-grid">
              <Button variant="ghost" onClick={() => setConfirmMew(false)}>Cancel</Button>
              <Button
                variant="primary"
                onClick={() => {
                  if (navigator.vibrate) navigator.vibrate(180);
                  runAndClose({ type: "PARENT_TRIGGER_MEW" });
                }}
                data-testid="confirm-trigger-mew"
              >
                Confirm Mew Signal
              </Button>
            </div>
          </section>
        )}
        {!state.championEndingComplete && (
          <p className="mission-warning">The party-day Mew trigger becomes available only after the convincing Champion ending.</p>
        )}
        {state.mewUnlocked && !state.mewComplete && (
          <Button variant="ghost" block onClick={() => runAndClose({ type: "PARENT_REARM_MEW" })}>
            Mew triggered too early — return to Champion ending
          </Button>
        )}
        <Button
          variant="ghost"
          block
          onClick={() => runAndClose({ type: "PARENT_JUMP_MEW", sceneIndex: 0 })}
        >
          Test Mew trail from first signal
        </Button>

        <h3 style={{ fontFamily: "var(--font-display)", margin: "20px 0 10px" }}>Export or restore progress</h3>
        <textarea
          className="parent-mode-json"
          value={restoreText}
          onChange={(event) => { setRestoreText(event.target.value); setRestoreError(""); }}
          aria-label="Progress JSON"
          spellCheck="false"
        />
        {restoreError && <p className="mission-warning">{restoreError}</p>}
        <Button
          variant="secondary"
          block
          onClick={() => {
            try {
              const parsed = JSON.parse(restoreText);
              runAndClose({ type: "PARENT_RESTORE", state: parsed });
            } catch (error) {
              setRestoreError("That progress text is not valid JSON. Nothing was changed.");
            }
          }}
        >
          Restore validated progress
        </Button>

        <div style={{ marginTop: 24, paddingTop: 18, borderTop: "1px solid var(--silver)" }}>
          <Button
            variant={confirmReset ? "primary" : "ghost"}
            block
            onClick={() => {
              if (!confirmReset) {
                setConfirmReset(true);
                return;
              }
              runAndClose({ type: "RESET" });
            }}
            data-testid="parent-reset"
            style={confirmReset ? { background: "var(--danger)", color: "#fff" } : { color: "var(--danger)" }}
          >
            {confirmReset ? "Confirm: erase all saved progress" : "Reset game progress"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function CreeksideCelebration({ config, state, dispatch }) {
  const avatar = config.avatars.find((item) => item.id === state.trainer.avatarId) || config.avatars[0];
  const savedBoosters = state.earnedRewards
    .map((rewardId) => config.rewards[rewardId])
    .filter((reward) => reward && reward.disposition === "SAVE FOR CELEBRATION");
  return (
    <Field hero style={{ background: "radial-gradient(130% 100% at 50% -10%, #F4D976 0%, #8A4FFF 42%, #241a4d 100%)" }}>
      <div style={{ ...shell }}>
        <div style={{ ...pad, justifyContent: "center", alignItems: "center", textAlign: "center", gap: 16 }}>
          <div style={{ fontFamily: "var(--font-label)", color: "var(--banana)", letterSpacing: ".2em", textTransform: "uppercase", fontWeight: 700 }}>Mythical Encounter Complete</div>
          <h1 style={{ margin: 0, fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "2.4rem", color: "#fff", textShadow: "0 4px 18px rgba(0,0,0,.3)" }}>
            Creekside Champion!
          </h1>
          <TrainerCard
            name={state.trainer.name || "Trainer Luca"}
            avatarSrc={ART + avatar.img}
            badges={config.chapters.length}
            totalBadges={config.chapters.length}
            champion
          />
          <p style={{ color: "#fff", fontSize: "1.08rem", maxWidth: 380 }}>Mew has been registered. Gather the family, bring out the popsicles, and open the saved Booster Satchel together.</p>
          <div className="celebration-satchel">
            <strong>Booster Satchel · {savedBoosters.length} saved groups</strong>
            {savedBoosters.map((reward) => <span key={reward.label}>{reward.label}</span>)}
          </div>
          <Button variant="reward" size="lg" onClick={() => dispatch({ type: "BACK_TO_MAP" })}>View completed map</Button>
          <Button variant="secondary" size="lg" onClick={() => dispatch({ type: "REPLAY_HALL" })}>Replay Hall of Heroes</Button>
          <small style={{ color: "rgba(255,255,255,.75)" }}>Restart is available only inside Parent Mode.</small>
        </div>
      </div>
    </Field>
  );
}

function CreeksideApp() {
  const config = window.CREEKSIDE_CONFIG;
  const stateEngine = window.CreeksideState;
  const [state, dispatch] = React.useReducer(stateEngine.reducer, null, stateEngine.readState);
  const [parentOpen, setParentOpen] = React.useState(false);
  const [storageWarning, setStorageWarning] = React.useState(false);
  const parentTapRef = React.useRef({ count: 0, startedAt: 0 });
  const scrollRootRef = React.useRef(null);

  React.useEffect(() => {
    setStorageWarning(!stateEngine.writeState(state));
  }, [state, stateEngine]);
  React.useEffect(() => {
    if (scrollRootRef.current) scrollRootRef.current.scrollTop = 0;
  }, [state.view, state.currentSceneId]);

  const handleParentTap = () => {
    const now = Date.now();
    const sequence = parentTapRef.current;
    if (!sequence.startedAt || now - sequence.startedAt > 2500) {
      parentTapRef.current = { count: 1, startedAt: now };
      return;
    }
    const nextCount = sequence.count + 1;
    if (nextCount >= 5) {
      parentTapRef.current = { count: 0, startedAt: 0 };
      setParentOpen(true);
      return;
    }
    parentTapRef.current = { count: nextCount, startedAt: sequence.startedAt };
  };

  return (
    <div ref={scrollRootRef} style={{ height: "100%", overflowY: "auto", background: "var(--field-hero)" }}>
      {storageWarning && (
        <div className="storage-warning" role="status">
          Progress cannot be saved on this phone. Keep this page open and use Parent Mode export before continuing.
        </div>
      )}
      {state.view === "splash" && <Splash onStart={() => dispatch({ type: "START_ONBOARDING" })} />}
      {state.view === "onboarding" && (
        <Onboarding
          config={config}
          onDone={(trainer) => dispatch({ type: "SET_TRAINER", name: trainer.name, avatarId: trainer.avatar.id })}
        />
      )}
      {state.view === "map" && <CreeksideMap config={config} state={state} dispatch={dispatch} />}
      {state.view === "scene" && <CreeksideScene config={config} state={state} dispatch={dispatch} />}
      {state.view === "celebration" && <CreeksideCelebration config={config} state={state} dispatch={dispatch} />}

      <button
        type="button"
        className="parent-mode-trigger"
        aria-label="Parent controls"
        onClick={handleParentTap}
        data-testid="parent-mode-trigger"
      >
        Parent controls
      </button>
      {parentOpen && <ParentMode config={config} state={state} dispatch={dispatch} onClose={() => setParentOpen(false)} />}
    </div>
  );
}

window.TrainerApp = CreeksideApp;
