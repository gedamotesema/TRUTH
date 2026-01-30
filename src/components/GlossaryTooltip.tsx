"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlossaryTerm, GLOSSARY_DATA } from '@/lib/glossary-data';
import { useNarrativeStore } from '@/store/useNarrativeStore';
import { GLOSSARY_TRANSLATIONS_AM } from '@/lib/translations';
import { cn } from '@/lib/utils';

interface GlossaryTooltipProps {
    term: string;
    children: React.ReactNode;
}

export const GlossaryTooltip: React.FC<GlossaryTooltipProps> = ({ term, children }) => {
    const { language } = useNarrativeStore();
    const [isHovered, setIsHovered] = useState(false);

    let termData = GLOSSARY_DATA.find(t => t.term.toLowerCase() === term.toLowerCase());

    if (language === 'am' && termData && GLOSSARY_TRANSLATIONS_AM[termData.term]) {
        termData = {
            ...termData,
            ...GLOSSARY_TRANSLATIONS_AM[termData.term]
        };
    }

    if (!termData) return <>{children}</>;

    return (
        <span
            className="relative inline-block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span className="cursor-help border-b border-gold/40 hover:border-gold transition-colors text-inherit decoration-gold/30">
                {children}
            </span>

            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        className={cn(
                            "absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 p-4 bg-[#1a1f26] border border-gold/20 shadow-2xl z-[100] rounded-sm pointer-events-none",
                            language === 'am' && "font-amharic"
                        )}
                    >
                        <div className="space-y-2">
                            <h4 className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold">
                                {termData.term}
                            </h4>
                            <p className="text-xs text-white/70 leading-relaxed font-sans normal-case tracking-normal">
                                {termData.definition}
                            </p>
                        </div>

                        {/* Arrow */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#1a1f26]" />
                    </motion.div>
                )}
            </AnimatePresence>
        </span>
    );
};
