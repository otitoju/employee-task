import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { EmployeesResponse } from '../types';

const BASE_URL = 'https://dummyjson.com';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(`API Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error: AxiosError) => {
        console.error('API Response Error:', error.message);
        
        if (error.code === 'ECONNABORTED') {
          throw new Error('Request timeout. Please check your internet connection.');
        }
        
        if (!error.response) {
          throw new Error('Network error. Please check your internet connection.');
        }

        const status = error.response.status;
        switch (status) {
          case 400:
            throw new Error('Bad request. Please try again.');
          case 401:
            throw new Error('Unauthorized access.');
          case 403:
            throw new Error('Forbidden access.');
          case 404:
            throw new Error('Resource not found.');
          case 500:
            throw new Error('Server error. Please try again later.');
          default:
            throw new Error(`Request failed with status ${status}`);
        }
      }
    );
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await this.api.get<T>(endpoint);
    return response.data;
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await this.api.post<T>(endpoint, data);
    return response.data;
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    const response = await this.api.put<T>(endpoint, data);
    return response.data;
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await this.api.delete<T>(endpoint);
    return response.data;
  }
}

export const apiService = new ApiService();