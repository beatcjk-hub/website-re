import Link from "next/link";
import Container from "@/components/layout/Container";

/** 서브페이지 하단 상담 유도 영역 (스펙 §21: 모든 주요 페이지에서 다음 행동 연결) */
export default function CtaBand() {
  return (
    <section className="border-t border-line bg-ink py-24 text-paper">
      <Container>
        <p className="font-display text-display-2 font-bold">
          HAVE A SPACE
          <br />
          IN MIND?
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-flex items-center gap-2 border border-paper px-6 py-3 text-small font-medium transition-colors hover:border-banana hover:bg-banana hover:text-ink"
        >
          START A PROJECT →
        </Link>
      </Container>
    </section>
  );
}
