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

| Use | Size | Where |
| --- | --- | --- |
| Hero h1 | 52 → 76 → 92 | `hero.tsx` |
| Closing | 40 → 56 → 72 | `closing.tsx` |
| Section h2 | 38 → 48 → 56 | `H2` in `ui.tsx` |
| Card title | 27 | |
| Section lead | 18 → 20 | `LEAD` in `ui.tsx` |
| Body | 17 | |
| Small print | 15 | |
| Label | 13 mono 600, tracked 1.6px, uppercase | `Eyebrow` |

Nothing on the page is set below 13px (the rebuilt app screens inside cards are
scaled artwork, and don't count). Section leads use `LEAD`; everything else is 17px.

## Spacing

`SECTION` (`ui.tsx`) is the one rhythm between the hero and the closing:
112px on phones, 160 from `lg`, 192 from `2xl`. The hero and closing are
full-bleed bands inset 14px instead. Content sits in `WRAP` (1200px, 1360 on
2xl); the booking cards keep their own 1000px, as the app's page does.

## Films

Each film is trimmed and re-encoded for the web (1000–1440px wide, CRF 29–31,
faststart, no audio): 21MB became 1.7MB. `film.tsx` loads none of them until
they are within a screen of the viewport, rests on a poster until then, and
pauses whenever one leaves. A first view of the page transfers about 1.3MB.

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
     - The row runs Home, Room, Booking, Teleprompter, Notes, Calendar, Knowledge. It opens on Room with Home fading off to the left, and every screen from Room to Knowledge takes the middle before the section lets go. The row has half a screen of end padding so Knowledge can be centred. When Knowledge is in the middle, its search types "Acme renewal" and the matching note is outlined in sage.
     - The line above belongs to the screen in the middle. The sentence stands for Room; each other screen has its own line in the same words-and-chips voice. Lines swap with a per-letter 3D roll (after Fancy Components' Letter 3D Swap): each letter is a small box turning on its horizontal axis, a chip turning as one piece. Moving forward, the old line rolls up and away while the new one rolls up into place, in a left-to-right wave (at most 14ms apart, 620ms each, with a slight spring). Moving back, both roll down. Lines are left-aligned and top-aligned in one cell, so a new line turns over on the same rows as the old one.
     - The middle screen plays its animation. The others step back by distance (scale down to 88%, opacity down to 45%), and the row's edges fade out through a mask.
   - **No chrome:** no counter, titles, progress bar or name tabs.
   - **Sizes follow the window:** screens are up to 60vw wide, whatever the height leaves, and at most 1320px.
   - **Scroll per phase** is set by the constants at the top of the file (`PRE`, `LIGHT`, `RISE`, `SETTLE`, `TRAVEL`, `DWELL`, `END`). `END` is 0.9 of a screen height, so Knowledge, the last screen, rests centred and plays before the section lets go; a trackpad flick can't carry past it.
   - **Reduced motion:** nothing pins. The sentence shows fully lit, and the screens become a swipeable row with their lines underneath.
   - **Assets:** avatars and profile backgrounds come from the app (`public/app/`). The demo people are Priya Shah, Arjun Mehta and Alex; no real names.
   - **Section spacing** is generous across the page: `py-28 lg:py-40 2xl:py-48`, and the wrap grows to 1360px on 2xl.
4. **Features (`#features`, `features/features.tsx`):** section 3, "Everything else you'd expect, done properly", laid out as a filmstrip.
   - **The row:** tall cards (19:25; 380px, 440px on 2xl, 78vw on phones) in one row with wide gaps. The title and one line sit under each card, not inside it. The row starts in line with the page column (`--page`, 1200px, or 1360px on 2xl) and runs off the right.
   - **Moving it:** scroll sideways by trackpad, by dragging with a mouse (snapping is off during the drag and back on release), by keyboard, or with the two round buttons beside the heading, which grey out at each end.
   - **Entrance:** the cards arrive once, one after another, 90ms apart, rising and sharpening.
   - **Playback:** a card animates only while it's on screen (`.feat[data-play]`; the keyframes are in `globals.css` under "Section 3").
   - **The six pictures.** Languages, reactions and the mind map run on CSS keyframes (`features/pictures.tsx`); captions, the whiteboard and the annotation run on GSAP timelines in their own files, paused off screen and resting on a finished frame under reduced motion (`features/timeline.ts`).
     - **Captions (`captions.tsx`):** what's said, then what Morse shows. Speech in Hindi or Marathi holds for 3.4s, turns over into the English caption with the letter 3D swap, and holds 4.6s; the speaker changes with it. Devanagari turns word by word so conjuncts stay whole; Latin turns letter by letter. Hindi and Marathi are set in IBM Plex Sans Devanagari.
     - **Whiteboard (`whiteboard.tsx`):** drawn as Excalidraw draws — roughjs shapes (the same library Excalidraw uses) on its dark canvas (#121212), Excalifont for text, its toolbar island, and two collaborators' cursors with name tags. Arjun and Priya work at the same time: shapes grow as a cursor drags them out, arrows draw under the tip, text types where the cursor clicks, and the cursors glide on eased curves.
     - **Annotation (`annotate.tsx`):** Priya presents a quarter's revenue against target on a light slide. Her pen — the app's first annotation ink, #F2784B — loops round the month that missed, writes "24% short" by hand, then draws an arrow to it, moving the way a hand does.
     - **Reactions:** the app's pixel emoji float up past the Morse mark, centred on the blue "tide" profile colour, and "Arjun raised a hand" comes and goes.
     - **18 languages:** each in its own script, rolling past a band and resting on each.
     - **Mind map:** after the notes page's own mind map. All three branches set off together, a beat apart, each growing its points.
   - **Replaced:** the earlier "One meeting, start to finish" tab section, which repeated section 2. The nav's "How it works" link became "Features".
5. **Counted (`numbers.tsx`):** a quiet band between the features and the booking page. Four figures — 18 languages, 16 backgrounds, 7 camera styles, 11 note templates — each over a hairline, counting up once when the band arrives and then left alone (`useLoop`'s `repeat: 0`). Beside the heading, one line: what Morse works with (Google Calendar, Drive and sign-in), in words rather than borrowed logos.
6. **Booking (`#booking`, `booking-page.tsx`):** section 4, the booking page as the app draws one (`booking/booking-shell.tsx`), framed centred.
   - **Above:** "One link, and your calendar does the rest.", one line under it, and the page's own link as a quiet chip (`onmorse.com/priya`). Nothing else sits above the cards — no second host header.
   - **The cards:** two near-square cards (9:10 from `lg`), the app's `ascii-wood` film looping in one (inset 8px, the card's corners, drifting 1 → 1.045 over 18s so it breathes) and the form in the other.
   - **Below:** the three points in one quiet row.
   - **The form plays itself,** each step pushing the last one out sideways as `booking-flow.tsx` does: a day, the times in the guest's zone, name and email, booked.
   - **Polish:** the day ripples under the pointer before it fills; the chosen time fills out from the middle with a growing circle; what's chosen stays in the header strip as the app's crumbs (`· Wed 23 · 10:30`); Confirm presses and reads "Booking…" for a beat; the check beside "You're booked in" draws itself; the undo row arrives after and counts down in real seconds; the pointer drifts slightly between steps so it never looks frozen.
   - **The pointer** measures its targets from the rendered page, so it lands on the day, the time, each field and the button at any card size.
7. **Personal:** two cards.
   - Teleprompter: a replay of `prompter-card.tsx`. The question, "Looking in your notes" with the three dots, the answer written in, then "From …". It plays once when it scrolls into view.
   - Make it yours: the five real accents (Sage, Patina, Dusk blue, Indigo, Plum) recolour a mini today panel.
7. **Follow-up:** the app's proposal card. Book or Don't book, then the decided state and "Try again".
9. **Questions (`#questions`, `faq.tsx`):** section 7, centred, so the end of the page keeps the booking section's rhythm.
   - "A few things you might be wondering." over a 860px column of questions at 25px, hairlines between them.
   - One answer is open at a time. It opens by height (a `0fr → 1fr` grid row, which eases smoothly whatever the answer's length) while the plus turns into a cross.
   - Each question is a real button carrying `aria-expanded` and `aria-controls`, so it works from the keyboard and reads correctly aloud.
   - "Still wondering?" and a mail link close the section. The address is the one Morse's own mail comes from; confirm it before launch.
10. **Closing (`closing.tsx`):** section 8. The app's ringed-meadow film fills a band inset 14px, `rounded-[30px]`, at least 620px tall from `lg` — the page opens on a film and closes on one. Over it, centred: the mark as a sign-off, the two-tone line ("Less meeting admin. / More meeting of minds.") and Open Morse, its arrow nudging on hover. A top-to-bottom scrim keeps the words at AA over the film.
11. **Footer (`site-footer.tsx`):** the mark and one line on the left, three short columns beside it (the page, Morse, say hello), then a rule and the year with "A product by" and the Unified Machines lockup. It stacks on a phone.
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
