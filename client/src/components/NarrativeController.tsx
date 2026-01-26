"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNarrativeStore } from '@/store/useNarrativeStore';
import { TypewriterText } from '@/components/TypewriterText';
import { ChevronRight } from 'lucide-react';
import { ScriptureViewer } from '@/components/ScriptureViewer';
import { Step } from '@/types/content';
import { Scale } from 'lucide-react';
import { cn } from '@/lib/utils';
import { QuoteCard } from './steps/QuoteCard';
import { DebateView } from './steps/DebateView';
import { AnalysisView } from './steps/AnalysisView';

interface NarrativeControllerProps {
    steps: Step[];
    onEnd?: () => void;
}

export const NarrativeController: React.FC<NarrativeControllerProps> = ({ steps, onEnd }) => {
    const { currentStepIndex, nextStep, setTransitioning, resetProgress } = useNarrativeStore();
    const [showNext, setShowNext] = useState(false);

    const currentStep = steps[currentStepIndex];

    useEffect(() => {
        setShowNext(false);
        // For types that don't use Typewriter (which calls onComplete), we need to manually trigger completion
        // OR rely on the component's onComplete callback
        const typesWithInternalAuth = ['debate', 'analysis']; // Components that handle their own timing
        const staticTypes = ['revelation', 'logic', 'scripture', 'quote'];

        if (currentStep) {
            if (staticTypes.includes(currentStep.type)) {

                // Keep the manual timer for simple static types
                const timer = setTimeout(() => {
                    setShowNext(true);
                }, 3500); // Slightly longer for quotes
                return () => clearTimeout(timer);

            } else if (typesWithInternalAuth.includes(currentStep.type)) {
                // Do nothing, wait for callback
            }
        }
    }, [currentStepIndex, currentStep]);

    const handleComplete = React.useCallback(() => {
        setShowNext(true);
    }, []);

    const handleNext = () => {
        if (currentStepIndex < steps.length - 1) {
            nextStep(); // This now handles saveProgress internally
        } else {
            onEnd?.();
        }
    };

    if (!currentStep) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-white space-y-4">
                <p className="text-xl font-serif text-white/60">The path is unclear...</p>
                <button
                    onClick={() => {
                        resetProgress();
                        window.location.reload();
                    }}
                    className="px-6 py-2 border border-gold/40 text-gold hover:bg-gold/10 transition-colors uppercase tracking-widest text-xs"
                >
                    Restart Journey
                </button>
            </div>
        );
    }

    return (
        <div className="relative w-full h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
            {/* Visual Stage (Background) */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep.visuals?.background || 'base'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3, scale: 1.05 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, scale: { duration: 20, ease: "linear" } }}
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{
                        backgroundImage: currentStep.visuals?.background
                            ? `url(/assets/images/${currentStep.visuals.background}.png)`
                            : 'none'
                    }}
                />
            </AnimatePresence>

            {/* Content Container */}
            <div className="relative z-10 max-w-2xl w-full text-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep.id}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        {currentStep.speaker && (
                            <motion.h3
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-gold uppercase tracking-[0.3em] text-sm serif"
                            >
                                {currentStep.speaker}
                            </motion.h3>
                        )}

                        {currentStep.type === 'scripture' ? (
                            <ScriptureViewer
                                content={currentStep.content}
                                reference={currentStep.metadata?.reference}
                            />
                        ) : currentStep.type === 'logic' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="glass-panel p-10 rounded-sm border-gold/20 space-y-4"
                            >
                                <Scale className="w-8 h-8 text-gold mx-auto mb-4 opacity-70" />
                                <h4 className="text-[10px] uppercase tracking-[0.5em] text-gold/60 serif mb-2">Logical Axiom</h4>
                                <p className="text-xl md:text-2xl font-sans text-white/80 leading-relaxed italic">
                                    {currentStep.content}
                                </p>
                            </motion.div>

                        ) : currentStep.type === 'quote' && currentStep.quote ? (
                            <QuoteCard data={currentStep.quote} />
                        ) : currentStep.type === 'debate' && currentStep.debate ? (
                            <DebateView
                                sideA={currentStep.debate.sideA}
                                sideB={currentStep.debate.sideB}
                                summary={currentStep.debate.summary}
                                onComplete={handleComplete}
                            />
                        ) : currentStep.type === 'analysis' && currentStep.analysis ? (
                            <AnalysisView
                                data={currentStep.analysis}
                                onComplete={handleComplete}
                            />
                        ) : (
                            <TypewriterText
                                text={currentStep.content}
                                className={cn(
                                    "text-2xl md:text-3xl font-light leading-relaxed font-sans text-white/90"
                                )}
                                speed={40}
                                onComplete={handleComplete}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="absolute bottom-20 z-20">
                <AnimatePresence>
                    {showNext && (
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            onClick={handleNext}
                            className="group flex flex-col items-center space-y-3 py-4 px-8 rounded-full hover:bg-white/5 transition-all duration-300"
                        >
                            <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 group-hover:text-gold transition-colors duration-300">Next</span>
                            <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-gold group-hover:translate-x-1 transition-all duration-300" />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
