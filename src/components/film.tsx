"use client";

import { useEffect, useRef } from "react";

/**
 * A looping film, as the app plays its sign-in film (auth-shell.tsx): muted,
 * inline, on its poster until it can play. It also pauses while off screen,
 * since a page of them would otherwise all decode at once, and rests on its
 * first frame for reduced motion.
 */
export function Film({ src, poster, className = "" }: { src: string; poster?: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const still = matchMedia("(prefers-reduced-motion: reduce)");
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !still.matches) void video.play().catch(() => {});
      else video.pause();
    });
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      aria-hidden="true"
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      className={`absolute inset-0 size-full object-cover ${className}`}
    />
  );
}
