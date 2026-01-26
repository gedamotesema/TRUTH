"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALL_ACTS } from '@/lib/content-mock';
import { NarrativeController } from '@/components/NarrativeController';
import { useNarrativeStore } from '@/store/useNarrativeStore';

export default function Home() {
  const [started, setStarted] = useState(false);
  const { currentStepIndex } = useNarrativeStore();
  const hasProgress = currentStepIndex > 0;

  const handleStart = () => {
    setStarted(true);
  };

  // Flatten all steps for the combined journey
  const allSteps = useMemo(() => {
    return ALL_ACTS.flatMap(act =>
      act.chapters.flatMap(chapter => chapter.steps)
    );
  }, []);

  return (
    <main className="min-h-screen bg-[#05070a] text-white flex flex-col items-center justify-center p-4 overflow-hidden">
      <AnimatePresence mode="wait">
        {!started ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.5 } }}
            className="text-center space-y-12"
          >
            <div className="space-y-4">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-7xl md:text-9xl tracking-[0.6em] font-light serif text-white/90 translate-x-[0.3em]"
              >
                TRUTH
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="text-xs uppercase tracking-[0.8em] translate-x-[0.4em]"
              >
                A journey to the true Church
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.5 }}
              className="flex flex-col md:flex-row items-center justify-center gap-8"
            >
              <button
                onClick={handleStart}
                className="group relative px-12 py-4 border border-white/10 hover:border-gold/50 text-white/60 hover:text-gold transition-all duration-500 rounded-sm text-xs tracking-[0.4em] uppercase overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10">{hasProgress ? 'Continue Journey' : 'Begin the Journey'}</span>
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="narrative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="w-full h-full"
          >
            <NarrativeController
              steps={allSteps}
              onEnd={() => setStarted(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
