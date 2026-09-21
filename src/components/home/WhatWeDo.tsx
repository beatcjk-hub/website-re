import Container from "@/components/layout/Container";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import Reveal from "./Reveal";

const SERVICES = [
  {
    number: "01",
    title: "BRANDING",
    items: ["Brand Strategy", "Naming", "Identity", "Graphic Design", "Signage"],
    highlight: false,
  },
  {
    number: "02",
    title: "INTERIOR",
    items: ["Space Planning", "Interior Design", "3D Visualization", "Construction"],
    highlight: false,
  },
  {
    number: "03",
    title: "BRAND × SPACE",
    items: [
      "Brand Concept",
      "Spatial Identity",
      "Signage",
      "Environmental Graphics",
      "Customer Experience",
    ],
    // 가장 차별화된 서비스 — 유일하게 포인트 컬러를 사용
    highlight: true,
  },
];

export default function WhatWeDo() {
  return (
    <section className="border-t border-line py-24 sm:py-32">
      <Container>
        <Reveal>
          <h2 className="font-display text-display-2 font-bold">WHAT WE DO</h2>
        </Reveal>

        <div className="mt-16 divide-y divide-line border-t border-line">
          {SERVICES.map((service) => (
            <div
              key={service.number}
              className="group grid grid-cols-1 gap-6 py-10 sm:grid-cols-12 sm:items-center"
            >
              <div className="sm:col-span-1">
                <span
                  className={`text-small font-medium ${
                    service.highlight ? "text-ink" : "text-stone-400"
                  }`}
                >
                  {service.number}
                </span>
              </div>

              <div className="sm:col-span-4">
                <h3
                  className={`font-display text-heading-1 font-bold ${
                    service.highlight ? "text-ink" : ""
                  }`}
                >
                  {service.title}
                  {service.highlight && (
                    <span className="ml-2 inline-block h-2 w-2 rounded-full bg-banana align-middle" />
                  )}
                </h3>
              </div>

              <ul className="flex flex-wrap gap-x-4 gap-y-1 text-small text-stone-600 sm:col-span-4">
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="sm:col-span-3">
                <PlaceholderImage
                  label={service.title}
                  aspect="4/3"
                  className="scale-95 opacity-70 transition-all duration-500 ease-eb group-hover:scale-100 group-hover:opacity-100"
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
