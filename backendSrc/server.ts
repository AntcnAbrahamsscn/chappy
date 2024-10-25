import express, { Express } from "express";
<<<<<<< HEAD
import { router as userRouter } from "./routers/usersRouter.js";
import { router as messagesRouter } from "./routers/directMessagesRouter.js";
=======
import { router as userRouter } from "./routers/userRouter.js";
import { router as channelRouter } from "./routers/channelsRouter.js";
import { router as messageRouter } from "./routers/messageRouter.js";
>>>>>>> dev

const app: Express = express();
const port: number = Number(process.env.PORT || 9872);

// middleware
app.use("/", express.static("./dist/"));
app.use("/", express.json());

// router middleware
<<<<<<< HEAD
app.use("/api/users", userRouter);

// message router
app.use("/api/direct-messages", messagesRouter);
=======
app.use("/api/user", userRouter);
app.use("/api/channel", channelRouter);
app.use("/api/message", messageRouter);
>>>>>>> dev

// routes
// Route handlers

// Start
app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
