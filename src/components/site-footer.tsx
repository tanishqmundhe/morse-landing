import { footer } from "@/content/site";
import { Logo } from "./logo";
import { UnifiedMachinesLogo } from "./unified-machines-logo";
import { WRAP } from "./ui";

/**
 * The footer: the mark and a line on the left, three short columns beside it,
 * and the year with who made it underneath — the app's own footer ends the
 * same way, Morse at one end and Unified Machines at the other.
 */
export function SiteFooter() {
  return (
    <footer className={`${WRAP} pt-16 pb-12 lg:pt-20`}>
      <div className="grid gap-12 border-t border-hairline pt-14 lg:grid-cols-[1.4fr_2fr] lg:gap-20">
        <div>
          <a href="#" aria-label="Morse, back to top" className="inline-block text-ink transition-opacity hover:opacity-80">
            <Logo className="h-[26px] w-auto" />
          </a>
          <p className="mt-5 max-w-[320px] text-[17px]/[1.5] text-ink-soft">{footer.line}</p>
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
          {footer.columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="font-mono text-label text-ink-faint uppercase">{column.title}</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[17px] text-ink-soft transition-colors hover:text-ink">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="mt-14 flex flex-col items-center gap-5 border-t border-hairline pt-8 text-[15px] text-ink-faint sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Unified Machines</p>
        <p className="flex items-center gap-2.5">
          {footer.maker}
          <UnifiedMachinesLogo className="h-[15px] w-auto shrink-0" />
        </p>
      </div>
    </footer>
  );
}
