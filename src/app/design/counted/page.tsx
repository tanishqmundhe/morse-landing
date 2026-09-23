import type { Metadata } from "next";

/** Not part of the site: a private gallery, kept out of search. */
export const metadata: Metadata = { robots: { index: false, follow: false } };

import { Calendar03Icon, Note01Icon, SparklesIcon, Tick02Icon, ShieldKeyIcon, EyeIcon } from "@hugeicons/core-free-icons";
import { CARD, Eyebrow, H2, Heading, Icon, LEAD, SECTION, WRAP } from "@/components/ui";

/** Throwaway gallery: three things the "Counted" slot could be instead. */

/** 1 — Before, during, after. A real sequence, so the numbers are earned. */
const MOMENTS = [
  {
    when: "Before",
    title: "Your week fills itself.",
    body: "Share one link. People pick from the times you actually have free, in their own time zone.",
    icon: Calendar03Icon,
  },
  {
    when: "During",
    title: "You talk. It writes.",
    body: "Notes and action items as they are said, questions answered from your own notes, captions translated as you speak.",
    icon: SparklesIcon,
  },
  {
    when: "After",
    title: "The write-up is already done.",
    body: "A summary, the decisions, and who owns what by when — with the follow-up offered for booking before anyone hangs up.",
    icon: Note01Icon,
  },
];

function OptionOne() {
  return (
    <section className={`${WRAP} ${SECTION}`}>
      <div className="max-w-[720px]">
        <Eyebrow className="mb-5">How it goes</Eyebrow>
        <Heading lead="One meeting," muted="start to finish." className={H2} />
      </div>
      <ol className="mt-16 grid gap-px overflow-hidden rounded-[28px] bg-hairline lg:mt-20 lg:grid-cols-3">
        {MOMENTS.map((m, i) => (
          <li key={m.when} className="flex flex-col bg-raised p-9">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-overlay text-ink-soft">
                <Icon icon={m.icon} className="size-5" />
              </span>
              <span className="font-mono text-label text-ink-faint uppercase">
                {String(i + 1).padStart(2, "0")} · {m.when}
              </span>
            </div>
            <p className="mt-7 text-[26px]/[1.2] font-light text-ink">{m.title}</p>
            <p className="mt-3 text-[17px]/[1.6] text-ink-soft">{m.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** 2 — The notes document, which is the thing you actually keep. */
function OptionTwo() {
  return (
    <section className={`${WRAP} ${SECTION}`}>
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
        <div>
          <Eyebrow className="mb-5">What you keep</Eyebrow>
          <Heading lead="The meeting," muted="written down." className={H2} />
          <p className={`${LEAD} mt-6 max-w-[420px]`}>
            Every call leaves a page behind: what was decided, who has what, and when it is due. Pick a template to match the
            meeting — standup, 1:1, client call, retrospective.
          </p>
        </div>

        <div className={`${CARD} p-8`}>
          <p className="font-mono text-label text-ink-faint uppercase">Weekly product sync · 23 Sep</p>
          <p className="mt-5 text-[22px]/[1.3] font-light text-ink">Launch brief, pricing page, and the onboarding drop-off.</p>
          <div className="mt-7 space-y-px overflow-hidden rounded-[18px] bg-hairline">
            {[
              ["Decision", "Ship the launch brief Friday, pricing page after."],
              ["Action", "Launch brief · Jamie · Fri"],
              ["Action", "Rewrite step three of onboarding · Priya · next week"],
            ].map(([kind, text]) => (
              <p key={text} className="flex items-start gap-3.5 bg-raised px-5 py-4 text-[16px]/[1.45]">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-action text-action-foreground">
                  <Icon icon={Tick02Icon} className="size-3.5" />
                </span>
                <span>
                  <span className="text-ink-faint">{kind} · </span>
                  <span className="text-ink">{text}</span>
                </span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** 3 — The quiet facts, including the counts, without a counter band. */
const FACTS = [
  { icon: EyeIcon, title: "No bot joins your call.", body: "Morse transcribes the meeting itself. No extra attendee, and recording is visible to everyone in the room." },
  { icon: ShieldKeyIcon, title: "It lives in your Google account.", body: "Google sign-in, your own calendar, your own Drive. Nothing is kept somewhere you can't reach." },
  { icon: SparklesIcon, title: "18 languages, 16 backgrounds, 11 note templates.", body: "Ten languages understood without a setting, eight more when you ask. Seven camera styles." },
];

function OptionThree() {
  return (
    <section className={`${WRAP} ${SECTION}`}>
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div>
          <Eyebrow className="mb-5">The quiet part</Eyebrow>
          <Heading lead="Nothing you" muted="have to watch." className={H2} />
        </div>
        <dl>
          {FACTS.map((f) => (
            <div key={f.title} className="flex gap-6 border-t border-hairline py-8 first:border-t-0 first:pt-0">
              <Icon icon={f.icon} className="mt-1 size-6 shrink-0 text-ink-faint" />
              <div>
                <dt className="text-[22px]/[1.3] font-light text-ink">{f.title}</dt>
                <dd className="mt-2 max-w-[56ch] text-[17px]/[1.6] text-ink-soft">{f.body}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default function Page() {
  const options: [string, React.ReactNode][] = [
    ["1 · One meeting, start to finish", <OptionOne key="1" />],
    ["2 · The meeting, written down", <OptionTwo key="2" />],
    ["3 · The quiet part", <OptionThree key="3" />],
  ];
  return (
    <main>
      {options.map(([label, node], i) => (
        <section key={label} data-shot={`counted-${i + 1}`} className="border-t border-hairline">
          <p className="px-8 pt-10 font-mono text-label text-ink-faint uppercase">{label}</p>
          {node}
        </section>
      ))}
    </main>
  );
}
