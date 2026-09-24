/**
 * Somebody's profile picture: their initials on their colour.
 *
 * It was the Morse mark on a gradient, which made every person in the product
 * look like the product. Initials are what the app puts there when somebody
 * has not uploaded a photo, and they are the difference between a roster of
 * people and a row of logos.
 *
 * Drawn from the name rather than served as a file, so renaming somebody
 * renames their disc.
 *
 * HTML, not SVG. The first build set the letters as <text> inside the circle
 * and they painted in some places and not others — the same component, the
 * same computed fill and size, glyphs in the heading and nothing inside the
 * showcase screens. A <span> over a CSS gradient has none of that ambiguity
 * and scales the same way.
 */

/** The pairs are from the package palette, dark at the foot. */
const SKIN: Record<string, { from: string; to: string; ink: boolean }> = {
  ember: { from: "#FB5B40", to: "#7A1E0C", ink: false },
  lagoon: { from: "#00BAA3", to: "#005E51", ink: true },
  sage: { from: "#E5F700", to: "#5C6900", ink: true },
  lilac: { from: "#9BE7D8", to: "#005E51", ink: true },
  tide: { from: "#00BAA3", to: "#0E1D21", ink: false },
  fjord: { from: "#FB5B40", to: "#0E1D21", ink: false },
};

/**
 * Whether the letters are ink or paper is measured against the midpoint of the
 * two stops, not chosen: paper on #E5F700 is 1.1:1 and on the pale teal is
 * 1.3:1, so two of the six carry ink instead.
 */
const INK = "#0E1D21";
const PAPER = "#F9F9EF";

/** "Priya Shah" → "PS". One letter if there is only one word. */
export function initialsOf(name: string) {
  const words = name.replace(/\(.*\)/, "").trim().split(/\s+/).filter(Boolean);
  return ((words[0]?.[0] ?? "") + (words.length > 1 ? (words.at(-1)?.[0] ?? "") : "")).toUpperCase();
}

export function Avatar({
  colour,
  name,
  size,
  className = "",
}: {
  colour: string;
  name: string;
  size: number;
  className?: string;
}) {
  const skin = SKIN[colour] ?? SKIN.ember;
  return (
    <span
      role="img"
      aria-label={name}
      className={`inline-grid shrink-0 place-items-center rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        backgroundImage: `linear-gradient(150deg, ${skin.from}, ${skin.to})`,
        color: skin.ink ? INK : PAPER,
        // Proportional to the disc, so one component covers 24px and 104px.
        fontSize: Math.round(size * 0.4),
        fontWeight: 500,
        letterSpacing: "0.01em",
        lineHeight: 1,
      }}
    >
      {initialsOf(name)}
    </span>
  );
}
