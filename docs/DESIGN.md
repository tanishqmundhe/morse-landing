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
3. **Product (`#product`, `showcase/showcase.tsx`):** section 2. It is pinned while three things happen in turn:
   - **Lighting:** the sentence sits centred on the screen and lights up word by word: "Morse is a video call [3 in call] that writes everything down, [Transcript] answers what you're asked, [From Acme notes] and books what comes next. [Thu, 2:00 pm]". Each chip plays its part as the light reaches it: the avatars slide together, and the booking chip turns sage. It's left-aligned Plex 300, 28/40/48/56px, in a column up to 1560px wide on 2xl.
   - **Rising:** once it's nearly lit, the sentence eases up to the top and the row of screens rises and fades in beneath it.
   - **Travelling:** scrolling moves the row sideways, resting on each screen in turn.
     - The row runs Home, Room, Booking, Teleprompter, Notes, Calendar, Knowledge. Only Room to Calendar ever take the middle, so a screen fades off on each side the whole way; Home and Knowledge exist to be those sides.
     - The line above belongs to the screen in the middle. The sentence stands for Room; each other screen has its own line in the same words-and-chips voice. Lines swap with a per-letter 3D roll (after Fancy Components' Letter 3D Swap): each letter is a small box turning on its horizontal axis, a chip turning as one piece. Moving forward, the old line rolls up and away while the new one rolls up into place, in a left-to-right wave (at most 14ms apart, 620ms each, with a slight spring). Moving back, both roll down. Lines are left-aligned and top-aligned in one cell, so a new line turns over on the same rows as the old one.
     - The middle screen plays its animation. The others step back by distance (scale down to 88%, opacity down to 45%), and the row's edges fade out through a mask.
   - **No chrome:** no counter, titles, progress bar or name tabs.
   - **Sizes follow the window:** screens are up to 60vw wide, whatever the height leaves, and at most 1320px.
   - **Scroll per phase** is set by the constants at the top of the file (`PRE`, `LIGHT`, `RISE`, `SETTLE`, `TRAVEL`, `DWELL`, `END`). `END` is 0.9 of a screen height, so Calendar rests centred, and plays, before the section lets go; a trackpad flick can't carry past it.
   - **Reduced motion:** nothing pins. The sentence shows fully lit, and the screens become a swipeable row with their lines underneath.
   - **Assets:** avatars and profile backgrounds come from the app (`public/app/`). The demo people are Priya Shah, Arjun Mehta and Alex; no real names.
   - **Section spacing** is generous across the page: `py-28 lg:py-40 2xl:py-48`, and the wrap grows to 1360px on 2xl.
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
