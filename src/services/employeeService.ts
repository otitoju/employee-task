import { apiService } from './api';
import { EmployeesResponse, Employee } from '../types';

class EmployeeService {
  async getEmployees(limit: number = 30, skip: number = 0): Promise<EmployeesResponse> {
    try {
      const response = await apiService.get<EmployeesResponse>(`/users?limit=${limit}&skip=${skip}`);
      return response;
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error;
    }
  }

  async getEmployeeById(id: number): Promise<Employee> {
    try {
      const response = await apiService.get<Employee>(`/users/${id}`);
      return response;
    } catch (error) {
      console.error(`Error fetching employee ${id}:`, error);
      throw error;
    }
  }

  async searchEmployees(query: string, limit: number = 30): Promise<EmployeesResponse> {
    try {
      const response = await apiService.get<EmployeesResponse>(`/users/search?q=${encodeURIComponent(query)}&limit=${limit}`);
      return response;
    } catch (error) {
      console.error('Error searching employees:', error);
      throw error;
    }
  }

  // Utility method to filter employees locally
  filterEmployees(employees: Employee[], query: string): Employee[] {
    if (!query.trim()) {
      return employees;
    }

    const searchTerm = query.toLowerCase().trim();
    return employees.filter((employee) => {
      const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
      const department = employee.company?.department?.toLowerCase() || '';
      const title = employee.company?.title?.toLowerCase() || '';
      const email = employee.email.toLowerCase();

      return (
        fullName.includes(searchTerm) ||
        department.includes(searchTerm) ||
        title.includes(searchTerm) ||
        email.includes(searchTerm)
      );
    });
  }
}

export const employeeService = new EmployeeService();