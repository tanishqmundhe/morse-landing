import Image from "next/image";
import { hero } from "@/content/site";
import { TourButton } from "./tour";

export function Hero() {
  return (
    <section className="hero wrap">
      <div className="hero-copy">
        <p className="intro">{hero.intro}</p>
        <h1>
          {hero.title}
          <br />
          <span>{hero.titleAccent}</span>
        </h1>
        <p className="lede">{hero.lede}</p>
        <div className="actions">
          <a className="button primary" href={hero.primary.href}>
            {hero.primary.label} <span>↗</span>
          </a>
          <TourButton label={hero.tourLabel} />
        </div>
        <p className="hero-note">{hero.note}</p>
      </div>
      <figure className="hero-product">
        <div className="product-crop">
          <Image
            src={hero.image.src}
            width={hero.image.width}
            height={hero.image.height}
            alt={hero.image.alt}
            sizes="(max-width: 800px) 100vw, 55vw"
            priority
          />
        </div>
        <figcaption>
          <span className="signal">✳</span>
          <div>
            <strong>{hero.caption.title}</strong>
            <span>{hero.caption.body}</span>
          </div>
          <span className="check">✓</span>
        </figcaption>
      </figure>
    </section>
  );
}
