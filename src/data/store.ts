import { create } from "zustand";
import { UserInterface } from "../models/UserInterface";

// interface User {
//     id: string;
//     username: string;
//     gender: string;
// }

interface Store {
    isLoggedIn: boolean;
    user: UserInterface | null;
    setUser: (user: UserInterface | null) => void;
    login: (token: string, user: UserInterface) => void;
    loginAsGuest: () => void;
    logout: () => void;
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
