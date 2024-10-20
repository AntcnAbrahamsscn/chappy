import { ObjectId } from "mongodb";

export interface MessageInterface {
    _id: ObjectId;
    senderId: ObjectId;
    content: string;
    gender: string;
    channel: ObjectId | null;
    directTo: ObjectId | null;
    timeSent: Date;
}
