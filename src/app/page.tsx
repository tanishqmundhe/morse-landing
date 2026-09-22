import { BookingPage } from "@/components/booking-page";
import { Closing } from "@/components/closing";
import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features/features";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Showcase } from "@/components/showcase/showcase";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Showcase />
        <Features />
        <BookingPage />
        <Faq />
        <Closing />
      </main>
      <SiteFooter />
    </>
  );
}
