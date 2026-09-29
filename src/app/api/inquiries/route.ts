import { NextResponse } from "next/server";
import { parseInquiry, validateInquiry } from "@/lib/inquiry";
import { sendInquiryEmail, sendInquiryConfirmationEmail } from "@/lib/inquiry-email";
import { getSupabaseAdmin } from "@/lib/supabase/server";

/**
 * 상담 문의 접수 API.
 * 흐름: 검증 → Supabase 저장(원본 보관) → 이메일 알림 + 웹훅 알림(향후 n8n).
 * 저장과 알림이 모두 실패하거나 하나도 설정되지 않으면 문의가 유실되므로 성공으로 응답하지 않는다.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || body.website) {
    // body.website는 사람이 볼 수 없는 honeypot 입력칸. 채워져 있으면 봇이므로 조용히 성공 처리한다.
    return NextResponse.json({ ok: true });
  }

  const inquiry = parseInquiry(body);
  const errors = validateInquiry(inquiry);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const webhookUrl = process.env.INQUIRY_WEBHOOK_URL;
  const emailConfigured = Boolean(process.env.RESEND_API_KEY && process.env.INQUIRY_NOTIFY_EMAIL);

  if (!supabase && !webhookUrl && !emailConfigured) {
    if (process.env.NODE_ENV === "production") {
      console.error("No inquiry destination configured (Supabase, email, or webhook)");
      return NextResponse.json({ ok: false }, { status: 503 });
    }
    console.log("[inquiry:dev]", inquiry);
    return NextResponse.json({ ok: true });
  }

  let stored = false;
  if (supabase) {
    const { error } = await supabase.from("inquiries").insert({
      project_type: inquiry.projectType,
      industry: inquiry.industry || null,
      services: inquiry.services,
      location: inquiry.location || null,
      area: inquiry.area || null,
      budget_range: inquiry.budgetRange || null,
      expected_opening_date: inquiry.expectedOpeningDate || null,
      name: inquiry.name,
      company: inquiry.company || null,
      phone: inquiry.phone,
      email: inquiry.email || null,
      message: inquiry.message || null,
      from_project: inquiry.fromProject || null,
    });
    if (error) console.error("inquiry insert failed", error.message);
    else stored = true;
  }

  // 알림들은 서로 독립적이므로 동시에 보낸다. 고객 접수 확인 메일은 실패해도 문의 자체는 이미 저장/알림된 것이므로 결과를 따로 취급하지 않는다.
  const [emailResult, webhookResult] = await Promise.all([
    sendInquiryEmail(inquiry),
    webhookUrl ? postWebhook(webhookUrl, inquiry) : Promise.resolve(null),
    sendInquiryConfirmationEmail(inquiry),
  ]);
  const notified = emailResult === true || webhookResult === true;

  // 저장 또는 알림 중 하나라도 성공했으면 문의는 전달된 것이다.
  if (!stored && !notified) return NextResponse.json({ ok: false }, { status: 502 });
  return NextResponse.json({ ok: true });
}

async function postWebhook(url: string, inquiry: unknown): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...(inquiry as object), receivedAt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`webhook responded ${res.status}`);
    return true;
  } catch (error) {
    console.error("inquiry webhook failed", error);
    return false;
  }
}
