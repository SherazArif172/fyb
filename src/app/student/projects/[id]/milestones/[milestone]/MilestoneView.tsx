"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import { PageBody } from "@/components/layout/AppShell";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { TopBar } from "@/components/layout/TopBar";
import { FeedbackThread, VersionRow, type ThreadItem } from "@/components/project/Feedback";
import { UploadModal } from "@/components/project/UploadModal";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { SectionHead } from "@/components/ui/Section";
import { StatusChip } from "@/components/ui/StatusChip";

const thread: ThreadItem[] = [
  {
    kind: "comment",
    author: "Dr. Imran Shah",
    initials: "IS",
    role: "Supervisor",
    meta: "on v2 · 4 days ago",
    text: "Results look promising. Please add a comparison table of all models in Section 3.2 (RMSE, MAE, R²) and label the axes on Figures 4 and 5.",
  },
  { kind: "event", text: "Dr. Imran Shah requested changes on v2", meta: "4 days ago" },
  {
    kind: "comment",
    author: "Ayesha Khan",
    initials: "AK",
    role: "Student",
    meta: "on v3 · 2 days ago",
    text: "Thank you, sir. I have added the comparison table in Section 3.2 and fixed the figure labels. Uploaded as v3.",
    mine: true,
  },
];

export function MilestoneView() {
  const { id } = useParams<{ id: string }>();
  const params = useSearchParams();
  const [upload, setUpload] = useState(params.get("upload") === "1");

  return (
    <>
      <TopBar
        role="student"
        title="Implementation"
        subtitle={<Breadcrumb items={[{ label: "Crop Yield Prediction using ML", href: `/student/projects/${id}` }, { label: "Implementation" }]} />}
      />
      <PageBody className="pt-[8px] pb-[48px]">
        <Card className="flex flex-wrap items-center justify-between gap-6 p-[20px] sm:p-[28px] shadow-neu-lg">
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center gap-[10px]">
              <StatusChip status="Under Review" />
              <span className="flex items-center gap-[6px] text-[13px] leading-normal font-semibold text-peach-700">
                <Icon name="calendar" />
                Due 25 Nov 2026 · 3 days left
              </span>
            </div>
            <h2 className="font-display text-[24px] leading-[30px] font-semibold tracking-[-0.3px] text-teal-900 sm:text-[30px] sm:leading-[36px]">Implementation</h2>
            <p className="text-[14.5px] leading-normal text-muted">
              Build and evaluate the prediction models. Submit the results chapter and source code.
            </p>
          </div>
          <div className="flex flex-wrap gap-[12px]">
            <Button variant="secondary" icon="download">
              Download latest
            </Button>
            <Button icon="upload" onClick={() => setUpload(true)}>
              Upload new version
            </Button>
          </div>
        </Card>

        <div className="flex flex-col gap-[28px] xl:flex-row xl:items-start">
          <div className="flex min-w-0 flex-1 flex-col gap-[28px]">
            <Card className="flex flex-col gap-[6px] p-[18px] sm:p-[24px]">
              <SectionHead title="Version history" link="3 versions" />
              <VersionRow
                active
                latest
                name="implementation_chapter_v3.pdf"
                badge="v3 · Latest"
                meta="2.4 MB · Uploaded by Ayesha Khan · 19 Nov 2026, 9:42 PM"
                note="“Added the model comparison table (Section 3.2) and fixed figure labels.”"
              />
              <VersionRow
                name="implementation_chapter_v2.pdf"
                badge="v2"
                chip={<StatusChip status="Changes Requested" />}
                meta="2.1 MB · Uploaded by Ayesha Khan · 15 Nov 2026, 6:10 PM"
                note="“Added Random Forest and XGBoost results.”"
              />
              <VersionRow
                icon="folder"
                name="source_code_v1.zip"
                badge="v1"
                meta="6.8 MB · Uploaded by Ayesha Khan · 10 Nov 2026, 11:05 AM"
                note="“Initial models and cleaned dataset.”"
              />
            </Card>

            <Card className="flex flex-col gap-[18px] p-[18px] sm:p-[24px]">
              <SectionHead title="Feedback" link="4 comments" />
              <FeedbackThread
                items={thread}
                placeholder="Write a reply to your supervisor…"
                me={{ name: "Ayesha Khan", initials: "AK", role: "Student" }}
              />
            </Card>
          </div>

          <Card className="flex w-full shrink-0 flex-col gap-[16px] p-[18px] sm:p-[24px] xl:w-[320px]">
            <SectionHead title="Milestone info" />
            <div className="flex items-center justify-between">
              <span className="text-[13.5px] leading-normal text-muted">Status</span>
              <StatusChip status="Under Review" />
            </div>
            <div className="flex items-center justify-between text-[13.5px] leading-normal">
              <span className="text-muted">Due date</span>
              <span className="font-semibold text-ink">25 Nov 2026</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13.5px] leading-normal text-muted">Supervisor</span>
              <span className="flex items-center gap-[8px]">
                <Avatar initials="IS" />
                <span className="text-[13.5px] leading-normal font-semibold text-ink">Dr. Imran Shah</span>
              </span>
            </div>
            {[
              ["Versions", "3"],
              ["Comments", "4"],
              ["Last activity", "2 days ago"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between text-[13.5px] leading-normal">
                <span className="text-muted">{k}</span>
                <span className="font-semibold text-ink">{v}</span>
              </div>
            ))}
            <div className="neu-inset flex items-start gap-[10px] rounded-[14px] p-[14px]">
              <Icon name="alert" className="shrink-0 text-teal-700" />
              <p className="text-[12.5px] leading-[18px] text-teal-700">
                Every upload is saved as a new version. Older versions are never overwritten.
              </p>
            </div>
          </Card>
        </div>
      </PageBody>
      <UploadModal open={upload} onClose={() => setUpload(false)} milestone="Implementation" nextVersion="v4" />
    </>
  );
}
