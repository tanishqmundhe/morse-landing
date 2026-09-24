# Morse landing: design system

This is a living document. Update it alongside any visual change.

The landing page follows the **Morse app's design system**: Neural-Arc/morse,
`docs/DESIGN-SYSTEM.md` on `feat/neural-cal`. Where this page and the app
disagree, the app wins. Components and tokens are copied from that branch,
not reinvented.

## Contract points this page keeps

- **#1 Unified Machines' paper, adapted.** The tokens are UM's palette (`um-landing`), not the app's and not invented. UM is flat brutalism with two neutrals; Morse is depth-by-luminance and needs six surface steps, so four values are UM's own and three are interpolations between them, each marked `derived` in `globals.css`. Morse keeps its own structure: 28px capsules, shadows not borders, Plex. Two adaptations: `--ink-soft` is a derived step darker than UM's `--muted-text` (which is meta-sized there and body-sized here), and `--ink-faint` is nudged darker again so it clears 4.5:1 on `--overlay`. Floor measured: 4.6:1 light, 4.8:1 dark.
- **#1b Dark islands on it.** The app keeps video dark in both themes, so every film band (hero, closing, the pricing title) carries `.on-stage`, which scopes the app's whole dark theme — surfaces, ink, action, rim, elevations, accents — to that band. The header joins it while it is transparent. Nothing else on the page is dark.
- **#2 Three accents, each with one job.** Lime (`--action`) marks only things you press. It cannot carry light text, so it takes ink — which makes the primary button identical in both themes for the first time. Pink (`--signal`) marks only what is live; light mode uses UM's `--pink-text` because the Recording clock is 14px and UM's `--pink` is a large-mark colour. Cyan (`--understood`) is defined and unused until the motion pass, where it marks the moment Morse understands something. It is never decoration.
- **#2b The six profile accents stay app-true.** They are colours a user picks in Settings → Appearance, so re-tinting them would make the mockups lie.
- **#2c Footage is never graded to the UI.** The four films are the creators' originals. The scrims over them are tuned by measurement, not by eye: each is set to the lightest value that still clears AA on the text above it, so the native colour survives as far as legibility allows. Re-measure whenever a film or a headline changes.
- **#2d People, in the tiles only.** A tile is a camera, so it shows a person (`<Cam>`, `/app/cam-<colour>.mp4`, one per profile colour). An avatar disc is a profile picture, so it stays a disc — in the roster, the transcript, the "3 in call" pill. The two never stack: a disc painted over a live feed is not a state the app has, so wherever a `<Cam>` went in, the centred disc came out. This is also why nothing here overstates the product: the app really does show discs for profiles and video for cameras.
  Footage is Pexels (free commercial use, no attribution required, **no model release**), so these people stand in a generic call and never carry a name-plus-quote or any endorsement:
  ember `pexels.com/video/7647691` · lagoon `/8135478` · sage `/8048247` · lilac `/5941020` · tide `/8685426` · fjord `/6667340`.
  If a face ever needs to carry a testimonial, it has to be replaced with released stock or a real person first.
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
full-bleed bands inset 14px instead. Content sits in `WRAP`; the booking
cards keep their own 1000px, as the app's page does.

## Big screens

Two breakpoints past Tailwind's `2xl`, declared in `@theme`:

| | CSS px | Panel |
| --- | --- | --- |
| `3xl` | 1920 | a 24″ at 1×, or a 32″ 4K at 2× |
| `4xl` | 2560 | a 32″ 1440p, or a 32″ 4K at 1.5× |

**The column** goes 1200 → 1360 (`2xl`) → 1480 (`3xl`) → 1560 (`4xl`), and
`--page` follows it so the features row starts on the same line.

**The full-bleed rows are the real problem on a big panel, not the column.**
The hero and the header sit edge to edge, so at 2560 the headline and the live
card were **1254px apart**, one on each side, and the mark and the CTA 2204px
apart. Both rows are now capped at 1680 (`3xl`) / 1800 (`4xl`) and centred; the
hero gap settles at 388px and stops growing. Measured before and after.

