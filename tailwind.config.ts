import type { Config } from "tailwindcss";

/**
 * ELECTRIC BANANA (EB-DS) 디자인 시스템
 * -------------------------------------------------
 * 모든 색상/폰트/여백 토큰은 이 파일 한 곳에서 관리합니다.
 * 새 색상이나 폰트가 필요하면 여기에 추가하고,
 * 컴포넌트에서는 항상 토큰 이름(예: bg-ink, text-banana)으로만 사용하세요.
 * 직접 hex 코드(#111111 등)를 컴포넌트에 적는 것은 지양합니다.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    // Tailwind 기본 breakpoint를 그대로 사용합니다 (아래는 참고용 매핑).
    // sm: 640px  → 큰 모바일 / 작은 태블릿
    // md: 768px  → 태블릿
    // lg: 1024px → 노트북
    // xl: 1280px → 데스크톱
    // 2xl: 1536px → 대형 데스크톱
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        // 베이스
        ink: "#111111", // 기본 텍스트 / 다크 배경
        paper: "#FFFFFF", // 기본 배경
        // 웜 그레이 계열 (보조 텍스트, 구분선, 섹션 배경)
        stone: {
          DEFAULT: "#8C8577",
          50: "#F5F3EF",
          100: "#EDEAE3",
          400: "#8C8577",
          600: "#5C564A",
        },
        // 포인트 컬러 — "Electric Banana Yellow"
        // 커서 인터랙션, 프로젝트 넘버, CTA, hover 등 아주 제한적으로만 사용
        banana: "#F4FF52",
        // 헤어라인 보더용
        line: "rgba(17, 17, 17, 0.12)",
        "line-inverse": "rgba(255, 255, 255, 0.2)",
      },
      fontFamily: {
        // 영문 대형 헤드라인용 (아키텍처적 느낌)
        display: ["var(--font-archivo)", "Arial", "sans-serif"],
        // 국문 + 본문 텍스트용
        sans: ["var(--font-pretendard)", "-apple-system", "sans-serif"],
      },
      fontSize: {
        // 에디토리얼 타입 스케일. 반응형은 clamp()로 처리해 미디어쿼리를 줄입니다.
        "display-1": ["clamp(2.75rem, 6vw, 6.5rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display-2": ["clamp(2rem, 4vw, 3.75rem)", { lineHeight: "1", letterSpacing: "-0.01em" }],
        "heading-1": ["clamp(1.5rem, 2.5vw, 2.25rem)", { lineHeight: "1.15" }],
        "heading-2": ["clamp(1.125rem, 1.5vw, 1.5rem)", { lineHeight: "1.3" }],
        body: ["1rem", { lineHeight: "1.7" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
      },
      maxWidth: {
        container: "1440px", // Container 컴포넌트의 기본 최대 너비
      },
      transitionTimingFunction: {
        eb: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
