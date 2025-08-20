//leaveController.js
const Leave = require("../model/leaveModel");
const Employee = require("../model/employeeModel");
const CustomError = require("../utils/customError");
const { asyncHandler } = require("../utils/middleware");
const path = require("path");
const fs = require("fs");

// Get all leave applications
exports.getLeaves = asyncHandler(async (req, res) => {
    const { status, department, month, year, employeeId } = req.query;

    let filter = {};
    let employeeFilter = {};

    // Filter by status 
    if (status) {
        filter.status = status;
    }

    // Filter by employeeId 
    if (employeeId) {
        filter.employee = employeeId;
    }

    const leaves = await Leave.find(filter)
        .populate({
            path: 'employee',
            match: employeeFilter,
            select: 'fullName position department profileUrl'
        })
        .populate('approvedBy', 'fullName position')
        .sort({ createdAt: -1 });

    const filteredLeaves = leaves.filter(record => record.employee);

    res.status(200).json({
        success: true,
        data: filteredLeaves
    });
});

// Add new leave application
exports.addLeave = asyncHandler(async (req, res) => {
    const {
        employeeId,
        leaveType,
        startDate,
        endDate,
        reason,
        duration
    } = req.body;

   
    const employee = await Employee.findById(employeeId);
    if (!employee) {
        throw new CustomError("Employee not found", 404);
    }

    const existingLeave = await Leave.findOne({
        employee: employeeId,
        status: { $in: ["Pending", "Approved"] },
        $or: [
            {
                startDate: { $lte: new Date(endDate) },
                endDate: { $gte: new Date(startDate) }
            }
        ]
    });

    if (existingLeave) {
        throw new CustomError("Employee already has a leave application for overlapping dates", 400);
    }

    const documentUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newLeave = await Leave.create({
        employee: employeeId,
        leaveType,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        reason,
        duration,
        documentUrl,
        employeePosition: employee.position 
    });

    // Populate employee data for response
    await newLeave.populate('employee', 'fullName position department profileUrl');

    res.status(201).json({
        success: true,
        message: "Leave application submitted successfully",
        leave: newLeave
    });
});

// Update leave application
exports.updateLeave = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = { ...req.body };

    const updatedLeave = await Leave.findByIdAndUpdate(
        id,
        updateData,
        {
            new: true,
            runValidators: true
        }
    ).populate('employee', 'fullName position department profileUrl')
        .populate('approvedBy', 'fullName position');

    if (!updatedLeave) {
        throw new CustomError("Leave application not found", 404);
    }

    res.status(200).json({
        success: true,
        message: "Leave application updated successfully",
        leave: updatedLeave
    });
});

// Delete leave application
exports.deleteLeave = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const leave = await Leave.findByIdAndDelete(id);

    if (!leave) {
        throw new CustomError("Leave application not found", 404);
    }

    res.status(200).json({
        success: true,
        message: "Leave application deleted successfully"
    });
});

// Get leave applications by employee
exports.getLeavesByEmployee = asyncHandler(async (req, res) => {
    const { employeeId } = req.params;
    const { status, year } = req.query;

    let filter = { employee: employeeId };

    if (status) {
        filter.status = status;
    }

    if (year) {
        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year, 11, 31);

        filter.startDate = {
            $gte: startDate,
            $lte: endDate
        };
    }

    const leaves = await Leave.find(filter)
        .populate('employee', 'fullName position department profileUrl')
        .populate('approvedBy', 'fullName position')
        .sort({ startDate: -1 });

    res.status(200).json({
        success: true,
        data: leaves
    });
});

// Approve/Reject leave application
exports.updateLeaveStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status, rejectionReason, approvedById } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
        throw new CustomError("Invalid status. Must be 'Approved' or 'Rejected'", 400);
    }

    const updateData = {
        status,
        approvedDate: new Date()
    };

    if (approvedById) {
        updateData.approvedBy = approvedById;
    }

    if (status === "Rejected" && rejectionReason) {
        updateData.rejectionReason = rejectionReason;
    }

    const updatedLeave = await Leave.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
    ).populate('employee', 'fullName position department profileUrl')
        .populate('approvedBy', 'fullName position');

    if (!updatedLeave) {
        throw new CustomError("Leave application not found", 404);
    }

    res.status(200).json({
        success: true,
        message: `Leave application ${status.toLowerCase()} successfully`,
        leave: updatedLeave
    });
});

// Download supporting document
exports.downloadDocument = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const leave = await Leave.findById(id);

    if (!leave || !leave.documentUrl) {
        throw new CustomError("Document not found", 404);
    }

    const filePath = path.join(__dirname, `../${leave.documentUrl}`);

    if (!fs.existsSync(filePath)) {
        throw new CustomError("File not found on server", 404);
    }

    res.download(filePath);
});

// Get approved leaves for calendar view (matches your UI)
exports.getApprovedLeaves = asyncHandler(async (req, res) => {
    const { month, year } = req.query;

    let filter = { status: "Approved" };

    if (month && year) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        filter.$or = [
            {
                startDate: {
                    $gte: startDate,
                    $lte: endDate
                }
            },
            {
                endDate: {
                    $gte: startDate,
                    $lte: endDate
                }
            },
            {
                startDate: { $lte: startDate },
                endDate: { $gte: endDate }
            }
        ];
    }

    const approvedLeaves = await Leave.find(filter)
        .select('employee startDate endDate totalDays reason')
        .populate('employee', 'fullName position profileUrl')
        .sort({ startDate: 1 });

    res.status(200).json({
        success: true,
        data: approvedLeaves
    });
});

// Get leaves by date range (for calendar integration)
exports.getLeavesByDateRange = asyncHandler(async (req, res) => {
    const { startDate, endDate, status = "Approved" } = req.query;

    if (!startDate || !endDate) {
        throw new CustomError("Start date and end date are required", 400);
    }

    const leaves = await Leave.find({
        status,
        $or: [
            {
                startDate: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                }
            },
            {
                endDate: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                }
            },
            {
                startDate: { $lte: new Date(startDate) },
                endDate: { $gte: new Date(endDate) }
            }
        ]
    }).populate('employee', 'fullName position department profileUrl')
        .sort({ startDate: 1 });

    res.status(200).json({
        success: true,
        data: leaves
    });
});