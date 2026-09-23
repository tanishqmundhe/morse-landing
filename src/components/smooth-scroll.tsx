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
      // Anchor links: the nav, the footer columns, "skip to content". A fixed
      // duration rather than the wheel's lerp, so a jump to the last section
      // takes about as long as a jump to the first instead of dragging. No
      // offset — Lenis already reads each section's scroll-margin-top.
      anchors: {
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      },
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

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
