import ProjectForm from "../ProjectForm";
import { createProject } from "../actions";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="font-display text-heading-1 font-bold">새 프로젝트</h1>
      <div className="mt-8 max-w-2xl">
        <ProjectForm action={createProject} submitLabel="만들기" />
      </div>
    </div>
  );
}
