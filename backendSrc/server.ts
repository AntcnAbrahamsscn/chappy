import express, { Express } from "express";
import { router as userRouter } from "./routers/userRouter.js";
import { router as channelRouter } from "./routers/channelsRouter.js";

const app: Express = express();
const port: number = Number(process.env.PORT || 9872);

// middleware
app.use("/", express.static("./dist/"));
app.use("/", express.json());

// router middleware
app.use("/api/user", userRouter);
app.use("/api/channel", channelRouter);

// routes
// Route handlers

// Start
app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
