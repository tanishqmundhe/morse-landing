"use client";

import { useState } from "react";
import { calendar } from "@/content/site";
import { Lines } from "./lines";

const b = calendar.booking;
const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];

function daysInMonth() {
  return new Date(b.year, b.month + 1, 0).getDate();
}

/** Empty cells before day 1, for a Monday-first grid. */
function leadingBlanks() {
  return (new Date(b.year, b.month, 1).getDay() + 6) % 7;
}

function longDate(day: number) {
  return new Date(b.year, b.month, day).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function monthName() {
  return new Date(b.year, b.month, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export function Calendar() {
  const [day, setDay] = useState(b.firstOpenDay);
  const [time, setTime] = useState<string | null>(null);
  const month = monthName().split(" ")[0];

  return (
    <section className="calendar-section" id="calendar">
      <div className="wrap calendar-layout">
        <div className="section-copy">
          <p className="section-label">{calendar.label}</p>
          <h2>
            <Lines text={calendar.title} />
            <br />
            <span>{calendar.titleMuted}</span>
          </h2>
          <p>{calendar.body}</p>
          <p className="quiet">{calendar.quiet}</p>
        </div>
        <div className="booking">
          <div className="booking-person">
            <span className="avatar">M</span>
            <span>{b.host}</span>
            <small>{b.badge}</small>
          </div>
          <div className="booking-grid">
            <div>
              <h3>{b.title}</h3>
              <p>{b.meta}</p>
              <div className="month">
                <strong>{monthName()}</strong>
                <span>◷</span>
              </div>
              <div className="calendar-days" aria-label="Choose a demo date">
                {WEEKDAYS.map((d, i) => (
                  <span key={i}>{d}</span>
                ))}
                {Array.from({ length: leadingBlanks() }, (_, i) => (
                  <span key={`blank-${i}`} className="empty" />
                ))}
                {Array.from({ length: daysInMonth() }, (_, i) => i + 1).map((d) => (
                  <button
                    key={d}
                    disabled={d < b.firstOpenDay}
                    aria-label={`${month} ${d}, ${b.year}`}
                    aria-pressed={d === day}
                    onClick={() => {
                      setDay(d);
                      setTime(null);
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>
              <p className="timezone">{b.timezone}</p>
            </div>
            <div className="time-slots">
              <p>{longDate(day)}</p>
              {b.times.map((t) => (
                <button key={t} aria-pressed={t === time} onClick={() => setTime(t)}>
                  {t}
                </button>
              ))}
              <p className="booking-status" role="status">
                {time ? `Preview: ${month} ${day} at ${time} selected. No real meeting has been booked.` : b.idle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
