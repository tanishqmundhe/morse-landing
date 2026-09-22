"use client";

import { useRef, useState } from "react";
import { Calendar03Icon, Globe02Icon, Tick02Icon, Video01Icon } from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";
import { how, type Stage } from "@/content/site";
import { CARD, Eyebrow, H2, Heading, Icon, WRAP } from "./ui";

const ROW_ICONS: Record<string, IconSvgElement> = {
  globe: Globe02Icon,
  calendar: Calendar03Icon,
  video: Video01Icon,
};

export function HowItWorks() {
  const [stage, setStage] = useState<Stage>(how.defaultStage);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const count = how.tabs.length;

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    let next: number;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % count;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i + count - 1) % count;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = count - 1;
    else return;
    e.preventDefault();
    setStage(how.tabs[next].stage);
    tabs.current[next]?.focus();
  }

  return (
    <section id="how" className={`${WRAP} scroll-mt-6 py-20 lg:py-28`}>
      <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
        <div>
          <Eyebrow className="mb-5">{how.eyebrow}</Eyebrow>
          <Heading lead={how.title} muted={how.titleMuted} className={H2} />
        </div>
        <p className="max-w-md text-[18px]/[1.55] text-ink-soft lg:justify-self-end">{how.body}</p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
        <div role="tablist" aria-label="Before, during and after a meeting" aria-orientation="vertical" className="flex flex-col gap-1">
          {how.tabs.map((tab, i) => {
            const selected = tab.stage === stage;
            return (
              <button
                key={tab.stage}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`tab-${tab.stage}`}
                aria-controls="how-panel"
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                onClick={() => setStage(tab.stage)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`flex gap-5 rounded-[22px] px-5 py-5 text-left transition-colors ${
                  selected ? "bg-raised shadow-raised" : "hover:bg-raised/50"
                }`}
              >
                <span className="pt-1 font-mono text-label text-ink-faint tabular-nums">0{i + 1}</span>
                <span>
                  <span className={`block text-[19px]/[1.35] ${selected ? "text-ink" : "text-ink-soft"}`}>{tab.title}</span>
                  <span className="mt-1 block text-[16px]/[1.45] text-ink-faint">{tab.sub}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div
          id="how-panel"
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={`tab-${stage}`}
          className={`${CARD} min-h-[400px] px-7 py-6 sm:px-8 sm:py-7`}
        >
          <div key={stage} className="animate-rise">
            <Panel stage={stage} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Panel({ stage }: { stage: Stage }) {
  if (stage === "before") {
    const p = how.panels.before;
    return (
      <>
        <Eyebrow className="flex items-center gap-2">
          <Icon icon={Tick02Icon} className="size-4 text-action" />
          {p.label}
        </Eyebrow>
        <h3 className="mt-4 text-[27px]/[1.2] font-light text-ink">{p.title}</h3>
        <p className="mt-1 text-[17px] text-ink-soft tabular-nums">{p.meta}</p>
        <ul className="mt-7 flex flex-col gap-2">
          {p.rows.map((row) => (
            <li key={row.text} className="flex items-center gap-4 rounded-[18px] bg-sunken px-4 py-3.5 shadow-sunken">
              <Icon icon={ROW_ICONS[row.icon]} className="size-5 shrink-0 text-ink-soft" />
              <span className="text-[17px] text-ink">{row.text}</span>
            </li>
          ))}
        </ul>
      </>
    );
  }

  if (stage === "during") {
    const p = how.panels.during;
    return (
      <>
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-[21px] text-ink">{p.title}</h3>
          {/* Coral and a pulse: recording is the one thing on screen that is live. */}
          <span className="flex items-center gap-2 font-mono text-label uppercase text-signal">
            <span className="size-2 animate-blink rounded-full bg-signal" aria-hidden="true" />
            {p.label}
          </span>
        </div>
        <ol className="mt-6 flex flex-col gap-5">
          {p.turns.map((turn, i) => (
            <li key={i}>
              <p className="flex items-baseline gap-2.5 text-[15px]">
                <span className="font-medium text-ink">{turn.name}</span>
                <span className="text-ink-faint tabular-nums">{turn.time}</span>
              </p>
              <p className="mt-0.5 text-[18px]/[1.5] text-ink-soft">{turn.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-7 text-[15px] text-ink-faint">{p.foot}</p>
      </>
    );
  }

  return <NotesPanel />;
}

function NotesPanel() {
  const p = how.panels.after;
  const [done, setDone] = useState<boolean[]>(p.actions.map(() => false));

  return (
    <>
      <Eyebrow>{p.label}</Eyebrow>
      <h3 className="mt-3 text-[21px] text-ink">{p.title}</h3>
      <p className="mt-2 text-[17px]/[1.55] text-ink-soft">{p.summary}</p>

      <Eyebrow className="mt-6">Decisions</Eyebrow>
      <ul className="mt-2.5 flex flex-col gap-1.5 text-[17px] text-ink">
        {p.decisions.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>

      <Eyebrow className="mt-6">Action items</Eyebrow>
      <ul className="mt-2 flex flex-col">
        {p.actions.map((a, i) => (
          <li key={a.task}>
            <label className="-mx-2 flex cursor-pointer items-center gap-3.5 rounded-[14px] px-2 py-2 hover:bg-overlay/50">
              <input
                type="checkbox"
                checked={done[i]}
                onChange={() => setDone(done.map((v, j) => (j === i ? !v : v)))}
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className={`grid size-[22px] shrink-0 place-items-center rounded-full transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-signal ${
                  done[i] ? "bg-action text-action-foreground" : "bg-overlay"
                }`}
              >
                {done[i] && <Icon icon={Tick02Icon} className="size-3.5" />}
              </span>
              <span className={`flex-1 text-[17px] transition-colors ${done[i] ? "text-ink-faint line-through" : "text-ink"}`}>
                {a.task}
              </span>
              <span className="text-[15px] text-ink-faint">
                {a.owner} · {a.due}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}
