const express = require("express");
const authMiddleware = require("../Middleware/auth-middleware.js");

// Create express router
const router = express.Router();

// 'authMiddleware' is a handler that gets called before '(req,res)' that does whatever it was written to do then executes
// 'next()' function that will redirect the execution back here to either execute a second handle(if there was a second)
// or to finally execute '(req,res)'
router.get("/welcome", authMiddleware, (req,res)=>{
    const {userId, user, role} = req.userInfo; // The decoded JWT payload data
    // check `auth-controllers.js' -> 'line 71' for paylaod data entering and 'auth-middleware.js' -> 'line 16' for decode
    res.json({
        "message": `Welcome ${req.userInfo.user} to the home page! Your role is ${req.userInfo.role}`,
        "user_data": {
            userId,
            user,
            role
        }
    });
});


module.exports = router;
