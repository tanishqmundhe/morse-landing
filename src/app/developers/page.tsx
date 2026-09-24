import type { Metadata } from "next";
import { Closing } from "@/components/closing";
import { Agent, Limits, Reaches, Start, Updated } from "@/components/developers";
import { Faq } from "@/components/faq";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Eyebrow, Heading, LEAD, PRIMARY, SECONDARY, WRAP } from "@/components/ui";
import { developers } from "@/content/site";

const URL = "https://onmorse.com/developers";
const TITLE = "Developers — Morse";

export const metadata: Metadata = {
  title: TITLE,
  description: developers.overview,
  alternates: { canonical: "/developers" },
  // Next replaces openGraph wholesale or not at all, so without these the page
  // unfurls as the home page — its title, its description, its URL.
  openGraph: {
    title: TITLE,
    description: developers.overview,
    type: "website",
    siteName: "Morse",
    url: "/developers",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: developers.overview,
    images: ["/og.jpg"],
  },
};

/**
 * Structured data. The questions are the point: "does Morse have an API?" is a
 * question people put to an assistant rather than to a search box, and a
 * FAQPage is what gets quoted when they do. The article carries the date, so
 * whatever quotes the page can tell how old the claim is.
 *
 * No Product or Offer: those want a price, and every price Morse publishes is
 * still a placeholder (see `pricing` in site.ts). Inventing one to satisfy a
 * schema would be the exact overclaiming this page is written to avoid.
 */
const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "@id": `${URL}#faq`,
      url: URL,
      name: TITLE,
      mainEntity: developers.faq.items.map((item) => ({
        "@type": "Question",
        "@id": `${URL}#faq-${item.slug}`,
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    {
      "@type": "TechArticle",
      "@id": `${URL}#article`,
      url: URL,
      headline: "The Morse API",
      description: developers.overview,
      datePublished: developers.updatedISO,
      dateModified: developers.updatedISO,
      inLanguage: "en",
      publisher: { "@type": "Organization", name: "Morse", url: "https://onmorse.com" },
    },
  ],
};

/** The same rhythm the pricing page uses: applied to the bottom of each part,
 *  so the gap between two parts is one section's worth and not two. */
const PART = "pb-28 lg:pb-40 2xl:pb-48";
const FIRST = "pt-28 lg:pt-40 2xl:pt-48";

/** The hero's stagger, as hero.tsx writes it. */
const at = (ms: number) => ({ animationDelay: `${ms}ms` });

/**
 * /developers — the API, for anyone deciding whether to build on it.
 *
 * This page argues the case and stops. The reference — every route, its
 * parameters, its schemas — is the api-docs project on its own domain, and
 * every "read the reference" here goes there rather than restating it.
 *
 * It opens on a dot field rather than the artwork the other pages carry. This
 * is the machine's page, and the dots are already its register — the rail's
 * ground in the quiet band, and the band under the hero.
 */
export default function Page() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="dots relative isolate overflow-hidden border-b border-hairline">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_50%_-10%,var(--overlay),transparent_60%)]"
          />
          {/* The home page's own entrance, on the home page's clock: the label,
              then the sentence, then the line under it, then the way in. */}
          <div className={`${WRAP} flex min-h-[420px] flex-col justify-end pt-36 pb-16 lg:min-h-[500px] lg:pt-44 lg:pb-20`}>
            <div className="animate-enter" style={at(200)}>
              <Eyebrow className="mb-5">{developers.eyebrow}</Eyebrow>
            </div>
            <div className="animate-enter" style={at(350)}>
              <Heading
                as="h1"
                lead={developers.title}
                muted={developers.titleMuted}
                className="text-[46px]/[1.05] sm:text-[62px]/[1.02] xl:text-[76px]/[1]"
              />
            </div>
            <p className={`${LEAD} mt-6 max-w-[620px] animate-enter`} style={at(700)}>
              {developers.lede}
            </p>

            <div className="mt-10 flex animate-enter flex-wrap items-center gap-3" style={at(850)}>
              <a href={developers.cta.primary.href} className={PRIMARY}>
                {developers.cta.primary.label}
              </a>
              <a href={developers.cta.secondary.href} className={SECONDARY}>
                {developers.cta.secondary.label}
              </a>
            </div>
          </div>
        </section>

        <section className={`${WRAP} ${FIRST} ${PART}`}>
          <Reaches />
        </section>

        <section className={`${WRAP} ${PART}`}>
          <Start />
        </section>

        <section className={`${WRAP} ${PART}`}>
          <Agent />
        </section>

        <section className={`${WRAP} ${PART}`}>
          <Limits />
        </section>

        <Faq className={PART} content={developers.faq} id="questions" />

        <div className={PART}>
          <Updated />
        </div>

        <Closing />
      </main>
      <SiteFooter />

      {/* Each row waits to be observed. Without JavaScript nothing observes
          anything, so they are shown outright — a page about an API should be
          readable by something that does not run scripts, and the text is in
          the HTML either way. */}
      <noscript>
        <style>{".dv-row{opacity:1;transform:none}.dv-w{transform:none;opacity:1}.dv-in{display:none}"}</style>
      </noscript>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
    </>
  );
}
