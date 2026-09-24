import Image from "next/image";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { hero } from "@/content/site";
import { HeroMontage } from "./hero-montage";
import { Icon, PRIMARY, SECONDARY } from "./ui";

/** Apple's mark is theirs; this is the plain glyph, at text size, carrying the
 *  ink colour like any other word on the line. */
function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[15px] shrink-0 fill-current">
      <path d="M16.36 12.78c.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.48.83-.72 0-1.83-.81-3-.79-1.55.02-2.98.9-3.77 2.28-1.61 2.79-.41 6.92 1.15 9.18.76 1.11 1.67 2.35 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.39 0 1.78.74 3 .72 1.24-.02 2.02-1.12 2.78-2.24.88-1.29 1.24-2.53 1.26-2.6-.03-.01-2.41-.93-2.43-3.68M14.1 5.99c.63-.77 1.06-1.83.94-2.89-.91.04-2.01.61-2.67 1.37-.58.68-1.1 1.76-.96 2.8 1.02.08 2.06-.52 2.69-1.28" />
    </svg>
  );
}

/**
 * The whole hero is the artwork, and everything stands on it.
 *
 * The panel is gone. The picture spans the page edge to edge and runs the full
 * height of the first screen, in its black-sky form in both themes — this is
 * the one place that stays dark when the page is light, the way the app keeps
 * video dark in both.
 *
 * On it, side by side: the promise on the left, the meeting on the right,
 * running off the right edge so it reads as a window you are seeing part of.
 * Everything sits on the scrim's strong end; the arch is left bright on the
 * far side where nothing is written.
 */
export function Hero() {
  const at = (ms: number) => ({ animationDelay: `${ms}ms` });

  return (
    <section className="on-stage relative isolate flex min-h-[760px] items-end overflow-hidden bg-stage lg:min-h-svh">
      <Image
        src="/art/signal.webp"
        alt="Infrared desert arch in electric lime and turquoise over coral ground, streaked with analogue scan echoes."
        width={1600}
        height={1067}
        priority
        sizes="100vw"
        className="animate-film-in absolute inset-0 -z-20 size-full object-cover"
      />
      {/* The scrim is heaviest where the words are and lets go by the middle,
          so the arch stays bright on the side nothing is written on. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,oklch(0.19_0.002_90/0.97)_0%,oklch(0.19_0.002_90/0.9)_22%,oklch(0.19_0.002_90/0.58)_42%,oklch(0.19_0.002_90/0.18)_62%,transparent_84%),linear-gradient(90deg,oklch(0.19_0.002_90/0.5)_0%,transparent_46%)]"
      />
      {/* And a second one under the header, so the bar reads over the sky. */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-stage/80 to-transparent" />

      <div className="mx-auto grid w-full max-w-[2040px] items-end gap-12 px-6 pt-36 pb-14 sm:px-10 lg:grid-cols-[minmax(440px,0.9fr)_minmax(0,1.1fr)] lg:gap-10 lg:px-14 lg:pb-16">
        <div>
          <h1 className="text-[44px]/[1.03] font-light tracking-[-0.035em] text-ink sm:text-[58px]/[1.01] lg:text-[58px]/[1] xl:text-[68px]/[1] 2xl:text-[76px]/[0.99] 3xl:text-[84px]/[0.98]">
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
            <p className="mt-7 max-w-[470px] text-[18px]/[1.55] text-ink-soft sm:text-[20px]/[1.55] 3xl:text-[22px]/[1.55]">{hero.lede}</p>
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

        {/* Off the right edge on purpose. The section clips it, which is what
            makes it read as a window rather than a picture of one. */}
        <div className="hidden animate-enter lg:block" style={at(700)}>
          {/* Flush with the floor and the right gutter, so the two columns
              stand on the same line. It runs a little past the right edge —
              enough to crop the frame, not enough to eat a panel. */}
          <div className="-mr-[3%] flex justify-end 2xl:-mr-[1%]">
            <HeroMontage />
          </div>
        </div>
      </div>
    </section>
  );
}
