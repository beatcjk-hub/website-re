import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import PageIntro from "@/components/ui/PageIntro";
import ContactForm from "@/components/forms/ContactForm";
import { CONTACT } from "@/data/site";
import { getProject } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Contact",
  description: "프로젝트 상담을 시작하세요. ELECTRIC BANANA가 브랜드와 공간을 함께 설계합니다.",
  alternates: { canonical: "/contact" },
};

type Props = { searchParams: Promise<{ from?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const { from } = await searchParams;
  // 존재하는 프로젝트 slug만 받아 임의 문자열이 폼에 들어가지 않게 한다.
  const fromProject = from && (await getProject(from)) ? from : "";

  return (
    <>
      <PageIntro title="START A PROJECT" lead="세 단계로 간단히 알려주세요. 확인 후 연락드립니다." />
      <Container className="grid gap-16 pb-32 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ContactForm fromProject={fromProject} />
        </div>
        <address className="not-italic text-body lg:col-span-4 lg:col-start-9">
          <p className="text-small text-stone-600">CALL</p>
          <a href={CONTACT.phoneHref} className="mt-1 block hover:text-stone-600">{CONTACT.phone}</a>
          <p className="mt-6 text-small text-stone-600">EMAIL</p>
          <a href={`mailto:${CONTACT.email}`} className="mt-1 block hover:text-stone-600">{CONTACT.email}</a>
          <p className="mt-6 text-small text-stone-600">STUDIO</p>
          <p className="mt-1">{CONTACT.address}</p>
        </address>
      </Container>
    </>
  );
}
