"use client";

import { Fragment, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  Calendar03Icon,
  CheckListIcon,
  ClosedCaptionIcon,
  Globe02Icon,
  CloudUploadIcon,
  GoogleIcon,
  Note01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";
import { showcase, type Chip as ChipKind } from "@/content/site";
import { Icon } from "../ui";
import {
  BookingScreen,
  CalendarScreen,
  HomeScreen,
  KnowledgeScreen,
  NotesScreen,
  RoomScreen,
  SCREEN_H,
  SCREEN_W,
  TeleprompterScreen,
} from "./screens";

/**
 * Section 2, pinned while three things happen in turn:
 *
 * 1. The sentence sits in the middle of the screen and lights up word by word.
 *    Each chip in it plays its part when the light reaches it.
 * 2. Nearly lit, it rises to the top and the row of screens comes up under it.
 * 3. Scrolling moves the row sideways. Whatever is in the middle plays, and the
 *    line above becomes that screen's own line, in the same words-and-chips voice.
 *
 * The row runs Home, Room, Booking, Teleprompter, Notes, Calendar, Knowledge.
 * It opens on Room with Home fading off to the left, and every screen from
 * Room to Knowledge takes the middle before the section lets go. The row has
 * half a screen of padding after Knowledge so it can be centred.
 *
 * Scroll writes positions straight to the DOM in one animation frame; React
 * only hears when the screen in the middle changes.
 */

const slides = showcase.slides;
const FIRST = 1;
const LAST = slides.length - 1;

// Phases, in screen heights of scroll.
const PRE = 0.55; // lighting starts this far before the section pins
const LIGHT = 0.75; // pinned, lighting
const RISE = 0.55; // the sentence rises, the row comes up
const SETTLE = 0.45; // the first screen sits in the middle before the row moves
const END = 0.9; // held on the last screen, centred and playing, before letting go
const TRAVEL = 1.25; // scroll per screen, as a multiple of the distance it moves
// Of each screen's share of the travel, the part spent still in the middle.
const DWELL = 0.35;

const REDUCE = "(prefers-reduced-motion: reduce)";
function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const m = matchMedia(REDUCE);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => matchMedia(REDUCE).matches,
    () => false,
  );
}

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

function screenFor(id: string, active: boolean) {
  switch (id) {
    case "home":
      return <HomeScreen />;
    case "room":
      return <RoomScreen active={active} />;
    case "booking":
      return <BookingScreen active={active} />;
    case "teleprompter":
      return <TeleprompterScreen active={active} />;
    case "notes":
      return <NotesScreen active={active} />;
    case "calendar":
      return <CalendarScreen active={active} />;
    default:
      return <KnowledgeScreen active={active} />;
  }
}

/** Lays out a 1120 × 700 screen at whatever width its box has. */
function Fit({ children }: { children: React.ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / SCREEN_W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={box} className="relative w-full overflow-hidden rounded-[24px] shadow-float" style={{ aspectRatio: `${SCREEN_W} / ${SCREEN_H}` }}>
      <div className="absolute top-0 left-0 origin-top-left" style={{ transform: `scale(${scale})`, opacity: scale ? 1 : 0 }}>
        {children}
      </div>
    </div>
  );
}

// ── Lines: words and chips ─────────────────────────────────────────────────

type Piece = { text: string } | { chip: ChipKind; label: string };
type Unit = { word: string } | { chip: ChipKind; label: string };
const units = (pieces: Piece[]): Unit[] =>
  pieces.flatMap((p): Unit[] => ("text" in p ? p.text.split(" ").filter(Boolean).map((word) => ({ word })) : [p]));
const STATEMENT_UNITS = units(showcase.statement).length;

// How lit a unit is, 0 to 1, from the section's --lit and the unit's --i.
// Lines other than the sentence set --lit high, so they are simply lit.
const LIT = "clamp(0, var(--lit, 99) - var(--i, 0), 1)";

const ICONS: Partial<Record<ChipKind, IconSvgElement>> = {
  transcript: ClosedCaptionIcon,
  teleprompter: SparklesIcon,
  booking: Calendar03Icon,
  calendar: Calendar03Icon,
  globe: Globe02Icon,
  note: Note01Icon,
  done: CheckListIcon,
  google: GoogleIcon,
  upload: CloudUploadIcon,
};

