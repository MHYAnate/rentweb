import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      // window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data: any) => api.post('/users/register', data),
  login: (data: any) => api.post('/users/login', data),
  logout: () => api.post('/users/logout'),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data: any) => api.put('/users/profile', data),
  changePassword: (data: any) => api.put('/users/change-password', data),
  getUserProperties: (params?: any) => api.get('/users/properties', { params }),
};

// services/api.js

export const adminAPI = {
  // ... existing ...
  getDashboardStats: () => api.get('/admin/dashboard'),
  getAllUsers: (params?: any) => api.get('/admin/users', { params }),
  getUserById: (id: any) => api.get(`/admin/users/${id}`),
  updateUser: (id: any, data: any) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id: any) => api.delete(`/admin/users/${id}`),
  getVerificationRequests: (params?: any) => api.get('/admin/verifications', { params }),
  reviewVerificationRequest: (id: any, data: any) => api.put(`/admin/verifications/${id}/review`, data),
  getAllComplaints: (params?: any) => api.get('/admin/complaints', { params }),
  updateComplaint: (id: any, data: any) => api.put(`/admin/complaints/${id}`, data),
  // Property management (using the same endpoints as regular property controller but with admin access)
  getAllProperties: (params?: any) => api.get('/admin/properties', { params }),
  updateProperty: (id: any, data: any) => api.put(`/admin/properties/${id}`, data),
  deleteProperty: (id: any) => api.delete(`/admin/properties/${id}`),
};

// Landing API
export const landingAPI = {
  getLandingData: (params?: any) => api.get('/landing', { params }),
  getSearchSuggestions: (params: any) => api.get('/landing/search-suggestions', { params }),
};

// Properties API
export const propertiesAPI = {
  getAll: (params?: any) => api.get('/properties', { params }),
  getById: (id: string, params?: any) => api.get(`/properties/${id}`, { params }),
  // create: (data: any) => api.post('/properties', data),
  create: async (formData:any) => {
    // Axios automatically sets the 'Content-Type' to 'multipart/form-data'
    // when you pass a FormData object, so you don't need to set it manually.
    const { data } = await api.post('/properties', formData);
    return data;
  },
  update: (id: string, data: any) => api.put(`/properties/${id}`, data),
  delete: (id: string) => api.delete(`/properties/${id}`),
  getSimilar: (id: string, params?: any) => api.get(`/properties/${id}/similar`, { params }),
};

// Favorites API
export const favoritesAPI = {
  getAll: (params?: any) => api.get('/favorites', { params }),
  add: (propertyId: string) => api.post('/favorites', { propertyId }),
  remove: (propertyId: string) => api.delete(`/favorites/${propertyId}`),
  checkStatus: (propertyId: string) => api.get(`/favorites/status/${propertyId}`),
};

// Ratings API
export const ratingsAPI = {
  add: (data: any) => api.post('/ratings', data),
  getPropertyRatings: (propertyId: string, params?: any) => 
    api.get(`/ratings/property/${propertyId}`, { params }),
  getUserRatings: (params?: any) => api.get('/ratings/user', { params }),
  delete: (ratingId: string) => api.delete(`/ratings/${ratingId}`),
};

export default api;