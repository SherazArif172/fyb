"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { AreaTag } from "@/components/public/ProjectCard";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export type ThreadItem =
  | { kind: "comment"; author: string; initials: string; role: string; meta: string; text: string; mine?: boolean }
  | { kind: "event"; text: string; meta: string; tone?: "danger" | "teal" | "amber" };

/* Comment thread: raised bubbles for others, inset bubbles for the current user */
export function FeedbackThread({ items, placeholder, me }: { items: ThreadItem[]; placeholder: string; me: { name: string; initials: string; role: string } }) {
  const [list, setList] = useState(items);
  const [draft, setDraft] = useState("");

  const send = () => {
    if (!draft.trim()) return;
    setList([...list, { kind: "comment", author: me.name, initials: me.initials, role: me.role, meta: "just now", text: draft.trim(), mine: true }]);
    setDraft("");
  };

  return (
    <>
      {list.map((it, i) =>
        it.kind === "event" ? (
          <div key={i} className="flex items-center gap-[10px] pl-[54px]">
            <span
              className={cn(
                "size-[18px] shrink-0 rounded-full shadow-neu-sm",
                it.tone === "teal" ? "bg-teal-700" : it.tone === "amber" ? "bg-amber-500" : "bg-danger",
              )}
            />
            <span
              className={cn(
                "text-[13px] leading-normal font-medium",
                it.tone === "teal" ? "text-teal-700" : it.tone === "amber" ? "text-amber-700" : "text-danger",
              )}
            >
              {it.text}
            </span>
            <span className="text-[12.5px] leading-normal text-muted">· {it.meta}</span>
          </div>
        ) : (
          <div key={i} className="flex items-start gap-[14px]">
            <Avatar initials={it.initials} size="md" />
            <div className="flex min-w-0 flex-1 flex-col gap-[8px]">
              <div className="flex flex-wrap items-center gap-[8px] leading-normal">
                <span className="text-[14px] font-semibold text-ink">{it.author}</span>
                <AreaTag>{it.role}</AreaTag>
                <span className="text-[12.5px] text-muted">{it.meta}</span>
              </div>
              <div className={cn("rounded-[16px] p-[16px]", it.mine ? "neu-inset" : "bg-ice shadow-neu-sm")}>
                <p className="text-[14px] leading-[21px] text-ink">{it.text}</p>
              </div>
            </div>
          </div>
        ),
      )}
      <div className="neu-inset flex items-center gap-[12px] rounded-[16px] border border-field px-[16px] py-[12px] focus-within:border-2 focus-within:border-focus focus-within:px-[15px] focus-within:py-[11px]">
        <button type="button" aria-label="Attach file" className="shrink-0 text-muted hover:text-teal-700">
          <Icon name="paperclip" />
        </button>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-[14px] text-ink outline-none"
        />
        <Button icon="send" onClick={send}>
          Send
        </Button>
      </div>
    </>
  );
}

/* File/version row (Figma: Version v3 / v2 / v1) */
export function VersionRow({
  name,
  badge,
  latest,
  meta,
  note,
  icon = "file",
  chip,
  active,
}: {
  name: string;
  badge: string;
  latest?: boolean;
  meta: string;
  note: string;
  icon?: "file" | "folder";
  chip?: React.ReactNode;
  active?: boolean;
}) {
  return (
    <div className={cn("flex w-full flex-wrap items-start gap-[12px] px-[12px] py-[14px] sm:flex-nowrap sm:gap-[16px] sm:px-[18px] sm:py-[16px]", active ? "rounded-[14px] bg-teal-50" : "border-b border-line")}>
      <span
        className={cn(
          "flex size-[44px] shrink-0 items-center justify-center rounded-[14.08px] bg-ice shadow-neu-sm",
          latest ? "text-peach-700" : "text-teal-700",
        )}
      >
        <Icon name={icon} />
      </span>
      <div className="flex min-w-0 flex-1 basis-[180px] flex-col gap-[5px]">
        <div className="flex flex-wrap items-center gap-[8px]">
          <span className="text-[14.5px] leading-normal font-semibold break-all text-ink sm:break-normal">{name}</span>
          <span
            className={cn(
              "rounded-full px-[8px] py-[2px] text-[11.5px] leading-normal font-semibold",
              latest ? "bg-peach-100 text-peach-700" : "bg-teal-50 text-teal-700",
            )}
          >
            {badge}
          </span>
          {chip}
        </div>
        <span className="text-[12.5px] leading-normal text-muted">{meta}</span>
        <span className="max-w-[460px] text-[13px] leading-normal text-ink italic">{note}</span>
      </div>
      <div className="ml-auto flex shrink-0 items-center gap-[8px]">
        <button type="button" aria-label="Preview" className="flex size-[36px] items-center justify-center rounded-[11.52px] bg-ice text-teal-700 shadow-neu-sm">
          <Icon name="eye" />
        </button>
        <button type="button" aria-label="Download" className="flex size-[36px] items-center justify-center rounded-[11.52px] bg-ice text-teal-700 shadow-neu-sm">
          <Icon name="download" />
        </button>
      </div>
    </div>
  );
}
