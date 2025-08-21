import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as candidateApi from '../api/candidateApi';

// Async thunks
export const fetchCandidates = createAsyncThunk(
    'candidates/fetchCandidates',
    async (_, { rejectWithValue }) => {
        try {
            const data = await candidateApi.getCandidates();
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch candidates');
        }
    }
);

export const createCandidate = createAsyncThunk(
    'candidates/createCandidate',
    async (candidateData, { rejectWithValue }) => {
        try {
            const data = await candidateApi.addCandidate(candidateData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create candidate');
        }
    }
);

export const editCandidate = createAsyncThunk(
    'candidates/editCandidate',
    async ({ id, candidateData }, { rejectWithValue }) => {
        try {
            const data = await candidateApi.updateCandidate(id, candidateData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update candidate');
        }
    }
);

export const removeCandidate = createAsyncThunk(
    'candidates/removeCandidate',
    async (id, { rejectWithValue }) => {
        try {
            await candidateApi.deleteCandidate(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete candidate');
        }
    }
);

export const downloadCandidateResume = createAsyncThunk(
    'candidates/downloadResume',
    async (id, { rejectWithValue }) => {
        try {
            const blob = await candidateApi.downloadResume(id);
            return { id, blob };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to download resume');
        }
    }
);

// Initial state
const initialState = {
    candidates: [],
    selectedCandidate: null,
    loading: false,
    error: null,
    success: false,
};

// Slice
const candidateSlice = createSlice({
    name: 'candidates',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSuccess: (state) => {
            state.success = false;
        },
        setSelectedCandidate: (state, action) => {
            state.selectedCandidate = action.payload;
        },
        clearSelectedCandidate: (state) => {
            state.selectedCandidate = null;
        },
        reset: (state) => {
            state.candidates = [];
            state.selectedCandidate = null;
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch candidates
            .addCase(fetchCandidates.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCandidates.fulfilled, (state, action) => {
                state.loading = false;
                state.candidates = action.payload.data || action.payload;
                state.error = null;
            })
            .addCase(fetchCandidates.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Create candidate
            .addCase(createCandidate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCandidate.fulfilled, (state, action) => {
                state.loading = false;
                state.candidates.push(action.payload.candidate || action.payload.data);
                state.success = true;
                state.error = null;
            })
            .addCase(createCandidate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Edit candidate
            .addCase(editCandidate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editCandidate.fulfilled, (state, action) => {
                state.loading = false;
                const updatedCandidate = action.payload.candidate || action.payload.data;
                const index = state.candidates.findIndex(c => c._id === updatedCandidate._id);
                if (index !== -1) {
                    state.candidates[index] = updatedCandidate;
                }
                state.success = true;
                state.error = null;
            })
            .addCase(editCandidate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Remove candidate
            .addCase(removeCandidate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeCandidate.fulfilled, (state, action) => {
                state.loading = false;
                state.candidates = state.candidates.filter(c => c._id !== action.payload);
                state.success = true;
                state.error = null;
            })
            .addCase(removeCandidate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Download resume
            .addCase(downloadCandidateResume.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(downloadCandidateResume.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(downloadCandidateResume.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    clearError,
    clearSuccess,
    setSelectedCandidate,
    clearSelectedCandidate,
    reset,
} = candidateSlice.actions;

export default candidateSlice.reducer;
