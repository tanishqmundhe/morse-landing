"use client";

import { useEffect, useRef, useState } from "react";
import { Add01Icon, PlayIcon, RepeatIcon } from "@hugeicons/core-free-icons";
import { teleprompter, yours } from "@/content/site";
import { CARD, Eyebrow, Heading, Icon, Lines, SECTION, WRAP } from "./ui";

export function Personal() {
  return (
    <section id="teleprompter" className={`${WRAP} ${SECTION} grid scroll-mt-24 gap-5 lg:grid-cols-[1.15fr_1fr]`}>
      <Teleprompter />
      <MakeItYours />
    </section>
  );
}

type Phase = "idle" | "asked" | "looking" | "answering" | "done";

/**
 * The teleprompter as the app draws it (prompter-card.tsx): who asked and what,
 * small; "Looking in your notes" with the three sequenced dots; the answer
 * written in; where it came from. Plays once when it scrolls into view.
 */
function Teleprompter() {
  const c = teleprompter.card;
  const words = c.answer.split(" ");
  const [phase, setPhase] = useState<Phase>("idle");
  const [shown, setShown] = useState(0);
  const root = useRef<HTMLElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  function clear() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }

  function play() {
    clear();
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(words.length);
      setPhase("done");
      return;
    }
    setShown(0);
    setPhase("asked");
    const at = (ms: number, fn: () => void) => timers.current.push(setTimeout(fn, ms));
    at(700, () => setPhase("looking"));
    at(2100, () => setPhase("answering"));
    words.forEach((_, i) => at(2100 + i * 90, () => setShown(i + 1)));
    at(2100 + words.length * 90 + 200, () => setPhase("done"));
  }

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play();
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clear();
    };
    // Runs once: the observer only needs to start the first play.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <article ref={root} className={`${CARD} flex flex-col p-7 sm:p-8`}>
      <div className="flex items-center justify-between gap-4">
        <Eyebrow>{teleprompter.eyebrow}</Eyebrow>
        <button
          onClick={play}
          disabled={phase !== "idle" && phase !== "done"}
          className="inline-flex h-9 items-center gap-1.5 rounded-full bg-overlay px-4 text-[15px] text-ink transition-colors hover:bg-overlay-hover disabled:opacity-40"
        >
          <Icon icon={phase === "done" ? RepeatIcon : PlayIcon} className="size-4" />
          {phase === "done" ? teleprompter.replay : teleprompter.play}
        </button>
      </div>

      <div className="mt-6 min-h-[210px] rounded-[22px] bg-sunken px-5 py-5 shadow-sunken" aria-live="polite">
        {phase !== "idle" && (
          <div className="animate-rise">
            <p className="text-[15px]/[1.4] text-ink-soft">
              <span className="font-medium text-ink">{c.speaker}</span> asked “{c.question}”
            </p>
            {phase === "looking" && (
              <p className="mt-3 flex items-center gap-2.5 text-[17px] text-ink-soft">
                <span aria-hidden="true" className="inline-flex gap-1.5">
                  <i className="size-1.5 animate-blink rounded-full bg-current" />
                  <i className="size-1.5 animate-blink rounded-full bg-current [animation-delay:200ms]" />
                  <i className="size-1.5 animate-blink rounded-full bg-current [animation-delay:400ms]" />
                </span>
                {c.looking}
              </p>
            )}
            {(phase === "answering" || phase === "done") && (
              <>
                <p className="mt-2 text-[21px]/[1.45] text-ink">{words.slice(0, shown).join(" ")}</p>
                {phase === "done" && <p className="mt-3 animate-rise text-[15px] text-ink-faint">From {c.source}</p>}
              </>
            )}
          </div>
        )}
      </div>

      <h3 className="mt-8 text-[27px]/[1.2] font-light text-ink">
        <Lines text={teleprompter.title} />
      </h3>
      <p className="mt-3 max-w-lg text-[17px]/[1.55] text-ink-soft">{teleprompter.body}</p>
    </article>
  );
}

function MakeItYours() {
  const [accent, setAccent] = useState(yours.accents[0]);
  const color = `var(--accent-${accent.id})`;

  return (
    <article className={`${CARD} flex flex-col p-7 sm:p-8`}>
      <Eyebrow>{yours.eyebrow}</Eyebrow>

      <div className="mt-6 min-h-[210px] rounded-[22px] bg-sunken px-6 py-5 shadow-sunken">
        <p className="text-[19px] font-light text-ink-soft">{yours.greeting}</p>
        <p className="text-[44px]/[1.1] font-light tracking-[-0.02em] text-ink">{yours.name}</p>
        <span
          className="mt-5 inline-flex h-11 items-center gap-2 rounded-full px-5 text-[16px] font-medium text-[#1a1510] transition-colors duration-300"
          style={{ background: color }}
        >
          <Icon icon={Add01Icon} className="size-[18px]" />
          {yours.button}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div role="radiogroup" aria-label="Accent colour" className="flex gap-2.5">
          {yours.accents.map((a) => (
            <button
              key={a.id}
              role="radio"
              aria-checked={a.id === accent.id}
              aria-label={a.label}
              onClick={() => setAccent(a)}
              className={`size-7 rounded-full ring-offset-2 ring-offset-raised transition-shadow ${
                a.id === accent.id ? "ring-2 ring-ink" : ""
              }`}
              style={{ background: `var(--accent-${a.id})` }}
            />
          ))}
        </div>
        <span className="text-[16px] text-ink-soft">{accent.label}</span>
      </div>

      <Heading lead={yours.title} muted={yours.titleMuted} className="mt-8 text-[27px]/[1.2]" />
      <p className="mt-3 text-[17px]/[1.55] text-ink-soft">{yours.body}</p>
      <p className="mt-4 text-[15px]/[1.5] text-ink-faint">Camera styles: {yours.styles.join(", ")}</p>
    </article>
  );
}
