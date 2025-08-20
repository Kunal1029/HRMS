import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});


export const registerUser = async (userData) => {
  // console.log(userData)
  const response = await API.post("/user/register", userData);
  return response.data;
};


export const loginUser = async (userData) => {
  // console.log(userData)
  const response = await API.post("/user/login", userData);
  return response.data;
};


export const getCurrentUser = async (token) => {
  const response = await API.get("/user/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
