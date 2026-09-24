"use client";

import { useState } from "react";
import { useLoop } from "./features/timeline";
import {
  BookingScreen,
  CalendarScreen,
  NotesScreen,
  RoomScreen,
  SCREEN_H,
  SCREEN_W,
  TeleprompterScreen,
} from "./showcase/screens";

/**
 * The hero's meeting: the app's own screens, playing through a whole one.
 *
 * Five of the seven the showcase carries, in the order a meeting actually
 * goes — you are in the call, a question gets answered out of the notes, the
 * notes get written, the follow-up is booked, and it lands on the calendar.
 * The loop is the product's arc rather than a slideshow of screenshots.
 *
 * One clock. The screen changes are `tl.call`s on the same GSAP timeline the
 * pop-ups run on, not a separate interval — with five screens and an interval
 * the two drifted apart within a couple of passes and cards started landing on
 * the wrong screen.
 */

const SCREENS = [RoomScreen, TeleprompterScreen, NotesScreen, BookingScreen, CalendarScreen] as const;
/** Long enough to read a panel, short enough that the loop is not a wait. */
const HOLD = 6.2;
const RUN = SCREENS.length * HOLD;

/** Big enough to read the transcript; the frame is 828 wide before this. */
const SCALE = 0.68;

const EMOJI = ["red-heart", "thumbs-up", "fire", "clapping-hands", "party-popper"];

export function HeroMontage() {
  const [shown, setShown] = useState(0);

  const root = useLoop<HTMLDivElement>(
    (tl, q) => {
      const el = (s: string) => q(s)[0];

      // The screens, on the same clock as everything that lands on them.
      SCREENS.forEach((_, i) => tl.call(() => setShown(i), undefined, i * HOLD));

      tl.set(q("[data-emoji]"), { opacity: 0, y: 0, scale: 0.5 }, 0);
      tl.set(el("[data-hand]"), { opacity: 0, x: -24, scale: 0.86 }, 0);
      tl.set(q("[data-pop]"), { opacity: 0, y: -22, scale: 0.9 }, 0);

      // 1 · In the call: the room reacts while somebody is still speaking.
      q("[data-emoji]").forEach((e, i) => {
        const at = 0.8 + i * 0.4;
        tl.to(e, { opacity: 1, scale: 1.15, duration: 0.24, ease: "back.out(3)" }, at);
        tl.to(e, { scale: 1, duration: 0.3, ease: "power2.out" }, at + 0.24);
        tl.to(e, { y: -330, duration: 3.1, ease: "power1.out" }, at);
        tl.to(e, { opacity: 0, duration: 1, ease: "power1.in" }, at + 2.1);
      });
      tl.to(el("[data-hand]"), { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: "back.out(2.4)" }, 1.9);
      tl.to(el("[data-hand]"), { opacity: 0, x: -14, duration: 0.4 }, 5.4);

      /** Each card belongs to a screen, and lands a beat after it arrives. */
      const pop = (name: string, screen: number) => {
        const at = screen * HOLD + 1.1;
        tl.to(el(`[data-pop="${name}"]`), { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(1.9)" }, at);
        tl.to(el(`[data-pop="${name}"]`), { opacity: 0, y: -14, duration: 0.45, ease: "power1.in" }, at + HOLD - 2.2);
      };
      pop("answered", 1); // the teleprompter answering
      pop("written", 2); // the notes writing themselves
      pop("booked", 3); // the follow-up going in
      pop("calendar", 4); // and landing on the calendar

      tl.set({}, {}, RUN);
    },
    { rest: 0.12 },
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
          allowed past an edge, which is what makes them read as interruptions.
          They rise into the picture: below the frame is the floor. */}
      <div aria-hidden="true" className="absolute inset-0">
        {EMOJI.map((e, i) => (
          // eslint-disable-next-line @next/next/no-img-element -- tiny pixel SVGs
          <img width={44} height={44}
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
          <img width={44} height={44} src="/emoji/raising-hands.svg" alt="" className="size-5" />
          Daniel raised a hand
        </span>

        <div data-pop="answered" className="absolute -top-12 left-2 w-[300px] rounded-[18px] bg-float p-4 shadow-float">
          <p className="flex items-center gap-2 text-[15px] font-medium text-ink">
            <span className="size-2 rounded-full bg-understood" />
            Answered from your notes
          </p>
          <p className="mt-1.5 text-[13px] text-ink-soft">This year&rsquo;s rate, fixed until March.</p>
        </div>

        <div data-pop="written" className="absolute -top-12 left-4 w-[300px] rounded-[18px] bg-float p-4 shadow-float">
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

        <div data-pop="booked" className="absolute -top-10 right-6 w-[250px] rounded-[18px] bg-float p-4 shadow-float">
          <p className="text-[15px] font-medium text-ink">Follow-up booked</p>
          <p className="mt-1 text-[13px] text-ink-soft">Thursday, 2:00 &ndash; 2:30 pm</p>
        </div>

        <div data-pop="calendar" className="absolute -top-10 right-10 w-[268px] rounded-[18px] bg-float p-4 shadow-float">
          <p className="text-[15px] font-medium text-ink">On the calendar you keep</p>
          <p className="mt-1 text-[13px] text-ink-soft">Invites sent. No clashes.</p>
        </div>
      </div>
    </div>
  );
}
