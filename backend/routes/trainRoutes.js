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
import {
    getTrains,
    addTrain,
    updateTrain,
    deleteTrain,
} from "../controllers/trainController.js";

const router = express.Router();

// ✅ Get all trains
router.get("/", getTrains);

// ✅ Add train
router.post("/", addTrain);

// ✅ Update train
router.put("/:id", updateTrain);

// ✅ Delete train
router.delete("/:id", deleteTrain);

export default router;