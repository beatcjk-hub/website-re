"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import Container from "@/components/layout/Container";

/**
 * 히어로 섹션.
 * 실제 프로젝트 사진/영상이 준비되면 배경 div를 <video> 또는
 * <Image fill> 으로 교체하세요 (아래 bgRef 요소).
 * 스크롤 시 배경이 살짝 확대되는 효과는 순수 CSS transform으로,
 * 무거운 라이브러리 없이 구현했습니다.
 */
export default function Hero() {
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const scale = 1 + Math.min(y / 4000, 0.12);
        if (bgRef.current) {
          bgRef.current.style.transform = `scale(${scale})`;
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative flex h-screen min-h-[640px] items-end overflow-hidden bg-ink text-paper">
      {/* 배경 사진/영상 자리 — Phase 3/4에서 실제 미디어로 교체 */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#2a2a2a,#111111_70%)] transition-transform duration-100 ease-out will-change-transform"
      />
      <div className="absolute inset-0 bg-ink/10" />

      <Container className="relative z-10 pb-16 pt-40 sm:pb-24">
        <h1 className="font-display text-display-1 font-bold">
          WE DESIGN
          <br />
          SPACE FOR
          <br />
          BRANDS.
        </h1>
        <p className="mt-6 max-w-sm text-body text-paper/80">
          공간을 만들고,
          <br />
          브랜드의 경험을 설계합니다.
        </p>
        <Link
          href="/projects"
          className="mt-10 inline-flex items-center gap-2 border border-paper/40 px-5 py-3 text-small font-medium transition-colors hover:border-banana hover:text-banana"
        >
          VIEW PROJECTS
        </Link>
      </Container>

      {/* 스크롤 인디케이터 */}
      <div className="absolute bottom-8 right-6 z-10 hidden flex-col items-center gap-3 sm:right-12 sm:flex lg:right-12">
        <span className="text-small tracking-wide text-paper/60">SCROLL</span>
        <span className="h-10 w-px animate-pulse bg-paper/40" />
      </div>
    </section>
  );
}
