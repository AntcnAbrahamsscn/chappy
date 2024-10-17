import {
    MongoClient,
    Db,
    Collection,
    WithId,
    ObjectId,
    DeleteResult,
} from "mongodb";
import { UserInterface } from "../models/UserInterface.js";

const con: string | undefined = process.env.CONNECTION_STRING;

// Connect
async function connect(): Promise<[Collection<UserInterface>, MongoClient]> {
    if (!con) {
        console.log("No connection string, check your .env file!");
        throw new Error("No connection string");
    }

    const client: MongoClient = await MongoClient.connect(con);
    const db: Db = await client.db("Chappy-the-chat-bot");
    const col: Collection<UserInterface> =
        db.collection<UserInterface>("Users");
    return [col, client];
}

// Get  all

async function getAllUsers(): Promise<WithId<UserInterface>[]> {
    const [col, client]: [Collection<UserInterface>, MongoClient] =
        await connect();

    const result: WithId<UserInterface>[] = await col.find({}).toArray();
    await client.close();
    return result;
}

// Update

// Delete
async function deleteUser(id: string): Promise<DeleteResult> {
    const [col, client]: [Collection<UserInterface>, MongoClient] =
        await connect();

    const result: DeleteResult = await col.deleteOne({
        _id: new ObjectId(id),
    });
    await client.close();
    return result;
}

export { getAllUsers, deleteUser };
