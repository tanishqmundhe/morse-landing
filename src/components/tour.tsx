"use client";

import { useRef, useState } from "react";
import { tour } from "@/content/site";

/** "Take a quick tour" link and the modal walkthrough it opens. */
export function TourButton({ label }: { label: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState(0);
  const last = tour.steps.length - 1;
  const current = tour.steps[step];

  function open() {
    setStep(0);
    dialog.current?.showModal();
  }

  function next() {
    if (step === last) {
      dialog.current?.close();
      document.querySelector("#experience")?.scrollIntoView();
      return;
    }
    setStep(step + 1);
  }

  function closeOnBackdrop(e: React.MouseEvent<HTMLDialogElement>) {
    const el = dialog.current;
    if (!el || e.target !== el) return;
    const r = el.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) el.close();
  }

  return (
    <>
      <button className="text-button" onClick={open}>
        <span className="play">▶</span> {label}
      </button>
      <dialog ref={dialog} aria-labelledby="dialog-title" onClick={closeOnBackdrop}>
        <button className="close" aria-label="Close tour" onClick={() => dialog.current?.close()}>
          ×
        </button>
        <p className="section-label">{tour.label}</p>
        <h2 id="dialog-title">{current.title}</h2>
        <p>{current.body}</p>
        <div className="dialog-progress" aria-label="Tour progress">
          {tour.steps.map((_, i) => (
            <span
              key={i}
              className={i === step ? "active" : undefined}
              aria-label={`Step ${i + 1}${i === step ? ", current" : ""}`}
            />
          ))}
        </div>
        <div className="dialog-controls">
          <button className="text-button" disabled={step === 0} onClick={() => setStep(step - 1)}>
            Back
          </button>
          <button className="button primary" onClick={next}>
            {step === last ? (
              <>
                Explore the page <span>↗</span>
              </>
            ) : (
              <>
                Next <span>→</span>
              </>
            )}
          </button>
        </div>
      </dialog>
    </>
  );
}
