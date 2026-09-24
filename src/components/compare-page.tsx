"use client";

import { useEffect, useRef, useState } from "react";
import { comparison, pricing } from "@/content/site";
import { BRANDS, type Brand } from "./brand-marks";
import { Eyebrow, LEAD, WRAP } from "./ui";

/**
 * What a meeting stack costs, against what Morse costs.
 *
 * Built the way Linear build `/switch`: a document, not a landing page. A
 * sticky numbered rail down the left, one narrow column of argument on the
 * right, hairlines between the parts and display type big enough to carry the
 * first screen on its own. The first pass was three plain sections stacked on
 * paper with a table in the middle of them — correct, and completely
 * forgettable.
 *
 * Three parts, in the order a sceptic reads them: the money, the seven jobs
 * one login replaces, and — last and deliberately — what Morse does not do.
 *
 * **The third part is why the first two are believable.** A comparison page
 * that only lists wins is an advert, and everyone can tell. Every line of it
 * is checked against the app the same way the home page's claims are, and it
 * names the competitor that does win each one.
 *
 * No tick-and-cross matrix against named rivals. A grid of red crosses under
 * somebody else's logo is a claim about their product that goes stale the week
 * they ship. What this page asserts is what things cost and what job they do —
 * both checkable, neither an opinion.
 */

const PARTS = [
  { id: "cost", label: "The cost" },
  { id: "jobs", label: "Seven jobs" },
  { id: "honest", label: "Where it loses" },
];

/** A tool's own mark, from the same list the home page's band runs on. */
function Mark({ brand }: { brand: Brand }) {
  return (
    <svg
      viewBox={brand.viewBox}
      aria-hidden="true"
      className={brand.wordmark ? "h-[11px] w-auto shrink-0 text-ink-soft" : "size-[18px] shrink-0 text-ink-soft"}
      dangerouslySetInnerHTML={{ __html: brand.svg }}
    />
  );
}

/** The seven jobs, grouped from `BRANDS` so the two lists cannot drift. */
function jobs() {
  const order: string[] = [];
  const by = new Map<string, Brand[]>();
  for (const brand of BRANDS) {
    if (!by.has(brand.cat)) {
      by.set(brand.cat, []);
      order.push(brand.cat);
    }
    by.get(brand.cat)!.push(brand);
  }
  return order.map((cat) => ({ cat, tools: by.get(cat)! }));
}

/** Which part is being read, for the rail. Whichever one crosses the top
 *  third, the same test the header's highlight used to use. */
