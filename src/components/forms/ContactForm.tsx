"use client";

import { useState } from "react";
import { CONTACT } from "@/data/site";
import { SERVICES } from "@/data/services";
import { INDUSTRY_LABELS } from "@/types/project";
import {
  BUDGET_RANGES,
  EMPTY_INQUIRY,
  PROJECT_TYPES,
  validateInquiry,
  type Inquiry,
  type InquiryErrors,
} from "@/lib/inquiry";

type Status = "editing" | "sending" | "success" | "failed";

const inputClass = "mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-body outline-none focus:border-ink";
const labelClass = "block text-small text-stone-600";

/** 3단계로 나눈 상담 폼 (한 화면에 입력란이 몰리지 않게 Progressive Disclosure). */
export default function ContactForm({ fromProject = "" }: { fromProject?: string }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [data, setData] = useState<Inquiry>({ ...EMPTY_INQUIRY, fromProject });
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<Status>("editing");

  const set = <K extends keyof Inquiry>(key: K, value: Inquiry[K]) => setData((prev) => ({ ...prev, [key]: value }));

  const goNext = () => {
    const found = validateInquiry(data, step);
    setErrors(found);
    if (Object.keys(found).length === 0) setStep((step + 1) as 2 | 3);
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validateInquiry(data);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    const honeypot = new FormData(event.currentTarget).get("website");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: honeypot }),
      });
      setStatus(res.ok ? "success" : "failed");
    } catch {
      setStatus("failed");
    }
  };

  if (status === "success") {
    return (
      <div role="status">
        <p className="font-display text-display-2 font-bold">THANK YOU.</p>
        <p className="mt-6 text-body text-stone-600">문의가 접수되었습니다. 확인 후 빠르게 연락드리겠습니다.</p>
      </div>
    );
  }

  const error = (key: keyof Inquiry) =>
    errors[key] && (
      <p role="alert" className="mt-1 text-small text-red-700">
        {errors[key]}
      </p>
    );

  return (
    <form onSubmit={submit} noValidate>
      <p className="text-small text-stone-600">STEP {step} / 3</p>

      {step === 1 && (
        <fieldset className="mt-8 space-y-8">
          <legend className="sr-only">프로젝트 정보</legend>
          <div>
            <span className={labelClass}>프로젝트 종류 *</span>
            <div className="mt-3 flex flex-wrap gap-3">
              {PROJECT_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  aria-pressed={data.projectType === type}
                  onClick={() => set("projectType", type)}
                  className={`min-h-11 border px-4 py-2 text-small transition-colors ${
                    data.projectType === type ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            {error("projectType")}
          </div>
          <div>
            <label className={labelClass} htmlFor="industry">업종</label>
            <select id="industry" className={inputClass} value={data.industry} onChange={(e) => set("industry", e.target.value)}>
              <option value="">선택</option>
              {Object.values(INDUSTRY_LABELS).map((label) => (
                <option key={label}>{label}</option>
              ))}
              <option>Other</option>
            </select>
          </div>
          <div>
            <span className={labelClass}>필요한 서비스 (복수 선택)</span>
            <div className="mt-3 flex flex-wrap gap-3">
              {SERVICES.map((service) => {
                const active = data.services.includes(service.title);
                return (
                  <button
                    key={service.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => set("services", active ? data.services.filter((s) => s !== service.title) : [...data.services, service.title])}
                    className={`min-h-11 border px-4 py-2 text-small transition-colors ${active ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"}`}
                  >
                    {service.title}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="location">위치 (지역/상권)</label>
              <input id="location" className={inputClass} value={data.location} onChange={(e) => set("location", e.target.value)} />
            </div>
            <div>
              <label className={labelClass} htmlFor="area">면적 (평 또는 ㎡)</label>
              <input id="area" className={inputClass} value={data.area} onChange={(e) => set("area", e.target.value)} />
            </div>
          </div>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset className="mt-8 space-y-8">
          <legend className="sr-only">예산과 일정</legend>
          <div>
            <span className={labelClass}>예상 예산</span>
            <div className="mt-3 flex flex-wrap gap-3">
              {BUDGET_RANGES.map((range) => (
                <button
                  key={range}
                  type="button"
                  aria-pressed={data.budgetRange === range}
                  onClick={() => set("budgetRange", range)}
                  className={`min-h-11 border px-4 py-2 text-small transition-colors ${data.budgetRange === range ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"}`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className={labelClass} htmlFor="expectedOpeningDate">희망 오픈 시기</label>
            <input id="expectedOpeningDate" type="month" className={inputClass} value={data.expectedOpeningDate} onChange={(e) => set("expectedOpeningDate", e.target.value)} />
          </div>
        </fieldset>
      )}

      {step === 3 && (
        <fieldset className="mt-8 space-y-8">
          <legend className="sr-only">연락처</legend>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="name">성함 *</label>
              <input id="name" autoComplete="name" className={inputClass} value={data.name} onChange={(e) => set("name", e.target.value)} />
              {error("name")}
            </div>
            <div>
              <label className={labelClass} htmlFor="company">회사/브랜드명</label>
              <input id="company" autoComplete="organization" className={inputClass} value={data.company} onChange={(e) => set("company", e.target.value)} />
            </div>
            <div>
              <label className={labelClass} htmlFor="phone">전화번호 *</label>
              <input id="phone" type="tel" autoComplete="tel" className={inputClass} value={data.phone} onChange={(e) => set("phone", e.target.value)} />
              {error("phone")}
            </div>
            <div>
              <label className={labelClass} htmlFor="email">이메일</label>
              <input id="email" type="email" autoComplete="email" className={inputClass} value={data.email} onChange={(e) => set("email", e.target.value)} />
              {error("email")}
            </div>
          </div>
          <div>
            <label className={labelClass} htmlFor="message">문의 내용</label>
            <textarea id="message" rows={4} className={inputClass} value={data.message} onChange={(e) => set("message", e.target.value)} />
          </div>
          {/* 봇 차단용 숨김 입력칸: 사람은 보지 못하고 봇만 채운다 */}
          <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px]" />
        </fieldset>
      )}

      {status === "failed" && (
        <p role="alert" className="mt-8 text-small text-red-700">
          전송에 실패했습니다. 잠시 후 다시 시도하시거나 {CONTACT.phone} 로 전화 주세요.
        </p>
      )}

      <div className="mt-10 flex gap-4">
        {step > 1 && (
          <button type="button" onClick={() => setStep((step - 1) as 1 | 2)} className="min-h-11 border border-line px-6 py-3 text-small hover:border-ink">
            ← BACK
          </button>
        )}
        {/* key로 두 버튼을 별개 요소로 만든다. 같은 요소를 재사용하면 NEXT 클릭 중 type이 submit으로 바뀌어 폼이 바로 제출된다. */}
        {step < 3 ? (
          <button key="next" type="button" onClick={goNext} className="min-h-11 border border-ink bg-ink px-6 py-3 text-small text-paper hover:border-banana hover:bg-banana hover:text-ink">
            NEXT →
          </button>
        ) : (
          <button key="send" type="submit" disabled={status === "sending"} className="min-h-11 border border-ink bg-ink px-6 py-3 text-small text-paper hover:border-banana hover:bg-banana hover:text-ink disabled:opacity-50">
            {status === "sending" ? "SENDING…" : "SEND →"}
          </button>
        )}
      </div>
    </form>
  );
}
