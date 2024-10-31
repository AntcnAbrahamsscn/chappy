import { MongoClient, Db, Collection, WithId, ObjectId } from "mongodb";
import { ChannelInterface } from "../models/ChannelInterface.js";

const con: string | undefined = process.env.CONNECTION_STRING;

// Connect
async function connect(): Promise<[Collection<ChannelInterface>, MongoClient]> {
    if (!con) {
        console.log("No connection string, check your .env file!");
        throw new Error("No connection string");
    }

    const client: MongoClient = await MongoClient.connect(con);
    const db: Db = await client.db("Chappy-the-chat-bot");
    const col: Collection<ChannelInterface> =
        db.collection<ChannelInterface>("Channels");
    return [col, client];
}

// Get all Channels
async function getAllChannels(): Promise<WithId<ChannelInterface>[]> {
    const [col, client]: [Collection<ChannelInterface>, MongoClient] =
        await connect();
    const result: WithId<ChannelInterface>[] = await col.find({}).toArray();
    await client.close();
    return result;
}

// Get one channel
async function getChannelName(channelId: string): Promise<WithId<ChannelInterface> | null> {
    const [col, client]: [Collection<ChannelInterface>, MongoClient] = await connect();
    const result: WithId<ChannelInterface> | null = await col.findOne({ _id: new ObjectId(channelId) });
    await client.close();
    return result;
}

export { getAllChannels /* getOpenChannels */, getChannelName };
