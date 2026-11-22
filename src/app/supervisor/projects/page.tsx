"use client";

import { useState } from "react";
import { PageBody } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { Avatar } from "@/components/ui/Avatar";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FilterSelect, SearchInput } from "@/components/ui/Form";
import { Icon } from "@/components/ui/Icon";
import { ProgressBar } from "@/components/ui/Progress";
import { StatusChip, type Status } from "@/components/ui/StatusChip";
import { Cell, Row, Pagination, TableHead, TableScroll } from "@/components/ui/Table";
import { cn } from "@/lib/cn";

const rows: {
  initials: string;
  name: string;
  id: string;
  project: string;
  area: string;
  progress: number;
  next: string;
  due: string;
  late?: boolean;
  status: Status;
}[] = [
  { initials: "AK", name: "Ayesha Khan", id: "MSCS-2025-041", project: "Crop Yield Prediction using ML", area: "Machine Learning", progress: 50, next: "Implementation", due: "Due 25 Nov", status: "Under Review" },
  { initials: "BA", name: "Bilal Ahmed", id: "MSCS-2025-017", project: "Smart Irrigation with IoT Sensors", area: "Internet of Things", progress: 75, next: "Final Report", due: "Due 12 Dec", status: "Under Review" },
  { initials: "HS", name: "Hira Siddiqui", id: "MSCS-2025-033", project: "Medical Image Segmentation with U-Net", area: "Computer Vision", progress: 25, next: "Literature Review", due: "2 days overdue", late: true, status: "Overdue" },
  { initials: "UT", name: "Usman Tariq", id: "MSCS-2024-088", project: "Fake News Detection in Urdu Media", area: "Natural Language Processing", progress: 100, next: "All milestones done", due: "Ready to publish", status: "Completed" },
  { initials: "ZA", name: "Zainab Ali", id: "MSCS-2025-052", project: "Traffic Flow Prediction with GNNs", area: "Data Science", progress: 50, next: "Literature Review", due: "Due 30 Nov", status: "Under Review" },
  { initials: "HR", name: "Hamza Raza", id: "MSCS-2025-009", project: "Arabic Handwriting OCR", area: "Computer Vision", progress: 25, next: "Implementation", due: "6 days overdue", late: true, status: "Overdue" },
];

const areas = ["All research areas", ...Array.from(new Set(rows.map((r) => r.area)))];
const statuses = ["All statuses", "Under Review", "Overdue", "Completed"];

export default function AssignedProjectsPage() {
  const [q, setQ] = useState("");
  const [area, setArea] = useState(areas[0]);
  const [status, setStatus] = useState(statuses[0]);

  const list = rows.filter(
    (r) =>
      `${r.name} ${r.project}`.toLowerCase().includes(q.toLowerCase()) &&
      (area === areas[0] || r.area === area) &&
      (status === statuses[0] || r.status === status),
  );

  return (
    <>
      <TopBar role="supervisor" title="Assigned projects" subtitle="6 projects are assigned to you this semester" />
      <PageBody className="pt-[8px] pb-[48px]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-[12px]">
            <SearchInput value={q} onChange={setQ} placeholder="Search by student or project" width={300} />
            <div className="flex w-full gap-[12px] sm:w-auto">
              <FilterSelect options={areas} value={area} onChange={setArea} className="min-w-0 flex-1 sm:flex-none" />
              <FilterSelect options={statuses} value={status} onChange={setStatus} className="min-w-0 flex-1 sm:flex-none" />
            </div>
          </div>
          <span className="flex items-center gap-[8px] text-[13px] leading-normal font-medium text-teal-700">
            <Icon name="eye" />
            Only projects assigned to you are shown
          </span>
        </div>

        <Card className="flex flex-col p-[18px] sm:p-[24px]">
          <TableScroll min={980}>
          <TableHead
            cols={[
              { label: "STUDENT", w: 200 },
              { label: "PROJECT" },
              { label: "PROGRESS", w: 160 },
              { label: "NEXT MILESTONE", w: 150 },
              { label: "STATUS", w: 150 },
              { label: "", w: 70 },
            ]}
          />
          {list.map((r) => (
            <Row key={r.id}>
              <Cell w={200} className="gap-[10px]">
                <Avatar initials={r.initials} />
                <span className="flex flex-col leading-normal whitespace-nowrap">
                  <span className="text-[13.5px] font-semibold text-ink">{r.name}</span>
                  <span className="text-[12px] text-muted">{r.id}</span>
                </span>
              </Cell>
              <Cell label="Project" className="flex-col items-start gap-[3px] leading-normal">
                <span className="text-[13.5px] font-semibold text-ink">{r.project}</span>
                <span className="text-[12px] text-muted">{r.area}</span>
              </Cell>
              <Cell label="Progress" w={160} className="gap-[8px]">
                <ProgressBar value={r.progress} className="flex-1" />
                <span className="text-[12.5px] leading-normal font-semibold text-ink">{r.progress}%</span>
              </Cell>
              <Cell label="Next milestone" w={150} className="flex-col items-start gap-[2px] leading-normal whitespace-nowrap">
                <span className="text-[13px] font-medium text-ink">{r.next}</span>
                <span className={cn("text-[12px]", r.late ? "text-danger" : "text-muted")}>{r.due}</span>
              </Cell>
              <Cell label="Status" w={150}>
                <StatusChip status={r.status} />
              </Cell>
              <Cell w={70}>
                <ButtonLink href="/supervisor/reviews/crop-yield-implementation" variant="ghost">
                  Open
                </ButtonLink>
              </Cell>
            </Row>
          ))}
          </TableScroll>
          {list.length === 0 && <p className="py-10 text-center text-[14px] text-muted">No projects match these filters.</p>}
          <Pagination summary={`Showing 1–${list.length} of ${rows.length} projects`} />
        </Card>
      </PageBody>
    </>
  );
}
