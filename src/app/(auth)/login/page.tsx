"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthFooter, AuthHeader, AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/Button";
import { Checkbox, Input } from "@/components/ui/Form";

export default function LoginPage() {
  const router = useRouter();
  return (
    <AuthLayout>
      <form
        className="flex flex-col gap-[22px] lg:gap-[28px]"
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/student");
        }}
      >
        <AuthHeader
          title="Welcome back"
          subtitle={
            <>
              <span className="hidden lg:inline">Sign in to continue working on your research.</span>
              <span className="lg:hidden">Sign in to continue your research.</span>
            </>
          }
        />
        <div className="flex flex-col gap-[16px] lg:gap-[18px]">
          <Input label="Email address" type="email" icon="mail" placeholder="you@university.edu" autoComplete="email" />
          <Input label="Password" type="password" icon="lock" placeholder="Enter your password" autoComplete="current-password" />
        </div>
        <div className="flex items-center justify-between">
          <Checkbox label="Remember me" />
          <Link href="/forgot-password" className="text-[14px] leading-normal font-semibold text-teal-700 hover:underline">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" size="lg" className="h-[48px] w-full lg:h-[50px]">
          Sign in
        </Button>
        <AuthFooter text="Don't have an account?" linkText="Create one" href="/signup" />
      </form>
    </AuthLayout>
  );
}
