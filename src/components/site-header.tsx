import { nav } from "@/content/site";
import { Logo } from "./logo";
import { SECONDARY, WRAP } from "./ui";

export function SiteHeader() {
  return (
    <header className={`${WRAP} flex h-20 items-center justify-between gap-6 sm:h-24`}>
      <a href="#" aria-label="Morse, back to top" className="text-ink">
        <Logo className="h-[22px] w-auto" />
      </a>
      <nav aria-label="Main" className="hidden items-center gap-8 text-[16px] text-ink-soft md:flex">
        {nav.links.map((link) => (
          <a key={link.href} href={link.href} className="transition-colors hover:text-ink">
            {link.label}
          </a>
        ))}
      </nav>
      <a href={nav.cta.href} className={`${SECONDARY} h-10 px-5 text-[16px]`}>
        {nav.cta.label}
      </a>
    </header>
  );
}
