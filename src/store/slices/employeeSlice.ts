import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Employee, EmployeeState, EmployeesResponse } from '../../types';
import { employeeService } from '../../services/employeeService';

const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
  searchQuery: '',
  refreshing: false,
};

// Async thunk for fetching employees
export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const response = await employeeService.getEmployees();
      return response.users;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch employees');
    }
  }
);

// Async thunk for refreshing employees
export const refreshEmployees = createAsyncThunk(
  'employees/refreshEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const response = await employeeService.getEmployees();
      return response.users;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to refresh employees');
    }
  }
);

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetEmployees: (state) => {
      state.employees = [];
      state.error = null;
      state.loading = false;
      state.refreshing = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch employees
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
        state.error = null;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Refresh employees
      .addCase(refreshEmployees.pending, (state) => {
        state.refreshing = true;
        state.error = null;
      })
      .addCase(refreshEmployees.fulfilled, (state, action) => {
        state.refreshing = false;
        state.employees = action.payload;
        state.error = null;
      })
      .addCase(refreshEmployees.rejected, (state, action) => {
        state.refreshing = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchQuery, clearError, resetEmployees } = employeeSlice.actions;
export default employeeSlice.reducer;