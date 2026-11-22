"use client";

import { useState } from "react";
import { PageBody } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { AssignSupervisorModal } from "@/components/admin/AssignSupervisorModal";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card, StatCard } from "@/components/ui/Card";
import { Donut } from "@/components/ui/Donut";
import { SectionHead } from "@/components/ui/Section";
import { StatusChip } from "@/components/ui/StatusChip";
import { Cell, Row, TableHead, TableScroll } from "@/components/ui/Table";

const months = [
  { m: "Jun", c: 15.2, p: 117.8, w: 8 },
  { m: "Jul", c: 19, p: 129.2, w: 11.4 },
  { m: "Aug", c: 24.7, p: 140.6, w: 9.5 },
  { m: "Sep", c: 30.4, p: 155.8, w: 17.1 },
  { m: "Oct", c: 38, p: 171, w: 11.4 },
  { m: "Nov", c: 47.5, p: 182.4, w: 13.3 },
];

const areas = [
  { label: "Machine Learning", value: 34, color: "var(--teal-700)" },
  { label: "Computer Vision", value: 26, color: "var(--peach-500)" },
  { label: "NLP", value: 22, color: "var(--teal-500)" },
  { label: "Internet of Things", value: 18, color: "var(--peach-300)" },
  { label: "Data Science", value: 16, color: "var(--teal-200)" },
  { label: "Other", value: 12, color: "var(--text-muted)" },
];

const needs = [
  { initials: "AK", name: "Ayesha Khan", project: "Urdu Sentiment Analysis on Social Media", area: "NLP", created: "2 days ago" },
  { initials: "NF", name: "Nida Farooq", project: "Solar Power Forecasting with LSTMs", area: "Data Science", created: "3 days ago" },
  { initials: "AH", name: "Ali Hassan", project: "Cloud Cost Optimisation for SMEs", area: "Cloud Computing", created: "5 days ago" },
];

const requests = [
  { title: "Fake News Detection in Urdu Media", initials: "UT", name: "Usman Tariq", sup: "Dr. Imran Shah" },
  { title: "Wheat Disease Detection from Leaf Images", initials: "MK", name: "Maryam Khalid", sup: "Dr. Farah Naz" },
];

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-[6px] text-[12.5px] leading-normal text-muted">
      <span className="size-[9px] rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}

