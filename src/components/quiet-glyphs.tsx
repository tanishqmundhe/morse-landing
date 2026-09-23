/**
 * Four glyphs for the quiet band, drawn in the logo's own vocabulary: rounded
 * bars on the diagonal and round dots, the two primitives the Morse mark is
 * made of. The mark's bars all lie one way; these use both, because four
 * glyphs built from parallel strokes alone come out as four identical smudges.
 *
 * Each piece carries the point in its cell's fill at which it lights, and
 * works that out in CSS from `--l`. Nothing re-renders as you scroll: the
 * scroll writes one number on the section and the glyphs resolve themselves.
 */
type At = { at: number };

/** ink at `at`, ink-faint before it, over a short ramp so it doesn't snap. */
const fill = (at: number) =>
  `color-mix(in oklch, var(--ink) calc(clamp(0, (var(--l, 0) - ${at}) * 5, 1) * 100%), var(--ink-faint))`;

/** `up` is the mark's own angle, bottom-left to top-right; `down` crosses it. */
function Bar({ x, y, len, at, down = false }: { x: number; y: number; len: number; down?: boolean } & At) {
  return <rect x={x} y={y} width={len} height={5} rx={2.5} transform={`rotate(${down ? 45 : -45} ${x} ${y})`} style={{ fill: fill(at) }} />;
}

function Dot({ cx, cy, at }: { cx: number; cy: number } & At) {
  return <circle cx={cx} cy={cy} r={2.5} style={{ fill: fill(at) }} />;
}

/** A piece that never lights: it marks something that isn't there. */
function Ghost({ x, y, len }: { x: number; y: number; len: number }) {
  return (
    <rect
      x={x}
      y={y}
      width={len}
      height={5}
      rx={2.5}
      transform={`rotate(-45 ${x} ${y})`}
      className="fill-none stroke-ink-faint"
      strokeWidth={1.2}
      strokeDasharray="3 3"
      opacity={0.6}
    />
  );
}

/** The caller sets the size; two arbitrary size-* utilities would fight. */
function Frame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 72 72" className={`shrink-0 ${className}`} aria-hidden="true">
      {children}
    </svg>
  );
}

type Props = { className?: string };

/** Three in the room, and a fourth place that stays drawn but empty. */
export function GlyphRoom({ className }: Props) {
  return (
    <Frame className={className}>
      <Bar x={8} y={30} len={26} at={0.05} />
      <Bar x={18} y={40} len={26} at={0.25} />
      <Bar x={28} y={50} len={26} at={0.45} />
      <Ghost x={38} y={60} len={26} />
    </Frame>
  );
}

/** A lattice of two calendars, and one line carrying on through both. */
export function GlyphCalendar({ className }: Props) {
  return (
    <Frame className={className}>
      <Bar x={12} y={36} len={26} at={0.05} />
      <Bar x={26} y={50} len={26} at={0.2} />
      <Bar x={12} y={36} len={26} at={0.45} down />
      <Bar x={26} y={22} len={26} at={0.6} down />
      <Dot cx={45} cy={35} at={0.9} />
    </Frame>
  );
}

/** A key: the bow, a long shaft, and two teeth cutting across it. */
export function GlyphKey({ className }: Props) {
  return (
    <Frame className={className}>
      <Dot cx={12} cy={57} at={0.05} />
      <Dot cx={19} cy={64} at={0.12} />
      <Bar x={17} y={55} len={42} at={0.3} />
      <Bar x={37} y={33} len={13} at={0.68} down />
      <Bar x={43} y={27} len={13} at={0.84} down />
    </Frame>
  );
}

/** A count: four bars, each longer than the last. */
export function GlyphCount({ className }: Props) {
  return (
    <Frame className={className}>
      <Bar x={9} y={27} len={15} at={0.05} />
      <Bar x={9} y={40} len={24} at={0.3} />
      <Bar x={9} y={53} len={33} at={0.55} />
      <Bar x={9} y={66} len={42} at={0.8} />
    </Frame>
  );
}

export const GLYPHS: Record<string, (p: Props) => React.ReactElement> = {
  bot: GlyphRoom,
  google: GlyphCalendar,
  api: GlyphKey,
  counts: GlyphCount,
};
