"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TypewriterTextProps {
    text: string;
    speed?: number;
    className?: string;
    onComplete?: () => void;
    startDelay?: number;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
    text,
    speed = 30,
    className,
    onComplete,
    startDelay = 0,
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        setDisplayedText('');
        setIsComplete(false);

        let intervalId: NodeJS.Timeout;
        const timeoutId = setTimeout(() => {
            let i = 0;
            intervalId = setInterval(() => {
                setDisplayedText(text.slice(0, i + 1));
                i++;
                if (i >= text.length) {
                    clearInterval(intervalId);
                    setIsComplete(true);
                    onComplete?.();
                }
            }, speed);
        }, startDelay);

        return () => {
            clearTimeout(timeoutId);
            if (intervalId) clearInterval(intervalId);
        };
    }, [text, speed, startDelay, onComplete]);

    return (
        <div className={cn("inline-block", className)}>
            {displayedText}
            {!isComplete && <span className="typewriter-cursor ml-1" />}
        </div>
    );
};
