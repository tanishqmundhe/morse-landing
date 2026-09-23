"use client";

import { replaces } from "@/content/site";
import { BRANDS } from "./brand-marks";
import { LogoMark } from "./logo";
import { Eyebrow, H2, Heading, LEAD, SECTION, WRAP } from "./ui";

/**
 * What Morse stands in for, built to the geometry of the band under
 * aeye.framer.ai's hero — measured off the live page, not guessed:
 *
 *   strip   six cells, 200 × 132, inside the 1200 column, hairline divided,
 *           the logo centred and clipped
 *   band    1200 × 280 on #F5F5F5 over a fine dot field, with `· · ·  >` held
 *           at the left edge and `<  · · ·` at the right, and one line of mono
 *           between them at 32px, -0.06em
 *
 * Theirs is static between those brackets. Ours runs: the brackets are what
 * makes that read, since a line passing between two arrows is the one place a
 * ticker belongs. The track holds four copies and moves by exactly a quarter
 * of its width, so the loop never jumps — a gap between copies would break
 * that sum, so each phrase carries its own separator instead.
 *
 * Inverted onto the warm black: cells are the page's ground with a hairline of
 * `raised` around and between them, the band is `raised`, the line is ink
 * rather than their blue, because sage only marks the things you press.
 *
 * The marks are the tools' own trademarks, and comparative use is against most
 * of their brand guidelines. `MARKS = false` falls back to plain names.
 */
const MARKS = true;

function Brackets({ side }: { side: "left" | "right" }) {
  const dots = (
    <span aria-hidden="true" className="tracking-[0.32em] text-ink-faint/60">
      ···
    </span>
  );
  return (
    <span className="flex shrink-0 items-center gap-5 font-mono text-[22px] text-ink-soft sm:text-[26px]">
      {side === "left" ? (
        <>
          {dots}
          <span aria-hidden="true">&gt;</span>
        </>
      ) : (
        <>
          <span aria-hidden="true">&lt;</span>
          {dots}
        </>
      )}
    </span>
  );
}

export function Replaces() {
  const run = [...replaces.ticker, replaces.one];

  return (
    <section className={SECTION} aria-label="What Morse stands in for">
      <div className={WRAP}>
        <div className="max-w-[720px]">
          <Eyebrow className="mb-5">{replaces.eyebrow}</Eyebrow>
          <Heading lead={replaces.title} muted={replaces.titleMuted} className={H2} />
          <p className={`${LEAD} mt-6`}>{replaces.body}</p>
        </div>

        {/* Six cells, 200 × 132 at the column's width. */}
        <div className="mt-14 overflow-hidden rounded-t-[20px] bg-raised p-px pb-0 lg:mt-16">
          <div className="grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-6">
            {BRANDS.map((brand) => (
              <div key={brand.name} className="flex h-[108px] items-center justify-center gap-2.5 overflow-clip bg-canvas px-4 text-ink-faint lg:h-[132px]">
                {MARKS && (
                  <svg viewBox="0 0 24 24" className="size-[22px] shrink-0" fill="currentColor" aria-hidden="true">
                    <path d={brand.path} />
                  </svg>
                )}
                <span className="truncate text-[16px]">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* The band: brackets held at both edges, the line running between. */}
        <div className="dots flex h-[220px] items-center gap-6 overflow-hidden rounded-b-[20px] bg-raised px-7 sm:gap-8 lg:h-[280px]">
          <Brackets side="left" />

          <div className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)]">
            <div className="marquee flex w-max font-mono text-[26px] tracking-[-0.04em] whitespace-nowrap sm:text-[32px]">
              {Array.from({ length: 4 }, (_, k) => (
                <span key={k} className="flex" aria-hidden={k > 0}>
                  {run.map((word) => (
                    <span key={word} className={word === replaces.one ? "flex items-center gap-3 text-ink" : "text-ink-soft"}>
                      {word === replaces.one && <LogoMark className="size-6 shrink-0" />}
                      {word}
                      <span aria-hidden="true" className="mx-9 text-ink-faint/40">
                        ·
                      </span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>

          <Brackets side="right" />
        </div>
      </div>
    </section>
  );
}
