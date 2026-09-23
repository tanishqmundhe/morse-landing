"use client";

import { EyeIcon, ShieldKeyIcon, SparklesIcon } from "@hugeicons/core-free-icons";
import { quiet } from "@/content/site";
import { useLoop } from "./features/timeline";
import { EASE, Eyebrow, H2, Heading, Icon, SECTION, WRAP } from "./ui";

const ICONS = { bot: EyeIcon, google: ShieldKeyIcon, counts: SparklesIcon };

/**
 * The band between the features and the booking page: what Morse does while
 * nobody is looking at it. Three plain facts over hairlines, with the counts
 * folded into the last one rather than given a stats band of their own.
 *
 * The only motion is those three figures, counting up once when the section
 * arrives and then staying put — a section about things you don't have to
 * watch shouldn't keep moving.
 */
export function Quiet() {
  const root = useLoop<HTMLDListElement>(
    (tl, q) => {
      q("[data-count]").forEach((el, i) => {
        const to = Number(el.getAttribute("data-count"));
        const n = { v: 0 };
        tl.to(
          n,
          {
            v: to,
            duration: 0.9,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = String(Math.round(n.v));
            },
          },
          0.1 + i * 0.1,
        );
      });
    },
    { rest: 1, repeat: 0 },
  );

  return (
    <section className={`${WRAP} ${SECTION}`} aria-label="The quiet part">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div>
          <Eyebrow className="mb-5">{quiet.eyebrow}</Eyebrow>
          <Heading lead={quiet.title} muted={quiet.titleMuted} className={H2} />
        </div>

        <dl ref={root}>
          {quiet.items.map((item) => (
            <div key={item.id} className="flex gap-5 border-t border-hairline py-8 first:border-t-0 first:pt-0 sm:gap-6">
              <Icon icon={ICONS[item.id as keyof typeof ICONS]} className="mt-1 size-6 shrink-0 text-ink-faint" />
              <div>
                <dt className="text-[22px]/[1.3] font-light text-ink sm:text-[25px]/[1.3]">
                  {"counts" in item && item.counts
                    ? item.counts.map((c, i) => (
                        <span key={c.label}>
                          {i > 0 && " "}
                          <span data-count={c.value} className="tabular-nums">
                            {c.value}
                          </span>{" "}
                          {c.label}
                        </span>
                      ))
                    : item.title}
                </dt>
                <dd
                  className="mt-2.5 max-w-[58ch] text-[17px]/[1.6] text-ink-soft transition-colors"
                  style={{ transitionTimingFunction: EASE }}
                >
                  {item.body}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
