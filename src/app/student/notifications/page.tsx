import { PageBody } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { NotificationsView, studentNotices } from "@/components/project/NotificationsView";

export default function StudentNotificationsPage() {
  return (
    <>
      <TopBar role="student" title="Notifications" subtitle="You have 3 unread notifications" />
      <PageBody className="pt-[8px] pb-[48px]">
        <NotificationsView
          notices={studentNotices}
          emailPrefs={[
            { label: "My supervisor posts feedback", on: true },
            { label: "A milestone is approved", on: true },
            { label: "A deadline is 2 days away", on: true },
            { label: "A supervisor is assigned", on: true },
            { label: "Weekly progress summary", on: false },
          ]}
        />
      </PageBody>
    </>
  );
}
