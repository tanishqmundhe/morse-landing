import type { Metadata } from "next";
import { Closing } from "@/components/closing";
import { ComparePage } from "@/components/compare-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { comparison } from "@/content/site";

export const metadata: Metadata = {
  title: "Compare — Morse",
  description: comparison.lede,
  alternates: { canonical: "/compare" },
};

/**
 * Plain paper, like the pricing page. The artwork belongs to the home page and
 * to the one band it carries; a comparison page that also shouted would make
 * the reader distrust the numbers on it.
 */
export default function Page() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <ComparePage />
        <Closing />
      </main>
      <SiteFooter />
    </>
  );
}
