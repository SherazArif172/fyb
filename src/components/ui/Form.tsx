"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

/* ---------------------------------------------------------------
   Input (Figma: Input) — label 14 medium, 50px inset field r14,
   20px leading icon, optional password eye + hint.
   States: default (1px field border), focus (2px teal + 4px halo),
   error (danger border + message), disabled (dashed, flat).
   --------------------------------------------------------------- */
type InputProps = {
  label?: string;
  icon?: IconName;
  hint?: string;
  error?: string;
  height?: number;
  className?: string;
  fieldClassName?: string;
  trailing?: React.ReactNode;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "className">;

export function fieldClasses(error?: boolean, disabled?: boolean) {
  return cn(
    "relative flex items-center gap-[10px] rounded-[14px] px-[14px] transition-[box-shadow,border-color]",
    disabled
      ? "border border-dashed border-line bg-ice"
      : cn(
          "neu-inset border",
          error
            ? "border-danger focus-within:shadow-[0_0_0_4px_var(--danger-100)]"
            : "border-field focus-within:border-2 focus-within:border-focus focus-within:px-[13px] focus-within:shadow-focus",
        ),
  );
}

export function Input({
  label,
  icon,
  hint,
  error,
  type = "text",
  height = 50,
  className,
  fieldClassName,
  trailing,
  disabled,
  ...rest
}: InputProps) {
  const id = useId();
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  return (
    <div className={cn("flex w-full flex-col gap-[8px]", className)}>
      {label && (
        <label htmlFor={id} className="text-[14px] leading-normal font-medium text-ink">
          {label}
        </label>
      )}
      <div className={cn(fieldClasses(!!error, disabled), fieldClassName)} style={{ height }}>
        {icon && <Icon name={icon} className="shrink-0 text-muted" />}
        <input
          id={id}
          type={isPassword && show ? "text" : type}
          disabled={disabled}
          className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none disabled:text-disabled"
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? "Hide password" : "Show password"}
            className="shrink-0 text-muted hover:text-teal-700"
          >
            <Icon name={show ? "eyeOff" : "eye"} />
          </button>
        )}
        {trailing}
      </div>
      {(error || hint) && (
        <p className={cn("text-[12.5px] leading-normal", error ? "text-danger" : "text-muted")}>{error ?? hint}</p>
      )}
    </div>
  );
}

