import express from "express";
import { router as userRouter } from "./routers/usersRouter.js";
import { router as messagesRouter } from "./routers/directMessagesRouter.js";
const app = express();
const port = Number(process.env.PORT || 9872);
// middleware
app.use("/", express.static("./dist/"));
app.use("/", express.json());
// router middleware
app.use("/api/users", userRouter);
// message router
app.use("/api/direct-messages", messagesRouter);
app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
