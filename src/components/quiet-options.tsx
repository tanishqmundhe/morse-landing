"use client";

import { useEffect, useRef } from "react";
import { quiet } from "@/content/site";
import { GLYPHS } from "./quiet-glyphs";
import { EASE, Eyebrow, H2, Heading, SECTION, WRAP } from "./ui";

/**
 * Three ways to run a scroll-driven progress rail through the quiet band.
 * Each writes one number, `--p` (0 to 1), as the section crosses the screen;
 * every cell works out its own share of that from its index.
 */
function useProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // From the band entering the lower third to it leaving the upper third.
      const span = r.height + vh * 0.55;
      const p = (vh * 0.85 - r.top) / span;
      el.style.setProperty("--p", String(Math.min(1, Math.max(0, p))));
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
  return ref;
}

const ITEMS = quiet.items.map((item) => ({
  id: item.id,
  title: "counts" in item && item.counts ? item.counts.map((c) => `${c.value} ${c.label}`).join(" ").replace(/,$/, "") : (item as { title: string }).title,
  body: item.body,
}));

/** Each cell's share of the whole: cell i fills between i/n and (i+1)/n. */
const share = (i: number, n: number) => `clamp(0, calc((var(--p, 0) - ${i / n}) * ${n}), 1)`;

// ── 1 · Cells, with the rail through them and everything lit by luminance ──
function OptionOne() {
  const root = useProgress<HTMLDivElement>();
  const n = ITEMS.length;
  return (
    <section className={`${WRAP} ${SECTION}`}>
      <div className="max-w-[720px]">
        <Eyebrow className="mb-5">{quiet.eyebrow}</Eyebrow>
        <Heading lead={quiet.title} muted={quiet.titleMuted} className={H2} />
      </div>

      <div ref={root} className="mt-16 grid gap-px overflow-hidden rounded-[24px] bg-hairline lg:mt-20 lg:grid-cols-4">
        {ITEMS.map((item, i) => {
          const Glyph = GLYPHS[item.id];
          const f = share(i, n);
          return (
            <div key={item.id} className="flex flex-col bg-canvas p-7" style={{ ["--f" as string]: f }}>
              <p className="font-mono text-label text-ink-faint tabular-nums">{String(i + 1).padStart(3, "0")}</p>
              <p className="mt-8 min-h-[72px] text-[16px]/[1.55] text-ink-soft">{item.body}</p>

              {/* The rail. It fills across the cell, then hands on to the next. */}
              <div className="mt-6 h-px w-full bg-hairline">
                <div className="h-px origin-left bg-ink" style={{ transform: "scaleX(var(--f))", transition: `transform 120ms linear` }} />
              </div>

              <p
                className="mt-6 text-[21px]/[1.25] font-light transition-colors duration-500"
                style={{ color: `color-mix(in oklch, var(--ink) calc(var(--f) * 100%), var(--ink-faint))`, transitionTimingFunction: EASE }}
              >
                {item.title}
              </p>
              <div className="mt-auto flex justify-end pt-8">
                <Glyph className="size-[76px] [--l:var(--f)]" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── 2 · One rail across the whole band, on the dotted ground ───────────────
function OptionTwo() {
  const root = useProgress<HTMLDivElement>();
  const n = ITEMS.length;
  return (
    <section className={`${WRAP} ${SECTION}`}>
      <div className="max-w-[720px]">
        <Eyebrow className="mb-5">{quiet.eyebrow}</Eyebrow>
        <Heading lead={quiet.title} muted={quiet.titleMuted} className={H2} />
      </div>

      <div ref={root} className="mt-16 lg:mt-20">
        <div className="grid gap-8 lg:grid-cols-4">
          {ITEMS.map((item, i) => (
            <div key={item.id} style={{ ["--f" as string]: share(i, n) }}>
              <p className="font-mono text-label text-ink-faint tabular-nums">{String(i + 1).padStart(3, "0")}</p>
              <p className="mt-6 min-h-[80px] max-w-[34ch] text-[16px]/[1.55] text-ink-soft">{item.body}</p>
            </div>
          ))}
        </div>

        {/* One continuous rail on a dot field, with a dash riding the front. */}
        <div className="dots relative mt-7 h-12 w-full">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-hairline" />
          <div
            className="absolute top-1/2 left-0 h-[3px] -translate-y-1/2 rounded-full bg-ink"
            style={{ width: "calc(var(--p, 0) * 100%)", transition: "width 120ms linear" }}
          />
          <div
            className="absolute top-1/2 size-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
            style={{ left: "calc(var(--p, 0) * 100%)", transition: "left 120ms linear" }}
          />
        </div>

        <div className="mt-7 grid gap-8 lg:grid-cols-4">
          {ITEMS.map((item, i) => {
            const Glyph = GLYPHS[item.id];
            return (
              <div key={item.id} style={{ ["--f" as string]: share(i, n) }}>
                <p
                  className="text-[21px]/[1.25] font-light"
                  style={{ color: `color-mix(in oklch, var(--ink) calc(var(--f) * 100%), var(--ink-faint))`, transition: `color 500ms ${EASE}` }}
                >
                  {item.title}
                </p>
                <div className="mt-6">
                  <Glyph className="size-[76px] [--l:var(--f)]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── 3 · The glyph leads, the words follow ─────────────────────────────────
function OptionThree() {
  const root = useProgress<HTMLDivElement>();
  const n = ITEMS.length;
  return (
    <section className={`${WRAP} ${SECTION}`}>
      <div className="max-w-[720px]">
        <Eyebrow className="mb-5">{quiet.eyebrow}</Eyebrow>
        <Heading lead={quiet.title} muted={quiet.titleMuted} className={H2} />
      </div>

      <div ref={root} className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-4 lg:gap-6">
        {ITEMS.map((item, i) => {
          const Glyph = GLYPHS[item.id];
          return (
            <div key={item.id} className="flex flex-col" style={{ ["--f" as string]: share(i, n) }}>
              <div className="flex items-start justify-between">
                <Glyph className="size-[96px] [--l:var(--f)]" />
                <p className="font-mono text-label text-ink-faint tabular-nums">{String(i + 1).padStart(3, "0")}</p>
              </div>
              {/* A short rule under the glyph, filling as the scroll reaches it. */}
              <div className="mt-7 h-px w-full bg-hairline">
                <div className="h-px origin-left bg-ink" style={{ transform: "scaleX(var(--f))", transition: "transform 120ms linear" }} />
              </div>
              <p
                className="mt-6 text-[22px]/[1.22] font-light"
                style={{ color: `color-mix(in oklch, var(--ink) calc(var(--f) * 100%), var(--ink-faint))`, transition: `color 500ms ${EASE}` }}
              >
                {item.title}
              </p>
              <p className="mt-3 max-w-[34ch] text-[16px]/[1.55] text-ink-soft">{item.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function QuietOptions() {
  const options: [string, React.ReactNode][] = [
    ["1 · Cells, with the rail running through them", <OptionOne key="1" />],
    ["2 · One rail across the band, on the dot field", <OptionTwo key="2" />],
    ["3 · The glyph leads", <OptionThree key="3" />],
  ];
  return (
    <main>
      {options.map(([label, node], i) => (
        <section key={label} data-shot={`quiet-${i + 1}`} className="border-t border-hairline">
          <p className="px-8 pt-10 font-mono text-label text-ink-faint uppercase">{label}</p>
          {node}
        </section>
      ))}
      <div className="h-[60vh]" />
    </main>
  );
}
