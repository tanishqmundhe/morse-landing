import { CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";
import { comparison, pricing } from "@/content/site";
import { BRANDS } from "./brand-marks";
import { Eyebrow, H2, Heading, Icon, LEAD, WRAP } from "./ui";

/**
 * What a meeting stack costs, against what Morse costs.
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
 * they ship, and comparative use of their marks is against most of their brand
 * guidelines besides (see `brand-marks.ts`). What this page asserts is what
 * things cost and what job they do — both checkable, neither an opinion.
 */

/** The seven jobs and the tools people buy for each, from the same list the
 *  home page's "Instead of" band runs on. One source, so they cannot drift. */
function jobs() {
  const order: string[] = [];
  const by = new Map<string, string[]>();
  for (const brand of BRANDS) {
    if (!by.has(brand.cat)) {
      by.set(brand.cat, []);
      order.push(brand.cat);
    }
    by.get(brand.cat)!.push(brand.name);
  }
  return order.map((cat) => ({ cat, tools: by.get(cat)! }));
}

const ROW = "grid grid-cols-[minmax(92px,0.7fr)_minmax(0,2.4fr)_minmax(80px,0.6fr)] gap-5 px-5 py-5 sm:gap-8 sm:px-7";

export function ComparePage() {
  const plan = (id: string) => pricing.plans.find((p) => p.id === id);

  return (
    <>
      <section className={`${WRAP} pt-36 pb-20 lg:pt-44 lg:pb-28`}>
        <div className="max-w-[760px]">
          <Eyebrow className="mb-5">{comparison.eyebrow}</Eyebrow>
          <Heading as="h1" lead={comparison.title} muted={comparison.titleMuted} className={H2} />
          <p className={`${LEAD} mt-6 max-w-[54ch]`}>{comparison.lede}</p>
        </div>
      </section>

      {/* 1 · The money. */}
      <section className={`${WRAP} pb-28 lg:pb-40`}>
        <Eyebrow className="mb-5">{comparison.cost.eyebrow}</Eyebrow>
        <Heading lead={comparison.cost.title} muted={comparison.cost.titleMuted} className={H2} />

        {/* Sideways rather than folded on a narrow screen: a comparison you
            cannot put side by side is no comparison. */}
        <div className="mt-12 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="min-w-[640px] rounded-[22px] bg-raised shadow-raised">
            <div className={`${ROW} border-b border-hairline font-mono text-label text-ink-faint uppercase`}>
              <span>{comparison.cost.head.job}</span>
              <span>{comparison.cost.head.buy}</span>
              <span className="text-right">{comparison.cost.head.pay}</span>
            </div>

            {comparison.cost.rows.map((row) => (
              <div key={row.job} className={`${ROW} items-baseline border-b border-hairline text-[17px]`}>
                <span className="text-ink">{row.job}</span>
                <span className="text-ink-soft">{row.buy}</span>
                <span className="text-right text-ink tabular-nums">{row.pay}</span>
              </div>
            ))}

            {/* The sum, set apart by weight rather than by colour: this is the
                number the page turns on and it should not need a highlight. */}
            <div className={`${ROW} items-baseline border-b border-hairline bg-sunken text-[17px]`}>
              <span className="font-medium text-ink">{comparison.cost.total.job}</span>
              <span className="text-ink-soft">{comparison.cost.total.buy}</span>
              <span className="text-right font-medium text-ink tabular-nums">{comparison.cost.total.pay}</span>
            </div>

            {comparison.cost.ours.map((row) => {
              const p = plan(row.plan);
              return (
                <div key={row.job} className={`${ROW} items-baseline text-[17px] not-last:border-b not-last:border-hairline`}>
                  <span className="font-medium text-ink">{row.job}</span>
                  <span className="text-ink-soft">{row.buy}</span>
                  <span className="text-right text-ink tabular-nums">
                    <span className="font-medium">${p?.price.monthly}</span>
                    <span className="block text-[14px] text-ink-faint">${p?.price.yearly} billed yearly</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Where the numbers came from and when. A comparison table with no
            date on it is asking to be believed on trust. */}
        <p className="mt-5 text-[15px] text-ink-faint">{comparison.checked}</p>
      </section>

      {/* 2 · The seven jobs. */}
      <section className={`${WRAP} pb-28 lg:pb-40`}>
        <Eyebrow className="mb-5">{comparison.jobs.eyebrow}</Eyebrow>
        <Heading lead={comparison.jobs.title} muted={comparison.jobs.titleMuted} className={H2} />
        <p className={`${LEAD} mt-6 max-w-[56ch]`}>{comparison.jobs.body}</p>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-[22px] bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {jobs().map(({ cat, tools }) => (
            <li key={cat} className="flex flex-col gap-3 bg-raised p-7">
              <span className="flex items-center gap-2.5 text-[18px] text-ink">
                <Icon icon={CheckmarkCircle02Icon} className="size-[19px] shrink-0 text-understood-ink" />
                {cat}
              </span>
              <span className="text-[15px]/[1.55] text-ink-soft">{tools.join(" · ")}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 3 · The part that makes the rest believable. */}
      <section className={`${WRAP} pb-28 lg:pb-40`}>
        <Eyebrow className="mb-5">{comparison.honest.eyebrow}</Eyebrow>
        <Heading lead={comparison.honest.title} muted={comparison.honest.titleMuted} className={H2} />

        <dl className="mt-12 border-t border-hairline">
          {comparison.honest.rows.map((row) => (
            <div key={row.label} className="grid gap-2 border-b border-hairline py-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-10">
              <dt className="text-[18px] text-ink">{row.label}</dt>
              <dd className="text-[17px]/[1.55] text-ink-soft">{row.note}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
