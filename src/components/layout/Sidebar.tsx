"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { navByRole, userByRole, type Role } from "./nav";

/** Opens the mobile sidebar drawer (fired by the top-bar menu button) */
export const openMobileNav = () => window.dispatchEvent(new Event("rpm:nav"));

/* Figma: Sidebar/Student · Supervisor · Admin — 264px, pt32 px24 pb24, gap36.
   Desktop (lg+): sticky column. Below lg: off-canvas drawer opened from the top bar. */
export function Sidebar({ role }: { role: Role }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const items = navByRole[role];
  const user = userByRole[role];
  const root = `/${role}`;

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("rpm:nav", onOpen);
    return () => window.removeEventListener("rpm:nav", onOpen);
  }, []);

  // close the drawer whenever the route changes
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {open && <div className="fixed inset-0 z-40 lg:hidden" style={{ background: "var(--scrim)" }} onClick={() => setOpen(false)} />}
      <aside
        className={cn(
          "flex h-dvh w-[264px] shrink-0 flex-col gap-[36px] overflow-y-auto bg-ice px-[24px] pt-[32px] pb-[24px] drop-shadow-[6px_0_12px_var(--shadow-drop)]",
          "fixed inset-y-0 left-0 z-50 transition-transform duration-300 lg:sticky lg:top-0 lg:z-20 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between">
          <Logo variant="stacked" markSize={36} href={root} />
          <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="text-muted hover:text-ink lg:hidden">
            <Icon name="x" />
          </button>
        </div>

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
    </>
  );
}

/* Hamburger shown in the top bar below lg */
export function MobileNavButton() {
  return (
    <button
      type="button"
      aria-label="Open menu"
      onClick={openMobileNav}
      className="flex size-[44px] shrink-0 items-center justify-center rounded-[14px] bg-ice text-teal-700 shadow-neu-sm lg:hidden"
    >
      <Icon name="list" />
    </button>
  );
}
