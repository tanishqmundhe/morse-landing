"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin, TextPlugin);

export { gsap };

/**
 * A looping GSAP timeline for one feature card. `build` adds the tweens; `q`
 * finds elements inside the card. The timeline plays only while the card is
 * on screen, and under reduced motion it rests on the frame at `rest` (0 to 1)
 * so the card still shows its finished picture.
 */
export function useLoop<T extends HTMLElement = HTMLDivElement>(
  build: (tl: gsap.core.Timeline, q: (selector: string) => Element[]) => void,
  { rest = 0.7, repeatDelay = 0 }: { rest?: number; repeatDelay?: number } = {},
) {
  const root = useRef<T>(null);
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    let io: IntersectionObserver | undefined;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay, paused: true });
      build(tl, gsap.utils.selector(el));
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        tl.progress(rest).pause();
        return;
      }
      io = new IntersectionObserver(([e]) => (e.isIntersecting ? tl.play() : tl.pause()), { threshold: 0.15 });
      io.observe(el);
    }, el);
    return () => {
      io?.disconnect();
      ctx.revert();
    };
    // Built once; the scene is static.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return root;
}
