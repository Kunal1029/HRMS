const express = require("express");
const router = express.Router();
const {isAuthenticated, checkTokenStatus, registerUser,loginUser,editHr ,protect, getUserInfo, logoutUser } = require("../controller/userController");

router.get("/user", protect, getUserInfo);
router.post("/register", registerUser);
router.post("/login", isAuthenticated, loginUser);
router.post("/logout", logoutUser);

router.get('/check-token', checkTokenStatus);
router.post("/editprofile", isAuthenticated, editHr)

module.exports = router;
