import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * 서버 전용 Supabase 클라이언트 (API Route, Server Component에서만 import).
 * Secret Key(sb_secret_...)는 RLS를 우회하는 관리자 키라서 브라우저에 노출되면 안 된다.
 * 파일 첫 줄의 "server-only"가 Client Component에서 import되면 빌드를 실패시켜 이를 막는다.
 * 환경변수가 없으면 null을 돌려주어 호출하는 쪽이 "DB 미연결" 상태를 처리한다.
 */
export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}
