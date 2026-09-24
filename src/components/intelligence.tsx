"use client";

import Image from "next/image";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { intelligence } from "@/content/site";
import { Cam } from "./cam";
import { gsap, useLoop } from "./features/timeline";
import { Eyebrow, H2, Heading, Icon, LEAD, SECTION, WRAP } from "./ui";

/**
 * Morse Intelligence: a question heard in a meeting, answered from your notes.
 *
 * **One notification, finishing its sentence.** The spec's rule is that
 * looking → answering → answered is the same card getting to the end of what
 * it started, never three cards replacing one another: re-playing the entry on
 * each change reads as flicker. So there is a single notification element here
 * and the timeline rewrites what is in it, exactly as the real one does.
 *
 * Three cases, because a section that only ever shows the happy path is a
 * section nobody believes. An answer, a nothing-found, and an offer to book —
 * which are the three things it actually does.
 *
 * The record beside it fills up as the notifications expire, each row washing
 * coral for a beat as it lands. That flash is the answer to "where did that
 * go?", and it is the only place a row is ever tinted.
 *
 * Layout borrowed from the booking section: a framed mock that plays itself on
 * one GSAP clock, on the artwork, with the words on the page above it.
 */

const { cases } = intelligence;
/** Long enough to read an answer, short enough that the third case is not a
 *  wait. Three of these is a 24s loop, which is the section's whole run. */
const CASE = 8;
const PEOPLE = ["ember", "lagoon", "fjord"] as const;

export function Intelligence() {
  const root = useLoop<HTMLDivElement>(
    (tl, q) => {
      const el = (s: string) => q(s)[0];
      const card = el("[data-card]");
      const dots = el("[data-dots]");
      const answer = el("[data-answer]");
      const source = el("[data-source]");
      const offer = el("[data-offer]");
      const heard = el("[data-heard]");

      tl.set(card, { autoAlpha: 0, y: -14, scale: 0.97 }, 0);
      const hide = { autoAlpha: 0, display: "none" };
      const show = { autoAlpha: 1, display: "block", duration: 0.2 };
      tl.set([answer, source, offer], hide, 0);
      tl.set(q("[data-row]"), { autoAlpha: 0, y: -6 }, 0);

      cases.forEach((c, i) => {
        const at = i * CASE;
        const row = el(`[data-row="${i}"]`);

        // The line it heard, then the card arriving under it.
        tl.set(heard, { text: `${c.who} asked “${c.heard}” · now` }, at);
        tl.set([answer, source, offer], hide, at);
        tl.set(answer, { text: "" }, at);
        tl.set(dots, c.tone === "offer" ? hide : { autoAlpha: 1, display: "flex" }, at);
        tl.to(card, { autoAlpha: 1, y: 0, scale: 1, duration: 0.26, ease: "power2.out" }, at + 0.2);

        if (c.tone === "offer") {
          // An offer never pretends to look anything up; it is a proposal, and
          // it waits on a decision rather than dwelling out.
          tl.to(offer, { ...show, duration: 0.3 }, at + 0.7);
        } else {
          // Looking, then the answer streaming in word by word behind the
          // caret. The dots go the moment the first word lands.
          tl.to(dots, { autoAlpha: 0, duration: 0.2, onComplete: () => gsap.set(dots, { display: "none" }) }, at + 1.9);
          tl.to(answer, show, at + 1.9);
          tl.to(answer, { text: { value: c.answer, delimiter: " " }, duration: 1.9, ease: "none" }, at + 2);
          if (c.source) tl.to(source, { ...show, duration: 0.3 }, at + 4.2);
        }

        // It lifts, and lands as a line in the record, which washes coral.
        tl.to(card, { autoAlpha: 0, y: -10, duration: 0.22, ease: "power1.in" }, at + CASE - 1.5);
        tl.to(row, { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" }, at + CASE - 1.25);
        tl.fromTo(
          row,
          { backgroundColor: "rgb(251 91 64 / 0.2)" },
          { backgroundColor: "rgb(251 91 64 / 0)", duration: 1.1, ease: "power1.out" },
          at + CASE - 1.25,
        );
      });

      // The record empties for the next pass, so the loop starts where it began.
      tl.to(q("[data-row]"), { autoAlpha: 0, duration: 0.4 }, cases.length * CASE - 0.4);
    },
    // Reduced motion rests near the end of the first case: the card answered,
    // the source shown, nothing moving.
    { rest: 4.6 / (cases.length * CASE) },
  );

  return (
    <section id="intelligence" className={`${WRAP} ${SECTION} scroll-mt-24`}>
      <div className="max-w-[720px]">
        <Eyebrow className="mb-5">{intelligence.eyebrow}</Eyebrow>
        <Heading lead={intelligence.title} muted={intelligence.titleMuted} className={H2} />
        <p className={`${LEAD} mt-6 max-w-[52ch]`}>{intelligence.body}</p>
      </div>

      {/* The mock. `on-stage` because the room is dark in the app whatever the
          page is doing, the same as the montage in the hero. */}
      <div
        ref={root}
        className="on-stage relative isolate mt-14 overflow-hidden rounded-[24px] lg:mt-16"
      >
        <Image
          src="/art/memory.webp"
          alt=""
          aria-hidden="true"
          width={1600}
          height={1067}
          sizes="(max-width: 1280px) 100vw, 1200px"
          className="absolute inset-0 -z-20 size-full object-cover object-[center_30%]"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[oklch(0.19_0.002_90/0.88)]" />

        <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_300px]">
          {/* The stage: the card over it, the room under it. */}
          {/* The room fills the frame, the way it does in the app. The tiles
              were pinned to the foot with the artwork showing above them,
              which left a third of a very large section doing nothing. */}
          <div className="relative min-w-0 min-h-[300px] sm:min-h-[360px] lg:min-h-[440px]">
            <div className="absolute inset-0 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
              {PEOPLE.map((colour, i) => (
                <div
                  key={colour}
                  className={`relative overflow-hidden rounded-[18px] bg-sunken ${i === 2 ? "max-sm:hidden" : ""}`}
                >
                  <Cam colour={colour} />
                </div>
              ))}
            </div>
            {/* The card has to be readable over faces, so the tiles dim under
                it — the app does the same when anything floats over the stage. */}
            <div aria-hidden="true" className="absolute inset-0 rounded-[18px] bg-gradient-to-b from-[oklch(0.19_0.002_90/0.72)] via-[oklch(0.19_0.002_90/0.25)] to-transparent" />

            {/* One card, top-centre, rewritten by the timeline. */}
            <div
              data-card
              className="absolute top-4 left-1/2 z-10 w-[min(460px,calc(100%-24px))] -translate-x-1/2 rounded-[22px] bg-float p-4 shadow-float"
            >
              <p data-heard className="pr-8 text-[14px]/[1.4] text-ink-soft" />

              <p data-dots className="mt-2 flex items-center gap-2.5 text-[16px] text-ink-soft">
                <span aria-hidden="true" className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="size-1.5 animate-blink rounded-full bg-current" style={{ animationDelay: `${i * 200}ms` }} />
                  ))}
                </span>
                {intelligence.looking}
              </p>

              {/* The caret is coral because coral is what is live. It stops
                  being coral the moment the answer is a resolved thing. */}
