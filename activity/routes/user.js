const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { verifyToken } = require("../auth");

// Register
router.post("/register", userController.registerUser);

// Login
router.post("/login", userController.loginUser);

// Get user details (protected route)
router.get("/details", verifyToken, userController.getUserDetails);

module.exports = router;
