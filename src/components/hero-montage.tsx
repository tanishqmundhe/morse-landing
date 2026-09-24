"use client";

import { useEffect, useState } from "react";
import { useLoop } from "./features/timeline";
import { NotesScreen, RoomScreen, SCREEN_H, SCREEN_W, TeleprompterScreen } from "./showcase/screens";

/**
 * The hero's meeting: the app's own screens, playing, breaking out of the
 * artwork they sit on.
 *
 * Three things were wrong with the version before. It drew its own window
 * rather than using the one the page already had. It showed one screen, so a
 * product that does four things looked like it did one. And it sat inside the
 * panel's bottom corner, which put it under the fold and cut it off.
 *
 * So: the real screens, at the panel's centre, overlapping its edges — and the
 * things that pop up spill outside the frame entirely, onto the paper. A card
 * that stays politely inside its box reads as a screenshot; one that breaks
 * the box reads as something happening.
 */

/** The three the hero can say something with, in the order a meeting goes. */
const SCREENS = [RoomScreen, TeleprompterScreen, NotesScreen] as const;
const HOLD = 7200;

/** Big enough to read the transcript, small enough to leave the artwork room. */
const SCALE = 0.74;

const EMOJI = ["red-heart", "thumbs-up", "fire", "clapping-hands", "party-popper"];

export function HeroMontage() {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setShown((n) => (n + 1) % SCREENS.length), HOLD);
    return () => clearInterval(id);
  }, []);

  const root = useLoop<HTMLDivElement>(
    (tl, q) => {
      const el = (s: string) => q(s)[0];
      tl.set(q("[data-emoji]"), { opacity: 0, y: 0, scale: 0.5 }, 0);
      tl.set(el("[data-hand]"), { opacity: 0, x: -24, scale: 0.86 }, 0);
      tl.set(el("[data-written]"), { opacity: 0, y: -22, scale: 0.9 }, 0);
      tl.set(el("[data-booked]"), { opacity: 0, y: -22, scale: 0.9 }, 0);

      // Reactions, rising past the top edge of the frame and out of it.
      q("[data-emoji]").forEach((e, i) => {
        const at = 0.9 + i * 0.42;
        tl.to(e, { opacity: 1, scale: 1.15, duration: 0.24, ease: "back.out(3)" }, at);
        tl.to(e, { scale: 1, duration: 0.3, ease: "power2.out" }, at + 0.24);
        tl.to(e, { y: -340, duration: 3.2, ease: "power1.out" }, at);
        tl.to(e, { opacity: 0, duration: 1, ease: "power1.in" }, at + 2.2);
      });

      // A hand, out past the left edge.
      tl.to(el("[data-hand]"), { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: "back.out(2.4)" }, 2.1);
      tl.to(el("[data-hand]"), { opacity: 0, x: -14, duration: 0.4 }, 6.4);

      // The notes, out past the bottom edge, as the second screen arrives.
      tl.to(el("[data-written]"), { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.8)" }, 8.4);
      tl.to(el("[data-written]"), { opacity: 0, y: -14, duration: 0.45 }, 13.6);

      // And the booking, out past the right, as the third does.
      tl.to(el("[data-booked]"), { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(2)" }, 15.4);
      tl.to(el("[data-booked]"), { opacity: 0, y: -14, duration: 0.45 }, 20.4);

      tl.set({}, {}, 21.6);
    },
    { rest: 0.35 },
  );

  return (
    <div
      ref={root}
      className="pointer-events-none relative hidden lg:block"
      style={{ width: SCREEN_W * SCALE, height: SCREEN_H * SCALE }}
    >
      {/*
        The frame goes translucent by overriding --canvas inside this subtree
        only: Frame paints with it, while the panels and chips on top keep
        their own opaque tokens. So the glass is the window, not its contents.
      */}
      <div
        className="absolute inset-0 overflow-hidden rounded-[28px] shadow-float backdrop-blur-xl [--canvas:rgb(20_20_19/0.72)] dark:[--canvas:rgb(20_20_19/0.66)]"
        style={{ width: SCREEN_W * SCALE, height: SCREEN_H * SCALE }}
      >
        <div style={{ width: SCREEN_W, height: SCREEN_H, transform: `scale(${SCALE})`, transformOrigin: "0 0" }}>
          {SCREENS.map((Screen, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: i === shown ? 1 : 0, width: SCREEN_W, height: SCREEN_H }}
            >
              <Screen active={i === shown} />
            </div>
          ))}
        </div>
      </div>

      {/* Outside the frame, deliberately. These are the only things on the page
          allowed past an edge, which is what makes them read as interruptions. */}
      <div aria-hidden="true" className="absolute inset-0">
        {EMOJI.map((e, i) => (
          // eslint-disable-next-line @next/next/no-img-element -- tiny pixel SVGs
          <img
            key={e}
            data-emoji
            src={`/emoji/${e}.svg`}
            alt=""
            className="absolute size-10 drop-shadow-lg"
            /* Over the stage, not the roster: at 26+13i the last two rose
               through the People panel and landed on its header. */
            style={{ left: `${20 + i * 10}%`, top: "62%" }}
          />
        ))}

        <span
          data-hand
          className="absolute -left-14 top-[34%] flex items-center gap-2 rounded-full bg-float px-4 py-2.5 text-[15px] font-medium text-ink shadow-float"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- tiny pixel SVG */}
          <img src="/emoji/raising-hands.svg" alt="" className="size-5" />
          Daniel raised a hand
        </span>

        <div data-written className="absolute -top-12 left-4 w-[300px] rounded-[18px] bg-float p-4 shadow-float">
          <p className="flex items-center gap-2 text-[15px] font-medium text-ink">
            <span className="grid size-5 place-items-center rounded-full bg-action">
              <svg viewBox="0 0 12 12" className="size-3" aria-hidden="true">
                <path d="M2.5 6.2 4.8 8.5 9.5 3.8" fill="none" stroke="var(--action-foreground)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            Notes are written
          </p>
          <p className="mt-1.5 text-[13px] text-ink-soft">A summary, two decisions and three action items.</p>
        </div>

        <div data-booked className="absolute -top-10 right-6 w-[250px] rounded-[18px] bg-float p-4 shadow-float">
          <p className="text-[15px] font-medium text-ink">Follow-up booked</p>
          <p className="mt-1 text-[13px] text-ink-soft">Thursday, 2:00 &ndash; 2:30 pm</p>
        </div>
      </div>
    </div>
  );
}
