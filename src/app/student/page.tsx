import Link from "next/link";
import { Suspense } from "react";
import { studentTour, Tour } from "@/components/layout/Tour";
import { PageBody } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { AreaTag } from "@/components/public/ProjectCard";
import { Avatar } from "@/components/ui/Avatar";
import { ButtonLink } from "@/components/ui/Button";
import { Card, Divider, StatCard } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { ProgressBar } from "@/components/ui/Progress";
import { DateTile, Eyebrow, SectionHead } from "@/components/ui/Section";
import { StatusChip, type Status } from "@/components/ui/StatusChip";
import { cn } from "@/lib/cn";
import { StepNode, type StepState } from "@/components/project/StepNode";

type Step = { name: string; date: string; state: StepState };
const steps: Step[] = [
  { name: "Proposal", date: "2 Sep", state: "done" },
  { name: "Literature Review", date: "14 Oct", state: "done" },
  { name: "Implementation", date: "Due 25 Nov", state: "current" },
  { name: "Final Report", date: "Due 20 Dec", state: "todo" },
];

const deadlines = [
  { day: "25", month: "NOV", title: "Implementation", project: "Crop Yield Prediction", left: "3 days left", urgent: true },
  { day: "02", month: "DEC", title: "Proposal", project: "Urdu Sentiment Analysis", left: "11 days left" },
  { day: "20", month: "DEC", title: "Final Report", project: "Crop Yield Prediction", left: "29 days left" },
];

const feedback: { when: string; text: string; tag: string; status: Status }[] = [
  {
    when: "2h ago",
    text: "“Good structure overall. Please add a comparison table of the models you tested in Section 3.2 before final submission.”",
    tag: "Implementation · v2",
    status: "Changes Requested",
  },
  {
    when: "6 Oct",
    text: "“Proposal approved. The research questions are clear and the scope is realistic for one semester.”",
    tag: "Proposal",
    status: "Completed",
  },
];

const myProjects: { title: string; area: string; status: Status; progress?: number; note?: string }[] = [
  { title: "Crop Yield Prediction using ML", area: "Machine Learning", status: "In Progress", progress: 50 },
  {
    title: "Urdu Sentiment Analysis on Social Media",
    area: "Natural Language Processing",
    status: "Waiting for Supervisor",
    note: "A supervisor will be assigned by the admin.",
  },
  { title: "Blockchain Degree Verification", area: "Blockchain", status: "Published", progress: 100 },
];

