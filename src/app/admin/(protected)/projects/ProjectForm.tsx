import type { Project } from "@/types/project";

const inputClass = "mt-1 w-full border-b border-ink/30 bg-transparent py-2 text-body outline-none focus:border-ink";
const labelClass = "block text-small text-stone-600";
const fieldset = "grid gap-6 sm:grid-cols-2";

/** 배열 필드를 폼에 보여줄 때 쓰는 표현. gallery 등은 줄바꿈, services 등은 쉼표로 join한다. */
const join = (list: string[] | undefined, sep: string) => (list ?? []).join(sep);

/**
 * 새 프로젝트 만들기/수정 화면에서 함께 쓰는 입력 폼.
 * Server Component라서 각 입력은 그냥 name + defaultValue만 있고, 제출은 action prop의 서버 액션이 처리한다.
 */
export default function ProjectForm({
  action,
  project,
  admin,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  project?: Project;
  admin?: { sortOrder: number; isPublished: boolean };
  submitLabel: string;
}) {
  return (
    <form action={action} className="space-y-10">
      <fieldset className={fieldset}>
        <legend className="sr-only">기본 정보</legend>
        <div>
          <label className={labelClass} htmlFor="slug">
            slug (URL, 영문 소문자-하이픈) {project && "— 만든 뒤에는 바꿀 수 없습니다"}
          </label>
          <input
            id="slug"
            name="slug"
            required
            readOnly={Boolean(project)}
            defaultValue={project?.slug}
            className={`${inputClass} ${project ? "text-stone-400" : ""}`}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="title">
            제목 (국문)
          </label>
          <input id="title" name="title" required defaultValue={project?.title} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="titleEn">
            제목 (영문, 화면 큰 타이포)
          </label>
          <input id="titleEn" name="titleEn" required defaultValue={project?.titleEn} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="client">
            클라이언트명
          </label>
          <input id="client" name="client" defaultValue={project?.client} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="location">
            위치 (영문, 예: Gwangju)
          </label>
          <input id="location" name="location" defaultValue={project?.location} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="industry">
            업종
          </label>
          <select id="industry" name="industry" defaultValue={project?.industry ?? "restaurant"} className={inputClass}>
            <option value="restaurant">Restaurant</option>
            <option value="cafe">Cafe</option>
            <option value="retail">Retail</option>
            <option value="office">Office</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="area">
            면적
          </label>
          <input id="area" name="area" defaultValue={project?.area} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="year">
            연도
          </label>
          <input id="year" name="year" defaultValue={project?.year} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="services">
            서비스 (쉼표로 구분: Interior, Branding)
          </label>
          <input id="services" name="services" defaultValue={join(project?.services, ", ")} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="size">
            홈 카드 크기
          </label>
          <select id="size" name="size" defaultValue={project?.size ?? "md"} className={inputClass}>
            <option value="md">md</option>
            <option value="lg">lg</option>
            <option value="full">full</option>
          </select>
        </div>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="text-small text-stone-600">케이스 스터디 문구 (없으면 상세 페이지에서 해당 섹션이 숨겨집니다)</legend>
        <div>
          <label className={labelClass} htmlFor="summary">
            요약 (프로젝트 정보 아래 한 문단)
          </label>
          <textarea id="summary" name="summary" rows={2} defaultValue={project?.summary} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="challenge">
            THE CHALLENGE
          </label>
          <textarea id="challenge" name="challenge" rows={2} defaultValue={project?.challenge} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="concept">
            THE IDEA
          </label>
          <textarea id="concept" name="concept" rows={2} defaultValue={project?.concept} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="solution">
            FROM IDEA TO SPACE
          </label>
          <textarea id="solution" name="solution" rows={2} defaultValue={project?.solution} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="materials">
            주요 자재 (쉼표로 구분)
          </label>
          <input id="materials" name="materials" defaultValue={join(project?.materials, ", ")} className={inputClass} />
        </div>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="text-small text-stone-600">
          사진 (경로 한 줄에 하나씩. /public 아래 경로 또는 Supabase Storage 공개 URL)
        </legend>
        <div className={fieldset}>
          <div>
            <label className={labelClass} htmlFor="heroImage">
              대표 사진 (hero)
            </label>
            <input id="heroImage" name="heroImage" defaultValue={project?.heroImage} className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="thumbnail">
              썸네일 (비우면 대표 사진 사용)
            </label>
            <input id="thumbnail" name="thumbnail" defaultValue={project?.thumbnail} className={inputClass} />
          </div>
        </div>
        <div>
          <label className={labelClass} htmlFor="gallery">
            THE SPACE 갤러리
          </label>
          <textarea id="gallery" name="gallery" rows={3} defaultValue={join(project?.gallery, "\n")} className={inputClass} />
        </div>
        <div className={fieldset}>
          <div>
            <label className={labelClass} htmlFor="renderImages">
              3D 렌더 (constructionImages와 같은 순서로 짝을 이룸)
            </label>
            <textarea
              id="renderImages"
              name="renderImages"
              rows={3}
              defaultValue={join(project?.renderImages, "\n")}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="constructionImages">
              시공 완료 사진
            </label>
            <textarea
              id="constructionImages"
              name="constructionImages"
              rows={3}
              defaultValue={join(project?.constructionImages, "\n")}
              className={inputClass}
            />
          </div>
        </div>
        <div className={fieldset}>
          <div>
            <label className={labelClass} htmlFor="beforeImages">
              BEFORE (afterImages와 같은 순서로 짝을 이룸)
            </label>
            <textarea
              id="beforeImages"
              name="beforeImages"
              rows={3}
              defaultValue={join(project?.beforeImages, "\n")}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="afterImages">
              AFTER
            </label>
            <textarea
              id="afterImages"
              name="afterImages"
              rows={3}
              defaultValue={join(project?.afterImages, "\n")}
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label className={labelClass} htmlFor="video">
            히어로 영상 URL (선택)
          </label>
          <input id="video" name="video" defaultValue={project?.video} className={inputClass} />
        </div>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="text-small text-stone-600">SEO / 노출</legend>
        <div>
          <label className={labelClass} htmlFor="seoTitle">
            SEO 제목 (비우면 영문 제목 사용)
          </label>
          <input id="seoTitle" name="seoTitle" defaultValue={project?.seoTitle} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="seoDescription">
            SEO 설명 (비우면 요약 사용)
          </label>
          <textarea id="seoDescription" name="seoDescription" rows={2} defaultValue={project?.seoDescription} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="sortOrder">
            정렬 순서 (작을수록 먼저 표시)
          </label>
          <input
            id="sortOrder"
            name="sortOrder"
            type="number"
            defaultValue={admin?.sortOrder ?? 100}
            className={`${inputClass} max-w-32`}
          />
        </div>
        <label className="flex items-center gap-2 text-small">
          <input type="checkbox" name="featured" defaultChecked={project?.featured} />
          홈 SELECTED PROJECTS에 노출
        </label>
        <label className="flex items-center gap-2 text-small">
          <input type="checkbox" name="isPublished" defaultChecked={admin?.isPublished ?? true} />
          공개 (끄면 /projects 아카이브와 홈에서 숨겨짐)
        </label>
      </fieldset>

      <button
        type="submit"
        className="min-h-11 border border-ink bg-ink px-6 py-3 text-small text-paper hover:border-banana hover:bg-banana hover:text-ink"
      >
        {submitLabel}
      </button>
    </form>
  );
}
