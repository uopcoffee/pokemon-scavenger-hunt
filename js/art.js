/* ==========================================================================
   art.js — Original, "inspired-by" SVG motifs (see design brief §5, §14).
   These are stylized originals — NOT copies of trademarked Pokémon artwork.
   Each export is an SVG string you can drop into innerHTML.
   currentColor is used where the caller may want to tint.
   ========================================================================== */

/* Mega-stone / key-stone spark — faceted gem with an infinity glint (§5.1) */
export const spark = (fill = "var(--mewtwo-x)", glow = "var(--mega-glow)") => `
<svg class="spark" viewBox="0 0 48 48" fill="none" aria-hidden="true">
  <defs><radialGradient id="sg" cx="50%" cy="40%" r="60%">
    <stop offset="0%" stop-color="${glow}"/><stop offset="100%" stop-color="${fill}"/>
  </radialGradient></defs>
  <path d="M24 3l13 8v18l-13 8-13-8V11z" fill="url(#sg)" stroke="var(--silver-deep)" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M24 3v42M11 11l26 18M37 11L11 29" stroke="var(--silver)" stroke-width="1" opacity=".6"/>
  <path d="M18 20c2-3 10-3 12 0s-2 6-6 6-8-3-6-6z" fill="#fff" opacity=".55"/>
</svg>`;

/* Simplified two-tone Poké Ball (§5.2) */
export const pokeball = (size = 24) => `
<svg viewBox="0 0 48 48" width="${size}" height="${size}" fill="none" aria-hidden="true">
  <circle cx="24" cy="24" r="20" fill="#fff" stroke="var(--ink)" stroke-width="3"/>
  <path d="M4 24a20 20 0 0140 0z" fill="var(--danger)"/>
  <path d="M4 24h13a7 7 0 0014 0h13" stroke="var(--ink)" stroke-width="3" fill="none"/>
  <circle cx="24" cy="24" r="6" fill="#fff" stroke="var(--ink)" stroke-width="3"/>
</svg>`;

/* Angular energy burst / shards (§5.3) — decorative only */
export const burst = (color = "var(--mega-glow)") => `
<svg class="burst" viewBox="0 0 120 120" fill="none" aria-hidden="true">
  <g fill="${color}">
    <path d="M60 4l9 34 34-9-27 23 27 23-34-9-9 34-9-34-34 9 27-23-27-23 34 9z" opacity=".85"/>
  </g>
  <circle cx="60" cy="60" r="16" fill="#fff"/>
</svg>`;

/* Tropius — friendly mascot: leaf-collar + banana cluster, stylized (§5.4) */
export const tropius = (size = 168) => `
<svg class="hero-art" viewBox="0 0 168 168" width="${size}" height="${size}" fill="none" aria-hidden="true" role="img">
  <title>Tropius (stylized mascot)</title>
  <ellipse cx="84" cy="104" rx="46" ry="38" fill="var(--tropius-leaf)"/>
  <ellipse cx="84" cy="110" rx="30" ry="24" fill="var(--tropius-leaf-deep)" opacity=".35"/>
  <!-- long neck + head -->
  <path d="M104 78c14-10 22-28 20-44-10 4-20 12-24 24-3 9-2 16 4 20z" fill="var(--tropius-leaf)"/>
  <circle cx="118" cy="42" r="14" fill="var(--tropius-leaf)"/>
  <circle cx="123" cy="40" r="3.2" fill="var(--ink)"/>
  <!-- leaf wings -->
  <path d="M40 74C16 66 8 82 12 96c16-2 30-10 36-22z" fill="var(--tropius-leaf-deep)"/>
  <path d="M128 92c24-4 34 12 28 26-16-4-28-14-32-26z" fill="var(--tropius-leaf-deep)"/>
  <!-- banana cluster (reward motif) -->
  <g fill="var(--banana)" stroke="var(--tan)" stroke-width="1.5">
    <path d="M70 132c-6 8-4 16 2 18 4-8 4-14-2-18z"/>
    <path d="M84 134c-4 9 0 16 6 16 2-8 0-14-6-16z"/>
    <path d="M98 132c-2 9 4 15 10 13 0-8-4-13-10-13z"/>
  </g>
  <!-- little legs -->
  <rect x="58" y="136" width="12" height="20" rx="6" fill="var(--tan)"/>
  <rect x="98" y="136" width="12" height="20" rx="6" fill="var(--tan)"/>
</svg>`;

/* Mega hero silhouette (generic "epic" creature) for the X/Y motif (§1) */
export const megaHero = (color = "var(--mewtwo-x)", size = 168) => `
<svg class="hero-art" viewBox="0 0 168 168" width="${size}" height="${size}" fill="none" aria-hidden="true" role="img">
  <title>Mega-evolved hero (stylized)</title>
  <g fill="${color}">
    <path d="M84 18c14 0 20 12 18 24 10 4 20 16 20 34 0 26-16 44-38 44S46 102 46 76c0-18 10-30 20-34-2-12 4-24 18-24z"/>
    <path d="M64 40c-8-8-18-10-26-6 6 8 14 12 22 12M104 40c8-8 18-10 26-6-6 8-14 12-22 12" opacity=".9"/>
  </g>
  <circle cx="72" cy="72" r="4" fill="#fff"/><circle cx="96" cy="72" r="4" fill="#fff"/>
  <path d="M84 92c-6 0-10 4-10 4h20s-4-4-10-4z" fill="#fff" opacity=".8"/>
</svg>`;

/* Single leaf marker */
export const leaf = (size = 24) => `
<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true">
  <path d="M4 20C4 10 12 4 20 4c0 10-8 16-16 16z" fill="var(--tropius-leaf)"/>
  <path d="M6 18C9 13 14 9 18 8" stroke="var(--tropius-leaf-deep)" stroke-width="1.5" fill="none"/>
</svg>`;

/* Empty badge slot (silver outline gem) and earned gem (filled) — §8 tracker */
export const gemEmpty = () => `
<svg class="gem" viewBox="0 0 48 48" fill="none" aria-hidden="true">
  <path d="M24 5l14 8v20l-14 8-14-8V13z" fill="var(--paper-alt)" stroke="var(--silver)" stroke-width="2" stroke-linejoin="round"/>
</svg>`;
export const gemFilled = (color = "var(--mewtwo-x)") => `
<svg class="gem" viewBox="0 0 48 48" fill="none" aria-hidden="true">
  <defs><linearGradient id="gf" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="${color}"/><stop offset="100%" stop-color="var(--mega-glow)"/>
  </linearGradient></defs>
  <path d="M24 5l14 8v20l-14 8-14-8V13z" fill="url(#gf)" stroke="var(--silver-deep)" stroke-width="2" stroke-linejoin="round"/>
  <path d="M24 5v38M10 13l28 20M38 13L10 33" stroke="#fff" stroke-width="1" opacity=".5"/>
</svg>`;

/* Map avatars for onboarding (§9 step 2) — 6 starters incl. Tropius */
export const avatars = {
  tropius: () => tropius(56),
  megaX:   () => megaHero("var(--mewtwo-x)", 56),
  megaY:   () => megaHero("var(--mewtwo-y)", 56),
  spark:   () => `<div style="width:56px;height:56px">${spark()}</div>`,
  ball:    () => pokeball(56),
  leaf:    () => leaf(56),
};
