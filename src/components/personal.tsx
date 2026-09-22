"use client";

import { useEffect, useRef, useState } from "react";
import { personal } from "@/content/site";
import { Lines, SplitHeading } from "./lines";

type PromptState = "idle" | "running" | "done";

export function Personal() {
  return (
    <section className="personal wrap">
      <div className="section-heading">
        <SplitHeading lead={personal.title} muted={personal.titleMuted} />
        <p>
          <Lines text={personal.body} />
        </p>
      </div>
      <div className="personal-grid">
        <Teleprompter />
        <Customize />
      </div>
    </section>
  );
}

function Teleprompter() {
  const t = personal.teleprompter;
  const [state, setState] = useState<PromptState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  function toggle() {
    clearTimeout(timer.current);
    if (state === "running") {
      setState("idle");
      return;
    }
    setState("running");
    // Matches the 6s scroll transition on .script-lines.
    timer.current = setTimeout(() => setState("done"), 6500);
  }

  const label = {
    idle: <>Try teleprompter <span>▶</span></>,
    running: <>Pause preview <span>Ⅱ</span></>,
    done: <>Replay preview <span>↻</span></>,
  }[state];

  return (
    <article className={`teleprompter feature${state === "running" ? " running" : ""}`}>
      <div className="feature-top">
        <span>{t.label}</span>
        <button aria-pressed={state === "running"} onClick={toggle}>
          {label}
        </button>
      </div>
      <div className="script-window">
        <div className="script-lines">
          {t.lines.map((line, i) => (
            <p key={i} className={i === t.currentLine ? "current" : undefined}>
              <Lines text={line} />
            </p>
          ))}
        </div>
      </div>
      <h3>{t.title}</h3>
      <p>{t.body}</p>
    </article>
  );
}

function Customize() {
  const c = personal.customize;
  const [theme, setTheme] = useState(c.themes[0]);

  return (
    <article className="customize feature">
      <div className="feature-top">
        <span>{c.label}</span>
      </div>
      <div className="theme-preview" style={{ "--preview-accent": theme.color } as React.CSSProperties}>
        <span className="mini-brand">╱ Morse</span>
        <p>
          {c.greeting}
          <br />
          <strong>{c.name}</strong>
        </p>
        <span className="mini-button">{c.button}</span>
        <div className="swatches" role="group" aria-label="Preview accent colors">
          {c.themes.map((option) => (
            <button
              key={option.id}
              className={option.id}
              aria-label={option.label}
              aria-pressed={option.id === theme.id}
              onClick={() => setTheme(option)}
            />
          ))}
        </div>
      </div>
      <h3>{c.title}</h3>
      <p>{c.body}</p>
    </article>
  );
}
