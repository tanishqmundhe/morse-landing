"use client";

import { Fragment, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { Calendar03Icon, ClosedCaptionIcon, SparklesIcon } from "@hugeicons/core-free-icons";
import { showcase } from "@/content/site";
import { Icon } from "../ui";
import { Written } from "../live-card";
import { BookingScreen, CalendarScreen, NotesScreen, RoomScreen, SCREEN_H, SCREEN_W, TeleprompterScreen } from "./screens";

/**
 * Section 2, in two movements.
 *
 * 1. Arriving: the sentence lights up word by word as the section rises, and
 *    each chip inside it plays its bit of the product when the light reaches it.
 * 2. Pinned: the section holds still and scrolling moves the row of screens
 *    sideways. The sentence gives way to words about the screen in the middle,
 *    which change as the next one arrives. The screen in the middle plays.
 *
 * Scroll drives everything through CSS variables written in one animation
 * frame, so the page never re-renders while it scrolls; React only hears when
 * the screen in the middle changes.
 */

const SCREENS = { room: RoomScreen, teleprompter: TeleprompterScreen, notes: NotesScreen, calendar: CalendarScreen, booking: BookingScreen };
const slides = showcase.slides;
const HOLD = 0.3; // of a screen height: the sentence stays, fully lit, before the row moves

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
    <div ref={box} className="relative w-full overflow-hidden rounded-[22px] shadow-float" style={{ aspectRatio: `${SCREEN_W} / ${SCREEN_H}` }}>
      <div className="absolute top-0 left-0 origin-top-left" style={{ transform: `scale(${scale})`, opacity: scale ? 1 : 0 }}>
        {children}
      </div>
    </div>
  );
}

// ── The sentence ──────────────────────────────────────────────────────────

type Unit = { kind: "word"; text: string } | { kind: "chip"; chip: string; label: string };
const UNITS: Unit[] = showcase.statement.flatMap((s): Unit[] =>
  "text" in s ? s.text.split(" ").filter(Boolean).map((text) => ({ kind: "word", text })) : [{ kind: "chip", chip: s.chip, label: s.label }],
);

// How lit a unit is, 0 to 1, from the section's --lit and the unit's --i.
const LIT = "clamp(0, var(--lit, 99) - var(--i), 1)";

function Chip({ chip, label, i }: { chip: string; label: string; i: number }) {
  const icon =
    chip === "transcript" ? ClosedCaptionIcon : chip === "teleprompter" ? SparklesIcon : chip === "booking" ? Calendar03Icon : null;
  return (
    <span
      className="mx-1 inline-flex items-center gap-[0.45em] rounded-full bg-raised pr-[0.9em] pl-[0.3em] align-middle leading-none shadow-raised"
      style={{
        ["--i" as string]: i,
        opacity: `calc(0.25 + 0.75 * ${LIT})`,
        transform: `translateY(-0.08em) scale(calc(0.92 + 0.08 * ${LIT}))`,
        fontSize: "0.42em",
        height: "2.3em",
      }}
    >
      {chip === "call" ? (
        <span className="flex">
          {["ember", "lagoon", "sage"].map((c, k) => (
            <span
              key={c}
              className="inline-block size-[1.85em] rounded-full bg-cover bg-center ring-2 ring-raised"
              style={{
                backgroundImage: `url(/app/avatar-${c}.webp)`,
                marginLeft: k ? "-0.55em" : 0,
                transform: `translateX(calc((1 - ${LIT}) * ${-0.6 * k}em))`,
              }}
            />
          ))}
        </span>
      ) : (
        <span
          className="grid size-[1.85em] place-items-center rounded-full"
          style={{
            background:
              chip === "booking"
                ? `color-mix(in oklch, var(--action) calc(${LIT} * 100%), var(--overlay))`
                : "var(--overlay)",
            color: chip === "booking" ? `color-mix(in oklch, var(--action-foreground) calc(${LIT} * 100%), var(--ink))` : "var(--ink)",
          }}
        >
          {icon && <Icon icon={icon} className="size-[1em]" />}
        </span>
      )}
      <span className="text-ink-soft">{label}</span>
    </span>
  );
}

function Statement() {
  return (
    <p className="text-[28px]/[1.32] font-light tracking-[-0.02em] text-ink sm:text-[40px]/[1.3] xl:text-[48px]/[1.28]">
      {UNITS.map((u, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          {u.kind === "word" ? (
            <span style={{ ["--i" as string]: i, opacity: `calc(0.16 + 0.84 * ${LIT})` }} className="transition-none">
              {u.text}
            </span>
          ) : (
            <Chip chip={u.chip} label={u.label} i={i} />
          )}
        </Fragment>
      ))}
    </p>
  );
}

// ── The section ──────────────────────────────────────────────────────────

