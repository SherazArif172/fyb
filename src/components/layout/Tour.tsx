"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export type TourStep = { target: string; title: string; body: string };

export const studentTour: TourStep[] = [
  { target: "nav", title: "Find your way around", body: "Use the menu to jump between your dashboard, projects, notifications and settings." },
  {
    target: "stats",
    title: "Track your progress",
    body: "These cards show your active projects, completed milestones, work waiting for your supervisor and your next deadline at a glance.",
  },
  { target: "current", title: "Your current project", body: "See where your thesis stands, what is next and jump straight into the workspace." },
  { target: "deadlines", title: "Never miss a deadline", body: "Upcoming milestone due dates across all of your projects, soonest first." },
  { target: "feedback", title: "Read supervisor feedback", body: "The latest comments from your supervisor, with the milestone and version they refer to." },
];

/** Fire from anywhere (e.g. the user menu) to start the tour */
export const startTour = () => window.dispatchEvent(new Event("rpm:tour"));

type Rect = { top: number; left: number; width: number; height: number };

export function Tour({ steps }: { steps: TourStep[] }) {
  const params = useSearchParams();
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(1);
  const [rect, setRect] = useState<Rect | null>(null);

  useEffect(() => {
    if (params.get("tour")) {
      setI(Number(params.get("step") ?? 2) - 1);
      setOpen(true);
    }
    const onStart = () => {
      setI(0);
      setOpen(true);
    };
    window.addEventListener("rpm:tour", onStart);
    return () => window.removeEventListener("rpm:tour", onStart);
  }, [params]);

  const measure = useCallback(() => {
    const el = document.querySelector<HTMLElement>(`[data-tour="${steps[i]?.target}"]`);
    if (!el) return setRect(null);
    const r = el.getBoundingClientRect();
    // target not on screen (e.g. the sidebar is collapsed on mobile) -> skip this step
    if (r.width === 0 || r.right <= 0) {
      if (i < steps.length - 1) setI(i + 1);
      else setOpen(false);
      return;
    }
    setRect({ top: r.top + window.scrollY, left: r.left + window.scrollX, width: r.width, height: r.height });
  }, [i, steps]);

  useLayoutEffect(() => {
    if (!open) return;
    const el = document.querySelector<HTMLElement>(`[data-tour="${steps[i]?.target}"]`);
    el?.scrollIntoView({ block: "center", behavior: "smooth" });
    measure();
    const t = setTimeout(measure, 350);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [open, i, measure, steps]);

  if (!open || !rect) return null;
  const step = steps[i];
  const pad = 16;
  const vw = document.documentElement.clientWidth;
  const ringLeft = Math.max(4, rect.left - pad);
  const ring = { top: rect.top - pad, left: ringLeft, width: Math.min(rect.width + pad * 2, vw - ringLeft - 4), height: rect.height + pad * 2 };
  const tipW = Math.min(380, vw - 24);
  const tipLeft = Math.max(12, Math.min(ring.left + 40, vw - tipW - 12));
  const arrowLeft = Math.max(20, Math.min(ring.left + 60 - tipLeft, tipW - 40));
  const close = () => setOpen(false);

  return (
    <div className="absolute inset-0 z-[60]" style={{ height: document.documentElement.scrollHeight }}>
      {/* Spotlight: dims everything except the target */}
      <div
        className="absolute rounded-[28px] outline-2 outline-offset-0 outline-peach-500 transition-all duration-300"
        style={{
          ...ring,
          outlineStyle: "dashed",
          boxShadow: "0 0 0 9999px var(--scrim), 0 0 24px 4px var(--shadow-highlight)",
        }}
      />
      {/* Tooltip */}
      <div className="absolute transition-all duration-300" style={{ top: ring.top + ring.height + 24, left: tipLeft, width: tipW }}>
        <span className="absolute -top-[9px] size-[18px] rotate-45 rounded-[3px] bg-ice" style={{ left: arrowLeft }} />
        <div className="relative flex flex-col gap-[14px] rounded-[24px] bg-ice p-[20px] shadow-neu-lg sm:p-[24px]">
          <div className="flex items-center justify-between">
            <p className="text-[11px] leading-normal font-semibold tracking-[0.88px] text-peach-700">
              STEP {i + 1} OF {steps.length}
            </p>
            <button type="button" aria-label="Close tour" onClick={close} className="text-muted hover:text-ink">
              <Icon name="x" />
            </button>
          </div>
          <h3 className="font-display text-[22px] leading-normal font-semibold text-teal-900">{step.title}</h3>
          <p className="text-[14px] leading-[21px] text-muted">{step.body}</p>
          <div className="flex flex-wrap items-center justify-between gap-y-3">
            <div className="flex items-center gap-[6px]">
              {steps.map((_, d) => (
                <span key={d} className={cn("h-[8px] rounded-[4px] transition-all", d === i ? "w-[20px] bg-teal-700" : "w-[8px] bg-line")} />
              ))}
            </div>
            <div className="flex items-center gap-[8px]">
              <Button variant="ghost" onClick={close}>
                Skip
              </Button>
              {i > 0 && (
                <Button variant="secondary" onClick={() => setI(i - 1)}>
                  Back
                </Button>
              )}
              <Button onClick={() => (i < steps.length - 1 ? setI(i + 1) : close())}>{i < steps.length - 1 ? "Next" : "Done"}</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
