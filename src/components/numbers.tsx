"use client";

import { numbers } from "@/content/site";
import { useLoop } from "./features/timeline";
import { Eyebrow, H2, Heading, SECTION, WRAP } from "./ui";

/**
 * A quiet band: what the product counts, and what it works with. The figures
 * count up once, staggered, when the band arrives — the only counting on the
 * page, so it stays a small surprise rather than a habit.
 */
export function Numbers() {
  const root = useLoop<HTMLDListElement>(
    (tl, q) => {
      q("[data-count]").forEach((el, i) => {
        const to = Number(el.getAttribute("data-count"));
        const n = { v: 0 };
        tl.to(
          n,
          {
            v: to,
            duration: 1.1,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = String(Math.round(n.v));
            },
          },
          0.1 + i * 0.12,
        );
      });
    },
    // Counted once, on arrival, and then left alone.
    { rest: 1, repeat: 0 },
  );

  return (
    <section className={`${WRAP} ${SECTION}`} aria-label="In numbers">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Eyebrow className="mb-5">{numbers.eyebrow}</Eyebrow>
          <Heading lead={numbers.title} className={H2} />
        </div>
        <p className="max-w-[360px] text-[17px]/[1.55] text-ink-soft">{numbers.works}</p>
      </div>

      <dl ref={root} className="mt-16 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-8">
        {numbers.items.map((item) => (
          <div key={item.label} className="border-t border-hairline pt-6">
            <dd className="text-[52px]/[1] font-light tracking-[-0.03em] text-ink tabular-nums xl:text-[64px]/[1]">
              <span data-count={item.value}>{item.value}</span>
            </dd>
            <dt className="mt-3 text-[19px] text-ink">{item.label}</dt>
            <p className="mt-1.5 text-[16px]/[1.5] text-ink-soft">{item.note}</p>
          </div>
        ))}
      </dl>
    </section>
  );
}
