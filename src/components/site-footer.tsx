import { footer } from "@/content/site";
import { Brand } from "./brand";

export function SiteFooter() {
  return (
    <footer className="wrap">
      <Brand />
      <p>{footer.tagline}</p>
      <span>
        A product by <strong>{footer.maker}</strong>
      </span>
    </footer>
  );
}
