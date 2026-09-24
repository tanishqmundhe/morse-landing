"use client";

import { useEffect, useRef } from "react";
import { developers } from "@/content/site";
import { AgentOrbit } from "./agent-orbit";
import { CARD, Eyebrow, H2, Heading, LEAD, UNDERLINE, WRAP } from "./ui";

/**
 * The parts of /developers. Client components, like the rest of the marketing
 * surface (faq.tsx, quiet.tsx, site-header.tsx), because two of them animate.
 *
 * The motion here is one thing: each card arrives as the reader reaches it.
 * Not a timeline — the scroll is the stagger, so a card can never be sitting
 * blank while someone reads it. The terminal does not run; a page about an API
 * is better off showing a real request and its answer than performing one.
 *
 * The register is the app's: a sentence is sans, a string you would type is
 * mono (contract #3). That rule does most of the design work here, because the
 * whole page is a claim about two ways of saying the same thing.
 */

/**
 * What a token reaches, as an index.
 *
 * This slot has been through three shapes. It held a nine-row ledger pairing
 * every app action with the call that does it, which restated the hero at
 * length and did the reference's job. Then six equal cards in a grid, which is
 * the most templated layout on the web and stayed that way however it was
 * coloured. The frame was the problem both times.
 *
 * So: no container at all. The six names set at display size and read down,
 * each with its line beside it, divided by the page's own hairline. The
 * typography carries the section, using the ladder the page already has rather
 * than a component invented for it.
 *
 * A row steps in from the left under the pointer and its name takes its colour.
 * Colour, when it arrives, is the one you are pointing at — not six at once.
 *
 * The line beside it turns over into a second one: what the thing is at rest,
 * and the sharper fact about it under the pointer, a word at a time (`Swap`).
 */export function Reaches() {
  const { reaches } = developers;
  const grid = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = grid.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-on", "");
          io.unobserve(e.target);
        }
      },
      // Generous on purpose. A tight threshold plus a negative bottom margin can
      // strand the last row: at maximum scroll it sits in the excluded band with
      // nowhere further to scroll, so it would never arrive.
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );
    for (const card of el.children) io.observe(card);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <Eyebrow className="mb-5">{reaches.eyebrow}</Eyebrow>
          <Heading lead={reaches.title} muted={reaches.titleMuted} className={H2} />
        </div>
        <p className={`${LEAD} lg:self-end`}>{reaches.body}</p>
      </div>

      {/* A list, because six unranked things are a list. `dv-row` carries the
          arrival and the hover; the tint per row is set by nth-child in
          marketing.css, so the content stays free of presentation. */}
      <ul ref={grid} className="mt-14 border-t border-hairline 3xl:mt-16">
        {reaches.items.map((item) => (
          <li key={item.title} className="dv-row border-b border-hairline">
            <div className="dv-row-in grid items-baseline gap-2 py-6 pl-1 sm:py-7 lg:grid-cols-[1fr_26rem] lg:gap-12">
              <h3 className="dv-name text-[34px]/[1] font-light tracking-[-0.025em] sm:text-[44px]/[1] lg:text-[48px]/[1]">
                {item.title}
              </h3>
              <span className="dv-swap block max-w-[44ch] text-[20px]/[1.5] sm:text-[22px]/[1.45]">
                <Swap from={item.body} to={item.more} />
              </span>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-8 max-w-[62ch] text-[17px]/[1.6] text-ink-soft">
        {reaches.note}{" "}
        <a href={developers.cta.secondary.href} className={`${UNDERLINE} text-ink`}>
          {developers.cta.secondary.label}
        </a>
        .
      </p>
    </>
  );
}


/**
 * One line turning over into another, a word at a time.
 *
 * The motion is fancycomponents.dev's letter-3d-swap: units turned 90° about
 * the horizontal, staggered along the line, so the text reads as rolling over
 * rather than dissolving. It is also what captions.tsx already does on the home
 * page, with GSAP — the same turn, on the same axis, through a perspective.
 *
 * Three departures, each forced by what these two lines are.
 *
 * Not a two-faced box. That is the component's own mechanic and it was the
 * first thing tried here: one box per word, resting line on the front face and
 * the other on the top. A box has one width, and "List" and "The" do not share
 * one — every word came out overlapping the word it was turning into. The box
 * only works when both faces carry the same characters, which is why the
 * original rotates the same text rather than swapping content.
 *
 * So the old line turns out and the new one turns in, each word on its own
 * clock. Neither needs to know anything about the other.
 *
 * And a word, not a letter: the component's own docs call a letter at a time
 * impractical for a long passage, and ninety characters across six rows is over
 * a thousand of them.
 *
 * No package for it either. The registry ships a motion-driven component built
 * for headings; the turn is a transform, so it needs no JavaScript at all.
 *
 * Both sentences are given once, in order, to a screen reader, and the turning
 * words are hidden from it: half a sentence interleaved with half of another is
 * not readable.
 */
function Swap({ from, to }: { from: string; to: string }) {
  const words = (t: string, cls: string) =>
    t.split(" ").map((w, i) => (
      <span key={i}>
        <span className={cls} style={{ ["--i" as string]: i }}>
          {w}
        </span>{" "}
      </span>
    ));

  return (
    <>
      {/* Both lines in one grid cell, so the row is as tall as the longer of
          the two and the turn never moves the page. */}
      <span aria-hidden="true" className="dv-stack grid">
        <span className="dv-out">{words(from, "dv-w")}</span>
        <span className="dv-in">{words(to, "dv-w")}</span>
      </span>
      <span className="sr-only">
        {from} {to}
      </span>
    </>
  );
}

/**
 * The two shapes the terminal shows, coloured by hand.
 *
 * A highlighter would pull a grammar engine into the bundle to paint six fixed
 * lines out of site.ts. These are the tokens those lines actually contain and
 * nothing else — a new snippet may well need a case adding, which is the trade.
 *
 * Colours come from `--syn-*` in marketing.css, which is the same mapping the
 * API's own reference uses, so a request reads the same on both surfaces.
 */
const SHELL: [RegExp, string][] = [
  [/^export\b/, "syn-keyword"],
  [/^(?:curl)\b/, "syn-command"],
  [/^"[^"]*"/, "syn-string"],
  [/^\$\w+/, "syn-var"],
  [/^-[A-Za-z-]+/, "syn-string"],
];

const JSON_: [RegExp, string][] = [
  // A field name is a string with a colon after it; anything else quoted is a value.
  [/^"[^"]*"(?=\s*:)/, "syn-key"],
  [/^"[^"]*"/, "syn-string"],
  [/^-?\d+(?:\.\d+)?/, "syn-number"],
  [/^[[\]{},:]/, "syn-punct"],
];

function paint(line: string, rules: [RegExp, string][]) {
  const out: { text: string; cls: string | null }[] = [];
  let rest = line;
  let plain = "";
  const flush = () => {
    if (plain) out.push({ text: plain, cls: null });
    plain = "";
  };
  while (rest) {
    const hit = rules.find(([re]) => re.test(rest));
    if (hit) {
      const [re, cls] = hit;
      const text = re.exec(rest)![0];
      flush();
      out.push({ text, cls });
      rest = rest.slice(text.length);
    } else {
      plain += rest[0];
      rest = rest.slice(1);
    }
  }
  flush();
  return out;
}

/** One line of the terminal, coloured. */
function Line({ text, lang, className = "" }: { text: string; lang: "shell" | "json"; className?: string }) {
  return (
    <span className={`block ${className}`}>
      {paint(text, lang === "shell" ? SHELL : JSON_).map((t, i) =>
        t.cls ? (
          <span key={i} className={t.cls}>
            {t.text}
          </span>
        ) : (
          t.text
        ),
      )}
    </span>
  );
}

/**
 * Three steps and the request they earn you. The numbers are the app's label
 * register, so the list reads as a procedure rather than three cards.
 *
 * The terminal is still. It held a typing animation for a while, which was both
 * the oldest trick on any API page and a real bug — retyping the command
 * resized the card, and useLoop rebuilds on a resize, so the scene restarted
 * itself for as long as you looked at it. A real request above its real answer
 * says more than a performance of one.
 */
export function Start() {
  const { start } = developers;

  return (
    <>
      <Eyebrow className="mb-5">{start.eyebrow}</Eyebrow>
      <Heading lead={start.title} muted={start.titleMuted} className={H2} />

      <ol className="mt-14 grid gap-px sm:grid-cols-3">
        {start.steps.map((step, i) => (
          <li key={step.title} className="border-t border-hairline pt-6">
            <p aria-hidden="true" className="font-mono text-label text-ink-faint tabular-nums">
              {String(i + 1).padStart(3, "0")}
            </p>
            <h3 className="mt-5 max-w-[22ch] text-[23px]/[1.2] font-light text-ink sm:pr-8">{step.title}</h3>
            <p className="mt-3 max-w-[38ch] text-[17px]/[1.6] text-ink-soft sm:pr-8">{step.body}</p>
          </li>
        ))}
      </ol>

      <figure className={`${CARD} mt-14 overflow-hidden`}>
        <figcaption className="border-b border-hairline px-6 py-4 font-mono text-label text-ink-faint uppercase sm:px-8">
          {start.terminal.label}
        </figcaption>
        {/* Scrolls rather than wraps: a broken line in a shell sample reads as
            a second command. */}
        <pre className="overflow-x-auto px-6 py-6 font-mono text-[14px]/[1.75] sm:px-8 sm:text-[15px]/[1.75]">
          <code>
            {start.terminal.env.map((line) => (
              <Line key={line} text={line} lang="shell" className="text-ink-soft" />
            ))}
            <span className="mt-4 flex text-ink">
              <span aria-hidden="true" className="shrink-0 pr-2 text-ink-faint select-none">$</span>
              <Line text={start.terminal.command} lang="shell" />
            </span>
            {/* The gap goes on the first reply line by index, not `first:` — the
                env lines and the command are ahead of it, so :first-child never
                matched and the output ran straight into the command. */}
            {start.terminal.response.map((line, i) => (
              <Line key={i} text={line} lang="json" className={i === 0 ? "mt-4" : ""} />
            ))}
          </code>
        </pre>
        <figcaption className="border-t border-hairline px-6 py-4 text-[15px]/[1.5] text-ink-faint sm:px-8">
          {start.terminal.caption}
        </figcaption>
      </figure>
    </>
  );
}

/**
 * The limits. On a page whose whole argument is "everything the app does", the
 * exceptions are the part worth reading — so they get a section, not a
 * footnote. Same hairline-topped rows as the steps, two abreast.
 */
export function Limits() {
  const { limits } = developers;
  return (
    <>
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <Eyebrow className="mb-5">{limits.eyebrow}</Eyebrow>
          <Heading lead={limits.title} muted={limits.titleMuted} className={H2} />
        </div>
        <p className={`${LEAD} lg:self-end`}>{limits.body}</p>
      </div>

      <ul className="mt-14 grid gap-x-16 gap-y-10 sm:grid-cols-2">
        {limits.items.map((item) => (
          <li key={item.title} className="border-t border-hairline pt-6">
            <h3 className="text-[21px]/[1.25] font-light text-ink">{item.title}</h3>
            <p className="mt-3 max-w-[44ch] text-[17px]/[1.6] text-ink-soft">{item.body}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

/**
 * The agent handoff, and the agents.
 *
 * The orbit carries the claim the prose makes — a token is the only thing
 * between any of these and your account. The marks are licensed ones only
 * (agent-marks.ts); none of them is a partnership, and nothing here says so.
 *
 * The handoff Morse publishes used to be quoted here in full. It went: the body
 * already says the agent asks first before anything that emails people, so the
 * quotation only said it again at four times the length. It lives in the
 * reference, which is where someone who wants to paste it is going anyway.
 */
export function Agent() {
  const { agent } = developers;
  return (
    <>
      {/* The note belongs in the column with the words, not on its own under
          both: outside the grid it was a line on its own at the foot of the
          section, and it left the left-hand column too short to sit level with
          the orbit. Inside it, `items-center` has two columns worth balancing. */}
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
        <div>
          <Eyebrow className="mb-5">{agent.eyebrow}</Eyebrow>
          <Heading lead={agent.title} muted={agent.titleMuted} className={H2} />
          <p className={`${LEAD} mt-6 max-w-[46ch]`}>{agent.body}</p>
          <p className="mt-9 max-w-[52ch] text-[15px]/[1.6] text-ink-faint">{agent.disclaimer}</p>
        </div>

        <AgentOrbit />
      </div>
    </>
  );
}

/** When the claims here were last checked against the API. On the page rather
 *  than only in the structured data: anything quoting it should be able to see
 *  how old it is, and so should a reader. */
export function Updated() {
  return (
    <p className={`${WRAP} text-[15px] text-ink-faint`}>
      Checked against the API on {developers.updated}.
    </p>
  );
}
