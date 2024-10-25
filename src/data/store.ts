import { create } from "zustand";

interface User {
    id: string;
    username: string;
    gender: string;
}

interface Store {
    isLoggedIn: boolean;
    user: User | null;
    setUser: (user: User | null) => void;
    login: (token: string, user: User) => void;
    loginAsGuest: () => void; // Add this line
    logout: () => void;
    // restoreSession: () => void;
}

const LS_KEY = "JWT-TOKEN";

const useStore = create<Store>((set) => ({
    isLoggedIn: false,
    user: null,
    setUser: (user) => set({ user }),
    login: (token, user) => {
        localStorage.setItem(LS_KEY, token);
        set({ isLoggedIn: true, user });
    },
    loginAsGuest: () => {
        set({ isLoggedIn: true, user: null });
    },
    logout: () => {
        localStorage.removeItem(LS_KEY);
        set({ isLoggedIn: false, user: null });
    },
}));

export default useStore;
