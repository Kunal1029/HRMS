//attendanceController.js
const Attendance = require("../model/attendanceModel");
const Employee = require("../model/employeeModel");
const CustomError = require("../utils/customError");
const { asyncHandler } = require("../utils/middleware");

// Get all attendance records
exports.getAttendance = asyncHandler(async (req, res) => {
  const { date, department, status, employeeId } = req.query;
  
  let filter = {};
  let employeeFilter = {};
  
  if (department) {
    employeeFilter.department = department;
  }
  
  if (employeeId) {
    filter.employee = employeeId;
  }

  if (status) {
    filter.status = status;
  }
  
  const attendance = await Attendance.find(filter)
    .populate({
      path: 'employee',
      match: employeeFilter,
      select: 'fullName position department profileUrl'
    })
    .sort({ date: -1 });
  
  const filteredAttendance = attendance.filter(record => record.employee);
  
  res.status(200).json({
    success: true,
    data: filteredAttendance
  });
});

// Add new attendance record
exports.addAttendance = asyncHandler(async (req, res) => {
  const { employeeId, status, checkInTime, checkOutTime, task, notes, date, employmentType } = req.body;
  
  // Verify employee exists
  const employee = await Employee.findById(employeeId);
  if (!employee) {
    throw new CustomError("Employee not found", 404);
  }
  
  const attendanceDate = date ? new Date(date) : new Date();
  attendanceDate.setHours(0, 0, 0, 0);
  
  const existingAttendance = await Attendance.findOne({
    employee: employeeId,
    date: {
      $gte: attendanceDate,
      $lt: new Date(attendanceDate.getTime() + 24 * 60 * 60 * 1000)
    }
  });
  
  if (existingAttendance) {
    throw new CustomError("Attendance already marked for this employee today", 400);
  }
  
  const newAttendance = await Attendance.create({
    employee: employeeId,
    status,
    checkInTime: checkInTime ? new Date(checkInTime) : null,
    checkOutTime: checkOutTime ? new Date(checkOutTime) : null,
    task: task || "--",
    notes,
    date: attendanceDate,
    employmentType: employmentType || "Full Time"
  });
  
  await newAttendance.populate('employee', 'fullName position department profileUrl');
  
  res.status(201).json({
    success: true,
    message: "Attendance marked successfully",
    attendance: newAttendance
  });
});

// Update attendance record
exports.updateAttendance = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const updatedAttendance = await Attendance.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  ).populate('employee', 'fullName position department profileUrl');
  
  if (!updatedAttendance) {
    throw new CustomError("Attendance record not found", 404);
  }
  
  res.status(200).json({
    success: true,
    message: "Attendance updated successfully",
    attendance: updatedAttendance
  });
});

// Delete attendance record
exports.deleteAttendance = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const attendance = await Attendance.findByIdAndDelete(id);
  
  if (!attendance) {
    throw new CustomError("Attendance record not found", 404);
  }
  
  res.status(200).json({
    success: true,
    message: "Attendance record deleted successfully"
  });
});

// Get attendance by employee, can use in search box
exports.getAttendanceByEmployee = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;
  const { startDate, endDate } = req.query;
  
  let filter = { employee: employeeId };
  
  if (startDate && endDate) {
    filter.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }
  
  const attendance = await Attendance.find(filter)
    .populate('employee', 'fullName position department profileUrl')
    .sort({ date: -1 });
  
  res.status(200).json({
    success: true,
    data: attendance
  });
});
