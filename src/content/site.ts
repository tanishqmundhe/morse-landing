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
    { label: "How it works", href: "#how" },
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
  secondary: { label: "See how it works", href: "#how" },
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

export type Stage = "before" | "during" | "after";

export const how = {
  eyebrow: "Before, during, after",
  title: "One meeting,",
  titleMuted: "start to finish.",
  body: "Morse doesn’t stop when the call ends. It covers the booking before, the notes during and the follow-up after.",
  defaultStage: "during" as Stage,
  tabs: [
    { stage: "before", title: "Let people pick the time", sub: "A booking page tied to your calendar." },
    { stage: "during", title: "Stay in the conversation", sub: "Morse writes it down. No bot joins the call." },
    { stage: "after", title: "Leave with notes, not homework", sub: "Summary, decisions and action items." },
  ] as { stage: Stage; title: string; sub: string }[],
  panels: {
    before: {
      label: "Booked",
      title: "Product conversation",
      meta: "30 min · Thursday · 11:30 am",
      rows: [
        { icon: "globe", text: "Shown in the guest’s own time zone" },
        { icon: "calendar", text: "On your calendar, synced with Google" },
        { icon: "video", text: "The Morse link goes out by email" },
      ],
    },
    during: {
      label: "Recording",
      title: "Weekly product sync",
      turns: [
        { name: "Priya", time: "10:04", text: "Can we get the launch brief ready for Friday?" },
        { name: "Jamie", time: "10:04", text: "Yes. I’ll pull the first draft together tomorrow." },
        { name: "Priya", time: "10:05", text: "Great, and let’s keep the pricing page out of this round." },
      ],
      foot: "Transcribed as you talk, in English, Hindi and more.",
    },
    after: {
      label: "Notes",
      title: "Weekly product sync",
      summary: "The team agreed to ship the launch brief on Friday and hold the pricing page until the next round.",
      decisions: ["Launch brief ships Friday", "Pricing page waits for the next round"],
      actions: [
        { task: "Draft the launch brief", owner: "Jamie", due: "Fri" },
        { task: "Share last quarter’s numbers", owner: "You", due: "Tomorrow" },
      ],
    },
  },
};

export const booking = {
  eyebrow: "Booking pages",
  title: "Your calendar.\nA booking page.",
  titleMuted: "No extra tool.",
  body: "Choose the meeting lengths you offer and your usual hours. People pick a time in their own time zone. It lands on your calendar, synced with Google, with a Morse link.",
  points: ["15 to 90 minute meetings", "Holidays for your country left out", "Day, week, month and schedule views"],
  demo: {
    host: "Priya Shah",
    type: "Product conversation",
    minutes: 30,
    // Weekday slots, as a host's usual hours would offer them.
    times: ["10:00 am", "11:30 am", "2:00 pm", "3:30 pm", "4:30 pm"],
    pickDay: "Pick a day",
    note: "A preview. Nothing is booked.",
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
