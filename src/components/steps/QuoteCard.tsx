"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { QuoteData } from '@/types/content';
import { Quote, Share2, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuoteCardProps {
    data: QuoteData;
    className?: string;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ data, className }) => {
    const [copied, setCopied] = React.useState(false);

    const handleShare = () => {
        const text = `"${data.text}" - ${data.author}${data.year ? ` (${data.year})` : ''}`;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "relative max-w-2xl mx-auto p-12 overflow-hidden rounded-sm group",
                "bg-[#0f1219] border border-gold/20",
                className
            )}
        >
            {/* Background Texture/Accent */}
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <Quote className="w-24 h-24 text-gold" />
            </div>

            {/* Share Button */}
            <button
                onClick={handleShare}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/5 transition-all text-white/20 hover:text-gold opacity-0 group-hover:opacity-100"
                title="Copy Quote"
            >
                {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            </button>

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
