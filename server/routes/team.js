import express from "express";
import { createTeam, getTeams, updateTask } from "../controllers/team.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, createTeam);

router.get("/status", getTeams);

router.patch("/:id", updateTask);

export default router;
