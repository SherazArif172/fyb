"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";

const links = [
  { label: "Explore projects", href: "/explore" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "For supervisors", href: "/#for-supervisors" },
];

/* Figma: Public nav — px80 py22. Below lg the links + auth buttons move into a dropdown menu. */
export function PublicNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);

  const linkCls = (href: string) =>
    cn(
      "text-[14.5px] leading-normal whitespace-nowrap transition-colors hover:text-teal-700",
      href === "/explore" && pathname.startsWith("/explore") ? "font-semibold text-teal-700" : "font-medium text-muted",
    );

  return (
    <header className="relative z-30 flex w-full items-center justify-between gap-4 px-4 py-[18px] sm:px-6 md:py-[22px] lg:px-[80px]">
      <Logo variant="inline" markSize={38} />
      <nav className="hidden items-center gap-[32px] lg:flex">
        {links.map((l) => (
          <Link key={l.label} href={l.href} className={linkCls(l.href)}>
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="hidden items-center gap-[12px] lg:flex">
        <ButtonLink href="/login" variant="secondary">
          Sign in
        </ButtonLink>
        <ButtonLink href="/signup">Create account</ButtonLink>
      </div>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex size-[44px] shrink-0 items-center justify-center rounded-[14px] bg-ice text-teal-700 shadow-neu-sm lg:hidden"
      >
        <Icon name={open ? "x" : "list"} />
      </button>

      {open && (
        <div className="absolute inset-x-4 top-[calc(100%-4px)] flex flex-col gap-[6px] rounded-[22px] bg-ice p-[12px] shadow-neu-lg sm:inset-x-6 lg:hidden">
          {links.map((l) => (
            <Link key={l.label} href={l.href} className={cn(linkCls(l.href), "rounded-[12px] px-[12px] py-[11px] hover:bg-teal-50")}>
              {l.label}
            </Link>
          ))}
          <div className="mt-[6px] grid grid-cols-2 gap-[10px] border-t border-line pt-[12px]">
            <ButtonLink href="/login" variant="secondary">
              Sign in
            </ButtonLink>
            <ButtonLink href="/signup">Create account</ButtonLink>
          </div>
        </div>
      )}
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="flex w-full flex-wrap items-center justify-between gap-4 px-4 py-[28px] text-[13px] leading-normal text-muted sm:px-6 lg:px-[80px]">
      <p>© 2026 Research Project Manager</p>
      <div className="flex gap-[24px] font-medium">
        <Link href="/explore" className="hover:text-teal-700">Explore</Link>
        <Link href="/login" className="hover:text-teal-700">Sign in</Link>
        <Link href="#" className="hover:text-teal-700">Privacy</Link>
        <Link href="#" className="hover:text-teal-700">Contact</Link>
      </div>
    </footer>
  );
}

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-ice">
      <PublicNav />
      <div className="flex-1">{children}</div>
      <PublicFooter />
    </div>
  );
}
