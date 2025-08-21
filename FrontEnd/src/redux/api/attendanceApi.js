import API from "./api";

// Get all attendance records with optional filters
export const getAttendance = async (filters = {}) => {
  const { date, department, status, employeeId } = filters;
  const params = new URLSearchParams();
  
  if (date) params.append('date', date);
  if (department) params.append('department', department);
  if (status) params.append('status', status);
  if (employeeId) params.append('employeeId', employeeId);
  
  const response = await API.get(`/attendance?${params.toString()}`);
  return response.data;
};

// Add new attendance record
export const addAttendance = async (attendanceData) => {
  const response = await API.post("/attendance", attendanceData);
  return response.data;
};

// Update attendance record
export const updateAttendance = async (id, attendanceData) => {
  const response = await API.put(`/attendance/${id}`, attendanceData);
  return response.data;
};

// Delete attendance record
export const deleteAttendance = async (id) => {
  const response = await API.delete(`/attendance/${id}`);
  return response.data;
};

// Get attendance by employee with optional date range
export const getAttendanceByEmployee = async (employeeId, filters = {}) => {
  const { startDate, endDate } = filters;
  const params = new URLSearchParams();
  
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);
  
  const response = await API.get(`/attendance/employee/${employeeId}?${params.toString()}`);
  return response.data;
};