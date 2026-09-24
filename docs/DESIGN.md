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
- **#2e The artwork is a panel, never a backdrop.** The infrared work (`/art/*.webp`) is false-colour: black sky, lime and cyan rock, coral ground, with the scan-echo glitch baked into the pixels rather than animated over them. There is no corner of it that holds a headline without a scrim heavy enough to throw away the reason for showing it — so words sit on paper and the artwork gets its own framed panel below them. A light card may sit on it; text may not.
  It is already the page's palette: the lime is `--action`, the coral is near `--signal`, the cyan is `--understood`. Nothing was tinted to fit.
  **It only works because it is rare.** Four places on the home page and nowhere else: the hero, where it is the whole first screen; the phone section, where it is a framed panel; the used-by band, where it is scrimmed to 82% and is texture rather than picture; and the photograph inside the booking mock. The closing band is a plain well and the pricing page carries none at all — both deliberately, following the reference. A fifth would spend it.
  **All four take the theme.** The hero and the used-by band used to stay black-skied in both and carry `.on-stage` with them, which made the first screen of a light page a dark room and left `signal-light.webp` sitting in `public/art` unused. Each place now has a scrim per sky — paper over the cream one, ink over the black one, the same shape both times — so the words land in the same place either way. Measured on the light hero: title 17.3:1, the muted second line 7.4:1.
  Five pieces exist (`signal`, `current`, `memory`, `voices`, `dusk`); `knowledge` and `voices-light` are shipped but unreferenced and are the first things to delete if the folder needs trimming.
  Source PNGs are 1536x1024 at ~3 MB; shipped as 1600px WebP at ~200-260 KB, which is the only reason this is affordable at all.
- **#2f One ornament: the Morse rule.** A line of Morse along the top right of each panel, spelling MORSE. It is the product's name in the product's own alphabet, which is the only kind of ornament contract #7 allows.
- **#2g An accent is a fill or it is text, never both.** Each of the three has an `-ink` form, and which one a place takes is decided by measurement, not by eye. The neon goes on fills, bars and anything large enough to be a shape; the `-ink` form goes on every piece of text and on any mark that has to be read — an icon, a numeral, a label. Two shipped wrong before this was written down: a yellow key icon at **1.07:1** against its own card, and paper initials at **1.1:1** on a yellow disc. If you are about to put an accent on something, measure it against what is behind it first: 4.5:1 for text, 3:1 for a mark.
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

1. **Header (`site-header.tsx`):** fixed, and glass at every scroll position — `backdrop-blur-xl backdrop-saturate-150` over `bg-canvas/55`, going to `/88` once the film has scrolled away. It used to be fully transparent over the hero, which left `ink-soft` links sitting on the arch's lime and all but invisible; the single scrim under the bar is not enough where the picture is brightest. Blurring and darkening the backdrop fixes it everywhere at once and stops the links changing legibility as you scroll.
   - No `.on-stage` over the hero any more: the hero takes the theme itself, so the bar is simply the page's own colours at every position.
   - The logo sits on the left and Open Morse (sage) on the right.
   - **The rule follows the pointer**, and falls back to the current page when the pointer leaves. A bar that only reports where you are answers nothing; one that answers the pointer feels alive without adding a single new colour.
   - **Features opens a panel of six** — in the meeting, Morse Intelligence, everything else, booking pages, on your phone, agents. It listed seventeen in three columns, which is a sitemap: seventeen choices take longer to read than scrolling the page they offer to save you.
     One column, and a single block that slides to whichever row the pointer is on — the same device as the rule under the nav, which is how this page marks a place. The arrow slides in with it.
     **The hrefs are bare fragments.** Written as `/#product` it is a route change as far as Next is concerned, so the home page reloaded and jumped to the anchor instead of gliding to it — Lenis only takes anchors beginning with `#`. The header puts the `/` back on other pages, where it really is a route change.
   - **The links are centred on the bar, not on what is left over.** As a flex item between the logo and the buttons they sat 43px left of centre at every width, because the actions are 193px wide against the logo's 107 and `justify-between` splits the difference. They are absolutely centred now.
   - Between them, four links: **Features, Compare, Pricing, Developers.** "Product" was the home page's label and said nothing — every page here is about the product. Its highlight is a rule under the current word. Its `overlay` highlight slides to the section crossing the top third of the screen, and nothing is highlighted over the hero.
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
     - Morse Intelligence: Daniel's question, answered from notes.
     - Follow-up: Book is pressed for you, then "Booked. Invites sent."
     - The segments underneath are the timeline and can be pressed to jump. Hovering holds the scene; with reduced motion nothing advances on its own.
   - The other three options (B Split stage, C Rooms, D Signal) are kept in `design/mockups/hero-options/index.html`.
