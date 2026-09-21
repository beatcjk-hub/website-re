export type Insight = {
  slug: string;
  title: string;
  category: "Interior" | "Branding" | "Commercial Space" | "Construction" | "Design Tips";
  relatedProjects: string[]; // Project slug
  body?: string[]; // 문단 배열. 비어 있으면 "준비 중"으로 표시
  publishedAt?: string;
};

/** 글이 작성되면 body에 문단을 채우고 publishedAt을 넣는다. 나중에 CMS로 이전 예정. */
export const INSIGHTS: Insight[] = [
  {
    slug: "30-pyeong-restaurant-cost",
    title: "30평 식당 인테리어, 비용은 얼마나 들까?",
    category: "Interior",
    relatedProjects: ["pami-garden", "gochang-myeonok"],
  },
  {
    slug: "cafe-circulation",
    title: "카페 디자인에서 동선이 중요한 이유",
    category: "Design Tips",
    relatedProjects: ["suje-cheongnyeon"],
  },
  {
    slug: "commercial-lease-checklist",
    title: "상가 임대차 계약 전 반드시 확인할 것",
    category: "Commercial Space",
    relatedProjects: ["iri-beer-iksan"],
  },
  {
    slug: "branding-and-interior",
    title: "브랜딩과 인테리어는 어떻게 함께 작동하는가",
    category: "Branding",
    relatedProjects: ["apoo"],
  },
];

export const getInsight = (slug: string) => INSIGHTS.find((i) => i.slug === slug);
