import express from "express";
import { router as hikingSpotRouter } from "./routers/hikesRoutes.js";
const app = express();
const port = Number(process.env.PORT || 9872);
// middleware
app.use("/", express.static("./dist/"));
app.use("/", express.json());
// router middleware
app.use("/api/hiking-spot", hikingSpotRouter);
// routes
// Start
app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
