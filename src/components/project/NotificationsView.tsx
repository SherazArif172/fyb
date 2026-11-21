"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Toggle } from "@/components/ui/Form";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Segmented } from "@/components/ui/Segmented";
import { SectionHead } from "@/components/ui/Section";

export type Notice = {
  id: number;
  group: "TODAY" | "YESTERDAY" | "EARLIER";
  kind: "feedback" | "deadline" | "approval" | "other";
  icon: IconName;
  tone?: "peach" | "danger" | "teal";
  title: string;
  body: string;
  when: string;
  unread?: boolean;
};

export const studentNotices: Notice[] = [
  { id: 1, group: "TODAY", kind: "feedback", icon: "message", tone: "peach", title: "New feedback on Implementation", body: "Dr. Imran Shah: “The table looks good now. One small fix in Figure 5 and it is ready.”", when: "2h ago", unread: true },
  { id: 2, group: "TODAY", kind: "deadline", icon: "clock", tone: "peach", title: "Deadline in 3 days", body: "Implementation for Crop Yield Prediction is due on 25 Nov 2026.", when: "9:00 AM", unread: true },
  { id: 3, group: "YESTERDAY", kind: "other", icon: "upload", title: "Version uploaded", body: "implementation_chapter_v3.pdf was saved as v3 of Implementation.", when: "Yesterday", unread: true },
  { id: 4, group: "YESTERDAY", kind: "other", icon: "folder", title: "Project created", body: "Urdu Sentiment Analysis is waiting for the admin to assign a supervisor.", when: "Yesterday" },
  { id: 5, group: "EARLIER", kind: "feedback", icon: "alert", tone: "danger", title: "Changes requested", body: "Dr. Imran Shah asked for changes on Implementation v2.", when: "17 Nov" },
  { id: 6, group: "EARLIER", kind: "approval", icon: "checkCircle", title: "Milestone approved", body: "Literature Review for Crop Yield Prediction was approved.", when: "14 Oct" },
  { id: 7, group: "EARLIER", kind: "approval", icon: "userCheck", title: "Supervisor assigned", body: "Dr. Imran Shah is now supervising Crop Yield Prediction.", when: "3 Sep" },
];

const toneCls = { peach: "text-peach-700", danger: "text-danger", teal: "text-teal-700" };

type Tab = "all" | "unread" | "feedback" | "deadline" | "approval";

export function NotificationsView({
  notices,
  total = 12,
  emailPrefs,
}: {
  notices: Notice[];
  total?: number;
  emailPrefs: { label: string; on: boolean }[];
}) {
  const [items, setItems] = useState(notices);
  const [tab, setTab] = useState<Tab>("all");
  const unread = items.filter((n) => n.unread).length;

  const shown = items.filter((n) =>
    tab === "all" ? true : tab === "unread" ? n.unread : n.kind === tab,
  );
  const groups = (["TODAY", "YESTERDAY", "EARLIER"] as const).filter((g) => shown.some((n) => n.group === g));

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Segmented
          value={tab}
          onChange={setTab}
          tabClassName="flex-none px-[14px]"
          options={[
            { value: "all", label: `All ${total}` },
            { value: "unread", label: `Unread ${unread}` },
            { value: "feedback", label: "Feedback" },
            { value: "deadline", label: "Deadlines" },
            { value: "approval", label: "Approvals" },
          ]}
        />
        <Button variant="ghost" icon="check" onClick={() => setItems(items.map((n) => ({ ...n, unread: false })))}>
          Mark all as read
        </Button>
      </div>

      <div className="flex flex-col gap-[28px] xl:flex-row xl:items-start">
        <Card className="flex min-w-0 flex-1 flex-col gap-[6px] p-[24px]">
          {groups.length === 0 && <p className="py-10 text-center text-[14px] text-muted">You&apos;re all caught up.</p>}
          {groups.map((g) => (
            <div key={g} className="flex flex-col gap-[6px]">
              <p className="text-[11px] leading-normal font-semibold tracking-[0.88px] text-placeholder">{g}</p>
              {shown
                .filter((n) => n.group === g)
                .map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => setItems(items.map((x) => (x.id === n.id ? { ...x, unread: false } : x)))}
                    className={cn(
                      "flex w-full items-center gap-[16px] px-[18px] py-[16px] text-left transition",
                      n.unread ? "rounded-[14px] bg-teal-50" : "border-b border-line hover:bg-teal-50/40",
                    )}
                  >
                    <span className={cn("flex size-[44px] shrink-0 items-center justify-center rounded-[14.08px] bg-ice shadow-neu-sm", toneCls[n.tone ?? "teal"])}>
                      <Icon name={n.icon} />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
                      <span className={cn("text-[14.5px] leading-normal text-ink", n.unread ? "font-semibold" : "font-medium")}>{n.title}</span>
                      <span className="max-w-[520px] text-[13.5px] leading-[20px] text-muted">{n.body}</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-[10px]">
                      <span className="text-[12.5px] leading-normal whitespace-nowrap text-muted">{n.when}</span>
                      {n.unread && <span className="size-[10px] rounded-full bg-peach-500" />}
                    </span>
                  </button>
                ))}
            </div>
          ))}
        </Card>

        <Card className="flex w-full shrink-0 flex-col gap-[16px] p-[24px] xl:w-[330px]">
          <SectionHead title="Email me when…" />
          {emailPrefs.map((p) => (
            <div key={p.label} className="flex items-center justify-between gap-4">
              <span className="max-w-[220px] text-[13.5px] leading-normal text-ink">{p.label}</span>
              <Toggle defaultOn={p.on} label={p.label} />
            </div>
          ))}
          <p className="text-[12.5px] leading-normal text-muted">In-app notifications are always on.</p>
        </Card>
      </div>
    </>
  );
}
