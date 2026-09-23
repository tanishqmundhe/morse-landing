"use client";

import { replaces } from "@/content/site";
import { BRANDS } from "./brand-marks";
import { LogoMark } from "./logo";
import { Eyebrow, H2, Heading, LEAD, SECTION, WRAP } from "./ui";

/**
 * What Morse stands in for, in the arrangement aeye.framer.ai uses under its
 * hero — a strip of equal cells over a full-bleed band with a line running
 * through it. Measured off the live page: their band is 280 tall on #F5F5F5,
 * set in mono at 32px with -0.06em tracking, over a field of 2px diamonds on
 * a 14px pitch.
 *
 * Ours is the same arrangement, inverted onto the warm black: the cells are
 * the page's own ground with a hairline of `raised` between them, the band is
 * `raised` under the same dot field, and the line is ink rather than their
 * blue, because sage only marks the things you press.
 *
 * The marks are the tools' own trademarks. Comparative use is against most of
 * their brand guidelines, so `MARKS` turns the strip back into plain names.
 */
const MARKS = true;

export function Replaces() {
  // Enough repeats that the track covers any width twice over.
  const run = [...replaces.ticker, replaces.one];

  return (
    <section className={SECTION} aria-label="What Morse stands in for">
      <div className={WRAP}>
        <div className="max-w-[720px]">
          <Eyebrow className="mb-5">{replaces.eyebrow}</Eyebrow>
          <Heading lead={replaces.title} muted={replaces.titleMuted} className={H2} />
          <p className={`${LEAD} mt-6`}>{replaces.body}</p>
        </div>

        {/* Six equal cells, divided by a hairline of the raised colour. */}
        <div className="mt-14 overflow-hidden rounded-[20px] bg-raised p-px lg:mt-16">
          <div className="grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-6">
            {BRANDS.map((brand) => (
              <div key={brand.name} className="flex items-center justify-center gap-2.5 bg-canvas px-4 py-8 text-ink-faint">
                {MARKS && (
                  <svg viewBox="0 0 24 24" className="size-[22px] shrink-0" fill="currentColor" aria-hidden="true">
                    <path d={brand.path} />
                  </svg>
                )}
                <span className="text-[16px] whitespace-nowrap">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The band runs the full width of the window, as theirs does. */}
      <div className="dots mt-2 overflow-hidden bg-raised py-14">
        {/* No gap between the copies: the loop moves the track by exactly a
              quarter of its width, so any gap there would make it jump. Each
              word carries its own separator instead. */}
          <div className="marquee flex w-max font-mono text-[26px] tracking-[-0.04em] whitespace-nowrap sm:text-[32px]">
          {Array.from({ length: 4 }, (_, k) => (
            <span key={k} className="flex" aria-hidden={k > 0}>
              {run.map((word) => (
                <span key={word} className={word === replaces.one ? "flex items-center gap-3 text-ink" : "text-ink-faint"}>
                  {word === replaces.one && <LogoMark className="size-6 shrink-0" />}
                  {word}
                  <span aria-hidden="true" className="mx-10 text-ink-faint/40">
                    ·
                  </span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
