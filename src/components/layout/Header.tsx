"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "./Container";
import { NAV_LINKS, PRIMARY_CTA, SITE } from "@/lib/navigation";

/**
 * 글로벌 헤더.
 * - 스크롤 전: 투명한 배경 위에 떠 있음 (히어로 위 오버레이 용도) → 밝은(paper) 텍스트
 * - 스크롤 후: 흰 배경 + 얇은 하단 보더, 높이 살짝 축소 → 어두운(ink) 텍스트
 * - 모바일: 풀스크린 메뉴 오버레이
 *
 * 투명+밝은 글씨는 어두운 히어로로 시작하는 홈("/")에서만 쓴다.
 * 그 외 페이지는 밝은 배경에서 시작하므로 처음부터 어두운 글씨를 쓴다.
 */
const SCROLL_THRESHOLD = 24;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hasDarkHero = usePathname() === "/";

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 모바일 메뉴가 열려 있는 동안 배경 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // 모바일 메뉴가 열려 있을 때는 항상 어두운 텍스트(흰 배경 위이므로)
  const isDarkText = isScrolled || isMenuOpen || !hasDarkHero;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-eb ${
        isScrolled || !hasDarkHero
          ? "border-b border-line bg-paper/95 text-ink backdrop-blur-sm"
          : isMenuOpen
            ? "border-b border-line bg-paper text-ink"
            : "border-b border-transparent bg-transparent text-paper"
      }`}
    >
      <Container
        className={`flex items-center justify-between transition-all duration-300 ease-eb ${
          isScrolled ? "py-4" : "py-6"
        }`}
      >
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight"
          onClick={() => setIsMenuOpen(false)}
        >
          {SITE.name}
        </Link>

        {/* 데스크톱 내비게이션 */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-small font-medium tracking-wide transition-colors ${
                isDarkText
                  ? "hover:text-stone-600"
                  : "hover:text-paper/70"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={PRIMARY_CTA.href}
            className={`rounded-none border px-4 py-2 text-small font-medium transition-colors ${
              isDarkText
                ? "border-ink hover:bg-ink hover:text-paper"
                : "border-paper hover:bg-paper hover:text-ink"
            }`}
          >
            {PRIMARY_CTA.label}
          </Link>
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <button
          type="button"
          className="flex flex-col gap-1.5 lg:hidden"
          aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span
            className={`h-px w-6 transition-transform duration-300 ${
              isDarkText ? "bg-ink" : "bg-paper"
            } ${isMenuOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-6 transition-transform duration-300 ${
              isDarkText ? "bg-ink" : "bg-paper"
            } ${isMenuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </Container>

      {/* 모바일 풀스크린 메뉴 */}
      {isMenuOpen && (
        <nav className="flex h-[calc(100vh-72px)] flex-col justify-between bg-paper px-6 py-10 lg:hidden">
          <ul className="flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-display text-display-2 font-bold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={PRIMARY_CTA.href}
            className="border border-ink px-4 py-3 text-center text-small font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            {PRIMARY_CTA.label}
          </Link>
        </nav>
      )}
    </header>
  );
}
