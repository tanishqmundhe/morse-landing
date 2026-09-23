import type { Metadata } from "next";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { CARD, Eyebrow, H2, Heading, Icon, LEAD, SECTION, WRAP } from "@/components/ui";
import { Logo, LogoMark } from "@/components/logo";

/** Not part of the site: a private gallery, kept out of search. */
export const metadata: Metadata = { robots: { index: false, follow: false } };

/**
 * Four ways to say what Morse stands in for. Tools are named in type, never
 * by their logos: their brand guidelines mostly forbid comparative use, and a
 * wall of other companies' trademarks isn't ours to ship.
 *
 * Five categories, each one a thing Morse genuinely does. Deliberately not
 * "replaces your calendar" — Morse syncs with Google Calendar, it doesn't
 * replace it — and not Excalidraw, which is what the whiteboard runs on.
 */
const ROWS: { kind: string; tools: string[]; instead: string }[] = [
  { kind: "The video call", tools: ["Zoom", "Google Meet", "Teams"], instead: "Morse is the call." },
  { kind: "The notetaker", tools: ["Otter", "Fireflies", "Granola", "Fathom"], instead: "Notes, action items and owners, written as you talk." },
  { kind: "The scheduling link", tools: ["Calendly", "Cal.com", "SavvyCal"], instead: "A booking page tied to the calendar you already keep." },
  { kind: "The whiteboard", tools: ["Miro", "FigJam"], instead: "A board inside the call, with everyone's cursor on it." },
  { kind: "The translator", tools: ["Interprefy", "Wordly"], instead: "Captions in eighteen languages, while you speak." },
];

/** A — the ledger. Five rows, what goes and what takes its place. */
function OptionA() {
  return (
    <section className={`${WRAP} ${SECTION}`}>
      <div className="max-w-[760px]">
        <Eyebrow className="mb-5">Instead of</Eyebrow>
        <Heading lead="Five subscriptions," muted="one meeting." className={H2} />
        <p className={`${LEAD} mt-6`}>Everything a meeting needs, in the place the meeting already is.</p>
      </div>

      <dl className="mt-16 lg:mt-20">
        {ROWS.map((row) => (
          <div key={row.kind} className="grid gap-4 border-t border-hairline py-7 lg:grid-cols-[1fr_1.1fr_1.4fr] lg:items-baseline lg:gap-10">
            <dt className="text-[22px]/[1.25] font-light text-ink sm:text-[25px]/[1.25]">{row.kind}</dt>
            <p className="font-mono text-[14px] tracking-[0.02em] text-ink-faint uppercase">{row.tools.join(" · ")}</p>
            <dd className="text-[17px]/[1.55] text-ink-soft">{row.instead}</dd>
          </div>
        ))}
        <div className="border-t border-hairline" />
      </dl>
    </section>
  );
}

