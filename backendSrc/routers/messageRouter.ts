import express, { Router, Response, Request } from "express";
import { getChannelMessages } from "../database/messagesCollection.js";
import { WithId } from "mongodb";
import { MessageInterface } from "../models/MessageInterface.js";

const router: Router = express.Router();

// GET ALL
router.get("/:id", async (req: Request, res: Response) => {
    const channelId: string = req.params.id;

    try {
        const messages: WithId<MessageInterface>[] = await getChannelMessages(
            channelId
        );

        res.json(messages);
    } catch (error) {
        console.error("Error fetching channel messages:", error);
        res.status(500).json({ error: "Failed to fetch messages." });
    }
});

export { router };
