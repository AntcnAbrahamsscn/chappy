import express, { Express } from "express";
import { router as userRouter } from "./routers/usersRouter.js";
import { router as messagesRouter } from "./routers/directMessagesRouter.js";

const app: Express = express();
const port: number = Number(process.env.PORT || 9872);

// middleware
app.use("/", express.static("./dist/"));
app.use("/", express.json());

// router middleware
app.use("/api/users", userRouter);

// message router
app.use("/api/direct-messages", messagesRouter);

// routes

// Start
app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
