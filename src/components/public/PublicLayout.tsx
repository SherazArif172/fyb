"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

const links = [
  { label: "Explore projects", href: "/explore" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "For supervisors", href: "/#for-supervisors" },
];

/* Figma: Public nav — px80 py22 */
export function PublicNav() {
  const pathname = usePathname();
  return (
    <header className="flex w-full items-center justify-between gap-6 px-6 py-[22px] lg:px-[80px]">
      <Logo variant="inline" markSize={38} />
      <nav className="hidden items-center gap-[32px] md:flex">
        {links.map((l) => {
          const active = l.href === "/explore" && pathname.startsWith("/explore");
          return (
            <Link
              key={l.label}
              href={l.href}
              className={cn(
                "text-[14.5px] leading-normal whitespace-nowrap transition-colors hover:text-teal-700",
                active ? "font-semibold text-teal-700" : "font-medium text-muted",
              )}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
      <div className="flex items-center gap-[12px]">
        <ButtonLink href="/login" variant="secondary">
          Sign in
        </ButtonLink>
        <ButtonLink href="/signup" className="hidden sm:inline-flex">
          Create account
        </ButtonLink>
      </div>
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="flex w-full flex-wrap items-center justify-between gap-4 px-6 py-[28px] text-[13px] leading-normal text-muted lg:px-[80px]">
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
