const express = require("express");
const router = express.Router();
const employeeController = require("../controller/employeeController");
const { protect } = require("../controller/userController");

// Route
router.get("/", protect, employeeController.getEmployees);
router.post("/", protect, employeeController.addEmployee);
router.put("/:id", protect, employeeController.updateEmployee);
router.delete("/:id", protect, employeeController.deleteEmployee);

module.exports = router;
