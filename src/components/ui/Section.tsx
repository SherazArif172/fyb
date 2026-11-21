import Link from "next/link";
import { cn } from "@/lib/cn";

/* "Section head" used across dashboard cards: 17px semibold title + teal link */
export function SectionHead({
  title,
  link,
  href = "#",
  action,
  className,
}: {
  title: string;
  link?: string;
  href?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex w-full items-center justify-between gap-4 leading-normal font-semibold", className)}>
      <h2 className="text-[17px] whitespace-nowrap text-teal-900">{title}</h2>
      {link && (
        <Link href={href} className="text-[13.5px] whitespace-nowrap text-teal-700 hover:underline">
          {link}
        </Link>
      )}
      {action}
    </div>
  );
}

/* Small uppercase label (MENU, CURRENT PROJECT, AUTHOR …) */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-[11px] leading-normal font-semibold tracking-[0.88px] whitespace-nowrap text-muted", className)}>
      {children}
    </p>
  );
}

/* Raised calendar tile: big Fraunces day + month */
export function DateTile({ day, month, urgent }: { day: string; month: string; urgent?: boolean }) {
  return (
    <span className="flex h-[58px] w-[54px] shrink-0 flex-col items-center justify-center rounded-[16px] bg-ice font-semibold shadow-neu-sm">
      <span className={cn("font-display text-[20px] leading-[22px]", urgent ? "text-peach-700" : "text-teal-900")}>{day}</span>
      <span className="text-[10.5px] leading-normal tracking-[0.63px] text-muted">{month}</span>
    </span>
  );
}
