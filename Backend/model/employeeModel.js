// models/Employee.js - Recommended Professional Approach

const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    candidateId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Candidate', 
        required: true,
        unique: true 
    },
    
    // STRATEGICALLY DENORMALIZED: Frequently accessed fields
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    
    // EMPLOYEE-SPECIFIC: Fields that can change after hiring
    position: { type: String, required: true }, // Can be promoted
    department: { type: String, required: true }, // Can be transferred
    dateOfJoining: { type: Date, required: true },
    
    // ADDITIONAL EMPLOYEE FIELDS
    employeeId: { 
        type: String, 
        unique: true,
        sparse: true // Allows null values but ensures uniqueness when present
    },
    salary: { type: Number },
    manager: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Employee' 
    },
    profileUrl: { type: String }, // Professional photo, different from resume
    status: { 
        type: String, 
        enum: ["Active", "Inactive", "On Leave", "Terminated"], 
        default: "Active" 
    },
    
    // WORK RELATED
    workLocation: { type: String },
    jobType: { 
        type: String, 
        enum: ["Full-time", "Part-time", "Contract", "Intern"],
        default: "Full-time"
    },
    
}, { timestamps: true });

// MIDDLEWARE: Auto-sync with candidate data on creation
employeeSchema.pre('save', async function(next) {
    if (this.isNew && this.candidateId) {
        try {
            const Candidate = mongoose.model('Candidate');
            const candidate = await Candidate.findById(this.candidateId);
            
            if (candidate) {
                // Auto-populate if not provided
                this.fullName = this.fullName || candidate.name;
                this.email = this.email || candidate.email;
                this.position = this.position || candidate.position;
            }
        } catch (error) {
            return next(error);
        }
    }
    next();
});

// INDEXES for better query performance
employeeSchema.index({ department: 1, status: 1 });
employeeSchema.index({ manager: 1 });
employeeSchema.index({ fullName: 'text', email: 'text' }); // Text search

// VIRTUAL: Get candidate phone when needed (without storing)
employeeSchema.virtual('candidatePhone', {
    ref: 'Candidate',
    localField: 'candidateId',
    foreignField: '_id',
    justOne: true,
    options: { select: 'phone' }
});

// METHODS
employeeSchema.methods.getFullProfile = function() {
    return this.populate('candidateId', 'name phone experience resumeUrl status');
};

employeeSchema.methods.promote = function(newPosition, newDepartment, newSalary) {
    this.position = newPosition;
    if (newDepartment) this.department = newDepartment;
    if (newSalary) this.salary = newSalary;
    return this.save();
};

// STATICS
employeeSchema.statics.findByDepartment = function(department) {
    return this.find({ department, status: 'Active' });
};

employeeSchema.statics.getActiveCount = function() {
    return this.countDocuments({ status: 'Active' });
};

module.exports = mongoose.model("Employee", employeeSchema);
