import { create } from "zustand";
import { StoreInterface } from "../models/StoreInterface";

const LS_KEY = "JWT-TOKEN";

const useStore = create<StoreInterface>((set) => ({
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
