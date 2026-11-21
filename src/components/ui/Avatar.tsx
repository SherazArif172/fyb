import { cn } from "@/lib/cn";

/* Figma Avatar — SM 32 (r16, 12px), MD 40 (r20, 14px), LG 88 (r44) */
const sizes = {
  xs: "size-[28px] text-[11px]",
  sm: "size-[32px] text-[12px]",
  md: "size-[40px] text-[14px]",
  lg: "size-[88px] text-[28px]",
};

const tones = {
  peach: "bg-peach-300 text-on-accent",
  teal: "bg-teal-50 text-teal-700",
  violet: "bg-violet-100 text-violet-700",
  amber: "bg-amber-100 text-amber-700",
};

export function Avatar({
  initials,
  size = "sm",
  tone = "peach",
  className,
}: {
  initials: string;
  size?: keyof typeof sizes;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold leading-normal shadow-neu-sm",
        sizes[size],
        tones[tone],
        className,
      )}
    >
      {initials}
    </span>
  );
}