**The ladder steps up** so the page doesn't read small on a large panel: h1
92 → 104 → 116, `H2` 56 → 64 → 72, `LEAD` 20 → 22. Line length stays at 52–53
characters throughout, and every heading that has to hold two lines still does,
at 1280, 1440, 1920, 2560 and 3440 — the columns those headings sit in were
widened to match the type, or "done properly." dropped to a third line.

## Films

Each film is trimmed and re-encoded for the web (1000–1440px wide, CRF 29–31,
faststart, no audio): 21MB became 1.7MB. `film.tsx` loads none of them until
they are within a screen of the viewport, rests on a poster until then, and
pauses whenever one leaves. A first view of the page transfers about 1.3MB.

## Sections (in order)

1. **Header (`site-header.tsx`):** fixed. It's clear over the film and turns into a solid pill (`bg-canvas/85`, `shadow-float`) once the film has scrolled away.
   - The logo sits on the left and Open Morse (sage) on the right.
   - Between them, a pill of four links in page order. Its `overlay` highlight slides to the section crossing the top third of the screen, and nothing is highlighted over the hero.
2a. **Instead of (`replaces.tsx`):** built to the geometry of the band under aeye.framer.ai's hero, measured off the live page — cells of 200 × 132 inside the column over a 280-tall dotted band, `· · ·  >` at the left edge and `<  · · ·` at the right. Theirs is six fixed cells and nothing moves; ours scrolls the strip and holds the band still, because the list is longer than a row and a marquee takes any number. Track is the list twice over, moving half its width, so the loop never jumps.
   - **Seven categories, each checked against the app** before it went on the page: the video call, the notetaker, the recording library, the transcription service, the in-call assistant, the whiteboard and the booking link. Twenty-one tools.
   - **Left off, and why** (`brand-marks.ts` carries the full note): voice recorders — the voice-note backend is real but the recording, transcription and summarising happen on a phone and there is no iOS client in this repo, so claiming it would be claiming someone else's app. Notion and Confluence — Knowledge feeds the in-call assistant, it is not a wiki. 1Password and Bitwarden — the vault replaces a password pasted into a chat, not a password manager. Google Calendar (Morse syncs with it) and Excalidraw (what the whiteboard runs on).
   - **Every tool has a mark**, from three sets that publish them for reuse: simple-icons (CC0), svgl and gilbarbara/logos. The colour ones (Teams, Granola, Copilot, Descript) are flattened to `currentColor` and have their ids namespaced so four of them on one page can't collide; they were checked at 54px first, because a gradient logo can flatten to a blob.
   - **Six tools were dropped rather than shown bare:** Otter.ai, Fireflies.ai, tl;dv, Grain, Rev and SavvyCal. No public set has a mark for any of them, and lifting each company's own file off its site carries no licence at all. Every category still has a named tool.
   - **`MARKS = false`** drops the marks entirely; comparative use is against most of these brand guidelines.
