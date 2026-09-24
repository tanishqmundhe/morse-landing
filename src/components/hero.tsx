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
 * The words beside the artwork, and the meeting breaking out of it.
 *
 * The artwork will not take text — black sky against lime rock has no corner
 * that holds a headline without a scrim heavy enough to waste it — so the
 * words keep their own column and the picture keeps its own panel.
 *
 * What changed is where they sit relative to each other. Stacked, the title
 * was at the top of the screen, the panel began below the fold, and the
 * meeting sat in the panel's bottom corner where it was cut in half. Side by
 * side, the whole hero is one screenful: words left, panel right, and the
 * meeting centred on the panel, overlapping its edges rather than tucked
 * inside them. The pop-ups go further still and land on the paper.
 */
export function Hero() {
  const at = (ms: number) => ({ animationDelay: `${ms}ms` });

  return (
    <section className="px-2.5 pt-32 pb-12 sm:px-3.5 sm:pt-36 lg:pt-40 lg:pb-16">
      <div className="mx-auto grid max-w-[2040px] items-center gap-14 px-4 sm:px-8 lg:grid-cols-[minmax(380px,0.82fr)_minmax(0,1.18fr)] lg:gap-16 lg:px-10">
        <div>
          <h1 className="text-[44px]/[1.03] font-light tracking-[-0.035em] text-ink sm:text-[58px]/[1.01] lg:text-[56px]/[1] xl:text-[66px]/[1] 2xl:text-[74px]/[0.99] 3xl:text-[82px]/[0.98]">
            <span className="block animate-enter" style={at(120)}>
              {hero.title}
            </span>
            {/* One tear, on the line that lands second. `data-glitch` is what the
                displaced copy draws; it is decorative, so it stays out of the tree. */}
            <span className="block animate-enter text-ink-soft" style={at(260)}>
              <span className="glitch inline-block" data-glitch={hero.titleMuted} style={at(900)}>
                {hero.titleMuted}
              </span>
            </span>
          </h1>

          <div className="animate-enter" style={at(420)}>
            <p className="mt-7 max-w-[480px] text-[18px]/[1.55] text-ink-soft sm:text-[20px]/[1.55] 3xl:text-[22px]/[1.55]">{hero.lede}</p>
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

        {/* The panel clips its own picture; the meeting is a sibling of it, so
            it and its pop-ups can cross the edge. */}
        <div className="relative">
          <Artwork
            src="signal"
            alt="Infrared desert arch in electric lime and turquoise over coral ground, streaked with analogue scan echoes."
            priority
            /* Shorter than the window on purpose: the meeting is 434px at this
                scale, so the panel's edges pass behind it. */
            className="animate-film-in h-[300px] sm:h-[380px] lg:h-[386px] 3xl:h-[440px]"
          />
          <div className="absolute inset-0 hidden animate-enter place-items-center lg:grid" style={at(700)}>
            <HeroMontage />
          </div>
        </div>
      </div>
    </section>
  );
}
