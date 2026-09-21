# ELECTRIC BANANA (EB-DS) — Phase 2: Homepage

Phase 1(레이아웃/디자인 시스템)에 이어, 홈페이지 10개 섹션을 실제로 구현했습니다.
아직 실제 프로젝트 사진과 최종 카피는 없고 (Phase 3~4에서 채움), **구조·타이포·
인터랙션이 스펙대로 동작하는지**를 확인하는 단계입니다.

## 0. Phase 2에서 추가된 폴더

```
src/
├── components/
│   ├── home/                 # 홈페이지 섹션 (10개, page.tsx에서 순서대로 조립)
│   │   ├── Hero.tsx               # 01 히어로 (스크롤 시 배경 확대)
│   │   ├── BrandPhilosophy.tsx    # 02 브랜드 철학 (단어 스크롤 리빌)
│   │   ├── SelectedProjects.tsx   # 03 비대칭 에디토리얼 그리드
│   │   ├── WhatWeDo.tsx           # 04 서비스 3종 (BRAND×SPACE 강조)
│   │   ├── FeaturedCaseStudy.tsx  # 05 HONTEN 케이스 스터디
│   │   ├── BeforeAfterSlider.tsx  # 06 Before/After 드래그 슬라이더
│   │   ├── ProcessTimeline.tsx    # 07 HOW WE WORK 타임라인
│   │   ├── ProjectMatch.tsx       # 08 업종별 프로젝트 필터
│   │   ├── Insights.tsx           # 09 에디토리얼 콘텐츠 목록
│   │   ├── FinalCTA.tsx           # 10 최종 CTA
│   │   └── Reveal.tsx             # 절제된 스크롤 리빌 래퍼 (공용)
│   └── ui/
│       └── PlaceholderImage.tsx   # 실제 사진 준비 전 자리표시자
└── lib/
    ├── projects.ts            # Phase 2용 임시 프로젝트 데이터 (Phase 3에서 교체)
    └── useInView.ts           # 스크롤 진입 감지 훅
```

**핵심 원칙**: `page.tsx`는 섹션 컴포넌트를 순서대로 나열만 합니다. 섹션 순서를
바꾸거나 빼려면 `page.tsx`만 고치면 되고, 각 섹션 내용은 해당 파일 하나만
고치면 됩니다. 사진이 준비되면 `PlaceholderImage`를 `next/image`로 교체하세요
(각 컴포넌트에서 사용 위치를 쉽게 찾을 수 있게 `label` props로 표시해뒀습니다).

## 0-1. 알아두면 좋은 구조 변경

- 헤더가 히어로 위에 완전히 겹치도록 `layout.tsx`의 `<main>`에서 상단 여백을
  제거했습니다. 앞으로 히어로 없이 시작하는 페이지(예: 단순 안내 페이지)를
  만들 때는 해당 페이지의 최상단 요소에 `pt-24` 정도를 직접 추가해서 고정
  헤더에 내용이 가리지 않게 하세요.
- 헤더는 스크롤 전(히어로 위, 어두운 배경 가정)에는 밝은 글자, 스크롤 후에는
  어두운 글자로 자동 전환됩니다.

## 4. Phase 3로 넘어가기 전 테스트 체크리스트 (Phase 2)

Phase 1 체크리스트에 더해 아래 항목을 확인하세요.

- [ ] 히어로가 화면 전체 높이를 채우고, 헤더가 그 위에 투명하게 겹쳐 보이는가
- [ ] 히어로 텍스트(WE DESIGN SPACE FOR BRANDS.)가 밝은 헤더 글자와 대비되어 잘 읽히는가
- [ ] 스크롤 시 히어로 배경이 아주 살짝 확대되는가
- [ ] "BRAND / SPACE / EXPERIENCE" 단어들이 스크롤해서 보이는 순간 하나씩 나타나는가
- [ ] SELECTED PROJECTS 섹션의 카드 크기가 서로 다른가 (동일한 3열 그리드가 아님)
- [ ] 프로젝트 카드에 마우스를 올리면 이미지가 살짝 확대되고 "VIEW PROJECT ↗"가 나타나는가
- [ ] WHAT WE DO에서 BRAND × SPACE 항목에만 노란 점(포인트 컬러)이 보이는가
- [ ] BEFORE / AFTER 슬라이더를 마우스로 드래그하면 경계선이 움직이는가 (모바일에서는 터치로)
- [ ] FIND A PROJECT LIKE YOURS에서 업종 버튼을 클릭하면 아래 목록이 필터링되는가
- [ ] 전체적으로 카드에 그림자나 둥근 모서리가 남용되지 않고, 타이포와 여백 위주로 보이는가
- [ ] 모바일 폭에서도 각 섹션이 세로로 자연스럽게 쌓이는가

위 항목을 확인한 뒤 이상 없으면 Phase 3(프로젝트 데이터 모델 + 아카이브 +
상세 페이지)로 진행합니다.

---


Next.js 16 + React 19 + TypeScript + Tailwind CSS 기반. Phase 1에서는 홈페이지
전체가 아니라 **레이아웃 뼈대와 디자인 시스템**만 만들었습니다.

