/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Phase 3+에서 실제 프로젝트 이미지 호스팅 도메인(예: CMS, CDN)을 여기에 추가합니다.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
