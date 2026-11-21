import { PageBody } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { SettingsView } from "@/components/project/SettingsView";

export default function StudentSettingsPage() {
  return (
    <>
      <TopBar role="student" title="Profile & settings" subtitle="Manage your account, password and preferences" />
      <PageBody className="pt-[8px] pb-[48px]">
        <SettingsView
          user={{ name: "Ayesha Khan", initials: "AK", subtitle: "Student · MS Computer Science" }}
          tourHref="/student?tour=1&step=1"
          fields={[
            { label: "Full name", icon: "user", value: "Ayesha Khan" },
            { label: "Email (cannot be changed)", icon: "globe", value: "ayesha.khan@university.edu", readOnly: true },
            { label: "Phone", icon: "message", value: "+92 300 1234567" },
            { label: "Department", icon: "layers", value: "Computer Science" },
            { label: "Student ID", icon: "file", value: "MSCS-2025-041" },
            { label: "Programme", icon: "cap", value: "MS Computer Science" },
          ]}
        />
      </PageBody>
    </>
  );
}
