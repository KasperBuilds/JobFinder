import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const api = {
  // Jobs
  getJobs: async (filters = {}) => {
    const params = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
        params.append(key, filters[key]);
      }
    });

    const response = await apiClient.get(`/jobs?${params.toString()}`);
    return response.data;
  },

  getJob: async (id) => {
    const response = await apiClient.get(`/jobs/${id}`);
    return response.data;
  },

  // Statistics
  getStats: async () => {
    const response = await apiClient.get('/stats');
    return response.data;
  },

  // Filter options
  getFilterOptions: async () => {
    const response = await apiClient.get('/filters');
    return response.data;
  },

  // Categories
  getCategories: async () => {
    const response = await apiClient.get('/categories');
    return response.data;
  },

  // Health check
  getHealth: async () => {
    const response = await apiClient.get('/health');
    return response.data;
  },

  // Manual job fetch (for admin)
  fetchJobs: async () => {
    const response = await apiClient.post('/fetch-jobs');
    return response.data;
  }
};

export default api;
