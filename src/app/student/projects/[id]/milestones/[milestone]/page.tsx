import { Suspense } from "react";
import { MilestoneView } from "./MilestoneView";

export default function MilestonePage() {
  return (
    <Suspense>
      <MilestoneView />
    </Suspense>
  );
}
