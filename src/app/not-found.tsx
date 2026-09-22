import Link from "next/link";
import { LogoMark } from "@/components/logo";
import { PRIMARY } from "@/components/ui";

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center px-5 text-center">
      <div>
        <LogoMark className="mx-auto size-10 text-ink-soft" title="" />
        <h1 className="mt-7 text-[38px]/[1.1] font-light tracking-[-0.025em] text-ink sm:text-[48px]/[1.06]">
          Nothing at this address.
        </h1>
        <p className="mt-4 text-[18px] text-ink-soft">The page you were after isn’t here.</p>
        <Link href="/" className={`${PRIMARY} mt-8`}>
          Back to the start
        </Link>
      </div>
    </main>
  );
}
