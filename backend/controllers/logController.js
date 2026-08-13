import TrainLog from "../models/TrainLog.js";

export const getLogs = async (req, res) => {
    try {
        const logs = await TrainLog.find().sort({ createdAt: -1 });
        res.json(logs);
    } catch (err) {
        res.status(500).json({ msg: "Error fetching logs" });
    }
};