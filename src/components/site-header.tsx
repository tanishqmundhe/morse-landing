"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { nav } from "@/content/site";
import { Logo } from "./logo";
import { PRIMARY } from "./ui";

/**
 * Fixed over the film. It stays clear until the film has scrolled away, then
 * takes the page colour so it reads over anything. The pill's highlight
 * follows the section on screen and slides between links.
 */
export function SiteHeader() {
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [mark, setMark] = useState<{ x: number; w: number } | null>(null);
  const links = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // A section is current while it crosses the band a third of the way down.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-33% 0px -66% 0px" },
    );
    const targets = nav.links.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[];
    targets.forEach((t) => io.observe(t));
    // Above the first section, nothing is current.
    const top = new IntersectionObserver(([e]) => e.isIntersecting && setActive(null), { rootMargin: "0px 0px -60% 0px" });
    const hero = document.querySelector("main > section");
    if (hero) top.observe(hero);

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      top.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    const el = active ? links.current[active] : null;
    // Measuring the link is the only way to place the highlight.
    setMark(el ? { x: el.offsetLeft, w: el.offsetWidth } : null);
  }, [active]);

  return (
    <header
      className={`fixed inset-x-2.5 top-2.5 z-40 transition-[background-color,box-shadow] duration-300 sm:inset-x-3.5 sm:top-3.5 ${
        solid ? "rounded-full bg-canvas/85 shadow-float backdrop-blur-md" : ""
      }`}
    >
      <div className="flex h-[68px] items-center justify-between gap-6 px-5 sm:h-[76px] sm:px-8 lg:px-10">
        <a href="#" aria-label="Morse, back to top" className="text-ink">
          <Logo className="h-[22px] w-auto sm:h-6" />
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

        <a href={nav.cta.href} className={`${PRIMARY} h-11 px-5 text-[16px]`}>
          {nav.cta.label}
        </a>
      </div>
    </header>
  );
}
