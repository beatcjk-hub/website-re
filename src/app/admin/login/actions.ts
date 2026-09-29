"use server";

import { redirect } from "next/navigation";
import { getAuthClient } from "@/lib/supabase/auth-server";

export type LoginResult = { ok: boolean; message: string };

/** 관리자 이메일(ADMIN_EMAIL)은 고정이고 비밀번호만 입력받는다. */
export async function loginWithPassword(_prev: LoginResult | null, formData: FormData): Promise<LoginResult> {
  const password = String(formData.get("password") ?? "");
  const email = process.env.ADMIN_EMAIL;
  if (!email) return { ok: false, message: "관리자 계정이 아직 설정되지 않았습니다." };

  const supabase = await getAuthClient();
  if (!supabase) return { ok: false, message: "로그인 기능이 아직 설정되지 않았습니다." };

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, message: "비밀번호가 올바르지 않습니다." };

  redirect("/admin");
}
