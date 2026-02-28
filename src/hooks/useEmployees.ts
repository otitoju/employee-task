import { useMemo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { 
  fetchEmployees, 
  refreshEmployees, 
  setSearchQuery, 
  clearError 
} from '../store/slices/employeeSlice';
import { employeeService } from '../services/employeeService';
import { Employee } from '../types';

export const useEmployees = () => {
  const dispatch = useAppDispatch();
  const employeeState = useAppSelector((state) => state.employees);

  // Memoized filtered employees
  const filteredEmployees = useMemo(() => {
    return employeeService.filterEmployees(
      employeeState.employees, 
      employeeState.searchQuery
    );
  }, [employeeState.employees, employeeState.searchQuery]);

  // Memoized employee count
  const employeeCount = useMemo(() => ({
    total: employeeState.employees.length,
    filtered: filteredEmployees.length,
  }), [employeeState.employees.length, filteredEmployees.length]);

  // Memoized loading states
  const loadingStates = useMemo(() => ({
    isLoading: employeeState.loading,
    isRefreshing: employeeState.refreshing,
    hasError: !!employeeState.error,
    isEmpty: employeeState.employees.length === 0,
  }), [
    employeeState.loading,
    employeeState.refreshing,
    employeeState.error,
    employeeState.employees.length,
  ]);

  // Optimized action creators
  const actions = useMemo(() => ({
    fetchEmployees: () => dispatch(fetchEmployees()),
    refreshEmployees: () => dispatch(refreshEmployees()),
    setSearchQuery: (query: string) => dispatch(setSearchQuery(query)),
    clearError: () => dispatch(clearError()),
  }), [dispatch]);

  // Memoized search function with debouncing handled at component level
  const searchEmployees = useCallback((query: string) => {
    actions.setSearchQuery(query);
  }, [actions]);

  // Get employee by ID (memoized)
  const getEmployeeById = useCallback((id: number): Employee | undefined => {
    return employeeState.employees.find(emp => emp.id === id);
  }, [employeeState.employees]);

  return {
    // Data
    employees: employeeState.employees,
    filteredEmployees,
    searchQuery: employeeState.searchQuery,
    error: employeeState.error,
    
    // Computed values
    employeeCount,
    loadingStates,
    
    // Actions
    ...actions,
    searchEmployees,
    getEmployeeById,
  };
};