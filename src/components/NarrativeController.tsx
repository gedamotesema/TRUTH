"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNarrativeStore } from '@/store/useNarrativeStore';
import { TypewriterText } from '@/components/TypewriterText';
import { ScriptureViewer } from '@/components/ScriptureViewer';
import { Step } from '@/types/content';
import { Scale } from 'lucide-react';
import { cn } from '@/lib/utils';
import { QuoteCard } from './steps/QuoteCard';
import { DebateView } from './steps/DebateView';
import { AnalysisView } from './steps/AnalysisView';
import { ReflectionView } from './steps/ReflectionView';
import { ProgressBar } from '@/components/ProgressBar';
import { NavigationMenu } from '@/components/NavigationMenu';
import { Timeline } from '@/components/Timeline';
import { AudioController } from '@/components/AudioController';
import { SummaryOverlay } from '@/components/SummaryOverlay';
import { ALL_ACTS } from '@/lib/content-mock';
import { UI_TRANSLATIONS, STRUC_TRANSLATIONS_AM, NARRATIVE_TRANSLATIONS_AM } from '@/lib/translations';
import { ChevronRight, ChevronLeft, Menu, RefreshCcw, Bookmark, BookOpen } from 'lucide-react';

interface NarrativeControllerProps {
    steps: Step[];
    onEnd?: () => void;
}

