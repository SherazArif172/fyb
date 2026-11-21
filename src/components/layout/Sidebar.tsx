"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { navByRole, userByRole, type Role } from "./nav";

/* Figma: Sidebar/Student · Supervisor · Admin — 264px, pt32 px24 pb24, gap36 */
export function Sidebar({ role }: { role: Role }) {
  const pathname = usePathname();
  const items = navByRole[role];
  const user = userByRole[role];
  const root = `/${role}`;

  return (
    <aside className="sticky top-0 z-20 flex h-screen w-[264px] shrink-0 flex-col gap-[36px] bg-ice px-[24px] pt-[32px] pb-[24px] drop-shadow-[6px_0_12px_var(--shadow-drop)]">
      <Logo variant="stacked" markSize={36} href={root} />

      <nav data-tour="nav" className="flex w-full flex-col gap-[6px] rounded-[14px]">
        <p className="text-[11px] leading-normal font-semibold tracking-[0.88px] text-placeholder">MENU</p>
        {items.map((item) => {
          const active = item.href === root ? pathname === root : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex h-[46px] w-full items-center gap-[12px] rounded-[14px] pr-[12px] pl-[14px] transition-colors",
                active ? "bg-teal-50 text-teal-700" : "text-muted hover:bg-teal-50/60",
              )}
            >
              {active && <span className="absolute top-[12px] left-0 h-[22px] w-[4px] rounded-[2px] bg-teal-700" />}
              <Icon name={item.icon} className="shrink-0" />
              <span className={cn("min-w-0 flex-1 text-[14.5px] leading-normal", active ? "font-semibold" : "font-medium")}>
                {item.label}
              </span>
              {item.badge && (
                <span className="rounded-full bg-peach-500 px-[8px] py-[2px] text-[11.5px] leading-normal font-semibold text-inverse">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="min-h-px flex-1" />

      <div className="flex w-full items-center gap-[10px] rounded-[18px] bg-ice p-[12px] shadow-neu-sm">
        <Avatar initials={user.initials} size="sm" />
        <div className="flex min-w-0 flex-1 flex-col gap-px leading-normal">
          <p className="truncate text-[13.5px] font-semibold text-ink">{user.name}</p>
          <p className="truncate text-[12px] text-muted">{user.card}</p>
        </div>
        <Link href="/login" aria-label="Log out" className="text-muted hover:text-danger">
          <Icon name="logout" />
        </Link>
      </div>
    </aside>
  );
}
