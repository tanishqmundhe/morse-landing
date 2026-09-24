import Image from "next/image";

/**
 * The infrared artwork, in the frame it was designed for.
 *
 * False-colour infrared: black sky, cyan and lime rock, hot coral ground,
 * with the scan-echo glitch baked into the pixels rather than animated over
 * them. It is the loudest thing on the page by a distance, so it is always a
 * panel with an edge — never a backdrop with text laid over it. Text on this
 * would be unreadable and would waste it.
 *
 * It is also already the page's palette: the lime is `--action`, the coral is
 * near `--signal`, the cyan is `--understood`. Nothing needed tinting to fit.
 */
export function Artwork({
  src,
  alt,
  className = "",
  priority = false,
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <figure className={`relative isolate overflow-hidden rounded-[22px] bg-[#05070a] sm:rounded-[30px] ${className}`}>
      {/* Absolute, so a panel can be a grid or a flex box for whatever sits on
          it without the artwork becoming an item in that layout. */}
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={1067}
        priority={priority}
        sizes="100vw"
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <MorseRule />
      {children}
    </figure>
  );
}

/**
 * The reference's one piece of ornament: a line of Morse along the top right of
 * every panel. It spells MORSE, so it is the product's name in the product's
 * own alphabet rather than decoration — which is the only kind of ornament the
 * page allows (contract #7).
 */
const MORSE = [
  [1, 1], // M
  [1, 1, 1], // O
  [0, 1, 0], // R
  [0, 0, 0], // S
  [0], // E
];

function MorseRule() {
  return (
    <div aria-hidden="true" className="absolute top-5 right-5 flex gap-3 sm:top-7 sm:right-8 sm:gap-4">
      {MORSE.map((letter, i) => (
        <span key={i} className="flex items-center gap-[5px]">
          {letter.map((dash, j) => (
            <i
              key={j}
              className={`block h-[3px] rounded-full bg-white/70 ${dash ? "w-[14px]" : "w-[3px]"}`}
            />
          ))}
        </span>
      ))}
    </div>
  );
}
