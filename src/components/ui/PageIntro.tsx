import Container from "@/components/layout/Container";

/** 서브페이지 공통 상단: 대형 영문 제목 + 한글 한 줄 설명 */
export default function PageIntro({ title, lead }: { title: string; lead?: string }) {
  return (
    <Container className="pb-16 pt-40 sm:pt-48">
      <h1 className="font-display text-display-1 font-bold">{title}</h1>
      {lead && <p className="mt-6 max-w-xl text-body text-stone-600">{lead}</p>}
    </Container>
  );
}
