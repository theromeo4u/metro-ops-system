
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import logRoutes from "./routes/logRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import trainRoutes from "./routes/trainRoutes.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/trains", trainRoutes);
app.use("/api/logs", logRoutes);

// MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.log("❌ Mongo Error:", err));

// server
app.listen(process.env.PORT || 5001, () => {
    console.log("🚀 Server running");
});