const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    position: { type: String, required: true },
    status: {
        type: String,
        enum: ["New", "Scheduled", "Ongoing", "Selected", "Rejected"],
        default: "New"
    },
    experience: { type: String, required: true },
    resumeUrl: { type: String }, // store uploaded file link on cloudinary
}, { timestamps: true });

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;