3. **Product (`#product`, `showcase/showcase.tsx`):** section 2. It is pinned while three things happen in turn:
   - **Lighting:** the sentence sits centred on the screen and lights up word by word: "Morse is a video call [3 in call] that writes everything down, [Transcript] answers what you're asked, [From Acme notes] and books what comes next. [Thu, 2:00 pm]". Each chip plays its part as the light reaches it: the avatars slide together, and the booking chip turns sage. It's left-aligned Plex 300, 28/40/48/56px, in a column up to 1560px wide on 2xl.
   - **Rising:** once it's nearly lit, the sentence eases up to the top and the row of screens rises and fades in beneath it.
   - **Travelling:** scrolling moves the row sideways, resting on each screen in turn.
     - The row runs Home, Room, Booking, Morse Intelligence, Notes, Calendar, Knowledge. It opens on Room with Home fading off to the left, and every screen from Room to Knowledge takes the middle before the section lets go. The row has half a screen of end padding so Knowledge can be centred. When Knowledge is in the middle, its search types "Acme renewal" and the matching note is outlined in sage.
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
5b. **Who uses Morse (`#used-by`, `used-by.tsx`):** seven companies, as their own marks, reversed out of a dark band. It sits after the quiet part and before booking — you have seen what it does, here is who does it with, now here is how to start.
   - **Centred heading on paper, marks on the band.** Contract #2e holds even at 82% scrim: a card may sit on the artwork, loose text may not.
   - **It takes the theme.** Cream sky and ink marks on a light page, black sky and paper marks on a dark one. It shipped black-skied in both, which left a dark slab in the middle of a cream page.
   - **Not washed out.** The paper scrim came down from 0.88 to 0.55 (ink 0.74 → 0.70): at 0.88 the picture read as a pale smear and the comets barely showed. Marks still hold 7.5:1 light. The same complaint applied to the "Instead of" band, whose artwork went from 25% to 45% opacity.
   - **`object-[center_18%]`, for the comets.** The first crop chased luminance — the picture's middle band is its darkest — and landed on 72%, which is the water and the scrub: the half with nothing in it. The comets are the subject and they live in the top third. Scrim came down to 0.76 light / 0.74 dark to let them through; measured worst case, marks hold 10.9:1 light and 8.1:1 dark.
   - **`object-[center_72%]`.** The picture's middle band is its darkest, and cropping there gave a flat olive rectangle with no artwork in it at all. 72% lands on the lit mesa and the ground below.
   - **Every mark carries its name**, set in the page's own mono label. Not one of these is a logo anybody recognises, so a bare row would be decoration claiming to be proof.
   - **Names are `ink/80`, not `ink-soft`.** Measured against the brightest pixel under the row: marks 9.2:1, `ink-soft` names 4.2:1 — under AA for text this small — `ink/80` names about 6.6:1.
   - **Marks come from each company's own site** (`company-marks.ts`), flattened to `currentColor` with their ids namespaced. Two shipped mark-plus-wordmark lockups and were cut back to the mark by bounding box, so all seven read at one weight. Fahrenheit publish no vector at all, so theirs is a CSS mask over `currentColor`.
   - **This is different from the "Instead of" band.** Those are competitors named comparatively with no licence; these are companies who agreed to be listed. Consent is what makes it allowed, so **confirm each one before launch** and take any that have not agreed out of the array.
   - **Nothing links out.** Seven outbound links at the foot of the page are seven ways to leave it.
   - **Not a marquee.** The Framer templates all run this as a fading logo marquee; section 2a is already a marquee and a second one would make the page read as though it only moves sideways.

