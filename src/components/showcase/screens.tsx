"use client";

import Image from "next/image";
import {
  ArrowDown01Icon,
  ArrowLeft01Icon,
  Building03Icon,
  Calendar03Icon,
  CallEnd01Icon,
  Cancel01Icon,
  CloudUploadIcon,
  ComputerScreenShareIcon,
  Database01Icon,
  Folder01Icon,
  HandIcon,
  Message02Icon,
  Mic02Icon,
  MoreHorizontalIcon,
  PauseIcon,
  Search01Icon,
  SmileIcon,
  SparklesIcon,
  SquareLock02Icon,
  Tick02Icon,
  UserAdd01Icon,
  UserMultiple02Icon,
  Video01Icon,
} from "@hugeicons/core-free-icons";
import { booking } from "@/content/site";
import { Icon } from "../ui";
import { LogoMark } from "../logo";
import { Written } from "../live-card";
import { Cam } from "../cam";
import { Avatar as Disc } from "../avatar";

/**
 * The app's screens, rebuilt at one design size (1120 × 700) from the real
 * room, notes, calendar and booking pages, with the app's own avatars and
 * profile backgrounds. They play only while `active`; each remounts its moving
 * parts when it becomes active, so the animation starts from the top.
 */
export const SCREEN_W = 1120;
export const SCREEN_H = 700;

type Who = "sofia" | "daniel" | "you";
/** `name` is what a tile calls them; `full` is who they are. The two differ
 *  for one person — your own tile says "You" — and the disc needs the second,
 *  or it initialises the word rather than the person. */
const PEOPLE: Record<Who, { name: string; full: string; colour: string; dot: string }> = {
  sofia: { name: "Sofia Ferrer", full: "Sofia Ferrer", colour: "ember", dot: "#e8927c" },
  daniel: { name: "Daniel Chen", full: "Daniel Chen", colour: "lagoon", dot: "#8fb8c9" },
  you: { name: "You", full: "Amara Cole", colour: "sage", dot: "#a9be8c" },
};

const at = (ms: number) => ({ animationDelay: `${ms}ms` });

function Avatar({ who, size }: { who: Who; size: number }) {
  return <Disc colour={PEOPLE[who].colour} name={PEOPLE[who].full} size={size} />;
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex flex-col overflow-hidden rounded-[28px] bg-canvas px-4 pt-3.5 pb-3"
      style={{ width: SCREEN_W, height: SCREEN_H }}
    >
      {children}
    </div>
  );
}

function RoomBar({ recording = true }: { recording?: boolean }) {
  return (
    <div className="flex h-11 items-center gap-3.5">
<LogoMark className="size-6 text-ink" title="" />
      <span className="h-5 w-px bg-hairline" />
      <span className="text-[18px] text-ink">Weekly design review</span>
      <span className="font-mono text-[14px] text-ink-faint">dsn-revw-wkl</span>
      {recording && (
        <span className="ml-auto flex items-center gap-2 text-[15px] text-signal-ink">
          <span className="size-2 animate-blink rounded-full bg-signal" />
          Recording
        </span>
      )}
      <span className="flex items-center gap-2 rounded-full bg-raised px-3.5 py-1.5 text-[14px] text-ink-soft">
        In call <b className="font-mono text-[18px] font-medium text-ink">12:05</b>
      </span>
    </div>
  );
}

function Panel({ title, count, children, width }: { title: string; count?: number; children: React.ReactNode; width: number }) {
  return (
    <div className="flex shrink-0 flex-col rounded-[22px] bg-raised p-[18px]" style={{ width }}>
      <div className="flex items-center justify-between">
        <span className="text-[17px] text-ink">
          {title} {count !== undefined && <span className="text-ink-faint">{count}</span>}
        </span>
        <Icon icon={Cancel01Icon} className="size-[18px] text-ink-faint" />
      </div>
      {children}
    </div>
  );
}

const TURNS: [Who, string, string][] = [
  ["sofia", "17:11", "I pulled the numbers from last quarter before this."],
  ["daniel", "17:11", "The gap is mostly onboarding. People sign up and never get to a second meeting."],
  ["sofia", "17:12", "What did we promise Acme on the renewal?"],
];

