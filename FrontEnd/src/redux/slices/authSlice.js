import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser, getCurrentUser, logoutUser } from "../api/authApi";

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
      return rejectWithValue(err.response?.data || "Login failed");
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
export const logout = createAsyncThunk("auth/logout", async () => {
  await logoutUser();
  localStorage.removeItem("user"); 
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userFromStorage,
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
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
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
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.success = false;
        localStorage.removeItem("user");
      });
  },
});

export const { clearAuthState, setUser } = authSlice.actions;
export default authSlice.reducer;
