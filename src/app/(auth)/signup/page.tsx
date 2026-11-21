"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthFooter, AuthHeader, AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/Button";
import { Checkbox, Input } from "@/components/ui/Form";
import { Icon } from "@/components/ui/Icon";

export default function SignUpPage() {
  const router = useRouter();
  return (
    <AuthLayout cardPadding={32}>
      <form
        className="flex flex-col gap-[20px]"
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/student");
        }}
      >
        <AuthHeader title="Create your account" subtitle="Sign up to start tracking your thesis milestones." />

        <div className="neu-inset flex items-start gap-[10px] rounded-[14px] px-[14px] py-[12px]">
          <Icon name="info" className="shrink-0 text-peach-700" />
          <p className="flex-1 text-[13.5px] leading-[20px] text-peach-700">
            New accounts join as Students. Supervisor accounts are created by the admin.
          </p>
        </div>

        <div className="flex flex-col gap-[14px]">
          <Input label="Full name" icon="user" placeholder="e.g. Ayesha Khan" autoComplete="name" />
          <Input label="Email address" type="email" icon="mail" placeholder="you@university.edu" autoComplete="email" />
          <Input
            label="Password"
            type="password"
            icon="lock"
            placeholder="Create a password"
            hint="At least 8 characters, including one number."
            autoComplete="new-password"
          />
          <Input label="Confirm password" type="password" icon="lock" placeholder="Re-enter your password" autoComplete="new-password" />
        </div>

        <div className="flex items-center gap-[4px]">
          <Checkbox label="I agree to the" defaultChecked />
          <Link href="#" className="text-[14px] leading-normal font-semibold text-teal-700 hover:underline">
            Terms &amp; Privacy Policy
          </Link>
        </div>

        <Button type="submit" size="lg" className="w-full">
          Create account
        </Button>
        <AuthFooter text="Already have an account?" linkText="Sign in" href="/login" />
      </form>
    </AuthLayout>
  );
}
