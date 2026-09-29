import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/supabase/auth-server";
import { signOut } from "./actions";

export const metadata = { robots: { index: false, follow: false } };
// 로그인 확인은 매 요청마다 실제로 실행되어야 한다 — 정적 캐시로 건너뛰면 로그인 없이 보일 위험이 있다.
export const dynamic = "force-dynamic";

/**
 * /admin/login을 제외한 모든 관리자 페이지를 감싸는 보호막 — (protected) 라우트 그룹이라
 * /admin/login(그룹 밖)에는 적용되지 않아 리다이렉트 무한루프가 생기지 않는다.
 * 로그인 안 했거나 관리자 본인(ADMIN_EMAIL) 이메일이 아니면 로그인 페이지로 보낸다.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="flex items-center justify-between border-b border-line px-6 py-4">
        <nav className="flex gap-6 text-small font-medium">
          <Link href="/admin/inquiries" className="hover:text-stone-600">
            문의
          </Link>
          <Link href="/admin/projects" className="hover:text-stone-600">
            프로젝트
          </Link>
          <Link href="/admin/analytics" className="hover:text-stone-600">
            로그분석
          </Link>
        </nav>
        <form action={signOut}>
          <button type="submit" className="text-small text-stone-600 hover:text-ink">
            로그아웃 ({user.email})
          </button>
        </form>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
