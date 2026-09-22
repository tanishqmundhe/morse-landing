# Morse landing — design system

Living document. Update it alongside any visual change.

## Origin

v0 is a straight port of the static starter (`morse-landing-source.zip`, 2026-09-22): same copy, layout, tokens and interactions, rebuilt as Next.js components. Nothing was redesigned in the port.

## Tokens (`src/app/globals.css`)

| Token | Value | Use |
| --- | --- | --- |
| `--color-paper` | oklch(16.7% .01 60) | Page background |
| `--color-surface` | oklch(21% .012 60) | Panels, calendar band, feature cards |
| `--color-raised` | oklch(25% .014 60) | Buttons, tags, panel lines |
| `--color-ink` | oklch(93% .013 80) | Primary text |
| `--color-muted` | oklch(70% .022 65) | Body copy, second heading line |
| `--color-rule` | oklch(31% .017 65) | Borders and dividers |
| `--color-accent` | oklch(79% .067 125) | Sage: primary CTA, live states, focus ring |
| `--color-accent-ink` | oklch(23% .025 125) | Text on sage |
| `--color-sand`, `--color-lilac` | | Theme-swatch demo only |

Each is also available as a Tailwind colour (`bg-surface`, `text-muted`, `border-rule`…).

- **Type:** Manrope for display (h1–h3, weight 500, tight tracking), DM Sans for body. Both come from `next/font`.
- **Motion:** `--ease-out` cubic-bezier(.16,1,.3,1), 180 ms for hovers. All motion is off under `prefers-reduced-motion`.
- **Layout:** `.wrap` is at most 1280 px with 56 px gutters, 32 px at 1100 px or less and 20 px at 800 px or less. The breakpoints are 1600, 1100, 800 and 440.

## Sections (in order)

Header → Hero (copy + tilted product shot + caption card) → Essentials strip → Experience (Before/During/After tabs + demo panel) → Calendar (booking preview) → Personal (teleprompter + theme preview) → Workflow (conversation → action stack) → FAQ → Closing CTA → Footer.

## Known placeholders

- The brand mark is the starter's `╱` glyph with a text shadow, not the real Morse logo.
- All CTAs link to in-page anchors. There is no sign-up or production URL yet.
