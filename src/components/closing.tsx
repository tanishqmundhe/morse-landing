import { closing } from "@/content/site";
import { Lines } from "./lines";

export function Closing() {
  return (
    <section className="closing wrap">
      <span className="closing-mark" aria-hidden="true">
        ✳
      </span>
      <h2>
        <Lines text={closing.title} />
      </h2>
      <a className="button primary" href={closing.cta.href}>
        {closing.cta.label} <span>↗</span>
      </a>
    </section>
  );
}
