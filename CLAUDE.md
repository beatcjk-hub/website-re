# CLAUDE.md
# ELECTRIC BANANA / EB-DS 웹사이트 프로젝트 지침

## 1. 프로젝트 개요

이 프로젝트는 ELECTRIC BANANA(EB-DS)의 공식 웹사이트를
리뉴얼하고 지속적으로 운영하기 위한 프로젝트다.

ELECTRIC BANANA는 다음 업무를 수행하는 디자인 스튜디오다.

- 인테리어 디자인
- 상업공간 디자인
- 브랜딩
- 그래픽 디자인
- 사인 디자인
- 3D 시각화
- 설계 및 시공

이 웹사이트는 단순한 포트폴리오 사이트가 아니다.

최종적으로 다음 역할을 수행해야 한다.

- 프리미엄 디자인 포트폴리오
- ELECTRIC BANANA의 브랜드 경험
- 프로젝트 Case Study 플랫폼
- SEO 및 콘텐츠 마케팅 플랫폼
- 고객 문의 및 잠재고객 확보
- 디지털 영업 도구
- 향후 CRM 연동 기반
- 향후 마케팅 자동화 기반

핵심 포지셔닝:

BRAND × SPACE × EXPERIENCE

핵심 메시지:

"WE DESIGN SPACE FOR BRANDS."

한글 메시지:

"공간을 만들고, 브랜드의 경험을 설계합니다."


---

# 2. 가장 중요한 개발 원칙

이 프로젝트에서 항상 다음 우선순위를 따른다.

1. 디자인 완성도
2. 사용자 경험
3. 프로젝트 스토리텔링
4. 성능
5. 상담 전환
6. 유지보수성
7. SEO
8. 접근성
9. 향후 자동화 확장성

기능을 많이 만드는 것보다
좋은 프로젝트를 잘 보여주는 것을 우선한다.

복잡한 기술보다
관리하기 쉬운 구조를 우선한다.

화려한 애니메이션보다
사이트 속도와 사용성을 우선한다.


---

# 3. 사용자와의 소통 규칙

프로젝트 소유자와의 대화와 설명은 반드시 한글로 한다.

다만 다음은 영문을 기본으로 한다.

- 코드
- 변수명
- 함수명
- 컴포넌트명
- 데이터베이스 필드
- 파일명
- API 이름
- 기술 관련 고유명사

기술적인 내용을 설명할 때는
바이브코딩 초급~중급자가 이해할 수 있는 수준으로 설명한다.

복잡한 기술용어를 불필요하게 사용하지 않는다.

중요한 기술을 선택할 때는 간단하게 다음을 설명한다.

- 무엇을 선택했는지
- 왜 선택했는지
- 다른 방법은 무엇인지
- 향후 확장에 어떤 영향을 주는지

선택지가 여러 개일 경우
가능하면 가장 추천하는 방법 하나를 먼저 제안한다.


---

# 4. 기본 기술 스택

기본 기술은 다음을 사용한다.

Framework:
Next.js

Language:
TypeScript

UI:
React

Styling:
Tailwind CSS

Architecture:
Next.js App Router

Animation:

기본적으로 CSS Animation / Transition을 우선한다.

컴포넌트 단위 인터랙션이 필요하면
Motion 또는 Framer Motion을 사용할 수 있다.

복잡한 Scroll Animation이 필요한 경우에만

GSAP + ScrollTrigger

사용을 고려한다.

단순한 애니메이션을 위해 GSAP을 사용하지 않는다.

Deployment:

Vercel

향후 Backend / CMS:

Supabase 또는 Sanity

향후 자동화:

n8n


---

# 5. 패키지 관리

기본 Package Manager:

pnpm

새로운 라이브러리를 설치하기 전에 반드시 확인한다.

1. 기존 라이브러리로 해결할 수 있는가?
2. 직접 간단하게 구현할 수 있는가?
3. 정말 새로운 라이브러리가 필요한가?

같은 기능을 하는 라이브러리를 여러 개 설치하지 않는다.

프로젝트를 불필요하게 무겁게 만들지 않는다.


---

# 6. 기본 프로젝트 구조

다음 구조를 기본으로 사용한다.

