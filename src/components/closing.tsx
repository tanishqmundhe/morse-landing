import { closing } from "@/content/site";
import { LogoMark } from "./logo";
import { Heading, PRIMARY, WRAP } from "./ui";

export function Closing() {
  return (
    <section className={`${WRAP} flex flex-col items-center py-24 text-center lg:py-32`}>
      {/* The mark as the page's sign-off: the one ornament the contract allows (#7). */}
      <LogoMark className="size-12 text-ink-soft" title="" />
      <Heading lead={closing.title} className="mt-8 text-[38px]/[1.1] sm:text-[56px]/[1.05]" />
      <a href={closing.cta.href} className={`${PRIMARY} mt-10`}>
        {closing.cta.label}
      </a>
    </section>
  );
}
