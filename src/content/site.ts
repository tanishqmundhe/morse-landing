/**
 * Every word on the landing page lives here. Components only lay it out.
 *
 * Every claim is checked against the app (Neural-Arc/morse, feat/neural-cal).
 * Use the app's own names: "Notes" for the minutes, "Teleprompter" for the
 * copilot tab, "booking page". Never describe a feature the app doesn't ship.
 * A "\n" becomes a line break where the string is rendered.
 */

export const links = {
  /** The app. Sign-in is Google only. */
  app: "https://onmorse.com",
};

export const meta = {
  title: "Morse — Video meetings that take their own notes",
  description:
    "Video meetings that take their own notes and action items, answer questions from your notes while you talk, and book the follow-up before anyone hangs up. Booking pages and a Google-synced calendar included.",
};

export const nav = {
  // Pages, not anchors. Features, Booking and Questions were all anchors into
  // the home page, which made a site of one page look like a site of six.
  links: [
    { label: "Product", href: "/" },
    { label: "Pricing", href: "/pricing" },
    { label: "Developers", href: "/developers" },
  ],
  cta: { label: "Open Morse", href: links.app },
};

export const hero = {
  /** Under the buttons. Stated as fact, not sold — the Mac line is a promise,
   *  so it says "coming soon" and nothing more until there is a date. */
  platforms: { ios: "Available on iPhone", mac: "macOS coming soon" },
  title: "Good conversations.",
  titleMuted: "Real progress.",
  lede: "Video calls that write themselves down, answer what you ask, and book what comes next.",
  primary: { label: "Open Morse", href: links.app },
  secondary: { label: "See how it works", href: "#product" },
  film: { src: "/films/signal-loop.mp4", poster: "/films/signal-poster.jpg" },
  /**
   * The card over the film plays one meeting through the three things Morse
   * does in it. Each scene is the app's own surface, cut down.
   */
  live: {
    meeting: "Weekly product sync",
    recording: "Recording",
    startSeconds: 12 * 60 + 4,
    scenes: [
      {
        id: "notes",
        label: "Notes",
        speaker: "Sofia",
        text: "Can we get the launch brief ready for Friday?",
        result: { lead: "Action item", text: "Launch brief · Jamie · Fri" },
      },
      {
        id: "teleprompter",
        label: "Teleprompter",
        speaker: "Daniel",
        question: "What did we agree with Acme on pricing?",
        answer: "This year’s rate, fixed until March, with two extra seats.",
        source: "Acme renewal notes",
      },
      {
        id: "follow-up",
        label: "Follow-up",
        speaker: "Sofia",
        text: "Let’s pick this up Thursday at two.",
        title: "Book a follow-up?",
        time: "Thu, 2:00 – 2:30 pm",
        book: "Book",
        skip: "Don’t book",
        booked: "Booked. Invites sent.",
      },
    ] as const,
  },
};

/**
 * Between the hero and the product: the seven jobs Morse does that are
 * normally seven subscriptions. Every category was checked against the app
 * before it went on the page — see the notes in `brand-marks.ts` for what was
 * left off and why.
 */
export const replaces = {
  eyebrow: "Instead of",
  title: "Morse replaces",
  titleMuted: "all seven of these.",
  body: "The call, the notes, the recording, the transcript, the in-call assistant, the whiteboard and the booking link. One app, one login.",
  /** Held between the brackets in the band, as the reference holds its line. */
  line: "Seven jobs → one app",
};

/**
 * Section 2. A sentence that lights up in the middle of the screen, then rises
 * as a row of the app's screens comes up under it. Scrolling moves the row
 * sideways; the line above changes with the screen in the middle. Every line
 * is words and chips, the chips being small pieces of the product.
 */
type Piece = { text: string } | { chip: Chip; label: string };
export type Chip = "call" | "transcript" | "teleprompter" | "booking" | "globe" | "question" | "note" | "done" | "calendar" | "google" | "upload";

