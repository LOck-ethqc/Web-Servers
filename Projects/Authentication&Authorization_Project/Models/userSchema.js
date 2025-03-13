const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true, // Cannot be repeated
        trim: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"], // Accepts either 'user' or 'admin' values only
        default: "user"
    }
});

module.exports = mongoose.model("User", userSchema);
