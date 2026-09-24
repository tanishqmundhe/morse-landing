"use client";

import { Calendar03Icon, Mic01Icon, Video01Icon } from "@hugeicons/core-free-icons";
import { Cam } from "./cam";
import { useLoop } from "./features/timeline";
import { Icon } from "./ui";

/**
 * One Morse window, playing the meeting through.
 *
 * Three floating cards said three separate things and none of them moved. This
 * is the whole app at a size you can read, running the sequence the product
 * actually runs: people are in a call, the transcript fills as they talk, the
 * notes write themselves out of it, an action item lands, and the follow-up
 * books off something somebody said. Twelve seconds, then round again.
 *
 * It is one GSAP timeline on the page's own `useLoop`, so it plays only while
 * it is on screen and rests on the finished frame under reduced motion — the
 * same contract every other animated card on this page keeps.
 */

/** What gets said, and when. The transcript is the clock: everything else
 *  hangs off a line arriving. */
const TRANSCRIPT = [
  { who: "Priya", at: 0.8, text: "The gap is mostly onboarding — people sign up and never come back." },
  { who: "Daniel", at: 3.2, text: "Then let’s try a nudge before the second meeting." },
  { who: "Priya", at: 6.0, text: "Good. Let’s pick this up Thursday at two." },
];

