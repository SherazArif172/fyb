import { PageBody } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { Avatar } from "@/components/ui/Avatar";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusChip } from "@/components/ui/StatusChip";
import { Cell, TableHead } from "@/components/ui/Table";

/* Not a separate Figma frame — composed from the dashboard's "Waiting for your review" table */
const queue = [
  { initials: "AK", name: "Ayesha Khan", project: "Crop Yield Prediction using ML", milestone: "Implementation", meta: "2 days ago · v3" },
  { initials: "BA", name: "Bilal Ahmed", project: "Smart Irrigation with IoT Sensors", milestone: "Final Report", meta: "5h ago · v1" },
  { initials: "ZA", name: "Zainab Ali", project: "Traffic Flow Prediction with GNNs", milestone: "Literature Review", meta: "Yesterday · v2" },
];

export default function ReviewsPage() {
  return (
    <>
      <TopBar role="supervisor" title="Reviews" subtitle="3 submissions are waiting for your review" />
      <PageBody className="pt-[8px] pb-[48px]">
        <Card className="flex flex-col p-[24px]">
          <TableHead cols={[{ label: "STUDENT", w: 200 }, { label: "PROJECT" }, { label: "MILESTONE", w: 170 }, { label: "STATUS", w: 150 }, { label: "", w: 96 }]} />
          {queue.map((w) => (
            <div key={w.name} className="flex items-center gap-[16px] border-b border-line px-[16px] py-[12px]">
              <Cell w={200} className="gap-[10px]">
                <Avatar initials={w.initials} />
                <span className="text-[13.5px] leading-normal font-semibold text-ink">{w.name}</span>
              </Cell>
              <Cell className="text-[13.5px] leading-normal font-medium text-ink">{w.project}</Cell>
              <Cell w={170} className="flex-col items-start gap-[2px] leading-normal whitespace-nowrap">
                <span className="text-[13.5px] text-ink">{w.milestone}</span>
                <span className="text-[12px] font-medium text-peach-700">{w.meta}</span>
              </Cell>
              <Cell w={150}>
                <StatusChip status="Under Review" />
              </Cell>
              <Cell w={96}>
                <ButtonLink href="/supervisor/reviews/crop-yield-implementation">Review</ButtonLink>
              </Cell>
            </div>
          ))}
        </Card>
      </PageBody>
    </>
  );
}
