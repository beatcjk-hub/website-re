import { NextResponse } from "next/server";
import { getAuthClient } from "@/lib/supabase/auth-server";

/** 이메일 매직 링크를 클릭하면 여기로 돌아온다. 코드를 로그인 세션으로 교환한다. */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await getAuthClient();
    if (supabase) await supabase.auth.exchangeCodeForSession(code);
  }
  return NextResponse.redirect(`${origin}/admin`);
}
