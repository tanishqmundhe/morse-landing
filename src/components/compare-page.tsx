import { comparison, pricing } from "@/content/site";
import { BRANDS, type Brand } from "./brand-marks";
import { Eyebrow, LEAD, PRIMARY, WRAP } from "./ui";

/**
 * What a meeting stack costs, against what Morse costs.
 *
 * Rebuilt after a look at how Linear, Vercel and Attio do this. The common
 * shape, and what this now follows:
 *
 * - **No cards.** Columns divided by a hairline, on the page's own ground.
 *   None of the three uses a bordered box to hold a price; a card round a
 *   number adds a frame to read before the number.
 * - **The number is the biggest thing on the screen** and is stated plainly —
 *   `$40`, with the unit small underneath. Never a range, never a tilde.
 * - **The detail is a table**, grouped, hairline-ruled, left-aligned labels.
 *   That is the whole comparison apparatus at Linear and Vercel: no shadows,
 *   no fills, no chrome of any kind.
 *
 * The first version of this page failed on exactly those three points. It put
 * the money in two bordered cards with an arrow between them, and the total
 * read "~$34–40" — a tilde and a range, so the one number the page turns on
 * could not be held against the one it was being compared to. Three of the
 * rows quoted ranges too. It was unreadable at a glance, which is the only
 * speed a comparison is read at.
 *
 * What survives: the honest section, last and deliberately. A comparison page
 * that only lists wins is an advert and everyone can tell. And still no
 * tick-and-cross matrix against named rivals — a grid of red crosses under
 * somebody else's logo is a claim about their product that goes stale the week
 * they ship. This page asserts what things cost and what job they do; both are
 * checkable, neither is an opinion.
 */

const { cost, jobs: jobsCopy, honest } = comparison;
const STACK = cost.rows.reduce((sum, row) => sum + row.pay, 0);

