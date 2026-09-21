-- 프로젝트 데이터 테이블 + 이미지 저장소. Supabase 대시보드 > SQL Editor에 붙여넣고 Run.
-- 이후 프로젝트 추가/수정은 대시보드 Table Editor에서 하면 사이트에 반영된다 (최대 5분 캐시).
create table if not exists public.projects (
  id text primary key,
  slug text not null unique,
  title text not null,                 -- 국문 프로젝트명
  title_en text not null,              -- 화면 대형 타이포용 영문명
  client text,
  location text not null default '',
  industry text not null check (industry in ('restaurant','cafe','retail','office','commercial')),
  area text,
  year text not null default '',
  services text[] not null default '{}',
  summary text,
  challenge text,
  concept text,
  solution text,
  materials text[],
  hero_image text,                     -- Storage 공개 URL 또는 /public 경로
  thumbnail text,
  gallery text[],
  before_images text[],
  after_images text[],
  render_images text[],
  construction_images text[],
  video text,
  featured boolean not null default false,
  seo_title text,
  seo_description text,
  published_at timestamptz,
  size text not null default 'md' check (size in ('lg','md','full')),
  sort_order int not null default 100, -- 작을수록 먼저 표시
  is_published boolean not null default true
);

-- 공개 사이트에 보이는 데이터라 읽기는 누구나 가능, 쓰기는 정책이 없으므로 서버(Secret Key)/대시보드만 가능.
alter table public.projects enable row level security;
drop policy if exists "read published projects" on public.projects;
create policy "read published projects" on public.projects
  for select to anon, authenticated using (is_published);

-- 프로젝트 사진용 공개 버킷. 업로드는 대시보드 Storage에서 한다.
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;
