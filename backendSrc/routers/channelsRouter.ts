import express, { Router, Response, Request } from "express";
import {
    getAllChannels,
    // getOpenChannels,
} from "../database/channelCollection.js";
import { WithId } from "mongodb";
import { ChannelInterface } from "../models/ChannelInterface.js";
import jwt from "jsonwebtoken";

const router: Router = express.Router();

// GET ALL
router.get("/", async (req: Request, res: Response) => {
    if (!process.env.SECRET) {
        res.sendStatus(500);
        return;
    }

    const token = req.headers.authorization;
    let isAuthenticated: boolean = false;
    // För att ta bort Bearer
    if (token && token.startsWith("Bearer ")) {
        const jwtToken: string = token.split(" ")[1];
        try {
            jwt.verify(jwtToken, process.env.SECRET);
            isAuthenticated = true;
        } catch (error) {
            console.log("Invalid token:", error);
        }
    }

    try {
        const channels: WithId<ChannelInterface>[] = await getAllChannels();

        const result: WithId<ChannelInterface>[] = channels.map((channel) => ({
            ...channel,
            canAccess: isAuthenticated || !channel.isPrivate,
        }));

        res.json({ channels: result });
    } catch (error) {
        console.error("Error fetching channels: ", error);
        res.sendStatus(500);
    }
});

//  TODO: EN get utan JWT som enbart hämtar channels: isPrivate: False!
// router.get("/open", async (_, res: Response) => {
//     try {
//         const openChannels: WithId<ChannelInterface>[] =
//             await getOpenChannels();

//         res.json({
//             channels: openChannels,
//         });
//     } catch (error) {
//         console.error("Error fetching channels: ", error);
//         res.sendStatus(500);
//         return;
//     }
// });

export { router };
