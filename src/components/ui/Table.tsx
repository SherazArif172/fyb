import { cn } from "@/lib/cn";

/*
 * Responsive data table primitives.
 *  - md and up: the Figma table — header row + fixed-width columns.
 *  - below md:  each <Row> becomes a two-column card; the header is hidden and every
 *    <Cell label="…"> shows its column label above its value. Short labelled columns
 *    pair up side by side; main content (flexible column, unlabelled cells like names
 *    or actions) spans the full width.
 */

type W = React.CSSProperties & { "--w"?: string; "--min"?: string };

/* Table header row: 11px uppercase placeholder labels with fixed column widths (hidden on phones) */
export function TableHead({ cols, className }: { cols: { label: string; w?: number }[]; className?: string }) {
  return (
    <div
      className={cn(
        "hidden gap-[16px] px-[16px] pt-[4px] pb-[10px] text-[11px] leading-normal font-semibold tracking-[0.66px] text-placeholder md:flex",
        className,
      )}
    >
      {cols.map((c, i) => (
        <span key={i} className={c.w ? "shrink-0" : "min-w-0 flex-1"} style={c.w ? { width: c.w } : undefined}>
          {c.label}
        </span>
      ))}
    </div>
  );
}

/* One table row: two-column card on phones, flex row from md */
export function Row({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-[16px] gap-y-[14px] border-b border-line py-[16px] md:flex md:items-center md:gap-[16px] md:px-[16px] md:py-[14px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Cell({
  w,
  label,
  className,
  children,
}: {
  w?: number;
  /** Column name shown above the value on phones (where the header row is hidden) */
  label?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const style: W | undefined = w ? { "--w": `${w}px` } : undefined;
  // phones: only short labelled fixed-width columns share a line
  const half = !!(w && label);
  return (
    <div className={cn("min-w-0", half ? "col-span-1" : "col-span-2", w ? "md:w-(--w) md:shrink-0" : "md:flex-1")} style={style}>
      {label && (
        <span className="mb-[6px] block text-[10.5px] leading-normal font-semibold tracking-[0.66px] text-placeholder uppercase md:hidden">
          {label}
        </span>
      )}
      <div className={cn("flex min-w-0 items-center", className)}>{children}</div>
    </div>
  );
}

/* "Showing 1–6 of 6" + page buttons */
export function Pagination({ summary, pages = 1, page = 1, labels }: { summary: string; pages?: number; page?: number; labels?: string[] }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-[12px] md:pt-[6px]">
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

/* From md up, lets a wide fixed-column table scroll sideways inside its card; on phones rows stack instead */
export function TableScroll({ min = 860, children }: { min?: number; children: React.ReactNode }) {
  const style: W = { "--min": `${min}px` };
  return (
    <div className="md:-mx-[24px] md:overflow-x-auto md:px-[24px] md:[scrollbar-width:thin]">
      <div className="md:min-w-(--min)" style={style}>
        {children}
      </div>
    </div>
  );
}
