import { Add01Icon } from "@hugeicons/core-free-icons";
import { faq } from "@/content/site";
import { H2, Heading, Icon, WRAP } from "./ui";

export function Faq() {
  return (
    <section id="questions" className={`${WRAP} grid scroll-mt-6 gap-10 border-t border-hairline py-20 lg:grid-cols-[0.8fr_1.2fr] lg:py-28`}>
      <Heading lead={faq.title} className={H2} />
      <div>
        {faq.items.map((item) => (
          <details key={item.q} className="group border-b border-hairline first:-mt-5">
            <summary className="flex list-none items-center justify-between gap-6 py-5 text-[19px] text-ink [&::-webkit-details-marker]:hidden">
              {item.q}
              <Icon icon={Add01Icon} className="size-5 shrink-0 text-ink-soft transition-transform duration-200 group-open:rotate-45" />
            </summary>
            <p className="-mt-1 pr-10 pb-6 text-[17px]/[1.6] text-ink-soft">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
