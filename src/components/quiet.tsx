"use client";

import { useEffect, useRef } from "react";
import { quiet } from "@/content/site";
import { GLYPHS } from "./quiet-glyphs";
import { EASE, Eyebrow, H2, Heading, WRAP } from "./ui";

/**
 * Four things Morse does while nobody is watching it, laid out the way
 * aeye.framer.ai lays out its "Understand the flow" band — measured off the
 * live page rather than guessed from a screenshot.
 *
 * What makes it work there, and what a first pass missed: **the section pins**.
 * It sticks to the top of the window and the rail is scrubbed by scroll across
 * about 1.7 screens, instead of lighting up as the band drifts past. Each
 * card's title and glyph switch the moment the rail's head crosses that card's
 * left edge — a switch, not a fade, with the colour easing in behind it.
 *
 * Their rail is one strip with the card gaps notched out by masks. Drawn per
 * card it comes to the same picture and needs no masks.
 *
 * Theirs lights in blue. This lights in ink at full brightness against the
 * warm black, because sage still only marks the things you press.
 */

/** How much scroll the rail takes to cross all four cards. */
const TRAVEL = 1500;

export function Quiet() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    // Below lg the cards stack and there is nothing to pin, so the band just
    // sits there, finished: a rail that can't travel shouldn't be half-drawn.
    const wide = matchMedia("(min-width: 64rem)");
    if (!wide.matches) {
      el.style.setProperty("--p", "1");
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--p", String(Math.min(1, Math.max(0, -r.top / TRAVEL))));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const n = quiet.items.length;

  return (
    <section ref={root} className="relative max-lg:!h-auto" style={{ height: `calc(100svh + ${TRAVEL}px)` }} aria-label="The quiet part">
      <div className="sticky top-0 flex h-svh flex-col justify-center max-lg:static max-lg:h-auto max-lg:py-28">
        <div className={WRAP}>
          <div className="max-w-[760px]">
            <Eyebrow className="mb-5">{quiet.eyebrow}</Eyebrow>
            <Heading lead={quiet.title} muted={quiet.titleMuted} className={H2} />
          </div>

          <div className="mt-14 grid gap-2 lg:mt-16 lg:grid-cols-4">
            {quiet.items.map((item, i) => {
              const Glyph = GLYPHS[item.id];
              // This card's quarter of the run, 0 to 1.
              const f = `clamp(0, calc((var(--p, 0) - ${i / n}) * ${n}), 1)`;
              // Lit the moment the head crosses this card's left edge.
              const on = `clamp(0, calc((var(--p, 0) - ${i / n}) * 1000), 1)`;
              return (
                <article
                  key={item.id}
                  className="flex flex-col overflow-hidden rounded-[20px] bg-raised p-6 shadow-raised"
                  style={{ ["--f" as string]: f, ["--on" as string]: on }}
                >
                  <p className="font-mono text-label text-ink-faint tabular-nums">{String(i + 1).padStart(3, "0")}</p>
                  {/* Fixed, not a minimum: the four rails have to sit on one line. */}
                  <p className="mt-7 h-[96px] text-[16px]/[1.5] text-ink-soft">{item.body}</p>

                  {/* The rail: a dotted band bled to the card's edges, filling
                      left to right, with a square riding its head. */}
                  <div className="dots relative -mx-6 mt-4 h-7 bg-overlay">
                    <div className="absolute top-1/2 left-0 h-2 -translate-y-1/2 bg-ink" style={{ width: "calc(var(--f) * 100%)" }} />
                    <div
                      className="absolute top-1/2 size-3 -translate-y-1/2 bg-ink"
                      style={{ left: "calc(var(--f) * 100% - 6px)", opacity: "calc(var(--on) * clamp(0, calc((1 - var(--f)) * 60), 1))" }}
                    />
                  </div>

                  <p
                    className="mt-5 text-[23px]/[1.2] font-light"
                    style={{ color: "color-mix(in oklch, var(--ink) calc(var(--on) * 100%), var(--ink-faint))", transition: `color 420ms ${EASE}` }}
                  >
                    {item.title}
                  </p>

                  <div className="mt-auto flex justify-end pt-7">
                    <Glyph className="size-20 [--l:var(--f)]" />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
