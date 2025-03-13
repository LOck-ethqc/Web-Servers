const express = require("express");
const authMiddleware = require("../Middleware/auth-middleware");
const adminMiddleware = require("../Middleware/admin-middleware");

// Create express router
const router = express.Router();

// two handlers for 2-layer security check
router.get("/admin-interface", authMiddleware, adminMiddleware, (req,res)=>{
    res.json({
        "message": `Welcome Admin ${req.userInfo.user}`
    });
});


module.exports = router;
