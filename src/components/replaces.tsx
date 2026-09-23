"use client";

import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { replaces } from "@/content/site";
import { useLoop } from "./features/timeline";
import { LogoMark } from "./logo";
import { CARD, Eyebrow, H2, Heading, Icon, LEAD, SECTION, WRAP } from "./ui";

/**
 * Between the hero and the product: five things you pay for separately,
 * collapsing into one. The staircase of indents is the argument — five ragged
 * rows, each a little further out and a little dimmer than the last, and one
 * card squared up underneath them.
 *
 * It plays once on arrival and then stays put (`repeat: 0`): the five rows are
 * the information, so they have to be readable at rest. The crosses come in
 * after their rows, and Morse lands last. Under reduced motion the timeline
 * rests on its final frame, which is the same picture.
 */
export function Replaces() {
  const root = useLoop<HTMLUListElement>(
    (tl, q) => {
      const rows = q("[data-row]");
      tl.set(rows, { y: 18, opacity: 0 }, 0);
      tl.set(q("[data-x]"), { scale: 0, opacity: 0 }, 0);
      tl.set(q("[data-one]"), { y: 24, opacity: 0 }, 0);

      // Each row arrives at the opacity its depth in the stack gives it.
      rows.forEach((row, i) => {
        tl.to(row, { y: 0, opacity: 1 - i * 0.15, duration: 0.62, ease: "power2.out" }, 0.1 + i * 0.09);
      });
      tl.to(q("[data-x]"), { scale: 1, opacity: 1, duration: 0.34, stagger: 0.08, ease: "back.out(2.2)" }, 0.55);
      tl.to(q("[data-one]"), { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }, 1.15);
    },
    { rest: 1, repeat: 0 },
  );

  return (
    <section className={`${WRAP} ${SECTION}`} aria-label="What Morse stands in for">
      <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
        <div>
          <Eyebrow className="mb-5">{replaces.eyebrow}</Eyebrow>
          <Heading lead={replaces.title} muted={replaces.titleMuted} className={H2} />
          <p className={`${LEAD} mt-6 max-w-[440px]`}>{replaces.body}</p>
        </div>

        <ul ref={root} className="min-w-0">
          {replaces.items.map((item, i) => (
            <li
              key={item.kind}
              data-row
              // Two lines on a phone: side by side, the names have to truncate.
              className="mb-2.5 flex flex-col gap-1 rounded-[18px] bg-raised px-5 py-3.5 shadow-raised sm:flex-row sm:items-center sm:gap-4 sm:px-6 sm:py-4"
              style={{ marginLeft: `calc(${i} * clamp(0px, 1.8vw, 26px))` }}
            >
              <span className="flex items-center gap-4">
                <span data-x className="shrink-0 text-ink-faint">
                  <Icon icon={Cancel01Icon} className="size-[18px]" />
                </span>
                <span className="text-[17px] text-ink-soft">{item.kind}</span>
              </span>
              <span className="pl-[34px] font-mono text-[13px] tracking-[0.02em] text-ink-faint uppercase sm:ml-auto sm:shrink-0 sm:pl-0">
                {item.tools}
              </span>
            </li>
          ))}

          <li data-one className={`${CARD} mt-6 flex items-center gap-4 px-5 py-5 sm:px-6`}>
            <LogoMark className="size-7 shrink-0 text-ink" />
            <span className="text-[18px] text-ink sm:text-[19px]">{replaces.one}</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
