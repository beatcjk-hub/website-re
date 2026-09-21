import { NextResponse } from "next/server";
import { parseInquiry, validateInquiry } from "@/lib/inquiry";
import { getSupabaseAdmin } from "@/lib/supabase/server";

/**
 * 상담 문의 접수 API.
 * 흐름: 검증 → Supabase 저장(원본 보관) → 웹훅 알림(INQUIRY_WEBHOOK_URL, 향후 n8n).
 * 저장 수단이 하나도 없으면 문의가 유실되므로 운영 환경에서는 성공 대신 503을 돌려준다.
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

  if (!supabase && !webhookUrl) {
    if (process.env.NODE_ENV === "production") {
      console.error("Neither Supabase nor INQUIRY_WEBHOOK_URL is configured; inquiry could not be stored");
      return NextResponse.json({ ok: false }, { status: 503 });
    }
    console.log("[inquiry:dev]", inquiry);
    return NextResponse.json({ ok: true });
  }

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
    if (error) {
      console.error("inquiry insert failed", error.message);
      return NextResponse.json({ ok: false }, { status: 502 });
    }
  }

  // 알림은 부가 기능: DB에 이미 저장됐다면 웹훅 실패로 사용자에게 실패를 보여주지 않는다.
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...inquiry, receivedAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(`webhook responded ${res.status}`);
    } catch (error) {
      console.error("inquiry webhook failed", error);
      if (!supabase) return NextResponse.json({ ok: false }, { status: 502 });
    }
  }

  return NextResponse.json({ ok: true });
}
