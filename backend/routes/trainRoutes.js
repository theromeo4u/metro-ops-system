
import express from "express";
import {
    getTrains,
    addTrain,
    updateTrain,
    deleteTrain,
} from "../controllers/trainController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// 👤 All logged users can view
router.get("/", protect, getTrains);

// 👑 Only admin can modify
router.post("/", protect, adminOnly, addTrain);
router.put("/:id", protect, adminOnly, updateTrain);
router.delete("/:id", protect, adminOnly, deleteTrain);

export default router;