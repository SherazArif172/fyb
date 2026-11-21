import { Sidebar } from "./Sidebar";
import type { Role } from "./nav";

/* 1440 frame = 264 sidebar + 1176 content */
export function AppShell({ role, children }: { role: Role; children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen bg-ice">
      <Sidebar role={role} />
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}

/* Standard page body padding under the top bar */
export function PageBody({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <main className={`flex flex-col gap-[28px] px-[40px] pb-[40px] ${className}`}>{children}</main>;
}
