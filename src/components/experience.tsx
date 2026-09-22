"use client";

import { useRef, useState } from "react";
import { experience, type Stage } from "@/content/site";
import { Lines, SplitHeading } from "./lines";

export function Experience() {
  const [stage, setStage] = useState<Stage>(experience.defaultStage);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const count = experience.tabs.length;

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    let next: number;
    if (e.key === "ArrowDown") next = (i + 1) % count;
    else if (e.key === "ArrowUp") next = (i + count - 1) % count;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = count - 1;
    else return;
    e.preventDefault();
    setStage(experience.tabs[next].stage);
    tabs.current[next]?.focus();
  }

  return (
    <section className="experience wrap" id="experience">
      <div className="section-heading">
        <SplitHeading lead={experience.title} muted={experience.titleMuted} />
        <p>
          <Lines text={experience.body} />
        </p>
      </div>
      <div className="experience-layout">
        <div className="tour-tabs" role="tablist" aria-label="Explore the meeting workflow" aria-orientation="vertical">
          {experience.tabs.map((tab, i) => {
            const selected = tab.stage === stage;
            return (
              <button
                key={tab.stage}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`tab-${tab.stage}`}
                aria-controls="workflow-panel"
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                onClick={() => setStage(tab.stage)}
                onKeyDown={(e) => onKeyDown(e, i)}
              >
                <span className="step">{tab.step}</span>
                <span>
                  <strong>{tab.title}</strong>
                  <small>{tab.sub}</small>
                </span>
                <span className="tab-arrow">↗</span>
              </button>
            );
          })}
        </div>
        <div className="demo-panel" id="workflow-panel" role="tabpanel" tabIndex={0} aria-labelledby={`tab-${stage}`}>
          <StagePanel stage={stage} />
        </div>
      </div>
    </section>
  );
}

function StagePanel({ stage }: { stage: Stage }) {
  if (stage === "during") {
    const p = experience.panels.during;
    return (
      <>
        <div className="panel-top">
          <span>
            {p.top} <span className="tag">{p.topTag}</span>
          </span>
          <span className="live">{p.status}</span>
        </div>
        <h3>{p.title}</h3>
        <p className="panel-sub">{p.sub}</p>
        {p.transcript.map((line) => (
          <div className="transcript" key={line.name}>
            <span className="avatar">{line.initials}</span>
            <div>
              <strong>{line.name}</strong>
              <p>{line.text}</p>
            </div>
          </div>
        ))}
        <div className="panel-top" style={{ paddingBottom: 0, paddingTop: 10 }}>
          <span className="note-strip">{p.note}</span>
          <span className="wave" aria-hidden="true">
            {Array.from({ length: 13 }, (_, i) => (
              <i key={i} />
            ))}
          </span>
        </div>
      </>
    );
  }

  const p = experience.panels[stage];
  return (
    <>
      <div className="panel-top">
        <span>{p.top}</span>
        <span className="live">{p.status}</span>
      </div>
      <h3>{p.title}</h3>
      <p className="panel-sub">{p.sub}</p>
      {p.lines.map((line) => (
        <div className="panel-line" key={line.text}>
          {line.text}
          {"tag" in line && line.tag && (
            <>
              {" "}
              <span className="tag">{line.tag}</span>
            </>
          )}
        </div>
      ))}
      <p className="note-strip">{p.note}</p>
    </>
  );
}
