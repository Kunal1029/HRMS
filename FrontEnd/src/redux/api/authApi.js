import API from "./api"

export const registerUser = async (userData) => {
  console.log(userData)
  const response = await API.post("/user/register", userData);
  return response.data;
};


export const loginUser = async (userData) => {
  // console.log(userData)
  const response = await API.post("/user/login", userData);
  return response.data;
};


export const getCurrentUser = async () => {
  const response = await API.get("/user/user");
  return response.data;
};


export const logoutUser = async () => {
  const response = await API.post("/users/logout");
  return response.data;
};

