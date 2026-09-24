"use client";

import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons";
import { useSyncExternalStore } from "react";
import { Icon } from "./ui";

const KEY = "morse-theme";

/**
 * Runs before paint, so the page never shows light for a frame and then swaps.
 * It is inline in the document head for that reason, and it is the only inline
 * script on the site.
 *
 * A saved choice wins over the system; no saved choice follows the system.
 */
export const THEME_BOOT = `(function(){try{var s=localStorage.getItem(${JSON.stringify(KEY)});var d=s?s==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;

/**
 * The class on <html> is the source of truth — the boot script sets it before
 * React exists, and it is a real external system, so it is subscribed to
 * rather than mirrored into state.
 */
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
};
const isDark = () => document.documentElement.classList.contains("dark");

export function ThemeToggle({ className = "" }: { className?: string }) {
  // Only the label reads this. Which icon shows is decided in CSS off the same
  // class, so the button is right on the first paint and never flips after it.
  const dark = useSyncExternalStore(subscribe, isDark, () => false);

  const flip = () => {
    const swap = () => {
      const next = !document.documentElement.classList.contains("dark");
      document.documentElement.classList.toggle("dark", next);
      try {
        localStorage.setItem(KEY, next ? "dark" : "light");
      } catch {
        // Private windows refuse; the choice then lasts the session, which is fine.
      }
    };

    // The new theme comes down from the top like a blind, soft at first — the
    // keyframes are in globals.css under "The theme changes like a blind".
    //
    // Two ways out of it, both to the instant swap this had before: browsers
    // without the API (Firefox, at the time of writing), and anyone who has
    // asked for less motion. A 0.7s wipe of the whole page is precisely the
    // kind of thing that setting means, and the class still has to change.
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still || !document.startViewTransition) {
      swap();
      return;
    }
    // The browser aborts a transition it cannot run — the tab hidden, another
    // one already in flight — and rejects `ready` when it does. Nothing is
    // broken when that happens (the class has changed either way, which is the
    // part that matters), but an unhandled rejection puts an InvalidStateError
    // in the console, so it is swallowed deliberately rather than by accident.
    const transition = document.startViewTransition(swap);
    transition.ready.catch(() => {});
    transition.finished.catch(() => {});
  };

  return (
    <button
      type="button"
      onClick={flip}
      aria-pressed={dark}
      aria-label="Dark mode"
      className={`grid size-11 shrink-0 place-items-center rounded-full text-ink-soft transition-colors duration-200 hover:bg-overlay hover:text-ink ${className}`}
    >
      <Icon icon={Moon02Icon} className="size-[19px] dark:hidden" />
      <Icon icon={Sun03Icon} className="hidden size-[19px] dark:block" />
    </button>
  );
}
