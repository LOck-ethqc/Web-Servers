const express = require("express");
const app = express();

app.use(express.json()); // This means that every route will expect and parse/handle json requests.
// If not used, req.body would be undefined.
// Using Postman, I sent JSON value without the content-type: application/json and it was not accepted.

// Mock Database of the library
let books = [
    {
        "id":1,
        "name":"FireForce"
    },
    {
        "id":2,
        "name":"Kim Jong Bong"
    }
];

app.get("/", (req,res)=>{
    res.json({
        "message":"Welcome to the Bookstore API!"
    });
});

app.get("/all_books", (req,res)=>{
    res.json(books);
});

app.get("/single_book/:id", (req,res)=>{
    // Converts user input(which is always string even if it's numbers) to intger
    const requested_bookid = parseInt(req.params.id);
    const bookid = books.find(item=>item.id === requested_bookid); // Returns matched objecte from JSON
    if(bookid){
        res.json(bookid);
    }else{
        res.status(404).json({
            "message":"Book was not found ):"
        });
    };
});

app.post("/add_book", (req,res)=>{
    if (!req.body.name){
        res.status(404).json({
            "error message":"No value were sent"
        });
    }
    // Loops through JSON objects and collects the key and value pair in a list: [ 'FireForce', 'Kim Jong Bong' ]
    let booknames_list = books.map(book=>book.name);
    if(booknames_list.includes(req.body.name)){ // Checks if the value in the request body is in the provided list
        res.status(404).json("Book is already added in the library :D");
    }else{
        // .reduce() loops through each object
        // "max" parameter is the accumulator value; "book" parameter is the current element
        // =>book.id > max means if the current element bigger than the accumulator
        // ? book.id : max, 0 means if the condition is true it will update the max value to book.id;
        // if false, it will keep max as it is; and the 0 means the accumulator max starts at value 0.
        const bookid_index = books.reduce((max, book)=>book.id > max ? book.id : max,0);
        const new_bookname = req.body.name;
        const newbook = {
            "id":bookid_index + 1,
            "name":new_bookname
        }
        books.push(newbook); // adds JSON object into the JSON list
        res.status(200).json({
            "data":newbook,
            "message":"Book uploaded successfully!"
        });
    }
});

app.put("/update_book/:id", (req,res)=>{
    const requested_bookid = parseInt(req.params.id);
    const bookid = books.find(item=>item.id === requested_bookid);
    if(bookid){
        bookid.name = req.body.name || bookid.name; // update the book name to the name written in the body
        // if no name was in the body, update the book name to the same name(keep the same name)
        res.status(200).json({
            "data":bookid,
            "message":"Book name was updated successfully!"
        });
    }else{
        res.status(404).json({
            "Error Message":"An error has occured!"
        });
    };
});

app.delete("/delete_book/:id", (req,res)=>{
    const requested_bookid = parseInt(req.params.id);
    const bookindex = books.findIndex(item=>item.id === requested_bookid); // Returns the index of the match
    if (bookindex !== -1){
        // .splice(start_index, deleteCount(0 = no delete), optional:item 1, item2, item n(in case of adding items))
        const deletedbook = books.splice(bookindex,1);
        res.status(200).json({
            "data":deletedbook[0], // with [0] or without, it's almost the same thing. The difference is
            // without [0], there would be an extra {} around the "id":bookid, "name":bookname
            "message":"Book have been deleted successfully!"
        });
    }else{
        res.status(404).json({
            "Error Message":"Book was not found ):"
        });
    };
});

const port=3000;
app.listen(port, ()=>{
    console.log(`Server is listening at ${port}`);
});
