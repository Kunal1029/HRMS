const express = require("express");
const router = express.Router();
const attendanceController = require("../controller/attendanceController");
const { protect } = require("../controller/userController");

// Routes
router.get("/", protect, attendanceController.getAttendance);
router.post("/", protect, attendanceController.addAttendance);
router.put("/:id", protect, attendanceController.updateAttendance);
router.delete("/:id", protect, attendanceController.deleteAttendance);


module.exports = router;