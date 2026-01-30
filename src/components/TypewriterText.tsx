"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { GLOSSARY_DATA } from '@/lib/glossary-data';
import { GlossaryTooltip } from './GlossaryTooltip';

interface TypewriterTextProps {
    text: string;
    speed?: number;
    className?: string;
    onComplete?: () => void;
    startDelay?: number;
    enableGlossary?: boolean;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
    text,
    speed = 30,
    className,
    onComplete,
    startDelay = 0,
    enableGlossary = true,
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

    // Parse the text for glossary terms only when complete
    const content = useMemo(() => {
        if (!isComplete || !enableGlossary) return displayedText;

        let parts: (string | React.ReactNode)[] = [text];

        GLOSSARY_DATA.forEach(item => {
            const newParts: (string | React.ReactNode)[] = [];
            parts.forEach(part => {
                if (typeof part !== 'string') {
                    newParts.push(part);
                    return;
                }

                // Match whole word, case insensitive
                const regex = new RegExp(`\\b(${item.term})\\b`, 'gi');
                const subParts = part.split(regex);

                subParts.forEach((subPart, i) => {
                    if (subPart.toLowerCase() === item.term.toLowerCase()) {
                        newParts.push(
                            <GlossaryTooltip key={`${item.term}-${i}`} term={item.term}>
                                {subPart}
                            </GlossaryTooltip>
                        );
                    } else if (subPart !== '') {
                        newParts.push(subPart);
                    }
                });
            });
            parts = newParts;
        });

        return parts;
    }, [isComplete, enableGlossary, text, displayedText]);

    return (
        <div className={cn("inline-block", className)}>
            {content}
            {!isComplete && <span className="typewriter-cursor ml-1" />}
        </div>
    );
};
