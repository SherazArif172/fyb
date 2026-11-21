"use client";

import { useState } from "react";
import { PageBody } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { AreaTag } from "@/components/public/ProjectCard";
import { Avatar } from "@/components/ui/Avatar";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { SectionHead } from "@/components/ui/Section";
import { StatusChip } from "@/components/ui/StatusChip";

type Req = {
  id: string;
  title: string;
  area: string;
  requested: string;
  student: { name: string; initials: string; sub: string };
  supervisor: { name: string; initials: string };
  file: { name: string; meta: string };
  abstract: string;
  slug: string;
};

const requests: Req[] = [
  {
    id: "fake-news",
    title: "Fake News Detection in Urdu Media",
    area: "Natural Language Processing",
    requested: "Requested 2 days ago",
    student: { name: "Usman Tariq", initials: "UT", sub: "Student · MSCS-2024-088" },
    supervisor: { name: "Dr. Imran Shah", initials: "IS" },
    file: { name: "final_report_v2.pdf", meta: "4.8 MB · Final Report · approved by supervisor on 12 Nov" },
    abstract:
      "This project builds a dataset of 12,000 labelled Urdu news headlines and compares fine-tuned multilingual transformers with classical models for fake news detection. The best model reaches an F1 score of 0.89 and is released as an open-source browser extension.",
    slug: "fake-news-detection-urdu",
  },
  {
    id: "wheat",
    title: "Wheat Disease Detection from Leaf Images",
    area: "Computer Vision",
    requested: "requested yesterday",
    student: { name: "Maryam Khalid", initials: "MK", sub: "Student" },
    supervisor: { name: "Dr. Farah Naz", initials: "FN" },
    file: { name: "final_report_v1.pdf", meta: "3.2 MB · Final Report · approved by supervisor on 18 Nov" },
    abstract:
      "A lightweight convolutional network that detects rust, blight and smut on wheat leaves from a single smartphone photo, trained on 9,400 field images from Punjab. It runs offline on low-end Android phones with 94% accuracy.",
    slug: "wheat-disease-detection",
  },
];

const checklist = [
  "All milestones approved by the supervisor",
  "Final report uploaded",
  "Abstract and keywords filled in",
  "No private files will be shown publicly",
];

const recent = [
  { title: "Blockchain-based Degree Verification", when: "Published 12 Jun 2026" },
  { title: "Speech-to-Text for Punjabi", when: "Published 3 May 2026" },
  { title: "Dengue Outbreak Forecasting", when: "Published 21 Apr 2026" },
];

function Person({ name, initials, sub }: { name: string; initials: string; sub: string }) {
  return (
    <div className="flex items-center gap-[10px]">
      <Avatar initials={initials} />
      <div className="flex flex-col leading-normal whitespace-nowrap">
        <span className="text-[13.5px] font-semibold text-ink">{name}</span>
        <span className="text-[12px] text-muted">{sub}</span>
      </div>
    </div>
  );
}

