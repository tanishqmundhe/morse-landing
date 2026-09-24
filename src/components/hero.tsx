import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { hero } from "@/content/site";
import { Film } from "./film";
import { LiveCard } from "./live-card";
import { Icon, PRIMARY, SECONDARY } from "./ui";

/**
 * The film in a window, the promise over it, and a meeting playing in the
 * corner. One entrance for the whole page: the film settles, the lines follow
 * in order, the card arrives last.
 */
export function Hero() {
  const at = (ms: number) => ({ animationDelay: `${ms}ms` });

  return (
    <section className="p-2.5 sm:p-3.5">
      <div className="on-stage relative isolate flex min-h-[640px] flex-col overflow-hidden rounded-[22px] bg-stage sm:rounded-[30px] lg:h-[calc(100svh-28px)] lg:max-h-[940px]">
        <div className="absolute inset-0 -z-10 animate-film-in">
          <Film src={hero.film.src} poster={hero.film.poster} className="object-[62%_40%]" />
        </div>
        {/* Scrims: the copy's corner is held dark enough for AA; the film stays bright up and right. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,oklch(0.205_0_0/0.92)_0%,oklch(0.205_0_0/0.6)_42%,transparent_72%),linear-gradient(0deg,oklch(0.205_0_0/0.9)_0%,transparent_50%)]"
        />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-stage/70 to-transparent" />
        {/* Narrow screens put the copy over the brightest part of the film. */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-stage/55 lg:hidden" />

        {/* The header sits here, fixed; this keeps the copy clear of it. */}
        <div className="h-24 shrink-0" />

        {/* Past a 24" panel the copy and the card stop being a pair: at 2560 they
            sat 1254px apart, one on each edge. Capped and centred from 3xl. */}
        <div className="mt-auto flex w-full flex-col gap-10 px-6 pb-8 sm:px-10 sm:pb-12 lg:flex-row lg:items-end lg:justify-between lg:px-14 lg:pb-16 3xl:mx-auto 3xl:max-w-[1680px] 3xl:pb-20 4xl:max-w-[1800px]">
          {/* Wide enough that "Good conversations." still holds one line as the
              type steps up — at 116px in a 900px column it broke into three. */}
          <div className="max-w-[900px] 3xl:max-w-[1060px] 4xl:max-w-[1200px]">
            <h1 className="text-[52px]/[1.02] font-light tracking-[-0.035em] text-balance text-ink sm:text-[76px]/[1] xl:text-[92px]/[0.98] 3xl:text-[104px]/[0.98] 4xl:text-[116px]/[0.97]">
              <span className="block animate-enter" style={at(350)}>
                {hero.title}
              </span>
              <span className="block animate-enter text-ink-soft" style={at(500)}>
                {hero.titleMuted}
              </span>
            </h1>
            <p className="mt-6 max-w-[520px] animate-enter text-[18px]/[1.55] text-ink-soft sm:text-[20px]/[1.55] 3xl:max-w-[580px] 3xl:text-[22px]/[1.55]" style={at(700)}>
              {hero.lede}
            </p>
            <div className="mt-9 flex animate-enter flex-wrap items-center gap-3" style={at(850)}>
              <a href={hero.primary.href} className={`${PRIMARY} group`}>
                {hero.primary.label}
                <Icon icon={ArrowRight01Icon} className="size-[18px] transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <a href={hero.secondary.href} className={SECONDARY}>
                {hero.secondary.label}
              </a>
            </div>
          </div>

          <div className="hidden shrink-0 animate-enter lg:block" style={at(1150)}>
            <LiveCard />
          </div>
        </div>
      </div>
    </section>
  );
}
