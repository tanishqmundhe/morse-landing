import { BookingPage } from "@/components/booking-page";
import { Closing } from "@/components/closing";
import { AppSection } from "@/components/app-section";
import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features/features";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Quiet } from "@/components/quiet";
import { Replaces } from "@/components/replaces";
import { Showcase } from "@/components/showcase/showcase";
import { UsedBy } from "@/components/used-by";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Replaces />
        <Showcase />
        <Features />
        <Quiet />
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
