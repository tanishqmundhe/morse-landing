import type { Metadata } from "next";

/** Not part of the site: a private gallery, kept out of search. */
export const metadata: Metadata = { robots: { index: false, follow: false } };

import { footer } from "@/content/site";
import { Logo } from "@/components/logo";
import { UnifiedMachinesLogo } from "@/components/unified-machines-logo";
import { PRIMARY, UNDERLINE, WRAP } from "@/components/ui";

/** Throwaway gallery: three footers, rendered with the real components. */

const LINK = `${UNDERLINE} text-[17px] text-ink-soft transition-colors duration-300 hover:text-ink`;

function Columns({ className = "" }: { className?: string }) {
  return (
    <div className={`grid gap-10 sm:grid-cols-3 ${className}`}>
      {footer.columns.map((column) => (
        <nav key={column.title} aria-label={column.title}>
          <p className="font-mono text-label text-ink-faint uppercase">{column.title}</p>
          <ul className="mt-4 flex flex-col gap-2.5">
            {column.links.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={LINK}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ))}
    </div>
  );
}

function Said() {
  return (
    <>
      <p className="max-w-[300px] text-[21px]/[1.4] text-ink">{footer.line}</p>
      <a href="https://onmorse.com" className={`${PRIMARY} mt-7`}>
        Open Morse
      </a>
    </>
  );
}

function Legal({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-4 text-[15px] text-ink-faint sm:flex-row sm:justify-between ${className}`}>
      <p>© 2026 Unified Machines</p>
      <p className="flex items-center gap-2.5">
        {footer.maker}
        <UnifiedMachinesLogo className="h-[15px] w-auto shrink-0" />
      </p>
    </div>
  );
}

/** A — the mark holds the left half of the floor; a rule closes the page. */
function FooterA() {
  return (
    <footer className={`${WRAP} pt-24 pb-10`}>
      <div className="grid gap-14 lg:grid-cols-[1fr_1.45fr] lg:gap-24">
        <div>
          <Said />
        </div>
        <Columns />
      </div>
      <Logo className="mt-28 h-[150px] w-auto text-ink" />
      <Legal className="mt-14 border-t border-hairline pt-8" />
    </footer>
  );
}

/** B — the mark is the floor itself, page-wide, and quiet enough to sit under. */
function FooterB() {
  return (
    <footer className={`${WRAP} pt-24 pb-10`}>
      <div className="grid gap-14 lg:grid-cols-[1fr_1.45fr] lg:gap-24">
        <div>
          <Said />
        </div>
        <Columns />
      </div>
      <Legal className="mt-24" />
      <Logo className="mt-8 w-full text-ink/[0.13]" />
    </footer>
  );
}

/** C — the mark runs off the bottom edge, the way a masthead does. */
function FooterC() {
  return (
    <footer className={`${WRAP} pt-24`}>
      <div className="grid gap-14 lg:grid-cols-[1fr_1.45fr] lg:gap-24">
        <div>
          <Said />
        </div>
        <Columns />
      </div>
      <div className="mt-24 flex items-end justify-between gap-10">
        <div className="h-[128px] overflow-hidden">
          <Logo className="h-[178px] w-auto text-ink" />
        </div>
        <p className="flex shrink-0 items-center gap-2.5 pb-2 text-[15px] text-ink-faint">
          {footer.maker}
          <UnifiedMachinesLogo className="h-[15px] w-auto shrink-0" />
        </p>
      </div>
    </footer>
  );
}

export default function Page() {
  const options: [string, React.ReactNode][] = [
    ["A · The mark holds the floor, a rule closes the page", <FooterA key="a" />],
    ["B · The mark is the floor, page-wide and quiet", <FooterB key="b" />],
    ["C · The mark runs off the bottom edge", <FooterC key="c" />],
  ];
  return (
    <main>
      {options.map(([label, node], i) => (
        <section key={label} data-shot={`footer-${"abc"[i]}`} className="border-t border-hairline">
          <p className="px-8 pt-10 font-mono text-label text-ink-faint uppercase">{label}</p>
          {node}
        </section>
      ))}
    </main>
  );
}
