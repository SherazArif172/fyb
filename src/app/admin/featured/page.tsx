"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { PageBody } from "@/components/layout/AppShell";
import { TopBar } from "@/components/layout/TopBar";
import { AreaTag } from "@/components/public/ProjectCard";
import { Card } from "@/components/ui/Card";
import { SearchInput, Toggle } from "@/components/ui/Form";
import { Icon } from "@/components/ui/Icon";
import { SectionHead } from "@/components/ui/Section";
import { Cell, Row, TableHead, TableScroll } from "@/components/ui/Table";
import { publishedProjects } from "@/lib/data";

type Item = { slug: string; title: string; area: string; author: string; year: number; cover?: string };

const items: Item[] = [
  ...publishedProjects
    .filter((p) => ["blockchain-degree-verification", "dengue-outbreak-forecasting", "speech-to-text-punjabi", "fake-news-detection-urdu"].includes(p.slug))
    .map((p) => ({ ...p, area: p.slug === "fake-news-detection-urdu" ? "NLP" : p.area })),
  { slug: "smart-parking", title: "Smart Parking with Computer Vision", area: "Computer Vision", author: "Omar Farooq", year: 2025 },
];

export default function FeaturedPage() {
  const [featured, setFeatured] = useState(["blockchain-degree-verification", "dengue-outbreak-forecasting", "speech-to-text-punjabi"]);
  const [dragging, setDragging] = useState<string | null>(null);
  const [q, setQ] = useState("");

  const toggle = (slug: string, on: boolean) =>
    setFeatured((f) => (on ? (f.length >= 3 ? [...f.slice(0, 2), slug] : [...f, slug]) : f.filter((s) => s !== slug)));

  const drop = (target: string) => {
    if (!dragging || dragging === target) return;
    setFeatured((f) => {
      const next = f.filter((s) => s !== dragging);
      next.splice(f.indexOf(target), 0, dragging);
      return next;
    });
    setDragging(null);
  };

  const bySlug = (s: string) => items.find((i) => i.slug === s)!;
  const list = items.filter((i) => i.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <TopBar role="admin" title="Featured projects" subtitle="Pick up to 3 published projects to show on the home page" />
      <PageBody className="pt-[8px] pb-[48px]">
        <Card className="flex flex-col gap-[20px] p-[18px] sm:p-[24px]">
          <SectionHead title="On the home page" action={<span className="text-[13.5px] text-teal-700">{featured.length} of 3 slots used</span>} />
          <div className="grid grid-cols-1 items-start gap-[24px] md:grid-cols-3">
            {[0, 1, 2].map((i) => {
              const slug = featured[i];
              if (!slug)
                return (
                  <div key={i} className="neu-inset flex h-[280px] flex-col items-center justify-center gap-[8px] rounded-[24px] border-[1.5px] border-dashed border-teal-200 text-center">
                    <Icon name="star" className="text-teal-500" />
                    <span className="text-[13.5px] leading-normal font-medium text-muted">Empty slot · turn a project on below</span>
                  </div>
                );
              const p = bySlug(slug);
              return (
                <div
                  key={slug}
                  draggable
                  onDragStart={() => setDragging(slug)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => drop(slug)}
                  onDragEnd={() => setDragging(null)}
                  className={cn("flex flex-col items-start gap-[14px] rounded-[24px] bg-ice p-[18px] shadow-neu transition-opacity", dragging === slug && "opacity-50")}
                >
                  <div className="relative h-[130px] w-full overflow-hidden rounded-[16px] bg-teal-50">
                    {p.cover && <Image src={p.cover} alt="" fill sizes="360px" className="object-cover" />}
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <AreaTag>{p.area}</AreaTag>
                    <div className="flex items-center gap-[10px] text-muted">
                      <Icon name="grip" className="cursor-grab" />
                      <button type="button" aria-label="Remove from featured" onClick={() => toggle(slug, false)} className="hover:text-ink">
                        <Icon name="x" />
                      </button>
                    </div>
                  </div>
                  <h3 className="font-display text-[17px] leading-[22px] font-semibold text-teal-900">{p.title}</h3>
                  <span className="text-[12.5px] leading-normal text-muted">
                    {p.author} · {p.year}
                  </span>
                  <span className="rounded-full bg-peach-100 px-[10px] py-[3px] text-[11.5px] leading-normal font-semibold text-peach-700">Position {i + 1}</span>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="flex flex-col p-[18px] sm:p-[24px]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-[17px] leading-normal font-semibold text-teal-900">Published projects</h2>
            <SearchInput value={q} onChange={setQ} placeholder="Search published projects" width={280} />
          </div>
          <TableScroll min={760}>
          <TableHead cols={[{ label: "PROJECT" }, { label: "AREA", w: 190 }, { label: "AUTHOR", w: 190 }, { label: "YEAR", w: 80 }, { label: "FEATURED", w: 90 }]} />
          {list.map((p) => (
            <Row key={p.slug}>
              <Cell className="text-[13.5px] leading-normal font-semibold text-ink">{p.title}</Cell>
              <Cell label="Area" w={190}>
                <AreaTag>{p.area}</AreaTag>
              </Cell>
              <Cell label="Author" w={190} className="text-[13.5px] leading-normal text-ink">
                {p.author}
              </Cell>
              <Cell label="Year" w={80} className="text-[13.5px] leading-normal text-muted">
                {p.year}
              </Cell>
              <Cell label="Featured" w={90}>
                <Toggle on={featured.includes(p.slug)} onChange={(v) => toggle(p.slug, v)} label={`Feature ${p.title}`} />
              </Cell>
            </Row>
          ))}
          </TableScroll>
          <div className="neu-inset mt-[2px] flex items-start gap-[10px] rounded-[14px] p-[14px]">
            <Icon name="star" className="shrink-0 text-teal-700" />
            <p className="flex-1 text-[12.5px] leading-[18px] text-teal-700">
              Turning on a 4th project replaces the one in position 3. Drag the cards above to change the order.
            </p>
          </div>
        </Card>
      </PageBody>
    </>
  );
}
