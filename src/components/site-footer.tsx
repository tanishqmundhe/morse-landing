import { footer } from "@/content/site";
import { Logo } from "./logo";
import { UnifiedMachinesLogo } from "./unified-machines-logo";
import { WRAP } from "./ui";

/**
 * The footer, both ends as the app has them: Morse on one, who made it on the
 * other, with the page's own sections in between.
 */
export function SiteFooter() {
  return (
    <footer className={`${WRAP} flex flex-col items-center gap-8 py-10 text-center sm:flex-row sm:justify-between sm:gap-6 sm:py-12 sm:text-left`}>
      <a href="#" aria-label="Morse, back to top" className="text-ink-soft transition-colors hover:text-ink">
        <Logo className="h-[26px] w-auto" />
      </a>

      <nav aria-label="Sections" className="flex flex-wrap justify-center gap-x-7 gap-y-2 text-[15px] text-ink-soft">
        {footer.links.map((link) => (
          <a key={link.href} href={link.href} className="transition-colors hover:text-ink">
            {link.label}
          </a>
        ))}
      </nav>

      <p className="flex items-center gap-2.5 text-[15px] text-ink-faint">
        {footer.maker}
        <UnifiedMachinesLogo className="h-[15px] w-auto shrink-0" />
      </p>
    </footer>
  );
}
