const express = require("express");
const router = express.Router();
const leaveController = require("../controller/leaveController");
const { protect } = require("../controller/userController");

// Basic CRUD routes
router.get("/", protect, leaveController.getLeaves);
router.post("/", protect, leaveController.addLeave);
router.put("/:id", protect, leaveController.updateLeave);
router.delete("/:id", protect, leaveController.deleteLeave);

// Additional routes for leave-specific functionality
router.get("/employee/:employeeId", protect, leaveController.getLeavesByEmployee);
router.get("/approved", protect, leaveController.getApprovedLeaves);
router.get("/date-range", protect, leaveController.getLeavesByDateRange);
router.put("/:id/status", protect, leaveController.updateLeaveStatus);
router.get("/:id/document", protect, leaveController.downloadDocument);

module.exports = router;