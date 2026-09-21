import Link from "next/link";
import Container from "@/components/layout/Container";
import Reveal from "./Reveal";
import { INSIGHTS as ARTICLES } from "@/data/insights";

export default function Insights() {
  return (
    <section className="border-t border-line py-24 sm:py-32">
      <Container>
        <Reveal>
          <h2 className="font-display text-display-2 font-bold">INSIGHTS</h2>
        </Reveal>

        <ul className="mt-16 divide-y divide-line border-t border-line">
          {ARTICLES.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/insights/${article.slug}`}
                className="group flex items-center justify-between gap-6 py-6"
              >
                <span className="max-w-lg text-heading-2 font-medium">
                  {article.title}
                </span>
                <span className="whitespace-nowrap text-small font-medium text-stone-600 transition-colors group-hover:text-ink">
                  READ ↗
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
