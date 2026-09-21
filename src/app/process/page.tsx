import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import PageIntro from "@/components/ui/PageIntro";
import CtaBand from "@/components/ui/CtaBand";
import { PROCESS_STAGES } from "@/data/process";

export const metadata: Metadata = {
  title: "Process",
  description: "탐색부터 오픈 이후의 경험까지, ELECTRIC BANANA가 프로젝트를 진행하는 6단계.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <>
      <PageIntro title="PROCESS" lead="처음 상담부터 오픈 이후까지, 여섯 단계로 프로젝트를 진행합니다." />
      <Container>
        <ol className="border-t border-line">
          {PROCESS_STAGES.map((stage) => (
            <li key={stage.number} className="grid gap-4 border-b border-line py-10 lg:grid-cols-12">
              <span className="text-small text-stone-400 lg:col-span-1">{stage.number}</span>
              <h2 className="font-display text-heading-1 font-bold lg:col-span-4">{stage.title}</h2>
              <p className="text-body text-stone-600 lg:col-span-7">{stage.description}</p>
            </li>
          ))}
        </ol>
      </Container>
      <div className="mt-24">
        <CtaBand />
      </div>
    </>
  );
}
