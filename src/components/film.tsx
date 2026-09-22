"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A looping film, as the app plays its sign-in film (auth-shell.tsx): muted,
 * inline, and resting on its poster until it can play.
 *
 * Nothing downloads until the film is near the screen, and it pauses whenever
 * it leaves — a page of films would otherwise fetch and decode megabytes
 * before anyone scrolled to them. Reduced motion holds the poster's frame.
 */
export function Film({ src, poster, className = "" }: { src: string; poster?: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const still = matchMedia("(prefers-reduced-motion: reduce)");

    // Fetch it a screen before it arrives.
    const near = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          near.disconnect();
        }
      },
      { rootMargin: "100% 0px" },
    );
    near.observe(video);

    const play = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !still.matches) void video.play().catch(() => {});
      else video.pause();
    });
    play.observe(video);

    return () => {
      near.disconnect();
      play.disconnect();
    };
  }, []);

  return (
    <video
      ref={ref}
      aria-hidden="true"
      src={load ? src : undefined}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay
      preload="none"
      className={`absolute inset-0 size-full object-cover ${className}`}
    />
  );
}