src/
├── app/
│   ├── page.tsx
│   ├── projects/
│   ├── services/
│   ├── process/
│   ├── about/
│   ├── insights/
│   └── contact/
│
├── components/
│   ├── layout/
│   ├── home/
│   ├── projects/
│   ├── services/
│   ├── forms/
│   └── ui/
│
├── data/
├── hooks/
├── lib/
├── styles/
└── types/

필요하지 않은 깊은 폴더 구조를 만들지 않는다.

사용하지 않을 추상화 구조를 미리 만들지 않는다.


---

# 7. 컴포넌트 개발 규칙

컴포넌트는 다음 기준을 따른다.

- 역할이 명확해야 한다.
- 읽기 쉬워야 한다.
- 필요한 경우 재사용할 수 있어야 한다.
- 하나의 컴포넌트가 지나치게 커지지 않도록 한다.

예를 들어 메인페이지를 하나의 거대한
page.tsx 파일로 만들지 않는다.

HomePage는 다음과 같이 나눈다.

HeroSection
PhilosophySection
SelectedProjects
ServicesSection
FeaturedCaseStudy
BeforeAfterSection
ProcessSection
ProjectMatchSection
InsightsSection
FinalCTA

하지만 재사용하지 않는 작은 UI까지
무조건 컴포넌트로 분리하지 않는다.

과도한 컴포넌트 분리를 피한다.


---

# 8. Server / Client Component

기본적으로 Server Component를 사용한다.

"use client"

는 실제로 필요한 경우에만 사용한다.

예:

- 애니메이션
- 프로젝트 필터
- 갤러리
- Before / After
- Form
- 사용자 Interaction
- Browser API

페이지 전체를 Client Component로 만드는 것을 피한다.

필요한 부분만 Client Component로 분리한다.


---

# 9. 디자인 방향

ELECTRIC BANANA는 일반적인 인테리어 시공업체처럼
보여서는 안 된다.

디자인 방향:

80% Minimal Architecture
20% Electric Banana Personality

키워드:

Minimal
Editorial
Architectural
Premium
Creative
Experimental
Contemporary

사이트가 다음과 같은 느낌을 가져야 한다.

- 건축 디자인 스튜디오
- 브랜딩 스튜디오
- 디자인 매거진
- 현대적인 갤러리

다음 스타일은 피한다.

- 일반적인 기업 홈페이지
- 흔한 인테리어 업체 홈페이지
- 지나치게 많은 카드 UI
- 지나치게 둥근 UI
- 과도한 그림자
- 과도한 Gradient
- 의미 없는 장식
- SaaS 스타일 UI
- Dashboard 스타일 UI
- 과도한 Glassmorphism


---

# 10. 브랜드 컬러

기본 컬러:

White
Black
Warm Gray

Accent Color:

Electric Banana Yellow

노란색은 포인트로 제한해서 사용한다.

추천 사용 영역:

- 프로젝트 번호
- Hover
- Active State
- CTA 포인트
- Cursor Interaction
- Loading
- 작은 Graphic Element

사이트 전체를 노란색으로 채우지 않는다.

프로젝트 사진이 가장 중요한 컬러가 되어야 한다.


---

# 11. 타이포그래피

Typography는 ELECTRIC BANANA의 중요한 디자인 요소다.

영문:

크고 강한 Editorial Typography

예:

WE DESIGN
SPACE FOR
BRANDS.

한글:

깔끔하고 가독성이 좋은 Sans-serif

다음 계층을 명확하게 구분한다.

Display
Heading
Subheading
Body
Caption
Metadata

본문 글씨를 지나치게 작게 만들지 않는다.


---

# 12. 레이아웃 원칙

여백을 충분히 사용한다.

프로젝트 사진을 크게 보여준다.

일반적인 반복 Grid보다
Editorial Layout을 우선한다.

적극적으로 사용할 수 있는 방식:

- Full Width Image
- 비대칭 Layout
- 다양한 이미지 크기
- 큰 Typography
- 충분한 White Space
- 의도적인 이미지 배치

모든 프로젝트 사진을
같은 크기로 반복해서 보여주지 않는다.

페이지 전체에 시각적 리듬을 만든다.


---

# 13. 반응형 디자인

다음 환경을 지원한다.

Mobile
Tablet
Laptop
Desktop
Large Desktop

모바일은 단순히 PC 화면을 작게 줄이는 방식으로 만들지 않는다.

