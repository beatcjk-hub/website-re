import "server-only";
import type { Inquiry } from "@/lib/inquiry";

/**
 * 새 상담 문의를 이메일로 알린다 (Resend REST API, 별도 패키지 없이 fetch 사용).
 * RESEND_API_KEY와 INQUIRY_NOTIFY_EMAIL이 모두 있을 때만 동작하며, 없으면 null(=미설정)을 돌려준다.
 * 성공하면 true, 전송 실패면 false. 실패해도 DB에 저장된 문의는 유지되므로 호출하는 쪽에서 오류로 취급하지 않는다.
 */
export async function sendInquiryEmail(inquiry: Inquiry): Promise<boolean | null> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_NOTIFY_EMAIL;
  if (!apiKey || !to) return null;

  // 도메인 인증 전에는 Resend 기본 발신 주소만 쓸 수 있다.
  const from = process.env.INQUIRY_FROM_EMAIL ?? "EB-DS Website <onboarding@resend.dev>";
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

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        subject: `[EB-DS 상담] ${inquiry.name} · ${inquiry.projectType}`,
        text,
        // 답장을 누르면 고객에게 바로 회신된다. 이메일 입력은 형식 검증을 통과한 값만 온다.
        ...(inquiry.email ? { reply_to: inquiry.email } : {}),
      }),
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
