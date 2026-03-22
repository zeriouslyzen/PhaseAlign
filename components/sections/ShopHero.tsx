"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HERO_IMAGE_IDS = [1, 2, 3, 4, 5, 6, 7, 8];
const ROTATE_INTERVAL_MS = 2400;
const CUT_DURATION = 0.12;

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

interface ShopHeroProps {
  title: string;
  description?: string;
}

export function ShopHero({ title, description }: ShopHeroProps) {
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
      className="relative -mt-[3.5rem] border-b border-[var(--border)] pt-[6rem] pb-8 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Background with dark overlay */}
      <div className="absolute inset-0 bg-[var(--gray-900)]">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentId}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: CUT_DURATION }}
          >
            <HeroBackgroundImage id={currentId} />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" aria-hidden />
      </div>

      <div className="relative z-10 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <motion.h1
            className="font-display text-2xl font-bold tracking-tight text-white drop-shadow-lg sm:text-3xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              className="mt-2 max-w-xl text-sm text-white/80 drop-shadow sm:text-base"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>
    </motion.section>
  );
}
