import { nav } from "@/content/site";
import { Brand } from "./brand";

export function SiteHeader() {
  return (
    <header className="nav wrap">
      <Brand />
      <nav aria-label="Main navigation">
        {nav.links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <a className="button small" href={nav.cta.href}>
        {nav.cta.label} <span>↗</span>
      </a>
    </header>
  );
}
