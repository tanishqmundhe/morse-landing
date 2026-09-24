import type { Metadata } from "next";
import { Closing } from "@/components/closing";
import { Faq } from "@/components/faq";
import { Film } from "@/components/film";
import { Compare } from "@/components/pricing/compare";
import { Plans } from "@/components/pricing/plans";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Eyebrow, H2, Heading, LEAD, WRAP } from "@/components/ui";
import { pricing } from "@/content/site";

export const metadata: Metadata = {
  title: "Pricing — Morse",
  description: pricing.lede,
  alternates: { canonical: "/pricing" },
};

/**
 * One rhythm, applied to the bottom of each part only — so the gap between two
 * parts is one section's worth, not two. (SECTION can't be cancelled with
 * `pt-0` here: its `lg:py-40` lives in a media query and wins.)
 */
const PART = "pb-28 lg:pb-40 2xl:pb-48";
const FIRST = "pt-28 lg:pt-40 2xl:pt-48";

/**
 * The pricing page, laid out as aeye.framer.ai/pricing lays one out: a plain
 * title, three plans, then every line of them side by side, then the questions
 * and the way in. The numbered markers its version puts between the parts are
 * not our register; each part opens with the page's own eyebrow instead.
 *
 * Every price on this page is a placeholder — see the note on `pricing` in
 * site.ts. What the plans list is real.
 */
export default function Page() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        {/* The title over a film, as the home page opens and closes on one. */}
        <section className="on-stage relative isolate overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <Film src={pricing.film.src} poster={pricing.film.poster} className="object-[58%_50%]" />
          </div>
          {/* Scrims: the copy's corner is held dark enough for AA, the film
              stays bright to the right, and the header reads over the top. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,oklch(0.2_0.011_50/0.96)_0%,oklch(0.2_0.011_50/0.9)_42%,oklch(0.2_0.011_50/0.52)_72%,transparent_94%),linear-gradient(0deg,oklch(0.2_0.011_50/0.88)_0%,transparent_58%)]"
          />
          <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-36 bg-gradient-to-b from-stage/85 to-transparent" />
          {/* Narrow screens put the copy over the brightest part of the film. */}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-stage/55 lg:hidden" />

          <div className={`${WRAP} flex min-h-[440px] flex-col justify-end pt-36 pb-16 lg:min-h-[540px] lg:pt-44 lg:pb-20`}>
            <Heading as="h1" lead={pricing.title} className="text-[46px]/[1.05] sm:text-[62px]/[1.02] xl:text-[76px]/[1]" />
            <p className={`${LEAD} mt-6 max-w-[620px]`}>{pricing.lede}</p>
          </div>
        </section>

        <section className={`${WRAP} ${FIRST} ${PART}`}>
          <Eyebrow className="mb-5">The plans</Eyebrow>
          <Plans />
        </section>

        <section className={`${WRAP} ${PART}`}>
          <Eyebrow className="mb-5">{pricing.compare.eyebrow}</Eyebrow>
          <Heading lead={pricing.compare.title} muted={pricing.compare.titleMuted} className={H2} />
          <Compare />
        </section>

        <section className={`${WRAP} ${PART}`}>
          <Eyebrow className="mb-5">{pricing.voices.eyebrow}</Eyebrow>
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <Heading lead={pricing.voices.title} muted={pricing.voices.titleMuted} className={H2} />
            <p className={`${LEAD} lg:self-end`}>{pricing.voices.body}</p>
          </div>
        </section>

        <Faq className={PART} />

        <Closing />
      </main>
      <SiteFooter />
    </>
  );
}