export default function StudentDashboard() {
  return (
    <>
      <TopBar role="student" title="Good evening, Ayesha" subtitle="Saturday, 21 November 2026 · 1 milestone due this week" />
      <PageBody className="pt-[8px] pb-[48px]">
        {/* Stats */}
        <div data-tour="stats" className="grid grid-cols-2 gap-[24px] xl:grid-cols-4">
          <StatCard icon="folder" value="2" label="Active projects" trend="+1 this month" />
          <StatCard icon="checkCircle" value="6/12" label="Milestones completed" trend="50%" />
          <StatCard icon="inbox" value="1" label="Waiting for review" trend="Implementation" />
          <StatCard icon="calendar" value="3 days" label="Next deadline" trend="25 Nov" />
        </div>

        {/* Row 2 */}
        <div className="flex flex-col gap-[28px] xl:flex-row">
          <Card data-tour="current" className="flex min-w-0 flex-1 flex-col gap-[20px] p-[28px]">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-[6px]">
                <Eyebrow>CURRENT PROJECT</Eyebrow>
                <h2 className="font-display max-w-[460px] text-[22px] leading-[28px] font-semibold tracking-[-0.11px] text-teal-900">
                  Crop Yield Prediction using Machine Learning
                </h2>
              </div>
              <StatusChip status="In Progress" />
            </div>
            <div className="flex items-center gap-[14px]">
              <Avatar initials="IS" />
              <div className="flex flex-col leading-normal whitespace-nowrap">
                <span className="text-[13.5px] font-semibold text-ink">Dr. Imran Shah</span>
                <span className="text-[12px] text-muted">Supervisor</span>
              </div>
              <AreaTag>Machine Learning</AreaTag>
            </div>
            <div className="flex flex-col gap-[10px]">
              <div className="flex items-start justify-between leading-normal">
                <span className="text-[13.5px] font-medium text-muted">Overall progress</span>
                <span className="font-display text-[18px] font-semibold text-teal-900">50%</span>
              </div>
              <ProgressBar value={50} />
            </div>
            <div className="grid grid-cols-2 gap-[12px] md:grid-cols-4">
              {steps.map((s) => (
                <div key={s.name} className="flex items-center gap-[10px]">
                  <StepNode state={s.state} />
                  <div className={cn("flex flex-col gap-px leading-normal whitespace-nowrap", s.state === "todo" ? "text-muted" : "")}>
                    <span className={cn("text-[13px] font-semibold", s.state !== "todo" && "text-ink")}>{s.name}</span>
                    <span
                      className={cn(
                        "text-[11.5px]",
                        s.state === "current" ? "text-peach-700" : "text-muted",
                      )}
                    >
                      {s.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="neu-inset flex flex-wrap items-center justify-between gap-4 rounded-[18px] px-[18px] py-[14px]">
              <div className="flex items-center gap-[12px]">
                <span className="flex size-[38px] items-center justify-center rounded-[12.16px] bg-ice text-peach-700 shadow-neu-sm">
                  <Icon name="upload" />
                </span>
                <div className="flex flex-col gap-px leading-normal">
                  <span className="text-[14px] font-semibold text-ink">Next up: Implementation</span>
                  <span className="text-[12.5px] text-muted">v3 is under review · due 25 Nov 2026</span>
                </div>
              </div>
              <ButtonLink href="/student/projects/crop-yield" icon="arrowRight">
                Open workspace
              </ButtonLink>
            </div>
          </Card>

          <Card data-tour="deadlines" className="flex w-full shrink-0 flex-col gap-[16px] p-[24px] xl:w-[360px]">
            <SectionHead title="Upcoming deadlines" link="View all" href="/student/projects" />
            {deadlines.map((d) => (
              <div key={d.day + d.month} className="flex items-center gap-[14px]">
                <DateTile day={d.day} month={d.month} urgent={d.urgent} />
                <div className="flex flex-col gap-[2px] leading-normal">
                  <span className="text-[14px] font-semibold text-ink">{d.title}</span>
                  <span className="text-[12.5px] text-muted">{d.project}</span>
                  <span className={cn("text-[12px] font-semibold", d.urgent ? "text-peach-700" : "text-teal-500")}>{d.left}</span>
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* Row 3 */}
        <div className="flex flex-col gap-[28px] xl:flex-row">
          <Card data-tour="feedback" className="flex min-w-0 flex-1 flex-col gap-[18px] p-[24px]">
            <SectionHead title="Latest feedback" link="See all" href="/student/notifications" />
            {feedback.map((f, i) => (
              <div key={f.when} className="flex flex-col gap-[18px]">
                {i > 0 && <Divider />}
                <div className="flex items-start gap-[14px]">
                  <Avatar initials="IS" size="md" />
                  <div className="flex min-w-0 flex-1 flex-col gap-[8px]">
                    <div className="flex items-center gap-[8px] leading-normal whitespace-nowrap">
                      <span className="text-[14px] font-semibold text-ink">Dr. Imran Shah</span>
                      <span className="text-[12.5px] text-muted">· {f.when}</span>
                    </div>
                    <p className="text-[14px] leading-[21px] text-ink">{f.text}</p>
                    <div className="flex flex-wrap items-center gap-[8px]">
                      <AreaTag>{f.tag}</AreaTag>
                      <StatusChip status={f.status} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Card>

          <Card className="flex w-full shrink-0 flex-col gap-[6px] p-[24px] xl:w-[420px]">
            <SectionHead title="My projects" link="View all" href="/student/projects" />
            {myProjects.map((p) => (
              <Link
                key={p.title}
                href="/student/projects/crop-yield"
                className="flex flex-col gap-[10px] border-b border-line px-[16px] py-[14px] transition hover:bg-teal-50/50"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-col gap-[2px] leading-normal">
                    <span className="max-w-[165px] text-[13.5px] font-semibold text-ink">{p.title}</span>
                    <span className="text-[12px] whitespace-nowrap text-muted">{p.area}</span>
                  </div>
                  <StatusChip status={p.status} />
                </div>
                {p.progress !== undefined ? (
                  <div className="flex items-center gap-[10px]">
                    <ProgressBar value={p.progress} className="flex-1" />
                    <span className="text-[12px] leading-normal font-semibold text-muted">{p.progress}%</span>
                  </div>
                ) : (
                  <p className="text-[12px] leading-normal text-muted italic">{p.note}</p>
                )}
              </Link>
            ))}
          </Card>
        </div>
      </PageBody>
      <Suspense>
        <Tour steps={studentTour} />
      </Suspense>
    </>
  );
}
