"use client";

import { Fragment, useRef, useState } from "react";
import { workflow } from "@/content/site";
import { SplitHeading } from "./lines";

export function Workflow() {
  const [done, setDone] = useState(false);
  const finalRow = useRef<HTMLDivElement>(null);

  function showAction() {
    setDone(true);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    finalRow.current?.scrollIntoView({ block: "center", behavior: reduce ? "instant" : "smooth" });
  }

  return (
    <section className="workflow wrap">
      <div>
        <SplitHeading lead={workflow.title} muted={workflow.titleMuted} />
        <p>{workflow.body}</p>
        <button className="text-button underlined" onClick={showAction}>
          {workflow.demoLabel} <span>↗</span>
        </button>
      </div>
      <div className="action-stack">
        {workflow.steps.map((step) => (
          <Fragment key={step.label}>
            <div className="action-row">
              <span className="action-icon">{step.icon}</span>
              <div>
                <small>{step.label}</small>
                <p>
                  {step.text}
                  {step.tag && (
                    <>
                      {" "}
                      <span className="tag">{step.tag}</span>
                    </>
                  )}
                </p>
              </div>
            </div>
            <div className="connector">↓</div>
          </Fragment>
        ))}
        <div className="action-row final-action" ref={finalRow}>
          <span className="action-icon">{workflow.final.icon}</span>
          <div>
            <small>{workflow.final.label}</small>
            <p>{done ? workflow.final.done : workflow.final.idle}</p>
          </div>
          <button aria-label={done ? "Example action reviewed" : "Review example action"} onClick={showAction}>
            {done ? "✓" : "↗"}
          </button>
        </div>
        <p className="demo-caption">{workflow.caption}</p>
      </div>
    </section>
  );
}
