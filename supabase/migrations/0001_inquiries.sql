-- 상담 문의 저장 테이블. Supabase 대시보드 > SQL Editor에 붙여넣고 Run.
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'new',           -- new / contacted / closed
  project_type text not null,
  industry text,
  services text[] not null default '{}',
  location text,
  area text,
  budget_range text,
  expected_opening_date text,
  name text not null,
  company text,
  phone text not null,
  email text,
  message text,
  from_project text                             -- 상담을 시작한 프로젝트 slug
);

-- RLS를 켜고 정책을 만들지 않는다 = 브라우저(anon 키)에서는 읽기/쓰기 모두 불가.
-- 웹사이트 서버가 service role 키로만 저장한다. 개인정보(전화번호)라서 공개 접근을 막는 것이 목적.
alter table public.inquiries enable row level security;
