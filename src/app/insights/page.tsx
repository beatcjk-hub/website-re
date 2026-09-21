import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import PageIntro from "@/components/ui/PageIntro";
import { INSIGHTS } from "@/data/insights";

export const metadata: Metadata = {
  title: "Insights",
  description: "공간 디자인, 브랜딩, 상업공간 창업에 도움이 되는 ELECTRIC BANANA의 인사이트.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <>
      <PageIntro title="INSIGHTS" lead="공간과 브랜드를 준비하는 분들을 위한 이야기." />
      <Container className="pb-24">
        <ul className="border-t border-line">
          {INSIGHTS.map((insight) => (
            <li key={insight.slug} className="border-b border-line">
              <Link href={`/insights/${insight.slug}`} className="group flex items-baseline justify-between gap-6 py-8">
                <span>
                  <span className="block text-small text-stone-600">{insight.category}</span>
                  <span className="mt-1 block text-heading-2 font-medium">{insight.title}</span>
                </span>
                <span className="whitespace-nowrap text-small text-stone-600 group-hover:text-ink">READ ↗</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