3. **Hero, option A "Film window" (`hero.tsx`):** the app's signal film (`public/films/signal-loop.mp4`) fills a window inset 14px, `rounded-[30px]`, one screen tall (max 940px). Scrims hold the lower-left dark for the copy; below `lg` a flat 55% canvas layer covers the whole film.
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
   - **The row:** cards at 19:22 (they were 19:25, which left the pictures floating; 380px, 440px on 2xl, 78vw on phones) in one row with wide gaps. The title and one line sit under each card, not inside it. The row starts in line with the page column (`--page`, 1200px, or 1360px on 2xl) and runs off the right.
   - **Moving it:** scroll sideways by trackpad, by dragging with a mouse (snapping is off during the drag and back on release), by keyboard, or with the two round buttons beside the heading, which grey out at each end.
   - **Entrance:** the cards arrive once, one after another, 90ms apart, rising and sharpening.
   - **Playback:** a card animates only while it's on screen (`.feat[data-play]`; the keyframes are in `globals.css` under "Section 3").
   - **The six pictures.** Languages, reactions and the mind map run on CSS keyframes (`features/pictures.tsx`); captions, the whiteboard and the annotation run on GSAP timelines in their own files, paused off screen and resting on a finished frame under reduced motion (`features/timeline.ts`).
     - **Captions (`captions.tsx`):** what's said, then what Morse shows. Speech in Hindi or Marathi holds for 3.4s, turns over into the English caption with the letter 3D swap, and holds 4.6s; the speaker changes with it. Devanagari turns word by word so conjuncts stay whole; Latin turns letter by letter. Hindi and Marathi are set in IBM Plex Sans Devanagari.
     - **Whiteboard (`whiteboard.tsx`):** drawn as Excalidraw draws — roughjs shapes (the same library Excalidraw uses) on its dark canvas (#121212), Excalifont for text, its toolbar island, and two collaborators' cursors with name tags. Arjun and Priya work at the same time: shapes grow as a cursor drags them out, arrows draw under the tip, text types where the cursor clicks, and the cursors glide on eased curves.
     - **Annotation (`annotate.tsx`):** Priya presents a quarter's revenue against target on a light slide. Her pen — the app's first annotation ink, #F2784B — loops round the month that missed, writes "24% short" by hand, then draws an arrow to it, moving the way a hand does.
     - **Reactions:** the app's pixel emoji float up past the Morse mark, centred on the green "lagoon" profile colour — the emoji are warm and sat flat on the blue it used to be; green is across the wheel from them, and "Arjun raised a hand" comes and goes.
     - **18 languages:** each in its own script, rolling past a band and resting on each.
     - **Mind map:** after the notes page's own mind map. All three branches set off together, a beat apart, each growing its points.
   - **Replaced:** the earlier "One meeting, start to finish" tab section, which repeated section 2. The nav's "How it works" link became "Features".
5. **The quiet part (`quiet.tsx`):** four things Morse does while nobody watches it, in the structure aeye.framer.ai uses for its "Understand the flow" band — **measured off the live page**, not guessed from a screenshot.
   - **It pins.** The section is `100svh + 1500px` tall with a sticky child, and the rail is scrubbed by scroll across that 1500px. The first attempt lit the cards as the band drifted past, which is why it looked nothing like the reference: on the real page the band sticks to the top of the window and the rail is dragged across it. Their travel is ~1778px of scroll for 1200px of rail; ours is 1500 for the same width.
   - **The switch is hard.** A card's title and glyph go to full ink the moment the rail's head crosses that card's left edge — not a fade tracking the fill. The colour eases in behind the switch over 420ms. Verified against the live page, where the threshold is the card's own x.
   - **The rail** is a dotted band bled to each card's edges: an 8px bar filling left to right in a 28px ground, with a 12px square riding the head so it stands proud of the bar. Theirs is one strip with the card gaps masked out; drawn per card it comes to the same picture. The description above it is a *fixed* 96px, not a minimum, so all four rails sit on one line.
   - **A colour per card,** from the five accents a person can pick in Settings → Appearance: patina, dusk, indigo, plum, cool to warm. Sage is the one held back — it marks the things you press everywhere else, and spending it here would cost that. The rail, the icon and the number take the card's colour and a wash rises from its foot; the words stay ink so they can still be read. An unlit card holds none of it, so the colour is the reward for the rail arriving.
   - **Glyphs (`quiet-glyphs.tsx`)** are built from the logo's own two primitives, rounded diagonal bars and round dots, and assemble piece by piece as the rail reaches them. They use both diagonals: four glyphs of parallel strokes alone came out as four identical smudges. The absent fourth seat in the first is dashed and never lights.
   - Below `lg` nothing pins — the cards stack and the band renders finished, since a rail that can't travel shouldn't sit half-drawn.
6. **Booking (`#booking`, `booking-page.tsx`):** section 4, the booking page as the app draws one (`booking/booking-shell.tsx`), framed centred.
   - **Above:** "One link, and your calendar does the rest.", one line under it (two lines at every width), and the page's own link in mono (`onmorse.com/priya`) — the reader sees the shape of their own. It was a capsule, which read as a button it isn't; capsules are for pressing. Nothing else sits above the cards — no second host header.
   - **The cards:** two near-square cards (9:10 from `lg`), the app's `ascii-wood` film looping in one (inset 8px, the card's corners, drifting 1 → 1.045 over 18s so it breathes) and the form in the other.
   - **Below:** the three points in one quiet row.
   - **The form plays itself,** each step pushing the last one out sideways as `booking-flow.tsx` does: a day, the times in the guest's zone, name and email, booked.
   - **Polish:** the day ripples under the pointer before it fills; the chosen time fills out from the middle with a growing circle; what's chosen stays in the header strip as the app's crumbs (`· Wed 23 · 10:30`); Confirm presses and reads "Booking…" for a beat; the check beside "You're booked in" draws itself; the undo row arrives after and counts down in real seconds; the pointer drifts slightly between steps so it never looks frozen.
   - **The pointer** measures its targets from the rendered page, so it lands on the day, the time, each field and the button at any card size.
