import { footer } from "@/content/site";
import { Logo } from "./logo";
import { UnifiedMachinesLogo } from "./unified-machines-logo";
import { WRAP } from "./ui";

/** The app's footer, both ends: Morse on one, who made it on the other. */
export function SiteFooter() {
  return (
    <footer className={`${WRAP} flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-hairline py-8 text-ink-faint`}>
      <Logo className="h-[18px] w-auto" />
      <p className="flex items-center gap-2 text-[15px]">
        {footer.maker}
        <UnifiedMachinesLogo className="h-[28px] w-auto shrink-0" />
      </p>
    </footer>
  );
}
