export type Service = { id: string; title: string; summary: string; items: string[] };

/** 스펙 §19 서비스 구조. 각 항목은 /services#id 로 바로 이동할 수 있다. */
export const SERVICES: Service[] = [
  {
    id: "interior",
    title: "INTERIOR",
    summary: "공간의 목적과 동선을 설계하고, 시공까지 책임집니다.",
    items: ["Space Planning", "Interior Design", "Construction"],
  },
  {
    id: "branding",
    title: "BRANDING",
    summary: "브랜드의 이름, 이야기, 시각 언어를 만듭니다.",
    items: ["Brand Strategy", "Naming", "Identity"],
  },
  {
    id: "brand-space",
    title: "BRAND × SPACE",
    summary: "브랜드 콘셉트를 공간 경험으로 번역하는 EB-DS의 핵심 서비스입니다.",
    items: ["Brand Concept", "Spatial Identity", "Environmental Graphics", "Customer Experience"],
  },
  {
    id: "graphic",
    title: "GRAPHIC",
    summary: "메뉴, 패키지, 사인 등 고객이 만나는 모든 그래픽을 디자인합니다.",
    items: ["Graphic Design", "Signage", "Menu & Print"],
  },
  {
    id: "3d",
    title: "3D",
    summary: "시공 전에 공간을 미리 보고 결정할 수 있도록 시각화합니다.",
    items: ["3D Visualization", "Renders", "Design Review"],
  },
];
