import Link from "next/link";
import { PageBody } from "@/components/layout/AppShell";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { TopBar } from "@/components/layout/TopBar";
import { StepNode, type StepState } from "@/components/project/StepNode";
import { AreaTag } from "@/components/public/ProjectCard";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ProgressBar } from "@/components/ui/Progress";
import { SectionHead } from "@/components/ui/Section";
import { StatusChip, type Status } from "@/components/ui/StatusChip";
import { cn } from "@/lib/cn";

type Milestone = {
  slug: string;
  name: string;
  sub: string;
  version: string;
  comments: number;
  status: Status;
  state: StepState;
};

const milestones: Milestone[] = [
  { slug: "proposal", name: "Proposal", sub: "Approved 2 Sep 2026", version: "v2 · 1 Sep", comments: 3, status: "Completed", state: "done" },
  { slug: "literature-review", name: "Literature Review", sub: "Approved 14 Oct 2026", version: "v3 · 12 Oct", comments: 5, status: "Completed", state: "done" },
  { slug: "implementation", name: "Implementation", sub: "Due 25 Nov 2026 · 3 days left", version: "v3 · 2 days ago", comments: 4, status: "Under Review", state: "current" },
  { slug: "final-report", name: "Final Report", sub: "Due 20 Dec 2026", version: "No uploads yet", comments: 0, status: "Not Started", state: "todo" },
];

const activity = [
  { text: "You uploaded v3 of Implementation", when: "2 days ago", dot: "bg-peach-500" },
  { text: "Dr. Imran Shah requested changes on v2", when: "4 days ago", dot: "bg-danger" },
  { text: "You uploaded v2 of Implementation", when: "6 days ago", dot: "bg-teal-500" },
  { text: "Literature Review was approved", when: "14 Oct 2026", dot: "bg-teal-700" },
];

function Meta({ icon, children }: { icon: IconName; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-[6px] text-[13.5px] leading-normal whitespace-nowrap text-muted">
      <Icon name={icon} />
      {children}
    </span>
  );
}

