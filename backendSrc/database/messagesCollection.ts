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

<<<<<<< HEAD
// Get  all

async function getAllMessages(): Promise<WithId<MessageInterface>[]> {
    const [col, client]: [Collection<MessageInterface>, MongoClient] =
        await connect();

=======
// Get all Messages
async function getAllMessages(): Promise<WithId<MessageInterface>[]> {
    const [col, client]: [Collection<MessageInterface>, MongoClient] =
        await connect();
>>>>>>> dev
    const result: WithId<MessageInterface>[] = await col.find({}).toArray();
    await client.close();
    return result;
}

<<<<<<< HEAD
// Update

// Delete
async function deleteMessage(id: string): Promise<DeleteResult> {
    const [col, client]: [Collection<MessageInterface>, MongoClient] =
        await connect();

=======
// Delete Message
async function deleteMessage(id: string): Promise<DeleteResult> {
    const [col, client]: [Collection<MessageInterface>, MongoClient] =
        await connect();
>>>>>>> dev
    const result: DeleteResult = await col.deleteOne({
        _id: new ObjectId(id),
    });
    await client.close();
    return result;
}

<<<<<<< HEAD
export { getAllMessages, deleteMessage };
=======
export { getAllMessages, deleteMessage, getChannelMessages };

// Get all Messages
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
>>>>>>> dev
