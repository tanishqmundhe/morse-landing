"use client";

import { Cam } from "../cam";
import { useLoop } from "./timeline";

/**
 * Drawing on a shared screen. Sofia presents a quarter's revenue against
 * target on a light slide, and marks up the month that fell short: a loop
 * round the bar, a note written by hand, then an arrow from the note to the
 * bar. The pen is the app's first annotation ink (#F2784B), and it moves the
 * way a hand does, easing between marks rather than cutting straight across.
 */

const INK = "#F2784B";
const SLIDE = { x: 14, y: 64, w: 352, h: 250 };
// The chart: 0 at the baseline, the target line at 1,000.
const BASE = 286;
const TOP = 112;
const SCALE = (BASE - TOP) / 1400;
const y = (v: number) => BASE - v * SCALE;
const MONTHS: [string, number][] = [["Jul", 980], ["Aug", 1090], ["Sep", 760]];
const BAR_W = 46;
const bx = (i: number) => 96 + i * 78;

// The marks, in the order they're made. The pen follows these exact paths.
const LOOP =
  "M 250 178 C 222 186, 220 268, 266 276 C 312 282, 318 206, 294 182 C 280 168, 256 168, 246 180";
const ARROW = "M 300 146 C 294 154, 288 162, 282 172";
const HEAD = "M 274 162 L 281 174 L 291 168";

