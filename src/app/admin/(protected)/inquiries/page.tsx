import { getSupabaseAdmin } from "@/lib/supabase/server";
import StatusSelect from "./StatusSelect";

export const dynamic = "force-dynamic"; // 항상 최신 문의를 보여준다 (캐시 안 함)

type Row = {
  id: string;
  created_at: string;
  status: string;
  project_type: string;
  industry: string | null;
  services: string[];
  name: string;
  company: string | null;
  phone: string;
  email: string | null;
  message: string | null;
  from_project: string | null;
};

export default async function InquiriesPage() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return <p className="text-body text-stone-600">Supabase가 연결되어 있지 않습니다.</p>;

  const { data, error } = await supabase
    .from("inquiries")
    .select("id,created_at,status,project_type,industry,services,name,company,phone,email,message,from_project")
    .order("created_at", { ascending: false });

  if (error) return <p className="text-body text-red-700">문의를 불러오지 못했습니다: {error.message}</p>;

  const rows = (data ?? []) as Row[];

  return (
    <div>
      <h1 className="font-display text-heading-1 font-bold">문의 ({rows.length})</h1>

      {rows.length === 0 ? (
        <p className="mt-6 text-body text-stone-600">아직 들어온 문의가 없습니다.</p>
      ) : (
        <ul className="mt-8 divide-y divide-line border-t border-line">
          {rows.map((r) => (
            <li key={r.id} className="py-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-small text-stone-600">
                    {new Date(r.created_at).toLocaleString("ko-KR")} · {r.project_type}
                    {r.from_project && ` · ${r.from_project}`}
                  </p>
                  <p className="mt-1 font-display text-heading-2 font-bold">
                    {r.name} {r.company && `(${r.company})`}
                  </p>
                  <p className="mt-1 text-small">
                    <a href={`tel:${r.phone}`} className="hover:text-stone-600">
                      {r.phone}
                    </a>
                    {r.email && (
                      <>
                        {" · "}
                        <a href={`mailto:${r.email}`} className="hover:text-stone-600">
                          {r.email}
                        </a>
                      </>
                    )}
                  </p>
                  {(r.industry || r.services.length > 0) && (
                    <p className="mt-1 text-small text-stone-600">
                      {[r.industry, r.services.join(", ")].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  {r.message && <p className="mt-2 max-w-xl text-body">{r.message}</p>}
                </div>
                <StatusSelect id={r.id} status={r.status} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
