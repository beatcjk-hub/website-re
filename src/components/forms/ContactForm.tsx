"use client";

import { CONTACT } from "@/data/site";
import { PROJECT_TYPES, EMPTY_INQUIRY, validateInquiry, type Inquiry, type InquiryErrors } from "@/lib/inquiry";
import { useState } from "react";

type Status = "editing" | "sending" | "success" | "failed";

const inputClass = "mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-body outline-none focus:border-ink";
const labelClass = "block text-small text-stone-600";

/** 한 화면에서 바로 보내는 상담 폼. 꼭 필요한 항목만 남겼다 (스펙 §22: 부담을 느낄 만큼 많은 입력란을 두지 않는다). */
export default function ContactForm({ fromProject = "" }: { fromProject?: string }) {
  const [data, setData] = useState<Inquiry>({ ...EMPTY_INQUIRY, fromProject });
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<Status>("editing");

  const set = <K extends keyof Inquiry>(key: K, value: Inquiry[K]) => setData((prev) => ({ ...prev, [key]: value }));

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
      <fieldset className="space-y-8">
        <legend className="sr-only">프로젝트 상담</legend>
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

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="name">성함 *</label>
            <input id="name" autoComplete="name" className={inputClass} value={data.name} onChange={(e) => set("name", e.target.value)} />
            {error("name")}
          </div>
          <div>
            <label className={labelClass} htmlFor="phone">연락처 *</label>
            <input id="phone" type="tel" autoComplete="tel" className={inputClass} value={data.phone} onChange={(e) => set("phone", e.target.value)} />
            {error("phone")}
          </div>
          <div>
            <label className={labelClass} htmlFor="location">위치 (지역/상권)</label>
            <input id="location" className={inputClass} value={data.location} onChange={(e) => set("location", e.target.value)} />
          </div>
          <div>
            <label className={labelClass} htmlFor="email">이메일</label>
            <input id="email" type="email" autoComplete="email" className={inputClass} value={data.email} onChange={(e) => set("email", e.target.value)} />
            {error("email")}
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="message">문의 내용</label>
          <textarea
            id="message"
            rows={4}
            placeholder="업종, 평수, 예상 예산, 희망 오픈 시기 등 편하게 적어 주세요."
            className={inputClass}
            value={data.message}
            onChange={(e) => set("message", e.target.value)}
          />
        </div>

        {/* 봇 차단용 숨김 입력칸: 사람은 보지 못하고 봇만 채운다 */}
        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px]" />
      </fieldset>

      {status === "failed" && (
        <p role="alert" className="mt-8 text-small text-red-700">
          전송에 실패했습니다. 잠시 후 다시 시도하시거나 {CONTACT.phone} 로 전화 주세요.
        </p>
      )}

      <div className="mt-10">
        <button type="submit" disabled={status === "sending"} className="min-h-11 border border-ink bg-ink px-6 py-3 text-small text-paper hover:border-banana hover:bg-banana hover:text-ink disabled:opacity-50">
          {status === "sending" ? "SENDING…" : "SEND →"}
        </button>
      </div>
    </form>
  );
}
