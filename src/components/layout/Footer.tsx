import Link from "next/link";
import Container from "./Container";
import { NAV_LINKS, SITE } from "@/lib/navigation";
import { CONTACT } from "@/data/site";

/**
 * 글로벌 푸터.
 * 연락처는 src/data/site.ts, 메뉴는 src/lib/navigation.ts에서 관리합니다.
 */

const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "Facebook", href: "#" },
  // Naver Blog는 스펙 문서의 콘텐츠 마케팅 목표(19항)에 따라 추가 예정
  { label: "Naver Blog", href: "#" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink text-paper">
      <Container className="flex flex-col gap-12 py-16">
        <div className="flex flex-col justify-between gap-10 lg:flex-row">
          <div className="max-w-sm">
            <p className="font-display text-heading-1 font-bold">{SITE.name}</p>
            <p className="mt-4 text-small text-stone-400">{SITE.description}</p>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-3 sm:flex sm:gap-12">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-small tracking-wide text-paper/80 transition-colors hover:text-banana"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-2 text-small text-stone-400">
            <a href={`mailto:${CONTACT.email}`} className="hover:text-paper">
              {CONTACT.email}
            </a>
            <a href={CONTACT.phoneHref} className="hover:text-paper">
              {CONTACT.phone}
            </a>
            <p>{CONTACT.address}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-line-inverse pt-6 text-small text-stone-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name} ({SITE.shortName}). All rights reserved.
          </p>
          <div className="flex gap-6">
            {/* TODO: 실제 SNS 프로필 URL로 교체 */}
            {SOCIALS.map((social) => (
              <a key={social.label} href={social.href} className="hover:text-paper">
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
