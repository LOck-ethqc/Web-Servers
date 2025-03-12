const Book = require("../Models/book");

const getAllBooks = async(req,res)=>{
    try{
        const allBooks = await Book.find();
        if(allBooks?.length > 0){
            res.status(202).json(allBooks)
        }else{
            res.status(204).json({
                "Success": false,
                "Message": "Your library is empty! \n Please add books to view them..."
            });
        }
    }catch(error){
        console.error(error);
        res.status(500).json({
            "Success": false,
            "Error Message": "Database can't be reached );"
        });
    }
};

const getSingleBook = async(req,res)=>{
    try{
        const requested_bookid = req.params.id;
        const singleBook = await Book.findById(requested_bookid);
        if(singleBook){
            res.status(202).json(singleBook);
        }else{
            res.status(404).json({
                "Success": false,
                "Error Message": "Book ID was not found!"
            });
        }
    }catch(error){
        console.error(error);
        res.status(500).json({
            "Success": false,
            "Error Message": "Database can't be reached );"
        });
    }
};

const addNewBook = async(req,res)=>{
    try{
        const newBook = req.body;
        const newlyCreatedBook = await Book.create(newBook);
        if (newlyCreatedBook){
            res.status(201).json({
                "Success": true,
                "Message": "New book has been added successfully!",
                "Data": newlyCreatedBook
            });
        }
    }catch(error){
        console.error(error);
        res.status(404).json({
            "Error Message": "Book addition failed!"
        });
    }
};

const updateBook = async(req,res)=>{
    try{
        const requested_bookid = req.params.id;
        const requested_body = req.body;
        const schemaKeys = Object.keys(Book.schema.paths); // Gets schema key arguemnts
        // Finds if key arguments match
        const invalidKeys = Object.keys(requested_body).filter(key => !schemaKeys.includes(key));
        // Check for invalid keys after the matching process -> 'line 70'
        if(invalidKeys.length > 0) {
            return res.status(400).json({ // 'return' here is used because otherwise, the web server will crash. Why?
                // Because the execution will not terminate inside this if statement, it will continite execution until
                // the end of the function. That's why we use return when we don't want the execution to progress further
                "Success": false,
                "Error Message": "Invalid keys provided!"
            });
        }
        const updatedBook = await Book.findByIdAndUpdate(requested_bookid, requested_body, {new: true, runValidators: true});
        if(updatedBook){
            res.status(200).json({
                "Success": true,
                "Message": "Book has been updated successfully",
                "Data": updatedBook
            });
        }
    }catch(error){
        console.error(error);
        res.status(500).json({
            "Success": false,
            "Error Message": "Something went wrong!"
        });
    }
};

const deleteBook = async(req,res)=>{
    try{
        const requested_bookid = req.params.id;
        const deletedBook = await Book.findByIdAndDelete(requested_bookid);
        if(deletedBook){
            res.status(202).json({
                "Success": true,
                "Message": "Book was deleted successfully!",
                "Data": deletedBook
            });
        }
    }catch(error){
        console.error(error);
        res.status(404).json({
            "Success": false,
            "Error Message": "Something went wrong!"
        });
    }
};

module.exports = {getAllBooks, getSingleBook, addNewBook, updateBook, deleteBook};
