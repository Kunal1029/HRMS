//attendanceModel.js
const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: function() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return today;
    }
  },
  status: {
    type: String,
    enum: ["Present", "Absent", "Late", "Half Day"],
    required: true
  },
  checkInTime: {
    type: Date
  },
  checkOutTime: {
    type: Date
  },
  workingHours: {
    type: Number,
    default: 0
  },
  task: {
    type: String,
    default: "--"
  },
  notes: {
    type: String
  },
}, {
  timestamps: true
});

// Calculate working hours before saving
attendanceSchema.pre('save', function(next) {
  if (this.checkInTime && this.checkOutTime) {
    const timeDiff = this.checkOutTime.getTime() - this.checkInTime.getTime();
    this.workingHours = Math.round((timeDiff / (1000 * 60 * 60)) * 100) / 100; // Hours with 2 decimal places
  }
  next();
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;