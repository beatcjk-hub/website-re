import Container from "@/components/layout/Container";

type CaseStudySectionProps = {
  number: string;
  title: string;
  children: React.ReactNode;
};

/** 케이스 스터디의 공통 섹션 틀: 왼쪽 번호+제목, 오른쪽 내용. 번호만 포인트 컬러 배경. */
export default function CaseStudySection({ number, title, children }: CaseStudySectionProps) {
  return (
    <section className="border-t border-line py-20 sm:py-28">
      <Container className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <span className="bg-banana px-1.5 text-small font-medium text-ink">{number}</span>
          <h2 className="mt-3 font-display text-heading-1 font-bold">{title}</h2>
        </div>
        <div className="lg:col-span-8">{children}</div>
      </Container>
    </section>
  );
}
