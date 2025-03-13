require("dotenv").config();
const jwt = require("jsonwebtoken");

const authMiddleware = async(req,res, next)=>{
const authHeader = req.headers["authorization"]; // checks if a token is stored in the authorization header or not
    if(!authHeader){
        return res.status(403).json({
            "success":false,
            "error message": "Not validated to access!"
        });
    }
    const Token = authHeader && authHeader.split(" ")[1]; // Grabs the sessionToken by itself without the 'Bearer'
    // at the beginning
    try{
        const verifyToken = jwt.verify(Token, process.env.JWT_SECRET_KEY); // checks if token is valid or not
        req.userInfo = verifyToken;
        next();
    }catch(error){
        console.error(error);
        res.status(500).json({
            "success": false,
            "error message": "Something went wrong!"
        });
    }
}

module.exports = authMiddleware;
