# Fondi — Design System

## Direction and feel

Rebranded from the original sage/stone (warm, organic, nature-toned) identity to **Evalia's corporate navy blue** — cold, institutional, trust-oriented. This is a full palette rebrand; brand text/copy ("Fondi") was NOT renamed, only the color system.

The feel shifted from "natural credit, calm and organic" to "institutional, precise, corporate trust." Deep navy replaces near-black-green as the dominant dark tone; a mint accent (from Evalia's brand manual) is available for sparing highlight use (positive results, calculated values, badges) — not a primary color.

## Depth strategy and spacing

- Depth strategy: **subtle shadows + surface-color shifts** (`.fondi-card` hover lift with soft layered box-shadow, no hard borders as primary depth cue). Kept from the original system — unchanged by the rebrand.
- Spacing base unit: 4px multiples (unchanged from prior system).
- Border radius: unchanged from prior system (not touched by this rebrand).

## Color tokens (`src/styles/globals.css`)

### Brand — Evalia navy (replaces old `sage-*`)
Anchored on 3 official brand hexes (exact, do not drift these three): `brand-400 = #4D74B2`, `brand-600 = #1E55A5`, `brand-900 = #0B3F7C`. Remaining steps interpolated via HSL at hue ≈214° to fill the ramp — treat 50/100/200/300/500/700/800 as *derived*, safe to retune if a specific UI need arises, but keep the three anchors exact.

```
brand-50  #F4F7FB   brand-500 #3668AB
brand-100 #E6ECF5   brand-600 #1E55A5  (exact anchor)
brand-200 #D1DCEB   brand-700 #154C93
brand-300 #AFC4DE   brand-800 #0F4285
brand-400 #4D74B2 (exact anchor)   brand-900 #0B3F7C  (exact anchor)
```

Usage convention (inherited 1:1 from the old sage scale via class rename): `brand-900` = primary button bg / darkest identity color / page dark background; `brand-300` = light accent bg / outline button fill; `brand-600` = focus/border accent.

### Neutral — cool gray (replaces old `stone-*`)
Anchored on the brand manual's light gray: `neutral-200 = #E6EAEF` (exact). Hue ≈216°, desaturated cool gray, rest of ramp interpolated.

```
neutral-50  #F9FAFB   neutral-500 #7B838E
neutral-100 #F0F2F5   neutral-600 #535A65
neutral-200 #E6EAEF (exact anchor)   neutral-700 #353B46
neutral-300 #D3D8DE   neutral-800 #1D222A
neutral-400 #A5ACB6
```

### Accent — Evalia mint (new, sparing use only)
Anchored on `accent-300 = #BCECED` (exact). Hue ≈179°. Use for: positive/calculated result highlights, badges, illustration accents. Never as a primary action color — brand navy owns that role.

```
accent-100 #DFF6F5
accent-300 #BCECED (exact anchor)
accent-500 #75D7D5
accent-700 #339997
```

### Unchanged (not brand-dependent)
- `status-green: #4E7C55`, `status-amber: #B8893B` — functional semantic colors, independent of brand identity.
- `whatsapp: #25D366`, `whatsapp-hover: #1DA851` — external platform brand, never rebrand this.

## Key component patterns

- **Button primary** — `bg-brand-900 text-white hover:bg-brand-800` (dark navy, darkens further on hover).
- **Button accent/outline** — `bg-brand-300 text-brand-900 border-brand-300 hover:bg-brand-200`; outline variant: `text-brand-300 border-brand-600 hover:border-brand-500 hover:bg-brand-900/30`.
- **`.fondi-card` hover** — lift `translateY(-3px)`, shadow `0 20px 40px -12px rgba(11,63,124,.12), 0 2px 6px rgba(11,63,124,.05)`, border → `brand-300`. Shadow color always tracks `brand-900` in rgba form, not a fixed gray.
- **`.fondi-input:focus`** — border → `brand-600`.
- **Range slider thumb** — bg `brand-900`, white border, shadow `rgba(11,63,124,.25)`.
- **Hero gradient overlay** — `linear-gradient(90deg, rgba(11,63,124,.96) 0%, rgba(11,63,124,.82) 45%, rgba(11,63,124,.5) 100%)` — always brand-900 in rgba form, never a literal unrelated hex.

## Key component patterns — testimonials

- **Testimonios (`testimonials-section.tsx`)** — grid 2x2 reemplazada por scroll horizontal nativo (`overflow-x-auto snap-x snap-mandatory`, sin librería de carrusel) porque escala a 8+ testimonios sin esconder contenido detrás de un slide único. Card fija `340px` + gap `20px`. Señales de "hay más": fade de borde (`gradient-to-r/l from-white`) en vez de flechas obligatorias, más un hairline de progreso (`h-[3px]`, `bg-brand-900` sobre `bg-neutral-200`) que reemplaza los dots de paginación — informa posición real, no decoración. Flechas prev/next (circulares, `border-neutral-200`, ícono `brand-900`) solo aparecen en `sm:` y solo si hay overflow (`scrollWidth > clientWidth`); se ocultan automáticamente si en algún momento vuelve a haber pocos testimonios y todo entra en una fila. Region con `tabIndex={0}` + `role="region"` para scroll por teclado.

## Rule going forward

Any new dark-tint rgba literal in this codebase must use `11, 63, 124` (brand-900), never introduce a new arbitrary dark color. Any new light neutral background should pull from the `neutral-*` scale, not a fresh gray. If Evalia issues additional official brand hexes later, treat them as new exact anchors and re-derive only the interpolated steps between them — don't touch the three existing exact anchors (`brand-400/600/900`) or `neutral-200`/`accent-300` without an explicit brand-manual update.