/** B — the stack that collapses into one. */
function OptionB() {
  return (
    <section className={`${WRAP} ${SECTION}`}>
      <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
        <div>
          <Eyebrow className="mb-5">Instead of</Eyebrow>
          <Heading lead="Five tabs" muted="become one." className={H2} />
          <p className={`${LEAD} mt-6 max-w-[440px]`}>
            The call, the notetaker, the scheduling link, the whiteboard and the translator are all the same meeting. Morse
            treats them that way.
          </p>
        </div>

        <div className="relative">
          {/* The five, stacked and falling away. */}
          {ROWS.map((row, i) => (
            <div
              key={row.kind}
              className="mb-2.5 flex items-center gap-4 rounded-[18px] bg-raised px-6 py-4 shadow-raised"
              style={{ marginLeft: i * 26, opacity: 1 - i * 0.16 }}
            >
              <Icon icon={Cancel01Icon} className="size-[18px] shrink-0 text-ink-faint" />
              <span className="text-[17px] text-ink-soft">{row.kind}</span>
              <span className="ml-auto font-mono text-[13px] text-ink-faint uppercase">{row.tools[0]}</span>
            </div>
          ))}
          {/* And the one left standing. */}
          <div className={`${CARD} mt-6 flex items-center gap-4 px-6 py-5`}>
            <LogoMark className="size-7 shrink-0 text-ink" />
            <span className="text-[19px] text-ink">One meeting, one tab, one bill.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/** C — struck through. The line through each name is the argument. */
function OptionC() {
  return (
    <section className={`${WRAP} ${SECTION}`}>
      <div className="text-center">
        <Eyebrow className="mb-5">Instead of</Eyebrow>
        <Heading lead="You can stop paying" muted="for four of these." className={H2} />
      </div>

      <div className="mx-auto mt-16 flex max-w-[900px] flex-wrap justify-center gap-x-8 gap-y-5 lg:mt-20">
        {ROWS.flatMap((r) => r.tools).map((tool) => (
          <span key={tool} className="relative text-[28px]/[1.2] font-light text-ink-faint sm:text-[34px]/[1.2]">
            {tool}
            <span aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-ink-faint" />
          </span>
        ))}
      </div>

      <p className="mx-auto mt-14 max-w-[540px] text-center text-[19px]/[1.5] text-ink">
        Morse is the call, the notes, the booking page, the whiteboard and the captions. One subscription, one tab.
      </p>
    </section>
  );
}

/** D — the browser, with four tabs closing. */
function OptionD() {
  return (
    <section className={`${WRAP} ${SECTION}`}>
      <div className="max-w-[720px]">
        <Eyebrow className="mb-5">Instead of</Eyebrow>
        <Heading lead="Close the other" muted="four tabs." className={H2} />
        <p className={`${LEAD} mt-6`}>Everything a meeting needs is already in the meeting.</p>
      </div>

      <div className={`${CARD} mt-16 overflow-hidden p-2 lg:mt-20`}>
        <div className="flex gap-1.5 overflow-hidden">
          {ROWS.map((row, i) => (
            <div
              key={row.kind}
              className={`flex min-w-0 flex-1 items-center gap-3 rounded-[14px] px-4 py-3 ${i === 0 ? "bg-float shadow-float" : "bg-transparent"}`}
            >
              {i === 0 ? <LogoMark className="size-4 shrink-0 text-ink" /> : <span className="size-4 shrink-0 rounded-full bg-overlay" />}
              <span className={`truncate text-[15px] ${i === 0 ? "text-ink" : "text-ink-faint"}`}>
                {i === 0 ? "Morse — Weekly product sync" : row.tools[0]}
              </span>
              <Icon icon={Cancel01Icon} className={`ml-auto size-4 shrink-0 ${i === 0 ? "text-ink-soft" : "text-ink-faint"}`} />
            </div>
          ))}
        </div>

        <div className="mt-2 grid gap-px overflow-hidden rounded-[18px] bg-hairline sm:grid-cols-5">
          {ROWS.map((row) => (
            <div key={row.kind} className="bg-raised px-5 py-6">
              <p className="text-[17px] text-ink">{row.kind}</p>
              <p className="mt-2 text-[15px]/[1.5] text-ink-soft">{row.instead}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  const options: [string, React.ReactNode][] = [
    ["A · The ledger — what goes, what takes its place", <OptionA key="a" />],
    ["B · Five tabs become one", <OptionB key="b" />],
    ["C · Struck through", <OptionC key="c" />],
    ["D · Close the other four tabs", <OptionD key="d" />],
  ];
  return (
    <main>
      {options.map(([label, node], i) => (
        <section key={label} data-shot={`replace-${"abcd"[i]}`} className="border-t border-hairline">
          <p className="px-8 pt-10 font-mono text-label text-ink-faint uppercase">{label}</p>
          {node}
        </section>
      ))}
      <div className="hidden">
        <Logo />
      </div>
    </main>
  );
}
