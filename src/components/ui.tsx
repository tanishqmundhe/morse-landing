import { Fragment } from "react";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";

/**
 * The app's surfaces and controls, as the landing page uses them.
 * Depth is luminance and a machined shadow, never a border (Morse contract #5).
 */
export const CARD = "rounded-[28px] bg-raised shadow-raised";
/** One rhythm for every section between the hero and the closing. */
export const SECTION = "py-28 lg:py-40 2xl:py-48";
export const WRAP = "mx-auto w-full max-w-[1200px] px-5 sm:px-8 2xl:max-w-[1360px] 3xl:max-w-[1480px] 4xl:max-w-[1560px]";

/**
 * Capsules only (contract #8), and the package's button: the acid yellow with
 * a 1px ink outline round it. The outline is what makes it read as a control
 * rather than a highlighter mark — at 93% lightness the fill alone has almost
 * no edge against paper (1.1:1), so without it the shape dissolves.
 *
 * It lifts on hover and sinks on press, which is theirs too; ours only sank.
 */
const BUTTON =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[17px] font-medium whitespace-nowrap transition-[background-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-[2px] active:translate-y-px active:scale-[0.99]";
export const PRIMARY = `${BUTTON} bg-action text-action-foreground shadow-[0_0_0_1px_var(--ink)] hover:bg-action-hover`;
export const SECONDARY = `${BUTTON} bg-transparent text-ink shadow-[0_0_0_1px_var(--hairline)] hover:bg-overlay`;

export function Icon({ icon, className = "size-5" }: { icon: IconSvgElement; className?: string }) {
  return <HugeiconsIcon icon={icon} className={className} strokeWidth={1.8} aria-hidden="true" />;
}

/** Small, heavy, tracked uppercase mono, the app's label register. */
export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`font-mono text-label uppercase text-ink-faint ${className}`}>{children}</p>;
}

/** Renders a string from site.ts, turning each "\n" into a <br>. */
export function Lines({ text }: { text: string }) {
  return text.split("\n").map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ));
}

/** Display type is light and never bold (contract #4); the second line recedes. */
export function Heading({
  lead,
  muted,
  as: Tag = "h2",
  className = "",
}: {
  lead: string;
  muted?: string;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <Tag className={`font-light tracking-[-0.025em] text-balance text-ink ${className}`}>
      <Lines text={lead} />
      {muted && (
        <>
          <br />
          <span className="text-ink-soft">{muted}</span>
        </>
      )}
    </Tag>
  );
}

/** The ladder: hero 92, closing 72, sections 56, cards 28. */
export const H2 = "text-[38px]/[1.1] sm:text-[48px]/[1.06] xl:text-[56px]/[1.05] 3xl:text-[64px]/[1.04] 4xl:text-[72px]/[1.03]";
/** A section's opening line. Everything else on the page is 17px. */
export const LEAD = "text-[18px]/[1.55] text-ink-soft sm:text-[20px]/[1.55] 3xl:text-[22px]/[1.55]";

/**
 * The page's unhurried curve: quick to leave, long to arrive. Everything that
 * opens, lifts or draws itself in uses it, so the whole page settles the same
 * way rather than each piece easing to its own taste.
 */
export const EASE = "cubic-bezier(0.22,1,0.36,1)";

/**
 * A line that draws itself under a link from the left, and retreats the way it
 * came. On a text link rather than a button — buttons already answer a press.
 */
export const UNDERLINE =
  "relative inline-block after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:after:scale-x-100 focus-visible:after:scale-x-100";
