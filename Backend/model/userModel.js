const mongoose = require("mongoose");
const { type } = require("os");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  role: {
    type: String,
    enum: ["HR", "Admin", "Employee"],
    default: "HR",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt:{
    type: Date,
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
