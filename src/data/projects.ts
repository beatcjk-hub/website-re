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
    year: "2023", // 로고 "SINCE 2023" 및 시안 파일 날짜(2023-09) 기준. 실제 오픈 연도 확인 필요
    services: ["Interior", "Branding"],
    size: "full",
    featured: true,
    summary: "아시안 푸드 펍 & 레스토랑 APOO의 브랜드 아이덴티티, 간판, 홀·주방 인테리어를 함께 설계했습니다.",
    heroImage: "/projects/apoo/hero.jpg",
    thumbnail: "/projects/apoo/hero.jpg",
    gallery: [
      "/projects/apoo/brand-card.jpg",
      "/projects/apoo/signage-plan.jpg",
      "/projects/apoo/3d-hall-01.jpg",
      "/projects/apoo/3d-hall-02.jpg",
    ],
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
    year: "2024", // 완료업무/2024 폴더 기준. 실제 오픈 연도 확인 필요
    services: ["Interior", "Branding"],
    size: "md",
    featured: true,
    heroImage: "/projects/iri-beer-iksan/hero.jpg",
    thumbnail: "/projects/iri-beer-iksan/hero.jpg",
    gallery: [
      "/projects/iri-beer-iksan/gallery-1.jpg",
      "/projects/iri-beer-iksan/gallery-2.jpg",
      "/projects/iri-beer-iksan/gallery-3.jpg",
    ],
  },
  {
    id: "gochang-myeonok",
    slug: "gochang-myeonok",
    title: "고창면옥 판교점",
    titleEn: "GOCHANG MYEONOK",
    location: "Pangyo",
    industry: "restaurant",
    year: "2023", // 도면·현장사진 파일 날짜(2023-04) 기준. 실제 오픈 연도 확인 필요
    services: ["Interior Design"],
    size: "lg",
    featured: true,
    heroImage: "/projects/gochang-myeonok/hero.jpg",
    thumbnail: "/projects/gochang-myeonok/hero.jpg",
    gallery: [
      "/projects/gochang-myeonok/gallery-1.jpg",
      "/projects/gochang-myeonok/gallery-2.jpg",
      "/projects/gochang-myeonok/gallery-3.jpg",
    ],
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
    heroImage: "/projects/gongsajung-pocha-suwan/hero.jpg",
    thumbnail: "/projects/gongsajung-pocha-suwan/hero.jpg",
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
    heroImage: "/projects/oven-day/hero.jpg",
    thumbnail: "/projects/oven-day/hero.jpg",
    gallery: [
      "/projects/oven-day/gallery-1.jpg",
      "/projects/oven-day/gallery-2.jpg",
      "/projects/oven-day/gallery-3.jpg",
      "/projects/oven-day/gallery-4.jpg",
    ],
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
