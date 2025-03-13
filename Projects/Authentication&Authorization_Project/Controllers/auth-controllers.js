require("dotenv").config();
const user = require("../Models/userSchema.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerNewUser = async(req,res)=>{
    try{
        const {username, email, password, role} = req.body;
        if(!username || !email || !password){ // Checks if one of the manadotary fields are missing
            return res.status(401).json({
                "success": false,
                "error message": "Missing value"
            });
        }
        const checkExistingUser = await user.findOne({$or: [{username}, {email}]}); // Checks whether the username or email
        // was already registered in the database or not
        if(checkExistingUser){
            return res.status(404).json({
                "success": false,
                "error message": "User already exists"
            });
        }
        const Salt = await bcrypt.genSalt(10); // Generates a salt for the hash
        const hashedPassword = await bcrypt.hash(password, Salt); // hashes the password using the generated salt
        const createdNewUser = await user.create({ // creates user entry in the database
            username,
            email,
            password: hashedPassword, // Note: the 'hashedPassword' was sent, not the original plaintext password
            role
        });
        if(createdNewUser){
            res.status(201).json({
                "success": true,
                "sessage": "New user has been created sucessfully!",
             "data": createdNewUser
            });
        }else{
            res.status(201).json({
                "success": false,
                "sessage": "Something went wrong in creating a new user!"
            });
        }
    }catch(error){
        console.error(error);
        res.status(500).json({
            "Success": false,
            "Error Message": "Something went wrong!"
        });
    }
}

const loginUser = async(req,res)=>{
    try{
        const {username, password} = req.body;
        const requestedUser = await user.findOne({username}); // checks if user exists in databse or not
        if(!requestedUser){
            return res.status(401).json({
                "Success": false,
                "Error Message": "User does not exist!"
            });
        }
        const passwordCheck = await bcrypt.compare(password, requestedUser.password); // compares the user sent plaintext
        // passowrd with the stored hashed password
        if(!passwordCheck){
            return res.status(401).json({
                "Success": false,
                "Error Message": "Invalid Credentails"
            });
        }
        // here we must generate sessionToken and respond with 200
        const sessionToken = jwt.sign({ // creates jwt by providing Paylaod Data and secret key
            // check 'jwt.io' to view tokens strcute
            userId: requestedUser._id,
            user: username,
            role: requestedUser.role
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: "30m" // Token expiration time
        });
        res.status(200).json({
            "success": true,
            "message": "Logged in successfully!",
            "sessionToken": sessionToken
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            "Success": false,
            "Error Message": "Something went wrong!"
        });
    }
}


module.exports = {registerNewUser, loginUser};
