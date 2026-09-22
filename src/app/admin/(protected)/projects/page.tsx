import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type Row = { id: string; title_en: string; is_published: boolean; featured: boolean; sort_order: number };

export default async function AdminProjectsPage() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return <p className="text-body text-stone-600">Supabase가 연결되어 있지 않습니다.</p>;

  const { data, error } = await supabase
    .from("projects")
    .select("id,title_en,is_published,featured,sort_order")
    .order("sort_order");

  if (error) return <p className="text-body text-red-700">프로젝트를 불러오지 못했습니다: {error.message}</p>;
  const rows = (data ?? []) as Row[];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-heading-1 font-bold">프로젝트 ({rows.length})</h1>
        <Link
          href="/admin/projects/new"
          className="min-h-11 border border-ink px-4 py-2 text-small font-medium hover:bg-ink hover:text-paper"
        >
          + 새 프로젝트
        </Link>
      </div>

      <ul className="mt-8 divide-y divide-line border-t border-line">
        {rows.map((p) => (
          <li key={p.id} className="flex items-center justify-between gap-4 py-4">
            <Link href={`/admin/projects/${p.id}`} className="font-display font-bold hover:text-stone-600">
              {p.title_en}
            </Link>
            <div className="flex items-center gap-3 text-small text-stone-600">
              {p.featured && <span>FEATURED</span>}
              <span>{p.sort_order}</span>
              <span className={p.is_published ? "text-stone-600" : "text-red-700"}>
                {p.is_published ? "공개" : "비공개"}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