export default async function WorkspacePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const base = `/student/projects/${id}`;

  return (
    <>
      <TopBar
        role="student"
        title="Project workspace"
        subtitle={<Breadcrumb items={[{ label: "My projects", href: "/student/projects" }, { label: "Crop Yield Prediction using Machine Learning" }]} />}
      />
      <PageBody className="pt-[8px] pb-[48px]">
        {/* Header */}
        <Card className="flex flex-col gap-[22px] p-[20px] sm:p-[32px] shadow-neu-lg">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="flex max-w-[640px] flex-col gap-[12px]">
              <div className="flex items-center gap-[8px]">
                <AreaTag>Machine Learning</AreaTag>
                <StatusChip status="In Progress" />
              </div>
              <h2 className="font-display text-[24px] leading-[30px] font-semibold tracking-[-0.3px] text-teal-900 sm:text-[30px] sm:leading-[36px]">
                Crop Yield Prediction using Machine Learning
              </h2>
              <p className="max-w-[620px] text-[14.5px] leading-[22px] text-muted">
                Predicting wheat yield in Punjab districts from weather, soil and satellite data, comparing ensemble models against a
                regression baseline.
              </p>
              <div className="flex flex-wrap items-center gap-[24px]">
                <div className="flex items-center gap-[10px]">
                  <Avatar initials="IS" />
                  <div className="flex flex-col leading-normal whitespace-nowrap">
                    <span className="text-[13.5px] font-semibold text-ink">Dr. Imran Shah</span>
                    <span className="text-[12px] text-muted">Supervisor</span>
                  </div>
                </div>
                <Meta icon="calendar">Created 2 Sep 2026</Meta>
                <Meta icon="flag">4 milestones</Meta>
                <Meta icon="file">9 versions</Meta>
              </div>
            </div>
            <div className="flex flex-col items-end gap-[10px]">
              <div className="flex gap-[12px]">
                <Button variant="secondary" icon="edit">
                  Edit
                </Button>
                <Button variant="disabled" icon="send">
                  Request publish
                </Button>
              </div>
              <p className="text-[12px] leading-normal text-muted">Available once all 4 milestones are completed</p>
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center justify-between leading-normal">
              <span className="text-[13.5px] font-medium text-muted">2 of 4 milestones completed · 1 under review</span>
              <span className="font-display text-[20px] font-semibold text-teal-900">50%</span>
            </div>
            <ProgressBar value={50} />
          </div>
        </Card>

        {/* Columns */}
        <div className="flex flex-col gap-[28px] xl:flex-row xl:items-start">
          <Card className="flex min-w-0 flex-1 flex-col gap-[6px] p-[18px] sm:p-[24px]">
            <SectionHead title="Milestones" link="+ Add milestone" />
            {milestones.map((m) => {
              const current = m.state === "current";
              return (
                <Link
                  key={m.slug}
                  href={`${base}/milestones/${m.slug}`}
                  className={cn(
                    "flex items-center gap-[12px] px-[12px] py-[14px] transition sm:gap-[16px] sm:px-[18px] sm:py-[16px]",
                    current ? "rounded-[14px] bg-teal-50" : "border-b border-line hover:bg-teal-50/50",
                  )}
                >
                  <StepNode state={m.state} />
                  <div className={cn("flex min-w-0 flex-1 flex-col gap-[2px] leading-normal sm:whitespace-nowrap", m.state === "todo" && "text-muted")}>
                    <span className={cn("text-[15px] font-semibold", m.state !== "todo" && "text-ink")}>{m.name}</span>
                    <span className={cn("text-[12.5px]", current ? "text-peach-700" : "text-muted")}>{m.sub}</span>
                  </div>
                  <span className="hidden items-center gap-[6px] text-[13px] leading-normal whitespace-nowrap text-muted md:flex">
                    <Icon name="file" />
                    {m.version}
                  </span>
                  <span className="hidden items-center gap-[6px] text-[13px] leading-normal text-muted sm:flex">
                    <Icon name="message" />
                    {m.comments}
                  </span>
                  <StatusChip status={m.status} />
                  <span className="flex h-[44px] items-center gap-[8px] text-[14.5px] font-semibold text-teal-700 sm:px-[18px]">
                    <Icon name="chevronRight" />
                    <span className="hidden sm:inline">Open</span>
                  </span>
                </Link>
              );
            })}
          </Card>

          <div className="flex w-full shrink-0 flex-col gap-[28px] xl:w-[340px]">
            <Card className="flex flex-col gap-[16px] p-[18px] sm:p-[24px]">
              <SectionHead title="Recent activity" />
              <div className="flex flex-col gap-[16px]">
                {activity.map((a) => (
                  <div key={a.text} className="flex items-start gap-[12px]">
                    <span className={cn("mt-[5px] size-[10px] shrink-0 rounded-full", a.dot)} />
                    <div className="flex flex-col gap-[2px] leading-normal">
                      <span className="max-w-[250px] text-[13.5px] font-medium text-ink">{a.text}</span>
                      <span className="text-[12px] text-muted">{a.when}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="flex flex-col gap-[14px] p-[18px] sm:p-[24px]">
              <SectionHead title="Files" />
              {[
                ["Versions uploaded", "9"],
                ["Storage used", "18.4 MB"],
                ["Last upload", "19 Nov, 9:42 PM"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between text-[13.5px] leading-normal">
                  <span className="text-muted">{k}</span>
                  <span className="font-semibold text-ink">{v}</span>
                </div>
              ))}
              <div className="neu-inset flex items-start gap-[10px] rounded-[14px] p-[14px]">
                <Icon name="eye" className="shrink-0 text-teal-700" />
                <p className="text-[12.5px] leading-[18px] text-teal-700">Only you, your supervisor and the admin can see these files.</p>
              </div>
            </Card>
          </div>
        </div>
      </PageBody>
    </>
  );
}
