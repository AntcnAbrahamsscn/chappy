import { MongoClient, ObjectId, } from "mongodb";
const con = process.env.CONNECTION_STRING;
// Connect
async function connect() {
    if (!con) {
        console.log("No connection string, check your .env file!");
        throw new Error("No connection string");
    }
    const client = await MongoClient.connect(con);
    const db = await client.db("Chappy-the-chat-bot");
    const col = db.collection("Users");
    return [col, client];
}
// Get  all
async function getAllHikes() {
    const [col, client] = await connect();
    const result = await col.find({}).toArray();
    await client.close();
    return result;
}
// Update
// async function updateHike(
//     id: string,
//     newHike: HikingSpot
// ): Promise<UpdateResult<HikingSpot>> {
//     const [col, client]: [Collection<HikingSpot>, MongoClient] =
//         await connect();
//     const result: UpdateResult<HikingSpot> = await col.updateOne(
//         { _id: new ObjectId(id) },
//         { $set: newHike }
//     );
//     await client.close();
//     return result;
// }
async function updateHike(id, newHike) {
    const [col, client] = await connect();
    const result = await col.updateOne({ _id: new ObjectId(id) }, { $set: { name: newHike.name } });
    await client.close();
    return result;
}
// Delete
async function deleteHike(id) {
    const [col, client] = await connect();
    const result = await col.deleteOne({
        _id: new ObjectId(id),
    });
    await client.close();
    return result;
}
export { getAllHikes, updateHike, deleteHike };
