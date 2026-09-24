"use client";

import { Fragment } from "react";
import { useLoop } from "./timeline";
import { Cam } from "../cam";

/**
 * What you say, and what Morse shows. Captions are translated as they're
 * spoken: someone speaks Hindi or Marathi and the caption appears in English.
 * The card holds what was said long enough to read, then turns it over into
 * the English caption with the letter 3D swap (after Fancy Components), holds
 * that, and moves to the next speaker.
 */

const TURNS = [
  {
    who: "Priya Shah",
    colour: "ember",
    said: { label: "Priya says, in Hindi", text: "ऑनबोर्डिंग पर ध्यान देना होगा, लोग साइन अप करके वापस नहीं आते।" },
    shown: "We need to focus on onboarding. People sign up and never come back.",
  },
  {
    who: "Arjun Mehta",
    colour: "lagoon",
    said: { label: "Arjun says, in Marathi", text: "पुढच्या आठवड्यापासून दुसऱ्या मीटिंगची आठवण पाठवूया." },
    shown: "Let’s send a second-meeting reminder, starting next week.",
  },
];
const LINES = TURNS.flatMap((t) => [
  { label: t.said.label, text: t.said.text, deva: true },
  { label: "Morse shows, in English", text: t.shown, deva: false },
]);

// Devanagari turns word by word, so conjuncts and vowel signs stay joined;
// Latin turns letter by letter.
function Tokens({ text, deva }: { text: string; deva: boolean }) {
  return text.split(" ").map((word, i) => (
    <Fragment key={i}>
      {i > 0 && " "}
      <span className="inline-block whitespace-nowrap">
        {deva ? <span className="tok inline-block">{word}</span> : [...word].map((ch, j) => <span key={j} className="tok inline-block">{ch}</span>)}
      </span>
    </Fragment>
  ));
}

const HOLD_SAID = 3.4; // long enough to take in the Hindi or Marathi
const HOLD_SHOWN = 4.6; // and to read the English

export function Captions() {
  const root = useLoop((tl, q) => {
    const toks = (i: number) => [...q(`[data-label="${i}"] .tok`), ...q(`[data-line="${i}"] .tok`)];
    tl.set(q(".tok"), { rotationX: -90, opacity: 0, transformPerspective: 500, transformOrigin: "50% 50% -10" }, 0);
    const turnIn = (i: number, at: number) =>
      tl.fromTo(
        toks(i),
        { rotationX: -90, opacity: 0 },
        { rotationX: 0, opacity: 1, duration: 0.6, ease: "back.out(1.5)", stagger: { each: LINES[i].deva ? 0.05 : 0.014 } },
        at,
      );
    const turnOut = (i: number, at: number) =>
      tl.to(toks(i), { rotationX: 90, opacity: 0, duration: 0.4, ease: "power2.in", stagger: { each: LINES[i].deva ? 0.03 : 0.008 } }, at);
    const speaker = (on: number, at: number) =>
      tl.to(q("[data-speaker]"), { opacity: (k: number) => (k === on ? 1 : 0), duration: 0.8, ease: "power2.inOut" }, at);

    let t = 0.3;
    turnIn(0, t);
    t += HOLD_SAID;
    turnOut(0, t);
    turnIn(1, t + 0.25);
    t += 0.25 + HOLD_SHOWN;
    turnOut(1, t);
    speaker(1, t);
    turnIn(2, t + 0.5);
    t += 0.5 + HOLD_SAID;
    turnOut(2, t);
    turnIn(3, t + 0.25);
    t += 0.25 + HOLD_SHOWN;
    turnOut(3, t);
    speaker(0, t);
    tl.set({}, {}, t + 0.6);
  }, { rest: 0.3 });

  return (
    <div ref={root} className="relative size-full overflow-hidden rounded-[26px] bg-raised shadow-raised">
      {TURNS.map((t, k) => (
        <div key={t.who} data-speaker className="absolute inset-0" style={{ opacity: k === 0 ? 1 : 0 }}>
          <Cam colour={t.colour} />
          <span className="absolute top-4 left-4 rounded-full bg-canvas/75 px-3 py-1 text-[14px] text-ink">{t.who}</span>
        </div>
      ))}
      <div className="absolute inset-x-4 bottom-4 rounded-[18px] bg-canvas/88 px-[18px] pt-3.5 pb-4">
        <div className="grid text-[13px] text-ink-faint">
          {LINES.map((l, i) => (
            <p key={i} data-label={i} className="col-start-1 row-start-1">
              <Tokens text={l.label} deva={false} />
            </p>
          ))}
        </div>
        <div className="mt-2 grid min-h-[84px] text-[18px]/[1.45] text-ink">
          {LINES.map((l, i) => (
            <p
              key={i}
              data-line={i}
              className="col-start-1 row-start-1"
              lang={l.deva ? (i === 0 ? "hi" : "mr") : "en"}
              style={l.deva ? { fontFamily: "var(--font-plex-deva), var(--font-plex), sans-serif" } : undefined}
            >
              <Tokens text={l.text} deva={l.deva} />
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
