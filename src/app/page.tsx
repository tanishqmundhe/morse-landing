import { BookingPage } from "@/components/booking-page";
import { Closing } from "@/components/closing";
import { AppSection } from "@/components/app-section";
import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import { Intelligence } from "@/components/intelligence";
import { Features } from "@/components/features/features";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SECTION, WRAP } from "@/components/ui";
import { Quiet } from "@/components/quiet";
import { Replaces } from "@/components/replaces";
import { Showcase } from "@/components/showcase/showcase";
import { Agent } from "@/components/developers";
import { UsedBy } from "@/components/used-by";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Replaces />
        <Showcase />
        <Intelligence />
        <Features />
        <Quiet />
        {/* The agent handoff, brought over from /developers. It belongs on the
            home page too: "a token lets a script or an agent use Morse as you"
            is a product claim, not a developer footnote, and the orbit is the
            only place the page shows what that means. */}
        <section id="agents" className={`${WRAP} ${SECTION} scroll-mt-24`}>
          <Agent />
        </section>
        <UsedBy />
        <BookingPage />
        <AppSection />
        <Faq />
        <Closing />
      </main>
      <SiteFooter />
    </>
  );
}
