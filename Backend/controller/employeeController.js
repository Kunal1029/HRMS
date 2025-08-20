const Employee = require("../model/employeeModel");
const CustomError = require("../utils/customError");
const { asyncHandler } = require("../utils/middleware");


exports.getEmployees = asyncHandler(async (req, res) => {
    const employees = await Employee.find();
    res.status(200).json({ success: true, data: employees });
});

// Add new employee
exports.addEmployee = asyncHandler(async (req, res) => {
    const { fullName, email, phone, position, department, dateOfJoining } = req.body;

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
        throw new CustomError("Employee with this email already exists", 400);
    }

    const profileUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newEmployee = await Employee.create({
        fullName,
        email,
        phone,
        position,
        department,
        dateOfJoining,
        profileUrl,
    });

    res.status(201).json({
        success: true,
        message: "Employee added successfully",
        employee: newEmployee,
    });
});

// Update employee
exports.updateEmployee = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!updatedEmployee) {
        throw new CustomError("Employee not found", 404);
    }

    res.status(200).json({
        success: true,
        message: "Employee updated successfully",
        employee: updatedEmployee,
    });
});

// Delete employee
exports.deleteEmployee = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
        throw new CustomError("Employee not found", 404);
    }

    res.status(200).json({
        success: true,
        message: "Employee deleted successfully",
    });
});
