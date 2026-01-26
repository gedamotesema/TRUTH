"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DebateSide } from '@/types/content';
import { cn } from '@/lib/utils';
import { Swords } from 'lucide-react';

interface DebateViewProps {
    sideA: DebateSide;
    sideB: DebateSide;
    summary?: string;
    onComplete?: () => void;
}

export const DebateView: React.FC<DebateViewProps> = ({ sideA, sideB, summary, onComplete }) => {
    const [revealedB, setRevealedB] = useState(false);
    const [showSummary, setShowSummary] = useState(false);

    // Auto-reveal sequence could be improved, but manual for now or paced
    // For this implementation, let's make it interactive or sequenced
    React.useEffect(() => {
        const timer1 = setTimeout(() => setRevealedB(true), 4000);
        const timer2 = setTimeout(() => setShowSummary(true), 8000);
        const timer3 = setTimeout(() => onComplete?.(), 12000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [onComplete]);

    return (
        <div className="w-full max-w-5xl mx-auto space-y-12">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
                {/* Side A */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-4 text-left"
                >
                    <div className="flex items-center gap-3 text-gold/80 mb-4 border-b border-gold/20 pb-2">
                        <span className="text-xs uppercase tracking-[0.3em]">{sideA.name}</span>
                    </div>
                    <div className="glass-panel p-6 rounded-sm border-l-2 border-l-gold/40">
                        <p className="text-lg text-white/80 font-serif leading-relaxed">
                            {sideA.argument}
                        </p>
                    </div>
                </motion.div>

                {/* VS Indicator */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex flex-col items-center justify-center opacity-20 pointer-events-none">
                    <Swords className="w-12 h-12 text-white" />
                </div>

                {/* Side B */}
                <AnimatePresence>
                    {revealedB && (
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-4 text-right"
                        >
                            <div className="flex items-center justify-end gap-3 text-red-300/80 mb-4 border-b border-red-300/20 pb-2">
                                <span className="text-xs uppercase tracking-[0.3em]">{sideB.name}</span>
                            </div>
                            <div className="glass-panel p-6 rounded-sm border-r-2 border-r-red-300/40 bg-red-900/5">
                                <p className="text-lg text-white/80 font-serif leading-relaxed">
                                    {sideB.argument}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Synthesis/Summary */}
            <AnimatePresence>
                {showSummary && summary && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="max-w-xl mx-auto text-center space-y-4 pt-8"
                    >
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        <p className="text-white/60 text-sm font-sans tracking-wide">
                            {summary}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
