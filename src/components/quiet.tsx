"use client";

import { useEffect, useRef } from "react";
import { Calendar03Icon, Key01Icon, TranslateIcon, UserGroupIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { quiet } from "@/content/site";
import { EASE, Eyebrow, H2, Heading, WRAP } from "./ui";

/**
 * Four things Morse does while nobody watches it, in the structure
 * aeye.framer.ai uses for its "Understand the flow" band — measured off the
 * live page rather than guessed from a screenshot.
 *
 * The three things that make it work there:
 *  1. **It pins.** The band sticks to the top of the window and the rail is
 *     scrubbed by scroll, rather than lighting up as the band drifts past.
 *  2. **The switch is hard.** A card's title and icon go to full ink the
 *     moment the rail's head crosses that card's left edge, with the colour
 *     easing in behind it — not a fade tracking the fill.
 *  3. **The description isn't there yet.** It arrives with the rail, so the
 *     band fills itself in as you go instead of sitting complete from the
 *     start.
 *
 * The cards are the page's own ground with a hairline of `raised` between
 * them, so the four read as one block cut into four rather than four cards
 * floating apart.
 *
 * Each card lights in its own colour, from the five accents a person can pick
 * in the app. The rail, the icon and the number take it; the words stay ink so
 * they can still be read. An unlit card holds none of it — the colour is the
 * reward for the rail arriving.
 */

const ICONS = { bot: UserGroupIcon, google: Calendar03Icon, api: Key01Icon, counts: TranslateIcon };

/**
 * A colour per card, from the five accents a person can actually pick in
 * Settings → Appearance. Sage is the one held back: it marks the things you
 * press, everywhere else on the page, and spending it here would cost that.
 * The rest run cool to warm across the four.
 */
const TINTS = { bot: "var(--accent-patina)", google: "var(--accent-dusk)", api: "var(--accent-indigo)", counts: "var(--accent-plum)" };

/** How much scroll the rail takes to cross all four cards. */
const TRAVEL = 1500;

export function Quiet() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    // Below lg the cards stack and there is nothing to pin, so the band sits
    // there finished: a rail that can't travel shouldn't be half-drawn.
    if (!matchMedia("(min-width: 64rem)").matches) {
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

          {/* One block, cut into four by a hairline of the raised colour. */}
          {/* Square, and lined in `hairline` — `raised` is a surface colour and
              barely reads as a rule against the canvas. */}
          <div className="mt-14 overflow-hidden rounded-[24px] border border-hairline bg-hairline lg:mt-16">
            <div className="grid gap-px lg:grid-cols-4">
              {quiet.items.map((item, i) => {
                // This card's quarter of the run, 0 to 1.
                const f = `clamp(0, calc((var(--p, 0) - ${i / n}) * ${n}), 1)`;
                // Lit the moment the head crosses this card's left edge.
                const on = `clamp(0, calc((var(--p, 0) - ${i / n}) * 1000), 1)`;
                return (
                  <article
                    key={item.id}
                    className="relative flex flex-col bg-canvas p-7"
                    style={{ ["--f" as string]: f, ["--on" as string]: on, ["--tint" as string]: TINTS[item.id as keyof typeof TINTS] }}
                  >
                    {/* A wash of the card's colour, rising from its foot. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background: "radial-gradient(120% 80% at 50% 118%, color-mix(in oklch, var(--tint) 20%, transparent), transparent 72%)",
                        opacity: "var(--on)",
                        transition: `opacity 620ms ${EASE}`,
                      }}
                    />
                    <p
                      className="relative font-mono text-label tabular-nums"
                      style={{ color: "color-mix(in oklch, var(--tint) calc(var(--on) * 100%), var(--ink-faint))", transition: `color 420ms ${EASE}` }}
                    >
                      {String(i + 1).padStart(3, "0")}
                    </p>

                    {/* Fixed, not a minimum: the four rails sit on one line. */}
                    <p
                      className="relative mt-8 h-[52px] text-[16px]/[1.6] text-ink-soft"
                      style={{
                        opacity: "var(--on)",
                        transform: "translateY(calc((1 - var(--on)) * 6px))",
                        transition: `opacity 620ms ${EASE}, transform 620ms ${EASE}`,
                      }}
                    >
                      {item.body}
                    </p>

                    {/* The rail: a thin bar in a dotted ground, bled to the
                        card's edges, with a square trailing 4px behind its
                        head — the reference's own arrangement. */}
                    <div className="dots relative -mx-7 mt-6 h-6 bg-overlay">
                      <div className="absolute top-1/2 left-0 h-[7px] -translate-y-1/2" style={{ width: "calc(var(--f) * 100%)", background: "var(--tint)" }} />
                      <div
                        className="absolute top-1/2 size-[7px] -translate-y-1/2"
                        style={{
                          left: "calc(var(--f) * 100% + 4px)",
                          background: "var(--tint)",
                          opacity: "calc(var(--on) * clamp(0, calc((1 - var(--f)) * 60), 1))",
                        }}
                      />
                    </div>

                    <p
                      className="relative mt-6 text-[23px]/[1.2] font-light"
                      style={{ color: "color-mix(in oklch, var(--ink) calc(var(--on) * 100%), var(--ink-faint))", transition: `color 420ms ${EASE}` }}
                    >
                      {item.title}
                    </p>

                    <div className="relative mt-auto flex justify-end pt-7">
                      <HugeiconsIcon
                        icon={ICONS[item.id as keyof typeof ICONS]}
                        className="size-12"
                        strokeWidth={1.1}
                        aria-hidden="true"
                        style={{ color: "color-mix(in oklch, var(--tint) calc(var(--on) * 100%), var(--ink-faint))", transition: `color 420ms ${EASE}` }}
                      />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
