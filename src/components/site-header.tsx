"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Cancel01Icon, Menu01Icon } from "@hugeicons/core-free-icons";
import { nav } from "@/content/site";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme";
import { Icon, PRIMARY } from "./ui";

/**
 * Fixed over the film. It stays clear until the film has scrolled away, then
 * takes the page colour so it reads over anything. The pill's highlight
 * follows the section on screen and slides between links.
 */
/** "/#product" points at #product on the home page; "/pricing" is its own page. */
export function SiteHeader() {
  const path = usePathname();
  const onHome = path === "/";
  // Away from the home page there is no film to stay clear of.
  const [solid, setSolid] = useState(!onHome);
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
    return () => window.removeEventListener("scroll", onScroll);
  }, [onHome, path]);

  // The nav lists pages, so the current one is the route. The scroll-spy this
  // replaced was watching section ids that the nav stopped pointing at, which
  // left nothing marked at all.
  const active = path;

  useLayoutEffect(() => {
    const el = active ? links.current[active] : null;
    // Measuring the link is the only way to place the highlight.
    setMark(el ? { x: el.offsetLeft, w: el.offsetWidth } : null);
  }, [active]);

  return (
    <header
      className={`fixed inset-x-2.5 top-2.5 z-40 shadow-raised backdrop-blur-xl backdrop-saturate-150 transition-[background-color,border-radius] duration-300 sm:inset-x-3.5 sm:top-3.5 ${
        // The home hero is dark in both themes, so the bar reads on stage while
        // it is over it; once the film has gone it is on the page.
        !solid && onHome ? "on-stage" : ""
      } ${
        // Glass at every scroll position, not only once the film has gone. The
        // bar used to be fully transparent over the hero, and `ink-soft` links
        // on the arch's lime were all but invisible — the single scrim under
        // the bar is not enough where the picture is at its brightest.
        // Darkening and blurring what is behind the bar fixes it everywhere at
        // once, and stops the links changing legibility as you scroll.
        menu ? "rounded-[28px] bg-canvas/95" : solid ? "rounded-full bg-canvas/88" : "rounded-full bg-canvas/55"
      }`}
    >
      {/* Capped with the hero, or the mark and the CTA drift to the edges. */}
      <div className="mx-auto flex h-[68px] w-full items-center justify-between gap-6 px-5 sm:h-[76px] sm:px-8 lg:px-10 3xl:max-w-[1680px] 4xl:max-w-[1800px]">
        <a href={onHome ? "#" : "/"} aria-label={onHome ? "Morse, back to top" : "Morse, home"} className="text-ink">
          <Logo className="glitch-hover h-[26px] w-auto sm:h-[30px]" />
        </a>

        {/* Plain links. A pill inside a pill inside the header bar was three
            nested rounded boxes for three words; the page marks its current
            place with a rule under the word, the way the footer marks a link. */}
        <nav aria-label="Main" className="relative hidden items-center gap-8 md:flex">
          {nav.links.map((link) => (
            <a
              key={link.href}
              ref={(el) => {
                links.current[link.href] = el;
              }}
              href={link.href}
              aria-current={active === link.href ? "location" : undefined}
              className={`relative py-1 text-[16px] transition-colors duration-200 ${
                active === link.href ? "text-ink" : "text-ink-soft hover:text-ink"
              }`}
            >
              {link.label}
            </a>
          ))}
          <span
            aria-hidden="true"
            className="absolute -bottom-0.5 left-0 h-px bg-ink transition-[transform,width,opacity] duration-300 ease-out"
            style={{ transform: `translateX(${mark?.x ?? 0}px)`, width: mark?.w ?? 0, opacity: mark ? 1 : 0 }}
          />
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href={nav.cta.href} /* max-sm:, not hidden: PRIMARY already carries inline-flex and both
             are display utilities, so the class list does not decide which
             wins — a variant does. */
            className={`${PRIMARY} h-11 px-5 text-[16px] max-sm:hidden`}>
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
        className={`overflow-hidden overscroll-contain px-5 transition-[grid-template-rows,opacity] duration-300 ease-out md:hidden ${menu ? "grid grid-rows-[1fr] pb-4 opacity-100" : "grid grid-rows-[0fr] opacity-0"}`}
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
          <a href={nav.cta.href} className={`${PRIMARY} mt-4 w-full sm:hidden`}>
            {nav.cta.label}
          </a>
        </nav>
      </div>
    </header>
  );
}
