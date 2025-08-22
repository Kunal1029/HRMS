// formConfigurations.js - Define all your form configurations here

// Employee Edit Form Configuration
export const employeeEditConfig = {
  title: "Edit Employee Details",
  saveButtonText: "Save Changes",
  fields: [
    {
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
      required: true,
      placeholder: 'Enter full name'
    },
    {
      name: 'emailAddress',
      label: 'Email Address',
      type: 'email',
      required: true,
      placeholder: 'Enter email address'
    },
    {
      name: 'phoneNumber',
      label: 'Phone Number',
      type: 'tel',
      required: true,
      placeholder: 'Enter phone number'
    },
    {
      name: 'department',
      label: 'Department',
      type: 'select',
      required: true,
      placeholder: 'Select department',
      options: [
        { value: 'HR', label: 'Human Resources' },
        { value: 'IT', label: 'Information Technology' },
        { value: 'Finance', label: 'Finance' },
        { value: 'Marketing', label: 'Marketing' },
        { value: 'Sales', label: 'Sales' },
        { value: 'Design', label: 'Design' }
      ]
    },
    {
      name: 'position',
      label: 'Position',
      type: 'select',
      required: true,
      placeholder: 'Select position',
      options: [
        { value: 'Intern', label: 'Intern' },
        { value: 'Junior', label: 'Junior' },
        { value: 'Senior', label: 'Senior' },
        { value: 'Lead', label: 'Lead' },
        { value: 'Manager', label: 'Manager' },
        { value: 'Director', label: 'Director' }
      ]
    },
    {
      name: 'dateOfJoining',
      label: 'Date of Joining',
      type: 'date',
      required: true
    },
    {
      name: 'salary',
      label: 'Salary',
      type: 'number',
      placeholder: 'Enter salary',
      min: 0
    },
    {
      name: 'address',
      label: 'Address',
      type: 'textarea',
      placeholder: 'Enter full address',
      rows: 3,
      fullWidth: true
    }
  ]
};

// Add Employee Form Configuration
export const addEmployeeConfig = {
  title: "Add New Employee",
  saveButtonText: "Add Employee",
  fields: [
    {
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
      required: true,
      placeholder: 'Enter full name'
    },
    {
      name: 'emailAddress',
      label: 'Email Address',
      type: 'email',
      required: true,
      placeholder: 'Enter email address'
    },
    {
      name: 'phoneNumber',
      label: 'Phone Number',
      type: 'tel',
      required: true,
      placeholder: 'Enter phone number'
    },
    {
      name: 'department',
      label: 'Department',
      type: 'select',
      required: true,
      placeholder: 'Select department',
      options: [
        { value: 'HR', label: 'Human Resources' },
        { value: 'IT', label: 'Information Technology' },
        { value: 'Finance', label: 'Finance' },
        { value: 'Marketing', label: 'Marketing' },
        { value: 'Sales', label: 'Sales' },
        { value: 'Design', label: 'Design' }
      ]
    },
    {
      name: 'position',
      label: 'Position',
      type: 'select',
      required: true,
      defaultValue: 'Intern',
      options: [
        { value: 'Intern', label: 'Intern' },
        { value: 'Junior', label: 'Junior' },
        { value: 'Senior', label: 'Senior' },
        { value: 'Lead', label: 'Lead' },
        { value: 'Manager', label: 'Manager' }
      ]
    },
    {
      name: 'dateOfJoining',
      label: 'Date of Joining',
      type: 'date',
      required: true,
      defaultValue: new Date().toISOString().split('T')[0] // Today's date
    }
  ]
};

// Profile Edit Form Configuration
export const profileEditConfig = {
  title: "Edit Profile",
  saveButtonText: "Update Profile",
  fields: [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      required: true,
      placeholder: 'Enter first name'
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      required: true,
      placeholder: 'Enter last name'
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      placeholder: 'Enter email'
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'tel',
      placeholder: 'Enter phone number'
    },
    {
      name: 'bio',
      label: 'Bio',
      type: 'textarea',
      placeholder: 'Tell us about yourself',
      rows: 4,
      fullWidth: true
    },
    {
      name: 'notifications',
      label: 'Email Notifications',
      type: 'checkbox',
      fullWidth: true,
      helpText: 'Receive email notifications for important updates'
    }
  ]
};

// Attendance Edit Form Configuration
export const attendanceEditConfig = {
  title: "Edit Attendance",
  saveButtonText: "Update Attendance",
  fields: [
    {
      name: 'employeeName',
      label: 'Employee Name',
      type: 'text',
      required: true,
      placeholder: 'Enter employee name'
    },
    {
      name: 'date',
      label: 'Date',
      type: 'date',
      required: true
    },
    {
      name: 'checkInTime',
      label: 'Check In Time',
      type: 'time',
      required: true
    },
    {
      name: 'checkOutTime',
      label: 'Check Out Time',
      type: 'time',
      required: true
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: [
        { value: 'Present', label: 'Present' },
        { value: 'Late', label: 'Late' },
        { value: 'Absent', label: 'Absent' },
        { value: 'Half Day', label: 'Half Day' },
        { value: 'Work From Home', label: 'Work From Home' }
      ]
    },
    {
      name: 'breakTime',
      label: 'Break Duration (minutes)',
      type: 'number',
      placeholder: 'Enter break duration',
      min: 0,
      max: 480
    },
    {
      name: 'notes',
      label: 'Notes',
      type: 'textarea',
      placeholder: 'Add any additional notes',
      rows: 3,
      fullWidth: true
    }
  ]
};

// Add Candidate Form Configuration
export const addCandidateConfig = {
  title: "Add New Candidate",
  saveButtonText: "Add Candidate",
  fields: [
    {
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
      required: true,
      placeholder: 'Enter candidate name'
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      placeholder: 'Enter email address'
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel',
      required: true,
      placeholder: 'Enter phone number'
    },
    {
      name: 'position',
      label: 'Applied Position',
      type: 'text',
      required: true,
      placeholder: 'Enter position'
    },
    {
      name: 'experience',
      label: 'Years of Experience',
      type: 'number',
      required: true,
      min: 0,
      max: 50,
      placeholder: 'Enter years of experience'
    },
    {
      name: 'currentSalary',
      label: 'Current Salary',
      type: 'number',
      placeholder: 'Enter current salary',
      min: 0
    },
    {
      name: 'expectedSalary',
      label: 'Expected Salary',
      type: 'number',
      placeholder: 'Enter expected salary',
      min: 0
    },
    {
      name: 'interviewDate',
      label: 'Interview Date',
      type: 'datetime-local'
    },
    {
      name: 'status',
      label: 'Application Status',
      type: 'select',
      defaultValue: 'Applied',
      options: [
        { value: 'Applied', label: 'Applied' },
        { value: 'Screening', label: 'Screening' },
        { value: 'Interview Scheduled', label: 'Interview Scheduled' },
        { value: 'Interviewed', label: 'Interviewed' },
        { value: 'Selected', label: 'Selected' },
        { value: 'Rejected', label: 'Rejected' }
      ]
    },
    {
      name: 'skills',
      label: 'Key Skills',
      type: 'textarea',
      placeholder: 'Enter key skills separated by commas',
      rows: 2,
      fullWidth: true
    },
    {
      name: 'notes',
      label: 'Additional Notes',
      type: 'textarea',
      placeholder: 'Any additional information',
      rows: 3,
      fullWidth: true
    }
  ]
};