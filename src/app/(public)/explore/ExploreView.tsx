"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { publishedProjects, researchAreas } from "@/lib/data";
import { AreaTag, ProjectCard } from "@/components/public/ProjectCard";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Form";
import { Icon } from "@/components/ui/Icon";
import { Segmented } from "@/components/ui/Segmented";

const years = ["All", "2026", "2025", "2024"] as const;
type Year = (typeof years)[number];

function EmptyState({ onClear, onTry }: { onClear: () => void; onTry: (q: string) => void }) {
  return (
    <div className="flex w-full flex-col items-center gap-[16px] rounded-[24px] bg-ice px-5 py-10 text-center shadow-neu sm:p-[56px]">
      <div className="neu-inset relative size-[140px] rounded-full">
        <span className="absolute top-[38px] left-[38px] flex size-[64px] items-center justify-center rounded-full bg-ice text-peach-700 shadow-neu-sm">
          <Icon name="search" />
        </span>
      </div>
      <h2 className="font-display text-[28px] leading-normal font-semibold text-teal-900">No results found</h2>
      <p className="max-w-[440px] text-center text-[15px] leading-[23px] text-muted">
        We couldn’t find any published projects that match your search. Try fewer or different keywords, or clear the filters.
      </p>
      <div className="flex flex-wrap justify-center gap-[12px]">
        <Button variant="secondary" icon="x" onClick={onClear}>
          Clear filters
        </Button>
        <Button icon="arrowRight" onClick={onClear}>
          Browse all projects
        </Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-[10px]">
        <span className="text-[13.5px] leading-normal font-medium text-muted">Try:</span>
        {["blockchain", "agriculture", "crop yield"].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => onTry(t)}
            className="rounded-full bg-ice px-[14px] py-[7px] text-[13px] leading-normal font-medium text-teal-700 shadow-neu-sm hover:bg-teal-50"
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

function ProjectRow({ project }: { project: (typeof publishedProjects)[number] }) {
  return (
    <Link
      href={`/explore/${project.slug}`}
      className="group flex w-full items-center gap-[14px] rounded-[24px] bg-ice p-[14px] shadow-neu sm:gap-[20px] sm:p-[16px] transition-transform hover:-translate-y-0.5"
    >
      <div className="relative h-[80px] w-[96px] shrink-0 overflow-hidden rounded-[14px] sm:h-[96px] sm:w-[150px] sm:rounded-[16px]">
        <Image src={project.cover} alt="" fill sizes="150px" className="object-cover" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col items-start gap-[8px]">
        <AreaTag>{project.area}</AreaTag>
        <h3 className="font-display text-[18px] leading-[24px] font-semibold text-teal-900">{project.title}</h3>
        <p className="text-[13.5px] leading-[20px] text-muted">{project.summary}</p>
      </div>
      <div className="hidden shrink-0 flex-col items-end gap-[10px] sm:flex">
        <p className="text-[12.5px] leading-normal text-muted">
          {project.author} · {project.year}
        </p>
        <span className="flex items-center gap-[4px] text-[13px] leading-normal font-semibold text-teal-700">
          View details <Icon name="arrowRight" />
        </span>
      </div>
    </Link>
  );
}

export function ExploreView() {
  const params = useSearchParams();
  const initialArea = params.get("area");
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [areas, setAreas] = useState<string[]>(initialArea && initialArea !== "All areas" ? [initialArea] : []);
  const [year, setYear] = useState<Year>("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return publishedProjects.filter((p) => {
      const text = `${p.title} ${p.summary} ${p.author} ${p.area}`.toLowerCase();
      const matchesQuery = !q || q.split(/\s+/).every((w) => text.includes(w));
      const matchesArea = areas.length === 0 || areas.includes(p.area);
      const matchesYear = year === "All" || String(p.year) === year;
      return matchesQuery && matchesArea && matchesYear;
    });
  }, [query, areas, year]);

  const clear = () => {
    setQuery("");
    setAreas([]);
    setYear("All");
  };

  const summary = (
    <>
      {results.length} result{results.length === 1 ? "" : "s"}
      {query && <> for “{query}”</>}
      {areas.length > 0 && <> in {areas.join(", ")}</>}
    </>
  );

  return (
    <div className="flex flex-col gap-[24px] px-4 sm:px-6 pb-[56px] sm:pb-[72px] lg:gap-[32px] lg:flex-row lg:items-start lg:px-[80px]">
      {/* Filters */}
      <aside className="flex w-full shrink-0 flex-col gap-[20px] rounded-[24px] bg-ice p-[20px] shadow-neu sm:p-[24px] lg:w-[280px]">
        <div className="flex items-center justify-between leading-normal font-semibold">
          {/* the heading toggles the panel below lg */}
          <button
            type="button"
            onClick={() => setFiltersOpen((o) => !o)}
            aria-expanded={filtersOpen}
            className="flex items-center gap-[8px] text-[17px] text-teal-900 lg:pointer-events-none"
          >
            <Icon name="filter" className="text-teal-700 lg:hidden" />
            Filters
            {(areas.length > 0 || year !== "All") && (
              <span className="rounded-full bg-peach-500 px-[8px] py-[1px] text-[11.5px] text-inverse lg:hidden">
                {areas.length + (year !== "All" ? 1 : 0)}
              </span>
            )}
            <Icon name="chevronDown" className={cn("text-muted transition-transform lg:hidden", filtersOpen && "rotate-180")} />
          </button>
          <button type="button" onClick={clear} className="text-[13px] text-teal-700 hover:underline">
            Clear all
          </button>
        </div>
        <div className={cn("flex-col gap-[20px] lg:flex", filtersOpen ? "flex" : "hidden")}>
        <p className="text-[11px] leading-normal font-semibold tracking-[0.88px] text-placeholder">RESEARCH AREA</p>
        {researchAreas.map((a) => (
          <div key={a.name} className="flex items-center justify-between">
            <Checkbox
              label={a.name}
              checked={areas.includes(a.name)}
              onChange={(v) => setAreas((prev) => (v ? [...prev, a.name] : prev.filter((x) => x !== a.name)))}
            />
            <span className="text-[12.5px] leading-normal text-muted">{a.count}</span>
          </div>
        ))}
        <p className="text-[11px] leading-normal font-semibold tracking-[0.88px] text-placeholder">YEAR</p>
        <Segmented options={years} value={year} onChange={setYear} tabClassName="px-[4px]" />
        <p className="text-[11px] leading-normal font-semibold tracking-[0.88px] text-placeholder">SUPERVISOR</p>
        <label className="neu-inset relative flex h-[46px] items-center rounded-[14px] border border-field px-[16px]">
          <select className="w-full appearance-none bg-transparent text-[14px] font-medium text-ink outline-none">
            <option>Any supervisor</option>
            <option>Dr. Imran Shah</option>
            <option>Dr. Fatima Noor</option>
            <option>Dr. Ahmed Raza</option>
          </select>
          <Icon name="chevronDown" className="pointer-events-none absolute right-[16px] text-muted" />
        </label>
        </div>
      </aside>

      {/* Results */}
      <section className="flex min-w-0 flex-1 flex-col gap-[24px]">
        <div className="flex flex-wrap items-center gap-[14px]">
          <label className="neu-inset flex h-[50px] w-full min-w-0 sm:w-auto sm:min-w-[240px] sm:flex-1 items-center gap-[10px] rounded-[14px] border border-field px-[16px] focus-within:border-2 focus-within:border-focus focus-within:px-[15px]">
            <Icon name="search" className="shrink-0 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects by title, keyword or author"
              className="h-full min-w-0 flex-1 bg-transparent text-[15px] font-medium text-ink outline-none placeholder:font-normal"
            />
            {query && (
              <button type="button" aria-label="Clear search" onClick={() => setQuery("")} className="text-muted hover:text-teal-700">
                <Icon name="x" />
              </button>
            )}
          </label>
          <label className="neu-inset relative flex h-[50px] flex-1 items-center rounded-[14px] border border-field px-[16px] sm:flex-none">
            <select className="w-full appearance-none bg-transparent pr-[30px] text-[13.5px] font-medium text-ink outline-none">
              <option>Newest first</option>
              <option>Oldest first</option>
              <option>A–Z</option>
            </select>
            <Icon name="chevronDown" className="pointer-events-none absolute right-[16px] text-muted" />
          </label>
          <div className="neu-inset flex gap-[4px] rounded-[14px] p-[5px]">
            {(["grid", "list"] as const).map((v) => (
              <button
                key={v}
                type="button"
                aria-label={`${v} view`}
                onClick={() => setView(v)}
                className={cn(
                  "flex size-[38px] items-center justify-center rounded-[10px] transition",
                  view === v ? "bg-ice text-teal-700 shadow-neu-sm" : "text-muted",
                )}
              >
                <Icon name={v} />
              </button>
            ))}
          </div>
        </div>

        <p className="text-[14px] leading-normal font-medium text-muted">{summary}</p>

        {results.length === 0 ? (
          <EmptyState onClear={clear} onTry={(t) => { setAreas([]); setYear("All"); setQuery(t); }} />
        ) : (
          <>
            {view === "grid" ? (
              <div className="grid grid-cols-1 items-start gap-[24px] sm:grid-cols-2 xl:grid-cols-3">
                {results.map((p) => (
                  <ProjectCard key={p.slug} project={p} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-[20px]">
                {results.map((p) => (
                  <ProjectRow key={p.slug} project={p} />
                ))}
              </div>
            )}
            <div className="flex justify-center gap-[8px]">
              {["‹", "1", "2", "3", "›"].map((l) => {
                const n = Number(l);
                const active = n === page;
                return (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setPage((p) => (n ? n : l === "‹" ? Math.max(1, p - 1) : Math.min(3, p + 1)))}
                    className={cn(
                      "flex size-[38px] items-center justify-center rounded-[12px] text-[14px] leading-normal font-semibold shadow-neu-sm",
                      active ? "bg-teal-700 text-inverse" : "bg-ice text-teal-700",
                    )}
                  >
                    {l}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
