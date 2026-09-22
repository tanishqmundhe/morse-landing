import { faq } from "@/content/site";
import { Lines } from "./lines";

export function Faq() {
  return (
    <section className="faq wrap" id="questions">
      <h2>
        <Lines text={faq.title} />
      </h2>
      <div>
        {faq.items.map((item) => (
          <details key={item.q}>
            <summary>
              {item.q}
              <span>+</span>
            </summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
