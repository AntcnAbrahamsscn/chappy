// import { ObjectId } from "mongodb";

export interface MessageInterface {
    // _id: ObjectId;
    sender: string;
    content: string;
    channel: string | null;
    directTo: string | null;
    sentAt: Date;
}
