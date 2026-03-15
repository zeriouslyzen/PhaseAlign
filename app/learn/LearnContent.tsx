"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const FRAMEWORKS = ["Chinese medicine", "Native American", "Vedic", "Science"];

const connections = [
  {
    title: "Traditions and science",
    body: "TCM, Native American, and Vedic systems described stress, rhythm, and organ networks in functional terms long before Western physiology named HPA axis or circadian clocks. We use those maps. We add mechanisms and evidence. Same biology. Different lexicons.",
  },
  {
    title: "Body and environment",
    body: "EMF can alter voltage-gated calcium channel activity. Particulate matter drives inflammatory cascades. Metabolic and endocrine output depend on load, light, and chemical exposure. Stacks address internal targets and environmental inputs because the system is one.",
  },
  {
    title: "Self-recovery and activated states",
    body: "Recovery is a physiological process. Autonomic tone, glycogen resynthesis, protein turnover. We don’t substitute for that. We optimize conditions so it runs. State shifts (alertness, calm, focus) are also measurable. We target the levers.",
  },
  {
    title: "Physiology as primary",
    body: "Everything we do is grounded in mechanism. If we can’t point to a pathway or a plausible signal, we don’t sell it. The body is the experiment. We tune variables and read outcomes.",
  },
];

const offers = [
  { label: "Herbal blends", body: "Botanicals with known effects on metabolic and endocrine function. Adaptogens, nervines, compounds that modulate stress response and recovery. Sourced for consistency. Dosed by mechanism." },
  { label: "Performance supplements", body: "Compounds that support training adaptation, recovery kinetics, and sustained output. We select for evidence and interaction with the systems we care about. No filler." },
  { label: "Health tech", body: "Devices and protocols for environmental modulation (EMF, air quality) and for measuring or cueing physiological state. Integrated with how we think about stacks." },
  { label: "Guides & instructional", body: "Protocol design. How to combine frameworks. How to assess response. The same criteria we use: mechanism, dose, context." },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const itemFast = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

function SectionNumber({ n }: { n: string }) {
  return (
    <motion.span
      className="font-mono text-2xl font-bold tabular-nums text-[var(--accent)] sm:text-3xl"
      style={{ fontFamily: "var(--font-logo)" }}
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.35 }}
    >
      {n}
    </motion.span>
  );
}

