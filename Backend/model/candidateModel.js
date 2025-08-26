// models/Candidate.js - Enhanced Professional Version

const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    position: { type: String, required: true },
    
    status: {
        type: String,
        enum: ["New", "Screening", "Interview Scheduled", "Interviewed", "Selected", "Rejected", "Withdrawn"],
        default: "New"
    },
    
    // CANDIDATE-SPECIFIC FIELDS (not needed in Employee model)
    experience: { type: String, required: true },
    resumeUrl: { type: String }, // Original resume from application
    coverLetterUrl: { type: String },
    
    // APPLICATION DETAILS
    appliedDate: { type: Date, default: Date.now },
    source: { 
        type: String, 
        enum: ["Website", "LinkedIn", "Referral", "Job Board", "Campus", "Other"],
        default: "Website"
    },
    referredBy: { type: String }, // If source is referral
    
    // INTERVIEW PROCESS
    interviewScheduled: { type: Date },
    interviewNotes: [
        {
            round: { type: String }, // "Technical", "HR", "Manager"
            date: { type: Date },
            interviewer: { type: String },
            feedback: { type: String },
            rating: { 
                type: Number, 
                min: 1, 
                max: 10 
            }
        }
    ],
    
    // SKILLS & QUALIFICATIONS
    skills: [{ type: String }],
    education: {
        degree: { type: String },
        university: { type: String },
        graduationYear: { type: Number },
        gpa: { type: Number }
    },
    
    // SALARY EXPECTATIONS
    expectedSalary: {
        min: { type: Number },
        max: { type: Number },
        currency: { type: String, default: "USD" }
    },
    
    // ADDITIONAL INFO
    noticePeriod: { type: String }, // "Immediate", "1 Month", "2 Months"
    willingToRelocate: { type: Boolean, default: false },
    currentLocation: { type: String },
    
    // REJECTION/SELECTION DETAILS
    rejectionReason: { type: String },
    selectedDate: { type: Date },
    
}, { timestamps: true });

// INDEXES for better performance
candidateSchema.index({ status: 1, appliedDate: -1 });
candidateSchema.index({ position: 1, status: 1 });
candidateSchema.index({ name: 'text', email: 'text' }); // Text search
candidateSchema.index({ email: 1 }); // Unique constraint optimization

// VIRTUAL: Check if candidate is selected as employee
candidateSchema.virtual('isEmployee', {
    ref: 'Employee',
    localField: '_id',
    foreignField: 'candidateId',
    justOne: true
});

// METHODS
candidateSchema.methods.scheduleInterview = function(date, round = "Initial") {
    this.interviewScheduled = date;
    this.status = "Interview Scheduled";
    return this.save();
};

candidateSchema.methods.addInterviewFeedback = function(round, interviewer, feedback, rating) {
    this.interviewNotes.push({
        round,
        date: new Date(),
        interviewer,
        feedback,
        rating
    });
    this.status = "Interviewed";
    return this.save();
};

candidateSchema.methods.select = function(selectedDate = new Date()) {
    this.status = "Selected";
    this.selectedDate = selectedDate;
    return this.save();
};

candidateSchema.methods.reject = function(reason) {
    this.status = "Rejected";
    this.rejectionReason = reason;
    return this.save();
};

// STATICS
candidateSchema.statics.findByPosition = function(position) {
    return this.find({ position, status: { $nin: ["Rejected", "Selected"] } });
};

candidateSchema.statics.getRecentApplications = function(days = 7) {
    const dateFilter = new Date();
    dateFilter.setDate(dateFilter.getDate() - days);
    return this.find({ appliedDate: { $gte: dateFilter } }).sort({ appliedDate: -1 });
};

candidateSchema.statics.getPendingInterviews = function() {
    return this.find({ 
        status: "Interview Scheduled",
        interviewScheduled: { $gte: new Date() }
    }).sort({ interviewScheduled: 1 });
};

// PRE-SAVE MIDDLEWARE
candidateSchema.pre('save', function(next) {
    // Auto-set selectedDate when status changes to Selected
    if (this.isModified('status') && this.status === 'Selected' && !this.selectedDate) {
        this.selectedDate = new Date();
    }
    next();
});

               
module.exports = mongoose.model("Candidate", candidateSchema);