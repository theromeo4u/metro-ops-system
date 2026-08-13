// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     email: String,
//     password: String,
//     role: {
//         type: String,
//         enum: ["admin", "user"],
//         default: "user",
//     },
// });

// export default mongoose.model("User", userSchema);


import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
});

export default mongoose.model("User", userSchema);