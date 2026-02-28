import { ParamListBase } from '@react-navigation/native';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
  company: {
    department: string;
    name: string;
    title: string;
  };
  address: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
}

export interface EmployeesResponse {
  users: Employee[];
  total: number;
  skip: number;
  limit: number;
}

export interface RootStackParamList extends ParamListBase {
  EmployeeList: undefined;
  EmployeeDetail: { employee: Employee };
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    success: string;
  };
}

export interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  refreshing: boolean;
}