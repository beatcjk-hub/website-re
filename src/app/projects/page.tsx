import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import ProjectMatch from "@/components/home/ProjectMatch";

export const metadata: Metadata = {
  title: "Projects",
  description: "ELECTRIC BANANA의 인테리어·브랜딩 프로젝트 아카이브.",
};

export default function ProjectsPage() {
  return (
    <>
      <Container className="pt-40 sm:pt-48">
        <h1 className="font-display text-display-1 font-bold">PROJECTS</h1>
      </Container>
      {/* 업종 필터 + 전체 프로젝트 그리드 (홈의 PROJECT MATCH와 같은 컴포넌트 재사용) */}
      <ProjectMatch />
    </>
  );
}
