import { getFeaturedProjects, getProjects } from "@/lib/projects";
import Hero from "@/components/home/Hero";
import BrandPhilosophy from "@/components/home/BrandPhilosophy";
import SelectedProjects from "@/components/home/SelectedProjects";
import WhatWeDo from "@/components/home/WhatWeDo";
import FeaturedCaseStudy from "@/components/home/FeaturedCaseStudy";
import BeforeAfterSlider from "@/components/home/BeforeAfterSlider";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import ProjectMatch from "@/components/home/ProjectMatch";
import Insights from "@/components/home/Insights";
import FinalCTA from "@/components/home/FinalCTA";

/**
 * 홈페이지 = 섹션 컴포넌트를 순서대로 나열한 것뿐입니다.
 * 순서를 바꾸거나 섹션을 빼고 싶으면 이 파일에서 줄만 옮기거나 지우면 됩니다.
 * 각 섹션의 실제 내용은 src/components/home/ 안의 파일을 확인하세요.
 */
// Supabase의 프로젝트 수정이 5분 안에 반영되도록 주기적으로 다시 생성한다.
export const revalidate = 300;

export default async function HomePage() {
  const [featured, projects] = await Promise.all([getFeaturedProjects(), getProjects()]);

  return (
    <>
      <Hero />
      <BrandPhilosophy />
      <SelectedProjects projects={featured} />
      <WhatWeDo />
      <FeaturedCaseStudy />
      <BeforeAfterSlider />
      <ProcessTimeline />
      <ProjectMatch projects={projects} />
      <Insights />
      <FinalCTA />
    </>
  );
}
