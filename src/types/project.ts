export type Industry = "restaurant" | "cafe" | "retail" | "office" | "commercial";

export const INDUSTRY_LABELS: Record<Industry, string> = {
  restaurant: "Restaurant",
  cafe: "Cafe",
  retail: "Retail",
  office: "Office",
  commercial: "Commercial",
};

/**
 * 프로젝트 1건의 데이터. 화면(JSX)과 분리되어 있으며 나중에 Supabase/Sanity로
 * 옮겨도 이 타입만 유지하면 UI는 그대로 쓸 수 있다.
 * 모르는 값은 비우거나 생략한다. 데이터가 없는 섹션은 상세 페이지에서 숨겨진다.
 * 이미지 경로는 /public 기준 (예: "/projects/apoo/hero.jpg").
 */
export type Project = {
  id: string;
  slug: string;
  title: string; // 국문 프로젝트명
  titleEn: string; // 화면 대형 타이포용 영문명
  client?: string;
  location: string; // 모르면 ""
  industry: Industry;
  area?: string; // 예: "99㎡"
  year: string; // 모르면 ""
  services: string[];
  summary?: string;
  challenge?: string;
  concept?: string;
  solution?: string;
  materials?: string[];
  heroImage?: string;
  thumbnail?: string;
  gallery?: string[];
  beforeImages?: string[];
  afterImages?: string[];
  renderImages?: string[]; // 3D 렌더 — constructionImages와 같은 순서로 짝을 이룸
  constructionImages?: string[]; // 시공 완료 사진
  video?: string;
  featured?: boolean; // 홈 SELECTED PROJECTS 노출
  seoTitle?: string;
  seoDescription?: string;
  publishedAt?: string; // ISO 날짜
  size: "lg" | "md" | "full"; // 홈 에디토리얼 그리드 레이아웃용
};
