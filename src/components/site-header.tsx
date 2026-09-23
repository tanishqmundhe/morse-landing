"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Cancel01Icon, Menu01Icon } from "@hugeicons/core-free-icons";
import { nav } from "@/content/site";
import { Logo } from "./logo";
import { Icon, PRIMARY } from "./ui";

/**
 * Fixed over the film. It stays clear until the film has scrolled away, then
 * takes the page colour so it reads over anything. The pill's highlight
 * follows the section on screen and slides between links.
 */
/** "/#product" points at #product on the home page; "/pricing" is its own page. */
const sectionOf = (href: string) => (href.startsWith("/#") ? href.slice(1) : null);

export function SiteHeader() {
  const path = usePathname();
  const onHome = path === "/";
  // Away from the home page there is no film to stay clear of.
  const [solid, setSolid] = useState(!onHome);
  const [seen, setSeen] = useState<string | null>(null);
  const [mark, setMark] = useState<{ x: number; w: number } | null>(null);
  const [menu, setMenu] = useState(false);
  const links = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const onScroll = () => {
      setSolid(!onHome || window.scrollY > window.innerHeight * 0.75);
      setMenu(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Off the home page there are no sections to watch; the route is the answer.
    if (!onHome) return () => window.removeEventListener("scroll", onScroll);

    // A section is current while it crosses the band a third of the way down.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setSeen(`/#${e.target.id}`);
      },
      { rootMargin: "-33% 0px -66% 0px" },
    );
    const targets = nav.links
      .map((l) => sectionOf(l.href))
      .filter((s): s is string => s !== null)
      .map((s) => document.querySelector(s))
      .filter(Boolean) as Element[];
    targets.forEach((t) => io.observe(t));
    // Above the first section, nothing is current.
    const top = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(null), { rootMargin: "0px 0px -60% 0px" });
    const hero = document.querySelector("main > section");
    if (hero) top.observe(hero);

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      top.disconnect();
    };
  }, [onHome, path]);

  // On the home page the current link is whatever section you're looking at;
  // anywhere else it's simply the page you're on.
  const active = onHome ? seen : path;

  useLayoutEffect(() => {
    const el = active ? links.current[active] : null;
    // Measuring the link is the only way to place the highlight.
    setMark(el ? { x: el.offsetLeft, w: el.offsetWidth } : null);
  }, [active]);

  return (
    <header
      className={`fixed inset-x-2.5 top-2.5 z-40 transition-[background-color,box-shadow] duration-300 sm:inset-x-3.5 sm:top-3.5 ${
        menu ? "rounded-[28px] bg-canvas/95 shadow-float backdrop-blur-md" : solid ? "rounded-full bg-canvas/85 shadow-float backdrop-blur-md" : ""
      }`}
    >
      <div className="flex h-[68px] items-center justify-between gap-6 px-5 sm:h-[76px] sm:px-8 lg:px-10">
        <a href={onHome ? "#" : "/"} aria-label={onHome ? "Morse, back to top" : "Morse, home"} className="text-ink">
          <Logo className="h-[26px] w-auto sm:h-[30px]" />
        </a>

        <nav
          aria-label="Main"
          className="relative hidden items-center rounded-full bg-canvas/50 p-1.5 shadow-[0_0_0_1px_oklch(0.9564_0.0127_63.92/0.06)] md:flex"
        >
          <span
            aria-hidden="true"
            className="absolute top-1.5 bottom-1.5 left-0 rounded-full bg-overlay transition-[transform,width,opacity] duration-300 ease-out"
            style={{ transform: `translateX(${mark?.x ?? 0}px)`, width: mark?.w ?? 0, opacity: mark ? 1 : 0 }}
          />
          {nav.links.map((link) => (
            <a
              key={link.href}
              ref={(el) => {
                links.current[link.href] = el;
              }}
              href={link.href}
              aria-current={active === link.href ? "location" : undefined}
              className={`relative rounded-full px-4 py-2 text-[16px] transition-colors duration-200 ${
                active === link.href ? "text-ink" : "text-ink-soft hover:text-ink"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={nav.cta.href} className={`${PRIMARY} h-11 px-5 text-[16px]`}>
            {nav.cta.label}
          </a>
          <button
            onClick={() => setMenu(!menu)}
            aria-expanded={menu}
            aria-controls="menu"
            aria-label={menu ? "Close menu" : "Menu"}
            className="grid size-11 place-items-center rounded-full bg-overlay text-ink transition-colors hover:bg-overlay-hover md:hidden"
          >
            <Icon icon={menu ? Cancel01Icon : Menu01Icon} className="size-5" />
          </button>
        </div>
      </div>

      {/* On a phone the links live here instead of in the pill. */}
      <div
        id="menu"
        className={`overflow-hidden px-5 transition-[grid-template-rows,opacity] duration-300 ease-out md:hidden ${menu ? "grid grid-rows-[1fr] pb-4 opacity-100" : "grid grid-rows-[0fr] opacity-0"}`}
      >
        <nav aria-label="Sections" className="min-h-0">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenu(false)}
              className="block border-t border-hairline/70 py-3.5 text-[18px] text-ink-soft first:border-t-0"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
