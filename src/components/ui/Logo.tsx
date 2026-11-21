import Link from "next/link";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

/* Peach graduation-cap mark + wordmark.
   variant "inline": single line (auth / public header)
   variant "stacked": "Research" / "Project Manager" (sidebar) */
export function Logo({
  variant = "inline",
  href = "/",
  markSize = 40,
  className,
}: {
  variant?: "inline" | "stacked";
  href?: string;
  markSize?: number;
  className?: string;
}) {
  const radius = markSize >= 40 ? 12 : markSize >= 36 ? 11 : 10;
  const iconSize = markSize >= 40 ? 22 : markSize >= 36 ? 20 : 18;
  return (
    <Link href={href} className={cn("inline-flex shrink-0 items-center", variant === "inline" ? "gap-[12px]" : "gap-[10px]", className)}>
      <span
        className="inline-flex shrink-0 items-center justify-center bg-peach-300 text-teal-900 shadow-neu-sm dark:text-on-accent"
        style={{ width: markSize, height: markSize, borderRadius: radius }}
      >
        <Icon name="cap" size={iconSize} strokeWidth={1.8} />
      </span>
      {variant === "inline" ? (
        <span className="text-[16px] leading-normal font-semibold whitespace-nowrap text-teal-900">Research Project Manager</span>
      ) : (
        <span className="flex flex-col leading-normal whitespace-nowrap">
          <span className="text-[15px] font-semibold text-teal-900">Research</span>
          <span className="text-[12.5px] text-muted">Project Manager</span>
        </span>
      )}
    </Link>
  );
}
