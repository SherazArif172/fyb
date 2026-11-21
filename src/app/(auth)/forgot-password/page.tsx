"use client";

import { useRouter } from "next/navigation";
import { AuthBadge, AuthFooter, AuthHeader, AuthLayout, BackToSignIn } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Form";

export default function ForgotPasswordPage() {
  const router = useRouter();
  return (
    <AuthLayout>
      <form
        className="flex flex-col gap-[28px]"
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/check-email");
        }}
      >
        <BackToSignIn className="self-start" />
        <div className="flex flex-col gap-[20px]">
          <AuthBadge icon="lock" />
          <AuthHeader
            title="Forgot your password?"
            subtitle="Enter the email you signed up with and we'll send you a link to reset it."
          />
        </div>
        <Input label="Email address" type="email" icon="mail" placeholder="you@university.edu" autoComplete="email" />
        <Button type="submit" size="lg" className="w-full">
          Send reset link
        </Button>
        <AuthFooter text="Remembered it?" linkText="Sign in" href="/login" />
      </form>
    </AuthLayout>
  );
}
