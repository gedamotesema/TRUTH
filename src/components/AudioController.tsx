"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioControllerProps {
    actId: string;
}

const ACT_AUDIO: Record<string, string> = {
    'act-1': '/assets/audio/island-ambience.mp3',
    'act-3': '/assets/audio/reformation-church.mp3',
    'act-6': '/assets/audio/ancient-chants.mp3',
    'act-7': '/assets/audio/paradise-peace.mp3'
};

export const AudioController: React.FC<AudioControllerProps> = ({ actId }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [currentTrack, setCurrentTrack] = useState<string | null>(null);

    useEffect(() => {
        const track = ACT_AUDIO[actId] || ACT_AUDIO['act-1'];
        if (track !== currentTrack) {
            setCurrentTrack(track);
        }
    }, [actId, currentTrack]);

    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio();
            audioRef.current.loop = true;
        }

        const audio = audioRef.current;

        if (currentTrack) {
            // Fade out, change source, fade in
            const fadeOut = async () => {
                const interval = setInterval(() => {
                    if (audio.volume > 0.05) {
                        audio.volume -= 0.05;
                    } else {
                        clearInterval(interval);
                        audio.src = currentTrack;
                        audio.volume = 0;
                        if (!isMuted) {
                            audio.play().catch(e => console.log("Audio play blocked", e));
                            fadeIn();
                        }
                    }
                }, 50);
            };

            const fadeIn = () => {
                const interval = setInterval(() => {
                    if (audio.volume < 0.2) { // Low volume for ambience
                        audio.volume += 0.01;
                    } else {
                        clearInterval(interval);
                    }
                }, 100);
            };

            if (audio.src) {
                fadeOut();
            } else {
                audio.src = currentTrack;
                audio.volume = 0;
                if (!isMuted) {
                    audio.play().catch(e => console.log("Audio play blocked", e));
                    fadeIn();
                }
            }
        }

        return () => {
            // Cleanup not needed here as we want continuous play
        };
    }, [currentTrack]);

    useEffect(() => {
        if (audioRef.current) {
            if (isMuted) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.log("Audio play blocked", e));
                audioRef.current.volume = 0.2;
            }
        }
    }, [isMuted]);

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMuted(!isMuted)}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors z-[60]"
            title={isMuted ? "Unmute Ambience" : "Mute Ambience"}
        >
            <AnimatePresence mode="wait">
                {isMuted ? (
                    <motion.div
                        key="mute"
                        initial={{ opacity: 0, rotate: -20 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 20 }}
                    >
                        <VolumeX className="w-4 h-4 text-white/40" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="volume"
                        initial={{ opacity: 0, rotate: -20 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 20 }}
                    >
                        <Volume2 className="w-4 h-4 text-gold" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
};
