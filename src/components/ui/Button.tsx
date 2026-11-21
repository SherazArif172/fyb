import Link from "next/link";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

/* ---------------------------------------------------------------
   App Button (Figma: App Button — Primary/Secondary/Ghost/Danger/Disabled)
   44px tall, radius 14, 14.5px semibold label, optional 20px icon.
   --------------------------------------------------------------- */
export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "disabled";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-teal-700 text-inverse shadow-neu hover:brightness-110",
  secondary: "bg-ice text-teal-700 shadow-neu hover:brightness-[1.02]",
  ghost: "text-teal-700 hover:bg-teal-50",
  danger: "bg-ice text-danger shadow-neu-sm hover:bg-danger-100",
  disabled: "bg-ice text-disabled border border-dashed border-line cursor-not-allowed",
};

type CommonProps = {
  variant?: ButtonVariant;
  icon?: IconName;
  iconRight?: IconName;
  size?: "md" | "sm" | "lg";
  className?: string;
  children?: React.ReactNode;
};

const sizes = {
  sm: "h-[38px] px-[14px] text-[13.5px] rounded-[12px]",
  md: "h-[44px] px-[18px] text-[14.5px] rounded-[14px]",
  lg: "h-[50px] px-[20px] text-[15px] rounded-[14px]",
};

function classes({ variant = "primary", size = "md", className }: CommonProps) {
  return cn(
    "inline-flex shrink-0 items-center justify-center gap-[8px] font-semibold whitespace-nowrap transition",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
    sizes[size],
    variants[variant],
    className,
  );
}

export function Button({
  variant = "primary",
  icon,
  iconRight,
  size,
  className,
  children,
  ...rest
}: CommonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">) {
  return (
    <button
      className={classes({ variant, size, className })}
      disabled={variant === "disabled" || rest.disabled}
      {...rest}
    >
      {icon && <Icon name={icon} />}
      {children}
      {iconRight && <Icon name={iconRight} />}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  icon,
  iconRight,
  size,
  className,
  children,
}: CommonProps & { href: string }) {
  return (
    <Link href={href} className={classes({ variant, size, className })}>
      {icon && <Icon name={icon} />}
      {children}
      {iconRight && <Icon name={iconRight} />}
    </Link>
  );
}

/* Square neumorphic icon button (e.g. top-bar bell, card "more" menus) */
export function IconButton({
  icon,
  label,
  className,
  size = 44,
  round = false,
  children,
  ...rest
}: {
  icon: IconName;
  label: string;
  size?: number;
  round?: boolean;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">) {
  return (
    <button
      aria-label={label}
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center bg-ice text-muted shadow-neu-sm transition hover:text-teal-700",
        round ? "rounded-full" : "rounded-[14px]",
        className,
      )}
      style={{ width: size, height: size }}
      {...rest}
    >
      <Icon name={icon} />
      {children}
    </button>
  );
}
