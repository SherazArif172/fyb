import { Suspense } from "react";
import { PublicLayout } from "@/components/public/PublicLayout";
import { ExploreView } from "./ExploreView";

export default function ExplorePage() {
  return (
    <PublicLayout>
      <div className="flex flex-col gap-[6px] px-4 sm:px-6 pt-[12px] pb-[20px] sm:pt-[24px] sm:pb-[28px] leading-normal lg:px-[80px]">
        <h1 className="font-display text-[30px] leading-[36px] font-semibold sm:text-[38px] sm:leading-normal tracking-[-0.38px] text-teal-900">Explore published projects</h1>
        <p className="text-[15.5px] text-muted">Browse theses that have been completed and approved by their supervisors.</p>
      </div>
      <Suspense>
        <ExploreView />
      </Suspense>
    </PublicLayout>
  );
}
