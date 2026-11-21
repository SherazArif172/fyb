import { cn } from "@/lib/cn";

/* Table header row: 11px uppercase placeholder labels with fixed column widths */
export function TableHead({ cols, className }: { cols: { label: string; w?: number }[]; className?: string }) {
  return (
    <div className={cn("flex gap-[16px] px-[16px] pt-[4px] pb-[10px] text-[11px] leading-normal font-semibold tracking-[0.66px] text-placeholder", className)}>
      {cols.map((c, i) => (
        <span key={i} className={c.w ? "shrink-0" : "min-w-0 flex-1"} style={c.w ? { width: c.w } : undefined}>
          {c.label}
        </span>
      ))}
    </div>
  );
}

export function Cell({ w, className, children }: { w?: number; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn(w ? "shrink-0" : "min-w-0 flex-1", "flex items-center", className)} style={w ? { width: w } : undefined}>
      {children}
    </div>
  );
}

/* "Showing 1–6 of 6" + page buttons */
export function Pagination({ summary, pages = 1, page = 1, labels }: { summary: string; pages?: number; page?: number; labels?: string[] }) {
  return (
    <div className="flex items-center justify-between pt-[6px]">
      <span className="text-[13px] leading-normal text-muted">{summary}</span>
      <div className="flex gap-[8px]">
        {["‹", ...(labels ?? Array.from({ length: pages }, (_, i) => String(i + 1))), "›"].map((l) => (
          <button
            key={l}
            type="button"
            className={cn(
              "flex size-[36px] items-center justify-center rounded-[12px] text-[14px] leading-normal font-semibold shadow-neu-sm",
              l === String(page) ? "bg-teal-700 text-inverse" : "bg-ice text-teal-700",
            )}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}
