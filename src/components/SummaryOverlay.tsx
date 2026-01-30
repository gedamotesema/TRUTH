"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, BookOpen, User, Calendar } from 'lucide-react';
import { useNarrativeStore } from '@/store/useNarrativeStore';
import { DENOMINATION_DATA } from '@/lib/denomination-data';
import { UI_TRANSLATIONS, DENOMINATION_TRANSLATIONS_AM } from '@/lib/translations';
import { cn } from '@/lib/utils';

interface SummaryOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SummaryOverlay: React.FC<SummaryOverlayProps> = ({ isOpen, onClose }) => {
    const { language } = useNarrativeStore();

    const t = (key: keyof typeof UI_TRANSLATIONS.en) => {
        const lang = language as 'en' | 'am';
        return UI_TRANSLATIONS[lang][key] || UI_TRANSLATIONS.en[key];
    };

    const getDenomData = (denom: typeof DENOMINATION_DATA[0]) => {
        if (language === 'am' && DENOMINATION_TRANSLATIONS_AM[denom.id]) {
            return {
                ...denom,
                ...DENOMINATION_TRANSLATIONS_AM[denom.id]
            };
        }
        return denom;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
                >
                    <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose} />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className={cn(
                            "relative w-full max-w-5xl h-[85vh] bg-[#0d1117] border border-white/10 rounded-lg shadow-2xl flex flex-col overflow-hidden",
                            language === 'am' && "font-amharic"
                        )}
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#161b22]">
                            <div className="flex items-center gap-3">
                                <BookOpen className="w-6 h-6 text-gold" />
                                <h2 className="text-xl serif tracking-widest text-gold uppercase">
                                    {t('summary')}
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/5 rounded-full transition-colors group"
                            >
                                <X className="w-6 h-6 text-white/40 group-hover:text-white" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-12 pb-20">
                            {DENOMINATION_DATA.map((denom) => {
                                const data = getDenomData(denom);
                                return (
                                    <section key={denom.id} className={cn(
                                        "space-y-6 p-6 rounded-lg transition-all",
                                        denom.isCorrectTeaching ? "bg-gold/5 border border-gold/20 shadow-[0_0_30px_rgba(212,175,55,0.05)]" : "bg-transparent"
                                    )}>
                                        <div className="flex flex-col md:flex-row md:items-end gap-4 border-b border-gold/20 pb-4">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-2xl text-white font-serif">{data.name}</h3>
                                                {denom.isCorrectTeaching && (
                                                    <span className="text-[8px] px-2 py-0.5 bg-gold/20 text-gold border border-gold/30 rounded-full font-bold tracking-widest uppercase">
                                                        {t('baseline')}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex gap-4 text-[10px] uppercase tracking-widest text-white/40 mb-1">
                                                <span className="flex items-center gap-1">
                                                    <User className="w-3 h-3" /> {t('creator')}: {data.creator}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" /> {denom.originYear}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className={cn("space-y-4", denom.isCorrectTeaching && "md:col-span-2")}>
                                                <h4 className="text-[11px] uppercase tracking-[0.2em] text-gold/60 font-bold">
                                                    {t('dogma')}
                                                </h4>
                                                <ul className={cn(
                                                    "grid gap-3",
                                                    denom.isCorrectTeaching ? "md:grid-cols-2" : "grid-cols-1"
                                                )}>
                                                    {data.dogma.map((item: string, i: number) => (
                                                        <li key={i} className="text-sm text-white/70 flex gap-3 leading-relaxed">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-gold/40 mt-1.5 shrink-0" />
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Contradictions */}
                                            {!denom.isCorrectTeaching && (
                                                <div className="space-y-4">
                                                    <h4 className="text-[11px] uppercase tracking-[0.2em] text-red-500/60 font-bold">
                                                        {t('contradictions')}
                                                    </h4>
                                                    <div className="space-y-6">
                                                        {data.contradictions.map((c: any, i: number) => (
                                                            <div key={i} className="bg-red-500/5 border border-red-500/10 p-5 rounded-sm space-y-3 hover:bg-red-500/10 transition-colors">
                                                                <div className="flex items-start gap-3">
                                                                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                                                                    <div className="w-full">
                                                                        <p className="text-xs font-bold text-red-300 uppercase tracking-widest mb-2 border-b border-red-500/10 pb-1">
                                                                            {c.point}
                                                                        </p>
                                                                        <div className="space-y-3">
                                                                            <div className="flex items-center gap-2">
                                                                                <div className="h-[1px] w-4 bg-red-400/30" />
                                                                                <p className="text-[9px] text-red-300/40 uppercase font-bold tracking-[0.2em]">
                                                                                    {t('ancientTeaching')}
                                                                                </p>
                                                                            </div>
                                                                            <p className="text-[13px] text-white/90 leading-relaxed italic border-l-2 border-gold/20 pl-4 py-1">
                                                                                {c.ancientTeaching}
                                                                            </p>
                                                                            {c.scriptureRef && (
                                                                                <div className="flex justify-end pt-1">
                                                                                    <p className="text-[10px] text-gold font-mono bg-gold/5 px-2 py-0.5 rounded border border-gold/10">
                                                                                        {c.scriptureRef}
                                                                                    </p>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </section>
                                );
                            })}
                        </div>

                        {/* Footer */}
                        <div className="p-4 bg-[#161b22] border-t border-white/5 flex justify-center">
                            <button
                                onClick={onClose}
                                className="px-8 py-2 border border-gold/20 text-gold text-[10px] tracking-[0.4em] uppercase hover:bg-gold/10 transition-all"
                            >
                                {t('close')}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
