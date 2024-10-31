import express, { Router, Response, Request } from "express";
import { getChannelMessages, getConversation } from "../database/messagesCollection.js";
import { WithId } from "mongodb";
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
        res.status(500)
    }
});

// GET CONVERSATION
router.get("/direct/:user1/:user2", async (req: Request, res: Response) => {
    const user1 = req.params.user1;  
    const user2 = req.params.user2;
    // console.log(user1, user2);

    if (!user1 || !user2) {
        res.status(400).send("Both user1 and user2 must be provided");
        return;
    }

    try {
        const messages: WithId<MessageInterface>[] = await getConversation(user1, user2);

        

        res.json({ messages }); 
    } catch (error) {
        console.error("Error fetching conversation messages:", error);
        res.status(500).send("Internal server error");
    }
});

export { router };
