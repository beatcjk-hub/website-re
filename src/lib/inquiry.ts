/** 상담 문의 데이터와 검증. 브라우저 폼과 서버 API가 같은 규칙을 공유한다. */
export const PROJECT_TYPES = ["신규 오픈", "리뉴얼", "브랜딩만", "기타"] as const;
export const BUDGET_RANGES = ["3천만원 미만", "3천~5천만원", "5천~1억원", "1억원 이상", "미정"] as const;

export type Inquiry = {
  projectType: string;
  industry: string;
  services: string[];
  location: string;
  area: string;
  budgetRange: string;
  expectedOpeningDate: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  message: string;
  fromProject: string; // 상담을 시작한 프로젝트 slug (없으면 "")
};

export type InquiryErrors = Partial<Record<keyof Inquiry, string>>;

export const EMPTY_INQUIRY: Inquiry = {
  projectType: "",
  industry: "",
  services: [],
  location: "",
  area: "",
  budgetRange: "",
  expectedOpeningDate: "",
  name: "",
  company: "",
  phone: "",
  email: "",
  message: "",
  fromProject: "",
};

/** 단계별 필수값. 1단계: 프로젝트 종류, 2단계: 없음(모두 선택), 3단계: 연락처 */
export function validateInquiry(data: Inquiry, step?: 1 | 2 | 3): InquiryErrors {
  const errors: InquiryErrors = {};
  const all = step === undefined;
  if ((all || step === 1) && !data.projectType) errors.projectType = "프로젝트 종류를 선택해 주세요.";
  if (all || step === 3) {
    if (!data.name.trim()) errors.name = "성함을 입력해 주세요.";
    if (!/^[0-9\-+\s()]{9,20}$/.test(data.phone.trim())) errors.phone = "연락 가능한 전화번호를 입력해 주세요.";
    if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errors.email = "이메일 형식이 올바르지 않습니다.";
  }
  return errors;
}

/** 서버에서 신뢰할 수 없는 body를 Inquiry로 정리한다. 길이를 제한해 남용을 막는다. */
export function parseInquiry(body: unknown): Inquiry {
  const raw = (body ?? {}) as Record<string, unknown>;
  const text = (key: string, max = 200) => String(raw[key] ?? "").trim().slice(0, max);
  return {
    projectType: text("projectType", 50),
    industry: text("industry", 50),
    services: Array.isArray(raw.services) ? raw.services.slice(0, 10).map((s) => String(s).slice(0, 50)) : [],
    location: text("location"),
    area: text("area", 50),
    budgetRange: text("budgetRange", 50),
    expectedOpeningDate: text("expectedOpeningDate", 50),
    name: text("name", 100),
    company: text("company", 100),
    phone: text("phone", 30),
    email: text("email", 100),
    message: text("message", 3000),
    fromProject: text("fromProject", 100),
  };
}
