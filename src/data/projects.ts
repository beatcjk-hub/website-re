import { INDUSTRY_LABELS, type Project } from "@/types/project";

/**
 * 프로젝트 초기 데이터 (Supabase 미연결/비어 있을 때의 대체 데이터이자 최초 시드 원본).
 * 화면은 이 파일을 직접 읽지 않고 src/lib/projects.ts를 통해 가져온다. 필드 설명은 src/types/project.ts 참고.
 * 출처: www.eb-ds.com(기존 워드프레스)의 실제 프로젝트명/업종/지역. 연도·면적 등은 확인 후 채운다.
 */
export const PROJECTS: Project[] = [
  {
    id: "apoo",
    slug: "apoo",
    title: "아푸 APOO 아시안푸드 조대본점",
    titleEn: "APOO",
    location: "Gwangju",
    industry: "restaurant",
    year: "",
    services: ["Interior", "Branding"],
    size: "full",
    featured: true,
  },
  {
    id: "suje-cheongnyeon",
    slug: "suje-cheongnyeon",
    title: "수제청년 — 건강한 디저트샵, 수제청 카페",
    titleEn: "SUJE CHEONGNYEON",
    location: "Gwangju",
    industry: "cafe",
    year: "",
    services: ["Interior Design"],
    size: "md",
    featured: true,
    summary:
      "건강하고 정직한 재료로 만든 수제청을 파는 카페, 수제청년의 공간입니다. '건강·정직·따뜻함'이라는 브랜드 키워드를 자연 소재와 밝은 톤의 마감재로 풀어냈습니다.",
  },
  {
    id: "pami-garden",
    slug: "pami-garden",
    title: "파미가든 한우전문점",
    titleEn: "PAMI GARDEN",
    location: "Gwangju",
    industry: "restaurant",
    year: "",
    services: ["Interior", "Branding"],
    size: "lg",
    featured: true,
  },
  {
    id: "iri-beer-iksan",
    slug: "iri-beer-iksan",
    title: "이리맥주 익산 동산점",
    titleEn: "IRI BEER — IKSAN",
    location: "Iksan",
    industry: "commercial",
    year: "",
    services: ["Interior", "Branding"],
    size: "md",
    featured: true,
  },
  {
    id: "gochang-myeonok",
    slug: "gochang-myeonok",
    title: "고창면옥",
    titleEn: "GOCHANG MYEONOK",
    location: "Gochang",
    industry: "restaurant",
    year: "",
    services: ["Interior Design"],
    size: "lg",
    featured: true,
  },
  {
    id: "iri-beer-wanju",
    slug: "iri-beer-wanju",
    title: "이리맥주 완주 삼례점",
    titleEn: "IRI BEER — WANJU",
    location: "Wanju",
    industry: "commercial",
    year: "",
    services: ["Interior", "Branding"],
    size: "md",
  },
  {
    id: "hic-suncheon",
    slug: "hic-suncheon",
    title: "순천 HIC 레스토랑",
    titleEn: "HIC SUNCHEON",
    location: "Suncheon",
    industry: "restaurant",
    year: "",
    services: ["Interior Design"],
    size: "md",
  },
  {
    id: "gongsajung-pocha-suwan",
    slug: "gongsajung-pocha-suwan",
    title: "공사중 포차 수완점",
    titleEn: "GONGSAJUNG POCHA — SUWAN",
    location: "Gwangju",
    industry: "restaurant",
    year: "",
    services: ["Interior Design"],
    size: "md",
  },
  {
    id: "oven-day",
    slug: "oven-day",
    title: "오븐데이 치킨전문점",
    titleEn: "OVEN DAY",
    location: "",
    industry: "restaurant",
    year: "",
    services: ["Interior", "Branding"],
    size: "md",
  },
  {
    id: "eojuk",
    slug: "eojuk",
    title: "어죽전문매장",
    titleEn: "EOJUK",
    location: "",
    industry: "restaurant",
    year: "",
    services: ["Interior Design"],
    size: "md",
  },
];

/** "Gwangju · Restaurant · Interior Design" — 비어 있는 값은 건너뛴다 */
export const projectMeta = (p: Project) =>
  [p.location, INDUSTRY_LABELS[p.industry], p.services.join(" + "), p.year]
    .filter(Boolean)
    .join(" · ");
