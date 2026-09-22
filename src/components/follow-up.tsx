"use client";

import { useState } from "react";
import { Calendar03Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { followUp } from "@/content/site";
import { Eyebrow, H2, Heading, Icon, PRIMARY, SECONDARY, WRAP } from "./ui";

type Choice = "open" | "booked" | "skipped";

/** The app's proposal card (proposal-card.tsx): nothing happens until you press Book. */
export function FollowUp() {
  const c = followUp.card;
  const [choice, setChoice] = useState<Choice>("open");

  return (
    <section className={`${WRAP} grid items-center gap-12 border-t border-hairline py-20 lg:grid-cols-2 lg:gap-16 lg:py-28`}>
      <div>
        <Eyebrow className="mb-5">{followUp.eyebrow}</Eyebrow>
        <Heading lead={followUp.title} muted={followUp.titleMuted} className={H2} />
        <p className="mt-6 max-w-md text-[18px]/[1.55] text-ink-soft">{followUp.body}</p>
      </div>

      <div className="mx-auto w-full max-w-[460px]">
        <div className="rounded-[26px] bg-float px-6 py-5 shadow-float">
          <p className="text-[15px]/[1.4] text-ink-soft">
            <span className="font-medium text-ink">{followUp.said.name}</span> said “{followUp.said.text}”
          </p>
          <div className="mt-4 flex items-center gap-3">
            <Icon icon={Calendar03Icon} className="size-5 text-ink-soft" />
            <p className="text-[20px] text-ink">{c.title}</p>
          </div>
          <p className="mt-2 text-[17px] text-ink tabular-nums">{c.time}</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-[16px] text-ink-soft">
            <Icon icon={Tick02Icon} className="size-4" />
            {c.clash}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {c.invitees.map((name) => (
              <li key={name} className="flex items-center gap-2 rounded-full bg-overlay py-1 pr-3.5 pl-1 text-[15px] text-ink">
                <span className="grid size-7 place-items-center rounded-full bg-overlay-hover text-[12px]">
                  {name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                {name}
              </li>
            ))}
          </ul>
          <div className="mt-5 min-h-12" aria-live="polite">
            {choice === "open" ? (
              <div className="flex gap-2">
                <button className={`${PRIMARY} h-11 flex-1`} onClick={() => setChoice("booked")}>
                  {c.book}
                </button>
                <button className={`${SECONDARY} h-11 flex-1`} onClick={() => setChoice("skipped")}>
                  {c.skip}
                </button>
              </div>
            ) : (
              <div className="flex animate-rise items-center justify-between gap-4">
                <p className={`text-[16px] ${choice === "booked" ? "text-ink" : "text-ink-faint"}`}>
                  {choice === "booked" ? c.booked : c.skipped}
                </p>
                <button onClick={() => setChoice("open")} className="shrink-0 text-[15px] text-ink-soft underline-offset-4 hover:text-ink hover:underline">
                  Try again
                </button>
              </div>
            )}
          </div>
        </div>
        <p className="mt-4 text-center text-[15px] text-ink-faint">{followUp.caption}</p>
      </div>
    </section>
  );
}
