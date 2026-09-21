import "server-only";
import { PROJECTS as LOCAL_PROJECTS } from "@/data/projects";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { Project } from "@/types/project";

/**
 * 프로젝트 조회의 단일 창구. UI는 항상 여기서만 프로젝트를 가져온다.
 * Supabase가 연결되어 있으면 projects 테이블을, 아니면(또는 비어 있거나 오류면) src/data/projects.ts를 쓴다.
 * 오류는 로그를 남기고 로컬 데이터로 대체해 사이트가 빈 화면이 되지 않게 한다.
 */
type ProjectRow = Record<string, unknown>;

const opt = <T,>(value: T | null | undefined): T | undefined => value ?? undefined;

function fromRow(row: ProjectRow): Project {
  const r = row as Record<string, never>;
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    titleEn: r.title_en,
    client: opt(r.client),
    location: r.location ?? "",
    industry: r.industry,
    area: opt(r.area),
    year: r.year ?? "",
    services: r.services ?? [],
    summary: opt(r.summary),
    challenge: opt(r.challenge),
    concept: opt(r.concept),
    solution: opt(r.solution),
    materials: opt(r.materials),
    heroImage: opt(r.hero_image),
    thumbnail: opt(r.thumbnail),
    gallery: opt(r.gallery),
    beforeImages: opt(r.before_images),
    afterImages: opt(r.after_images),
    renderImages: opt(r.render_images),
    constructionImages: opt(r.construction_images),
    video: opt(r.video),
    featured: r.featured,
    seoTitle: opt(r.seo_title),
    seoDescription: opt(r.seo_description),
    publishedAt: opt(r.published_at),
    size: r.size,
  };
}

export async function getProjects(): Promise<Project[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return LOCAL_PROJECTS;

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_published", true)
    .order("sort_order")
    .order("published_at", { ascending: false, nullsFirst: false });

  if (error) {
    console.error("projects query failed; using local data", error.message);
    return LOCAL_PROJECTS;
  }
  // 테이블이 아직 비어 있는 초기 상태에서도 사이트가 비지 않도록 로컬 데이터를 쓴다.
  return data.length > 0 ? data.map(fromRow) : LOCAL_PROJECTS;
}

export async function getProject(slug: string) {
  return (await getProjects()).find((p) => p.slug === slug);
}

export async function getFeaturedProjects() {
  return (await getProjects()).filter((p) => p.featured);
}
