import { Calendar } from "@/components/calendar";
import { Closing } from "@/components/closing";
import { Essentials } from "@/components/essentials";
import { Experience } from "@/components/experience";
import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import { Personal } from "@/components/personal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Workflow } from "@/components/workflow";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Essentials />
        <Experience />
        <Calendar />
        <Personal />
        <Workflow />
        <Faq />
        <Closing />
      </main>
      <SiteFooter />
    </>
  );
}
