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
    "Video meetings with notes, action items and a teleprompter that answers from your notes, plus booking pages and a calendar synced with Google. One workspace, by Unified Machines.",
};

export const nav = {
  // In page order, so the highlight moves one way as you scroll.
  links: [
    { label: "Product", href: "#product" },
    { label: "Features", href: "#features" },
    { label: "Booking", href: "#booking" },
    { label: "Questions", href: "#questions" },
  ],
  cta: { label: "Open Morse", href: links.app },
};

export const hero = {
  title: "Good conversations.",
  titleMuted: "Real progress.",
  lede: "Video calls that write the meeting down for you, answer questions from your notes while you talk, and book the next meeting before anyone hangs up.",
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
        speaker: "Priya",
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
        speaker: "Priya",
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
 * Section 2. A sentence that lights up in the middle of the screen, then rises
 * as a row of the app's screens comes up under it. Scrolling moves the row
 * sideways; the line above changes with the screen in the middle. Every line
 * is words and chips, the chips being small pieces of the product.
 */
type Piece = { text: string } | { chip: Chip; label: string };
export type Chip = "call" | "transcript" | "teleprompter" | "booking" | "globe" | "question" | "note" | "done" | "calendar" | "google";

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
        { chip: "question", label: "Priya asked" },
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
        { text: "with files and Google Drive folders brought in." },
        { chip: "google", label: "Google Drive" },
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
  title: "Everything else",
  titleMuted: "you’d expect, done properly.",
  body: "The small things that make a call feel easy, each one as considered as the big ones.",
  items: [
    { id: "captions", title: "Captions, translated as you speak", body: "Speak Hindi or Marathi; everyone in the call reads it in English." },
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
export const booking = {
  title: "A page that books you.",
  titleMuted: "No extra tool.",
  body: "Share one link. People pick from the times your calendar actually has free, in their own time zone, and the meeting lands on your week with a Morse link.",
  points: [
    "Meeting types from 15 to 90 minutes",
    "Your usual hours, and your country’s holidays",
    "Ten minutes to undo, for them and for you",
  ],
  page: {
    host: "Priya Shah",
    role: "Product lead, Neural Arc",
    bio: "Happy to talk through onboarding, pricing or anything half-formed.",
    film: "/films/ascii-wood.mp4",
    type: "Intro call",
    minutes: "30 min",
    month: "September 2026",
    day: 23,
    dayLabel: "Wednesday 23 September",
    zone: "Times shown in Asia/Calcutta (GMT+5:30)",
    free: "Free times",
    times: ["9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "13:00", "13:30", "14:00"],
    pick: "10:30",
    name: { label: "Your name", value: "Sam Whitfield" },
    email: { label: "Your email", value: "sam@acme.com", hint: "Where the invitation goes." },
    confirm: "Confirm",
    done: {
      title: "You’re booked in with Priya.",
      what: "Intro call, Wednesday 23 September at 10:30",
      sent: "The invitation and the joining link are on their way to",
      carries: ". It carries a calendar entry, so the time will be in your own calendar too.",
      undo: "left to undo it here.",
      undoLabel: "Undo",
    },
    footer: "Booked through Morse",
  },
};

export const teleprompter = {
  eyebrow: "Teleprompter",
  title: "Asked in the meeting.\nAnswered from your notes.",
  body: "When someone asks a question, Morse looks through your notes and puts the answer in front of you. Nobody types. Only the colleagues the host chooses see it.",
  card: {
    speaker: "Daniel",
    question: "What did we agree with Acme on renewal pricing?",
    answer: "The annual plan at this year’s rate, fixed until March, with two extra seats included.",
    source: "Acme renewal notes",
    looking: "Looking in your notes",
  },
  play: "Play",
  replay: "Replay",
};

export const yours = {
  eyebrow: "Make it yours",
  title: "Less default.",
  titleMuted: "More you.",
  body: "Pick an accent colour and light or dark. Choose a background from home, nature or something sillier, and a style for your camera that everyone in the call sees.",
  greeting: "Good morning,",
  name: "Alex",
  button: "New meeting",
  accents: [
    { id: "sage", label: "Sage" },
    { id: "patina", label: "Patina" },
    { id: "dusk", label: "Dusk blue" },
    { id: "indigo", label: "Indigo" },
    { id: "plum", label: "Plum" },
  ],
  styles: ["Brighten", "Warm", "Cool", "Film", "Mono", "Vivid", "Light leak"],
};

export const followUp = {
  eyebrow: "After the call",
  title: "The meeting ends.",
  titleMuted: "The follow-up is ready to book.",
  body: "When a call arranges another meeting, Morse offers to book it. You see the time, any clash and who’s invited. Nothing is sent until you press Book.",
  said: { name: "Priya", text: "Let’s pick this up on Thursday at two." },
  card: {
    title: "Book a follow-up?",
    time: "Thursday, 2:00 – 2:30 pm",
    clash: "No clashes",
    invitees: ["Priya Shah", "Jamie Lee"],
    book: "Book",
    skip: "Don’t book",
    booked: "You approved it. Invites are on their way.",
    skipped: "You didn’t book it.",
  },
  caption: "A preview. Nothing is booked.",
};

export const faq = {
  title: "Questions",
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
  title: "Less meeting admin.\nMore meeting of minds.",
  cta: { label: "Open Morse", href: links.app },
};

export const footer = {
  maker: "A product by",
};