export function Showcase() {
  const still = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [moving, setMoving] = useState(false);
  const [height, setHeight] = useState<number | null>(null);
  const geometry = useRef({ travel: 0, hold: 0 });

  // The section is as tall as the sideways travel, plus the hold, plus one screen.
  useLayoutEffect(() => {
    if (still) return;
    const measure = () => {
      const r = row.current;
      if (!r) return;
      const vh = window.innerHeight;
      const travel = Math.max(0, r.scrollWidth - r.clientWidth);
      geometry.current = { travel, hold: vh * HOLD };
      setHeight(vh + vh * HOLD + travel);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [still]);

  useEffect(() => {
    if (still) return;
    let frame = 0;
    let lastActive = -1;
    let lastMoving = false;
    const update = () => {
      frame = 0;
      const s = section.current;
      const r = row.current;
      if (!s || !r) return;
      const vh = window.innerHeight;
      const top = s.getBoundingClientRect().top;
      const { travel, hold } = geometry.current;

      // Arriving: lit from when the section's top is 90% down until it pins.
      const arrive = Math.min(1, Math.max(0, (vh * 0.9 - top) / (vh * 0.9)));
      s.style.setProperty("--lit", String(arrive * (UNITS.length + 1.5)));

      // Pinned: past the hold, the row travels.
      const q = travel ? Math.min(1, Math.max(0, (-top - hold) / travel)) : 0;
      r.scrollLeft = q * travel;
      if (bar.current) bar.current.style.transform = `scaleX(${q})`;

      // The screen nearest the middle is whole; the others step back.
      const mid = window.innerWidth / 2;
      let best = 0;
      let bestD = Infinity;
      cards.current.forEach((c, i) => {
        if (!c) return;
        const b = c.getBoundingClientRect();
        const d = (b.left + b.width / 2 - mid) / b.width;
        const a = Math.min(1, Math.abs(d));
        c.style.transform = `scale(${1 - a * 0.07})`;
        c.style.opacity = String(1 - a * 0.5);
        if (Math.abs(d) < bestD) {
          bestD = Math.abs(d);
          best = i;
        }
      });
      const isMoving = -top > hold * 0.6;
      if (best !== lastActive) setActive((lastActive = best));
      if (isMoving !== lastMoving) setMoving((lastMoving = isMoving));
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

  /** Scroll the page to where screen `i` sits in the middle. */
  function goTo(i: number) {
    const s = section.current;
    if (!s) return;
    const { travel, hold } = geometry.current;
    const y = s.getBoundingClientRect().top + window.scrollY + hold + (travel * i) / (slides.length - 1);
    window.scrollTo({ top: y + 1, behavior: "smooth" });
  }

  const slide = slides[active];

  return (
    <section
      id="product"
      ref={section}
      className="relative scroll-mt-24"
      style={still ? undefined : { height: height ?? "300vh" }}
      aria-label="The product"
    >
      <div className={still ? "py-24" : "sticky top-0 flex h-svh flex-col justify-center gap-10 overflow-hidden pt-24 pb-6 sm:justify-start sm:gap-0 sm:pt-28"}>
        {/* The words: the sentence, then the screen in the middle. Stacked in one cell so the row never jumps. */}
        <div className="mx-auto grid w-full max-w-[1200px] px-5 sm:px-8">
          <div
            className={`col-start-1 row-start-1 transition-[opacity,transform,filter] duration-500 ease-out ${
              moving ? "pointer-events-none -translate-y-4 opacity-0 blur-sm" : ""
            }`}
          >
            <Statement />
          </div>
          {!still && (
            <div
              className={`col-start-1 row-start-1 self-end transition-opacity duration-500 ${moving ? "opacity-100" : "pointer-events-none opacity-0"}`}
              aria-live="polite"
            >
              <p className="font-mono text-label text-ink-faint tabular-nums">
                {String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </p>
              <h2 key={slide.id} className="mt-3 text-[32px]/[1.1] font-light tracking-[-0.025em] text-ink sm:text-[48px]/[1.06]">
                <Written text={slide.title} step={45} />
              </h2>
              <p key={`${slide.id}-body`} className="mt-3 max-w-[560px] animate-enter text-[17px]/[1.55] text-ink-soft sm:text-[19px]/[1.55]" style={{ animationDelay: "180ms" }}>
                {slide.body}
              </p>
            </div>
          )}
        </div>

        {/* The row of screens. Its scroll position is set by the page's; it isn't scrolled by hand. */}
        <div
          ref={row}
          className={
            still
              ? "mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:px-8"
              : "flex gap-6 overflow-hidden sm:mt-auto [--w:min(84vw,calc((100svh_-_440px)*1.6),980px)] [padding-inline:calc(50vw_-_var(--w)/2)]"
          }
        >
          {slides.map((s, i) => {
            const Screen = SCREENS[s.id as keyof typeof SCREENS];
            return (
              <div
                key={s.id}
                ref={(el) => {
                  cards.current[i] = el;
                }}
                className={still ? "w-[84vw] max-w-[900px] shrink-0 snap-center" : "w-[var(--w)] shrink-0 will-change-transform"}
                aria-hidden={!still && i !== active}
              >
                <Fit>
                  <Screen active={!still && i === active} />
                </Fit>
                {still && (
                  <div className="mt-5">
                    <h3 className="text-[27px] font-light text-ink">{s.title}</h3>
                    <p className="mt-1 text-[17px] text-ink-soft">{s.body}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Where you are in the row; each name takes you to its screen. */}
        {!still && (
          <div className="mx-auto flex w-full max-w-[1200px] items-center gap-5 px-5 sm:mt-5 sm:px-8">
            <span className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-overlay">
              <span ref={bar} className="absolute inset-0 origin-left rounded-full bg-ink" style={{ transform: "scaleX(0)" }} />
            </span>
            <div className="hidden gap-1 sm:flex">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => goTo(i)}
                  aria-current={i === active ? "true" : undefined}
                  className={`rounded-full px-3 py-1.5 text-[15px] transition-colors ${
                    i === active ? "bg-overlay text-ink" : "text-ink-faint hover:text-ink-soft"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
