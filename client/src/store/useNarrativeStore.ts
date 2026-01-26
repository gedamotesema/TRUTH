import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NarrativeState {
    currentActId: string | null;
    currentChapterId: string | null;
    currentStepIndex: number;
    isTransitioning: boolean;
    isLoading: boolean;

    // Actions
    setAct: (id: string) => void;
    setChapter: (id: string) => void;
    setStep: (index: number) => void;
    nextStep: () => Promise<void>;
    prevStep: () => void;
    setTransitioning: (status: boolean) => void;
    resetProgress: () => void;
}

export const useNarrativeStore = create<NarrativeState>()(
    persist(
        (set, get) => ({
            currentActId: null,
            currentChapterId: null,
            currentStepIndex: 0,
            isTransitioning: false,
            isLoading: false,


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
        }),
        {
            name: 'truth-narrative-progress',
        }
    )
);