6. **Booking (`#booking`, `booking-page.tsx`):** section 4, the booking page as the app draws one (`booking/booking-shell.tsx`), framed centred.
   - **Above:** "One link, and your calendar does the rest.", one line under it (two lines at every width), and the page's own link in mono (`onmorse.com/priya`) — the reader sees the shape of their own. It was a capsule, which read as a button it isn't; capsules are for pressing. Nothing else sits above the cards — no second host header.
   - **The cards:** two near-square cards (9:10 from `lg`), the app's `ascii-wood` film looping in one (inset 8px, the card's corners, drifting 1 → 1.045 over 18s so it breathes) and the form in the other.
   - **Below:** the three points in one quiet row.
   - **The form plays itself,** each step pushing the last one out sideways as `booking-flow.tsx` does: a day, the times in the guest's zone, name and email, booked.
   - **Polish:** the day ripples under the pointer before it fills; the chosen time fills out from the middle with a growing circle; what's chosen stays in the header strip as the app's crumbs (`· Wed 23 · 10:30`); Confirm presses and reads "Booking…" for a beat; the check beside "You're booked in" draws itself; the undo row arrives after and counts down in real seconds; the pointer drifts slightly between steps so it never looks frozen.
   - **The pointer** measures its targets from the rendered page, so it lands on the day, the time, each field and the button at any card size.
7. **Personal:** two cards.
   - Morse Intelligence: a replay of `prompter-card.tsx`. The question, "Looking in your notes" with the three dots, the answer written in, then "From …". It plays once when it scrolls into view.
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
10b. **On your phone (`#app`, `app-section.tsx`):** the iOS app, as a poster rather than a band. One `dusk` artwork panel with a margin all round, and two things standing on it.
   - **The copy** sits on a frosted card (`bg-canvas/88`, `backdrop-blur-xl`) over the picture — a light card on the artwork, which is the one thing contract #2e allows there. Loose text on it is still forbidden.
   - **The phone is a real screenshot**, not a drawing. It was a handset rebuilt out of the page's own tokens, which meant the one place on the site promising a shipped product was showing something that had never been built. `public/app/phone-meetings.webp` is the iOS Meetings screen at 780 × 1350.
   - **It is cropped just under the Upcoming/Past control and has no bottom bezel**, so it runs off the panel's foot and the panel's own `overflow-hidden` cuts it. Two reasons: a device coming up out of the picture reads better than a picture of a device, and the capture's meeting list below that line was test data (`Meeting uwh-bvbx-iux`, `Dfs`, both cancelled). If a longer screen is ever wanted, recapture with real meetings — do not uncrop this one.
   - **Bezel `#0e1d21` light / `#2c2b2a` dark.** `bg-ink` inverts, and a white handset in dark mode read as a lit object rather than a device.
   - **Layout options** A–D are in the history below; C was chosen.

11. **Footer (`site-footer.tsx`):** a grid, after the arrangement on aeye.framer.ai — a note and the mark on the left, the pages and the accounts beside them, and how to reach us underneath. Cells are divided by the page's hairline, not a drawn rule, so the arrangement reads without the grid shouting.
   - **The mark** runs the full width of its cell, which puts its left edge on the same line as the note and the form above it. It's sized by the column rather than by eye, which is what was wrong before.
   - **Stay in the loop:** an email field and a sage Join capsule. There is no list behind it yet, so rather than swallow the address and say nothing it writes the mail for you and lets you send it.
   - **Follow us:** each account is an icon, a dashed leader line, the name and an arrow that lifts up and right on hover.
   - **Every link** draws a line in from the left on hover and lets it retreat the way it came (`UNDERLINE`, on the shared curve).
   - Under it all: the year, Privacy and Terms, and "A product by" with the Unified Machines lockup.

## Compare (`/compare`)

Three parts, in the order a sceptic reads them: the money, the seven jobs one
login replaces, and — last and deliberately — what Morse does not do.

- **The third part is why the first two are believable.** A comparison page that only lists wins is an advert and everyone can tell. Every line of it is checked against the app, and it names the competitor that wins each one.
- **No tick-and-cross matrix against named rivals.** A grid of red crosses under somebody else's logo is a claim about their product that goes stale the week they ship, and comparative use of their marks is against most of their brand guidelines besides. The page asserts what things cost and what job they do — both checkable, neither an opinion.
- **Competitor prices are the most perishable thing on the site.** They were supplied by the team on 2026-09-24 as list prices for one seat billed monthly in USD, and the page prints that date. **Re-check every row before launch** and update `comparison.checked`. A stale number in a comparison table is the one mistake a competitor will screenshot.
- **Morse's own numbers come from `pricing.plans`**, not a second list, so there is one place to change them. They are still placeholders.
- Plain paper, no artwork: a comparison page that shouted would make the reader distrust the numbers on it.
- **Built as a document, after Linear's `/switch`:** a sticky numbered rail down the left, one narrow column of argument on the right, hairlines between the parts, and display type big enough to carry the first screen alone. The first pass was three plain sections stacked with a table in the middle — correct, and completely forgettable.
- **The number before the table.** Three boxes against one is the whole argument and it should read from across the room, so the stack's total and Morse Pro sit side by side as two cards above the rows that explain them.
- **The seven jobs carry the tools' own marks**, from the same `BRANDS` list the home page's band runs on, grouped off `cat` so the two can never drift. A column of names was a wall of grey.

