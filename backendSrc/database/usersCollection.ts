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

// Get all users
async function getAllUsers(): Promise<WithId<UserInterface>[]> {
    const [col, client]: [Collection<UserInterface>, MongoClient] =
        await connect();
    const result: WithId<UserInterface>[] = await col.find({}).toArray();
    await client.close();
    return result;
}

// Delete user
async function deleteUser(id: string): Promise<DeleteResult> {
    const [col, client]: [Collection<UserInterface>, MongoClient] =
        await connect();
    const result: DeleteResult = await col.deleteOne({
        _id: new ObjectId(id),
    });
    await client.close();
    return result;
}

// Validate user to see if it matches user in db
async function validateLogin(
    username: string,
    password: string
): Promise<string | null> {
    const [col, client] = await connect();

    try {
        const user = await col.findOne<UserInterface>({ username: username });
        console.log("Found user:", user);

        if (user && user.password === password) {
            return user._id.toString();
        }

        return null;
    } finally {
        await client.close();
    }
}

// Getting the user data
async function getUserData(userId: ObjectId): Promise<UserInterface | null> {
    const [col, client]: [Collection<UserInterface>, MongoClient] =
        await connect();

    const user = await col.findOne<WithId<UserInterface>>({
        _id: userId,
    });

    await client.close();

    return user || null;
}

export { getAllUsers, deleteUser, validateLogin, getUserData };
