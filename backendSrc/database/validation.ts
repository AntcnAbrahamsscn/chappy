// import { WithId } from "mongodb";
import { UserInterface } from "../models/UserInterface";

function isValidUser(user: UserInterface): boolean {
    return user === user;
}

export { isValidUser };
