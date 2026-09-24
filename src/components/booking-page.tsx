"use client";

import { ArrowLeft01Icon, Link01Icon } from "@hugeicons/core-free-icons";
import { booking } from "@/content/site";
import Image from "next/image";
import { useLoop } from "./features/timeline";
import { Eyebrow, H2, Heading, Icon, LEAD, SECTION, WRAP } from "./ui";

/**
 * Section 4: a booking page, drawn the way the app draws one — two near-square
 * cards, the app's own film looping on one and the form on the other
 * (booking/booking-shell.tsx). The form plays itself: a day, a time, who you
 * are, booked. Each step pushes the last one out, and what's been chosen stays
 * in the header strip as the app's crumbs do.
 */

const p = booking.page;
const WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
// September 2026 starts on a Tuesday; the last week of the month is open.
const BLANKS = 2;
const DAYS = 30;
const FREE = [23, 24, 25, 28, 29, 30];

const CARD = "rounded-[28px] bg-raised shadow-raised";
const STEP = "absolute inset-0 flex flex-col px-6 pt-5 pb-6";

export function BookingPage() {
  const root = useLoop((tl, q) => {
    const el = (s: string) => q(s)[0];
    // Targets are measured from the rendered page, so the pointer lands on them
    // whatever the card's size. Every step sits at inset-0 before the timeline
    // runs, so they all measure in the same frame.
    const stage = el("[data-stage]").getBoundingClientRect();
    const at = (sel: string, dx = 0, dy = 0) => {
      const r = el(sel).getBoundingClientRect();
      return { x: r.left - stage.left + r.width / 2 + dx, y: r.top - stage.top + r.height / 2 + dy };
    };
    const rest = { x: stage.width - 44, y: stage.height - 34 };

    tl.set(q("[data-step]"), { xPercent: (i: number) => i * 100 }, 0);
    tl.set(el("[data-cursor]"), { ...rest, opacity: 0, scale: 1 }, 0);
    tl.set(q("[data-day-on]"), { opacity: 0, scale: 0.6 }, 0);
    tl.set(q("[data-ripple]"), { opacity: 0, scale: 0.3 }, 0);
    tl.set(q("[data-time-on]"), { clipPath: "circle(0% at 50% 50%)" }, 0);
    tl.set(q("[data-crumb]"), { opacity: 0, x: -8 }, 0);
    tl.set(q("[data-typed]"), { text: "" }, 0);
    tl.set(q("[data-caret]"), { opacity: 0 }, 0);
    tl.set(el("[data-confirm-label]"), { text: p.confirm }, 0);
    tl.set(el("[data-check]"), { drawSVG: "0%" }, 0);
    tl.set(el("[data-undo]"), { opacity: 0, y: 8 }, 0);
    tl.set(el("[data-undo-left]"), { text: "9:55" }, 0);

    const move = (to: { x: number; y: number }, dur: number, when: number) => {
      const bend = 26;
      tl.to(el("[data-cursor]"), { motionPath: { path: [{ x: to.x + bend, y: to.y + bend * 0.6 }, to], curviness: 1.3 }, duration: dur, ease: "power2.inOut" }, when);
    };
    /** A small drift, so the pointer never looks frozen between steps. */
    const drift = (dx: number, dy: number, when: number) =>
      tl.to(el("[data-cursor]"), { x: `+=${dx}`, y: `+=${dy}`, duration: 0.9, ease: "sine.inOut" }, when);
    const click = (when: number) =>
      tl.to(el("[data-cursor]"), { scale: 0.84, duration: 0.09, yoyo: true, repeat: 1, ease: "power2.inOut" }, when);
    const crumb = (sel: string, when: number) =>
      tl.to(el(sel), { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" }, when);
    const step = (n: number, when: number) =>
      tl.to(q("[data-step]"), { xPercent: (i: number) => (i - n) * 100, duration: 0.55, ease: "power3.inOut" }, when);

    // 1 · a day: the pointer lands on it, it ripples, the day fills
    tl.to(el("[data-cursor]"), { opacity: 1, duration: 0.3 }, 0.4);
    move(at("[data-target=day]"), 1, 0.5);
    click(1.6);
    tl.fromTo(q("[data-ripple]"), { opacity: 0.5, scale: 0.35 }, { opacity: 0, scale: 2.2, duration: 0.6, ease: "power2.out" }, 1.64);
    tl.to(q("[data-day-on]"), { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)" }, 1.66);
    crumb("[data-crumb=day]", 2.1);
    step(1, 2.2);
    drift(6, 4, 2.4);

    // 2 · a time: chips rise, the chosen one fills out from where it was pressed
    tl.from(q("[data-time]"), { opacity: 0, y: 10, duration: 0.4, stagger: 0.03, ease: "power2.out" }, 2.5);
    move(at("[data-target=time]"), 0.8, 2.9);
    click(3.8);
    tl.to(q("[data-time-on]"), { clipPath: "circle(140% at 50% 50%)", duration: 0.55, ease: "power2.out" }, 3.84);
    crumb("[data-crumb=time]", 4.2);
    step(2, 4.4);

    // 3 · who you are
    move(at("[data-target=name]", -70), 0.6, 4.8);
    click(5.3);
    tl.to(el("[data-caret=name]"), { opacity: 1, duration: 0.1 }, 5.4);
    tl.to(el("[data-typed=name]"), { text: p.name.value, duration: 1, ease: "none" }, 5.5);
    tl.to(el("[data-caret=name]"), { opacity: 0, duration: 0.1 }, 6.5);
    move(at("[data-target=email]", -70), 0.5, 6.6);
    click(7);
    tl.to(el("[data-caret=email]"), { opacity: 1, duration: 0.1 }, 7.1);
    tl.to(el("[data-typed=email]"), { text: p.email.value, duration: 0.9, ease: "none" }, 7.15);
    tl.to(el("[data-caret=email]"), { opacity: 0, duration: 0.1 }, 8.05);

    // Confirm, held for a beat while it books
    move(at("[data-target=confirm]"), 0.7, 8.1);
    click(8.8);
    tl.to(el("[data-confirm]"), { scale: 0.96, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.inOut" }, 8.8);
    tl.to(el("[data-confirm-label]"), { text: p.booking, duration: 0.2 }, 8.95);
    step(3, 9.6);

    // 4 · booked: the check draws, then the undo arrives and counts down
    move(rest, 0.9, 9.9);
    tl.to(el("[data-check]"), { drawSVG: "100%", duration: 0.5, ease: "power2.out" }, 10);
    tl.to(el("[data-cursor]"), { opacity: 0, duration: 0.3 }, 10.6);
    tl.to(el("[data-undo]"), { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 10.9);
    const clock = { t: 595 };
    tl.to(
      clock,
      {
        t: 583,
        duration: 12,
        ease: "none",
        onUpdate: () => {
          const left = el("[data-undo-left]");
          if (left) left.textContent = `${Math.floor(clock.t / 60)}:${String(Math.floor(clock.t % 60)).padStart(2, "0")}`;
        },
      },
      11,
    );

    // and round again
    tl.to(q("[data-card]"), { opacity: 0, duration: 0.5, ease: "power2.in" }, 21);
    tl.set(q("[data-card]"), { opacity: 1 }, 22);
  }, { rest: 0.5 });

  return (
    <section id="booking" className={`${WRAP} ${SECTION} scroll-mt-24 text-center`}>
      <Eyebrow className="mb-5">{booking.eyebrow}</Eyebrow>
      <Heading lead={booking.title} muted={booking.titleMuted} className={H2} />
      <p className={`${LEAD} mx-auto mt-6 max-w-[720px]`}>{booking.body}</p>
      {/* What "one link" actually looks like — the reader sees the shape of
          their own. Mono, because it's an exact string (contract #3), and not
          a capsule: capsules are for things you press, and this isn't one. */}
      <p className="mt-7 flex items-center justify-center gap-2 font-mono text-[15px] tracking-[0.01em] text-ink-faint">
        <Icon icon={Link01Icon} className="size-4" />
        {booking.link}
      </p>

      {/* The booking page itself */}
      <div ref={root} className="mx-auto mt-14 grid w-full max-w-[1000px] items-start gap-4 text-left lg:mt-16 lg:grid-cols-2">
        {/* The picture on the booking page, framed inside the card as the app
            frames it. It drifts, which is the only motion the artwork gets. */}
        <div data-card className={`${CARD} h-40 p-2 lg:aspect-[9/10] lg:h-auto`}>
          <div className="relative isolate size-full overflow-hidden rounded-[20px] bg-[#05070a]">
            <div className="film-drift absolute inset-0">
              <Image
                src="/art/knowledge.webp"
                alt=""
                width={1600}
                height={1067}
                sizes="(min-width: 1024px) 500px, 100vw"
                className="size-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* The form, one step at a time */}
        <div data-card className={`${CARD} relative isolate flex min-w-0 flex-col overflow-hidden lg:aspect-[9/10]`}>
          <div className="flex items-center gap-2 border-b border-hairline px-6 py-4">
            <Icon icon={ArrowLeft01Icon} className="size-5 shrink-0 text-ink-faint" />
            <p className="shrink-0 text-[19px] font-medium text-ink">{p.type}</p>
            {/* What's been chosen so far, as the app keeps it in the strip */}
            <p data-crumb="day" className="truncate text-[16px] text-ink-soft">· Wed 23</p>
            <p data-crumb="time" className="shrink-0 text-[16px] text-ink-soft tabular-nums">· {p.pick}</p>
            <p className="ml-auto shrink-0 text-[16px] text-ink-soft tabular-nums">{p.minutes}</p>
          </div>

          <div data-stage className="relative min-h-[420px] flex-1">
            {/* 1 · the month */}
            <div data-step className={STEP}>
              <div className="flex items-center justify-between px-2 text-[17px] text-ink">
                <Icon icon={ArrowLeft01Icon} className="size-4 text-ink-faint" />
                <span>{p.month}</span>
                <Icon icon={ArrowLeft01Icon} className="size-4 rotate-180 text-ink-faint" />
              </div>
              <div className="mt-4 grid grid-cols-7 gap-y-1 text-center text-[14px]">
                {WEEK.map((d) => (
                  <span key={d} className="text-ink-faint">{d}</span>
                ))}
                {Array.from({ length: BLANKS }, (_, i) => <span key={`b${i}`} />)}
                {Array.from({ length: DAYS }, (_, i) => i + 1).map((n) => {
                  const free = FREE.includes(n);
                  return (
                    <span key={n} className="relative mx-auto grid size-9 place-items-center">
                      {n === p.day && (
                        <>
                          <span data-ripple className="absolute inset-0 rounded-full bg-ink/25" />
                          <span data-day-on data-target="day" className="absolute inset-0 rounded-full bg-overlay" />
                        </>
                      )}
                      <span className={`relative tabular-nums ${free ? "text-ink" : "text-ink-faint/45"}`}>{n}</span>
                      {free && <span className="absolute bottom-0.5 size-1 rounded-full bg-action" />}
                    </span>
                  );
                })}
              </div>
              <p className="mt-auto flex items-center gap-2 px-2 text-[15px] text-ink-soft">
                <span className="size-1.5 rounded-full bg-action" />
                {p.free}
              </p>
            </div>

            {/* 2 · the time */}
            <div data-step className={STEP}>
              <p className="text-[17px] text-ink">{p.dayLabel}</p>
              <p className="text-[14px] text-ink-faint">{p.zone}</p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {p.times.map((t) => (
                  <span key={t} data-time className="relative grid h-11 place-items-center overflow-hidden rounded-full bg-sunken text-[16px] text-ink shadow-sunken tabular-nums">
                    {t}
                    {t === p.pick && (
                      <span data-time-on data-target="time" className="absolute inset-0 grid place-items-center rounded-full bg-action font-medium text-action-foreground">
                        {t}
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* 3 · who you are */}
            <div data-step className={STEP}>
              {([["name", p.name.label], ["email", p.email.label]] as const).map(([k, label]) => (
                <label key={k} className="mt-2 flex flex-col gap-1.5 first:mt-0">
                  <span className="px-1 text-[16px] font-medium text-ink-soft">{label}</span>
                  <span data-target={k} className="flex h-12 items-center rounded-full bg-sunken px-5 text-[17px] text-ink shadow-sunken">
                    <span data-typed={k} />
                    <span data-caret={k} className="ml-px inline-block align-middle opacity-0">
                      <span className="block h-[19px] w-px animate-blink bg-ink" />
                    </span>
                  </span>
                </label>
              ))}
              <p className="mt-1.5 px-1 text-[15px]/[1.4] text-ink-faint">{p.email.hint}</p>
              <div className="mt-auto flex justify-end">
                <span data-confirm data-target="confirm" className="inline-flex h-12 items-center rounded-full bg-action px-7 text-[17px] font-medium text-action-foreground">
                  <span data-confirm-label>{p.confirm}</span>
                </span>
              </div>
            </div>

            {/* 4 · booked */}
            <div data-step className={STEP}>
              <div className="flex items-start gap-3">
                <svg viewBox="0 0 24 24" className="mt-1 size-6 shrink-0" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="11" className="fill-action/15" />
                  <path data-check d="M7 12.5 L 10.5 16 L 17 8.5" stroke="var(--action)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h4 className="text-[24px]/[1.25] font-light tracking-[-0.3px] text-ink">{p.done.title}</h4>
              </div>
              <p className="mt-3 text-[18px]/[1.5] text-ink">{p.done.what}</p>
              <p className="mt-1 text-[15px] text-ink-soft">{p.zone.replace("Times shown in ", "")}</p>
              <p className="mt-5 text-[17px]/[1.5] text-ink-soft">
                {p.done.sent} <span className="text-ink">{p.email.value}</span>
                {p.done.carries}
              </p>
              <div data-undo className="mt-auto border-t border-hairline pt-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-[16px] text-ink-soft">
                    Booked the wrong time? <span data-undo-left className="tabular-nums">9:55</span> {p.done.undo}
                  </p>
                  <span className="inline-flex h-11 items-center rounded-full bg-overlay px-5 text-[16px] text-ink">{p.done.undoLabel}</span>
                </div>
              </div>
            </div>

            {/* The visitor's pointer */}
            <svg data-cursor className="pointer-events-none absolute top-0 left-0 z-10 size-5 overflow-visible" viewBox="0 0 16 22" aria-hidden="true">
              <path d="M0 0 L 0 17 L 4.5 13 L 8 20.5 L 11 19 L 7.5 12 L 13.5 11.5 Z" fill="var(--ink)" stroke="var(--float)" strokeWidth={1.2} strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <ul className="mx-auto mt-12 flex max-w-[1000px] flex-col items-center gap-3 text-[17px] text-ink-soft sm:flex-row sm:justify-between sm:gap-8">
        {booking.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </section>
  );
}
