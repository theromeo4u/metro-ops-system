// import express from "express";
// import TrainLog from "../models/TrainLog.js";

// const router = express.Router();

// router.get("/", async (req, res) => {
//     const logs = await TrainLog.find().sort({ timestamp: -1 });
//     res.json(logs);
// });

// export default router;

import express from "express";
import { getLogs } from "../controllers/logController.js";

const router = express.Router();

router.get("/", getLogs);

export default router;