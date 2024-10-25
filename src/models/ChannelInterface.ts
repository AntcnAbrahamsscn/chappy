import { ObjectId } from "mongodb";

export interface ChannelInterface {
    _id: ObjectId;
    name: string;
    isPrivate: boolean;
    messages: string[];
    canAccess: boolean;
}
