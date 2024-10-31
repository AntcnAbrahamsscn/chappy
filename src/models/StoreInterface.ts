import { UserInterface } from "./UserInterface";

export interface StoreInterface {
    isLoggedIn: boolean;
    user: UserInterface | null;
    setUser: (user: UserInterface | null) => void;
    login: (token: string, user: UserInterface) => void;
    loginAsGuest: () => void;
    logout: () => void;
}