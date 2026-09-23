"use client";

import { replaces } from "@/content/site";
import { BRANDS, type Brand } from "./brand-marks";
import { LogoMark } from "./logo";
import { Eyebrow, H2, Heading, LEAD, SECTION, WRAP } from "./ui";

/**
 * What Morse stands in for, built to the geometry of the band under
 * aeye.framer.ai's hero — measured off the live page:
 *
 *   strip   cells of 200 × 132 inside the 1200 column, hairline divided,
 *           each logo centred and clipped
 *   band    1200 × 280 over a fine dot field, `· · ·  >` held at the left edge
 *           and `<  · · ·` at the right, one line of mono between them
 *
 * Theirs is six fixed cells and nothing moves. Ours scrolls the strip instead,
 * because the list of tools is longer than a row and will grow: a marquee
 * takes any number, a grid of six does not. The band stays still, as theirs
 * does — the brackets are the frame, not a hint of motion.
 *
 * The track is the list twice over and moves by exactly half its width, so the
 * loop never jumps. Each cell carries its own right-hand rule instead of a
 * grid gap, because a gap would break that sum.
 *
 * The marks are the tools' own trademarks, and comparative use is against most
 * of their brand guidelines. `MARKS = false` falls back to plain names.
 */
const MARKS = true;

/**
 * The mark and the name. `svg` is markup we generated into the repo from the
 * three icon sets, not anything fetched at runtime, so injecting it is safe.
 */
function Cell({ brand }: { brand: Brand }) {
  return (
    <div className="flex h-[108px] w-[184px] shrink-0 items-center justify-center gap-2.5 overflow-clip border-r border-hairline px-4 text-ink-faint lg:h-[132px] lg:w-[200px]">
      {MARKS && (
        <svg
          viewBox={brand.viewBox}
          className="size-[22px] shrink-0"
          fill="currentColor"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: brand.svg }}
        />
      )}
      <span className="truncate text-[16px]">{brand.name}</span>
    </div>
  );
}

function Brackets({ side }: { side: "left" | "right" }) {
  const dots = (
    <span aria-hidden="true" className="tracking-[0.3em] text-ink-faint/60">
      ···
    </span>
  );
  return (
    <span className="flex shrink-0 items-center gap-4 font-mono text-[20px] text-ink-soft sm:gap-5 sm:text-[24px]">
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
  return (
    <section className={SECTION} aria-label="What Morse stands in for">
      <div className={WRAP}>
        <div className="max-w-[720px]">
          <Eyebrow className="mb-5">{replaces.eyebrow}</Eyebrow>
          <Heading lead={replaces.title} muted={replaces.titleMuted} className={H2} />
          <p className={`${LEAD} mt-6`}>{replaces.body}</p>
        </div>

        <div className="mt-14 overflow-hidden rounded-[24px] border border-hairline lg:mt-16">
          {/* The strip runs; the list is longer than the column. */}
          <div className="overflow-hidden border-b border-hairline [mask-image:linear-gradient(90deg,transparent,#000_4%,#000_96%,transparent)]">
            <div className="marquee flex w-max">
              {[0, 1].map((k) => (
                <div key={k} className="flex" aria-hidden={k > 0}>
                  {BRANDS.map((brand) => (
                    <Cell key={brand.name} brand={brand} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* The band holds still: the brackets are the frame. */}
          <div className="dots flex h-[200px] items-center justify-between gap-6 px-6 sm:px-8 lg:h-[260px]">
            <Brackets side="left" />
            <p className="flex min-w-0 items-center gap-4 truncate font-mono text-[20px] tracking-[-0.04em] text-ink sm:text-[26px] lg:text-[30px]">
              <LogoMark className="size-6 shrink-0 lg:size-7" />
              {replaces.line}
            </p>
            <Brackets side="right" />
          </div>
        </div>
      </div>
    </section>
  );
}
