import { ComputerScreenShareIcon } from "@hugeicons/core-free-icons";
import { extras } from "@/content/site";
import { Icon } from "../ui";

/**
 * Section 3's six looping pictures, one per feature. CSS and SVG only; the
 * keyframes live in globals.css ("Section 3"). Each fills its card.
 */

const STAGE = "relative size-full overflow-hidden rounded-[26px] bg-raised shadow-raised";
const TAG = "absolute rounded-full bg-canvas/75 px-3 py-1 text-[14px] text-ink";
const HAND = { fontFamily: "var(--font-caveat), cursive" };
const at = (s: number) => ({ animationDelay: `${s}s` });

function Avatar({ colour, size }: { colour: string; size: number }) {
  return (
    <span
      className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cover bg-center"
      style={{ width: size, height: size, backgroundImage: `url(/app/avatar-${colour}.webp)` }}
    />
  );
}

/** Priya's words stream in, mixing Hindi and English; the line clears and the next begins. */
export function Captions() {
  const line = (text: string, start: number) =>
    text.split(" ").map((w, i) => (
      <span key={i} style={at(start + i * 0.16)}>
        {w}{" "}
      </span>
    ));
  return (
    <div className={STAGE} style={{ background: "url(/app/bg-ember.webp) center/cover" }}>
      <Avatar colour="ember" size={96} />
      <span className={`${TAG} top-4 left-4`}>Priya Shah</span>
      <div className="absolute inset-x-4 bottom-4 grid min-h-[92px] rounded-[16px] bg-canvas/85 px-[18px] py-[14px] text-[18px]/[1.45] text-ink">
        <p className="cap-line" style={at(0)}>
          {line("Onboarding pe dhyaan dena padega, people sign up and never come back.", 0.3)}
        </p>
        <p className="cap-line" style={at(5)}>
          {line("Toh second meeting ka nudge try karte hain, starting this week.", 5.3)}
        </p>
      </div>
    </div>
  );
}

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

/** A sketch draws itself on the board while Arjun's cursor follows the pen. */
export function Whiteboard() {
  return (
    <div className={STAGE} style={{ background: "oklch(0.19 0.009 52)" }}>
      <svg viewBox="0 0 420 300" className="absolute inset-0 size-full" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <g className="f-sheet">
          <path className="f-ink" pathLength={1} style={at(0.2)} stroke="#F7EFE8" strokeWidth={2.2} d="M52 78 C 110 74, 150 76, 158 80 C 162 104, 160 122, 156 136 C 110 140, 70 139, 50 136 C 47 112, 48 96, 52 78 Z" />
          <text className="f-fade" style={{ ...HAND, ...at(0.9) }} x={72} y={115} fill="#F7EFE8" fontSize={26}>Sign up</text>
          <path className="f-ink" pathLength={1} style={at(1.6)} stroke="#a9be8c" strokeWidth={2.6} d="M168 108 C 205 104, 232 104, 262 108" />
          <path className="f-ink" pathLength={1} style={at(2.4)} stroke="#a9be8c" strokeWidth={2.6} d="M250 98 L 264 108 L 250 119" />
          <path className="f-ink" pathLength={1} style={at(2.8)} stroke="#F7EFE8" strokeWidth={2.2} d="M274 76 C 330 72, 368 74, 378 80 C 382 106, 380 124, 376 140 C 330 144, 294 142, 272 140 C 268 116, 270 96, 274 76 Z" />
          <text className="f-fade" style={{ ...HAND, ...at(3.5) }} x={288} y={115} fill="#F7EFE8" fontSize={24}>2nd call</text>
          <path className="f-ink" pathLength={1} style={at(4.4)} stroke="#FFB48E" strokeWidth={2.6} d="M214 150 C 190 168, 196 212, 232 214 C 270 216, 282 178, 256 158 C 244 150, 226 150, 214 156" />
          <text className="f-fade" style={{ ...HAND, ...at(5.4) }} x={196} y={252} fill="#FFB48E" fontSize={28}>most stop here</text>
        </g>
        <g>
          <animateMotion dur="10s" repeatCount="indefinite" calcMode="linear" keyTimes="0;0.16;0.24;0.44;0.54;1" keyPoints="0;0;0.35;0.35;1;1" path="M168 108 C 205 104, 232 104, 262 108 C 280 130, 250 160, 232 214 L 280 250" />
          <path d="M0 0 L 0 16 L 5 12 L 9 20 L 12 18 L 8 11 L 14 10 Z" fill="#94b6d2" stroke="#0c0907" strokeWidth={1} />
          <rect x={12} y={18} width={52} height={20} rx={10} fill="#94b6d2" />
          <text x={20} y={32} fontSize={12} fill="#111c27" style={{ fontFamily: "var(--font-plex)" }}>Arjun</text>
        </g>
      </svg>
    </div>
  );
}

