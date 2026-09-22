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

1. **Header (`site-header.tsx`):** fixed. It's clear over the film and turns into a solid pill (`bg-canvas/85`, `shadow-float`) once the film has scrolled away.
   - The logo sits on the left and Open Morse (sage) on the right.
   - Between them, a pill of four links in page order. Its `overlay` highlight slides to the section crossing the top third of the screen, and nothing is highlighted over the hero.
2. **Hero, option A "Film window" (`hero.tsx`):** the app's signal film (`public/films/signal-loop.mp4`) fills a window inset 14px, `rounded-[30px]`, one screen tall (max 940px). Scrims hold the lower-left dark for the copy; below `lg` a flat 55% canvas layer covers the whole film.
   - **Copy:** a two-line h1 in Plex 300 at 92px, the second line `ink-soft`; the lede; Open Morse (sage, with its arrow nudging on hover) and See how it works (`overlay`).
   - **Entrance:** the page's one orchestrated moment. The film settles from 1.06×, the h1 lines, lede and buttons arrive at 350/500/700/850ms with a blur-to-sharp rise, and the card follows at 1150ms.
   - **Live card (`live-card.tsx`, `lg` and up):** one meeting, with a coral pulse and a live Recording timer. It plays three scenes, 6.5s each, with words written in one at a time:
     - Notes: what Priya said becomes an action item.
     - Teleprompter: Daniel's question, answered from notes.
     - Follow-up: Book is pressed for you, then "Booked. Invites sent."
     - The segments underneath are the timeline and can be pressed to jump. Hovering holds the scene; with reduced motion nothing advances on its own.
   - The other three options (B Split stage, C Rooms, D Signal) are kept in `design/mockups/hero-options/index.html`.
3. **Product (`#product`, `showcase/showcase.tsx`):** section 2, in two movements.
   - **Arriving:** "Morse is a video call [3 in call] that writes everything down, [Transcript] answers what you're asked, [From Acme notes] and books what comes next. [Thu, 2:00 pm]" lights up word by word as the section rises. Each chip plays its bit when the light reaches it: the avatars slide together, and the booking chip turns sage. Plex 300 at 48px.
   - **Pinned:** the section holds for 0.3 of a screen height with the sentence lit, then scrolling moves a row of five rebuilt app screens sideways (`showcase/screens.tsx`, drawn at 1120 × 700 and scaled to fit):
     - Room: People open, the transcript building.
     - Teleprompter: the answer written in, then the Book a follow-up offer.
     - Notes: the summary written in, the first action item ticked, the recording playing.
     - Calendar: the booked follow-up drops into Thursday with the coral glow.
     - Booking page: 2:00 picked, then "Booked".
   - **As the row moves:** the sentence blurs away and a counter (01 / 05), a title and a line about the screen in the middle take its place. They swap as each new screen arrives, the title written in word by word.
   - **The row:** the middle screen is whole and plays; the others step back (93%, half opacity). Under it are a progress line and the five names, which scroll the page to that screen.
   - **Scroll drives it all** through CSS variables and `scrollLeft`, written in one animation frame. React re-renders only when the middle screen changes.
   - **Reduced motion:** nothing pins. The sentence is fully lit, and the screens become a row you swipe through, each with its caption.
   - **Assets:** avatars and profile backgrounds come from the app (`public/app/`). The demo people are Priya Shah, Arjun Mehta and Alex; no real names.
4. **How it works (`#how`):** Before / During / After tabs.
   - Before: a booking confirmation.
   - During: a live transcript with the coral Recording dot.
   - After: Notes, with a summary, decisions and action items you can tick.
5. **Booking (`#booking`):** on a sunken band. A working booking-page preview:
   - It shows this month and next, and the visitor's real time zone.
   - Weekdays after today are open.
   - Capsule time slots, styled like `booking-flow.tsx`.
6. **Personal:** two cards.
   - Teleprompter: a replay of `prompter-card.tsx`. The question, "Looking in your notes" with the three dots, the answer written in, then "From …". It plays once when it scrolls into view.
   - Make it yours: the five real accents (Sage, Patina, Dusk blue, Indigo, Plum) recolour a mini today panel.
7. **Follow-up:** the app's proposal card. Book or Don't book, then the decided state and "Try again".
8. **Questions (`#questions`):** a `details` list with a rotating plus.
9. **Closing:** the mark, the line, and Open Morse.
10. **Footer:** the Morse logo, and "A product by" with the Unified Machines lockup, as in the app.

## Motion

- **Buttons:** capsules sink to 97% when pressed, over 150ms (`active:scale-[0.97]`).
- **Films** pause while off screen and rest on their poster under reduced motion (`film.tsx`).
- **Everything** respects `prefers-reduced-motion` (see the global rule in `globals.css`).

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
