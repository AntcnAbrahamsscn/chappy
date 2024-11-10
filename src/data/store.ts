import { create } from "zustand";
import { StoreInterface } from "../models/StoreInterface";

const LS_KEY = "JWT-TOKEN";
const USER_KEY = "USER";

const useStore = create<StoreInterface>((set) => ({
    isLoggedIn: false,
    user: null,
    setUser: (user) => set({ user }),
    login: (token, user) => {
        localStorage.setItem(LS_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        set({ isLoggedIn: true, user });
    },
    loginAsGuest: () => {
        set({ isLoggedIn: true, user: null });
    },
    logout: () => {
        localStorage.removeItem(LS_KEY);
        localStorage.removeItem(USER_KEY);
        set({ isLoggedIn: false, user: null });
    },
    messageRefreshTrigger: false,
    toggleMessageRefresh: () =>
        set((state) => ({
            messageRefreshTrigger: !state.messageRefreshTrigger,
        })),
    initializeUser: () => {
        const token = localStorage.getItem(LS_KEY);
        const storedUser = localStorage.getItem(USER_KEY);

        if (token) {
            if (storedUser) {
                try {
                    const user = JSON.parse(storedUser);
                    set({ isLoggedIn: true, user });
                } catch (error) {
                    console.error("Error message is:", error);
                    localStorage.removeItem(LS_KEY);
                    localStorage.removeItem(USER_KEY);
                    set({ isLoggedIn: false, user: null });
                }
            } else {
                set({ isLoggedIn: true, user: null });
            }
        } else {
            set({ isLoggedIn: false, user: null });
        }
    },
}));

useStore.getState().initializeUser();

export default useStore;