모바일에서는:

- 복잡한 Animation을 단순화한다.
- Touch Interaction을 고려한다.
- 버튼 크기를 충분히 확보한다.
- Hover에 의존하지 않는다.
- Gallery Swipe를 지원한다.
- CTA 접근성을 유지한다.
- 텍스트 가독성을 우선한다.

다양한 화면 크기에서 반드시 확인한다.


---

# 14. 포트폴리오 데이터 구조

프로젝트 정보를 JSX 안에 직접 작성하지 않는다.

프로젝트 데이터와 화면을 분리한다.

기본 Project 데이터는 다음을 지원한다.

id
slug
title
titleEn
client
location
industry
area
year
services
summary
challenge
concept
solution
materials
heroImage
thumbnail
gallery
beforeImages
afterImages
renderImages
constructionImages
video
featured
seoTitle
seoDescription
publishedAt

TypeScript Type 또는 Interface를 사용한다.

초기에는 다음처럼 Local Data를 사용할 수 있다.

src/data/projects.ts

향후 다음으로 이전하기 쉬운 구조로 만든다.

Supabase
Sanity

UI를 다시 개발하지 않고
데이터 소스만 변경할 수 있도록 설계한다.


---

# 15. 프로젝트 상세페이지 원칙

Project Detail은 단순 Gallery가 아니다.

하나의 CASE STUDY로 구성한다.

기본 흐름:

PROJECT HERO
↓
PROJECT INFORMATION
↓
THE CHALLENGE
↓
THE IDEA
↓
DESIGN CONCEPT
↓
FROM IDEA TO SPACE
↓
3D VS BUILT
↓
THE SPACE
↓
DESIGN DETAILS
↓
PROCESS
↓
BEFORE / AFTER
↓
RESULT
↓
PROJECT CTA
↓
NEXT PROJECT

모든 프로젝트에 모든 Section이 존재할 필요는 없다.

데이터가 없는 Section은 자연스럽게 숨긴다.


---

# 16. 프로젝트 이미지 규칙

인테리어 사진은 사이트에서 가장 중요한 콘텐츠다.

가능하면 Next.js Image를 사용한다.

항상 다음을 고려한다.

- Responsive Image
- Aspect Ratio
- Lazy Loading
- Priority Loading
- WebP / AVIF
- Image Compression
- sizes
- alt
- Layout Shift

Hero Image는 Priority Loading을 사용할 수 있다.

Gallery Image는 기본적으로 Lazy Loading한다.

모든 이미지를 페이지 진입과 동시에 로딩하지 않는다.


---

# 17. 영상 규칙

Hero Video를 사용할 경우 반드시 최적화한다.

기본 설정:

autoplay
muted
loop
playsInline

Poster Image를 제공한다.

영상이 사이트 성능을 크게 떨어뜨리지 않도록 한다.

모바일이나 느린 네트워크에서는
필요하면 Poster Image를 우선 사용할 수 있다.


---

# 18. 인터랙션 및 애니메이션 원칙

애니메이션의 목적은
"화려하게 보이기"가 아니라
"스토리를 더 잘 전달하기"다.

추천:

- Image Scale
- Text Reveal
- Project Hover
- Scroll Reveal
- Page Transition
- Before / After
- 3D / Actual Comparison
- Subtle Parallax
- Sticky Section

피해야 할 것:

- 의미 없는 Animation
- 과도한 WebGL
- 과도한 3D
- Scroll Hijacking
- 긴 Page Transition
- 과도한 Cursor Effect
- 사용성을 방해하는 Motion

성능을 위해 가능하면:

transform
opacity

를 활용한다.

prefers-reduced-motion을 지원한다.


---

# 19. 주요 페이지 구조

기본 Sitemap:

HOME

PROJECTS
├── ALL
├── FOOD & BEVERAGE
├── CAFE
├── RETAIL
├── OFFICE
└── OTHER

SERVICES
├── INTERIOR
├── BRANDING
├── BRAND × SPACE
├── GRAPHIC
└── 3D

PROCESS

ABOUT

INSIGHTS

CONTACT


---

# 20. HOME 기본 구조

HOME은 다음 흐름을 기본으로 한다.

01 HERO

02 BRAND PHILOSOPHY

03 SELECTED PROJECTS

