import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import PageIntro from "@/components/ui/PageIntro";
import CtaBand from "@/components/ui/CtaBand";
import { CONTACT } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: "ELECTRIC BANANA는 브랜드, 공간, 그래픽을 하나로 설계하는 디자인 스튜디오입니다.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageIntro title="번뜩이다." lead="ELECTRIC BANANA는 공간을 만들고, 브랜드의 경험을 설계하는 디자인 스튜디오입니다." />
      <Container className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="font-display text-display-2 font-bold">
            BRAND × SPACE
            <br />× EXPERIENCE
          </p>
          <p className="mt-8 max-w-xl text-body text-stone-600">
            브랜딩, 인테리어, 그래픽, 사인, 3D 시각화, 설계와 시공까지. 흩어져 있는 작업을 하나의 콘셉트로 연결해
            브랜드가 공간에서 일관되게 경험되도록 만듭니다.
          </p>
          {/* TODO: 회사 철학·대표 소개 문구를 확정 후 추가 (기존 사이트 ABOUT의 5줄 철학 참고) */}
        </div>
        <address className="not-italic text-body lg:col-span-5">
          <p className="text-small text-stone-600">STUDIO</p>
          <p className="mt-2">{CONTACT.address}</p>
          <p className="mt-6 text-small text-stone-600">CONTACT</p>
          <p className="mt-2">
            <a href={CONTACT.phoneHref} className="hover:text-stone-600">T. {CONTACT.phone}</a>
            <br />F. {CONTACT.fax}
            <br />
            <a href={`mailto:${CONTACT.email}`} className="hover:text-stone-600">{CONTACT.email}</a>
          </p>
        </address>
      </Container>
      <div className="mt-24">
        <CtaBand />
      </div>
    </>
  );
}
