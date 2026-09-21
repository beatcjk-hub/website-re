import Image from "next/image";
import PlaceholderImage from "./PlaceholderImage";

type PhotoProps = {
  src?: string;
  alt: string;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * 프로젝트 사진 1장. src가 없으면 자리표시자를 보여준다.
 * aspect를 부모에 고정해 두므로 로딩 중 레이아웃이 밀리지 않는다.
 */
export default function Photo({
  src,
  alt,
  aspect = "4/5",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  className = "",
}: PhotoProps) {
  if (!src) return <PlaceholderImage label={alt} aspect={aspect} className={className} />;
  return (
    <div className={`relative overflow-hidden bg-stone-100 ${className}`} style={{ aspectRatio: aspect }}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}
