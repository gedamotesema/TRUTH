import { create } from 'zustand';

interface User {
    id: string;
    email: string;
    username?: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    login: (email: string, pass: string) => Promise<void>;
    register: (email: string, username: string, pass: string) => Promise<void>;
    logout: () => void;
    clearError: () => void;
}

// Mock user for "guest" access if needed, or just keep it simple.
// Since we want to remove auth, we can make 'isAuthenticated' always true or irrelevant.
// For now, I'll make it always return success immediately.

export const useAuthStore = create<AuthState>((set) => ({
    user: { id: 'guest', email: 'guest@example.com', username: 'Guest' },
    isAuthenticated: true, // Always authenticated
    isLoading: false,
    error: null,

    login: async (email, password) => {
        // No-op success
        set({
            user: { id: 'guest', email, username: 'Guest' },
            isAuthenticated: true,
            isLoading: false
        });
    },

    register: async (email, username, password) => {
        // No-op success
        set({
            user: { id: 'guest', email, username },
            isAuthenticated: true,
            isLoading: false
        });
    },

    logout: () => {
        // No-op
        set({ user: null, isAuthenticated: false });
    },

    clearError: () => set({ error: null }),
}));
