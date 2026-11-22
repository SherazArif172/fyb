import Link from "next/link";
import { PublicLayout } from "@/components/public/PublicLayout";
import { ProjectCard } from "@/components/public/ProjectCard";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ProgressDial } from "@/components/ui/Progress";
import { publishedProjects } from "@/lib/data";

const popular = ["Machine Learning", "Computer Vision", "NLP", "Internet of Things", "Data Science"];

const steps: { icon: IconName; n: number; title: string; body: string }[] = [
  { icon: "folder", n: 1, title: "Create your project", body: "Add a title, research area and milestones. The admin assigns your supervisor." },
  { icon: "upload", n: 2, title: "Upload and get feedback", body: "Every upload becomes a new version. Your supervisor comments, approves or asks for changes." },
  { icon: "globe", n: 3, title: "Get published", body: "When every milestone is approved, your thesis can be published for others to find." },
];

function FloatingTile({ icon, className, iconClassName }: { icon: IconName; className: string; iconClassName?: string }) {
  return (
    <span className={`absolute flex size-[60px] items-center justify-center rounded-[20px] bg-ice shadow-neu-sm ${className}`}>
      <Icon name={icon} className={iconClassName ?? "text-teal-700"} />
    </span>
  );
}

export default function HomePage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="flex w-full flex-col items-center gap-[40px] px-4 sm:px-6 pt-[24px] pb-[56px] sm:pt-[56px] sm:pb-[72px] lg:gap-[60px] lg:flex-row lg:px-[80px]">
        <div className="flex min-w-0 flex-1 flex-col items-start gap-[24px]">
          <span className="inline-flex items-center gap-[8px] rounded-full bg-ice px-[14px] py-[7px] shadow-neu-sm">
            <Icon name="sparkles" className="text-peach-700" />
            <span className="text-[13px] leading-normal font-semibold text-peach-700">For graduate students and supervisors</span>
          </span>
          <h1 className="font-display w-full text-[40px] leading-[46px] font-normal tracking-[-0.8px] text-teal-900 lg:text-[58px] lg:leading-[64px] lg:tracking-[-1.16px]">
            Every thesis, from first draft to final approval.
          </h1>
          <p className="w-full text-[18px] leading-[28px] text-muted">
            Plan milestones, upload versions and get supervisor feedback in one place. Finished projects are published here for
            everyone to learn from.
          </p>

          <form action="/explore" className="flex w-full flex-wrap items-center gap-[10px] rounded-[22px] bg-ice p-[10px] shadow-neu">
            <label className="neu-inset flex h-[52px] w-full min-w-0 sm:w-auto sm:min-w-[220px] sm:flex-1 items-center gap-[10px] rounded-[14px] border border-field px-[16px] focus-within:border-2 focus-within:border-focus focus-within:px-[15px]">
              <Icon name="search" className="shrink-0 text-muted" />
              <input
                name="q"
                placeholder="Search projects by title, keyword or author"
                className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none"
              />
            </label>
            <label className="neu-inset relative flex h-[52px] flex-1 items-center gap-[10px] rounded-[14px] border border-field px-[16px] sm:flex-none">
              <select name="area" className="w-full appearance-none bg-transparent pr-[26px] text-[14px] font-medium text-ink outline-none">
                <option>All areas</option>
                {popular.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
              <Icon name="chevronDown" className="pointer-events-none absolute right-[16px] text-muted" />
            </label>
            <Button type="submit">Search</Button>
          </form>

          <div className="flex w-full flex-wrap items-center gap-[10px]">
            <span className="text-[13.5px] leading-normal font-medium text-muted">Popular:</span>
            {popular.map((p) => (
              <Link
                key={p}
                href={`/explore?q=${encodeURIComponent(p)}`}
                className="rounded-full bg-ice px-[14px] py-[7px] text-[13px] leading-normal font-medium text-teal-700 shadow-neu-sm transition hover:bg-teal-50"
              >
                {p}
              </Link>
            ))}
          </div>

          <div className="flex gap-[24px] leading-normal whitespace-nowrap sm:gap-[40px]">
            {[
              ["128", "research projects"],
              ["24", "supervisors"],
              ["25", "published theses"],
            ].map(([n, l]) => (
              <div key={l} className="flex flex-col">
                <span className="font-display text-[26px] font-semibold text-teal-900 sm:text-[30px]">{n}</span>
                <span className="text-[13px] text-muted">{l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden size-[440px] shrink-0 md:block">
          <ProgressDial value={75} size={360} label="thesis complete" className="absolute top-[40px] left-[40px]" />
          <FloatingTile icon="file" className="top-[60px] left-[350px]" />
          <FloatingTile icon="message" className="top-[330px] left-[10px]" />
          <FloatingTile icon="checkCircle" className="top-[320px] left-[360px]" iconClassName="text-peach-700" />
        </div>
      </section>

      {/* Featured */}
      <section className="flex w-full flex-col gap-[24px] px-4 sm:gap-[28px] sm:px-6 pb-[56px] sm:pb-[72px] lg:px-[80px]">
        <div className="flex w-full flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-[6px] leading-normal">
            <h2 className="font-display text-[28px] font-semibold tracking-[-0.34px] text-teal-900 sm:text-[34px]">Featured projects</h2>
            <p className="text-[15px] text-muted">Chosen by the admin from this year’s published theses</p>
          </div>
          <Link href="/explore" className="flex items-center gap-[6px] text-[14px] leading-normal font-semibold text-teal-700 hover:underline">
            View all published projects
            <Icon name="arrowRight" />
          </Link>
        </div>
        <div className="grid w-full grid-cols-1 items-start gap-[28px] md:grid-cols-2 lg:grid-cols-3">
          {publishedProjects.slice(0, 3).map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="flex w-full flex-col gap-[28px] px-4 sm:px-6 pb-[80px] lg:px-[80px]">
        <h2 className="font-display text-[28px] leading-normal font-semibold tracking-[-0.34px] text-teal-900 sm:text-[34px]">How it works</h2>
        <div className="grid w-full grid-cols-1 gap-[28px] md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="flex flex-col items-start gap-[16px] rounded-[24px] bg-ice p-[22px] shadow-neu sm:p-[28px]">
              <div className="flex w-full items-center justify-between">
                <span className="flex size-[52px] items-center justify-center rounded-[16.64px] bg-ice text-teal-700 shadow-neu-sm">
                  <Icon name={s.icon} />
                </span>
                <span className="font-display text-[40px] leading-normal font-semibold text-peach-300">{s.n}</span>
              </div>
              <h3 className="text-[18px] leading-normal font-semibold text-teal-900">{s.title}</h3>
              <p className="text-[14.5px] leading-[22px] text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