function PublishRequest({ r }: { r: (typeof requests)[number] }) {
  const [state, setState] = useState<null | "approved" | "rejected">(null);
  return (
    <div className="flex flex-col gap-[12px] rounded-[18px] bg-ice p-[16px] shadow-neu-sm">
      <p className="text-[14px] leading-normal font-semibold text-ink">{r.title}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[10px]">
          <Avatar initials={r.initials} />
          <div className="flex flex-col leading-normal whitespace-nowrap">
            <span className="text-[13.5px] font-semibold text-ink">{r.name}</span>
            <span className="text-[12px] text-muted">Supervisor: {r.sup}</span>
          </div>
        </div>
        <span className="font-display text-[16px] leading-normal font-semibold text-teal-700">4/4</span>
      </div>
      {state ? (
        <StatusChip status={state === "approved" ? "Published" : "Changes Requested"} label={state === "approved" ? "Published" : "Rejected"} />
      ) : (
        <div className="flex gap-[10px]">
          <Button variant="danger" icon="x" className="min-w-0 flex-1" onClick={() => setState("rejected")}>
            Reject
          </Button>
          <Button icon="check" className="min-w-0 flex-1" onClick={() => setState("approved")}>
            Approve
          </Button>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const [assign, setAssign] = useState<string | null>(null);

  return (
    <>
      <TopBar role="admin" title="Good evening, Sana" subtitle="System overview · Saturday, 21 November 2026" />
      <PageBody className="pt-[8px] pb-[48px]">
        <div className="grid grid-cols-2 gap-[14px] sm:gap-[24px] xl:grid-cols-4">
          <StatCard icon="folder" value="128" label="Total projects" trend="+12 this month" />
          <StatCard icon="users" value="342" label="Students" trend="+28 this term" />
          <StatCard icon="userCheck" value="24" label="Supervisors" trend="2 at full load" />
          <StatCard icon="clock" iconClassName="text-peach-700" value="7" label="Waiting for supervisor" trend="Needs action" />
        </div>

        <div className="flex flex-col gap-[28px] xl:flex-row">
          <Card className="flex min-w-0 flex-1 flex-col gap-[18px] p-[18px] sm:p-[24px] xl:self-start">
            <SectionHead
              title="Projects by status"
              action={
                <div className="hidden items-center gap-[14px] font-normal sm:flex">
                  <Legend color="var(--teal-700)" label="Completed" />
                  <Legend color="var(--teal-200)" label="In progress" />
                  <Legend color="var(--peach-500)" label="Waiting" />
                </div>
              }
            />
            <div className="neu-inset flex flex-col gap-[10px] rounded-[18px] p-[14px] sm:p-[20px]">
              <div className="flex h-[200px] items-end justify-between">
                {months.map((g) => (
                  <div key={g.m} className="flex flex-1 items-end justify-center gap-[3px] sm:gap-[6px]" title={g.m}>
                    <span className="w-[9px] rounded-t-[6px] bg-teal-700 sm:w-[18px]" style={{ height: g.c }} />
                    <span className="w-[9px] rounded-t-[6px] bg-teal-200 sm:w-[18px]" style={{ height: g.p }} />
                    <span className="w-[9px] rounded-t-[6px] bg-peach-500 sm:w-[18px]" style={{ height: g.w }} />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-center text-[12px] leading-normal font-medium text-muted">
                {months.map((g) => (
                  <span key={g.m} className="flex-1">
                    {g.m}
                  </span>
                ))}
              </div>
            </div>
          </Card>

          <Card className="flex w-full shrink-0 flex-col gap-[18px] p-[18px] sm:p-[24px] xl:w-[360px]">
            <SectionHead title="By research area" />
            <div className="flex justify-center">
              <Donut size={180} value="128" label="projects" segments={areas} />
            </div>
            <div className="flex flex-col gap-[10px]">
              {areas.map((a) => (
                <div key={a.label} className="flex items-center justify-between text-[13.5px] leading-normal text-ink">
                  <span className="flex items-center gap-[8px]">
                    <span className="size-[10px] rounded-full" style={{ background: a.color }} />
                    {a.label}
                  </span>
                  <span className="font-semibold">{a.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-[28px] xl:flex-row">
          <Card className="flex min-w-0 flex-1 flex-col p-[18px] sm:p-[24px]">
            <SectionHead title="Needs a supervisor" link="View all 7" href="/admin/projects" />
            <TableScroll min={640}>
            <TableHead cols={[{ label: "STUDENT", w: 180 }, { label: "PROJECT" }, { label: "CREATED", w: 90 }, { label: "", w: 110 }]} />
            {needs.map((n) => (
              <Row key={n.name}>
                <Cell w={180} className="gap-[10px]">
                  <Avatar initials={n.initials} />
                  <span className="text-[13.5px] leading-normal font-semibold whitespace-nowrap text-ink">{n.name}</span>
                </Cell>
                <Cell label="Project" className="flex-col items-start gap-[2px] leading-normal">
                  <span className="text-[13.5px] font-semibold text-ink">{n.project}</span>
                  <span className="text-[12px] text-muted">{n.area}</span>
                </Cell>
                <Cell label="Created" w={90} className="text-[13px] leading-normal whitespace-nowrap text-muted">
                  {n.created}
                </Cell>
                <Cell w={110}>
                  <Button icon="userCheck" onClick={() => setAssign(n.project)}>
                    Assign
                  </Button>
                </Cell>
              </Row>
            ))}
            </TableScroll>
          </Card>

          <Card className="flex w-full shrink-0 flex-col gap-[14px] p-[18px] sm:p-[24px] xl:w-[400px]">
            <SectionHead title="Publish requests" link="2 pending" href="/admin/publish-requests" />
            {requests.map((r) => (
              <PublishRequest key={r.title} r={r} />
            ))}
          </Card>
        </div>
      </PageBody>
      <AssignSupervisorModal open={!!assign} project={assign ?? ""} onClose={() => setAssign(null)} />
    </>
  );
}
