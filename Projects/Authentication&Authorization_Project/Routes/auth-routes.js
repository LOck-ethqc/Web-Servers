const express = require("express");
const {registerNewUser, loginUser} = require("../Controllers/auth-controllers.js");

// Create express router
const router = express.Router();

// All routes that are related to Authentication and Authorization
router.post("/register", registerNewUser);
router.post("/login", loginUser);


module.exports = router;
