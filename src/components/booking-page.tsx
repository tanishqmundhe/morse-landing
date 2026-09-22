"use client";

import { ArrowLeft01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { booking } from "@/content/site";
import { Film } from "./film";
import { Logo } from "./logo";
import { useLoop } from "./features/timeline";
import { H2, Heading, Icon, WRAP } from "./ui";

/**
 * Section 4: a booking page, drawn the way the app draws one — the host above,
 * then two near-square cards, a looping film on one and the form on the other
 * (booking-shell.tsx). The form plays its own steps: a day, a time, who you
 * are, and booked, each step pushing the last one out as the app does.
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
    // Targets are measured from the page itself, so the pointer lands on them
    // whatever the card's size. Every step sits at inset-0 before the timeline
    // runs, so each one measures in the same frame.
    const stage = el("[data-stage]").getBoundingClientRect();
    const at = (sel: string, dx = 0, dy = 0) => {
      const r = el(sel).getBoundingClientRect();
      return { x: r.left - stage.left + r.width / 2 + dx, y: r.top - stage.top + r.height / 2 + dy };
    };
    // Everything back to the first step.
    tl.set(q("[data-step]"), { xPercent: (i: number) => i * 100 }, 0);
    tl.set(el("[data-cursor]"), { x: stage.width - 40, y: stage.height - 30, opacity: 0 }, 0);
    tl.set(q("[data-day-on]"), { opacity: 0, scale: 0.6 }, 0);
    tl.set(q("[data-time-on]"), { opacity: 0 }, 0);
    tl.set(q("[data-typed]"), { text: "" }, 0);
    tl.set(q("[data-caret]"), { opacity: 0 }, 0);
    tl.set(el("[data-confirm]"), { scale: 1 }, 0);
    tl.set(el("[data-undo-left]"), { text: "9:55" }, 0);

    const move = (to: { x: number; y: number }, dur: number, when: number) => {
      const bend = 26;
      tl.to(el("[data-cursor]"), { motionPath: { path: [{ x: to.x + bend, y: to.y + bend * 0.6 }, to], curviness: 1.3 }, duration: dur, ease: "power2.inOut" }, when);
    };
    const press = (target: string, when: number) => {
      tl.to(el("[data-cursor]"), { scale: 0.86, duration: 0.09, yoyo: true, repeat: 1, ease: "power2.inOut" }, when);
      if (target) tl.to(q(target), { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)" }, when + 0.08);
    };
    const step = (n: number, when: number) =>
      tl.to(q("[data-step]"), { xPercent: (i: number) => (i - n) * 100, duration: 0.55, ease: "power3.inOut" }, when);

    // 1 · a day
    tl.to(el("[data-cursor]"), { opacity: 1, duration: 0.3 }, 0.4);
    move(at("[data-target=day]"), 1, 0.5);
    press("[data-day-on]", 1.6);
    step(1, 2.2);

    // 2 · a time
    tl.from(q("[data-time]"), { opacity: 0, y: 10, duration: 0.4, stagger: 0.03, ease: "power2.out" }, 2.5);
    move(at("[data-target=time]"), 0.8, 2.9);
    press("[data-time-on]", 3.8);
    step(2, 4.3);

    // 3 · who you are
    move(at("[data-target=name]", -60), 0.6, 4.7);
    tl.to(el("[data-caret=name]"), { opacity: 1, duration: 0.1 }, 5.3);
    tl.to(el("[data-typed=name]"), { text: p.name.value, duration: 1, ease: "none" }, 5.4);
    tl.to(el("[data-caret=name]"), { opacity: 0, duration: 0.1 }, 6.4);
    move(at("[data-target=email]", -60), 0.5, 6.5);
    tl.to(el("[data-caret=email]"), { opacity: 1, duration: 0.1 }, 7);
    tl.to(el("[data-typed=email]"), { text: p.email.value, duration: 0.9, ease: "none" }, 7.05);
    tl.to(el("[data-caret=email]"), { opacity: 0, duration: 0.1 }, 7.95);
    move(at("[data-target=confirm]"), 0.7, 8);
    tl.to(el("[data-confirm]"), { scale: 0.96, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.inOut" }, 8.7);
    press("", 8.7);
    step(3, 9);

    // 4 · booked, with the undo counting down
    move({ x: stage.width - 30, y: stage.height - 20 }, 0.9, 9.3);
    tl.to(el("[data-cursor]"), { opacity: 0, duration: 0.3 }, 10);
    const clock = { t: 595 };
    tl.to(clock, {
      t: 583,
      duration: 12,
      ease: "none",
      onUpdate: () => {
        const left = el("[data-undo-left]");
        if (left) left.textContent = `${Math.floor(clock.t / 60)}:${String(Math.floor(clock.t % 60)).padStart(2, "0")}`;
      },
    }, 9.6);

    // and round again
    tl.to(q("[data-card]"), { opacity: 0, duration: 0.5, ease: "power2.in" }, 19);
    tl.set(q("[data-card]"), { opacity: 1 }, 20);
  }, { rest: 0.55 });

  return (
    <section id="booking" className={`${WRAP} scroll-mt-24 py-28 lg:py-40 2xl:py-48`}>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <Heading lead={booking.title} muted={booking.titleMuted} className={H2} />
        <div className="max-w-[440px]">
          <p className="text-[18px]/[1.55] text-ink-soft">{booking.body}</p>
          <ul className="mt-5 flex flex-col gap-2 text-[17px] text-ink">
            {booking.points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <Icon icon={Tick02Icon} className="mt-1 size-[18px] shrink-0 text-ink-faint" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* The booking page itself */}
      <div ref={root} className="mx-auto mt-16 w-full max-w-[1000px] lg:mt-20">
        <header className="flex items-start gap-5 sm:items-center">
          <span className="size-[72px] shrink-0 rounded-full bg-cover bg-center" style={{ backgroundImage: "url(/app/avatar-ember.webp)" }} />
          <div className="min-w-0">
            <h3 className="text-[26px]/[1.15] font-light tracking-[-0.5px] text-ink sm:text-[32px]">Book a meeting with {p.host}</h3>
            <p className="mt-1 text-[19px] text-ink-soft">{p.role}</p>
            <p className="mt-2 max-w-prose text-[16px]/[1.55] text-ink-soft">{p.bio}</p>
          </div>
        </header>

        <div className="mt-8 grid items-start gap-4 lg:grid-cols-2">
          {/* The film, framed inside the card as the app frames it */}
          <div data-card className={`${CARD} h-40 p-2 lg:aspect-[9/10] lg:h-auto`}>
            <div className="relative isolate size-full overflow-hidden rounded-[20px] bg-black">
              <Film src={p.film} className="object-center" />
            </div>
          </div>

          {/* The form, one step at a time */}
          <div data-card className={`${CARD} relative isolate flex min-w-0 flex-col overflow-hidden lg:aspect-[9/10]`}>
            <div className="flex items-center gap-2 border-b border-hairline px-6 py-4">
              <Icon icon={ArrowLeft01Icon} className="size-5 text-ink-faint" />
              <p className="flex-1 text-[19px] font-medium text-ink">{p.type}</p>
              <p className="text-[16px] text-ink-soft tabular-nums">{p.minutes}</p>
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
                        {n === p.day && <span data-day-on data-target="day" className="absolute inset-0 rounded-full bg-overlay" />}
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
                    {p.confirm}
                  </span>
                </div>
              </div>

              {/* 4 · booked */}
              <div data-step className={STEP}>
                <h4 className="text-[24px]/[1.25] font-light tracking-[-0.3px] text-ink">{p.done.title}</h4>
                <p className="mt-2 text-[18px]/[1.5] text-ink">{p.done.what}</p>
                <p className="mt-1 text-[15px] text-ink-soft">{p.zone.replace("Times shown in ", "")}</p>
                <p className="mt-5 text-[17px]/[1.5] text-ink-soft">
                  {p.done.sent} <span className="text-ink">{p.email.value}</span>
                  {p.done.carries}
                </p>
                <div className="mt-auto border-t border-hairline pt-5">
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
                <path d="M0 0 L 0 17 L 4.5 13 L 8 20.5 L 11 19 L 7.5 12 L 13.5 11.5 Z" fill="#F7EFE8" stroke="#0c0907" strokeWidth={1.2} strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        <footer className="mt-5 flex items-center gap-2 text-[15px] text-ink-faint">
          <Logo className="h-4 w-auto opacity-60" />
          {p.footer}
        </footer>
      </div>
    </section>
  );
}
