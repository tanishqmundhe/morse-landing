"use client";

import { Calendar03Icon, CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";
import { Cam } from "./cam";
import { Icon } from "./ui";

/**
 * The meeting, on the artwork.
 *
 * A single static card said "a meeting is happening" and stopped. This says
 * what Morse actually does, in the order it does it: the call is running, the
 * notes are being written from it, and the next meeting books itself off
 * something someone said. Three windows, layered, arriving in that sequence —
 * so the montage is the argument rather than decoration.
 *
 * It is one orchestrated entrance on load, not a per-element reveal: the
 * pieces land 400ms apart and then hold. Nothing loops except the cameras.
 */
const at = (ms: number) => ({ animationDelay: `${ms}ms` });

export function HeroMontage() {
  return (
    <div className="pointer-events-none relative hidden h-[420px] w-[620px] lg:block 3xl:h-[470px] 3xl:w-[700px]">
      {/* 1. The call, furthest back and furthest right. */}
      <div
        className="animate-enter absolute top-0 right-0 w-[168px] overflow-hidden rounded-[18px] bg-float shadow-float 3xl:w-[186px]"
        style={at(560)}
      >
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-[12px] text-ink-faint">In call</span>
          <span className="flex items-center gap-1.5 text-[12px] text-signal-ink tabular-nums">
            <span className="size-[6px] rounded-full bg-signal" />
            12:05
          </span>
        </div>
        <div className="flex flex-col gap-1 px-1 pb-1">
          {(["ember", "lagoon", "sage"] as const).map((colour, i) => (
            <div key={colour} className="relative aspect-[4/3] overflow-hidden rounded-[13px] bg-sunken">
              <Cam colour={colour} />
              {i === 0 && <span aria-hidden="true" className="absolute inset-0 rounded-[13px] ring-2 ring-signal ring-inset" />}
            </div>
          ))}
        </div>
      </div>

      {/* 2. The notes, the biggest thing, written while the call runs. */}
      <div
        className="animate-enter absolute top-[54px] left-0 w-[420px] rounded-[20px] bg-float p-5 shadow-float 3xl:w-[470px]"
        style={at(900)}
      >
        <div className="flex items-baseline justify-between">
          <p className="text-[17px] font-medium text-ink">Weekly product sync</p>
          <span className="font-mono text-[12px] text-ink-faint">Today</span>
        </div>

        <div className="mt-4 flex items-center gap-2.5 rounded-full bg-sunken px-3.5 py-2">
          {/* The one place anything spins: notes being written, right now. */}
          <span aria-hidden="true" className="size-3.5 shrink-0 animate-spin rounded-full border-2 border-understood border-t-transparent [animation-duration:1.1s]" />
          <span className="text-[14px] text-ink-soft">Writing the notes</span>
        </div>

        <p className="mt-4 font-mono text-[11px] tracking-[0.1em] text-ink-faint uppercase">Decisions</p>
        <p className="mt-2 text-[15px]/[1.5] text-ink">Test the second-meeting nudge for two weeks</p>

        <div className="mt-4 flex items-center gap-2.5 rounded-[12px] bg-sunken px-3.5 py-2.5">
          <Icon icon={CheckmarkCircle02Icon} className="size-[18px] shrink-0 text-action" />
          <span className="flex-1 text-[14px] text-ink">Draft the onboarding nudge</span>
          <span className="text-[13px] text-ink-faint">Arjun</span>
        </div>
      </div>

      {/* 3. The follow-up, last, in front of everything. */}
      <div
        className="animate-enter absolute bottom-0 left-[58px] w-[400px] rounded-[18px] bg-float p-4 shadow-float 3xl:w-[440px]"
        style={at(1320)}
      >
        <p className="text-[14px]/[1.5] text-ink-soft">
          <span className="font-medium text-ink">Priya</span> said &ldquo;Let&rsquo;s pick this up Thursday at two.&rdquo;
        </p>
        <div className="mt-3 flex items-center gap-3 rounded-[13px] bg-sunken px-3.5 py-3">
          <Icon icon={Calendar03Icon} className="size-[18px] shrink-0 text-ink-soft" />
          <span className="flex-1 text-[14px] text-ink">Thu, 2:00 &ndash; 2:30 pm</span>
          <span className="rounded-full bg-action px-4 py-1.5 text-[13px] font-medium text-action-foreground">Book</span>
        </div>
      </div>
    </div>
  );
}
