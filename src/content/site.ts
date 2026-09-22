/**
 * Every word on the landing page lives here. Components only lay it out.
 * A "\n" inside a string becomes a line break where it is rendered.
 */

export const meta = {
  title: "Morse — AI Meetings, Scheduling & Workflows in One Place",
  description:
    "Meet with focus. Move work forward. Morse brings customizable video meetings, built-in AI meeting minutes, action items, scheduling and a teleprompter into one workspace.",
  ogTitle: "Morse — Good conversations. Real progress.",
  ogDescription: "Your meetings, calendar and next steps. Finally in the same place.",
};

export const nav = {
  links: [
    { label: "The experience", href: "#experience" },
    { label: "Scheduling", href: "#calendar" },
    { label: "FAQs", href: "#questions" },
  ],
  cta: { label: "Explore Morse", href: "#experience" },
};

export const hero = {
  intro: "A little more presence. A lot more possibility.",
  title: "Good conversations.",
  titleAccent: "Real progress.",
  lede: "The AI meeting workspace that connects your calendar, conversations, and everything that comes next.",
  primary: { label: "Meet Morse", href: "#experience" },
  tourLabel: "Take a quick tour",
  note: "Meet. Remember. Move forward.",
  image: {
    src: "/product/morse-workspace.png",
    width: 2190,
    height: 2678,
    alt: "Morse meeting workspace with warm dark surfaces, sage meeting controls and an integrated calendar",
  },
  caption: { title: "Stay in the conversation.", body: "Morse takes care of what comes next." },
};

export const tour = {
  label: "MEET MORSE",
  steps: [
    {
      title: "One conversation. Everything connected.",
      body: "Morse brings online meetings, your calendar, and built-in AI into one considered workspace. Take a look at how a conversation turns into progress.",
    },
    {
      title: "Make time. Without the chase.",
      body: "Share a booking link so people can choose a time. Your calendar and meeting live together, without a separate scheduling tool.",
    },
    {
      title: "Be present. Keep your train of thought.",
      body: "Built-in AI captures meeting minutes without adding a third-party attendee. Your teleprompter keeps your talking points close, so your attention stays in the room.",
    },
    {
      title: "Leave with more than notes.",
      body: "Review and share your minutes, turn decisions into action items, and use agentic workflows to carry the conversation forward.",
    },
  ],
};

export const essentials = {
  label: "ONE WORKSPACE. THE WHOLE CONVERSATION.",
  items: ["Video meetings", "AI minutes", "Scheduling", "Agentic workflows"],
};

export type Stage = "before" | "during" | "after";

export const experience = {
  title: "Before. During. After.",
  titleMuted: "All together.",
  body: "Great meetings don’t start with “Can you hear me?”\nAnd they shouldn’t end with “I’ll send that over.”",
  defaultStage: "during" as Stage,
  tabs: [
    { stage: "before", step: "01", title: "Make room for the right conversation.", sub: "Scheduling, without the back-and-forth." },
    { stage: "during", step: "02", title: "Be here. Morse is listening.", sub: "Built-in intelligence. No extra attendee." },
    { stage: "after", step: "03", title: "Turn the next step into the first.", sub: "From shared minutes to meaningful action." },
  ] as { stage: Stage; step: string; title: string; sub: string }[],
  panels: {
    before: {
      top: "Your next conversation",
      status: "All in one place",
      title: "A time that works. Found.",
      sub: "A booking link, a calendar, and a meeting space.",
      lines: [
        { text: "Product conversation", tag: "30 min" },
        { text: "Tuesday, September 22 · 11:30 am" },
        { text: "Morse meeting · Ready when you are" },
      ],
      note: "One shared link. Less back-and-forth.",
    },
    during: {
      top: "Product catch-up",
      topTag: "Demo",
      status: "Minutes are on",
      title: "Present in the moment.",
      sub: "Your conversation, captured as it happens.",
      transcript: [
        { initials: "AL", name: "Alex", text: "Let’s get the launch brief ready for Friday." },
        { initials: "JK", name: "Jamie", text: "I’ll pull together the first draft." },
      ],
      note: "Morse is taking notes. You keep talking.",
    },
    after: {
      top: "Meeting minutes",
      status: "Ready to review",
      title: "Clarity you can carry forward.",
      sub: "The important things, already in one place.",
      lines: [
        { text: "✓ Decision: prepare the launch brief" },
        { text: "↗ Action: Jamie drafts the brief by Friday" },
        { text: "≋ Share the context with your team" },
      ],
      note: "Review your minutes. Put the next step in motion.",
    },
  },
};

