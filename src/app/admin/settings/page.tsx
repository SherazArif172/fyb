import { PageBody } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { SettingsView } from "@/components/project/SettingsView";

/* Not a separate Figma frame — reuses the Profile & settings layout (S-08) */
export default function AdminSettingsPage() {
  return (
    <>
      <TopBar role="admin" title="Settings" subtitle="Manage your account, password and preferences" />
      <PageBody className="pt-[8px] pb-[48px]">
        <SettingsView
          user={{ name: "Sana Malik", initials: "SM", subtitle: "Administrator · Graduate Office" }}
          tourHref="/admin"
          fields={[
            { label: "Full name", icon: "user", value: "Sana Malik" },
            { label: "Email (cannot be changed)", icon: "globe", value: "sana.malik@university.edu", readOnly: true },
            { label: "Phone", icon: "message", value: "+92 42 111 222 333" },
            { label: "Office", icon: "layers", value: "Graduate Office" },
          ]}
        />
      </PageBody>
    </>
  );
}
