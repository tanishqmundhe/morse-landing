"use client";

import { replaces } from "@/content/site";
import { BRANDS, type Brand } from "./brand-marks";
import { LogoMark } from "./logo";
import { Eyebrow, H2, Heading, LEAD, WRAP } from "./ui";
import Image from "next/image";
import { GlitchBand } from "./glitch";

/**
 * What Morse stands in for, built to the geometry of the band under
 * aeye.framer.ai's hero — measured off the live page:
 *
 *   strip   cells of 200 × 132 inside the 1200 column, hairline divided,
 *           each logo centred and clipped
 *   band    a dot field with `· · ·  >` held at the left edge and `<  · · ·`
 *           at the right, one line of mono between them
 *
 * Theirs is 280 tall at 1200 wide. Ours is shorter, and stays shorter as the
 * screen grows: the line is one row, and a taller band on a wide panel is just
 * a bigger empty rectangle with the same sentence floating in it.
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
    <div className="flex h-[108px] w-[184px] shrink-0 items-center justify-center gap-2.5 overflow-clip relative border-r border-hairline px-4 text-ink-soft transition-colors duration-300 lg:h-[132px] lg:w-[200px] 3xl:h-[148px] 3xl:w-[224px]">
      {MARKS && (
        <svg
          viewBox={brand.viewBox}
          className={brand.wordmark ? "h-[22px] w-auto shrink-0" : "size-[22px] shrink-0"}
          fill="currentColor"
          role="img"
          aria-label={brand.wordmark ? brand.name : undefined}
          aria-hidden={brand.wordmark ? undefined : true}
          dangerouslySetInnerHTML={{ __html: brand.svg }}
        />
      )}
      {/* A wordmark says the name itself; typing it again read "zoom Zoom". */}
      {!(MARKS && brand.wordmark) && <span className="truncate text-[16px]">{brand.name}</span>}
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
    <section className="px-2.5 py-24 sm:px-3.5 lg:py-32" aria-label="What Morse stands in for">
      {/* No picture here. This sits directly under the hero's panel, and a
          second image against the first read as two slabs rather than as a
          page. The colour comes from the strip instead: the mark crossing the
          middle takes the accent and lets it go again. */}
      <div className={WRAP}>
        <div className="max-w-[720px]">
          <Eyebrow className="mb-5">{replaces.eyebrow}</Eyebrow>
          <Heading lead={replaces.title} muted={replaces.titleMuted} className={H2} />
          <p className={`${LEAD} mt-6`}>{replaces.body}</p>
        </div>

        <div className="mt-14 overflow-hidden rounded-[24px] border border-hairline bg-sunken lg:mt-16">
          {/* The strip runs; the list is longer than the column. */}
          <div className="relative isolate overflow-hidden border-b border-hairline [mask-image:linear-gradient(90deg,transparent,#000_4%,#000_96%,transparent)]">
            
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
          {/* Taller, and the artwork sits under the dots. It reads as a lit
              ground the line is printed on rather than as a second panel,
              which is what a full-height picture here did. */}
          <div className="dots relative isolate flex h-[190px] items-center justify-between gap-6 overflow-hidden px-6 sm:px-8 lg:h-[240px] 3xl:h-[270px]">
            <Image src="/art/memory-light.webp" alt="" width={1600} height={1067} sizes="100vw" className="absolute inset-0 -z-10 size-full object-cover opacity-45 dark:hidden" />
            <Image src="/art/memory.webp" alt="" width={1600} height={1067} sizes="100vw" className="absolute inset-0 -z-10 hidden size-full object-cover opacity-45 dark:block" />
            <GlitchBand src="memory" delay={1.5} className="absolute inset-0 -z-10 size-full object-cover opacity-25 dark:opacity-35" />
            <Brackets side="left" />
            <p className="flex min-w-0 items-center gap-4 truncate font-mono text-[20px] tracking-[-0.04em] text-ink sm:text-[26px] lg:text-[30px] 3xl:text-[34px]">
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
