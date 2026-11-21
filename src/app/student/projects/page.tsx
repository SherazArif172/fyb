"use client";

import Link from "next/link";
import { useState } from "react";
import { PageBody } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { AreaTag } from "@/components/public/ProjectCard";
import { Avatar } from "@/components/ui/Avatar";
import { ButtonLink } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { ProgressBar } from "@/components/ui/Progress";
import { Segmented } from "@/components/ui/Segmented";
import { StatusChip } from "@/components/ui/StatusChip";
import { studentProjects, type StudentProject } from "@/lib/student";

type Tab = "all" | "progress" | "waiting" | "published";

const match: Record<Tab, (p: StudentProject) => boolean> = {
  all: () => true,
  progress: (p) => p.status === "In Progress",
  waiting: (p) => p.status === "Waiting for Supervisor",
  published: (p) => p.status === "Published",
};

function ProjectTile({ p }: { p: StudentProject }) {
  return (
    <Link
      href={`/student/projects/${p.id}`}
      className="flex flex-col items-start gap-[16px] rounded-[24px] bg-ice p-[24px] shadow-neu transition-transform hover:-translate-y-0.5"
    >
      <div className="flex w-full items-center justify-between">
        <AreaTag>{p.area}</AreaTag>
        <span role="button" aria-label="More actions" className="text-muted hover:text-ink" onClick={(e) => e.preventDefault()}>
          <Icon name="more" />
        </span>
      </div>
      <h3 className="font-display text-[19px] leading-[25px] font-semibold text-teal-900">{p.title}</h3>
      <p className="text-[13.5px] leading-[20px] text-muted">{p.summary}</p>
      {p.supervisor ? (
        <div className="flex items-center gap-[10px]">
          <Avatar initials={p.supervisor.initials} />
          <div className="flex flex-col leading-normal whitespace-nowrap">
            <span className="text-[13px] font-semibold text-ink">{p.supervisor.name}</span>
            <span className="text-[11.5px] text-muted">Supervisor</span>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-[10px]">
          <span className="flex size-[32px] items-center justify-center rounded-[10.24px] bg-ice text-peach-700 shadow-neu-sm">
            <Icon name="clock" />
          </span>
          <span className="text-[13px] leading-normal text-muted italic">Not assigned yet</span>
        </div>
      )}
      <div className="flex w-full items-center gap-[10px]">
        <ProgressBar value={p.progress} className="flex-1" />
        <span className="text-[12.5px] leading-normal font-semibold text-teal-900">{p.progress}%</span>
      </div>
      <Divider />
      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex flex-col gap-[2px] leading-normal whitespace-nowrap">
          <span className="text-[12.5px] font-semibold text-ink">{p.milestones}</span>
          <span className="text-[12px] text-muted">{p.updated}</span>
        </div>
        <StatusChip status={p.status} />
      </div>
    </Link>
  );
}

export default function MyProjectsPage() {
  const [tab, setTab] = useState<Tab>("all");
  const [q, setQ] = useState("");
  const count = (t: Tab) => studentProjects.filter(match[t]).length;
  const list = studentProjects.filter((p) => match[tab](p) && p.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <TopBar role="student" title="My projects" subtitle="Create and manage your research projects" />
      <PageBody className="pt-[8px] pb-[48px]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Segmented
            value={tab}
            onChange={setTab}
            tabClassName="flex-none px-[14px]"
            options={[
              { value: "all", label: `All ${count("all")}` },
              { value: "progress", label: `In progress ${count("progress")}` },
              { value: "waiting", label: `Waiting for supervisor ${count("waiting")}` },
              { value: "published", label: `Published ${count("published")}` },
            ]}
          />
          <div className="flex items-center gap-[14px]">
            <label className="neu-inset flex h-[44px] w-[240px] items-center gap-[10px] rounded-[14px] border border-field px-[16px] focus-within:border-2 focus-within:border-focus focus-within:px-[15px]">
              <Icon name="search" className="shrink-0 text-muted" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search my projects"
                className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-ink outline-none"
              />
            </label>
            <ButtonLink href="/student/projects/new" icon="plus">
              New project
            </ButtonLink>
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-[28px] md:grid-cols-2 xl:grid-cols-3">
          {list.map((p) => (
            <ProjectTile key={p.id} p={p} />
          ))}
          <Link
            href="/student/projects/new"
            className="neu-inset flex h-[300px] flex-col items-center justify-center gap-[12px] rounded-[24px] border-[1.5px] border-dashed border-teal-200 p-[24px] text-center transition hover:border-teal-500"
          >
            <span className="flex size-[56px] items-center justify-center rounded-[17.92px] bg-ice text-teal-700 shadow-neu-sm">
              <Icon name="plus" />
            </span>
            <span className="text-[15.5px] leading-normal font-semibold text-teal-900">Create a new project</span>
            <span className="w-[240px] text-[13px] leading-[19px] text-muted">
              Add a title and milestones. The admin will assign a supervisor.
            </span>
          </Link>
        </div>
      </PageBody>
    </>
  );
}
