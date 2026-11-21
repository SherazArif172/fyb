import { Suspense } from "react";
import { ProjectsView } from "./ProjectsView";

export default function AdminProjectsPage() {
  return (
    <Suspense>
      <ProjectsView />
    </Suspense>
  );
}
