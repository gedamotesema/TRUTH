"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScriptureViewerProps {
    content: string;
    reference?: string;
    className?: string;
}

export const ScriptureViewer: React.FC<ScriptureViewerProps> = ({
    content,
    reference,
    className,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
                "glass-panel p-8 md:p-12 rounded-lg max-w-2xl mx-auto space-y-6 relative overflow-hidden",
                className
            )}
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-gold/30" />

            <div className="flex justify-center">
                <BookOpen className="w-6 h-6 text-gold/50" />
            </div>

            <blockquote className="text-xl md:text-2xl serif italic text-gold/90 leading-relaxed text-center">
                "{content}"
            </blockquote>

            {reference && (
                <div className="text-center">
                    <span className="text-xs uppercase tracking-[0.4em] text-white/40 serif">
                        — {reference}
                    </span>
                </div>
            )}
        </motion.div>
    );
};