function Chip({ chip, label }: { chip: ChipKind; label: string }) {
  const icon = ICONS[chip];
  // Sage is for what's been done for you; coral for the follow-up on the calendar.
  const tone = chip === "booking" || chip === "done" ? "action" : chip === "calendar" ? "signal" : null;
  return (
    <span
      className="mx-[0.12em] inline-flex h-[2.3em] items-center gap-[0.45em] rounded-full bg-raised pr-[0.95em] pl-[0.3em] align-middle text-[0.42em] leading-none shadow-raised"
      style={{
        opacity: `calc(0.25 + 0.75 * ${LIT})`,
        transform: `translateY(-0.12em) scale(calc(0.92 + 0.08 * ${LIT}))`,
      }}
    >
      {chip === "call" || chip === "question" ? (
        <span className="flex">
          {(chip === "call" ? ["ember", "lagoon", "sage"] : ["ember"]).map((c, k) => (
            <span
              key={c}
              className="inline-block size-[1.85em] rounded-full bg-cover bg-center ring-2 ring-raised"
              style={{
                backgroundImage: `url(/app/avatar-${c}.svg)`,
                marginLeft: k ? "-0.55em" : 0,
                transform: `translateX(calc((1 - ${LIT}) * ${-0.6 * k}em))`,
              }}
            />
          ))}
        </span>
      ) : (
        <span
          className="grid size-[1.85em] place-items-center rounded-full"
          style={
            tone
              ? {
                  background: `color-mix(in oklch, var(--${tone}) calc(${LIT} * 100%), var(--overlay))`,
                  color: `color-mix(in oklch, var(--${tone === "action" ? "action-foreground" : "canvas"}) calc(${LIT} * 100%), var(--ink))`,
                }
              : { background: "var(--overlay)", color: "var(--ink)" }
          }
        >
          {icon && <Icon icon={icon} className="size-[1em]" />}
        </span>
      )}
      <span className="text-ink-soft">{label}</span>
    </span>
  );
}

const LINE =
  "text-left text-[28px]/[1.4] font-light tracking-[-0.02em] text-balance text-ink sm:text-[40px]/[1.34] xl:text-[48px]/[1.32] 2xl:text-[56px]/[1.3]";

/**
 * Lines turn over letter by letter, like a row of small boxes rolling on their
 * horizontal axis (after Fancy Components' Letter 3D Swap). A line's letters
 * rest face-on while it is showing, rolled up and away (+90°) once the page has
 * moved past it, and rolled under (−90°) while it is still to come. Moving
 * forward, the old line rolls up and the new one rolls up into place; moving
 * back, both roll down. The wave runs from the first letter to the last, with
 * a slight spring. A chip turns over as one piece.
 */
const TURN = "transform 620ms cubic-bezier(0.34, 1.3, 0.64, 1), opacity 260ms ease-out";

function Turning({ pieces, rot, lit = false }: { pieces: Piece[]; rot: number; lit?: boolean }) {
  const list = units(pieces);
  const letters = list.reduce((n, u) => n + ("word" in u ? u.word.length : 1), 0);
  const step = Math.min(14, 650 / letters);
  let k = 0;
  const face = (content: React.ReactNode, key: number) => {
    const i = k++;
    return (
      <span
        key={key}
        className="inline-block [backface-visibility:hidden] will-change-transform"
        style={{
          transform: `perspective(700px) translateZ(-0.5em) rotateX(${rot}deg) translateZ(0.5em)`,
          opacity: rot ? 0 : 1,
          transition: TURN,
          transitionDelay: `${i * step}ms`,
        }}
      >
        {content}
      </span>
    );
  };
  return (
    <p className={LINE} style={lit ? undefined : { ["--lit" as string]: 99 }}>
      {list.map((u, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <span className="inline-block whitespace-nowrap" style={{ ["--i" as string]: i }}>
            {"word" in u ? (
              // The sentence's words also follow the scroll's light.
              <span style={lit ? { opacity: `calc(0.16 + 0.84 * ${LIT})` } : undefined}>{[...u.word].map((ch, j) => face(ch, j))}</span>
            ) : (
              face(<Chip chip={u.chip} label={u.label} />, 0)
            )}
          </span>
        </Fragment>
      ))}
    </p>
  );
}

// ── The section ────────────────────────────────────────────────────────────

