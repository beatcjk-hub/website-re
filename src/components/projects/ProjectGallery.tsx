import Container from "@/components/layout/Container";
import Photo from "@/components/ui/Photo";

/**
 * THE SPACE 갤러리. 사진마다 폭/비율을 다르게 반복해 리듬을 만든다 (같은 크기 반복 금지).
 * 모바일은 CSS scroll-snap 가로 스와이프, 데스크톱은 12열 에디토리얼 배치. JS 없음.
 */
const LAYOUT = [
  { col: "lg:col-span-12", aspect: "21/9" },
  { col: "lg:col-span-5", aspect: "4/5" },
  { col: "lg:col-span-7", aspect: "3/2" },
  { col: "lg:col-span-7", aspect: "3/2" },
  { col: "lg:col-span-5", aspect: "4/5" },
];

export default function ProjectGallery({ images, alt }: { images: string[]; alt: string }) {
  return (
    <Container>
      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 lg:mx-0 lg:grid lg:grid-cols-12 lg:gap-6 lg:overflow-visible lg:px-0">
        {images.map((src, i) => {
          const { col, aspect } = LAYOUT[i % LAYOUT.length];
          return (
            <div key={src} className={`w-[85%] shrink-0 snap-center lg:w-auto lg:shrink ${col}`}>
              <Photo src={src} alt={`${alt} ${i + 1}`} aspect={aspect} sizes="(min-width: 1024px) 60vw, 85vw" />
            </div>
          );
        })}
      </div>
    </Container>
  );
}
