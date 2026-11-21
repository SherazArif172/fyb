import Link from "next/link";
import { Suspense } from "react";
import { SearchField } from "@/components/ui/Form";
import { Icon } from "@/components/ui/Icon";
import { UserChip } from "./UserMenu";
import type { Role } from "./nav";

/* Figma: Top Bar — 96px tall, px40, title Fraunces 28/34 */
export function TopBar({
  role,
  title,
  subtitle,
  searchPlaceholder = "Search projects, milestones…",
  menuOpen,
  breadcrumb,
}: {
  role: Role;
  title: string;
  subtitle?: React.ReactNode;
  searchPlaceholder?: string;
  menuOpen?: boolean;
  breadcrumb?: React.ReactNode;
}) {
  return (
    <header className="flex h-[96px] w-full shrink-0 items-center justify-between gap-6 px-[40px]">
      <div className="flex min-w-0 flex-col gap-[4px]">
        {breadcrumb}
        <h1 className="font-display truncate text-[28px] leading-[34px] font-semibold tracking-[-0.28px] text-teal-900">{title}</h1>
        {subtitle && <p className="truncate text-[14px] leading-normal text-muted">{subtitle}</p>}
      </div>
      <div className="flex shrink-0 items-center gap-[16px]">
        <SearchField placeholder={searchPlaceholder} width={280} />
        <Link
          href={`/${role}/notifications`}
          aria-label="Notifications"
          className="relative flex size-[44px] items-center justify-center rounded-full bg-ice text-muted shadow-neu-sm hover:text-teal-700"
        >
          <Icon name="bell" />
          <span className="absolute top-[10px] right-[8px] size-[10px] rounded-full border-2 border-ice bg-peach-500" />
        </Link>
        <Suspense>
          <UserChip role={role} defaultOpen={menuOpen} />
        </Suspense>
      </div>
    </header>
  );
}
