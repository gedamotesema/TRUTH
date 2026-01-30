"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNarrativeStore } from '@/store/useNarrativeStore';

interface AudioControllerProps {
    actId: string;
}

const ACT_AUDIO: Record<string, string> = {
    'act-1': '/assets/audio/island-ambience.mp3',
    'act-2': '/assets/audio/island-ambience.mp3',
    'act-3': '/assets/audio/reformation-church.mp3',
    'act-4': '/assets/audio/reformation-church.mp3',
    'act-5': '/assets/audio/historical-weight.mp3',
    'act-6': '/assets/audio/ancient-chants.mp3',
    'act-7': '/assets/audio/paradise-peace.mp3'
};

export const AudioController: React.FC<AudioControllerProps> = ({ actId }) => {
    const { isMuted, volume, toggleMute, setVolume } = useNarrativeStore();
    const [showVolume, setShowVolume] = useState(false);

    // We use two audio elements to facilitate seamless cross-fading
    const audioA = useRef<HTMLAudioElement | null>(null);
    const audioB = useRef<HTMLAudioElement | null>(null);
    const activeSide = useRef<'A' | 'B'>('A');
    const crossfadeInterval = useRef<NodeJS.Timeout | null>(null);

    const [currentTrack, setCurrentTrack] = useState<string | null>(null);

    // Safe lazy initializer
    const getAudio = (side: 'A' | 'B'): HTMLAudioElement | null => {
        if (typeof window === 'undefined') return null;

        const ref = side === 'A' ? audioA : audioB;
        if (!ref.current) {
            const audio = new Audio();
            audio.loop = true;
            audio.volume = 0;
            ref.current = audio;
        }
        return ref.current;
    };

    useEffect(() => {
        const track = ACT_AUDIO[actId] || ACT_AUDIO['act-1'];
        console.log(`[AudioController] Act: ${actId}, Track: ${track}`);
        if (track !== currentTrack) {
            console.log(`[AudioController] Transitioning: ${currentTrack} -> ${track}`);
            setCurrentTrack(track);
            crossFadeTo(track);
        }

        return () => {
            if (crossfadeInterval.current) clearInterval(crossfadeInterval.current);
        };
    }, [actId]);

    const crossFadeTo = (newSrc: string) => {
        // Clear any existing fades
        if (crossfadeInterval.current) clearInterval(crossfadeInterval.current);

        const nextSide = activeSide.current === 'A' ? 'B' : 'A';
        const currentSide = activeSide.current;

        const next = getAudio(nextSide);
        const current = getAudio(currentSide);

        if (!next || typeof window === 'undefined') return;

        // Prepare next
        next.src = newSrc;
        next.volume = 0;

        if (!isMuted) {
            next.play().catch(err => console.warn("Auto-play blocked", err));
        }

        // Crossfade logic
        let step = 0;
        const duration = 40; // ~2 seconds
        crossfadeInterval.current = setInterval(() => {
            step++;
            const progress = step / duration;

            if (current) {
                current.volume = Math.max(0, volume * (1 - progress));
            }
            if (next && !isMuted) {
                next.volume = Math.min(volume, volume * progress);
            }

            if (step >= duration) {
                if (crossfadeInterval.current) clearInterval(crossfadeInterval.current);
                if (current) {
                    current.pause();
                }
                activeSide.current = nextSide;
            }
        }, 50);
    };

    // Global adjustments (Mute/Volume)
    useEffect(() => {
        const active = getAudio(activeSide.current);
        if (active) {
            if (isMuted) {
                active.pause();
            } else {
                active.play().catch(() => { });
                active.volume = volume;
            }
        }
    }, [isMuted, volume]);

    return (
        <div className="flex items-center gap-2">
            <div
                className="relative flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 p-2 rounded-full"
                onMouseEnter={() => setShowVolume(true)}
                onMouseLeave={() => setShowVolume(false)}
            >
                <AnimatePresence>
                    {showVolume && (
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 100, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            className="overflow-hidden flex items-center px-2"
                        >
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={(e) => setVolume(parseFloat(e.target.value))}
                                className="w-full accent-gold h-1 bg-white/10 rounded-lg cursor-pointer appearance-none"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    onClick={toggleMute}
                    className="p-2 hover:bg-white/5 rounded-full transition-colors group"
                >
                    <AnimatePresence mode="wait">
                        {isMuted ? (
                            <motion.div
                                key="mute"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                            >
                                <VolumeX className="w-4 h-4 text-white/40 group-hover:text-white/60" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="volume"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                            >
                                <Volume2 className="w-4 h-4 text-gold" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            {!isMuted && (
                <div className="flex gap-1 items-end h-3 pb-0.5">
                    {[0.6, 1, 0.4, 0.8, 0.5].map((h, i) => (
                        <motion.div
                            key={i}
                            animate={{ height: [`${h * 100}%`, `${(1 - h) * 100}%`, `${h * 100}%`] }}
                            transition={{ duration: 1 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-0.5 bg-gold/40 rounded-full"
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
