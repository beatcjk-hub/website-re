import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import PageIntro from "@/components/ui/PageIntro";
import CtaBand from "@/components/ui/CtaBand";
import { SERVICES } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description: "인테리어, 브랜딩, 그래픽, 3D까지. 브랜드와 공간을 함께 설계하는 ELECTRIC BANANA의 서비스.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro title="SERVICES" lead="브랜드와 공간, 그래픽을 따로 맡기지 않아도 됩니다. 하나의 콘셉트로 이어서 설계합니다." />
      <Container>
        <ul className="border-t border-line">
          {SERVICES.map((service, i) => (
            <li key={service.id} id={service.id} className="grid scroll-mt-28 gap-6 border-b border-line py-12 lg:grid-cols-12">
              <span className="text-small text-stone-400 lg:col-span-1">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="font-display text-heading-1 font-bold lg:col-span-4">
                {service.title}
                {service.id === "brand-space" && <span className="ml-2 inline-block h-2 w-2 rounded-full bg-banana align-middle" />}
              </h2>
              <div className="lg:col-span-7">
                <p className="text-body">{service.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-small text-stone-600">
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </Container>
      <div className="mt-24">
        <CtaBand />
      </div>
    </>
  );
}
