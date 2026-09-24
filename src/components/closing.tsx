import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { closing } from "@/content/site";
import { LogoMark } from "./logo";
import { Heading, Icon, PRIMARY } from "./ui";

/**
 * Section 8: the last word, on a plain well.
 *
 * This used to close on a film, to rhyme with a hero that opened on one. The
 * hero now carries the infrared artwork instead, and that artwork only works
 * because it is rare — a second panel here would spend it. So the last word
 * gets the quietest surface on the page and the loudest button, and the mark
 * sits above the line as a sign-off.
 */
export function Closing() {
  return (
    <section className="p-2.5 sm:p-3.5">
      <div className="grid min-h-[420px] place-items-center rounded-[22px] bg-sunken px-6 py-24 text-center sm:rounded-[30px] lg:min-h-[520px]">
        <div>
          <LogoMark className="mx-auto size-11 text-ink-faint" title="" />
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
