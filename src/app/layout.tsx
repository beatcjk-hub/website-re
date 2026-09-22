import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/layout/SiteChrome";

/**
 * 영문 대형 헤드라인용 폰트 (아키텍처적, 지오메트릭 산세리프).
 * next/font가 자동으로 최적화 + 자체 호스팅 처리합니다.
 */
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

/**
 * 국문/본문 폰트: Pretendard.
 * 구글 폰트에는 없는 폰트라 CDN 링크로 불러옵니다 (layout head 참고).
 * 나중에 성능 최적화가 필요하면 `pretendard` npm 패키지로 자체 호스팅 전환을 검토하세요.
 */

export const metadata: Metadata = {
  metadataBase: new URL("https://www.eb-ds.com"),
  title: {
    default: "ELECTRIC BANANA | Brand & Space Design Studio",
    template: "%s | ELECTRIC BANANA",
  },
  description: "공간을 만들고, 브랜드의 경험을 설계합니다. — ELECTRIC BANANA (EB-DS)",
  openGraph: {
    title: "ELECTRIC BANANA | Brand & Space Design Studio",
    description: "공간을 만들고, 브랜드의 경험을 설계합니다.",
    siteName: "ELECTRIC BANANA",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={archivo.variable}>
      <head>
        {/* Pretendard 가변 폰트 (CDN) — --font-pretendard 변수로 tailwind에 연결 */}
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css"
        />
      </head>
      <body
        className="font-sans"
        style={{ ["--font-pretendard" as string]: "'PretendardVariable'" }}
      >
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
