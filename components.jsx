/* Luca's Trainer Journey — component library (production build).
   Plain global functions (no bundler/module system) loaded via Babel
   standalone, same pattern as the original prototype's Screens.jsx.
   Ported from /project/components/** — see that folder for the
   original design-system source with full prop docs. */

/* ---------- core/Icon ---------- */
function Icon({ name = "pokeball", size = 24, color = "currentColor", style = {}, ...rest }) {
  const s = { width: size, height: size, display: "inline-block", verticalAlign: "middle", flex: "none", ...style };
  const stroke = { fill: "none", stroke: color, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "mega-stone":
      return (
        <svg viewBox="0 0 48 48" style={s} {...rest}>
          <path d="M24 3 L38 13 L43 30 L24 45 L5 30 L10 13 Z" fill={color} stroke="#1B2430" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M24 3 L24 45 M10 13 L38 13 M5 30 L43 30 M10 13 L24 24 L38 13 M5 30 L24 24 L43 30" stroke="#FBFCFA" strokeWidth="1.3" strokeOpacity="0.5" fill="none" />
          <path d="M17 22 C21 18 27 18 24 24 C21 30 27 30 31 26" stroke="#FBFCFA" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      );
    case "energy-shard":
      return (
        <svg viewBox="0 0 120 120" style={s} {...rest}>
          <g fill={color}>
            <path d="M60 2 L67 46 L60 40 L53 46 Z" /><path d="M118 58 L74 65 L80 58 L74 51 Z" />
            <path d="M60 114 L53 70 L60 76 L67 70 Z" /><path d="M2 58 L46 51 L40 58 L46 65 Z" />
            <path d="M100 18 L70 50 L74 42 L66 40 Z" /><path d="M20 98 L50 66 L46 74 L54 76 Z" />
          </g>
        </svg>
      );
    case "tropius":
      return (
        <svg viewBox="0 0 48 48" style={s} {...rest}>
          <path d="M8 40 C10 22 24 10 42 8 C40 26 28 40 12 41 C11 41 9 41 8 40 Z" fill={color} stroke="#1B2430" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M12 40 C20 30 30 20 40 12" stroke="#1B2430" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.5" />
        </svg>
      );
    case "badge":
      return (
        <svg viewBox="0 0 48 48" style={s} {...rest}>
          <path d="M24 4 L37 12 L37 30 L24 44 L11 30 L11 12 Z" fill={color} stroke="#1B2430" strokeWidth="2.2" strokeLinejoin="round" />
          <circle cx="24" cy="21" r="4.5" fill="#FBFCFA" fillOpacity="0.85" />
        </svg>
      );
    case "badge-slot":
      return (
        <svg viewBox="0 0 48 48" style={s} {...rest}>
          <path d="M24 4 L37 12 L37 30 L24 44 L11 30 L11 12 Z" fill="#F2F4EF" stroke={color} strokeWidth="2.4" strokeLinejoin="round" />
        </svg>
      );
    case "check": return <svg viewBox="0 0 24 24" style={s} {...rest}><path d="M4 12.5 L9.5 18 L20 6" {...stroke} /></svg>;
    case "arrow-right": return <svg viewBox="0 0 24 24" style={s} {...rest}><path d="M4 12 H19 M13 6 L19 12 L13 18" {...stroke} /></svg>;
    case "lock": return <svg viewBox="0 0 24 24" style={s} {...rest}><rect x="5" y="11" width="14" height="9" rx="2" {...stroke} /><path d="M8 11 V8 a4 4 0 0 1 8 0 v3" {...stroke} /></svg>;
    case "sparkle": return <svg viewBox="0 0 24 24" style={s} {...rest}><path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" fill={color} /></svg>;
    case "pokeball":
    default:
      return (
        <svg viewBox="0 0 48 48" style={s} {...rest}>
          <circle cx="24" cy="24" r="20" fill="#FBFCFA" stroke="#1B2430" strokeWidth="2.4" />
          <path d="M4.4 24 H16 M32 24 H43.6" stroke="#1B2430" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="24" cy="24" r="6.4" fill="#FBFCFA" stroke="#1B2430" strokeWidth="2.4" />
          <circle cx="24" cy="24" r="2.4" fill={color === "currentColor" ? "#1B2430" : color} />
        </svg>
      );
  }
}

