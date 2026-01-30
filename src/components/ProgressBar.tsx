"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
    current: number;
    total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
    const percentage = Math.min(100, Math.max(0, ((current + 1) / total) * 100));

    return (
        <div className="fixed top-0 left-0 w-full h-[2px] bg-white/5 z-50">
            <motion.div
                className="h-full bg-gold"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            />

            {/* Subtle glow */}
            <motion.div
                className="absolute top-0 right-0 h-full w-20 bg-gold blur-[4px] opacity-30"
                style={{ left: `${percentage}%`, transform: 'translateX(-100%)' }}
                animate={{ left: `${percentage}%` }}
            />
        </div>
    );
};
