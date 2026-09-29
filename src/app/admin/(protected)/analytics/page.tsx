export const metadata = { title: "로그분석" };

/**
 * 방문자/트래픽 로그는 Vercel Analytics(@vercel/analytics, layout.tsx에 삽입됨)가 수집한다.
 * 데이터는 Vercel 자체 대시보드에서만 조회 가능하고 이 프로젝트 DB에는 저장되지 않는다.
 */
export default function AdminAnalyticsPage() {
  return (
    <div>
      <h1 className="font-display text-heading-1 font-bold">로그분석</h1>
      <p className="mt-4 max-w-prose text-body text-stone-600">
        방문자 수, 인기 페이지, 유입 경로 같은 트래픽 데이터는 사이트에 연결된 Vercel Analytics가
        자동으로 수집하고 있어. 아래 버튼으로 Vercel 대시보드에서 확인할 수 있어.
      </p>
      <a
        href="https://vercel.com/dashboard"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-block min-h-11 border border-ink bg-ink px-6 py-3 text-small text-paper hover:border-banana hover:bg-banana hover:text-ink"
      >
        Vercel Analytics 대시보드 열기 →
      </a>
      <p className="mt-4 max-w-prose text-small text-stone-500">
        Vercel 로그인 후 이 프로젝트를 선택하고 상단 Analytics 탭으로 들어가면 돼. 처음이라면
        프로젝트의 Analytics 탭에서 한 번 활성화(Enable)해야 데이터가 쌓이기 시작해.
      </p>
    </div>
  );
}