## Pricing (`/pricing`)

Laid out the way `aeye.framer.ai/pricing` lays one out, in Morse's system. **Every price, limit and plan name is invented** — Morse has no published pricing. What each plan *lists* is real, so the page can be shown without claiming anything the app can't do. Replace the numbers, not the features.

- **Title** over the `clouds` film — the page opens on a film as the home page does. Open sky, for a page about there being nothing hidden, and it appears nowhere else: `ringed-meadow` closes this page and `signal` opens the home one. (Re-encoded from the app's own meeting backgrounds, `frontend/public/meetings/clouds-loop.mp4`, to 432KB at CRF 30.) Scrims hold the left dark and let the light rays stay bright to the right; measured worst-case contrast over the whole text area is 14.7:1 for the title and 6.2:1 for the lede. A hairline closes the band.
- **No section markers.** The reference numbers its parts (`[N.01/04] > PLAN DETAILS`); that register isn't ours. Each part opens with the page's own eyebrow instead.
- **Plans (`pricing/plans.tsx`):** monthly/yearly, the highlight sliding between them as the nav's does. Three cards; the chosen one is lifted by luminance (`bg-float`) rather than outlined, and takes the sage button. Pennies are set back so the number reads first; £0 reads "Free".
- **Compare (`pricing/compare.tsx`):** sixteen lines in four groups, each opening with its own raised header. "Yes" becomes a tick, "—" stays a dash. It scrolls sideways on a narrow screen rather than folding: a comparison you can't compare is no use.
- **Voices:** deliberately empty. Fabricated quotes from people who don't exist would be the one dishonest thing on the page, so the section says so instead.
- **Rhythm:** each part carries bottom padding only (`PART`), so the gap between two parts is one section's worth. `SECTION` can't be cancelled with `pt-0` here — its `lg:py-40` sits in a media query and wins.
## Why the faces stopped looking fake

Every cam clip is cut from one source recording, so played from the top **all
three tiles show the same frame at the same moment** — everyone blinks
together, nods together, smiles together. A room of people moving in lockstep
is the single thing that makes footage read as fake, and it does it whatever
the footage is.

`<Cam seat={n}>` fixes it: each seat starts at a different point in its clip
(0 / 1.9 / 3.5 / 2.7s) **and runs at a slightly different rate** (1 / 0.94 /
1.06 / 0.97). The offset alone would only hold them a fixed distance apart; the
rate difference makes them drift, so no two tiles are ever in step again.

- **Keep the rate within a few percent of 1.** Past that it is visible as slow motion on a talking head.
- **The seat is the person, not the position**, in the showcase room — otherwise somebody jumps to a different part of their clip when the speaker changes.
- Pass a seat anywhere several tiles share a screen: the Intelligence section, the annotation card, the captions card. A lone tile does not need one.

## Morse Intelligence, the section (`#intelligence`, `intelligence.tsx`)

Sits after the showcase, where the meeting has just been shown. Layout borrowed
from the booking section: a framed mock that plays itself on one GSAP clock, on
the artwork, with the words on the page above it.

- **One notification, finishing its sentence.** The spec's rule is that looking → answering → answered is the same card getting to the end of what it started, never three cards replacing one another — re-playing the entry on each change reads as flicker. There is a single card element and the timeline rewrites what is inside it.
- **Three cases, 8s each, a 24s loop.** An answer, a nothing-found, and an offer to book. A section that only ever shows the happy path is a section nobody believes, and those three are what the feature actually does.
- **The record fills up beside it.** Each notification expires into a row that washes coral for 1.1s. That flash is the answer to "where did that go?", and it is the only place a row is ever tinted.
- **Hidden states are `display: none`, not just `autoAlpha`.** With `autoAlpha` the card kept the height of its tallest state, so "Looking in your notes" sat in a 200px empty panel. It now resizes with its content — 105px for the short answer, 194px for the offer.
- **The room fills the frame.** The tiles were pinned to the foot with artwork showing above them, which left a third of a very large section doing nothing. Two tiles on a phone, three from `sm`.
- **`w-[min(460px,calc(100%-24px))]`, with the `calc`.** Written as `100%-24px` Tailwind emits it verbatim, the declaration is invalid, and the card took its 460px on a 350px phone frame. Any arbitrary value doing arithmetic needs the `calc`.
- Reduced motion rests at 4.6s — the card answered, the source shown, nothing moving.

## Morse Intelligence

**The feature is called Morse Intelligence, not the Teleprompter.** The handoff
spec of 24 September 2026 flagged the name as the largest unresolved thing in
it — one sparkle icon opened "Teleprompter and vault", while the tab called
Teleprompter held heard answers, booking offers *and* a typed assistant, and a
teleprompter to most people scrolls a script you read aloud. The name is now
settled. Internal keys (`id: "intelligence"`, `chip: "intelligence"`) follow it,
so nobody has to remember the old one.

The screen (`showcase/screens.tsx`, `IntelligenceScreen`) is built to that
spec, whose one rule is: **the notification carries the live moment, the panel
keeps the record.** Anything you must read right now is over the stage at full
size; anything you might want later is a line in the panel. Nothing tries to be
both.

- **There is a notification over the stage.** Answers used to appear only in the 300px panel, at 14px, beside the person still talking. It is top-centre on `float` now, at 19/1.45 in 300 weight, because the reader has one glance to spare. It carries who asked, the answer, and the source in `ink-faint`.
- **A collapsed row leads with the answer, not the question.** The reader was in the room and heard the question asked, so it is the least informative thing on the card. The one line they get should be the part they do not already know.
- **Marker dots carry state and never carry it alone:** sage for an answer, `ink-faint` for nothing found, coral for an offer. **Coral is reserved for what is live** — never for a resolved answer.
- **The landing flash** is the one place a row is ever tinted: when a notification's time is up it collapses into its row and the row washes coral. It is the answer to "where did that go?"
- **The offer never collapses** — it waits on a decision, so it keeps its buttons.
- **One scroll region** in the panel: status line, then the flow, then the composer. That is what stops the composer being squeezed out.
- Not built here: the queue stack, the stream-dropped state and the listening-empty state. They are in the spec and belong to the app, not to a mock of it.

## The mocks, against the app

The screens in the hero and the showcase are drawings of a real product, so
they are checked against it rather than designed. `~/Documents/Morse/frontend`
is the source; when the two disagree, the app wins and the drawing changes.

- **The control bar** (`showcase/screens.tsx`, `Controls`) is `control-bar.tsx`: 44px buttons, and the order mic, camera, share, react, hand │ chat, people, Morse Intelligence, more, leave. The hand was missing, which put the one divider a button early and left the room with no way to do the thing the hero animates — "Daniel raised a hand" over a bar with no hand in it. Icons are the app's exact ones (`Mic02`, `Message02`, `UserMultiple02`, not the `01` variants), and an open panel takes `SELECTED`, which is the ink and the ground swapped, never an accent.
- **The booking screen is one card moving through four steps**, not four panels at once. It drew a month and a times grid side by side with a "Booked" line under them, which is a product Morse does not have: in `booking-flow.tsx` the times replace the month, the form replaces the times, and the confirmation replaces the form. It now has the app's anatomy — header, picture card holding still, stepped form card — and runs on `.book-steps`, a CSS track timed to the montage's hold so it cannot drift from the clock the pop-ups use.
- **Checked and matching:** panel titles (People, Chat, Vault, Transcript), "Add people", "Recording".
- **One deliberate divergence:** the app still calls the panel "Teleprompter". The landing page calls it **Morse Intelligence**, which is the settled name — the app has to catch up, not the page. If you are diffing the two, that one is on purpose.
- **Not yet audited line by line:** the Notes, Calendar and Knowledge screens. They were built from the app but have not been re-read against it since.

## Depth

- **Depth is the rim and the luminance; the shadow is the last 10%.** `--elev-raised` and `--elev-float` are a 1px rim, a 1-3px contact shadow and one short ambient one. The first pass put a 44px blur at 26% under every floating card and 30px under every raised one, and in dark mode the float was 0.75 at 44px — which reads as a sticker lifted off the page rather than a surface on it. Linear, Vercel and Stripe all sit nearer a 1-3px contact shadow plus something shallow; these now do too, at roughly half the alpha and two-thirds the blur. **Dark needs less, not more:** the ground is already near-black, so a heavy shadow only draws a dark halo.
- **Nothing outside the three tokens.** If a surface needs more depth than `shadow-float`, it needs a different background, not a bigger shadow.

## Motion

- **One curve.** `EASE` in `ui.tsx` (`cubic-bezier(0.22, 1, 0.36, 1)` — quick to leave, long to arrive) is used by everything that opens, lifts, slides or draws itself in, so the whole page settles the same way instead of each piece easing to its own taste.
- **Links** draw a line in from the left on hover and let it retreat the way it came (`UNDERLINE`). Buttons don't: a capsule already answers a press.
- **A long jump lands; a short one glides.** The showcase is a pinned section four screens tall whose animation is scrubbed by scroll, so gliding past it plays the entire sideways travel compressed into a second — which reads as the page convulsing on its way somewhere. That animation is for someone scrolling through it, not for someone who asked to be somewhere else. Anything beyond **2.2 screens** goes `immediate`; anything shorter keeps the 1.1s ease, where it reads as the page moving rather than cutting. One threshold does both jobs, because 2.2 screens is also the shortest distance that can cross a pinned section.
  Anchors are handled in `smooth-scroll.tsx` rather than by Lenis's `anchors` option, which cannot vary by distance. The handler applies each target's `scroll-margin-top` itself — a hand-rolled `scrollTo` gets no help with that — and leaves modified clicks, middle clicks and already-handled events alone.
- **A fragment must stay a fragment on the page it points into.** Written `/#product`, Next treats it as a route change: the home page reloads and jumps to the anchor instead of moving to it, because Lenis only takes anchors beginning with `#`. The header and the footer both strip the `/` when you are already on `/` and put it back everywhere else.
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
- **The theme changes like a blind coming down.** After Skiper UI's theme toggle (skiper26), the rectangle variant with blur, starting from the top. `theme.tsx` wraps the class change in `document.startViewTransition`, and `globals.css` animates `::view-transition-new(root)` from a zero-height clip at the top edge to the full page over 0.7s on `--ease-out` (`cubic-bezier(0.16, 1, 0.3, 1)`, the same expo-out the reference uses), with blur easing 8px → 4px → 0. The page being left is held still and sharp underneath (`::view-transition-old(root) { animation: none; z-index: -1 }`).
  Skiper ships a `-light-` and a `-dark-` keyframe; they are identical frame for frame, so there is one here.
  The browser applies `filter` before `clip-path`, so the leading edge stays a hard line and only the content behind it is soft. That is what makes it read as a blind rather than a fade — do not move the blur onto the group.
  **Two ways out, both to the instant swap this had before:** no `startViewTransition` (Firefox, at the time of writing), and `prefers-reduced-motion`. A 0.7s wipe of the whole page is exactly what that setting is about, and the class still has to change either way.
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
- **No iOS app in this repo.** The voice-note backend is real; the client that records, transcribes and summarises is not here, and the plan to adopt it is marked DROPPED. The app itself does exist — the phone section ships a screenshot of it running — but it lives elsewhere, so nothing on this page may describe iOS behaviour that cannot be seen in that screenshot.
  **`links.app` still points at `onmorse.com`.** "Download for iPhone" therefore does not go to the App Store. It needs the real listing before launch; until then the label is a promise the link does not keep.
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

All copy lives in `src/content/site.ts` and uses the app's own words: "Notes", "Morse Intelligence", "booking page". Every claim was checked against the code on 2026-09-22. Don't claim team or round-robin booking, payments, general "agentic workflows", or a script-reading teleprompter. None of them exist.

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
  - A script-reading Morse Intelligence, which the app doesn't have.
  - "Agentic workflows" overclaimed.
  - A tour dialog that repeated the page.
  - Every CTA looped back to its own page.
  - A booking demo hard-wired to 22 September and IST.
  - Text down to 9px.
