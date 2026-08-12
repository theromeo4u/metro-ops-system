// import express from "express";
// import Train from "../models/Train.js";

// const router = express.Router();

// // ✅ GET all trains
// router.get("/", async (req, res) => {
//     const trains = await Train.find();
//     res.json(trains);
// });

// // ✅ ADD train
// router.post("/", async (req, res) => {
//     const train = new Train(req.body);
//     await train.save();
//     res.json(train);
// });

// // ✅ DELETE train
// router.delete("/:id", async (req, res) => {
//     await Train.findByIdAndDelete(req.params.id);
//     res.json({ msg: "Deleted" });
// });

// export default router;

import express from "express";
import Train from "../models/Train.js";
import { authMiddleware, adminOnly } from "../middleware/auth.js";

const router = express.Router();

// ✅ GET all trains (both roles)
router.get("/", authMiddleware, async (req, res) => {
    const trains = await Train.find();
    res.json(trains);
});

// ✅ ADD train (admin only)
router.post("/", authMiddleware, adminOnly, async (req, res) => {
    const train = new Train(req.body);
    await train.save();
    res.json(train);
});

// ✅ UPDATE train (admin only)
router.put("/:id", authMiddleware, adminOnly, async (req, res) => {
    const updated = await Train.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(updated);
});

// ✅ DELETE train (admin only)
router.delete("/:id", authMiddleware, adminOnly, async (req, res) => {
    await Train.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
});

export default router;