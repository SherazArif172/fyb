import Link from "next/link";
import { Suspense } from "react";
import { SearchField } from "@/components/ui/Form";
import { Icon } from "@/components/ui/Icon";
import { MobileNavButton } from "./Sidebar";
import { UserChip } from "./UserMenu";
import type { Role } from "./nav";

/* Figma: Top Bar — 96px tall, px40, title Fraunces 28/34.
   Below lg: a row with the menu button + actions, then the title on its own line. */
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
  // admins have no notifications page; their bell points at publish requests
  const bellHref = role === "admin" ? "/admin/publish-requests" : `/${role}/notifications`;
  return (
    <header className="flex w-full shrink-0 flex-wrap items-center gap-x-6 gap-y-[18px] px-4 pt-5 pb-3 sm:px-6 lg:h-[96px] lg:flex-nowrap lg:justify-between lg:px-[40px] lg:py-0">
      <MobileNavButton />
      <div className="order-last flex w-full min-w-0 flex-col gap-[4px] lg:order-none lg:w-auto">
        {breadcrumb}
        <h1 className="font-display text-[24px] leading-[30px] font-semibold tracking-[-0.28px] text-teal-900 sm:truncate lg:text-[28px] lg:leading-[34px]">
          {title}
        </h1>
        {subtitle && <p className="text-[13.5px] leading-normal text-muted sm:truncate lg:text-[14px]">{subtitle}</p>}
      </div>
      <div className="ml-auto flex shrink-0 items-center gap-[12px] sm:gap-[16px] lg:ml-0">
        <div className="hidden xl:block">
          <SearchField placeholder={searchPlaceholder} width={280} />
        </div>
        <Link
          href={bellHref}
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
