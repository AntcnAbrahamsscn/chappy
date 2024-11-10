import {
    MongoClient,
    Db,
    Collection,
    WithId,
    ObjectId,
    DeleteResult,
    InsertOneResult,
} from "mongodb";
import { MessageInterface } from "../models/MessageInterface.js";

const con: string | undefined = process.env.CONNECTION_STRING;

// Connect
async function connect(): Promise<[Collection<MessageInterface>, MongoClient]> {
    if (!con) {
        console.log("No connection string, check your .env file!");
        throw new Error("No connection string");
    }

    try {
        const client: MongoClient = await MongoClient.connect(con);
        const db: Db = client.db("Chappy-the-chat-bot");
        const col: Collection<MessageInterface> = db.collection("Messages");
        return [col, client];
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw error;
    }
}

// Get all messages
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

async function getConversation(
    user1: string,
    user2: string
): Promise<WithId<MessageInterface>[]> {
    const [col, client] = await connect();
    const result: WithId<MessageInterface>[] = await col
        .find({
            $or: [
                { sender: user1, directTo: user2 },
                { sender: user2, directTo: user1 },
            ],
        })
        .toArray();
    await client.close();
    return result;
}

// Get all channel messages
async function getChannelMessages(
    channelId: string
): Promise<WithId<MessageInterface>[]> {
    const [col, client] = await connect();
    const result: WithId<MessageInterface>[] = await col
        .find({ channel: channelId })
        .toArray();
    await client.close();
    return result;
}

async function addMessage(
    newMessage: MessageInterface
): Promise<ObjectId | null> {
    const [col, client] = await connect();

    const result: InsertOneResult<MessageInterface | null> =
        await col.insertOne(newMessage);
    if (!result.acknowledged) {
        console.log("Could not add the message");
        await client.close();
        return null;
    }
    await client.close();
    return result.insertedId;
}

export {
    getAllMessages,
    deleteMessage,
    getChannelMessages,
    getConversation,
    addMessage,
};
