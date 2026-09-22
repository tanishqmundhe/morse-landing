import { BookingPage } from "@/components/booking-page";
import { Closing } from "@/components/closing";
import { Faq } from "@/components/faq";
import { FollowUp } from "@/components/follow-up";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features/features";
import { Personal } from "@/components/personal";
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
        <Personal />
        <FollowUp />
        <Faq />
        <Closing />
      </main>
      <SiteFooter />
    </>
  );
}
