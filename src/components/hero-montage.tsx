"use client";

import { useLoop } from "./features/timeline";
import { RoomScreen, SCREEN_H, SCREEN_W } from "./showcase/screens";

/**
 * The hero's meeting: the app's own call screen, playing.
 *
 * This was a window drawn by hand for the hero — a transcript column, three
 * tiles, a booking row — and it was a worse drawing of something the page
 * already had. `RoomScreen` is the real room, built once at 1120×700 from the
 * product: the transcript, the stage, the People panel, the control dock. So
 * the hero shows that, scaled, and adds the things a still screen cannot say.
 *
 * What is added is what happens *in* a call rather than what it contains:
 * reactions going up over whoever is talking, a hand raised before somebody
 * answers, and the teleprompter opening with the answer out of the notes. The
 * overlays live inside the scaled box, in the screen's own coordinates, so
 * they land on the UI rather than beside it.
 */

/** Big enough to read the transcript, small enough to leave the artwork room. */
const SCALE = 0.62;

const EMOJI = ["red-heart", "thumbs-up", "fire", "clapping-hands", "party-popper"];

export function HeroMontage() {
  const root = useLoop<HTMLDivElement>(
    (tl, q) => {
      const el = (s: string) => q(s)[0];

      tl.set(q("[data-emoji]"), { opacity: 0, y: 0, scale: 0.6 }, 0);
      tl.set(el("[data-hand]"), { opacity: 0, y: 10, scale: 0.9 }, 0);
      tl.set(el("[data-prompt]"), { opacity: 0, y: 18, scale: 0.97 }, 0);

      // The room reacts, one at a time, while Priya is still speaking.
      q("[data-emoji]").forEach((e, i) => {
        const at = 1.2 + i * 0.5;
        tl.to(e, { opacity: 1, scale: 1, duration: 0.28, ease: "back.out(2.4)" }, at);
        tl.to(e, { y: -230, duration: 2.6, ease: "power1.out" }, at);
        tl.to(e, { opacity: 0, duration: 0.8, ease: "power1.in" }, at + 1.7);
      });

      // Daniel wants in before he answers.
      tl.to(el("[data-hand]"), { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(2)" }, 2.4);
      tl.to(el("[data-hand]"), { opacity: 0, duration: 0.4 }, 5.2);

      // Somebody asks something, and the teleprompter answers from the notes.
      tl.to(el("[data-prompt]"), { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "power2.out" }, 5.8);
      tl.to(el("[data-prompt]"), { opacity: 0, y: -12, duration: 0.5, ease: "power1.in" }, 10.4);

      tl.set({}, {}, 11.4);
    },
    { rest: 0.55 },
  );

  return (
    <div
      ref={root}
      className="pointer-events-none hidden lg:block"
      style={{ width: SCREEN_W * SCALE, height: SCREEN_H * SCALE }}
    >
      <div
        className="relative"
        style={{
          width: SCREEN_W,
          height: SCREEN_H,
          transform: `scale(${SCALE})`,
          transformOrigin: "0 0",
        }}
      >
        <RoomScreen active />

        {/* Everything below is in the screen's own coordinates, so it lands on
            the UI: the stage runs roughly x 300–840, y 60–600. */}
        <div aria-hidden="true" className="absolute inset-0">
          {EMOJI.map((e, i) => (
            // eslint-disable-next-line @next/next/no-img-element -- tiny pixel SVGs
            <img
              key={e}
              data-emoji
              src={`/emoji/${e}.svg`}
              alt=""
              className="absolute size-11"
              style={{ left: 340 + i * 96, top: 520 }}
            />
          ))}

          <span
            data-hand
            className="absolute flex items-center gap-2 rounded-full bg-canvas/90 px-3.5 py-2 text-[15px] text-ink shadow-float backdrop-blur-sm"
            style={{ left: 320, top: 462 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- tiny pixel SVG */}
            <img src="/emoji/raising-hands.svg" alt="" className="size-5" />
            Daniel raised a hand
          </span>

          <div
            data-prompt
            className="absolute rounded-[18px] bg-float p-4 shadow-float"
            style={{ left: 306, top: 330, width: 400 }}
          >
            <p className="flex items-center gap-2 font-mono text-[12px] tracking-[0.1em] text-understood-ink uppercase">
              <span className="size-2 rounded-full bg-understood" />
              Teleprompter
            </p>
            <p className="mt-2 text-[16px]/[1.45] text-ink">
              This year&rsquo;s rate, fixed until March, with two extra seats.
            </p>
            <p className="mt-2 text-[13px] text-ink-faint">From Acme renewal notes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
