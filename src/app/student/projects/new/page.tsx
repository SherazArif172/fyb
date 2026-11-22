"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PageBody } from "@/components/layout/AppShell";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { TopBar } from "@/components/layout/TopBar";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card, Divider } from "@/components/ui/Card";
import { fieldClasses } from "@/components/ui/Form";
import { Icon, type IconName } from "@/components/ui/Icon";
import { researchAreas } from "@/lib/data";
import { cn } from "@/lib/cn";

function Label({ children }: { children: React.ReactNode }) {
  return <span className="text-[14px] leading-normal font-medium text-ink">{children}</span>;
}

function Field({ icon, className, children }: { icon?: IconName; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn(fieldClasses(), "h-[48px] px-[16px] focus-within:px-[15px]", className)}>
      {icon && <Icon name={icon} className="shrink-0 text-muted" />}
      {children}
    </div>
  );
}

const inputCls = "h-full min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none";

const nextSteps = [
  { title: "Project is created", body: "It appears in My projects as Waiting for Supervisor." },
  { title: "Admin assigns a supervisor", body: "You and your supervisor both get an email." },
  { title: "Start uploading", body: "Upload drafts to each milestone and get feedback." },
];

export default function NewProjectPage() {
  const router = useRouter();
  const [title, setTitle] = useState("Crop Yield Prediction using Machine Learning");
  const [desc, setDesc] = useState(
    "Predicting wheat yield in Punjab districts using weather, soil and satellite data, and comparing ensemble models against a regression baseline.",
  );
  const [keywords, setKeywords] = useState(["machine learning", "agriculture", "random forest", "remote sensing"]);
  const [kw, setKw] = useState("");
  const [milestones, setMilestones] = useState([
    { name: "Proposal", due: "2026-12-15" },
    { name: "Literature Review", due: "2027-01-30" },
    { name: "Implementation", due: "2027-04-15" },
    { name: "Final Report", due: "2027-05-30" },
  ]);

  return (
    <>
      <TopBar
        role="student"
        title="New project"
        subtitle={<Breadcrumb items={[{ label: "My projects", href: "/student/projects" }, { label: "New project" }]} />}
      />
      <PageBody className="pt-[8px] pb-[48px]">
        <div className="flex flex-col gap-[28px] xl:flex-row xl:items-start">
          <Card className="flex min-w-0 flex-1 flex-col gap-[24px] p-[20px] sm:p-[32px]">
            <h2 className="text-[17px] leading-normal font-semibold text-teal-900">Project details</h2>

            <label className="flex flex-col gap-[8px]">
              <Label>Project title</Label>
              <Field icon="file">
                <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} autoFocus />
              </Field>
            </label>

            <label className="flex flex-col gap-[8px]">
              <Label>Short description</Label>
              <div className="neu-inset flex flex-col gap-[8px] rounded-[14px] border border-field p-[16px] focus-within:border-2 focus-within:border-focus focus-within:p-[15px]">
                <textarea
                  value={desc}
                  maxLength={300}
                  rows={2}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full resize-none bg-transparent text-[14.5px] leading-[22px] text-ink outline-none"
                />
                <span className="text-right text-[12px] leading-normal text-placeholder">{desc.length} / 300</span>
              </div>
            </label>

            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2">
              <label className="flex flex-col gap-[8px]">
                <Label>Research area</Label>
                <Field icon="layers" className="relative">
                  <select className={cn(inputCls, "appearance-none pr-[28px]")} defaultValue="Machine Learning">
                    {researchAreas.map((a) => (
                      <option key={a.name}>{a.name}</option>
                    ))}
                  </select>
                  <Icon name="chevronDown" className="pointer-events-none absolute right-[16px] text-muted" />
                </Field>
              </label>
              <label className="flex flex-col gap-[8px]">
                <Label>Academic year</Label>
                <Field icon="calendar">
                  <input defaultValue="2026 – 2027" className={inputCls} />
                </Field>
              </label>
            </div>

            <div className="flex flex-col gap-[8px]">
              <Label>Keywords</Label>
              <div className="neu-inset flex flex-wrap items-center gap-[8px] rounded-[14px] border border-field px-[12px] py-[10px] focus-within:border-2 focus-within:border-focus focus-within:px-[11px] focus-within:py-[9px]">
                {keywords.map((k) => (
                  <span key={k} className="flex items-center gap-[6px] rounded-full bg-ice px-[12px] py-[6px] text-[13px] leading-normal font-medium text-teal-700 shadow-neu-sm">
                    {k}
                    <button type="button" aria-label={`Remove ${k}`} onClick={() => setKeywords(keywords.filter((x) => x !== k))}>
                      <Icon name="x" size={14} />
                    </button>
                  </span>
                ))}
                <input
                  value={kw}
                  onChange={(e) => setKw(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && kw.trim()) {
                      e.preventDefault();
                      if (!keywords.includes(kw.trim())) setKeywords([...keywords, kw.trim()]);
                      setKw("");
                    }
                  }}
                  placeholder="Add a keyword and press Enter"
                  className="min-w-[200px] flex-1 bg-transparent py-[4px] text-[14px] text-ink outline-none"
                />
              </div>
            </div>

            <Divider />

            <div className="flex flex-col gap-[2px] leading-normal">
              <h2 className="text-[17px] font-semibold text-teal-900">Milestones</h2>
              <p className="text-[13px] text-muted">Start with the default steps. You can change them later.</p>
            </div>

            <div className="flex flex-col gap-[12px]">
              {milestones.map((m, i) => (
                <div key={i} className="flex items-center gap-[8px] sm:gap-[12px]">
                  <Icon name="grip" className="hidden shrink-0 cursor-grab text-muted sm:block" />
                  <div className={cn(fieldClasses(), "h-[46px] min-w-0 flex-1 px-[12px] focus-within:px-[11px] sm:px-[16px] sm:focus-within:px-[15px]")}>
                    <input
                      value={m.name}
                      placeholder="Milestone name"
                      onChange={(e) => setMilestones(milestones.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))}
                      className="h-full min-w-0 flex-1 bg-transparent text-[14.5px] text-ink outline-none"
                    />
                  </div>
                  <div className={cn(fieldClasses(), "h-[46px] w-[148px] shrink-0 px-[10px] focus-within:px-[9px] sm:w-[190px] sm:px-[16px] sm:focus-within:px-[15px]")}>
                    <Icon name="calendar" className="hidden shrink-0 text-muted sm:block" />
                    <input
                      type="date"
                      value={m.due}
                      onChange={(e) => setMilestones(milestones.map((x, j) => (j === i ? { ...x, due: e.target.value } : x)))}
                      className="h-full min-w-0 flex-1 bg-transparent text-[14.5px] text-ink outline-none [&::-webkit-calendar-picker-indicator]:hidden"
                    />
                  </div>
                  <button
                    type="button"
                    aria-label="Delete milestone"
                    onClick={() => setMilestones(milestones.filter((_, j) => j !== i))}
                    className="shrink-0 text-muted hover:text-danger"
                  >
                    <Icon name="trash" />
                  </button>
                </div>
              ))}
            </div>
            <Button variant="ghost" icon="plus" className="self-start" onClick={() => setMilestones([...milestones, { name: "", due: "" }])}>
              Add milestone
            </Button>

            <Divider />

            <div className="flex justify-end gap-[12px]">
              <ButtonLink href="/student/projects" variant="ghost">
                Cancel
              </ButtonLink>
              <Button icon="check" onClick={() => router.push("/student/projects")}>
                Create project
              </Button>
            </div>
          </Card>

          <Card className="flex w-full shrink-0 flex-col gap-[20px] p-[20px] sm:p-[28px] xl:w-[340px]">
            <h2 className="font-display text-[20px] leading-normal font-semibold text-teal-900">What happens next</h2>
            {nextSteps.map((s, i) => (
              <div key={s.title} className="flex items-start gap-[14px]">
                <span className="font-display flex size-[36px] shrink-0 items-center justify-center rounded-[12px] bg-ice text-[16px] font-semibold text-peach-700 shadow-neu-sm">
                  {i + 1}
                </span>
                <div className="flex flex-col gap-[3px]">
                  <span className="text-[14px] leading-normal font-semibold text-ink">{s.title}</span>
                  <span className="max-w-[220px] text-[13px] leading-[19px] text-muted">{s.body}</span>
                </div>
              </div>
            ))}
            <div className="neu-inset flex items-start gap-[10px] rounded-[14px] p-[14px]">
              <Icon name="alert" className="shrink-0 text-peach-700" />
              <p className="text-[13px] leading-[19px] text-peach-700">
                Each project gets its own supervisor, so different projects can have different supervisors.
              </p>
            </div>
          </Card>
        </div>
      </PageBody>
    </>
  );
}
