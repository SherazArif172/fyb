import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import type { PublishedProject } from "@/lib/data";
import { Icon } from "@/components/ui/Icon";

/* Inset pill tag (research area) */
export function AreaTag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "neu-inset inline-flex shrink-0 items-center rounded-full px-[10px] py-[4px] text-[12px] leading-normal font-semibold whitespace-nowrap text-teal-700",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* Figma: Project card — p18 r24 gap14, cover 140px r16 */
export function ProjectCard({ project, className }: { project: PublishedProject; className?: string }) {
  return (
    <Link
      href={`/explore/${project.slug}`}
      className={cn(
        "group flex flex-col items-start gap-[14px] rounded-[24px] bg-ice p-[18px] shadow-neu transition-transform hover:-translate-y-0.5",
        className,
      )}
    >
      <div className="relative h-[140px] w-full overflow-hidden rounded-[16px]">
        <Image src={project.cover} alt="" fill sizes="(min-width: 1024px) 400px, 100vw" className="object-cover" />
      </div>
      <AreaTag>{project.area}</AreaTag>
      <h3 className="font-display w-full text-[18px] leading-[24px] font-semibold text-teal-900">{project.title}</h3>
      <p className="w-full text-[13.5px] leading-[20px] text-muted">{project.summary}</p>
      <div className="flex w-full items-center justify-between">
        <p className="text-[12.5px] leading-normal text-muted">
          {project.author} · {project.year}
        </p>
        <span className="flex items-center gap-[4px] text-[13px] leading-normal font-semibold text-teal-700">
          View details
          <Icon name="arrowRight" className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
