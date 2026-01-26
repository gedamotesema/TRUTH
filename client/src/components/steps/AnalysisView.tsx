"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AnalysisStep } from '@/types/content';
import { ArrowDown, BrainCircuit } from 'lucide-react';

interface AnalysisViewProps {
    data: AnalysisStep;
    onComplete?: () => void;
}

export const AnalysisView: React.FC<AnalysisViewProps> = ({ data, onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(() => onComplete?.(), 8000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="max-w-xl mx-auto space-y-6">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center mb-8"
            >
                <BrainCircuit className="w-8 h-8 text-gold/60" />
            </motion.div>

            {/* Premise 1 */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                transition={{ delay: 1 }}
                className="glass-panel p-4 rounded border-l-4 border-l-white/20"
            >
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Premise 1</div>
                <p className="text-lg text-white/90">{data.premise1}</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="flex justify-center"
            >
                <ArrowDown className="w-5 h-5 text-white/20" />
            </motion.div>

            {/* Premise 2 */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                transition={{ delay: 3 }}
                className="glass-panel p-4 rounded border-l-4 border-l-white/20"
            >
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Premise 2</div>
                <p className="text-lg text-white/90">{data.premise2}</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4.5 }}
                className="flex justify-center"
            >
                <ArrowDown className="w-5 h-5 text-gold/40" />
            </motion.div>

            {/* Conclusion */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                transition={{ delay: 5.5 }}
                className="glass-panel p-6 rounded border border-gold/30 bg-gold/5"
            >
                <div className="text-[10px] uppercase tracking-widest text-gold mb-2">Conclusion</div>
                <p className="text-xl md:text-2xl font-serif italic text-white">{data.conclusion}</p>
            </motion.div>

            {/* Analysis */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                transition={{ delay: 7 }}
                className="pt-6 border-t border-white/5 text-center"
            >
                <p className="text-sm text-white/50 leading-relaxed font-serif max-w-sm mx-auto">
                    {data.analysis}
                </p>
            </motion.div>
        </div>
    );
};
