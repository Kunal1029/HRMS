const Candidate = require("../model/candidateModel");
const CustomError = require("../utils/customError");
const { asyncHandler } = require("../utils/middleware");
const path = require("path");
const fs = require("fs");

// Get all candidates
exports.getCandidates = asyncHandler(async (req, res) => {
  const candidates = await Candidate.find();
  res.status(200).json({ success: true, data: candidates });
});

// Add new candidate
exports.addCandidate = asyncHandler(async (req, res) => {
  const { name, email, phone, position, status, experience } = req.body;

  const existingCandidate = await Candidate.findOne({ email });
  if (existingCandidate) {
    throw new CustomError("Candidate with this email already exists", 400);
  }

  const resumeUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const newCandidate = await Candidate.create({
    name,
    email,
    phone,
    position,
    status,
    experience,
    resumeUrl,
  });

  res.status(201).json({
    success: true,
    message: "Candidate added successfully",
    candidate: newCandidate,
  });
});


exports.updateCandidate = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updatedCandidate = await Candidate.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedCandidate) {
    throw new CustomError("Candidate not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Candidate updated successfully",
    candidate: updatedCandidate,
  });
});


exports.deleteCandidate = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const candidate = await Candidate.findByIdAndDelete(id);
  if (!candidate) {
    throw new CustomError("Candidate not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Candidate deleted successfully",
  });
});


exports.downloadResume = asyncHandler(async (req, res) => { //leave for later
  const { id } = req.params;

  const candidate = await Candidate.findById(id);
  if (!candidate || !candidate.resumeUrl) {
    throw new CustomError("Resume not found", 404);
  }

  const filePath = path.join(__dirname, `../${candidate.resumeUrl}`);
  if (!fs.existsSync(filePath)) {
    throw new CustomError("File not found on server", 404);
  }

  res.download(filePath);
});