function Transcript({ active }: { active: boolean }) {
  return (
    <Panel title="Transcript" width={250}>
      <div key={active ? "on" : "off"}>
        {TURNS.map(([who, time, text], i) => (
          <div key={i} className={`mt-4 ${active ? "animate-rise" : ""}`} style={at(300 + i * 900)}>
            <p className="flex items-center justify-between text-[14px] text-ink">
              <span className="flex items-center gap-2">
                <i className="size-1.5 rounded-full" style={{ background: PEOPLE[who].dot }} />
                {PEOPLE[who].name}
              </span>
              <span className="text-ink-faint">{time}</span>
            </p>
            <p
              className={`mt-1 border-l-2 pl-3 text-[15px]/[1.45] ${i === TURNS.length - 1 ? "text-ink" : "text-ink-soft"}`}
              style={{ borderColor: PEOPLE[who].dot + (i === TURNS.length - 1 ? "" : "66") }}
            >
              {text}
            </p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function Stage({ speaking }: { speaking: Who }) {
  const others = (["sofia", "daniel", "you"] as Who[]).filter((w) => w !== speaking);
  const tile = (who: Who, big: boolean) => (
    <div
      key={who}
      className="relative overflow-hidden rounded-[20px] bg-sunken"
      style={{ boxShadow: big ? "0 0 0 2px var(--signal)" : undefined }}
    >
      {/* The seat is the person, not the position, so somebody does not
          jump to a different part of their clip when the speaker changes. */}
      <Cam colour={PEOPLE[who].colour} seat={["sofia", "daniel", "you"].indexOf(who)} />
      <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-canvas/70 px-3 py-1 text-[14px] text-ink">
        {big && <Icon icon={Mic02Icon} className="size-3.5" />}
        {PEOPLE[who].name}
      </span>
    </div>
  );
  return (
    <div className="grid min-w-0 flex-1 grid-rows-[1.7fr_1fr] gap-2.5">
      {tile(speaking, true)}
      <div className="grid grid-cols-2 gap-2.5">{others.map((w) => tile(w, false))}</div>
    </div>
  );
}

function Controls() {
  // 44px, as the app's `BASE` is. Order, icons and the one divider are the
  // app's too: mic, camera, share, react, hand │ chat, people, intelligence,
  // more, leave. The hand was missing here, which put the divider a button
  // early and left the room with no way to do the thing the hero animates —
  // "Daniel raised a hand" with no hand button under it.
  const round = "grid size-11 place-items-center rounded-full bg-overlay text-ink";
  return (
    <div className="mt-2.5 flex justify-center">
      <div className="flex items-center gap-2 rounded-full bg-raised p-[7px]">
        {[Mic02Icon, Video01Icon, ComputerScreenShareIcon, SmileIcon, HandIcon].map((ic, i) => (
          <span key={i} className={round}>
            <Icon icon={ic} className="size-5" />
          </span>
        ))}
        <span className="mx-1 h-6 w-px bg-hairline" />
        {[Message02Icon, UserMultiple02Icon].map((ic, i) => (
          <span key={i} className={round}>
            <Icon icon={ic} className="size-5" />
          </span>
        ))}
        {/* Morse Intelligence, open — the app's `SELECTED`, which is the ink
            swapped for the ground rather than an accent. */}
        <span className={`${round} !bg-ink !text-canvas`}>
          <Icon icon={SparklesIcon} className="size-5" />
        </span>
        <span className={round}>
          <Icon icon={MoreHorizontalIcon} className="size-5" />
        </span>
        <span className="ml-1 grid h-11 w-16 place-items-center rounded-full bg-[oklch(0.7_0.17_25)] text-[oklch(0.2_0.03_25)]">
          <Icon icon={CallEnd01Icon} className="size-5" />
        </span>
      </div>
    </div>
  );
}

/** The room with People open: who is here, and the transcript building. */
export function RoomScreen({ active }: { active: boolean }) {
  return (
    <Frame>
      <RoomBar />
      <div className="mt-2.5 flex min-h-0 flex-1 gap-3">
        <Transcript active={active} />
        <Stage speaking="sofia" />
        <Panel title="People" count={3} width={280}>
          <span className="mt-4 flex h-[42px] items-center justify-center gap-2 rounded-full bg-overlay text-[15px] text-ink">
            <Icon icon={UserAdd01Icon} className="size-[18px]" /> Add people
          </span>
          {([
            ["you", "Amara (you)", "Host · Design lead"],
            ["daniel", "Daniel Chen", "Guest"],
            ["sofia", "Sofia Ferrer", "Guest · speaking"],
          ] as [Who, string, string][]).map(([who, name, role]) => (
            <div key={who} className="mt-4 flex items-center gap-3">
              <Avatar who={who} size={36} />
              <div className="flex-1">
                <p className="text-[15px] text-ink">{name}</p>
                <p className="text-[13px] text-ink-faint">{role}</p>
              </div>
              <Icon icon={Mic02Icon} className={`size-[17px] ${who === "sofia" ? "text-signal-ink" : "text-ink-soft"}`} />
            </div>
          ))}
        </Panel>
      </div>
      <Controls />
    </Frame>
  );
}

/**
 * The room with Morse Intelligence open.
 *
 * Built to the handoff spec of 24 September 2026, whose one rule is: **the
 * notification carries the live moment, the panel keeps the record.** Anything
 * you must read right now is over the stage at full size; anything you might
 * want later is a line in the panel. Nothing tries to be both.
 *
 * Two things changed from what was here before, and both come straight out of
 * that rule:
 *
 * 1. **There is a notification over the stage.** Answers used to appear only
 *    in the 300px panel, at 14px, beside the person still talking. The spec
 *    puts the live answer top-centre of the stage on `float`, at 19/1.45 in
 *    300 weight, because the reader has one glance to spare.
 * 2. **A collapsed row leads with the answer, not the question.** The reader
 *    was in the room and heard the question asked; it is the least informative
 *    thing on the card. The one line they get should be the part they do not
 *    already know.
 *
 * Marker dots carry state and never carry it alone: sage for an answer, faint
 * for nothing found, coral for an offer waiting on a decision. Coral is
 * reserved for what is live — never for a resolved answer.
 */
export function IntelligenceScreen({ active }: { active: boolean }) {
  return (
    <Frame>
      <RoomBar />
      <div className="mt-2.5 flex min-h-0 flex-1 gap-3">
        <Transcript active={false} />

        {/* The stage carries the live answer, top-centre. */}
        <div className="relative isolate min-w-0 flex-1">
          <Stage speaking="daniel" />
          <div
            key={active ? "on" : "off"}
            className={`absolute top-3 left-1/2 z-10 w-[420px] -translate-x-1/2 rounded-[22px] bg-float p-4 shadow-float ${active ? "animate-rise" : ""}`}
            style={at(300)}
          >
            <p className="pr-8 text-[14px]/[1.4] text-ink-soft">
              <b className="font-medium text-ink">Sofia Ferrer</b> asked &ldquo;What did we promise Acme on the renewal?&rdquo; &middot; now
            </p>
            <p className="mt-1.5 text-[19px]/[1.45] font-light text-ink">
              {active ? <Written text="This year’s rate, fixed until March, with two extra seats." delay={700} step={62} /> : "This year’s rate, fixed until March, with two extra seats."}
            </p>
            <p className={`mt-1.5 text-[14px]/[1.4] text-ink-faint ${active ? "animate-rise" : ""}`} style={at(2600)}>
              From Acme renewal notes
            </p>
            <span className="absolute top-2.5 right-2.5 grid size-8 place-items-center rounded-full text-ink-faint">
              <Icon icon={Cancel01Icon} className="size-3.5" />
            </span>
          </div>
        </div>

        {/* The panel keeps the record: status, then one scrolling flow, then
            the composer. Exactly one scroll region — that is what stops the
            composer being squeezed out. */}
        <Panel title="Morse Intelligence" width={300}>
          <div className="mt-2.5 flex shrink-0 gap-2.5 rounded-[14px] bg-overlay px-3 py-2 text-[13px]/[1.4] text-ink-soft">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-action" />
            <span>
              <b className="font-medium text-ink">The host has you on.</b> Answered for you, Sofia and Daniel &mdash; 3 people.
            </span>
          </div>

          <div key={active ? "on" : "off"} className="mt-2 flex min-h-0 flex-1 flex-col gap-1.5 overflow-hidden">
            {/* Collapsed: the answer's first line, not the question. */}
            <div className="flex shrink-0 items-center gap-2.5 rounded-[13px] px-2.5 py-1.5">
              <span className="size-1.5 shrink-0 rounded-full bg-action" />
              <span className="min-w-0 flex-1 truncate text-[14px] text-ink">This year&rsquo;s rate, fixed until March.</span>
              <span className="shrink-0 text-[13px] text-ink-faint tabular-nums">4m</span>
            </div>
            <div className="flex shrink-0 items-center gap-2.5 rounded-[13px] px-2.5 py-1.5">
              <span className="size-1.5 shrink-0 rounded-full bg-ink-faint" />
              <span className="min-w-0 flex-1 truncate text-[14px] text-ink-faint">Nothing in your notes &mdash; &ldquo;What happened last March?&rdquo;</span>
              <span className="shrink-0 text-[13px] text-ink-faint tabular-nums">3m</span>
            </div>

            {/* The offer waits on a decision, so it never collapses. */}
            <div className={`shrink-0 rounded-[16px] bg-sunken p-3 shadow-sunken ${active ? "animate-rise" : ""}`} style={at(2100)}>
              <p className="text-[14px] font-medium text-ink-soft">Book a follow-up?</p>
              <p className="text-[15px]/[1.35] font-medium text-ink">Acme &mdash; renewal follow-up</p>
              <p className="text-[14px]/[1.45] text-ink">Thursday 26 September, 2:00&ndash;2:30 pm</p>
              <div className="mt-2.5 flex gap-2">
                <span className="grid h-8 flex-1 place-items-center rounded-full bg-action text-[13px] font-medium text-action-foreground">
                  Book and invite
                </span>
                <span className="grid h-8 flex-1 place-items-center rounded-full text-[13px] text-ink-soft">Don&rsquo;t book</span>
              </div>
            </div>

            {/* The landing flash: a notification whose time is up collapses
                into its row and the row washes coral for about a second. It is
                the answer to "where did that go?", and the only place a row is
                ever tinted. */}
            <div className="flex shrink-0 items-center gap-2.5 rounded-[13px] bg-signal/20 px-2.5 py-1.5">
              <span className="size-1.5 shrink-0 rounded-full bg-action" />
              <span className="min-w-0 flex-1 truncate text-[14px] text-ink">90 days by default. An admin can set 7 days to never.</span>
              <span className="shrink-0 text-[13px] text-ink-faint tabular-nums">now</span>
            </div>
          </div>

          <div className="mt-auto shrink-0 pt-2">
            <div className="flex items-center gap-2 rounded-[22px] bg-sunken py-1.5 pr-1.5 pl-4 shadow-sunken">
              <span className="flex-1 py-1 text-[14px] text-ink-faint">Ask Morse Intelligence</span>
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-overlay text-ink-faint">
                <Icon icon={ArrowDown01Icon} className="size-4 rotate-180" />
              </span>
            </div>
            <p className="mt-1.5 px-2 text-[12px]/[1.4] text-ink-faint">Only you see what you type here.</p>
          </div>
        </Panel>
      </div>
      <Controls />
    </Frame>
  );
}

/** The notes page: summary, decisions, action items ticking off, the recording. */
export function NotesScreen({ active }: { active: boolean }) {
  const items: [string, string][] = [
    ["Draft the onboarding nudge", "Daniel · Fri"],
    ["Send Acme the renewal terms", "Sofia · Tomorrow"],
    ["Book three user interviews", "You · Next week"],
  ];
  return (
    <Frame>
      <div className="flex h-11 items-center gap-3.5">
<LogoMark className="size-6 text-ink" title="" />
        <span className="h-5 w-px bg-hairline" />
        <span className="text-[16px] text-ink-soft">Meetings</span>
        <span className="text-[16px] text-ink-faint">/</span>
        <span className="text-[16px] text-ink">Weekly design review</span>
        <span className="ml-auto rounded-full bg-overlay px-4 py-1.5 text-[14px] text-ink">Share</span>
      </div>
      <div className="mt-3 grid min-h-0 flex-1 grid-cols-[1.35fr_1fr] gap-3" key={active ? "on" : "off"}>
        <div className="rounded-[22px] bg-raised px-7 py-6">
          <p className="font-mono text-label text-ink-faint uppercase">Tuesday 22 September · 42 min</p>
          <p className="mt-2 text-[27px] font-light text-ink">Weekly design review</p>
          <p className="mt-3 text-[17px]/[1.55] text-ink-soft">
            {active ? (
              <Written text="Onboarding is where people drop off. The team will test a second-meeting nudge and keep Acme on this year’s rate." step={40} />
            ) : (
              "Onboarding is where people drop off. The team will test a second-meeting nudge and keep Acme on this year’s rate."
            )}
          </p>
          <p className="mt-6 font-mono text-label text-ink-faint uppercase">Decisions</p>
          <p className="mt-2 text-[17px] text-ink">Test the second-meeting nudge for two weeks</p>
          <p className="mt-1 text-[17px] text-ink">Acme stays on this year’s rate until March</p>
          <p className="mt-6 font-mono text-label text-ink-faint uppercase">Your action items</p>
          {items.map(([t, m], i) => (
            <div key={t} className="mt-3 flex items-center gap-3">
              <span className="relative grid size-[22px] place-items-center rounded-full bg-overlay">
                {i === 0 && (
                  <span
                    className={`absolute inset-0 grid place-items-center rounded-full bg-action text-action-foreground ${active ? "animate-rise" : ""}`}
                    style={at(2600)}
                  >
                    <Icon icon={Tick02Icon} className="size-3.5" />
                  </span>
                )}
              </span>
              <span className="flex-1 text-[17px] text-ink">{t}</span>
              <span className="text-[15px] text-ink-faint">{m}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <div className="relative flex-1 overflow-hidden rounded-[22px] bg-sunken">
            <Cam colour="fjord" />
            <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-full bg-canvas/75 px-3 py-2">
              <span className="grid size-8 place-items-center rounded-full bg-ink text-canvas">
                <Icon icon={PauseIcon} className="size-4" />
              </span>
              <span className="h-1 flex-1 overflow-hidden rounded-full bg-overlay">
                <span
                  className="block h-full origin-left rounded-full bg-ink"
                  style={active ? { animation: "fill 9s linear both" } : { transform: "scaleX(0.3)" }}
                />
              </span>
              <span className="font-mono text-[13px] text-ink-soft">12:48</span>
            </div>
          </div>
          <div className="rounded-[22px] bg-raised px-5 py-4">
            <p className="text-[16px] text-ink">Transcript</p>
            {TURNS.slice(0, 2).map(([who, time, text]) => (
              <p key={time + who} className="mt-2 text-[14px]/[1.45] text-ink-soft">
                <b className="font-medium text-ink">{PEOPLE[who].name.split(" ")[0]}</b> {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

/** The calendar's week: Morse meetings and Google events; the booked follow-up drops in. */
export function CalendarScreen({ active }: { active: boolean }) {
  const days = ["Mon 21", "Tue 22", "Wed 23", "Thu 24", "Fri 25"];
  const hours = ["9", "10", "11", "12", "1", "2", "3", "4"];
  const events: { d: number; h: number; len: number; title: string; tone: string; drop?: boolean }[] = [
    { d: 0, h: 1, len: 1, title: "Standup", tone: "var(--action)" },
    { d: 1, h: 2, len: 2, title: "Weekly design review", tone: "var(--action)" },
    { d: 2, h: 4, len: 1, title: "Acme renewal", tone: "#94b6d2" },
    { d: 4, h: 3, len: 1, title: "1:1 with Sofia", tone: "var(--action)" },
    { d: 0, h: 5, len: 2, title: "Focus (Google)", tone: "oklch(0.72 0.028 56)" },
    { d: 3, h: 5, len: 1, title: "Follow-up: design review", tone: "var(--signal)", drop: true },
  ];
  return (
    <Frame>
      <div className="flex h-11 items-center gap-3">
        <span className="text-[21px] text-ink">September 2026</span>
        <span className="ml-3 flex rounded-full bg-raised p-1 text-[14px]">
          {["Day", "Week", "Month", "Schedule"].map((v) => (
            <span key={v} className={`rounded-full px-3.5 py-1 ${v === "Week" ? "bg-overlay text-ink" : "text-ink-soft"}`}>
              {v}
            </span>
          ))}
        </span>
        <span className="ml-auto rounded-full bg-action px-4 py-1.5 text-[14px] font-medium text-action-foreground">New meeting</span>
      </div>
      <div className="mt-3 flex-1 rounded-[22px] bg-raised p-5" key={active ? "on" : "off"}>
        <div className="grid grid-cols-[40px_repeat(5,1fr)] gap-x-2">
          <span />
          {days.map((d, i) => (
            <span key={d} className={`pb-2 text-center text-[14px] ${i === 1 ? "text-ink" : "text-ink-faint"}`}>
              {i === 1 ? <span className="rounded-full bg-signal px-2 py-0.5 text-ink-inverse">{d}</span> : d}
            </span>
          ))}
        </div>
        <div className="relative grid grid-cols-[40px_repeat(5,1fr)] gap-x-2">
          {hours.map((h, r) => (
            <div key={h} className="contents">
              <span className="h-[62px] pr-2 text-right text-[13px] text-ink-faint">{h}</span>
              {days.map((d) => (
                <span key={d + h} className="h-[62px] border-t border-hairline/60" />
              ))}
              {r === 0 && null}
            </div>
          ))}
          {events.map((e) => (
            <span
              key={e.title}
              /* `animate-rise`, not `animate-enter`: enter blurs on the way in,
                 and a filter inside the row's scale() makes the browser raster
                 this one block at its layout size and then stretch it, so it
                 stayed soft next to everything around it. */
              className={`absolute rounded-[10px] border-l-[3px] px-2.5 py-1.5 text-[13px]/[1.3] text-ink ${e.drop && active ? "animate-rise" : ""}`}
              style={{
                left: `calc(40px + 8px + (100% - 40px - 8px * 5) / 5 * ${e.d} + 8px * ${e.d})`,
                width: `calc((100% - 40px - 8px * 5) / 5)`,
                top: e.h * 62 + 3,
                height: e.len * 62 - 6,
                background: `color-mix(in oklch, ${e.tone} 22%, transparent)`,
                borderColor: e.tone,
                boxShadow: e.drop ? "0 8px 26px oklch(0.78 0.125 36 / 0.3)" : undefined,
                ...(e.drop ? at(900) : {}),
              }}
            >
              {e.title}
            </span>
          ))}
        </div>
      </div>
    </Frame>
  );
}

/**
 * The public booking page, as the app actually draws one.
 *
 * Anatomy from `booking-shell.tsx`: who you are booking, then two near-square
 * cards — the picture on the left, holding still, and the form on the right
 * moving through its steps. **One step at a time.** This showed a calendar and
 * a times grid side by side with a "Booked" line under them, which is a
 * product Morse does not have: in the app the times replace the month, the
 * form replaces the times, and the confirmation replaces the form.
 *
 * The strip above the steps is the app's own: back, the meeting type, the
 * crumbs for what has been chosen so far, and the length on the right.
 *
 * The track is CSS (`.book-steps`), not GSAP — it runs for exactly the
 * montage's hold and restarts with `active`, so it cannot drift from the
 * clock the pop-ups run on.
 */
export function BookingScreen({ active }: { active: boolean }) {
  const p = booking.page;
  const WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const FREE = [23, 24, 25, 28, 29, 30];
  const STEP = "flex w-full shrink-0 flex-col px-6 pt-5 pb-6";

  return (
    <Frame>
      <div className="flex h-full flex-col items-center justify-center" key={active ? "on" : "off"}>
        {/* Avatar, name, role — the app's whole header for this page. */}
        <div className="flex w-[880px] items-center gap-5">
          <Avatar who="sofia" size={64} />
          <div>
            <p className="text-[28px]/[1.15] font-light tracking-[-0.5px] text-ink">Book a meeting with {p.host}</p>
            <p className="text-[18px] text-ink-soft">{p.role}</p>
          </div>
        </div>

        <div className="mt-6 grid w-[880px] grid-cols-2 items-start gap-4">
          {/* The picture, framed inside the card as the app frames its film:
              inset 8px, following the card's corners. It holds still. */}
          <div className="h-[420px] rounded-[26px] bg-raised p-2">
            <div className="relative isolate size-full overflow-hidden rounded-[20px] bg-[#05070a]">
              <Image src="/art/current-light.webp" alt="" width={1600} height={1067} sizes="440px" className="size-full object-cover dark:hidden" />
              <Image src="/art/current.webp" alt="" width={1600} height={1067} sizes="440px" className="hidden size-full object-cover dark:block" />
            </div>
          </div>

          {/* The form. One card, four steps, the track sliding between them. */}
          <div className="relative isolate flex h-[420px] flex-col overflow-hidden rounded-[26px] bg-raised">
            <div className="flex items-center gap-2 border-b border-hairline px-6 py-3.5">
              <Icon icon={ArrowLeft01Icon} className="size-5 shrink-0 text-ink-faint" />
              <p className="shrink-0 text-[18px] font-medium text-ink">{p.type}</p>
              <p className="truncate text-[15px] text-ink-soft">&middot; Wed 23</p>
              <p className="shrink-0 text-[15px] text-ink-soft tabular-nums">&middot; {p.pick}</p>
              <p className="ml-auto shrink-0 text-[15px] text-ink-soft tabular-nums">{p.minutes}</p>
            </div>

            <div className="relative min-h-0 flex-1 overflow-hidden">
              <div className={`flex h-full w-full ${active ? "book-steps" : ""}`}>
                {/* 1 · the month */}
                <div className={STEP}>
                  <div className="flex items-center justify-between px-2 text-[16px] text-ink">
                    <Icon icon={ArrowLeft01Icon} className="size-4 text-ink-faint" />
                    <span>{p.month}</span>
                    <Icon icon={ArrowLeft01Icon} className="size-4 rotate-180 text-ink-faint" />
                  </div>
                  <div className="mt-3 grid grid-cols-7 gap-y-0.5 text-center text-[13px]">
                    {WEEK.map((d) => (
                      <span key={d} className="text-ink-faint">{d}</span>
                    ))}
                    {[0, 1].map((i) => <span key={`b${i}`} />)}
                    {Array.from({ length: 30 }, (_, i) => i + 1).map((n) => (
                      <span key={n} className="relative mx-auto grid size-8 place-items-center">
                        {n === p.day && <span className="absolute inset-0 rounded-full bg-overlay" />}
                        <span className={`relative tabular-nums ${FREE.includes(n) ? "text-ink" : "text-ink-faint/45"}`}>{n}</span>
                        {FREE.includes(n) && <span className="absolute bottom-0.5 size-1 rounded-full bg-action" />}
                      </span>
                    ))}
                  </div>
                  <p className="mt-auto flex items-center gap-2 px-2 text-[14px] text-ink-soft">
                    <span className="size-1.5 rounded-full bg-action" />
                    {p.free}
                  </p>
                </div>

                {/* 2 · the time. Three across, as the app lays them out. */}
                <div className={STEP}>
                  <p className="text-[16px] text-ink">{p.dayLabel}</p>
                  <p className="text-[13px] text-ink-faint">{p.zone}</p>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {p.times.map((t) => (
                      <span
                        key={t}
                        className={`grid h-10 place-items-center rounded-full text-[15px] tabular-nums ${
                          t === p.pick ? "bg-action font-medium text-action-foreground" : "bg-sunken text-ink shadow-sunken"
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3 · who you are */}
                <div className={STEP}>
                  {([["name", p.name] as const, ["email", p.email] as const]).map(([k, field]) => (
                    <label key={k} className="mt-3 flex flex-col gap-1.5 first:mt-0">
                      <span className="px-1 text-[15px] font-medium text-ink-soft">{field.label}</span>
                      <span className="flex h-11 items-center rounded-full bg-sunken px-5 text-[16px] text-ink shadow-sunken">
                        {field.value}
                      </span>
                    </label>
                  ))}
                  <p className="mt-1.5 px-1 text-[14px]/[1.4] text-ink-faint">{p.email.hint}</p>
                  <div className="mt-auto flex justify-end">
                    <span className="inline-flex h-11 items-center rounded-full bg-action px-7 text-[16px] font-medium text-action-foreground">
                      {p.confirm}
                    </span>
                  </div>
                </div>

                {/* 4 · booked */}
                <div className={STEP}>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-action">
                      <Icon icon={Tick02Icon} className="size-3.5 text-action-foreground" />
                    </span>
                    <p className="text-[22px]/[1.25] font-light tracking-[-0.3px] text-ink">{p.done.title}</p>
                  </div>
                  <p className="mt-3 text-[17px]/[1.5] text-ink">{p.done.what}</p>
                  <p className="mt-1 text-[14px] text-ink-soft">{p.zone.replace("Times shown in ", "")}</p>
                  <p className="mt-4 text-[15px]/[1.5] text-ink-soft">
                    {p.done.sent} <span className="text-ink">{p.email.value}</span>.
                  </p>
                  <p className="mt-auto border-t border-hairline pt-4 text-[14px] text-ink-soft">
                    Booked the wrong time? <span className="tabular-nums">9:55</span> {p.done.undo}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

/** The meetings home: the film, a greeting, the clock, and what's next. Sits at the row's start. */
export function HomeScreen() {
  return (
    <Frame>
      <div className="mx-auto flex w-[760px] flex-1 flex-col pt-4">
        <div className="overflow-hidden rounded-[28px] bg-raised p-2">
          <div className="relative h-[190px] overflow-hidden rounded-[22px] bg-cover bg-center" style={{ backgroundImage: "url(/app/film-poster.jpg)" }}>
            <span className="absolute top-4 left-4 flex items-center gap-2 text-[15px] text-ink">
              <LogoMark className="size-4" title="" /> Morse
            </span>
          </div>
          <div className="flex items-end justify-between px-5 pt-5 pb-4">
            <div>
              <p className="text-[18px] font-light text-ink-soft">Good morning,</p>
              <p className="text-[44px]/[1.1] font-light text-ink">Amara</p>
              <p className="mt-1 text-[15px] text-ink-soft">Design lead</p>
              <div className="mt-4 flex gap-2">
                <span className="flex h-11 items-center gap-2 rounded-full bg-action px-5 text-[16px] font-medium text-action-foreground">
                  + New meeting
                </span>
                <span className="flex h-11 w-[200px] items-center rounded-full bg-overlay px-4 text-[15px] text-ink-faint">Code or link</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[15px] text-ink">Tuesday 22 September</p>
              <p className="mt-2 font-mono text-[64px]/[1] tracking-[-0.04em] text-ink">10:24</p>
            </div>
          </div>
        </div>
        <p className="mt-6 font-mono text-label text-ink-faint uppercase">Upcoming</p>
        {[
          ["11:00", "Weekly design review", "Sofia, Daniel"],
          ["14:00", "Acme renewal", "Guest: Sam from Acme"],
        ].map(([t, n, w]) => (
          <div key={n} className="mt-2 flex items-center gap-5 rounded-[20px] bg-raised px-5 py-3.5">
            <span className="w-14 text-[17px] text-ink tabular-nums">{t}</span>
            <span className="flex-1">
              <span className="block text-[17px] text-ink">{n}</span>
              <span className="block text-[14px] text-ink-faint">{w}</span>
            </span>
            <span className="rounded-full bg-overlay px-4 py-1.5 text-[14px] text-ink">Start</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/**
 * Knowledge, as the page really is (frontend/components/knowledge/*): a centred
 * header, the "Adding to" strip, the Add context / OR / Upload files pair, then
 * the folders. The earlier rebuild invented an "Add note" button, a persistent
 * search bar, photo covers on the folders and a "Recent" list — none of which
 * the app has. Folders count "items", carry an Active switch and say who can
 * see them, and Global is always first.
 */
const FOLDERS: [string, string, string, string, boolean][] = [
  ["Global", "42 items", "building", "Default", true],
  ["Acme", "12 items", "folder", "Sales +2", true],
  ["Hiring", "9 items", "lock", "Only you", false],
];

function FolderTile({ kind }: { kind: string }) {
  const icon = kind === "building" ? Building03Icon : kind === "lock" ? SquareLock02Icon : Folder01Icon;
  return (
    <span className="grid size-12 shrink-0 place-items-center rounded-[16px] bg-sunken text-ink-soft shadow-sunken">
      <Icon icon={icon} className="size-6" />
    </span>
  );
}

export function KnowledgeScreen({ active }: { active: boolean }) {
  return (
    <Frame>
      {/* The centred header the page actually opens with. */}
      <div className="flex flex-col items-center text-center">
        <span className="grid size-14 place-items-center rounded-full bg-raised text-ink shadow-raised">
          <Icon icon={Database01Icon} className="size-6" />
        </span>
        <p className="mt-3 text-[34px]/[1.15] font-light tracking-[-0.6px] text-ink">Knowledge base</p>
        <p className="mt-1.5 max-w-[60ch] text-[15px]/[1.45] text-ink-soft">
          What Morse Intelligence answers from in a meeting. Logins and passwords belong in the Vault, which it never reads.
        </p>
      </div>

      <div className="mt-4 flex items-center gap-3 text-[15px]">
        <span className="text-ink-soft">Adding to</span>
        <span className="flex items-center gap-2 rounded-full bg-raised px-3.5 py-1.5 text-ink shadow-raised">
          <Icon icon={Folder01Icon} className="size-4 text-ink-soft" />
          Acme
          <Icon icon={ArrowDown01Icon} className="size-4 text-ink-faint" />
        </span>
        <span className="text-ink-faint">You and Sales and 1 person can see this.</span>
      </div>

      {/* Add context · OR · Upload files */}
      <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="rounded-[22px] bg-raised p-4 shadow-raised">
          <p className="text-[17px] text-ink">Add context</p>
          <p className="mt-0.5 text-[14px] text-ink-faint">Type or paste anything Morse Intelligence should know.</p>
          <div className="mt-3 h-[76px] rounded-[16px] bg-sunken px-3.5 py-2.5 text-[14px]/[1.45] shadow-sunken">
            {active ? (
              <span className="text-ink">
                <Written text="This year’s rate is fixed until March, with two extra seats." delay={700} step={70} />
              </span>
            ) : (
              <span className="text-ink-faint">Pricing, a security answer, notes on a client, a whole document…</span>
            )}
          </div>
          <div className="mt-2.5 flex items-center text-[13px] text-ink-faint">
            <span className="tabular-nums">0 / 200,000</span>
            <span className="ml-auto flex gap-2">
              <span className="rounded-full px-3 py-1 text-ink-soft">Preview</span>
              <span className="rounded-full bg-overlay px-3 py-1 text-ink">Save</span>
            </span>
          </div>
        </div>

        <span className="grid size-9 place-items-center rounded-full bg-raised text-[13px] text-ink-faint shadow-raised">OR</span>

        <div className="rounded-[22px] bg-raised p-4 shadow-raised">
          <p className="text-[17px] text-ink">Upload files</p>
          <p className="mt-0.5 text-[14px] text-ink-faint">PDF, Word, Excel, CSV, text or Markdown, up to 20 MB each.</p>
          <div className="mt-3 flex h-[76px] flex-col items-center justify-center rounded-[16px] bg-sunken text-center shadow-sunken">
            <Icon icon={CloudUploadIcon} className="size-6 text-ink-faint" />
            <p className="mt-1.5 text-[14px] text-ink-soft">Drag and drop files here</p>
            <p className="text-[13px] text-ink-faint">or click to browse</p>
          </div>
          <div className="mt-2.5 flex text-[13px]">
            <span className="ml-auto rounded-full bg-overlay px-3 py-1 text-ink">+ Add files</span>
          </div>
        </div>
      </div>

      {/* Folders */}
      <div className="mt-4 flex items-center gap-3">
        <p className="text-[19px] text-ink">
          Folders <span className="text-[15px] text-ink-faint">5</span>
        </p>
        <Icon icon={Search01Icon} className="size-[18px] text-ink-soft" />
        <span className="ml-auto flex items-center gap-2 text-[14px]">
          <span className="flex rounded-full bg-raised p-1">
            {["Rows", "Cards"].map((v) => (
              <span key={v} className={`rounded-full px-3 py-1 ${v === "Cards" ? "bg-overlay text-ink" : "text-ink-soft"}`}>
                {v}
              </span>
            ))}
          </span>
          <span className="rounded-full bg-raised px-3.5 py-1.5 text-ink-soft">Newest</span>
          <span className="rounded-full bg-action px-4 py-1.5 font-medium text-action-foreground">+ New folder</span>
        </span>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-3">
        {FOLDERS.map(([name, count, kind, reach, on], i) => (
          <div
            key={name}
            className={`rounded-[22px] bg-raised p-3.5 shadow-raised transition-shadow duration-500 ${
              active && i === 1 ? "shadow-[0_0_0_2px_var(--action)] delay-[1400ms]" : ""
            }`}
          >
            <FolderTile kind={kind} />
            <p className="mt-3 text-[17px] text-ink">{name}</p>
            <p className="text-[14px] text-ink-faint">{count}</p>
            <div className="mt-3 flex items-center gap-2">
              <span className={`flex h-5 w-9 items-center rounded-full px-0.5 ${on ? "bg-action" : "bg-overlay"}`}>
                <span className={`size-4 rounded-full bg-canvas transition-transform ${on ? "translate-x-4" : ""}`} />
              </span>
              <span className="text-[13px] text-ink-soft">{on ? "Active" : "Off"}</span>
              <span className="ml-auto rounded-full bg-overlay px-2.5 py-0.5 text-[13px] text-ink-soft">{reach}</span>
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}
