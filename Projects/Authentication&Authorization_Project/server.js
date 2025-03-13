require("dotenv").config();
const express = require("express");
const connectToDB = require("./Database/connect.js");
const authRoute = require("./Routes/auth-routes.js");
const adminRoute = require("./Routes/admin-routes.js");
const homeRoute = require("./Routes/home-routes.js");

const app = express();
const PORT = process.env.PORT;
connectToDB(); // Connect to Database

// Middleware
app.use(express.json()); // Accepts only JSON formatted requests

//API Routes
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/home", homeRoute);

// Run Server
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
});
