import Image from "next/image";
import { usedBy } from "@/content/site";
import { COMPANIES, type Company } from "./company-marks";
import { GlitchBand } from "./glitch";
import { Eyebrow, H2, Heading, LEAD, SECTION, WRAP } from "./ui";

/**
 * Who is running their meetings on Morse.
 *
 * A band of the artwork with the seven marks laid over it. It takes the theme
 * like every other panel — cream sky and ink marks on a light page, black sky
 * and paper marks on a dark one. The heading is centred and sits on the page
 * above the band, because contract #2e holds: a card may sit on the artwork,
 * loose text may not, and the artwork is scrimmed past 80% here anyway, which
 * is the only reason marks can be read on it at all.
 *
 * **Every mark carries its name.** Not one of these is a logo anybody
 * recognises, so a bare row would be decoration claiming to be proof. The name
 * is set in the page's own mono label — at `ink/80`, not `ink-soft`, because
 * over the brightest part of the picture `ink-soft` measures 4.2:1 and this
 * text is small. That settles what a scraped logo
 * wall usually gets wrong: two of the seven publish mark-plus-wordmark
 * lockups and five publish marks alone, and mixing those in one row reads as
 * carelessness. Marks only, names in Plex, one weight throughout.
 *
 * Nothing here links out. These are companies vouching for Morse, not
 * partners being advertised, and a row of seven outbound links at the foot of
 * the page is a row of seven ways to leave it.
 */

/** One company's mark, on a fixed line so seven different shapes share a
 *  baseline and the names below them land level. */
function Mark({ company, base }: { company: Company; base: number }) {
  const height = Math.round(base * company.scale);
  if (company.mask) {
    // No vector artwork exists for this one; the mask paints currentColor
    // through the PNG's alpha, which recolours with the theme as an <img>
    // would not. Width is the source's 4:3, so it is never stretched.
    return (
      <span
        aria-hidden="true"
        className="block bg-current"
        style={{
          height,
          width: Math.round(height * 1.33),
          maskImage: `url(${company.mask})`,
          WebkitMaskImage: `url(${company.mask})`,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      />
    );
  }
  return (
    <svg
      viewBox={company.viewBox}
      height={height}
      aria-hidden="true"
      className="w-auto"
      style={{ height }}
      dangerouslySetInnerHTML={{ __html: company.svg ?? "" }}
    />
  );
}

export function UsedBy() {
  return (
    <section id="used-by" className={`${WRAP} ${SECTION} scroll-mt-24`}>
      <div className="mx-auto max-w-[760px] text-center">
        <Eyebrow className="mb-5">{usedBy.eyebrow}</Eyebrow>
        <Heading lead={usedBy.title} muted={usedBy.titleMuted} className={H2} />
        <p className={`${LEAD} mx-auto mt-6 max-w-[52ch]`}>{usedBy.body}</p>
      </div>

      {/* The band takes the theme like every other panel: cream sky and ink
          marks on a light page, black sky and paper marks on a dark one. It
          was black-skied in both, which left a dark slab sitting in the middle
          of a cream page. */}
      <div className="relative isolate mt-14 overflow-hidden rounded-[22px] sm:rounded-[26px] lg:mt-16">
        <Image
          src="/art/current-light.webp"
          alt=""
          aria-hidden="true"
          width={1600}
          height={1067}
          sizes="(max-width: 1280px) 100vw, 1200px"
          className="absolute inset-0 -z-20 size-full object-cover object-[center_18%] dark:hidden"
        />
        <Image
          src="/art/current.webp"
          alt=""
          aria-hidden="true"
          width={1600}
          height={1067}
          sizes="(max-width: 1280px) 100vw, 1200px"
          className="absolute inset-0 -z-20 hidden size-full object-cover object-[center_18%] dark:block"
        />
        <GlitchBand src="current" delay={4.6} className="absolute inset-0 -z-20 size-full object-cover object-[center_18%]" />
        {/* `object-[center_18%]` because the picture's middle band is its
            darkest — cropping there gave a flat olive rectangle with no
            artwork visible in it at all. 72% lands on the lit mesa and the
            ground below it, which is the half worth showing.

            The scrim is flat rather than a gradient: the marks sit right
            across the width, so every one of them needs the same ground under
            it, and a gradient would leave one end of the row paler than the
            other. Paper on the light page, ink on the dark one — the picture
            is texture under the marks either way, never a picture you read. */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[oklch(0.972_0.014_105/0.55)] dark:bg-[oklch(0.19_0.002_90/0.7)]" />

        {/* The row runs, so it never reads as a wall of seven and nothing
            more. The track is the list twice over moving by exactly half its
            width, which is the same trick the "Instead of" band uses — the
            loop cannot jump, whatever the list grows to.

            The second copy is `aria-hidden`: a screen reader should hear the
            seven companies once, not fourteen. Edges fade with a mask so marks
            arrive and leave rather than being clipped off mid-shape. */}
        <div
          className="overflow-hidden py-16 lg:py-20 [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]"
        >
          <div className="marquee-slow flex w-max">
            {[0, 1].map((copy) => (
              <ul key={copy} className="flex" aria-hidden={copy > 0}>
                {COMPANIES.map((company) => (
                  <li key={company.name} className="flex w-[180px] shrink-0 flex-col items-center gap-4 px-4 text-ink sm:w-[220px] lg:w-[248px]">
                    <span className="grid h-11 place-items-center">
                      <Mark company={company} base={32} />
                    </span>
                    <span className="text-center font-mono text-label text-ink/80">{company.name}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
