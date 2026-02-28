export const COLORS = {
  primary: '#3b82f6',
  secondary: '#64748b',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#06b6d4',
} as const;

export const SIZES = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const API_ENDPOINTS = {
  USERS: '/users',
  USER_BY_ID: (id: number) => `/users/${id}`,
  SEARCH_USERS: '/users/search',
} as const;

export const STORAGE_KEYS = {
  THEME: '@employee_directory_theme',
  EMPLOYEES_CACHE: '@employee_directory_employees',
} as const;

export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500,
} as const;

export const SCREEN_NAMES = {
  EMPLOYEE_LIST: 'EmployeeList',
  EMPLOYEE_DETAIL: 'EmployeeDetail',
} as const;