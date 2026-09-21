type PlaceholderImageProps = {
  label: string;
  aspect?: string; // 예: "4/5", "16/9", "1/1"
  className?: string;
};

/**
 * 실제 프로젝트 사진이 준비되기 전까지 사용하는 자리표시자.
 * Phase 3~4에서 실제 사진이 들어오면:
 *   <PlaceholderImage label="HONTEN" aspect="4/5" />
 * 를
 *   <Image src="/projects/honten/hero.jpg" alt="HONTEN" fill className="object-cover" />
 * 로 교체하면 됩니다 (부모에 aspect-ratio + relative는 그대로 두세요).
 */
export default function PlaceholderImage({
  label,
  aspect = "4/5",
  className = "",
}: PlaceholderImageProps) {
  return (
    <div
      className={`relative flex items-end overflow-hidden bg-stone-100 ${className}`}
      style={{ aspectRatio: aspect }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(17,17,17,0.06)_25%,transparent_25%,transparent_50%,rgba(17,17,17,0.06)_50%,rgba(17,17,17,0.06)_75%,transparent_75%,transparent)] bg-[length:24px_24px]" />
      <span className="relative m-4 text-small tracking-wide text-stone-600">
        {label}
      </span>
    </div>
  );
}
