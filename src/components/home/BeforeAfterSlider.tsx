import Container from "@/components/layout/Container";
import CompareSlider from "@/components/ui/CompareSlider";
import Reveal from "./Reveal";

/** 실제 사진이 준비되면 before/after에 이미지 경로를 넣는다. */
export default function BeforeAfterSlider() {
  return (
    <section className="border-t border-line py-24 sm:py-32">
      <Container>
        <Reveal>
          <h2 className="font-display text-display-2 font-bold">BEFORE / AFTER</h2>
        </Reveal>
        <div className="mt-10">
          <CompareSlider beforeLabel="BEFORE" afterLabel="AFTER" alt="Before / After" />
        </div>
      </Container>
    </section>
  );
}
