import Container from "@/components/layout/Container";
import Reveal from "./Reveal";
import { PROCESS_STAGES as STAGES } from "@/data/process";

export default function ProcessTimeline() {
  return (
    <section className="border-t border-line py-24 sm:py-32">
      <Container>
        <Reveal>
          <h2 className="font-display text-display-2 font-bold">
            HOW WE WORK
          </h2>
        </Reveal>

        <ol className="mt-16 divide-y divide-line border-t border-line">
          {STAGES.map((stage, i) => (
            <Reveal key={stage.number} delay={i * 80}>
              <li className="flex items-baseline gap-6 py-6">
                <span className="w-10 text-small text-stone-400">
                  {stage.number}
                </span>
                <span className="font-display text-heading-1 font-bold">
                  {stage.title}
                </span>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