export function LearnContent() {
  return (
    <div className="min-h-screen">
      {/* Dark intro */}
      <motion.header
        className="relative border-b border-[var(--border-strong)] bg-[var(--gray-900)] px-4 py-10 sm:px-6 sm:py-14"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mx-auto max-w-3xl">
          <nav className="mb-6 text-xs tracking-wider text-white/60 sm:text-sm">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/90">Learn</span>
          </nav>
          <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Learn
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            Physiology first. Herbal, performance, and tech integrated under one scientific framework. Evidence and mechanism. No narrative.
          </p>
          <motion.div
            className="mt-4 h-0.5 w-12 bg-[var(--accent)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            style={{ originX: 0 }}
          />
        </div>
      </motion.header>

      {/* Section 01 – What a stack is */}
      <motion.section
        className="border-b border-[var(--border)] bg-[var(--bg)] px-4 py-12 sm:px-6 sm:py-16"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={container}
      >
        <div className="mx-auto max-w-3xl">
          <div className="flex gap-6">
            <SectionNumber n="01" />
            <div className="min-w-0 flex-1">
              <motion.h2 className="font-display text-lg font-semibold tracking-tight text-[var(--fg)] sm:text-xl" variants={item}>
                What a stack is
              </motion.h2>
              <div className="mt-4 space-y-5 text-[var(--gray-700)] leading-relaxed">
                <motion.p variants={item}>
                  A stack is <strong className="text-[var(--fg)]">herbal blends</strong> (curated) or <strong className="text-[var(--fg)]">built from scratch</strong> to need. We combine frameworks: Chinese medicine, Native American, Vedic, and evidence-based compounds. When the literature or direct experience supports a compound or practice, we add it to the framework. We follow structure. We don’t improvise.
                </motion.p>
                <motion.p variants={item}>
                  Bone is piezoelectric. Fascia holds charge. Voltage-gated and ion-channel dynamics underpin a lot of what traditional systems called “energy” or “flow.” We use the modern names and we keep the maps that still predict. Integration is mechanism plus outcome.
                </motion.p>
              </div>
              {/* Framework pills – visual break */}
              <motion.div
                className="mt-8 flex flex-wrap gap-2"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={container}
              >
                {FRAMEWORKS.map((name, i) => (
                  <motion.span
                    key={name}
                    variants={itemFast}
                    className="inline-flex rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-3 py-1.5 text-xs font-medium tracking-wide text-[var(--gray-700)]"
                  >
                    {name}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Accent divider */}
      <div className="h-px w-full bg-[var(--accent)]/40" aria-hidden />

      {/* Section 02 – What we're working with */}
      <motion.section
        className="border-b border-[var(--border)] bg-[var(--gray-50)] px-4 py-12 sm:px-6 sm:py-16"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={container}
      >
        <div className="mx-auto max-w-3xl">
          <div className="flex gap-6">
            <SectionNumber n="02" />
            <div className="min-w-0 flex-1">
              <motion.h2 className="font-display text-lg font-semibold tracking-tight text-[var(--fg)] sm:text-xl" variants={item}>
                What we’re working with
              </motion.h2>
              <div className="mt-4 space-y-5 text-[var(--gray-700)] leading-relaxed">
                <motion.p variants={item}>
                  Primary targets: <strong className="text-[var(--fg)]">metabolic and endocrine</strong>. HPA axis. Thyroid. Sex hormones. Glucose and insulin sensitivity. We use compounds and practices that support <strong className="text-[var(--fg)]">self-recovery</strong> (autonomic reset, protein synthesis, glycogen) and <strong className="text-[var(--fg)]">state activation</strong> (alertness, calm, focus). We don’t replace endogenous capacity. We create conditions for it to run.
                </motion.p>
                <motion.p variants={item}>
                  <strong className="text-[var(--fg)]">Environmental load</strong> matters. EMF exposure can affect voltage-gated channels. Air quality drives oxidative and inflammatory load. We use tech and protocols to buffer or modulate those inputs. Stacks include internal and external variables.
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section 03 – In totality */}
      <motion.section
        className="border-b border-[var(--border)] bg-[var(--bg)] px-4 py-12 sm:px-6 sm:py-16"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={container}
      >
        <div className="mx-auto max-w-3xl">
          <div className="flex gap-6">
            <SectionNumber n="03" />
            <div className="min-w-0 flex-1">
              <motion.h2 className="font-display text-lg font-semibold tracking-tight text-[var(--fg)] sm:text-xl" variants={item}>
                In totality
              </motion.h2>
              <div className="mt-4 space-y-5 text-[var(--gray-700)] leading-relaxed">
                <motion.p variants={item}>
                  Net effect: <strong className="text-[var(--fg)]">amplification of existing biology</strong>. We don’t add new machinery. We tune the dials so more of what’s already there can activate. When metabolic, endocrine, environmental, and nervous inputs are aligned, output shifts. Better recovery. Clearer perception. More stable energy. That’s measurable physiology.
                </motion.p>
                <motion.p variants={item}>
                  Traditions have long treated the body as the central system. We keep that. We express it in mechanism. Physiology is the lens. Everything else (cognition, affect, performance) follows from how the body is running.
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Pull quote – full-bleed break */}
      <motion.div
        className="bg-[var(--gray-900)] px-4 py-12 sm:px-6 sm:py-16"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
      >
        <p className="mx-auto max-w-2xl text-center font-display text-xl font-semibold leading-snug text-white sm:text-2xl">
          Bone is piezoelectric. Fascia holds charge. The body runs on signals we can measure and tune.
        </p>
      </motion.div>

      {/* Section 04 – Connections (cards) */}
      <motion.section
        className="border-b border-[var(--border)] bg-[var(--gray-50)] px-4 py-12 sm:px-6 sm:py-16"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={container}
      >
        <div className="mx-auto max-w-3xl">
          <div className="flex gap-6">
            <SectionNumber n="04" />
            <div className="min-w-0 flex-1">
              <motion.h2 className="font-display text-lg font-semibold tracking-tight text-[var(--fg)] sm:text-xl" variants={item}>
                Connections
              </motion.h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {connections.map((c, i) => (
                  <motion.li key={c.title} variants={item}>
                    <motion.div
                      className="group relative rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] p-4 transition-colors hover:border-[var(--border-strong)] hover:shadow-sm sm:p-5"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="absolute left-4 top-4 h-1.5 w-1.5 rounded-full bg-[var(--accent)] sm:left-5 sm:top-5" aria-hidden />
                      <h3 className="pl-4 font-display text-sm font-semibold text-[var(--fg)] sm:pl-5">{c.title}</h3>
                      <p className="mt-2 pl-4 text-sm leading-relaxed text-[var(--gray-600)] sm:pl-5">{c.body}</p>
                    </motion.div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Accent divider */}
      <div className="h-px w-full bg-[var(--accent)]/40" aria-hidden />

      {/* Section 05 – What we offer (cards) */}
      <motion.section
        className="border-b border-[var(--border)] bg-[var(--bg)] px-4 py-12 sm:px-6 sm:py-16"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={container}
      >
        <div className="mx-auto max-w-3xl">
          <div className="flex gap-6">
            <SectionNumber n="05" />
            <div className="min-w-0 flex-1">
              <motion.h2 className="font-display text-lg font-semibold tracking-tight text-[var(--fg)] sm:text-xl" variants={item}>
                What we offer
              </motion.h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {offers.map((o) => (
                  <motion.li key={o.label} variants={item}>
                    <div className="relative rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)] p-4 transition-colors hover:border-[var(--border-strong)] sm:p-5">
                      <span className="absolute left-4 top-4 h-1.5 w-1.5 rounded-full bg-[var(--accent)] sm:left-5 sm:top-5" aria-hidden />
                      <h3 className="pl-4 font-display text-sm font-semibold text-[var(--fg)] sm:pl-5">{o.label}</h3>
                      <p className="mt-2 pl-4 text-sm leading-relaxed text-[var(--gray-600)] sm:pl-5">{o.body}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      <footer className="bg-[var(--gray-50)] px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <motion.p
            className="text-sm text-[var(--gray-600)]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link href="/shop" className="font-medium text-[var(--link)] hover:text-[var(--link-hover)]">
              Shop by category
            </Link>
            {" · "}
            <Link href="/contact" className="font-medium text-[var(--link)] hover:text-[var(--link-hover)]">
              Contact
            </Link>
          </motion.p>
        </div>
      </footer>
    </div>
  );
}