function useCurrentPart() {
  const [current, setCurrent] = useState(PARTS[0].id);
  useEffect(() => {
    const onScroll = () => {
      let found = PARTS[0].id;
      for (const part of PARTS) {
        const el = document.getElementById(part.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.34) found = part.id;
      }
      setCurrent(found);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return current;
}

export function ComparePage() {
  const current = useCurrentPart();
  const rail = useRef<HTMLElement>(null);
  const pro = pricing.plans.find((p) => p.id === "pro");
  const studio = pricing.plans.find((p) => p.id === "studio");

  return (
    <>
      {/* The first screen is the headline and nothing else. */}
      <section className={`${WRAP} pt-40 pb-24 lg:pt-52 lg:pb-32`}>
        <Eyebrow className="mb-7">{comparison.eyebrow}</Eyebrow>
        <h1 className="max-w-[16ch] text-[56px]/[0.95] font-light tracking-[-0.04em] text-ink sm:text-[84px]/[0.93] lg:text-[104px]/[0.92] 2xl:text-[124px]/[0.91]">
          {comparison.title}
          <br />
          <span className="text-ink-soft">{comparison.titleMuted}</span>
        </h1>
        <p className={`${LEAD} mt-10 max-w-[46ch]`}>{comparison.lede}</p>
      </section>

      <div className={`${WRAP} pb-28 lg:pb-40`}>
        <div className="grid gap-16 lg:grid-cols-[minmax(0,220px)_minmax(0,1fr)] lg:gap-20">
          {/* The rail. It sticks; below lg it is a plain row at the top, because
              a contents list that cannot follow you is just a list. */}
          <nav ref={rail} aria-label="On this page" className="lg:sticky lg:top-32 lg:self-start">
            <p className="mb-5 font-mono text-label text-ink-faint uppercase">On this page</p>
            <ol className="flex flex-wrap gap-x-6 gap-y-3 lg:flex-col lg:gap-3">
              {PARTS.map((part, i) => (
                <li key={part.id}>
                  <a
                    href={`#${part.id}`}
                    aria-current={current === part.id ? "true" : undefined}
                    className={`inline-flex items-baseline gap-3 text-[17px] transition-colors duration-200 ${
                      current === part.id ? "text-ink" : "text-ink-faint hover:text-ink-soft"
                    }`}
                  >
                    <span className="font-mono text-label tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    {part.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="min-w-0 max-w-[720px]">
            {/* ── 01 · the money ───────────────────────────────────────── */}
            <section id="cost" className="scroll-mt-32 border-t border-hairline pt-10">
              <Eyebrow className="mb-5">{comparison.cost.eyebrow}</Eyebrow>
              <h2 className="text-[36px]/[1.1] font-light tracking-[-0.03em] text-ink sm:text-[44px]/[1.08]">
                {comparison.cost.title}
                <br />
                <span className="text-ink-soft">{comparison.cost.titleMuted}</span>
              </h2>

              {/* The number, before the table that explains it. Three boxes
                  against one is the whole argument, and it should be readable
                  from across the room before anybody reads a row. */}
              <div className="mt-12 grid items-stretch gap-4 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
                <div className="rounded-[22px] bg-raised p-7 shadow-raised">
                  <p className="font-mono text-label text-ink-faint uppercase">A stack</p>
                  <p className="mt-4 text-[44px]/[1] font-light tracking-[-0.03em] text-ink tabular-nums">
                    {comparison.cost.total.pay}
                  </p>
                  <p className="mt-1 text-[15px] text-ink-faint">per person, per month</p>
                  <ul className="mt-6 flex flex-col gap-2 text-[15px] text-ink-soft">
                    {comparison.cost.rows.map((row) => (
                      <li key={row.job} className="flex items-baseline justify-between gap-4">
                        <span>{row.job}</span>
                        <span className="tabular-nums">{row.pay}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid place-items-center text-[22px] text-ink-faint" aria-hidden="true">
                  <span className="max-sm:rotate-90">&rarr;</span>
                </div>

                <div className="rounded-[22px] bg-raised p-7 shadow-raised">
                  <p className="font-mono text-label text-ink-faint uppercase">Morse Pro</p>
                  <p className="mt-4 text-[44px]/[1] font-light tracking-[-0.03em] text-ink tabular-nums">
                    ${pro?.price.monthly}
                  </p>
                  <p className="mt-1 text-[15px] text-ink-faint">
                    per person, per month &middot; ${pro?.price.yearly} billed yearly
                  </p>
                  <ul className="mt-6 flex flex-col gap-2 text-[15px] text-ink-soft">
                    {comparison.cost.rows.map((row) => (
                      <li key={row.job} className="flex items-baseline justify-between gap-4">
                        <span>{row.job}</span>
                        {/* Not a tick: it is the same one subscription each
                            time, and three ticks would imply three things. */}
                        <span className="text-ink-faint">included</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* The detail, for anyone who wants to check the arithmetic. */}
              <dl className="mt-12 border-t border-hairline">
                {comparison.cost.rows.map((row) => (
                  <div key={row.job} className="grid gap-1 border-b border-hairline py-5 sm:grid-cols-[minmax(0,110px)_minmax(0,1fr)_auto] sm:items-baseline sm:gap-6">
                    <dt className="text-[17px] text-ink">{row.job}</dt>
                    <dd className="text-[16px]/[1.5] text-ink-soft">{row.buy}</dd>
                    <dd className="text-[17px] text-ink tabular-nums sm:text-right">{row.pay}</dd>
                  </div>
                ))}
                <div className="grid gap-1 border-b border-hairline py-5 sm:grid-cols-[minmax(0,110px)_minmax(0,1fr)_auto] sm:items-baseline sm:gap-6">
                  <dt className="text-[17px] text-ink">Morse Studio</dt>
                  <dd className="text-[16px]/[1.5] text-ink-soft">{comparison.cost.ours[1]?.buy}</dd>
                  <dd className="text-[17px] text-ink tabular-nums sm:text-right">${studio?.price.monthly}</dd>
                </div>
              </dl>

              {/* Where the numbers came from and when. A comparison table with
                  no date on it is asking to be believed on trust. */}
              <p className="mt-5 text-[15px] text-ink-faint">{comparison.checked}</p>
            </section>

            {/* ── 02 · the seven jobs ──────────────────────────────────── */}
            <section id="jobs" className="mt-24 scroll-mt-32 border-t border-hairline pt-10 lg:mt-32">
              <Eyebrow className="mb-5">{comparison.jobs.eyebrow}</Eyebrow>
              <h2 className="text-[36px]/[1.1] font-light tracking-[-0.03em] text-ink sm:text-[44px]/[1.08]">
                {comparison.jobs.title}
                <br />
                <span className="text-ink-soft">{comparison.jobs.titleMuted}</span>
              </h2>
              <p className={`${LEAD} mt-6`}>{comparison.jobs.body}</p>

              {/* Each tool as its own mark, from the same set the home page's
                  band runs on. A list of names was a wall of grey. */}
              <dl className="mt-12 border-t border-hairline">
                {jobs().map(({ cat, tools }) => (
                  <div key={cat} className="grid gap-3 border-b border-hairline py-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] sm:items-center sm:gap-8">
                    <dt className="text-[18px] text-ink">{cat}</dt>
                    <dd className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
                      {tools.map((brand) => (
                        <span key={brand.name} className="flex items-center gap-2 text-[15px] text-ink-soft">
                          <Mark brand={brand} />
                          {brand.name}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* ── 03 · the part that makes the rest believable ─────────── */}
            <section id="honest" className="mt-24 scroll-mt-32 border-t border-hairline pt-10 lg:mt-32">
              <Eyebrow className="mb-5">{comparison.honest.eyebrow}</Eyebrow>
              <h2 className="text-[36px]/[1.1] font-light tracking-[-0.03em] text-ink sm:text-[44px]/[1.08]">
                {comparison.honest.title}
                <br />
                <span className="text-ink-soft">{comparison.honest.titleMuted}</span>
              </h2>

              <dl className="mt-12 border-t border-hairline">
                {comparison.honest.rows.map((row) => (
                  <div key={row.label} className="grid gap-2 border-b border-hairline py-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] sm:gap-8">
                    <dt className="text-[18px] text-ink">{row.label}</dt>
                    <dd className="text-[17px]/[1.55] text-ink-soft">{row.note}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
