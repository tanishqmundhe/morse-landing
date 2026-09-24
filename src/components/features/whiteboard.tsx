"use client";

import rough from "roughjs";
import { useLoop } from "./timeline";

/**
 * The whiteboard is Excalidraw, so this is drawn the way Excalidraw draws:
 * roughjs shapes on its light canvas (#ffffff), Excalifont for text, and
 * collaborators' cursors with name tags. Two people work at once. Daniel drags
 * out "Sign up", an arrow and "First call"; meanwhile Priya drags out a dashed
 * "2nd call", links it and notes where people drop off. Shapes grow as the
 * cursor drags, arrows draw under it, text types where it clicks, and the
 * cursors glide on eased curves rather than straight lines. (Priya's box is
 * dashed; her arrow is solid, since it is drawn in with the stroke's dashes.)
 */

const W = 380;
const H = 500;
const INK = "#1e1e1e"; // Excalidraw's default stroke, as light mode renders it
const RED = "#e03131";
const ARJUN = "#74c0fc";
const PRIYA = "#ffa94d";

const gen = rough.generator();
const shape = (d: ReturnType<typeof gen.path>) => gen.toPaths(d).map((p) => p.d);
const rounded = (w: number, h: number, r = 10) =>
  `M ${r} 0 L ${w - r} 0 Q ${w} 0 ${w} ${r} L ${w} ${h - r} Q ${w} ${h} ${w - r} ${h} L ${r} ${h} Q 0 ${h} 0 ${h - r} L 0 ${r} Q 0 0 ${r} 0`;
const base = { roughness: 1, strokeWidth: 1.6, bowing: 1 };

// Every element, in its own coordinates, placed at x/y.
const BOX = { w: 132, h: 62 };
const A = { x: 36, y: 118, d: shape(gen.path(rounded(BOX.w, BOX.h), { ...base, seed: 3, stroke: INK })) };
const B = { x: 36, y: 268, d: shape(gen.path(rounded(BOX.w, BOX.h), { ...base, seed: 7, stroke: INK })) };
const C = { x: 232, y: 268, d: shape(gen.path(rounded(116, BOX.h), { ...base, seed: 11, stroke: RED, strokeLineDash: [7, 6] })) };
// Arrows: a clean line the cursor follows, and the same line drawn rough.
const ARROW1 = "M 102 186 C 104 212, 100 238, 102 262";
const ARROW2 = "M 172 300 C 190 296, 208 298, 226 300";
const arrow = (d: string, seed: number, stroke: string, dash?: number[]) =>
  shape(gen.path(d, { ...base, seed, stroke, disableMultiStroke: true, strokeLineDash: dash }));
const A1 = arrow(ARROW1, 5, INK);
const A1_HEAD = arrow("M 94 250 L 102 263 L 110 250", 6, INK);
const A2 = arrow(ARROW2, 9, RED);
const A2_HEAD = arrow("M 215 292 L 227 300 L 215 308", 10, RED);

type P = { x: number; y: number };

