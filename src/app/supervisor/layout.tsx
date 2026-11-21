import { AppShell } from "@/components/layout/AppShell";

export default function SupervisorLayout({ children }: { children: React.ReactNode }) {
  return <AppShell role="supervisor">{children}</AppShell>;
}
