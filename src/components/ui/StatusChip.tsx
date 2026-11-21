import { cn } from "@/lib/cn";

export type Status =
  | "Not Started"
  | "In Progress"
  | "Under Review"
  | "Changes Requested"
  | "Completed"
  | "Waiting for Supervisor"
  | "Published"
  | "Overdue";

const styles: Record<Status, { bg: string; text: string; dot: string }> = {
  "Not Started": { bg: "bg-neutral-100", text: "text-muted", dot: "bg-muted" },
  "In Progress": { bg: "bg-teal-50", text: "text-teal-700", dot: "bg-teal-500" },
  "Under Review": { bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-500" },
  "Changes Requested": { bg: "bg-danger-100", text: "text-danger", dot: "bg-danger" },
  Completed: { bg: "bg-teal-50", text: "text-teal-700", dot: "bg-teal-700" },
  "Waiting for Supervisor": { bg: "bg-violet-100", text: "text-violet-700", dot: "bg-violet-500" },
  Published: { bg: "bg-teal-50", text: "text-teal-700", dot: "bg-teal-700" },
  Overdue: { bg: "bg-danger-100", text: "text-danger", dot: "bg-danger" },
};

export function StatusChip({ status, label, className }: { status: Status; label?: string; className?: string }) {
  const s = styles[status];
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-[7px] rounded-full py-[5px] pr-[12px] pl-[10px] text-[12px] leading-normal font-semibold whitespace-nowrap",
        s.bg,
        s.text,
        className,
      )}
    >
      <span className={cn("size-[7px] rounded-full", s.dot)} />
      {label ?? status}
    </span>
  );
}

/* Generic pill/tag (research-area tags, counts, trends) */
export function Pill({
  children,
  tone = "teal",
  className,
}: {
  children: React.ReactNode;
  tone?: "teal" | "neutral" | "peach" | "amber" | "violet" | "danger";
  className?: string;
}) {
  const tones = {
    teal: "bg-teal-50 text-teal-700",
    neutral: "bg-neutral-100 text-muted",
    peach: "bg-peach-500 text-inverse",
    amber: "bg-amber-100 text-amber-700",
    violet: "bg-violet-100 text-violet-700",
    danger: "bg-danger-100 text-danger",
  };
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-[9px] py-[4px] text-[11.5px] leading-normal font-semibold whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
