import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { hero } from "@/content/site";
import { Artwork } from "./artwork";
import { LiveCard } from "./live-card";
import { Icon, PRIMARY, SECONDARY, WRAP } from "./ui";

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
    <section className="pt-32 sm:pt-36 lg:pt-40">
      <div className={`${WRAP} grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(290px,370px)] lg:items-end lg:gap-14`}>
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
        </div>
      </div>

      <div className="mt-10 px-2.5 sm:mt-14 sm:px-3.5">
        <Artwork
          src="/art/signal.webp"
          alt="Infrared desert arch in electric lime and turquoise over coral ground, streaked with analogue scan echoes."
          priority
          className="animate-film-in h-[380px] sm:h-[460px] lg:h-[560px] 3xl:h-[660px]"
        >
          <div
            className="absolute right-6 bottom-6 hidden animate-enter lg:block 3xl:right-10 3xl:bottom-10"
            style={at(700)}
          >
            <LiveCard />
          </div>
        </Artwork>
      </div>
    </section>
  );
}
