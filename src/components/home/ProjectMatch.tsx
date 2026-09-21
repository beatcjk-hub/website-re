"use client";

import Link from "next/link";
import { useState } from "react";
import Container from "@/components/layout/Container";
import Photo from "@/components/ui/Photo";
import Reveal from "./Reveal";
import { INDUSTRY_LABELS, type Industry, type Project } from "@/types/project";

const FILTERS: { label: string; value: Industry | "all" }[] = [
  { label: "ALL", value: "all" },
  { label: "RESTAURANT", value: "restaurant" },
  { label: "CAFE", value: "cafe" },
  { label: "RETAIL", value: "retail" },
  { label: "OFFICE", value: "office" },
  { label: "COMMERCIAL", value: "commercial" },
];

/**
 * Phase 2에서는 전달받은 projects 배열을 클라이언트에서 필터링합니다.
 * Phase 3에서 실제 프로젝트 데이터가 API/CMS로 연결되면, 이 필터 상태를
 * 그대로 두고 데이터 소스만 서버에서 가져오는 방식으로 바꾸면 됩니다.
 */
export default function ProjectMatch({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Industry | "all">(
    "all"
  );

  const filtered =
    active === "all"
      ? projects
      : projects.filter((p) => p.industry === active);

  return (
    <section className="border-t border-line py-24 sm:py-32">
      <Container>
        <Reveal>
          <h2 className="font-display text-display-2 font-bold">
            FIND A PROJECT
            <br />
            LIKE YOURS
          </h2>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-3">
          {FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActive(filter.value)}
              aria-pressed={active === filter.value}
              className={`border px-4 py-2 text-small font-medium transition-colors ${
                active === filter.value
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-stone-600 hover:border-ink hover:text-ink"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {filtered.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group"
            >
              <Photo
                src={project.thumbnail ?? project.heroImage}
                alt={project.titleEn}
                aspect="4/5"
                sizes="(min-width: 640px) 33vw, 100vw"
                className="transition-transform duration-500 ease-eb group-hover:scale-[1.03]"
              />
              <p className="mt-3 text-small text-stone-600">
                {[INDUSTRY_LABELS[project.industry], project.location].filter(Boolean).join(" · ")}
              </p>
              <p className="font-display text-heading-2 font-bold">
                {project.titleEn}
              </p>
            </Link>
          ))}
          {filtered.length === 0 && (
            <p className="text-small text-stone-600">
              해당 업종의 프로젝트를 준비 중입니다.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