export function Annotate() {
  const root = useLoop((tl, q) => {
    const el = (s: string) => q(s)[0];
    tl.set(q("[data-ink]"), { drawSVG: "0%" }, 0);
    tl.set(el("[data-note]"), { scaleX: 0, transformOrigin: "0 50%" }, 0);
    tl.set(q("[data-mark]"), { opacity: 1 }, 0);
    tl.set(el("[data-pen]"), { x: 330, y: 420, opacity: 0 }, 0);

    tl.to(el("[data-pen]"), { opacity: 1, duration: 0.3 }, 0.3);
    // Up to the bar that missed, then round it.
    tl.to(el("[data-pen]"), { motionPath: { path: [{ x: 300, y: 300 }, { x: 252, y: 186 }, { x: 250, y: 178 }], curviness: 1.4 }, duration: 1, ease: "power2.inOut" }, 0.4);
    tl.to(el("[data-pen]"), { motionPath: { path: LOOP, autoRotate: false }, duration: 1.3, ease: "power1.inOut" }, 1.5);
    tl.to(q("[data-ink=loop]"), { drawSVG: "100%", duration: 1.3, ease: "power1.inOut" }, 1.5);

    // Across to write the note.
    tl.to(el("[data-pen]"), { motionPath: { path: [{ x: 250, y: 150 }, { x: 236, y: 132 }, { x: 228, y: 128 }], curviness: 1.4 }, duration: 0.7, ease: "power2.inOut" }, 3);
    tl.to(el("[data-note]"), { scaleX: 1, duration: 1.1, ease: "none" }, 3.7);
    tl.to(el("[data-pen]"), { motionPath: { path: [{ x: 262, y: 122 }, { x: 288, y: 130 }, { x: 306, y: 124 }], curviness: 1.2 }, duration: 1.1, ease: "none" }, 3.7);

    // Then an arrow from the note down to the bar.
    tl.to(el("[data-pen]"), { motionPath: { path: [{ x: 304, y: 136 }, { x: 300, y: 146 }], curviness: 1 }, duration: 0.4, ease: "power2.inOut" }, 4.9);
    tl.to(el("[data-pen]"), { motionPath: { path: ARROW, autoRotate: false }, duration: 0.5, ease: "power1.inOut" }, 5.3);
    tl.to(q("[data-ink=arrow]"), { drawSVG: "100%", duration: 0.5, ease: "power1.inOut" }, 5.3);
    tl.to(q("[data-ink=head]"), { drawSVG: "100%", duration: 0.2 }, 5.8);

    // Hold the marked-up slide, then clear and let the pen drift off.
    tl.to(el("[data-pen]"), { motionPath: { path: [{ x: 322, y: 330 }, { x: 336, y: 420 }], curviness: 1.2 }, duration: 1.2, ease: "sine.inOut" }, 8.6);
    tl.to(el("[data-pen]"), { opacity: 0, duration: 0.4 }, 9.4);
    tl.to(q("[data-mark]"), { opacity: 0, duration: 0.5 }, 9.4);
    tl.set({}, {}, 10.4);
  }, { rest: 0.75 });

  return (
    <div ref={root} className="relative size-full overflow-hidden rounded-[26px] shadow-raised" style={{ background: "#e9e7e3" }}>
      <span className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full bg-canvas/75 px-3 py-1 text-[14px] text-ink">
        <span className="size-2 rounded-full bg-signal" />
        Sofia is presenting
      </span>

      <svg viewBox="0 0 380 500" className="absolute inset-0 size-full" fill="none" aria-hidden="true">
        {/* The slide being shared */}
        <rect x={SLIDE.x} y={SLIDE.y} width={SLIDE.w} height={SLIDE.h} rx={14} fill="#fcfcfb" />
        <text x={38} y={96} fontSize={15} fontWeight={500} fill="#101010" style={{ fontFamily: "var(--font-plex)" }}>Q3 revenue against target</text>
        <text x={38} y={112} fontSize={11} fill="#6d6d68" style={{ fontFamily: "var(--font-plex)" }}>Thousands, by month</text>
        {[0, 400, 800, 1200].map((v) => (
          <g key={v}>
            <line x1={70} x2={344} y1={y(v)} y2={y(v)} stroke="#cfcdc8" strokeWidth={1} />
            <text x={62} y={y(v) + 4} fontSize={10} fill="#8a8a85" textAnchor="end" style={{ fontFamily: "var(--font-plex)" }}>{v}</text>
          </g>
        ))}
        {MONTHS.map(([m, v], i) => (
          <g key={m}>
            <rect x={bx(i)} y={y(v)} width={BAR_W} height={BASE - y(v)} rx={5} fill={i === 2 ? "#c9c7c2" : "#4a5568"} />
            <text x={bx(i) + BAR_W / 2} y={y(v) - 7} fontSize={11} fill="#55554f" textAnchor="middle" style={{ fontFamily: "var(--font-plex)" }}>{v}</text>
            <text x={bx(i) + BAR_W / 2} y={BASE + 16} fontSize={11} fill="#6d6d68" textAnchor="middle" style={{ fontFamily: "var(--font-plex)" }}>{m}</text>
          </g>
        ))}
        <line x1={70} x2={344} y1={y(1000)} y2={y(1000)} stroke="#b0413e" strokeWidth={1.5} strokeDasharray="7 5" />
        <text x={72} y={y(1000) - 6} fontSize={10} fill="#b0413e" style={{ fontFamily: "var(--font-plex)" }}>Target 1,000</text>

        {/* Sofia's marks */}
        <g data-mark strokeLinecap="round" strokeLinejoin="round">
          <path data-ink="loop" d={LOOP} stroke={INK} strokeWidth={3.2} fill="none" />
          <g clipPath="url(#note-clip)">
            <text x={228} y={134} fontSize={26} fill={INK} style={{ fontFamily: "var(--font-caveat), cursive" }}>24% short</text>
          </g>
          <path data-ink="arrow" d={ARROW} stroke={INK} strokeWidth={3.2} fill="none" />
          <path data-ink="head" d={HEAD} stroke={INK} strokeWidth={3.2} fill="none" />
        </g>
        <defs>
          <clipPath id="note-clip">
            <rect data-note x={224} y={108} width={110} height={34} />
          </clipPath>
        </defs>

        {/* The pen */}
        <g data-pen>
          <circle r={7} fill={INK} />
          <circle r={13} fill={INK} opacity={0.22} />
        </g>
      </svg>

      {/* The people in the call, under the shared screen */}
      <div className="absolute inset-x-4 bottom-4 flex gap-2.5">
        {([["ember", "Sofia"], ["lagoon", "Daniel"], ["sage", "You"]] as const).map(([c, n], i) => (
          <div
            key={n}
            className="relative aspect-[4/3] flex-1 overflow-hidden rounded-[14px] bg-sunken"
            style={{ boxShadow: i === 0 ? "0 0 0 2px var(--signal)" : undefined }}
          >
            <Cam colour={c} seat={i} />
            {/* The name sits on the camera now, so it carries its own footing. */}
            <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-9 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="absolute bottom-1.5 left-2 text-[12px] text-[#f1f0ee]">{n}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
