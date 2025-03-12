const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "This title field is required"],
        trim: true, // ensures that whitespace at the beginning and end of a string is automatically removed
        // before saving the document to the database.
        maxLength: [100, "Book title can't be more than 100 characters"],
        minLength: [3, "Book title can't be less than 3 characters"]
    },
    author: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100,
        minLength: 3
        },
    year: {
        type: Number,
        required: true,
        min: [1000, "Year must be at least 1000"],
        max: [new Date().getFullYear(), "Year cannot be in the future"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Book", bookSchema);
