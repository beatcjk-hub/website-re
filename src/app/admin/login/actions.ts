"use server";

import { getAuthClient } from "@/lib/supabase/auth-server";

export type SendLinkResult = { ok: boolean; message: string };

/** 입력한 이메일로 매직 링크를 보낸다. 관리자 이메일이 아니어도 일부러 같은 메시지를 보여준다 — 등록된 이메일을 캐낼 수 없게 하기 위해서다. */
export async function sendMagicLink(_prev: SendLinkResult | null, formData: FormData): Promise<SendLinkResult> {
  const email = String(formData.get("email") ?? "").trim();
  if (!email) return { ok: false, message: "이메일을 입력해 주세요." };

  const supabase = await getAuthClient();
  if (!supabase) return { ok: false, message: "로그인 기능이 아직 설정되지 않았습니다." };

  const siteUrl = process.env.SITE_URL ?? "http://localhost:3004";
  await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${siteUrl}/auth/callback` },
  });

  return { ok: true, message: "입력한 이메일로 로그인 링크를 보냈습니다. 받은 편지함을 확인해 주세요." };
}
