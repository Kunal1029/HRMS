import API from "./api";

// Get all employees
export const getEmployees = async () => {
  const response = await API.get("/employees");
  return response.data;
};

// Add new employee
export const addEmployee = async (employeeData) => {
  const response = await API.post("/employees", employeeData);
  return response.data;
};

// Update employee
export const updateEmployee = async (id, employeeData) => {
  const response = await API.put(`/employees/${id}`, employeeData);
  return response.data;
};

// Delete employee
export const deleteEmployee = async (id) => {
  const response = await API.delete(`/employees/${id}`);
  return response.data;
};