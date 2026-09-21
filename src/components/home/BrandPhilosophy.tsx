import Container from "@/components/layout/Container";
import Reveal from "./Reveal";

const WORDS = ["BRAND", "SPACE", "EXPERIENCE"];

export default function BrandPhilosophy() {
  return (
    <section className="border-t border-line py-24 sm:py-32">
      <Container>
        <Reveal>
          <h2 className="font-display text-display-2 font-bold">
            SPACE IS
            <br />
            MORE THAN
            <br />
            A PLACE.
          </h2>
        </Reveal>

        <Reveal delay={120} className="mt-10 max-w-md">
          <p className="text-body text-stone-600">
            우리는 단순히 공간을 디자인하지 않습니다. 브랜드를 환경으로
            번역하고, 그 안에서 일어나는 경험을 설계합니다.
          </p>
        </Reveal>

        <div className="mt-16 flex flex-wrap gap-x-10 gap-y-4">
          {WORDS.map((word, i) => (
            <Reveal key={word} delay={200 + i * 150}>
              <span className="font-display text-heading-1 font-bold text-stone-400">
                {word}
              </span>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
