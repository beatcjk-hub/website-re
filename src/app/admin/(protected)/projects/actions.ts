"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getAdminUser } from "@/lib/supabase/auth-server";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const INDUSTRIES = ["restaurant", "cafe", "retail", "office", "commercial"];
const SIZES = ["lg", "md", "full"];

// 줄바꿈으로 구분해 입력한 여러 줄짜리 필드(갤러리 이미지 목록 등)를 배열로 바꾼다. 빈 줄은 버린다.
const lines = (v: FormDataEntryValue | null) =>
  String(v ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

// 쉼표로 구분해 입력한 한 줄짜리 목록(서비스, 자재 등)을 배열로 바꾼다.
const commaList = (v: FormDataEntryValue | null) =>
  String(v ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const text = (v: FormDataEntryValue | null) => {
  const s = String(v ?? "").trim();
  return s || null;
};

function parseProject(formData: FormData) {
  const industry = String(formData.get("industry"));
  const size = String(formData.get("size"));
  if (!INDUSTRIES.includes(industry)) throw new Error("잘못된 industry 값입니다.");
  if (!SIZES.includes(size)) throw new Error("잘못된 size 값입니다.");

  return {
    slug: String(formData.get("slug")).trim(),
    title: String(formData.get("title")).trim(),
    title_en: String(formData.get("titleEn")).trim(),
    client: text(formData.get("client")),
    location: String(formData.get("location") ?? "").trim(),
    industry,
    area: text(formData.get("area")),
    year: String(formData.get("year") ?? "").trim(),
    services: commaList(formData.get("services")),
    summary: text(formData.get("summary")),
    challenge: text(formData.get("challenge")),
    concept: text(formData.get("concept")),
    solution: text(formData.get("solution")),
    materials: commaList(formData.get("materials")),
    hero_image: text(formData.get("heroImage")),
    thumbnail: text(formData.get("thumbnail")),
    gallery: lines(formData.get("gallery")),
    before_images: lines(formData.get("beforeImages")),
    after_images: lines(formData.get("afterImages")),
    render_images: lines(formData.get("renderImages")),
    construction_images: lines(formData.get("constructionImages")),
    video: text(formData.get("video")),
    featured: formData.get("featured") === "on",
    seo_title: text(formData.get("seoTitle")),
    seo_description: text(formData.get("seoDescription")),
    size,
    sort_order: Number(formData.get("sortOrder")) || 100,
    is_published: formData.get("isPublished") === "on",
  };
}

async function requireAdminClient() {
  const user = await getAdminUser();
  if (!user) throw new Error("관리자만 할 수 있습니다.");
  const supabase = getSupabaseAdmin();
  if (!supabase) throw new Error("Supabase가 연결되어 있지 않습니다.");
  return supabase;
}

/** 새 프로젝트를 만든다. id는 slug와 같게 고정한다 — 두 값이 갈라지면 관리가 헷갈린다. */
export async function createProject(formData: FormData) {
  const supabase = await requireAdminClient();
  const values = parseProject(formData);
  if (!values.slug) throw new Error("slug는 비워둘 수 없습니다.");

  const { error } = await supabase.from("projects").insert({ id: values.slug, ...values });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  redirect(`/admin/projects/${values.slug}`);
}

/** 기존 프로젝트를 수정한다. slug(=id)는 만든 뒤에는 바꾸지 않는다 — URL이 바뀌면 이미 공유된 링크가 깨진다. */
export async function updateProject(id: string, formData: FormData) {
  const supabase = await requireAdminClient();
  const values = parseProject(formData);

  const { error } = await supabase.from("projects").update(values).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath(`/projects/${id}`);
}

export async function deleteProject(id: string) {
  const supabase = await requireAdminClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  redirect("/admin/projects");
}
