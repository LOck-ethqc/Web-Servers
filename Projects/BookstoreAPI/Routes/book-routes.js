const express = require("express");
const {getAllBooks, getSingleBook, addNewBook, updateBook, deleteBook} = require("../Controllers/book-controllers")

// Create express router
const router = express.Router();

// All routes that are related to books only
router.get("/allbooks", getAllBooks);
router.get("/single_book/:id", getSingleBook);
router.post("/add", addNewBook);
router.put("/update/:id", updateBook);
router.delete("/delete/:id", deleteBook);

module.exports = router;
