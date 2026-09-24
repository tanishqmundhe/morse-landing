"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowDown01Icon, ArrowRight01Icon, Cancel01Icon, Menu01Icon } from "@hugeicons/core-free-icons";
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
  /** Which nav item has its panel open, by href. Null is closed. */
  const [open, setOpen] = useState<string | null>(null);
  /** The link under the pointer. The rule follows it and falls back to the
   *  current page when the pointer leaves, so the bar answers the pointer
   *  instead of only reporting where you are. */
  const [hover, setHover] = useState<string | null>(null);
  /** The row under the pointer inside the panel. */
  const [row, setRow] = useState<number | null>(null);
  const shut = useRef<ReturnType<typeof setTimeout> | null>(null);
  const links = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const onScroll = () => {
      setSolid(!onHome || window.scrollY > window.innerHeight * 0.75);
      setMenu(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onHome, path]);

  // Escape closes the panel wherever focus is, and scrolling away closes it
  // too — a menu left hanging over a section you have already reached is just
  // something in the way.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    const onScroll = () => setOpen(null);
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  // A short grace period on the way out, so crossing the gap between the word
  // and the panel does not close it under the pointer.
  const hold = (href: string | null) => {
    if (shut.current) clearTimeout(shut.current);
    if (href) setOpen(href);
    else shut.current = setTimeout(() => setOpen(null), 140);
  };

  // The nav lists pages, so the current one is the route. The scroll-spy this
  // replaced was watching section ids that the nav stopped pointing at, which
  // left nothing marked at all.
  const active = path;

  useLayoutEffect(() => {
    const target = hover ?? active;
    const el = target ? links.current[target] : null;
    // Measuring the link is the only way to place the highlight.
    setMark(el ? { x: el.offsetLeft, w: el.offsetWidth } : null);
  }, [active, hover]);

  return (
    <header
      className={`fixed inset-x-2.5 top-2.5 z-40 shadow-raised backdrop-blur-xl backdrop-saturate-150 transition-[background-color,border-radius] duration-300 sm:inset-x-3.5 sm:top-3.5 ${
        /* No `.on-stage` over the hero any more: it takes the theme itself,
           so the bar is simply the page's own colours at every position. */
        ""
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
      <div className="relative mx-auto flex h-[68px] w-full items-center justify-between gap-6 px-5 sm:h-[76px] sm:px-8 lg:px-10 3xl:max-w-[1680px] 4xl:max-w-[1800px]">
        <a href={onHome ? "#" : "/"} aria-label={onHome ? "Morse, back to top" : "Morse, home"} className="text-ink">
          <Logo className="glitch-hover h-[26px] w-auto sm:h-[30px]" />
        </a>

        {/* Plain links. A pill inside a pill inside the header bar was three
            nested rounded boxes for three words; the page marks its current
            place with a rule under the word, the way the footer marks a link. */}
        {/* Centred on the bar, not on what the logo and the buttons leave over.
            As a flex item between them it sat 43px left of centre at every
            width, because the actions are 193px wide against the logo's 107 and
            `justify-between` splits the difference. It is still the containing
            block for its own underline. */}
        <nav
          aria-label="Main"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex"
          onPointerLeave={() => setHover(null)}
        >
          {nav.links.map((link) => {
            const lit = hover === link.href || (!hover && active === link.href);
            const cls = `relative cursor-pointer py-1 text-[16px] transition-colors duration-200 ${
              lit ? "text-ink" : "text-ink-soft"
            }`;
            const measure = (el: HTMLElement | null) => {
              links.current[link.href] = el;
            };

            if (!link.menu) {
              return (
                <a
                  key={link.href}
                  ref={measure}
                  href={link.href}
                  onPointerEnter={() => setHover(link.href)}
                  aria-current={active === link.href ? "location" : undefined}
                  className={cls}
                >
                  {link.label}
                </a>
              );
            }

            const isOpen = open === link.href;
            return (
              <div
                key={link.href}
                className="relative"
                onPointerEnter={() => {
                  setHover(link.href);
                  hold(link.href);
                }}
                onPointerLeave={() => hold(null)}
              >
                {/* A button, not a link: it opens something rather than going
                    somewhere, and a reader on a keyboard needs to be told so. */}
                <button
                  type="button"
                  ref={measure}
                  aria-expanded={isOpen}
                  aria-controls="features-menu"
                  onClick={() => setOpen(isOpen ? null : link.href)}
                  className={`${cls} flex items-center gap-1.5`}
                >
                  {link.label}
                  <Icon
                    icon={ArrowDown01Icon}
                    className={`size-4 text-ink-faint transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* One column, six rows, and a single block that slides to
                    whichever row the pointer is on — the same idea as the rule
                    under the nav, which is the page's way of marking a place. */}
                <div
                  id="features-menu"
                  className={`absolute top-full left-1/2 z-50 w-[288px] -translate-x-1/2 pt-3 transition-[opacity,transform] duration-200 ease-out ${
                    isOpen ? "visible opacity-100" : "invisible -translate-y-1 opacity-0"
                  }`}
                  onPointerLeave={() => setRow(null)}
                >
                  <div className="relative rounded-[20px] bg-canvas/95 p-2 shadow-float ring-1 ring-rim backdrop-blur-xl">
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-2 top-2 h-11 rounded-[13px] bg-overlay transition-[transform,opacity] duration-300 ease-out"
                      style={{ transform: `translateY(${(row ?? 0) * 44}px)`, opacity: row === null ? 0 : 1 }}
                    />
                    {link.menu.map((item, i) => (
                      <a
                        key={item.href}
                        href={onHome ? item.href : `/${item.href}`}
                        onClick={() => setOpen(null)}
                        onPointerEnter={() => setRow(i)}
                        tabIndex={isOpen ? undefined : -1}
                        className="relative flex h-11 items-center gap-2 rounded-[13px] px-3.5 text-[16px] text-ink-soft transition-colors duration-200 hover:text-ink focus-visible:text-ink"
                      >
                        {item.label}
                        <Icon
                          icon={ArrowRight01Icon}
                          className={`ml-auto size-4 text-ink-faint transition-[opacity,transform] duration-300 ease-out ${
                            row === i ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
                          }`}
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
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
            <div key={link.href} className="border-t border-hairline/70 first:border-t-0">
              <a href={link.href} onClick={() => setMenu(false)} className="block py-3.5 text-[18px] text-ink-soft">
                {link.label}
              </a>
              {/* No disclosure on a phone: the sheet is already a list, and a
                  list inside a list you have to open is one tap too many. */}
              {link.menu && (
                <ul className="mb-3 flex flex-col pl-4">
                  {link.menu.map((item) => (
                    <li key={item.href}>
                      <a
                        href={onHome ? item.href : `/${item.href}`}
                        onClick={() => setMenu(false)}
                        className="block py-2 text-[16px] text-ink-faint"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <a href={nav.cta.href} className={`${PRIMARY} mt-4 w-full sm:hidden`}>
            {nav.cta.label}
          </a>
        </nav>
      </div>
    </header>
  );
}
