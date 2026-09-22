import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * 로그인 상태(쿠키)를 읽고 쓰는 Supabase 클라이언트.
 * Publishable Key(sb_publishable_...)는 RLS로 보호되는 공개 키라서 서버에서 쓰는 것도 안전하지만,
 * 여기서는 관리자 로그인 쿠키만 다루므로 브라우저에 노출할 필요가 없어 NEXT_PUBLIC_ 없이 둔다.
 * 환경변수가 없으면 null — 호출하는 쪽이 "로그인 기능 미설정" 상태를 처리한다.
 */
export async function getAuthClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;

  const cookieStore = await cookies();
  return createServerClient(url, key, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (list) => {
        try {
          list.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Server Component에서 호출되면 쿠키를 쓸 수 없다 — 미들웨어가 대신 갱신하므로 무시한다.
        }
      },
    },
  });
}

/** 로그인한 사용자가 관리자 본인(ADMIN_EMAIL)인지 확인한다. */
export async function getAdminUser() {
  const supabase = await getAuthClient();
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  const email = data.user?.email;
  if (!email || email !== process.env.ADMIN_EMAIL) return null;
  return data.user;
}
