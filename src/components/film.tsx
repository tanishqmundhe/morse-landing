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
export function Film({
  src,
  poster,
  className = "",
  offset = 0,
  rate = 1,
}: {
  src: string;
  poster?: string;
  className?: string;
  /** Seconds into the clip to start. See the note on `rate`. */
  offset?: number;
  /** Playback rate. Three tiles cut from one source play the same frames at
   *  the same moment — everyone blinks together, nods together, smiles
   *  together — and a room of people moving in lockstep is the single thing
   *  that makes footage read as fake. `offset` puts each one in a different
   *  part of the clip; `rate` makes them drift apart from there instead of
   *  holding a fixed distance, which is what a fixed offset alone does. Keep
   *  it within a few percent of 1: past that it is visible as slow motion. */
  rate?: number;
}) {
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

    // Start somewhere else in the clip, and run at a slightly different speed.
    // Set on `loadedmetadata` because `currentTime` before that is discarded.
    const place = () => {
      video.playbackRate = rate;
      if (offset) video.currentTime = offset % (video.duration || 1);
    };
    if (video.readyState >= 1) place();
    video.addEventListener("loadedmetadata", place);

    const play = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !still.matches) void video.play().catch(() => {});
      else video.pause();
    });
    play.observe(video);

    return () => {
      near.disconnect();
      play.disconnect();
      video.removeEventListener("loadedmetadata", place);
    };
  }, [offset, rate]);

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
