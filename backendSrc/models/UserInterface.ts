import { ObjectId } from "mongodb";

export interface UserInterface {
    _id: ObjectId;
    name: string;
    password: string;
    gender: string;
}
