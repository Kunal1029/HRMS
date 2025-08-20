const express = require("express");
const router = express.Router();
const { registerUser,loginUser, protect, getUserInfo, logoutUser } = require("../controller/userController");

router.get("/user", protect, getUserInfo);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;
