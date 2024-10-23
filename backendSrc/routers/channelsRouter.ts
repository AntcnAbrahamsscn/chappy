import express, { Router, Response } from "express";
import { getAllChannels } from "../database/channelCollection.js";
import { WithId } from "mongodb";
import { ChannelInterface } from "../models/ChannelInterface.js";

const router: Router = express.Router();

// GET ALL
router.get("/", async (_, res: Response) => {
    const channels: WithId<ChannelInterface>[] = await getAllChannels();
    res.send(channels);
    res.status(204);
});

export { router };
