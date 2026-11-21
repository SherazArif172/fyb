import { PageBody } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { NotificationsView, type Notice } from "@/components/project/NotificationsView";

/* Not a separate Figma frame — reuses the student Notifications layout (S-07) */
const notices: Notice[] = [
  { id: 1, group: "TODAY", kind: "other", icon: "upload", tone: "peach", title: "New submission to review", body: "Ayesha Khan uploaded v3 of Implementation for Crop Yield Prediction.", when: "2h ago", unread: true },
  { id: 2, group: "TODAY", kind: "other", icon: "upload", tone: "peach", title: "New submission to review", body: "Bilal Ahmed uploaded v1 of Final Report for Smart Irrigation with IoT Sensors.", when: "5h ago", unread: true },
  { id: 3, group: "YESTERDAY", kind: "deadline", icon: "alert", tone: "danger", title: "Milestone overdue", body: "Hamza Raza’s Implementation for Arabic Handwriting OCR is 6 days overdue.", when: "Yesterday", unread: true },
  { id: 4, group: "YESTERDAY", kind: "feedback", icon: "message", title: "New reply", body: "Zainab Ali replied to your comment on Literature Review.", when: "Yesterday" },
  { id: 5, group: "EARLIER", kind: "approval", icon: "userCheck", title: "New project assigned", body: "The admin assigned Traffic Flow Prediction with GNNs to you.", when: "3 Sep" },
];

export default function SupervisorNotificationsPage() {
  return (
    <>
      <TopBar role="supervisor" title="Notifications" subtitle="You have 3 unread notifications" />
      <PageBody className="pt-[8px] pb-[48px]">
        <NotificationsView
          notices={notices}
          total={5}
          emailPrefs={[
            { label: "A student uploads a new version", on: true },
            { label: "A student replies to my comment", on: true },
            { label: "A milestone becomes overdue", on: true },
            { label: "A project is assigned to me", on: true },
            { label: "Weekly progress summary", on: false },
          ]}
        />
      </PageBody>
    </>
  );
}
