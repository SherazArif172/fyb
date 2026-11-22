"use client";

import { cn } from "@/lib/cn";

/* Inset tab track with a raised active tab (Figma: Tabs — p5 r16, tab r12) */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  className,
  tabClassName,
}: {
  options: readonly T[] | { value: T; label: React.ReactNode }[];
  value: T;
  onChange: (v: T) => void;
  className?: string;
  tabClassName?: string;
}) {
  const opts = (options as (T | { value: T; label: React.ReactNode })[]).map((o) =>
    typeof o === "string" ? { value: o, label: o } : o,
  );
  return (
    <div className={cn("neu-inset flex max-w-full gap-[4px] overflow-x-auto rounded-[16px] p-[5px] [scrollbar-width:none]", className)} role="tablist">
      {opts.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.value)}
            className={cn(
              "flex flex-1 items-center justify-center gap-[6px] rounded-[12px] px-[12px] py-[8px] text-[13.5px] leading-normal whitespace-nowrap transition",
              active ? "bg-ice font-semibold text-teal-700 shadow-neu-sm" : "font-medium text-muted hover:text-teal-700",
              tabClassName,
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
