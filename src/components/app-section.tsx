import { ArrowRight01Icon, CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";
import { app } from "@/content/site";
import { Avatar } from "./avatar";
import { LogoMark } from "./logo";
import { Eyebrow, H2, Heading, Icon, LEAD, PRIMARY, SECTION, WRAP } from "./ui";

/**
 * Morse on a phone, near the foot of the page.
 *
 * The device is drawn rather than photographed: a bezel, a rounded screen and
 * a dynamic island, all from the page's own tokens. A rendered handset in a
 * marketing shot is somebody else's industrial design borrowed as decoration,
 * and it dates the moment Apple changes the corner radius. This is a frame
 * that says "phone" and gets out of the way of what is on it.
 *
 * What is on it is the app's home, at phone proportions — the greeting, the
 * next two meetings, one green thing to press. It is the same content the
 * showcase's HomeScreen carries, laid out for a 390pt column rather than a
 * 1120px one.
 */

/** Apple's mark, as a glyph at text size — the same one the hero uses. */
function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[17px] shrink-0 fill-current">
      <path d="M16.36 12.78c.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.48.83-.72 0-1.83-.81-3-.79-1.55.02-2.98.9-3.77 2.28-1.61 2.79-.41 6.92 1.15 9.18.76 1.11 1.67 2.35 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.39 0 1.78.74 3 .72 1.24-.02 2.02-1.12 2.78-2.24.88-1.29 1.24-2.53 1.26-2.6-.03-.01-2.41-.93-2.43-3.68M14.1 5.99c.63-.77 1.06-1.83.94-2.89-.91.04-2.01.61-2.67 1.37-.58.68-1.1 1.76-.96 2.8 1.02.08 2.06-.52 2.69-1.28" />
    </svg>
  );
}

function Row({ when, length, title, who, join }: { when: string; length: string; title: string; who: string; join?: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-[18px] bg-raised p-3.5">
      <div className="w-[52px] shrink-0">
        <p className="text-[13px] font-medium text-ink">{when}</p>
        <p className="text-[11px] text-ink-faint">{length}</p>
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-medium text-ink">{title}</p>
        <p className="truncate text-[11px] text-ink-faint">{who}</p>
      </div>
      {join ? (
        <span className="shrink-0 rounded-full bg-action px-3.5 py-1.5 text-[12px] font-medium text-action-foreground">{app.screen.action}</span>
      ) : (
        <span className="shrink-0 rounded-full bg-overlay px-3 py-1.5 text-[12px] text-ink-soft">Details</span>
      )}
    </div>
  );
}

/** The handset. 390 × 800 inside a 12px bezel — iPhone proportions without
 *  copying anybody's corner. */
function Phone() {
  return (
    <div className="relative mx-auto w-[318px] shrink-0 sm:w-[352px]">
      {/* The bezel, and the shadow that lifts it off the page. */}
      {/* The bezel stays dark in both themes: `bg-ink` inverts, and a white
          handset in dark mode read as a lit object rather than a device. */}
      <div className="rounded-[46px] bg-[#0e1d21] p-[11px] shadow-float dark:bg-[#2c2b2a]">
        {/* 9:19.5, which is the handset's own ratio. Without it the screen came
            out 1:1.19 and read as a tablet. */}
        <div className="relative isolate flex aspect-[9/19.5] flex-col overflow-hidden rounded-[36px] bg-canvas">
          {/* The island. Drawn, not an image. */}
          <div className="absolute top-2.5 left-1/2 z-10 h-[22px] w-[86px] -translate-x-1/2 rounded-full bg-ink" />

          <div className="flex-1 px-4 pt-12 pb-5">
            <div className="flex items-center justify-between">
              <LogoMark className="size-[22px] text-ink" title="" />
              <Avatar colour="sage" name="Amara Cole" size={26} />
            </div>

            <p className="mt-6 text-[20px]/[1.2] font-light tracking-[-0.02em] text-ink">{app.screen.greeting}</p>
            <p className="mt-1.5 text-[12px] text-ink-faint">{app.screen.sub}</p>

            <div className="mt-6 flex flex-col gap-2.5">
              <Row {...app.screen.next} join />
              <Row {...app.screen.later} />
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-[16px] bg-sunken px-3.5 py-3">
              <span className="size-2 shrink-0 rounded-full bg-understood" />
              <p className="text-[12px] text-ink-soft">Notes from yesterday are ready</p>
            </div>

            <div className="mt-5 grid place-items-center rounded-[18px] bg-sunken py-6">
              <span className="flex items-center gap-2 rounded-full bg-action px-5 py-2.5 text-[13px] font-medium text-action-foreground">
                <span aria-hidden="true" className="text-[15px] leading-none">+</span>
                Start a meeting
              </span>
              <p className="mt-2.5 text-[11px] text-ink-faint">or paste a link to join</p>
            </div>
          </div>

          {/* The app's own tab bar, so the frame reads as a running app rather
              than a cropped screenshot. */}
          <div className="mt-auto flex items-center justify-around border-t border-hairline px-4 pt-3 pb-7">
            {[
              ["Home", true],
              ["Calendar", false],
              ["Knowledge", false],
              ["You", false],
            ].map(([label, on]) => (
              <span key={label as string} className="flex flex-col items-center gap-1.5">
                <span className={`size-[18px] rounded-[6px] ${on ? "bg-ink" : "bg-ink-faint/40"}`} />
                <span className={`text-[10px] ${on ? "text-ink" : "text-ink-faint"}`}>{label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AppSection() {
  return (
    <section id="app" className={`${WRAP} ${SECTION} scroll-mt-24`}>
      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-24">
        <div>
          <Eyebrow className="mb-5">{app.eyebrow}</Eyebrow>
          <Heading lead={app.title} muted={app.titleMuted} className={H2} />
          <p className={`${LEAD} mt-6 max-w-[46ch]`}>{app.body}</p>

          <ul className="mt-9 flex flex-col gap-3.5">
            {app.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-[17px]/[1.5] text-ink">
                <Icon icon={CheckmarkCircle02Icon} className="mt-0.5 size-[19px] shrink-0 text-understood-ink" />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href={app.cta.href} className={`${PRIMARY} group`}>
              <AppleMark />
              {app.cta.label}
              <Icon icon={ArrowRight01Icon} className="size-[18px] transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <span className="text-[15px] text-ink-faint">{app.mac}</span>
          </div>
        </div>

        <Phone />
      </div>
    </section>
  );
}
