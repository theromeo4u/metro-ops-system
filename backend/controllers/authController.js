// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export const register = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         let user = await User.findOne({ email });

//         if (user) {
//             return res.status(400).json({ msg: "User already exists" });
//         }

//         const hashed = await bcrypt.hash(password, 10);

//         user = new User({ email, password: hashed });
//         await user.save();

//         res.json(user);
//     } catch (err) {
//         console.log("REGISTER ERROR:", err);
//         res.status(500).json({ msg: "Server Error" });
//     }
// };

// export const login = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(400).json({ msg: "Invalid credentials" });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);

//         if (!isMatch) {
//             return res.status(400).json({ msg: "Invalid credentials" });
//         }

//         const token = jwt.sign(
//             { id: user._id },
//             "secret123",
//             { expiresIn: "1d" }
//         );

//         res.json({ token });
//     } catch (err) {
//         console.log("LOGIN ERROR:", err);
//         res.status(500).json({ msg: "Server Error" });
//     }
// };

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User exists" });

        const hashed = await bcrypt.hash(password, 10);

        // 👇 make this email admin
        const role = email === "admin@gmail.com" ? "admin" : "user";

        user = new User({ email, password: hashed, role });
        await user.save();

        res.json(user);
    } catch (err) {
        res.status(500).send("Server Error");
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({ token, role: user.role });
    } catch (err) {
        res.status(500).send("Server Error");
    }
};