export const NarrativeController: React.FC<NarrativeControllerProps> = ({ steps, onEnd }) => {
    const {
        currentStepIndex,
        currentActId,
        currentChapterId,
        prevStep,
        nextStep,
        setStep,
        setAct,
        setChapter,
        jumpTo,
        bookmarks,
        toggleBookmark,
        language,
        setLanguage,
        resetProgress,
        isSummaryOpen,
        setSummaryOpen
    } = useNarrativeStore();
    const [showNext, setShowNext] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const derivedActId = React.useMemo(() => {
        let count = 0;
        for (const act of ALL_ACTS) {
            for (const chapter of act.chapters) {
                count += chapter.steps.length;
                if (currentStepIndex < count) return act.id;
            }
        }
        return ALL_ACTS[0].id;
    }, [currentStepIndex]);

    const t = (key: keyof typeof UI_TRANSLATIONS.en) => {
        const lang = language as 'en' | 'am';
        return UI_TRANSLATIONS[lang][key] || UI_TRANSLATIONS.en[key];
    };

    const currentStep = React.useMemo(() => {
        const step = steps[currentStepIndex];

        if (step && language === 'am' && NARRATIVE_TRANSLATIONS_AM[step.id]) {
            const trans = NARRATIVE_TRANSLATIONS_AM[step.id];
            if (typeof trans === 'string') {
                return { ...step, content: trans };
            }
            // Deep merge for complex types
            return {
                ...step,
                ...trans,
                metadata: trans.metadata ? { ...step.metadata, ...trans.metadata } : step.metadata,
                quote: trans.quote ? { ...step.quote, ...trans.quote } : step.quote,
                debate: trans.debate ? { ...step.debate, ...trans.debate } : step.debate,
                analysis: trans.analysis ? { ...step.analysis, ...trans.analysis } : step.analysis,
                reflection: trans.reflection ? { ...step.reflection, ...trans.reflection } : step.reflection,
            };
        }
        return step;
    }, [steps, currentStepIndex, language]);

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

    const handleJump = (jumpToId?: string) => {
        if (jumpToId) {
            const index = steps.findIndex(s => s.id === jumpToId);
            if (index !== -1) {
                setStep(index);
                return;
            }
        }
        handleNext();
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
            <ProgressBar current={currentStepIndex} total={steps.length} />

            <SummaryOverlay
                isOpen={isSummaryOpen}
                onClose={() => setSummaryOpen(false)}
            />

            <NavigationMenu
                isOpen={showMenu}
                onClose={() => setShowMenu(false)}
            />

            <Timeline currentActId={derivedActId} />

            {/* Top Bar */}
            <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-30">
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    whileHover={{ opacity: 1 }}
                    onClick={() => setShowMenu(true)}
                    className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em]"
                >
                    <Menu className="w-4 h-4" />
                    <span className="hidden md:block">Menu</span>
                </motion.button>

                <div className="flex items-center gap-6">
                    {/* Language Toggle */}
                    <button
                        onClick={() => setLanguage(language === 'en' ? 'am' : 'en')}
                        className="text-[10px] font-medium tracking-[0.2em] px-2 py-1 rounded border border-white/10 hover:border-gold/50 hover:text-gold transition-all duration-300"
                        title="Switch Language"
                    >
                        {language === 'en' ? 'አማ' : 'EN'}
                    </button>

                    {/* Summary Button */}
                    <button
                        onClick={() => setSummaryOpen(true)}
                        className="flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] px-2 py-1 rounded border border-gold/20 hover:bg-gold/10 text-gold/60 hover:text-gold transition-all duration-300 group"
                    >
                        <BookOpen className="w-3 h-3 text-gold/60 group-hover:text-gold" />
                        <span className="hidden md:block uppercase">{t('summary')}</span>
                    </button>

                    <AudioController actId={derivedActId} />
                    <button
                        onClick={() => {
                            if (confirm('Restart the whole journey?')) {
                                resetProgress();
                                window.location.reload();
                            }
                        }}
                        className="opacity-20 hover:opacity-100 transition-opacity"
                        title="Restart"
                    >
                        <RefreshCcw className="w-4 h-4 text-white" />
                    </button>
                    <div className="text-[10px] uppercase tracking-[0.4em] text-white/20">
                        {currentStepIndex + 1} / {steps.length}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleBookmark(currentStep.id)}
                        className="opacity-40 hover:opacity-100 transition-opacity"
                        title="Bookmark Step"
                    >
                        <Bookmark
                            className={cn(
                                "w-4 h-4 transition-colors",
                                bookmarks.includes(currentStep.id) ? "fill-gold text-gold" : "text-white"
                            )}
                        />
                    </motion.button>
                </div>
            </div>

            {/* Visual Stage (Background) */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep.visuals?.background || 'base'}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 0.3,
                        scale: 1.1,
                        x: mousePos.x,
                        y: mousePos.y
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, x: { type: "spring", stiffness: 50, damping: 30 }, y: { type: "spring", stiffness: 50, damping: 30 } }}
                    className="absolute inset-0 bg-cover bg-center z-0 scale-110"
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
                        ) : currentStep.type === 'reflection' && currentStep.reflection ? (
                            <ReflectionView
                                data={currentStep.reflection}
                                onComplete={handleJump}
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
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 flex justify-between items-end pointer-events-none z-40">
                <AnimatePresence>
                    {currentStepIndex > 0 && (
                        <motion.button
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            onClick={prevStep}
                            className="pointer-events-auto group flex flex-col items-center space-y-2 py-4 px-10 rounded-sm bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] hover:border-gold/50 transition-all duration-500 backdrop-blur-sm"
                        >
                            <span className="text-[10px] uppercase tracking-[0.4em] text-white/60 group-hover:text-gold transition-colors duration-300">
                                {t('back')}
                            </span>
                            <ChevronLeft className="w-5 h-5 text-white/60 group-hover:text-gold group-hover:-translate-x-1 transition-all duration-300" />
                        </motion.button>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {showNext && currentStep.type !== 'reflection' && (
                        <motion.button
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            onClick={handleNext}
                            className="pointer-events-auto group flex flex-col items-center space-y-2 py-4 px-10 rounded-sm bg-gold/[0.05] border border-gold/20 hover:bg-gold/[0.15] hover:border-gold/80 transition-all duration-500 backdrop-blur-sm shadow-[0_0_20px_rgba(212,175,55,0.05)]"
                        >
                            <span className="text-[10px] uppercase tracking-[0.4em] text-gold/80 group-hover:text-gold transition-colors duration-300">
                                {t('next')}
                            </span>
                            <ChevronRight className="w-5 h-5 text-gold/80 group-hover:text-gold group-hover:translate-x-1 transition-all duration-300" />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </div >
    );
};
