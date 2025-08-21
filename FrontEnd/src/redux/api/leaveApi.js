import API from "./api";

// Get all leave applications with optional filters
export const getLeaves = async (filters = {}) => {
  const { status, department, month, year, employeeId } = filters;
  const params = new URLSearchParams();
  
  if (status) params.append('status', status);
  if (department) params.append('department', department);
  if (month) params.append('month', month);
  if (year) params.append('year', year);
  if (employeeId) params.append('employeeId', employeeId);
  
  const response = await API.get(`/leaves?${params.toString()}`);
  return response.data;
};

// Add new leave application
export const addLeave = async (leaveData) => {
  const response = await API.post("/leaves", leaveData);
  return response.data;
};

// Update leave application
export const updateLeave = async (id, leaveData) => {
  const response = await API.put(`/leaves/${id}`, leaveData);
  return response.data;
};

// Delete leave application
export const deleteLeave = async (id) => {
  const response = await API.delete(`/leaves/${id}`);
  return response.data;
};

// Get leave applications by employee
export const getLeavesByEmployee = async (employeeId, filters = {}) => {
  const { status, year } = filters;
  const params = new URLSearchParams();
  
  if (status) params.append('status', status);
  if (year) params.append('year', year);
  
  const response = await API.get(`/leaves/employee/${employeeId}?${params.toString()}`);
  return response.data;
};

// Update leave status (Approve/Reject)
export const updateLeaveStatus = async (id, statusData) => {
  const response = await API.put(`/leaves/${id}/status`, statusData);
  return response.data;
};

// Get approved leaves for calendar view
export const getApprovedLeaves = async (filters = {}) => {
  const { month, year } = filters;
  const params = new URLSearchParams();
  
  if (month) params.append('month', month);
  if (year) params.append('year', year);
  
  const response = await API.get(`/leaves/approved?${params.toString()}`);
  return response.data;
};

// Get leaves by date range
export const getLeavesByDateRange = async (filters = {}) => {
  const { startDate, endDate, status = "Approved" } = filters;
  const params = new URLSearchParams();
  
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);
  if (status) params.append('status', status);
  
  const response = await API.get(`/leaves/date-range?${params.toString()}`);
  return response.data;
};

// Download supporting document
export const downloadDocument = async (id) => {
  const response = await API.get(`/leaves/${id}/document`, {
    responseType: 'blob', // Important for file downloads
  });
  return response.data;
};