import type { IconName } from "@/components/ui/Icon";

export type Role = "student" | "supervisor" | "admin";

export type NavEntry = { label: string; href: string; icon: IconName; badge?: string };

export const navByRole: Record<Role, NavEntry[]> = {
  student: [
    { label: "Dashboard", href: "/student", icon: "dashboard" },
    { label: "My projects", href: "/student/projects", icon: "folder" },
    { label: "Notifications", href: "/student/notifications", icon: "bell", badge: "3" },
    { label: "Profile & settings", href: "/student/settings", icon: "settings" },
  ],
  supervisor: [
    { label: "Dashboard", href: "/supervisor", icon: "dashboard" },
    { label: "Assigned projects", href: "/supervisor/projects", icon: "folder" },
    { label: "Reviews", href: "/supervisor/reviews", icon: "inbox", badge: "3" },
    { label: "Notifications", href: "/supervisor/notifications", icon: "bell" },
    { label: "Profile & settings", href: "/supervisor/settings", icon: "settings" },
  ],
  admin: [
    { label: "Dashboard", href: "/admin", icon: "dashboard" },
    { label: "Projects", href: "/admin/projects", icon: "folder", badge: "7" },
    { label: "Users & roles", href: "/admin/users", icon: "users" },
    { label: "Publish requests", href: "/admin/publish-requests", icon: "send", badge: "2" },
    { label: "Featured", href: "/admin/featured", icon: "star" },
    { label: "Research areas", href: "/admin/research-areas", icon: "layers" },
    { label: "Settings", href: "/admin/settings", icon: "settings" },
  ],
};

export const userByRole: Record<Role, { name: string; initials: string; role: string; card: string; email: string }> = {
  student: {
    name: "Ayesha Khan",
    initials: "AK",
    role: "Student",
    card: "Student · MS CS",
    email: "ayesha.khan@university.edu",
  },
  supervisor: {
    name: "Dr. Imran Shah",
    initials: "IS",
    role: "Supervisor",
    card: "Supervisor",
    email: "imran.shah@university.edu",
  },
  admin: {
    name: "Sana Malik",
    initials: "SM",
    role: "Administrator",
    card: "Administrator",
    email: "sana.malik@university.edu",
  },
};
