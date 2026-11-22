"use client";

import { useState } from "react";
import { PageBody } from "@/components/layout/AppShell";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { TopBar } from "@/components/layout/TopBar";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Segmented } from "@/components/ui/Segmented";
import { SectionHead } from "@/components/ui/Section";
import { StatusChip } from "@/components/ui/StatusChip";

const lines = (widths: number[]) =>
  widths.map((w, i) => <span key={i} className="block h-[7px] rounded-[3.5px] bg-line" style={{ width: w, maxWidth: "100%" }} />);

const bars = [
  { h: 30, peach: false },
  { h: 67, peach: false },
  { h: 34, peach: true },
  { h: 71, peach: false },
  { h: 38, peach: false },
  { h: 75, peach: true },
  { h: 42, peach: false },
  { h: 79, peach: false },
];

const notes: Record<string, string> = {
  v3: "“Added the model comparison table (Section 3.2) and fixed figure labels.”",
  v2: "“Added Random Forest and XGBoost results.”",
  v1: "“Initial models and cleaned dataset.”",
};

export default function ReviewSubmissionPage() {
  const [version, setVersion] = useState<"v3" | "v2" | "v1">("v3");
  const [zoom, setZoom] = useState(1);
  const [comments, setComments] = useState([
    { who: "You", initials: "IS", meta: "on v2 · 4 days ago", text: "Please add a comparison table in Section 3.2 and label the axes on Figures 4 and 5." },
    { who: "Ayesha Khan", initials: "AK", meta: "on v3 · 2 days ago", text: "Added the table in Section 3.2 and fixed the figure labels." },
  ]);
  const [draft, setDraft] = useState("");
  const [decision, setDecision] = useState<null | "approved" | "changes">(null);

  const send = () => {
    if (!draft.trim()) return;
    setComments([...comments, { who: "You", initials: "IS", meta: `on ${version} · just now`, text: draft.trim() }]);
    setDraft("");
  };

  return (
    <>
      <TopBar
        role="supervisor"
        title="Review submission"
        subtitle={
          <Breadcrumb
            items={[
              { label: "Assigned projects", href: "/supervisor/projects" },
              { label: "Crop Yield Prediction using ML" },
              { label: "Implementation" },
            ]}
          />
        }
      />
      <PageBody className="pt-[8px] pb-[48px]">
        <div className="flex flex-col gap-[28px] xl:flex-row xl:items-start">
          {/* Document preview */}
          <Card className="flex min-w-0 flex-1 flex-col gap-[16px] p-[20px]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-[10px]">
                <span className="flex size-[38px] items-center justify-center rounded-[12.16px] bg-ice text-peach-700 shadow-neu-sm">
                  <Icon name="file" />
                </span>
                <span className="text-[14px] leading-normal font-semibold text-ink">implementation_chapter_{version}.pdf</span>
                {version === "v3" && (
                  <span className="rounded-full bg-peach-100 px-[8px] py-[2px] text-[11.5px] leading-normal font-semibold text-peach-700">v3 · Latest</span>
                )}
              </div>
              <div className="flex items-center gap-[10px]">
                <span className="text-[13px] leading-normal text-muted">Page 3 of 18</span>
                <button
                  type="button"
                  aria-label="Zoom in"
                  onClick={() => setZoom((z) => (z >= 1.2 ? 1 : z + 0.1))}
                  className="flex size-[36px] items-center justify-center rounded-[11.52px] bg-ice text-teal-700 shadow-neu-sm"
                >
                  <Icon name="zoomIn" />
                </button>
                <button type="button" aria-label="Download" className="flex size-[36px] items-center justify-center rounded-[11.52px] bg-ice text-teal-700 shadow-neu-sm">
                  <Icon name="download" />
                </button>
              </div>
            </div>
            <div className="neu-inset flex justify-center overflow-hidden rounded-[20px] p-[10px] sm:p-[28px]">
              <div
                className="flex w-[520px] max-w-full origin-top flex-col items-start gap-[12px] rounded-[6px] bg-paper p-[18px] sm:p-[40px] drop-shadow-[0_6px_9px_rgba(102,128,135,0.18)] transition-transform"
                style={{ transform: `scale(${zoom})` }}
              >
                <h3 className="font-display text-[17px] leading-normal font-semibold whitespace-pre text-teal-900">{"3.2  Model comparison"}</h3>
                {lines([440, 430, 445, 300])}
                <div className="max-w-full overflow-x-auto rounded-[6px] border border-line">
                  {[
                    ["Model", "RMSE", "MAE", "R²"],
                    ["Linear regression", "0.41", "0.33", "0.71"],
                    ["Random forest", "0.29", "0.22", "0.84"],
                    ["XGBoost", "0.26", "0.20", "0.87"],
                  ].map((row, i) => (
                    <div key={i} className={i === 0 ? "flex bg-teal-50 font-semibold" : "flex"}>
                      {row.map((c, j) => (
                        <span key={j} className="px-[10px] py-[7px] text-[12px] leading-normal text-ink" style={{ width: j === 0 ? 170 : 90 }}>
                          {c}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
                <p className="w-[440px] max-w-full text-[11.5px] leading-normal text-muted italic">
                  Table 3.2: Performance of the three models on the 2018–2023 test set.
                </p>
                {lines([445, 420, 440, 380, 445, 260])}
                <div className="relative h-[120px] w-[440px] max-w-full overflow-hidden rounded-[6px] bg-teal-50">
                  {bars.map((b, i) => (
                    <span
                      key={i}
                      className={`absolute bottom-[10px] w-[28px] rounded-[4px] ${b.peach ? "bg-peach-500" : "bg-teal-500"}`}
                      style={{ left: 24 + i * 50, height: b.h }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Review panel */}
          <div className="flex w-full shrink-0 flex-col gap-[20px] xl:w-[410px]">
            <Card className="flex flex-col gap-[16px] p-[18px] sm:p-[24px]">
              <div className="flex items-center gap-[12px]">
                <Avatar initials="AK" size="md" />
                <div className="flex flex-col gap-px leading-normal whitespace-nowrap">
                  <span className="text-[15px] font-semibold text-ink">Ayesha Khan</span>
                  <span className="text-[12.5px] text-muted">MSCS-2025-041 · submitted 2 days ago</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-[13.5px] leading-normal text-muted">Version</span>
                <Segmented
                  value={version}
                  onChange={setVersion}
                  tabClassName="flex-none px-[14px]"
                  options={[
                    { value: "v3", label: "v3 Latest" },
                    { value: "v2", label: "v2" },
                    { value: "v1", label: "v1" },
                  ]}
                />
              </div>
              <div className="neu-inset flex flex-col gap-[6px] rounded-[14px] p-[14px]">
                <span className="text-[10.5px] leading-normal font-semibold tracking-[0.84px] text-placeholder">STUDENT’S CHANGE NOTE</span>
                <p className="max-w-[320px] text-[13.5px] leading-[20px] text-ink italic">{notes[version]}</p>
              </div>
            </Card>

            <Card className="flex flex-col gap-[14px] p-[18px] sm:p-[24px]">
              <SectionHead title="Comments" action={<span className="text-[13.5px] font-semibold text-teal-700">{comments.length + 2}</span>} />
              {comments.map((c, i) => (
                <div key={i} className="flex items-start gap-[10px]">
                  <Avatar initials={c.initials} />
                  <div className="flex flex-col gap-[4px]">
                    <div className="flex items-center gap-[6px] leading-normal whitespace-nowrap">
                      <span className="text-[13px] font-semibold text-ink">{c.who}</span>
                      <span className="text-[12px] text-muted">{c.meta}</span>
                    </div>
                    <p className="max-w-[290px] text-[13px] leading-[19px] text-ink">{c.text}</p>
                  </div>
                </div>
              ))}
              <div className="neu-inset flex items-center gap-[10px] rounded-[14px] border border-field px-[14px] py-[12px] focus-within:border-2 focus-within:border-focus focus-within:px-[13px] focus-within:py-[11px]">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Add a comment for Ayesha…"
                  className="min-w-0 flex-1 bg-transparent text-[13.5px] text-ink outline-none"
                />
                <button type="button" aria-label="Send comment" onClick={send} className="text-teal-700">
                  <Icon name="send" />
                </button>
              </div>
            </Card>

            <Card className="flex flex-col gap-[14px] p-[18px] sm:p-[24px] shadow-neu-lg">
              <h2 className="text-[15px] leading-normal font-semibold text-teal-900">Your decision on Implementation</h2>
              {decision ? (
                <div className="flex items-center justify-between gap-3">
                  <StatusChip status={decision === "approved" ? "Completed" : "Changes Requested"} label={decision === "approved" ? "Milestone approved" : "Changes requested"} />
                  <Button variant="ghost" onClick={() => setDecision(null)}>
                    Undo
                  </Button>
                </div>
              ) : (
                <div className="flex gap-[12px]">
                  <Button variant="danger" icon="x" className="min-w-0 flex-1 px-[12px]" onClick={() => setDecision("changes")}>
                    Request changes
                  </Button>
                  <Button icon="check" className="min-w-0 flex-1 px-[12px]" onClick={() => setDecision("approved")}>
                    Approve milestone
                  </Button>
                </div>
              )}
              <p className="flex items-start gap-[8px] text-[12.5px] leading-[18px] text-muted">
                <Icon name="alert" className="shrink-0" />
                You can comment and approve, but you can’t edit or replace the student’s files.
              </p>
            </Card>
          </div>
        </div>
      </PageBody>
    </>
  );
}
