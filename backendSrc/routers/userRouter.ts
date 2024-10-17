import express, { Router, Response, Request } from "express";
import { getAllUsers, deleteUser } from "../database/hikesCollection.js";
import { ObjectId, WithId } from "mongodb";
import { UserInterface } from "../models/UserInterface.js";
// import { isValidUser } from "../database/validation.js";

const router: Router = express.Router();

// Get all
router.get("/", async (_, res: Response) => {
    const users: WithId<UserInterface>[] = await getAllUsers();
    res.send(users);
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
        const deletedId = await deleteUser(id);

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
