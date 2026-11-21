"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { AreaTag } from "@/components/public/ProjectCard";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Form";
import { Icon } from "@/components/ui/Icon";
import { Modal, ModalHeader } from "@/components/ui/Modal";
import { StatusChip } from "@/components/ui/StatusChip";

export const supervisors = [
  { id: "fn", initials: "FN", name: "Dr. Farah Naz", dept: "Computer Science", load: 3, tags: ["NLP", "Blockchain"] },
  { id: "is", initials: "IS", name: "Dr. Imran Shah", dept: "Computer Science", load: 6, tags: ["Machine Learning", "NLP"] },
  { id: "ky", initials: "KY", name: "Dr. Kamran Yousaf", dept: "Software Engineering", load: 4, tags: ["Data Science"] },
];

/* Figma: A-03 Assign Supervisor (modal) */
export function AssignSupervisorModal({
  open,
  onClose,
  project = "Urdu Sentiment Analysis on Social Media",
}: {
  open: boolean;
  onClose: () => void;
  project?: string;
}) {
  const [selected, setSelected] = useState("fn");
  const [q, setQ] = useState("");
  const list = supervisors.filter((s) => `${s.name} ${s.dept} ${s.tags.join(" ")}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <Modal open={open} onClose={onClose} width={620} className="gap-[20px]">
      <ModalHeader icon="userCheck" title="Assign a supervisor" subtitle="Pick one supervisor for this project" onClose={onClose} />

      <div className="neu-inset flex flex-col gap-[8px] rounded-[18px] p-[18px]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="font-display text-[17px] leading-normal font-semibold text-teal-900">{project || "Urdu Sentiment Analysis on Social Media"}</span>
          <StatusChip status="Waiting for Supervisor" />
        </div>
        <span className="text-[13px] leading-normal text-muted">Ayesha Khan · Natural Language Processing · created 19 Nov 2026</span>
      </div>

      <label className="neu-inset flex h-[46px] items-center gap-[10px] rounded-[14px] border border-field px-[16px] focus-within:border-2 focus-within:border-focus focus-within:px-[15px]">
        <Icon name="search" className="shrink-0 text-muted" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search supervisors by name or expertise"
          className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-ink outline-none"
        />
      </label>

      <div className="flex flex-col gap-[12px]" role="radiogroup">
        {list.map((s) => {
          const on = selected === s.id;
          return (
            <button
              key={s.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setSelected(s.id)}
              className={cn(
                "flex w-full items-center gap-[14px] rounded-[18px] px-[16px] py-[14px] text-left transition",
                on ? "neu-inset" : "bg-ice shadow-neu-sm hover:bg-teal-50/40",
              )}
            >
              <span
                className={cn(
                  "flex size-[22px] shrink-0 items-center justify-center rounded-full",
                  on ? "bg-ice shadow-neu-sm" : "neu-inset border-[1.5px] border-field",
                )}
              >
                {on && <span className="size-[12px] rounded-full bg-teal-700" />}
              </span>
              <Avatar initials={s.initials} size="md" />
              <span className="flex min-w-0 flex-1 flex-col gap-[4px] leading-normal whitespace-nowrap">
                <span className="text-[14.5px] font-semibold text-ink">{s.name}</span>
                <span className="text-[12.5px] text-muted">
                  {s.dept} · currently {s.load} projects
                </span>
              </span>
              <span className="hidden gap-[6px] sm:flex">
                {s.tags.map((t) => (
                  <AreaTag key={t}>{t}</AreaTag>
                ))}
              </span>
            </button>
          );
        })}
        {list.length === 0 && <p className="py-4 text-center text-[13.5px] text-muted">No supervisors match “{q}”.</p>}
      </div>

      <Checkbox label="Email the student and supervisor about this assignment" defaultChecked />

      <div className="neu-inset flex items-start gap-[10px] rounded-[14px] p-[14px]">
        <Icon name="alert" className="shrink-0 text-teal-700" />
        <p className="flex-1 text-[12.5px] leading-[18px] text-teal-700">
          Supervisors are assigned per project. Ayesha’s other projects keep their current supervisors.
        </p>
      </div>

      <div className="flex justify-end gap-[12px]">
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button icon="userCheck" onClick={onClose}>
          Assign supervisor
        </Button>
      </div>
    </Modal>
  );
}
