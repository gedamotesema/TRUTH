"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReflectionData, ChoiceOption } from '@/types/content';
import { HelpCircle, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReflectionViewProps {
    data: ReflectionData;
    onComplete?: (jumpTo?: string) => void;
}

export const ReflectionView: React.FC<ReflectionViewProps> = ({ data, onComplete }) => {
    const [selectedOption, setSelectedOption] = useState<ChoiceOption | null>(null);

    return (
        <div className="w-full max-w-2xl mx-auto space-y-12">
            <div className="text-center space-y-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex justify-center"
                >
                    <HelpCircle className="w-12 h-12 text-gold/60" />
                </motion.div>
                <h2 className="text-xl md:text-2xl font-serif text-white/90">
                    {data.question}
                </h2>
            </div>

            <div className="grid gap-4">
                {data.options.map((option, index) => (
                    <motion.button
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setSelectedOption(option)}
                        className={cn(
                            "w-full p-6 text-left border rounded-sm transition-all duration-500 group",
                            selectedOption === option
                                ? "bg-gold/10 border-gold text-gold"
                                : "bg-white/5 border-white/10 text-white/60 hover:border-white/30 hover:text-white"
                        )}
                    >
                        <div className="flex justify-between items-center">
                            <span className="text-sm uppercase tracking-[0.2em]">{option.label}</span>
                            <ChevronRight className={cn(
                                "w-4 h-4 transition-transform duration-500",
                                selectedOption === option ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:opacity-40"
                            )} />
                        </div>
                    </motion.button>
                ))}
            </div>

            <AnimatePresence>
                {selectedOption && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-8 pt-8 border-t border-white/5 text-center"
                    >
                        <p className="text-lg text-white/80 font-serif leading-relaxed italic">
                            {selectedOption.text}
                        </p>

                        <button
                            onClick={() => onComplete?.(selectedOption.jumpTo)}
                            className="px-12 py-3 bg-gold text-black uppercase tracking-[0.4em] text-[10px] font-bold hover:bg-white transition-colors duration-500"
                        >
                            Continue
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
