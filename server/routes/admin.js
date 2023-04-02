import express from "express";
import { getAdmin, updateStatus } from "../controllers/admin.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", verifyToken, getAdmin);

router.patch("/:id", verifyToken, updateStatus);

export default router;
