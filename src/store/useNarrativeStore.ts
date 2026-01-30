import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NarrativeState {
    currentActId: string | null;
    currentChapterId: string | null;
    currentStepIndex: number;
    isTransitioning: boolean;
    isLoading: boolean;
    bookmarks: string[]; // Step IDs
    language: 'en' | 'am';
    isSummaryOpen: boolean;
    isMuted: boolean;
    volume: number;

    // Actions
    setAct: (id: string) => void;
    setChapter: (id: string) => void;
    setStep: (index: number) => void;
    nextStep: () => Promise<void>;
    prevStep: () => void;
    setTransitioning: (status: boolean) => void;
    resetProgress: () => void;
    toggleBookmark: (stepId: string) => void;
    setLanguage: (lang: 'en' | 'am') => void;
    jumpTo: (actId: string, chapterId: string, stepIndex: number) => void;
    setSummaryOpen: (open: boolean) => void;
    toggleMute: () => void;
    setVolume: (v: number) => void;
}

export const useNarrativeStore = create<NarrativeState>()(
    persist(
        (set, get) => ({
            currentActId: null,
            currentChapterId: null,
            currentStepIndex: 0,
            isTransitioning: false,
            isLoading: false,
            bookmarks: [],
            language: 'en',
            isSummaryOpen: false,
            isMuted: true,
            volume: 0.2,


            setAct: (id) => {
                set({ currentActId: id, currentChapterId: null, currentStepIndex: 0 });
            },

            setChapter: (id) => {
                set({ currentChapterId: id, currentStepIndex: 0 });
            },

            setStep: (index) => {
                set({ currentStepIndex: index });
            },

            nextStep: async () => {
                set((state) => ({ currentStepIndex: state.currentStepIndex + 1 }));
            },

            prevStep: () => {
                set((state) => ({ currentStepIndex: Math.max(0, state.currentStepIndex - 1) }));
            },

            setTransitioning: (status) => set({ isTransitioning: status }),

            resetProgress: () => set({
                currentActId: null,
                currentChapterId: null,
                currentStepIndex: 0,
            }),

            toggleBookmark: (stepId) => {
                set((state) => {
                    const isBookmarked = state.bookmarks.includes(stepId);
                    return {
                        bookmarks: isBookmarked
                            ? state.bookmarks.filter(id => id !== stepId)
                            : [...state.bookmarks, stepId]
                    };
                });
            },

            setLanguage: (lang) => set({ language: lang }),

            jumpTo: (actId, chapterId, stepIndex) => set({
                currentActId: actId,
                currentChapterId: chapterId,
                currentStepIndex: stepIndex
            }),

            setSummaryOpen: (open) => set({ isSummaryOpen: open }),
            toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
            setVolume: (v) => set({ volume: v }),
        }),
        {
            name: 'truth-narrative-progress',
        }
    )
);
