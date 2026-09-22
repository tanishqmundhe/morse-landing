import Image from "next/image";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { features, hero } from "@/content/site";
import { CARD, Heading, Icon, PRIMARY, WRAP } from "./ui";

export function Hero() {
  return (
    <section className={`${WRAP} pt-10 pb-20 sm:pt-16 lg:pb-28`}>
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="max-w-xl">
          <Heading
            as="h1"
            lead={hero.title}
            muted={hero.titleMuted}
            className="text-[46px]/[1.04] sm:text-[64px]/[1.02] xl:text-[72px]/[1]"
          />
          <p className="mt-6 max-w-[34rem] text-[19px]/[1.55] text-ink-soft">{hero.lede}</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a href={hero.primary.href} className={PRIMARY}>
              {hero.primary.label}
            </a>
            <a
              href={hero.secondary.href}
              className="inline-flex h-12 items-center gap-1.5 text-[17px] text-ink-soft transition-colors hover:text-ink"
            >
              {hero.secondary.label}
              <Icon icon={ArrowDown01Icon} className="size-[18px]" />
            </a>
          </div>
        </div>
        <figure className={`${CARD} p-2`}>
          <Image
            src={hero.image.src}
            width={hero.image.width}
            height={hero.image.height}
            alt={hero.image.alt}
            sizes="(min-width: 1200px) 620px, (min-width: 1024px) 52vw, 100vw"
            className="h-auto w-full rounded-[22px]"
            priority
          />
        </figure>
      </div>
      <ul
        aria-label="In one workspace"
        className="mt-16 flex flex-wrap gap-x-8 gap-y-2 border-t border-hairline pt-7 text-[17px] text-ink-soft lg:mt-24"
      >
        {features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
    </section>
  );
}