<p data-answer className="mt-1.5 text-[19px]/[1.45] font-light text-ink" />
              <p data-source className="mt-1.5 text-[14px]/[1.4] text-ink-faint">
                {cases[0].source}
              </p>

              <div data-offer className="mt-2">
                <p className="text-[14px] font-medium text-ink-soft">{cases[2].offer?.kicker}</p>
                <p className="text-[16px]/[1.35] font-medium text-ink">{cases[2].offer?.title}</p>
                <p className="text-[15px]/[1.45] text-ink">{cases[2].offer?.when}</p>
                <p className="text-[14px] text-ink-soft">{cases[2].offer?.clash}</p>
                <div className="mt-3 flex gap-2">
                  <span className="grid h-9 flex-1 place-items-center rounded-full bg-action text-[14px] font-medium text-action-foreground">
                    {cases[2].offer?.yes}
                  </span>
                  <span className="grid h-9 flex-1 place-items-center rounded-full text-[14px] text-ink-soft">
                    {cases[2].offer?.no}
                  </span>
                </div>
              </div>

              <span className="absolute top-3 right-3 grid size-8 place-items-center rounded-full text-ink-faint">
                <Icon icon={Cancel01Icon} className="size-3.5" />
              </span>
            </div>
          </div>

          {/* The record. */}
          <div className="flex min-w-0 flex-col rounded-[20px] bg-raised p-4">
            <p className="text-[15px] text-ink">{intelligence.panel}</p>
            <ul className="mt-3 flex flex-col gap-1">
              {cases.map((c, i) => (
                <li
                  key={c.row}
                  data-row={i}
                  className="flex items-center gap-2.5 rounded-[12px] px-2.5 py-2"
                >
                  <span className={`size-1.5 shrink-0 rounded-full ${c.tone === "none" ? "bg-ink-faint" : "bg-action"}`} />
                  <span className={`min-w-0 flex-1 truncate text-[14px] ${c.tone === "none" ? "text-ink-faint" : "text-ink"}`}>{c.row}</span>
                  <span className="shrink-0 text-[13px] text-ink-faint tabular-nums">{["4m", "2m", "now"][i]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
