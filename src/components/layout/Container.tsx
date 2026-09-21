import { ReactNode, ElementType } from "react";

type ContainerProps = {
  children: ReactNode;
  /** 사진/영상처럼 화면 전체 폭으로 꽉 채워야 할 때 true */
  bleed?: boolean;
  className?: string;
  /** 렌더링할 HTML 태그. 기본은 div, 필요하면 section/article 등으로 교체 */
  as?: ElementType;
};

/**
 * 모든 페이지 콘텐츠는 이 Container로 감쌉니다.
 * - 기본: 최대 1440px, 반응형 좌우 여백
 * - bleed: 여백 없이 뷰포트 전체 폭 (히어로 사진 등 브랜드 스펙의
 *   "full viewport" 요구사항에 사용)
 *
 * 사용 예:
 *   <Container><h1>제목</h1></Container>
 *   <Container bleed><HeroImage /></Container>
 */
export default function Container({
  children,
  bleed = false,
  className = "",
  as: Tag = "div",
}: ContainerProps) {
  if (bleed) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag
      className={`mx-auto w-full max-w-container px-6 sm:px-8 lg:px-12 ${className}`}
    >
      {children}
    </Tag>
  );
}
