import { extras } from "@/content/site";
import { Captions } from "./captions";
import { Whiteboard } from "./whiteboard";
import { Annotate } from "./annotate";
import { Cam } from "../cam";

/**
 * Section 3's six looping pictures, one per feature, each filling its card.
 * Languages, reactions and the mind map run on CSS keyframes (globals.css,
 * "Section 3"); captions, the whiteboard and the annotation run on GSAP
 * timelines in their own files, since they need paths, typing and cursors.
 */

const STAGE = "relative size-full overflow-hidden rounded-[26px] bg-raised shadow-raised";
const TAG = "absolute rounded-full bg-canvas/75 px-3 py-1 text-[14px] text-ink";
const at = (s: number) => ({ animationDelay: `${s}s` });

/** The eighteen languages roll past a band, resting on each, in their own scripts. */
const ROW = 60;
const LANGS = extras.languages;
const ROLL = `@keyframes f-roll{${LANGS.map((_, i) => {
  const a = (i / LANGS.length) * 100;
  const b = a + (100 / LANGS.length) * 0.72;
  return `${a.toFixed(3)}%{transform:translateY(${-i * ROW}px)}${b.toFixed(3)}%{transform:translateY(${-i * ROW}px)}`;
}).join("")}100%{transform:translateY(${-LANGS.length * ROW}px)}}`;

export function Languages() {
  return (
    <div className={`${STAGE} grid place-items-center`}>
      <style>{ROLL}</style>
      <div
        className="relative w-full overflow-hidden"
        style={{ height: ROW * 5, maskImage: "linear-gradient(transparent, #000 30%, #000 70%, transparent)" }}
      >
        <div className="absolute inset-x-7 rounded-full bg-overlay" style={{ top: ROW * 2, height: ROW }} />
        <div
          className="absolute inset-x-0 text-center"
          style={{ top: ROW * 2, animation: `f-roll ${LANGS.length * 1.7}s cubic-bezier(.65,0,.35,1) infinite` }}
        >
          {[...LANGS, ...LANGS.slice(0, 3)].map((l, i) => (
            <div key={i} className="grid place-items-center text-[28px] font-light text-ink" style={{ height: ROW }}>
              {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Pixel emoji float up Daniel's tile; now and then his hand goes up. */
export function Reactions() {
  const emoji = ["red-heart", "party-popper", "thumbs-up", "fire", "clapping-hands", "face-with-tears-of-joy", "red-heart"];
  // Kept out of the middle band: they rise the full height of the tile, and a
  // face is now in the way of anything between about 20 and 80 per cent.
  const left = [6, 14, 80, 88, 94, 12, 84];
  return (
    <div className={STAGE}>
      <Cam colour="lagoon" />
      {emoji.map((e, i) => (
        // eslint-disable-next-line @next/next/no-img-element -- tiny pixel SVGs, no optimisation to gain
        <img width={44} height={44} key={i} src={`/emoji/${e}.svg`} alt="" className="f-float absolute -bottom-2.5 size-11" style={{ left: `${left[i]}%`, ...at(i * 0.62) }} />
      ))}
      <span className="f-hand absolute top-4 left-4 flex items-center gap-2 rounded-full bg-canvas/80 py-1.5 pr-3.5 pl-2 text-[15px] text-ink">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img width={44} height={44} src="/emoji/raising-hands.svg" alt="" className="size-[22px]" />
        Daniel raised a hand
      </span>
      <span className={`${TAG} bottom-4 left-4`}>Daniel Chen</span>
    </div>
  );
}

/** The notes page's mind map, growing from the meeting to its sections and their points. */
export function MindMap() {
  const sections: [string, string, string[]][] = [
    ["Onboarding", "#FF8FB1", ["Drop after sign-up", "Try a nudge"]],
    ["Acme renewal", "#E8C98A", ["This year’s rate", "Two extra seats"]],
    ["Next steps", "#8FD9C4", ["Daniel: the nudge", "Sofia: the terms"]],
  ];
  const parts: React.ReactNode[] = [];
  // All three branches set off together, each a beat behind the last.
  sections.forEach(([name, col, items], si) => {
    const t = 0.35 + si * 0.14;
    const sy = 70 + si * 80;
    parts.push(
      <g key={name}>
        <path className="f-ink" pathLength={1} style={at(t)} stroke={col} strokeOpacity={0.7} strokeWidth={1.6} d={`M88 150 C 120 150, 120 ${sy}, 150 ${sy}`} />
        <circle className="f-pop" style={at(t + 0.5)} cx={154} cy={sy} r={5} fill={col} />
        <text className="f-fade" style={{ ...at(t + 0.6), fontFamily: "var(--font-plex)" }} x={166} y={sy + 5} fill="var(--ink)" fontSize={14}>{name}</text>
      </g>,
    );
    items.forEach((it, ii) => {
      const ti = t + 0.85 + ii * 0.18;
      const iy = sy - 14 + ii * 28;
      parts.push(
        <g key={it}>
          <path className="f-ink" pathLength={1} style={at(ti)} stroke={col} strokeOpacity={0.45} strokeWidth={1.3} d={`M262 ${sy} C 280 ${sy}, 280 ${iy}, 298 ${iy}`} />
          <circle className="f-pop" style={at(ti + 0.4)} cx={302} cy={iy} r={3.5} fill={col} />
          <text className="f-fade" style={{ ...at(ti + 0.45), fontFamily: "var(--font-plex)" }} x={312} y={iy + 4} fill="var(--ink-soft)" fontSize={12}>{it}</text>
        </g>,
      );
    });
  });
  return (
    <div className={STAGE}>
      <svg viewBox="0 0 420 300" className="absolute inset-0 size-full" fill="none" strokeLinecap="round" aria-hidden="true">
        <g className="f-sheet">
          <circle className="f-pop" cx={70} cy={150} r={7} fill="var(--ink)" />
          <text className="f-fade" style={{ ...at(0.1), fontFamily: "var(--font-plex)" }} x={22} y={180} fill="var(--ink)" fontSize={13}>Design review</text>
          {parts}
        </g>
      </svg>
    </div>
  );
}

export const PICTURES: Record<string, () => React.ReactElement> = {
  captions: Captions,
  languages: Languages,
  whiteboard: Whiteboard,
  annotate: Annotate,
  reactions: Reactions,
  mindmap: MindMap,
};
