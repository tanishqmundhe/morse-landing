import Image from "next/image";
import { ArrowRight01Icon, CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";
import { app } from "@/content/site";
import { Artwork } from "./artwork";
import { Eyebrow, H2, Heading, Icon, LEAD, PRIMARY, SECTION, WRAP } from "./ui";

/**
 * Morse on a phone, near the foot of the page.
 *
 * The section is one artwork panel with a margin all round — a poster rather
 * than a band — and two things stand on it: the promise on a frosted card, and
 * the handset rising out of the panel's bottom edge.
 *
 * The screen is a real screenshot of the iOS app, not a drawing of one. The
 * previous version rebuilt the home screen out of the page's own tokens, which
 * meant the one place on the site that promised a shipped product was showing
 * something that had never been built. A photograph of the thing is worth more
 * than a careful lie about it.
 *
 * It is cropped just under the Upcoming/Past control and runs off the panel's
 * foot, so the frame has no bottom bezel. That is deliberate twice over: it
 * reads as a device coming up out of the picture rather than a picture of a
 * device, and it ends the screenshot on a finished element instead of on the
 * meeting list, which in the capture was test data.
 */

/** Apple's mark, as a glyph at text size — the same one the hero uses. */
function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[17px] shrink-0 fill-current">
      <path d="M16.36 12.78c.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.48.83-.72 0-1.83-.81-3-.79-1.55.02-2.98.9-3.77 2.28-1.61 2.79-.41 6.92 1.15 9.18.76 1.11 1.67 2.35 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.39 0 1.78.74 3 .72 1.24-.02 2.02-1.12 2.78-2.24.88-1.29 1.24-2.53 1.26-2.6-.03-.01-2.41-.93-2.43-3.68M14.1 5.99c.63-.77 1.06-1.83.94-2.89-.91.04-2.01.61-2.67 1.37-.58.68-1.1 1.76-.96 2.8 1.02.08 2.06-.52 2.69-1.28" />
    </svg>
  );
}

/**
 * The handset: the app's own screen inside a bezel with no foot.
 *
 * The bezel stays dark in both themes — `bg-ink` inverts, and a white handset
 * in dark mode read as a lit object rather than a device. The aspect is the
 * crop's own (780 × 1350), so the screenshot fills the glass exactly and
 * nothing is scaled off-centre.
 */
function Phone() {
  return (
    <div className="w-[236px] sm:w-[280px] lg:w-[318px] xl:w-[352px]">
      <div className="rounded-t-[42px] bg-[#0e1d21] p-[10px] pb-0 shadow-float dark:bg-[#2c2b2a]">
        <div className="overflow-hidden rounded-t-[33px]">
          <Image
            src="/app/phone-meetings.webp"
            alt="The Morse iPhone app: one upcoming meeting, a Start button, and shortcuts to start an instant meeting, create a link for later, or schedule one."
            width={780}
            height={1350}
            sizes="(max-width: 640px) 236px, (max-width: 1280px) 318px, 352px"
            className="block w-full"
          />
        </div>
      </div>
    </div>
  );
}

export function AppSection() {
  return (
    <section id="app" className={`${WRAP} ${SECTION} scroll-mt-24`}>
      {/* The phone runs off the foot of the panel, so the panel's own
          `overflow-hidden` is what cuts it. */}
      <Artwork
        src="dusk"
        alt="Infrared dusk: a sun setting behind a mesa over still water, in lime, cyan and coral."
        glitchDelay={3.8}
        className="grid gap-10 p-6 pt-10 sm:p-10 sm:pt-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-8 lg:p-12"
      >
        <div className="self-center rounded-[22px] bg-canvas/88 p-7 backdrop-blur-xl sm:rounded-[26px] sm:p-9 lg:max-w-[540px]">
          <Eyebrow className="mb-5">{app.eyebrow}</Eyebrow>
          <Heading lead={app.title} muted={app.titleMuted} className={H2} />
          <p className={`${LEAD} mt-6 max-w-[42ch]`}>{app.body}</p>

          <ul className="mt-8 flex flex-col gap-3.5">
            {app.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-[17px]/[1.5] text-ink">
                <Icon icon={CheckmarkCircle02Icon} className="mt-0.5 size-[19px] shrink-0 text-understood-ink" />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href={app.cta.href} className={`${PRIMARY} group`}>
              <AppleMark />
              {app.cta.label}
              <Icon icon={ArrowRight01Icon} className="size-[18px] transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <span className="text-[15px] text-ink-faint">{app.mac}</span>
          </div>
        </div>

        {/* Flush with the panel's foot: the negative margin cancels the panel's
            own bottom padding so the bezel meets the edge and is cut by it. */}
        <div className="-mb-6 justify-self-center sm:-mb-10 lg:-mb-12 lg:justify-self-end lg:pr-2">
          <Phone />
        </div>
      </Artwork>
    </section>
  );
}
