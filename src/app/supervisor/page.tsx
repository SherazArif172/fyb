"use client";

import { useState } from "react";
import { PageBody } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { Avatar } from "@/components/ui/Avatar";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card, StatCard } from "@/components/ui/Card";
import { Donut } from "@/components/ui/Donut";
import { ProgressBar } from "@/components/ui/Progress";
import { SectionHead } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { Cell, Row, TableHead, TableScroll } from "@/components/ui/Table";

const completion = [
  { student: "Ayesha Khan", project: "Crop Yield Prediction using ML", value: 50 },
  { student: "Bilal Ahmed", project: "Smart Irrigation with IoT Sensors", value: 75 },
  { student: "Hira Siddiqui", project: "Medical Image Segmentation with U-Net", value: 25, behind: true },
  { student: "Usman Tariq", project: "Fake News Detection in Urdu Media", value: 100 },
  { student: "Zainab Ali", project: "Traffic Flow Prediction with GNNs", value: 50 },
  { student: "Hamza Raza", project: "Arabic Handwriting OCR", value: 25, behind: true },
];

const status = [
  { label: "Completed", value: 11, color: "var(--teal-700)" },
  { label: "In progress", value: 4, color: "var(--teal-200)" },
  { label: "Under review", value: 3, color: "var(--peach-500)" },
  { label: "Not started", value: 4, color: "var(--text-muted)" },
  { label: "Overdue", value: 2, color: "var(--danger)" },
];

const waiting = [
  { initials: "AK", name: "Ayesha Khan", project: "Crop Yield Prediction using ML", milestone: "Implementation", meta: "2 days ago · v3" },
  { initials: "BA", name: "Bilal Ahmed", project: "Smart Irrigation with IoT Sensors", milestone: "Final Report", meta: "5h ago · v1" },
  { initials: "ZA", name: "Zainab Ali", project: "Traffic Flow Prediction with GNNs", milestone: "Literature Review", meta: "Yesterday · v2" },
];

const overdue = [
  { initials: "HR", name: "Hamza Raza", project: "Arabic Handwriting OCR", milestone: "Implementation", late: "6 days overdue" },
  { initials: "HS", name: "Hira Siddiqui", project: "Medical Image Segmentation", milestone: "Literature Review", late: "2 days overdue" },
];

function ReminderButton() {
  const [sent, setSent] = useState(false);
  return (
    <Button variant="ghost" icon={sent ? "check" : "bell"} onClick={() => setSent(true)} disabled={sent}>
      {sent ? "Reminder sent" : "Send reminder"}
    </Button>
  );
}

export default function SupervisorDashboard() {
  return (
    <>
      <TopBar
        role="supervisor"
        title="Welcome back, Dr. Imran"
        subtitle="Saturday, 21 November 2026 · 3 submissions are waiting for your review"
      />
      <PageBody className="pt-[8px] pb-[48px]">
        <div className="grid grid-cols-2 gap-[14px] sm:gap-[24px] xl:grid-cols-4">
          <StatCard icon="folder" value="6" label="Assigned projects" trend="+1 this week" />
          <StatCard icon="inbox" value="3" label="Waiting for your review" trend="2 new" />
          <StatCard icon="alert" iconClassName="text-danger" value="2" label="Overdue milestones" trend="Action needed" />
          <StatCard icon="checkCircle" value="9" label="Approved this month" trend="+4 vs Oct" />
        </div>

        <div className="flex flex-col gap-[28px] xl:flex-row">
          <Card className="flex min-w-0 flex-1 flex-col gap-[18px] p-[18px] sm:p-[24px]">
            <SectionHead title="Milestone completion by project" link="This semester" />
            {completion.map((r) => (
              <div key={r.student} className="flex items-center gap-[10px] sm:gap-[16px]">
                <div className="flex w-[118px] shrink-0 flex-col leading-normal sm:w-[230px]">
                  <span className="text-[13.5px] font-semibold text-ink">{r.student}</span>
                  <span className="max-w-[220px] truncate text-[12px] text-muted sm:whitespace-normal">{r.project}</span>
                </div>
                <ProgressBar value={r.value} height={14} className="flex-1" />
                <span className={cn("w-[44px] text-right text-[13px] leading-normal font-semibold", r.behind ? "text-danger" : "text-teal-900")}>
                  {r.value}%
                </span>
              </div>
            ))}
          </Card>

          <Card className="flex w-full shrink-0 flex-col gap-[20px] p-[18px] sm:p-[24px] xl:w-[360px]">
            <SectionHead title="Overall status" />
            <div className="flex justify-center">
              <Donut value="24" label="milestones" segments={status} />
            </div>
            <div className="flex flex-col gap-[10px]">
              {status.map((s) => (
                <div key={s.label} className="flex items-center justify-between text-[13.5px] leading-normal text-ink">
                  <span className="flex items-center gap-[8px]">
                    <span className="size-[10px] rounded-full" style={{ background: s.color }} />
                    {s.label}
                  </span>
                  <span className="font-semibold">{s.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-[28px] xl:flex-row">
          <Card className="flex min-w-0 flex-1 flex-col p-[18px] sm:p-[24px]">
            <SectionHead title="Waiting for your review" link="View all" href="/supervisor/reviews" />
            <TableScroll min={620}>
            <TableHead cols={[{ label: "STUDENT", w: 170 }, { label: "PROJECT" }, { label: "MILESTONE", w: 150 }, { label: "", w: 96 }]} />
            {waiting.map((w) => (
              <Row key={w.name} className="md:py-[12px]">
                <Cell w={170} className="gap-[10px]">
                  <Avatar initials={w.initials} />
                  <span className="text-[13.5px] leading-normal font-semibold text-ink">{w.name}</span>
                </Cell>
                <Cell label="Project" className="text-[13.5px] leading-normal font-medium text-ink">
                  {w.project}
                </Cell>
                <Cell w={150} label="Milestone" className="flex-col items-start gap-[2px] leading-normal whitespace-nowrap">
                  <span className="text-[13.5px] text-ink">{w.milestone}</span>
                  <span className="text-[12px] font-medium text-peach-700">{w.meta}</span>
                </Cell>
                <Cell w={96}>
                  <ButtonLink href="/supervisor/reviews/crop-yield-implementation">Review</ButtonLink>
                </Cell>
              </Row>
            ))}
            </TableScroll>
          </Card>

          <Card className="flex w-full shrink-0 flex-col gap-[14px] p-[18px] sm:p-[24px] xl:w-[360px]">
            <SectionHead title="Overdue milestones" />
            {overdue.map((o) => (
              <div key={o.name} className="flex flex-col gap-[10px] rounded-[18px] bg-ice p-[16px] shadow-neu-sm">
                <div className="flex items-center gap-[10px]">
                  <Avatar initials={o.initials} />
                  <div className="flex flex-col leading-normal whitespace-nowrap">
                    <span className="text-[13.5px] font-semibold text-ink">{o.name}</span>
                    <span className="text-[12px] text-muted">{o.project}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-[2px] leading-normal font-semibold whitespace-nowrap">
                    <span className="text-[13px] text-ink">{o.milestone}</span>
                    <span className="text-[12px] text-danger">{o.late}</span>
                  </div>
                  <ReminderButton />
                </div>
              </div>
            ))}
          </Card>
        </div>
      </PageBody>
    </>
  );
}
