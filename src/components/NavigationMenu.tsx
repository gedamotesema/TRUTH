"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X, Bookmark } from 'lucide-react';
import { ALL_ACTS } from '@/lib/content-mock';
import { useNarrativeStore } from '@/store/useNarrativeStore';
import { cn } from '@/lib/utils';
import { UI_TRANSLATIONS, STRUC_TRANSLATIONS_AM, NARRATIVE_TRANSLATIONS_AM } from '@/lib/translations';

interface NavigationMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const calculateReadingTime = (steps: any[]) => {
    const words = steps.reduce((acc, step) => acc + (step.content?.split(' ').length || 0), 0);
    const minutes = Math.ceil(words / 200); // Average 200 wpm
    return minutes;
};

export const NavigationMenu: React.FC<NavigationMenuProps> = ({ isOpen, onClose }) => {
    const { currentStepIndex, setStep, bookmarks, language } = useNarrativeStore();

    const t = (key: keyof typeof UI_TRANSLATIONS.en) => {
        const lang = language as 'en' | 'am';
        return UI_TRANSLATIONS[lang][key] || UI_TRANSLATIONS.en[key];
    };

    const bookmarkedSteps = React.useMemo(() => {
        const results: { id: string, title: string, index: number }[] = [];
        let stepCount = 0;
        ALL_ACTS.forEach(act => {
            act.chapters.forEach(chapter => {
                chapter.steps.forEach(step => {
                    if (bookmarks.includes(step.id)) {
                        let content = step.content;
                        if (language === 'am' && NARRATIVE_TRANSLATIONS_AM[step.id]) {
                            const trans = NARRATIVE_TRANSLATIONS_AM[step.id];
                            content = typeof trans === 'string' ? trans : trans.content;
                        }
                        results.push({
                            id: step.id,
                            title: content.slice(0, 40) + '...',
                            index: stepCount
                        });
                    }
                    stepCount++;
                });
            });
        });
        return results;
    }, [bookmarks, language]);

    // Calculate which steps belong to which chapters to allow jumping
    const allSteps = ALL_ACTS.flatMap(act =>
        act.chapters.flatMap(chapter => chapter.steps)
    );

    const getChapterStartIndex = (chapterId: string) => {
        let index = 0;
        for (const act of ALL_ACTS) {
            for (const chapter of act.chapters) {
                if (chapter.id === chapterId) return index;
                index += chapter.steps.length;
            }
        }
        return 0;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
                    />

                    {/* Menu Panel */}
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className={cn(
                            "fixed top-0 left-0 h-full w-full max-w-sm bg-[#0a0d12] border-r border-white/5 z-[70] p-8 overflow-y-auto",
                            language === 'am' && "font-amharic"
                        )}
                    >
                        <div className="flex justify-between items-center mb-12">
                            <h2 className="text-xl serif tracking-widest text-gold uppercase">
                                {language === 'am' ? 'ጉዞው' : 'The Journey'}
                            </h2>
                            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                <X className="w-5 h-5 text-white/40" />
                            </button>
                        </div>

                        <div className="space-y-12">
                            {ALL_ACTS.map((act) => (
                                <div key={act.id} className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <span className="text-[10px] text-gold/40 tracking-[0.3em] uppercase">
                                            {language === 'am' ? 'ክፍል' : 'Act'} {act.order}
                                        </span>
                                        <div className="h-px flex-1 bg-white/5" />
                                    </div>
                                    <h3 className="text-lg text-white/80 font-serif">
                                        {language === 'am' && STRUC_TRANSLATIONS_AM[act.id] ? STRUC_TRANSLATIONS_AM[act.id] : act.title}
                                    </h3>

                                    <div className="space-y-2 pl-4">
                                        {act.chapters.map((chapter) => {
                                            const startIndex = getChapterStartIndex(chapter.id);
                                            const isCurrent = currentStepIndex >= startIndex &&
                                                currentStepIndex < startIndex + chapter.steps.length;
                                            const isVisited = currentStepIndex >= startIndex;
                                            const readTime = calculateReadingTime(chapter.steps);

                                            return (
                                                <button
                                                    key={chapter.id}
                                                    onClick={() => {
                                                        setStep(startIndex);
                                                        onClose();
                                                    }}
                                                    className={cn(
                                                        "w-full text-left p-3 rounded-sm flex items-center justify-between transition-all group",
                                                        isCurrent ? "bg-gold/10 text-gold" : "hover:bg-white/5 text-white/40"
                                                    )}
                                                >
                                                    <div className="flex flex-col">
                                                        <span className="text-sm tracking-wide lowercase italic font-serif">
                                                            {language === 'am' && STRUC_TRANSLATIONS_AM[chapter.id] ? STRUC_TRANSLATIONS_AM[chapter.id] : chapter.title}
                                                        </span>
                                                        <span className="text-[9px] uppercase tracking-[0.1em] opacity-40">
                                                            ~{readTime} {language === 'am' ? 'ደቂቃ' : (readTime === 1 ? 'min' : 'mins')} {language === 'am' ? 'ንባብ' : 'read'}
                                                        </span>
                                                    </div>
                                                    {isCurrent && <ChevronRight className="w-4 h-4" />}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bookmarks Section */}
                        {bookmarkedSteps.length > 0 && (
                            <div className="mt-12 space-y-6">
                                <div className="flex items-center gap-3">
                                    <Bookmark className="w-4 h-4 text-gold/60" />
                                    <h3 className="text-[10px] uppercase tracking-[0.4em] text-white/60">
                                        {t('bookmarks')}
                                    </h3>
                                </div>
                                <div className="space-y-2">
                                    {bookmarkedSteps.map(bookmark => (
                                        <button
                                            key={bookmark.id}
                                            onClick={() => {
                                                setStep(bookmark.index);
                                                onClose();
                                            }}
                                            className="w-full text-left p-3 rounded-sm bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-gold/20 transition-all group"
                                        >
                                            <span className="text-xs text-white/40 group-hover:text-white/80 transition-colors line-clamp-1">
                                                {bookmark.title}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-20 pt-8 border-t border-white/5 space-y-4">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/20 text-center">
                                Stand at the crossroads and look...
                            </p>
                            <div className="flex flex-col items-center">
                                <p className="text-[10px] tracking-[0.1em] text-gold/40">
                                    {t('madeBy')}
                                </p>
                                <p className="text-[8px] uppercase tracking-[0.2em] text-white/10 mt-1">
                                    {t('softwareEngineer')}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