/** Priya presents a chart; a pen circles the drop and writes on it. */
export function Annotate() {
  const bars: [number, number][] = [[60, 150], [120, 118], [180, 60], [240, 44], [300, 40]];
  return (
    <div className={STAGE} style={{ background: "#1c1714" }}>
      <span className={`${TAG} top-4 left-4 flex items-center gap-2`}>
        <Icon icon={ComputerScreenShareIcon} className="size-[15px]" /> Priya is presenting
      </span>
      <svg viewBox="0 0 420 300" className="absolute inset-0 size-full" fill="none" strokeLinecap="round" aria-hidden="true">
        <text x={40} y={84} fill="#F7EFE8" fontSize={17} style={{ fontFamily: "var(--font-plex)" }}>Meetings per new account</text>
        {bars.map(([x, h], i) => (
          <g key={x}>
            <rect x={x} y={250 - h} width={38} height={h} rx={6} fill={i === 1 ? "#FFB48E" : "#3a302a"} />
            <text x={x + 8} y={272} fill="#9c8b7e" fontSize={12} style={{ fontFamily: "var(--font-plex)" }}>{["1st", "2nd", "3rd", "4th", "5th"][i]}</text>
          </g>
        ))}
        <g className="f-sheet">
          <path className="f-ink" pathLength={1} style={at(0.8)} stroke="#e8927c" strokeWidth={3.2} d="M110 118 C 96 100, 150 88, 170 110 C 184 130, 160 150, 130 146 C 108 142, 102 126, 118 112" />
          <path className="f-ink" pathLength={1} style={at(2)} stroke="#e8927c" strokeWidth={3.2} d="M270 140 C 240 136, 210 128, 178 118" />
          <path className="f-ink" pathLength={1} style={at(2.6)} stroke="#e8927c" strokeWidth={3.2} d="M190 108 L 176 118 L 192 126" />
          <text className="f-fade" style={{ ...HAND, ...at(3.2) }} x={276} y={150} fill="#e8927c" fontSize={28}>the drop</text>
        </g>
        <g>
          <animateMotion dur="10s" repeatCount="indefinite" calcMode="linear" keyTimes="0;0.08;0.2;0.26;1" keyPoints="0;0;0.5;1;1" path="M110 118 C 96 100, 150 88, 170 110 C 184 130, 160 150, 130 146 M 270 140 C 240 136, 210 128, 178 118" />
          <circle r={6} fill="#e8927c" />
          <circle r={11} fill="#e8927c" opacity={0.25} />
        </g>
      </svg>
    </div>
  );
}

/** Pixel emoji float up Arjun's tile; now and then his hand goes up. */
export function Reactions() {
  const emoji = ["red-heart", "party-popper", "thumbs-up", "fire", "clapping-hands", "face-with-tears-of-joy", "red-heart"];
  const left = [18, 34, 52, 66, 78, 42, 88];
  return (
    <div className={STAGE} style={{ background: "url(/app/bg-lagoon.webp) center/cover" }}>
      <Avatar colour="lagoon" size={96} />
      {emoji.map((e, i) => (
        // eslint-disable-next-line @next/next/no-img-element -- tiny pixel SVGs, no optimisation to gain
        <img key={i} src={`/emoji/${e}.svg`} alt="" className="f-float absolute -bottom-2.5 size-11" style={{ left: `${left[i]}%`, ...at(i * 0.62) }} />
      ))}
      <span className="f-hand absolute top-4 left-4 flex items-center gap-2 rounded-full bg-canvas/80 py-1.5 pr-3.5 pl-2 text-[15px] text-ink">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/emoji/raising-hands.svg" alt="" className="size-[22px]" />
        Arjun raised a hand
      </span>
      <span className={`${TAG} bottom-4 left-4`}>Arjun Mehta</span>
    </div>
  );
}

/** The notes page's mind map, growing from the meeting to its sections and their points. */
export function MindMap() {
  const sections: [string, string, string[]][] = [
    ["Onboarding", "#FF8FB1", ["Drop after sign-up", "Try a nudge"]],
    ["Acme renewal", "#E8C98A", ["This year’s rate", "Two extra seats"]],
    ["Next steps", "#8FD9C4", ["Arjun: the nudge", "Priya: the terms"]],
  ];
  const parts: React.ReactNode[] = [];
  let t = 0.4;
  sections.forEach(([name, col, items], si) => {
    const sy = 70 + si * 80;
    parts.push(
      <g key={name}>
        <path className="f-ink" pathLength={1} style={at(t)} stroke={col} strokeOpacity={0.7} strokeWidth={1.6} d={`M88 150 C 120 150, 120 ${sy}, 150 ${sy}`} />
        <circle className="f-pop" style={at(t + 0.5)} cx={154} cy={sy} r={5} fill={col} />
        <text className="f-fade" style={{ ...at(t + 0.6), fontFamily: "var(--font-plex)" }} x={166} y={sy + 5} fill="#F7EFE8" fontSize={14}>{name}</text>
      </g>,
    );
    t += 0.7;
    items.forEach((it, ii) => {
      const iy = sy - 14 + ii * 28;
      parts.push(
        <g key={it}>
          <path className="f-ink" pathLength={1} style={at(t)} stroke={col} strokeOpacity={0.45} strokeWidth={1.3} d={`M262 ${sy} C 280 ${sy}, 280 ${iy}, 298 ${iy}`} />
          <circle className="f-pop" style={at(t + 0.4)} cx={302} cy={iy} r={3.5} fill={col} />
          <text className="f-fade" style={{ ...at(t + 0.45), fontFamily: "var(--font-plex)" }} x={312} y={iy + 4} fill="#b3a194" fontSize={12}>{it}</text>
        </g>,
      );
      t += 0.35;
    });
  });
  return (
    <div className={STAGE}>
      <svg viewBox="0 0 420 300" className="absolute inset-0 size-full" fill="none" strokeLinecap="round" aria-hidden="true">
        <g className="f-sheet">
          <circle className="f-pop" cx={70} cy={150} r={7} fill="#F7EFE8" />
          <text className="f-fade" style={{ ...at(0.1), fontFamily: "var(--font-plex)" }} x={22} y={180} fill="#F7EFE8" fontSize={13}>Design review</text>
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
