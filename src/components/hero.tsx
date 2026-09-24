import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { hero } from "@/content/site";
import { Artwork } from "./artwork";
import { HeroMontage } from "./hero-montage";
import { Icon, PRIMARY, SECONDARY } from "./ui";

/** Apple's mark is theirs; this is the plain glyph, at text size, carrying the
 *  ink colour like any other word on the line. */
function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[15px] shrink-0 fill-current">
      <path d="M16.36 12.78c.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.48.83-.72 0-1.83-.81-3-.79-1.55.02-2.98.9-3.77 2.28-1.61 2.79-.41 6.92 1.15 9.18.76 1.11 1.67 2.35 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.39 0 1.78.74 3 .72 1.24-.02 2.02-1.12 2.78-2.24.88-1.29 1.24-2.53 1.26-2.6-.03-.01-2.41-.93-2.43-3.68M14.1 5.99c.63-.77 1.06-1.83.94-2.89-.91.04-2.01.61-2.67 1.37-.58.68-1.1 1.76-.96 2.8 1.02.08 2.06-.52 2.69-1.28"/>
    </svg>
  );
}

/**
 * The promise on the page, then the artwork under it.
 *
 * This used to be one dark window with the headline laid over a film. The
 * infrared artwork will not take text — it is black sky against lime rock, so
 * there is no corner of it that holds a headline without a scrim heavy enough
 * to throw away the thing that makes it worth showing. So the two separate:
 * the words sit on paper and the artwork gets its own panel, which is how the
 * artwork was designed to be used.
 *
 * The meeting still plays in its corner, a light card on the art — the panel
 * carries an overlay in the reference too, and near-white on infrared is the
 * strongest contrast on the page.
 */
export function Hero() {
  const at = (ms: number) => ({ animationDelay: `${ms}ms` });

  return (
    <section className="px-2.5 pt-32 sm:px-3.5 sm:pt-36 lg:pt-40">
      {/* Aligned to the artwork's own edge, not to a narrower centred column.
          In a 1200px wrap against a full-bleed panel the words sat 230px inside
          it at 2000, which read as floating rather than as a pair. */}
      <div className="mx-auto grid max-w-[2040px] gap-10 px-4 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(290px,400px)] lg:items-end lg:gap-14 lg:px-10">
        {/* One line each. The headline no longer has the page to itself — the
            aside sits beside it and the artwork below carries the weight — so
            it steps down from 92px, which wrapped to three lines here. */}
        <h1 className="text-[44px]/[1.03] font-light tracking-[-0.035em] text-ink sm:text-[58px]/[1.01] lg:text-[64px]/[1] xl:text-[72px]/[1] 2xl:text-[80px]/[0.99] 3xl:text-[88px]/[0.98] 4xl:text-[96px]/[0.97]">
          <span className="block animate-enter" style={at(120)}>
            {hero.title}
          </span>
          <span className="block animate-enter text-ink-soft" style={at(260)}>
            {hero.titleMuted}
          </span>
        </h1>

        <div className="animate-enter lg:pb-3" style={at(420)}>
          <p className="max-w-[520px] text-[18px]/[1.55] text-ink-soft sm:text-[20px]/[1.55] 3xl:text-[22px]/[1.55]">{hero.lede}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={hero.primary.href} className={`${PRIMARY} group`}>
              {hero.primary.label}
              <Icon icon={ArrowRight01Icon} className="size-[18px] transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a href={hero.secondary.href} className={SECONDARY}>
              {hero.secondary.label}
            </a>
          </div>

          {/* Where you can have it. A line, not a badge: the App Store's own
              artwork brings another brand's colour into a palette that has
              three, and this says the same thing in the page's own voice. */}
          <p className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[14px] text-ink-faint">
            <AppleMark />
            {hero.platforms.ios}
            <span aria-hidden="true">&middot;</span>
            {hero.platforms.mac}
          </p>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-[2040px] sm:mt-14">
        <Artwork
          src="signal"
          alt="Infrared desert arch in electric lime and turquoise over coral ground, streaked with analogue scan echoes."
          priority
          className="animate-film-in h-[380px] sm:h-[460px] lg:h-[560px] 3xl:h-[660px]"
        >
          <div className="absolute right-6 bottom-6 3xl:right-10 3xl:bottom-10">
            <HeroMontage />
          </div>
        </Artwork>
      </div>
    </section>
  );
}
