"use client";

import {
  ArrowDown01Icon,
  Building03Icon,
  Calendar03Icon,
  CallEnd01Icon,
  Cancel01Icon,
  CloudUploadIcon,
  ComputerScreenShareIcon,
  Database01Icon,
  Folder01Icon,
  Message01Icon,
  Mic01Icon,
  MoreHorizontalIcon,
  PauseIcon,
  Search01Icon,
  SmileIcon,
  SparklesIcon,
  SquareLock02Icon,
  Tick02Icon,
  UserAdd01Icon,
  UserGroupIcon,
  Video01Icon,
} from "@hugeicons/core-free-icons";
import { Icon } from "../ui";
import { LogoMark } from "../logo";
import { Written } from "../live-card";
import { Cam } from "../cam";

/**
 * The app's screens, rebuilt at one design size (1120 × 700) from the real
 * room, notes, calendar and booking pages, with the app's own avatars and
 * profile backgrounds. They play only while `active`; each remounts its moving
 * parts when it becomes active, so the animation starts from the top.
 */
export const SCREEN_W = 1120;
export const SCREEN_H = 700;

type Who = "priya" | "arjun" | "you";
const PEOPLE: Record<Who, { name: string; colour: string; dot: string }> = {
  priya: { name: "Priya Shah", colour: "ember", dot: "#e8927c" },
  arjun: { name: "Arjun Mehta", colour: "lagoon", dot: "#8fb8c9" },
  you: { name: "You", colour: "sage", dot: "#a9be8c" },
};

const at = (ms: number) => ({ animationDelay: `${ms}ms` });

