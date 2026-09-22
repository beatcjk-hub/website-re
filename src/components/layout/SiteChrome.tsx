"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import Header from "./Header";

/** 관리자 페이지(/admin)에서는 공개 사이트의 헤더/푸터를 보여주지 않는다. */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const isAdmin = usePathname()?.startsWith("/admin");
  if (isAdmin) return <>{children}</>;

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
