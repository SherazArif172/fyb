import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicLayout } from "@/components/public/PublicLayout";
import { AreaTag } from "@/components/public/ProjectCard";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { ProgressDial } from "@/components/ui/Progress";
import { StatusChip } from "@/components/ui/StatusChip";
import { getProject, publishedProjects } from "@/lib/data";

export function generateStaticParams() {
  return publishedProjects.map((p) => ({ slug: p.slug }));
}

const milestones = [
  { name: "Proposal", date: "Approved 2 Feb 2026" },
  { name: "Literature Review", date: "Approved 15 Mar 2026" },
  { name: "Implementation", date: "Approved 10 May 2026" },
  { name: "Final Report", date: "Approved 5 Jun 2026" },
];

const related = [
  { title: "Smart Contracts for Land Records", meta: "Blockchain · 2025" },
  { title: "Fake News Detection in Urdu Media", meta: "NLP · 2026", slug: "fake-news-detection-urdu" },
];

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] leading-normal font-semibold tracking-[0.88px] text-placeholder">{children}</p>;
}

function Section({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`flex w-full flex-col items-start rounded-[24px] bg-ice shadow-neu ${className}`}>
      <h2 className="text-[17px] leading-normal font-semibold text-teal-900">{title}</h2>
      {children}
    </section>
  );
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const initials = (name: string) =>
    name
      .replace("Dr. ", "")
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2);

  return (
    <PublicLayout>
      <div className="flex flex-col gap-[28px] px-6 pt-[12px] pb-[72px] lg:px-[80px]">
        <Link href="/explore" className="inline-flex items-center gap-[8px] self-start text-[14px] leading-normal font-semibold text-teal-700">
          <Icon name="arrowLeft" />
          Back to projects
        </Link>

        {/* Hero */}
        <section className="flex w-full flex-col items-start gap-[20px] rounded-[24px] bg-ice p-[24px] shadow-neu-lg lg:p-[36px]">
          <div className="relative h-[220px] w-full overflow-hidden rounded-[20px] lg:h-[300px]">
            <Image src={project.cover} alt="" fill priority sizes="1280px" className="object-cover" />
          </div>
          <div className="flex flex-wrap items-center gap-[8px]">
            <AreaTag>{project.area}</AreaTag>
            <StatusChip status="Published" />
            <span className="text-[13px] leading-normal text-muted">Published 12 Jun 2026</span>
          </div>
          <h1 className="font-display w-full text-[32px] leading-[38px] font-semibold tracking-[-0.63px] text-teal-900 lg:text-[42px] lg:leading-[48px]">
            {project.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-[40px] gap-y-[20px]">
            <div className="flex flex-col gap-[8px]">
              <Label>AUTHOR</Label>
              <div className="flex items-center gap-[10px]">
                <Avatar initials={initials(project.author)} />
                <div className="flex flex-col leading-normal whitespace-nowrap">
                  <span className="text-[13.5px] font-semibold text-ink">{project.author}</span>
                  <span className="text-[12px] text-muted">MS Computer Science</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[8px]">
              <Label>SUPERVISOR</Label>
              <div className="flex items-center gap-[10px]">
                <Avatar initials={initials(project.supervisor)} />
                <div className="flex flex-col leading-normal whitespace-nowrap">
                  <span className="text-[13.5px] font-semibold text-ink">{project.supervisor}</span>
                  <span className="text-[12px] text-muted">Computer Science</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[8px]">
              <Label>KEYWORDS</Label>
              <div className="flex flex-wrap gap-[8px]">
                {["blockchain", "hyperledger", "credentials", "verification"].map((k) => (
                  <AreaTag key={k}>{k}</AreaTag>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Columns */}
        <div className="flex flex-col gap-[28px] lg:flex-row lg:items-start">
          <div className="flex min-w-0 flex-1 flex-col gap-[28px]">
            <Section title="Abstract" className="gap-[14px] p-[28px]">
              <p className="text-[15px] leading-[25px] text-ink">
                Fake degrees are a growing problem for employers in Pakistan. This project builds a permissioned blockchain on
                Hyperledger Fabric where universities issue signed degree records and employers verify them in seconds by
                scanning a QR code. A pilot with 1,200 records showed verification times under two seconds and no successful
                tampering in penetration tests.
              </p>
            </Section>

            <Section title="Milestone timeline" className="gap-[18px] p-[28px]">
              <ol className="flex w-full flex-col">
                {milestones.map((m, i) => (
                  <li key={m.name} className="flex w-full items-start gap-[18px]">
                    <div className="flex flex-col items-center">
                      <span className="flex size-[30px] items-center justify-center rounded-full bg-teal-700 text-inverse shadow-neu-sm">
                        <Icon name="check" size={14} strokeWidth={2.2} />
                      </span>
                      {i < milestones.length - 1 && <span className="h-[34px] w-[2px] bg-teal-200" />}
                    </div>
                    <div className="flex min-w-0 flex-1 items-start justify-between pt-[4px]">
                      <div className="flex flex-col gap-[2px] leading-normal">
                        <span className="text-[15px] font-semibold text-ink">{m.name}</span>
                        <span className="text-[13px] text-muted">{m.date}</span>
                      </div>
                      <StatusChip status="Completed" />
                    </div>
                  </li>
                ))}
              </ol>
            </Section>
          </div>

          <div className="flex w-full shrink-0 flex-col gap-[28px] lg:w-[380px]">
            <Section title="Project at a glance" className="gap-[18px] p-[28px]">
              <div className="flex w-full justify-center">
                <ProgressDial value={100} size={200} label="complete" />
              </div>
              {[
                ["Duration", "5 months"],
                ["Milestones", "4 of 4 approved"],
                ["Research area", project.area],
                ["Year", String(project.year)],
              ].map(([k, v]) => (
                <div key={k} className="flex w-full items-center justify-between text-[13.5px] leading-normal">
                  <span className="text-muted">{k}</span>
                  <span className="font-semibold text-ink">{v}</span>
                </div>
              ))}
            </Section>

            <Section title="Related projects" className="gap-[14px] p-[24px]">
              {related.map((r) => (
                <Link
                  key={r.title}
                  href={r.slug ? `/explore/${r.slug}` : "/explore"}
                  className="flex w-full items-center gap-[12px] rounded-[16px] bg-ice px-[14px] py-[12px] shadow-neu-sm transition hover:bg-teal-50"
                >
                  <span className="flex size-[38px] shrink-0 items-center justify-center rounded-[12.16px] bg-ice text-teal-700 shadow-neu-sm">
                    <Icon name="book" />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col gap-[2px] leading-normal">
                    <span className="text-[13.5px] font-semibold text-ink">{r.title}</span>
                    <span className="text-[12px] text-muted">{r.meta}</span>
                  </span>
                </Link>
              ))}
            </Section>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
