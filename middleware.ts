import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * /admin 요청마다 로그인 세션을 갱신한다.
 * Server Component는 만료된 세션 쿠키를 스스로 새로 쓸 수 없어서(Next.js 제약),
 * 미들웨어가 매 요청마다 대신 갱신해 쿠키에 반영한다 — Supabase 공식 권장 패턴.
 */
export async function middleware(request: NextRequest) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return NextResponse.next();

  const response = NextResponse.next({ request });
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list) => {
        list.forEach(({ name, value }) => request.cookies.set(name, value));
        list.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  await supabase.auth.getUser();
  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/auth/:path*"],
};