function Avatar({ who, size }: { who: Who; size: number }) {
  return (
    <span
      className="inline-block shrink-0 rounded-full bg-cover bg-center"
      style={{ width: size, height: size, backgroundImage: `url(/app/avatar-${PEOPLE[who].colour}.webp)` }}
    />
  );
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
        <span className="ml-auto flex items-center gap-2 text-[15px] text-signal">
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
  ["priya", "17:11", "I pulled the numbers from last quarter before this."],
  ["arjun", "17:11", "The gap is mostly onboarding. People sign up and never get to a second meeting."],
  ["priya", "17:12", "What did we promise Acme on the renewal?"],
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
  const others = (["priya", "arjun", "you"] as Who[]).filter((w) => w !== speaking);
  const tile = (who: Who, big: boolean) => (
    <div
      key={who}
      className="relative overflow-hidden rounded-[20px] bg-sunken"
      style={{ boxShadow: big ? "0 0 0 2px var(--signal)" : undefined }}
    >
      <Cam colour={PEOPLE[who].colour} />
      <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-canvas/70 px-3 py-1 text-[14px] text-ink">
        {big && <Icon icon={Mic01Icon} className="size-3.5" />}
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
  const round = "grid size-[46px] place-items-center rounded-full bg-overlay text-ink";
  return (
    <div className="mt-2.5 flex justify-center">
      <div className="flex items-center gap-2 rounded-full bg-raised p-[7px]">
        {[Mic01Icon, Video01Icon, ComputerScreenShareIcon, SmileIcon].map((ic, i) => (
          <span key={i} className={round}>
            <Icon icon={ic} className="size-5" />
          </span>
        ))}
        <span className="h-6 w-px bg-hairline" />
        {[Message01Icon, UserGroupIcon].map((ic, i) => (
          <span key={i} className={round}>
            <Icon icon={ic} className="size-5" />
          </span>
        ))}
        <span className={`${round} !bg-ink !text-canvas`}>
          <Icon icon={SparklesIcon} className="size-5" />
        </span>
        <span className={round}>
          <Icon icon={MoreHorizontalIcon} className="size-5" />
        </span>
        <span className="grid h-[46px] w-[62px] place-items-center rounded-full bg-[oklch(0.7_0.17_25)] text-[oklch(0.2_0.03_25)]">
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
        <Stage speaking="priya" />
        <Panel title="People" count={3} width={280}>
          <span className="mt-4 flex h-[42px] items-center justify-center gap-2 rounded-full bg-overlay text-[15px] text-ink">
            <Icon icon={UserAdd01Icon} className="size-[18px]" /> Add people
          </span>
          {([
            ["you", "Alex (you)", "Host · Design lead"],
            ["arjun", "Arjun Mehta", "Guest"],
            ["priya", "Priya Shah", "Guest · speaking"],
          ] as [Who, string, string][]).map(([who, name, role]) => (
            <div key={who} className="mt-4 flex items-center gap-3">
              <Avatar who={who} size={36} />
              <div className="flex-1">
                <p className="text-[15px] text-ink">{name}</p>
                <p className="text-[13px] text-ink-faint">{role}</p>
              </div>
              <Icon icon={Mic01Icon} className={`size-[17px] ${who === "priya" ? "text-signal" : "text-ink-soft"}`} />
            </div>
          ))}
        </Panel>
      </div>
      <Controls />
    </Frame>
  );
}

/** The room with the Teleprompter open: a heard question answered, then an offer to book. */
export function TeleprompterScreen({ active }: { active: boolean }) {
  return (
    <Frame>
      <RoomBar />
      <div className="mt-2.5 flex min-h-0 flex-1 gap-3">
        <Transcript active={false} />
        <Stage speaking="arjun" />
        <Panel title="Teleprompter" width={300}>
          <p className="mt-[18px] font-mono text-label text-ink-faint uppercase">Heard in the meeting</p>
          <div key={active ? "on" : "off"}>
            <div className="mt-2.5 rounded-[16px] bg-sunken p-3.5 shadow-sunken">
              <p className="text-[14px]/[1.4] text-ink-soft">
                <b className="font-medium text-ink">Priya</b> asked “What did we promise Acme on the renewal?”
              </p>
              <p className="mt-2 text-[18px]/[1.42] text-ink">
                {active ? <Written text="This year’s rate, fixed until March, with two extra seats." delay={500} step={70} /> : "This year’s rate, fixed until March, with two extra seats."}
              </p>
              <p className={`mt-2 text-[13px] text-ink-faint ${active ? "animate-rise" : ""}`} style={at(1400)}>
                From Acme renewal notes
              </p>
            </div>
            <div className={`mt-2.5 rounded-[16px] bg-sunken p-3.5 shadow-sunken ${active ? "animate-rise" : ""}`} style={at(2100)}>
              <p className="text-[14px] text-ink-soft">
                <b className="font-medium text-ink">Arjun</b> said “Let’s pick this up Thursday at two.”
              </p>
              <p className="mt-2 flex items-center gap-2 text-[16px] text-ink">
                <Icon icon={Calendar03Icon} className="size-[17px]" /> Book a follow-up?
              </p>
              <p className="text-[14px] text-ink-soft">Thu, 2:00 – 2:30 pm · No clashes</p>
              <div className="mt-3 flex gap-2">
                <span className="grid h-9 flex-1 place-items-center rounded-full bg-action text-[14px] font-medium text-action-foreground">
                  Book
                </span>
                <span className="grid h-9 flex-1 place-items-center rounded-full bg-overlay text-[14px] text-ink">Don’t book</span>
              </div>
            </div>
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
    ["Draft the onboarding nudge", "Arjun · Fri"],
    ["Send Acme the renewal terms", "Priya · Tomorrow"],
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
            <Cam colour="ember" />
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
    { d: 4, h: 3, len: 1, title: "1:1 with Priya", tone: "var(--action)" },
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

/** The public booking page: a day, a time picked, then booked. */
export function BookingScreen({ active }: { active: boolean }) {
  const times = ["9:00", "10:30", "11:30", "2:00", "3:30", "4:30"];
  return (
    <Frame>
      <div className="flex h-full flex-col items-center justify-center" key={active ? "on" : "off"}>
        <div className="flex w-[820px] items-center gap-5">
          <Avatar who="priya" size={64} />
          <div>
            <p className="text-[28px] font-light text-ink">Book a meeting with Priya Shah</p>
            <p className="text-[18px] text-ink-soft">Product lead</p>
          </div>
        </div>
        <div className="mt-6 grid w-[820px] grid-cols-[1.1fr_1fr] gap-4">
          <div className="rounded-[26px] bg-raised p-6">
            <p className="text-[19px] font-medium text-ink">Intro call</p>
            <p className="text-[16px] text-ink-soft">30 min · Morse meeting</p>
            <p className="mt-5 text-[16px] text-ink">September 2026</p>
            <div className="mt-2 grid grid-cols-7 gap-1.5 text-center text-[14px]">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <span key={i} className="text-ink-faint">
                  {d}
                </span>
              ))}
              <span />
              {Array.from({ length: 30 }, (_, i) => i + 1).map((n) => {
                const wd = (n % 7) as number;
                const open = n > 22 && wd !== 5 && wd !== 6;
                return (
                  <span
                    key={n}
                    className={`mx-auto grid size-8 place-items-center rounded-full tabular-nums ${
                      n === 24 ? "bg-action text-action-foreground" : open ? "bg-overlay/60 text-ink" : "text-ink-faint/50"
                    }`}
                  >
                    {n}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col rounded-[26px] bg-raised p-6">
            <p className="text-[17px] text-ink">Thursday 24 September</p>
            <p className="text-[14px] text-ink-faint">Times in India Standard Time</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {times.map((t) => (
                <span key={t} className="relative grid h-11 place-items-center overflow-hidden rounded-full bg-overlay text-[16px] text-ink tabular-nums">
                  {t}
                  {t === "2:00" && (
                    <span
                      className={`absolute inset-0 grid place-items-center bg-action font-medium text-action-foreground ${active ? "animate-rise" : ""}`}
                      style={at(1200)}
                    >
                      {t}
                    </span>
                  )}
                </span>
              ))}
            </div>
            <p
              className={`mt-auto flex items-center gap-2 pt-4 text-[16px] text-ink ${active ? "animate-rise" : "opacity-0"}`}
              style={at(2200)}
            >
              <span className="grid size-6 place-items-center rounded-full bg-action text-action-foreground">
                <Icon icon={Tick02Icon} className="size-3.5" />
              </span>
              Booked. The link is in your email.
            </p>
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
              <p className="text-[44px]/[1.1] font-light text-ink">Alex</p>
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
          ["11:00", "Weekly design review", "Priya, Arjun"],
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
        <p className="mt-3 text-[34px]/[1.15] font-light tracking-[-0.6px] text-ink">Knowledge</p>
        <p className="mt-1.5 max-w-[60ch] text-[15px]/[1.45] text-ink-soft">
          What the in-meeting teleprompter answers from. Logins and passwords belong in the Vault, which it never reads.
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
          <p className="mt-0.5 text-[14px] text-ink-faint">Type or paste anything the teleprompter should know.</p>
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