export function Whiteboard() {
  const root = useLoop((tl, q) => {
    const el = (s: string) => q(s)[0];
    const pos: Record<string, P> = { daniel: { x: 70, y: 430 }, priya: { x: 330, y: 70 } };
    tl.set(q("[data-el]"), { opacity: 1 }, 0);
    tl.set(q("[data-grow]"), { scale: 0, transformOrigin: "0 0" }, 0);
    tl.set(q("[data-draw]"), { drawSVG: "0%" }, 0);
    tl.set(q("[data-type]"), { text: "" }, 0);
    tl.set(el("[data-cursor=arjun]"), pos.daniel, 0);
    tl.set(el("[data-cursor=priya]"), pos.priya, 0);

    /** Glide on a gentle curve, with a small settle at the end, like a hand on a trackpad. */
    const glide = (who: string, to: P, dur: number, at: number) => {
      const from = pos[who];
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const bend = Math.min(40, Math.hypot(dx, dy) * 0.18) * (who === "daniel" ? 1 : -1);
      const mid = { x: from.x + dx * 0.5 - (dy / (Math.hypot(dx, dy) || 1)) * bend, y: from.y + dy * 0.5 + (dx / (Math.hypot(dx, dy) || 1)) * bend };
      const over = { x: to.x + dx * 0.03, y: to.y + dy * 0.03 };
      tl.to(el(`[data-cursor=${who}]`), { motionPath: { path: [mid, over, to], curviness: 1.3 }, duration: dur, ease: "power2.inOut" }, at);
      pos[who] = to;
    };
    /** Drag out a shape from its corner: the cursor and the shape move together. */
    const drag = (who: string, id: string, box: P & { w: number; h: number }, dur: number, at: number) => {
      const end = { x: box.x + box.w, y: box.y + box.h };
      tl.to(el(`[data-cursor=${who}]`), { motionPath: { path: [{ x: box.x + box.w * 0.55, y: box.y + box.h * 0.35 }, end], curviness: 1 }, duration: dur, ease: "power1.inOut" }, at);
      tl.to(el(`[data-grow=${id}]`), { scale: 1, duration: dur, ease: "power1.inOut" }, at);
      pos[who] = end;
    };
    /** Draw an arrow with the cursor on its tip. */
    const draw = (who: string, id: string, path: string, dur: number, at: number) => {
      tl.to(el(`[data-cursor=${who}]`), { motionPath: { path, autoRotate: false }, duration: dur, ease: "power1.inOut" }, at);
      tl.to(q(`[data-draw=${id}]`), { drawSVG: "100%", duration: dur, ease: "power1.inOut" }, at);
      tl.to(q(`[data-draw=${id}-head]`), { drawSVG: "100%", duration: 0.2, ease: "none" }, at + dur);
      const end = path.trim().split(/[ ,]+/).slice(-2).map(Number);
      pos[who] = { x: end[0], y: end[1] };
    };
    /** Click, then type. */
    const type = (who: string, id: string, text: string, at: P, when: number) => {
      glide(who, at, 0.45, when);
      tl.to(el(`[data-type=${id}]`), { text, duration: text.length * 0.07, ease: "none" }, when + 0.5);
      return when + 0.5 + text.length * 0.07;
    };

    // Daniel
    let a = 0.4;
    glide("daniel", { x: A.x, y: A.y }, 0.9, a);
    a += 0.95;
    drag("daniel", "a", { x: A.x, y: A.y, ...BOX }, 0.7, a);
    a += 0.8;
    a = type("daniel", "a", "Sign up", { x: 76, y: 156 }, a) + 0.25;
    glide("daniel", { x: 102, y: 186 }, 0.45, a);
    a += 0.5;
    draw("daniel", "a1", ARROW1, 0.6, a);
    a += 0.9;
    glide("daniel", { x: B.x, y: B.y }, 0.5, a);
    a += 0.55;
    drag("daniel", "b", { x: B.x, y: B.y, ...BOX }, 0.7, a);
    a += 0.8;
    a = type("daniel", "b", "First call", { x: 66, y: 306 }, a) + 0.3;
    glide("daniel", { x: 120, y: 420 }, 1.1, a);

    // Priya, starting while Daniel is still on his first box
    let p = 1.3;
    glide("priya", { x: C.x, y: C.y }, 1.1, p);
    p += 1.15;
    drag("priya", "c", { x: C.x, y: C.y, w: 116, h: BOX.h }, 0.7, p);
    p += 0.8;
    p = type("priya", "c", "2nd call", { x: 256, y: 306 }, p) + 0.3;
    // She waits for Daniel's "First call", then links the two.
    p = Math.max(p, a - 0.6);
    glide("priya", { x: 172, y: 300 }, 0.6, p);
    p += 0.65;
    draw("priya", "a2", ARROW2, 0.5, p);
    p += 0.8;
    p = type("priya", "n", "most stop here", { x: 168, y: 356 }, p) + 0.2;
    glide("priya", { x: 318, y: 420 }, 1.1, p);

    // Hold the finished board, then clear it and let the cursors drift back.
    const end = Math.max(a, p) + 2.6;
    tl.to(q("[data-el]"), { opacity: 0, duration: 0.5, ease: "power1.in" }, end);
    tl.to(el("[data-cursor=arjun]"), { x: 70, y: 430, duration: 1, ease: "sine.inOut" }, end);
    tl.to(el("[data-cursor=priya]"), { x: 330, y: 70, duration: 1, ease: "sine.inOut" }, end);
    tl.set({}, {}, end + 1.1);
  }, { rest: 0.72 });

  const text = { fontFamily: "Excalifont, var(--font-caveat), cursive", fontSize: 20 };
  return (
    <div ref={root} className="relative size-full overflow-hidden rounded-[26px] shadow-raised" style={{ background: "#ffffff" }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Excalidraw's toolbar island */}
        <g transform="translate(118 20)">
          <rect width={144} height={32} rx={9} fill="#ffffff" stroke="#e9e9ed" />
          {[0, 1, 2, 3, 4].map((k) => (
            <g key={k} transform={`translate(${8 + k * 27} 5)`}>
              {k === 0 && <rect width={22} height={22} rx={6} fill="#e0dfff" />}
              <g stroke="#1b1b1f" strokeWidth={1.4} transform="translate(5 5)">
                {k === 0 && <rect width={12} height={12} rx={2.5} />}
                {k === 1 && <path d="M6 0 L12 6 L6 12 L0 6 Z" />}
                {k === 2 && <circle cx={6} cy={6} r={6} />}
                {k === 3 && <path d="M0 12 L12 0 M5 0 L12 0 L12 7" />}
                {k === 4 && <path d="M2 11 L6 1 L10 11 M3.6 7 L8.4 7" />}
              </g>
            </g>
          ))}
        </g>

        <g data-el>
          <g transform={`translate(${A.x} ${A.y})`}>
            <g data-grow="a">{A.d.map((d, i) => <path key={i} d={d} stroke={INK} strokeWidth={1.6} vectorEffect="non-scaling-stroke" />)}</g>
          </g>
          <text data-type="a" x={76} y={156} fill={INK} style={text} />
          {A1.map((d, i) => <path key={i} data-draw="a1" d={d} stroke={INK} strokeWidth={1.6} />)}
          {A1_HEAD.map((d, i) => <path key={i} data-draw="a1-head" d={d} stroke={INK} strokeWidth={1.6} />)}
          <g transform={`translate(${B.x} ${B.y})`}>
            <g data-grow="b">{B.d.map((d, i) => <path key={i} d={d} stroke={INK} strokeWidth={1.6} vectorEffect="non-scaling-stroke" />)}</g>
          </g>
          <text data-type="b" x={66} y={306} fill={INK} style={text} />
          <g transform={`translate(${C.x} ${C.y})`}>
            <g data-grow="c">{C.d.map((d, i) => <path key={i} d={d} stroke={RED} strokeWidth={1.6} strokeDasharray="7 6" vectorEffect="non-scaling-stroke" />)}</g>
          </g>
          <text data-type="c" x={256} y={306} fill={RED} style={text} />
          {A2.map((d, i) => <path key={i} data-draw="a2" d={d} stroke={RED} strokeWidth={1.6} />)}
          {A2_HEAD.map((d, i) => <path key={i} data-draw="a2-head" d={d} stroke={RED} strokeWidth={1.6} />)}
          <text data-type="n" x={168} y={356} fill={RED} style={{ ...text, fontSize: 18 }} />
        </g>

        {([["daniel", "Daniel", ARJUN], ["priya", "Priya", PRIYA]] as const).map(([id, name, colour]) => (
          <g key={id} data-cursor={id}>
            <path d="M0 0 L 0 17 L 4.5 13 L 8 20.5 L 11 19 L 7.5 12 L 13.5 11.5 Z" fill={colour} stroke="#ffffff" strokeWidth={1.2} strokeLinejoin="round" />
            <rect x={12} y={19} width={name.length * 7.6 + 16} height={21} rx={7} fill={colour} />
            <text x={20} y={34} fontSize={12.5} fill="#1b1b1f" style={{ fontFamily: "var(--font-plex)" }}>{name}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