04 WHAT WE DO

05 FEATURED CASE STUDY

06 BEFORE / AFTER

07 HOW WE WORK

08 PROJECT MATCH

09 INSIGHTS

10 FINAL CTA

필요하면 개발 과정에서 순서를 조정할 수 있지만
변경 이유를 설명한다.


---

# 21. 상담 전환 구조

웹사이트는 포트폴리오이면서 영업 도구다.

Primary CTA:

START A PROJECT

한국어:

프로젝트 상담

주요 고객 흐름:

HOME
↓
PROJECT
↓
CASE STUDY
↓
CONTACT
↓
LEAD

또는:

SEARCH
↓
INSIGHT
↓
PROJECT
↓
CONTACT

모든 주요 페이지에서
다음 행동이 자연스럽게 연결되어야 한다.


---

# 22. 상담 Form

상담 Form에서 다음 정보를 받을 수 있도록 설계한다.

projectType
industry
services
location
area
budgetRange
expectedOpeningDate
name
company
phone
email
message

질문이 많을 경우
Multi-Step Form 또는 Progressive Disclosure를 사용한다.

사용자가 부담을 느낄 정도로
한 화면에 많은 입력란을 보여주지 않는다.

입력 오류를 명확하게 알려준다.


---

# 23. 향후 CRM 연결

상담 Form을 특정 외부 서비스에 직접 종속시키지 않는다.

추천 구조:

Website Form
↓
Internal API
↓
Validation
↓
Database
↓
Webhook / Event
↓
n8n
↓
CRM
↓
Notification

향후 다음과 연결할 수 있도록 한다.

- CRM
- Google Sheets
- Email
- Slack
- n8n
- 자체 관리 시스템


---

# 24. 향후 마케팅 자동화

장기적으로 다음 구조를 지원해야 한다.

PROJECT DATABASE
↓
WEBSITE
↓
AI CONTENT GENERATION
↓
NAVER BLOG
INSTAGRAM
YOUTUBE
↓
TRAFFIC
↓
WEBSITE
↓
LEAD
↓
CRM
↓
ANALYTICS

따라서 프로젝트 데이터는 반드시 구조화해서 저장한다.

중요한 프로젝트 정보를 JSX 내부 텍스트로만 저장하지 않는다.


---

# 25. INSIGHTS

SEO와 콘텐츠 마케팅을 위해:

/insights

페이지를 만든다.

콘텐츠 카테고리 예:

Interior
Branding
Commercial Space
Construction
Design Tips

Insight Article에서
관련 Project로 연결한다.

Project에서도 관련 Insight를 연결할 수 있게 한다.

목표:

검색
→
콘텐츠
→
포트폴리오
→
상담


---

# 26. SEO

SEO를 개발 초기부터 고려한다.

각 페이지는 다음 정보를 지원한다.

title
description
canonical
Open Graph
Social Image

Project Detail은
프로젝트 데이터에서 Metadata를 자동 생성할 수 있도록 한다.

URL은 간결하게 만든다.

좋은 예:

/projects/honten
/projects/apoo
/projects/suje-cheongnyeon

피해야 할 예:

/portfolio?id=123

다음을 지원한다.

sitemap.xml
robots.txt

필요한 경우 Structured Data를 적용한다.


---

# 27. 지역 SEO

중요 검색 키워드 예:

광주 인테리어
광주 상가 인테리어
광주 식당 인테리어
광주 카페 인테리어
광주 상업공간 인테리어

하지만 키워드를 억지로 반복하지 않는다.

다음 방식으로 자연스럽게 SEO를 구축한다.

Project Case Study
+
Insight Content
+
Metadata
+
Internal Linking
+
Semantic HTML


---

# 28. Analytics

향후 다음 도구를 연결할 수 있도록 한다.

Google Analytics 4
Google Tag Manager
Meta Pixel
Naver Analytics / Advertising

주요 Event 이름은 일관성 있게 관리한다.

예:

project_view
project_filter
project_cta_click
contact_start
contact_complete
phone_click
before_after_interaction
render_built_interaction
insight_view
insight_to_project
project_to_contact


---

# 29. 보안

절대로 Browser에 다음 정보를 노출하지 않는다.

API Key
Service Key
Webhook Secret
Password
Private Credential

환경변수는:

.env.local

에서 관리한다.

