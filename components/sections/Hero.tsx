"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

const HERO_IMAGE_IDS = [1, 2, 3, 4, 5, 6, 7, 8];

function HeroBackgroundImage({ id }: { id: number }) {
  const [usePng, setUsePng] = useState(false);
  const src = usePng ? `/hero/${id}.png` : `/hero/${id}.gif`;
  return (
    <img
      src={src}
      alt=""
      className="h-full w-full object-cover object-center"
      onError={() => setUsePng(true)}
    />
  );
}
const ROTATE_INTERVAL_MS = 2400;
const CUT_DURATION = 0.12;

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_IMAGE_IDS.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const currentId = HERO_IMAGE_IDS[index];

  return (
    <motion.section
      className="relative -mt-[3.5rem] min-h-[42vw] border-b border-[var(--border)] pt-[5rem] pb-2 overflow-visible sm:min-h-[220px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Background extends under nav – no gap; overflow only here so content isn't clipped */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentId}
            className="absolute inset-0"
            initial="out"
            animate="in"
            exit="out"
            variants={{
              in: {
                opacity: 1,
                scale: 1,
                transition: { duration: CUT_DURATION, ease: [0.4, 0, 0.6, 1] },
              },
              out: {
                opacity: 0,
                scale: 0.98,
                transition: { duration: 0.06, ease: [0.4, 0, 1, 1] },
              },
            }}
          >
            <HeroBackgroundImage id={currentId} />
          </motion.div>
        </AnimatePresence>
        <div
          className="absolute inset-0 bg-[var(--fg)]/40"
          aria-hidden
        />
      </div>

      {/* Content – safe area for notches, touch-friendly on phone; extra pb for descenders (e.g. g) */}
      <div className="relative z-10 px-4 pt-6 pb-8 sm:px-6 sm:pt-10 sm:pb-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="min-w-0">
            <motion.h1
              className="font-display text-xl font-bold tracking-tight text-white drop-shadow-md sm:text-2xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
            >
              Herbal blends, performance supplements, health tech, guides & instructional.
            </motion.h1>
            <motion.p
              className="mt-1.5 text-xs text-white/90 drop-shadow sm:text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
            >
              East meets west. Science-backed.
            </motion.p>
          </div>
          <motion.div
            className="flex shrink-0 gap-2"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
          >
            <Button href="/shop" size="md">
              Shop
            </Button>
            <Button href="/learn" variant="outline" size="md">
              Learn more
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 z-10 h-0.5 bg-[var(--accent)]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        style={{ originX: 0, width: "min(120px, 20vw)" }}
      />
    </motion.section>
  );
}
