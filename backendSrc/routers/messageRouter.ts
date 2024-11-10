import express, { Router, Response, Request } from "express";
import {
    addMessage,
    getChannelMessages,
    getConversation,
} from "../database/messagesCollection.js";
import { /* ObjectId,*/ WithId } from "mongodb";
import { MessageInterface } from "../models/MessageInterface.js";

const router: Router = express.Router();

router.get("/:id", async (req: Request, res: Response) => {
    const channelId: string = req.params.id;

    try {
        const messages: WithId<MessageInterface>[] = await getChannelMessages(
            channelId
        );

        res.json(messages);
    } catch (error) {
        console.error("Error fetching channel messages:", error);
        res.status(500);
    }
});

// GET CONVERSATION
router.get("/direct/:user1/:user2", async (req: Request, res: Response) => {
    const user1 = req.params.user1;
    const user2 = req.params.user2;
    // console.log(user1, user2);

    if (!user1 || !user2) {
        res.status(400);
        return;
    }

    try {
        const messages: WithId<MessageInterface>[] = await getConversation(
            user1,
            user2
        );

        res.json({ messages });
    } catch (error) {
        console.error("Error fetching conversation messages:", error);
        res.status(500);
    }
});

// Post request för nytt meddelande
router.post("/", async (req: Request, res: Response) => {
    const { sender, content, channel, directTo } = req.body;

    const newMessage: MessageInterface = {
        sender,
        content,
        channel,
        directTo,
        sentAt: new Date(),
    };
    try {
        const wasInserted = await addMessage(newMessage);

        if (wasInserted) {
            res.status(201).json({ message: "Message posted successfully" });
        } else {
            res.status(500).json({ error: "Failed to post message" });
        }
    } catch (error) {
        console.error("Error inserting message:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export { router };
