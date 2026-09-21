"use client";

import { useState } from "react";
import Photo from "./Photo";

type CompareSliderProps = {
  before?: string;
  after?: string;
  beforeLabel: string;
  afterLabel: string;
  alt: string;
  aspect?: string;
};

/**
 * 두 이미지 비교 슬라이더 (Before/After, 3D/Built 공용).
 * <input type="range">를 투명하게 덮어 마우스·터치·키보드를 브라우저 기본 동작으로 처리한다.
 * 이미지가 없으면 색 블록으로 대체된다.
 */
export default function CompareSlider({
  before,
  after,
  beforeLabel,
  afterLabel,
  alt,
  aspect = "16/9",
}: CompareSliderProps) {
  const [position, setPosition] = useState(50);

  return (
    <div className="relative w-full select-none overflow-hidden bg-stone-100" style={{ aspectRatio: aspect }}>
      <div className="absolute inset-0">
        {after && <Photo src={after} alt={`${alt} — ${afterLabel}`} aspect={aspect} sizes="100vw" />}
        <span className="absolute bottom-4 right-4 text-small tracking-wide text-stone-600">{afterLabel}</span>
      </div>

      <div className="absolute inset-0 bg-ink text-paper" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        {before && <Photo src={before} alt={`${alt} — ${beforeLabel}`} aspect={aspect} sizes="100vw" />}
        <span className="absolute bottom-4 left-4 text-small tracking-wide text-paper/70">{beforeLabel}</span>
      </div>

      <div className="pointer-events-none absolute inset-y-0 w-px bg-paper" style={{ left: `${position}%` }}>
        <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink bg-paper" />
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-label={`${beforeLabel} / ${afterLabel} 비교 슬라이더`}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
