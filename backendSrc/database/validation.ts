// import { WithId } from "mongodb";
// Här ska vi ha JOI!
import { UserInterface } from "../models/UserInterface";

function isValidUser(user: UserInterface): boolean {
    return user === user;
}

export { isValidUser };
