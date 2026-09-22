import { notFound } from "next/navigation";
import { fromRow } from "@/lib/projects";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import ProjectForm from "../ProjectForm";
import { deleteProject, updateProject } from "../actions";
import DeleteButton from "./DeleteButton";

type Props = { params: Promise<{ id: string }> };

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const supabase = getSupabaseAdmin();
  if (!supabase) return <p className="text-body text-stone-600">Supabase가 연결되어 있지 않습니다.</p>;

  const { data, error } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();
  if (error) return <p className="text-body text-red-700">불러오지 못했습니다: {error.message}</p>;
  if (!data) notFound();

  const project = fromRow(data);
  const boundUpdate = updateProject.bind(null, id);
  const boundDelete = deleteProject.bind(null, id);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-heading-1 font-bold">{project.titleEn}</h1>
        <DeleteButton action={boundDelete} title={project.titleEn} />
      </div>
      <div className="mt-8 max-w-2xl">
        <ProjectForm
          action={boundUpdate}
          project={project}
          admin={{ sortOrder: data.sort_order, isPublished: data.is_published }}
          submitLabel="저장"
        />
      </div>
    </div>
  );
}