export const calendar = {
  label: "Your time, thoughtfully connected",
  title: "A calendar.\nA booking link.",
  titleMuted: "A lot less juggling.",
  body: "Let people find a time that works. Bring booking pages, your calendar, and online meetings into one place—with no separate scheduling tool in the middle.",
  quiet: "From “let’s talk” to a meeting on the calendar.",
  booking: {
    host: "Morse / Product conversation",
    badge: "INTERACTIVE PREVIEW",
    title: "Let’s make time.",
    meta: "30 min · Morse meeting",
    // The demo month. Days before `firstOpenDay` are shown as past.
    year: 2026,
    month: 8,
    firstOpenDay: 22,
    timezone: "Times shown in India Standard Time",
    times: ["10:00 am", "11:30 am", "2:00 pm", "4:30 pm"],
    idle: "Choose a time to try the flow.",
  },
};

export const personal = {
  title: "Feels like your space.",
  titleMuted: "Works like your mind.",
  body: "A meeting app should adapt to you.\nMake room for the way you do your best work.",
  teleprompter: {
    label: "YOUR WORDS, RIGHT ON CUE",
    lines: [
      "Let’s start with the big picture.",
      "What if our best ideas didn’t\nget lost after the meeting?",
      "Let’s turn that conversation\ninto something we can build.",
    ],
    currentLine: 1,
    title: "Your train of thought. Uninterrupted.",
    body: "Keep notes in your eyeline with a built-in teleprompter. Present clearly and stay connected to the people in the room.",
  },
  customize: {
    label: "A LITTLE MORE YOU",
    greeting: "Good morning,",
    name: "Alex.",
    button: "＋ New meeting",
    themes: [
      { id: "sage", label: "Sage theme", color: "var(--color-accent)" },
      { id: "sand", label: "Sand theme", color: "var(--color-sand)" },
      { id: "lilac", label: "Lilac theme", color: "var(--color-lilac)" },
    ],
    title: "Less default. More you.",
    body: "Customize your meeting environment to feel like a place you want to be. A considered workspace, with your own personality.",
  },
};

export const workflow = {
  title: "The meeting ends.",
  titleMuted: "The momentum doesn’t.",
  body: "Morse captures minutes, surfaces action items, and helps turn decisions into agentic workflows. Review the outcome, share the context, and keep work moving.",
  demoLabel: "See a conversation become action",
  steps: [
    { icon: "≋", label: "THE CONVERSATION", text: "“Let’s get the launch brief ready for Friday.”" },
    { icon: "✓", label: "THE NEXT STEP", text: "Prepare launch brief", tag: "Friday" },
  ],
  final: {
    icon: "↗",
    label: "THE FOLLOW-THROUGH",
    idle: "Review. Assign. Share.",
    done: "Jamie · Launch brief · Due Friday",
  },
  caption: "Illustrative workflow · You stay in control.",
};

export const faq = {
  title: "A few things\nyou might be wondering.",
  items: [
    {
      q: "What is Morse?",
      a: "Morse is an online meeting app with built-in AI intelligence. It combines customizable video meetings, scheduling, automatic meeting minutes, action items, agentic workflows, and a teleprompter in one workspace.",
    },
    {
      q: "Does a separate AI bot join my meetings?",
      a: "No extra meeting attendee is needed to capture minutes. Morse’s meeting intelligence is built into the experience, so you can keep your attention on the conversation.",
    },
    {
      q: "Can Morse replace my scheduling tool?",
      a: "Morse brings booking and a calendar into the same workspace as your meetings. It is designed to replace the need for a separate booking tool such as Calendly for arranging your conversations.",
    },
    {
      q: "What happens to my notes after a meeting?",
      a: "Morse turns the conversation into meeting minutes you can review and share. Decisions can become action items and feed agentic workflows, helping your team carry the discussion into the work that follows.",
    },
    {
      q: "What can I customize?",
      a: "Morse is built for a more personal meeting experience, with a customizable workspace and tools such as the teleprompter that support the way you present and collaborate.",
    },
  ],
};

export const closing = {
  title: "Less meeting admin.\nMore meeting of minds.",
  cta: { label: "Find your flow with Morse", href: "#experience" },
};

export const footer = {
  tagline: "A little more human. A lot more possible.",
  maker: "Unified Machines",
};