function Expanded({ r, onDone }: { r: Req; onDone: (s: "published" | "rejected") => void }) {
  return (
    <Card className="flex flex-col gap-[20px] p-[28px] shadow-neu-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-[8px]">
          <div className="flex items-center gap-[8px]">
            <AreaTag>{r.area}</AreaTag>
            <StatusChip status="Completed" />
          </div>
          <h2 className="font-display text-[24px] leading-[30px] font-semibold text-teal-900">{r.title}</h2>
        </div>
        <span className="text-[13px] leading-normal whitespace-nowrap text-muted">{r.requested}</span>
      </div>
      <div className="flex flex-wrap items-center gap-[32px]">
        <Person {...r.student} />
        <Person {...r.supervisor} sub="Supervisor" />
        <div className="flex items-center gap-[8px]">
          <span className="flex size-[36px] items-center justify-center rounded-[11.52px] bg-ice text-teal-700 shadow-neu-sm">
            <Icon name="checkCircle" />
          </span>
          <div className="flex flex-col leading-normal whitespace-nowrap">
            <span className="text-[13.5px] font-semibold text-ink">4 of 4 milestones</span>
            <span className="text-[12px] text-teal-700">All approved</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-[14px] rounded-[18px] bg-ice px-[16px] py-[14px] shadow-neu-sm">
        <span className="flex size-[42px] shrink-0 items-center justify-center rounded-[13.44px] bg-ice text-peach-700 shadow-neu-sm">
          <Icon name="file" />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-[2px] leading-normal">
          <span className="text-[14px] font-semibold text-ink">{r.file.name}</span>
          <span className="text-[12.5px] text-muted">{r.file.meta}</span>
        </div>
        <button type="button" aria-label="Preview" className="flex size-[36px] items-center justify-center rounded-[11.52px] bg-ice text-teal-700 shadow-neu-sm">
          <Icon name="eye" />
        </button>
        <button type="button" aria-label="Download" className="flex size-[36px] items-center justify-center rounded-[11.52px] bg-ice text-teal-700 shadow-neu-sm">
          <Icon name="download" />
        </button>
      </div>
      <div className="neu-inset flex flex-col gap-[8px] rounded-[16px] p-[18px]">
        <span className="text-[10.5px] leading-normal font-semibold tracking-[0.84px] text-placeholder">ABSTRACT</span>
        <p className="text-[14px] leading-[22px] text-ink">{r.abstract}</p>
      </div>
      <label className="flex flex-col gap-[8px]">
        <span className="text-[13.5px] leading-normal font-medium text-muted">Reason if rejecting (sent to the student)</span>
        <textarea
          placeholder="e.g. Please add the keywords and a cover image before publishing."
          className="neu-inset h-[80px] w-full resize-none rounded-[14px] border border-field p-[16px] text-[14px] text-ink outline-none focus:border-2 focus:border-focus focus:p-[15px]"
        />
      </label>
      <div className="flex flex-wrap justify-end gap-[12px]">
        <Button variant="danger" icon="x" onClick={() => onDone("rejected")}>
          Reject
        </Button>
        <ButtonLink href={`/explore/${r.slug}`} variant="secondary" icon="arrowRight">
          Open project
        </ButtonLink>
        <Button icon="globe" onClick={() => onDone("published")}>
          Approve &amp; publish
        </Button>
      </div>
    </Card>
  );
}

export default function PublishRequestsPage() {
  const [open, setOpen] = useState("fake-news");
  const [done, setDone] = useState<Record<string, "published" | "rejected">>({});

  return (
    <>
      <TopBar role="admin" title="Publish requests" subtitle="2 finished projects are waiting to be published" />
      <PageBody className="pt-[8px] pb-[48px]">
        <div className="flex flex-col gap-[28px] xl:flex-row xl:items-start">
          <div className="flex min-w-0 flex-1 flex-col gap-[24px]">
            {requests.map((r) =>
              done[r.id] ? (
                <Card key={r.id} className="flex items-center justify-between gap-4 p-[24px]">
                  <span className="font-display text-[19px] leading-normal font-semibold text-teal-900">{r.title}</span>
                  <StatusChip status={done[r.id] === "published" ? "Published" : "Changes Requested"} label={done[r.id] === "published" ? "Published" : "Rejected"} />
                </Card>
              ) : open === r.id ? (
                <Expanded key={r.id} r={r} onDone={(s) => setDone({ ...done, [r.id]: s })} />
              ) : (
                <Card key={r.id} className="flex flex-wrap items-center justify-between gap-4 p-[24px]">
                  <div className="flex flex-col gap-[6px]">
                    <span className="font-display text-[19px] leading-normal font-semibold text-teal-900">{r.title}</span>
                    <div className="flex flex-wrap items-center gap-[24px]">
                      <Person {...r.student} sub="Student" />
                      <Person {...r.supervisor} sub="Supervisor" />
                      <span className="text-[13px] leading-normal text-muted">4/4 milestones · {r.requested}</span>
                    </div>
                  </div>
                  <Button variant="secondary" icon="chevronDown" onClick={() => setOpen(r.id)}>
                    Review
                  </Button>
                </Card>
              ),
            )}
          </div>

          <div className="flex w-full shrink-0 flex-col gap-[28px] xl:w-[340px]">
            <Card className="flex flex-col gap-[14px] p-[24px]">
              <SectionHead title="Before publishing" />
              {checklist.map((c) => (
                <div key={c} className="flex items-start gap-[10px]">
                  <span className="flex size-[22px] shrink-0 items-center justify-center rounded-full bg-teal-700 text-inverse shadow-neu-sm">
                    <Icon name="check" size={12} strokeWidth={2.5} />
                  </span>
                  <span className="flex-1 text-[13.5px] leading-[20px] text-ink">{c}</span>
                </div>
              ))}
            </Card>
            <Card className="flex flex-col gap-[14px] p-[24px]">
              <SectionHead title="Recently published" />
              {recent.map((p) => (
                <div key={p.title} className="flex flex-col gap-[2px] leading-normal">
                  <span className="text-[13.5px] font-semibold text-ink">{p.title}</span>
                  <span className="text-[12px] text-muted">{p.when}</span>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </PageBody>
    </>
  );
}