/* ---------- core/Button ---------- */
function Button({
  children, variant = "primary", size = "md", icon, block = false,
  disabled = false, loading = false, type = "button", onClick, style = {}, ...rest
}) {
  const base = {
    position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "10px",
    fontFamily: "var(--font-display)", fontWeight: 800, fontStyle: "italic", cursor: disabled || loading ? "not-allowed" : "pointer",
    border: "none", borderRadius: "var(--r-pill)",
    transition: "transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast), filter var(--dur-fast)",
    outlineOffset: "3px", textDecoration: "none", whiteSpace: "nowrap", boxSizing: "border-box", overflow: "hidden",
    width: block ? "100%" : "auto", opacity: disabled ? 0.55 : 1, letterSpacing: "0.01em",
  };
  const sizes = {
    md: { fontSize: "1.02rem", padding: "12px 24px", minHeight: "46px" },
    lg: { fontSize: "1.22rem", padding: "17px 30px", minHeight: "58px" },
  };
  const variants = {
    primary: { backgroundImage: "var(--gloss-violet)", color: "#fff", boxShadow: "var(--glow-violet), inset 0 1px 0 rgba(255,255,255,.45), inset 0 -3px 0 rgba(0,0,0,.18)", textShadow: "0 1px 2px rgba(76,58,143,.5)" },
    reward: { backgroundImage: "var(--gloss-banana)", color: "#5a4410", boxShadow: "var(--glow-banana), inset 0 1px 0 rgba(255,255,255,.6), inset 0 -3px 0 rgba(0,0,0,.14)" },
    secondary: { background: "#fff", color: "var(--tropius-leaf-deep)", boxShadow: "inset 0 0 0 2.5px var(--tropius-leaf), var(--shadow-card)" },
    ghost: { background: "transparent", color: "var(--ink)", boxShadow: "none" },
  };
  return (
    <button
      type={type} disabled={disabled || loading} onClick={onClick}
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
      onMouseDown={(e) => { if (!disabled && !loading) e.currentTarget.style.transform = "translateY(2px) scale(0.98)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.filter = "none"; }}
      onMouseEnter={(e) => { if (!disabled && !loading) e.currentTarget.style.filter = "brightness(1.07)"; }}
      {...rest}
    >
      {(variant === "primary" || variant === "reward") && (
        <span aria-hidden style={{ position: "absolute", top: 2, left: "6%", right: "6%", height: "42%", borderRadius: "var(--r-pill)", background: "linear-gradient(180deg, rgba(255,255,255,.55), rgba(255,255,255,0))", pointerEvents: "none" }} />
      )}
      {loading ? <Icon name="mega-stone" size={22} color="currentColor" style={{ animation: "tj-burst-spin 1s linear infinite", position: "relative" }} /> : (icon && <Icon name={icon} size={size === "lg" ? 26 : 22} color="currentColor" style={{ position: "relative" }} />)}
      <span style={{ position: "relative" }}>{children}</span>
    </button>
  );
}

/* ---------- core/Input ---------- */
function Input({ label, hint, error, id, value, onChange, placeholder, type = "text", style = {}, ...rest }) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", ...style }}>
      {label && (
        <label htmlFor={inputId} style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "1rem", color: "var(--ink)" }}>
          {label}
        </label>
      )}
      <input
        id={inputId} type={type} value={value} onChange={onChange} placeholder={placeholder}
        style={{
          fontFamily: "var(--font-body)", fontSize: "1.0625rem", padding: "13px 16px", minHeight: "48px",
          borderRadius: "var(--r-sm)", border: `2px solid ${error ? "var(--danger)" : "var(--silver)"}`,
          background: "#fff", color: "var(--ink)", outline: "none", boxSizing: "border-box", width: "100%",
          transition: "border-color var(--dur-fast)",
        }}
        onFocus={(e) => { if (!error) e.currentTarget.style.borderColor = "var(--sky)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(79,176,229,.25)"; }}
        onBlur={(e) => { if (!error) e.currentTarget.style.borderColor = "var(--silver)"; e.currentTarget.style.boxShadow = "none"; }}
        {...rest}
      />
      {(hint || error) && (
        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: error ? "var(--danger)" : "var(--ink-soft)" }}>
          {error || hint}
        </span>
      )}
    </div>
  );
}