/** A tool's own mark, from the same list the home page's band runs on. */
function Mark({ brand }: { brand: Brand }) {
  return (
    <svg
      viewBox={brand.viewBox}
      role={brand.wordmark ? "img" : undefined}
      aria-label={brand.wordmark ? brand.name : undefined}
      aria-hidden={brand.wordmark ? undefined : true}
      className={brand.wordmark ? "h-[11px] w-auto shrink-0 text-ink-faint" : "size-[18px] shrink-0 text-ink-faint"}
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

const H2 = "text-[34px]/[1.08] font-light tracking-[-0.03em] text-ink sm:text-[42px]/[1.06]";

export function ComparePage() {
  const pro = pricing.plans.find((p) => p.id === "pro");

  return (
    <>
      {/* The first screen is the headline and nothing else. */}
      <section className={`${WRAP} pt-40 pb-20 lg:pt-52 lg:pb-28`}>
        <Eyebrow className="mb-7">{comparison.eyebrow}</Eyebrow>
        <h1 className="max-w-[16ch] text-[52px]/[0.96] font-light tracking-[-0.04em] text-ink sm:text-[76px]/[0.94] lg:text-[96px]/[0.93]">
          {comparison.title}
          <br />
          <span className="text-ink-soft">{comparison.titleMuted}</span>
        </h1>
        <p className={`${LEAD} mt-9 max-w-[48ch]`}>{comparison.lede}</p>
      </section>

      {/* ── The money ─────────────────────────────────────────────────────
          Two numbers, a hairline between them, and the arithmetic underneath.
          Nothing else: this is the one thing the page has to land. */}
      <section id="cost" className={`${WRAP} scroll-mt-24 pb-28 lg:pb-40`}>
        <div className="grid border-t border-hairline sm:grid-cols-2">
          {[
            { label: cost.stackLabel, amount: STACK, tone: "text-ink-soft" },
            { label: cost.oursLabel, amount: pro?.price.monthly ?? 0, tone: "text-ink" },
          ].map((side, i) => (
            <div
              key={side.label}
              className={`py-10 lg:py-14 ${i === 0 ? "border-b border-hairline sm:border-r sm:border-b-0 sm:pr-10" : "sm:pl-10 lg:pl-14"}`}
            >
              <p className="font-mono text-label text-ink-faint uppercase">{side.label}</p>
              {/* The number, at the size the page gives a headline. */}
              <p className={`mt-5 text-[76px]/[0.9] font-light tracking-[-0.04em] tabular-nums lg:text-[96px]/[0.9] ${side.tone}`}>
                ${side.amount}
              </p>
              <p className="mt-3 text-[17px] text-ink-faint">{cost.unit}</p>
            </div>
          ))}
        </div>

        {/* Where the total comes from. A table, because a reader checking a sum
            wants the rows, not an illustration of them. */}
        <dl className="mt-16 border-t border-hairline">
          {cost.rows.map((row) => (
            <div
              key={row.job}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-1 border-b border-hairline py-5 sm:grid-cols-[minmax(0,140px)_minmax(0,1fr)_auto]"
            >
              <dt className="text-[18px] text-ink">{row.job}</dt>
              <dd className="order-3 text-[16px] text-ink-soft sm:order-none">{row.tool}</dd>
              <dd className="text-right text-[18px] text-ink tabular-nums">${row.pay}</dd>
            </div>
          ))}
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 border-b border-hairline py-5 sm:grid-cols-[minmax(0,140px)_minmax(0,1fr)_auto]">
            <dt className="text-[18px] font-medium text-ink">Total</dt>
            <dd className="hidden sm:block" />
            <dd className="text-right text-[18px] font-medium text-ink tabular-nums">${STACK}</dd>
          </div>
        </dl>

        <p className="mt-5 max-w-[62ch] text-[15px]/[1.6] text-ink-faint">{cost.alts}</p>
        <p className="mt-2 text-[15px] text-ink-faint">{comparison.checked}</p>

        <a href="/pricing" className={`${PRIMARY} mt-10`}>
          See what is in each plan
        </a>
      </section>

      {/* ── The seven jobs ────────────────────────────────────────────── */}
      <section id="jobs" className={`${WRAP} scroll-mt-24 pb-28 lg:pb-40`}>
        <Eyebrow className="mb-5">{jobsCopy.eyebrow}</Eyebrow>
        <h2 className={H2}>
          {jobsCopy.title}
          <br />
          <span className="text-ink-soft">{jobsCopy.titleMuted}</span>
        </h2>
        <p className={`${LEAD} mt-6 max-w-[56ch]`}>{jobsCopy.body}</p>

        <dl className="mt-12 border-t border-hairline">
          {jobs().map(({ cat, tools }) => (
            <div
              key={cat}
              className="grid gap-3 border-b border-hairline py-6 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)] lg:items-center lg:gap-10"
            >
              <dt className="text-[18px] text-ink">{cat}</dt>
              <dd className="flex flex-wrap items-center gap-x-6 gap-y-2.5">
                {/* A wordmark says the name itself; typing it again beside it
                    reads "zoom Zoom", the same bug the home page's band had. */}
                {tools.map((brand) => (
                  <span key={brand.name} className="flex items-center gap-2 text-[16px] text-ink-soft">
                    <Mark brand={brand} />
                    {!brand.wordmark && brand.name}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── The part that makes the rest believable ───────────────────── */}
      <section id="honest" className={`${WRAP} scroll-mt-24 pb-28 lg:pb-40`}>
        <Eyebrow className="mb-5">{honest.eyebrow}</Eyebrow>
        <h2 className={H2}>
          {honest.title}
          <br />
          <span className="text-ink-soft">{honest.titleMuted}</span>
        </h2>

        <dl className="mt-12 border-t border-hairline">
          {honest.rows.map((row) => (
            <div
              key={row.label}
              className="grid gap-2 border-b border-hairline py-6 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-10"
            >
              <dt className="text-[18px] text-ink">{row.label}</dt>
              <dd className="text-[17px]/[1.55] text-ink-soft">{row.note}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
