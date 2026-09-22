import { Fragment } from "react";

/** Renders a string from site.ts, turning each "\n" into a <br>. */
export function Lines({ text }: { text: string }) {
  return text.split("\n").map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ));
}

/** A two-tone heading: the lead in ink, the second line muted (or accented). */
export function SplitHeading({ lead, muted }: { lead: string; muted: string }) {
  return (
    <h2>
      <Lines text={lead} />
      <br />
      <span>{muted}</span>
    </h2>
  );
}
