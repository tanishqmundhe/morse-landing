"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Tick02Icon } from "@hugeicons/core-free-icons";
import { links, pricing } from "@/content/site";
import { EASE, Icon, PRIMARY, SECONDARY } from "../ui";

const { billing, plans } = pricing;

/** Monthly or yearly, with the highlight sliding between them as the nav's does. */
function Toggle({ yearly, onChange }: { yearly: boolean; onChange: (v: boolean) => void }) {
  const [mark, setMark] = useState<{ x: number; w: number } | null>(null);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  useLayoutEffect(() => {
    const el = refs.current[yearly ? 1 : 0];
    if (el) setMark({ x: el.offsetLeft, w: el.offsetWidth });
  }, [yearly]);

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="relative flex rounded-full bg-overlay p-1.5">
        <span
          aria-hidden="true"
          className="absolute top-1.5 bottom-1.5 left-0 rounded-full bg-raised shadow-raised transition-[transform,width] duration-500"
          style={{ transform: `translateX(${mark?.x ?? 0}px)`, width: mark?.w ?? 0, transitionTimingFunction: EASE }}
        />
        {[billing.monthly, billing.yearly].map((label, i) => (
          <button
            key={label}
            ref={(el) => {
              refs.current[i] = el;
            }}
            onClick={() => onChange(i === 1)}
            aria-pressed={yearly === (i === 1)}
            className={`relative rounded-full px-6 py-2.5 text-[16px] transition-colors duration-300 ${
              yearly === (i === 1) ? "text-ink" : "text-ink-soft hover:text-ink"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <span className="font-mono text-label text-action uppercase">{billing.save}</span>
    </div>
  );
}

/** A price, with the pennies set back so the number reads first. */
function Price({ value, yearly }: { value: number; yearly: boolean }) {
  if (value === 0) {
    return <p className="text-[52px]/[1] font-light tracking-[-0.03em] text-ink xl:text-[58px]/[1]">Free</p>;
  }
  return (
    <div>
      <p className="flex items-baseline text-[52px]/[1] font-light tracking-[-0.03em] text-ink tabular-nums xl:text-[58px]/[1]">
        <span>${value}</span>
        <span className="text-ink-faint">.00</span>
        <span className="ml-2 text-[17px] tracking-normal text-ink-soft">{billing.per}</span>
      </p>
      <p className="mt-2 h-5 text-[15px] text-ink-faint">{yearly ? billing.note : ""}</p>
    </div>
  );
}

export function Plans() {
  const [yearly, setYearly] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
        <p className="text-[26px]/[1.2] font-light text-ink sm:text-[30px]/[1.18]">{billing.title}</p>
        <Toggle yearly={yearly} onChange={setYearly} />
      </div>

      <div className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-3">
        {plans.map((plan) => {
          const lifted = "popular" in plan && plan.popular;
          return (
            <div
              key={plan.id}
              className={`flex flex-col rounded-[28px] transition-colors duration-500 ${lifted ? "bg-float shadow-float" : "bg-raised shadow-raised"}`}
              style={{ transitionTimingFunction: EASE }}
            >
              <div className="p-8 lg:p-9">
                {/* The chosen plan says so; the others keep the space so all three line up. */}
                <p className="h-5 font-mono text-label text-action uppercase">{lifted ? plan.popular : ""}</p>
                <p className="mt-6 text-[30px]/[1.15] font-light text-ink">{plan.name}</p>
                <p className="mt-2.5 min-h-[52px] max-w-[30ch] text-[17px]/[1.5] text-ink-soft">{plan.tagline}</p>

                <div className="mt-8">
                  <Price value={yearly ? plan.price.yearly : plan.price.monthly} yearly={yearly} />
                </div>

                <a href={links.app} className={`${lifted ? PRIMARY : SECONDARY} mt-8 w-full`}>
                  {plan.cta}
                </a>
              </div>

              <div className="border-t border-hairline p-8 lg:p-9">
                <p className="text-[16px] text-ink-soft">{plan.includesLead}</p>
                <ul className="mt-5 flex flex-col gap-3.5">
                  {plan.includes.map((line) => (
                    <li key={line} className="flex gap-3.5 text-[17px]/[1.45] text-ink">
                      <Icon icon={Tick02Icon} className="mt-1 size-[18px] shrink-0 text-ink-faint" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