export const showcase = {
  statement: [
    { text: "Morse is a video call" },
    { chip: "call", label: "3 in call" },
    { text: "that writes everything down," },
    { chip: "transcript", label: "Transcript" },
    { text: "answers what you’re asked," },
    { chip: "teleprompter", label: "From Acme notes" },
    { text: "and books what comes next." },
    { chip: "booking", label: "Thu, 2:00 pm" },
  ] as Piece[],
  /**
   * In row order. Home only ever sits at the side, so the opening screen has a
   * neighbour on each side; from Room to Knowledge every screen takes the
   * middle. The room's line is the sentence itself.
   */
  slides: [
    { id: "home", line: null },
    { id: "room", line: "statement" },
    {
      id: "booking",
      line: [
        { text: "People book you from a page" },
        { chip: "booking", label: "Thu, 2:00 pm" },
        { text: "that knows your calendar and shows their own time zone." },
        { chip: "globe", label: "Their time zone" },
      ],
    },
    {
      id: "teleprompter",
      line: [
        { text: "Someone asks about Acme" },
        { chip: "question", label: "Sofia asked" },
        { text: "and the answer is already in front of you." },
        { chip: "teleprompter", label: "From Acme notes" },
      ],
    },
    {
      id: "notes",
      line: [
        { text: "When the call ends, the notes are written" },
        { chip: "note", label: "Summary" },
        { text: "and everyone knows what they’re doing next." },
        { chip: "done", label: "3 action items" },
      ],
    },
    {
      id: "calendar",
      line: [
        { text: "The follow-up lands on your week" },
        { chip: "calendar", label: "Thu, 2:00 pm" },
        { text: "right next to your Google events." },
        { chip: "google", label: "Google Calendar" },
      ],
    },
    {
      id: "knowledge",
      line: [
        { text: "And the answers come from your notes," },
        { chip: "note", label: "Knowledge" },
        { text: "with whole documents dropped in and read." },
        { chip: "upload", label: "PDF, Word, Excel" },
      ],
    },
  ] as { id: string; line: Piece[] | "statement" | null }[],
};

/**
 * Section 3. The smaller things in a call, one looping picture each, in a row
 * you drag or scroll sideways. Every claim is in the app: captions follow
 * mixed languages; ten languages are automatic and eight more can be added;
 * the whiteboard shows everyone's cursor; you can draw on a shared screen;
 * reactions are the app's pixel emoji; the notes page draws a mind map.
 */
export const extras = {
  eyebrow: "In the call",
  title: "Everything you’d expect,",
  titleMuted: "done properly.",
  body: "Six more things Morse does while the call is running.",
  items: [
    { id: "captions", title: "Captions, translated as you speak", body: "Speak Spanish or Portuguese; everyone in the call reads it in English." },
    { id: "languages", title: "18 languages", body: "Ten understood without a setting, eight more when you ask." },
    { id: "whiteboard", title: "A whiteboard in the call", body: "Sketch it out together, with everyone’s cursor on the board." },
    { id: "annotate", title: "Draw on what’s shared", body: "Circle the number that matters while you present." },
    { id: "reactions", title: "Reactions and raised hands", body: "Pixel emoji float up the stage; hands wait their turn." },
    { id: "mindmap", title: "Notes, drawn as a map", body: "Every meeting’s notes branch out, section by section." },
  ],
  languages: ["English", "हिन्दी", "Español", "Français", "Deutsch", "Русский", "Português", "日本語", "Italiano", "Nederlands", "मराठी", "தமிழ்", "తెలుగు", "বাংলা", "ಕನ್ನಡ", "ગુજરાતી", "ਪੰਜਾਬੀ", "اردو"],
};

/**
 * Section 4: the booking page, as it really looks — the host, a looping film
 * beside the form, and the form itself stepping from day to time to details to
 * booked. Copy follows the app: "Free times", "Confirm", the ten-minute undo.
 */
/**
 * A quiet band between the features and the booking page: what the product
 * counts, and what it works with. Every number is checked against the app —
 * ten automatic languages plus eight more, 16 backgrounds in four sets, seven
 * camera styles, eleven note templates.
 */
