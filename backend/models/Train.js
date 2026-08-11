import mongoose from "mongoose";

const trainSchema = new mongoose.Schema({
    trainNumber: String,
    status: String,
    location: String,
});

export default mongoose.model("Train", trainSchema);