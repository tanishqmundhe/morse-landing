import Image from "next/image";

/**
 * The tear, on any picture.
 *
 * The artwork has its scan-echo baked into the pixels and cannot be animated
 * out of them, so this is the same idea rebuilt as motion: a copy of the
 * picture, clipped to a few horizontal slices and shoved sideways for a few
 * frames. It reads as the signal dropping rather than as an effect.
 *
 * It is a second copy of the image rather than a filter because the slices
 * have to show the picture displaced, not recoloured. The copy is decorative
 * and hidden from assistive tech; the real one underneath carries the `alt`.
 *
 * `delay` staggers instances. Every picture tearing on the same beat reads as
 * the page breaking; a few seconds apart reads as interference.
 */
export function GlitchBand({
  src,
  delay = 0,
  className = "absolute inset-0 size-full object-cover",
  sizes = "100vw",
  onStage = false,
}: {
  /** The stem, as Artwork takes it: "signal" covers both skies. */
  src: string;
  delay?: number;
  className?: string;
  sizes?: string;
  /** For the places that stay black-skied in both themes, like the hero: one
   *  copy of the dark picture rather than a CSS-switched pair. */
  onStage?: boolean;
}) {
  // `alt` stays spelled out on each element: through a spread the linter
  // cannot see it, and a decorative image with no alt is a real defect.
  const common = { "aria-hidden": true as const, width: 1600, height: 1067, sizes };
  const at = { animationDelay: `${delay}s` };
  if (onStage) {
    return <Image {...common} alt="" src={`/art/${src}.webp`} className={`${className} glitch-band`} style={at} />;
  }
  return (
    <>
      <Image {...common} alt="" src={`/art/${src}-light.webp`} className={`${className} glitch-band dark:hidden`} style={at} />
      <Image {...common} alt="" src={`/art/${src}.webp`} className={`${className} glitch-band hidden dark:block`} style={at} />
    </>
  );
}
