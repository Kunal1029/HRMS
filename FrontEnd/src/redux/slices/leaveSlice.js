import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as leaveApi from '../api/leaveApi';

// Async thunks
export const fetchLeaves = createAsyncThunk(
  'leaves/fetchLeaves',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const data = await leaveApi.getLeaves(filters);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch leave applications');
    }
  }
);

export const createLeave = createAsyncThunk(
  'leaves/createLeave',
  async (leaveData, { rejectWithValue }) => {
    try {
      const data = await leaveApi.addLeave(leaveData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create leave application');
    }
  }
);

export const editLeave = createAsyncThunk(
  'leaves/editLeave',
  async ({ id, leaveData }, { rejectWithValue }) => {
    try {
      const data = await leaveApi.updateLeave(id, leaveData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update leave application');
    }
  }
);

export const removeLeave = createAsyncThunk(
  'leaves/removeLeave',
  async (id, { rejectWithValue }) => {
    try {
      await leaveApi.deleteLeave(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete leave application');
    }
  }
);

export const fetchLeavesByEmployee = createAsyncThunk(
  'leaves/fetchLeavesByEmployee',
  async ({ employeeId, filters = {} }, { rejectWithValue }) => {
    try {
      const data = await leaveApi.getLeavesByEmployee(employeeId, filters);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch employee leaves');
    }
  }
);

export const changeLeaveStatus = createAsyncThunk(
  'leaves/changeLeaveStatus',
  async ({ id, statusData }, { rejectWithValue }) => {
    try {
      const data = await leaveApi.updateLeaveStatus(id, statusData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update leave status');
    }
  }
);

export const fetchApprovedLeaves = createAsyncThunk(
  'leaves/fetchApprovedLeaves',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const data = await leaveApi.getApprovedLeaves(filters);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch approved leaves');
    }
  }
);

export const fetchLeavesByDateRange = createAsyncThunk(
  'leaves/fetchLeavesByDateRange',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const data = await leaveApi.getLeavesByDateRange(filters);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch leaves by date range');
    }
  }
);

export const downloadLeaveDocument = createAsyncThunk(
  'leaves/downloadDocument',
  async (id, { rejectWithValue }) => {
    try {
      const blob = await leaveApi.downloadDocument(id);
      return { id, blob };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to download document');
    }
  }
);

// Initial state
const initialState = {
  leaves: [],
  employeeLeaves: [],
  approvedLeaves: [],
  calendarLeaves: [],
  selectedLeave: null,
  loading: false,
  error: null,
  success: false,
  filters: {
    status: null,
    department: null,
    month: null,
    year: null,
    employeeId: null,
  },
  statusUpdateLoading: false,
};

// Slice
const leaveSlice = createSlice({
  name: 'leaves',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    setSelectedLeave: (state, action) => {
      state.selectedLeave = action.payload;
    },
    clearSelectedLeave: (state) => {
      state.selectedLeave = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        status: null,
        department: null,
        month: null,
        year: null,
        employeeId: null,
      };
    },
    clearEmployeeLeaves: (state) => {
      state.employeeLeaves = [];
    },
    clearApprovedLeaves: (state) => {
      state.approvedLeaves = [];
    },
    clearCalendarLeaves: (state) => {
      state.calendarLeaves = [];
    },
    reset: (state) => {
      state.leaves = [];
      state.employeeLeaves = [];
      state.approvedLeaves = [];
      state.calendarLeaves = [];
      state.selectedLeave = null;
      state.loading = false;
      state.error = null;
      state.success = false;
      state.statusUpdateLoading = false;
      state.filters = {
        status: null,
        department: null,
        month: null,
        year: null,
        employeeId: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch leaves
      .addCase(fetchLeaves.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaves.fulfilled, (state, action) => {
        state.loading = false;
        state.leaves = action.payload.data || action.payload;
        state.error = null;
      })
      .addCase(fetchLeaves.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create leave
      .addCase(createLeave.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLeave.fulfilled, (state, action) => {
        state.loading = false;
        state.leaves.unshift(action.payload.leave || action.payload.data);
        state.success = true;
        state.error = null;
      })
      .addCase(createLeave.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Edit leave
      .addCase(editLeave.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editLeave.fulfilled, (state, action) => {
        state.loading = false;
        const updatedLeave = action.payload.leave || action.payload.data;
        const index = state.leaves.findIndex(l => l._id === updatedLeave._id);
        if (index !== -1) {
          state.leaves[index] = updatedLeave;
        }
        
        // Also update in employeeLeaves if it exists
        const empIndex = state.employeeLeaves.findIndex(l => l._id === updatedLeave._id);
        if (empIndex !== -1) {
          state.employeeLeaves[empIndex] = updatedLeave;
        }
        
        state.success = true;
        state.error = null;
      })
      .addCase(editLeave.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Remove leave
      .addCase(removeLeave.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeLeave.fulfilled, (state, action) => {
        state.loading = false;
        state.leaves = state.leaves.filter(l => l._id !== action.payload);
        state.employeeLeaves = state.employeeLeaves.filter(l => l._id !== action.payload);
        state.success = true;
        state.error = null;
      })
      .addCase(removeLeave.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch leaves by employee
      .addCase(fetchLeavesByEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeavesByEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employeeLeaves = action.payload.data || action.payload;
        state.error = null;
      })
      .addCase(fetchLeavesByEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Change leave status
      .addCase(changeLeaveStatus.pending, (state) => {
        state.statusUpdateLoading = true;
        state.error = null;
      })
      .addCase(changeLeaveStatus.fulfilled, (state, action) => {
        state.statusUpdateLoading = false;
        const updatedLeave = action.payload.leave || action.payload.data;
        
        // Update in main leaves array
        const index = state.leaves.findIndex(l => l._id === updatedLeave._id);
        if (index !== -1) {
          state.leaves[index] = updatedLeave;
        }
        
        // Update in employeeLeaves if it exists
        const empIndex = state.employeeLeaves.findIndex(l => l._id === updatedLeave._id);
        if (empIndex !== -1) {
          state.employeeLeaves[empIndex] = updatedLeave;
        }
        
        state.success = true;
        state.error = null;
      })
      .addCase(changeLeaveStatus.rejected, (state, action) => {
        state.statusUpdateLoading = false;
        state.error = action.payload;
      })
      
      // Fetch approved leaves
      .addCase(fetchApprovedLeaves.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApprovedLeaves.fulfilled, (state, action) => {
        state.loading = false;
        state.approvedLeaves = action.payload.data || action.payload;
        state.error = null;
      })
      .addCase(fetchApprovedLeaves.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch leaves by date range
      .addCase(fetchLeavesByDateRange.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeavesByDateRange.fulfilled, (state, action) => {
        state.loading = false;
        state.calendarLeaves = action.payload.data || action.payload;
        state.error = null;
      })
      .addCase(fetchLeavesByDateRange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Download document
      .addCase(downloadLeaveDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(downloadLeaveDocument.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(downloadLeaveDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  clearSuccess,
  setSelectedLeave,
  clearSelectedLeave,
  setFilters,
  clearFilters,
  clearEmployeeLeaves,
  clearApprovedLeaves,
  clearCalendarLeaves,
  reset,
} = leaveSlice.actions;

export default leaveSlice.reducer;