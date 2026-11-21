"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { AuthBadge, AuthHeader, AuthLayout, BackToSignIn } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Form";
import { Icon } from "@/components/ui/Icon";

function Rule({ met, children }: { met: boolean; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-[10px]">
      <span
        className={cn(
          "flex size-[18px] shrink-0 items-center justify-center rounded-full",
          met ? "bg-teal-700 text-inverse shadow-neu-sm" : "neu-inset border-[1.5px] border-field",
        )}
      >
        {met && <Icon name="check" size={12} strokeWidth={2.5} />}
      </span>
      <span className={cn("text-[13.5px] leading-normal", met ? "text-ink" : "text-muted")}>{children}</span>
    </div>
  );
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const [pw, setPw] = useState("research2026");
  const [confirm, setConfirm] = useState("research2026");

  return (
    <AuthLayout>
      <form
        className="flex flex-col gap-[28px]"
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/login");
        }}
      >
        <div className="flex flex-col gap-[20px]">
          <AuthBadge icon="lock" />
          <AuthHeader title="Set a new password" subtitle="Choose a strong password you haven't used before." />
        </div>
        <div className="flex flex-col gap-[16px]">
          <Input label="New password" type="password" icon="lock" value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="new-password" />
          <Input
            label="Confirm new password"
            type="password"
            icon="lock"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            autoComplete="new-password"
          />
          <div className="neu-inset flex flex-col gap-[10px] rounded-[14px] px-[16px] py-[14px]">
            <Rule met={pw.length >= 8}>At least 8 characters</Rule>
            <Rule met={/\d/.test(pw)}>Contains a number</Rule>
            <Rule met={/[A-Z]/.test(pw)}>Contains an uppercase letter</Rule>
          </div>
        </div>
        <Button type="submit" size="lg" className="w-full">
          Reset password
        </Button>
        <div className="flex justify-center">
          <BackToSignIn />
        </div>
      </form>
    </AuthLayout>
  );
}