7. **Personal:** two cards.
   - Teleprompter: a replay of `prompter-card.tsx`. The question, "Looking in your notes" with the three dots, the answer written in, then "From …". It plays once when it scrolls into view.
   - Make it yours: the five real accents (Sage, Patina, Dusk blue, Indigo, Plum) recolour a mini today panel.
7. **Follow-up:** the app's proposal card. Book or Don't book, then the decided state and "Try again".
9. **Questions (`#questions`, `faq.tsx`):** section 7. The heading is centred, so the end of the page keeps the booking section's rhythm; the list is not.
   - "A few things you might be wondering." over a 900px column of questions at 25px, numbered `001`… in mono down the left, hairlines between them.
   - One answer is open at a time. The open row lifts onto a raised panel with a dot field over it (`.dots`) and **square** corners — it reads as a sheet pulled out of the list, not a rounded card. Depth is luminance; sage lands only on the control, which is the one thing you press.
   - It opens by height (a `0fr → 1fr` grid row, which eases smoothly whatever the answer's length) over 560ms on the page's curve, while the plus turns 135° into a cross. The answer's left edge lines up with the question's: 96px, being the row's 28px padding, the 36px number and the 32px gap.
   - `lead` and `className` let the pricing page reuse it under its own marker.
   - Each question is a real button carrying `aria-expanded` and `aria-controls`, so it works from the keyboard and reads correctly aloud.
   - "Still wondering?" and a mail link close the section. The address is the one Morse's own mail comes from; confirm it before launch.
10. **Closing (`closing.tsx`):** section 8. The app's ringed-meadow film fills a band inset 14px, `rounded-[30px]`, at least 620px tall from `lg` — the page opens on a film and closes on one. Over it, centred: the mark as a sign-off, the two-tone line ("Less meeting admin. / More meeting of minds.") and Open Morse, its arrow nudging on hover. A top-to-bottom scrim keeps the words at AA over the film.
11. **Footer (`site-footer.tsx`):** a grid, after the arrangement on aeye.framer.ai — a note and the mark on the left, the pages and the accounts beside them, and how to reach us underneath. Cells are divided by the page's hairline, not a drawn rule, so the arrangement reads without the grid shouting.
   - **The mark** runs the full width of its cell, which puts its left edge on the same line as the note and the form above it. It's sized by the column rather than by eye, which is what was wrong before.
   - **Stay in the loop:** an email field and a sage Join capsule. There is no list behind it yet, so rather than swallow the address and say nothing it writes the mail for you and lets you send it.
   - **Follow us:** each account is an icon, a dashed leader line, the name and an arrow that lifts up and right on hover.
   - **Every link** draws a line in from the left on hover and lets it retreat the way it came (`UNDERLINE`, on the shared curve).
   - Under it all: the year, Privacy and Terms, and "A product by" with the Unified Machines lockup.

## Pricing (`/pricing`)

Laid out the way `aeye.framer.ai/pricing` lays one out, in Morse's system. **Every price, limit and plan name is invented** — Morse has no published pricing. What each plan *lists* is real, so the page can be shown without claiming anything the app can't do. Replace the numbers, not the features.

- **Title** over the `clouds` film — the page opens on a film as the home page does. Open sky, for a page about there being nothing hidden, and it appears nowhere else: `ringed-meadow` closes this page and `signal` opens the home one. (Re-encoded from the app's own meeting backgrounds, `frontend/public/meetings/clouds-loop.mp4`, to 432KB at CRF 30.) Scrims hold the left dark and let the light rays stay bright to the right; measured worst-case contrast over the whole text area is 14.7:1 for the title and 6.2:1 for the lede. A hairline closes the band.
- **No section markers.** The reference numbers its parts (`[N.01/04] > PLAN DETAILS`); that register isn't ours. Each part opens with the page's own eyebrow instead.
- **Plans (`pricing/plans.tsx`):** monthly/yearly, the highlight sliding between them as the nav's does. Three cards; the chosen one is lifted by luminance (`bg-float`) rather than outlined, and takes the sage button. Pennies are set back so the number reads first; £0 reads "Free".
- **Compare (`pricing/compare.tsx`):** sixteen lines in four groups, each opening with its own raised header. "Yes" becomes a tick, "—" stays a dash. It scrolls sideways on a narrow screen rather than folding: a comparison you can't compare is no use.
- **Voices:** deliberately empty. Fabricated quotes from people who don't exist would be the one dishonest thing on the page, so the section says so instead.
- **Rhythm:** each part carries bottom padding only (`PART`), so the gap between two parts is one section's worth. `SECTION` can't be cancelled with `pt-0` here — its `lg:py-40` sits in a media query and wins.
## Motion

- **One curve.** `EASE` in `ui.tsx` (`cubic-bezier(0.22, 1, 0.36, 1)` — quick to leave, long to arrive) is used by everything that opens, lifts, slides or draws itself in, so the whole page settles the same way instead of each piece easing to its own taste.
- **Links** draw a line in from the left on hover and let it retreat the way it came (`UNDERLINE`). Buttons don't: a capsule already answers a press.
- **Scrolling** is eased by Lenis (`smooth-scroll.tsx`), driven from GSAP's ticker so the
  scroll and the card timelines settle in one frame. `lerp: 0.12` for the wheel; anchor links
  use a fixed 1.1s instead, so a jump to the last section doesn't drag. Lenis eases the real
  window scroll, so `position: sticky`, the pinned showcase, the header's scroll test and
  find-in-page are untouched, and it reads each section's `scroll-mt-24` itself — all four nav
  targets rest 120px from the top, exactly where native smooth scrolling put them.
  `allowNestedScroll` leaves horizontal swipes over the features filmstrip to the browser.
  Touch stays native (Lenis's default) and `respectReducedMotion` drops smoothing to 1:1.
- **Buttons:** capsules sink to 97% when pressed, over 150ms (`active:scale-[0.97]`).
- **Films** pause while off screen and rest on their poster under reduced motion (`film.tsx`).
- **No `filter` inside the showcase row.** The screens are drawn at 1120×700 and `scale()`d to fit, and a filtered element gets rastered at its layout size and stretched. The calendar's dropped-in follow-up used `animate-enter`, which blurs on the way in, and stayed soft; it uses `animate-rise` now.
- **Everything** respects `prefers-reduced-motion` (see the global rule in `globals.css`).
- **Keyframes set from JavaScript must live outside `@theme`.** Tailwind drops any keyframes in that block it can't see a utility for, so `@keyframes fill` — used by the hero card's timeline and the showcase's progress bar, both from JS — was tree-shaken and neither animation ever ran. It now sits in plain CSS with `film-drift` and `.dots`.

## White label

The page carries no Unified Machines or Neural Arc branding except the maker
line in the footer. The twelve profile assets in `public/app/` (six avatars,
six backgrounds) were redrawn from the app's own palette with the **Morse**
mark in place of the Neural Arc one — same six colours, sampled from the
originals. The booking host has no company, and every address is
`@onmorse.com`.

## Claims corrected against the app

Checked on 2026-09-23 against `feat/neural-cal`, before writing the replaces
list. What the code would not support:

- **No Google Drive import.** `migrations/0030_knowledge_files.py` names `drive` as a source value and says "for milestone 3". No OAuth scope, no API call, no picker, no route, no button.
- **No iOS app in this repo.** The voice-note backend is real; the client that records, transcribes and summarises is not here, and the plan to adopt it is marked DROPPED.
- **Not "diarised".** Speaker identity comes from the authenticated per-participant track, not a diarizer. Say speaker-attributed — it's the better claim anyway.
- **Not "writes to both calendars".** One event on the host's primary calendar; colleagues appear via Google attendees, external guests get an ICS email instead.
- **Not `freeBusy`.** Availability reads the host's own calendar with `events.list`, by explicit decision.
- **No round-robin, no team booking page.** Out of scope in plan 020.
- **Voice-note export is Markdown and TXT**, not PDF.

- **No Google Drive.** The showcase said Knowledge takes "files and Google Drive folders". `migrations/0030_knowledge_files.py` names `drive` as a source value but marks it "for milestone 3" — it isn't shipped. The line is now "whole documents dropped in and read", with the real upload types.
- **Nothing "lives in your Google account".** Morse keeps notes, transcripts and recordings itself; what's true is Google-only sign-in and meetings written onto the calendar you already keep.
- **Tokens are not BYOK.** Morse issues *you* a token so a script or an AI agent can drive Morse as you (Settings → API tokens, `Authorization: Bearer mp_…`). There is no way to give Morse your own model key; the provider is server-side. The copy must not promise scopes or rate limits: a token is all-or-nothing and neither exists yet.

## Copy

Run against blader/humanizer's 25 patterns on 2026-09-23. What it caught and
what changed is in the commit; what it did **not** catch is worth recording —
no stock AI vocabulary anywhere, no staged run-ups, no forced triads, and only
two em-dashes in the whole of the prose. Things to keep out when adding copy:
closers that restate the sentence before them, "not X but Y" framings that
correct nothing, sayings that dress an ordinary claim as a hidden truth, and
em-dashes used as the universal connector.

The hero and the closing lines were left alone. Both are two-fragment
constructions the skill would flag, and both are brand lines the client chose.

## Copy rules

All copy lives in `src/content/site.ts` and uses the app's own words: "Notes", "Teleprompter", "booking page". Every claim was checked against the code on 2026-09-22. Don't claim team or round-robin booking, payments, general "agentic workflows", or a script-reading teleprompter. None of them exist.

## Open questions

- **Who can sign up?** Sign-in is Google only and currently limited to `@neuralarc.ai`. The CTA opens `https://onmorse.com` (`links.app`). Change it once public access or a waitlist exists.
- **Hero image:** the crop shows a real person's name and title ("Aniket, CEO, Neural Arc"). Replace it with a demo-data capture before launch if that isn't wanted.
- **`hello@onmorse.com` has to exist.** The page white-labels away from `@neuralarc.ai`; this inbox is used in the footer, the questions and the sign-up form and must be live before launch.
- **No OG image or canonical URL yet.** Both depend on the landing page's final domain.
- **Social accounts.** The five in the footer are placeholders pointing nowhere. Swap in the real handles, or drop the ones that don't exist.
- **The mailing list.** "Stay in the loop" has nothing behind it; the form opens a mail draft to `hello@neuralarc.ai`. Wire it to a list, or keep the draft.
- **Privacy and Terms** are linked from the footer and don't exist yet.
- **Pricing is invented.** Every price, limit and plan name on `/pricing` is a placeholder. The features each plan lists are real.

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
