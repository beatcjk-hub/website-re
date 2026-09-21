import Link from "next/link";
import Container from "@/components/layout/Container";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import Reveal from "./Reveal";

const STAGES = ["PROBLEM", "IDEA", "SPACE", "RESULT"];

export default function FeaturedCaseStudy() {
  return (
    <section className="border-t border-line py-24 sm:py-32">
      <Container>
        <Reveal>
          <p className="text-small font-medium text-stone-600">
            FEATURED CASE STUDY
          </p>
          <h2 className="mt-2 font-display text-display-2 font-bold">
            SUJE CHEONGNYEON
          </h2>
        </Reveal>

        <div className="mt-4 flex flex-wrap items-center gap-x-2 text-small text-stone-600">
          {STAGES.map((stage, i) => (
            <span key={stage} className="flex items-center gap-2">
              {stage}
              {i < STAGES.length - 1 && <span aria-hidden>→</span>}
            </span>
          ))}
        </div>

        <PlaceholderImage
          label="SUJE CHEONGNYEON — FULL PROJECT PHOTO"
          aspect="16/9"
          className="mt-10"
        />

        <p className="mt-8 max-w-md text-body text-stone-600">
          건강하고 정직한 재료로 만든 수제청을 파는 카페, 수제청년의 공간입니다.
          &lsquo;건강·정직·따뜻함&rsquo;이라는 브랜드 키워드를 자연 소재와 밝은
          톤의 마감재로 풀어냈습니다.
        </p>

        <Link
          href="/projects/suje-cheongnyeon"
          className="mt-6 inline-flex items-center gap-2 text-small font-medium hover:text-banana"
        >
          VIEW CASE STUDY ↗
        </Link>
      </Container>
    </section>
  );
}
