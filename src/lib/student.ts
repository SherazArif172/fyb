import type { Status } from "@/components/ui/StatusChip";

export type StudentProject = {
  id: string;
  title: string;
  summary: string;
  area: string;
  supervisor?: { name: string; initials: string };
  progress: number;
  milestones: string;
  updated: string;
  status: Status;
};

export const studentProjects: StudentProject[] = [
  {
    id: "crop-yield",
    title: "Crop Yield Prediction using Machine Learning",
    summary: "Predicting wheat yield in Punjab districts from weather, soil and satellite data using ensemble models.",
    area: "Machine Learning",
    supervisor: { name: "Dr. Imran Shah", initials: "IS" },
    progress: 50,
    milestones: "2/4 milestones",
    updated: "Updated 2h ago",
    status: "In Progress",
  },
  {
    id: "urdu-sentiment",
    title: "Urdu Sentiment Analysis on Social Media",
    summary: "Classifying the sentiment of Urdu and Roman-Urdu tweets with transformer models.",
    area: "Natural Language Processing",
    progress: 0,
    milestones: "0/4 milestones",
    updated: "Created 2 days ago",
    status: "Waiting for Supervisor",
  },
  {
    id: "blockchain-degree",
    title: "Blockchain-based Degree Verification",
    summary: "A tamper-proof system for employers to verify university degrees on a permissioned chain.",
    area: "Blockchain",
    supervisor: { name: "Dr. Farah Naz", initials: "FN" },
    progress: 100,
    milestones: "4/4 milestones",
    updated: "Published 12 Jun",
    status: "Published",
  },
];
