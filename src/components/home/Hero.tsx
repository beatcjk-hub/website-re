"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Container from "@/components/layout/Container";

/**
 * 히어로 섹션: 배경은 프로젝트 릴 영상(public/videos).
 * - poster 사진을 먼저 보여주고(LCP 대응), 영상이 재생 가능해지면 위에서 서서히 겹친다.
 * - 모션 줄임 설정이거나 데이터 절약 모드면 영상을 아예 불러오지 않고 사진만 쓴다.
 * - 데스크톱은 1080p, 모바일은 720p(용량 절반)를 쓴다.
 * - 화면 밖으로 나가면 일시정지하고, 사용자가 직접 멈출 수 있다(자동 재생 5초 초과 시 접근성 기준).
 * 영상 교체: public/videos/hero-1080.mp4, hero-720.mp4, hero-poster.jpg 파일만 바꾸면 된다.
 * 스크롤 시 배경이 살짝 확대되는 효과는 순수 CSS transform으로 구현했다.
 */
/**
 * 재생할 영상 주소를 브라우저 조건에서 정한다. 서버 렌더링 때는 null(=사진만).
 * 모션 줄임/데이터 절약이면 null을 유지해 영상을 불러오지 않는다.
 */
function useHeroVideoSrc(): string | null {
  return useSyncExternalStore(
    () => () => {}, // 값이 실행 중 바뀌지 않으므로 구독할 것이 없다
    () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
      if (reducedMotion || saveData) return null;
      return window.innerWidth >= 768 ? "/videos/hero-1080.mp4" : "/videos/hero-720.mp4";
    },
    () => null,
  );
}

export default function Hero() {
  const bgRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoSrc = useHeroVideoSrc();
  const [videoReady, setVideoReady] = useState(false);
  const [paused, setPaused] = useState(false);

  // 히어로가 화면에서 벗어나면 재생을 멈춰 CPU/배터리를 아낀다.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !videoSrc) return;
    const observer = new IntersectionObserver(([entry]) => {
      const video = videoRef.current;
      if (!video) return;
      if (entry.isIntersecting && !paused) void video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, [videoSrc, paused]);

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
    <section ref={sectionRef} className="relative flex h-screen min-h-[640px] items-end overflow-hidden bg-ink text-paper">
      <div ref={bgRef} className="absolute inset-0 transition-transform duration-100 ease-out will-change-transform">
        <Image src="/videos/hero-poster.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        {videoSrc && (
          <video
            ref={videoRef}
            src={videoSrc}
            poster="/videos/hero-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={() => setVideoReady(true)}
            aria-hidden
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>
      {/* 헤더(위)와 헤드라인(아래)이 잘 읽히도록 위아래를 어둡게 */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/45" />

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

      {videoSrc && (
        <button
          type="button"
          onClick={() => {
            const video = videoRef.current;
            if (!video) return;
            if (video.paused) {
              void video.play().catch(() => {});
              setPaused(false);
            } else {
              video.pause();
              setPaused(true);
            }
          }}
          aria-label={paused ? "배경 영상 재생" : "배경 영상 일시정지"}
          className="absolute bottom-6 right-4 z-10 min-h-11 border border-paper/40 px-3 text-small text-paper/80 transition-colors hover:border-banana hover:text-banana sm:bottom-8 sm:right-32"
        >
          {paused ? "PLAY" : "PAUSE"}
        </button>
      )}

      {/* 스크롤 인디케이터 */}
      <div className="absolute bottom-8 right-6 z-10 hidden flex-col items-center gap-3 sm:right-12 sm:flex lg:right-12">
        <span className="text-small tracking-wide text-paper/60">SCROLL</span>
        <span className="h-10 w-px animate-pulse bg-paper/40" />
      </div>
    </section>
  );
}