> 최초 초안은 Next.js 14.2.5였지만, 설치 중 critical 보안 취약점이 발견되어
> 최신 안정 버전(Next.js 16 / React 19)으로 올렸습니다. 이에 따라 Next.js 16부터
> 사라진 `next lint` 대신 ESLint를 직접 호출하도록 `lint` 스크립트와
> `eslint.config.mjs`도 함께 업데이트했습니다.
>
> `npm install` → `npm run build`로 실제 빌드 테스트를 완료했고, 정적 페이지
> 생성과 ESLint 검사 모두 에러 없이 통과했습니다. 단, `next/font/google`(Archivo)은
> 빌드/실행 시 fonts.googleapis.com에 접속해야 하므로, **인터넷이 연결된 환경**에서
> 실행해야 합니다 (일반적인 개발 환경이라면 문제없습니다).

## 1. 폴더 구조

```
eb-ds-website/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # 루트 레이아웃: 폰트, 메타데이터, Header/Footer 배치
│   │   ├── page.tsx        # 임시 홈페이지 (Phase 2에서 교체 예정)
│   │   └── globals.css     # Tailwind 지시문 + 전역 스타일(포커스, 선택영역 등)
│   ├── components/
│   │   └── layout/
│   │       ├── Header.tsx      # sticky 내비게이션 + 모바일 풀스크린 메뉴
│   │       ├── Footer.tsx      # 글로벌 푸터
│   │       └── Container.tsx   # 폭/여백을 통일하는 재사용 레이아웃 컴포넌트
│   └── lib/
│       └── navigation.ts   # 메뉴 링크 데이터 (Header/Footer 공용)
├── tailwind.config.ts      # 색상/폰트/타입스케일/브레이크포인트 토큰 (디자인 시스템의 중심)
├── next.config.mjs
├── tsconfig.json
└── package.json
```

**핵심 원칙**: 이후 모든 페이지/컴포넌트는 `Container`로 감싸고, 색상은
`tailwind.config.ts`에 정의된 토큰(`ink`, `paper`, `stone`, `banana`)만 사용합니다.
메뉴를 바꾸고 싶으면 `lib/navigation.ts` 한 파일만 고치면 Header와 Footer에
동시에 반영됩니다.

## 2. 디자인 시스템 요약

| 항목 | 값 | 위치 |
|---|---|---|
| 배경/텍스트 | `paper` #FFFFFF / `ink` #111111 | tailwind.config.ts |
| 보조 색상 | `stone` (웜 그레이 계열) | tailwind.config.ts |
| 포인트 색상 | `banana` #F4FF52 — 매우 제한적으로 사용 | tailwind.config.ts |
| 영문 헤드라인 폰트 | Archivo (Bold/ExtraBold) | app/layout.tsx |
| 국문/본문 폰트 | Pretendard Variable | app/layout.tsx (CDN) |
| 타입 스케일 | `display-1`, `display-2`, `heading-1/2`, `body`, `small` | tailwind.config.ts |
| 브레이크포인트 | sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536 | tailwind.config.ts |
| 컨테이너 최대 폭 | 1440px (사진은 `bleed` prop으로 전체 폭 가능) | Container.tsx |

## 3. 실행 방법

```bash
cd eb-ds-website
npm install
npm run dev
```

브라우저에서 http://localhost:3004 접속 (3000번 포트가 다른 프로젝트에서 사용 중이라 3004로 고정했습니다).

## 4. Phase 2로 넘어가기 전 테스트 체크리스트

- [ ] `npm install` 및 `npm run dev`가 에러 없이 실행되는가
- [ ] 데스크톱에서 헤더가 화면 상단에 고정(sticky)되어 있는가
- [ ] 페이지를 24px 이상 스크롤하면 헤더 배경이 투명 → 흰색으로 바뀌는가
- [ ] 화면 너비를 1024px 미만으로 줄이면 데스크톱 메뉴가 사라지고 햄버거 버튼이 나타나는가
- [ ] 햄버거 버튼 클릭 시 풀스크린 메뉴가 열리고, 다시 클릭하면 닫히는가
- [ ] 메뉴가 열린 상태에서 배경 스크롤이 잠기는가
- [ ] 키보드로 Tab 이동 시 링크/버튼에 포커스 표시(테두리)가 보이는가
- [ ] 임시 홈페이지의 영문 헤드라인(Archivo)과 국문 본문(Pretendard)이 서로 다른 폰트로 보이는가
- [ ] `banana` 색상 배지가 노란색으로 정상 표시되는가
- [ ] 모바일(390px 전후) / 태블릿(768px) / 데스크톱(1440px) 폭에서 좌우 여백이 자연스러운가
- [ ] 푸터가 페이지 하단에 정상 표시되고 링크가 동작하는가

위 항목을 확인한 뒤 이상 없으면 Phase 2(홈페이지 섹션 구축)로 진행합니다.

## 5. 아직 안 만든 것 (Phase 3 이후 예정)

- 실제 프로젝트 사진/영상 (현재는 모두 PlaceholderImage)
- `/projects`, `/services`, `/process`, `/about`, `/insight`, `/contact` 페이지
- 프로젝트 데이터 모델 / CMS 연동 (현재 `lib/projects.ts`는 임시 데이터)
- 프로젝트 상세 페이지 (에디토리얼 케이스 스터디)
- 폼, 분석 도구(GA4/GTM) 연동
- SEO 메타데이터 세부 설정 (프로젝트별 OG 이미지 등)
