import express, { Router, Response, Request } from "express";
import { getAllMessages, deleteMessage } from "../database/messagesCollection.js";
import { ObjectId, WithId } from "mongodb";
import { MessageInterface } from "../models/MessageInterface.js";
// import { isValidUser } from "../database/validation.js";

const router: Router = express.Router();

// Get all
router.get("/:userId", async (_, res: Response) => {
    const messages: WithId<MessageInterface>[] = await getAllMessages();
    res.send(messages);
    res.status(204);
});

// Delete one
router.delete("/:id", async (req: Request, res: Response) => {
    const id: string = req.params.id;

    // Finns objectId i db?
    if (!ObjectId.isValid(id)) {
        res.sendStatus(400);
        return;
    }
    try {
        const deletedId = await deleteMessage(id);

        // Om deleted id är 0
        if (deletedId.deletedCount < 1) {
            res.sendStatus(404);
            return;
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);

        res.sendStatus(500);
    }
});

export { router };
