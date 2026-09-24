import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { closing } from "@/content/site";
import { Artwork } from "./artwork";
import { LogoMark } from "./logo";
import { Heading, Icon, PRIMARY } from "./ui";

/**
 * Section 8: the last word, on the one artwork the page had not spent.
 *
 * The page opens on a panel and closes on one. The words still do not go on
 * the artwork — nothing does — so they sit in a card over it, the way the
 * meeting sits over the hero. Same device, opposite end of the page.
 */
export function Closing() {
  return (
    <section className="p-2.5 sm:p-3.5">
      <Artwork
        src="voices"
        alt="Infrared streaks rising over a ridge, in lime and turquoise above coral ground."
        className="grid min-h-[480px] place-items-center px-5 py-20 lg:min-h-[600px]"
      >
        <div className="w-full max-w-[600px] rounded-[22px] bg-float/90 px-8 py-12 text-center shadow-float backdrop-blur-md sm:px-12">
          <LogoMark className="mx-auto size-11 text-ink-soft" title="" />
          <Heading
            lead={closing.title}
            muted={closing.titleMuted}
            className="mt-7 text-[34px]/[1.08] sm:text-[44px]/[1.05] xl:text-[54px]/[1.03]"
          />
          <a href={closing.cta.href} className={`${PRIMARY} group mt-9 h-[52px] px-7 text-[18px]`}>
            {closing.cta.label}
            <Icon icon={ArrowRight01Icon} className="size-[18px] transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </div>
      </Artwork>
    </section>
  );
}
