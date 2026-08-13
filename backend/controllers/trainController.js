import Train from "../models/Train.js";

// ✅ Get all trains
export const getTrains = async (req, res) => {
    try {
        const trains = await Train.find();
        res.json(trains);
    } catch (err) {
        res.status(500).json({ msg: "Error fetching trains" });
    }
};

// ✅ Add train
export const addTrain = async (req, res) => {
    try {
        const train = await Train.create(req.body);

        const io = req.app.get("io");
        if (io) io.emit("trainAdded", train);

        res.json(train);
    } catch (err) {
        res.status(500).json({ msg: "Error adding train" });
    }
};

// ✅ Update train
export const updateTrain = async (req, res) => {
    try {
        const updated = await Train.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        const io = req.app.get("io");
        if (io) io.emit("trainUpdated", updated);

        res.json(updated);
    } catch (err) {
        res.status(500).json({ msg: "Error updating train" });
    }
};

// ✅ Delete train
export const deleteTrain = async (req, res) => {
    try {
        await Train.findByIdAndDelete(req.params.id);

        const io = req.app.get("io");
        if (io) io.emit("trainDeleted", req.params.id);

        res.json({ msg: "Deleted" });
    } catch (err) {
        res.status(500).json({ msg: "Error deleting train" });
    }
};