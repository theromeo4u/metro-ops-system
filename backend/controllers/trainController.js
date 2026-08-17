import Train from "../models/Train.js";
import TrainLog from "../models/TrainLog.js";


// ✅ GET ALL TRAINS
export const getTrains = async (req, res) => {
    try {
        const trains = await Train.find().sort({ createdAt: -1 });
        res.json(trains);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

console.log("Hey Romeo")

// ✅ ADD TRAIN
export const addTrain = async (req, res) => {
    try {
        const train = await Train.create(req.body);

        // 📅 Log entry
        await TrainLog.create({
            trainId: train._id,
            trainNumber: train.trainNumber,
            status: train.status,
            location: train.location,
            action: "Added",
        });

        res.json(train);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// ✅ UPDATE TRAIN
export const updateTrain = async (req, res) => {
    try {
        const train = await Train.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        // 📅 Log entry
        await TrainLog.create({
            trainId: train._id,
            trainNumber: train.trainNumber,
            status: train.status,
            location: train.location,
            action: "Updated",
        });

        res.json(train);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// ✅ DELETE TRAIN
export const deleteTrain = async (req, res) => {
    try {
        const train = await Train.findByIdAndDelete(req.params.id);

        // 📅 Log entry
        await TrainLog.create({
            trainId: train._id,
            trainNumber: train.trainNumber,
            status: train.status,
            location: train.location,
            action: "Deleted",
        });

        res.json({ message: "Train deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};