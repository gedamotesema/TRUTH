"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { QuoteData } from '@/types/content';
import { Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuoteCardProps {
    data: QuoteData;
    className?: string;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ data, className }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "relative max-w-2xl mx-auto p-12 overflow-hidden rounded-sm",
                "bg-[#0f1219] border border-gold/20",
                className
            )}
        >
            {/* Background Texture/Accent */}
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <Quote className="w-24 h-24 text-gold" />
            </div>

            <div className="relative z-10 space-y-8">
                <div className="space-y-2">
                    <div className="w-12 h-1 bg-gold/50 mb-6" />
                    <p className="text-xl md:text-3xl font-serif leading-relaxed text-white/90 italic">
                        "{data.text}"
                    </p>
                </div>

                <div className="flex flex-col border-l-2 border-gold/30 pl-4 space-y-1">
                    <span className="text-gold uppercase tracking-[0.2em] font-medium">
                        {data.author}
                    </span>
                    {(data.title || data.year) && (
                        <span className="text-sm text-white/40 font-serif">
                            {data.title} {data.year ? `• ${data.year}` : ''}
                        </span>
                    )}
                    {data.source && (
                        <span className="text-xs text-white/30 italic mt-1">
                            Source: {data.source}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};