/* ---------- core/Spinner ---------- */
function Spinner({ size = 48, label = "Loading…", color = "var(--mewtwo-x)", style = {} }) {
  return (
    <div role="status" aria-live="polite" style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: "12px", ...style }}>
      <Icon name="mega-stone" size={size} color={color} style={{ animation: "tj-mega-spin 1.1s cubic-bezier(.5,.15,.5,.85) infinite" }} />
      {label && <span style={{ fontFamily: "var(--font-label)", fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-soft)" }}>{label}</span>}
      <style>{`@keyframes tj-mega-spin{to{transform:rotate(360deg)}}@media (prefers-reduced-motion:reduce){[style*="tj-mega-spin"]{animation:none!important}}`}</style>
    </div>
  );
}

/* ---------- core/TypeChip ---------- */
const TYPE_COLORS = {
  grass: "var(--type-grass)", fire: "var(--type-fire)", water: "var(--type-water)",
  electric: "var(--type-electric)", psychic: "var(--type-psychic)", normal: "var(--type-normal)",
};
function TypeChip({ type = "grass", label, iconSrc, style = {}, ...rest }) {
  const color = TYPE_COLORS[type] || "var(--tan)";
  const base = typeof window !== "undefined" ? window.TJ_TYPE_ICON_BASE : null;
  const src = iconSrc || (base ? base + type + ".png" : null);
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px",
        borderRadius: "var(--r-pill)", background: "#fff", border: "1.5px solid var(--silver)",
        fontFamily: "var(--font-label)", fontSize: "0.75rem", fontWeight: 600,
        letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink)", ...style,
      }}
      {...rest}
    >
      {src
        ? <img src={src} alt="" style={{ width: 18, height: 18, flex: "none" }} onError={(e) => { e.currentTarget.style.display = "none"; }} />
        : <span style={{ width: 11, height: 11, borderRadius: "999px", background: color, flex: "none" }} />}
      {label || type}
    </span>
  );
}

/* ---------- core/HeroArt ----------
   Creature art slot. Renders real sprite art via `src`, else a motif glyph
   placeholder. (The original prototype also supported a drag-drop
   <image-slot> editor for use inside the design tool; that's a design-tool
   affordance, not a party-app one, so this build renders art directly.) */
function HeroArt({ src, glyph = "tropius", color = "var(--tropius-leaf)", label = "Trainer art", size = 132, bob = false, style = {} }) {
  const anim = bob ? { animation: "tj-bob 4s ease-in-out infinite" } : {};
  if (src) return <img src={src} alt="" style={{ width: size, height: size, objectFit: "contain", filter: "drop-shadow(0 8px 18px rgba(27,36,48,.25))", ...anim, ...style }} />;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, ...style }}>
      <Icon name={glyph} size={size} color={color} style={anim} />
      <span style={{ fontFamily: "var(--font-label)", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-soft)", opacity: 0.75 }}>{label}</span>
    </div>
  );
}

