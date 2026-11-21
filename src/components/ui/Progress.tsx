import { cn } from "@/lib/cn";

/* Figma Progress Bar — inset track (10px, r5) with peach fill */
export function ProgressBar({
  value,
  className,
  height = 10,
  tone = "peach",
}: {
  value: number;
  className?: string;
  height?: number;
  tone?: "peach" | "teal";
}) {
  return (
    <div
      className={cn("neu-inset relative w-full overflow-hidden", className)}
      style={{ height, borderRadius: height / 2 }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn("h-full", tone === "peach" ? "bg-peach-500" : "bg-teal-700")}
        style={{ width: `${Math.max(0, Math.min(100, value))}%`, borderRadius: height / 2 }}
      />
    </div>
  );
}

/* Neumorphic progress dial (brand panel, dashboard hero):
   inset well → raised disc → track ring → peach progress arc */
export function ProgressDial({
  value,
  size = 320,
  label,
  valueClassName,
  labelClassName,
  className,
}: {
  value: number;
  size?: number;
  label?: string;
  valueClassName?: string;
  labelClassName?: string;
  className?: string;
}) {
  const s = size / 320; // all geometry is from the 320px Figma dial
  const ring = 180 * s;
  const stroke = 12.6 * s;
  const r = (ring - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className={cn("relative shrink-0", className)} style={{ width: size, height: size }}>
      <div className="neu-inset absolute inset-0 rounded-full" />
      <div
        className="absolute rounded-full bg-ice"
        style={{
          inset: 46 * s,
          boxShadow: `${9 * s}px ${9 * s}px ${20 * s}px var(--shadow-drop), ${-9 * s}px ${-9 * s}px ${20 * s}px var(--shadow-highlight)`,
        }}
      />
      <svg
        className="absolute"
        style={{ left: 70 * s, top: 70 * s }}
        width={ring}
        height={ring}
        viewBox={`0 0 ${ring} ${ring}`}
      >
        <circle cx={ring / 2} cy={ring / 2} r={r} fill="none" stroke="var(--teal-50)" strokeWidth={stroke} />
        <circle
          cx={ring / 2}
          cy={ring / 2}
          r={r}
          fill="none"
          stroke="var(--peach-500)"
          strokeWidth={stroke}
          strokeDasharray={`${(c * value) / 100} ${c}`}
          transform={`rotate(-90 ${ring / 2} ${ring / 2})`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-[2px] leading-normal">
        <span className={cn("font-display font-semibold text-teal-900", valueClassName)} style={{ fontSize: 44 * s }}>
          {value}%
        </span>
        {label && (
          <span className={cn("text-muted", labelClassName)} style={{ fontSize: Math.max(11, 13 * s) }}>
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
