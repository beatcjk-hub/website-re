import "server-only";
import type { Inquiry } from "@/lib/inquiry";
import { CONTACT } from "@/data/site";

/** 도메인 인증 전에는 Resend 기본 발신 주소만 쓸 수 있다. */
const FROM = process.env.INQUIRY_FROM_EMAIL ?? "EB-DS Website <onboarding@resend.dev>";

type SendArgs = { to: string; subject: string; text: string; replyTo?: string };

/** Resend REST API로 메일 한 통을 보낸다. 성공 true, 실패 false. */
async function send({ to, subject, text, replyTo }: SendArgs): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM, to, subject, text, ...(replyTo ? { reply_to: replyTo } : {}) }),
    });
    if (!res.ok) {
      console.error("inquiry email failed", res.status, await res.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("inquiry email failed", error);
    return false;
  }
}

/**
 * 새 상담 문의를 관리자에게 알린다.
 * RESEND_API_KEY와 INQUIRY_NOTIFY_EMAIL이 모두 있을 때만 동작하며, 없으면 null(=미설정)을 돌려준다.
 * 실패해도 DB에 저장된 문의는 유지되므로 호출하는 쪽에서 오류로 취급하지 않는다.
 */
export async function sendInquiryEmail(inquiry: Inquiry): Promise<boolean | null> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_NOTIFY_EMAIL;
  if (!apiKey || !to) {
    console.error("inquiry email skipped — missing env", { hasApiKey: Boolean(apiKey), hasTo: Boolean(to) });
    return null;
  }

  const line = (label: string, value: string | string[]) =>
    `${label}: ${Array.isArray(value) ? value.join(", ") : value || "-"}`;

  const text = [
    "웹사이트에서 새 상담 문의가 접수되었습니다.",
    "",
    line("이름", inquiry.name),
    line("회사/브랜드", inquiry.company),
    line("전화", inquiry.phone),
    line("이메일", inquiry.email),
    "",
    line("프로젝트 종류", inquiry.projectType),
    line("업종", inquiry.industry),
    line("필요한 서비스", inquiry.services),
    line("위치", inquiry.location),
    line("면적", inquiry.area),
    line("예산", inquiry.budgetRange),
    line("희망 오픈 시기", inquiry.expectedOpeningDate),
    line("상담 시작 프로젝트", inquiry.fromProject),
    "",
    "문의 내용:",
    inquiry.message || "-",
  ].join("\n");

  // 답장을 누르면 고객에게 바로 회신된다. 이메일 입력은 형식 검증을 통과한 값만 온다.
  return send({ to, subject: `[EB-DS 상담] ${inquiry.name} · ${inquiry.projectType}`, text, replyTo: inquiry.email });
}

/**
 * 고객이 이메일을 남겼다면 "접수 완료" 확인 메일을 보낸다.
 * 이메일을 안 남겼거나(email 선택 입력) 환경변수가 없으면 null.
 */
export async function sendInquiryConfirmationEmail(inquiry: Inquiry): Promise<boolean | null> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !inquiry.email) return null;

  const text = [
    `${inquiry.name}님, 안녕하세요.`,
    "",
    "ELECTRIC BANANA에 남겨주신 프로젝트 상담 문의가 정상적으로 접수되었습니다.",
    "내용을 확인 후 빠르게 연락드리겠습니다.",
    "",
    "남겨주신 연락처:",
    `- 전화: ${inquiry.phone}`,
    `- 이메일: ${inquiry.email}`,
    "",
    "문의하신 내용:",
    inquiry.message || "-",
    "",
    "급하신 경우 아래로 바로 연락 주셔도 됩니다.",
    `- 전화: ${CONTACT.phone}`,
    `- 이메일: ${CONTACT.email}`,
    "",
    "감사합니다.",
    "ELECTRIC BANANA",
  ].join("\n");

  return send({ to: inquiry.email, subject: "[ELECTRIC BANANA] 문의가 접수되었습니다", text, replyTo: CONTACT.email });
}
