const mongoose = require("mongoose");

const connectToDB = async()=>{
    try{
        await mongoose.connect("mongodb+srv://<username>:<password>@cluster0.swkir.mongodb.net/");
        console.log("MongoDB is connected successfully!");
    }catch(error){
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectToDB;
