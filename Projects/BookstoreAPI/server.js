require("dotenv").config()
const express = require("express");
const connectToDB = require("./Database/db");
const bookRoutes = require("./Routes/book-routes.js")


const app = express(); // Defines Express Server
const PORT = process.env.PORT; // Takes the port number value from the .env file
connectToDB(); // Invoke to connect to database

//middleware -> express.json() so that every and each request is only accepted in the JSON format
app.use(express.json());

// API Book Routes
app.use("/api/books/", bookRoutes);


// Starts Express server
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});
