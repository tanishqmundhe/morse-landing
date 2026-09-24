import Image from "next/image";
import { comparison, pricing } from "@/content/site";
import { BRANDS, type Brand } from "./brand-marks";
import { GlitchBand } from "./glitch";
import { LogoMark } from "./logo";
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

const { cost, difference, orbit, honest } = comparison;
const STACK = cost.rows.reduce((sum, row) => sum + row.pay, 0);

/**
 * A tool's own mark, in an orbit node.
 *
 * **`fill="currentColor"` on the element, not just a text colour.** Some marks
 * carry `fill="currentColor"` inside their own markup and some are bare paths
 * that inherit it; without it on the `<svg>` the bare ones fell back to black
 * while the others took the ink, so half the orbit was dark and half was
 * light on the same dark ground.
 *
 * **A wordmark is sized by width.** Zoom and Cal.com publish their lettering
 * 24 wide and about 5 tall, so a 22px *height* drew Zoom 97px across — nearly
 * twice the 56px node it sits in. Width is the dimension that has to fit.
 */
function Mark({ brand }: { brand: Brand }) {
  return (
    <svg
      viewBox={brand.viewBox}
      fill="currentColor"
      role={brand.wordmark ? "img" : undefined}
      aria-label={brand.wordmark ? brand.name : undefined}
      aria-hidden={brand.wordmark ? undefined : true}
      className={brand.wordmark ? "h-auto w-[32px] shrink-0 text-ink" : "size-[26px] shrink-0 text-ink"}
      dangerouslySetInnerHTML={{ __html: brand.svg }}
    />
  );
}

/** A mark by name, from the same list the home page's band runs on. */
const byName = (name: string) => BRANDS.find((b) => b.name === name);

const H2 = "text-[34px]/[1.08] font-light tracking-[-0.03em] text-ink sm:text-[42px]/[1.06]";

export function ComparePage() {
  const pro = pricing.plans.find((p) => p.id === "pro");

  return (
    <>
      {/* The first screen is the headline and nothing else. */}
      <section className={`${WRAP} pt-40 pb-20 lg:pt-52 lg:pb-28`}>
        <Eyebrow className="mb-7">{comparison.eyebrow}</Eyebrow>
        <h1 className="max-w-[16ch] text-[40px]/[1] font-light tracking-[-0.04em] text-ink sm:text-[54px]/[0.98] lg:text-[64px]/[0.96]">
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

      {/* ── The difference ────────────────────────────────────────────
          Two problems flat on the sunken ground, the answer lifted onto a
          raised card. The elevation argues before anyone reads a word, which
          is the point: a comparison is read at a glance or not at all. */}
      <section id="difference" className={`${WRAP} scroll-mt-24 pb-28 lg:pb-40`}>
        <Eyebrow className="mb-5">{difference.eyebrow}</Eyebrow>
        <h2 className={H2}>
          {difference.title}
          <br />
          <span className="text-ink-soft">{difference.titleMuted}</span>
        </h2>

        <div className="mt-14 grid overflow-hidden rounded-[22px] bg-sunken ring-1 ring-hairline lg:grid-cols-[1fr_1fr_1.08fr]">
          {difference.columns.map((column) => (
            <div
              key={column.title}
              className={
                column.win
                  ? "-m-px rounded-[22px] bg-raised p-8 shadow-float ring-1 ring-hairline lg:p-9"
                  : "border-b border-hairline p-8 last:border-b-0 lg:border-r lg:border-b-0 lg:p-9"
              }
            >
              <span
                aria-hidden="true"
                className={`grid size-8 place-items-center rounded-[10px] text-[14px] ${
                  column.win ? "bg-ink text-canvas" : "text-ink-faint ring-1 ring-hairline"
                }`}
              >
                {column.win ? "\u2713" : "\u2715"}
              </span>
              <h3 className="mt-12 text-[21px] text-ink">{column.title}</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {column.points.map((point) => (
                  <li key={point} className={`flex gap-2.5 text-[16px]/[1.5] ${column.win ? "text-ink" : "text-ink-soft"}`}>
                    {/* The marker carries the sense as well as the colour: a
                        minus for what you lose, a plus for what you get. */}
                    <span aria-hidden="true" className={`shrink-0 ${column.win ? "text-action-ink" : "text-ink-faint"}`}>
                      {column.win ? "+" : "\u2014"}
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── The orbit ─────────────────────────────────────────────────────
          The page's one picture, and the artwork is under it rather than in a
          band of its own: this page went wrong the first time by putting
          decoration between a reader and a number, so what artwork there is
          has to be doing a job. Here it is the ground the orbit turns on. */}
      <section id="jobs" className={`${WRAP} scroll-mt-24 pb-28 lg:pb-40`}>
        <div className="on-stage relative isolate overflow-hidden rounded-[24px] px-6 py-20 text-center lg:py-24">
          <Image
            src="/art/knowledge.webp"
            alt=""
            aria-hidden="true"
            width={1600}
            height={1067}
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="absolute inset-0 -z-20 size-full object-cover object-[center_40%]"
          />
          <GlitchBand src="knowledge" onStage delay={2.8} className="absolute inset-0 -z-20 size-full object-cover object-[center_40%]" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[oklch(0.19_0.002_90/0.86)]" />

          <Eyebrow className="mb-5">{orbit.eyebrow}</Eyebrow>
          <h2 className={H2}>
            {orbit.title}
            <br />
            <span className="text-ink-soft">{orbit.titleMuted}</span>
          </h2>

          <div className="relative mx-auto mt-10 h-[340px] w-[340px] sm:h-[420px] sm:w-[420px] lg:mt-12 lg:h-[480px] lg:w-[480px]">
            {[
              { marks: orbit.inner, radius: 32, spin: "orbit-inner" },
              { marks: orbit.outer, radius: 46, spin: "orbit-outer" },
            ].map((ring) => (
              <div key={ring.spin} className={`absolute inset-0 ${ring.spin}`}>
                <span
                  aria-hidden="true"
                  className="absolute rounded-full border border-hairline"
                  style={{ inset: `${50 - ring.radius}%` }}
                />
                {ring.marks.map((name, i) => {
                  const brand = byName(name);
                  if (!brand) return null;
                  const angle = (-90 + (i * 360) / ring.marks.length) * (Math.PI / 180);
                  return (
                    <span
                      key={name}
                      className="absolute grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-float shadow-float"
                      style={{
                        left: `${50 + Math.cos(angle) * ring.radius}%`,
                        top: `${50 + Math.sin(angle) * ring.radius}%`,
                      }}
                    >
                      <span className="orbit-mark grid place-items-center">
                        <Mark brand={brand} />
                      </span>
                    </span>
                  );
                })}
              </div>
            ))}

            {/* Morse does not turn. Everything else goes round it, which is
                the entire claim the section is making. */}
            <span className="absolute top-1/2 left-1/2 grid size-[104px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink text-canvas shadow-float">
              <LogoMark className="size-11" title="Morse" />
            </span>
          </div>
        </div>
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