export function Showcase() {
  const still = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const words = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const rowWrap = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(FIRST);
  const [rising, setRising] = useState(false);
  const [risen, setRisen] = useState(false);
  const [height, setHeight] = useState<number | null>(null);
  const geo = useRef({ vh: 0, travel: 0, from: 0, textTop: 0, center: 0 });

  // Sizes: the words take their tallest line; the row fills what's under them.
  useLayoutEffect(() => {
    if (still) return;
    const measure = () => {
      const s = section.current;
      const w = words.current;
      const r = row.current;
      const wrap = rowWrap.current;
      if (!s || !w || !r || !wrap) return;
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const textH = w.offsetHeight;
      const textTop = Math.max(112, vh * 0.13);
      const rowTop = textTop + textH + Math.max(32, vh * 0.04);
      const room = vh - rowTop - Math.max(40, vh * 0.07);
      const width = Math.round(Math.min(vw * (vw < 640 ? 0.84 : 0.6), (room * SCREEN_W) / SCREEN_H, 1320));
      s.style.setProperty("--w", `${width}px`);
      wrap.style.top = `${rowTop}px`;
      // The row is the cards' offset parent, so these don't depend on where it's scrolled.
      const centreOf = (i: number) => {
        const c = cards.current[i];
        return c ? c.offsetLeft + c.offsetWidth / 2 - r.clientWidth / 2 : 0;
      };
      const from = centreOf(FIRST);
      const travel = centreOf(LAST) - from;
      geo.current = { vh, travel, from, textTop, center: (vh - textH) / 2 };
      setHeight(vh * (1 + LIGHT + RISE + SETTLE + END) + travel * TRAVEL);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (words.current) ro.observe(words.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [still]);

  useEffect(() => {
    if (still) return;
    let frame = 0;
    let lastActive = -1;
    let lastRising: boolean | null = null;
    let lastRisen: boolean | null = null;
    const update = () => {
      frame = 0;
      const s = section.current;
      const w = words.current;
      const r = row.current;
      const wrap = rowWrap.current;
      if (!s || !w || !r || !wrap) return;
      const { vh, travel, from, textTop, center } = geo.current;
      const y = -s.getBoundingClientRect().top;

      // 1. Lighting: from before the pin to a little before the rise.
      const lit = clamp((y + PRE * vh) / ((PRE + LIGHT * 0.9) * vh));
      s.style.setProperty("--lit", String(lit * (STATEMENT_UNITS + 1.5)));

      // 2. Rising: words from the middle to the top; the row up from below.
      const m = ease(clamp((y - LIGHT * vh) / (RISE * vh)));
      w.style.transform = `translateY(${center + (textTop - center) * m}px)`;
      wrap.style.opacity = String(m);
      wrap.style.transform = `translateY(${(1 - m) * vh * 0.12}px)`;

      // 3. Travelling: the row moves under the middle, resting on each screen.
      const q = travel ? clamp((y - (LIGHT + RISE + SETTLE) * vh) / (travel * TRAVEL)) : 0;
      const steps = LAST - FIRST;
      const at = Math.min(q * steps, steps - 1e-6);
      const k = Math.floor(at);
      const f = ease(clamp((at - k - DWELL / 2) / (1 - DWELL)));
      r.scrollLeft = from + ((q >= 1 ? steps : k + f) / steps) * travel;

      // Every screen steps back and fades by its distance from the middle.
      const mid = window.innerWidth / 2;
      let best = FIRST;
      let bestD = Infinity;
      cards.current.forEach((c, i) => {
        if (!c) return;
        const b = c.getBoundingClientRect();
        const d = (b.left + b.width / 2 - mid) / b.width;
        const a = Math.min(1, Math.abs(d));
        c.style.transform = `scale(${1 - a * 0.12})`;
        c.style.opacity = String(1 - a * 0.55);
        if (i >= FIRST && i <= LAST && Math.abs(d) < bestD) {
          bestD = Math.abs(d);
          best = i;
        }
      });
      if (best !== lastActive) setActive((lastActive = best));
      const isRising = m > 0.02;
      if (isRising !== lastRising) setRising((lastRising = isRising));
      const isRisen = m > 0.98;
      if (isRisen !== lastRisen) setRisen((lastRisen = isRisen));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [still, height]);

  // The sentence stands for the room; every other screen has its own line.
  const showing = risen ? active : FIRST;
  // Past lines rest rolled up, lines to come rolled under.
  const turn = (i: number) => (i < showing ? 90 : i > showing ? -90 : 0);

  if (still) {
    return (
      <section id="product" className="scroll-mt-24 py-32 lg:py-44" aria-label="The product">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <Turning pieces={showcase.statement} rot={0} lit />
        </div>
        <div className="mt-16 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:px-8">
          {slides.slice(FIRST, LAST + 1).map((s) => (
            <div key={s.id} className="w-[84vw] max-w-[900px] shrink-0 snap-center">
              <Fit>{screenFor(s.id, false)}</Fit>
              {Array.isArray(s.line) && (
                <div className="mt-6 [&_p]:!text-left [&_p]:!text-[22px]">
                  <Turning pieces={s.line} rot={0} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="product" ref={section} className="relative scroll-mt-24" style={{ height: height ?? "400vh" }} aria-label="The product">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* The words: every line stacked in one cell, so the tallest sets the height. */}
        <div ref={words} className="absolute inset-x-0 top-0 will-change-transform">
          <div className="mx-auto grid max-w-[1240px] px-5 sm:px-10 2xl:max-w-[1560px]">
            <div className="col-start-1 row-start-1 self-start" aria-hidden={showing !== FIRST}>
              <Turning pieces={showcase.statement} rot={turn(FIRST)} lit />
            </div>
            {slides.map(
              (s, i) =>
                Array.isArray(s.line) && (
                  <div key={s.id} className="col-start-1 row-start-1 self-start" aria-hidden={showing !== i}>
                    <Turning pieces={s.line} rot={turn(i)} />
                  </div>
                ),
            )}
          </div>
        </div>

        {/* The row. The page's scroll sets its position; it isn't scrolled by hand. */}
        <div ref={rowWrap} className="absolute inset-x-0 opacity-0 will-change-transform" style={{ top: "60%" }} aria-hidden={!rising}>
          <div
            ref={row}
            style={{ paddingRight: "calc(50vw - var(--w) / 2)" }}
            className="relative flex items-center gap-[clamp(20px,2.4vw,44px)] overflow-hidden py-6 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
          >
            {slides.map((s, i) => (
              <div
                key={s.id}
                ref={(el) => {
                  cards.current[i] = el;
                }}
                className="w-[var(--w)] shrink-0 will-change-transform"
                aria-hidden={i !== active}
              >
                <Fit>{screenFor(s.id, risen && i === active)}</Fit>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
