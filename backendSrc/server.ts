import express, { Express } from "express";
import { router as hikingSpotRouter } from "./routers/hikesRoutes.js";

const app: Express = express();
const port: number = Number(process.env.PORT || 9872);

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