예제는:

.env.example

로 제공한다.

.env.local은 Git에 Commit하지 않는다.

Client에 공개해도 되는 환경변수에만:

NEXT_PUBLIC_

Prefix를 사용한다.

Form Data는 Server에서도 Validation한다.


---

# 30. 오류 처리

오류를 조용히 무시하지 않는다.

필요한 경우 다음 상태를 구현한다.

Loading
Empty
Error
Success

Form에서는 반드시 다음을 명확하게 표시한다.

전송 중
입력 오류
전송 성공
전송 실패

사용자에게 내부 시스템 정보나
민감한 Error Message를 노출하지 않는다.


---

# 31. 코드 작성 규칙

복잡하고 영리한 코드보다
읽기 쉬운 코드를 우선한다.

변수명은 의미가 명확해야 한다.

좋은 예:

selectedIndustry
projectGallery
submitInquiry

피해야 할 예:

x
temp2
data123
foo

불필요한 `any` 사용을 피한다.

TypeScript를 적극적으로 활용한다.

복잡한 중첩 조건문을 피한다.


---

# 32. 주석 작성 규칙

코드를 그대로 설명하는 주석은 작성하지 않는다.

나쁜 예:

// loading을 true로 변경
setLoading(true)

좋은 주석은 다음을 설명한다.

- 왜 이런 구조를 사용했는지
- 특수한 예외처리 이유
- 성능 관련 결정
- 이해하기 어려운 Business Logic


---

# 33. 기존 코드 수정 원칙

새 기능을 개발할 때
관련 없는 코드를 동시에 수정하지 않는다.

대규모 Refactoring이 필요한 경우
먼저 이유를 설명한다.

정상적으로 작동하는 구조를
단순히 다른 방식이 더 좋아 보인다는 이유만으로
전체 재작성하지 않는다.

작고 안전한 변경을 우선한다.


---

# 34. 기존 자료 보호

사용자가 만든 다음 자료를 함부로 삭제하지 않는다.

- 코드
- 프로젝트 데이터
- 이미지
- 영상
- 컴포넌트
- 설정 파일
- 콘텐츠

삭제 또는 대규모 변경이 필요한 경우
무엇을 왜 변경하는지 먼저 설명한다.


---

# 35. 작업 시작 전

중요한 기능을 개발하기 전에 반드시:

1. 현재 Repository를 확인한다.
2. 기존 구조를 이해한다.
3. 재사용 가능한 Component를 찾는다.
4. 기존 Dependency를 확인한다.
5. 가장 작은 변경으로 구현 가능한지 판단한다.
6. 간단한 구현 계획을 세운다.

존재하지 않는 파일이나 기능을
추측해서 작업하지 않는다.


---

# 36. 작업 완료 후

중요한 변경 후 가능하면 다음을 확인한다.

1. TypeScript Error
2. Lint
3. Test
4. Production Build
5. Console Error
6. Responsive Layout
7. 주요 Interaction

실제로 확인하지 않은 것을
"정상 작동한다"고 단정하지 않는다.


---

# 37. 버그 수정

버그가 발생하면
증상만 임시로 막지 않는다.

먼저 확인한다.

1. 무엇이 문제인가?
2. 왜 발생했는가?
3. Root Cause는 무엇인가?
4. 가장 작은 해결방법은 무엇인가?
5. 다른 기능에 영향을 주는가?

수정 후 원래 문제가 해결되었는지 확인한다.


---

# 38. Git 규칙

가능하면 하나의 Commit에는
하나의 논리적인 작업을 담는다.

예:

feat: add project archive

feat: add project filtering

feat: build project case study

fix: improve mobile gallery

perf: optimize project images

seo: add project metadata

Secret 정보는 절대로 Commit하지 않는다.


---

# 39. 개발 단계

사이트 전체를 한 번에 만들지 않는다.

다음 순서로 개발한다.

PHASE 1
기초 개발

- Next.js
- TypeScript
- Tailwind
- Folder Structure
- Fonts
- Color Tokens
- Global Layout
- Header
- Footer
- Responsive Foundation


PHASE 2
메인페이지

- Hero
- Philosophy
- Selected Projects
- Services
- Featured Case Study
- Before / After
- Process
- Project Match
- Insights
- Final CTA


PHASE 3
Portfolio System

