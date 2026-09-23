"use client";

import { useId, useState } from "react";
import { Add01Icon } from "@hugeicons/core-free-icons";
import { faq } from "@/content/site";
import { EASE, Eyebrow, H2, Heading, Icon, SECTION, UNDERLINE, WRAP } from "./ui";

/**
 * Section 7: the questions. One answer is open at a time, and the open row
 * lifts onto its own raised panel rather than colouring itself in — depth here
 * is luminance, never a tint (contract #5). Sage lands only on the control,
 * which is the one thing you press.
 *
 * The opening is slow on purpose: a 0fr → 1fr grid row over 560ms on the
 * page's own curve, so the answer unfolds rather than snapping open. Numbers
 * run down the left so a long list still reads as a list.
 */
export function Faq({ className = SECTION }: { className?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const id = useId();

  return (
    <section id="questions" className={`${WRAP} ${className} scroll-mt-24`}>
      <div className="text-center">
        <Eyebrow className="mb-5">{faq.eyebrow}</Eyebrow>
        <Heading lead={faq.title} muted={faq.titleMuted} className={H2} />
      </div>

      <div className="mx-auto mt-16 max-w-[900px]">
        {faq.items.map((item, i) => {
          const on = open === i;
          return (
            <div key={item.q} className="border-t border-hairline">
              <div
                className={`transition-[background-color,box-shadow] duration-500 ${on ? "dots bg-raised shadow-raised" : "bg-transparent"}`}
                style={{ transitionTimingFunction: EASE }}
              >
                <h3>
                  <button
                    onClick={() => setOpen(on ? null : i)}
                    aria-expanded={on}
                    aria-controls={`${id}-${i}`}
                    className="group flex w-full items-center gap-5 px-5 py-7 text-left sm:gap-8 sm:px-7"
                  >
                    <span
                      aria-hidden="true"
                      className={`hidden w-9 shrink-0 font-mono text-label tabular-nums transition-colors duration-500 sm:block ${on ? "text-ink-soft" : "text-ink-faint"}`}
                      style={{ transitionTimingFunction: EASE }}
                    >
                      {String(i + 1).padStart(3, "0")}
                    </span>
                    <span
                      className={`flex-1 text-[22px]/[1.3] transition-colors duration-500 sm:text-[25px]/[1.3] ${on ? "text-ink" : "text-ink-soft group-hover:text-ink"}`}
                      style={{ transitionTimingFunction: EASE }}
                    >
                      {item.q}
                    </span>
                    <span
                      className={`grid size-10 shrink-0 place-items-center rounded-full transition-[background-color,color,transform] duration-500 ${
                        on ? "bg-action text-action-foreground" : "bg-overlay text-ink-soft group-hover:bg-overlay-hover group-hover:text-ink"
                      }`}
                      style={{ transitionTimingFunction: EASE, transform: on ? "rotate(135deg)" : "rotate(0deg)" }}
                    >
                      <Icon icon={Add01Icon} className="size-[19px]" />
                    </span>
                  </button>
                </h3>

                <div
                  id={`${id}-${i}`}
                  role="region"
                  className={`grid transition-[grid-template-rows,opacity] duration-[560ms] ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  style={{ transitionTimingFunction: EASE }}
                >
                  <div className="overflow-hidden">
                    {/* 96px lines the answer up with the question: the row's
                        28px padding, the 36px number, and the 32px gap. */}
                    <p className="max-w-[72ch] px-5 pb-8 text-[17px]/[1.65] text-ink-soft sm:pr-16 sm:pl-[96px] sm:text-[18px]/[1.65]">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="border-t border-hairline" />
      </div>

      <p className="mt-12 text-center text-[18px] text-ink-soft">
        {faq.more}{" "}
        <a href={`mailto:${faq.email}`} className={`${UNDERLINE} text-ink`}>
          {faq.email}
        </a>
      </p>
    </section>
  );
}
