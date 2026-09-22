"use client";

import { Fragment, useEffect, useState, useSyncExternalStore } from "react";
import { Note01Icon, SparklesIcon, Calendar03Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { hero } from "@/content/site";
import { Icon } from "./ui";

const live = hero.live;
const [notes, prompter, follow] = live.scenes;
const SCENE_MS = 6500;

/** Words written in one after another, as the app streams an answer. */
export function Written({ text, delay = 0, step = 55 }: { text: string; delay?: number; step?: number }) {
  return text.split(" ").map((w, i) => (
    <Fragment key={i}>
      {i > 0 && " "}
      <span className="inline-block animate-word" style={{ animationDelay: `${delay + i * step}ms` }}>
        {w}
      </span>
    </Fragment>
  ));
}

function Said({ speaker, text }: { speaker: string; text: string }) {
  return (
    <p className="text-[15px]/[1.45] text-ink-soft">
      <span className="font-medium text-ink">{speaker}</span> said “<Written text={text} step={45} />”
    </p>
  );
}

const REDUCE = "(prefers-reduced-motion: reduce)";
function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const m = matchMedia(REDUCE);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => matchMedia(REDUCE).matches,
    () => false,
  );
}

function useElapsed(start: number) {
  const [s, setS] = useState(start);
  useEffect(() => {
    const t = setInterval(() => setS((v) => v + 1), 1000);
    return () => clearInterval(t);
  }, []);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/**
 * One meeting, played through what Morse does in it: an action item written
 * from what was said, a question answered from notes, a follow-up booked.
 * The segments under it are the timeline: the filling one is the scene
 * playing, and each can be pressed to jump to it. Hovering holds the scene.
 */
export function LiveCard({ className = "" }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);
  const elapsed = useElapsed(live.startSeconds);
  // Without motion nothing advances on its own; the segments still switch scenes.
  const still = useReducedMotion();
  const scene = live.scenes[index];

  return (
    <div
      className={`w-[400px] rounded-[26px] bg-float/95 px-5 pt-4 pb-4 shadow-float backdrop-blur-sm ${className}`}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      aria-label="A meeting in Morse, played as an example"
      role="group"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="truncate text-[15px] text-ink-soft">{live.meeting}</p>
        <p className="flex shrink-0 items-center gap-2 text-[14px] text-signal tabular-nums">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-signal opacity-60" />
            <span className="relative size-2 rounded-full bg-signal" />
          </span>
          {live.recording} {elapsed}
        </p>
      </div>

      <div key={scene.id} className="mt-3.5 min-h-[152px]" aria-live="polite">
        {scene.id === "notes" && (
          <>
            <Said speaker={notes.speaker} text={notes.text} />
            <div
              className="mt-3 flex animate-rise items-center gap-3 rounded-[16px] bg-sunken px-3.5 py-3 shadow-sunken"
              style={{ animationDelay: "1300ms" }}
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-action text-action-foreground">
                <Icon icon={Note01Icon} className="size-[17px]" />
              </span>
              <p className="min-w-0 text-[15px]/[1.35]">
                <span className="block text-ink-faint">{notes.result.lead}</span>
                <span className="block truncate text-ink">{notes.result.text}</span>
              </p>
            </div>
          </>
        )}

        {scene.id === "teleprompter" && (
          <>
            <p className="text-[15px]/[1.45] text-ink-soft">
              <span className="font-medium text-ink">{prompter.speaker}</span> asked “{prompter.question}”
            </p>
            <div className="mt-3 rounded-[16px] bg-sunken px-3.5 py-3 shadow-sunken">
              <p className="flex items-center gap-1.5 text-[13px] text-ink-faint">
                <Icon icon={SparklesIcon} className="size-[15px]" />
                {prompter.label}
              </p>
              <p className="mt-1 text-[17px]/[1.4] text-ink">
                <Written text={prompter.answer} delay={500} />
              </p>
              <p className="mt-1.5 animate-rise text-[13px] text-ink-faint" style={{ animationDelay: "1300ms" }}>
                From {prompter.source}
              </p>
            </div>
          </>
        )}

        {scene.id === "follow-up" && (
          <>
            <Said speaker={follow.speaker} text={follow.text} />
            <div className="mt-3 animate-rise rounded-[16px] bg-sunken px-3.5 py-3 shadow-sunken" style={{ animationDelay: "900ms" }}>
              <div className="flex items-center justify-between gap-3">
                <p className="flex min-w-0 items-center gap-2.5 text-[15px] text-ink">
                  <Icon icon={Calendar03Icon} className="size-[18px] shrink-0 text-ink-soft" />
                  <span className="truncate">
                    {follow.title} <span className="text-ink-soft tabular-nums">{follow.time}</span>
                  </span>
                </p>
              </div>
              {/* Book is pressed for you partway through, then gives way to what happened. */}
              <div className="relative mt-3 h-9">
                <div className="absolute inset-0 flex gap-2 [animation:fade-out_240ms_ease-in_3400ms_both]">
                  <span className="grid flex-1 place-items-center rounded-full bg-action text-[15px] font-medium text-action-foreground [animation:press_300ms_ease-out_3100ms_both]">
                    {follow.book}
                  </span>
                  <span className="grid flex-1 place-items-center rounded-full bg-overlay text-[15px] text-ink">{follow.skip}</span>
                </div>
                <p
                  className="absolute inset-0 flex animate-rise items-center gap-2 text-[15px] text-ink"
                  style={{ animationDelay: "3600ms" }}
                >
                  <span className="grid size-6 place-items-center rounded-full bg-action text-action-foreground">
                    <Icon icon={Tick02Icon} className="size-3.5" />
                  </span>
                  {follow.booked}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-3 flex gap-1.5" role="tablist" aria-label="Scenes">
        {live.scenes.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={i === index}
            onClick={() => setIndex(i)}
            className="group flex-1 pt-2 text-left"
          >
            <span className="block h-[3px] overflow-hidden rounded-full bg-overlay">
              <span
                key={i === index ? `on-${index}` : "off"}
                onAnimationEnd={() => setIndex((index + 1) % live.scenes.length)}
                className={`block h-full origin-left rounded-full ${i < index ? "bg-ink-soft" : i === index ? "bg-ink" : ""}`}
                style={
                  i === index && !still
                    ? { animation: `fill ${SCENE_MS}ms linear both`, animationPlayState: held ? "paused" : "running" }
                    : undefined
                }
              />
            </span>
            <span className={`mt-1.5 block text-[13px] transition-colors ${i === index ? "text-ink" : "text-ink-faint group-hover:text-ink-soft"}`}>
              {s.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
