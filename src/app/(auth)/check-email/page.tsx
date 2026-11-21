"use client";

import { useEffect, useState } from "react";
import { AuthBadge, AuthHeader, AuthLayout } from "@/components/auth/AuthLayout";
import { Button, ButtonLink } from "@/components/ui/Button";

export default function CheckEmailPage() {
  const [seconds, setSeconds] = useState(45);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  return (
    <AuthLayout>
      <div className="flex flex-col gap-[28px]">
        <div className="flex flex-col gap-[20px]">
          <AuthBadge icon="mail" />
          <AuthHeader
            title="Check your email"
            subtitle={
              <>
                We&apos;ve sent a password reset link to{" "}
                <span className="font-semibold text-ink">ayesha.khan@university.edu</span>. The link expires in 30 minutes.
              </>
            }
          />
        </div>
        <div className="flex flex-col gap-[12px]">
          <ButtonLink href="/login" size="lg" className="w-full">
            Back to sign in
          </ButtonLink>
          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={() => setSeconds(45)}
            disabled={seconds > 0}
          >
            Resend link
          </Button>
        </div>
        <p className="text-center text-[13.5px] leading-[20px] text-muted">
          Didn&apos;t get it? Check your spam folder
          {seconds > 0 ? `, or resend in 0:${String(seconds).padStart(2, "0")}.` : ", or resend now."}
        </p>
      </div>
    </AuthLayout>
  );
}
