"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { PageBody } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { AssignSupervisorModal } from "@/components/admin/AssignSupervisorModal";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SearchInput } from "@/components/ui/Form";
import { Icon } from "@/components/ui/Icon";
import { ProgressBar } from "@/components/ui/Progress";
import { Segmented } from "@/components/ui/Segmented";
import { StatusChip, type Status } from "@/components/ui/StatusChip";
import { Cell, Pagination, TableHead } from "@/components/ui/Table";

type Row = {
  title: string;
  meta: string;
  student: { name: string; initials: string };
  supervisor?: { name: string; initials: string };
  progress: number;
  status: Status;
};

const IS = { name: "Dr. Imran Shah", initials: "IS" };

const rows: Row[] = [
  { title: "Urdu Sentiment Analysis on Social Media", meta: "NLP · created 19 Nov", student: { name: "Ayesha Khan", initials: "AK" }, progress: 0, status: "Waiting for Supervisor" },
  { title: "Solar Power Forecasting with LSTMs", meta: "Data Science · created 18 Nov", student: { name: "Nida Farooq", initials: "NF" }, progress: 0, status: "Waiting for Supervisor" },
  { title: "Crop Yield Prediction using ML", meta: "Machine Learning · 2 Sep", student: { name: "Ayesha Khan", initials: "AK" }, supervisor: IS, progress: 50, status: "In Progress" },
  { title: "Smart Irrigation with IoT Sensors", meta: "Internet of Things · 5 Sep", student: { name: "Bilal Ahmed", initials: "BA" }, supervisor: IS, progress: 75, status: "In Progress" },
  { title: "Medical Image Segmentation with U-Net", meta: "Computer Vision · 9 Sep", student: { name: "Hira Siddiqui", initials: "HS" }, supervisor: IS, progress: 25, status: "Overdue" },
  { title: "Fake News Detection in Urdu Media", meta: "NLP · 14 Feb", student: { name: "Usman Tariq", initials: "UT" }, supervisor: IS, progress: 100, status: "Completed" },
  { title: "Blockchain-based Degree Verification", meta: "Blockchain · 10 Jan", student: { name: "Ayesha Khan", initials: "AK" }, supervisor: { name: "Dr. Farah Naz", initials: "FN" }, progress: 100, status: "Published" },
];

type Tab = "all" | "waiting" | "progress" | "published";
const match: Record<Tab, (r: Row) => boolean> = {
  all: () => true,
  waiting: (r) => r.status === "Waiting for Supervisor",
  progress: (r) => ["In Progress", "Overdue", "Completed"].includes(r.status),
  published: (r) => r.status === "Published",
};

function Person({ name, initials }: { name: string; initials: string }) {
  return (
    <span className="flex items-center gap-[10px]">
      <Avatar initials={initials} />
      <span className="text-[13.5px] leading-normal font-semibold whitespace-nowrap text-ink">{name}</span>
    </span>
  );
}

export function ProjectsView() {
  const params = useSearchParams();
  const [tab, setTab] = useState<Tab>("all");
  const [q, setQ] = useState("");
  const [assign, setAssign] = useState<string | null>(params.get("assign") ? rows[0].title : null);

  const list = rows.filter((r) => match[tab](r) && `${r.title} ${r.student.name}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <TopBar role="admin" title="Projects" subtitle="128 research projects across all departments" />
      <PageBody className="pt-[8px] pb-[48px]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Segmented
            value={tab}
            onChange={setTab}
            tabClassName="flex-none px-[14px]"
            options={[
              { value: "all", label: "All 128" },
              { value: "waiting", label: "Waiting for supervisor 7" },
              { value: "progress", label: "In progress 96" },
              { value: "published", label: "Published 25" },
            ]}
          />
          <div className="flex items-center gap-[12px]">
            <SearchInput value={q} onChange={setQ} placeholder="Search projects" width={240} />
            <button type="button" className="neu-inset flex h-[44px] items-center gap-[10px] rounded-[14px] border border-field px-[16px] text-[13.5px] font-medium text-ink">
              <Icon name="filter" className="text-muted" />
              Filters
            </button>
            <Button variant="secondary" icon="download">
              Export
            </Button>
          </div>
        </div>

        <Card className="flex flex-col p-[24px]">
          <TableHead
            cols={[
              { label: "PROJECT" },
              { label: "STUDENT", w: 170 },
              { label: "SUPERVISOR", w: 184 },
              { label: "PROGRESS", w: 120 },
              { label: "STATUS", w: 170 },
              { label: "", w: 64 },
            ]}
          />
          {list.map((r) => (
            <div key={r.title} className="flex items-center gap-[16px] border-b border-line px-[16px] py-[14px]">
              <Cell className="flex-col items-start gap-[2px] leading-normal">
                <span className="text-[13.5px] font-semibold text-ink">{r.title}</span>
                <span className="text-[12px] text-muted">{r.meta}</span>
              </Cell>
              <Cell w={170}>
                <Person {...r.student} />
              </Cell>
              <Cell w={184}>
                {r.supervisor ? (
                  <Person {...r.supervisor} />
                ) : (
                  <button
                    type="button"
                    onClick={() => setAssign(r.title)}
                    className="flex items-center gap-[6px] rounded-[12px] bg-peach-100 px-[12px] py-[8px] text-[12.5px] leading-normal font-semibold whitespace-nowrap text-peach-700 shadow-neu-sm transition hover:brightness-[0.98]"
                  >
                    <Icon name="userCheck" />
                    Assign supervisor
                  </button>
                )}
              </Cell>
              <Cell w={120} className="gap-[8px]">
                <ProgressBar value={r.progress} className="flex-1" />
                <span className="text-[12px] leading-normal font-semibold text-ink">{r.progress}%</span>
              </Cell>
              <Cell w={170}>
                <StatusChip status={r.status} />
              </Cell>
              <Cell w={64} className="gap-[12px] text-muted">
                <button type="button" aria-label="Edit" className="hover:text-teal-700">
                  <Icon name="edit" />
                </button>
                <button type="button" aria-label="More" className="hover:text-teal-700">
                  <Icon name="more" />
                </button>
              </Cell>
            </div>
          ))}
          <Pagination summary="Showing 1–7 of 128 projects" page={1} labels={["1", "2", "3", "…", "19"]} />
        </Card>
      </PageBody>
      <AssignSupervisorModal open={!!assign} project={assign ?? ""} onClose={() => setAssign(null)} />
    </>
  );
}
