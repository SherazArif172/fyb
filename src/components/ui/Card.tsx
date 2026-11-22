import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

/* Raised neumorphic surface (r24, Neu/Raised) */
export function Card({
  className,
  children,
  as: Tag = "div",
  ...rest
}: { className?: string; children?: React.ReactNode; as?: "div" | "section" | "article" } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Tag className={cn("rounded-[24px] bg-ice shadow-neu", className)} {...rest}>
      {children}
    </Tag>
  );
}

export function CardHeader({
  title,
  subtitle,
  action,
  className,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <div className="flex flex-col gap-[4px]">
        <h2 className="font-display text-[20px] leading-[26px] font-semibold tracking-[-0.2px] text-teal-900">{title}</h2>
        {subtitle && <p className="text-[13.5px] leading-normal text-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

/* 44px raised icon tile used in stat cards & list rows */
export function IconTile({
  icon,
  size = 44,
  className,
  iconClassName,
  tone = "ice",
}: {
  icon: IconName;
  size?: number;
  className?: string;
  iconClassName?: string;
  tone?: "ice" | "teal" | "peach" | "amber" | "violet" | "danger";
}) {
  const tones = {
    ice: "bg-ice text-teal-700 shadow-neu-sm",
    teal: "bg-teal-50 text-teal-700",
    peach: "bg-peach-300 text-on-accent",
    amber: "bg-amber-100 text-amber-700",
    violet: "bg-violet-100 text-violet-700",
    danger: "bg-danger-100 text-danger",
  };
  return (
    <span
      className={cn("inline-flex shrink-0 items-center justify-center rounded-[14px]", tones[tone], className)}
      style={{ width: size, height: size }}
    >
      <Icon name={icon} className={iconClassName} />
    </span>
  );
}

/* Figma Stat Card — 22px padding, r24, value Fraunces 34/40 */
export function StatCard({
  icon,
  value,
  label,
  trend,
  trendTone = "teal",
  iconClassName,
  className,
}: {
  iconClassName?: string;
  icon: IconName;
  value: string;
  label: string;
  trend?: string;
  trendTone?: "teal" | "amber" | "danger" | "neutral" | "violet";
  className?: string;
}) {
  const tones = {
    teal: "bg-teal-50 text-teal-700",
    amber: "bg-amber-100 text-amber-700",
    danger: "bg-danger-100 text-danger",
    neutral: "bg-neutral-100 text-muted",
    violet: "bg-violet-100 text-violet-700",
  };
  return (
    <Card className={cn("flex flex-col items-start gap-[10px] p-[16px] sm:gap-[14px] sm:p-[22px]", className)}>
      <div className="flex w-full items-center justify-between gap-2">
        <IconTile icon={icon} iconClassName={iconClassName} className="max-sm:!size-[36px] max-sm:!rounded-[12px]" />
        {trend && (
          <span className={cn("truncate rounded-full px-[7px] py-[3px] text-[10.5px] leading-normal font-semibold sm:px-[9px] sm:py-[4px] sm:text-[11.5px]", tones[trendTone])}>
            {trend}
          </span>
        )}
      </div>
      <p className="font-display text-[26px] leading-[32px] font-semibold text-teal-900 sm:text-[34px] sm:leading-[40px]">{value}</p>
      <p className="text-[12.5px] leading-normal text-muted sm:text-[13.5px]">{label}</p>
    </Card>
  );
}

export function Divider({ className }: { className?: string }) {
  return <div className={cn("h-px w-full bg-line", className)} />;
}
