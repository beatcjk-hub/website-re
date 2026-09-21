/**
 * 사이트 전체 내비게이션 링크.
 * Header, Footer, 모바일 메뉴가 모두 이 배열을 참조합니다.
 * 메뉴 항목을 추가/삭제/이름 변경할 때는 이 파일 하나만 고치면 됩니다.
 */
export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "PROJECTS", href: "/projects" },
  { label: "SERVICES", href: "/services" },
  { label: "PROCESS", href: "/process" },
  { label: "ABOUT", href: "/about" },
  { label: "INSIGHT", href: "/insights" },
  { label: "CONTACT", href: "/contact" },
];

export const PRIMARY_CTA: NavLink = {
  label: "START A PROJECT",
  href: "/contact",
};

export const SITE = {
  name: "ELECTRIC BANANA",
  shortName: "EB-DS",
  description: "공간을 만들고, 브랜드의 경험을 설계합니다.",
};
