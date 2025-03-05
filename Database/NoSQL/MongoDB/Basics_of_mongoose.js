const mongoose = require("mongoose");

// Async function to establish database connection
async function connectDB(){
    try{
        await mongoose.connect(
            "mongodb+srv://<username>:<password>@<cluster>/"
        );
        console.log("Database Connected Successfully");
    }catch(e){
        console.error("Connection Error:", e);
    }
}

// Creating a Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    country: String,
    isActive: Boolean,
    tags: [String],
    createdAt: {type: Date, default: Date.now}
})

// Creating User Model
const User = mongoose.model("User", UserSchema);

// Create new user document
async function newDocumentQuery(){
    try{
        const newUser = await User.create({
            name: "Malik5",
            email: "blabla@gmail.com",
            age: 23,
            country: "IQ",
            isActive: true
        });
        console.log("New user has been successfully created!", newUser);
    }catch(e){
        console.error("Error:", e);
    }finally{
        await mongoose.connection.close();
    }
}

// Returns all users
async function getAllUsersQuery(){
    try{
        const allUsers = await User.find({}); // if '{}' was empty, it means it will return all users
        console.log(allUsers);
    }catch(e){
        console.log("Error: ", e);
    }finally{
        await mongoose.connection.close();
    }
}

// Returns specified users based on matched object value
async function getSpecificUserQuery(){
    try{
        const inActiveUser = await User.find({isActive: false}); // finds users if they match the given object value
        console.log("All users that are not active:", inActiveUser);
    }catch(e){
        console.log("Error:", e);
    }finally{
        await mongoose.connection.close();
    }

}

// Returns the very first user that match the specified object value
async function getOneUser(){
    try{
        const iraqi_user = await User.findOne({country: "IQ"}); // Finds the very first match of country: IQ in the cluster
        console.log(iraqi_user);
    }catch(e){
        console.log("Error: ", e);
    }finally{
        await mongoose.connection.close();
    }
}

// Using '.select()' to select certain fields to use/display
// SQL Query exp: SELECT name,email FROM user_table;
async function selectFields(){
    try{
        const selectedItems = await User.find({name: "Malik"}).select("name email -_id"); // finding certain user(s),
        // and applying select to select certain fields (Extra: '.select()' Works with '.findOne()' as well :>)
        console.log(selectedItems);
    }catch(e){
        console.log("Error: ", e);
    }finally{
        await mongoose.connection.close();
    }
}


async function limitedUsers(){
    try{
        const limitOutput = await User.find().limit(2).skip(2); // Limits the returned results to 2 objects,
        // and skip the first two objects
        console.log(limitOutput);
    }catch(e){
        console.log("Error: ", e);
    }finally{
        await mongoose.connection.close();
    }
}

// '.sort(1)' = Sorted by Ascending order
// '.sort(-1)' = Sorted by Descending order
async function sortUsers(){
    try{
        const sortedResults = await User.find().sort({age: -1}); // '-1' = sort the age numbers in a descending order
        console.log(sortedResults);
    }catch(e){
        console.log("Error: ", e);
    }finally{
        await mongoose.connection.close();
    }
}


async function userDocumentsCount(){
    try{
        const documentCount = await User.countDocuments({isActive: false}); // Counts all objects that match the condition
        console.log(documentCount);
    }catch(e){
        console.log("Error:", e);
    }finally{
        await mongoose.connection.close();
    }
}


async function deleteUser(){
    try{
        const deletedUser = await User.findByIdAndDelete("67c7ccbe73edbb32a1fd0964"); // Deletes an object by its ObjId
        console.log(deletedUser, "Was deleted successfully!");
    }catch(e){
        console.log("Error:", e);
    }finally{
        await mongoose.connection.close();
    }
}


async function updateUser(){
    try{
        const updatedUser = await User.findByIdAndUpdate("67c7c9d693243baf5b40001d", {
            $set: {name: "lockethqc", email: "lockethqc@yumyum.com"}, $push: {tags: "Hack :P"}
            // push is used in case of a list '[]'
            // set is used to overwrite the previous information, not recommended in case of a list
        },{new: true});
        console.log(updatedUser);
    }catch(e){
        console.log("Error:", e);
    }finally{
        await mongoose.connection.close();
    }
}


// Execute functions in correct order
async function main() {
    await connectDB();  // Ensure connection before running queries
    // Run queries after successful connection
    //await newDocumentQuery();
    //await getAllUsersQuery();
    //await getSpecificUserQuery();
    //await getOneUser();
    //await selectFields();
    //await limitedUsers();
    //await sortUsers();
    //await userDocumentsCount();
    //await deleteUser();
    await updateUser();
}

main();
