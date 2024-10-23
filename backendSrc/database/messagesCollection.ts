import {
    MongoClient,
    Db,
    Collection,
    WithId,
    ObjectId,
    DeleteResult,
} from "mongodb";
import { MessageInterface } from "../models/MessageInterface.js";

const con: string | undefined = process.env.CONNECTION_STRING;

// Connect
async function connect(): Promise<[Collection<MessageInterface>, MongoClient]> {
    if (!con) {
        console.log("No connection string, check your .env file!");
        throw new Error("No connection string");
    }

    const client: MongoClient = await MongoClient.connect(con);
    const db: Db = await client.db("Chappy-the-chat-bot");
    const col: Collection<MessageInterface> =
        db.collection<MessageInterface>("Messages");
    return [col, client];
}

// Get all Messages
async function getAllMessages(): Promise<WithId<MessageInterface>[]> {
    const [col, client]: [Collection<MessageInterface>, MongoClient] =
        await connect();
    const result: WithId<MessageInterface>[] = await col.find({}).toArray();
    await client.close();
    return result;
}

// Delete Message
async function deleteMessage(id: string): Promise<DeleteResult> {
    const [col, client]: [Collection<MessageInterface>, MongoClient] =
        await connect();
    const result: DeleteResult = await col.deleteOne({
        _id: new ObjectId(id),
    });
    await client.close();
    return result;
}

export { getAllMessages, deleteMessage };
