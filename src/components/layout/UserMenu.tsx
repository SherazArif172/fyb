"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { startTour } from "./Tour";
import { cn } from "@/lib/cn";
import { Avatar } from "@/components/ui/Avatar";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Toggle } from "@/components/ui/Form";
import { useTheme } from "@/components/theme/ThemeProvider";
import { userByRole, type Role } from "./nav";

/* Figma: User Menu — 284px, p10, r22, Neu/Raised LG */
export function UserMenuPanel({ role, onTour, className }: { role: Role; onTour?: () => void; className?: string }) {
  const user = userByRole[role];
  const { theme, setTheme } = useTheme();
  const settingsHref = role === "admin" ? "/admin/settings" : `/${role}/settings`;

  const Item = ({ icon, label, href, onClick, danger, children }: {
    icon: IconName; label: string; href?: string; onClick?: () => void; danger?: boolean; children?: React.ReactNode;
  }) => {
    const cls = cn(
      "flex h-[42px] w-full items-center gap-[12px] rounded-[12px] px-[12px] text-left transition-colors hover:bg-teal-50",
      danger ? "text-danger" : "text-ink",
    );
    const inner = (
      <>
        <Icon name={icon} className={danger ? "text-danger" : "text-muted"} />
        <span className="min-w-0 flex-1 text-[14px] leading-normal font-medium">{label}</span>
        {children}
      </>
    );
    return href ? <Link href={href} className={cls}>{inner}</Link> : <button type="button" onClick={onClick} className={cls}>{inner}</button>;
  };

  return (
    <div className={cn("flex w-[284px] flex-col gap-[4px] rounded-[22px] bg-ice p-[10px] shadow-neu-lg", className)}>
      <div className="flex w-full items-center gap-[12px] p-[12px]">
        <Avatar initials={user.initials} size="md" />
        <div className="flex min-w-0 flex-col gap-px leading-normal">
          <p className="text-[14.5px] font-semibold text-ink">{user.name}</p>
          <p className="truncate text-[12.5px] text-muted">{user.email}</p>
        </div>
      </div>
      <div className="h-px w-full bg-line" />
      <Item icon="user" label="Profile" href={settingsHref} />
      <Item icon="settings" label="Settings" href={settingsHref} />
      <div className="flex h-[42px] w-full items-center gap-[12px] rounded-[12px] px-[12px]">
        <Icon name="moon" className="text-muted" />
        <span className="min-w-0 flex-1 text-[14px] leading-normal font-medium text-ink">Dark mode</span>
        <Toggle on={theme === "dark"} onChange={(v) => setTheme(v ? "dark" : "light")} label="Dark mode" />
      </div>
      <Item icon="sparkles" label="Take the tour" onClick={() => { onTour?.(); startTour(); }} />
      <div className="h-px w-full bg-line" />
      <Item icon="logout" label="Log out" href="/login" danger />
    </div>
  );
}

/* Top-bar user chip + dropdown */
export function UserChip({ role, defaultOpen = false }: { role: Role; defaultOpen?: boolean }) {
  const params = useSearchParams();
  const [open, setOpen] = useState(defaultOpen || params.get("menu") === "open");
  const ref = useRef<HTMLDivElement>(null);
  const user = userByRole[role];

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center gap-[10px] rounded-full bg-ice py-[6px] pr-[14px] pl-[6px] shadow-neu-sm"
      >
        <Avatar initials={user.initials} size="sm" />
        <span className="flex flex-col items-start leading-normal whitespace-nowrap">
          <span className="text-[13.5px] font-semibold text-ink">{user.name}</span>
          <span className="text-[12px] text-muted">{user.role}</span>
        </span>
        <Icon name="chevronDown" className={cn("text-muted transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute top-[calc(100%+12px)] right-0 z-50">
          <UserMenuPanel role={role} onTour={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
}
