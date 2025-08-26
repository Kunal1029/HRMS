import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, checkTokenStatus, loginUser, getCurrentUser, logoutUser } from "../api/authApi";

const userFromStorage = JSON.parse(localStorage.getItem("user")) || null;

// Register
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await registerUser(userData);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Registration failed");
    }
  }
);

// Login
export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await loginUser(userData);

      localStorage.setItem("user", JSON.stringify(res));

      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// Get Current User
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      return await getCurrentUser();
    } catch (err) {
      return rejectWithValue(err.response?.data || "Fetching user failed");
    }
  }
);

// Logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutUser();
      return true;
    } catch (error) {
      // Even if logout API fails, we still want to clear local state
      console.log("Logout API failed, but clearing local state anyway");
      return true;
    }
  }
);

export const checkToken = createAsyncThunk(
  "auth/checkToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await checkTokenStatus();
      return response;
    } catch (error) {
      return rejectWithValue("Token expired");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userFromStorage,
    loading: false,
    error: null,
    success: false,
    isAuthenticated: !!userFromStorage,
    tokenInfo: null,
  },
  reducers: {
    clearAuthState: (state) => {
      state.error = null;
      state.success = false;
      state.loading = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    // Force logout for token expiry
    forceLogout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.tokenInfo = null;
      state.error = "Session expired";
      localStorage.removeItem("user");
    },
    // Clear error
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
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
        state.user = action.payload;
        state.error = null;
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Fetch current user
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        localStorage.removeItem("user");
      })

      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.success = false;
        state.loading = false;
        state.tokenInfo = null;
        localStorage.removeItem("user");
      })
      .addCase(logout.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        localStorage.removeItem("user");
      })

      .addCase(checkToken.fulfilled, (state, action) => {
        state.tokenInfo = action.payload.data;
      })
      .addCase(checkToken.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.tokenInfo = null;
        localStorage.removeItem("user");
      });
  },
});

export const { clearAuthState, setUser, forceLogout , clearError } = authSlice.actions;
export default authSlice.reducer;
