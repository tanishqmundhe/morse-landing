"use client";

import { useState, useSyncExternalStore } from "react";
import { ArrowLeft01Icon, ArrowRight01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { booking } from "@/content/site";
import { CARD, Eyebrow, H2, Heading, Icon, WRAP } from "./ui";

const d = booking.demo;
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Today and the visitor's zone are only known in the browser. The server
// renders the card empty rather than a date that is wrong by the time it's read.
const noop = () => () => {};
function useToday() {
  return useSyncExternalStore(
    noop,
    () => new Date().toDateString(),
    () => null,
  );
}

function zoneName() {
  const part = new Intl.DateTimeFormat("en-US", { timeZoneName: "long" })
    .formatToParts(new Date())
    .find((p) => p.type === "timeZoneName");
  return part?.value ?? Intl.DateTimeFormat().resolvedOptions().timeZone;
}

/** Weekdays after today are open, as a host's usual hours would leave them. */
function isOpen(date: Date, today: Date) {
  const day = date.getDay();
  return date > today && day !== 0 && day !== 6;
}

export function Booking() {
  return (
    <section id="booking" className="scroll-mt-6 bg-sunken py-20 lg:py-28">
      <div className={`${WRAP} grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16`}>
        <div>
          <Eyebrow className="mb-5">{booking.eyebrow}</Eyebrow>
          <Heading lead={booking.title} muted={booking.titleMuted} className={H2} />
          <p className="mt-6 max-w-md text-[18px]/[1.55] text-ink-soft">{booking.body}</p>
          <ul className="mt-7 flex flex-col gap-2.5 text-[17px] text-ink">
            {booking.points.map((p) => (
              <li key={p} className="flex items-center gap-3">
                <Icon icon={Tick02Icon} className="size-[18px] text-ink-faint" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <BookingCard />
      </div>
    </section>
  );
}

function BookingCard() {
  const todayKey = useToday();
  return (
    <div className={`${CARD} min-h-[480px] overflow-hidden`}>
      <div className="flex items-center gap-4 border-b border-hairline px-6 py-5">
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-overlay text-[17px] text-ink">
          {d.host
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[19px]/[1.3] font-medium text-ink">{d.type}</p>
          <p className="text-[16px] text-ink-soft tabular-nums">
            {d.host} · {d.minutes} min
          </p>
        </div>
      </div>
      {todayKey ? <Picker today={new Date(todayKey)} /> : null}
    </div>
  );
}

function Picker({ today }: { today: Date }) {
  const [offset, setOffset] = useState(0);
  const [day, setDay] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);

  const first = new Date(today.getFullYear(), today.getMonth() + offset, 1);
  const days = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  const blanks = (first.getDay() + 6) % 7;
  const monthLabel = first.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  function pick(date: Date) {
    setDay(date);
    setTime(null);
  }

  return (
    <div className="grid gap-6 px-6 py-5 sm:grid-cols-[1.25fr_1fr]">
      <div>
        <div className="flex items-center justify-between">
          <p className="text-[17px] text-ink">{monthLabel}</p>
          <div className="flex gap-1">
            <MonthButton label="Previous month" disabled={offset === 0} onClick={() => setOffset(0)} icon={ArrowLeft01Icon} />
            <MonthButton label="Next month" disabled={offset === 1} onClick={() => setOffset(1)} icon={ArrowRight01Icon} />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-7 gap-1 text-center" role="group" aria-label={`Days in ${monthLabel}`}>
          {WEEKDAYS.map((w) => (
            <span key={w} className="pb-1 text-[13px] text-ink-faint">
              {w.slice(0, 2)}
            </span>
          ))}
          {Array.from({ length: blanks }, (_, i) => (
            <span key={`b${i}`} />
          ))}
          {Array.from({ length: days }, (_, i) => {
            const date = new Date(first.getFullYear(), first.getMonth(), i + 1);
            const open = isOpen(date, today);
            const chosen = day?.toDateString() === date.toDateString();
            return (
              <button
                key={i}
                disabled={!open}
                aria-pressed={chosen}
                aria-label={date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                onClick={() => pick(date)}
                className={`mx-auto grid aspect-square w-full max-w-10 place-items-center rounded-full text-[16px] tabular-nums transition-colors ${
                  chosen
                    ? "bg-action text-action-foreground"
                    : open
                      ? "bg-overlay/60 text-ink hover:bg-overlay-hover"
                      : "text-ink-faint/50"
                }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col sm:border-l sm:border-hairline sm:pl-6">
        <p className="text-[17px] text-ink">
          {day ? day.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }) : d.pickDay}
        </p>
        {day ? (
          <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-1">
            {d.times.map((t) => (
              <li key={t}>
                <button
                  aria-pressed={t === time}
                  onClick={() => setTime(t)}
                  className={`h-11 w-full rounded-full text-[16px] tabular-nums transition-colors ${
                    t === time ? "bg-action text-action-foreground" : "bg-overlay text-ink hover:bg-overlay-hover"
                  }`}
                >
                  {t}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-[16px]/[1.5] text-ink-faint">Open days are the ones you can press.</p>
        )}
        <p role="status" className="mt-auto pt-5 text-[15px]/[1.45] text-ink-faint">
          {time && day ? `${time} chosen. ${d.note}` : `Times in ${zoneName()}.`}
        </p>
      </div>
    </div>
  );
}

function MonthButton({
  label,
  disabled,
  onClick,
  icon,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  icon: typeof ArrowLeft01Icon;
}) {
  return (
    <button
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-9 place-items-center rounded-full text-ink-soft transition-colors hover:bg-overlay disabled:opacity-30 disabled:hover:bg-transparent"
    >
      <Icon icon={icon} className="size-[18px]" />
    </button>
  );
}