/* ---------- card/Card ---------- */
function Card({
  variant = "clue", foil = "silver", holo = false, name, meta, statLine, hero, footer,
  burst = false, float = false, children, style = {}, ...rest
}) {
  const foilBg = foil === "gold" ? "var(--gold-edge)" : foil === "rainbow" ? "var(--holo-rainbow)" : foil === "none" ? "none" : "var(--foil-edge)";
  const accent = variant === "reward" ? "var(--banana)" : foil === "gold" ? "var(--gold)" : "var(--mewtwo-x)";
  const outerShadow = float ? "var(--shadow-float)" : foil === "gold" ? "var(--glow-gold)" : "var(--shadow-card)";
  return (
    <div
      style={{
        position: "relative", borderRadius: "var(--r-card)", padding: foil === "none" ? 0 : "3.5px",
        backgroundImage: foilBg, backgroundColor: foil === "none" ? "transparent" : undefined,
        boxShadow: outerShadow, ...style,
      }}
      {...rest}
    >
      <div style={{
        position: "relative", borderRadius: "calc(var(--r-card) - 3.5px)", background: "var(--surface)",
        overflow: "hidden", display: "flex", flexDirection: "column", height: "100%",
        border: foil === "none" ? "2px solid var(--silver)" : "none",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,.9), inset 0 0 0 1px rgba(199,205,212,.4)",
      }}>
        {holo && (
          <span aria-hidden style={{ position: "absolute", top: "-30%", bottom: "-30%", width: "45%", left: 0, backgroundImage: "var(--holo-strong)", filter: "blur(6px)", mixBlendMode: "screen", pointerEvents: "none", zIndex: 3, animation: "tj-holo-sweep 3.2s ease-in-out infinite" }} />
        )}
        {(name || meta) && (
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "12px", padding: "14px 18px 8px", position: "relative", zIndex: 2 }}>
            {name && <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontStyle: "italic", fontSize: "1.35rem", color: "var(--ink)", lineHeight: 1 }}>{name}</span>}
            {meta && <span style={{ fontFamily: "var(--font-label)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: accent, flex: "none" }}>{meta}</span>}
          </div>
        )}
        {statLine && (
          <div style={{ padding: "0 18px 4px", fontFamily: "var(--font-label)", fontSize: "0.75rem", letterSpacing: "0.06em", color: "var(--ink-soft)", fontWeight: 600, position: "relative", zIndex: 2 }}>{statLine}</div>
        )}
        {hero && (
          <div style={{
            position: "relative", margin: "8px 14px 0", borderRadius: "var(--r-sm)", overflow: "hidden",
            display: "flex", alignItems: "center", justifyContent: "center", minHeight: "128px",
            background: burst ? "radial-gradient(circle at 50% 42%, rgba(184,146,255,.35), rgba(184,146,255,0) 62%), linear-gradient(180deg,#F7F5FF,#EEF3FF)" : "linear-gradient(180deg,#F7F8F5,#EEF1EC)",
            boxShadow: "inset 0 0 0 1px rgba(199,205,212,.5), inset 0 2px 8px rgba(27,36,48,.06)",
          }}>
            {burst && (
              <span aria-hidden style={{ position: "absolute", width: "130%", paddingBottom: "130%", background: "conic-gradient(from 0deg, rgba(184,146,255,.0) 0deg, rgba(184,146,255,.28) 20deg, rgba(184,146,255,0) 40deg, rgba(184,146,255,.28) 60deg, rgba(184,146,255,0) 80deg, rgba(184,146,255,.28) 100deg, rgba(184,146,255,0) 120deg, rgba(184,146,255,.28) 140deg, rgba(184,146,255,0) 160deg, rgba(184,146,255,.28) 180deg, rgba(184,146,255,0) 200deg)", borderRadius: "50%", animation: "tj-burst-spin 14s linear infinite" }} />
            )}
            <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>{hero}</div>
          </div>
        )}
        <div style={{ padding: "16px 18px", flex: 1, fontFamily: "var(--font-body)", fontSize: "1.0625rem", lineHeight: 1.55, color: "var(--ink)", position: "relative", zIndex: 2 }}>
          {children}
        </div>
        {footer && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", padding: "10px 18px", borderTop: "1px solid var(--paper-alt)", fontFamily: "var(--font-label)", fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-soft)", position: "relative", zIndex: 2 }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- card/TrainerCard ---------- */
function TrainerCard({
  name = "Trainer", avatar = "tropius", avatarSrc, badges = 0, totalBadges = 8,
  title, champion = false, style = {}, ...rest
}) {
  const foilBg = champion ? "var(--gold-edge)" : "var(--foil-edge)";
  const accent = champion ? "var(--gold)" : "var(--mewtwo-x)";
  const displayTitle = title || (champion ? "Champion" : "Trainer");
  return (
    <div style={{ position: "relative", borderRadius: "var(--r-card)", padding: "3.5px", backgroundImage: foilBg, boxShadow: champion ? "var(--glow-gold)" : "var(--shadow-card)", width: "100%", maxWidth: 340, boxSizing: "border-box", overflow: "hidden", ...style }} {...rest}>
      {champion && <span aria-hidden style={{ position: "absolute", top: "-30%", bottom: "-30%", width: "45%", left: 0, backgroundImage: "var(--holo-strong)", filter: "blur(6px)", mixBlendMode: "screen", pointerEvents: "none", zIndex: 3, animation: "tj-holo-sweep 3.4s ease-in-out infinite" }} />}
      <div style={{ position: "relative", borderRadius: "calc(var(--r-card) - 3.5px)", background: "var(--surface)", overflow: "hidden", backgroundImage: champion ? "radial-gradient(circle at 50% 0%, rgba(217,182,80,.22), transparent 60%)" : "none", boxShadow: "inset 0 1px 0 rgba(255,255,255,.9)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px 6px" }}>
          <span style={{ fontFamily: "var(--font-label)", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: accent, fontWeight: 700 }}>{displayTitle}</span>
          <Icon name="pokeball" size={22} />
        </div>
        <div style={{ display: "flex", gap: "14px", alignItems: "center", padding: "6px 16px 14px" }}>
          <div style={{ width: 80, height: 80, borderRadius: "14px", background: "radial-gradient(circle at 50% 35%, #F7F5FF, #E9EEF6)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none", boxShadow: "inset 0 0 0 2.5px var(--silver), 0 4px 12px rgba(27,36,48,.12)", overflow: "hidden" }}>
            {avatarSrc
              ? <img src={avatarSrc} alt="" style={{ width: "86%", height: "86%", objectFit: "contain" }} />
              : <Icon name={avatar} size={54} color={avatar === "tropius" ? "var(--tropius-leaf)" : "var(--mewtwo-x)"} />}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontStyle: "italic", fontSize: "1.7rem", lineHeight: 1.0, color: champion ? "var(--gold)" : "var(--ink)", overflowWrap: "anywhere", textShadow: champion ? "0 1px 0 rgba(184,146,80,.3)" : "none" }}>{name}</div>
            <div style={{ fontFamily: "var(--font-label)", fontSize: "0.72rem", letterSpacing: "0.06em", color: "var(--ink-soft)", marginTop: 4, textTransform: "uppercase" }}>Luca · 7 · 2026</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", borderTop: "1px solid var(--paper-alt)", background: "linear-gradient(180deg, transparent, rgba(242,244,239,.5))" }}>
          <Icon name="badge" size={20} color="var(--tropius-leaf)" />
          <span style={{ fontFamily: "var(--font-label)", fontSize: "0.78rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink)", fontWeight: 700 }}>
            {badges} of {totalBadges} badges
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- game/BadgeTrail ---------- */
function BadgeTrail({ total = 8, earned = 0, current = null, orientation = "horizontal", style = {}, ...rest }) {
  const cur = current == null ? earned : current;
  const slots = Array.from({ length: total }, (_, i) => i);
  const colors = ["var(--tropius-leaf)", "var(--sky)", "var(--mewtwo-x)", "var(--banana)", "var(--type-fire)", "var(--tropius-leaf-deep)", "var(--mewtwo-y)", "var(--tan)"];
  const glows = ["rgba(59,165,93,.55)", "rgba(79,176,229,.55)", "rgba(138,79,255,.6)", "rgba(247,201,72,.6)", "rgba(228,87,46,.55)", "rgba(30,122,67,.55)", "rgba(75,58,143,.55)", "rgba(201,166,107,.5)"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", ...style }} {...rest}>
      <div style={{ fontFamily: "var(--font-label)", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-soft)", fontWeight: 700 }}>
        Stop {Math.min(cur + 1, total)} of {total}
      </div>
      <div style={{ display: "flex", flexDirection: orientation === "vertical" ? "column" : "row", gap: "8px", flexWrap: "wrap" }}>
        {slots.map((i) => {
          const isEarned = i < earned;
          const isCurrent = i === cur && !isEarned;
          return (
            <div key={i} style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: 42, height: 42, filter: isEarned ? `drop-shadow(0 3px 7px ${glows[i % glows.length]})` : "none" }}>
              {isEarned ? (
                <Icon name="badge" size={40} color={colors[i % colors.length]} />
              ) : (
                <Icon name="badge-slot" size={40} color={isCurrent ? "var(--mewtwo-x)" : "var(--silver)"} style={isCurrent ? { animation: "tj-burst-pulse 1.4s ease-in-out infinite", filter: "drop-shadow(0 0 8px rgba(138,79,255,.6))" } : undefined} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- game/ClueCard ---------- */
function ClueCard({
  stopNumber = 1, totalStops = 8, name = "The Clue", type = "grass",
  clueText = "", hintText = "", nextText = "", style = {}, ...rest
}) {
  const [showHint, setShowHint] = React.useState(false);
  const [showNext, setShowNext] = React.useState(false);
  return (
    <Card
      variant="clue" name={name}
      meta={`Stop ${String(stopNumber).padStart(2, "0")} · ${String(totalStops).padStart(2, "0")}`}
      hero={<Icon name="pokeball" size={72} />}
      footer={<><span>Luca · 7 · 2026</span><Icon name="pokeball" size={16} /></>}
      style={{ maxWidth: 520, ...style }} {...rest}
    >
      <div style={{ marginBottom: 14 }}><TypeChip type={type} /></div>
      <p style={{ margin: "0 0 16px", fontSize: "1.0625rem", lineHeight: 1.55 }}>{clueText}</p>
      {hintText && (
        <div style={{ marginBottom: 12 }}>
          {!showHint ? (
            <Button variant="ghost" icon="sparkle" onClick={() => setShowHint(true)} style={{ color: "var(--sky)", padding: "8px 4px" }}>Reveal hint</Button>
          ) : (
            <div style={{ display: "flex", gap: "10px", padding: "12px 14px", borderRadius: "var(--r-sm)", background: "rgba(79,176,229,.10)", border: "1.5px solid var(--sky)" }}>
              <Icon name="sparkle" size={20} color="var(--sky)" style={{ flex: "none", marginTop: 2 }} />
              <span style={{ fontSize: "1rem" }}>{hintText}</span>
            </div>
          )}
        </div>
      )}
      {nextText && (
        showNext ? (
          <div style={{ display: "flex", gap: "10px", padding: "12px 14px", borderRadius: "var(--r-sm)", background: "var(--paper-alt)", fontWeight: 700 }}>
            <Icon name="arrow-right" size={20} color="var(--mewtwo-x)" style={{ flex: "none" }} />
            <span>{nextText}</span>
          </div>
        ) : (
          <Button variant="primary" icon="arrow-right" block onClick={() => setShowNext(true)}>Where to next?</Button>
        )
      )}
    </Card>
  );
}

/* ---------- game/ActivityShell ---------- */
function ActivityShell({
  stopNumber = 1, name = "Challenge", type = "psychic", instructions = "",
  status = "idle", onCheck, onContinue, checkLabel = "Check answer",
  disabled = false, children, style = {}, ...rest
}) {
  return (
    <Card
      variant="activity" name={name}
      meta={`Challenge ${String(stopNumber).padStart(2, "0")}`}
      style={{ maxWidth: 520, ...style }}
      footer={<span>Complete the challenge to earn your badge</span>}
      {...rest}
    >
      <div style={{ marginBottom: 12 }}><TypeChip type={type} /></div>
      {instructions && <p style={{ margin: "0 0 16px", fontSize: "1.0625rem", lineHeight: 1.55 }}>{instructions}</p>}
      <div style={{ padding: "16px", borderRadius: "var(--r-sm)", background: "var(--paper-alt)", marginBottom: 16, minHeight: 80 }}>
        {children}
      </div>
      {status === "success" && <div style={{ marginBottom: 16 }}><Feedback kind="success" /></div>}
      {status === "retry" && <div style={{ marginBottom: 16 }}><Feedback kind="retry" /></div>}
      {status === "success" ? (
        <Button variant="reward" size="lg" icon="arrow-right" block onClick={onContinue}>Continue</Button>
      ) : (
        <Button variant="primary" size="lg" icon="check" block onClick={onCheck} disabled={disabled}>{checkLabel}</Button>
      )}
    </Card>
  );
}

/* ---------- game/Feedback ---------- */
function Feedback({ kind = "success", message, style = {}, ...rest }) {
  const isSuccess = kind === "success";
  const msg = message || (isSuccess ? "You did it! Badge earned!" : "So close! Give it another try, Trainer.");
  return (
    <div
      role="status"
      style={{
        display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", borderRadius: "var(--r-sm)",
        background: isSuccess ? "rgba(59,165,93,.12)" : "rgba(228,87,46,.10)",
        border: `1.5px solid ${isSuccess ? "var(--tropius-leaf)" : "var(--danger)"}`, ...style,
      }}
      {...rest}
    >
      <div style={{ position: "relative", flex: "none", display: "flex" }}>
        <Icon
          name={isSuccess ? "check" : "tropius"} size={26}
          color={isSuccess ? "var(--tropius-leaf-deep)" : "var(--danger)"}
          style={isSuccess ? { animation: "tj-pop .4s var(--ease-snap)" } : undefined}
        />
      </div>
      <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 800, fontSize: "1.15rem", color: isSuccess ? "var(--tropius-leaf-deep)" : "var(--danger)" }}>
        {msg}
      </span>
      <style>{`@keyframes tj-pop{0%{transform:scale(0)}70%{transform:scale(1.25)}100%{transform:scale(1)}}@media (prefers-reduced-motion:reduce){[style*="tj-pop"]{animation:none!important}}`}</style>
    </div>
  );
}

/* ---------- game/GiftModal ---------- */
function GiftModal({
  open = true, giftLocation = "", stopName = "", onNext, nextLabel = "Next clue", iconSrc,
  style = {}, ...rest
}) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "radial-gradient(circle at 50% 40%, rgba(217,182,80,.35), rgba(27,36,48,.7))", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", zIndex: 50, backdropFilter: "blur(3px)", ...style }} {...rest}>
      <div style={{ position: "relative", borderRadius: "var(--r-card)", padding: "4px", backgroundImage: "var(--gold-edge)", boxShadow: "var(--glow-gold)", width: "100%", maxWidth: 400, animation: "tj-rise .4s var(--ease-out)", overflow: "hidden" }}>
        <span aria-hidden style={{ position: "absolute", top: "-30%", bottom: "-30%", width: "45%", left: 0, backgroundImage: "var(--holo-strong)", filter: "blur(6px)", mixBlendMode: "screen", pointerEvents: "none", zIndex: 3, animation: "tj-holo-sweep 3s ease-in-out infinite" }} />
        <div style={{ position: "relative", borderRadius: "calc(var(--r-card) - 4px)", background: "var(--surface)", backgroundImage: "radial-gradient(circle at 50% 30%, rgba(217,182,80,.2), transparent 60%)", padding: "30px 24px", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
            {iconSrc
              ? <img src={iconSrc} alt="" style={{ width: 84, height: 84, objectFit: "contain", filter: "drop-shadow(0 6px 16px rgba(217,182,80,.6))", animation: "tj-float 3.5s ease-in-out infinite" }} />
              : <Icon name="mega-stone" size={72} color="var(--gold)" style={{ filter: "drop-shadow(0 6px 16px rgba(217,182,80,.6))", animation: "tj-float 3.5s ease-in-out infinite" }} />}
          </div>
          <div style={{ fontFamily: "var(--font-label)", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 500, marginBottom: 6 }}>
            {stopName ? `${stopName} · Cleared` : "Challenge Cleared"}
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontStyle: "italic", fontSize: "1.85rem", lineHeight: 1.05, margin: "0 0 12px", color: "var(--ink)" }}>
            Your gift is here!
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.0625rem", lineHeight: 1.5, margin: "0 0 22px", color: "var(--ink)" }}>{giftLocation}</p>
          <Button variant="primary" size="lg" icon="arrow-right" block onClick={onNext}>{nextLabel}</Button>
        </div>
      </div>
      <style>{`@keyframes tj-rise{from{transform:translateY(16px);opacity:0}to{transform:translateY(0);opacity:1}}@media (prefers-reduced-motion:reduce){[style*="tj-rise"]{animation:none!important}}`}</style>
    </div>
  );
}

/* ---------- game/Header ---------- */
function Header({ total = 8, earned = 0, iconSrc, style = {}, ...rest }) {
  return (
    <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "12px 20px", background: "var(--surface)", borderBottom: "1px solid var(--paper-alt)", ...style }} {...rest}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {iconSrc ? <img src={iconSrc} alt="" style={{ width: 26, height: 26, objectFit: "contain" }} /> : <Icon name="pokeball" size={24} />}
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontStyle: "italic", fontSize: "1.05rem", color: "var(--ink)", lineHeight: 1 }}>
          Trainer <span style={{ color: "var(--tropius-leaf)" }}>Journey</span>
        </span>
      </div>
      <div style={{ display: "flex", gap: "5px" }} aria-label={`${earned} of ${total} stops complete`}>
        {Array.from({ length: total }, (_, i) => (
          <span key={i} style={{ width: 8, height: 8, borderRadius: "999px", background: i < earned ? "var(--mewtwo-x)" : "var(--silver)" }} />
        ))}
      </div>
    </header>
  );
}
