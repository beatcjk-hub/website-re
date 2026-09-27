import Container from "@/components/layout/Container";
import Photo from "@/components/ui/Photo";

/**
 * THE SPACE 갤러리. 가로 스크롤 없이 한 장씩 세로로 나열하고, 폭은 화면 크기와 무관하게 항상 동일하게 유지한다.
 */
const ASPECTS = ["21/9", "4/5", "3/2", "3/2", "4/5"];

export default function ProjectGallery({ images, alt }: { images: string[]; alt: string }) {
  return (
    <Container>
      <div className="grid grid-cols-1 gap-6">
        {images.map((src, i) => (
          <Photo
            key={src}
            src={src}
            alt={`${alt} ${i + 1}`}
            aspect={ASPECTS[i % ASPECTS.length]}
            sizes="100vw"
          />
        ))}
      </div>
    </Container>
  );
}
