import Link from "next/link";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { ProgressDial } from "@/components/ui/Progress";

/* Figma: Brand Panel (3:71) — 620px, px56 py48 */
function BrandPanel({ headline = "See exactly how far your research has come." }: { headline?: string }) {
  return (
    <aside className="sticky top-0 hidden h-screen min-h-[900px] w-[620px] shrink-0 flex-col bg-ice px-[56px] py-[48px] lg:flex">
      <Logo variant="inline" markSize={40} />
      <div className="flex flex-1 flex-col justify-center gap-[48px]">
        <div className="pl-[40px]">
          <div className="relative size-[320px]">
            <ProgressDial value={75} size={320} label="thesis complete" />
            <span className="absolute top-[30px] left-[300px] flex size-[56px] items-center justify-center rounded-[18px] bg-ice text-teal-700 shadow-[5px_5px_12px_0_var(--shadow-drop),-5px_-5px_12px_0_var(--shadow-highlight)]">
              <Icon name="file" size={24} />
            </span>
            <span className="absolute top-[236px] left-[-36px] flex size-[56px] items-center justify-center rounded-[18px] bg-ice text-teal-700 shadow-[5px_5px_12px_0_var(--shadow-drop),-5px_-5px_12px_0_var(--shadow-highlight)]">
              <Icon name="message" size={24} />
            </span>
          </div>
        </div>
        <p className="font-display w-[460px] text-[40px] leading-[48px] font-normal tracking-[-0.4px] text-teal-900">{headline}</p>
      </div>
    </aside>
  );
}

/* Mobile hero (Figma: Auth / Login — Mobile, 4:538) */
function MobileHero() {
  return (
    <div className="relative -mb-[28px] h-[268px] w-full shrink-0 lg:hidden">
      <div className="flex flex-col gap-[22px] px-[24px] pt-[60px]">
        <Link href="/" className="flex items-center gap-[10px]">
          <span className="flex size-[34px] items-center justify-center rounded-[9px] bg-peach-300 text-teal-900 shadow-[3px_3px_8px_0_var(--shadow-drop),-3px_-3px_8px_0_var(--shadow-highlight)] dark:text-on-accent">
            <Icon name="cap" size={18} strokeWidth={1.8} />
          </span>
          <span className="text-[15px] leading-normal font-semibold text-teal-900">Research Project Manager</span>
        </Link>
        <p className="font-display w-[215px] text-[24px] leading-[30px] tracking-[-0.24px] text-teal-900">
          See how far your research has come.
        </p>
      </div>
      <ProgressDial value={75} size={104} className="absolute top-[122px] right-[24px]" />
    </div>
  );
}

export function GuestLink({ className }: { className?: string }) {
  return (
    <p className={cn("flex items-center gap-[6px] text-[14px] leading-normal whitespace-nowrap", className)}>
      <span className="text-muted">Just browsing?</span>
      <Link href="/explore" className="font-semibold text-teal-700 hover:underline">
        Explore published projects →
      </Link>
    </p>
  );
}

export function AuthLayout({
  children,
  cardPadding = 44,
}: {
  children: React.ReactNode;
  cardPadding?: 44 | 32;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-ice lg:flex-row">
      <BrandPanel />
      <MobileHero />

      {/* Desktop form side */}
      <section className="relative hidden flex-1 items-center justify-center px-6 py-[70px] lg:flex">
        <GuestLink className="absolute top-[40px] right-[48px]" />
        <div className="rounded-[30px] bg-ice shadow-neu-lg" style={{ padding: cardPadding }}>
          <div className="w-[400px]">{children}</div>
        </div>
      </section>

      {/* Mobile bottom sheet */}
      <section className="relative flex flex-1 flex-col rounded-t-[30px] bg-ice px-[24px] pt-[28px] pb-[24px] shadow-[0_-2px_6px_0_var(--shadow-highlight),0_-10px_24px_0_var(--shadow-drop)] lg:hidden">
        {children}
        <Link href="/explore" className="mt-[22px] text-center text-[14px] leading-normal font-semibold text-teal-700">
          Explore published projects →
        </Link>
      </section>
    </div>
  );
}

export function AuthHeader({ title, subtitle }: { title: string; subtitle: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[6px] lg:gap-[10px]">
      <h1 className="font-display text-[26px] leading-[32px] font-semibold tracking-[-0.26px] text-ink lg:text-[32px] lg:leading-[40px] lg:tracking-[-0.32px]">
        {title}
      </h1>
      <p className="text-[14.5px] leading-normal text-muted lg:text-[15px] lg:leading-[23px]">{subtitle}</p>
    </div>
  );
}

/* 56px raised badge with 28px icon (forgot / check email / reset) */
export function AuthBadge({ icon }: { icon: IconName }) {
  return (
    <span className="flex size-[56px] items-center justify-center rounded-[18px] bg-ice text-teal-700 shadow-neu-sm">
      <Icon name={icon} size={28} />
    </span>
  );
}

export function BackToSignIn({ className }: { className?: string }) {
  return (
    <Link href="/login" className={cn("inline-flex items-center gap-[8px] text-[14px] leading-normal font-semibold text-teal-700", className)}>
      <Icon name="arrowLeft" />
      Back to sign in
    </Link>
  );
}

export function AuthFooter({ text, linkText, href }: { text: string; linkText: string; href: string }) {
  return (
    <p className="flex justify-center gap-[4px] text-[14px] leading-normal whitespace-nowrap">
      <span className="text-muted">{text}</span>
      <Link href={href} className="font-semibold text-teal-700 hover:underline">
        {linkText}
      </Link>
    </p>
  );
}
