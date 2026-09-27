import Container from "@/components/layout/Container";
import CompareSlider from "@/components/ui/CompareSlider";
import Reveal from "./Reveal";

export default function BeforeAfterSlider() {
  return (
    <section className="border-t border-line py-24 sm:py-32">
      <Container>
        <Reveal>
          <h2 className="font-display text-display-2 font-bold">BEFORE / AFTER</h2>
        </Reveal>
        <div className="mt-10">
          <CompareSlider
            before="/projects/hic-suncheon/before-1.jpg"
            after="/projects/hic-suncheon/gallery-3.jpg"
            beforeLabel="BEFORE"
            afterLabel="AFTER"
            alt="HIC — Before / After"
          />
        </div>
      </Container>
    </section>
  );
}
