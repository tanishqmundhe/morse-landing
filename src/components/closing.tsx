import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { closing } from "@/content/site";
import { Film } from "./film";
import { LogoMark } from "./logo";
import { Heading, Icon, PRIMARY } from "./ui";

/**
 * Section 8: the last word, over the app's ringed-meadow film. The page opens
 * on a film and closes on one; the mark sits above the line, as a sign-off.
 */
export function Closing() {
  return (
    <section className="p-2.5 sm:p-3.5">
      <div className="on-stage relative isolate grid min-h-[480px] place-items-center overflow-hidden rounded-[22px] bg-stage px-6 py-24 text-center sm:rounded-[30px] lg:min-h-[620px]">
        <Film src={closing.film.src} poster={closing.film.poster} className="-z-10 object-center" />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,oklch(0.205_0_0/0.78)_0%,oklch(0.205_0_0/0.46)_100%)]"
        />
        <div>
          <LogoMark className="mx-auto size-11 text-ink/85" title="" />
          <Heading
            lead={closing.title}
            muted={closing.titleMuted}
            className="mt-7 text-[40px]/[1.08] sm:text-[56px]/[1.05] xl:text-[72px]/[1.03]"
          />
          <a href={closing.cta.href} className={`${PRIMARY} group mt-9 h-[52px] px-7 text-[18px]`}>
            {closing.cta.label}
            <Icon icon={ArrowRight01Icon} className="size-[18px] transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
