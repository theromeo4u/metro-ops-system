// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
// });

// export default mongoose.model("User", userSchema);


import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
});

export default mongoose.model("User", userSchema);