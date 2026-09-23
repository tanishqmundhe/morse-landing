"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { extras } from "@/content/site";
import { Eyebrow, H2, Heading, Icon, LEAD, SECTION } from "../ui";
import { PICTURES } from "./pictures";

/**
 * Section 3: the smaller things, as a filmstrip. Tall cards in one row with
 * wide gaps, the title and a line under each rather than inside. The row
 * scrolls sideways by trackpad, by dragging, by keyboard, or with the two
 * buttons; it starts in line with the page's left edge and can run off the
 * right. A card plays only while it is on screen. The cards arrive once, one
 * after another, when the row first comes into view.
 */
export function Features() {
  const row = useRef<HTMLDivElement>(null);
  const [arrived, setArrived] = useState(false);
  const [edges, setEdges] = useState({ start: true, end: false });
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

  useEffect(() => {
    const r = row.current;
    if (!r) return;
    const cards = [...r.children] as HTMLElement[];
    // Play what's visible; pause what isn't.
    const play = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.toggleAttribute("data-play", e.isIntersecting)),
      { root: null, threshold: 0.2 },
    );
    cards.forEach((c) => play.observe(c));
    const arrive = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setArrived(true);
          arrive.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    arrive.observe(r);
    const onScroll = () =>
      setEdges({ start: r.scrollLeft < 8, end: r.scrollLeft + r.clientWidth > r.scrollWidth - 8 });
    onScroll();
    r.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      play.disconnect();
      arrive.disconnect();
      r.removeEventListener("scroll", onScroll);
    };
  }, []);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    step(e.key === "ArrowRight" ? 1 : -1);
  }

  function step(dir: 1 | -1) {
    const r = row.current;
    const card = r?.firstElementChild as HTMLElement | null;
    if (!r || !card) return;
    const gap = parseFloat(getComputedStyle(r).columnGap) || 0;
    r.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: "smooth" });
  }

  // Dragging with a mouse; touch and trackpads scroll natively.
  function onPointerDown(e: React.PointerEvent) {
    if (e.pointerType !== "mouse" || !row.current) return;
    drag.current = { x: e.clientX, left: row.current.scrollLeft, moved: false };
    // Snapping would fight the drag; it comes back on release.
    row.current.style.scrollSnapType = "none";
  }
  function onPointerMove(e: React.PointerEvent) {
    const d = drag.current;
    if (!d || !row.current) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4) d.moved = true;
    row.current.scrollLeft = d.left - dx;
  }
  function onPointerUp() {
    if (!drag.current || !row.current) return;
    drag.current = null;
    const r = row.current;
    const from = r.scrollLeft;
    r.style.scrollSnapType = "";
    // Let the browser settle onto the nearest card from where the drag let go.
    r.scrollLeft = from;
  }

  const button =
    "grid size-12 place-items-center rounded-full bg-overlay text-ink transition-[background-color,opacity,transform] duration-150 hover:bg-overlay-hover active:scale-95 disabled:pointer-events-none disabled:opacity-30";

  return (
    <section id="features" className={`${SECTION} scroll-mt-24`} aria-label="Everything else">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-5 sm:px-8 lg:flex-row lg:items-end lg:justify-between 2xl:max-w-[1360px]">
        <div className="lg:max-w-[700px]">
          <Eyebrow className="mb-5">{extras.eyebrow}</Eyebrow>
          <Heading lead={extras.title} muted={extras.titleMuted} className={H2} />
        </div>
        <div className="flex items-end gap-8">
          <p className={`${LEAD} max-w-[340px]`}>{extras.body}</p>
          <div className="hidden shrink-0 gap-2 sm:flex">
            <button className={button} onClick={() => step(-1)} disabled={edges.start} aria-label="Previous">
              <Icon icon={ArrowLeft01Icon} className="size-5" />
            </button>
            <button className={button} onClick={() => step(1)} disabled={edges.end} aria-label="Next">
              <Icon icon={ArrowRight01Icon} className="size-5" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={row}
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-label="Features. Use the arrow keys, or scroll sideways."
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        className="mt-16 flex cursor-grab snap-x snap-mandatory gap-[clamp(20px,2.8vw,48px)] overflow-x-auto pb-6 select-none [scrollbar-width:none] active:cursor-grabbing lg:mt-20 [&::-webkit-scrollbar]:hidden"
        style={{
          // The first card lines up with the page's left edge; the last can reach it too.
          paddingInline: "max(20px, calc((100vw - var(--page, 1200px)) / 2 + 32px))",
          scrollPaddingInline: "max(20px, calc((100vw - var(--page, 1200px)) / 2 + 32px))",
        }}
      >
        {extras.items.map((item, i) => {
          const Picture = PICTURES[item.id];
          return (
            <figure
              key={item.id}
              className={`feat w-[78vw] max-w-[440px] shrink-0 snap-start transition-[opacity,transform,filter] duration-700 ease-out sm:w-[380px] 2xl:w-[440px] ${
                arrived ? "translate-y-0 opacity-100 blur-0" : "translate-y-6 opacity-0 blur-[4px]"
              }`}
              style={{ transitionDelay: arrived ? `${i * 90}ms` : "0ms" }}
            >
              <div className="aspect-[19/25]">
                <Picture />
              </div>
              <figcaption className="mt-6 pr-4">
                <p className="text-[21px]/[1.3] text-ink">{item.title}</p>
                <p className="mt-1.5 text-[16px]/[1.5] text-ink-soft">{item.body}</p>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
