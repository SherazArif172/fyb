"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { useTheme } from "@/components/theme/ThemeProvider";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { fieldClasses, Toggle } from "@/components/ui/Form";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHead } from "@/components/ui/Section";

type FieldDef = { label: string; icon: IconName; value: string; readOnly?: boolean; type?: string };

function Field({ label, icon, value, readOnly, type = "text" }: FieldDef) {
  return (
    <label className="flex min-w-0 flex-1 flex-col gap-[8px]">
      <span className="text-[14px] leading-normal font-medium text-ink">{label}</span>
      <span className={cn(fieldClasses(), "h-[48px] px-[16px] focus-within:px-[15px]")}>
        <Icon name={icon} className="shrink-0 text-muted" />
        <input
          type={type}
          defaultValue={value}
          readOnly={readOnly}
          className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none read-only:cursor-not-allowed"
        />
      </span>
    </label>
  );
}

const tabs: { id: string; label: string; icon: IconName }[] = [
  { id: "profile", label: "Profile", icon: "user" },
  { id: "password", label: "Password", icon: "settings" },
  { id: "notifications", label: "Notifications", icon: "bell" },
  { id: "appearance", label: "Appearance", icon: "moon" },
];

function strength(pw: string) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/\d/.test(pw)) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

export function SettingsView({
  user,
  fields,
  tourHref,
}: {
  user: { name: string; initials: string; subtitle: string };
  fields: FieldDef[];
  tourHref: string;
}) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState("profile");
  const [pw, setPw] = useState("Research2026");
  const s = strength(pw);
  const labels = ["Too short", "Weak", "Fair", "Strong · add a symbol to make it stronger", "Very strong"];

  const go = (id: string) => {
    setActive(id);
    document.getElementById(`settings-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const rows: FieldDef[][] = [];
  for (let i = 0; i < fields.length; i += 2) rows.push(fields.slice(i, i + 2));

  return (
    <div className="flex flex-col gap-[28px] lg:flex-row lg:items-start">
      <nav className="neu-inset flex w-full shrink-0 flex-col gap-[6px] rounded-[20px] p-[8px] lg:sticky lg:top-6 lg:w-[230px]">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => go(t.id)}
            className={cn(
              "flex w-full items-center gap-[10px] rounded-[14px] px-[14px] py-[12px] text-[14px] leading-normal transition",
              active === t.id ? "bg-ice font-semibold text-teal-700 shadow-neu-sm" : "font-medium text-muted hover:text-teal-700",
            )}
          >
            <Icon name={t.icon} />
            {t.label}
          </button>
        ))}
      </nav>

      <div className="flex min-w-0 flex-1 flex-col gap-[28px]">
        <Card id="settings-profile" className="flex flex-col gap-[22px] p-[28px]">
          <SectionHead title="Profile" />
          <div className="flex items-center gap-[20px]">
            <Avatar initials={user.initials} size="lg" />
            <div className="flex flex-col gap-[4px]">
              <span className="font-display text-[22px] leading-normal font-semibold text-teal-900">{user.name}</span>
              <span className="text-[13.5px] leading-normal text-muted">{user.subtitle}</span>
              <div className="flex gap-[10px] pt-[8px]">
                <Button variant="secondary" icon="upload">
                  Change photo
                </Button>
                <Button variant="ghost">Remove</Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[18px]">
            {rows.map((r, i) => (
              <div key={i} className="flex flex-col gap-[20px] md:flex-row">
                {r.map((f) => (
                  <Field key={f.label} {...f} />
                ))}
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <Button icon="check">Save changes</Button>
          </div>
        </Card>

        <div className="flex flex-col gap-[28px] xl:flex-row">
          <Card id="settings-password" className="flex min-w-0 flex-1 flex-col items-start gap-[18px] p-[28px]">
            <SectionHead title="Change password" />
            <div className="flex w-full flex-col gap-[18px]">
              <Field label="Current password" icon="settings" value="password12" type="password" />
              <label className="flex flex-col gap-[8px]">
                <span className="text-[14px] leading-normal font-medium text-ink">New password</span>
                <span className={cn(fieldClasses(), "h-[48px] px-[16px] focus-within:px-[15px]")}>
                  <Icon name="settings" className="shrink-0 text-muted" />
                  <input
                    type="password"
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none"
                  />
                </span>
              </label>
              <div className="flex flex-col gap-[6px]">
                <div className="flex gap-[6px]">
                  {[0, 1, 2, 3].map((i) => (
                    <span key={i} className={cn("h-[6px] flex-1 rounded-[3px]", i < s ? "bg-teal-500" : "bg-line")} />
                  ))}
                </div>
                <span className="text-[12.5px] leading-normal text-teal-700">{labels[s]}</span>
              </div>
              <Field label="Confirm new password" icon="settings" value="Research2026" type="password" />
            </div>
            <Button variant="secondary">Update password</Button>
          </Card>

          <Card id="settings-appearance" className="flex w-full shrink-0 flex-col gap-[18px] p-[28px] xl:w-[360px]">
            <SectionHead title="Appearance" />
            <div className="flex items-center justify-between gap-3 rounded-[16px] bg-ice px-[16px] py-[14px] shadow-neu-sm">
              <div className="flex items-center gap-[10px]">
                <Icon name="moon" className="text-teal-700" />
                <div className="flex flex-col gap-px leading-normal whitespace-nowrap">
                  <span className="text-[14px] font-semibold text-ink">Dark mode</span>
                  <span className="text-[12px] text-muted">Easier on the eyes at night</span>
                </div>
              </div>
              <Toggle on={theme === "dark"} onChange={(v) => setTheme(v ? "dark" : "light")} label="Dark mode" />
            </div>
            <div id="settings-notifications" className="flex items-center justify-between gap-3 rounded-[16px] bg-ice py-[14px] pl-[16px] shadow-neu-sm">
              <div className="flex items-center gap-[10px]">
                <Icon name="sparkles" className="text-teal-700" />
                <div className="flex flex-col gap-px leading-normal whitespace-nowrap">
                  <span className="text-[14px] font-semibold text-ink">Dashboard tour</span>
                  <span className="text-[12px] text-muted">Watch the 5-step walkthrough again</span>
                </div>
              </div>
              <Button variant="ghost" className="px-[14px]" onClick={() => router.push(tourHref)}>
                Start
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
