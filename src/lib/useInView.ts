"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 요소가 뷰포트에 들어오면 한 번만 true가 되는 훅.
 * 스크롤할 때마다 반복 재생되지 않도록 해서(= 카드마다 반복되는
 * 흔한 "AI스러운" 연출을 피함) 절제된 리빌 효과에만 사용합니다.
 */
export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}
