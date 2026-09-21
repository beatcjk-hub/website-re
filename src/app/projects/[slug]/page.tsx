import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import Photo from "@/components/ui/Photo";
import CompareSlider from "@/components/ui/CompareSlider";
import CaseStudySection from "@/components/projects/CaseStudySection";
import ProjectGallery from "@/components/projects/ProjectGallery";
import { PROJECTS, getProject, projectMeta } from "@/data/projects";
import { INDUSTRY_LABELS } from "@/types/project";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => PROJECTS.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  const title = project.seoTitle ?? project.titleEn;
  const description = project.seoDescription ?? project.summary ?? `${project.title} — ${projectMeta(project)}`;
  const image = project.heroImage ?? project.thumbnail;
  return {
    title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title, description, images: image ? [image] : undefined },
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const next = PROJECTS[(PROJECTS.indexOf(project) + 1) % PROJECTS.length];
  const info: [string, string | undefined][] = [
    ["CLIENT", project.client],
    ["LOCATION", project.location],
    ["INDUSTRY", INDUSTRY_LABELS[project.industry]],
    ["AREA", project.area],
    ["YEAR", project.year],
    ["SERVICES", project.services.join(", ")],
  ];
  const visibleInfo = info.filter(([, value]) => value);

  // 3D와 시공 사진은 같은 순서로 짝을 이룬 만큼만 비교 슬라이더로 보여준다.
  const renders = project.renderImages ?? [];
  const builds = project.constructionImages ?? [];
  const renderPairs = renders.slice(0, builds.length).map((render, i) => [render, builds[i]] as const);
  const beforeAfterPairs = (project.beforeImages ?? []).map(
    (before, i) => [before, project.afterImages?.[i]] as const,
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    alternateName: project.titleEn,
    description: project.summary,
    genre: INDUSTRY_LABELS[project.industry],
    locationCreated: project.location || undefined,
    dateCreated: project.year || undefined,
    datePublished: project.publishedAt,
    image: project.heroImage,
    creator: { "@type": "Organization", name: "ELECTRIC BANANA" },
  };

  let section = 0;
  const num = () => String(++section).padStart(2, "0");

  return (
    <article className="pt-36 sm:pt-44">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* PROJECT HERO */}
      <Container>
        <Link href="/projects" className="text-small text-stone-600 hover:text-ink">
          ← PROJECTS
        </Link>
        <h1 className="mt-6 font-display text-display-1 font-bold">{project.titleEn}</h1>
        <p className="mt-4 text-heading-2">{project.title}</p>
      </Container>
      <Container className="mt-12">
        {project.video ? (
          <video
            className="aspect-video w-full object-cover"
            src={project.video}
            poster={project.heroImage}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <Photo src={project.heroImage} alt={`${project.titleEn} hero`} aspect="16/9" sizes="100vw" priority />
        )}
      </Container>

      {/* PROJECT INFORMATION */}
      <Container className="mt-12">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-6 sm:grid-cols-3 lg:grid-cols-6">
          {visibleInfo.map(([label, value]) => (
            <div key={label}>
              <dt className="text-small text-stone-600">{label}</dt>
              <dd className="mt-1 text-body">{value}</dd>
            </div>
          ))}
        </dl>
        {project.summary && <p className="mt-10 max-w-2xl text-body text-stone-600">{project.summary}</p>}
      </Container>

      <div className="mt-20 sm:mt-28">
        {project.challenge && (
          <CaseStudySection number={num()} title="THE CHALLENGE">
            <p className="max-w-2xl text-body">{project.challenge}</p>
          </CaseStudySection>
        )}

        {project.concept && (
          <CaseStudySection number={num()} title="THE IDEA">
            <p className="max-w-2xl text-body">{project.concept}</p>
          </CaseStudySection>
        )}

        {project.solution && (
          <CaseStudySection number={num()} title="FROM IDEA TO SPACE">
            <p className="max-w-2xl text-body">{project.solution}</p>
          </CaseStudySection>
        )}

        {renderPairs.length > 0 && (
          <CaseStudySection number={num()} title="3D VS BUILT">
            <div className="grid gap-6">
              {renderPairs.map(([render, built]) => (
                <CompareSlider key={render} before={render} after={built} beforeLabel="3D" afterLabel="BUILT" alt={project.titleEn} />
              ))}
            </div>
          </CaseStudySection>
        )}

        {project.gallery && project.gallery.length > 0 && (
          <section className="border-t border-line py-20 sm:py-28">
            <Container>
              <span className="bg-banana px-1.5 text-small font-medium text-ink">{num()}</span>
              <h2 className="mb-10 mt-3 font-display text-heading-1 font-bold">THE SPACE</h2>
            </Container>
            <ProjectGallery images={project.gallery} alt={project.titleEn} />
          </section>
        )}

        {project.materials && project.materials.length > 0 && (
          <CaseStudySection number={num()} title="DESIGN DETAILS">
            <ul className="grid gap-x-8 gap-y-2 text-body sm:grid-cols-2">
              {project.materials.map((material) => (
                <li key={material} className="border-b border-line py-2">
                  {material}
                </li>
              ))}
            </ul>
          </CaseStudySection>
        )}

        {beforeAfterPairs.length > 0 && (
          <CaseStudySection number={num()} title="BEFORE / AFTER">
            <div className="grid gap-6">
              {beforeAfterPairs.map(([before, after]) => (
                <CompareSlider key={before} before={before} after={after} beforeLabel="BEFORE" afterLabel="AFTER" alt={project.titleEn} />
              ))}
            </div>
          </CaseStudySection>
        )}
      </div>

      {/* PROJECT CTA */}
      <section className="border-t border-line bg-ink py-24 text-paper">
        <Container>
          <p className="font-display text-display-2 font-bold">
            LIKE THIS
            <br />
            PROJECT?
          </p>
          <Link
            href={`/contact?from=${project.slug}`}
            className="mt-8 inline-flex items-center gap-2 border border-paper px-6 py-3 text-small font-medium transition-colors hover:border-banana hover:bg-banana hover:text-ink"
          >
            START A PROJECT →
          </Link>
        </Container>
      </section>

      {/* NEXT PROJECT */}
      <Link href={`/projects/${next.slug}`} className="block border-t border-line py-16 hover:bg-stone-50">
        <Container>
          <p className="text-small text-stone-600">NEXT PROJECT ↗</p>
          <p className="mt-2 font-display text-display-2 font-bold">{next.titleEn}</p>
        </Container>
      </Link>
    </article>
  );
}
