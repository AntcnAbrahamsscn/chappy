import express, { Router, Response, Request } from "express";
import {
    getAllUsers,
    deleteUser,
    validateLogin,
    getUserData,
} from "../database/usersCollection.js";
import { ObjectId, WithId } from "mongodb";
import { UserInterface } from "../models/UserInterface.js";
import jwt from "jsonwebtoken";

const router: Router = express.Router();

// GET ALL
router.get("/", async (_, res: Response) => {
    const users: WithId<UserInterface>[] = await getAllUsers();
    res.send(users);
    res.status(204);
});

// DELETE ONE
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

// Login route
router.post("/login", async (req: Request, res: Response) => {
    if (!process.env.SECRET) {
        res.sendStatus(500);
        return;
    }

    const userId = await validateLogin(req.body.username, req.body.password);
    if (!userId) {
        res.status(401).send("Invalid credentials");
        return;
    }

    const user = await getUserData(new ObjectId(userId));
    if (!user) {
        res.status(404).send("User not found");
        return;
    }

    const payload = { userId };
    const token: string = jwt.sign(payload, process.env.SECRET);

    res.send({
        jwt: token,
        user: {
            id: user._id.toString(),
            username: user.username,
            gender: user.gender,
        },
    });
});

interface Payload {
    userId: string;
    iat: number;
}
router.get("/protected", async (req: Request, res: Response) => {
    if (!process.env.SECRET) {
        res.sendStatus(500);
        return;
    }

    // TOKEN sent from the header
    const token = req.headers.authorization;
    if (!token) {
        res.status(401);
        return;
    }

    // Verify the token
    let payload: Payload;
    try {
        payload = jwt.verify(token, process.env.SECRET) as Payload;
    } catch (error) {
        res.status(400);
        return;
    }

    // See if it matches a user
    const userId = new ObjectId(payload.userId);

    const user = await getUserData(userId);
    if (!user) {
        res.sendStatus(404);
        return;
    }

    console.log("Data sent to frontend :", {
        id: user._id.toString(),
        username: user.username,
        gender: user.gender,
    });

    // Return the data to the frontend
    res.json({
        user: {
            id: user._id.toString(),
            username: user.username,
            gender: user.gender,
        },
    });
});

export { router };
