//leaveModel.js
const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  leaveType: {
    type: String,
    enum: ["Sick Leave", "Casual Leave", "Annual Leave", "Emergency Leave", "Maternity Leave", "Paternity Leave", "Personal Leave"],
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  totalDays: {
    type: Number,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending"
  },
  appliedDate: {
    type: Date,
    default: Date.now
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  approvedDate: {
    type: Date
  },
  rejectionReason: {
    type: String
  },
  documentUrl: {
    type: String 
  },
  duration: {
    type: String,
    enum: ["Half Day", "Full Day", "Multiple Days"],
    default: "Full Day"
  },
  employeePosition: {
    type: String
  }
}, {
  timestamps: true
});

// Calculate total days before saving
leaveSchema.pre('save', function(next) {
  if (this.startDate && this.endDate) {
    const timeDiff = this.endDate.getTime() - this.startDate.getTime();
    this.totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
  }
  next();
});

const Leave = mongoose.model("Leave", leaveSchema);
module.exports = Leave;