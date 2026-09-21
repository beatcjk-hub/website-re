import Link from "next/link";
import Container from "@/components/layout/Container";
import Photo from "@/components/ui/Photo";
import Reveal from "./Reveal";
import { projectMeta } from "@/data/projects";
import type { Project } from "@/types/project";

const SIZE_CLASSES: Record<string, { col: string; aspect: string }> = {
  lg: { col: "sm:col-span-7", aspect: "3/2" },
  md: { col: "sm:col-span-5", aspect: "3/4" },
  full: { col: "sm:col-span-12", aspect: "21/9" },
};

/**
 * 동일 크기 3열 그리드(흔한 포트폴리오 템플릿)를 피하고,
 * 프로젝트별 size 값(lg/md/full)에 따라 폭과 비율이 다른
 * 에디토리얼 레이아웃을 사용합니다.
 */
export default function SelectedProjects({ projects }: { projects: Project[] }) {
  return (
    <section className="border-t border-line py-24 sm:py-32">
      <Container>
        <Reveal>
          <h2 className="font-display text-display-2 font-bold">
            SELECTED
            <br />
            PROJECTS
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-12">
          {projects.map((project, i) => {
            const { col, aspect } = SIZE_CLASSES[project.size];
            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className={`group relative block ${col}`}
              >
                <Photo
                  src={project.thumbnail ?? project.heroImage}
                  alt={`PROJECT PHOTO — ${project.titleEn}`}
                  aspect={aspect}
                  className="transition-transform duration-500 ease-eb group-hover:scale-[1.03]"
                />
                {/* 무의미한 조회수 대신 프로젝트/위치/업종/서비스/연도만 표시 */}
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-small text-stone-600">
                      {String(i + 1).padStart(2, "0")} — {projectMeta(project)}
                    </p>
                    <p className="mt-1 font-display text-heading-2 font-bold">
                      {project.titleEn}
                    </p>
                  </div>
                  <span className="whitespace-nowrap text-small font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    VIEW PROJECT ↗
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
