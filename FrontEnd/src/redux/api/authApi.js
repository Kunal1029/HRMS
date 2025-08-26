import API from "./api"

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    
    if (error.response && error.response.status === 401) {
      // Clear localStorage
      localStorage.removeItem('user');
      
      // Log for debugging
      console.log('Token expired - redirecting to login');
      
      
      window.location.href = '/user/login';
    }
    
    return Promise.reject(error);
  }
);

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
  const response = await API.post("/user/logout");
  return response.data;
};

export const checkTokenStatus = async () => {
  const response = await API.get("/user/check-token");
  return response.data;
};
