import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser, getCurrentUser, logoutUser } from "../api/authApi";

// Register
export const register = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const res = await registerUser(userData);
    return res;
  } catch (err) {
    return rejectWithValue(err.response?.data || "Registration failed");
  }
});

// Login
export const login = createAsyncThunk("auth/login", async (userData, { rejectWithValue }) => {
  try {
    return await loginUser(userData);
  } catch (err) {
    return rejectWithValue(err.response?.data || "Login failed");
  }
});

// Get Current User
export const fetchCurrentUser = createAsyncThunk("auth/fetchCurrentUser", async (_, { rejectWithValue }) => {
  try {
    return await getCurrentUser();
  } catch (err) {
    return rejectWithValue(err.response?.data || "Fetching user failed");
  }
});

// Logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await logoutUser();
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearAuthState: (state) => {
      state.error = null;
      state.success = false;
      state.loading = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.success = false;   // reset success
        state.error = null;      // reset error
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.success = true;  
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.success = false; 
        state.error = action.payload; 
      })

      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.success = false;
      });
  },
});

export const { clearAuthState, setUser } = authSlice.actions;
export default authSlice.reducer;
