import express from "express";
import { router as userRouter } from "./routers/userRouter.js";
import { router as channelRouter } from "./routers/channelsRouter.js";
import { router as messageRouter } from "./routers/messageRouter.js";
const app = express();
const port = Number(process.env.PORT || 9872);
// middleware
app.use("/", express.static("./dist/"));
app.use("/", express.json());
// router middleware
app.use("/api/user", userRouter);
app.use("/api/channel", channelRouter);
app.use("/api/message", messageRouter);
// routes
// Start
app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
