// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import authRoutes from "./routes/authRoutes.js";
// import trainRoutes from "./routes/trainRoutes.js";

// dotenv.config(); // ✅ load env

// const app = express();

// // ✅ CORS FIX
// app.use(
//     cors({
//         origin: "http://localhost:5173",
//         credentials: true,
//     })
// );

// app.use(express.json());

// // ✅ ROUTES
// app.use("/api/auth", authRoutes);
// app.use("/api/trains", trainRoutes);

// // ✅ MONGODB CONNECTION (use env)
// mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => console.log("✅ MongoDB Connected"))
//     .catch((err) => console.log("❌ Mongo Error:", err));

// // ✅ SERVER START
// app.listen(5001, () => {
//     console.log("🚀 Server running on port 5001");
// });

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import trainRoutes from "./routes/trainRoutes.js";

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
app.use("/api/auth", authRoutes);
app.use("/api/trains", trainRoutes);

// MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.log("❌ Mongo Error:", err));

// server
app.listen(process.env.PORT || 5001, () => {
    console.log("🚀 Server running");
});