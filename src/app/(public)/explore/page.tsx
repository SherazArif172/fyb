import { Suspense } from "react";
import { PublicLayout } from "@/components/public/PublicLayout";
import { ExploreView } from "./ExploreView";

export default function ExplorePage() {
  return (
    <PublicLayout>
      <div className="flex flex-col gap-[6px] px-6 pt-[24px] pb-[28px] leading-normal lg:px-[80px]">
        <h1 className="font-display text-[38px] font-semibold tracking-[-0.38px] text-teal-900">Explore published projects</h1>
        <p className="text-[15.5px] text-muted">Browse theses that have been completed and approved by their supervisors.</p>
      </div>
      <Suspense>
        <ExploreView />
      </Suspense>
    </PublicLayout>
  );
}
