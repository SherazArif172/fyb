import { PageBody } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { SettingsView } from "@/components/project/SettingsView";

/* Not a separate Figma frame — reuses the student Profile & settings layout (S-08) */
export default function SupervisorSettingsPage() {
  return (
    <>
      <TopBar role="supervisor" title="Profile & settings" subtitle="Manage your account, password and preferences" />
      <PageBody className="pt-[8px] pb-[48px]">
        <SettingsView
          user={{ name: "Dr. Imran Shah", initials: "IS", subtitle: "Supervisor · Computer Science" }}
          tourHref="/supervisor"
          fields={[
            { label: "Full name", icon: "user", value: "Dr. Imran Shah" },
            { label: "Email (cannot be changed)", icon: "globe", value: "imran.shah@university.edu", readOnly: true },
            { label: "Phone", icon: "message", value: "+92 321 7654321" },
            { label: "Department", icon: "layers", value: "Computer Science" },
            { label: "Designation", icon: "cap", value: "Associate Professor" },
            { label: "Research interests", icon: "book", value: "Machine Learning, Data Science" },
          ]}
        />
      </PageBody>
    </>
  );
}