/**
 * The band between the features and the booking page: the things Morse does
 * without being watched. Every line here is checked against the app — no bot
 * attendee, Google-only sign-in, and the counts from the settings screens.
 */
export const quiet = {
  eyebrow: "The quiet part",
  title: "Nothing you",
  titleMuted: "have to watch.",
  items: [
    { id: "bot", title: "No bot in the room", body: "Morse transcribes the call itself. Nobody extra turns up." },
    { id: "google", title: "One calendar, not two", body: "Meetings land on the Google calendar you already keep." },
    { id: "api", title: "There’s an API", body: "A token lets a script, or an AI agent, use Morse as you." },
    { id: "counts", title: "Eighteen languages", body: "Ten without a setting, eight more when you ask." },
  ],
};

export const booking = {
  eyebrow: "Booking pages",
  title: "One link, and your",
  titleMuted: "calendar does the rest.",
  body: "Share it once. People pick from the times you have free, in their own time zone, and it lands on your week with a Morse link.",
  link: "onmorse.com/sofia",
  points: [
    "Meeting types from 15 to 90 minutes",
    "Your usual hours, and your country’s holidays",
    "Ten minutes to undo, for them and for you",
  ],
  page: {
    host: "Sofia Ferrer",
    role: "Product lead",
    bio: "Happy to talk through onboarding, pricing or anything half-formed.",
    film: { src: "/films/ascii-wood.mp4", poster: "/films/ascii-wood-poster.jpg" },
    type: "Intro call",
    minutes: "30 min",
    month: "September 2026",
    day: 23,
    dayLabel: "Wednesday 23 September",
    zone: "Times shown in Europe/Lisbon (GMT+1)",
    free: "Free times",
    times: ["9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "13:00", "13:30", "14:00"],
    pick: "10:30",
    name: { label: "Your name", value: "Sam Whitfield" },
    email: { label: "Your email", value: "sam@acme.com", hint: "Where the invitation goes." },
    confirm: "Confirm",
    booking: "Booking…",
    done: {
      title: "You’re booked in with Sofia.",
      what: "Intro call, Wednesday 23 September at 10:30",
      sent: "The invitation and the joining link are on their way to",
      carries: ". It carries a calendar entry, so the time will be in your own calendar too.",
      undo: "left to undo it here.",
      undoLabel: "Undo",
    },
    footer: "Booked through Morse",
  },
};

export const faq = {
  eyebrow: "Questions",
  title: "A few things you",
  titleMuted: "might be wondering.",
  more: "Still wondering?",
  // White-labelled with the rest of the app. This inbox has to exist
  // before the page ships — see the note in docs/DESIGN.md.
  email: "hello@onmorse.com",
  items: [
    {
      q: "What is Morse?",
      a: "Morse is a video meeting app. It takes notes and action items for you, answers questions from your notes during the call, and books follow-ups. It also has booking pages and a calendar synced with Google.",
    },
    {
      q: "Does a bot join my meetings?",
      a: "No. Morse transcribes the call itself, so no extra attendee appears in the meeting. Everyone can see when recording is on.",
    },
    {
      q: "Can Morse replace my scheduling tool?",
      a: "For one-to-one meetings, yes. You get a booking page with the meeting lengths and hours you choose, and it’s tied to your calendar. Team pages, round-robin and payments aren’t available.",
    },
    {
      q: "What happens after a meeting?",
      a: "You get notes with a summary, decisions and action items, including who owns each one and when it’s due. The recording and transcript are there too, and you can share the notes by email. Pick a template to match the meeting, such as a standup, 1:1, client meeting or retrospective.",
    },
    {
      q: "What can I customize?",
      a: "Light or dark, one of five accent colours, your photo, a background (blur or a picture), and a camera style such as Warm, Film or Mono.",
    },
  ],
};

export const closing = {
  title: "Less meeting admin.",
  titleMuted: "More meeting of minds.",
  film: { src: "/films/ringed-meadow-loop.mp4", poster: "/films/ringed-meadow-poster.jpg" },
  cta: { label: "Open Morse", href: links.app },
};

/**
 * The footer, arranged as a grid: a note and the mark on the left, the pages
 * and the accounts to the right, and how to reach us underneath them.
 *
 * TODO before launch \u2014 the five social accounts are placeholders and point
 * nowhere; swap in the real handles or drop the ones that don\u2019t exist. The
 * sign-up form has no list behind it and opens a mail draft instead.
 */
/**
 * The iOS section, near the foot of the page. The Mac line is a promise, so it
 * says what it is and nothing more until there is a date to give.
 */
export const app = {
  eyebrow: "On your phone",
  title: "The meeting,",
  titleMuted: "in your pocket.",
  body: "Join from anywhere, read the notes on the way home, and book the follow-up before you have put your coat down.",
  points: [
    "Join a call, or start one, in a tap",
    "Notes and action items the moment it ends",
    "Your booking page, and who took which slot",
  ],
  cta: { label: "Download for iPhone", href: links.app },
  mac: "macOS coming soon",
  /** What the phone in this section shows. */
  screen: {
    greeting: "Good afternoon, Amara.",
    sub: "Your next conversation is a click away.",
    next: { when: "16:30", length: "30 min", title: "Product & design sync", who: "You and the product team" },
    later: { when: "Tomorrow", length: "45 min", title: "Customer conversation", who: "Google Calendar" },
    action: "Join",
  },
};

export const footer = {
  loop: {
    title: "Once a month, at most.",
    body: "Release notes, and the odd thing we learned about meetings.",
    placeholder: "Your email",
    action: "Join",
    // Until there is a list, the form writes the mail for you.
    mailto: "hello@onmorse.com",
    subject: "Add me to the Morse list",
  },
  pages: {
    title: "Pages",
    links: [
      { label: "Product", href: "/#product" },
      { label: "Features", href: "/#features" },
      { label: "Booking", href: "/#booking" },
      { label: "Pricing", href: "/pricing" },
      { label: "Developers", href: "/developers" },
      { label: "Questions", href: "/#questions" },
      { label: "Open Morse", href: links.app },
      { label: "Booking page", href: links.app },
    ],
  },
  social: {
    title: "Follow us",
    // Placeholders. Real handles needed before this goes anywhere.
    links: [
      { label: "X", icon: "x", href: "#" },
      { label: "LinkedIn", icon: "linkedin", href: "#" },
      { label: "Instagram", icon: "instagram", href: "#" },
    ],
  },
  touch: {
    title: "Get in touch",
    body: "Questions about Morse, or about working with us.",
    email: "hello@onmorse.com",
  },
  line: "Video meetings that write themselves down.",
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
  maker: "A product by",
};

/**
 * The pricing page. Layout follows aeye.framer.ai/pricing; the words are ours.
 *
 * TODO before launch — every price, limit and plan name here is invented.
 * Morse has no published pricing yet. What each plan *lists* is real: every
 * line is a feature the app ships, so the page can be shown without claiming
 * anything the product can't do. Replace the numbers, not the features.
 * The quotes in `voices` are placeholders and say so.
 */
export const pricing = {
  eyebrow: "Pricing",
  title: "Pricing and plans.",
  // Open sky, for a page about there being nothing hidden. It appears nowhere
  // else: ringed-meadow closes this page, and signal opens the home one.
  film: { src: "/films/clouds-loop.mp4", poster: "/films/clouds-poster.jpg" },
  lede: "One price a month, per person. Notes, action items and a booking page are in every plan, including the free one.",
  billing: {
    title: "How you'd like to pay",
    monthly: "Monthly",
    yearly: "Yearly",
    save: "Save 20%",
    per: "/month",
    note: "Billed yearly",
  },
  plans: [
    {
      id: "solo",
      name: "Solo",
      tagline: "For one calendar and the meetings on it.",
      price: { monthly: 0, yearly: 0 },
      cta: "Start free",
      includesLead: "Includes:",
      includes: ["Meetings with notes and action items", "One booking page", "Google Calendar and Drive", "Ten languages, understood without a setting"],
    },
    {
      id: "pro",
      name: "Pro",
      tagline: "For people whose week is mostly meetings.",
      popular: "Most chosen",
      price: { monthly: 12, yearly: 10 },
      cta: "Start free trial",
      includesLead: "Everything in Solo, plus:",
      includes: [
        "Teleprompter: answers from your notes, mid-call",
        "Follow-ups booked from the call, with your approval",
        "All eighteen languages and live translation",
        "Every note template, and the whiteboard",
      ],
    },
    {
      id: "studio",
      name: "Studio",
      tagline: "For a team that lives in the same calendar.",
      price: { monthly: 24, yearly: 20 },
      cta: "Start free trial",
      includesLead: "Everything in Pro, plus:",
      includes: [
        "Shared Knowledge, across everyone's meetings",
        "Mind maps from a whole month of notes",
        "All sixteen backgrounds and seven camera styles",
        "Priority support",
      ],
    },
  ],
  compare: {
    eyebrow: "Compare plans",
    title: "Every line,",
    titleMuted: "side by side.",
    groups: [
      {
        title: "In the meeting",
        note: "What happens while you are talking.",
        rows: [
          { label: "Notes and action items", values: ["Yes", "Yes", "Yes"] },
          { label: "Teleprompter, answering from your notes", values: ["—", "Yes", "Yes"] },
          { label: "Live captions, translated", values: ["—", "Yes", "Yes"] },
          { label: "Whiteboard and annotation", values: ["—", "Yes", "Yes"] },
        ],
      },
      {
        title: "Afterwards",
        note: "What the meeting leaves behind.",
        rows: [
          { label: "Summary, decisions and owners", values: ["Yes", "Yes", "Yes"] },
          { label: "Note templates", values: ["Standup and 1:1", "All eleven", "All eleven"] },
          { label: "Recording and transcript kept", values: ["30 days", "12 months", "No limit"] },
          { label: "Knowledge, searched across meetings", values: ["Your own", "Your own", "Shared"] },
        ],
      },
      {
        title: "Booking",
        note: "How other people get on your calendar.",
        rows: [
          { label: "Booking pages", values: ["One", "Unlimited", "Unlimited"] },
          { label: "Meeting lengths", values: ["30 min", "15 to 90 min", "15 to 90 min"] },
          { label: "Your hours and your holidays", values: ["—", "Yes", "Yes"] },
          { label: "Ten minutes to undo", values: ["Yes", "Yes", "Yes"] },
        ],
      },
      {
        title: "The room",
        note: "How the call looks and sounds.",
        rows: [
          { label: "Languages understood", values: ["Ten", "Eighteen", "Eighteen"] },
          { label: "Backgrounds", values: ["Four", "Sixteen", "Sixteen"] },
          { label: "Camera styles", values: ["—", "Seven", "Seven"] },
          { label: "Reactions and raised hands", values: ["Yes", "Yes", "Yes"] },
        ],
      },
    ],
  },
  voices: {
    eyebrow: "Voices",
    title: "Nobody has said",
    titleMuted: "anything yet.",
    body: "The first people to use Morse will go here. We would rather leave the space empty than fill it with quotes from people who don't exist.",
  },
};

export const developers = {
  eyebrow: "The API",
  title: "Everything the app does,",
  titleMuted: "a script can do too.",
  lede: "One personal access token, and Morse answers to a script, a cron job, or an AI agent — as you, with exactly your permissions.",

  /** The 50-word definition, for anything that quotes one line of this page. */
  overview:
    "The Morse API lets a script or an AI agent do anything you can do in the Morse app, authenticated with a personal access token. It covers meetings, transcripts, notes, knowledge, voice notes and live event streams. Tokens are made in Settings, act as you, and can be revoked at any time.",
  // The same day, twice: one for the page, one for the structured data. Change
  // both together.
  updated: "24 September 2026",
  updatedISO: "2026-09-24",

  /**
   * What a token reaches, by what the thing is rather than by its path.
   *
   * This replaced a nine-row ledger of "app action -> the call for it". That
   * table restated the hero at length and did the reference's job, which is the
   * one job this page decided not to do. Six cards keep the coverage the ledger
   * was there to prove and leave the routes where they belong.
   */
  reaches: {
    eyebrow: "The surface",
    title: "Six things a token",
    titleMuted: "can get at.",
    body: "Everything the app reads or writes, a token reads or writes too. The app has no private back door \u2014 it calls the same routes.",
    /**
     * Two lines each. The first is what the thing is; the second is the sharper
     * fact about it, and appears in its place under the pointer. Both are true
     * of the current API (docs/API.md) — the second is not a teaser, it is the
     * detail someone about to build on it would want next.
     */
    items: [
      {
        title: "Meetings",
        body: "List them, search across them, and schedule one and invite people to it in a single call.",
        more: "The search runs over every meeting you were in, not only the ones you arranged.",
      },
      {
        title: "Transcripts",
        body: "What was said in a finished meeting, in full, with who said it.",
        more: "Or while it is still running \u2014 the same transcript, arriving a line at a time.",
      },
      {
        title: "Notes",
        body: "The minutes and the action items Morse wrote for a meeting once it ended.",
        more: "A meeting with nothing written yet answers 404, so a script can tell the two apart.",
      },
      {
        title: "Knowledge",
        body: "Your folders, and new notes filed into them.",
        more: "The company folder too, if your account is allowed to write to it.",
      },
      {
        title: "Voice notes",
        body: "Yours, newest first, and the audio behind each one.",
        more: "Audio goes straight to storage on the way in; it never passes through Morse\u2019s server.",
      },
      {
        title: "Live feeds",
        body: "The lobby, the transcript and the notes as they change, streamed while a meeting runs.",
        more: "A browser\u2019s EventSource cannot send a header, so this one wants a server or a script.",
      },
    ],
    note: "Every route, with its parameters and schemas, is published as an OpenAPI document.",
  },

  start: {
    eyebrow: "Getting one",
    title: "Three steps,",
    titleMuted: "about a minute.",
    steps: [
      {
        title: "Settings \u2192 API tokens",
        body: "In Morse, open Settings and choose New token.",
      },
      {
        title: "Name it, and set when it expires",
        body: "Name it after whatever will use it \u2014 \u201cClaude\u201d, \u201cNotion sync\u201d. Expiry is 30, 60 or 90 days, a day you pick, or never.",
      },
      {
        title: "Copy it \u2014 it is shown once",
        body: "It starts mp_ and is 49 characters. Morse keeps only a fingerprint and the last four, so it cannot show it to you again.",
      },
    ],
    /**
     * The terminal under the steps. `env` is already on screen; `command` types
     * itself and `response` arrives after it (developers.tsx).
     *
     * Every field in `response` is a real one on the API's Meeting model
     * (backend/morse/meetings.py) — id, code, title, scheduled_at,
     * duration_minutes. The values are made up and the caption says so. Adding
     * a field here that the model does not have would be inventing an API.
     */
    terminal: {
      label: "Then, from anywhere",
      env: ["export MORSE=https://onmorse.com/api", "export MORSE_TOKEN=mp_\u2026"],
      command: 'curl -H "Authorization: Bearer $MORSE_TOKEN" $MORSE/meetings',
      response: [
        "[",
        '  {',
        '    "id": "mtg_8f21c4",',
        '    "code": "hqf-mkze-rdt",',
        '    "title": "Pricing review",',
        '    "scheduled_at": "2026-10-02T10:30:00+05:30",',
        '    "duration_minutes": 30',
        "  }",
        "]",
      ],
      caption: "The field names are the API\u2019s own. The values are an example.",
    },
  },

  limits: {
    eyebrow: "The edges",
    title: "What a token",
    titleMuted: "will not do.",
    body: "Listed because you should know before you build, not after.",
    items: [
      { title: "Manage other tokens", body: "Listing, making and revoking tokens happens in Settings, never over the API." },
      { title: "Connect Google Calendar", body: "Google needs a person to click Allow. Once connected, reading and writing events works with a token." },
      { title: "Sign in, or sign out", body: "A token already is a sign-in. Signing out of a browser does not touch it." },
      { title: "Act as a guest", body: "Guest routes are for people without an account. Your token acts as you, a member." },
      { title: "Run inside a web page", body: "The API sends no CORS headers, so another site\u2019s page cannot call it. Use a server, a script or an agent." },
    ],
  },

  agent: {
    eyebrow: "Agents",
    title: "Hand it to",
    titleMuted: "an assistant.",
    body: "A token is all an AI agent needs. Give it one with the instructions below and it will read the spec, then work in your account \u2014 asking first before anything that emails people or deletes something.",
    /**
     * Required, not decorative. The orbit shows marks belonging to other
     * companies, and the only claim it may make is the true one: these can all
     * speak HTTP, so they can all use a token. Claude is the one Morse
     * documents (docs/API.md, section 8). None of the rest is an integration,
     * a partnership or an endorsement, and the page has to say so where the
     * logos are, not in a footer somewhere.
     */
    disclaimer:
      "Any agent that can make an HTTP request can use a token \u2014 there is nothing to install and nothing to approve. The agent marks on this page belong to their owners and mean no affiliation or endorsement; Claude is the one Morse writes instructions for.",
  },

  cta: {
    primary: { label: "Make a token", href: "/login" },
    secondary: { label: "Read the reference", href: "https://onmorse.com/api/docs" },
  },

  faq: {
    eyebrow: "Questions",
    title: "What developers",
    titleMuted: "ask first.",
    more: "Something not answered?",
    email: "hello@onmorse.com",
    items: [
      {
        slug: "does-morse-have-an-api",
        q: "Does Morse have an API?",
        a: "Yes. Everything you can do in the Morse app you can do from a script or an AI agent, using a personal access token. The base URL is https://onmorse.com/api, and every route is published as a machine-readable OpenAPI document.",
      },
      {
        slug: "how-to-get-an-api-key",
        q: "How do I get a Morse API key?",
        a: "Open Settings \u2192 API tokens in Morse and choose New token. Name it, choose when it expires, then copy it. The token starts mp_, is 49 characters long, and is shown exactly once.",
      },
      {
        slug: "what-a-token-can-do",
        q: "What can a Morse API token do?",
        a: "It acts as you. It reaches your meetings, transcripts, notes, knowledge, voice notes and live feeds, and it can schedule meetings and invite people. If you are an admin, it reaches the admin pages too.",
      },
      {
        slug: "works-with-ai-agents",
        q: "Does the Morse API work with AI agents?",
        a: "Yes. Morse publishes a block of instructions you paste into an assistant along with your token. It then fetches the OpenAPI document and calls routes in your account, asking you before anything irreversible.",
      },
      {
        slug: "call-from-a-browser",
        q: "Can I call the Morse API from a browser?",
        a: "No. The API sends no CORS headers, so a web page on another site cannot call it. Call it from a server, a script or an agent instead. A browser\u2019s EventSource also cannot send the header live feeds need.",
      },
      {
        slug: "when-a-token-expires",
        q: "When does a Morse API token expire?",
        a: "Whenever you chose: 30, 60 or 90 days, a day you pick, or never. A token left unused for a year stops working. Revoke one in Settings and it stops on its next request.",
      },
      {
        slug: "uploading-files",
        q: "How do I upload a file through the API?",
        a: "In three steps: ask Morse where to put the file, send it straight to storage, then tell Morse it is there. Files never pass through Morse\u2019s own server. Photos, voice-note audio and knowledge files all work this way.",
      },
    ],
  },
};
