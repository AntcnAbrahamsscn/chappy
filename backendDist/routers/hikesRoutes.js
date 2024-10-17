import express from "express";
import { getAllHikes, updateHike, deleteHike, } from "../database/hikesCollection.js";
import { ObjectId } from "mongodb";
import { isValidHike } from "../database/validation.js";
const router = express.Router();
// PUT
router.put("/:id", async (req, res) => {
    const id = req.params.id;
    // Validate ID
    if (!ObjectId.isValid(id)) {
        res.status(400).send({ error: "Invalid ID" });
        return;
    }
    // Validate request body
    const hike = req.body;
    if (!isValidHike(hike)) {
        res.status(400).send({ error: "Invalid hike data" });
        return;
    }
    try {
        // Update hike in the database
        const result = await updateHike(id, hike);
        // Check if the document exists and was updated
        if (result.matchedCount < 1) {
            res.status(404).send({ error: "Hike not found" });
            return;
        }
        if (result.modifiedCount > 0) {
            res.sendStatus(204); // No content
            return;
        }
        res.status(500).send({ error: "Hike not updated" });
    }
    catch (error) {
        console.error("Error updating hike:", error);
        res.status(500).send({ error: "Internal server error" });
    }
});
// Get all
router.get("/", async (_, res) => {
    const hikes = await getAllHikes();
    res.send(hikes);
    res.status(204);
});
// Delete one
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    // Finns objectId i db?
    if (!ObjectId.isValid(id)) {
        res.sendStatus(400);
        return;
    }
    try {
        const deletedId = await deleteHike(id);
        // Om deleted id är 0
        if (deletedId.deletedCount < 1) {
            res.sendStatus(404);
            return;
        }
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
        res.sendStatus(500);
    }
});
export { router };