- Project Schema
- Project Data
- Project Archive
- Filter
- Project Card
- Dynamic Route


PHASE 4
Case Study

- Project Hero
- Challenge
- Concept
- Gallery
- 3D vs Built
- Design Detail
- Process
- Before / After
- Next Project


PHASE 5
Business Pages

- Services
- Process
- About
- Insights
- Contact


PHASE 6
Interaction / Motion


PHASE 7
CMS / Backend


PHASE 8
SEO / Performance


PHASE 9
Analytics


PHASE 10
n8n / Marketing Automation


---

# 40. 단계별 개발 원칙

현재 요청받은 Phase에 집중한다.

예를 들어:

"메인페이지를 만들어줘"

라는 요청을 받았다고 해서

Supabase
CRM
n8n
Analytics

까지 동시에 개발하지 않는다.

다음 단계의 기능은
현재 단계에서 필요한 기반만 준비한다.


---

# 41. 디자인 검토 기준

UI를 개발한 후 항상 다음을 확인한다.

1. 프리미엄 디자인 스튜디오처럼 보이는가?
2. 프로젝트 사진이 충분히 강조되는가?
3. Typography가 강한가?
4. 여백이 충분한가?
5. Template처럼 보이지 않는가?
6. Interaction이 Storytelling에 도움이 되는가?
7. 사용자가 Project와 Contact로 자연스럽게 이동하는가?

그렇지 않다면 개선한다.


---

# 42. AI 스타일 UI 금지

흔한 AI 생성 웹사이트처럼 만들지 않는다.

특히 다음 패턴을 남발하지 않는다.

- 둥근 Card
- Purple / Blue Gradient
- Glass Panel
- SaaS Layout
- 의미 없는 Statistics
- 과도한 Icon
- Pill UI
- 반복적인 Card Grid

ELECTRIC BANANA 웹사이트의 핵심 디자인 요소는:

PHOTOGRAPHY
+
TYPOGRAPHY
+
SPACE
+
COMPOSITION
+
MOTION

이다.


---

# 43. 판단 기준

"기능 추가"와
"더 좋은 표현" 중 선택해야 한다면:

더 좋은 표현을 우선한다.

"복잡한 구조"와
"관리하기 쉬운 구조" 중 선택해야 한다면:

관리하기 쉬운 구조를 우선한다.

"화려한 Animation"과
"빠른 Performance" 중 선택해야 한다면:

Performance를 우선한다.

"많은 설명"과
"강력한 Visual Storytelling" 중 선택해야 한다면:

Visual Storytelling을 우선한다.


---

# 44. 프로젝트 소유자의 개발 수준

프로젝트 소유자는
바이브코딩 초급~중급 수준에서
Claude Code와 함께 직접 사이트를 운영하고 수정할 예정이다.

따라서:

- 이해하기 쉬운 구조를 만든다.
- 불필요한 추상화를 피한다.
- 중요한 파일 위치를 설명한다.
- 새로운 기술을 도입하면 이유를 설명한다.
- 복잡한 설정을 최소화한다.
- 다음 작업을 명확하게 안내한다.

목표는 Claude가 웹사이트를 대신 만드는 것만이 아니다.

프로젝트 소유자가 Claude Code와 함께
지속적으로 수정하고 발전시킬 수 있는 구조를 만드는 것이다.


---

# 45. 작업 완료 보고 형식

개발 작업을 완료하면
다음 형식으로 한글로 보고한다.

## 완료한 작업

무엇을 작업했는지 간단히 설명한다.

## 변경된 주요 파일

중요한 파일과 변경 내용을 설명한다.

## 확인할 것

사용자가 직접 화면에서 확인해야 할 부분을 알려준다.

## 다음 단계

현재 작업 이후 가장 자연스러운
다음 작업 하나를 추천한다.

불필요하게 긴 개발 보고서는 작성하지 않는다.


---

# 46. 최종 원칙

ELECTRIC BANANA가 다음처럼 보여서는 안 된다.

"홈페이지를 가지고 있는 인테리어 시공업체"

다음처럼 보여야 한다.

"웹사이트 자체가 디자인 실력을 증명하는
브랜드 & 공간 디자인 스튜디오"

모든 디자인과 개발 결정은
이 원칙을 기준으로 판단한다.
