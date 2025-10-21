// hooks/useAdmin.js

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminAPI } from '../services/api';
import toast from 'react-hot-toast';

// Dashboard Stats
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: () => adminAPI.getDashboardStats(),
    select: (response) => response.data,
  });
};

// Users
export const useAllUsers = (params:any) => {
  return useQuery({
    queryKey: ['allUsers', params],
    queryFn: () => adminAPI.getAllUsers(params),
    select: (response) => response.data,
  });
};

export const useUserById = (id:any) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => adminAPI.getUserById(id),
    select: (response) => response.data,
    enabled: !!id,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any } ) => adminAPI.updateUser(id, data),
    onSuccess: (response, variables) => {
      toast.success('User updated successfully');
      queryClient.invalidateQueries({queryKey:['user', variables.id]});
      queryClient.invalidateQueries({queryKey:['allUsers']});
    },
    onError: (error:any) => {
      toast.error(error.response?.data?.message || 'Failed to update user');
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => adminAPI.deleteUser(id),
    onSuccess: () => {
      toast.success('User deleted successfully');
      queryClient.invalidateQueries({queryKey:['allUsers']});
    },
    onError: (error:any) => {
      toast.error(error.response?.data?.message || 'Failed to delete user');
    },
  });
};

// Verification Requests
export const useVerificationRequests = (params?:any) => {
  return useQuery({
    queryKey: ['verificationRequests', params],
    queryFn: () => adminAPI.getVerificationRequests(params),
    select: (response) => response.data,
  });
};

export const useReviewVerificationRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => adminAPI.reviewVerificationRequest(id, data),
    onSuccess: (_, variables) => {
      toast.success(`Verification request ${variables.data.status.toLowerCase()} successfully`);
      queryClient.invalidateQueries({queryKey:['verificationRequests']});
      // Also invalidate the user query if needed, because user verification status is updated
      queryClient.invalidateQueries({queryKey:['allUsers']});
    },
    onError: (error:any) => {
      toast.error(error.response?.data?.message || 'Failed to review verification request');
    },
  });
};

// Complaints
export const useAllComplaints = (params:any) => {
  return useQuery({
    queryKey: ['allComplaints', params],
    queryFn: () => adminAPI.getAllComplaints(params),
    select: (response) => response.data,
  });
};

export const useUpdateComplaint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => adminAPI.updateComplaint(id, data),
    onSuccess: (_, variables) => {
      toast.success('Complaint updated successfully');
      queryClient.invalidateQueries({ queryKey: ['allComplaints', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['complaint', variables.id] });
      
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || 'Failed to update property'
      );
    },
  });
};

// Properties (Admin)
export const useAllPropertiesAdmin = (params:any) => {
  return useQuery({
    queryKey: ['allPropertiesAdmin', params],
    queryFn: () => adminAPI.getAllProperties(params),
    select: (response) => response.data,
  });
};

export const useUpdatePropertyAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => adminAPI.updateProperty(id, data),
       onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['allPropertiesAdmin'] });
      queryClient.invalidateQueries({ queryKey: ['property', variables.id] });
      toast.success('Property updated successfully');
    
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || 'Failed to update property'
      );
    },
  });
};

export const useDeletePropertyAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => adminAPI.deleteProperty(id),
    onSuccess: () => {
      toast.success('Property deleted successfully');
      queryClient.invalidateQueries({queryKey:['allPropertiesAdmin']});
    },
    onError: (error:any) => {
      toast.error(error.response?.data?.message || 'Failed to delete property');
    },
  });
};