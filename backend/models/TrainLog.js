import mongoose from "mongoose";

const trainLogSchema = new mongoose.Schema({
    trainId: String,
    trainNumber: String,
    status: String,
    location: String,
    action: String,
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("TrainLog", trainLogSchema);

console.log("Hey Romeo")
