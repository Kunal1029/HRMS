import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as attendanceApi from '../api/attendanceApi';

// Async thunks
export const fetchAttendance = createAsyncThunk(
  'attendance/fetchAttendance',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const data = await attendanceApi.getAttendance(filters);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch attendance records');
    }
  }
);

export const createAttendance = createAsyncThunk(
  'attendance/createAttendance',
  async (attendanceData, { rejectWithValue }) => {
    try {
      const data = await attendanceApi.addAttendance(attendanceData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create attendance record');
    }
  }
);

export const editAttendance = createAsyncThunk(
  'attendance/editAttendance',
  async ({ id, attendanceData }, { rejectWithValue }) => {
    try {
      const data = await attendanceApi.updateAttendance(id, attendanceData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update attendance record');
    }
  }
);

export const removeAttendance = createAsyncThunk(
  'attendance/removeAttendance',
  async (id, { rejectWithValue }) => {
    try {
      await attendanceApi.deleteAttendance(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete attendance record');
    }
  }
);

export const fetchAttendanceByEmployee = createAsyncThunk(
  'attendance/fetchAttendanceByEmployee',
  async ({ employeeId, filters = {} }, { rejectWithValue }) => {
    try {
      const data = await attendanceApi.getAttendanceByEmployee(employeeId, filters);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch employee attendance');
    }
  }
);

// Initial state
const initialState = {
  attendanceRecords: [],
  employeeAttendance: [],
  selectedAttendance: null,
  loading: false,
  error: null,
  success: false,
  filters: {
    date: null,
    department: null,
    status: null,
    employeeId: null,
  },
};

// Slice
const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    setSelectedAttendance: (state, action) => {
      state.selectedAttendance = action.payload;
    },
    clearSelectedAttendance: (state) => {
      state.selectedAttendance = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        date: null,
        department: null,
        status: null,
        employeeId: null,
      };
    },
    clearEmployeeAttendance: (state) => {
      state.employeeAttendance = [];
    },
    reset: (state) => {
      state.attendanceRecords = [];
      state.employeeAttendance = [];
      state.selectedAttendance = null;
      state.loading = false;
      state.error = null;
      state.success = false;
      state.filters = {
        date: null,
        department: null,
        status: null,
        employeeId: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch attendance records
      .addCase(fetchAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceRecords = action.payload.data || action.payload;
        state.error = null;
      })
      .addCase(fetchAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create attendance record
      .addCase(createAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceRecords.unshift(action.payload.attendance || action.payload.data);
        state.success = true;
        state.error = null;
      })
      .addCase(createAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Edit attendance record
      .addCase(editAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editAttendance.fulfilled, (state, action) => {
        state.loading = false;
        const updatedAttendance = action.payload.attendance || action.payload.data;
        const index = state.attendanceRecords.findIndex(a => a._id === updatedAttendance._id);
        if (index !== -1) {
          state.attendanceRecords[index] = updatedAttendance;
        }
        
        // Also update in employeeAttendance if it exists
        const empIndex = state.employeeAttendance.findIndex(a => a._id === updatedAttendance._id);
        if (empIndex !== -1) {
          state.employeeAttendance[empIndex] = updatedAttendance;
        }
        
        state.success = true;
        state.error = null;
      })
      .addCase(editAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Remove attendance record
      .addCase(removeAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceRecords = state.attendanceRecords.filter(a => a._id !== action.payload);
        state.employeeAttendance = state.employeeAttendance.filter(a => a._id !== action.payload);
        state.success = true;
        state.error = null;
      })
      .addCase(removeAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch attendance by employee
      .addCase(fetchAttendanceByEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendanceByEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employeeAttendance = action.payload.data || action.payload;
        state.error = null;
      })
      .addCase(fetchAttendanceByEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  clearSuccess,
  setSelectedAttendance,
  clearSelectedAttendance,
  setFilters,
  clearFilters,
  clearEmployeeAttendance,
  reset,
} = attendanceSlice.actions;

export default attendanceSlice.reducer;