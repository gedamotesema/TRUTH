"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALL_ACTS } from '@/lib/content-mock';
import { cn } from '@/lib/utils';
import { useNarrativeStore } from '@/store/useNarrativeStore';
import { STRUC_TRANSLATIONS_AM } from '@/lib/translations';

interface TimelineProps {
    currentActId: string;
}

const ACT_DATES: Record<string, any> = {
    en: {
        'act-1': 'The Now',
        'act-2': 'Entering The World',
        'act-3': '1517 AD',
        'act-4': '19th Century',
        'act-5': 'The Roman Claim',
        'act-6': '451 AD',
        'act-7': 'Ancient Paths'
    },
    am: {
        'act-1': 'አሁን',
        'act-2': 'ወደ ዓለም መግባት',
        'act-3': '፲፭፻፲፯ ዓ.ም',
        'act-4': '፲፱ኛው ክፍለ ዘመን',
        'act-5': 'የሮማውያን ይገባኛል ጥያቄ',
        'act-6': '፬፻፶፩ ዓ.ም',
        'act-7': 'ጥንታዊ ጎዳናዎች'
    }
};

export const Timeline: React.FC<TimelineProps> = ({ currentActId }) => {
    const { language } = useNarrativeStore();
    const currentActIndex = ALL_ACTS.findIndex(a => a.id === currentActId);

    return (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 h-64 flex flex-col items-center gap-4 z-40 hidden lg:flex">
            <div className="w-px h-full bg-white/10 relative">
                {ALL_ACTS.map((act, index) => {
                    const isActive = index === currentActIndex;
                    const isPassed = index < currentActIndex;

                    return (
                        <div
                            key={act.id}
                            className="absolute left-1/2 -translate-x-1/2"
                            style={{ top: `${(index / (ALL_ACTS.length - 1)) * 100}%` }}
                        >
                            <div className="relative flex items-center group">
                                {/* Dot */}
                                <motion.div
                                    animate={{
                                        scale: isActive ? 1.5 : 1,
                                        backgroundColor: isActive ? '#d4af37' : isPassed ? '#ffffff' : '#444444'
                                    }}
                                    className="w-2 h-2 rounded-full border border-black z-10 transition-colors duration-500"
                                />

                                {/* Label */}
                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 10 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="absolute right-full mr-4 whitespace-nowrap"
                                        >
                                            <div className="flex flex-col items-end">
                                                <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">
                                                    {ACT_DATES[language][act.id] || ''}
                                                </span>
                                                <span className={cn(
                                                    "text-[8px] uppercase tracking-[0.1em] text-white/40 italic",
                                                    language === 'am' && "font-amharic"
                                                )}>
                                                    {language === 'am' && STRUC_TRANSLATIONS_AM[act.id] ? STRUC_TRANSLATIONS_AM[act.id] : act.title}
                                                </span>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Hover tooltip for others */}
                                {!isActive && (
                                    <div className="absolute right-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                                        <span className={cn(
                                            "text-[8px] uppercase tracking-[0.2em] text-white/40",
                                            language === 'am' && "font-amharic"
                                        )}>
                                            {language === 'am' && STRUC_TRANSLATIONS_AM[act.id] ? STRUC_TRANSLATIONS_AM[act.id] : act.title}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}

                {/* Progress line overlay */}
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(currentActIndex / (ALL_ACTS.length - 1)) * 100}%` }}
                    className="absolute top-0 left-0 w-full bg-gold/40 z-0 origin-top"
                    transition={{ duration: 1, ease: "easeInOut" }}
                />
            </div>
        </div>
    );
};
