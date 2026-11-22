"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { PageBody } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { fieldClasses } from "@/components/ui/Form";
import { Icon, type IconName } from "@/components/ui/Icon";

type Area = { id: number; name: string; count: number; icon: IconName };

const initial: Area[] = [
  { id: 1, name: "Machine Learning", count: 34, icon: "sparkles" },
  { id: 2, name: "Computer Vision", count: 26, icon: "eye" },
  { id: 3, name: "Natural Language Processing", count: 22, icon: "message" },
  { id: 4, name: "Internet of Things", count: 18, icon: "globe" },
  { id: 5, name: "Data Science", count: 16, icon: "chart" },
  { id: 6, name: "Blockchain", count: 5, icon: "layers" },
  { id: 7, name: "Software Engineering", count: 4, icon: "settings" },
  { id: 8, name: "Cloud Computing", count: 3, icon: "folder" },
];

export default function ResearchAreasPage() {
  const [areas, setAreas] = useState(initial);
  const [draft, setDraft] = useState("");
  const [editing, setEditing] = useState<number | null>(null);

  const add = () => {
    if (!draft.trim()) return;
    setAreas([...areas, { id: Date.now(), name: draft.trim(), count: 0, icon: "book" }]);
    setDraft("");
  };

  return (
    <>
      <TopBar role="admin" title="Research areas" subtitle="Used to organise projects and power the public filters" />
      <PageBody className="pt-[8px] pb-[48px]">
        <Card className="p-[20px]">
          <form
            className="flex items-center gap-[14px]"
            onSubmit={(e) => {
              e.preventDefault();
              add();
            }}
          >
            <label className={cn(fieldClasses(), "h-[48px] min-w-0 flex-1 px-[16px] focus-within:px-[15px]")}>
              <Icon name="layers" className="shrink-0 text-muted" />
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="New research area name, e.g. Robotics"
                className="h-full min-w-0 flex-1 bg-transparent text-[14.5px] text-ink outline-none"
              />
            </label>
            <Button type="submit" icon="plus">
              Add area
            </Button>
          </form>
        </Card>

        <div className="grid grid-cols-1 gap-[24px] sm:grid-cols-2 xl:grid-cols-4">
          {areas.map((a) => (
            <Card key={a.id} className="flex flex-col items-start gap-[14px] p-[22px]">
              <div className="flex w-full items-center justify-between">
                <span className="flex size-[46px] items-center justify-center rounded-[14.72px] bg-ice text-teal-700 shadow-neu-sm">
                  <Icon name={a.icon} />
                </span>
                <div className="flex items-center gap-[12px]">
                  <button type="button" aria-label={`Rename ${a.name}`} onClick={() => setEditing(a.id)} className="text-muted hover:text-teal-700">
                    <Icon name="edit" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete ${a.name}`}
                    disabled={a.count > 0}
                    title={a.count > 0 ? "Areas with projects can’t be deleted" : "Delete"}
                    onClick={() => setAreas(areas.filter((x) => x.id !== a.id))}
                    className="text-muted enabled:hover:text-danger disabled:cursor-not-allowed"
                  >
                    <Icon name="trash" />
                  </button>
                </div>
              </div>
              {editing === a.id ? (
                <input
                  autoFocus
                  defaultValue={a.name}
                  onBlur={(e) => {
                    setAreas(areas.map((x) => (x.id === a.id ? { ...x, name: e.target.value || x.name } : x)));
                    setEditing(null);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
                  className="neu-inset w-full rounded-[10px] border border-focus px-[10px] py-[4px] text-[15px] font-semibold text-ink outline-none"
                />
              ) : (
                <span className="text-[15px] leading-normal font-semibold text-ink">{a.name}</span>
              )}
              <span className="flex items-center gap-[6px] leading-normal whitespace-nowrap">
                <span className="font-display text-[22px] font-semibold text-teal-900">{a.count}</span>
                <span className="text-[13px] text-muted">projects</span>
              </span>
            </Card>
          ))}
        </div>

        <div className="neu-inset flex items-start gap-[10px] rounded-[14px] p-[14px]">
          <Icon name="alert" className="shrink-0 text-teal-700" />
          <p className="flex-1 text-[12.5px] leading-[18px] text-teal-700">
            Areas that already have projects can’t be deleted. Rename them, or move their projects to another area first.
          </p>
        </div>
      </PageBody>
    </>
  );
}
