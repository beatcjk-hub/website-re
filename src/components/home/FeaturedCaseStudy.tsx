import Link from "next/link";
import Container from "@/components/layout/Container";
import CompareSlider from "@/components/ui/CompareSlider";
import { projectMeta } from "@/data/projects";
import type { Project } from "@/types/project";
import Reveal from "./Reveal";

/**
 * 홈의 대표 케이스 스터디. 3D 렌더와 시공 사진이 짝을 이루는 프로젝트를 page.tsx에서 골라 넘겨준다.
 * 핵심 볼거리는 "설계 → 실제 공간" 비교 슬라이더이므로 사진이 짝을 이루지 못하면 표시하지 않는다.
 */
export default function FeaturedCaseStudy({ project }: { project?: Project }) {
  const render = project?.renderImages?.[0];
  const built = project?.constructionImages?.[0];
  if (!project || !render || !built) return null;

  return (
    <section className="border-t border-line py-24 sm:py-32">
      <Container>
        <Reveal>
          <p className="text-small font-medium text-stone-600">FEATURED CASE STUDY</p>
          <h2 className="mt-2 font-display text-display-2 font-bold">{project.titleEn}</h2>
        </Reveal>

        <p className="mt-4 text-small text-stone-600">{projectMeta(project)}</p>

        <div className="mt-10">
          <CompareSlider
            before={render}
            after={built}
            beforeLabel="3D"
            afterLabel="BUILT"
            alt={project.titleEn}
          />
          <p className="mt-3 text-small text-stone-600">슬라이더를 움직여 설계와 완성된 공간을 비교해 보세요.</p>
        </div>

        {project.summary && <p className="mt-8 max-w-md text-body text-stone-600">{project.summary}</p>}

        <Link
          href={`/projects/${project.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-small font-medium hover:text-banana"
        >
          VIEW CASE STUDY ↗
        </Link>
      </Container>
    </section>
  );
}
