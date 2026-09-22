"use client";

import { useId, useState } from "react";
import { Add01Icon } from "@hugeicons/core-free-icons";
import { faq } from "@/content/site";
import { Eyebrow, H2, Heading, Icon, SECTION, WRAP } from "./ui";

/**
 * Section 7: the questions, centred, to settle into the same rhythm as the
 * booking section above and the closing below. One answer is open at a time;
 * it opens by height (a 0fr → 1fr grid row, which animates smoothly whatever
 * the answer's length) while the plus turns into a cross.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const id = useId();

  return (
    <section id="questions" className={`${WRAP} ${SECTION} scroll-mt-24 text-center`}>
      <Eyebrow className="mb-5">{faq.eyebrow}</Eyebrow>
      <Heading lead={faq.title} muted={faq.titleMuted} className={H2} />

      <div className="mx-auto mt-16 max-w-[860px] text-left">
        {faq.items.map((item, i) => {
          const on = open === i;
          return (
            <div key={item.q} className={i ? "border-t border-hairline" : ""}>
              <h3>
                <button
                  onClick={() => setOpen(on ? null : i)}
                  aria-expanded={on}
                  aria-controls={`${id}-${i}`}
                  className="flex w-full items-center justify-between gap-10 py-7 text-left"
                >
                  <span className="text-[22px]/[1.3] text-ink sm:text-[25px]/[1.3]">{item.q}</span>
                  <Icon
                    icon={Add01Icon}
                    className={`size-[22px] shrink-0 text-ink-soft transition-transform duration-300 ease-out ${on ? "rotate-45" : ""}`}
                  />
                </button>
              </h3>
              <div
                id={`${id}-${i}`}
                role="region"
                className={`grid transition-[grid-template-rows,opacity] duration-400 ease-out ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              >
                <p className="overflow-hidden">
                  <span className="block max-w-[66ch] pb-7 text-[17px]/[1.6] text-ink-soft sm:text-[18px]/[1.6]">{item.a}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-12 text-[18px] text-ink-soft">
        {faq.more}{" "}
        <a href={`mailto:${faq.email}`} className="text-ink underline-offset-4 hover:underline">
          {faq.email}
        </a>
      </p>
    </section>
  );
}
