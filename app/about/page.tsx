import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Phase Alignment",
  description:
    "A small team of engineers, trainers, and scientists. East meets west. Performance, physiology, and the frontiers of science.",
};

const sections = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: `Phase Alignment is a small team of engineers, personal trainers, scientists, and a community that backs the work. We are not a faceless brand. We converge disciplines that usually stay in separate lanes: systems thinking from engineering, load and adaptation from training, rigor and curiosity from research, and the kind of feedback that only a real community can give. That convergence is intentional. Performance and recovery are systems problems. We build and curate from that premise.`,
  },
  {
    id: "east-meets-west",
    title: "East meets west",
    body: `Our aim is to offer the best of both eastern and western approaches to performance and health. Western frameworks give us measurable outcomes, clear mechanisms, and a shared language for evidence. Eastern traditions contribute time-tested botanicals, attention to context and constitution, and models of the body that include rhythm, season, and regulation rather than only single-molecule targets.

We do not treat either side as decoration. We integrate where the evidence and experience align, and we say so when they do not. The goal is performance enhancement and sustained capacity—intelligently, without the hype.`,
  },
  {
    id: "new-frontiers",
    title: "New frontiers",
    body: `We operate on the new frontiers of science in intelligent ways. That means we care about what is proven, what is plausible, and what is still open question. We are interested in mechanisms, not just outcomes.

We are also willing to look at ideas that sit at the edge of mainstream acceptance—not to believe them uncritically, but to test them fairly and to expand the frame of what counts as serious inquiry. The frontier is where convergence happens: where old categories break down and better models can emerge. We want to be there, with both rigor and openness.`,
  },
  {
    id: "body-and-physiology",
    title: "Body and physiology",
    body: `Our work is grounded in direct research and experience in the body and its physiological makeup. We are not only readers of papers; we are practitioners. Training, recovery, adaptation, stress response, and longevity are not abstract topics for us. We use what we recommend. We also pay attention to how physiology interacts with environment, timing, and individual difference. The body is the final arbiter. We treat it as the primary source of signal and the main place where eastern and western knowledge either converge or fall short.`,
  },
  {
    id: "celestial-sciences",
    title: "Celestial sciences",
    body: `We take seriously the relation between physiology and the celestial sciences—the long-standing traditions that link human function to cycles, seasons, and cosmic context. That does not mean we swap evidence for symbolism. It means we are open to the possibility that the body is tuned to larger rhythms (circadian, lunar, seasonal) and that some of the oldest systems of health already encoded this in practice.

We see this as an expanding frame: not replacing reductionist science, but situating it within a bigger picture. Where tradition and modern research align, we integrate. Where they diverge, we note it and continue to test.`,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <nav className="mb-8 text-sm text-[var(--gray-600)]">
          <Link
            href="/"
            className="text-[var(--link)] hover:text-[var(--link-hover)]"
          >
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--fg)]">About</span>
        </nav>

        <header className="mb-12">
          <h1 className="font-display text-3xl font-bold tracking-tight text-[var(--fg)] sm:text-4xl">
            About Phase Alignment
          </h1>
          <p className="mt-4 text-lg text-[var(--gray-600)]">
            A small team of engineers, trainers, and scientists. Community-backed.
            East meets west on the new frontiers of science—intelligently, with
            direct research and experience in the body and its relation to the
            celestial sciences.
          </p>
        </header>

        <div className="space-y-12">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-8 border-b border-[var(--border)] pb-12 last:border-0 last:pb-0"
            >
              <h2 className="font-display text-xl font-semibold text-[var(--fg)]">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4 text-[var(--gray-700)] leading-relaxed">
                {section.body.split(/\n\n/).map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-16 pt-8 border-t border-[var(--border)]">
          <p className="text-sm text-[var(--gray-500)]">
            Questions or collaboration?{" "}
            <Link
              href="/contact"
              className="text-[var(--link)] hover:text-[var(--link-hover)]"
            >
              Get in touch
            </Link>
            .
          </p>
        </footer>
      </div>
    </div>
  );
}