export function HeroMontage() {
  const root = useLoop<HTMLDivElement>(
    (tl, q) => {
      const el = (s: string) => q(s)[0];

      // Everything that arrives starts away.
      tl.set(q("[data-line]"), { opacity: 0, y: 8 }, 0);
      tl.set(q("[data-note]"), { opacity: 0, y: 10 }, 0);
      tl.set(el("[data-writing]"), { opacity: 0 }, 0);
      tl.set(el("[data-tick]"), { scale: 0, transformOrigin: "50% 50%" }, 0);
      tl.set(el("[data-followup]"), { opacity: 0, y: 16 }, 0);
      tl.set(el("[data-press]"), { scale: 1 }, 0);
      tl.set(el("[data-clock]"), { text: "00:04" }, 0);

      // The call runs. The clock is the only thing that never stops.
      tl.to(el("[data-clock]"), { text: "00:16", duration: 12, ease: "none", snap: { text: 1 } }, 0);

      // The transcript fills, a line at a time.
      TRANSCRIPT.forEach((line, i) => {
        tl.to(q(`[data-line="${i}"]`), { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, line.at);
      });

      // Morse starts writing once there is something to write from.
      tl.to(el("[data-writing]"), { opacity: 1, duration: 0.4 }, 4.4);
      tl.to(q("[data-note]"), { opacity: 1, y: 0, duration: 0.5, stagger: 0.35, ease: "power2.out" }, 5.0);
      tl.to(el("[data-writing]"), { opacity: 0, duration: 0.4 }, 6.4);

      // The room reacts while Priya is still talking.
      tl.set(q("[data-emoji]"), { opacity: 0, y: 0, scale: 0.7 }, 0);
      q("[data-emoji]").forEach((e, i) => {
        const at = 2.0 + i * 0.45;
        tl.to(e, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2)" }, at);
        tl.to(e, { y: -86, duration: 2.0, ease: "power1.out" }, at);
        tl.to(e, { opacity: 0, duration: 0.7, ease: "power1.in" }, at + 1.3);
      });

      // Daniel wants in before he answers.
      tl.set(el("[data-hand]"), { opacity: 0, y: 8, scale: 0.9 }, 0);
      tl.to(el("[data-hand]"), { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(2)" }, 2.6);
      tl.to(el("[data-hand]"), { opacity: 0, duration: 0.35 }, 4.1);

      // Somebody asks something, and the teleprompter answers from the notes.
      tl.set(el("[data-prompt]"), { opacity: 0, y: 14, scale: 0.97 }, 0);
      tl.to(el("[data-prompt]"), { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" }, 8.2);
      tl.to(el("[data-prompt]"), { opacity: 0, y: -10, duration: 0.45, ease: "power1.in" }, 11.6);

      // The action item lands and is taken.
      tl.to(el("[data-tick]"), { scale: 1, duration: 0.35, ease: "back.out(2.2)" }, 7.0);

      // And the next meeting books itself off Priya's line.
      tl.to(el("[data-followup]"), { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }, 7.8);
      tl.to(el("[data-press]"), { scale: 0.94, duration: 0.12, ease: "power2.in" }, 9.6);
      tl.to(el("[data-press]"), { scale: 1, duration: 0.3, ease: "back.out(3)" }, 9.72);
      tl.to(el("[data-booked]"), { opacity: 1, duration: 0.3 }, 9.9);

      // Hold the finished meeting, then clear for the next pass.
      tl.to(q("[data-line], [data-note], [data-followup]"), { opacity: 0, duration: 0.5, ease: "power1.in" }, 12.6);
      tl.set(el("[data-booked]"), { opacity: 0 }, 13.2);
      tl.set({}, {}, 13.6);
    },
    { rest: 0.78 },
  );

  return (
    <div
      ref={root}
      className="pointer-events-none hidden w-[660px] overflow-hidden rounded-[20px] bg-raised shadow-float lg:block 3xl:w-[760px]"
    >
      {/* The window's own bar */}
      <div className="flex items-center gap-3 border-b border-hairline px-4 py-2.5">
        <span className="text-[13px] font-medium text-ink">Weekly product sync</span>
        <span className="ml-auto flex items-center gap-1.5 text-[12px] text-signal-ink">
          <span className="size-[6px] rounded-full bg-signal" />
          Recording
        </span>
        <span data-clock className="font-mono text-[12px] text-ink-faint tabular-nums">00:04</span>
      </div>

      <div className="relative grid grid-cols-[1fr_190px]">
        {/* The teleprompter, answering out of the notes mid-call. */}
        <div
          data-prompt
          className="pointer-events-none absolute bottom-3 left-3 z-10 w-[300px] rounded-[13px] bg-float p-3 shadow-float"
        >
          <p className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.08em] text-understood-ink uppercase">
            <span className="size-1.5 rounded-full bg-understood" />
            Teleprompter
          </p>
          <p className="mt-1.5 text-[12px]/[1.45] text-ink">
            This year&rsquo;s rate, fixed until March, with two extra seats.
          </p>
          <p className="mt-1.5 text-[10px] text-ink-faint">From Acme renewal notes</p>
        </div>
        {/* Left: what was said, then what was written from it. */}
        <div className="flex min-h-[290px] flex-col gap-3 border-r border-hairline p-4 3xl:min-h-[330px]">
          {TRANSCRIPT.map((line, i) => (
            <p key={i} data-line={i} className="text-[13px]/[1.5] text-ink-soft">
              <span className="font-medium text-ink">{line.who}</span> {line.text}
            </p>
          ))}

          <div data-writing className="mt-auto flex items-center gap-2 text-[12px] text-ink-faint">
            <span aria-hidden="true" className="size-3 animate-spin rounded-full border-2 border-understood border-t-transparent [animation-duration:1s]" />
            Writing the notes
          </div>

          <div className="mt-auto space-y-2">
            <p data-note className="font-mono text-[10px] tracking-[0.1em] text-ink-faint uppercase">
              Decisions
            </p>
            <p data-note className="text-[13px]/[1.45] text-ink">Try a nudge before the second meeting</p>
            <div data-note className="flex items-center gap-2.5 rounded-[10px] bg-sunken px-3 py-2">
              <span data-tick className="grid size-[17px] shrink-0 place-items-center rounded-[5px] bg-action">
                <svg viewBox="0 0 12 12" className="size-[11px]" aria-hidden="true">
                  <path d="M2.5 6.2 4.8 8.5 9.5 3.8" fill="none" stroke="var(--action-foreground)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="flex-1 text-[13px] text-ink">Draft the onboarding nudge</span>
              <span className="text-[12px] text-ink-faint">Daniel</span>
            </div>
          </div>
        </div>

        {/* Right: the people, all the way through. */}
        <div className="relative flex flex-col gap-1.5 p-2">
          {(["ember", "lagoon", "sage"] as const).map((colour, i) => (
            <div key={colour} className="relative aspect-[4/3] overflow-hidden rounded-[11px] bg-sunken">
              <Cam colour={colour} />
              {i === 0 && <span aria-hidden="true" className="absolute inset-0 rounded-[11px] ring-2 ring-signal ring-inset" />}
              {/* Daniel’s hand, on Daniel’s tile. */}
              {i === 1 && (
                <span
                  data-hand
                  className="absolute bottom-1.5 left-1.5 flex items-center gap-1 rounded-full bg-canvas/85 px-2 py-0.5 text-[10px] text-ink backdrop-blur-sm"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- a tiny pixel SVG */}
                  <img src="/emoji/raising-hands.svg" alt="" className="size-3" />
                  Hand up
                </span>
              )}
            </div>
          ))}

          {/* Reactions rise over the person who is talking. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-2 right-2 w-[190px]">
            {["red-heart", "thumbs-up", "fire", "clapping-hands"].map((e, i) => (
              // eslint-disable-next-line @next/next/no-img-element -- tiny pixel SVGs
              <img
                key={e}
                data-emoji
                src={`/emoji/${e}.svg`}
                alt=""
                className="absolute size-6"
                style={{ left: `${12 + i * 26}%`, top: "34%" }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* The follow-up, booked off the last thing said. */}
      <div className="relative border-t border-hairline px-4 py-3">
        <div data-followup className="flex items-center gap-3">
          <Icon icon={Calendar03Icon} className="size-[17px] shrink-0 text-ink-soft" />
          <span className="flex-1 text-[13px] text-ink">
            Follow-up &middot; <span className="text-ink-soft">Thu, 2:00 &ndash; 2:30 pm</span>
          </span>
          <span data-press className="rounded-full bg-action px-4 py-1.5 text-[12px] font-medium text-action-foreground">
            Book
          </span>
        </div>
        <span data-booked className="absolute inset-0 grid place-items-center bg-raised text-[13px] font-medium text-action-ink opacity-0">
          Booked &mdash; Thursday, 2:00 pm
        </span>
      </div>

      {/* The call's own controls, so the window reads as one. */}
      <div className="flex items-center justify-center gap-2 border-t border-hairline py-2.5">
        {[Mic01Icon, Video01Icon].map((icon, i) => (
          <span key={i} className="grid size-7 place-items-center rounded-full bg-overlay text-ink-soft">
            <Icon icon={icon} className="size-[13px]" />
          </span>
        ))}
        <span className="grid h-7 w-10 place-items-center rounded-full bg-signal text-[11px] font-medium text-ink-inverse">End</span>
      </div>
    </div>
  );
}