export function Textarea({
  label,
  hint,
  className,
  rows = 4,
  ...rest
}: { label?: string; hint?: string; className?: string } & Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "className"
>) {
  const id = useId();
  return (
    <div className={cn("flex w-full flex-col gap-[8px]", className)}>
      {label && (
        <label htmlFor={id} className="text-[14px] leading-normal font-medium text-ink">
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        className="neu-inset w-full resize-none rounded-[14px] border border-field px-[14px] py-[13px] text-[15px] leading-[22px] text-ink outline-none focus:border-2 focus:border-focus focus:px-[13px] focus:py-[12px] focus:shadow-focus"
        {...rest}
      />
      {hint && <p className="text-[12.5px] leading-normal text-muted">{hint}</p>}
    </div>
  );
}

export function Select({
  label,
  options,
  className,
  icon,
  height = 50,
  ...rest
}: {
  label?: string;
  options: string[];
  className?: string;
  icon?: IconName;
  height?: number;
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "className">) {
  const id = useId();
  return (
    <div className={cn("flex w-full flex-col gap-[8px]", className)}>
      {label && (
        <label htmlFor={id} className="text-[14px] leading-normal font-medium text-ink">
          {label}
        </label>
      )}
      <div className={fieldClasses()} style={{ height }}>
        {icon && <Icon name={icon} className="shrink-0 text-muted" />}
        <select
          id={id}
          className="h-full min-w-0 flex-1 appearance-none bg-transparent text-[15px] text-ink outline-none"
          {...rest}
        >
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <Icon name="chevronDown" className="pointer-events-none shrink-0 text-muted" />
      </div>
    </div>
  );
}

/* Checkbox (Figma: Checkbox Off/On) — 20px r6 inset box, 1.5px field border */
export function Checkbox({
  label,
  checked,
  defaultChecked,
  onChange,
  className,
  children,
}: {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (v: boolean) => void;
  className?: string;
  children?: React.ReactNode;
}) {
  const [inner, setInner] = useState(!!defaultChecked);
  const on = checked ?? inner;
  return (
    <label className={cn("inline-flex cursor-pointer items-center gap-[10px] select-none", className)}>
      <input
        type="checkbox"
        className="sr-only"
        checked={on}
        onChange={(e) => {
          setInner(e.target.checked);
          onChange?.(e.target.checked);
        }}
      />
      <span
        className={cn(
          "flex size-[20px] shrink-0 items-center justify-center rounded-[6px] transition",
          on ? "bg-teal-700 text-inverse shadow-neu-sm" : "neu-inset border-[1.5px] border-field",
        )}
      >
        {on && <Icon name="check" size={14} strokeWidth={2.5} />}
      </span>
      {(label || children) && (
        <span className="text-[14px] leading-normal text-muted">{children ?? label}</span>
      )}
    </label>
  );
}

/* Toggle (Figma: Toggle On/Off) — 46×26 inset track, 20px raised knob */
export function Toggle({
  on,
  defaultOn,
  onChange,
  label,
}: {
  on?: boolean;
  defaultOn?: boolean;
  onChange?: (v: boolean) => void;
  label?: string;
}) {
  const [inner, setInner] = useState(!!defaultOn);
  const value = on ?? inner;
  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      aria-label={label}
      onClick={() => {
        setInner(!value);
        onChange?.(!value);
      }}
      className={cn(
        "relative h-[26px] w-[46px] shrink-0 rounded-full shadow-neu-inset transition-colors",
        value ? "bg-teal-700" : "border border-field bg-ice",
      )}
    >
      <span
        className={cn(
          "absolute top-1/2 size-[20px] -translate-y-1/2 rounded-full bg-ice shadow-neu-sm transition-[left]",
          value ? "left-[23px]" : "left-[2px]",
        )}
      />
    </button>
  );
}

/* Search field used in top bar and list toolbars */
export function SearchField({
  placeholder = "Search…",
  width,
  className,
  height = 44,
}: {
  placeholder?: string;
  width?: number | string;
  className?: string;
  height?: number;
}) {
  return (
    <div className={cn(fieldClasses(), "px-[16px] focus-within:px-[15px]", className)} style={{ width, height }}>
      <Icon name="search" className="shrink-0 text-muted" />
      <input
        type="search"
        placeholder={placeholder}
        className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-ink outline-none"
      />
    </div>
  );
}

/* Compact inset dropdown used in list toolbars (44px) */
export function FilterSelect({
  options,
  value,
  onChange,
  className,
}: {
  options: string[];
  value?: string;
  onChange?: (v: string) => void;
  className?: string;
}) {
  return (
    <label className={cn("neu-inset relative flex h-[44px] shrink-0 items-center rounded-[14px] border border-field px-[16px]", className)}>
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="appearance-none bg-transparent pr-[30px] text-[13.5px] font-medium text-ink outline-none"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <Icon name="chevronDown" className="pointer-events-none absolute right-[16px] text-muted" />
    </label>
  );
}

/* Inset search input with live value (list toolbars) */
export function SearchInput({
  value,
  onChange,
  placeholder,
  width,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  width?: number;
  className?: string;
}) {
  return (
    <label
      className={cn(
        "neu-inset flex h-[44px] items-center gap-[10px] rounded-[14px] border border-field px-[16px] focus-within:border-2 focus-within:border-focus focus-within:px-[15px]",
        className,
      )}
      style={{ width }}
    >
      <Icon name="search" className="shrink-0 text-muted" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-ink outline-none"
      />
    </label>
  );
}
