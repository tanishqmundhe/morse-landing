# Morse landing: design system

This is a living document. Update it alongside any visual change.

The landing page follows the **Morse app's design system**: Neural-Arc/morse,
`docs/DESIGN-SYSTEM.md` on `feat/neural-cal`. Where this page and the app
disagree, the app wins. Components and tokens are copied from that branch,
not reinvented.

## Contract points this page keeps

- **#1 Warm-black ground.** The tokens are the app's dark palette, copied exactly (`globals.css`). The page is dark only, like the app's default.
- **#2 One accent, spent on action.** Sage (`--action`) marks only things you press: Open Morse, Book, a picked day or time, a ticked action item. Coral (`--signal`) marks only what is live (the Recording dot) and the focus ring.
- **#3 Two registers.** IBM Plex Sans for everything people say. Geist Mono only for the uppercase `text-label` eyebrows. No third family.
- **#4 Weight inverts with scale.** Headlines are Plex 300. Labels are 600 at 13px.
- **#5/#6 Depth without borders.** Cards are `rounded-[28px] bg-raised shadow-raised`. Wells inside cards are `bg-sunken shadow-sunken`, and the follow-up card floats (`bg-float shadow-float`). Hairlines only divide list rows and page bands.
- **#7 Ornament is load-bearing.** No decorative glyphs. The one allowed sign-off is the logo mark above the closing line.
- **#8 Capsules and circles** for every control.

## Type ladder (px)

| Use | Size |
| --- | --- |
| Hero h1 | 46 → 64 → 72 |
| Section h2 | 36 → 48 |
| Card title | 27 |
| Lede | 19 |
| Body | 17–18 |
| Small print | 15 |
| Label | 13 mono 600, tracked 1.6px, uppercase |

Nothing is set below 13px.

## Sections (in order)

1. **Header:** the real logo, three anchors (hidden below md), and Open Morse as a secondary capsule.
2. **Hero:** a light two-tone h1, a lede, Open Morse (sage) and a "See how it works" text link. Beside it, the app's today card: a crop of the real product, in a raised frame with no tilt. Then the feature list over a hairline.
3. **How it works (`#how`):** Before / During / After tabs.
   - Before: a booking confirmation.
   - During: a live transcript with the coral Recording dot.
   - After: Notes, with a summary, decisions and action items you can tick.
4. **Booking (`#booking`):** on a sunken band. A working booking-page preview:
   - It shows this month and next, and the visitor's real time zone.
   - Weekdays after today are open.
   - Capsule time slots, styled like `booking-flow.tsx`.
5. **Personal:** two cards.
   - Teleprompter: a replay of `prompter-card.tsx`. The question, "Looking in your notes" with the three dots, the answer written in, then "From …". It plays once when it scrolls into view.
   - Make it yours: the five real accents (Sage, Patina, Dusk blue, Indigo, Plum) recolour a mini today panel.
6. **Follow-up:** the app's proposal card. Book or Don't book, then the decided state and "Try again".
7. **Questions (`#questions`):** a `details` list with a rotating plus.
8. **Closing:** the mark, the line, and Open Morse.
9. **Footer:** the Morse logo, and "A product by" with the Unified Machines lockup, as in the app.

## Copy rules

All copy lives in `src/content/site.ts` and uses the app's own words: "Notes", "Teleprompter", "booking page". Every claim was checked against the code on 2026-09-22. Don't claim team or round-robin booking, payments, general "agentic workflows", or a script-reading teleprompter. None of them exist.

## Open questions

- **Who can sign up?** Sign-in is Google only and currently limited to `@neuralarc.ai`. The CTA opens `https://onmorse.com` (`links.app`). Change it once public access or a waitlist exists.
- **Hero image:** the crop shows a real person's name and title ("Aniket, CEO, Neural Arc"). Replace it with a demo-data capture before launch if that isn't wanted.
- **No OG image or canonical URL yet.** Both depend on the landing page's final domain.

## History

- **v0 (2026-09-22):** a straight port of the AI-generated static starter.
- **v1 (2026-09-22):** an audit and rebuild on the app's system. The v0 problems were:
  - Invented fonts (Manrope, DM Sans), bordered cards and bold headlines.
  - Decorative unicode glyphs and a fake `╱` logo.
  - Sage used as decoration, and swatches (sand, lilac) that don't exist in the app.
  - A script-reading teleprompter, which the app doesn't have.
  - "Agentic workflows" overclaimed.
  - A tour dialog that repeated the page.
  - Every CTA looped back to its own page.
  - A booking demo hard-wired to 22 September and IST.
  - Text down to 9px.
