import { Fragment } from "react";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";

/**
 * The app's surfaces and controls, as the landing page uses them.
 * Depth is luminance and a machined shadow, never a border (Morse contract #5).
 */
export const CARD = "rounded-[28px] bg-raised shadow-raised";
export const WRAP = "mx-auto w-full max-w-[1200px] px-5 sm:px-8";

/** Capsules only (contract #8). Sage is spent on the one thing to press. */
const BUTTON =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[17px] font-medium whitespace-nowrap transition-colors duration-150";
export const PRIMARY = `${BUTTON} bg-action text-action-foreground hover:bg-action-hover`;
export const SECONDARY = `${BUTTON} bg-overlay text-ink hover:bg-overlay-hover`;

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

export const H2 = "text-[36px]/[1.12] sm:text-[48px]/[1.08]";
