import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import CtaBand from "@/components/ui/CtaBand";
import { INSIGHTS, getInsight } from "@/data/insights";
import { getProject } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => INSIGHTS.map((i) => ({ slug: i.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const insight = getInsight((await params).slug);
  if (!insight) return {};
  return {
    title: insight.title,
    description: insight.body?.[0] ?? `${insight.category} — ELECTRIC BANANA Insights`,
    alternates: { canonical: `/insights/${insight.slug}` },
  };
}

export default async function InsightPage({ params }: Props) {
  const insight = getInsight((await params).slug);
  if (!insight) notFound();
  const related = insight.relatedProjects.flatMap((slug) => getProject(slug) ?? []);

  return (
    <>
      <article>
        <Container className="pt-40 sm:pt-48">
          <Link href="/insights" className="text-small text-stone-600 hover:text-ink">← INSIGHTS</Link>
          <p className="mt-6 text-small text-stone-600">{insight.category}</p>
          <h1 className="mt-2 max-w-3xl font-display text-display-2 font-bold">{insight.title}</h1>
          <div className="mt-12 max-w-2xl space-y-6 text-body">
            {insight.body?.length ? (
              insight.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
            ) : (
              <p className="text-stone-600">이 글은 준비 중입니다.</p>
            )}
          </div>
        </Container>
        {related.length > 0 && (
          <Container className="mt-20 pb-24">
            <p className="text-small text-stone-600">RELATED PROJECTS</p>
            <ul className="mt-4 border-t border-line">
              {related.map((project) => (
                <li key={project.slug} className="border-b border-line">
                  <Link href={`/projects/${project.slug}`} className="flex justify-between py-5 hover:text-stone-600">
                    <span className="font-display text-heading-2 font-bold">{project.titleEn}</span>
                    <span className="text-small">VIEW ↗</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        )}
      </article>
      <CtaBand />
    </>
  );
}
