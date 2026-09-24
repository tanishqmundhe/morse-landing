import { AGENTS } from "./agent-marks";
import { LogoMark } from "./logo";

/**
 * The agents, orbiting the mark on a tilted plane.
 *
 * The arrangement is the argument: a token is the only thing between any of
 * these and your account, so they sit around Morse rather than in a row under
 * it. One ellipse, walked by all eight a step apart, which gives the orbit a
 * plane rather than a face, rolled 14° off level so it reads as a plane seen
 * at an angle rather than a band straight across the box.
 *
 * Three things carry the depth, all keyed to how near the front of the run an
 * orb is. It grows — 0.52 to 1.34, because an earlier pass ran 0.84 to 1.12
 * over 34 seconds, about a pixel a second, and read as no motion at all. Its
 * gradient comes up from nearly grey to full. And it passes behind the mark on
 * the far side of the run and in front of it on the near side.
 *
 * Nothing here changes a box: every animated property is a transform, an
 * opacity or a filter, so the field composites rather than relaying out. That
 * is not fussiness — a previous attempt animated text, resized its own
 * container, tripped useLoop's resize rebuild and restarted itself for ever.
 *
 * Two rings turning opposite ways came before this, and read as clockwork: it
 * was regular on every axis at once — one speed, even spacing, one size, one
 * brightness, two circles in the same flat plane.
 */

/** One turn. Short enough that a full small-big-large-small pass is watchable. */
const SPIN = 21;

/** The ellipse, as a share of the field's width, and the angle the whole run is
 *  rolled off level. Both radii are in `cqw` rather than one in cqh, so the
 *  field's height can be trimmed to the band the run occupies without
 *  flattening the shape. Keep these three in step with the `ag-orbit` keyframes
 *  in marketing.css — they describe the same ellipse, and only this copy is
 *  used for the resting positions. */
const RX = 40;
const RY = 15;
const TILT = (14 * Math.PI) / 180;

/**
 * Where an orb rests when motion is off. The animation is what places an orb,
 * so `animation: none` on its own would drop all eight onto the mark — the
 * reduced-motion rule in marketing.css positions them from these instead.
 */
function restingAt(i: number) {
  const a = (i / AGENTS.length) * 2 * Math.PI;
  const ex = RX * Math.cos(a);
  const ey = RY * Math.sin(a);
  return {
    ["--rest-x" as string]: `${(ex * Math.cos(TILT) - ey * Math.sin(TILT)).toFixed(2)}cqw`,
    ["--rest-y" as string]: `${(ex * Math.sin(TILT) + ey * Math.cos(TILT)).toFixed(2)}cqw`,
  };
}

export function AgentOrbit() {
  return (
    <div className="ag-field relative mx-auto aspect-5/3 w-full max-w-[560px]">
      <div aria-hidden="true" className="dots absolute inset-0 rounded-[50%] opacity-60" />

      {AGENTS.map((mark, i) => (
        /* A labelled image, and nothing more. It was a <button> with no action,
           which a screen reader announces as one and which does nothing when
           pressed; then an image that named itself on hover, which meant
           reaching for a moving target. The name is in the accessibility tree,
           which is where a name belongs. */
        <span
          key={mark.name}
          role="img"
          aria-label={mark.name}
          className="ag-orb absolute top-1/2 left-1/2 grid place-items-center rounded-full border border-hairline"
          style={{
            // The app's own avatar gradient. Sampling one flat colour out of it
            // first threw away the two-tone falloff, which was the point of it.
            backgroundImage: `url(/profile-backgrounds/${mark.skin}.webp)`,
            // What the mark turns at the front, where its gradient is brightest.
            // Measured per gradient — see the table in agent-marks.ts.
            ["--fg-front" as string]:
              mark.glyph === "dark" ? "oklch(0.19 0.014 55)" : "var(--ink)",
            ...restingAt(i),
            animationDuration: `${SPIN}s`,
            animationDelay: `-${((SPIN * i) / AGENTS.length).toFixed(2)}s`,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
              className="size-[40%]"
            dangerouslySetInnerHTML={{ __html: mark.svg }}
          />
        </span>
      ))}

      {/* Morse at the centre, which is the point of the picture. An orb on the
          far side of the run passes behind this, one on the near side in front.
          Two elements: the outer one holds the centring translate, so the inner
          one has its own transform free for the float (marketing.css). */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-3 -translate-x-1/2 -translate-y-1/2">
        <div className="ag-core relative grid size-[94px] place-items-center rounded-full border sm:size-[106px]">
          <LogoMark className="size-9 text-ink sm:size-10" title="Morse" />
        </div>
      </div>

    </div>
  );
}
