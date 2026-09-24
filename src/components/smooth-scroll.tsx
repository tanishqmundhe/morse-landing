"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "./features/timeline";

/**
 * Smooth scrolling, with Lenis (darkroomengineering/lenis) — the library most
 * of the reference pages use. It eases the real window scroll rather than
 * transforming a fake track, so `position: sticky`, the pinned showcase, the
 * header's scroll test and browser find-in-page all keep working untouched.
 *
 * Lenis is driven from GSAP's ticker instead of its own rAF loop, so the
 * scroll and the card animations settle in the same frame. It honours
 * `prefers-reduced-motion` on its own (`respectReducedMotion`, on by default):
 * smoothing drops out and scroll tracks the wheel 1:1.
 */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      // Low enough to feel carried, high enough that the pinned showcase still
      // answers the wheel rather than trailing behind it.
      lerp: 0.12,
      // Anchors are handled below rather than by Lenis, because how far you
      // are going has to change how you get there. See `onClick`.
      // A tap on a nav link while the page is still gliding lands where asked.
      stopInertiaOnNavigate: true,
      // The features filmstrip is a real horizontal scroller. Without this, a
      // diagonal trackpad swipe over it gets swallowed by the page scroll.
      allowNestedScroll: true,
      autoRaf: false,
    });

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    /**
     * Anchor links, with one rule: **a long jump lands, a short one glides.**
     *
     * The showcase is a pinned section four screens tall whose animation is
     * scrubbed by scroll. Gliding past it does exactly what scrolling past it
     * does — plays the entire sideways travel — except compressed into a
     * second, which reads as the page convulsing on its way somewhere. That
     * animation is meant for someone scrolling through it, not for someone
     * who asked to be somewhere else.
     *
     * Anything beyond two and a bit screens is a journey nobody wants
     * narrated, and it is also the only distance that can cross a pinned
     * section, so one threshold settles both. Short hops — the FAQ, skip to
     * content, back to top from near the top — keep the glide, where it reads
     * as the page moving rather than cutting.
     */
    const ease = (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t));
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as HTMLElement | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;

      const id = link.getAttribute("href")!.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (id && !target) return;

      // `scroll-margin-top` is what holds each section clear of the fixed bar,
      // and a hand-rolled scrollTo has to apply it itself.
      const margin = target ? parseFloat(getComputedStyle(target).scrollMarginTop) || 0 : 0;
      const to = target ? target.getBoundingClientRect().top + window.scrollY - margin : 0;

      event.preventDefault();
      const far = Math.abs(to - window.scrollY) > window.innerHeight * 2.2;
      lenis.scrollTo(to, far ? { immediate: true } : { duration: 1.1, easing: ease });
      history.replaceState(null, "", id ? `#${id}` : location.pathname);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
