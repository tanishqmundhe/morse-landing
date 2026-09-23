import { Eyebrow } from "../ui";

/**
 * The rule that opens each part of the pricing page: which part this is, what
 * it's called, and a line that runs off to the right. Mono and ink-faint —
 * it's signposting, not a heading, and it should read as machinery.
 */
export function Marker({ n, of, label }: { n: number; of: number; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <Eyebrow className="shrink-0 tabular-nums">
        N.{String(n).padStart(2, "0")}
        <span className="text-ink-faint/50">/{String(of).padStart(2, "0")}</span>
      </Eyebrow>
      <span aria-hidden="true" className="h-px w-8 shrink-0 bg-hairline" />
      <Eyebrow className="shrink-0">{label}</Eyebrow>
      <span aria-hidden="true" className="h-px flex-1 bg-hairline" />
    </div>
  );
}
