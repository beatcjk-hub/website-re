import Link from "next/link";
import Container from "@/components/layout/Container";

export default function FinalCTA() {
  return (
    <section className="flex min-h-[70vh] items-center border-t border-line bg-ink text-paper">
      <Container>
        <h2 className="font-display text-display-1 font-bold">
          HAVE A SPACE
          <br />
          IN MIND?
        </h2>
        <p className="mt-6 text-body text-paper/80">
          새로운 공간을 준비하고 계신가요?
        </p>
        <Link
          href="/contact"
          className="mt-10 inline-flex items-center gap-2 border border-paper px-6 py-3 text-small font-medium transition-colors hover:bg-banana hover:border-banana hover:text-ink"
        >
          START A PROJECT →
        </Link>
      </Container>
    </section>
  );
}
