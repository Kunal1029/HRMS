import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser, getCurrentUser } from "../api/authApi";


export const register = createAsyncThunk("user/register", async (userData, { rejectWithValue }) => {
  try {
    console.log(userData)
    return await registerUser(userData);
  } catch (err) {
    return rejectWithValue(err.response?.data || "Registration failed");
  }
});

export const login = createAsyncThunk("user/login", async (userData, { rejectWithValue }) => {
  try {
    
    return await loginUser(userData);
  } catch (err) {
    return rejectWithValue(err.response?.data || "Login failed");
  }
});

export const fetchCurrentUser = createAsyncThunk("user/fetchCurrentUser", async (token, { rejectWithValue }) => {
  try {
    return await getCurrentUser(token);
  } catch (err) {
    return rejectWithValue(err.response?.data || "Fetching user failed");
  }
});


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Current User
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
