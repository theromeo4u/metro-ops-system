import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Get all users (ADMIN)
router.get("/", async (req, res) => {
    const users = await User.find().select("-password");
    res.json(users);
});

// Update role
router.put("/:id", async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        { role: req.body.role },
        { new: true }
    );
    res.json(user);
});

// Delete user
router.delete("/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
});

export default router;